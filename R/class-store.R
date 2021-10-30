#' FireStore
#' 
#' Interact with firestore
#' 
#' @keywords internal
Firestore <- R6::R6Class(
	"Firestore",
	public = list(
		initialize = function(){
			super$initialize()
			private$send("init")
		},
		collection = function(path){
			call <- sprintf("collect('%s')", path)
			private$.call_add(call)
		},
		get = function(){
			private$.call_add("get()")
		},
		add = function(data){
			json <- jsonlite::toJSON(data)
			json_str <- paste0(json, collapse = "")
			call <- sprintf("add('%s')", json_str)
			private$.call_add(call)
		},
		capture = function(){
			
		}
	),
	private = list(
    send = function(func, msg = list()){
      func <- paste0("firestore-", func)
      msg$ns <- private$.ns
      self$session$sendCustomMessage(func, msg)
    },
		.call_add = function(call){
			private$.call <- sprintf("%s.%s", private$.call, call)
		},
		.last_call = "",
		.call = "db"
	)
)
