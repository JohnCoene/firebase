#' Store
#' 
#' @return An object of class \code{Store}.
#' 
#' @importFrom base64enc base64encode
#' 
#' @export
Store <- R6::R6Class(
	"Store",
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
        list(firebase_dep_storage())
      )

			super$.send("initialize-store")
		},
#' @details Query
#' 
#' Query a collection in the Firestore database.
#' 
#' @param collection Name of the collection to execute the query on.
#' @param response query The query to execute, this is expecting JavaScript code
#'  as a string that is evaluated on the client side, e.g.: `where("age", ">", 18)`.
#' @param id The `id` is also used to unsubscribe from the query and get the results
#'  of the query server-side, see `observe` argument.
#' @param cb A callback function to execute on the client side when the results
#' are available. This is also JavaScript code as a string that is evaluated on the client side,
#' namely a function that accepts the results as an argument, this is passed to `onSnapshot`.
#' @param observe If set to `TRUE` the client will listen to the results of the query and
#' and send the results to the server at the given input `id`.
#' 
#' @details You should normally not have to listen the result of individual queries,
#' as this will likely be inefficient. Instead, you should listen to the collection
#' or a small subset of the collection in on place.
#' This is because firebase is by default a real-time database, any changes to the 
#' subset of documents defined by the query will trigger the callback.
#' For instance, listening to the results of `where("age", ">", 18)` and `where("age", ">", 16)`
#' will trigger the callback twice when a user with age 17 is added.
#' 
#' @examples 
#' \dontrun{
#' s <- Storage$new()
#' 
#' s$
#'   query("users", "where('age', '>', 18)", id = "adults", observe = TRUE)
#' 
#' s$add(.collection = "users", name = "John", age = 28)
#' s$add(.collection = "users", name = "Bob", age = 12)
#' 
#' observeEvent(input$adults, {
#'   # triggered wehn a user with age > 18 is added, changed or deleted
#' })
#' 
#' s$unsubscribe("adults")
#' }
		query = function(collection, query, id, observe = FALSE, cb = NULL){
			if(missing(collection))
				stop("Missing `collection`")

			if(missing(query))
				stop("Missing `query`")

			super$.send(
				"store-query",
        collection = collection,
        query = query,
        id = id,
        cb = cb,
        observe = observe
			)

			invisible(self)
		},
#' @details Add a document to a collection
#' @param ... Named list of values to add as a document.
#' @param .collection Name of the collection to add the document to.
    add = function(..., .collection){
      if(missing(.collection))
        stop("Missing `.collection`")

			super$.send(
				"store-add",
        collection = .collection,
        data = list(...)
			)

			invisible(self)
    },
#' @details Create or update a document
#' @param ... Named list of values to set as a document.
#' @param .doc Name of the document to create or update.
#' @param .collection Name of the collection to add the document to.
    set = function(..., .doc, .collection){
      if(missing(.collection))
        stop("Missing `.collection`")

      if(missing(.doc))
        stop("Missing `.doc`")

			super$.send(
				"store-set",
        collection = .collection,
        doc = .doc,
        data = list(...)
			)

			invisible(self)
    },
#' @details Unsubscribe from a query
#' @param id The `id` of the query to unsubscribe from.
    unsubscribe = function(id){
      if(missing(id))
        stop("Missing `id`")

			super$.send(
				"store-unsub",
        id = id
			)

			invisible(self)
    }
	),
	private = list(
		.default_input = "store"
	)
)
