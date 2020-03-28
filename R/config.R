#' Config
#' 
#' Create the configuration file necessary to running fireblaze.
#' 
#' @param api_key API key of your project.
#' @param project_id Id of your web project.
#' @param auth_domain Authentication domain, if omitted uses,
#' attempts to build firebase's default domain. 
#' @param overwrite Whether to overwrite any existing configuration file.
#' 
#' @details Do not share this file with anyone.
#' 
#' @return Path to file.
#' 
#' @examples \dontrun{create_config("xXxxx", "my-project")}
#' 
#' @export
create_config <- function(api_key, project_id, auth_domain = NULL, overwrite = FALSE){

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

  # check if file exists
  exists <- has_config(config_file)
  if(exists && overwrite)
    cli::cli_alert_warning("Overwriting existing config file.")

  if(exists && !overwrite){
    cli::cli_alert_danger("Config file already exists, see `overwrite` argument.")
    return(invisible())
  }

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

  stopifno_config(path)

  config <- readRDS(path)
  config <- lapply(config, .dec)

  # avoid printing creds
  invisible(config)
}

#' @rdname read_config
#' @keywords internal
stopifno_config <- function(path){
  has_it <- has_config(path)

  if(!has_it)
    stop("Cannot find configuration file, see `create_config`", call. = FALSE)

  invisible()
}

#' @rdname read_config
#' @keywords internal
has_config <- function(path){
  has_it <- file.exists(path)

  has_it
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