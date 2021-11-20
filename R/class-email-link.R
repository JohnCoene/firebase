#' Email Link
#' 
#' Sign in the user by emailing them a link.
#' 
#' @examples
#' library(shiny)
#' library(firebase)
#' 
#' options(shiny.port = 3000) 
#' 
#' ui <- fluidPage(
#'   useFirebase(),
#'   textInput("email", "Your email"),
#'   actionButton("submit", "Submit")
#' )
#' 
#' server <- function(input, output){
#' 
#'   f <- FirebaseEmailLink$
#'     new()$
#'     config(url = "http://127.0.0.1:3000")
#' 
#'   observeEvent(input$submit, {
#'     if(input$email == "")
#'       return()
#'     
#'     f$send(input$email)
#'   })
#' 
#'   observeEvent(f$get_email_sent(), {
#'     sent <- f$get_email_sent()
#' 
#'     if(sent$success)
#'       showNotification("Email sent", type = "message")
#'   })
#' 
#'   observeEvent(f$get_email_verification(), {
#'     print(f$get_email_verification())
#'   })
#' 
#' }
#' 
#' \dontrun{shinyApp(ui, server)}
#' 
#' @export
FirebaseEmailLink <- R6::R6Class(
  "FirebaseEmailLink",
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
        list(firebase_dep_email_link())
      )
		},
#' @details Configure
#' @param url The link is handled in the web action widgets, 
#' this is the deep link in the continueUrl query parameter. 
#' Likely, your shiny application link.
#' @param ... Any other parameter from the 
#' \href{https://firebase.google.com/docs/auth/web/passing-state-in-email-actions?authuser=0#passing_statecontinue_url_in_email_actions}{official documentation}.
#' 
#' @examples
#' \dontrun{
#' f <- FirebaseEmailLink$
#'  new()$ # create
#'  config(url = "https://me.shinyapps.io/myApp/")
#' }
    config = function(url, ...){
      if(missing(url)) stop("Missing url", call. = FALSE)
      config <- list(handleCodeInApp = TRUE, url = url, ...)
      private$.config <- config
      invisible(self)
    },
#' @details Send email verification link.
#' @param email Email to send verification to.
#' 
#' @examples
#' \dontrun{
#' f <- FirebaseEmailLink$
#'  new()$ # create
#'  config(url = "https://me.shinyapps.io/myApp/")$
#'  send("user@@email.com")
#' }
#' 
#' @return self
    send_email = function(email){
      if(missing(email)) stop("Missing email", call. = FALSE)

      super$.send(
        "send-email-link", 
        email = email, 
        config = private$.config
      )
      invisible(self)
    },
#' @details Get whether email verification was correctly sent.
#' @return A list of length 2 containing \code{success} a boolean
#' indicating wherther sending the email was successful and \code{response}
#' containing the email used to sign in or the error if sending failed.
    get_email_sent = function(){
      email_sent <- super$get_input("email_link_sent")
      private$.email_sent <- email_sent
      return(email_sent)
    },
#' @details Get whether user is signing in from email verification.
#' 
#' @note Other methods to pick up whether user signs in still apply. This
#' is for added security measures.
#' 
#' @return A list of length 2 containing \code{success} a boolean
#' indicating wherther signing in from the verification link was successful and \code{response}
#' containing the result of the sign in or the error if signing in failed.
    get_email_verification = function(){
      verification <- super$get_input("email_verification")
      private$.email_verification <- verification
      return(verification)
    }
  ),
  active = list(
#' @field email_verification Email verification results
    email_verification = function(value){
      if(!missing(value))
        stop("This field is read-only.", call. = FALSE)

      return(private$.email_verification)
    },
#' @field email_sent Email send results
    email_sent = function(value){
      if(!missing(value))
        stop("This field is read-only.", call. = FALSE)

      return(private$.email_sent)
    }
  ),
  private = list(
    .config = list(handleCodeInApp = TRUE),
    .email_sent = NULL,
    .email_verification = NULL
  )
)