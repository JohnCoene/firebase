var google = new firebase.auth.GoogleAuthProvider();

// Set scope
Shiny.addCustomMessageHandler('fireblaze-google-scope', function(msg) {
  google.addScope(msg);
});

// Launch
Shiny.addCustomMessageHandler('fireblaze-google-sign-in-popup', function(msg) {
  firebase.auth().signInWithPopup(google).then(function(result) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: result});
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: false, response: error});
  });
});

Shiny.addCustomMessageHandler('fireblaze-google-sign-in-redirect', function(msg) {
  firebase.auth().signInWithRedirect(google);

  firebase.auth().getRedirectResult().then(function(result) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: result});
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: false, response: error});
  });
});