"use strict";
(self["webpackChunkfirebase_r"] = self["webpackChunkfirebase_r"] || []).push([["oauth"],{

/***/ "./srcjs/components/oauth.js":
/*!***********************************!*\
  !*** ./srcjs/components/oauth.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./srcjs/utils.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");




let oauthProviders = [];

Shiny.addCustomMessageHandler('fireblaze-set-oauth-provider', (msg) => {
	oauthProviders[msg.id] = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.OAuthProvider(msg.provider);
});

Shiny.addCustomMessageHandler('fireblaze-oauth-sign-in-popup', (msg) => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithPopup)(auth, oauthProviders[msg.id])
		.then((result) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch((error) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: false, response: error}, msg.ns);
		});
});

Shiny.addCustomMessageHandler('fireblaze-oauth-sign-in-redirect', (msg) => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithRedirect)(auth, oauthProviders[msg.id]);

	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getRedirectResult)()
		.then((result) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: true, response: result}, msg.ns);
		}).catch((error) => {
			(0,_utils__WEBPACK_IMPORTED_MODULE_1__.setInputValue)('signed_up_user', {success: false, response: error}, msg.ns);
		});
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["auth","utilities"], () => (__webpack_exec__("./srcjs/components/oauth.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUMwQjtBQU9sQjs7QUFFdkI7O0FBRUE7QUFDQSw4QkFBOEIsd0RBQWE7QUFDM0MsQ0FBQzs7QUFFRDtBQUNBLGNBQWMsc0RBQU87QUFDckIsQ0FBQyw4REFBZTtBQUNoQjtBQUNBLEdBQUcscURBQWEsb0JBQW9CLGdDQUFnQztBQUNwRSxHQUFHO0FBQ0gsR0FBRyxxREFBYSxvQkFBb0IsZ0NBQWdDO0FBQ3BFLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0EsY0FBYyxzREFBTztBQUNyQixDQUFDLGlFQUFrQjs7QUFFbkIsQ0FBQyxnRUFBaUI7QUFDbEI7QUFDQSxHQUFHLHFEQUFhLG9CQUFvQixnQ0FBZ0M7QUFDcEUsR0FBRztBQUNILEdBQUcscURBQWEsb0JBQW9CLGdDQUFnQztBQUNwRSxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpcmViYXNlLXIvLi9zcmNqcy9jb21wb25lbnRzL29hdXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc2hpbnknO1xuaW1wb3J0IHsgc2V0SW5wdXRWYWx1ZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IFxuXHRzaWduSW5XaXRoUG9wdXAsXG5cdHNpZ25JbldpdGhSZWRpcmVjdCxcblx0Z2V0UmVkaXJlY3RSZXN1bHQsXG5cdGdldEF1dGgsXG5cdE9BdXRoUHJvdmlkZXJcbn0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5cbmxldCBvYXV0aFByb3ZpZGVycyA9IFtdO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLXNldC1vYXV0aC1wcm92aWRlcicsIChtc2cpID0+IHtcblx0b2F1dGhQcm92aWRlcnNbbXNnLmlkXSA9IG5ldyBPQXV0aFByb3ZpZGVyKG1zZy5wcm92aWRlcik7XG59KTtcblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1vYXV0aC1zaWduLWluLXBvcHVwJywgKG1zZykgPT4ge1xuXHRjb25zdCBhdXRoID0gZ2V0QXV0aCgpO1xuXHRzaWduSW5XaXRoUG9wdXAoYXV0aCwgb2F1dGhQcm92aWRlcnNbbXNnLmlkXSlcblx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCdzaWduZWRfdXBfdXNlcicsIHtzdWNjZXNzOiB0cnVlLCByZXNwb25zZTogcmVzdWx0fSwgbXNnLm5zKTtcblx0XHR9KS5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3NpZ25lZF91cF91c2VyJywge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9LCBtc2cubnMpO1xuXHRcdH0pO1xufSk7XG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtb2F1dGgtc2lnbi1pbi1yZWRpcmVjdCcsIChtc2cpID0+IHtcblx0Y29uc3QgYXV0aCA9IGdldEF1dGgoKTtcblx0c2lnbkluV2l0aFJlZGlyZWN0KGF1dGgsIG9hdXRoUHJvdmlkZXJzW21zZy5pZF0pO1xuXG5cdGdldFJlZGlyZWN0UmVzdWx0KClcblx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCdzaWduZWRfdXBfdXNlcicsIHtzdWNjZXNzOiB0cnVlLCByZXNwb25zZTogcmVzdWx0fSwgbXNnLm5zKTtcblx0XHR9KS5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3NpZ25lZF91cF91c2VyJywge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9LCBtc2cubnMpO1xuXHRcdH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=