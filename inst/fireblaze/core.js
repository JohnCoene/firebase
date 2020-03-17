// global variables
var ui,
    initialised = false;

// Initialise
Shiny.addCustomMessageHandler('fireblaze-initialize', function(msg) {

  if(!initialised){
    firebase.initializeApp(msg.conf);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }

});

// Config init
Shiny.addCustomMessageHandler('fireblaze-ui-config', function(msg) {
  ui = new firebaseui.auth.AuthUI(firebase.auth());
  var providers = signinOpts(msg.providers);
  var helper = accountHelper(msg.helper);

  var opts = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl){
        Shiny.setInputValue('fireblaze_' + 'sign_in_ui', {success: true, response: firebase.auth().currentUser});
        return(false);
      },
      signInFailure : function(error){
        Shiny.setInputValue('fireblaze_' + 'sign_in_ui', {success: false, response: error})
      }
    },
    credentialHelper: helper,
    signInFlow: msg.flow,
    signInOptions: providers
  };

  ui.start("#fireblaze-signin-ui", opts)
});

// Sign out
Shiny.addCustomMessageHandler('fireblaze-signout', function(msg) {

  firebase.auth().signOut().then(function() {
    Shiny.setInputValue('fireblaze_' + 'signout', {success: true, response: 'successful'})
  }).catch(function(error) {
    Shiny.setInputValue('fireblaze_' + 'signout', {success: false, response: error})
  });

});

// Signed in
Shiny.addCustomMessageHandler('fireblaze-signedin', function(msg) {
  console.log("signedin");

  var user = firebase.auth().currentUser;
  Shiny.setInputValue('fireblaze_' + 'signedin', user);

});