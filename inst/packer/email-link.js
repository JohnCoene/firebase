"use strict";
(self["webpackChunkfirebase_r"] = self["webpackChunkfirebase_r"] || []).push([["email-link"],{

/***/ "./srcjs/components/email-link.js":
/*!****************************************!*\
  !*** ./srcjs/components/email-link.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./srcjs/utils.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");




Shiny.addCustomMessageHandler('fireblaze-send-email-link', (msg) => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	window.localStorage.setItem('fireblazeEmailSignIn', msg.email);
	if(!msg.config.url)
		msg.config.url = window.location.href;
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.sendSignInLinkToEmail)(auth, msg.email, msg.config)
		.then(() => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('email_link_sent', {success: true, response: msg.email}, msg.ns);
		})
		.catch(function(error) {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('email_link_sent', {success: false, response: error}, msg.ns);
		});
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["auth","utilities"], () => (__webpack_exec__("./srcjs/components/email-link.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtbGluay5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQzBCO0FBQ3NCOztBQUUvRDtBQUNBLGNBQWMsc0RBQU87QUFDckI7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvRUFBcUI7QUFDdEI7QUFDQSxHQUFHLHFEQUFhLHFCQUFxQixtQ0FBbUM7QUFDeEUsR0FBRztBQUNIO0FBQ0EsR0FBRyxxREFBYSxxQkFBcUIsZ0NBQWdDO0FBQ3JFLEdBQUc7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlyZWJhc2Utci8uL3NyY2pzL2NvbXBvbmVudHMvZW1haWwtbGluay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NoaW55JztcbmltcG9ydCB7IHNldElucHV0VmFsdWUgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBzZW5kU2lnbkluTGlua1RvRW1haWwsIGdldEF1dGggfSBmcm9tICdmaXJlYmFzZS9hdXRoJztcblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1zZW5kLWVtYWlsLWxpbmsnLCAobXNnKSA9PiB7XG5cdGNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XG5cdHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmlyZWJsYXplRW1haWxTaWduSW4nLCBtc2cuZW1haWwpO1xuXHRpZighbXNnLmNvbmZpZy51cmwpXG5cdFx0bXNnLmNvbmZpZy51cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblx0c2VuZFNpZ25JbkxpbmtUb0VtYWlsKGF1dGgsIG1zZy5lbWFpbCwgbXNnLmNvbmZpZylcblx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCdlbWFpbF9saW5rX3NlbnQnLCB7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6IG1zZy5lbWFpbH0sIG1zZy5ucyk7XG5cdFx0fSlcblx0XHQuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdHNldElucHV0VmFsdWUoJ2VtYWlsX2xpbmtfc2VudCcsIHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6IGVycm9yfSwgbXNnLm5zKTtcblx0XHR9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9