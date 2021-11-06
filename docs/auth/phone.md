# Phone

In the latest version you can also allow signing in with
mobile phone numbers.

!!! tip "Enable Method"
		Remember to enable this sign in method in your Firebase
		console.


## 1. Verify

First, collect the user's phone number __and the recaptcha.__
To collect the capta, simply place `recaptchaUI` where you want
it to display. Note that it will apply only after you run
the `verfify` method (see below).

## 2. Confirm

Once the `verify` method has run the user receives a confirmation
code that you must also capture and pass to `confirm` to confirm
the authentication. The user is then automatically logged in.

## Example

This is an overly simple, ugly example, but fully-functioning.

```r
library(shiny)
library(firebase)

ui <- fluidPage(
	useFirebase(),
	textInput(
		"number",
		"Number"
	),
	actionButton("verify", "Verify"),
	recaptchaUI(),
	textInput("code", "Code"),
	actionButton("confirm", "Confirm")
)

server <- function(input, output, session) {
	f <- FirebasePhone$new()

	observeEvent(input$verify, {
		f$verify(input$number)
	})

	observeEvent(f$get_verification(), {
		print(f$get_verification())
	})

	observeEvent(input$confirm, {
		f$confirm(input$code)
	})
	
	observeEvent(f$get_confirmation(), {
		print(f$get_confirmation())
	})
}

shinyApp(ui, server)
```