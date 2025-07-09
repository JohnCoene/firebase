# AI

First, you need to initialize the AI module:

```r
library(firebase)

ai <- FirebaseAI$new()
```

Then, you can use the `chat` method to send a prompt to the AI:

```r
ui <- fluidPage(
  useFirebase(),
  textInput("prompt", "Prompt"),
  actionButton("send", "Send"),
  verbatimTextOutput("response")
)

server <- function(input, output, session){
  ai <- FirebaseAI$new()

  observeEvent(input$send, {
    ai$chat("response", input$prompt)
  })

  output$response <- renderPrint({
    input$response
  })
}

shinyApp(ui, server)
```
