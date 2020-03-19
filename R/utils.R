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
    stop("Providers not set, see `set_providers` method.", call. = FALSE)
  
  invisible()
}

#' Check URLs
#' 
#' Check that tos and privacy policy urls are set.
#' 
#' @param fireblaze_ui An object of class \code{\link{FireblazeUI}}.
#' 
#' @export
check_urls <- function(fireblaze_ui){
  # check if still default
  if(grepl("^<.*>$", fireblaze_ui$tos_url) || grepl("^<.*>$", fireblaze_ui$privacy_policy_url))
    warning("Missing Terms of Service and/or Privacy policy URL, see `set_tos_url` and `set_privacy_policy_url` methods", call. = FALSE)

  invisible()
}

#' Launch Social Providers
#' 
#' Convenience function to "send" data to JavaScript; launch social providers.
#' 
#' @param super Super class \¢ode{\link{Fireblaze}}.
#' @param social Social site, google, facebook, twitter, or github.
#' @param flow Flow to use, popup or redirect.
#' 
#' @keywords internal
launch_social <- function(super, social, flow = c("popup", "redirect")){

  call <- paste0(social, "-sign-in-", flow)
  super$send(call, list())

  invisible()
}