#' Firebase Authentication
#' 
#' Use firebase to manage authentications.
#' 
#' @return An object of class \code{FirebaseAuth}.
#' 
#' @importFrom cli cli_rule cli_alert_danger cli_alert_info cli_alert_warning cli_alert_warning
#' @importFrom jsonlite fromJSON
#' @importFrom jose jwt_decode_sig
#' @importFrom openssl read_cert
#' 
#' @export
FirebaseAuth <- R6::R6Class(
  "FirebaseAuth",
  inherit = Firebase,
  public = list(
#' @details Initialise firebase authentication
#' 
#' @param config_path Path to the configuration file as created by \code{\link{firebase_config}}.
#' @param session A valid shiny session.
#' @param persistence How the auth should persit: \code{none}, the user has to sign in at every visit,
#' \code{session} will only persist in current tab, \code{local} persist even when window is closed.
#' @param language_code Sets the language to use for the UI.
#' Supported languages are listed [here](https://github.com/firebase/firebaseui-web/blob/master/LANGUAGES.md).
#' Set to `browser` to use the default browser language of the user.
    initialize = function(
      persistence = c("session", "local", "memory"), 
      config_path = "firebase.rds", 
      language_code = NULL,
      session = shiny::getDefaultReactiveDomain()
    ){
      super$initialize(config_path, session)
      
      private$.language_code <- language_code

      # init
      super$.send(
        "initialize-auth", 
        languageCode = language_code,
        persistence = match.arg(persistence)
      )
    },
#' @details Print the class
    print = function(){
      cli_rule("Firebase Authentication")
      user <- self$get_signed_in()
      if (!isTRUE(user$success)) {
        cli_alert_info("No user is signed in")
      } else {
        cli_alert_info("A user is signed in")
        cli::cli_dl(Filter(Negate(is.null), c(
          uid = user$response$uid,
          email = user$response$email,
          emailVerified = user$response$emailVerified,
          displayName = user$response$displayName
        )))
      }
    },
#' @details Signs out user
#' @return self
    sign_out = function(){
      super$send("signout")
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
      .Deprecated(
        "get_signed_id", 
        msg = "This method is method is deprecated, use `get_signed_in`"
      )
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

      if(length(user$success))
        return(FALSE)

      req(!user$success)
    },
#' @details Set language code for auth provider
#' @param code iso639-1 language code.
#' @return self
    set_language_code = function(code){
      .Deprecated(
        "language_code",
        "firebase",
        "Deprecated, see the `language_code` argument of the class constructor"
      )
      if(missing(code)) stop("Missing code", call. = FALSE)
      super$send("language-code", list(code = code))
      private$.language_code <- code
      invisible(self)
    },
#' @details Delete the user
#' @return self
    delete_user = function(){
      super$send("delete-user")
      invisible(self)
    },
#' @details Get result of user deletion
#' @return A list of length 2 containing \code{success} a boolean
#' indicating wherther deletion was successful and \code{response}
#' containing either \code{successful} string or the error if signing in failed.
    get_delete_user = function(){
      super$get_input("deleted_user")
    },
#' @details Expose Auth
#' 
#' Expose the `firebaseAuth` object the product of the authentication
#' attaching it to the `window`: access it with `window.firebaseAuth`.
    expose_auth = function() {
      private$.send("expose-auth")
      invisible(self)
    },
#' @details Get user access token
#' 
#' @return User's access token
    get_access_token = function(){
      .Deprecated(
        "get_signed_in",
        msg = "This method is method is deprecated, use `get_signed_in`"
      )
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
      .Deprecated("", msg = "This method is no longer necesasry to use")
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
      super$send("id-token")
    },
#' @details Retrieve the users' ID Token
#' 
#' Also see `request_id_token`.
#' 
#' @return  the id token (invisibly).
    get_id_token = function(){
      token <- super$get_input("id_token")
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
    get_pubkeys = function(){
      # get keys
      keys <- tryCatch(
        fromJSON('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'),
        error = function(e) e
      )

      if(inherits(keys, "error"))
        return(keys)

      lapply(keys, read_cert)
    },
    get_signed_in_checked = function(){
      # already signed in return object
      if(!is.null(private$.user_signed_in$user))
        return(private$.user_signed_in)

      response <- super$get_input("signed_in_user")

      # check token
      certs <- private$get_pubkeys()

      if(inherits(certs, "error")){
        cli_alert_danger("Could not fetch Google public keys")
        return()
      }

      # defaults to an error
      signature <- simpleError("Invalid Google public keys")
      
      if(!inherits(signature, "error")){
        cli_alert_danger("Could not parse signature")
        return()
      }
      
      # no token, ignore
      if(is.null(response$token)){
        return()
      }

      # there may be multiple certs, only one is valid
      for(i in seq_along(certs)){
        signature <- tryCatch(
          jwt_decode_sig(response$token, certs[[i]]$pubkey),
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
        cli_alert_danger("Invalid signature")
        if(interactive){
          CHOICE <- menu(c("Yes", "No"), title="Do you still want to continue ?")
          if (CHOICE != TRUE){
            return(FALSE)
          } else {
            print("Invalid signature but continuing...")
          }
        } else {
          return(FALSE)
        }

      }

      now <- as.numeric(Sys.time() + private$.grace_period)

      if(as.numeric(signature$exp) < now){
        cli_alert_danger("Signature expiry is in the past")
        if(interactive){
          CHOICE <- menu(c("Yes", "No"), title="Do you still want to continue ?")
          if (CHOICE != TRUE){
            return(FALSE)
          } else {
              print("Signature expiry is in the past but continuing...")
          }
        } else {
          return(FALSE)
        }
      }

      if(as.numeric(signature$iat) > now){
        cli_alert_danger("Signature expiry is in the future")
        if(interactive){
          CHOICE <- menu(c("Yes", "No"), title="Do you still want to continue ?")
          if (CHOICE != TRUE){
            return(FALSE)
          } else {
            print("Signature expiry is in the future but continuing...")
          }
        } else {
          return(FALSE)
        }
      }

      if(signature$aud != super$get_project_id()){
        cli_alert_danger("Signature audience is not the project id")
        if(interactive){
          CHOICE <- menu(c("Yes", "No"), title="Do you still want to continue ?")
          if (CHOICE != TRUE){
            return(FALSE)
          } else {
            print("Signature audience is not the project id but continuing...")
          }
        } else {
          return(FALSE)
        }
      }

      iss <- sprintf(
        "https://securetoken.google.com/%s",
        super$get_project_id()
      )

      if(signature$iss != iss){
        cli_alert_danger("Signature incorrect issuer")
        if(interactive){
          CHOICE <- menu(c("Yes", "No"), title="Do you still want to continue ?")
          if (CHOICE != TRUE){
            return(FALSE)
          } else {
            print("Signature incorrect issuer but continuing...")
          }
        } else {
          return(FALSE)
        }
      }

      if(signature$sub == ""){
        cli_alert_danger("Signature subject is invalid")
        if(interactive){
          CHOICE <- menu(c("Yes", "No"), title="Do you still want to continue ?")
          if (CHOICE != TRUE){
            return(FALSE)
          } else {
            print("Signature subject is invalid but continuing...")
          }
        } else {
          return(FALSE)
        }
      }

      if(signature$auth_time > now){
        cli_alert_danger("Signature auth time is in the future.")
        if(interactive){
          CHOICE <- menu(c("Yes", "No"), title="Do you still want to continue ?")
          if (CHOICE != TRUE){
            return(FALSE)
          } else {
            print("Signature auth time is in the future but continuing...")
          }
        } else {
          return(FALSE)
        }
      }

      return(TRUE)
    },
    .user_signed_in = list(signed_in = FALSE, user = NULL),
    .user_sign_up = list(signed_up = FALSE, user = NULL),
    .language_code = NULL,
    .id_token = NULL,
    .grace_period = 300
  )
)
