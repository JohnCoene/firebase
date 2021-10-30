import 'shiny';
import { setInputValue } from '../utils';
import { sendSignInLinkToEmail } from 'firebase/auth';

export const handleEmailLink = (auth) => {
	Shiny.addCustomMessageHandler('fireblaze-send-email-link', (msg) => {
		window.localStorage.setItem('fireblazeEmailSignIn', msg.email);
		sendSignInLinkToEmail(auth, msg.email, msg.config)
			.then(() => {
				setInputValue('email_link_sent', {success: true, response: msg.email}, msg.ns);
			})
			.catch(function(error) {
				setInputValue('email_link_sent', {success: false, response: error}, msg.ns);
			});
	});
}
