#' Phone
#' 
FirebasePhone <- R6::R6Class(
	"FirebasePhone",
	inherit = Firebase,
	public = list(
		verify = function(number) {
      super$send(
				"set-captcha", 
				list(
					id = "firebase-recaptcha",
					number = number
				)
			)
		}
	)
)