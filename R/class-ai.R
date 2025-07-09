#' Firebase AI
#'
#' @export
FirebaseAI <- R6::R6Class(
  "FirebaseAI",
  public = list(
    #' @field session Shiny session
    session = NULL,
    #' @description
    #' Initialize Firebase AI
    #' @param session Shiny session
    initialize = function(session = shiny::getDefaultReactiveDomain()) {
      self$session <- session
      invisible(self)
    },
    #' @description
    #' Send a prompt to the AI
    #' @param id The id of the input to store the response in.
    #' @param prompt The prompt to send to the AI.
    chat = function(id, prompt) {
      self$session$sendCustomMessage(
        "fireblaze-ai-chat",
        list(
          id = id,
          prompt = prompt
        )
      )
    }
  )
)

