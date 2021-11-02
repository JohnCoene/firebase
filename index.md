# Firebase <img src="logo.png" align="right" height="250px" />

<!-- badges: start -->
[![Lifecycle: maturing](https://img.shields.io/badge/lifecycle-maturing-blue.svg)](https://www.tidyverse.org/lifecycle/#maturing)
![R-CMD-check](https://github.com/JohnCoene/fireblaze/workflows/R-CMD-check/badge.svg) 
[![Travis build status](https://travis-ci.org/JohnCoene/firebase.svg?branch=master)](https://travis-ci.org/JohnCoene/firebase)
[![AppVeyor build status](https://ci.appveyor.com/api/projects/status/github/JohnCoene/firebase?branch=master&svg=true)](https://ci.appveyor.com/project/JohnCoene/firebase)
<!-- badges: end -->

Authenticate Shiny users with [Google Firebase](https://firebase.google.com).

<a href="articles/get-started.html" class="btn btn-default"><i class="fa fa-rocket blue__color"></i> Get Started</a>
<a href="https://shiny.john-coene.com/firebase" target="_blank" class="btn btn-default"><i class="fa fa-desktop blue__color"></i> Demo</a>
<a href="https://github.com/JohnCoene/firebase" class="btn btn-default"><i class="fa fa-github blue__color"></i> Github</a>

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

## Related

Below are similar projects:

- [polished](https://polished.tech/)
- [SaaS with R by Mark Edmondson](https://github.com/MarkEdmondson1234/Shiny-R-SaaS/)
- [Firebase with R by Andy Merlino](https://github.com/shinyonfire/sof-auth-example)
- [Auth0 with Shiny](https://auth0.com/blog/adding-authentication-to-shiny-server/)

## Code of Conduct
  
Please note that the firebase project is released with a [Contributor Code of Conduct](https://contributor-covenant.org/version/2/0/CODE_OF_CONDUCT.html). By contributing to this project, you agree to abide by its terms.
