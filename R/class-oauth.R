#' OAuth Providers
#' 
#' Use OAuth provides such as Github or Facebook to allow users to conveniently sign in.
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
  inherit = Firebase,
  public = list(
#' @details Define provider to use
#' @param provider The provider to user, e.g.: \code{microsoft.com}, \code{yahoo.com} or \code{google.com}.
#' @return self
    set_provider = function(provider){
      if(missing(provider))
        stop("Missing provider", call. = FALSE)

      super$send("set-oauth-provider", list(id = super$unique_id, provider = provider))

      private$.provider <- provider
      invisible(self)
    },
#' @details Launch sign in with Google.
#' @param flow Authentication flow, either popup or redirect.
#' @return self
    launch = function(flow = c("popup", "redirect")){
      private$launch_oauth(match.arg(flow))
      invisible(self)
    }
  ),
  private = list(
    .provider = NULL,
    launch_oauth = function(flow = c("popup", "redirect")){
      call <- paste0("oauth-sign-in-", flow)
      super$send(call, list(id = super$unique_id))
    }
  )
)