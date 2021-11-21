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
    src = "packer",
    package = "firebase",
    script = c(
      "runtime.js",
      "auth.js",
      "utilities.js",
      "core.js"
    )
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

firebase_dep_analytics <- function(){
  htmlDependency(
    "firebase-analytics",
    utils::packageVersion("firebase"),
    src = c(href = "firebase-assets"),
    script = "analytics.js"
  )
}

firebase_dep_email_link <- function(){
  htmlDependency(
    "firebase-email-link",
    utils::packageVersion("firebase"),
    src = c(href = "firebase-assets"),
    script = "email-link.js"
  )
}

firebase_dep_email_password <- function(){
  htmlDependency(
    "firebase-email-password",
    utils::packageVersion("firebase"),
    src = c(href = "firebase-assets"),
    script = "email-password.js"
  )
}

firebase_dep_oauth <- function(){
  htmlDependency(
    "firebase-oauth",
    utils::packageVersion("firebase"),
    src = c(href = "firebase-assets"),
    script = "oauth.js"
  )
}

firebase_dep_phone <- function(){
  htmlDependency(
    "firebase-phone",
    utils::packageVersion("firebase"),
    src = c(href = "firebase-assets"),
    script = "phone.js"
  )
}

firebase_dep_social <- function(){
  htmlDependency(
    "firebase-social",
    utils::packageVersion("firebase"),
    src = c(href = "firebase-assets"),
    script = "social.js"
  )
}

firebase_dep_storage <- function(){
  htmlDependency(
    "firebase-storage",
    utils::packageVersion("firebase"),
    src = c(href = "firebase-assets"),
    script = "storage.js"
  )
}

firebase_dep_ui <- function(){
  htmlDependency(
    "firebase-ui",
    utils::packageVersion("firebase"),
    src = c(href = "firebase-assets"),
    script = "ui.js"
  )
}

firebase_dep_real_time <- function(){
  htmlDependency(
    "firebase-real-time",
    utils::packageVersion("firebase"),
    src = c(href = "firebase-assets"),
    script = "real-time.js"
  )
}

shiny::addResourcePath(
  "firebase-assets",
  system.file("packer", package = "firebase")
)
