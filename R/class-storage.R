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
#' @param path Path to the file or directory, if `NULL`
#' creates a path to the root.
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
#' @param file Path to file to upload.
		upload_file = function(file){
			if(missing(file))
				stop("Missing `file`")

			check_installed("base64enc")
			enc <- base64enc::base64encode(file)
			ext <- tools::file_ext(file)

			enc <- encode_file(enc, ext)

			super$.send(
				"upload-file",
				encoded = enc
			)
		}
	)
)