// providers
var twitter = new firebase.auth.TwitterAuthProvider();
var facebook = new firebase.auth.FacebookAuthProvider();
var github = new firebase.auth.GithubAuthProvider();
var google = new firebase.auth.GoogleAuthProvider();

// GOOGLE
Shiny.addCustomMessageHandler('fireblaze-google-scope', function(msg) {
  google.addScope(msg);
});

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

// FACEBOOK
Shiny.addCustomMessageHandler('fireblaze-facebook-scope', function(msg) {
  google.addScope(msg);
});

Shiny.addCustomMessageHandler('fireblaze-facebook-sign-in-popup', function(msg) {
  firebase.auth().signInWithPopup(facebook).then(function(result) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: result});
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: false, response: error});
  });
});

Shiny.addCustomMessageHandler('fireblaze-facebook-sign-in-redirect', function(msg) {
  firebase.auth().signInWithRedirect(facebook);

  firebase.auth().getRedirectResult().then(function(result) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: result});
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: false, response: error});
  });
});

// GITHUB
Shiny.addCustomMessageHandler('fireblaze-github-scope', function(msg) {
  google.addScope(msg);
});

Shiny.addCustomMessageHandler('fireblaze-github-sign-in-popup', function(msg) {
  firebase.auth().signInWithPopup(github).then(function(result) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: result});
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: false, response: error});
  });
});

Shiny.addCustomMessageHandler('fireblaze-github-sign-in-redirect', function(msg) {
  firebase.auth().signInWithRedirect(github);

  firebase.auth().getRedirectResult().then(function(result) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: result});
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: false, response: error});
  });
});

// TWITTER
Shiny.addCustomMessageHandler('fireblaze-twitter-scope', function(msg) {
  google.addScope(msg);
});

Shiny.addCustomMessageHandler('fireblaze-twitter-sign-in-popup', function(msg) {
  firebase.auth().signInWithPopup(twitter).then(function(result) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: result});
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: false, response: error});
  });
});

Shiny.addCustomMessageHandler('fireblaze-twitter-sign-in-redirect', function(msg) {
  firebase.auth().signInWithRedirect(twitter);

  firebase.auth().getRedirectResult().then(function(result) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: result});
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: false, response: error});
  });
});
