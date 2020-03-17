var ui;

Shiny.addCustomMessageHandler('fireblaze-initialize', function(msg) {
  firebase.initializeApp(msg.conf);
  console.log("fireblaze initialised");

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

});

Shiny.addCustomMessageHandler('fireblaze-signin-email-password', function(msg) {
  firebase.auth().signInWithEmailAndPassword(msg.email, msg.password).catch(function(error) {
    Shiny.setInputValue("signin_email_password_error", error)
  });
});

Shiny.addCustomMessageHandler('fireblaze-ui-config', function(msg) {
  ui = new firebaseui.auth.AuthUI(firebase.auth());
  var providers = signinOpts(msg.providers);
  var helper = accountHelper(msg.helper);

  var opts = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl){
        Shiny.setInputValue('sign_in_success', firebase.auth().currentUser);
        return(false);
      },
      signInFailure : function(){
        Shiny.setInputValue('sign_in_fail')
      }
    },
    credentialHelper: helper,
    signInFlow: msg.flow,
    signInOptions: providers
  };

  ui.start("#fireblaze-signin-ui", opts)
});
