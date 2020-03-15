#' Interface
#' 
#' @param hidden Whether the UI is initialised shown or hidden.
#' 
#' @export
fireblaze_signin_ui <- function(hidden = FALSE){
  style <- "display:block;"
  if(hidden)
    style <- "display:none;"

  tagList(
    singleton(
      tags$head(
        tags$script(src = "firebase-ui/js/firebase-ui.js"),
        tags$link(
          type = "text/css",
          rel = "stylesheet",
          href = "firebase-ui/css/firebase-ui.css"
        )
      )
    ),
    div(id = "fireblaze-signin-ui", style = style)
  )
}
