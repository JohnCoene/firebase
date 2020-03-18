#' Fireblaze
#' 
#' Use fireblaze to manage authentications.
#' 
#' @export
FireblazeEmailPassword <- R6::R6Class(
  "FireblazeEmailPassword",
  inherit = Fireblaze,
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
      private$send("create-email-password", msg)
      
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
      private$send("signin-email-password", msg)
      super$get_signed_in()

      # catch error
      results <- super$get_input("signin_email_password")
      
      invisible(results$response)
    }
  )
)