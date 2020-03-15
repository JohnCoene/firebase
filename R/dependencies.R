#' Dependencies
#' 
#' Include dependencies in your Shiny application. 
#' This \emph{must} be included at the \emph{bottom} the application.
#' 
#' @importFrom shiny tags tagList singleton div
#' 
#' @export 
use_fireblaze <- function(){
  singleton(
    tags$body(
      tags$script(defer = NA, src = "firebase/js/firebase-app.js"),
      tags$script(defer = NA, src = "firebase/js/firebase-analytics.js"),
      tags$script(defer = NA, src = "firebase/js/firebase-auth.js"),
      tags$script(defer = NA, src = "firebase/js/firebase-firestore.js"),
      tags$script(src = "fireblaze/utils.js"),
      tags$script(src = "fireblaze/core.js")
    )
  )
}