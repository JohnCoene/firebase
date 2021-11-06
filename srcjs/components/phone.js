import 'shiny';
import { setInputValue } from '../utils.js';
import {
	signInWithPhoneNumber,
	RecaptchaVerifier,
	getAuth,
} from 'firebase/auth';

var confirmationResult;
var recaptchaVerifier;

export const handlePhone = () => {
	Shiny.addCustomMessageHandler('fireblaze-phone-verify', msg => {
		const auth = getAuth();
		if(!recaptchaVerifier){

			if(msg.id == 'firebase-recaptcha')
				recaptchaVerifier = new RecaptchaVerifier(msg.id, {
					callback: (response) => {
						setInputValue(
							'phone_recaptcha',
							response,
							msg.ns
						);
					}
				}, auth);
			else
				recaptchaVerifier = new RecaptchaVerifier(msg.id, {
					size: 'invisible',
					callback: (response) => {
						setInputValue(
							'phone_recaptcha',
							response,
							msg.ns
						);
					}
				}, auth);	
		}
		
		signInWithPhoneNumber(auth, msg.number, recaptchaVerifier)
			.then(result => {
				confirmationResult = result;
				setInputValue(
					'phone_verification',
					{success: true, response: result},
					msg.ns
				);
			}).catch(error => {
				recaptchaVerifier.render().then(function(widgetId) {
					grecaptcha.reset(widgetId);
				});
				setInputValue(
					'phone_verification',
					{success: false, response: error},
					msg.ns
				);
			});
	});

	Shiny.addCustomMessageHandler('fireblaze-phone-confirm', msg => {
		if(!confirmationResult)
			return;

		confirmationResult.confirm(msg.code)
			.then(result => {
				setInputValue(
					'phone_confirmation',
					{success: true, response: result},
					msg.ns
				);
			}).catch(error => {
				setInputValue(
					'phone_confirmation',
					{success: false, response: error},
					msg.ns
				);
			});
	});
}
