#' Dependencies
#' 
#' Include dependencies in your Shiny application. 
#' \code{use_firebase} \emph{must} be included in 
#' every application.
#' 
#' @param analytics Deprecated. Whether to include analytics.
#' @param firestore Whether to include firestore.
#' @param ... Ignored, for backwards compatibility.
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
#' @importFrom htmltools htmlDependency
#' 
#' @name dependencies
#' 
#' @export 
useFirebase <- function(analytics = FALSE, firestore = FALSE){
  if(any(analytics, firestore))
    .Deprecated(
      "analytics and firestore",
      package = "firebase",
      msg = "analytics and firestore arguments are deprecated"
    )

  htmlDependency(
    "firebase",
    utils::packageVersion("firebase"),
    src = ".",
    package = "firebase",
    script = "index.js"
  )
}

#' @export
#' @rdname dependencies
useFirebaseUI <- function(...){
  .Deprecated(
    "firebaseUIContainer",
    "firebase",
    msg = "Use `firebaseUIContainer` where you want the pre-built UI to be placed"
  )
  div(id = "fireblaze-signin-ui")
}

#' @export
#' @rdname dependencies
firebaseUIContainer <- function(){
  div(id = "fireblaze-signin-ui")
}
