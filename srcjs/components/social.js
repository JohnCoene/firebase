import 'shiny';
import { setInputValue } from '../utils';
import {
	TwitterAuthProvider,
	FacebookAuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult
} from 'firebase/auth'

export const handleSocial = () => {
	// providers
	let twitter = new TwitterAuthProvider();
	let facebook = new FacebookAuthProvider();
	let github = new GithubAuthProvider();
	let google = new GoogleAuthProvider();

	// GOOGLE
	Shiny.addCustomMessageHandler('fireblaze-google-scope', (msg) => {
		google.addScope(msg);
	});

	Shiny.addCustomMessageHandler('fireblaze-google-sign-in-popup', (msg) => {
		const auth = getAuth();
		signInWithPopup(auth, google)
			.then((result) => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch((error) => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	Shiny.addCustomMessageHandler('fireblaze-google-sign-in-redirect', (msg) => {
		const auth = getAuth();
		signInWithRedirect(auth, google);

		getRedirectResult(auth)
			.then((result) => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch((error) => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	// FACEBOOK
	Shiny.addCustomMessageHandler('fireblaze-facebook-scope', (msg) => {
		facebook.addScope(msg);
	});

	Shiny.addCustomMessageHandler('fireblaze-facebook-sign-in-popup', (msg) => {
		const auth = getAuth();
		signInWithPopup(auth, facebook)
			.then((result) => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch((error) => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	Shiny.addCustomMessageHandler('fireblaze-facebook-sign-in-redirect', (msg) => {
		const auth = getAuth();
		signInWithRedirect(auth, facebook);

		getRedirectResult(auth)
			.then((result) => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch((error) => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	// GITHUB
	Shiny.addCustomMessageHandler('fireblaze-github-scope', (msg) => {
		github.addScope(msg);
	});

	Shiny.addCustomMessageHandler('fireblaze-github-sign-in-popup', (msg) => {
		const auth = getAuth();
		signInWithPopup(auth, github)
			.then(result => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch(error => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	Shiny.addCustomMessageHandler('fireblaze-github-sign-in-redirect', (msg) => {
		const auth = getAuth();
		signInWithRedirect(auth, github);

		getRedirectResult(auth)
			.then(result => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch(error => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	// TWITTER
	Shiny.addCustomMessageHandler('fireblaze-twitter-scope', (msg) => {
		twitter.addScope(msg);
	});

	Shiny.addCustomMessageHandler('fireblaze-twitter-sign-in-popup', (msg) => {
		const auth = getAuth();
		signInWithPopup(auth, twitter)
			.then(result => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch(error => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	Shiny.addCustomMessageHandler('fireblaze-twitter-sign-in-redirect', msg => {
		const auth = getAuth();
		signInWithRedirect(auth, twitter);

		getRedirectResult(auth)
			.then(result => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch(error => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});
}
