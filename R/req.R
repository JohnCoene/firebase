#' Requires Signin
#' 
#' Define UI element that require the user to be signed in. This
#' will hide them \emph{viusally} until the user signs in.
#' Note that this is not secure as someone can easily change the 
#' CSS when visiting the page to reveal those elements.
#' 
#' @param ... Any valid \link[shiny]{tags}.
#' 
#' @seealso \code{\link{reqSignout}}
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

#' Requires Signout
#' 
#' Define UI element that requires \emph{no} user to be signed in. This
#' will hide them \emph{viusally} if no user is signed in.
#' Note that this is not secure as someone can easily change the 
#' CSS when visiting the page to reveal those elements.
#' 
#' @param ... Any valid \link[shiny]{tags}.
#' 
#' @seealso \code{\link{reqSignin}}
#' 
#' @export
reqSignout <- function(...) {
  tags <- list(...)

  warning("`reqSignin` is not secure, see documentation", call. = FALSE)

  if (length(tags) == 1 && inherits(tags[[1]], "shiny.tag")) {
    tags[[1]] <-
      shiny::tagAppendAttributes(
        tags[[1]],
        class = "fireblaze__requires__signout fireblaze__hidden"
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