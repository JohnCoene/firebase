// send
Shiny.addCustomMessageHandler('fireblaze-send-email-link', function(msg) {
  window.localStorage.setItem('fireblazeEmailSignIn', msg.email);
  if(!msg.config.url)
    msg.config.url = window.location.href;

  firebase.auth().sendSignInLinkToEmail(msg.email, msg.config)
    .then(function(){
      Shiny.setInputValue(msg.ns + 'fireblaze_' + 'email_link_sent', {success: true, response: msg.email});
    })
    .catch(function(error) {
      Shiny.setInputValue(msg.ns + 'fireblaze_' + 'email_link_sent', {success: false, response: error});
    });
});
