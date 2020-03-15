#' Interface
#' 
#' @param hidden Whether the UI is initialised shown or hidden.
#' 
#' @export
fireblaze_signin_ui <- function(hidden = FALSE){

  # style
  style <- "display:block;"
  if(hidden)
    style <- "display:none;"

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
    div(id = "fireblaze-signin-ui", style = style)
  )
}
