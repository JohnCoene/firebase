import 'shiny';
import { setInputValue } from '../utils.js';
import {
	signInWithPhoneNumber,
	RecaptchaVerifier
} from 'firebase/auth'

let confirmationResult;
let recaptchaVerifier;

export const handlePhone = (auth) => {
	Shiny.addCustomMessageHandler('fireblaze-phone-verify', msg => {
		if(!recaptchaVerifier)
			recaptchaVerifier = new RecaptchaVerifier(msg.id);

		signInWithPhoneNumber(auth, msg.number, recaptchaVerifier)
			.then(result => {
				confirmationResult = result;
				setInputValue(
					'phone_verification',
					{success: true, response: result},
					msg.ns
				);
			}).catch(error => {
				recaptchaVerifier.reset(msg.id);
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
