#' Google
#' 
#' Use Google authentication.
#' 
#' @export
FireblazeGoogle <- R6::R6Class(
  "FireblazeGoogle",
  inherit = Fireblaze,
  public = list(
#' @details Define the scope to request from Google.
#' @param scope Google scope.
    set_scope = function(scope){
      if(missing(scope)) stop("Missing scope", call. = FALSE)

      super$send("google-scope", as.list(scope))

      invisible(self)
    },
#' @details Launch sign in.
#' @param flow Authentication flow, either popup or redirect.
    launch = function(flow = c("popup", "redirect")){
      flow <- match.arg(flow)

      if(flow == "popup") 
        super$send("google-sign-in-popup", list())
      else
        super$send("google-sign-in-redirect", list())

      invisible(self)
    }
  )
)
