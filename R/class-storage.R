#' Storage
#' 
Storage <- R6::R6Class(
	"Storage",
	inherit = Firebase,
	public = list(
#' @details Initialiases Firebase Storage
#' 
#' Initialises the Firebase Storage application client-side.
#' 
#' @param config_path Path to the configuration file as created by \code{\link{firebase_config}}.
#' @param session A valid shiny session.
		initialize = function(
      config_path = "firebase.rds", 
      session = shiny::getDefaultReactiveDomain()
		){
      super$initialize(config_path, session)
			super$.send("initialize-storage")
		},
#' @details Reference
#' 
#' Creates a reference to a file or directory you want to operate on.
#' 
#' @param path Path to the file, directory, bucket, or
#' full URL to file.
#' .If `NULL` creates a path to the root.
#' 
#' @return Invisibly return the class instance.
		ref = function(path = NULL) {
			super$.send("storage-ref", path = path)
			invisible(self)
		},
#' @details Upload a File
#' 
#' Upload a file to the store system of bucket.
#' Requires a valid authentication.
#' 
#' @param file Path to the file to upload.
#' @param response A boolean or character string.
#' `TRUE` indicates that you want to capture the
#' results of the file upload (e.g.: success or failed)
#' with `get_response` method. `FALSE` indicates you do
#' not want those results back. A character string is
#' used as named of the response which then can be used
#' in the `get_response` method.
#' 
#' @examples 
#' \dontrun{
#' s <- Storage$new()
#' 
#' # default response
#' s$
#'   ref("test.png")$
#'   upload_file("path/to/file.png")
#' 
#' observeEvent(s$get_response() {
#'   # do something
#' })
#' 
#' # named response
#' s$
#'   ref("test.png")$
#'   upload_file("path/to/file.png", response = "fl")
#' 
#' observeEvent(s$get_response("fl") {
#'   # do something
#' })
#' }
		upload_file = function(file, response = TRUE){
			if(missing(file))
				stop("Missing `file`")

			check_installed("base64enc")
			enc <- base64enc::base64encode(file)
			ext <- tools::file_ext(file)

			enc <- encode_file(enc, ext)

			if(response)
				response <- private$.default_input

			super$.send(
				"upload-file",
				encoded = enc,
				response = response
			)

			invisible(self)
		},
#' @details Capture response
#' 
#' @param response Name of the response.
		get_response = function(response = NULL){
			if(is.null(response))
				response <- private$.default_input

			super$get_input(response)
		}
	),
	private = list(
		.default_input = "store"
	)
)