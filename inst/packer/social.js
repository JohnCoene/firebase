"use strict";
(self["webpackChunkfirebase_r"] = self["webpackChunkfirebase_r"] || []).push([["social"],{

/***/ "./srcjs/components/social.js":
/*!************************************!*\
  !*** ./srcjs/components/social.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./srcjs/utils.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");




// providers
let twitter = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.TwitterAuthProvider();
let facebook = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.FacebookAuthProvider();
let github = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.GithubAuthProvider();
let google = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthProvider();

// GOOGLE
Shiny.addCustomMessageHandler('fireblaze-google-scope', (msg) => {
	google.addScope(msg);
});

Shiny.addCustomMessageHandler('fireblaze-google-sign-in-popup', (msg) => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithPopup)(auth, google)
		.then((result) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch((error) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: false, response: error}, msg.ns);
		});
});

Shiny.addCustomMessageHandler('fireblaze-google-sign-in-redirect', (msg) => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithRedirect)(auth, google);

	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getRedirectResult)(auth)
		.then((result) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch((error) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: false, response: error}, msg.ns);
		});
});

// FACEBOOK
Shiny.addCustomMessageHandler('fireblaze-facebook-scope', (msg) => {
	facebook.addScope(msg);
});

Shiny.addCustomMessageHandler('fireblaze-facebook-sign-in-popup', (msg) => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithPopup)(auth, facebook)
		.then((result) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch((error) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: false, response: error}, msg.ns);
		});
});

Shiny.addCustomMessageHandler('fireblaze-facebook-sign-in-redirect', (msg) => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithRedirect)(auth, facebook);

	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getRedirectResult)(auth)
		.then((result) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch((error) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: false, response: error}, msg.ns);
		});
});

// GITHUB
Shiny.addCustomMessageHandler('fireblaze-github-scope', (msg) => {
	github.addScope(msg);
});

Shiny.addCustomMessageHandler('fireblaze-github-sign-in-popup', (msg) => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithPopup)(auth, github)
		.then(result => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch(error => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: false, response: error}, msg.ns);
		});
});

Shiny.addCustomMessageHandler('fireblaze-github-sign-in-redirect', (msg) => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithRedirect)(auth, github);

	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getRedirectResult)(auth)
		.then(result => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch(error => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: false, response: error}, msg.ns);
		});
});

// TWITTER
Shiny.addCustomMessageHandler('fireblaze-twitter-scope', (msg) => {
	twitter.addScope(msg);
});

Shiny.addCustomMessageHandler('fireblaze-twitter-sign-in-popup', (msg) => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithPopup)(auth, twitter)
		.then(result => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch(error => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: false, response: error}, msg.ns);
		});
});

Shiny.addCustomMessageHandler('fireblaze-twitter-sign-in-redirect', msg => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithRedirect)(auth, twitter);

	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getRedirectResult)(auth)
		.then(result => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch(error => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: false, response: error}, msg.ns);
		});
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["auth","utilities"], () => (__webpack_exec__("./srcjs/components/social.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWU7QUFDMEI7QUFVbkI7O0FBRXRCO0FBQ0Esa0JBQWtCLDhEQUFtQjtBQUNyQyxtQkFBbUIsK0RBQW9CO0FBQ3ZDLGlCQUFpQiw2REFBa0I7QUFDbkMsaUJBQWlCLDZEQUFrQjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLGNBQWMsc0RBQU87QUFDckIsQ0FBQyw4REFBZTtBQUNoQjtBQUNBLEdBQUcscURBQWEsb0JBQW9CLGdDQUFnQztBQUNwRSxHQUFHO0FBQ0gsR0FBRyxxREFBYSxvQkFBb0IsZ0NBQWdDO0FBQ3BFLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0EsY0FBYyxzREFBTztBQUNyQixDQUFDLGlFQUFrQjs7QUFFbkIsQ0FBQyxnRUFBaUI7QUFDbEI7QUFDQSxHQUFHLHFEQUFhLG9CQUFvQixnQ0FBZ0M7QUFDcEUsR0FBRztBQUNILEdBQUcscURBQWEsb0JBQW9CLGdDQUFnQztBQUNwRSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsY0FBYyxzREFBTztBQUNyQixDQUFDLDhEQUFlO0FBQ2hCO0FBQ0EsR0FBRyxxREFBYSxvQkFBb0IsZ0NBQWdDO0FBQ3BFLEdBQUc7QUFDSCxHQUFHLHFEQUFhLG9CQUFvQixnQ0FBZ0M7QUFDcEUsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQSxjQUFjLHNEQUFPO0FBQ3JCLENBQUMsaUVBQWtCOztBQUVuQixDQUFDLGdFQUFpQjtBQUNsQjtBQUNBLEdBQUcscURBQWEsb0JBQW9CLGdDQUFnQztBQUNwRSxHQUFHO0FBQ0gsR0FBRyxxREFBYSxvQkFBb0IsZ0NBQWdDO0FBQ3BFLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxjQUFjLHNEQUFPO0FBQ3JCLENBQUMsOERBQWU7QUFDaEI7QUFDQSxHQUFHLHFEQUFhLG9CQUFvQixnQ0FBZ0M7QUFDcEUsR0FBRztBQUNILEdBQUcscURBQWEsb0JBQW9CLGdDQUFnQztBQUNwRSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBLGNBQWMsc0RBQU87QUFDckIsQ0FBQyxpRUFBa0I7O0FBRW5CLENBQUMsZ0VBQWlCO0FBQ2xCO0FBQ0EsR0FBRyxxREFBYSxvQkFBb0IsZ0NBQWdDO0FBQ3BFLEdBQUc7QUFDSCxHQUFHLHFEQUFhLG9CQUFvQixnQ0FBZ0M7QUFDcEUsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLGNBQWMsc0RBQU87QUFDckIsQ0FBQyw4REFBZTtBQUNoQjtBQUNBLEdBQUcscURBQWEsb0JBQW9CLGdDQUFnQztBQUNwRSxHQUFHO0FBQ0gsR0FBRyxxREFBYSxvQkFBb0IsZ0NBQWdDO0FBQ3BFLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0EsY0FBYyxzREFBTztBQUNyQixDQUFDLGlFQUFrQjs7QUFFbkIsQ0FBQyxnRUFBaUI7QUFDbEI7QUFDQSxHQUFHLHFEQUFhLG9CQUFvQixnQ0FBZ0M7QUFDcEUsR0FBRztBQUNILEdBQUcscURBQWEsb0JBQW9CLGdDQUFnQztBQUNwRSxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpcmViYXNlLXIvLi9zcmNqcy9jb21wb25lbnRzL3NvY2lhbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NoaW55JztcbmltcG9ydCB7IHNldElucHV0VmFsdWUgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQge1xuXHRUd2l0dGVyQXV0aFByb3ZpZGVyLFxuXHRGYWNlYm9va0F1dGhQcm92aWRlcixcblx0R2l0aHViQXV0aFByb3ZpZGVyLFxuXHRHb29nbGVBdXRoUHJvdmlkZXIsXG5cdGdldEF1dGgsXG5cdHNpZ25JbldpdGhQb3B1cCxcblx0c2lnbkluV2l0aFJlZGlyZWN0LFxuXHRnZXRSZWRpcmVjdFJlc3VsdFxufSBmcm9tICdmaXJlYmFzZS9hdXRoJ1xuXG4vLyBwcm92aWRlcnNcbmxldCB0d2l0dGVyID0gbmV3IFR3aXR0ZXJBdXRoUHJvdmlkZXIoKTtcbmxldCBmYWNlYm9vayA9IG5ldyBGYWNlYm9va0F1dGhQcm92aWRlcigpO1xubGV0IGdpdGh1YiA9IG5ldyBHaXRodWJBdXRoUHJvdmlkZXIoKTtcbmxldCBnb29nbGUgPSBuZXcgR29vZ2xlQXV0aFByb3ZpZGVyKCk7XG5cbi8vIEdPT0dMRVxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1nb29nbGUtc2NvcGUnLCAobXNnKSA9PiB7XG5cdGdvb2dsZS5hZGRTY29wZShtc2cpO1xufSk7XG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtZ29vZ2xlLXNpZ24taW4tcG9wdXAnLCAobXNnKSA9PiB7XG5cdGNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XG5cdHNpZ25JbldpdGhQb3B1cChhdXRoLCBnb29nbGUpXG5cdFx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuXHRcdFx0c2V0SW5wdXRWYWx1ZSgnc2lnbmVkX3VwX3VzZXInLCB7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6IHJlc3VsdH0sIG1zZy5ucyk7XG5cdFx0fSkuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCdzaWduZWRfdXBfdXNlcicsIHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6IGVycm9yfSwgbXNnLm5zKTtcblx0XHR9KTtcbn0pO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLWdvb2dsZS1zaWduLWluLXJlZGlyZWN0JywgKG1zZykgPT4ge1xuXHRjb25zdCBhdXRoID0gZ2V0QXV0aCgpO1xuXHRzaWduSW5XaXRoUmVkaXJlY3QoYXV0aCwgZ29vZ2xlKTtcblxuXHRnZXRSZWRpcmVjdFJlc3VsdChhdXRoKVxuXHRcdC50aGVuKChyZXN1bHQpID0+IHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3NpZ25lZF91cF91c2VyJywge3N1Y2Nlc3M6IHRydWUsIHJlc3BvbnNlOiByZXN1bHR9LCBtc2cubnMpO1xuXHRcdH0pLmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0c2V0SW5wdXRWYWx1ZSgnc2lnbmVkX3VwX3VzZXInLCB7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiBlcnJvcn0sIG1zZy5ucyk7XG5cdFx0fSk7XG59KTtcblxuLy8gRkFDRUJPT0tcblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtZmFjZWJvb2stc2NvcGUnLCAobXNnKSA9PiB7XG5cdGZhY2Vib29rLmFkZFNjb3BlKG1zZyk7XG59KTtcblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1mYWNlYm9vay1zaWduLWluLXBvcHVwJywgKG1zZykgPT4ge1xuXHRjb25zdCBhdXRoID0gZ2V0QXV0aCgpO1xuXHRzaWduSW5XaXRoUG9wdXAoYXV0aCwgZmFjZWJvb2spXG5cdFx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuXHRcdFx0c2V0SW5wdXRWYWx1ZSgnc2lnbmVkX3VwX3VzZXInLCB7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6IHJlc3VsdH0sIG1zZy5ucyk7XG5cdFx0fSkuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCdzaWduZWRfdXBfdXNlcicsIHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6IGVycm9yfSwgbXNnLm5zKTtcblx0XHR9KTtcbn0pO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLWZhY2Vib29rLXNpZ24taW4tcmVkaXJlY3QnLCAobXNnKSA9PiB7XG5cdGNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XG5cdHNpZ25JbldpdGhSZWRpcmVjdChhdXRoLCBmYWNlYm9vayk7XG5cblx0Z2V0UmVkaXJlY3RSZXN1bHQoYXV0aClcblx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCdzaWduZWRfdXBfdXNlcicsIHtzdWNjZXNzOiB0cnVlLCByZXNwb25zZTogcmVzdWx0fSwgbXNnLm5zKTtcblx0XHR9KS5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3NpZ25lZF91cF91c2VyJywge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9LCBtc2cubnMpO1xuXHRcdH0pO1xufSk7XG5cbi8vIEdJVEhVQlxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1naXRodWItc2NvcGUnLCAobXNnKSA9PiB7XG5cdGdpdGh1Yi5hZGRTY29wZShtc2cpO1xufSk7XG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtZ2l0aHViLXNpZ24taW4tcG9wdXAnLCAobXNnKSA9PiB7XG5cdGNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XG5cdHNpZ25JbldpdGhQb3B1cChhdXRoLCBnaXRodWIpXG5cdFx0LnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3NpZ25lZF91cF91c2VyJywge3N1Y2Nlc3M6IHRydWUsIHJlc3BvbnNlOiByZXN1bHR9LCBtc2cubnMpO1xuXHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3NpZ25lZF91cF91c2VyJywge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9LCBtc2cubnMpO1xuXHRcdH0pO1xufSk7XG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtZ2l0aHViLXNpZ24taW4tcmVkaXJlY3QnLCAobXNnKSA9PiB7XG5cdGNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XG5cdHNpZ25JbldpdGhSZWRpcmVjdChhdXRoLCBnaXRodWIpO1xuXG5cdGdldFJlZGlyZWN0UmVzdWx0KGF1dGgpXG5cdFx0LnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3NpZ25lZF91cF91c2VyJywge3N1Y2Nlc3M6IHRydWUsIHJlc3BvbnNlOiByZXN1bHR9LCBtc2cubnMpO1xuXHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3NpZ25lZF91cF91c2VyJywge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9LCBtc2cubnMpO1xuXHRcdH0pO1xufSk7XG5cbi8vIFRXSVRURVJcblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtdHdpdHRlci1zY29wZScsIChtc2cpID0+IHtcblx0dHdpdHRlci5hZGRTY29wZShtc2cpO1xufSk7XG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtdHdpdHRlci1zaWduLWluLXBvcHVwJywgKG1zZykgPT4ge1xuXHRjb25zdCBhdXRoID0gZ2V0QXV0aCgpO1xuXHRzaWduSW5XaXRoUG9wdXAoYXV0aCwgdHdpdHRlcilcblx0XHQudGhlbihyZXN1bHQgPT4ge1xuXHRcdFx0c2V0SW5wdXRWYWx1ZSgnc2lnbmVkX3VwX3VzZXInLCB7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6IHJlc3VsdH0sIG1zZy5ucyk7XG5cdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0c2V0SW5wdXRWYWx1ZSgnc2lnbmVkX3VwX3VzZXInLCB7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiBlcnJvcn0sIG1zZy5ucyk7XG5cdFx0fSk7XG59KTtcblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS10d2l0dGVyLXNpZ24taW4tcmVkaXJlY3QnLCBtc2cgPT4ge1xuXHRjb25zdCBhdXRoID0gZ2V0QXV0aCgpO1xuXHRzaWduSW5XaXRoUmVkaXJlY3QoYXV0aCwgdHdpdHRlcik7XG5cblx0Z2V0UmVkaXJlY3RSZXN1bHQoYXV0aClcblx0XHQudGhlbihyZXN1bHQgPT4ge1xuXHRcdFx0c2V0SW5wdXRWYWx1ZSgnc2lnbmVkX3VwX3VzZXInLCB7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6IHJlc3VsdH0sIG1zZy5ucyk7XG5cdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0c2V0SW5wdXRWYWx1ZSgnc2lnbmVkX3VwX3VzZXInLCB7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiBlcnJvcn0sIG1zZy5ucyk7XG5cdFx0fSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==