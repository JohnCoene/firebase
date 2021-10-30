import 'shiny';
import { setInputValue } from '../utils';
import { 
	oauthProviders,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult
} from 'firebase/auth';

let oauthProviders = [];

export const handleOauth = (auth) => {
	Shiny.addCustomMessageHandler('fireblaze-set-oauth-provider', (msg) => {
		oauthProviders[msg.id] = new firebase.auth.OAuthProvider(msg.provider);
	});

	Shiny.addCustomMessageHandler('fireblaze-oauth-sign-in-popup', (msg) => {
		signInWithPopup(auth, oauthProviders[msg.id])
			.then((result) => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch((error) => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	Shiny.addCustomMessageHandler('fireblaze-oauth-sign-in-redirect', (msg) => {
		signInWithRedirect(auth, oauthProviders[msg.id]);

		getRedirectResult()
			.then((result) => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch((error) => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});
}
