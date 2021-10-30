import 'shiny';
import { setInputValue } from '../utils';
import {
	TwitterAuthProvider,
	FacebookAuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider
} from 'firebase/auth'

export const handleSocial = (auth) => {
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
		auth.signInWithPopup(google)
			.then((result) => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch((error) => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	Shiny.addCustomMessageHandler('fireblaze-google-sign-in-redirect', (msg) => {
		auth.signInWithRedirect(google);

		auth.getRedirectResult()
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
		auth.signInWithPopup(facebook)
			.then((result) => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch((error) => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	Shiny.addCustomMessageHandler('fireblaze-facebook-sign-in-redirect', (msg) => {
		auth.signInWithRedirect(facebook);

		auth.getRedirectResult()
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
		auth.signInWithPopup(github)
			.then(result => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch(error => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	Shiny.addCustomMessageHandler('fireblaze-github-sign-in-redirect', (msg) => {
		auth.signInWithRedirect(github);

		auth.getRedirectResult()
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
		auth.signInWithPopup(twitter)
			.then(result => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch(error => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});

	Shiny.addCustomMessageHandler('fireblaze-twitter-sign-in-redirect', msg => {
		auth.signInWithRedirect(twitter);

		auth.getRedirectResult()
			.then(result => {
				setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
			}).catch(error => {
				setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
			});
	});
}
