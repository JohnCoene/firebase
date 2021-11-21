# Real-time Database

Firebase also comes with a real-time database.
It's a NoSQL database similar to firestore but with a few
additional features that make it easier to work with
"real-time" data.

!!! note "Setup"
		Make sure you have done the basic setup in the Firebase console.
		Also note that the user must be authenticated in order to work.

## Set

Initialise the database from the `RealtimeDatabase` object.
As for the storage we use a `ref` to set a reference to a path
in the database. See the [storage reference](/storage/#reference)
for more details.

In the app below we add an `actionButton` that requires the user to
be signed in and adds a basic dataset to the database.

!!! tip "Serialisation"
		If the `data` is a `data.frame` then it is serialised row-wise.
		Pass a `list` if you do not want your data to be pre-processed.

Again, as for storage, we pass a `response` character string,
this is effectively the name of the input where one should send
the response, e.g.: `created` sends the response of the data
creation to `input$created`.
You can read more about this in [storage reference](/storage/#response)

```r
library(shiny)
library(firebase)

ui <- fluidPage(
  useFirebase(),
  firebaseUIContainer(),
  actionButton("create", "Create")
)

server <- function(input, output, session){
  f <- FirebaseUI$
    new()$
    set_providers(
      google = TRUE
    )$
    launch()

	# initialise the database
  db <- RealtimeDatabase$
    new()$
		ref("test")

  observeEvent(input$create, {
    f$req_sign_in()

    db$set(list(x = 1, y = 2), response = "created")
  })

  observeEvent(input$created, {
    print(input$created)
  })

}

shinyApp(ui, server)
```

## Update

We can create something similar for update.
On click of the new update button we update the `y`
variable of the `ref` to some random number.

```r
library(shiny)
library(firebase)

ui <- fluidPage(
  useFirebase(),
  firebaseUIContainer(),
  actionButton("create", "Create"),
  actionButton("update", "Update")
)

server <- function(input, output, session){
  f <- FirebaseUI$
    new()$
    set_providers(
      google = TRUE
    )$
    launch()

  db <- RealtimeDatabase$
    new()$
    ref("test")

  observeEvent(input$create, {
    f$req_sign_in()

    db$set(list(x = 1, y = 2), response = "created")
  })

  observeEvent(input$created, {
    print(input$created)
  })

  observeEvent(input$update, {
    f$req_sign_in()

    db$update(list(x = 1, y = runif(1)), response = "updated")
  })

  observeEvent(input$updated, {
    print(input$updated)
  })
}

shinyApp(ui, server)
```

## On Value

On value is the meat of the real-time database. 
It allows setting up an observer on an item in the database (`ref`)
to pick up data changes.

When the data at `ref` changes the observer reacts and the data is
sent to the `response`.
Note that since this happens in the client it __does not__ block
the R thread.

The observer always fires the first time with the initial value
of the `ref`.
Note that this also means we can simplify the rest of the app.

```r
library(shiny)
library(firebase)

ui <- fluidPage(
  useFirebase(),
  firebaseUIContainer(),
  actionButton("create", "Create"),
  actionButton("update", "Update")
)

server <- function(input, output, session){
  f <- FirebaseUI$
    new()$
    set_providers(
      google = TRUE
    )$
    launch()

  db <- RealtimeDatabase$
    new()$
    ref("test")$
    on_value("changed")
  
  observeEvent(input$changed, {
    print(input$changed)
  })

  observeEvent(input$create, {
    f$req_sign_in()

    db$set(list(x = 1, y = 2))
  })

  observeEvent(input$update, {
    f$req_sign_in()

    db$update(list(x = 1, y = runif(1)))
  })

}

shinyApp(ui, server)
```
