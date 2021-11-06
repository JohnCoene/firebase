# State Persistence

You can specify how the Authentication state persists. This includes the ability to specify whether a signed in user should be indefinitely persisted until explicit sign out, cleared when the window is closed or cleared on page reload.

In Firebase, there are three options.

1. `none` (default) - Indicates that the state will only be stored in memory and will be cleared when the window or activity is refreshed.
2. `local`- Indicates that the state will be persisted even when the browser window is closed or the activity is destroyed in React Native. An explicit sign out is needed to clear that state. Note that Firebase Auth web sessions are single host origin and will be persisted for a single domain only.
3. `session` - Indicates that the state will only persist in the current session or tab, and will be cleared when the tab or window in which the user authenticated is closed. Applies only to web apps.

In the R package, you can modify state persistence with the `persistence` argument when instantiating the class with `new`.

```r
library(shiny)
library(fireblaze)

# define signin
signin <- modalDialog(
  title = "Login",
  actionButton("google", "Google", icon = icon("google"), class = "btn-danger"),
  actionButton("github", "Github", icon = icon("github")),
  footer = NULL
)

ui <- fluidPage(
  useFirebase(),
  uiOutput("msg")
)

server <- function(input, output) {
  showModal(signin)

  f <- FirebaseSocial$new(persistence = "local")

  observeEvent(input$google, {
    f$launch_google()
  })

  observeEvent(input$github, {
    f$launch_github()
  })

  output$msg <- renderUI({
    f$req_sign_in()

    h3("Welcome!")
  })
}

shinyApp(ui, server)
```