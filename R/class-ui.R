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
    )
  )
)