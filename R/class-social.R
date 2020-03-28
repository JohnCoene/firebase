#' Social
#' 
#' Use social sites for authentication.
#' 
#' @export
FirebaseSocial <- R6::R6Class(
  "FirebaseSocial",
  inherit = Firebase,
  public = list(
#' @details Define the scope to request from Google.
#' @param scope Google scope.
#' @return self
    set_scope = function(scope){
      if(missing(scope)) stop("Missing scope", call. = FALSE)
      super$send("google-scope", as.list(scope))
      invisible(self)
    },
#' @details Launch sign in with Google.
#' @param flow Authentication flow, either popup or redirect.
#' @return self
    launch_google = function(flow = c("popup", "redirect")){
      private$launch_social("google", match.arg(flow))
      invisible(self)
    },
#' @details Launch sign in with Github.
#' @param flow Authentication flow, either popup or redirect.
#' @return self
    launch_github = function(flow = c("popup", "redirect")){
      private$launch_social("github", match.arg(flow))
      invisible(self)
    },
#' @details Launch sign in with Facebook.
#' @param flow Authentication flow, either popup or redirect.
#' @return self
    launch_facebook = function(flow = c("popup", "redirect")){
      private$launch_social("facebook", match.arg(flow))
      invisible(self)
    },
#' @details Launch sign in with Facebook.
#' @param flow Authentication flow, either popup or redirect.
#' @return self
    launch_twitter = function(flow = c("popup", "redirect")){
      private$launch_social("twitter", match.arg(flow))
      invisible(self)
    }
  ),
  private = list(
    launch_social = function(social, flow = c("popup", "redirect")){
      call <- paste0(social, "-sign-in-", flow)
      super$send(call, list())
    }
  )
)
