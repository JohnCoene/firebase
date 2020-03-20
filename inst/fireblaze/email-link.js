// send
Shiny.addCustomMessageHandler('fireblaze-send-email-link', function(msg) {
  firebase.auth().sendSignInLinkToEmail(msg.email, msg.config)
    .then(function(){
      window.localStorage.setItem('fireblazeEmailSignIn', email);
      Shiny.setInputValue('fireblaze_' + 'email_link_sent', {success: true, response: msg.email});
    })
    .catch(function(error) {
      Shiny.setInputValue('fireblaze_' + 'email_link_sent', {success: false, error: error});
    });
});

// verify
if(window.initialised){
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    var email = window.localStorage.getItem('fireblazeEmailSignIn');
    if (!email) {
      Shiny.setInputValue('fireblaze_' + 'email_verification', {success: false, response: null});
    }
    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(email, window.location.href)
      .then(function(result) {
        window.localStorage.removeItem('fireblazeEmailSignIn');
      })
      .catch(function(error) {
        Shiny.setInputValue('fireblaze_' + 'email_verification', {success: false, response: error});
      });
  }
}