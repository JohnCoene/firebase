.onLoad <- function(libname, pkgname){
  firebase <- pkg_file("firebase")
  fireblaze <- pkg_file("fireblaze")
  
  shiny::addResourcePath("firebase", firebase)
  shiny::addResourcePath("fireblaze", fireblaze)
}