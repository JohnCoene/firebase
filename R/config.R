#' Config
#' 
#' Create the configuration file necessary to running fireblaze.
#' 
#' @param api_key API key of your project.
#' @param project_id Id of your web project.
#' @param auth_domain Authentication domain, if omitted uses,
#' attempts to build firebase's default domain. 
#' 
#' @details Do not share this file with anyone.
#' 
#' @return Path to file.
#' 
#' @export
create_config <- function(api_key, project_id, auth_domain = NULL){

  if(missing(api_key) || missing(project_id) )
    stop("Missing `api_key`, or `project_id`", call. = FALSE)

  if(is.null(auth_domain)){
    auth_domain <- paste0(project_id, ".firebaseapp.com")
    cli::cli_alert_warning(paste("Setting `auth_domain` to", auth_domain))
  }

  lst <- list(
    apiKey = .enc(api_key),
    authDomain = .enc(auth_domain),
    projectId = .enc(project_id)
  )

  saveRDS(lst, file = config_file)

  cli::cli_alert_success("Configuration file created.")

  invisible(config_file)
}

#' Config Internal
#' 
#' Read and checks config.
#' 
#' @param path Path to config file
#' 
#' @name read_config
#' 
#' @keywords internal
read_config <- function(path){
  if(missing(path))
    stop("Missing `path`", call. = FALSE)

  config_exists(path)

  config <- readRDS(path)
  config <- lapply(config, .dec)

  # avoid printing creds
  invisible(config)
}

#' @rdname read_config
#' @keywords internal
config_exists <- function(path){
  has_it <- file.exists(path)

  if(!has_it)
    stop("Cannot find configuration file, see `create_config`", call. = FALSE)

  invisible()
}

#' Encryption
#' 
#' Encrypt and decrypt strings.
#' 
#' @param x Value to encrypt.
#' 
#' @keywords internal
#' @name encryption
.enc <- function(x){
  charToRaw(x)
}

#' @keywords internal
#' @rdname encryption
.dec <- function(x){
  rawToChar(x)
}