"use strict";
(self["webpackChunkfirebase_r"] = self["webpackChunkfirebase_r"] || []).push([["phone"],{

/***/ "./srcjs/components/phone.js":
/*!***********************************!*\
  !*** ./srcjs/components/phone.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./srcjs/utils.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");




var confirmationResult;
var recaptchaVerifier;

Shiny.addCustomMessageHandler('fireblaze-phone-verify', msg => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	if(!recaptchaVerifier){

		if(msg.id == 'firebase-recaptcha')
			recaptchaVerifier = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.RecaptchaVerifier(msg.id, {
				callback: (response) => {
					(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.setInputValue)(
						'phone_recaptcha',
						response,
						msg.ns
					);
				}
			}, auth);
		else
			recaptchaVerifier = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.RecaptchaVerifier(msg.id, {
				size: 'invisible',
				callback: (response) => {
					(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.setInputValue)(
						'phone_recaptcha',
						response,
						msg.ns
					);
				}
			}, auth);	
	}
	
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithPhoneNumber)(auth, msg.number, recaptchaVerifier)
		.then(result => {
			confirmationResult = result;
			(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.setInputValue)(
				'phone_verification',
				{success: true, response: result},
				msg.ns
			);
		}).catch(error => {
			recaptchaVerifier.render().then(function(widgetId) {
				grecaptcha.reset(widgetId);
			});
			(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.setInputValue)(
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
			(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.setInputValue)(
				'phone_confirmation',
				{success: true, response: result},
				msg.ns
			);
		}).catch(error => {
			(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.setInputValue)(
				'phone_confirmation',
				{success: false, response: error},
				msg.ns
			);
		});
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["auth","utilities"], () => (__webpack_exec__("./srcjs/components/phone.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUM2QjtBQUtyQjs7QUFFdkI7QUFDQTs7QUFFQTtBQUNBLGNBQWMsc0RBQU87QUFDckI7O0FBRUE7QUFDQSwyQkFBMkIsNERBQWlCO0FBQzVDO0FBQ0EsS0FBSyx3REFBYTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsMkJBQTJCLDREQUFpQjtBQUM1QztBQUNBO0FBQ0EsS0FBSyx3REFBYTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxDQUFDLG9FQUFxQjtBQUN0QjtBQUNBO0FBQ0EsR0FBRyx3REFBYTtBQUNoQjtBQUNBLEtBQUssZ0NBQWdDO0FBQ3JDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHLHdEQUFhO0FBQ2hCO0FBQ0EsS0FBSyxnQ0FBZ0M7QUFDckM7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRyx3REFBYTtBQUNoQjtBQUNBLEtBQUssZ0NBQWdDO0FBQ3JDO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsR0FBRyx3REFBYTtBQUNoQjtBQUNBLEtBQUssZ0NBQWdDO0FBQ3JDO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpcmViYXNlLXIvLi9zcmNqcy9jb21wb25lbnRzL3Bob25lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc2hpbnknO1xuaW1wb3J0IHsgc2V0SW5wdXRWYWx1ZSB9IGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCB7XG5cdHNpZ25JbldpdGhQaG9uZU51bWJlcixcblx0UmVjYXB0Y2hhVmVyaWZpZXIsXG5cdGdldEF1dGgsXG59IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xuXG52YXIgY29uZmlybWF0aW9uUmVzdWx0O1xudmFyIHJlY2FwdGNoYVZlcmlmaWVyO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLXBob25lLXZlcmlmeScsIG1zZyA9PiB7XG5cdGNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XG5cdGlmKCFyZWNhcHRjaGFWZXJpZmllcil7XG5cblx0XHRpZihtc2cuaWQgPT0gJ2ZpcmViYXNlLXJlY2FwdGNoYScpXG5cdFx0XHRyZWNhcHRjaGFWZXJpZmllciA9IG5ldyBSZWNhcHRjaGFWZXJpZmllcihtc2cuaWQsIHtcblx0XHRcdFx0Y2FsbGJhY2s6IChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRcdHNldElucHV0VmFsdWUoXG5cdFx0XHRcdFx0XHQncGhvbmVfcmVjYXB0Y2hhJyxcblx0XHRcdFx0XHRcdHJlc3BvbnNlLFxuXHRcdFx0XHRcdFx0bXNnLm5zXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgYXV0aCk7XG5cdFx0ZWxzZVxuXHRcdFx0cmVjYXB0Y2hhVmVyaWZpZXIgPSBuZXcgUmVjYXB0Y2hhVmVyaWZpZXIobXNnLmlkLCB7XG5cdFx0XHRcdHNpemU6ICdpbnZpc2libGUnLFxuXHRcdFx0XHRjYWxsYmFjazogKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdFx0c2V0SW5wdXRWYWx1ZShcblx0XHRcdFx0XHRcdCdwaG9uZV9yZWNhcHRjaGEnLFxuXHRcdFx0XHRcdFx0cmVzcG9uc2UsXG5cdFx0XHRcdFx0XHRtc2cubnNcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBhdXRoKTtcdFxuXHR9XG5cdFxuXHRzaWduSW5XaXRoUGhvbmVOdW1iZXIoYXV0aCwgbXNnLm51bWJlciwgcmVjYXB0Y2hhVmVyaWZpZXIpXG5cdFx0LnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdGNvbmZpcm1hdGlvblJlc3VsdCA9IHJlc3VsdDtcblx0XHRcdHNldElucHV0VmFsdWUoXG5cdFx0XHRcdCdwaG9uZV92ZXJpZmljYXRpb24nLFxuXHRcdFx0XHR7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6IHJlc3VsdH0sXG5cdFx0XHRcdG1zZy5uc1xuXHRcdFx0KTtcblx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRyZWNhcHRjaGFWZXJpZmllci5yZW5kZXIoKS50aGVuKGZ1bmN0aW9uKHdpZGdldElkKSB7XG5cdFx0XHRcdGdyZWNhcHRjaGEucmVzZXQod2lkZ2V0SWQpO1xuXHRcdFx0fSk7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKFxuXHRcdFx0XHQncGhvbmVfdmVyaWZpY2F0aW9uJyxcblx0XHRcdFx0e3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9LFxuXHRcdFx0XHRtc2cubnNcblx0XHRcdCk7XG5cdFx0fSk7XG59KTtcblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1waG9uZS1jb25maXJtJywgbXNnID0+IHtcblx0aWYoIWNvbmZpcm1hdGlvblJlc3VsdClcblx0XHRyZXR1cm47XG5cblx0Y29uZmlybWF0aW9uUmVzdWx0LmNvbmZpcm0obXNnLmNvZGUpXG5cdFx0LnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdHNldElucHV0VmFsdWUoXG5cdFx0XHRcdCdwaG9uZV9jb25maXJtYXRpb24nLFxuXHRcdFx0XHR7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6IHJlc3VsdH0sXG5cdFx0XHRcdG1zZy5uc1xuXHRcdFx0KTtcblx0XHR9KS5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKFxuXHRcdFx0XHQncGhvbmVfY29uZmlybWF0aW9uJyxcblx0XHRcdFx0e3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9LFxuXHRcdFx0XHRtc2cubnNcblx0XHRcdCk7XG5cdFx0fSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==