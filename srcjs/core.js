import 'shiny';
import { 
  getAuth, 
  signOut, 
  setPersistence,
  isSignInWithEmailLink,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import './style.css';
import { 
  persistenceOpts, 
  showHideOnLogin, 
  showHideOnLogout,
  setInputValue,
  signinOpts,
  accountHelper,
  setLanguageCode
} from './utils.js';

// global variables
var globalNs = '';
var globalInit = false;
window.uiInitialised = false;

const handleCore = () => {
  // Initialise
  Shiny.addCustomMessageHandler('fireblaze-initialize', function(msg) {

    if(globalInit)
      return ;

    globalInit = true;
    // set namespace
    globalNs = msg.ns;

    // init
    initializeApp(msg.conf);

    // auth
    const auth = getAuth();
    setLanguageCode(msg.languageCode)

    // set persistence
    let persistence = persistenceOpts(msg.persistence);
    setPersistence(auth, persistence)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if(user){

            // show signin authorised
            showHideOnLogin("show");
            showHideOnLogout("hide");
            $("#fireblaze-signin-ui").hide();

            auth.currentUser.getIdToken(true)
              .then(function(token) {
                setInputValue('signed_in_user', {success: true, response: user, token: token});
              }).catch(function(error) {
                console.error('failed to login');
              });

          } else {
            // hide signin required
            showHideOnLogin("hide");
            showHideOnLogout("show");

            // set error input
            setInputValue('signed_in', {success: false, response: null});
            setInputValue('signed_in_user', {success: false, response: null});
          }
        });

        // check email verification link
        if (isSignInWithEmailLink(auth, window.location.href)) {
          // Additional state parameters can also be passed via URL.
          // This can be used to continue the user's intended action before triggering
          // the sign-in operation.
          // Get the email if available. This should be available if the user completes
          // the flow on the same device where they started it.
          var email = window.localStorage.getItem('fireblazeEmailSignIn');
          if (!email) {
            setInputValue('email_verification', {success: false, response: "Cannot find email"});
          }
          // The client SDK will parse the code from the link for you.
          auth.signInWithEmailLink(email, window.location.href)
            .then((result) => {
              window.localStorage.removeItem('fireblazeEmailSignIn');
              setInputValue('email_verification', {success: true, response: result});
            })
            .catch((error) => {
              setInputValue('email_verification', {success: false, response: error});
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });

  });

  // Sign out
  Shiny.addCustomMessageHandler('fireblaze-signout', (msg) => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        if(window.uiInitialised){
          window.ui.start("#fireblaze-signin-ui", window.uiOpts);
          $("#fireblaze-signin-ui").show();
        }

        setInputValue('signout', {success: true, response: 'successful'}, msg.ns);
      }).catch((error) => {
        setInputValue('signout', {success: false, response: error}, msg.ns);
      });

  });

  // Language code
  Shiny.addCustomMessageHandler('fireblaze-language-code', (msg) => {
    const auth = getAuth();
    auth.languageCode = msg.code;
  });

  // Delete User
  Shiny.addCustomMessageHandler('fireblaze-delete-user', (msg) => {
    const auth = getAuth();
    auth.currentUser.delete()
      .then(() => {
        setInputValue('deleted_user', {success: true, response: 'successful'}, msg.ns);
      }).catch((error) => {
        Shiny.setInputValue('deleted_user', {success: false, response: error}, msg.ns);
      });
  });

  Shiny.addCustomMessageHandler('fireblaze-id-token', (msg) => {
    const auth = getAuth();
    auth.currentUser.getIdToken(true)
      .then((idToken) => {
        setInputValue('id_token', {response: {idToken: idToken}, success: true}, msg.ns);
      }).catch((error) => {
        setInputValue('id_token', {response: error, success: false}, msg.ns);
      });
  });

}

export {
  handleCore,
  globalNs
}