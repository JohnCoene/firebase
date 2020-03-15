#' Get Path
#' 
#' Get path to internal file.
#' 
#' @param path Path to file in \code{inst} directory.
#' 
#' @keywords internal
pkg_file <- function(path){
  system.file(path, package = "fireblaze")
}

# default config file name
config_file <- "fireblaze.rds"

#' Check Providers
#' 
#' Check if providers have been set.
#' 
#' @param opts Options to check.
#' 
#' @keywords internal
check_providers <- function(opts){
  opts <- unlist(opts)
  is_set <- sum(opts)

  if(!is_set)
    stop("Providers not set, see `providers` method.", call. = FALSE)
  
  invisible()
}
