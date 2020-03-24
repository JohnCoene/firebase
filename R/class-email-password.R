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
    },
#' @details Send the user a verification email
    send_verification_email = function(){
      private$send("send-verification-email")
      invisible(self)
    },
#' @details Get result of verification email sending procedure
    get_verification_email = function(){
      private$get_input("verification_email_sent")
      invisible(self)
    },
#' @details Set user password
#' 
#' Useful to provide ability to change password.
#' 
#' @param password The authenticated user password, the user should be prompted 
#' to enter it.
    set_password = function(password){
      super$send("set-password", list(password = password))
    },
#' @details Get response from set_password
    get_password = function(){
      super$get_input("set_password")
    },
#' @details Re-authenticate the user.
#' 
#' Some security-sensitive actions—such as deleting an account, setting a 
#' primary email address, and changing a password—require that the user has 
#' recently signed in. If you perform one of these actions, and the user signed 
#' in too long ago, the action fails with an error. 
#' 
#' @param password The authenticated user password, the user should be prompted 
#' to enter it.
    re_authenticate = function(password){
      super$send("re-authenticate", list(password = password))
    },
#' @details Get response from re_authenticate
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