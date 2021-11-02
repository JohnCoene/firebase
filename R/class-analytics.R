#' Analytics
#' 
#' @export 
Analytics <- R6::R6Class(
	"Analytics",
	inherit = Firebase,
	public = list(
		intitialize = function(){
			super$intitialize()
			super$.send("initialize-analytics")
		},
		log_event = function(event) {
			if(missing(event))
				stop("Missing `event`")

			super$.send(
				"log-event",
				event = event
			)
		}
	)
)