# Store

This is currently being tested, install this branch to access the new `Store` class.

```r 
remotes::install_github("JohnCoene/firebase@firestore")
```

Below we create an application that allow authenticating then collects a record
from all users.
This record (number of bananas in the user's possession) is then stored either
publicly or privately in the database.
All users' public records are listed.

!!! note "Real-time"
		Firestore is by default real-time therefore very little  is required.

```r
library(shiny)
library(firebase)

ui <- fluidPage(
  theme = bslib::bs_theme(
    version = 5
  ),
  useFirebase(),
  firebaseUIContainer(),
  reqSignin(actionButton("signout", "Sign out")),
  reqSignin(
    div(
      class = "card",
      div(
        class = "card-body",
        p("How many bananas do you have at home currently?"),
        sliderInput("bananas", "Bananas", value = 0L, min = 0, max = 10),
        radioButtons("privacy", "", choices = c("private", "public"), inline = TRUE),
        actionButton("set", "Save")
      )
    ),
    h5("Users' possessions"),
    uiOutput("bananas")
  )
)

server <- function(input, output, session){
  f <- FirebaseUI$
    new("local")$
    set_providers(
      email = TRUE,
      yahoo = TRUE,
      google = TRUE,
      github = TRUE,
      twitter = TRUE,
      facebook = TRUE,
      microsoft = TRUE
    )$
    launch()

  # initialise firestore
  s <- Store$new()

  # query and observe the results, see ?Store before using that
  s$query(
    collection = "bananas",
    query = "where('privacy', '==', 'public')",
    id = "query",
    observe = TRUE
  )

  observeEvent(input$signout, {
    f$sign_out()
  })

  # results from query
  output$bananas <- renderUI({
    if(is.null(input$query))
      return(span())

    lst <- lapply(input$query, function(doc){
      tags$li(paste(doc$name, "has", doc$n, "bananas"))
    })

    tags$ul(lst)
  })

  observeEvent(input$set, {
    user <- f$get_signed_in()

    # create or update the record
    s$set(
      .collection = "bananas",
      .doc = user$response$uid,
      name = user$response$displayName,
      n = input$bananas,
      uid = user$response$uid,
      privacy = input$privacy
    )
  })
}

shinyApp(ui, server)
```

Note, we have added the following rule to our Firestore database,
from the Firebase web console.
It allows only the user to edit its own record(s) but allows all 
to read from them.

```bash
match /bananas/{docId} {
    allow write: if request.auth.uid == request.resource.data.uid;
    allow read: if true;
}
```
