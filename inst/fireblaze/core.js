var ui;

Shiny.addCustomMessageHandler('fireblaze-initialize', function(config) {
  firebase.initializeApp(config);
  console.log("fireblaze initialised");

  ui = new firebaseui.auth.AuthUI(firebase.auth());
});

Shiny.addCustomMessageHandler('fireblaze-ui-config', function(msg) {
  var providers = signinOpts(msg.providers);
  var helper = accountHelper(msg.helper);

  var opts = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl){
        Shiny.setInputValue('fireblaze_signin', firebase.auth().currentUser);
      },
      uiShown: function() {
        document.getElementById('loader').style.display = 'none';
      }
    },
    credentialHelper: helper,
    signInFlow: msg.flow,
    signInOptions: providers
  };

  ui.start("#fireblaze-signin-ui", opts)
});
