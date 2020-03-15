var ui;

Shiny.addCustomMessageHandler('fireblaze-initialize', function(msg) {
  firebase.initializeApp(msg.conf);
  console.log("fireblaze initialised");

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  ui = new firebaseui.auth.AuthUI(firebase.auth());
});

Shiny.addCustomMessageHandler('fireblaze-ui-config', function(msg) {
  var providers = signinOpts(msg.providers);
  var helper = accountHelper(msg.helper);

  var opts = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl){
        Shiny.setInputValue('fireblaze_signed_in', firebase.auth().currentUser);
        return(false);
      },
      uiShown: function() {
        Shiny.setInputValue('fireblaze_signing_in', true);
      }
    },
    credentialHelper: helper,
    signInFlow: msg.flow,
    signInOptions: providers
  };

  ui.start("#fireblaze-signin-ui", opts)
});
