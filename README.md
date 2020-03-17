
# fireblaze

<!-- badges: start -->
[![Travis build status](https://travis-ci.org/JohnCoene/fireblaze.svg?branch=master)](https://travis-ci.org/JohnCoene/fireblaze)
[![AppVeyor build status](https://ci.appveyor.com/api/projects/status/github/JohnCoene/fireblaze?branch=master&svg=true)](https://ci.appveyor.com/project/JohnCoene/fireblaze)
![R-CMD-check](https://github.com/JohnCoene/fireblaze/workflows/R-CMD-check/badge.svg)
![CircleCI](https://circleci.com/gh/JohnCoene/fireblaze.svg?style=svg&circle-token=676e32175ad244fa8f08f372537933b93dcd9762)
<!-- badges: end -->

Shiny authentication with [Google Firebase](https://firebase.google.com).

## Config

Create a secure config file.

```r
create_config(api_key = "xXXxxX", project_id = "my-project-name")
```

## Workflows

There are two workflows, one that is much easier to setup but less customisable, comes with a UI. Another that is more hands-on customisable more complicated to make work.

### UI

1. Import the dependencies with `use_firebase`.
2. Use the `Fireblaze` object to initialise a `new` instance.
3. Define the providers you want to use (e.g.: Facebook and Google), with `set_providers`.
4. `run` the sign-in model.
5. Pick up sign-ins with `sign_in_success`.

```r
library(shiny)
library(fireblaze)

ui <- fluidPage(
  use_fireblaze(),
  uiOutput("username")
)

server <- function(input, output){
  # set up
  f <- FireblazeUI$
    new()$
    set_providers(email = TRUE)$
    run(helper = FALSE)

  # render signed in username
  output$username <- renderUI({
    user <- f$sign_in()
    h2(user$displayName)
  })
}

shinyApp(ui, server)
```

### Manual

You can also manually create the entire workflow manually.

```r
library(shiny)
library(fireblaze)

ui <- fluidPage(
  use_fireblaze(),
  div(
    class = "container",
    h3("Create an Account"),
    fluidRow(
      column(5, textInput("email_create", "Your email")),
      column(5, passwordInput("password_create", "Your password")),
      column(2, actionButton("create", "Register"))
    ),
    h3("Sign in"),
    fluidRow(
      column(5, textInput("email_signin", "Your email")),
      column(5, passwordInput("password_signin", "Your password")),
      column(2, actionButton("signin", "Sign in"))
    ),
    uiOutput("user")
  )
)

server <- function(input, output){
  # set up
  f <- FireblazeEmailPassword$new()

  observeEvent(input$create, {
    results <- f$create(input$email_create, input$password_create)
    print(results)
  })

  observeEvent(input$signin, {
    results <- f$sign_in(input$email_signin, input$password_signin)
    print(results)
  })

  output$user <- renderUI({
    f$signed_in()
  })
}

shinyApp(ui, server)
```

## Install

Install from Github using remotes:

```r
# install.packages("remotes")
remotes::install_github("JohnCoene/fireblaze")
```
