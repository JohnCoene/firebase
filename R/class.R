#' Fireblaze
#' 
#' Use fireblaze to manage authentications.
#' 
#' @field session A valid Shiny session.
#' 
#' @export
Fireblaze <- R6::R6Class(
  "Fireblaze",
  public = list(
    session = NULL,
#' @details Initialise Fireblaze
#' 
#' @param config_path Path to the configuration file as created by \code{\link{create_config}}.
#' @param session A valid shiny session.
    initialize = function(config_path = "fireblaze.rds", session = shiny::getDefaultReactiveDomain()){
      # check that config is present
      config_exists(config_path)

      self$session <- session

      conf <- read_config(config_path)
      private$send("initialize", conf)
    }
  ),
  private = list(
    send = function(func, msg = list()){
      func <- paste0("fireblaze-", func)
      self$session$sendCustomMessage(func, msg)
    }
  )
)