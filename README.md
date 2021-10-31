
<div align="center">

<img src="man/figures/logo.png" height="300px">

Authenticate Shiny users with [Google Firebase](https://firebase.google.com)

<!-- badges: start -->
[![Lifecycle: stable](https://img.shields.io/badge/lifecycle-stable-brightgreen.svg)](https://lifecycle.r-lib.org/articles/stages.html#stable)
![R-CMD-check](https://github.com/JohnCoene/firebase/workflows/R-CMD-check/badge.svg)
[![Travis build status](https://travis-ci.org/JohnCoene/firebase.svg?branch=master)](https://travis-ci.org/JohnCoene/firebase)
[![AppVeyor build status](https://ci.appveyor.com/api/projects/status/github/JohnCoene/firebase?branch=master&svg=true)](https://ci.appveyor.com/project/JohnCoene/firebase)
[![R-CMD-check](https://github.com/JohnCoene/firebase/workflows/R-CMD-check/badge.svg)](https://github.com/JohnCoene/firebase/actions)
<!-- badges: end -->

[Website](https://firebase.john-coene.com) | [Demo](https://shiny.john-coene.com/firebase) | [Reference](https://firebase.john-coene.com/reference/)

</div>

## CAUTION

I sincerely apologise but a grave error on my part led to a grave
potential security issue, see 
[#11](https://github.com/JohnCoene/firebase/issues/11). 

This is fixed in version `0.2.0`: update as soon as possible.
It is available on CRAN.

__Note:__ 
You may need to refresh the cache, visit your app and
<kbd>CTRL</kbd>/<kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>R</kbd>

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
  useFirebaseUI()
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

```r
remotes::install_github("JohnCoene/firebase@packer")
```

## Related

Below are similar projects:

- [SaaS with R by Mark Edmondson](https://github.com/MarkEdmondson1234/Shiny-R-SaaS/)
- [Firebase with R by Andy Merlino](https://github.com/shinyonfire/sof-auth-example)
- [Auth0 with Shiny](https://auth0.com/blog/adding-authentication-to-shiny-server/)

## Code of Conduct
  
Please note that the firebase project is released with a [Contributor Code of Conduct](https://contributor-covenant.org/version/2/0/CODE_OF_CONDUCT.html). By contributing to this project, you agree to abide by its terms.
