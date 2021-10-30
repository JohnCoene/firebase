import 'shiny';
import { setInputValue } from '../utils';
import { 
	oauthProviders,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
	getAuth,
} from 'firebase/auth';

let oauthProviders = [];

export const handleOauth = () => {
	Shiny.addCustomMessageHandler('fireblaze-set-oauth-provider', (msg) => {
		const auth = getAuth();
		oauthProviders[msg.id] = new auth.OAuthProvider(msg.provider);
	});

	Shiny.addCustomMessageHandler('fireblaze-oauth-sign-in-popup', (msg) => {
		const auth = getAuth();
		signInWithPopup(auth, oauthProviders[msg.id])
			.then((result) => {
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
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch((error) => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});
}
