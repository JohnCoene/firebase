#' Dependencies
#' 
#' Include dependencies in your Shiny application. 
#' This \emph{must} be included at the \emph{bottom} the application.
#' 
#' @param ui Wehther to include the UI, this is not required if
#' signing in programatically using email and password.
#' @param analytics Whether to include analytics.
#' @param firestore Whether to include firestore.
#' 
#' @importFrom shiny tags tagList singleton div
#' 
#' @export 
use_fireblaze <- function(ui = TRUE, analytics = TRUE, firestore = FALSE){
  base <- singleton(
    tags$head(
      tags$script(src = "firebase/js/firebase-app.js"),
      tags$script(src = "firebase/js/firebase-auth.js"),
      if(analytics) tags$script(src = "firebase/js/firebase-analytics.js"),
      if(firestore) tags$script(src = "firebase/js/firebase-firestore.js"),
      tags$script(src = "fireblaze/core.js"),
      tags$script(src = "fireblaze/email-password.js")
    )
  )

  if(ui){
    ui <- fireblaze_signin_ui()
    base <- shiny::tagAppendChild(base, ui)
  }

  return(base)
}

#' Interface
#' 
#' @keywords internal
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

