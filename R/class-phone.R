#' Phone
#' 
#' Use mobile phone numbers to authenticate users.
#' 
#' @return An object of class \code{FirebasePhone}.
#' 
#' @export
FirebasePhone <- R6::R6Class(
	"FirebasePhone",
	inherit = FirebaseAuth,
	public = list(
#' @details Initialiases Firebase Phone
#' 
#' Initialises the Firebase application client-side.
#' 
#' @param config_path Path to the configuration file as created by \code{\link{firebase_config}}.
#' @param session A valid shiny session.
#' @param persistence How the auth should persit: \code{none}, the user has to sign in at every visit,
#' \code{session} will only persist in current tab, \code{local} persist even when window is closed.
#' @param language_code Sets the language to use for the UI.
#' Supported languages are listed [here](https://github.com/firebase/firebaseui-web/blob/master/LANGUAGES.md).
#' Set to `browser` to use the default browser language of the user.
		initialize = function(
      persistence = c("session", "local", "memory"), 
      config_path = "firebase.rds", 
      language_code = NULL,
      session = shiny::getDefaultReactiveDomain()
		){
      super$initialize(
        persistence, 
        config_path, 
        language_code,
        session
      )
      super$.render_deps(
        list(firebase_dep_phone())
      )
		},
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
