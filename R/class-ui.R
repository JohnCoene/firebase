#' Prebuilt UI
#' 
#' Use fireblaze to manage authentications.
#' 
#' @field tos_url URL to the Terms of Service page.
#' @field privacy_policy_url The URL to the Privacy Policy page.
#' 
#' @export
FirebaseUI <- R6::R6Class(
  "FirebaseUI",
  inherit = Firebase,
  public = list(
    tos_url = "<tos-url>",
    privacy_policy_url = "<privacy-policy-url>",
#' @details Define signin and login providers.
#' 
#' @param google,facebook,twitter,github,email,microsoft,apple,yahoo,phone,anonymous Set to \code{TRUE} the providers you want to use, at least one.
    set_providers = function(google = FALSE, facebook = FALSE, twitter = FALSE, github = FALSE, email = FALSE, 
      microsoft = FALSE, apple = FALSE, yahoo = FALSE, phone = FALSE, anonymous = FALSE){

      opts <- list(
        google = google, 
        facebook = facebook, 
        twitter = twitter, 
        github = github, 
        email = email, 
        phone = phone, 
        anonymous = anonymous,
        microsoft = microsoft,
        apple = apple,
        yahoo = yahoo
      )

      private$providers_set <- opts

      invisible(self)

    },
#' @details Defines Tterms of Services URL
#' @param url URL to use.
    set_tos_url = function(url){
      if(missing(url)) stop("Missing URL", call. = FALSE)
      self$tos_url <- url
      invisible(self)
    },
#' @details Defines Privacy Policy URL
#' @param url URL to use.
    set_privacy_policy_url = function(url){
      if(missing(url)) stop("Missing URL", call. = FALSE)
      self$privacy_policy_url <- url
      invisible(self)
    },
#' @details Setup the signin form.
#' 
#' @param flow The signin flow to use, popup or redirect.
#' @param account_helper Wether to use accountchooser.com upon signing in or signing up with email, 
#' the user will be redirected to the accountchooser.com website and will be able to select 
#' one of their saved accounts. You can disable it by specifying the value below. 
#' @param ... Any other option to pass to Firebase UI.
    launch = function(flow = c("popup", "redirect"), account_helper = FALSE){
      
      # check if fireblze correctly setup
      check_providers(private$providers_set)
      check_urls(self)

      opts <- list(
        tos_url = self$tos_url,
        privacy_policy_url = self$privacy_policy_url,
        account_helper = account_helper,
        flow = match.arg(flow),
        providers = private$providers_set
      )

      super$send("ui-config", opts)

      invisible(self)
    },
#' @details Reset user password
#' @param email Email to send reset link to, if missing looks for current logged in user's email
    reset_password = function(email = NULL){
      if(is.null(email))
        email <- private$.user_signed_in$user$email

      if(is.null(email))
        stop("Not user signed in, must specify `email`")

      super$send("reset-email", list(email = email))

      invisible(self)
    },
#' @details Get whether password reset email was successfully sent 
    get_reset = function(){
      super$get_input("reset_email_sent")
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
    },
#' @details Set user password
#' 
#' Useful to provide ability to change password.
#' 
#' @param password The authenticated user password, the user should be prompted 
#' to enter it.
    set_password = function(password){
      super$send("set-password", list(password = password))
    },
#' @details Get response from set_password
    get_password = function(){
      super$get_input("set_password")
    },
#' @details Re-authenticate the user.
#' 
#' Some security-sensitive actions—such as deleting an account, setting a 
#' primary email address, and changing a password—require that the user has 
#' recently signed in. If you perform one of these actions, and the user signed 
#' in too long ago, the action fails with an error. 
#' 
#' @param password The authenticated user password, the user should be prompted 
#' to enter it.
    re_authenticate = function(password){
      super$send("re-authenticate", list(password = password))
    },
#' @details Get response from re_authenticate
    get_re_authenticated = function(){
      super$get_input("re_authenticate")
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
      anonymous = FALSE,
      microsoft = FALSE,
      apple = FALSE,
      yahoo = FALSE
    )
  )
)