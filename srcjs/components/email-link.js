import 'shiny';
import { setInputValue } from '../utils';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { getAuth } from '@firebase/auth';

export const handleEmailLink = () => {
	Shiny.addCustomMessageHandler('fireblaze-send-email-link', (msg) => {
		const auth = getAuth();
		window.localStorage.setItem('fireblazeEmailSignIn', msg.email);
		if(!msg.config.url)
			msg.config.url = window.location.href;
		sendSignInLinkToEmail(auth, msg.email, msg.config)
			.then(() => {
				setInputValue('email_link_sent', {success: true, response: msg.email}, msg.ns);
			})
			.catch(function(error) {
				setInputValue('email_link_sent', {success: false, response: error}, msg.ns);
			});
	});
}
