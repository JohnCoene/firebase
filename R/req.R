#' Requires Signin
#' 
#' Define UI element that require the user to be signed in. This
#' will hide them \emph{viusally} until the user signs in.
#' Note that this is not secure as someone can easily change the 
#' CSS when visiting the page to reveal those elements.
#' 
#' @param ... Any valid \link[shiny]{tags}.
#' 
#' @export
reqSignin <- function(...) {
  tags <- list(...)

  warning("`reqSignin` is not secure, see documentation", call. = FALSE)

  if (length(tags) == 1 && inherits(tags[[1]], "shiny.tag")) {
    tags[[1]] <-
      shiny::tagAppendAttributes(
        tags[[1]],
        class = "fireblaze__requires__signin fireblaze__hidden"
      )
    return( tags[[1]] )
  } else if (length(tags) == 1 && is.list(tags[[1]])) {
    return( lapply(tags[[1]], reqSignin) )
  } else if (length(tags) > 1) {
    return( lapply(tags, reqSignin) )
  } else {
    stop("Invalid shiny tags", call. = FALSE)
  }
}