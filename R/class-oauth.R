#' OAuth Providers
#' 
#' Use OAuth provides such as Github or Facebook to allow users to conveniently sign in.
#' 
#' @return An object of class \code{FirebaseOauthProviders}.
#' 
#' @examples 
#' library(shiny)
#' library(firebase)
#' 
#' ui <- fluidPage(
#'   useFirebase(),
#'   actionButton("signin", "Sign in with Microsoft", icon = icon("microsoft")),
#'   plotOutput("plot")
#' )
#' 
#' server <- function(input, output, session){
#'   f <- FirebaseOauthProviders$
#'     new()$
#'     set_provider("microsoft.com")
#' 
#'   observeEvent(input$signin, {
#'     f$launch()
#'   })
#' 
#'   output$plot <- renderPlot({
#'     f$req_sign_in()
#'     plot(cars)
#'   })
#'   
#' }
#' 
#' \dontrun{shinyApp(ui, server)}
#' 
#' @export 
FirebaseOauthProviders <- R6::R6Class(
  "FirebaseOauthProviders",
  inherit = FirebaseAuth,
  public = list(
#' @details Initialiases Firebase Email Link
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
        list(firebase_dep_oauth())
      )
		},
#' @details Define provider to use
#' @param provider The provider to user, e.g.: \code{microsoft.com}, \code{yahoo.com} or \code{google.com}.
#' @param ... Additional options to pass to [setCustomParameters](https://github.com/firebase/snippets-web/blob/69c85abdc7cd6990618720cd33aa0d1ee357c652/snippets/auth-next/microsoft-oauth/auth_msft_provider_params.js#L8-L13).
#' @return self
    set_provider = function(provider, ...){
      if(missing(provider))
        stop("Missing provider", call. = FALSE)

      super$send(
        "set-oauth-provider", 
        list(
          id = super$.unique_id, 
          provider = provider,
          opts = list(...)
        )
      )

      private$.provider <- provider
      invisible(self)
    },
#' @details Launch sign in with Google.
#' @param flow Authentication flow, either popup or redirect.
#' @param get_credentials Whether to extract underlying oauth credentials.
#' @return self
    launch = function(flow = c("popup", "redirect"), get_credentials = FALSE){
      private$launch_oauth(match.arg(flow), get_credentials = get_credentials)
      invisible(self)
    }
  ),
  private = list(
    .provider = NULL,
    launch_oauth = function(flow = c("popup", "redirect"), get_credentials = FALSE){
      call <- paste0("oauth-sign-in-", flow)
      super$send(call, list(id = super$.unique_id, credentials = get_credentials))
    }
  )
)
