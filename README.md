
<div align="center">

<img src="man/figures/logo.png" height="300px">

[Google Firebase](https://firebase.google.com) for shiny, 
built with [packer](https://packer.john-coene.com).

<!-- badges: start -->
[![Lifecycle: stable](https://img.shields.io/badge/lifecycle-stable-brightgreen.svg)](https://lifecycle.r-lib.org/articles/stages.html#stable)
![R-CMD-check](https://github.com/JohnCoene/firebase/workflows/R-CMD-check/badge.svg)
[![packer](https://github.com/JohnCoene/firebase/actions/workflows/packer-check.yml/badge.svg)](https://github.com/JohnCoene/firebase/actions/workflows/packer-check.yml)
<!-- badges: end -->

[Website](https://firebase.john-coene.com) | [Demo](https://shiny.john-coene.com/firebase) | [Get Started](https://firebase.john-coene.com/guide/get-started/)

</div>

## Authentication Methods

Currently the following methods from Google Firebase are available in the package:

* Email & Password
* Email Link
* Google
* Github
* Facebook
* Twitter
* Microsoft
* Yahoo!
* Phone

## Example

An application that provides authentication could look like this.

```r
library(shiny)
library(firebase)

ui <- fluidPage(
  useFirebase(), # import dependencies,
  firebaseUIContainer()
)

server <- function(input, output){
  f <- FirebaseUI$
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

Install the stable version from CRAN:

```r
install.packages("firebase")
```

Install the development from Github using remotes:

```r
# install.packages("remotes")
remotes::install_github("JohnCoene/firebase")
```

Get the current bleeding edge refactor with webpack 
with [packer](https://packer.john-coene.com)
to improve performances and use firebase JavaScript version 9.
It also includes two new classes `Storage` and `Analytics`.

```r
remotes::install_github("JohnCoene/firebase@packer")
```

## Related

Below are similar projects:

- [Polished](https://polished.tech/)
- [SaaS with R by Mark Edmondson](https://github.com/MarkEdmondson1234/Shiny-R-SaaS/)
- [Firebase with R by Andy Merlino](https://github.com/shinyonfire/sof-auth-example)
- [Auth0 with Shiny](https://auth0.com/blog/adding-authentication-to-shiny-server/)

## Code of Conduct
  
Please note that the firebase project is released with a [Contributor Code of Conduct](https://contributor-covenant.org/version/2/0/CODE_OF_CONDUCT.html). By contributing to this project, you agree to abide by its terms.
