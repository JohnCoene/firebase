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
#' @details Signs user out
    sign_out = function(){
      private$send("signout")$response
    },
#' @details Signed in user details triggered when auth states changes
    get_signed_in = function(){
      user <- private$get_input("signed_in_user")
      private$.user_signed_in <- user
      invisible(user)
    },
#' @details Signed up user details triggered explicitely by user (e.g.: on click)
    get_signed_up = function(){
      user <- private$get_input("signed_up_user")
      private$.user_sign_up <- user
      invisible(user)
    },
#' @details Check whether use is signed in
    is_signed_in = function(){
      user <- private$get_input("signed_in_user")
      private$.user_signed_in <- user
      invisible(user$signed_in)
    },
#' @details Makes output require user sign in
    req_sign_in = function(){
      user <- private$get_input("signed_in_user")
      private$.user_signed_in <- user
      req(user$signed_in)
    },
#' @details Set language code for auth provider
#' @param code iso639-1 language code.
    set_language_code = function(code){
      if(missing(code)) stop("Missing code", call. = FALSE)
      private$send("language-code", list(code = code))
      private$.language_code <- code
      invisible(self)
    },
#' @details Send the user a verification email
    send_verification_email = function(){
      private$send("send-verification-email")
      invisible(self)
    },
#' @details Get result of verification email sending procedure
    get_verification_email = function(){
      private$get_input("verification_email_sent")
      invisible(self)
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