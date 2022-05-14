"use strict";
(self["webpackChunkfirebase_r"] = self["webpackChunkfirebase_r"] || []).push([["email-password"],{

/***/ "./srcjs/components/email-password.js":
/*!********************************************!*\
  !*** ./srcjs/components/email-password.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./srcjs/utils.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");




// create
Shiny.addCustomMessageHandler('fireblaze-create-email-password', function(msg) {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.createUserWithEmailAndPassword)(auth, msg.email, msg.password)
		.then(function(result) {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('created_email_user', {success: true, response: result}, msg.ns);
		}).catch(function(error) {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('created_email_user', {success: false, response: error}, msg.ns);
		});
});

// sign in
Shiny.addCustomMessageHandler('fireblaze-signin-email-password', function(msg) {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithEmailAndPassword)(auth, msg.email, msg.password)
		.then(function(result) {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch(function(error) {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: false, response: error}, msg.ns);
		});
});

// Send email verification
Shiny.addCustomMessageHandler('fireblaze-send-verification-email', function(msg) {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	var user = auth.currentUser;

	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.sendEmailVerification)(user)
		.then(function() {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('verification_email_sent', {success: true, response: 'successful'}, msg.ns)
		}).catch(function(error) {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('verification_email_sent', {success: false, response: error}, msg.ns)
		});
});

// reset email
Shiny.addCustomMessageHandler('fireblaze-reset-email', function(msg) {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.sendPasswordResetEmail)(auth, msg.email)
		.then(function() {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('reset_email_sent', {success: true, response: 'successful'}, msg.ns);
		}).catch(function(error) {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('reset_email_sent', {success: false, response: error}, msg.ns);
		});
});

// Reauthenticate
Shiny.addCustomMessageHandler('fireblaze-re-authenticate', function(msg) {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	var user = auth.currentUser;
	var credential = firebase.auth.EmailAuthProvider.credential(user.email, msg.password);
	
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.reauthenticateWithCredential)(user, credential)
		.then(function() {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('re_authenticate', {success: true, response: 'successful'}, msg.ns);
		}).catch(function(error) {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('re_authenticate', {success: false, response: error}, msg.ns);
		});
});

// set password
Shiny.addCustomMessageHandler('fireblaze-set-password', function(msg) {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	var user = auth.currentUser;
	
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.updatePassword)(user, msg.password)
		.then(function() {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('set_password', {success: true, response: 'successful'}, msg.ns);
		}).catch(function(error) {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('set_password', {success: false, response: error}, msg.ns);
		});
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["auth","utilities"], () => (__webpack_exec__("./srcjs/components/email-password.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtcGFzc3dvcmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUMwQjtBQVNsQjs7QUFFdkI7QUFDQTtBQUNBLGNBQWMsc0RBQU87QUFDckIsQ0FBQyw2RUFBOEI7QUFDL0I7QUFDQSxHQUFHLHFEQUFhLHdCQUF3QixnQ0FBZ0M7QUFDeEUsR0FBRztBQUNILEdBQUcscURBQWEsd0JBQXdCLGdDQUFnQztBQUN4RSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsY0FBYyxzREFBTztBQUNyQixDQUFDLHlFQUEwQjtBQUMzQjtBQUNBLEdBQUcscURBQWEsb0JBQW9CLGdDQUFnQztBQUNwRSxHQUFHO0FBQ0gsR0FBRyxxREFBYSxvQkFBb0IsZ0NBQWdDO0FBQ3BFLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQSxjQUFjLHNEQUFPO0FBQ3JCOztBQUVBLENBQUMsb0VBQXFCO0FBQ3RCO0FBQ0EsR0FBRyxxREFBYSw2QkFBNkIsc0NBQXNDO0FBQ25GLEdBQUc7QUFDSCxHQUFHLHFEQUFhLDZCQUE2QixnQ0FBZ0M7QUFDN0UsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBLGNBQWMsc0RBQU87QUFDckI7QUFDQSxDQUFDLHFFQUFzQjtBQUN2QjtBQUNBLEdBQUcscURBQWEsc0JBQXNCLHNDQUFzQztBQUM1RSxHQUFHO0FBQ0gsR0FBRyxxREFBYSxzQkFBc0IsZ0NBQWdDO0FBQ3RFLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQSxjQUFjLHNEQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLENBQUMsMkVBQTRCO0FBQzdCO0FBQ0EsR0FBRyxxREFBYSxxQkFBcUIsc0NBQXNDO0FBQzNFLEdBQUc7QUFDSCxHQUFHLHFEQUFhLHFCQUFxQixnQ0FBZ0M7QUFDckUsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBLGNBQWMsc0RBQU87QUFDckI7QUFDQTtBQUNBLENBQUMsNkRBQWM7QUFDZjtBQUNBLEdBQUcscURBQWEsa0JBQWtCLHNDQUFzQztBQUN4RSxHQUFHO0FBQ0gsR0FBRyxxREFBYSxrQkFBa0IsZ0NBQWdDO0FBQ2xFLEdBQUc7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlyZWJhc2Utci8uL3NyY2pzL2NvbXBvbmVudHMvZW1haWwtcGFzc3dvcmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzaGlueSc7XG5pbXBvcnQgeyBzZXRJbnB1dFZhbHVlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgXG5cdGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCxcblx0c2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQsXG5cdHNlbmRQYXNzd29yZFJlc2V0RW1haWwsXG5cdHNlbmRFbWFpbFZlcmlmaWNhdGlvbixcblx0cmVhdXRoZW50aWNhdGVXaXRoQ3JlZGVudGlhbCxcblx0dXBkYXRlUGFzc3dvcmQsXG5cdGdldEF1dGhcbn0gZnJvbSBcImZpcmViYXNlL2F1dGhcIjtcblxuLy8gY3JlYXRlXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLWNyZWF0ZS1lbWFpbC1wYXNzd29yZCcsIGZ1bmN0aW9uKG1zZykge1xuXHRjb25zdCBhdXRoID0gZ2V0QXV0aCgpO1xuXHRjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoYXV0aCwgbXNnLmVtYWlsLCBtc2cucGFzc3dvcmQpXG5cdFx0LnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCdjcmVhdGVkX2VtYWlsX3VzZXInLCB7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6IHJlc3VsdH0sIG1zZy5ucyk7XG5cdFx0fSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdHNldElucHV0VmFsdWUoJ2NyZWF0ZWRfZW1haWxfdXNlcicsIHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6IGVycm9yfSwgbXNnLm5zKTtcblx0XHR9KTtcbn0pO1xuXG4vLyBzaWduIGluXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLXNpZ25pbi1lbWFpbC1wYXNzd29yZCcsIGZ1bmN0aW9uKG1zZykge1xuXHRjb25zdCBhdXRoID0gZ2V0QXV0aCgpO1xuXHRzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCBtc2cuZW1haWwsIG1zZy5wYXNzd29yZClcblx0XHQudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3NpZ25lZF91cF91c2VyJywge3N1Y2Nlc3M6IHRydWUsIHJlc3BvbnNlOiByZXN1bHR9LCBtc2cubnMpO1xuXHRcdH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCdzaWduZWRfdXBfdXNlcicsIHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6IGVycm9yfSwgbXNnLm5zKTtcblx0XHR9KTtcbn0pO1xuXG4vLyBTZW5kIGVtYWlsIHZlcmlmaWNhdGlvblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1zZW5kLXZlcmlmaWNhdGlvbi1lbWFpbCcsIGZ1bmN0aW9uKG1zZykge1xuXHRjb25zdCBhdXRoID0gZ2V0QXV0aCgpO1xuXHR2YXIgdXNlciA9IGF1dGguY3VycmVudFVzZXI7XG5cblx0c2VuZEVtYWlsVmVyaWZpY2F0aW9uKHVzZXIpXG5cdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCd2ZXJpZmljYXRpb25fZW1haWxfc2VudCcsIHtzdWNjZXNzOiB0cnVlLCByZXNwb25zZTogJ3N1Y2Nlc3NmdWwnfSwgbXNnLm5zKVxuXHRcdH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCd2ZXJpZmljYXRpb25fZW1haWxfc2VudCcsIHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6IGVycm9yfSwgbXNnLm5zKVxuXHRcdH0pO1xufSk7XG5cbi8vIHJlc2V0IGVtYWlsXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLXJlc2V0LWVtYWlsJywgZnVuY3Rpb24obXNnKSB7XG5cdGNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XG5cdFxuXHRzZW5kUGFzc3dvcmRSZXNldEVtYWlsKGF1dGgsIG1zZy5lbWFpbClcblx0XHQudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3Jlc2V0X2VtYWlsX3NlbnQnLCB7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6ICdzdWNjZXNzZnVsJ30sIG1zZy5ucyk7XG5cdFx0fSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3Jlc2V0X2VtYWlsX3NlbnQnLCB7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiBlcnJvcn0sIG1zZy5ucyk7XG5cdFx0fSk7XG59KTtcblxuLy8gUmVhdXRoZW50aWNhdGVcblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtcmUtYXV0aGVudGljYXRlJywgZnVuY3Rpb24obXNnKSB7XG5cdGNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XG5cdHZhciB1c2VyID0gYXV0aC5jdXJyZW50VXNlcjtcblx0dmFyIGNyZWRlbnRpYWwgPSBmaXJlYmFzZS5hdXRoLkVtYWlsQXV0aFByb3ZpZGVyLmNyZWRlbnRpYWwodXNlci5lbWFpbCwgbXNnLnBhc3N3b3JkKTtcblx0XG5cdHJlYXV0aGVudGljYXRlV2l0aENyZWRlbnRpYWwodXNlciwgY3JlZGVudGlhbClcblx0XHQudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3JlX2F1dGhlbnRpY2F0ZScsIHtzdWNjZXNzOiB0cnVlLCByZXNwb25zZTogJ3N1Y2Nlc3NmdWwnfSwgbXNnLm5zKTtcblx0XHR9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0c2V0SW5wdXRWYWx1ZSgncmVfYXV0aGVudGljYXRlJywge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9LCBtc2cubnMpO1xuXHRcdH0pO1xufSk7XG5cbi8vIHNldCBwYXNzd29yZFxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1zZXQtcGFzc3dvcmQnLCBmdW5jdGlvbihtc2cpIHtcblx0Y29uc3QgYXV0aCA9IGdldEF1dGgoKTtcblx0dmFyIHVzZXIgPSBhdXRoLmN1cnJlbnRVc2VyO1xuXHRcblx0dXBkYXRlUGFzc3dvcmQodXNlciwgbXNnLnBhc3N3b3JkKVxuXHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0c2V0SW5wdXRWYWx1ZSgnc2V0X3Bhc3N3b3JkJywge3N1Y2Nlc3M6IHRydWUsIHJlc3BvbnNlOiAnc3VjY2Vzc2Z1bCd9LCBtc2cubnMpO1xuXHRcdH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCdzZXRfcGFzc3dvcmQnLCB7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiBlcnJvcn0sIG1zZy5ucyk7XG5cdFx0fSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==