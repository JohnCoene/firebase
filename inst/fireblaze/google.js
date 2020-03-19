var google;

// Set scope
Shiny.addCustomMessageHandler('fireblaze-google-scope', function(msg) {
  google = new firebase.auth.GoogleAuthProvider();
  google.addScope(msg);
});

// Initialise
Shiny.addCustomMessageHandler('google-sign-in-popup', function(msg) {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: result});
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: false, response: error});
  });
});