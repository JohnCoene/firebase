// create
Shiny.addCustomMessageHandler('fireblaze-create-email-password', function(msg) {
  firebase.auth().createUserWithEmailAndPassword(msg.email, msg.password)
    .then(function(result) {
      Shiny.setInputValue('fireblaze_' + 'created_email_user', {success: true, response: result});
    }).catch(function(error) {
      Shiny.setInputValue('fireblaze_' + 'created_email_user', {success: false, response: error});
    });
});

// sign in
Shiny.addCustomMessageHandler('fireblaze-signin-email-password', function(msg) {
  firebase.auth().signInWithEmailAndPassword(msg.email, msg.password)
    .then(function(result) {
      Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: result});
    }).catch(function(error) {
      Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: false, response: error});
    });
});
