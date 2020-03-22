# Firebase <img src="logo.png" align="right" height="200px" />

<!-- badges: start -->
[![Lifecycle: experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://www.tidyverse.org/lifecycle/#experimental)
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

## Install

Install from Github using remotes:

```r
# install.packages("remotes")
remotes::install_github("JohnCoene/firebase")
```
