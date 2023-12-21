#' Email & Password
#' 
#' Manage users using email and password.
#' 
#' @return An object of class \code{FirebaseEmailPassword}.
#' 
#' @examples 
#' library(shiny)
#' library(firebase)
#' 
#' # modals
#' register <- modalDialog(
#'   title = "Register",
#'   textInput("email_create", "Your email"),
#'   passwordInput("password_create", "Your password"),
#'   footer = actionButton("create", "Register")
#' )
#' 
#' sign_in <- modalDialog(
#'   title = "Sign in",
#'   textInput("email_signin", "Your email"),
#'   passwordInput("password_signin", "Your password"),
#'   footer = actionButton("signin", "Sign in")
#' )
#' 
#' ui <- fluidPage(
#'   useFirebase(), # import dependencies
#'   actionButton("register_modal", "Register"),
#'   actionButton("signin_modal", "Signin"),
#'   plotOutput("plot")
#' )
#' 
#' server <- function(input, output){
#' 
#'   f <- FirebaseEmailPassword$new()
#' 
#'   # open modals
#'   observeEvent(input$register_modal, {
#'     showModal(register)
#'   })
#' 
#'   observeEvent(input$signin_modal, {
#'     showModal(sign_in)
#'   })
#' 
#'   # create the user
#'   observeEvent(input$create, {
#'     f$create(input$email_create, input$password_create)
#'   })
#' 
#'   # check if creation sucessful
#'   observeEvent(f$get_created(), {
#'     created <- f$get_created()
#'     
#'     if(created$success){
#'       removeModal()
#'       showNotification("Account created!", type = "message")
#'     } else {
#'       showNotification("Error!", type = "error")
#'     }
#' 
#'     # print results to the console
#'     print(created)
#'   })
#' 
#'   observeEvent(input$signin, {
#'     removeModal()
#'     f$sign_in(input$email_signin, input$password_signin)
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
FirebaseEmailPassword <- R6::R6Class(
  "FirebaseEmailPassword",
  inherit = FirebaseAuth,
  public = list(
#' @details Initialiases Firebase Email Password
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
        list(firebase_dep_email_password())
      )
		},
#' @details Create an account
#' 
#' @note Also signs in the user if successful.
#' 
#' @param email,password Credentials as entered by the user.
#' 
#' @return self
    create = function(email, password){
      # prepare message
      msg <- list(email = email, password = password)

      # Signin
      super$send("create-email-password", msg)

      invisible(self)
    },
#' @details Sign in with email
#' 
#' @param email,password Credentials as entered by the user.
#' 
#' @return \code{NULL} if successful, the error otherwise.
    sign_in = function(email, password){
      # prepare message
      msg <- list(email = email, password = password)

      # Signin
      super$send("signin-email-password", msg)
      invisible(self)
    },
#' @details Get account creation results
#' @return A list of length 2 containing \code{success} a boolean
#' indicating wherther creation was successful and \code{response}
#' containing the result of account creation or the error if failed.
    get_created = function(){
      created <- super$get_input("created_email_user")
      private$.created <- created
      return(created)
    },
#' @details Reset user password
#' @param email Email to send reset link to, if missing looks for current logged in user's email.
#' @return self
    reset_password = function(email = NULL){
      if(is.null(email))
        email <- private$.user_signed_in$user$email

      if(is.null(email))
        stop("Not user signed in, must specify `email`")

      super$send("reset-email", list(email = email))

      invisible(self)
    },
#' @details Get whether password reset email was successfully sent 
#' @return A list of length 2 containing \code{success} a boolean
#' indicating whether email reset was successful and \code{response}
#' containing \code{successful} or the error.
    get_reset = function(){
      super$get_input("reset_email_sent")
    },
#' @details Send the user a verification email
#' @return self
    send_verification_email = function(){
      private$send("send-verification-email")
      invisible(self)
    },
#' @details Get result of verification email sending procedure
#' @return A list of length 2 containing \code{success} a boolean
#' indicating whether email verification was successfully sent and \code{response}
#' containing \code{successful} or the error.
    get_verification_email = function(){
      private$get_input("verification_email_sent")
    },
#' @details Set user password
#' 
#' Useful to provide ability to change password.
#' 
#' @param password The authenticated user password, the user should be prompted 
#' to enter it.
#' @return self
    set_password = function(password){
      super$send("set-password", list(password = password))
      invisible(self)
    },
#' @details Get response from set_password
#' @return A list of length 2 containing \code{success} a boolean
#' indicating whether setting password was successfully set and \code{response}
#' containing \code{successful} as string or the error.
    get_password = function(){
      super$get_input("set_password")
    },
#' @details Re-authenticate the user.
#' Some security-sensitive actions—such as deleting an account, setting a 
#' primary email address, and changing a password—require that the user has 
#' recently signed in. If you perform one of these actions, and the user signed 
#' in too long ago, the action fails with an error. 
#' 
#' @param password The authenticated user password, the user should be prompted 
#' to enter it.
#' @return self
    re_authenticate = function(password){
      super$send("re-authenticate", list(password = password))
      invisible(self)
    },
#' @details Get response from re_authenticate
#' @return A list of length 2 containing \code{success} a boolean
#' indicating whether re-authentication was successful and \code{response}
#' containing \code{successful} as string or the error.
    get_re_authenticated = function(){
      super$get_input("re_authenticate")
    }
  ),
  active = list(
#' @field created Results of account creation 
    created = function(value){
      if(!missing(value))
        stop("This field is read-only.", call. = FALSE)

      return(private$created)
    }
  ),
  private = list(
    .created = NULL
  )
)