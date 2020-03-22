
<div align="center">

<img src="man/figures/logo.png" height="200px">

Authenticate Shiny users with [Google Firebase](https://firebase.google.com)

<!-- badges: start -->
[![Lifecycle: experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://www.tidyverse.org/lifecycle/#experimental)
[![Travis build status](https://travis-ci.org/JohnCoene/fireblaze.svg?branch=master)](https://travis-ci.org/JohnCoene/fireblaze)
[![AppVeyor build status](https://ci.appveyor.com/api/projects/status/github/JohnCoene/fireblaze?branch=master&svg=true)](https://ci.appveyor.com/project/JohnCoene/fireblaze)
![R-CMD-check](https://github.com/JohnCoene/fireblaze/workflows/R-CMD-check/badge.svg)
![CircleCI](https://circleci.com/gh/JohnCoene/fireblaze.svg?style=svg&circle-token=676e32175ad244fa8f08f372537933b93dcd9762)
<!-- badges: end -->

[Website](https://fireblaze.john-coene.com)

</div>

```r
library(shiny)
library(fireblaze)

ui <- fluidPage(
  use_fireblaze(ui = TRUE) # import dependencies
)

server <- function(input, output){
  f <- FireblazeUI$
    new()$ # instantiate
    set_providers( # define providers
      email = TRUE, 
      google = TRUE
    )$
    launch() # launch
}

shinyApp(ui, server)
```

## Install

Install from Github using remotes:

```r
# install.packages("remotes")
remotes::install_github("JohnCoene/firebase")
```
