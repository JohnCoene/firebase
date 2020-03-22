
<div align="center">

<img src="man/figures/logo.png" height="200px">

Authenticate Shiny users with [Google Firebase](https://firebase.google.com)

<!-- badges: start -->
[![Lifecycle: experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://www.tidyverse.org/lifecycle/#experimental)
![R-CMD-check](https://github.com/JohnCoene/firebase/workflows/R-CMD-check/badge.svg)
<!-- badges: end -->

[Website](https://firebase.john-coene.com) | [Demo](https://shiny.john-coene.com/firebase)

</div>

An application that provides authentication could look like this.

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

## Code of Conduct
  
Please note that the firebase project is released with a [Contributor Code of Conduct](https://contributor-covenant.org/version/2/0/CODE_OF_CONDUCT.html). By contributing to this project, you agree to abide by its terms.
