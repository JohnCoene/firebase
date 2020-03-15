#' Dependencies
#' 
#' Include dependencies in your Shiny application. 
#' This \emph{must} be included at the \emph{bottom} the application.
#' 
#' @param analytics Whether to include analytics.
#' @param firestore Whether to include firestore.
#' 
#' @importFrom shiny tags tagList singleton div
#' 
#' @export 
use_fireblaze <- function(analytics = TRUE, firestore = FALSE){
  singleton(
    tags$head(
      tags$script(defer = NA, src = "firebase/js/firebase-app.js"),
      tags$script(defer = NA, src = "firebase/js/firebase-auth.js"),
      if(analytics) tags$script(defer = NA, src = "firebase/js/firebase-analytics.js"),
      if(firestore) tags$script(defer = NA, src = "firebase/js/firebase-firestore.js"),
      tags$script(src = "fireblaze/core.js")
    )
  )
}