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
    create = function(email, password){
      # prepare message
      msg <- list(email = email, password = password)

      # Signin
      private$send("create-email-password", msg)

      # catch error
      results <- super$get_input("create_email_password")

      if(results$success == FALSE)
        cli::cli_alert_danger("Create error")
      
      invisible(results$response)
    },
#' @details Sign in with email
#' 
#' @param email,password Credentials as entered by the user.
    sign_in = function(email, password){
      # prepare message
      msg <- list(email = email, password = password)

      # Signin
      private$send("signin-email-password", msg)

      # catch error
      results <- super$get_input("signin_email_password")

      if(results$success == FALSE)
        cli::cli_alert_danger("Sign in error")
      
      invisible(results$response)
    }
  )
)