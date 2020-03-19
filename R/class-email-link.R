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
      config <- list(url = url, dynamicLinkDomain = dynamic_domain, ...)
      private$.config <- config
      invisible(self)
    },
#' @details Send email verification link.
#' @param email Email to send verification to.
    send = function(email){
      if(missing(email)) stop("Missing email", call. = FALSE)
      if(is.null(private$config)) stop("Missing config, see `config` method", call. = FALSE)

      msg <- list(
        email = email,
        config = private$.config
      )

      super$send("send-email-link", msg)
      invisible(self)
    },
#' @details Get Whether email verification was correctly sent.
    get_email_sent = function(){
      email_sent <- super$get_input("email_link_sent")
      private$.email_sent <- email_sent
      return(email_sent)
    }
  ),
  private = list(
    .config = NULL,
    .email_sent = NULL
  )
)