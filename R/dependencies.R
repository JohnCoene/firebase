#' Dependencies
#' 
#' Include dependencies in your Shiny application. 
#' \code{use_firebase} \emph{must} be included in 
#' every application.
#' 
#' @param analytics Whether to include analytics.
#' @param firestore Whether to include firestore.
#' 
#' @section Functions: 
#' \itemize{
#'  \item{\code{useFirebase} Is required for every app that uses this package}
#'  \item{\code{useFirebaseUI} Is required for applications that use \code{\link{FirebaseUI}}}
#' }
#' 
#' @importFrom shiny tags tagList singleton div req
#' 
#' @name dependencies
#' 
#' @export 
useFirebase <- function(analytics = FALSE, firestore = FALSE){
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
      tags$script(src = "fireblaze/social.js"),
      tags$script(src = "fireblaze/oauth.js")
    )
  )
}

#' @export
#' @rdname dependencies
useFirebaseUI <- function(){
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
