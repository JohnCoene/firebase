#' Dependenceis
#' 
#' Include dependencies in your Shiny application. This \emph{must} be included in every project.
#' 
#' @importFrom shiny tags singleton
#' 
#' @export 
use_fireblaze <- function(){
  singleton(
    tags$body(
      tags$script(defer = NA, src = "firebase/js/firebase-app.js"),
      tags$script(defer = NA, src = "firebase/js/firebase-analytics.js"),
      tags$script(defer = NA, src = "firebase/js/firebase-auth.js"),
      tags$script(defer = NA, src = "firebase/js/firebase-firestore.js"),
      tags$script(src = "fireblaze/core.js")
    )
  )
}