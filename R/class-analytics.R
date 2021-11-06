#' Analytics
#' 
#' @export 
Analytics <- R6::R6Class(
	"Analytics",
	inherit = Firebase,
	public = list(
#' @details Initialise
#' 
#' Initialise an analytics object.
#' 
#' @param enable Whether to internally enable analytics
#' see `launch` method.
		initialize = function(enable = TRUE){
			super$initialize()
			private$.enabled <- FALSE
		},
#' @details Launch
#' 
#' Launch the analytics tracking.
#' Note that analytics is not launched by the
#' constructor in order to be able to enable
#' or disable the tracking prior to the launch.
#' This is because once Google Analytics is 
#' launched it cannot be disabled. If needed
#' ask the user before running this method.
#' The enabling and disabling of tracking provided
#' by the package is only internal, e.g.: disabling
#' tracking during a session will stop the `log_event`
#' method from registering event but default Google
#' Analytics will still be running.
		launch = function() {
			if(!private$.enabled)
				return(self)

			super$.send("initialize-analytics")
		},
#' @details Enable Tracking
#' Internally enables tracking.
		enable = function(){
			private$.enabled <- TRUE
		},
#' @details Disable Tracking
#' Internally disables tracking: running methods
#' from this instance of the class will not actually
#' register with Google Analytics.
		disable = function() {
			private$.enabled <- FALSE
		},
#' @details Log Event
#' 
#' Log an event.
#' 
#' @param event Event to log choose from 
#' [this list](https://support.google.com/analytics/answer/9234069)
#' of supported events.
#' @param params Event parameters.
		log_event = function(event, params = NULL) {
			if(!private$.enabled)
				return(self)

			if(missing(event))
				stop("Missing `event`")

			super$.send(
				"log-event",
				event = event,
				params = params
			)

			invisible(self)
		},
#' @details Set user properties
#' 
#' @param ... Named arguments defining the properties of the user.
		set_user_properties = function(...){
			if(!private$.enabled)
				return(self)

			props <- list(...)
			if(!length(props))
				stop("Must pass named properties")

			nms <- names(props)
			if("" %in% nms)
				stop("Must pass named options")

			if(c("Age", "Gender", "Interest") %in% nms)
				stop("Cannot use `Age`, `Gender`, or `Interest` properties, they are reserved")

			super$.send(
				"set-user-properties",
				props = as.list(props)
			)

			invisible(self)
		}
	),
	private = list(
		.enabled = TRUE
	)
)