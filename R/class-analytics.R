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
		initialize = function(){
			super$initialize()
			super$.send("initialize-analytics")
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
	)
)