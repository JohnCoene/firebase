#' Firebase
#' 
#' Core Firebase class.
#' 
#' @field session A valid Shiny session.
#' 
#' @export 
Firebase <- R6::R6Class(
	"Firebase",
	public = list(
    session = NULL,
#' @details Initialise Firebase
#' 
#' Initialises the Firebase application client-side.
#' 
#' @param config_path Path to the configuration file as created by \code{\link{firebase_config}}.
#' @param session A valid shiny session.
#' 
#' @return Invisibly return the class.
		initialize = function(
      config_path = "firebase.rds",
			session = shiny::getDefaultReactiveDomain()
		){

			conf <- read_config(config_path)
      self$session <- session
      private$.unique_id <- create_unique_id()
      private$.conf <- conf
      private$.project_id <- conf$projectId

      # namespace
      private$.namespace(session)
			private$.send(
				"initialize-core",
        conf = conf
			)
		},
#' @details Expose App
#' 
#' Expose the `firebaseApp` object product of `initializeApp()` by
#' attaching it to the `window`: access it with `window.firebaseApp`.
    expose_app = function() {
      private$.send("expose-app")
      invisible(self)
    },
#' @details Print the class
    print = function(){
      rule("Firebase")
    }
	),
	private = list(
    send = function(func, msg = list()){
      func <- paste0("fireblaze-", func)
      msg$ns <- private$.ns
      self$session$sendCustomMessage(func, msg)
    },
    .send = function(func, ...){
      func <- paste0("fireblaze-", func)
			msg <- list(
				ns = private$.ns,
				...
			)
      self$session$sendCustomMessage(func, msg)
    },
    .render_deps = function(deps){
      private$.send('render-dependencies', deps = deps)
    },
    get_input = function(name){
      name <- paste0("fireblaze_", name)
      self$session[["input"]][[name]]
    },
    .namespace = function(session){
      ns <- session$ns(NULL)
      if(length(ns) > 0 && ns != "")
        ns <- paste0(ns, "-")
      private$.ns <- ns
    },
    get_project_id = function() {
      return(invisible(private$.project_id))
    },
		.unique_id = NULL,
		.ns = "",
		.project_id = NULL,
		.conf = list()
	)
)