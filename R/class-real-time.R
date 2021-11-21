#' Realtime Database
#' 
#' Access Firebase Realtime Database
#' 
#' @keywords internal
RealtimeDatabase <- R6::R6Class(
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
      super$.render_deps(
        list(firebase_dep_real_time())
      )
			super$.send("real-time-init")
		},
#' @details Reference
#' 
#' Creates a reference to a file or directory you want to operate on.
#' Note that this reference persists, make sure you change it
#' between operations.
#' 
#' @param path Path to the database full URL to file.
#' 
#' @return Invisibly return the class instance.
		ref = function(path = NULL) {
			super$.send("real-time-ref", path = path)
			invisible(self)
		},
#' @details On Value
#' 
#' When `path` or `ref` sees an update it sends the new
#' data to `response`.
#' 
#' @param response A boolean or character string.
#' `TRUE` indicates that you want to capture the
#' results of the file upload (e.g.: success or failed)
#' with `get_response` method. `FALSE` indicates you do
#' not want those results back. A character string is
#' used as named of the response which then can be used
#' in the `get_response` method.
#' @param path Path to the database full URL to file.
		on_value = function(response, path = NULL){
			if(missing(response))
				stop("Missing `response`")

			if(is.null(path))
				path <- private$.ref

			super$.send("real-time-on-value", response = response, path = path)
			invisible(self)
		},
#' @details Set Data
#' 
#' Pushes data to the database.
#' 
#' @param data Dataset to upload.
#' @param response A boolean or character string.
#' `TRUE` indicates that you want to capture the
#' results of the file upload (e.g.: success or failed)
#' with `get_response` method. `FALSE` indicates you do
#' not want those results back. A character string is
#' used as named of the response which then can be used
#' in the `get_response` method.
#' @param path Path to the database full URL to file.
		set = function(data, response = NULL, path = NULL) {
			if(missing(data))
				stop("Missing `data`")

			if(inherits(data, "data.frame"))
				data <- apply(data, 1, as.list)

			super$.send(
				"real-time-set", 
				data = data,
				path = path,
				response = response
			)
			invisible(self)
		},
#' @details Update Data
#' 
#' Update a record.
#' 
#' @param data Dataset to update.
#' @param response A boolean or character string.
#' `TRUE` indicates that you want to capture the
#' results of the file upload (e.g.: success or failed)
#' with `get_response` method. `FALSE` indicates you do
#' not want those results back. A character string is
#' used as named of the response which then can be used
#' in the `get_response` method.
#' @param path Path to the database full URL to file.
		update = function(data, response = NULL, path = NULL) {
			if(missing(data))
				stop("Missing `data`")

			if(inherits(data, "data.frame"))
				data <- apply(data, 1, as.list)

			super$.send(
				"real-time-update", 
				data = data,
				path = path,
				response = response
			)
			invisible(self)
		},
#' @details Delete
#' 
#' Delete data to the database.
#' 
#' @param response A boolean or character string.
#' `TRUE` indicates that you want to capture the
#' results of the file upload (e.g.: success or failed)
#' with `get_response` method. `FALSE` indicates you do
#' not want those results back. A character string is
#' used as named of the response which then can be used
#' in the `get_response` method.
#' @param path Path to the database full URL to file.
		delete = function(response = NULL, path = NULL) {
			super$.send(
				"real-time-delete", 
				path = path,
				response = response
			)
			invisible(self)
		}
	),
	private = list(
		.ref = NULL
	)
)