#' Social
#' 
#' Use social sites for authentication.
#' 
#' @export
FireblazeSocial <- R6::R6Class(
  "FireblazeSocial",
  inherit = Fireblaze,
  public = list(
#' @details Define the scope to request from Google.
#' @param scope Google scope.
    set_scope = function(scope){
      if(missing(scope)) stop("Missing scope", call. = FALSE)

      super$send("google-scope", as.list(scope))

      invisible(self)
    },
#' @details Launch sign in with Google.
#' @param flow Authentication flow, either popup or redirect.
    launch_google = function(flow = c("popup", "redirect")){
      launch_social(super, "google", flow)
      invisible(self)
    },
#' @details Launch sign in with Github.
#' @param flow Authentication flow, either popup or redirect.
    launch_github = function(flow = c("popup", "redirect")){
      launch_social(super, "github", flow)
      invisible(self)
    },
#' @details Launch sign in with Facebook.
#' @param flow Authentication flow, either popup or redirect.
    launch_facebook = function(flow = c("popup", "redirect")){
      launch_social(super, "facebook", flow)
      invisible(self)
    },
#' @details Launch sign in with Facebook.
#' @param flow Authentication flow, either popup or redirect.
    launch_twitter = function(flow = c("popup", "redirect")){
      launch_social(super, "twitter", flow)
      invisible(self)
    }
  )
)
