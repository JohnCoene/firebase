Shiny.addCustomMessageHandler('fireblaze-set-captcha', function(msg){
	window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(msg.id);
	let appVerifier = window.recaptchaVerifier;
	firebase.auth().signInWithPhoneNumber(msg.number, appVerifier)
		.then((confirmationResult) => {
			console.log(confirmationResult);
			window.confirmationResult = confirmationResult;
		}).catch(function(error){
			console.error(error);
		});
});
