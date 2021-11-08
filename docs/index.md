<img src="logo.png" width="200" style="float:right" />

# Firebase

<!-- badges: start -->
[![Lifecycle: stable](https://img.shields.io/badge/lifecycle-stable-brightgreen.svg)](https://lifecycle.r-lib.org/articles/stages.html#stable)
![R-CMD-check](https://github.com/JohnCoene/firebase/workflows/R-CMD-check/badge.svg)
[![Travis build status](https://travis-ci.org/JohnCoene/firebase.svg?branch=master)](https://travis-ci.org/JohnCoene/firebase)
[![packer](https://github.com/JohnCoene/firebase/actions/workflows/packer-check.yml/badge.svg)](https://github.com/JohnCoene/firebase/actions/workflows/packer-check.yml)
<!-- badges: end -->

Integration of [Google Firebase](https://firebase.google.com/)
services with [shiny](https://shiny.rstudio.com/),
built with [packer](https://packer.john-coene.com).

[:material-exclamation: Get Started](/guide/get-started/){.md-button .md-button--primary}

## Features

!!! note "Authentication"
    - :material-form-textbox-password: Email & Password
    - :material-link: Email Link
    - :material-google: Google
    - :material-github: Github
    - :material-facebook: Facebook
    - :material-twitter: Twitter
    - :material-microsoft: Microsoft
    - :material-yahoo: Yahoo!
    - :material-phone: Phone
 
!!! note "Analytics"
    Track users, events, and more.

!!! note "Storage"
    Use Firebase storage to securely store files.

## Installation

=== "CRAN"
    Install the stable version from CRAN:

    ```r
    install.packages("firebase")
    ```
=== "Github"
    Install the development from Github using remotes:
    
    ```r
    # install.packages("remotes")
    remotes::install_github("JohnCoene/firebase")
    ```

## Related

Similar projects.

- [Polished](https://polished.tech/)
- [SaaS with R by Mark Edmondson](https://github.com/MarkEdmondson1234/Shiny-R-SaaS/)
- [Firebase with R by Andy Merlino](https://github.com/shinyonfire/sof-auth-example)
- [Auth0 with Shiny](https://auth0.com/blog/adding-authentication-to-shiny-server/)

## Code of Conduct
  
Please note that the firebase project is released with a
[Contributor Code of Conduct](https://contributor-covenant.org/version/2/0/CODE_OF_CONDUCT.html). 
By contributing to this project, you agree to abide by its terms.
