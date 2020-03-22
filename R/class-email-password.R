#' Email & Password
#' 
#' Use fireblaze to manage authentications.
#' 
#' @export
FirebaseEmailPassword <- R6::R6Class(
  "FirebaseEmailPassword",
  inherit = Firebase,
  public = list(
#' @details Sign in with create
#' 
#' @param email,password Credentials as entered by the user.
#' 
#' @return \code{NULL} if successful, the error otherwise.
    create = function(email, password){
      # prepare message
      msg <- list(email = email, password = password)

      # Signin
      super$send("create-email-password", msg)

      results <- super$get_input("create_email_password")
      
      return(results)
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
      super$get_signed_in()

      # catch error
      results <- super$get_input("signin_email_password")
      
      invisible(results$response)
    },
#' @details Get account creation results
    get_created = function(){
      created <- super$get_input("created_email_user")
      private$.created <- created
      return(created)
    },
#' @details Reset user password
#' @param email Email to send reset link to, if missing looks for current logged in user's email
    reset_password = function(email = NULL){
      if(is.null(email))
        email <- private$.user_signed_in$user$email

      if(is.null(email))
        stop("Not user signed in, must specify `email`")

      super$send("reset-email", list(email = email))

      invisible(self)
    },
#' @details Get whether password reset email was successfully sent 
    get_reset = function(){
      super$get_input("reset_email_sent")
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