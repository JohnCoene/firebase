#' Fireblaze
#' 
#' Use fireblaze to manage authentications.
#' 
#' @field session A valid Shiny session.
#' 
#' @keywords internal
Fireblaze <- R6::R6Class(
  "Fireblaze",
  public = list(
    session = NULL,
#' @details Initialise Fireblaze
#' 
#' @param config_path Path to the configuration file as created by \code{\link{create_config}}.
#' @param session A valid shiny session.
#' @param persistence How the auth should persit: \code{none}, the user has to sign in at every visit,
#' \code{session} will only persist in current tab, \code{local} persist even when window is closed.
    initialize = function(persistence = c("session", "none", "local"), config_path = "fireblaze.rds", session = shiny::getDefaultReactiveDomain()){
      # check that config is present
      config_exists(config_path)

      self$session <- session

      conf <- read_config(config_path)
      msg <- list(
        conf = conf,
        persistence = match.arg(persistence)
      )
      private$send("initialize", msg)
    },
#' @details Signs user out
    sign_out = function(){
      super$send("signout")$response
    }
  ),
  private = list(
    send = function(func, msg = list()){
      func <- paste0("fireblaze-", func)
      self$session$sendCustomMessage(func, msg)
    },
    get_input = function(name){
      name <- paste0("fireblaze_", name)
      self$session[["input"]][[name]]
    }
  )
)