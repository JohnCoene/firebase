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
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/esm/index.esm.js");




let oauthProviders = [];

Shiny.addCustomMessageHandler('fireblaze-set-oauth-provider', (msg) => {
	oauthProviders[msg.id] = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.OAuthProvider(msg.provider);

	if(Object.entries(msg.opts).length > 0)
		oauthProviders[msg.id].setCustomParameters(msg.opts)
});

Shiny.addCustomMessageHandler('fireblaze-oauth-sign-in-popup', (msg) => {
	const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();
	(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithPopup)(auth, oauthProviders[msg.id])
		.then((result) => {
      if(msg.credentials) {
        const credential = firebase_auth__WEBPACK_IMPORTED_MODULE_2__.OAuthProvider.credentialFromResult(result);
        result.credentials = {
          idToken: credential.idToken,
          accessToken: credential.accessToken,
        };
      }
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
      if(msg.credentials) {
        const credential = firebase_auth__WEBPACK_IMPORTED_MODULE_2__.OAuthProvider.credentialFromResult(result);
        result.credentials = {
          idToken: credential.idToken,
          accessToken: credential.accessToken,
        };
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUMwQjtBQU9sQjs7QUFFdkI7O0FBRUE7QUFDQSw4QkFBOEIsd0RBQWE7O0FBRTNDO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsY0FBYyxzREFBTztBQUNyQixDQUFDLDhEQUFlO0FBQ2hCO0FBQ0E7QUFDQSwyQkFBMkIsNkVBQWtDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLHFEQUFhLG9CQUFvQixnQ0FBZ0M7QUFDcEUsR0FBRztBQUNILEdBQUcscURBQWEsb0JBQW9CLGdDQUFnQztBQUNwRSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBLGNBQWMsc0RBQU87QUFDckIsQ0FBQyxpRUFBa0I7O0FBRW5CLENBQUMsZ0VBQWlCO0FBQ2xCO0FBQ0E7QUFDQSwyQkFBMkIsNkVBQWtDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLHFEQUFhLG9CQUFvQixnQ0FBZ0M7QUFDcEUsR0FBRztBQUNILEdBQUcscURBQWEsb0JBQW9CLGdDQUFnQztBQUNwRSxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpcmViYXNlLXIvLi9zcmNqcy9jb21wb25lbnRzL29hdXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc2hpbnknO1xuaW1wb3J0IHsgc2V0SW5wdXRWYWx1ZSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IFxuXHRzaWduSW5XaXRoUG9wdXAsXG5cdHNpZ25JbldpdGhSZWRpcmVjdCxcblx0Z2V0UmVkaXJlY3RSZXN1bHQsXG5cdGdldEF1dGgsXG5cdE9BdXRoUHJvdmlkZXJcbn0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5cbmxldCBvYXV0aFByb3ZpZGVycyA9IFtdO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLXNldC1vYXV0aC1wcm92aWRlcicsIChtc2cpID0+IHtcblx0b2F1dGhQcm92aWRlcnNbbXNnLmlkXSA9IG5ldyBPQXV0aFByb3ZpZGVyKG1zZy5wcm92aWRlcik7XG5cblx0aWYoT2JqZWN0LmVudHJpZXMobXNnLm9wdHMpLmxlbmd0aCA+IDApXG5cdFx0b2F1dGhQcm92aWRlcnNbbXNnLmlkXS5zZXRDdXN0b21QYXJhbWV0ZXJzKG1zZy5vcHRzKVxufSk7XG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtb2F1dGgtc2lnbi1pbi1wb3B1cCcsIChtc2cpID0+IHtcblx0Y29uc3QgYXV0aCA9IGdldEF1dGgoKTtcblx0c2lnbkluV2l0aFBvcHVwKGF1dGgsIG9hdXRoUHJvdmlkZXJzW21zZy5pZF0pXG5cdFx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgaWYobXNnLmNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWwgPSBPQXV0aFByb3ZpZGVyLmNyZWRlbnRpYWxGcm9tUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgIHJlc3VsdC5jcmVkZW50aWFscyA9IHtcbiAgICAgICAgICBpZFRva2VuOiBjcmVkZW50aWFsLmlkVG9rZW4sXG4gICAgICAgICAgYWNjZXNzVG9rZW46IGNyZWRlbnRpYWwuYWNjZXNzVG9rZW4sXG4gICAgICAgIH07XG4gICAgICB9XG5cdFx0XHRzZXRJbnB1dFZhbHVlKCdzaWduZWRfdXBfdXNlcicsIHtzdWNjZXNzOiB0cnVlLCByZXNwb25zZTogcmVzdWx0fSwgbXNnLm5zKTtcblx0XHR9KS5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdHNldElucHV0VmFsdWUoJ3NpZ25lZF91cF91c2VyJywge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9LCBtc2cubnMpO1xuXHRcdH0pO1xufSk7XG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtb2F1dGgtc2lnbi1pbi1yZWRpcmVjdCcsIChtc2cpID0+IHtcblx0Y29uc3QgYXV0aCA9IGdldEF1dGgoKTtcblx0c2lnbkluV2l0aFJlZGlyZWN0KGF1dGgsIG9hdXRoUHJvdmlkZXJzW21zZy5pZF0pO1xuXG5cdGdldFJlZGlyZWN0UmVzdWx0KClcblx0XHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICBpZihtc2cuY3JlZGVudGlhbHMpIHtcbiAgICAgICAgY29uc3QgY3JlZGVudGlhbCA9IE9BdXRoUHJvdmlkZXIuY3JlZGVudGlhbEZyb21SZXN1bHQocmVzdWx0KTtcbiAgICAgICAgcmVzdWx0LmNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgIGlkVG9rZW46IGNyZWRlbnRpYWwuaWRUb2tlbixcbiAgICAgICAgICBhY2Nlc3NUb2tlbjogY3JlZGVudGlhbC5hY2Nlc3NUb2tlbixcbiAgICAgICAgfTtcbiAgICAgIH1cblx0XHRcdHNldElucHV0VmFsdWUoJ3NpZ25lZF91cF91c2VyJywge3N1Y2Nlc3M6IHRydWUsIHJlc3BvbnNlOiByZXN1bHR9LCBtc2cubnMpO1xuXHRcdH0pLmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0c2V0SW5wdXRWYWx1ZSgnc2lnbmVkX3VwX3VzZXInLCB7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiBlcnJvcn0sIG1zZy5ucyk7XG5cdFx0fSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==