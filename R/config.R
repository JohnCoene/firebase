#' Config
#' 
#' Configure Firebase, either using a config file or by setting
#' environment variables (see section below).
#' 
#' Create the configuration file necessary to running fireblaze.
#' Note that if you changed the project you must use said ID
#' here, not the one originally created by Google. 
#' 
#' @param api_key API key of your project.
#' @param project_id Id of your web project.
#' @param auth_domain Authentication domain, if `NULL`
#' attempts to build firebase's default domain.
#' @param storage_bucket URl to the bucket. if `NULL`
#' attempts to build firebase's default storage domain.
#' @param app_id Application ID, necessary for Analytics.
#' @param overwrite Whether to overwrite any existing configuration file.
#' 
#' @section Environment Variables:
#' - `FIREBASE_API_KEY`
#' - `FIREBASE_PROJECT_ID`
#' - `FIREBASE_AUTH_DOMAIN`
#' - `FIREBASE_STORAGE_BUCKET`
#' - `FIREBASE_APP_ID`
#' 
#' @note Do not share this file with anyone.
#' 
#' @return Path to file.
#' 
#' @examples \dontrun{firebase_config("xXxxx", "my-project")}
#' 
#' @name config
#' 
#' @export
firebase_config <- function(
  api_key, 
  project_id, 
  auth_domain = NULL, 
  storage_bucket = NULL,
  app_id = NULL,
  overwrite = FALSE
){

  if(is.null(app_id))
    cli::cli_alert_warning("`app_id` is not set, analytics will not work")

  # check if file exists
  exists <- has_config(config_file)
  if(exists && overwrite)
    cli::cli_alert_warning("Overwriting existing config file.")

  if(exists && !overwrite){
    cli::cli_alert_danger("Config file already exists, see `overwrite` argument.")
    return(invisible())
  }

  if(missing(api_key) || missing(project_id))
    stop("Missing `api_key`, or `project_id`", call. = FALSE)

  if(is.null(auth_domain)){
    auth_domain <- paste0(project_id, ".firebaseapp.com")
    cli::cli_alert_warning(paste("Setting `auth_domain` to", auth_domain))
  }
  
  if(is.null(storage_bucket)){
    storage_bucket <- paste0(project_id, ".appspot.com")
    cli::cli_alert_warning(paste("Setting `storage_bucket` to", storage_bucket))
  }

  lst <- list(
    apiKey = .enc(api_key),
    authDomain = .enc(auth_domain),
    projectId = .enc(project_id),
    storageBucket = .enc(storage_bucket),
    appId = .enc(app_id)
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

  if(!has_config(path)) {
    config <- get_config_from_env()
  } else {
    config <- readRDS(path)
    config <- lapply(config, .dec)
  }

  invisible(config)
}

get_config_from_env <- function(){

  api_key <- Sys.getenv("FIREBASE_API_KEY")
  project_id <- Sys.getenv("FIREBASE_PROJECT_ID")
  auth_domain <- Sys.getenv("FIREBASE_AUTH_DOMAIN")
  storage_bucket <- Sys.getenv("FIREBASE_STORAGE_BUCKET")
  app_id <- Sys.getenv("FIREBASE_APP_ID")
  
  if(api_key == "" || project_id == "")
    stop("Cannot find configuration file, see `?firebase_config`", call. = FALSE)

  if(auth_domain == ""){
    auth_domain <- paste0(project_id, ".firebaseapp.com")
    cli::cli_alert_warning(paste("Setting `auth_domain` to", auth_domain))
  }
  
  if(storage_bucket == ""){
    storage_bucket <- paste0(project_id, ".appspot.com")
    cli::cli_alert_warning(paste("Setting `storage_bucket` to", storage_bucket))
  }

  list(
    apiKey = api_key,
    authDomain = auth_domain,
    projectId = project_id,
    storageBucket = storage_bucket,
    appId = app_id
  )
}

#' @keywords internal
stopifno_config <- function(path){
  has_it <- has_config(path)

  if(!has_it)
    stop("Cannot find configuration file, see `firebase_config`", call. = FALSE)

  invisible()
}

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