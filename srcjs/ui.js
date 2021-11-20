import 'shiny';
import { 
  getAuth,
  TwitterAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
  PhoneAuthProvider,
} from 'firebase/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

// Convert sign in boolean from R to firebase strings
const signinOpts = (opts) => {
  var signin = [];

  if(opts.microsoft)
    signin.push("microsoft.com");

  if(opts.yahoo)
    signin.push("yahoo.com");

  if(opts.apple)
    signin.push("apple.com");

  if(opts.google)
    signin.push(GoogleAuthProvider.PROVIDER_ID);

  if(opts.facebook)
    signin.push(FacebookAuthProvider.PROVIDER_ID);

  if(opts.twitter)
    signin.push(TwitterAuthProvider.PROVIDER_ID);

  if(opts.github)
    signin.push(GithubAuthProvider.PROVIDER_ID);

  if(opts.email)
    signin.push(EmailAuthProvider.PROVIDER_ID);

  if(opts.email_link)
    signin.push({
      provider: EmailAuthProvider.PROVIDER_ID,
      signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    });

  if(opts.phone)
    signin.push(PhoneAuthProvider.PROVIDER_ID);

  return signin;
}

const accountHelper = (x) => {
  if(x == false)
    return firebaseui.auth.CredentialHelper.NONE;
  
  return firebaseui.auth.CredentialHelper.GOOGLE_YOLO;
}

// Config init
Shiny.addCustomMessageHandler('fireblaze-ui-config', (msg) => {
  const auth = getAuth();

  if(!window.uiInitialised) {
    window.uiInitialised = true;
    window.ui = new firebaseui.auth.AuthUI(auth);
  }

  let providers = signinOpts(msg.providers);
  let helper = accountHelper(msg.account_helper);

  window.uiOpts = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        setInputValue('signed_up_user', {success: true, response: auth.currentUser}, msg.ns);
        return(false);
      },
      uiShown: () => {
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

  ui.start("#fireblaze-signin-ui", uiOpts);
});
