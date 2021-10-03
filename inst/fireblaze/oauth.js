var oauth_providers = [];

// Language code
Shiny.addCustomMessageHandler('fireblaze-set-oauth-provider', function(msg) {
  oauth_providers[msg.id] = new firebase.auth.OAuthProvider(msg.provider);
});

Shiny.addCustomMessageHandler('fireblaze-oauth-sign-in-popup', function(msg) {
  firebase.auth().signInWithPopup(oauth_providers[msg.id])
    .then(function(result) {
      Shiny.setInputValue(msg.ns + 'fireblaze_' + 'signed_up_user', {success: true, response: result});
    }).catch(function(error) {
      Shiny.setInputValue(msg.ns + 'fireblaze_' + 'signed_up_user', {success: false, response: error});
    });
});

Shiny.addCustomMessageHandler('fireblaze-oauth-sign-in-redirect', function(msg) {
  firebase.auth().signInWithRedirect(oauth_providers[msg.id]);

  firebase.auth().getRedirectResult()
    .then(function(result) {
      Shiny.setInputValue(msg.ns + 'fireblaze_' + 'signed_up_user', {success: true, response: result});
    }).catch(function(error) {
      Shiny.setInputValue(msg.ns + 'fireblaze_' + 'signed_up_user', {success: false, response: error});
    });
});