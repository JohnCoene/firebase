library(shiny)
library(firebase)

ui <- fluidPage(
  useFirebase(),
  useFirebaseUI(),
  uiOutput("msg"),
  plotOutput("plot")
)

server <- function(input, output){
  f <- FirebaseUI$
    new("session")$
    set_providers(
      email = TRUE,
      google = TRUE,
      github = TRUE,
      twitter = TRUE,
      facebook = TRUE
    )$
    launch()

  output$plot <- renderPlot({
    f$req_sign_in() # require sign in
    plot(cars)
  })

  output$msg <- renderUI({
    f$req_sign_in() # require sign in

    user <- f$get_signed_in() # get logged in user info
    print(user)
    
    h4("Welcome,", user$user$displayName)
  })
}

shinyApp(ui, server)