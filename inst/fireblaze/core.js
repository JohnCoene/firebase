// global variables
var ui;

window.state = {
  initialised: false,
  update() {
    console.log(`Fireblaze initialized: ${this.initialised}`);
  },
  get pageNumber() {
    return this.initialised;
  },
  set pageNumber(init) {
    this.initialised = init;
    this.update(this.initialised);
  }
};

// Initialise
Shiny.addCustomMessageHandler('fireblaze-initialize', function(msg) {

  if(!window.state.initialised){
    window.state.initialised = true;
    // init
    firebase.initializeApp(msg.conf);

    // set persistence
    var persistence = persistenceOpts(msg.persistence);
    firebase.auth().setPersistence(persistence);

    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        showHideOnLogin("show");
        $("#fireblaze-signin-ui").hide();
        Shiny.setInputValue('fireblaze_' + 'signed_in', {signed_in: true, user: user});
        Shiny.setInputValue('fireblaze_' + 'signed_in_user', {signed_in: true, user: user});
      } else {
        showHideOnLogin("hide");
        Shiny.setInputValue('fireblaze_' + 'signed_in', {signed_in: false, user: null});
        Shiny.setInputValue('fireblaze_' + 'signed_in_user', {signed_in: false, user: null});
      }
    });

    // check email verification link
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem('fireblazeEmailSignIn');
      if (!email) {
        console.log("no email verification link found");
        Shiny.setInputValue('fireblaze_' + 'email_verification', {success: false, response: "Cannot find email"});
      }
      // The client SDK will parse the code from the link for you.
      firebase.auth().signInWithEmailLink(email, window.location.href)
        .then(function(result) {
          window.localStorage.removeItem('fireblazeEmailSignIn');
          Shiny.setInputValue('fireblaze_' + 'email_verification', {success: true, response: result});
        })
        .catch(function(error) {
          Shiny.setInputValue('fireblaze_' + 'email_verification', {success: false, response: error});
        });
    }

  }

});

// Config init
Shiny.addCustomMessageHandler('fireblaze-ui-config', function(msg) {
  ui = new firebaseui.auth.AuthUI(firebase.auth());

  // show ui
  var container = document.getElementById("fireblaze-signin-ui");
  container.classList.remove("fireblaze__hidden_ui");
  
  var providers = signinOpts(msg.providers);
  var helper = accountHelper(msg.account_helper);

  var opts = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl){
        Shiny.setInputValue('fireblaze_' + 'signed_up_user', {success: true, response: firebase.auth().currentUser});
        return(false);
      },
      uiShown: function() {
        var loader = document.getElementById('loader');
        
        if(loader)
          loader.style.display = 'none';
      }
    },
    credentialHelper: helper,
    signInFlow: msg.flow,
    signInOptions: providers,
    tosUrl: msg.tos_url,
    privacyPolicyUrl: msg.privacy_policy_url
  };

  ui.start("#fireblaze-signin-ui", opts);
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
