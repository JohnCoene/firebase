#' Social
#' 
#' Use social sites for authentication.
#' 
#' @return An object of class \code{FirebaseSocial}.
#' 
#' @examples 
#' library(shiny)
#' library(firebase)
#' 
#' # define signin
#' signin <- modalDialog(
#'   title = "Login",
#'   actionButton("google", "Google", icon = icon("google"), class = "btn-danger"),
#'   actionButton("github", "Github", icon = icon("github")),
#'   footer = NULL
#' )
#' 
#' ui <- fluidPage(
#'   useFirebase()
#' )
#' 
#' server <- function(input, output) {
#'   showModal(signin)
#' 
#'   f <- FirebaseSocial$new()
#' 
#'   observeEvent(input$google, {
#'     f$launch_google()
#'   })
#' 
#'   observeEvent(input$github, {
#'     f$launch_github()
#'   })
#' }
#' 
#' \dontrun{shinyApp(ui, server)}
#' 
#' @export
FirebaseSocial <- R6::R6Class(
  "FirebaseSocial",
  inherit = FirebaseAuth,
  public = list(
#' @details Initialiases Firebase Social
#' 
#' Initialises the Firebase application client-side.
#' 
#' @param config_path Path to the configuration file as created by \code{\link{firebase_config}}.
#' @param session A valid shiny session.
#' @param persistence How the auth should persit: \code{none}, the user has to sign in at every visit,
#' \code{session} will only persist in current tab, \code{local} persist even when window is closed.
#' @param language_code Sets the language to use for the UI.
#' Supported languages are listed [here](https://github.com/firebase/firebaseui-web/blob/master/LANGUAGES.md).
#' Set to `browser` to use the default browser language of the user.
    initialize = function(
      persistence = c("session", "local", "memory"), 
      config_path = "firebase.rds", 
      language_code = NULL,
      session = shiny::getDefaultReactiveDomain()
    ){
      super$initialize(
        persistence, 
        config_path, 
        language_code,
        session
      )
      super$.render_deps(
        list(firebase_dep_social())
      )
    },
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
