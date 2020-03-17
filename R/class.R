#' Fireblaze
#' 
#' Use fireblaze to manage authentications.
#' 
#' @field session A valid Shiny session.
#' 
#' @export
Fireblaze <- R6::R6Class(
  "Fireblaze",
  public = list(
    session = NULL,
#' @details Initialise Fireblaze
#' 
#' @param config_path Path to the configuration file as created by \code{\link{create_config}}.
#' @param session A valid shiny session.
#' @param persistence How the auth should persit: \code{none}, the user has to sign in at every visit,
#' \code{session} will only persist in current tab, \code{local} persist even when window is closed.
    initialize = function(persistence = c("session", "none", "local"), config_path = "fireblaze.rds", session = shiny::getDefaultReactiveDomain()){
      # check that config is present
      config_exists(config_path)

      self$session <- session

      conf <- read_config(config_path)
      msg <- list(
        conf = conf,
        persistence = match.arg(persistence)
      )
      private$send("initialize", msg)
    },
#' @details Define signin and login providers.
#' 
#' @param google,facebook,twitter,github,email,phone,anonymous Set to \code{TRUE} the providers you want to use, at least one.
    set_providers = function(google = FALSE, facebook = FALSE, twitter = FALSE, github = FALSE, email = FALSE, phone = FALSE, anonymous = FALSE){

      opts <- list(
        google = google, 
        facebook = facebook, 
        twitter = twitter, 
        github = github, 
        email = email, 
        phone = phone, 
        anonymous = anonymous
      )

      private$providers_set <- opts

      invisible(self)

    },
#' @details Setup the signin form.
#' 
#' @param flow The signin flow to use, popup or redirect.
#' @param helper Wether to use accountchooser.com upon signing in or signing up with email, 
#' the user will be redirected to the accountchooser.com website and will be able to select 
#' one of their saved accounts. You can disable it by specifying the value below. 
#' @param ... Any other option to pass to Firebase UI.
    run = function(flow = c("popup", "redirect"), helper = TRUE){
      # check if providers have been set
      check_providers(private$providers_set)

      opts <- list(
        helper = helper,
        flow = match.arg(flow),
        providers = private$providers_set
      )

      private$send("ui-config", opts)

      invisible(self)
    },
#' @details Sign in with email
#' 
#' @param email,password Credentials as entered by the user.
    sign_in_email_password = function(email, password){
      # prepare message
      msg <- list(email = email, password = password)

      # Signin
      private$send("signin-email-password", msg)

      # catch error
      error <- NULL
      error <- self$session[["input"]][["signin_email_password_error"]]

      if(!is.null(error)){
        cli::cli_alert_danger("Sign in error")
        return(error)
      }
      
      invisible(self)
    },
#' @details Get Signed in User Info
    sign_in_success = function(){
      user <- self$session[["input"]][["sign_in_success"]]
      private$.user <- user
      return(user)
    },
#' @details Get Whether User is Currently Signing in
    sign_in_fail = function(){
      self$session[["input"]][["sign_in_fail"]]
    }
  ),
  active = list(
#' @field signed_in_user Read the signed in user.
    signed_in_user = function(value){
      if(!missing(value))
        stop("This field is read-only.", call. = FALSE)

      return(private$.user)
    }
  ),
  private = list(
    send = function(func, msg = list()){
      func <- paste0("fireblaze-", func)
      self$session$sendCustomMessage(func, msg)
    },
    providers_set = list(
      google = FALSE, 
      facebook = FALSE, 
      twitter = FALSE, 
      github = FALSE, 
      email = FALSE, 
      phone = FALSE, 
      anonymous = FALSE
    ),
    .user = NULL
  )
)