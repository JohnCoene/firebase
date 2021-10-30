#' Firebase
#' 
#' Use firebase to manage authentications.
#' 
#' @field session A valid Shiny session.
#' 
#' @export
Firebase <- R6::R6Class(
  "Firebase",
  public = list(
    session = NULL,
#' @details Initialise firebase
#' 
#' @param config_path Path to the configuration file as created by \code{\link{firebase_config}}.
#' @param session A valid shiny session.
#' @param persistence How the auth should persit: \code{none}, the user has to sign in at every visit,
#' \code{session} will only persist in current tab, \code{local} persist even when window is closed.
    initialize = function(persistence = c("none", "session", "local"), config_path = "firebase.rds", session = shiny::getDefaultReactiveDomain()){
      # check that config is present
      stopifno_config(config_path)

      # keep session
      self$session <- session

      # generate a unique id
      private$unique_id <- create_unique_id()

      conf <- read_config(config_path)
      msg <- list(
        conf = conf,
        persistence = match.arg(persistence)
      )

      private$.project_id <- conf$projectId

      # namespace
      private$namespace(session)

      # init
      private$send("initialize", msg)
    },
#' @details Print the class
    print = function(){
      cli::rule("Firebase")
      signin <- "No user is signed in"
      if(private$.user_signed_in$signed_in)
        signin <- "A user is signed in"
      
      cli::cli_alert_info(signin, "\n")
    },
#' @details Signs out user
#' @return self
    sign_out = function(){
      private$send("signout")
      invisible(self)
    },
#' @details Get signed out results
#' @return A list of length 2 containing \code{success} a boolean
#' indicating wherther signing out was successful and \code{response}
#' containing \code{sucessful} or the error.
    get_sign_out = function(){
      private$get_input("signout")
    },
#' @details Signed in user details triggered when auth states changes
#' @return A list of length 2 containing \code{success} a boolean
#' indicating wherther signing in was successful and \code{response}
#' containing the user object or \code{NULL} if signing in failed.
    get_signed_in = function(){
      response <- private$get_signed_in_checked()
      private$.user_signed_in <- response
      invisible(response)
    },
#' @details Get results of a sign up
#' @return A list of length 2 containing \code{success} a boolean
#' indicating wherther signing in was successful and \code{response}
#' containing the user object or \code{NULL} if signing in failed.
    get_signed_up = function(){
      user <- private$get_signed_in_checked()
      private$.user_sign_up <- user
      invisible(user)
    },
#' @details Check whether use is signed in
#' @return A boolean indicating whether user has successfully signed in.
    is_signed_in = function(){
      user <- private$get_signed_in_checked()
      private$.user_signed_in <- user
      invisible(user$success)
    },
#' @details Makes Shiny output, observer, or reactive require the user to be signed in
    req_sign_in = function(){
      user <- private$get_signed_in_checked()
      private$.user_signed_in <- user
      req(user$success)
    },
#' @details Makes Shiny output, observer, or reactive require the user to be signed out
    req_sign_out = function(){
      user <- private$get_signed_in_checked()
      private$.user_signed_in <- user
      req(!user$success)
    },
#' @details Set language code for auth provider
#' @param code iso639-1 language code.
#' @return self
    set_language_code = function(code){
      if(missing(code)) stop("Missing code", call. = FALSE)
      private$send("language-code", list(code = code))
      private$.language_code <- code
      invisible(self)
    },
#' @details Delete the user
#' @return self
    delete_user = function(){
      private$send("delete-user")
      invisible(self)
    },
#' @details Get result of user deletion
#' @return A list of length 2 containing \code{success} a boolean
#' indicating wherther deletion was successful and \code{response}
#' containing either \code{successful} string or the error if signing in failed.
    get_delete_user = function(){
      private$get_input("deleted_user")
    },
#' @details Get user access token
#' 
#' @return User's access token
    get_access_token = function(){
      obj <- self$get_signed_in()
      token <- obj$response$stsTokenManager$accessToken
      invisible(token)
    },
#' @details Clear user session
#' 
#' This clears the login internally and will retrigger a JWT 
#' token check, only useful if you are running really long
#' sessions.
    clear = function(){
      private$.user_signed_in = list(signed_in = FALSE, user = NULL)
      invisible(self)
    },
#' @details Request the users' ID Token
#' 
#' Used to retrieved the user's ID token useful to connect
#' with other Google APIs and make request on the user's behalf.
#' This executes the request for the id token, this request
#' can only be made once the user is signed in.
#' 
#' The actual id token is obtained with the `get_id_token`
#' method.
    request_id_token = function(){
      private$send("id-token")
    },
#' @details Retrieve the users' ID Token
#' 
#' Also see `request_id_token`.
#' 
#' @return  the id token (invisibly).
    get_id_token = function(){
      token <- private$get_input("id_token")
      private$.id_token <- token
      invisible(token)
    }
  ),
  active = list(
#' @field signed_in Read the signed in user.
    signed_in = function(value){
      if(!missing(value))
        stop("This field is read-only.", call. = FALSE)

      return(private$.user_signed_in)
    },
#' @field signed_up Read the signed in user.
    signed_up = function(value){
      if(!missing(value))
        stop("This field is read-only.", call. = FALSE)

      return(private$.user_signed_up)
    }
  ),
  private = list(
    namespace = function(session){
      ns <- session$ns(NULL)
      if(length(ns) > 0 && ns != "")
        ns <- paste0(ns, "-")
      private$.ns <- ns
    },
    send = function(func, msg = list()){
      func <- paste0("fireblaze-", func)
      msg$ns <- private$.ns
      self$session$sendCustomMessage(func, msg)
    },
    get_input = function(name){
      name <- paste0("fireblaze_", name)
      self$session[["input"]][[name]]
    },
    get_pubkeys = function(){
      # get keys
      keys <- tryCatch(
        jsonlite::fromJSON('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'),
        error = function(e) e
      )

      if(inherits(keys, "error"))
        return(keys)

      lapply(keys, openssl::read_cert)
    },
    get_signed_in_checked = function(){
      # already signed in return object
      if(!is.null(private$.user_signed_in$user))
        return(private$.user_signed_in)

      response <- private$get_input("signed_in_user")

      # check token
      certs <- private$get_pubkeys()

      if(inherits(certs, "error")){
        cli::cli_alert_danger("Could not fetch Google public keys")
        return()
      }

      # defaults to an error
      signature <- simpleError("Invalid Google public keys")
      
      if(!inherits(signature, "error")){
        cli::cli_alert_danger("Could not parse ")
      }
      
      # no token, ignore
      if(is.null(response$token)){
        return()
      }

      # there may be multiple certs, only one is valid
      for(i in seq_along(certs)){
        signature <- tryCatch(
          jose::jwt_decode_sig(response$token, certs[[i]]$pubkey),
          error = function(e) e
        )

        # we found a valid one, we exit
        if(!inherits(signature, "error"))
          break
      }

      signature_ok <- private$check_signature(signature)
      if(!signature_ok)
        return()

      # remove token
      response$token <- NULL

      private$.user_signed_in <- response

      invisible(response)
    },
    check_signature = function(signature){

      if(inherits(signature, "error")){
        cli::cli_alert_danger("Invalid signature")
        return(FALSE)
      }

    	now <- as.numeric(Sys.time())

    	if(as.numeric(signature$exp) < now){
        cli::cli_alert_danger("Signture expiry is in the past")
    		return(FALSE)
      }

    	if(as.numeric(signature$iat) > now){
        cli::cli_alert_danger("Signture issued at time is in the future")
    		return(FALSE)
      }

      if(signature$aud != private$.project_id){
        cli::cli_alert_danger("Signature audience is not the project id")
    		return(FALSE)
      }

      iss <- sprintf(
        "https://securetoken.google.com/%s", 
        private$.project_id
      )

      if(signature$iss != iss){
        cli::cli_alert_danger("Signature incorrect issuer")
    		return(FALSE)
      }

      if(signature$sub == ""){
        cli::cli_alert_danger("Signature subject is invalid")
    		return(FALSE)
      }

      if(signature$auth_time > now){
        cli::cli_alert_danger("Signature auth time is in the future")
    		return(FALSE)
      }

    	TRUE
    },
    .user_signed_in = list(signed_in = FALSE, user = NULL),
    .user_sign_up = list(signed_up = FALSE, user = NULL),
    .language_code = NULL,
    unique_id = NULL,
    .project_id = "",
    .ns = "",
    .id_token = NULL
  )
)
