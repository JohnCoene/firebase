#' Fireblaze
#' 
#' Use fireblaze to manage authentications.
#' 
#' @export
FireblazeUI <- R6::R6Class(
  "FireblazeUI",
  inherit = Fireblaze,
  public = list(
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

      super$send("ui-config", opts)

      invisible(self)
    },
#' @details Get Signed in User Info
    sign_in = function(){
      user <- super$get_input("sign_in_ui")

      if(is.null(user))
        return(NULL)

      # store
      if(user$success == TRUE)
        private$.user <- user$response
      else 
        cli::cli_alert_danger("Sign in error")

      return(user$response)
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