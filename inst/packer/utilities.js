"use strict";
(self["webpackChunkfirebase_r"] = self["webpackChunkfirebase_r"] || []).push([["utilities"],{

/***/ "./srcjs/utils.js":
/*!************************!*\
  !*** ./srcjs/utils.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "persistenceOpts": () => (/* binding */ persistenceOpts),
/* harmony export */   "showHideOnLogin": () => (/* binding */ showHideOnLogin),
/* harmony export */   "showHideOnLogout": () => (/* binding */ showHideOnLogout),
/* harmony export */   "setInputValue": () => (/* binding */ setInputValue),
/* harmony export */   "setInputValue2": () => (/* binding */ setInputValue2),
/* harmony export */   "setLanguageCode": () => (/* binding */ setLanguageCode)
/* harmony export */ });
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");



// Convert persistence option to firebase
const persistenceOpts = (p) => {
  if(p == "none") 
    return ;

  if(p == "memory") 
    return firebase_auth__WEBPACK_IMPORTED_MODULE_1__.inMemoryPersistence;

  if(p == "session") 
    return firebase_auth__WEBPACK_IMPORTED_MODULE_1__.browserSessionPersistence

  return firebase_auth__WEBPACK_IMPORTED_MODULE_1__.browserLocalPersistence;
}

// toggle elements 
const showHideOnLogin = (method) => {
  var els = document.getElementsByClassName('fireblaze__requires__signin');

  for(var i = 0; i < els.length; i++){
    if(method == "hide") {
      els[i].classList.remove('fireblaze__hidden');
      $(els[i]).hide();
    } else if(method == "show") {
      els[i].classList.remove('fireblaze__hidden');
      $(els[i]).show();
    }
  }
}

// toggle elements 
const showHideOnLogout = (method) => {
  var els = document.getElementsByClassName('fireblaze__requires__signout');

  for(var i = 0; i < els.length; i++){
    if(method == "hide") {
      els[i].classList.remove('fireblaze__hidden');
      $(els[i]).hide();
    } else if(method == "show") {
      els[i].classList.remove('fireblaze__hidden');
      $(els[i]).show();
    }
  }
}

let prefix = 'fireblaze';
const setInputValue = (type, data, ns) => {
  if(!ns)
    ns = window.globalNs;

  Shiny.setInputValue(
    `${ns}${prefix}_${type}`,
    data
  );
}

const setInputValue2 = (type, data, ns) => {
  if(!ns)
    ns = window.globalNs;

  Shiny.setInputValue(
    `${ns}${type}`,
    data
  );
}

const setLanguageCode = (code) => {
  if(!code)
    return;
  
  const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();

  if(code == 'browser'){
    auth.languageCode = auth.useDeviceLanguage();
    return ;
  }

  auth.languageCode = code;
}



/***/ }),

/***/ "shiny":
/*!************************!*\
  !*** external "Shiny" ***!
  \************************/
/***/ ((module) => {

module.exports = Shiny;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["auth"], () => (__webpack_exec__("./srcjs/utils.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFlO0FBTVE7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyw4REFBbUI7O0FBRTlCO0FBQ0EsV0FBVyxvRUFBeUI7O0FBRXBDLFNBQVMsa0VBQXVCO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTyxHQUFHLEVBQUUsT0FBTyxHQUFHLEtBQUs7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU8sR0FBRyxFQUFFLEtBQUs7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzREFBTzs7QUFFdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDckZBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlyZWJhc2Utci8uL3NyY2pzL3V0aWxzLmpzIiwid2VicGFjazovL2ZpcmViYXNlLXIvZXh0ZXJuYWwgdmFyIFwiU2hpbnlcIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NoaW55JztcbmltcG9ydCB7XG4gIGJyb3dzZXJTZXNzaW9uUGVyc2lzdGVuY2UsXG4gIGJyb3dzZXJMb2NhbFBlcnNpc3RlbmNlLFxuICBpbk1lbW9yeVBlcnNpc3RlbmNlLFxuICBnZXRBdXRoLFxufSBmcm9tICdmaXJlYmFzZS9hdXRoJztcblxuLy8gQ29udmVydCBwZXJzaXN0ZW5jZSBvcHRpb24gdG8gZmlyZWJhc2VcbmNvbnN0IHBlcnNpc3RlbmNlT3B0cyA9IChwKSA9PiB7XG4gIGlmKHAgPT0gXCJub25lXCIpIFxuICAgIHJldHVybiA7XG5cbiAgaWYocCA9PSBcIm1lbW9yeVwiKSBcbiAgICByZXR1cm4gaW5NZW1vcnlQZXJzaXN0ZW5jZTtcblxuICBpZihwID09IFwic2Vzc2lvblwiKSBcbiAgICByZXR1cm4gYnJvd3NlclNlc3Npb25QZXJzaXN0ZW5jZVxuXG4gIHJldHVybiBicm93c2VyTG9jYWxQZXJzaXN0ZW5jZTtcbn1cblxuLy8gdG9nZ2xlIGVsZW1lbnRzIFxuY29uc3Qgc2hvd0hpZGVPbkxvZ2luID0gKG1ldGhvZCkgPT4ge1xuICB2YXIgZWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmlyZWJsYXplX19yZXF1aXJlc19fc2lnbmluJyk7XG5cbiAgZm9yKHZhciBpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkrKyl7XG4gICAgaWYobWV0aG9kID09IFwiaGlkZVwiKSB7XG4gICAgICBlbHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnZmlyZWJsYXplX19oaWRkZW4nKTtcbiAgICAgICQoZWxzW2ldKS5oaWRlKCk7XG4gICAgfSBlbHNlIGlmKG1ldGhvZCA9PSBcInNob3dcIikge1xuICAgICAgZWxzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpcmVibGF6ZV9faGlkZGVuJyk7XG4gICAgICAkKGVsc1tpXSkuc2hvdygpO1xuICAgIH1cbiAgfVxufVxuXG4vLyB0b2dnbGUgZWxlbWVudHMgXG5jb25zdCBzaG93SGlkZU9uTG9nb3V0ID0gKG1ldGhvZCkgPT4ge1xuICB2YXIgZWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmlyZWJsYXplX19yZXF1aXJlc19fc2lnbm91dCcpO1xuXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBlbHMubGVuZ3RoOyBpKyspe1xuICAgIGlmKG1ldGhvZCA9PSBcImhpZGVcIikge1xuICAgICAgZWxzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2ZpcmVibGF6ZV9faGlkZGVuJyk7XG4gICAgICAkKGVsc1tpXSkuaGlkZSgpO1xuICAgIH0gZWxzZSBpZihtZXRob2QgPT0gXCJzaG93XCIpIHtcbiAgICAgIGVsc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdmaXJlYmxhemVfX2hpZGRlbicpO1xuICAgICAgJChlbHNbaV0pLnNob3coKTtcbiAgICB9XG4gIH1cbn1cblxubGV0IHByZWZpeCA9ICdmaXJlYmxhemUnO1xuY29uc3Qgc2V0SW5wdXRWYWx1ZSA9ICh0eXBlLCBkYXRhLCBucykgPT4ge1xuICBpZighbnMpXG4gICAgbnMgPSB3aW5kb3cuZ2xvYmFsTnM7XG5cbiAgU2hpbnkuc2V0SW5wdXRWYWx1ZShcbiAgICBgJHtuc30ke3ByZWZpeH1fJHt0eXBlfWAsXG4gICAgZGF0YVxuICApO1xufVxuXG5jb25zdCBzZXRJbnB1dFZhbHVlMiA9ICh0eXBlLCBkYXRhLCBucykgPT4ge1xuICBpZighbnMpXG4gICAgbnMgPSB3aW5kb3cuZ2xvYmFsTnM7XG5cbiAgU2hpbnkuc2V0SW5wdXRWYWx1ZShcbiAgICBgJHtuc30ke3R5cGV9YCxcbiAgICBkYXRhXG4gICk7XG59XG5cbmNvbnN0IHNldExhbmd1YWdlQ29kZSA9IChjb2RlKSA9PiB7XG4gIGlmKCFjb2RlKVxuICAgIHJldHVybjtcbiAgXG4gIGNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XG5cbiAgaWYoY29kZSA9PSAnYnJvd3Nlcicpe1xuICAgIGF1dGgubGFuZ3VhZ2VDb2RlID0gYXV0aC51c2VEZXZpY2VMYW5ndWFnZSgpO1xuICAgIHJldHVybiA7XG4gIH1cblxuICBhdXRoLmxhbmd1YWdlQ29kZSA9IGNvZGU7XG59XG5cbmV4cG9ydCB7XG5cdHBlcnNpc3RlbmNlT3B0cyxcblx0c2hvd0hpZGVPbkxvZ2luLFxuXHRzaG93SGlkZU9uTG9nb3V0LFxuICBzZXRJbnB1dFZhbHVlLFxuICBzZXRJbnB1dFZhbHVlMixcbiAgc2V0TGFuZ3VhZ2VDb2RlLFxufSIsIm1vZHVsZS5leHBvcnRzID0gU2hpbnk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9