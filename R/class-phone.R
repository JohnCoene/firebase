#' Phone
#' 
#' Use mobile phone numbers to authenticate users.
#' 
#' @export
FirebasePhone <- R6::R6Class(
	"FirebasePhone",
	inherit = FirebaseAuth,
	public = list(
#' @details Verify a phhone number
#' @param number Phone number of the user.
#' @param id Id of the button that triggers verification.
#' If this is `NULL` the user has to go through the recaptcha,
#' if not `NULL` is invisible.
		verify = function(number, id = NULL) {
			if(missing(number))
				stop("Missing `number`")

			id <- ifelse(is.null(id), "firebase-recaptcha", id)

      super$.send(
				"phone-verify", 
				id = id,
				number = number
			)
		},
#' @details Results from the recaptcha
		get_recaptcha = function(){
      super$get_input("phone_recaptcha")
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
#' @name recaptcha
#' @export 
recaptchaUI <- function(ns = function(x) {x}){
  div(
    id = ns("firebase-recaptcha")
  ) 
}
