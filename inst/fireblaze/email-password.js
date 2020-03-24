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

// Send email verification
Shiny.addCustomMessageHandler('fireblaze-send-verification-email', function(msg) {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    Shiny.setInputValue('fireblaze_' + 'verification_email_sent', {success: true, response: 'successful'})
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'verification_email_sent', {success: false, response: error})
  });
});

// reset email
Shiny.addCustomMessageHandler('fireblaze-reset-email', function(msg) {
  
  firebase.auth().sendPasswordResetEmail(msg.email)
    .then(function() {
      Shiny.setInputValue('fireblaze_' + 'reset_email_sent', {success: true, response: 'successful'})
    }).catch(function(error) {
      Shiny.setInputValue('fireblaze_' + 'reset_email_sent', {success: false, response: 'unsuccessful'})
    });
});

// Reauthenticate
Shiny.addCustomMessageHandler('fireblaze-re-authenticate', function(msg) {
  var user = firebase.auth().currentUser;
  var credential = firebase.auth.EmailAuthProvider.credential(user.email, msg.password);
  
  user.reauthenticateWithCredential(credential)
    .then(function() {
      Shiny.setInputValue('fireblaze_' + 're_authenticate', {success: true, response: 'successful'});
    }).catch(function(error) {
      Shiny.setInputValue('fireblaze_' + 're_authenticate', {success: false, response: error});
    });
});