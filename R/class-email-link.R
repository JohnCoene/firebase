#' Email Link
#' 
#' @export
FireblazeEmailLink <- R6::R6Class(
  "FireblazeEmailLink",
  inherit = Fireblaze,
  public = list(
#' @details Configure
#' @param url The link is handled in the web action widgets, 
#' this is the deep link in the continueUrl query parameter. 
#' Likely, your shiny application link.
#' @param ... Any other parameter from the 
#' \href{https://firebase.google.com/docs/auth/web/passing-state-in-email-actions?authuser=0#passing_statecontinue_url_in_email_actions}{official documentation}.
    config = function(url, ...){
      if(missing(url)) stop("Missing url", call. = FALSE)
      config <- list(handleCodeInApp = TRUE, url = url, ...)
      private$.config <- config
      invisible(self)
    },
#' @details Send email verification link.
#' @param email Email to send verification to.
    send = function(email){
      if(missing(email)) stop("Missing email", call. = FALSE)
      if(is.null(private$.config)) stop("Missing config, see `config` method", call. = FALSE)

      msg <- list(
        email = email,
        config = private$.config
      )

      super$send("send-email-link", msg)
      invisible(self)
    },
#' @details Verifies user came from email link.
    verify = function(){
      super$send("verify-email", msg)
      invisible(self)
    },
#' @details Get whether email verification was correctly sent.
    get_email_sent = function(){
      email_sent <- super$get_input("email_link_sent")
      private$.email_sent <- email_sent
      return(email_sent)
    },
#' @details Get whether email verification was correctly sent.
    get_email_verification = function(){
      verification <- super$get_input("email_verification")
      private$.email_verification <- verification
      return(verification)
    }
  ),
  active = list(
#' @field email_verification Email verification results
    email_verification = function(value){
      if(!missing(value))
        stop("This field is read-only.", call. = FALSE)

      return(private$.email_verification)
    },
#' @field email_sent Email send results
    email_sent = function(value){
      if(!missing(value))
        stop("This field is read-only.", call. = FALSE)

      return(private$.email_sent)
    }
  ),
  private = list(
    .config = NULL,
    .email_sent = NULL,
    .email_verification = NULL
  )
)