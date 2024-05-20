.onLoad <- function(...){
  shiny::registerInputHandler("raw", \(data, ...){
    return(data)
  }, force = TRUE)
}
