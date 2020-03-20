// send
Shiny.addCustomMessageHandler('fireblaze-send-email-link', function(msg) {
  window.localStorage.setItem('fireblazeEmailSignIn', msg.email);
  firebase.auth().sendSignInLinkToEmail(msg.email, msg.config)
    .then(function(){
      Shiny.setInputValue('fireblaze_' + 'email_link_sent', {success: true, response: msg.email});
    })
    .catch(function(error) {
      Shiny.setInputValue('fireblaze_' + 'email_link_sent', {success: false, error: error});
    });
});
