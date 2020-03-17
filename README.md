
# fireblaze

<!-- badges: start -->
[![Travis build status](https://travis-ci.org/JohnCoene/fireblaze.svg?branch=master)](https://travis-ci.org/JohnCoene/fireblaze)
[![AppVeyor build status](https://ci.appveyor.com/api/projects/status/github/JohnCoene/fireblaze?branch=master&svg=true)](https://ci.appveyor.com/project/JohnCoene/fireblaze)
![R-CMD-check](https://github.com/JohnCoene/fireblaze/workflows/R-CMD-check/badge.svg)
[![CircleCI](https://circleci.com/gh/JohnCoene/fireblaze.svg?style=svg&circle-token=676e32175ad244fa8f08f372537933b93dcd9762)]
<!-- badges: end -->

Shiny authentication with [Google Firebase](https://firebase.google.com).

## Config

Create a secure config file.

```r
create_config(api_key = "xXXxxX", project_id = "my-project-name")
```

## Run

1. Import the dependencies with `use_firebase`.
2. Use the `Fireblaze` object to initialise a `new` instance.
3. Define the providers you want to use (e.g.: Facebook and Google), with `set_providers`.
4. `run` the sign-in model.
5. Pick up sign-ins with `sign_in_success`.

```r
library(shiny)
library(fireblaze)

ui <- fluidPage(
  use_firebase()
  uiOutput("username")
)

server <- function(input, output){
  # set up
  f <- Fireblaze$
    new()$
    set_providers(email = TRUE)$
    run(helper = FALSE)

  # render signed in username
  output$username <- renderUI({
    user <- f$sign_in_success()
    h2(user$displayName)
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
