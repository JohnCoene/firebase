#' Phone
#' 
#' @noRd 
#' @keywords internal
FirebasePhone <- R6::R6Class(
	"FirebasePhone",
	inherit = Firebase,
	public = list(
#' @details Verify a phhone number
#' @param number Phone number of the user.
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
#' @details Confirm a code
#' @param code Confirmation code received by the user.
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
#' @details Get Verification
#' @return A list with a boolean (`success`) indicating
#' whether the operation was successful and a `response`
#' contianing the response from Firebase.
    get_verification = function(){
      super$get_input("phone_verification")
    },
#' @details Get Confirmation
#' @return A list with a boolean (`success`) indicating
#' whether the operation was successful and a `response`
#' contianing the response from Firebase.
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
