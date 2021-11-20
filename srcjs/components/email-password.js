import 'shiny';
import { setInputValue } from '../utils';
import { 
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	sendEmailVerification,
	reauthenticateWithCredential,
	updatePassword,
	getAuth
} from "firebase/auth";

console.info('loaded email password module');

// create
Shiny.addCustomMessageHandler('fireblaze-create-email-password', function(msg) {
	const auth = getAuth();
	createUserWithEmailAndPassword(auth, msg.email, msg.password)
		.then(function(result) {
			setInputValue('created_email_user', {success: true, response: result}, msg.ns);
		}).catch(function(error) {
			setInputValue('created_email_user', {success: false, response: error}, msg.ns);
		});
});

// sign in
Shiny.addCustomMessageHandler('fireblaze-signin-email-password', function(msg) {
	const auth = getAuth();
	signInWithEmailAndPassword(auth, msg.email, msg.password)
		.then(function(result) {
			setInputValue('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch(function(error) {
			setInputValue('signed_up_user', {success: false, response: error}, msg.ns);
		});
});

// Send email verification
Shiny.addCustomMessageHandler('fireblaze-send-verification-email', function(msg) {
	const auth = getAuth();
	var user = auth.currentUser;

	sendEmailVerification(user)
		.then(function() {
			setInputValue('verification_email_sent', {success: true, response: 'successful'}, msg.ns)
		}).catch(function(error) {
			setInputValue('verification_email_sent', {success: false, response: error}, msg.ns)
		});
});

// reset email
Shiny.addCustomMessageHandler('fireblaze-reset-email', function(msg) {
	const auth = getAuth();
	
	sendPasswordResetEmail(auth, msg.email)
		.then(function() {
			setInputValue('reset_email_sent', {success: true, response: 'successful'}, msg.ns);
		}).catch(function(error) {
			setInputValue('reset_email_sent', {success: false, response: error}, msg.ns);
		});
});

// Reauthenticate
Shiny.addCustomMessageHandler('fireblaze-re-authenticate', function(msg) {
	const auth = getAuth();
	var user = auth.currentUser;
	var credential = firebase.auth.EmailAuthProvider.credential(user.email, msg.password);
	
	reauthenticateWithCredential(user, credential)
		.then(function() {
			setInputValue('re_authenticate', {success: true, response: 'successful'}, msg.ns);
		}).catch(function(error) {
			setInputValue('re_authenticate', {success: false, response: error}, msg.ns);
		});
});

// set password
Shiny.addCustomMessageHandler('fireblaze-set-password', function(msg) {
	const auth = getAuth();
	var user = auth.currentUser;
	
	updatePassword(user, msg.password)
		.then(function() {
			setInputValue('set_password', {success: true, response: 'successful'}, msg.ns);
		}).catch(function(error) {
			setInputValue('set_password', {success: false, response: error}, msg.ns);
		});
});
