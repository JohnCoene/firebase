import 'shiny';
import { getAuth } from '@firebase/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import{
  signinOpts,
  accountHelper,
} from './utils.js';

const handleUI = () => {
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
}

export {
	handleUI
}