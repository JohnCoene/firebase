# Email Link

Creating an authentication flow using an email link is very similar to creating one with an email and password. The only difference is that we we don't observe for successful account creation but successful email sent with the `get_email_sent` method.

```r
library(shiny)
library(firebase)

ui <- fluidPage(
  useFirebase(),
  textInput("email", "Your email"),
  actionButton("submit", "Submit")
)

server <- function(input, output){

  f <- FirebaseEmailLink$new()

  observeEvent(input$submit, {
    if(input$email == "")
      return()
    
    f$send_email(input$email)
  })

  observeEvent(f$get_email_sent(), {
    sent <- f$get_email_sent()

    if(sent$success)
      showNotification("Email sent", type = "message")
  })

  observeEvent(f$get_email_verification(), {
    print(f$get_email_verification())
  })

}

shinyApp(ui, server)
```