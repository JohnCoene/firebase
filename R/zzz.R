.onLoad <- function(libname, pkgname){
  firebase <- pkg_file("firebase")
  fireblaze <- pkg_file("fireblaze")
  firebase_ui <- pkg_file("firebase-ui")
  
  shiny::addResourcePath("firebase", firebase)
  shiny::addResourcePath("fireblaze", fireblaze)
  shiny::addResourcePath("firebase-ui", firebase_ui)
}