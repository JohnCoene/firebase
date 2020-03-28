#' Fireblaze
#' 
#' Use fireblaze to manage authentications.
#' 
#' @field session A valid Shiny session.
#' 
#' @keywords internal
Firebase <- R6::R6Class(
  "Firebase",
  public = list(
    session = NULL,
#' @details Initialise Fireblaze
#' 
#' @param config_path Path to the configuration file as created by \code{\link{create_config}}.
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
      private$send("initialize", msg)
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
      user <- private$get_input("signed_in_user")
      private$.user_signed_in <- user
      invisible(user)
    },
#' @details Get results of a sign up
#' @return A list of length 2 containing \code{success} a boolean
#' indicating wherther signing in was successful and \code{response}
#' containing the user object or \code{NULL} if signing in failed.
    get_signed_up = function(){
      user <- private$get_input("signed_up_user")
      private$.user_sign_up <- user
      invisible(user)
    },
#' @details Check whether use is signed in
#' @return A boolean indicating whether user has successfully signed in.
    is_signed_in = function(){
      user <- private$get_input("signed_in_user")
      private$.user_signed_in <- user
      invisible(user$success)
    },
#' @details Makes Shiny output, observer, or reactive require the user to be signed in
    req_sign_in = function(){
      user <- private$get_input("signed_in_user")
      private$.user_signed_in <- user
      req(user$success)
    },
#' @details Makes Shiny output, observer, or reactive require the user to be signed out
    req_sign_out = function(){
      user <- private$get_input("signed_in_user")
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
#' @details Get results of a sign up
#' @return A list of length 2 containing \code{success} a boolean
#' indicating wherther deletion was successful and \code{response}
#' containing either \code{successful} string or the error if signing in failed.
    get_delete_user = function(){
      private$get_input("deleted_user")
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
    send = function(func, msg = list()){
      func <- paste0("fireblaze-", func)
      self$session$sendCustomMessage(func, msg)
    },
    get_input = function(name){
      name <- paste0("fireblaze_", name)
      self$session[["input"]][[name]]
    },
    .user_signed_in = list(signed_in = FALSE, user = NULL),
    .user_sign_up = list(signed_up = FALSE, user = NULL),
    .language_code = NULL,
    unique_id = NULL
  )
)