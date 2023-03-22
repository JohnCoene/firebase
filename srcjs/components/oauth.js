import 'shiny';
import { setInputValue } from '../utils';
import { 
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
	getAuth,
	OAuthProvider
} from 'firebase/auth';

let oauthProviders = [];

Shiny.addCustomMessageHandler('fireblaze-set-oauth-provider', (msg) => {
	oauthProviders[msg.id] = new OAuthProvider(msg.provider);

	if(Object.entries(msg.opts).length > 0)
		oauthProviders[msg.id].setCustomParameters(msg.opts)
});

Shiny.addCustomMessageHandler('fireblaze-oauth-sign-in-popup', (msg) => {
	const auth = getAuth();
	signInWithPopup(auth, oauthProviders[msg.id])
		.then((result) => {
      if(msg.credentials) {
        const credential = OAuthProvider.credentialFromResult(result);
        result.credentials = {
          idToken: credential.idToken,
          accessToken: credential.accessToken,
        };
      }
			setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch((error) => {
			setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
		});
});

Shiny.addCustomMessageHandler('fireblaze-oauth-sign-in-redirect', (msg) => {
	const auth = getAuth();
	signInWithRedirect(auth, oauthProviders[msg.id]);

	getRedirectResult()
		.then((result) => {
      if(msg.credentials) {
        const credential = OAuthProvider.credentialFromResult(result);
        result.credentials = {
          idToken: credential.idToken,
          accessToken: credential.accessToken,
        };
      }
			setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch((error) => {
			setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
		});
});
