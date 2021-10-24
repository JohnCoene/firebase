#' Phone
#' 
#' @noRd 
#' @keywords internal
FirebasePhone <- R6::R6Class(
	"FirebasePhone",
	inherit = Firebase,
	public = list(
		verify = function(number) {
			if(missing(number))
				stop("Missing `number`")

      super$send(
				"phone-verify", 
				list(
					id = "firebase-recaptcha",
					number = number
				)
			)
		},
		confirm = function(code) {
			if(missing(code))
				stop("Missing `code`")

      super$send(
				"phone-confirm", 
				list(
					code = code
				)
			)

			invisible(self)
		},
    get_verification = function(){
      super$get_input("phone_verification")
    },
    get_confirmation = function(){
      super$get_input("phone_confirmation")
    }
	)
)

#' Recaptcha
#' 
#' Add the recaptcha, require for the `FirebasePhone`
#' class.
#' 
#' @param ns Namespace, optional, only required if using
#' this function in multiple places.
#' 
#' @name recapta
#' @export 
recaptchaUI <- function(ns = function(x) {x}){
  div(
    id = ns("firebase-recaptcha")
  ) 
}
