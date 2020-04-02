#' Prebuilt UI
#' 
#' Use firebase to manage authentications.
#' 
#' @field tos_url URL to the Terms of Service page.
#' @field privacy_policy_url The URL to the Privacy Policy page.
#' 
#' @examples 
#' library(shiny)
#' library(firebase)
#' 
#' ui <- fluidPage(
#'   useFirebase(), # import dependencies
#'   useFirebaseUI() # import UI
#' )
#' 
#' server <- function(input, output){
#'   f <- FirebaseUI$
#'     new()$ # instantiate
#'     set_providers( # define providers
#'       email = TRUE, 
#'       google = TRUE
#'     )
#' }
#' 
#' \dontrun{shinyApp(ui, server)}
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
#' @return self
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
#' @return self
    set_tos_url = function(url){
      if(missing(url)) stop("Missing URL", call. = FALSE)
      self$tos_url <- url
      invisible(self)
    },
#' @details Defines Privacy Policy URL
#' @param url URL to use.
#' @return self
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
#' @return self
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
#' @return self
    reset_password = function(email = NULL){
      if(is.null(email))
        email <- private$.user_signed_in$user$email

      if(is.null(email))
        stop("Not user signed in, must specify `email`")

      super$send("reset-email", list(email = email))

      invisible(self)
    },
#' @details Get whether password reset email was successfully sent 
#' @return A list of length 2 containing \code{success} a boolean
#' indicating whether email reset was successful and \code{response}
#' containing \code{successful} or the error.
    get_reset = function(){
      super$get_input("reset_email_sent")
    },
#' @details Send the user a verification email
#' @return self
    send_verification_email = function(){
      private$send("send-verification-email")
      invisible(self)
    },
#' @details Get result of verification email sending procedure
#' @return A list of length 2 containing \code{success} a boolean
#' indicating whether email verification was successfully sent and \code{response}
#' containing \code{successful} or the error.
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
#' @return self
    set_password = function(password){
      super$send("set-password", list(password = password))
    },
#' @details Get response from set_password
#' @return A list of length 2 containing \code{success} a boolean
#' indicating whether setting password was successfully set and \code{response}
#' containing \code{successful} as string or the error.
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
#' @return A list of length 2 containing \code{success} a boolean
#' indicating whether re-authentication was successful and \code{response}
#' containing \code{successful} as string or the error.
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