# Manage Users

## Sign in

You can always access the signed in user with the `get_signed_in` method. This returns a list of length 2:

1. `signed_in`: boolean
2. `user`: a list (`NULL` if signed out)

The user object returned looks like.

```{r, echo = FALSE}
#> $success
#> [1] TRUE
#> 
#> $response
#> $response$uid
#> [1] "xxx"
#> 
#> $response$displayName
#> NULL
#> 
#> $response$photoURL
#> NULL
#> 
#> $response$email
#> [1] "john@opifex.org"
#> 
#> $response$emailVerified
#> [1] FALSE
#> 
#> $response$phoneNumber
#> NULL
#> 
#> $response$isAnonymous
#> [1] FALSE
#> 
#> $response$tenantId
#> NULL
#> 
#> $response$providerData
#> $response$providerData[[1]]
#> $response$providerData[[1]]$uid
#> [1] "john@opifex.org"
#> 
#> $response$providerData[[1]]$displayName
#> NULL
#> 
#> $response$providerData[[1]]$photoURL
#> NULL
#> 
#> $response$providerData[[1]]$email
#> [1] "john@opifex.org"
#> 
#> $response$providerData[[1]]$phoneNumber
#> NULL
#> 
#> $response$providerData[[1]]$providerId
#> [1] "password"
#> 
#> 
#> 
#> $response$apiKey
#> [1] "xxx"
#> 
#> $response$appName
#> [1] "[DEFAULT]"
#> 
#> $response$authDomain
#> [1] "fireblaze-r-package.firebaseapp.com"
#> 
#> $response$stsTokenManager
#> $response$stsTokenManager$apiKey
#> [1] "xxx"
#> 
#> $response$stsTokenManager$refreshToken
#> [1] "xxx"
#> 
#> $response$stsTokenManager$accessToken
#> [1] "xxx"
#> 
#> $response$stsTokenManager$expirationTime
#> [1] 1.63173e+12
#> 
#> 
#> $response$redirectEventId
#> NULL
#> 
#> $response$lastLoginAt
#> [1] "1631726033959"
#> 
#> $response$createdAt
#> [1] "1631639076093"
#> 
#> $response$multiFactor
#> $response$multiFactor$enrolledFactors
#> list()
```

Note this is technically like a Shiny input and behaves as such. Therefore the snippet below will work. Note that it will be triggered on load.

```r
# initialise
f <- FireblazeUI$new()$launch()

observeEvent(f$get_signed_in(), {
  # do somethind
})
```

However one should probably only rely on the `get_signed_in` to retrieve information about the logged in user, the methods `is_signed_in` and `req_sign_in` should be used in observers instead. The first returns `TRUE` if the user is signed in. The second, `req_sign_in` is a convenience method which essentially does `req(f$is_signed_in)` which allows "marking" outputs and observers that require sign in. 

## Sign out

A single method is shared across all authentication methods, simply call `sign_out` method.

## Re-auth

Two sensitive operations, deleting an account, and changing a password (only application to email & password method), might require that you re-authenticate the user. These operations being dangerous they will fail if the user has been signed in for a long time and you will have to first re-authenticate them using their current password.

```r
f <- FirebaseEmailPassword$new()

# upon clicking a button
observeEvent(input$reAuth, {
  # pass the freshly entered user password
  f$re_authenticate(input$reAuthPassword)
})

# check if reauth successful
observeEvent(f$get_re_authenticated(), {
  reauth <- f$get_re_authenticated()

  # TRUE if successful
  print(reauth$success)
})
```

## Delete

Simply use the `delete_user` method and observe the result with the `get_delete_user` method. This will likely required re-authentication.

## Email & Password

Signing in users with email and password may require some work, at times, to manage them. You might want to send them an email verification link, allow them to change or reset their password.

You can freely send a verification email with the `send_verification_email` and receive the response to it with `get_verification_email`. 
