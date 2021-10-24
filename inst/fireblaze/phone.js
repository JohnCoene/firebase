let confirmationResult;
let recaptchaVerifier;

Shiny.addCustomMessageHandler('fireblaze-phone-verify', function(msg){
	if(!recaptchaVerifier)
		recaptchaVerifier = new firebase.auth.RecaptchaVerifier(msg.id);

	firebase.auth().signInWithPhoneNumber(msg.number, recaptchaVerifier)
		.then((result) => {
			confirmationResult = result;
			Shiny.setInputValue(
				`${window.state.ns}fireblaze_phone_verification`,
				{success: true, response: result}
			);
		}).catch(function(error){
			recaptchaVerifier.reset(msg.id);
			Shiny.setInputValue(
				`${window.state.ns}fireblaze_phone_verification`,
				{success: false, response: error}
			);
		});
});

Shiny.addCustomMessageHandler('fireblaze-phone-confirm', function(msg) {
	if(!confirmationResult)
		return;

	confirmationResult.confirm(msg.code).then((result) => {
		Shiny.setInputValue(
			`${window.state.ns}fireblaze_phone_confirmation`,
			{success: true, response: result}
		);
	}).catch((error) => {
		Shiny.setInputValue(
			`${window.state.ns}fireblaze_phone_confirmation`,
			{success: false, response: error}
		);
	});
});
