#' Dependencies
#' 
#' Include dependencies in your Shiny application. 
#' \code{use_firebase} \emph{must} be included in 
#' every application.
#' 
#' @param analytics Whether to include analytics.
#' @param firestore Whether to include firestore.
#' @param container Whether to include the container that
#' wraps the pre-built UI. If set to \code{FALSE} then
#' one must use \code{firebaseUIContainer} where said
#' pre-built UI is required.
#' 
#' @details Place \code{useFirebaseUI} \emph{where} you want
#' the pre-built UI to be placed. Otherwise one
#' 
#' @section Functions: 
#' \itemize{
#'  \item{\code{useFirebase} Is required for every app that uses this package}
#'  \item{\code{useFirebaseUI} Is required for applications that use \code{\link{FirebaseUI}}}
#'  \item{\code{firebaseUIContainer} To place the container of the pre-built UI where desired}
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
      tags$script(src = "fireblaze/oauth.js"),
      # if(firestore) tags$script(src = "fireblaze/store.js"),
      tags$script(src = "fireblaze/phone.js")
    )
  )
}

#' @export
#' @rdname dependencies
useFirebaseUI <- function(container = TRUE){
  # dependencies plus signin container
  deps <- singleton(
    tags$head(
      tags$script(src = "fireblaze/ui-utils.js"),
      tags$script(src = "firebase-ui/js/firebase-ui.js"),
      tags$link(
        type = "text/css",
        rel = "stylesheet",
        href = "firebase-ui/css/firebase-ui.css"
      )
    )
  )

  if(!container)
    return(deps)

  tagList(
    deps,
    div(id = "fireblaze-signin-ui")
  )
}

#' @export
#' @rdname dependencies
firebaseUIContainer <- function(){
  div(id = "fireblaze-signin-ui")
}
