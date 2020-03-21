#' Dependencies
#' 
#' Include dependencies in your Shiny application. 
#' \code{use_fireblaze} \emph{must} be included in 
#' every application.
#' 
#' @param analytics Whether to include analytics.
#' @param firestore Whether to include firestore.
#' 
#' @section Functions: 
#' \itemize{
#'  \item{\code{use_fireblaze} Is required for every app that uses this package}
#'  \item{\code{use_fireblaze_ui} Is required for applications that use \code{\link{FireblazeUI}}}
#' }
#' 
#' @importFrom shiny tags tagList singleton div req
#' 
#' @name dependencies
#' 
#' @export 
use_fireblaze <- function(analytics = TRUE, firestore = FALSE){
  singleton(
    tags$head(
      tags$link(type = "text/css", rel = "stylesheet", href = "fireblaze/style.css"),
      tags$script(src = "firebase/js/firebase-app.js"),
      tags$script(src = "firebase/js/firebase-auth.js"),
      if(analytics) tags$script(src = "firebase/js/firebase-analytics.js"),
      if(firestore) tags$script(src = "firebase/js/firebase-firestore.js"),
      tags$script(src = "fireblaze/core-utils.js"),
      tags$script(src = "fireblaze/core.js"),
      tags$script(src = "fireblaze/email-password.js"),
      tags$script(src = "fireblaze/email-link.js"),
      tags$script(src = "fireblaze/providers.js")
    )
  )
}

#' @export
#' @rdname dependencies
fireblaze_signin_ui <- function(){
  # dependencies plus signin container
  tagList(
    singleton(
      tags$head(
        tags$script(src = "fireblaze/ui-utils.js"),
        tags$script(src = "firebase-ui/js/firebase-ui.js"),
        tags$link(
          type = "text/css",
          rel = "stylesheet",
          href = "firebase-ui/css/firebase-ui.css"
        )
      )
    ),
    div(id = "fireblaze-signin-ui")
  )
}

