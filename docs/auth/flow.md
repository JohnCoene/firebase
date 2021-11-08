# Flow

There are two different authentication "flows:" redirect and popup (default). The former redirect the user to another tab while the latter opens up in a popup window.

## Usage

Finally, we currently provide a sign-in method but we do not do anything with it. Generally, we will need to block of hide all or the parts of the app that requires sign-in. There are two ways to go about this, 1) an insecure way in which we hide the UI elements before the user signs in but the user could, with basic CSS, reveal those elements before signing in. 2) A more secure way in which one waits for the user to sign in to render certain elements.

The first happens UI-side and is very easy to implement, the second happens server-side.

### UI

!!! danger "Insecure method"
    This method is convenient but not secure use the "server" 
    method instead.

Rather straightforward but might not work for all elements. Use `reqSignin` to wrap UI elements that require sign in. Below we wrap some text and a plot, only signed in users can see them. There is also the corollary, `reqSignout` which will only show when the user is not signed in.

```r
library(shiny)
library(firebase)

ui <- fluidPage(
  useFirebase(), # import dependencies
  firebaseUIContainer(),
  reqSignout(
    h1("Please sign in")
  ),
  reqSignin(
    h4("VIP plot below"),
    plotOutput("plot")
  )
)

server <- function(input, output){
  f <- FirebaseUI$
    new()$ # instantiate
    set_providers( # define providers
      email = TRUE, 
      google = TRUE
    )$
    launch() # launch

  output$plot <- renderPlot({
    plot(cars)
  })
}

shinyApp(ui, server)
```

### Server

Server-side you can either manually check that the user has signed in with the `is_signed_in` method, which returns `TRUE` if a user is signed in and `FALSE` otherwise. Or you can use the convenient `req_sign_in` in your outputs make sign in required for them.

!!! success "Recommended"
    You are strongly advised to use this method.

```r
library(shiny)
library(firebase)

ui <- fluidPage(
  useFirebase(), # import dependencies
  firebaseUIContainer(),
  uiOutput("msg"),
  reqSignin(h4("VIP plot below")), # hide from UI
  plotOutput("plot")
)

server <- function(input, output){
  f <- FirebaseUI$
    new()$ # instantiate
    set_providers( # define providers
      email = TRUE, 
      google = TRUE
    )$
    launch() # launch

  output$msg <- renderUI({
    f$req_sign_out()
    h2("Please sign in")
  })

  output$plot <- renderPlot({
    f$req_sign_in() # require sign in
    plot(cars)
  })
}

shinyApp(ui, server)
```
