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