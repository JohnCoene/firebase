
<div align="center">

<img src="man/figures/logo.png" height="200px">

Authenticate Shiny users with [Google Firebase](https://firebase.google.com)

<!-- badges: start -->
[![Lifecycle: experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://www.tidyverse.org/lifecycle/#experimental)
![R-CMD-check](https://github.com/JohnCoene/firebase/workflows/R-CMD-check/badge.svg)
<!-- badges: end -->

[Website](https://firebase.john-coene.com)

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
