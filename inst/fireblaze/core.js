// global variables
var ui,
    initialised = false;

// Initialise
Shiny.addCustomMessageHandler('fireblaze-initialize', function(msg) {

  if(!initialised){
    // initialize
    firebase.initializeApp(msg.conf);

    // set persistence
    var persistence = persistenceOpts(msg.persistence);
    firebase.auth().setPersistence(persistence);

    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        Shiny.setInputValue('fireblaze_' + 'signed_in_user', {signed_in: true, user: user});
      } else {
        Shiny.setInputValue('fireblaze_' + 'signed_in_user', {signed_in: false, user: null});
      }
    });

  }

});

// Config init
Shiny.addCustomMessageHandler('fireblaze-ui-config', function(msg) {
  ui = new firebaseui.auth.AuthUI(firebase.auth());
  var providers = signinOpts(msg.providers);
  var helper = accountHelper(msg.account_helper);

  var opts = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl){
        Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: result});
        return(false);
      }
    },
    credentialHelper: helper,
    signInFlow: msg.flow,
    signInOptions: providers,
    tosUrl: msg.tos_url,
    privacyPolicyUrl: msg.privacy_policy_url
  };

  ui.start("#fireblaze-signin-ui", opts)
});

// Sign out
Shiny.addCustomMessageHandler('fireblaze-signout', function(msg) {

  firebase.auth().signOut()
    .then(function() {
      Shiny.setInputValue('fireblaze_' + 'signout', {success: true, response: 'successful'})
    }).catch(function(error) {
      Shiny.setInputValue('fireblaze_' + 'signout', {success: false, response: error})
    });

});

// Language code
Shiny.addCustomMessageHandler('fireblaze-language-code', function(msg) {
  firebase.auth().languageCode = msg.code;
});
