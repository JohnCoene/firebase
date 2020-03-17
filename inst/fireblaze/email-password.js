// create
Shiny.addCustomMessageHandler('fireblaze-create-email-password', function(msg) {
  firebase.auth().createUserWithEmailAndPassword(msg.email, msg.password)
  then(function(){
    Shiny.setInputValue('fireblaze_' + 'create_email_password', {success: true, response: "successful"})
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'create_email_password', {success: false, response: error})
  });
});

// sign in
Shiny.addCustomMessageHandler('fireblaze-signin-email-password', function(msg) {
  firebase.auth().signInWithEmailAndPassword(msg.email, msg.password)
  then(function(){
    Shiny.setInputValue('fireblaze_' + 'signin_email_password', {success: true, response: 'successful'})
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'signin_email_password', {success: false, response: error})
  });
});
