(self["webpackChunkfirebase_r"] = self["webpackChunkfirebase_r"] || []).push([["analytics"],{

/***/ "./node_modules/firebase/analytics/dist/index.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/firebase/analytics/dist/index.esm.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAnalytics": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.getAnalytics),
/* harmony export */   "initializeAnalytics": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.initializeAnalytics),
/* harmony export */   "isSupported": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.isSupported),
/* harmony export */   "logEvent": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.logEvent),
/* harmony export */   "setAnalyticsCollectionEnabled": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.setAnalyticsCollectionEnabled),
/* harmony export */   "setCurrentScreen": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.setCurrentScreen),
/* harmony export */   "setUserId": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.setUserId),
/* harmony export */   "setUserProperties": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.setUserProperties),
/* harmony export */   "settings": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.settings)
/* harmony export */ });
/* harmony import */ var _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/analytics */ "./node_modules/@firebase/analytics/dist/esm/index.esm2017.js");

//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./node_modules/idb/build/idb.js":
/*!***************************************!*\
  !*** ./node_modules/idb/build/idb.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
   true ? factory(exports) :
  0;
}(this, function (exports) { 'use strict';

  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject(request.error);
      };
    });
  }

  function promisifyRequestCall(obj, method, args) {
    var request;
    var p = new Promise(function(resolve, reject) {
      request = obj[method].apply(obj, args);
      promisifyRequest(request).then(resolve, reject);
    });

    p.request = request;
    return p;
  }

  function promisifyCursorRequestCall(obj, method, args) {
    var p = promisifyRequestCall(obj, method, args);
    return p.then(function(value) {
      if (!value) return;
      return new Cursor(value, p.request);
    });
  }

  function proxyProperties(ProxyClass, targetProp, properties) {
    properties.forEach(function(prop) {
      Object.defineProperty(ProxyClass.prototype, prop, {
        get: function() {
          return this[targetProp][prop];
        },
        set: function(val) {
          this[targetProp][prop] = val;
        }
      });
    });
  }

  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return this[targetProp][prop].apply(this[targetProp], arguments);
      };
    });
  }

  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyCursorRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function Index(index) {
    this._index = index;
  }

  proxyProperties(Index, '_index', [
    'name',
    'keyPath',
    'multiEntry',
    'unique'
  ]);

  proxyRequestMethods(Index, '_index', IDBIndex, [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(Index, '_index', IDBIndex, [
    'openCursor',
    'openKeyCursor'
  ]);

  function Cursor(cursor, request) {
    this._cursor = cursor;
    this._request = request;
  }

  proxyProperties(Cursor, '_cursor', [
    'direction',
    'key',
    'primaryKey',
    'value'
  ]);

  proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
    'update',
    'delete'
  ]);

  // proxy 'next' methods
  ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
    if (!(methodName in IDBCursor.prototype)) return;
    Cursor.prototype[methodName] = function() {
      var cursor = this;
      var args = arguments;
      return Promise.resolve().then(function() {
        cursor._cursor[methodName].apply(cursor._cursor, args);
        return promisifyRequest(cursor._request).then(function(value) {
          if (!value) return;
          return new Cursor(value, cursor._request);
        });
      });
    };
  });

  function ObjectStore(store) {
    this._store = store;
  }

  ObjectStore.prototype.createIndex = function() {
    return new Index(this._store.createIndex.apply(this._store, arguments));
  };

  ObjectStore.prototype.index = function() {
    return new Index(this._store.index.apply(this._store, arguments));
  };

  proxyProperties(ObjectStore, '_store', [
    'name',
    'keyPath',
    'indexNames',
    'autoIncrement'
  ]);

  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'put',
    'add',
    'delete',
    'clear',
    'get',
    'getAll',
    'getKey',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'openCursor',
    'openKeyCursor'
  ]);

  proxyMethods(ObjectStore, '_store', IDBObjectStore, [
    'deleteIndex'
  ]);

  function Transaction(idbTransaction) {
    this._tx = idbTransaction;
    this.complete = new Promise(function(resolve, reject) {
      idbTransaction.oncomplete = function() {
        resolve();
      };
      idbTransaction.onerror = function() {
        reject(idbTransaction.error);
      };
      idbTransaction.onabort = function() {
        reject(idbTransaction.error);
      };
    });
  }

  Transaction.prototype.objectStore = function() {
    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
  };

  proxyProperties(Transaction, '_tx', [
    'objectStoreNames',
    'mode'
  ]);

  proxyMethods(Transaction, '_tx', IDBTransaction, [
    'abort'
  ]);

  function UpgradeDB(db, oldVersion, transaction) {
    this._db = db;
    this.oldVersion = oldVersion;
    this.transaction = new Transaction(transaction);
  }

  UpgradeDB.prototype.createObjectStore = function() {
    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
  };

  proxyProperties(UpgradeDB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(UpgradeDB, '_db', IDBDatabase, [
    'deleteObjectStore',
    'close'
  ]);

  function DB(db) {
    this._db = db;
  }

  DB.prototype.transaction = function() {
    return new Transaction(this._db.transaction.apply(this._db, arguments));
  };

  proxyProperties(DB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(DB, '_db', IDBDatabase, [
    'close'
  ]);

  // Add cursor iterators
  // TODO: remove this once browsers do the right thing with promises
  ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
    [ObjectStore, Index].forEach(function(Constructor) {
      // Don't create iterateKeyCursor if openKeyCursor doesn't exist.
      if (!(funcName in Constructor.prototype)) return;

      Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
        var args = toArray(arguments);
        var callback = args[args.length - 1];
        var nativeObject = this._store || this._index;
        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
        request.onsuccess = function() {
          callback(request.result);
        };
      };
    });
  });

  // polyfill getAll
  [Index, ObjectStore].forEach(function(Constructor) {
    if (Constructor.prototype.getAll) return;
    Constructor.prototype.getAll = function(query, count) {
      var instance = this;
      var items = [];

      return new Promise(function(resolve) {
        instance.iterateCursor(query, function(cursor) {
          if (!cursor) {
            resolve(items);
            return;
          }
          items.push(cursor.value);

          if (count !== undefined && items.length == count) {
            resolve(items);
            return;
          }
          cursor.continue();
        });
      });
    };
  });

  function openDb(name, version, upgradeCallback) {
    var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
    var request = p.request;

    if (request) {
      request.onupgradeneeded = function(event) {
        if (upgradeCallback) {
          upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
        }
      };
    }

    return p.then(function(db) {
      return new DB(db);
    });
  }

  function deleteDb(name) {
    return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
  }

  exports.openDb = openDb;
  exports.deleteDb = deleteDb;

  Object.defineProperty(exports, '__esModule', { value: true });

}));


/***/ }),

/***/ "./srcjs/components/analytics.js":
/*!***************************************!*\
  !*** ./srcjs/components/analytics.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/analytics */ "./node_modules/firebase/analytics/dist/index.esm.js");



let analytics;

Shiny.addCustomMessageHandler('fireblaze-initialize-analytics', (msg) => {
	if(!analytics)	
		analytics = (0,firebase_analytics__WEBPACK_IMPORTED_MODULE_1__.getAnalytics)();
});

Shiny.addCustomMessageHandler('fireblaze-log-event', (msg) => {
	if(!msg.params){
		(0,firebase_analytics__WEBPACK_IMPORTED_MODULE_1__.logEvent)(analytics, msg.event);
		return;
	}

	(0,firebase_analytics__WEBPACK_IMPORTED_MODULE_1__.logEvent)(analytics, msg.event, msg.params);
});

Shiny.addCustomMessageHandler('fireblaze-set-user-properties', (msg) => {
	(0,firebase_analytics__WEBPACK_IMPORTED_MODULE_1__.setUserProperties)(analytics, msg.props);
});


/***/ }),

/***/ "shiny":
/*!************************!*\
  !*** external "Shiny" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = Shiny;

/***/ }),

/***/ "./node_modules/@firebase/analytics/dist/esm/index.esm2017.js":
/*!********************************************************************!*\
  !*** ./node_modules/@firebase/analytics/dist/esm/index.esm2017.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAnalytics": () => (/* binding */ getAnalytics),
/* harmony export */   "initializeAnalytics": () => (/* binding */ initializeAnalytics),
/* harmony export */   "isSupported": () => (/* binding */ isSupported),
/* harmony export */   "logEvent": () => (/* binding */ logEvent),
/* harmony export */   "setAnalyticsCollectionEnabled": () => (/* binding */ setAnalyticsCollectionEnabled),
/* harmony export */   "setCurrentScreen": () => (/* binding */ setCurrentScreen),
/* harmony export */   "setUserId": () => (/* binding */ setUserId),
/* harmony export */   "setUserProperties": () => (/* binding */ setUserProperties),
/* harmony export */   "settings": () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/app */ "./node_modules/@firebase/app/dist/esm/index.esm2017.js");
/* harmony import */ var _firebase_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @firebase/logger */ "./node_modules/@firebase/logger/dist/esm/index.esm2017.js");
/* harmony import */ var _firebase_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @firebase/util */ "./node_modules/@firebase/util/dist/index.esm2017.js");
/* harmony import */ var _firebase_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @firebase/component */ "./node_modules/@firebase/component/dist/esm/index.esm2017.js");
/* harmony import */ var _firebase_installations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @firebase/installations */ "./node_modules/@firebase/installations/dist/esm/index.esm2017.js");






/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Type constant for Firebase Analytics.
 */
const ANALYTICS_TYPE = 'analytics';
// Key to attach FID to in gtag params.
const GA_FID_KEY = 'firebase_id';
const ORIGIN_KEY = 'origin';
const FETCH_TIMEOUT_MILLIS = 60 * 1000;
const DYNAMIC_CONFIG_URL = 'https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig';
const GTAG_URL = 'https://www.googletagmanager.com/gtag/js';

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logger = new _firebase_logger__WEBPACK_IMPORTED_MODULE_1__.Logger('@firebase/analytics');

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Makeshift polyfill for Promise.allSettled(). Resolves when all promises
 * have either resolved or rejected.
 *
 * @param promises Array of promises to wait for.
 */
function promiseAllSettled(promises) {
    return Promise.all(promises.map(promise => promise.catch(e => e)));
}
/**
 * Inserts gtag script tag into the page to asynchronously download gtag.
 * @param dataLayerName Name of datalayer (most often the default, "_dataLayer").
 */
function insertScriptTag(dataLayerName, measurementId) {
    const script = document.createElement('script');
    // We are not providing an analyticsId in the URL because it would trigger a `page_view`
    // without fid. We will initialize ga-id using gtag (config) command together with fid.
    script.src = `${GTAG_URL}?l=${dataLayerName}&id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);
}
/**
 * Get reference to, or create, global datalayer.
 * @param dataLayerName Name of datalayer (most often the default, "_dataLayer").
 */
function getOrCreateDataLayer(dataLayerName) {
    // Check for existing dataLayer and create if needed.
    let dataLayer = [];
    if (Array.isArray(window[dataLayerName])) {
        dataLayer = window[dataLayerName];
    }
    else {
        window[dataLayerName] = dataLayer;
    }
    return dataLayer;
}
/**
 * Wrapped gtag logic when gtag is called with 'config' command.
 *
 * @param gtagCore Basic gtag function that just appends to dataLayer.
 * @param initializationPromisesMap Map of appIds to their initialization promises.
 * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
 * @param measurementIdToAppId Map of GA measurementIDs to corresponding Firebase appId.
 * @param measurementId GA Measurement ID to set config for.
 * @param gtagParams Gtag config params to set.
 */
async function gtagOnConfig(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, measurementId, gtagParams) {
    // If config is already fetched, we know the appId and can use it to look up what FID promise we
    /// are waiting for, and wait only on that one.
    const correspondingAppId = measurementIdToAppId[measurementId];
    try {
        if (correspondingAppId) {
            await initializationPromisesMap[correspondingAppId];
        }
        else {
            // If config is not fetched yet, wait for all configs (we don't know which one we need) and
            // find the appId (if any) corresponding to this measurementId. If there is one, wait on
            // that appId's initialization promise. If there is none, promise resolves and gtag
            // call goes through.
            const dynamicConfigResults = await promiseAllSettled(dynamicConfigPromisesList);
            const foundConfig = dynamicConfigResults.find(config => config.measurementId === measurementId);
            if (foundConfig) {
                await initializationPromisesMap[foundConfig.appId];
            }
        }
    }
    catch (e) {
        logger.error(e);
    }
    gtagCore("config" /* CONFIG */, measurementId, gtagParams);
}
/**
 * Wrapped gtag logic when gtag is called with 'event' command.
 *
 * @param gtagCore Basic gtag function that just appends to dataLayer.
 * @param initializationPromisesMap Map of appIds to their initialization promises.
 * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
 * @param measurementId GA Measurement ID to log event to.
 * @param gtagParams Params to log with this event.
 */
async function gtagOnEvent(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementId, gtagParams) {
    try {
        let initializationPromisesToWaitFor = [];
        // If there's a 'send_to' param, check if any ID specified matches
        // an initializeIds() promise we are waiting for.
        if (gtagParams && gtagParams['send_to']) {
            let gaSendToList = gtagParams['send_to'];
            // Make it an array if is isn't, so it can be dealt with the same way.
            if (!Array.isArray(gaSendToList)) {
                gaSendToList = [gaSendToList];
            }
            // Checking 'send_to' fields requires having all measurement ID results back from
            // the dynamic config fetch.
            const dynamicConfigResults = await promiseAllSettled(dynamicConfigPromisesList);
            for (const sendToId of gaSendToList) {
                // Any fetched dynamic measurement ID that matches this 'send_to' ID
                const foundConfig = dynamicConfigResults.find(config => config.measurementId === sendToId);
                const initializationPromise = foundConfig && initializationPromisesMap[foundConfig.appId];
                if (initializationPromise) {
                    initializationPromisesToWaitFor.push(initializationPromise);
                }
                else {
                    // Found an item in 'send_to' that is not associated
                    // directly with an FID, possibly a group.  Empty this array,
                    // exit the loop early, and let it get populated below.
                    initializationPromisesToWaitFor = [];
                    break;
                }
            }
        }
        // This will be unpopulated if there was no 'send_to' field , or
        // if not all entries in the 'send_to' field could be mapped to
        // a FID. In these cases, wait on all pending initialization promises.
        if (initializationPromisesToWaitFor.length === 0) {
            initializationPromisesToWaitFor = Object.values(initializationPromisesMap);
        }
        // Run core gtag function with args after all relevant initialization
        // promises have been resolved.
        await Promise.all(initializationPromisesToWaitFor);
        // Workaround for http://b/141370449 - third argument cannot be undefined.
        gtagCore("event" /* EVENT */, measurementId, gtagParams || {});
    }
    catch (e) {
        logger.error(e);
    }
}
/**
 * Wraps a standard gtag function with extra code to wait for completion of
 * relevant initialization promises before sending requests.
 *
 * @param gtagCore Basic gtag function that just appends to dataLayer.
 * @param initializationPromisesMap Map of appIds to their initialization promises.
 * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
 * @param measurementIdToAppId Map of GA measurementIDs to corresponding Firebase appId.
 */
function wrapGtag(gtagCore, 
/**
 * Allows wrapped gtag calls to wait on whichever intialization promises are required,
 * depending on the contents of the gtag params' `send_to` field, if any.
 */
initializationPromisesMap, 
/**
 * Wrapped gtag calls sometimes require all dynamic config fetches to have returned
 * before determining what initialization promises (which include FIDs) to wait for.
 */
dynamicConfigPromisesList, 
/**
 * Wrapped gtag config calls can narrow down which initialization promise (with FID)
 * to wait for if the measurementId is already fetched, by getting the corresponding appId,
 * which is the key for the initialization promises map.
 */
measurementIdToAppId) {
    /**
     * Wrapper around gtag that ensures FID is sent with gtag calls.
     * @param command Gtag command type.
     * @param idOrNameOrParams Measurement ID if command is EVENT/CONFIG, params if command is SET.
     * @param gtagParams Params if event is EVENT/CONFIG.
     */
    async function gtagWrapper(command, idOrNameOrParams, gtagParams) {
        try {
            // If event, check that relevant initialization promises have completed.
            if (command === "event" /* EVENT */) {
                // If EVENT, second arg must be measurementId.
                await gtagOnEvent(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, idOrNameOrParams, gtagParams);
            }
            else if (command === "config" /* CONFIG */) {
                // If CONFIG, second arg must be measurementId.
                await gtagOnConfig(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, idOrNameOrParams, gtagParams);
            }
            else {
                // If SET, second arg must be params.
                gtagCore("set" /* SET */, idOrNameOrParams);
            }
        }
        catch (e) {
            logger.error(e);
        }
    }
    return gtagWrapper;
}
/**
 * Creates global gtag function or wraps existing one if found.
 * This wrapped function attaches Firebase instance ID (FID) to gtag 'config' and
 * 'event' calls that belong to the GAID associated with this Firebase instance.
 *
 * @param initializationPromisesMap Map of appIds to their initialization promises.
 * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
 * @param measurementIdToAppId Map of GA measurementIDs to corresponding Firebase appId.
 * @param dataLayerName Name of global GA datalayer array.
 * @param gtagFunctionName Name of global gtag function ("gtag" if not user-specified).
 */
function wrapOrCreateGtag(initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, dataLayerName, gtagFunctionName) {
    // Create a basic core gtag function
    let gtagCore = function (..._args) {
        // Must push IArguments object, not an array.
        window[dataLayerName].push(arguments);
    };
    // Replace it with existing one if found
    if (window[gtagFunctionName] &&
        typeof window[gtagFunctionName] === 'function') {
        // @ts-ignore
        gtagCore = window[gtagFunctionName];
    }
    window[gtagFunctionName] = wrapGtag(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId);
    return {
        gtagCore,
        wrappedGtag: window[gtagFunctionName]
    };
}
/**
 * Returns first script tag in DOM matching our gtag url pattern.
 */
function findGtagScriptOnPage() {
    const scriptTags = window.document.getElementsByTagName('script');
    for (const tag of Object.values(scriptTags)) {
        if (tag.src && tag.src.includes(GTAG_URL)) {
            return tag;
        }
    }
    return null;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ERRORS = {
    ["already-exists" /* ALREADY_EXISTS */]: 'A Firebase Analytics instance with the appId {$id} ' +
        ' already exists. ' +
        'Only one Firebase Analytics instance can be created for each appId.',
    ["already-initialized" /* ALREADY_INITIALIZED */]: 'initializeAnalytics() cannot be called again with different options than those ' +
        'it was initially called with. It can be called again with the same options to ' +
        'return the existing instance, or getAnalytics() can be used ' +
        'to get a reference to the already-intialized instance.',
    ["already-initialized-settings" /* ALREADY_INITIALIZED_SETTINGS */]: 'Firebase Analytics has already been initialized.' +
        'settings() must be called before initializing any Analytics instance' +
        'or it will have no effect.',
    ["interop-component-reg-failed" /* INTEROP_COMPONENT_REG_FAILED */]: 'Firebase Analytics Interop Component failed to instantiate: {$reason}',
    ["invalid-analytics-context" /* INVALID_ANALYTICS_CONTEXT */]: 'Firebase Analytics is not supported in this environment. ' +
        'Wrap initialization of analytics in analytics.isSupported() ' +
        'to prevent initialization in unsupported environments. Details: {$errorInfo}',
    ["indexeddb-unavailable" /* INDEXEDDB_UNAVAILABLE */]: 'IndexedDB unavailable or restricted in this environment. ' +
        'Wrap initialization of analytics in analytics.isSupported() ' +
        'to prevent initialization in unsupported environments. Details: {$errorInfo}',
    ["fetch-throttle" /* FETCH_THROTTLE */]: 'The config fetch request timed out while in an exponential backoff state.' +
        ' Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',
    ["config-fetch-failed" /* CONFIG_FETCH_FAILED */]: 'Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}',
    ["no-api-key" /* NO_API_KEY */]: 'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field to' +
        'contain a valid API key.',
    ["no-app-id" /* NO_APP_ID */]: 'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field to' +
        'contain a valid app ID.'
};
const ERROR_FACTORY = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.ErrorFactory('analytics', 'Analytics', ERRORS);

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Backoff factor for 503 errors, which we want to be conservative about
 * to avoid overloading servers. Each retry interval will be
 * BASE_INTERVAL_MILLIS * LONG_RETRY_FACTOR ^ retryCount, so the second one
 * will be ~30 seconds (with fuzzing).
 */
const LONG_RETRY_FACTOR = 30;
/**
 * Base wait interval to multiplied by backoffFactor^backoffCount.
 */
const BASE_INTERVAL_MILLIS = 1000;
/**
 * Stubbable retry data storage class.
 */
class RetryData {
    constructor(throttleMetadata = {}, intervalMillis = BASE_INTERVAL_MILLIS) {
        this.throttleMetadata = throttleMetadata;
        this.intervalMillis = intervalMillis;
    }
    getThrottleMetadata(appId) {
        return this.throttleMetadata[appId];
    }
    setThrottleMetadata(appId, metadata) {
        this.throttleMetadata[appId] = metadata;
    }
    deleteThrottleMetadata(appId) {
        delete this.throttleMetadata[appId];
    }
}
const defaultRetryData = new RetryData();
/**
 * Set GET request headers.
 * @param apiKey App API key.
 */
function getHeaders(apiKey) {
    return new Headers({
        Accept: 'application/json',
        'x-goog-api-key': apiKey
    });
}
/**
 * Fetches dynamic config from backend.
 * @param app Firebase app to fetch config for.
 */
async function fetchDynamicConfig(appFields) {
    var _a;
    const { appId, apiKey } = appFields;
    const request = {
        method: 'GET',
        headers: getHeaders(apiKey)
    };
    const appUrl = DYNAMIC_CONFIG_URL.replace('{app-id}', appId);
    const response = await fetch(appUrl, request);
    if (response.status !== 200 && response.status !== 304) {
        let errorMessage = '';
        try {
            // Try to get any error message text from server response.
            const jsonResponse = (await response.json());
            if ((_a = jsonResponse.error) === null || _a === void 0 ? void 0 : _a.message) {
                errorMessage = jsonResponse.error.message;
            }
        }
        catch (_ignored) { }
        throw ERROR_FACTORY.create("config-fetch-failed" /* CONFIG_FETCH_FAILED */, {
            httpStatus: response.status,
            responseMessage: errorMessage
        });
    }
    return response.json();
}
/**
 * Fetches dynamic config from backend, retrying if failed.
 * @param app Firebase app to fetch config for.
 */
async function fetchDynamicConfigWithRetry(app, 
// retryData and timeoutMillis are parameterized to allow passing a different value for testing.
retryData = defaultRetryData, timeoutMillis) {
    const { appId, apiKey, measurementId } = app.options;
    if (!appId) {
        throw ERROR_FACTORY.create("no-app-id" /* NO_APP_ID */);
    }
    if (!apiKey) {
        if (measurementId) {
            return {
                measurementId,
                appId
            };
        }
        throw ERROR_FACTORY.create("no-api-key" /* NO_API_KEY */);
    }
    const throttleMetadata = retryData.getThrottleMetadata(appId) || {
        backoffCount: 0,
        throttleEndTimeMillis: Date.now()
    };
    const signal = new AnalyticsAbortSignal();
    setTimeout(async () => {
        // Note a very low delay, eg < 10ms, can elapse before listeners are initialized.
        signal.abort();
    }, timeoutMillis !== undefined ? timeoutMillis : FETCH_TIMEOUT_MILLIS);
    return attemptFetchDynamicConfigWithRetry({ appId, apiKey, measurementId }, throttleMetadata, signal, retryData);
}
/**
 * Runs one retry attempt.
 * @param appFields Necessary app config fields.
 * @param throttleMetadata Ongoing metadata to determine throttling times.
 * @param signal Abort signal.
 */
async function attemptFetchDynamicConfigWithRetry(appFields, { throttleEndTimeMillis, backoffCount }, signal, retryData = defaultRetryData // for testing
) {
    const { appId, measurementId } = appFields;
    // Starts with a (potentially zero) timeout to support resumption from stored state.
    // Ensures the throttle end time is honored if the last attempt timed out.
    // Note the SDK will never make a request if the fetch timeout expires at this point.
    try {
        await setAbortableTimeout(signal, throttleEndTimeMillis);
    }
    catch (e) {
        if (measurementId) {
            logger.warn(`Timed out fetching this Firebase app's measurement ID from the server.` +
                ` Falling back to the measurement ID ${measurementId}` +
                ` provided in the "measurementId" field in the local Firebase config. [${e.message}]`);
            return { appId, measurementId };
        }
        throw e;
    }
    try {
        const response = await fetchDynamicConfig(appFields);
        // Note the SDK only clears throttle state if response is success or non-retriable.
        retryData.deleteThrottleMetadata(appId);
        return response;
    }
    catch (e) {
        if (!isRetriableError(e)) {
            retryData.deleteThrottleMetadata(appId);
            if (measurementId) {
                logger.warn(`Failed to fetch this Firebase app's measurement ID from the server.` +
                    ` Falling back to the measurement ID ${measurementId}` +
                    ` provided in the "measurementId" field in the local Firebase config. [${e.message}]`);
                return { appId, measurementId };
            }
            else {
                throw e;
            }
        }
        const backoffMillis = Number(e.customData.httpStatus) === 503
            ? (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.calculateBackoffMillis)(backoffCount, retryData.intervalMillis, LONG_RETRY_FACTOR)
            : (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.calculateBackoffMillis)(backoffCount, retryData.intervalMillis);
        // Increments backoff state.
        const throttleMetadata = {
            throttleEndTimeMillis: Date.now() + backoffMillis,
            backoffCount: backoffCount + 1
        };
        // Persists state.
        retryData.setThrottleMetadata(appId, throttleMetadata);
        logger.debug(`Calling attemptFetch again in ${backoffMillis} millis`);
        return attemptFetchDynamicConfigWithRetry(appFields, throttleMetadata, signal, retryData);
    }
}
/**
 * Supports waiting on a backoff by:
 *
 * <ul>
 *   <li>Promisifying setTimeout, so we can set a timeout in our Promise chain</li>
 *   <li>Listening on a signal bus for abort events, just like the Fetch API</li>
 *   <li>Failing in the same way the Fetch API fails, so timing out a live request and a throttled
 *       request appear the same.</li>
 * </ul>
 *
 * <p>Visible for testing.
 */
function setAbortableTimeout(signal, throttleEndTimeMillis) {
    return new Promise((resolve, reject) => {
        // Derives backoff from given end time, normalizing negative numbers to zero.
        const backoffMillis = Math.max(throttleEndTimeMillis - Date.now(), 0);
        const timeout = setTimeout(resolve, backoffMillis);
        // Adds listener, rather than sets onabort, because signal is a shared object.
        signal.addEventListener(() => {
            clearTimeout(timeout);
            // If the request completes before this timeout, the rejection has no effect.
            reject(ERROR_FACTORY.create("fetch-throttle" /* FETCH_THROTTLE */, {
                throttleEndTimeMillis
            }));
        });
    });
}
/**
 * Returns true if the {@link Error} indicates a fetch request may succeed later.
 */
function isRetriableError(e) {
    if (!(e instanceof _firebase_util__WEBPACK_IMPORTED_MODULE_2__.FirebaseError) || !e.customData) {
        return false;
    }
    // Uses string index defined by ErrorData, which FirebaseError implements.
    const httpStatus = Number(e.customData['httpStatus']);
    return (httpStatus === 429 ||
        httpStatus === 500 ||
        httpStatus === 503 ||
        httpStatus === 504);
}
/**
 * Shims a minimal AbortSignal (copied from Remote Config).
 *
 * <p>AbortController's AbortSignal conveniently decouples fetch timeout logic from other aspects
 * of networking, such as retries. Firebase doesn't use AbortController enough to justify a
 * polyfill recommendation, like we do with the Fetch API, but this minimal shim can easily be
 * swapped out if/when we do.
 */
class AnalyticsAbortSignal {
    constructor() {
        this.listeners = [];
    }
    addEventListener(listener) {
        this.listeners.push(listener);
    }
    abort() {
        this.listeners.forEach(listener => listener());
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function validateIndexedDB() {
    if (!(0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isIndexedDBAvailable)()) {
        logger.warn(ERROR_FACTORY.create("indexeddb-unavailable" /* INDEXEDDB_UNAVAILABLE */, {
            errorInfo: 'IndexedDB is not available in this environment.'
        }).message);
        return false;
    }
    else {
        try {
            await (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.validateIndexedDBOpenable)();
        }
        catch (e) {
            logger.warn(ERROR_FACTORY.create("indexeddb-unavailable" /* INDEXEDDB_UNAVAILABLE */, {
                errorInfo: e
            }).message);
            return false;
        }
    }
    return true;
}
/**
 * Initialize the analytics instance in gtag.js by calling config command with fid.
 *
 * NOTE: We combine analytics initialization and setting fid together because we want fid to be
 * part of the `page_view` event that's sent during the initialization
 * @param app Firebase app
 * @param gtagCore The gtag function that's not wrapped.
 * @param dynamicConfigPromisesList Array of all dynamic config promises.
 * @param measurementIdToAppId Maps measurementID to appID.
 * @param installations _FirebaseInstallationsInternal instance.
 *
 * @returns Measurement ID.
 */
async function _initializeAnalytics(app, dynamicConfigPromisesList, measurementIdToAppId, installations, gtagCore, dataLayerName, options) {
    var _a;
    const dynamicConfigPromise = fetchDynamicConfigWithRetry(app);
    // Once fetched, map measurementIds to appId, for ease of lookup in wrapped gtag function.
    dynamicConfigPromise
        .then(config => {
        measurementIdToAppId[config.measurementId] = config.appId;
        if (app.options.measurementId &&
            config.measurementId !== app.options.measurementId) {
            logger.warn(`The measurement ID in the local Firebase config (${app.options.measurementId})` +
                ` does not match the measurement ID fetched from the server (${config.measurementId}).` +
                ` To ensure analytics events are always sent to the correct Analytics property,` +
                ` update the` +
                ` measurement ID field in the local config or remove it from the local config.`);
        }
    })
        .catch(e => logger.error(e));
    // Add to list to track state of all dynamic config promises.
    dynamicConfigPromisesList.push(dynamicConfigPromise);
    const fidPromise = validateIndexedDB().then(envIsValid => {
        if (envIsValid) {
            return installations.getId();
        }
        else {
            return undefined;
        }
    });
    const [dynamicConfig, fid] = await Promise.all([
        dynamicConfigPromise,
        fidPromise
    ]);
    // Detect if user has already put the gtag <script> tag on this page.
    if (!findGtagScriptOnPage()) {
        insertScriptTag(dataLayerName, dynamicConfig.measurementId);
    }
    // This command initializes gtag.js and only needs to be called once for the entire web app,
    // but since it is idempotent, we can call it multiple times.
    // We keep it together with other initialization logic for better code structure.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtagCore('js', new Date());
    // User config added first. We don't want users to accidentally overwrite
    // base Firebase config properties.
    const configProperties = (_a = options === null || options === void 0 ? void 0 : options.config) !== null && _a !== void 0 ? _a : {};
    // guard against developers accidentally setting properties with prefix `firebase_`
    configProperties[ORIGIN_KEY] = 'firebase';
    configProperties.update = true;
    if (fid != null) {
        configProperties[GA_FID_KEY] = fid;
    }
    // It should be the first config command called on this GA-ID
    // Initialize this GA-ID and set FID on it using the gtag config API.
    // Note: This will trigger a page_view event unless 'send_page_view' is set to false in
    // `configProperties`.
    gtagCore("config" /* CONFIG */, dynamicConfig.measurementId, configProperties);
    return dynamicConfig.measurementId;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Analytics Service class.
 */
class AnalyticsService {
    constructor(app) {
        this.app = app;
    }
    _delete() {
        delete initializationPromisesMap[this.app.options.appId];
        return Promise.resolve();
    }
}
/**
 * Maps appId to full initialization promise. Wrapped gtag calls must wait on
 * all or some of these, depending on the call's `send_to` param and the status
 * of the dynamic config fetches (see below).
 */
let initializationPromisesMap = {};
/**
 * List of dynamic config fetch promises. In certain cases, wrapped gtag calls
 * wait on all these to be complete in order to determine if it can selectively
 * wait for only certain initialization (FID) promises or if it must wait for all.
 */
let dynamicConfigPromisesList = [];
/**
 * Maps fetched measurementIds to appId. Populated when the app's dynamic config
 * fetch completes. If already populated, gtag config calls can use this to
 * selectively wait for only this app's initialization promise (FID) instead of all
 * initialization promises.
 */
const measurementIdToAppId = {};
/**
 * Name for window global data layer array used by GA: defaults to 'dataLayer'.
 */
let dataLayerName = 'dataLayer';
/**
 * Name for window global gtag function used by GA: defaults to 'gtag'.
 */
let gtagName = 'gtag';
/**
 * Reproduction of standard gtag function or reference to existing
 * gtag function on window object.
 */
let gtagCoreFunction;
/**
 * Wrapper around gtag function that ensures FID is sent with all
 * relevant event and config calls.
 */
let wrappedGtagFunction;
/**
 * Flag to ensure page initialization steps (creation or wrapping of
 * dataLayer and gtag script) are only run once per page load.
 */
let globalInitDone = false;
/**
 * Configures Firebase Analytics to use custom `gtag` or `dataLayer` names.
 * Intended to be used if `gtag.js` script has been installed on
 * this page independently of Firebase Analytics, and is using non-default
 * names for either the `gtag` function or for `dataLayer`.
 * Must be called before calling `getAnalytics()` or it won't
 * have any effect.
 *
 * @public
 *
 * @param options - Custom gtag and dataLayer names.
 */
function settings(options) {
    if (globalInitDone) {
        throw ERROR_FACTORY.create("already-initialized" /* ALREADY_INITIALIZED */);
    }
    if (options.dataLayerName) {
        dataLayerName = options.dataLayerName;
    }
    if (options.gtagName) {
        gtagName = options.gtagName;
    }
}
/**
 * Returns true if no environment mismatch is found.
 * If environment mismatches are found, throws an INVALID_ANALYTICS_CONTEXT
 * error that also lists details for each mismatch found.
 */
function warnOnBrowserContextMismatch() {
    const mismatchedEnvMessages = [];
    if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isBrowserExtension)()) {
        mismatchedEnvMessages.push('This is a browser extension environment.');
    }
    if (!(0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.areCookiesEnabled)()) {
        mismatchedEnvMessages.push('Cookies are not available.');
    }
    if (mismatchedEnvMessages.length > 0) {
        const details = mismatchedEnvMessages
            .map((message, index) => `(${index + 1}) ${message}`)
            .join(' ');
        const err = ERROR_FACTORY.create("invalid-analytics-context" /* INVALID_ANALYTICS_CONTEXT */, {
            errorInfo: details
        });
        logger.warn(err.message);
    }
}
/**
 * Analytics instance factory.
 * @internal
 */
function factory(app, installations, options) {
    warnOnBrowserContextMismatch();
    const appId = app.options.appId;
    if (!appId) {
        throw ERROR_FACTORY.create("no-app-id" /* NO_APP_ID */);
    }
    if (!app.options.apiKey) {
        if (app.options.measurementId) {
            logger.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest` +
                ` measurement ID for this Firebase app. Falling back to the measurement ID ${app.options.measurementId}` +
                ` provided in the "measurementId" field in the local Firebase config.`);
        }
        else {
            throw ERROR_FACTORY.create("no-api-key" /* NO_API_KEY */);
        }
    }
    if (initializationPromisesMap[appId] != null) {
        throw ERROR_FACTORY.create("already-exists" /* ALREADY_EXISTS */, {
            id: appId
        });
    }
    if (!globalInitDone) {
        // Steps here should only be done once per page: creation or wrapping
        // of dataLayer and global gtag function.
        getOrCreateDataLayer(dataLayerName);
        const { wrappedGtag, gtagCore } = wrapOrCreateGtag(initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, dataLayerName, gtagName);
        wrappedGtagFunction = wrappedGtag;
        gtagCoreFunction = gtagCore;
        globalInitDone = true;
    }
    // Async but non-blocking.
    // This map reflects the completion state of all promises for each appId.
    initializationPromisesMap[appId] = _initializeAnalytics(app, dynamicConfigPromisesList, measurementIdToAppId, installations, gtagCoreFunction, dataLayerName, options);
    const analyticsInstance = new AnalyticsService(app);
    return analyticsInstance;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Logs an analytics event through the Firebase SDK.
 *
 * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
 * @param eventName Google Analytics event name, choose from standard list or use a custom string.
 * @param eventParams Analytics event parameters.
 */
async function logEvent$1(gtagFunction, initializationPromise, eventName, eventParams, options) {
    if (options && options.global) {
        gtagFunction("event" /* EVENT */, eventName, eventParams);
        return;
    }
    else {
        const measurementId = await initializationPromise;
        const params = Object.assign(Object.assign({}, eventParams), { 'send_to': measurementId });
        gtagFunction("event" /* EVENT */, eventName, params);
    }
}
/**
 * Set screen_name parameter for this Google Analytics ID.
 *
 * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
 * @param screenName Screen name string to set.
 */
async function setCurrentScreen$1(gtagFunction, initializationPromise, screenName, options) {
    if (options && options.global) {
        gtagFunction("set" /* SET */, { 'screen_name': screenName });
        return Promise.resolve();
    }
    else {
        const measurementId = await initializationPromise;
        gtagFunction("config" /* CONFIG */, measurementId, {
            update: true,
            'screen_name': screenName
        });
    }
}
/**
 * Set user_id parameter for this Google Analytics ID.
 *
 * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
 * @param id User ID string to set
 */
async function setUserId$1(gtagFunction, initializationPromise, id, options) {
    if (options && options.global) {
        gtagFunction("set" /* SET */, { 'user_id': id });
        return Promise.resolve();
    }
    else {
        const measurementId = await initializationPromise;
        gtagFunction("config" /* CONFIG */, measurementId, {
            update: true,
            'user_id': id
        });
    }
}
/**
 * Set all other user properties other than user_id and screen_name.
 *
 * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
 * @param properties Map of user properties to set
 */
async function setUserProperties$1(gtagFunction, initializationPromise, properties, options) {
    if (options && options.global) {
        const flatProperties = {};
        for (const key of Object.keys(properties)) {
            // use dot notation for merge behavior in gtag.js
            flatProperties[`user_properties.${key}`] = properties[key];
        }
        gtagFunction("set" /* SET */, flatProperties);
        return Promise.resolve();
    }
    else {
        const measurementId = await initializationPromise;
        gtagFunction("config" /* CONFIG */, measurementId, {
            update: true,
            'user_properties': properties
        });
    }
}
/**
 * Set whether collection is enabled for this ID.
 *
 * @param enabled If true, collection is enabled for this ID.
 */
async function setAnalyticsCollectionEnabled$1(initializationPromise, enabled) {
    const measurementId = await initializationPromise;
    window[`ga-disable-${measurementId}`] = !enabled;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Returns an {@link Analytics} instance for the given app.
 *
 * @public
 *
 * @param app - The {@link @firebase/app#FirebaseApp} to use.
 */
function getAnalytics(app = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp)()) {
    app = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(app);
    // Dependencies
    const analyticsProvider = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._getProvider)(app, ANALYTICS_TYPE);
    if (analyticsProvider.isInitialized()) {
        return analyticsProvider.getImmediate();
    }
    return initializeAnalytics(app);
}
/**
 * Returns an {@link Analytics} instance for the given app.
 *
 * @public
 *
 * @param app - The {@link @firebase/app#FirebaseApp} to use.
 */
function initializeAnalytics(app, options = {}) {
    // Dependencies
    const analyticsProvider = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._getProvider)(app, ANALYTICS_TYPE);
    if (analyticsProvider.isInitialized()) {
        const existingInstance = analyticsProvider.getImmediate();
        if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.deepEqual)(options, analyticsProvider.getOptions())) {
            return existingInstance;
        }
        else {
            throw ERROR_FACTORY.create("already-initialized" /* ALREADY_INITIALIZED */);
        }
    }
    const analyticsInstance = analyticsProvider.initialize({ options });
    return analyticsInstance;
}
/**
 * This is a public static method provided to users that wraps four different checks:
 *
 * 1. Check if it's not a browser extension environment.
 * 2. Check if cookies are enabled in current browser.
 * 3. Check if IndexedDB is supported by the browser environment.
 * 4. Check if the current browser context is valid for using `IndexedDB.open()`.
 *
 * @public
 *
 */
async function isSupported() {
    if ((0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isBrowserExtension)()) {
        return false;
    }
    if (!(0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.areCookiesEnabled)()) {
        return false;
    }
    if (!(0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.isIndexedDBAvailable)()) {
        return false;
    }
    try {
        const isDBOpenable = await (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.validateIndexedDBOpenable)();
        return isDBOpenable;
    }
    catch (error) {
        return false;
    }
}
/**
 * Use gtag `config` command to set `screen_name`.
 *
 * @public
 *
 * @param analyticsInstance - The {@link Analytics} instance.
 * @param screenName - Screen name to set.
 */
function setCurrentScreen(analyticsInstance, screenName, options) {
    analyticsInstance = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(analyticsInstance);
    setCurrentScreen$1(wrappedGtagFunction, initializationPromisesMap[analyticsInstance.app.options.appId], screenName, options).catch(e => logger.error(e));
}
/**
 * Use gtag `config` command to set `user_id`.
 *
 * @public
 *
 * @param analyticsInstance - The {@link Analytics} instance.
 * @param id - User ID to set.
 */
function setUserId(analyticsInstance, id, options) {
    analyticsInstance = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(analyticsInstance);
    setUserId$1(wrappedGtagFunction, initializationPromisesMap[analyticsInstance.app.options.appId], id, options).catch(e => logger.error(e));
}
/**
 * Use gtag `config` command to set all params specified.
 *
 * @public
 */
function setUserProperties(analyticsInstance, properties, options) {
    analyticsInstance = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(analyticsInstance);
    setUserProperties$1(wrappedGtagFunction, initializationPromisesMap[analyticsInstance.app.options.appId], properties, options).catch(e => logger.error(e));
}
/**
 * Sets whether Google Analytics collection is enabled for this app on this device.
 * Sets global `window['ga-disable-analyticsId'] = true;`
 *
 * @public
 *
 * @param analyticsInstance - The {@link Analytics} instance.
 * @param enabled - If true, enables collection, if false, disables it.
 */
function setAnalyticsCollectionEnabled(analyticsInstance, enabled) {
    analyticsInstance = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(analyticsInstance);
    setAnalyticsCollectionEnabled$1(initializationPromisesMap[analyticsInstance.app.options.appId], enabled).catch(e => logger.error(e));
}
/**
 * Sends a Google Analytics event with given `eventParams`. This method
 * automatically associates this logged event with this Firebase web
 * app instance on this device.
 * List of official event parameters can be found in the gtag.js
 * reference documentation:
 * {@link https://developers.google.com/gtagjs/reference/ga4-events
 * | the GA4 reference documentation}.
 *
 * @public
 */
function logEvent(analyticsInstance, eventName, eventParams, options) {
    analyticsInstance = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.getModularInstance)(analyticsInstance);
    logEvent$1(wrappedGtagFunction, initializationPromisesMap[analyticsInstance.app.options.appId], eventName, eventParams, options).catch(e => logger.error(e));
}

const name = "@firebase/analytics";
const version = "0.7.5";

/**
 * Firebase Analytics
 *
 * @packageDocumentation
 */
function registerAnalytics() {
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._registerComponent)(new _firebase_component__WEBPACK_IMPORTED_MODULE_3__.Component(ANALYTICS_TYPE, (container, { options: analyticsOptions }) => {
        // getImmediate for FirebaseApp will always succeed
        const app = container.getProvider('app').getImmediate();
        const installations = container
            .getProvider('installations-internal')
            .getImmediate();
        return factory(app, installations, analyticsOptions);
    }, "PUBLIC" /* PUBLIC */));
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._registerComponent)(new _firebase_component__WEBPACK_IMPORTED_MODULE_3__.Component('analytics-internal', internalFactory, "PRIVATE" /* PRIVATE */));
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion)(name, version);
    // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion)(name, version, 'esm2017');
    function internalFactory(container) {
        try {
            const analytics = container.getProvider(ANALYTICS_TYPE).getImmediate();
            return {
                logEvent: (eventName, eventParams, options) => logEvent(analytics, eventName, eventParams, options)
            };
        }
        catch (e) {
            throw ERROR_FACTORY.create("interop-component-reg-failed" /* INTEROP_COMPONENT_REG_FAILED */, {
                reason: e
            });
        }
    }
}
registerAnalytics();


//# sourceMappingURL=index.esm2017.js.map


/***/ }),

/***/ "./node_modules/@firebase/installations/dist/esm/index.esm2017.js":
/*!************************************************************************!*\
  !*** ./node_modules/@firebase/installations/dist/esm/index.esm2017.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteInstallations": () => (/* binding */ deleteInstallations),
/* harmony export */   "getId": () => (/* binding */ getId),
/* harmony export */   "getInstallations": () => (/* binding */ getInstallations),
/* harmony export */   "getToken": () => (/* binding */ getToken),
/* harmony export */   "onIdChange": () => (/* binding */ onIdChange)
/* harmony export */ });
/* harmony import */ var _firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/app */ "./node_modules/@firebase/app/dist/esm/index.esm2017.js");
/* harmony import */ var _firebase_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @firebase/component */ "./node_modules/@firebase/component/dist/esm/index.esm2017.js");
/* harmony import */ var _firebase_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @firebase/util */ "./node_modules/@firebase/util/dist/index.esm2017.js");
/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! idb */ "./node_modules/idb/build/idb.js");





const name = "@firebase/installations";
const version = "0.5.5";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const PENDING_TIMEOUT_MS = 10000;
const PACKAGE_VERSION = `w:${version}`;
const INTERNAL_AUTH_VERSION = 'FIS_v2';
const INSTALLATIONS_API_URL = 'https://firebaseinstallations.googleapis.com/v1';
const TOKEN_EXPIRATION_BUFFER = 60 * 60 * 1000; // One hour
const SERVICE = 'installations';
const SERVICE_NAME = 'Installations';

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ERROR_DESCRIPTION_MAP = {
    ["missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */]: 'Missing App configuration value: "{$valueName}"',
    ["not-registered" /* NOT_REGISTERED */]: 'Firebase Installation is not registered.',
    ["installation-not-found" /* INSTALLATION_NOT_FOUND */]: 'Firebase Installation not found.',
    ["request-failed" /* REQUEST_FAILED */]: '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
    ["app-offline" /* APP_OFFLINE */]: 'Could not process request. Application offline.',
    ["delete-pending-registration" /* DELETE_PENDING_REGISTRATION */]: "Can't delete installation while there is a pending registration request."
};
const ERROR_FACTORY = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.ErrorFactory(SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);
/** Returns true if error is a FirebaseError that is based on an error from the server. */
function isServerError(error) {
    return (error instanceof _firebase_util__WEBPACK_IMPORTED_MODULE_2__.FirebaseError &&
        error.code.includes("request-failed" /* REQUEST_FAILED */));
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getInstallationsEndpoint({ projectId }) {
    return `${INSTALLATIONS_API_URL}/projects/${projectId}/installations`;
}
function extractAuthTokenInfoFromResponse(response) {
    return {
        token: response.token,
        requestStatus: 2 /* COMPLETED */,
        expiresIn: getExpiresInFromResponseExpiresIn(response.expiresIn),
        creationTime: Date.now()
    };
}
async function getErrorFromResponse(requestName, response) {
    const responseJson = await response.json();
    const errorData = responseJson.error;
    return ERROR_FACTORY.create("request-failed" /* REQUEST_FAILED */, {
        requestName,
        serverCode: errorData.code,
        serverMessage: errorData.message,
        serverStatus: errorData.status
    });
}
function getHeaders({ apiKey }) {
    return new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-goog-api-key': apiKey
    });
}
function getHeadersWithAuth(appConfig, { refreshToken }) {
    const headers = getHeaders(appConfig);
    headers.append('Authorization', getAuthorizationHeader(refreshToken));
    return headers;
}
/**
 * Calls the passed in fetch wrapper and returns the response.
 * If the returned response has a status of 5xx, re-runs the function once and
 * returns the response.
 */
async function retryIfServerError(fn) {
    const result = await fn();
    if (result.status >= 500 && result.status < 600) {
        // Internal Server Error. Retry request.
        return fn();
    }
    return result;
}
function getExpiresInFromResponseExpiresIn(responseExpiresIn) {
    // This works because the server will never respond with fractions of a second.
    return Number(responseExpiresIn.replace('s', '000'));
}
function getAuthorizationHeader(refreshToken) {
    return `${INTERNAL_AUTH_VERSION} ${refreshToken}`;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function createInstallationRequest(appConfig, { fid }) {
    const endpoint = getInstallationsEndpoint(appConfig);
    const headers = getHeaders(appConfig);
    const body = {
        fid,
        authVersion: INTERNAL_AUTH_VERSION,
        appId: appConfig.appId,
        sdkVersion: PACKAGE_VERSION
    };
    const request = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    };
    const response = await retryIfServerError(() => fetch(endpoint, request));
    if (response.ok) {
        const responseValue = await response.json();
        const registeredInstallationEntry = {
            fid: responseValue.fid || fid,
            registrationStatus: 2 /* COMPLETED */,
            refreshToken: responseValue.refreshToken,
            authToken: extractAuthTokenInfoFromResponse(responseValue.authToken)
        };
        return registeredInstallationEntry;
    }
    else {
        throw await getErrorFromResponse('Create Installation', response);
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Returns a promise that resolves after given time passes. */
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function bufferToBase64UrlSafe(array) {
    const b64 = btoa(String.fromCharCode(...array));
    return b64.replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const VALID_FID_PATTERN = /^[cdef][\w-]{21}$/;
const INVALID_FID = '';
/**
 * Generates a new FID using random values from Web Crypto API.
 * Returns an empty string if FID generation fails for any reason.
 */
function generateFid() {
    try {
        // A valid FID has exactly 22 base64 characters, which is 132 bits, or 16.5
        // bytes. our implementation generates a 17 byte array instead.
        const fidByteArray = new Uint8Array(17);
        const crypto = self.crypto || self.msCrypto;
        crypto.getRandomValues(fidByteArray);
        // Replace the first 4 random bits with the constant FID header of 0b0111.
        fidByteArray[0] = 0b01110000 + (fidByteArray[0] % 0b00010000);
        const fid = encode(fidByteArray);
        return VALID_FID_PATTERN.test(fid) ? fid : INVALID_FID;
    }
    catch (_a) {
        // FID generation errored
        return INVALID_FID;
    }
}
/** Converts a FID Uint8Array to a base64 string representation. */
function encode(fidByteArray) {
    const b64String = bufferToBase64UrlSafe(fidByteArray);
    // Remove the 23rd character that was added because of the extra 4 bits at the
    // end of our 17 byte array, and the '=' padding.
    return b64String.substr(0, 22);
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Returns a string key that can be used to identify the app. */
function getKey(appConfig) {
    return `${appConfig.appName}!${appConfig.appId}`;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fidChangeCallbacks = new Map();
/**
 * Calls the onIdChange callbacks with the new FID value, and broadcasts the
 * change to other tabs.
 */
function fidChanged(appConfig, fid) {
    const key = getKey(appConfig);
    callFidChangeCallbacks(key, fid);
    broadcastFidChange(key, fid);
}
function addCallback(appConfig, callback) {
    // Open the broadcast channel if it's not already open,
    // to be able to listen to change events from other tabs.
    getBroadcastChannel();
    const key = getKey(appConfig);
    let callbackSet = fidChangeCallbacks.get(key);
    if (!callbackSet) {
        callbackSet = new Set();
        fidChangeCallbacks.set(key, callbackSet);
    }
    callbackSet.add(callback);
}
function removeCallback(appConfig, callback) {
    const key = getKey(appConfig);
    const callbackSet = fidChangeCallbacks.get(key);
    if (!callbackSet) {
        return;
    }
    callbackSet.delete(callback);
    if (callbackSet.size === 0) {
        fidChangeCallbacks.delete(key);
    }
    // Close broadcast channel if there are no more callbacks.
    closeBroadcastChannel();
}
function callFidChangeCallbacks(key, fid) {
    const callbacks = fidChangeCallbacks.get(key);
    if (!callbacks) {
        return;
    }
    for (const callback of callbacks) {
        callback(fid);
    }
}
function broadcastFidChange(key, fid) {
    const channel = getBroadcastChannel();
    if (channel) {
        channel.postMessage({ key, fid });
    }
    closeBroadcastChannel();
}
let broadcastChannel = null;
/** Opens and returns a BroadcastChannel if it is supported by the browser. */
function getBroadcastChannel() {
    if (!broadcastChannel && 'BroadcastChannel' in self) {
        broadcastChannel = new BroadcastChannel('[Firebase] FID Change');
        broadcastChannel.onmessage = e => {
            callFidChangeCallbacks(e.data.key, e.data.fid);
        };
    }
    return broadcastChannel;
}
function closeBroadcastChannel() {
    if (fidChangeCallbacks.size === 0 && broadcastChannel) {
        broadcastChannel.close();
        broadcastChannel = null;
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DATABASE_NAME = 'firebase-installations-database';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'firebase-installations-store';
let dbPromise = null;
function getDbPromise() {
    if (!dbPromise) {
        dbPromise = (0,idb__WEBPACK_IMPORTED_MODULE_3__.openDb)(DATABASE_NAME, DATABASE_VERSION, upgradeDB => {
            // We don't use 'break' in this switch statement, the fall-through
            // behavior is what we want, because if there are multiple versions between
            // the old version and the current version, we want ALL the migrations
            // that correspond to those versions to run, not only the last one.
            // eslint-disable-next-line default-case
            switch (upgradeDB.oldVersion) {
                case 0:
                    upgradeDB.createObjectStore(OBJECT_STORE_NAME);
            }
        });
    }
    return dbPromise;
}
/** Assigns or overwrites the record for the given key with the given value. */
async function set(appConfig, value) {
    const key = getKey(appConfig);
    const db = await getDbPromise();
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const objectStore = tx.objectStore(OBJECT_STORE_NAME);
    const oldValue = await objectStore.get(key);
    await objectStore.put(value, key);
    await tx.complete;
    if (!oldValue || oldValue.fid !== value.fid) {
        fidChanged(appConfig, value.fid);
    }
    return value;
}
/** Removes record(s) from the objectStore that match the given key. */
async function remove(appConfig) {
    const key = getKey(appConfig);
    const db = await getDbPromise();
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    await tx.objectStore(OBJECT_STORE_NAME).delete(key);
    await tx.complete;
}
/**
 * Atomically updates a record with the result of updateFn, which gets
 * called with the current value. If newValue is undefined, the record is
 * deleted instead.
 * @return Updated value
 */
async function update(appConfig, updateFn) {
    const key = getKey(appConfig);
    const db = await getDbPromise();
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const oldValue = await store.get(key);
    const newValue = updateFn(oldValue);
    if (newValue === undefined) {
        await store.delete(key);
    }
    else {
        await store.put(newValue, key);
    }
    await tx.complete;
    if (newValue && (!oldValue || oldValue.fid !== newValue.fid)) {
        fidChanged(appConfig, newValue.fid);
    }
    return newValue;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Updates and returns the InstallationEntry from the database.
 * Also triggers a registration request if it is necessary and possible.
 */
async function getInstallationEntry(appConfig) {
    let registrationPromise;
    const installationEntry = await update(appConfig, oldEntry => {
        const installationEntry = updateOrCreateInstallationEntry(oldEntry);
        const entryWithPromise = triggerRegistrationIfNecessary(appConfig, installationEntry);
        registrationPromise = entryWithPromise.registrationPromise;
        return entryWithPromise.installationEntry;
    });
    if (installationEntry.fid === INVALID_FID) {
        // FID generation failed. Waiting for the FID from the server.
        return { installationEntry: await registrationPromise };
    }
    return {
        installationEntry,
        registrationPromise
    };
}
/**
 * Creates a new Installation Entry if one does not exist.
 * Also clears timed out pending requests.
 */
function updateOrCreateInstallationEntry(oldEntry) {
    const entry = oldEntry || {
        fid: generateFid(),
        registrationStatus: 0 /* NOT_STARTED */
    };
    return clearTimedOutRequest(entry);
}
/**
 * If the Firebase Installation is not registered yet, this will trigger the
 * registration and return an InProgressInstallationEntry.
 *
 * If registrationPromise does not exist, the installationEntry is guaranteed
 * to be registered.
 */
function triggerRegistrationIfNecessary(appConfig, installationEntry) {
    if (installationEntry.registrationStatus === 0 /* NOT_STARTED */) {
        if (!navigator.onLine) {
            // Registration required but app is offline.
            const registrationPromiseWithError = Promise.reject(ERROR_FACTORY.create("app-offline" /* APP_OFFLINE */));
            return {
                installationEntry,
                registrationPromise: registrationPromiseWithError
            };
        }
        // Try registering. Change status to IN_PROGRESS.
        const inProgressEntry = {
            fid: installationEntry.fid,
            registrationStatus: 1 /* IN_PROGRESS */,
            registrationTime: Date.now()
        };
        const registrationPromise = registerInstallation(appConfig, inProgressEntry);
        return { installationEntry: inProgressEntry, registrationPromise };
    }
    else if (installationEntry.registrationStatus === 1 /* IN_PROGRESS */) {
        return {
            installationEntry,
            registrationPromise: waitUntilFidRegistration(appConfig)
        };
    }
    else {
        return { installationEntry };
    }
}
/** This will be executed only once for each new Firebase Installation. */
async function registerInstallation(appConfig, installationEntry) {
    try {
        const registeredInstallationEntry = await createInstallationRequest(appConfig, installationEntry);
        return set(appConfig, registeredInstallationEntry);
    }
    catch (e) {
        if (isServerError(e) && e.customData.serverCode === 409) {
            // Server returned a "FID can not be used" error.
            // Generate a new ID next time.
            await remove(appConfig);
        }
        else {
            // Registration failed. Set FID as not registered.
            await set(appConfig, {
                fid: installationEntry.fid,
                registrationStatus: 0 /* NOT_STARTED */
            });
        }
        throw e;
    }
}
/** Call if FID registration is pending in another request. */
async function waitUntilFidRegistration(appConfig) {
    // Unfortunately, there is no way of reliably observing when a value in
    // IndexedDB changes (yet, see https://github.com/WICG/indexed-db-observers),
    // so we need to poll.
    let entry = await updateInstallationRequest(appConfig);
    while (entry.registrationStatus === 1 /* IN_PROGRESS */) {
        // createInstallation request still in progress.
        await sleep(100);
        entry = await updateInstallationRequest(appConfig);
    }
    if (entry.registrationStatus === 0 /* NOT_STARTED */) {
        // The request timed out or failed in a different call. Try again.
        const { installationEntry, registrationPromise } = await getInstallationEntry(appConfig);
        if (registrationPromise) {
            return registrationPromise;
        }
        else {
            // if there is no registrationPromise, entry is registered.
            return installationEntry;
        }
    }
    return entry;
}
/**
 * Called only if there is a CreateInstallation request in progress.
 *
 * Updates the InstallationEntry in the DB based on the status of the
 * CreateInstallation request.
 *
 * Returns the updated InstallationEntry.
 */
function updateInstallationRequest(appConfig) {
    return update(appConfig, oldEntry => {
        if (!oldEntry) {
            throw ERROR_FACTORY.create("installation-not-found" /* INSTALLATION_NOT_FOUND */);
        }
        return clearTimedOutRequest(oldEntry);
    });
}
function clearTimedOutRequest(entry) {
    if (hasInstallationRequestTimedOut(entry)) {
        return {
            fid: entry.fid,
            registrationStatus: 0 /* NOT_STARTED */
        };
    }
    return entry;
}
function hasInstallationRequestTimedOut(installationEntry) {
    return (installationEntry.registrationStatus === 1 /* IN_PROGRESS */ &&
        installationEntry.registrationTime + PENDING_TIMEOUT_MS < Date.now());
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function generateAuthTokenRequest({ appConfig, platformLoggerProvider }, installationEntry) {
    const endpoint = getGenerateAuthTokenEndpoint(appConfig, installationEntry);
    const headers = getHeadersWithAuth(appConfig, installationEntry);
    // If platform logger exists, add the platform info string to the header.
    const platformLogger = platformLoggerProvider.getImmediate({
        optional: true
    });
    if (platformLogger) {
        headers.append('x-firebase-client', platformLogger.getPlatformInfoString());
    }
    const body = {
        installation: {
            sdkVersion: PACKAGE_VERSION
        }
    };
    const request = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    };
    const response = await retryIfServerError(() => fetch(endpoint, request));
    if (response.ok) {
        const responseValue = await response.json();
        const completedAuthToken = extractAuthTokenInfoFromResponse(responseValue);
        return completedAuthToken;
    }
    else {
        throw await getErrorFromResponse('Generate Auth Token', response);
    }
}
function getGenerateAuthTokenEndpoint(appConfig, { fid }) {
    return `${getInstallationsEndpoint(appConfig)}/${fid}/authTokens:generate`;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a valid authentication token for the installation. Generates a new
 * token if one doesn't exist, is expired or about to expire.
 *
 * Should only be called if the Firebase Installation is registered.
 */
async function refreshAuthToken(installations, forceRefresh = false) {
    let tokenPromise;
    const entry = await update(installations.appConfig, oldEntry => {
        if (!isEntryRegistered(oldEntry)) {
            throw ERROR_FACTORY.create("not-registered" /* NOT_REGISTERED */);
        }
        const oldAuthToken = oldEntry.authToken;
        if (!forceRefresh && isAuthTokenValid(oldAuthToken)) {
            // There is a valid token in the DB.
            return oldEntry;
        }
        else if (oldAuthToken.requestStatus === 1 /* IN_PROGRESS */) {
            // There already is a token request in progress.
            tokenPromise = waitUntilAuthTokenRequest(installations, forceRefresh);
            return oldEntry;
        }
        else {
            // No token or token expired.
            if (!navigator.onLine) {
                throw ERROR_FACTORY.create("app-offline" /* APP_OFFLINE */);
            }
            const inProgressEntry = makeAuthTokenRequestInProgressEntry(oldEntry);
            tokenPromise = fetchAuthTokenFromServer(installations, inProgressEntry);
            return inProgressEntry;
        }
    });
    const authToken = tokenPromise
        ? await tokenPromise
        : entry.authToken;
    return authToken;
}
/**
 * Call only if FID is registered and Auth Token request is in progress.
 *
 * Waits until the current pending request finishes. If the request times out,
 * tries once in this thread as well.
 */
async function waitUntilAuthTokenRequest(installations, forceRefresh) {
    // Unfortunately, there is no way of reliably observing when a value in
    // IndexedDB changes (yet, see https://github.com/WICG/indexed-db-observers),
    // so we need to poll.
    let entry = await updateAuthTokenRequest(installations.appConfig);
    while (entry.authToken.requestStatus === 1 /* IN_PROGRESS */) {
        // generateAuthToken still in progress.
        await sleep(100);
        entry = await updateAuthTokenRequest(installations.appConfig);
    }
    const authToken = entry.authToken;
    if (authToken.requestStatus === 0 /* NOT_STARTED */) {
        // The request timed out or failed in a different call. Try again.
        return refreshAuthToken(installations, forceRefresh);
    }
    else {
        return authToken;
    }
}
/**
 * Called only if there is a GenerateAuthToken request in progress.
 *
 * Updates the InstallationEntry in the DB based on the status of the
 * GenerateAuthToken request.
 *
 * Returns the updated InstallationEntry.
 */
function updateAuthTokenRequest(appConfig) {
    return update(appConfig, oldEntry => {
        if (!isEntryRegistered(oldEntry)) {
            throw ERROR_FACTORY.create("not-registered" /* NOT_REGISTERED */);
        }
        const oldAuthToken = oldEntry.authToken;
        if (hasAuthTokenRequestTimedOut(oldAuthToken)) {
            return Object.assign(Object.assign({}, oldEntry), { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
        }
        return oldEntry;
    });
}
async function fetchAuthTokenFromServer(installations, installationEntry) {
    try {
        const authToken = await generateAuthTokenRequest(installations, installationEntry);
        const updatedInstallationEntry = Object.assign(Object.assign({}, installationEntry), { authToken });
        await set(installations.appConfig, updatedInstallationEntry);
        return authToken;
    }
    catch (e) {
        if (isServerError(e) &&
            (e.customData.serverCode === 401 || e.customData.serverCode === 404)) {
            // Server returned a "FID not found" or a "Invalid authentication" error.
            // Generate a new ID next time.
            await remove(installations.appConfig);
        }
        else {
            const updatedInstallationEntry = Object.assign(Object.assign({}, installationEntry), { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
            await set(installations.appConfig, updatedInstallationEntry);
        }
        throw e;
    }
}
function isEntryRegistered(installationEntry) {
    return (installationEntry !== undefined &&
        installationEntry.registrationStatus === 2 /* COMPLETED */);
}
function isAuthTokenValid(authToken) {
    return (authToken.requestStatus === 2 /* COMPLETED */ &&
        !isAuthTokenExpired(authToken));
}
function isAuthTokenExpired(authToken) {
    const now = Date.now();
    return (now < authToken.creationTime ||
        authToken.creationTime + authToken.expiresIn < now + TOKEN_EXPIRATION_BUFFER);
}
/** Returns an updated InstallationEntry with an InProgressAuthToken. */
function makeAuthTokenRequestInProgressEntry(oldEntry) {
    const inProgressAuthToken = {
        requestStatus: 1 /* IN_PROGRESS */,
        requestTime: Date.now()
    };
    return Object.assign(Object.assign({}, oldEntry), { authToken: inProgressAuthToken });
}
function hasAuthTokenRequestTimedOut(authToken) {
    return (authToken.requestStatus === 1 /* IN_PROGRESS */ &&
        authToken.requestTime + PENDING_TIMEOUT_MS < Date.now());
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Creates a Firebase Installation if there isn't one for the app and
 * returns the Installation ID.
 * @param installations - The `Installations` instance.
 *
 * @public
 */
async function getId(installations) {
    const installationsImpl = installations;
    const { installationEntry, registrationPromise } = await getInstallationEntry(installationsImpl.appConfig);
    if (registrationPromise) {
        registrationPromise.catch(console.error);
    }
    else {
        // If the installation is already registered, update the authentication
        // token if needed.
        refreshAuthToken(installationsImpl).catch(console.error);
    }
    return installationEntry.fid;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a Firebase Installations auth token, identifying the current
 * Firebase Installation.
 * @param installations - The `Installations` instance.
 * @param forceRefresh - Force refresh regardless of token expiration.
 *
 * @public
 */
async function getToken(installations, forceRefresh = false) {
    const installationsImpl = installations;
    await completeInstallationRegistration(installationsImpl.appConfig);
    // At this point we either have a Registered Installation in the DB, or we've
    // already thrown an error.
    const authToken = await refreshAuthToken(installationsImpl, forceRefresh);
    return authToken.token;
}
async function completeInstallationRegistration(appConfig) {
    const { registrationPromise } = await getInstallationEntry(appConfig);
    if (registrationPromise) {
        // A createInstallation request is in progress. Wait until it finishes.
        await registrationPromise;
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function deleteInstallationRequest(appConfig, installationEntry) {
    const endpoint = getDeleteEndpoint(appConfig, installationEntry);
    const headers = getHeadersWithAuth(appConfig, installationEntry);
    const request = {
        method: 'DELETE',
        headers
    };
    const response = await retryIfServerError(() => fetch(endpoint, request));
    if (!response.ok) {
        throw await getErrorFromResponse('Delete Installation', response);
    }
}
function getDeleteEndpoint(appConfig, { fid }) {
    return `${getInstallationsEndpoint(appConfig)}/${fid}`;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Deletes the Firebase Installation and all associated data.
 * @param installations - The `Installations` instance.
 *
 * @public
 */
async function deleteInstallations(installations) {
    const { appConfig } = installations;
    const entry = await update(appConfig, oldEntry => {
        if (oldEntry && oldEntry.registrationStatus === 0 /* NOT_STARTED */) {
            // Delete the unregistered entry without sending a deleteInstallation request.
            return undefined;
        }
        return oldEntry;
    });
    if (entry) {
        if (entry.registrationStatus === 1 /* IN_PROGRESS */) {
            // Can't delete while trying to register.
            throw ERROR_FACTORY.create("delete-pending-registration" /* DELETE_PENDING_REGISTRATION */);
        }
        else if (entry.registrationStatus === 2 /* COMPLETED */) {
            if (!navigator.onLine) {
                throw ERROR_FACTORY.create("app-offline" /* APP_OFFLINE */);
            }
            else {
                await deleteInstallationRequest(appConfig, entry);
                await remove(appConfig);
            }
        }
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Sets a new callback that will get called when Installation ID changes.
 * Returns an unsubscribe function that will remove the callback when called.
 * @param installations - The `Installations` instance.
 * @param callback - The callback function that is invoked when FID changes.
 * @returns A function that can be called to unsubscribe.
 *
 * @public
 */
function onIdChange(installations, callback) {
    const { appConfig } = installations;
    addCallback(appConfig, callback);
    return () => {
        removeCallback(appConfig, callback);
    };
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns an instance of {@link Installations} associated with the given
 * {@link @firebase/app#FirebaseApp} instance.
 * @param app - The {@link @firebase/app#FirebaseApp} instance.
 *
 * @public
 */
function getInstallations(app = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp)()) {
    const installationsImpl = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._getProvider)(app, 'installations').getImmediate();
    return installationsImpl;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function extractAppConfig(app) {
    if (!app || !app.options) {
        throw getMissingValueError('App Configuration');
    }
    if (!app.name) {
        throw getMissingValueError('App Name');
    }
    // Required app config keys
    const configKeys = [
        'projectId',
        'apiKey',
        'appId'
    ];
    for (const keyName of configKeys) {
        if (!app.options[keyName]) {
            throw getMissingValueError(keyName);
        }
    }
    return {
        appName: app.name,
        projectId: app.options.projectId,
        apiKey: app.options.apiKey,
        appId: app.options.appId
    };
}
function getMissingValueError(valueName) {
    return ERROR_FACTORY.create("missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */, {
        valueName
    });
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const INSTALLATIONS_NAME = 'installations';
const INSTALLATIONS_NAME_INTERNAL = 'installations-internal';
const publicFactory = (container) => {
    const app = container.getProvider('app').getImmediate();
    // Throws if app isn't configured properly.
    const appConfig = extractAppConfig(app);
    const platformLoggerProvider = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._getProvider)(app, 'platform-logger');
    const installationsImpl = {
        app,
        appConfig,
        platformLoggerProvider,
        _delete: () => Promise.resolve()
    };
    return installationsImpl;
};
const internalFactory = (container) => {
    const app = container.getProvider('app').getImmediate();
    // Internal FIS instance relies on public FIS instance.
    const installations = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._getProvider)(app, INSTALLATIONS_NAME).getImmediate();
    const installationsInternal = {
        getId: () => getId(installations),
        getToken: (forceRefresh) => getToken(installations, forceRefresh)
    };
    return installationsInternal;
};
function registerInstallations() {
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._registerComponent)(new _firebase_component__WEBPACK_IMPORTED_MODULE_1__.Component(INSTALLATIONS_NAME, publicFactory, "PUBLIC" /* PUBLIC */));
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._registerComponent)(new _firebase_component__WEBPACK_IMPORTED_MODULE_1__.Component(INSTALLATIONS_NAME_INTERNAL, internalFactory, "PRIVATE" /* PRIVATE */));
}

/**
 * Firebase Installations
 *
 * @packageDocumentation
 */
registerInstallations();
(0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion)(name, version);
// BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
(0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion)(name, version, 'esm2017');


//# sourceMappingURL=index.esm2017.js.map


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["auth"], () => (__webpack_exec__("./srcjs/components/analytics.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBb0M7QUFDcEM7Ozs7Ozs7Ozs7O0FDREE7QUFDQSxFQUFFLEtBQTREO0FBQzlELEVBQUUsQ0FDbUQ7QUFDckQsQ0FBQyw0QkFBNEI7O0FBRTdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaURBQWlELGFBQWE7O0FBRTlELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzVGE7QUFDZ0U7O0FBRTlFOztBQUVBO0FBQ0E7QUFDQSxjQUFjLGdFQUFZO0FBQzFCLENBQUM7O0FBRUQ7QUFDQTtBQUNBLEVBQUUsNERBQVE7QUFDVjtBQUNBOztBQUVBLENBQUMsNERBQVE7QUFDVCxDQUFDOztBQUVEO0FBQ0EsQ0FBQyxxRUFBaUI7QUFDbEIsQ0FBQzs7Ozs7Ozs7Ozs7O0FDckJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQTBGO0FBQ2hEO0FBQ2tLO0FBQzVKO0FBQ2Y7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFGQUFxRixPQUFPO0FBQzVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG9EQUFNOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUyxLQUFLLGNBQWMsTUFBTSxjQUFjO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGLEtBQUs7QUFDakc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUlBQXVJLFFBQVE7QUFDL0k7QUFDQTtBQUNBLDBFQUEwRSxXQUFXO0FBQ3JGO0FBQ0E7QUFDQSwwRUFBMEUsV0FBVztBQUNyRjtBQUNBLDhFQUE4RSx1QkFBdUI7QUFDckcsdUZBQXVGLFlBQVksR0FBRyxpQkFBaUI7QUFDdkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix3REFBWTs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGdCQUFnQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLCtCQUErQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGdEQUFnRCw4QkFBOEI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QscUNBQXFDO0FBQ3BHO0FBQ0EsWUFBWSx1QkFBdUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckUseUZBQXlGLFVBQVU7QUFDbkcscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsY0FBYztBQUN6RSw2RkFBNkYsVUFBVTtBQUN2Ryx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxzRUFBc0I7QUFDcEMsY0FBYyxzRUFBc0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsZUFBZTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQSx1QkFBdUIseURBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsb0VBQW9CO0FBQzdCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IseUVBQXlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUE0RSwwQkFBMEI7QUFDdEcsK0VBQStFLHFCQUFxQjtBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrRUFBa0I7QUFDMUI7QUFDQTtBQUNBLFNBQVMsaUVBQWlCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFVBQVUsSUFBSSxRQUFRO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZGQUE2RiwwQkFBMEI7QUFDdkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isd0JBQXdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxrQkFBa0IsMEJBQTBCO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMkJBQTJCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGVBQWU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsSUFBSTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGNBQWM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQ0FBaUM7QUFDdEQ7QUFDQSw0QkFBNEIscURBQU07QUFDbEMsVUFBVSxrRUFBa0I7QUFDNUI7QUFDQSw4QkFBOEIsMkRBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlDQUFpQztBQUN0RDtBQUNBLDhDQUE4QztBQUM5QztBQUNBLDhCQUE4QiwyREFBWTtBQUMxQztBQUNBO0FBQ0EsWUFBWSx5REFBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsU0FBUztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrRUFBa0I7QUFDMUI7QUFDQTtBQUNBLFNBQVMsaUVBQWlCO0FBQzFCO0FBQ0E7QUFDQSxTQUFTLG9FQUFvQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMseUVBQXlCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsaUJBQWlCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrRUFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsaUJBQWlCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrRUFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrRUFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGlCQUFpQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0VBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0oscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtFQUFrQjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpRUFBa0IsS0FBSywwREFBUywrQkFBK0IsMkJBQTJCO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJLGlFQUFrQixLQUFLLDBEQUFTO0FBQ3BDLElBQUksOERBQWU7QUFDbkI7QUFDQSxJQUFJLDhEQUFlO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUU2SjtBQUM3Sjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDamxDMEY7QUFDMUM7QUFDYTtBQUNoQzs7QUFFN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFFBQVE7QUFDckM7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1R0FBdUcsV0FBVztBQUNsSDtBQUNBO0FBQ0EsK0NBQStDLGNBQWMsNEJBQTRCLGNBQWMsY0FBYyxHQUFHLGVBQWU7QUFDdkk7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHdEQUFZO0FBQ3RDO0FBQ0E7QUFDQSw2QkFBNkIseURBQWE7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxXQUFXO0FBQy9DLGNBQWMsc0JBQXNCLFlBQVksVUFBVTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx5Q0FBeUMsY0FBYztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsdUJBQXVCLEVBQUUsYUFBYTtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxLQUFLO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxHQUFHO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxrQkFBa0IsR0FBRyxnQkFBZ0I7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFVBQVU7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwyQ0FBTTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5Q0FBeUM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsbUNBQW1DO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxLQUFLO0FBQ3hELGNBQWMsb0NBQW9DLEdBQUcsSUFBSTtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxlQUFlLGFBQWEsc0NBQXNDO0FBQ25IO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsd0JBQXdCLFdBQVc7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSx3QkFBd0IsYUFBYSxzQ0FBc0M7QUFDdEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGVBQWUsZ0NBQWdDO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHlDQUF5QztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNCQUFzQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLEtBQUs7QUFDN0MsY0FBYyxvQ0FBb0MsR0FBRyxJQUFJO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFlBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFlBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHFCQUFxQjtBQUNoRCxJQUFJLGlDQUFpQztBQUNyQyxxQkFBcUIsaUNBQWlDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxxREFBTTtBQUN0Qyw4QkFBOEIsMkRBQVk7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDJEQUFZO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsMkRBQVk7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlFQUFrQixLQUFLLDBEQUFTO0FBQ3BDLElBQUksaUVBQWtCLEtBQUssMERBQVM7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQWU7QUFDZjtBQUNBLDhEQUFlOztBQUUrRDtBQUM5RSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpcmViYXNlLXIvLi9ub2RlX21vZHVsZXMvZmlyZWJhc2UvYW5hbHl0aWNzL2Rpc3QvaW5kZXguZXNtLmpzIiwid2VicGFjazovL2ZpcmViYXNlLXIvLi9ub2RlX21vZHVsZXMvaWRiL2J1aWxkL2lkYi5qcyIsIndlYnBhY2s6Ly9maXJlYmFzZS1yLy4vc3JjanMvY29tcG9uZW50cy9hbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vZmlyZWJhc2Utci9leHRlcm5hbCB2YXIgXCJTaGlueVwiIiwid2VicGFjazovL2ZpcmViYXNlLXIvLi9ub2RlX21vZHVsZXMvQGZpcmViYXNlL2FuYWx5dGljcy9kaXN0L2VzbS9pbmRleC5lc20yMDE3LmpzIiwid2VicGFjazovL2ZpcmViYXNlLXIvLi9ub2RlX21vZHVsZXMvQGZpcmViYXNlL2luc3RhbGxhdGlvbnMvZGlzdC9lc20vaW5kZXguZXNtMjAxNy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tICdAZmlyZWJhc2UvYW5hbHl0aWNzJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzbS5qcy5tYXBcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmLCBmYWN0b3J5KGdsb2JhbC5pZGIgPSB7fSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gdG9BcnJheShhcnIpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgfTtcblxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0Q2FsbChvYmosIG1ldGhvZCwgYXJncykge1xuICAgIHZhciByZXF1ZXN0O1xuICAgIHZhciBwID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXF1ZXN0ID0gb2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzKTtcbiAgICAgIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgIH0pO1xuXG4gICAgcC5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb21pc2lmeUN1cnNvclJlcXVlc3RDYWxsKG9iaiwgbWV0aG9kLCBhcmdzKSB7XG4gICAgdmFyIHAgPSBwcm9taXNpZnlSZXF1ZXN0Q2FsbChvYmosIG1ldGhvZCwgYXJncyk7XG4gICAgcmV0dXJuIHAudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgICAgcmV0dXJuIG5ldyBDdXJzb3IodmFsdWUsIHAucmVxdWVzdCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eVByb3BlcnRpZXMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgcHJvcGVydGllcykge1xuICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUHJveHlDbGFzcy5wcm90b3R5cGUsIHByb3AsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1t0YXJnZXRQcm9wXVtwcm9wXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICB0aGlzW3RhcmdldFByb3BdW3Byb3BdID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb3h5UmVxdWVzdE1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdENhbGwodGhpc1t0YXJnZXRQcm9wXSwgcHJvcCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eU1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpc1t0YXJnZXRQcm9wXVtwcm9wXS5hcHBseSh0aGlzW3RhcmdldFByb3BdLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb3h5Q3Vyc29yUmVxdWVzdE1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5Q3Vyc29yUmVxdWVzdENhbGwodGhpc1t0YXJnZXRQcm9wXSwgcHJvcCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBJbmRleChpbmRleCkge1xuICAgIHRoaXMuX2luZGV4ID0gaW5kZXg7XG4gIH1cblxuICBwcm94eVByb3BlcnRpZXMoSW5kZXgsICdfaW5kZXgnLCBbXG4gICAgJ25hbWUnLFxuICAgICdrZXlQYXRoJyxcbiAgICAnbXVsdGlFbnRyeScsXG4gICAgJ3VuaXF1ZSdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhJbmRleCwgJ19pbmRleCcsIElEQkluZGV4LCBbXG4gICAgJ2dldCcsXG4gICAgJ2dldEtleScsXG4gICAgJ2dldEFsbCcsXG4gICAgJ2dldEFsbEtleXMnLFxuICAgICdjb3VudCdcbiAgXSk7XG5cbiAgcHJveHlDdXJzb3JSZXF1ZXN0TWV0aG9kcyhJbmRleCwgJ19pbmRleCcsIElEQkluZGV4LCBbXG4gICAgJ29wZW5DdXJzb3InLFxuICAgICdvcGVuS2V5Q3Vyc29yJ1xuICBdKTtcblxuICBmdW5jdGlvbiBDdXJzb3IoY3Vyc29yLCByZXF1ZXN0KSB7XG4gICAgdGhpcy5fY3Vyc29yID0gY3Vyc29yO1xuICAgIHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJveHlQcm9wZXJ0aWVzKEN1cnNvciwgJ19jdXJzb3InLCBbXG4gICAgJ2RpcmVjdGlvbicsXG4gICAgJ2tleScsXG4gICAgJ3ByaW1hcnlLZXknLFxuICAgICd2YWx1ZSdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhDdXJzb3IsICdfY3Vyc29yJywgSURCQ3Vyc29yLCBbXG4gICAgJ3VwZGF0ZScsXG4gICAgJ2RlbGV0ZSdcbiAgXSk7XG5cbiAgLy8gcHJveHkgJ25leHQnIG1ldGhvZHNcbiAgWydhZHZhbmNlJywgJ2NvbnRpbnVlJywgJ2NvbnRpbnVlUHJpbWFyeUtleSddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgIGlmICghKG1ldGhvZE5hbWUgaW4gSURCQ3Vyc29yLnByb3RvdHlwZSkpIHJldHVybjtcbiAgICBDdXJzb3IucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY3Vyc29yID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGN1cnNvci5fY3Vyc29yW21ldGhvZE5hbWVdLmFwcGx5KGN1cnNvci5fY3Vyc29yLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3QoY3Vyc29yLl9yZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgIHJldHVybiBuZXcgQ3Vyc29yKHZhbHVlLCBjdXJzb3IuX3JlcXVlc3QpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIE9iamVjdFN0b3JlKHN0b3JlKSB7XG4gICAgdGhpcy5fc3RvcmUgPSBzdG9yZTtcbiAgfVxuXG4gIE9iamVjdFN0b3JlLnByb3RvdHlwZS5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW5kZXgodGhpcy5fc3RvcmUuY3JlYXRlSW5kZXguYXBwbHkodGhpcy5fc3RvcmUsIGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIE9iamVjdFN0b3JlLnByb3RvdHlwZS5pbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW5kZXgodGhpcy5fc3RvcmUuaW5kZXguYXBwbHkodGhpcy5fc3RvcmUsIGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIHByb3h5UHJvcGVydGllcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIFtcbiAgICAnbmFtZScsXG4gICAgJ2tleVBhdGgnLFxuICAgICdpbmRleE5hbWVzJyxcbiAgICAnYXV0b0luY3JlbWVudCdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXG4gICAgJ3B1dCcsXG4gICAgJ2FkZCcsXG4gICAgJ2RlbGV0ZScsXG4gICAgJ2NsZWFyJyxcbiAgICAnZ2V0JyxcbiAgICAnZ2V0QWxsJyxcbiAgICAnZ2V0S2V5JyxcbiAgICAnZ2V0QWxsS2V5cycsXG4gICAgJ2NvdW50J1xuICBdKTtcblxuICBwcm94eUN1cnNvclJlcXVlc3RNZXRob2RzKE9iamVjdFN0b3JlLCAnX3N0b3JlJywgSURCT2JqZWN0U3RvcmUsIFtcbiAgICAnb3BlbkN1cnNvcicsXG4gICAgJ29wZW5LZXlDdXJzb3InXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXG4gICAgJ2RlbGV0ZUluZGV4J1xuICBdKTtcblxuICBmdW5jdGlvbiBUcmFuc2FjdGlvbihpZGJUcmFuc2FjdGlvbikge1xuICAgIHRoaXMuX3R4ID0gaWRiVHJhbnNhY3Rpb247XG4gICAgdGhpcy5jb21wbGV0ZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWRiVHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9O1xuICAgICAgaWRiVHJhbnNhY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QoaWRiVHJhbnNhY3Rpb24uZXJyb3IpO1xuICAgICAgfTtcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KGlkYlRyYW5zYWN0aW9uLmVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBUcmFuc2FjdGlvbi5wcm90b3R5cGUub2JqZWN0U3RvcmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFN0b3JlKHRoaXMuX3R4Lm9iamVjdFN0b3JlLmFwcGx5KHRoaXMuX3R4LCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoVHJhbnNhY3Rpb24sICdfdHgnLCBbXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnLFxuICAgICdtb2RlJ1xuICBdKTtcblxuICBwcm94eU1ldGhvZHMoVHJhbnNhY3Rpb24sICdfdHgnLCBJREJUcmFuc2FjdGlvbiwgW1xuICAgICdhYm9ydCdcbiAgXSk7XG5cbiAgZnVuY3Rpb24gVXBncmFkZURCKGRiLCBvbGRWZXJzaW9uLCB0cmFuc2FjdGlvbikge1xuICAgIHRoaXMuX2RiID0gZGI7XG4gICAgdGhpcy5vbGRWZXJzaW9uID0gb2xkVmVyc2lvbjtcbiAgICB0aGlzLnRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcbiAgfVxuXG4gIFVwZ3JhZGVEQi5wcm90b3R5cGUuY3JlYXRlT2JqZWN0U3RvcmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFN0b3JlKHRoaXMuX2RiLmNyZWF0ZU9iamVjdFN0b3JlLmFwcGx5KHRoaXMuX2RiLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoVXBncmFkZURCLCAnX2RiJywgW1xuICAgICduYW1lJyxcbiAgICAndmVyc2lvbicsXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhVcGdyYWRlREIsICdfZGInLCBJREJEYXRhYmFzZSwgW1xuICAgICdkZWxldGVPYmplY3RTdG9yZScsXG4gICAgJ2Nsb3NlJ1xuICBdKTtcblxuICBmdW5jdGlvbiBEQihkYikge1xuICAgIHRoaXMuX2RiID0gZGI7XG4gIH1cblxuICBEQi5wcm90b3R5cGUudHJhbnNhY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKHRoaXMuX2RiLnRyYW5zYWN0aW9uLmFwcGx5KHRoaXMuX2RiLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoREIsICdfZGInLCBbXG4gICAgJ25hbWUnLFxuICAgICd2ZXJzaW9uJyxcbiAgICAnb2JqZWN0U3RvcmVOYW1lcydcbiAgXSk7XG5cbiAgcHJveHlNZXRob2RzKERCLCAnX2RiJywgSURCRGF0YWJhc2UsIFtcbiAgICAnY2xvc2UnXG4gIF0pO1xuXG4gIC8vIEFkZCBjdXJzb3IgaXRlcmF0b3JzXG4gIC8vIFRPRE86IHJlbW92ZSB0aGlzIG9uY2UgYnJvd3NlcnMgZG8gdGhlIHJpZ2h0IHRoaW5nIHdpdGggcHJvbWlzZXNcbiAgWydvcGVuQ3Vyc29yJywgJ29wZW5LZXlDdXJzb3InXS5mb3JFYWNoKGZ1bmN0aW9uKGZ1bmNOYW1lKSB7XG4gICAgW09iamVjdFN0b3JlLCBJbmRleF0uZm9yRWFjaChmdW5jdGlvbihDb25zdHJ1Y3Rvcikge1xuICAgICAgLy8gRG9uJ3QgY3JlYXRlIGl0ZXJhdGVLZXlDdXJzb3IgaWYgb3BlbktleUN1cnNvciBkb2Vzbid0IGV4aXN0LlxuICAgICAgaWYgKCEoZnVuY05hbWUgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuXG4gICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGVbZnVuY05hbWUucmVwbGFjZSgnb3BlbicsICdpdGVyYXRlJyldID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciBuYXRpdmVPYmplY3QgPSB0aGlzLl9zdG9yZSB8fCB0aGlzLl9pbmRleDtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuYXRpdmVPYmplY3RbZnVuY05hbWVdLmFwcGx5KG5hdGl2ZU9iamVjdCwgYXJncy5zbGljZSgwLCAtMSkpO1xuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNhbGxiYWNrKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIHBvbHlmaWxsIGdldEFsbFxuICBbSW5kZXgsIE9iamVjdFN0b3JlXS5mb3JFYWNoKGZ1bmN0aW9uKENvbnN0cnVjdG9yKSB7XG4gICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRBbGwpIHJldHVybjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24ocXVlcnksIGNvdW50KSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgdmFyIGl0ZW1zID0gW107XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgIGluc3RhbmNlLml0ZXJhdGVDdXJzb3IocXVlcnksIGZ1bmN0aW9uKGN1cnNvcikge1xuICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICByZXNvbHZlKGl0ZW1zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlbXMucHVzaChjdXJzb3IudmFsdWUpO1xuXG4gICAgICAgICAgaWYgKGNvdW50ICE9PSB1bmRlZmluZWQgJiYgaXRlbXMubGVuZ3RoID09IGNvdW50KSB7XG4gICAgICAgICAgICByZXNvbHZlKGl0ZW1zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gb3BlbkRiKG5hbWUsIHZlcnNpb24sIHVwZ3JhZGVDYWxsYmFjaykge1xuICAgIHZhciBwID0gcHJvbWlzaWZ5UmVxdWVzdENhbGwoaW5kZXhlZERCLCAnb3BlbicsIFtuYW1lLCB2ZXJzaW9uXSk7XG4gICAgdmFyIHJlcXVlc3QgPSBwLnJlcXVlc3Q7XG5cbiAgICBpZiAocmVxdWVzdCkge1xuICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAodXBncmFkZUNhbGxiYWNrKSB7XG4gICAgICAgICAgdXBncmFkZUNhbGxiYWNrKG5ldyBVcGdyYWRlREIocmVxdWVzdC5yZXN1bHQsIGV2ZW50Lm9sZFZlcnNpb24sIHJlcXVlc3QudHJhbnNhY3Rpb24pKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcC50aGVuKGZ1bmN0aW9uKGRiKSB7XG4gICAgICByZXR1cm4gbmV3IERCKGRiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZURiKG5hbWUpIHtcbiAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdENhbGwoaW5kZXhlZERCLCAnZGVsZXRlRGF0YWJhc2UnLCBbbmFtZV0pO1xuICB9XG5cbiAgZXhwb3J0cy5vcGVuRGIgPSBvcGVuRGI7XG4gIGV4cG9ydHMuZGVsZXRlRGIgPSBkZWxldGVEYjtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSk7XG4iLCJpbXBvcnQgJ3NoaW55J1xuaW1wb3J0IHsgZ2V0QW5hbHl0aWNzLCBsb2dFdmVudCwgc2V0VXNlclByb3BlcnRpZXN9IGZyb20gJ2ZpcmViYXNlL2FuYWx5dGljcyc7XG5cbmxldCBhbmFseXRpY3M7XG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtaW5pdGlhbGl6ZS1hbmFseXRpY3MnLCAobXNnKSA9PiB7XG5cdGlmKCFhbmFseXRpY3MpXHRcblx0XHRhbmFseXRpY3MgPSBnZXRBbmFseXRpY3MoKTtcbn0pO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLWxvZy1ldmVudCcsIChtc2cpID0+IHtcblx0aWYoIW1zZy5wYXJhbXMpe1xuXHRcdGxvZ0V2ZW50KGFuYWx5dGljcywgbXNnLmV2ZW50KTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRsb2dFdmVudChhbmFseXRpY3MsIG1zZy5ldmVudCwgbXNnLnBhcmFtcyk7XG59KTtcblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1zZXQtdXNlci1wcm9wZXJ0aWVzJywgKG1zZykgPT4ge1xuXHRzZXRVc2VyUHJvcGVydGllcyhhbmFseXRpY3MsIG1zZy5wcm9wcyk7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gU2hpbnk7IiwiaW1wb3J0IHsgZ2V0QXBwLCBfZ2V0UHJvdmlkZXIsIF9yZWdpc3RlckNvbXBvbmVudCwgcmVnaXN0ZXJWZXJzaW9uIH0gZnJvbSAnQGZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAZmlyZWJhc2UvbG9nZ2VyJztcbmltcG9ydCB7IEVycm9yRmFjdG9yeSwgY2FsY3VsYXRlQmFja29mZk1pbGxpcywgRmlyZWJhc2VFcnJvciwgaXNJbmRleGVkREJBdmFpbGFibGUsIHZhbGlkYXRlSW5kZXhlZERCT3BlbmFibGUsIGlzQnJvd3NlckV4dGVuc2lvbiwgYXJlQ29va2llc0VuYWJsZWQsIGdldE1vZHVsYXJJbnN0YW5jZSwgZGVlcEVxdWFsIH0gZnJvbSAnQGZpcmViYXNlL3V0aWwnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGZpcmViYXNlL2NvbXBvbmVudCc7XG5pbXBvcnQgJ0BmaXJlYmFzZS9pbnN0YWxsYXRpb25zJztcblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFR5cGUgY29uc3RhbnQgZm9yIEZpcmViYXNlIEFuYWx5dGljcy5cclxuICovXHJcbmNvbnN0IEFOQUxZVElDU19UWVBFID0gJ2FuYWx5dGljcyc7XHJcbi8vIEtleSB0byBhdHRhY2ggRklEIHRvIGluIGd0YWcgcGFyYW1zLlxyXG5jb25zdCBHQV9GSURfS0VZID0gJ2ZpcmViYXNlX2lkJztcclxuY29uc3QgT1JJR0lOX0tFWSA9ICdvcmlnaW4nO1xyXG5jb25zdCBGRVRDSF9USU1FT1VUX01JTExJUyA9IDYwICogMTAwMDtcclxuY29uc3QgRFlOQU1JQ19DT05GSUdfVVJMID0gJ2h0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlYXBpcy5jb20vdjFhbHBoYS9wcm9qZWN0cy8tL2FwcHMve2FwcC1pZH0vd2ViQ29uZmlnJztcclxuY29uc3QgR1RBR19VUkwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RhZy9qcyc7XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmNvbnN0IGxvZ2dlciA9IG5ldyBMb2dnZXIoJ0BmaXJlYmFzZS9hbmFseXRpY3MnKTtcblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIE1ha2VzaGlmdCBwb2x5ZmlsbCBmb3IgUHJvbWlzZS5hbGxTZXR0bGVkKCkuIFJlc29sdmVzIHdoZW4gYWxsIHByb21pc2VzXHJcbiAqIGhhdmUgZWl0aGVyIHJlc29sdmVkIG9yIHJlamVjdGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0gcHJvbWlzZXMgQXJyYXkgb2YgcHJvbWlzZXMgdG8gd2FpdCBmb3IuXHJcbiAqL1xyXG5mdW5jdGlvbiBwcm9taXNlQWxsU2V0dGxlZChwcm9taXNlcykge1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzLm1hcChwcm9taXNlID0+IHByb21pc2UuY2F0Y2goZSA9PiBlKSkpO1xyXG59XHJcbi8qKlxyXG4gKiBJbnNlcnRzIGd0YWcgc2NyaXB0IHRhZyBpbnRvIHRoZSBwYWdlIHRvIGFzeW5jaHJvbm91c2x5IGRvd25sb2FkIGd0YWcuXHJcbiAqIEBwYXJhbSBkYXRhTGF5ZXJOYW1lIE5hbWUgb2YgZGF0YWxheWVyIChtb3N0IG9mdGVuIHRoZSBkZWZhdWx0LCBcIl9kYXRhTGF5ZXJcIikuXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnNlcnRTY3JpcHRUYWcoZGF0YUxheWVyTmFtZSwgbWVhc3VyZW1lbnRJZCkge1xyXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAvLyBXZSBhcmUgbm90IHByb3ZpZGluZyBhbiBhbmFseXRpY3NJZCBpbiB0aGUgVVJMIGJlY2F1c2UgaXQgd291bGQgdHJpZ2dlciBhIGBwYWdlX3ZpZXdgXHJcbiAgICAvLyB3aXRob3V0IGZpZC4gV2Ugd2lsbCBpbml0aWFsaXplIGdhLWlkIHVzaW5nIGd0YWcgKGNvbmZpZykgY29tbWFuZCB0b2dldGhlciB3aXRoIGZpZC5cclxuICAgIHNjcmlwdC5zcmMgPSBgJHtHVEFHX1VSTH0/bD0ke2RhdGFMYXllck5hbWV9JmlkPSR7bWVhc3VyZW1lbnRJZH1gO1xyXG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxufVxyXG4vKipcclxuICogR2V0IHJlZmVyZW5jZSB0bywgb3IgY3JlYXRlLCBnbG9iYWwgZGF0YWxheWVyLlxyXG4gKiBAcGFyYW0gZGF0YUxheWVyTmFtZSBOYW1lIG9mIGRhdGFsYXllciAobW9zdCBvZnRlbiB0aGUgZGVmYXVsdCwgXCJfZGF0YUxheWVyXCIpLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0T3JDcmVhdGVEYXRhTGF5ZXIoZGF0YUxheWVyTmFtZSkge1xyXG4gICAgLy8gQ2hlY2sgZm9yIGV4aXN0aW5nIGRhdGFMYXllciBhbmQgY3JlYXRlIGlmIG5lZWRlZC5cclxuICAgIGxldCBkYXRhTGF5ZXIgPSBbXTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHdpbmRvd1tkYXRhTGF5ZXJOYW1lXSkpIHtcclxuICAgICAgICBkYXRhTGF5ZXIgPSB3aW5kb3dbZGF0YUxheWVyTmFtZV07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB3aW5kb3dbZGF0YUxheWVyTmFtZV0gPSBkYXRhTGF5ZXI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YUxheWVyO1xyXG59XHJcbi8qKlxyXG4gKiBXcmFwcGVkIGd0YWcgbG9naWMgd2hlbiBndGFnIGlzIGNhbGxlZCB3aXRoICdjb25maWcnIGNvbW1hbmQuXHJcbiAqXHJcbiAqIEBwYXJhbSBndGFnQ29yZSBCYXNpYyBndGFnIGZ1bmN0aW9uIHRoYXQganVzdCBhcHBlbmRzIHRvIGRhdGFMYXllci5cclxuICogQHBhcmFtIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXAgTWFwIG9mIGFwcElkcyB0byB0aGVpciBpbml0aWFsaXphdGlvbiBwcm9taXNlcy5cclxuICogQHBhcmFtIGR5bmFtaWNDb25maWdQcm9taXNlc0xpc3QgQXJyYXkgb2YgZHluYW1pYyBjb25maWcgZmV0Y2ggcHJvbWlzZXMuXHJcbiAqIEBwYXJhbSBtZWFzdXJlbWVudElkVG9BcHBJZCBNYXAgb2YgR0EgbWVhc3VyZW1lbnRJRHMgdG8gY29ycmVzcG9uZGluZyBGaXJlYmFzZSBhcHBJZC5cclxuICogQHBhcmFtIG1lYXN1cmVtZW50SWQgR0EgTWVhc3VyZW1lbnQgSUQgdG8gc2V0IGNvbmZpZyBmb3IuXHJcbiAqIEBwYXJhbSBndGFnUGFyYW1zIEd0YWcgY29uZmlnIHBhcmFtcyB0byBzZXQuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBndGFnT25Db25maWcoZ3RhZ0NvcmUsIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXAsIGR5bmFtaWNDb25maWdQcm9taXNlc0xpc3QsIG1lYXN1cmVtZW50SWRUb0FwcElkLCBtZWFzdXJlbWVudElkLCBndGFnUGFyYW1zKSB7XHJcbiAgICAvLyBJZiBjb25maWcgaXMgYWxyZWFkeSBmZXRjaGVkLCB3ZSBrbm93IHRoZSBhcHBJZCBhbmQgY2FuIHVzZSBpdCB0byBsb29rIHVwIHdoYXQgRklEIHByb21pc2Ugd2VcclxuICAgIC8vLyBhcmUgd2FpdGluZyBmb3IsIGFuZCB3YWl0IG9ubHkgb24gdGhhdCBvbmUuXHJcbiAgICBjb25zdCBjb3JyZXNwb25kaW5nQXBwSWQgPSBtZWFzdXJlbWVudElkVG9BcHBJZFttZWFzdXJlbWVudElkXTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKGNvcnJlc3BvbmRpbmdBcHBJZCkge1xyXG4gICAgICAgICAgICBhd2FpdCBpbml0aWFsaXphdGlvblByb21pc2VzTWFwW2NvcnJlc3BvbmRpbmdBcHBJZF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBJZiBjb25maWcgaXMgbm90IGZldGNoZWQgeWV0LCB3YWl0IGZvciBhbGwgY29uZmlncyAod2UgZG9uJ3Qga25vdyB3aGljaCBvbmUgd2UgbmVlZCkgYW5kXHJcbiAgICAgICAgICAgIC8vIGZpbmQgdGhlIGFwcElkIChpZiBhbnkpIGNvcnJlc3BvbmRpbmcgdG8gdGhpcyBtZWFzdXJlbWVudElkLiBJZiB0aGVyZSBpcyBvbmUsIHdhaXQgb25cclxuICAgICAgICAgICAgLy8gdGhhdCBhcHBJZCdzIGluaXRpYWxpemF0aW9uIHByb21pc2UuIElmIHRoZXJlIGlzIG5vbmUsIHByb21pc2UgcmVzb2x2ZXMgYW5kIGd0YWdcclxuICAgICAgICAgICAgLy8gY2FsbCBnb2VzIHRocm91Z2guXHJcbiAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNDb25maWdSZXN1bHRzID0gYXdhaXQgcHJvbWlzZUFsbFNldHRsZWQoZHluYW1pY0NvbmZpZ1Byb21pc2VzTGlzdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kQ29uZmlnID0gZHluYW1pY0NvbmZpZ1Jlc3VsdHMuZmluZChjb25maWcgPT4gY29uZmlnLm1lYXN1cmVtZW50SWQgPT09IG1lYXN1cmVtZW50SWQpO1xyXG4gICAgICAgICAgICBpZiAoZm91bmRDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbZm91bmRDb25maWcuYXBwSWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoZSk7XHJcbiAgICB9XHJcbiAgICBndGFnQ29yZShcImNvbmZpZ1wiIC8qIENPTkZJRyAqLywgbWVhc3VyZW1lbnRJZCwgZ3RhZ1BhcmFtcyk7XHJcbn1cclxuLyoqXHJcbiAqIFdyYXBwZWQgZ3RhZyBsb2dpYyB3aGVuIGd0YWcgaXMgY2FsbGVkIHdpdGggJ2V2ZW50JyBjb21tYW5kLlxyXG4gKlxyXG4gKiBAcGFyYW0gZ3RhZ0NvcmUgQmFzaWMgZ3RhZyBmdW5jdGlvbiB0aGF0IGp1c3QgYXBwZW5kcyB0byBkYXRhTGF5ZXIuXHJcbiAqIEBwYXJhbSBpbml0aWFsaXphdGlvblByb21pc2VzTWFwIE1hcCBvZiBhcHBJZHMgdG8gdGhlaXIgaW5pdGlhbGl6YXRpb24gcHJvbWlzZXMuXHJcbiAqIEBwYXJhbSBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0IEFycmF5IG9mIGR5bmFtaWMgY29uZmlnIGZldGNoIHByb21pc2VzLlxyXG4gKiBAcGFyYW0gbWVhc3VyZW1lbnRJZCBHQSBNZWFzdXJlbWVudCBJRCB0byBsb2cgZXZlbnQgdG8uXHJcbiAqIEBwYXJhbSBndGFnUGFyYW1zIFBhcmFtcyB0byBsb2cgd2l0aCB0aGlzIGV2ZW50LlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZ3RhZ09uRXZlbnQoZ3RhZ0NvcmUsIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXAsIGR5bmFtaWNDb25maWdQcm9taXNlc0xpc3QsIG1lYXN1cmVtZW50SWQsIGd0YWdQYXJhbXMpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IGluaXRpYWxpemF0aW9uUHJvbWlzZXNUb1dhaXRGb3IgPSBbXTtcclxuICAgICAgICAvLyBJZiB0aGVyZSdzIGEgJ3NlbmRfdG8nIHBhcmFtLCBjaGVjayBpZiBhbnkgSUQgc3BlY2lmaWVkIG1hdGNoZXNcclxuICAgICAgICAvLyBhbiBpbml0aWFsaXplSWRzKCkgcHJvbWlzZSB3ZSBhcmUgd2FpdGluZyBmb3IuXHJcbiAgICAgICAgaWYgKGd0YWdQYXJhbXMgJiYgZ3RhZ1BhcmFtc1snc2VuZF90byddKSB7XHJcbiAgICAgICAgICAgIGxldCBnYVNlbmRUb0xpc3QgPSBndGFnUGFyYW1zWydzZW5kX3RvJ107XHJcbiAgICAgICAgICAgIC8vIE1ha2UgaXQgYW4gYXJyYXkgaWYgaXMgaXNuJ3QsIHNvIGl0IGNhbiBiZSBkZWFsdCB3aXRoIHRoZSBzYW1lIHdheS5cclxuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGdhU2VuZFRvTGlzdCkpIHtcclxuICAgICAgICAgICAgICAgIGdhU2VuZFRvTGlzdCA9IFtnYVNlbmRUb0xpc3RdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIENoZWNraW5nICdzZW5kX3RvJyBmaWVsZHMgcmVxdWlyZXMgaGF2aW5nIGFsbCBtZWFzdXJlbWVudCBJRCByZXN1bHRzIGJhY2sgZnJvbVxyXG4gICAgICAgICAgICAvLyB0aGUgZHluYW1pYyBjb25maWcgZmV0Y2guXHJcbiAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNDb25maWdSZXN1bHRzID0gYXdhaXQgcHJvbWlzZUFsbFNldHRsZWQoZHluYW1pY0NvbmZpZ1Byb21pc2VzTGlzdCk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2VuZFRvSWQgb2YgZ2FTZW5kVG9MaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBbnkgZmV0Y2hlZCBkeW5hbWljIG1lYXN1cmVtZW50IElEIHRoYXQgbWF0Y2hlcyB0aGlzICdzZW5kX3RvJyBJRFxyXG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmRDb25maWcgPSBkeW5hbWljQ29uZmlnUmVzdWx0cy5maW5kKGNvbmZpZyA9PiBjb25maWcubWVhc3VyZW1lbnRJZCA9PT0gc2VuZFRvSWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5pdGlhbGl6YXRpb25Qcm9taXNlID0gZm91bmRDb25maWcgJiYgaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcFtmb3VuZENvbmZpZy5hcHBJZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbGl6YXRpb25Qcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6YXRpb25Qcm9taXNlc1RvV2FpdEZvci5wdXNoKGluaXRpYWxpemF0aW9uUHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBGb3VuZCBhbiBpdGVtIGluICdzZW5kX3RvJyB0aGF0IGlzIG5vdCBhc3NvY2lhdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlyZWN0bHkgd2l0aCBhbiBGSUQsIHBvc3NpYmx5IGEgZ3JvdXAuICBFbXB0eSB0aGlzIGFycmF5LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4aXQgdGhlIGxvb3AgZWFybHksIGFuZCBsZXQgaXQgZ2V0IHBvcHVsYXRlZCBiZWxvdy5cclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXphdGlvblByb21pc2VzVG9XYWl0Rm9yID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVGhpcyB3aWxsIGJlIHVucG9wdWxhdGVkIGlmIHRoZXJlIHdhcyBubyAnc2VuZF90bycgZmllbGQgLCBvclxyXG4gICAgICAgIC8vIGlmIG5vdCBhbGwgZW50cmllcyBpbiB0aGUgJ3NlbmRfdG8nIGZpZWxkIGNvdWxkIGJlIG1hcHBlZCB0b1xyXG4gICAgICAgIC8vIGEgRklELiBJbiB0aGVzZSBjYXNlcywgd2FpdCBvbiBhbGwgcGVuZGluZyBpbml0aWFsaXphdGlvbiBwcm9taXNlcy5cclxuICAgICAgICBpZiAoaW5pdGlhbGl6YXRpb25Qcm9taXNlc1RvV2FpdEZvci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgaW5pdGlhbGl6YXRpb25Qcm9taXNlc1RvV2FpdEZvciA9IE9iamVjdC52YWx1ZXMoaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJ1biBjb3JlIGd0YWcgZnVuY3Rpb24gd2l0aCBhcmdzIGFmdGVyIGFsbCByZWxldmFudCBpbml0aWFsaXphdGlvblxyXG4gICAgICAgIC8vIHByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZC5cclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChpbml0aWFsaXphdGlvblByb21pc2VzVG9XYWl0Rm9yKTtcclxuICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBodHRwOi8vYi8xNDEzNzA0NDkgLSB0aGlyZCBhcmd1bWVudCBjYW5ub3QgYmUgdW5kZWZpbmVkLlxyXG4gICAgICAgIGd0YWdDb3JlKFwiZXZlbnRcIiAvKiBFVkVOVCAqLywgbWVhc3VyZW1lbnRJZCwgZ3RhZ1BhcmFtcyB8fCB7fSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGxvZ2dlci5lcnJvcihlKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogV3JhcHMgYSBzdGFuZGFyZCBndGFnIGZ1bmN0aW9uIHdpdGggZXh0cmEgY29kZSB0byB3YWl0IGZvciBjb21wbGV0aW9uIG9mXHJcbiAqIHJlbGV2YW50IGluaXRpYWxpemF0aW9uIHByb21pc2VzIGJlZm9yZSBzZW5kaW5nIHJlcXVlc3RzLlxyXG4gKlxyXG4gKiBAcGFyYW0gZ3RhZ0NvcmUgQmFzaWMgZ3RhZyBmdW5jdGlvbiB0aGF0IGp1c3QgYXBwZW5kcyB0byBkYXRhTGF5ZXIuXHJcbiAqIEBwYXJhbSBpbml0aWFsaXphdGlvblByb21pc2VzTWFwIE1hcCBvZiBhcHBJZHMgdG8gdGhlaXIgaW5pdGlhbGl6YXRpb24gcHJvbWlzZXMuXHJcbiAqIEBwYXJhbSBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0IEFycmF5IG9mIGR5bmFtaWMgY29uZmlnIGZldGNoIHByb21pc2VzLlxyXG4gKiBAcGFyYW0gbWVhc3VyZW1lbnRJZFRvQXBwSWQgTWFwIG9mIEdBIG1lYXN1cmVtZW50SURzIHRvIGNvcnJlc3BvbmRpbmcgRmlyZWJhc2UgYXBwSWQuXHJcbiAqL1xyXG5mdW5jdGlvbiB3cmFwR3RhZyhndGFnQ29yZSwgXHJcbi8qKlxyXG4gKiBBbGxvd3Mgd3JhcHBlZCBndGFnIGNhbGxzIHRvIHdhaXQgb24gd2hpY2hldmVyIGludGlhbGl6YXRpb24gcHJvbWlzZXMgYXJlIHJlcXVpcmVkLFxyXG4gKiBkZXBlbmRpbmcgb24gdGhlIGNvbnRlbnRzIG9mIHRoZSBndGFnIHBhcmFtcycgYHNlbmRfdG9gIGZpZWxkLCBpZiBhbnkuXHJcbiAqL1xyXG5pbml0aWFsaXphdGlvblByb21pc2VzTWFwLCBcclxuLyoqXHJcbiAqIFdyYXBwZWQgZ3RhZyBjYWxscyBzb21ldGltZXMgcmVxdWlyZSBhbGwgZHluYW1pYyBjb25maWcgZmV0Y2hlcyB0byBoYXZlIHJldHVybmVkXHJcbiAqIGJlZm9yZSBkZXRlcm1pbmluZyB3aGF0IGluaXRpYWxpemF0aW9uIHByb21pc2VzICh3aGljaCBpbmNsdWRlIEZJRHMpIHRvIHdhaXQgZm9yLlxyXG4gKi9cclxuZHluYW1pY0NvbmZpZ1Byb21pc2VzTGlzdCwgXHJcbi8qKlxyXG4gKiBXcmFwcGVkIGd0YWcgY29uZmlnIGNhbGxzIGNhbiBuYXJyb3cgZG93biB3aGljaCBpbml0aWFsaXphdGlvbiBwcm9taXNlICh3aXRoIEZJRClcclxuICogdG8gd2FpdCBmb3IgaWYgdGhlIG1lYXN1cmVtZW50SWQgaXMgYWxyZWFkeSBmZXRjaGVkLCBieSBnZXR0aW5nIHRoZSBjb3JyZXNwb25kaW5nIGFwcElkLFxyXG4gKiB3aGljaCBpcyB0aGUga2V5IGZvciB0aGUgaW5pdGlhbGl6YXRpb24gcHJvbWlzZXMgbWFwLlxyXG4gKi9cclxubWVhc3VyZW1lbnRJZFRvQXBwSWQpIHtcclxuICAgIC8qKlxyXG4gICAgICogV3JhcHBlciBhcm91bmQgZ3RhZyB0aGF0IGVuc3VyZXMgRklEIGlzIHNlbnQgd2l0aCBndGFnIGNhbGxzLlxyXG4gICAgICogQHBhcmFtIGNvbW1hbmQgR3RhZyBjb21tYW5kIHR5cGUuXHJcbiAgICAgKiBAcGFyYW0gaWRPck5hbWVPclBhcmFtcyBNZWFzdXJlbWVudCBJRCBpZiBjb21tYW5kIGlzIEVWRU5UL0NPTkZJRywgcGFyYW1zIGlmIGNvbW1hbmQgaXMgU0VULlxyXG4gICAgICogQHBhcmFtIGd0YWdQYXJhbXMgUGFyYW1zIGlmIGV2ZW50IGlzIEVWRU5UL0NPTkZJRy5cclxuICAgICAqL1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ3RhZ1dyYXBwZXIoY29tbWFuZCwgaWRPck5hbWVPclBhcmFtcywgZ3RhZ1BhcmFtcykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIElmIGV2ZW50LCBjaGVjayB0aGF0IHJlbGV2YW50IGluaXRpYWxpemF0aW9uIHByb21pc2VzIGhhdmUgY29tcGxldGVkLlxyXG4gICAgICAgICAgICBpZiAoY29tbWFuZCA9PT0gXCJldmVudFwiIC8qIEVWRU5UICovKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBFVkVOVCwgc2Vjb25kIGFyZyBtdXN0IGJlIG1lYXN1cmVtZW50SWQuXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBndGFnT25FdmVudChndGFnQ29yZSwgaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcCwgZHluYW1pY0NvbmZpZ1Byb21pc2VzTGlzdCwgaWRPck5hbWVPclBhcmFtcywgZ3RhZ1BhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZCA9PT0gXCJjb25maWdcIiAvKiBDT05GSUcgKi8pIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIENPTkZJRywgc2Vjb25kIGFyZyBtdXN0IGJlIG1lYXN1cmVtZW50SWQuXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBndGFnT25Db25maWcoZ3RhZ0NvcmUsIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXAsIGR5bmFtaWNDb25maWdQcm9taXNlc0xpc3QsIG1lYXN1cmVtZW50SWRUb0FwcElkLCBpZE9yTmFtZU9yUGFyYW1zLCBndGFnUGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIFNFVCwgc2Vjb25kIGFyZyBtdXN0IGJlIHBhcmFtcy5cclxuICAgICAgICAgICAgICAgIGd0YWdDb3JlKFwic2V0XCIgLyogU0VUICovLCBpZE9yTmFtZU9yUGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGd0YWdXcmFwcGVyO1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGdsb2JhbCBndGFnIGZ1bmN0aW9uIG9yIHdyYXBzIGV4aXN0aW5nIG9uZSBpZiBmb3VuZC5cclxuICogVGhpcyB3cmFwcGVkIGZ1bmN0aW9uIGF0dGFjaGVzIEZpcmViYXNlIGluc3RhbmNlIElEIChGSUQpIHRvIGd0YWcgJ2NvbmZpZycgYW5kXHJcbiAqICdldmVudCcgY2FsbHMgdGhhdCBiZWxvbmcgdG8gdGhlIEdBSUQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgRmlyZWJhc2UgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBpbml0aWFsaXphdGlvblByb21pc2VzTWFwIE1hcCBvZiBhcHBJZHMgdG8gdGhlaXIgaW5pdGlhbGl6YXRpb24gcHJvbWlzZXMuXHJcbiAqIEBwYXJhbSBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0IEFycmF5IG9mIGR5bmFtaWMgY29uZmlnIGZldGNoIHByb21pc2VzLlxyXG4gKiBAcGFyYW0gbWVhc3VyZW1lbnRJZFRvQXBwSWQgTWFwIG9mIEdBIG1lYXN1cmVtZW50SURzIHRvIGNvcnJlc3BvbmRpbmcgRmlyZWJhc2UgYXBwSWQuXHJcbiAqIEBwYXJhbSBkYXRhTGF5ZXJOYW1lIE5hbWUgb2YgZ2xvYmFsIEdBIGRhdGFsYXllciBhcnJheS5cclxuICogQHBhcmFtIGd0YWdGdW5jdGlvbk5hbWUgTmFtZSBvZiBnbG9iYWwgZ3RhZyBmdW5jdGlvbiAoXCJndGFnXCIgaWYgbm90IHVzZXItc3BlY2lmaWVkKS5cclxuICovXHJcbmZ1bmN0aW9uIHdyYXBPckNyZWF0ZUd0YWcoaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcCwgZHluYW1pY0NvbmZpZ1Byb21pc2VzTGlzdCwgbWVhc3VyZW1lbnRJZFRvQXBwSWQsIGRhdGFMYXllck5hbWUsIGd0YWdGdW5jdGlvbk5hbWUpIHtcclxuICAgIC8vIENyZWF0ZSBhIGJhc2ljIGNvcmUgZ3RhZyBmdW5jdGlvblxyXG4gICAgbGV0IGd0YWdDb3JlID0gZnVuY3Rpb24gKC4uLl9hcmdzKSB7XHJcbiAgICAgICAgLy8gTXVzdCBwdXNoIElBcmd1bWVudHMgb2JqZWN0LCBub3QgYW4gYXJyYXkuXHJcbiAgICAgICAgd2luZG93W2RhdGFMYXllck5hbWVdLnB1c2goYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgICAvLyBSZXBsYWNlIGl0IHdpdGggZXhpc3Rpbmcgb25lIGlmIGZvdW5kXHJcbiAgICBpZiAod2luZG93W2d0YWdGdW5jdGlvbk5hbWVdICYmXHJcbiAgICAgICAgdHlwZW9mIHdpbmRvd1tndGFnRnVuY3Rpb25OYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBndGFnQ29yZSA9IHdpbmRvd1tndGFnRnVuY3Rpb25OYW1lXTtcclxuICAgIH1cclxuICAgIHdpbmRvd1tndGFnRnVuY3Rpb25OYW1lXSA9IHdyYXBHdGFnKGd0YWdDb3JlLCBpbml0aWFsaXphdGlvblByb21pc2VzTWFwLCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0LCBtZWFzdXJlbWVudElkVG9BcHBJZCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGd0YWdDb3JlLFxyXG4gICAgICAgIHdyYXBwZWRHdGFnOiB3aW5kb3dbZ3RhZ0Z1bmN0aW9uTmFtZV1cclxuICAgIH07XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgZmlyc3Qgc2NyaXB0IHRhZyBpbiBET00gbWF0Y2hpbmcgb3VyIGd0YWcgdXJsIHBhdHRlcm4uXHJcbiAqL1xyXG5mdW5jdGlvbiBmaW5kR3RhZ1NjcmlwdE9uUGFnZSgpIHtcclxuICAgIGNvbnN0IHNjcmlwdFRhZ3MgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xyXG4gICAgZm9yIChjb25zdCB0YWcgb2YgT2JqZWN0LnZhbHVlcyhzY3JpcHRUYWdzKSkge1xyXG4gICAgICAgIGlmICh0YWcuc3JjICYmIHRhZy5zcmMuaW5jbHVkZXMoR1RBR19VUkwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuY29uc3QgRVJST1JTID0ge1xyXG4gICAgW1wiYWxyZWFkeS1leGlzdHNcIiAvKiBBTFJFQURZX0VYSVNUUyAqL106ICdBIEZpcmViYXNlIEFuYWx5dGljcyBpbnN0YW5jZSB3aXRoIHRoZSBhcHBJZCB7JGlkfSAnICtcclxuICAgICAgICAnIGFscmVhZHkgZXhpc3RzLiAnICtcclxuICAgICAgICAnT25seSBvbmUgRmlyZWJhc2UgQW5hbHl0aWNzIGluc3RhbmNlIGNhbiBiZSBjcmVhdGVkIGZvciBlYWNoIGFwcElkLicsXHJcbiAgICBbXCJhbHJlYWR5LWluaXRpYWxpemVkXCIgLyogQUxSRUFEWV9JTklUSUFMSVpFRCAqL106ICdpbml0aWFsaXplQW5hbHl0aWNzKCkgY2Fubm90IGJlIGNhbGxlZCBhZ2FpbiB3aXRoIGRpZmZlcmVudCBvcHRpb25zIHRoYW4gdGhvc2UgJyArXHJcbiAgICAgICAgJ2l0IHdhcyBpbml0aWFsbHkgY2FsbGVkIHdpdGguIEl0IGNhbiBiZSBjYWxsZWQgYWdhaW4gd2l0aCB0aGUgc2FtZSBvcHRpb25zIHRvICcgK1xyXG4gICAgICAgICdyZXR1cm4gdGhlIGV4aXN0aW5nIGluc3RhbmNlLCBvciBnZXRBbmFseXRpY3MoKSBjYW4gYmUgdXNlZCAnICtcclxuICAgICAgICAndG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBhbHJlYWR5LWludGlhbGl6ZWQgaW5zdGFuY2UuJyxcclxuICAgIFtcImFscmVhZHktaW5pdGlhbGl6ZWQtc2V0dGluZ3NcIiAvKiBBTFJFQURZX0lOSVRJQUxJWkVEX1NFVFRJTkdTICovXTogJ0ZpcmViYXNlIEFuYWx5dGljcyBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkLicgK1xyXG4gICAgICAgICdzZXR0aW5ncygpIG11c3QgYmUgY2FsbGVkIGJlZm9yZSBpbml0aWFsaXppbmcgYW55IEFuYWx5dGljcyBpbnN0YW5jZScgK1xyXG4gICAgICAgICdvciBpdCB3aWxsIGhhdmUgbm8gZWZmZWN0LicsXHJcbiAgICBbXCJpbnRlcm9wLWNvbXBvbmVudC1yZWctZmFpbGVkXCIgLyogSU5URVJPUF9DT01QT05FTlRfUkVHX0ZBSUxFRCAqL106ICdGaXJlYmFzZSBBbmFseXRpY3MgSW50ZXJvcCBDb21wb25lbnQgZmFpbGVkIHRvIGluc3RhbnRpYXRlOiB7JHJlYXNvbn0nLFxyXG4gICAgW1wiaW52YWxpZC1hbmFseXRpY3MtY29udGV4dFwiIC8qIElOVkFMSURfQU5BTFlUSUNTX0NPTlRFWFQgKi9dOiAnRmlyZWJhc2UgQW5hbHl0aWNzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4gJyArXHJcbiAgICAgICAgJ1dyYXAgaW5pdGlhbGl6YXRpb24gb2YgYW5hbHl0aWNzIGluIGFuYWx5dGljcy5pc1N1cHBvcnRlZCgpICcgK1xyXG4gICAgICAgICd0byBwcmV2ZW50IGluaXRpYWxpemF0aW9uIGluIHVuc3VwcG9ydGVkIGVudmlyb25tZW50cy4gRGV0YWlsczogeyRlcnJvckluZm99JyxcclxuICAgIFtcImluZGV4ZWRkYi11bmF2YWlsYWJsZVwiIC8qIElOREVYRUREQl9VTkFWQUlMQUJMRSAqL106ICdJbmRleGVkREIgdW5hdmFpbGFibGUgb3IgcmVzdHJpY3RlZCBpbiB0aGlzIGVudmlyb25tZW50LiAnICtcclxuICAgICAgICAnV3JhcCBpbml0aWFsaXphdGlvbiBvZiBhbmFseXRpY3MgaW4gYW5hbHl0aWNzLmlzU3VwcG9ydGVkKCkgJyArXHJcbiAgICAgICAgJ3RvIHByZXZlbnQgaW5pdGlhbGl6YXRpb24gaW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnRzLiBEZXRhaWxzOiB7JGVycm9ySW5mb30nLFxyXG4gICAgW1wiZmV0Y2gtdGhyb3R0bGVcIiAvKiBGRVRDSF9USFJPVFRMRSAqL106ICdUaGUgY29uZmlnIGZldGNoIHJlcXVlc3QgdGltZWQgb3V0IHdoaWxlIGluIGFuIGV4cG9uZW50aWFsIGJhY2tvZmYgc3RhdGUuJyArXHJcbiAgICAgICAgJyBVbml4IHRpbWVzdGFtcCBpbiBtaWxsaXNlY29uZHMgd2hlbiBmZXRjaCByZXF1ZXN0IHRocm90dGxpbmcgZW5kczogeyR0aHJvdHRsZUVuZFRpbWVNaWxsaXN9LicsXHJcbiAgICBbXCJjb25maWctZmV0Y2gtZmFpbGVkXCIgLyogQ09ORklHX0ZFVENIX0ZBSUxFRCAqL106ICdEeW5hbWljIGNvbmZpZyBmZXRjaCBmYWlsZWQ6IFt7JGh0dHBTdGF0dXN9XSB7JHJlc3BvbnNlTWVzc2FnZX0nLFxyXG4gICAgW1wibm8tYXBpLWtleVwiIC8qIE5PX0FQSV9LRVkgKi9dOiAnVGhlIFwiYXBpS2V5XCIgZmllbGQgaXMgZW1wdHkgaW4gdGhlIGxvY2FsIEZpcmViYXNlIGNvbmZpZy4gRmlyZWJhc2UgQW5hbHl0aWNzIHJlcXVpcmVzIHRoaXMgZmllbGQgdG8nICtcclxuICAgICAgICAnY29udGFpbiBhIHZhbGlkIEFQSSBrZXkuJyxcclxuICAgIFtcIm5vLWFwcC1pZFwiIC8qIE5PX0FQUF9JRCAqL106ICdUaGUgXCJhcHBJZFwiIGZpZWxkIGlzIGVtcHR5IGluIHRoZSBsb2NhbCBGaXJlYmFzZSBjb25maWcuIEZpcmViYXNlIEFuYWx5dGljcyByZXF1aXJlcyB0aGlzIGZpZWxkIHRvJyArXHJcbiAgICAgICAgJ2NvbnRhaW4gYSB2YWxpZCBhcHAgSUQuJ1xyXG59O1xyXG5jb25zdCBFUlJPUl9GQUNUT1JZID0gbmV3IEVycm9yRmFjdG9yeSgnYW5hbHl0aWNzJywgJ0FuYWx5dGljcycsIEVSUk9SUyk7XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBCYWNrb2ZmIGZhY3RvciBmb3IgNTAzIGVycm9ycywgd2hpY2ggd2Ugd2FudCB0byBiZSBjb25zZXJ2YXRpdmUgYWJvdXRcclxuICogdG8gYXZvaWQgb3ZlcmxvYWRpbmcgc2VydmVycy4gRWFjaCByZXRyeSBpbnRlcnZhbCB3aWxsIGJlXHJcbiAqIEJBU0VfSU5URVJWQUxfTUlMTElTICogTE9OR19SRVRSWV9GQUNUT1IgXiByZXRyeUNvdW50LCBzbyB0aGUgc2Vjb25kIG9uZVxyXG4gKiB3aWxsIGJlIH4zMCBzZWNvbmRzICh3aXRoIGZ1enppbmcpLlxyXG4gKi9cclxuY29uc3QgTE9OR19SRVRSWV9GQUNUT1IgPSAzMDtcclxuLyoqXHJcbiAqIEJhc2Ugd2FpdCBpbnRlcnZhbCB0byBtdWx0aXBsaWVkIGJ5IGJhY2tvZmZGYWN0b3JeYmFja29mZkNvdW50LlxyXG4gKi9cclxuY29uc3QgQkFTRV9JTlRFUlZBTF9NSUxMSVMgPSAxMDAwO1xyXG4vKipcclxuICogU3R1YmJhYmxlIHJldHJ5IGRhdGEgc3RvcmFnZSBjbGFzcy5cclxuICovXHJcbmNsYXNzIFJldHJ5RGF0YSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aHJvdHRsZU1ldGFkYXRhID0ge30sIGludGVydmFsTWlsbGlzID0gQkFTRV9JTlRFUlZBTF9NSUxMSVMpIHtcclxuICAgICAgICB0aGlzLnRocm90dGxlTWV0YWRhdGEgPSB0aHJvdHRsZU1ldGFkYXRhO1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWxNaWxsaXMgPSBpbnRlcnZhbE1pbGxpcztcclxuICAgIH1cclxuICAgIGdldFRocm90dGxlTWV0YWRhdGEoYXBwSWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aHJvdHRsZU1ldGFkYXRhW2FwcElkXTtcclxuICAgIH1cclxuICAgIHNldFRocm90dGxlTWV0YWRhdGEoYXBwSWQsIG1ldGFkYXRhKSB7XHJcbiAgICAgICAgdGhpcy50aHJvdHRsZU1ldGFkYXRhW2FwcElkXSA9IG1ldGFkYXRhO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlVGhyb3R0bGVNZXRhZGF0YShhcHBJZCkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnRocm90dGxlTWV0YWRhdGFbYXBwSWRdO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IGRlZmF1bHRSZXRyeURhdGEgPSBuZXcgUmV0cnlEYXRhKCk7XHJcbi8qKlxyXG4gKiBTZXQgR0VUIHJlcXVlc3QgaGVhZGVycy5cclxuICogQHBhcmFtIGFwaUtleSBBcHAgQVBJIGtleS5cclxuICovXHJcbmZ1bmN0aW9uIGdldEhlYWRlcnMoYXBpS2V5KSB7XHJcbiAgICByZXR1cm4gbmV3IEhlYWRlcnMoe1xyXG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICd4LWdvb2ctYXBpLWtleSc6IGFwaUtleVxyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIEZldGNoZXMgZHluYW1pYyBjb25maWcgZnJvbSBiYWNrZW5kLlxyXG4gKiBAcGFyYW0gYXBwIEZpcmViYXNlIGFwcCB0byBmZXRjaCBjb25maWcgZm9yLlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEeW5hbWljQ29uZmlnKGFwcEZpZWxkcykge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc3QgeyBhcHBJZCwgYXBpS2V5IH0gPSBhcHBGaWVsZHM7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczogZ2V0SGVhZGVycyhhcGlLZXkpXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXBwVXJsID0gRFlOQU1JQ19DT05GSUdfVVJMLnJlcGxhY2UoJ3thcHAtaWR9JywgYXBwSWQpO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcHBVcmwsIHJlcXVlc3QpO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyAhPT0gMzA0KSB7XHJcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9ICcnO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFRyeSB0byBnZXQgYW55IGVycm9yIG1lc3NhZ2UgdGV4dCBmcm9tIHNlcnZlciByZXNwb25zZS5cclxuICAgICAgICAgICAgY29uc3QganNvblJlc3BvbnNlID0gKGF3YWl0IHJlc3BvbnNlLmpzb24oKSk7XHJcbiAgICAgICAgICAgIGlmICgoX2EgPSBqc29uUmVzcG9uc2UuZXJyb3IpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBqc29uUmVzcG9uc2UuZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoX2lnbm9yZWQpIHsgfVxyXG4gICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiY29uZmlnLWZldGNoLWZhaWxlZFwiIC8qIENPTkZJR19GRVRDSF9GQUlMRUQgKi8sIHtcclxuICAgICAgICAgICAgaHR0cFN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgICAgICAgICByZXNwb25zZU1lc3NhZ2U6IGVycm9yTWVzc2FnZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxufVxyXG4vKipcclxuICogRmV0Y2hlcyBkeW5hbWljIGNvbmZpZyBmcm9tIGJhY2tlbmQsIHJldHJ5aW5nIGlmIGZhaWxlZC5cclxuICogQHBhcmFtIGFwcCBGaXJlYmFzZSBhcHAgdG8gZmV0Y2ggY29uZmlnIGZvci5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGZldGNoRHluYW1pY0NvbmZpZ1dpdGhSZXRyeShhcHAsIFxyXG4vLyByZXRyeURhdGEgYW5kIHRpbWVvdXRNaWxsaXMgYXJlIHBhcmFtZXRlcml6ZWQgdG8gYWxsb3cgcGFzc2luZyBhIGRpZmZlcmVudCB2YWx1ZSBmb3IgdGVzdGluZy5cclxucmV0cnlEYXRhID0gZGVmYXVsdFJldHJ5RGF0YSwgdGltZW91dE1pbGxpcykge1xyXG4gICAgY29uc3QgeyBhcHBJZCwgYXBpS2V5LCBtZWFzdXJlbWVudElkIH0gPSBhcHAub3B0aW9ucztcclxuICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcIm5vLWFwcC1pZFwiIC8qIE5PX0FQUF9JRCAqLyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWFwaUtleSkge1xyXG4gICAgICAgIGlmIChtZWFzdXJlbWVudElkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudElkLFxyXG4gICAgICAgICAgICAgICAgYXBwSWRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgRVJST1JfRkFDVE9SWS5jcmVhdGUoXCJuby1hcGkta2V5XCIgLyogTk9fQVBJX0tFWSAqLyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0aHJvdHRsZU1ldGFkYXRhID0gcmV0cnlEYXRhLmdldFRocm90dGxlTWV0YWRhdGEoYXBwSWQpIHx8IHtcclxuICAgICAgICBiYWNrb2ZmQ291bnQ6IDAsXHJcbiAgICAgICAgdGhyb3R0bGVFbmRUaW1lTWlsbGlzOiBEYXRlLm5vdygpXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc2lnbmFsID0gbmV3IEFuYWx5dGljc0Fib3J0U2lnbmFsKCk7XHJcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuICAgICAgICAvLyBOb3RlIGEgdmVyeSBsb3cgZGVsYXksIGVnIDwgMTBtcywgY2FuIGVsYXBzZSBiZWZvcmUgbGlzdGVuZXJzIGFyZSBpbml0aWFsaXplZC5cclxuICAgICAgICBzaWduYWwuYWJvcnQoKTtcclxuICAgIH0sIHRpbWVvdXRNaWxsaXMgIT09IHVuZGVmaW5lZCA/IHRpbWVvdXRNaWxsaXMgOiBGRVRDSF9USU1FT1VUX01JTExJUyk7XHJcbiAgICByZXR1cm4gYXR0ZW1wdEZldGNoRHluYW1pY0NvbmZpZ1dpdGhSZXRyeSh7IGFwcElkLCBhcGlLZXksIG1lYXN1cmVtZW50SWQgfSwgdGhyb3R0bGVNZXRhZGF0YSwgc2lnbmFsLCByZXRyeURhdGEpO1xyXG59XHJcbi8qKlxyXG4gKiBSdW5zIG9uZSByZXRyeSBhdHRlbXB0LlxyXG4gKiBAcGFyYW0gYXBwRmllbGRzIE5lY2Vzc2FyeSBhcHAgY29uZmlnIGZpZWxkcy5cclxuICogQHBhcmFtIHRocm90dGxlTWV0YWRhdGEgT25nb2luZyBtZXRhZGF0YSB0byBkZXRlcm1pbmUgdGhyb3R0bGluZyB0aW1lcy5cclxuICogQHBhcmFtIHNpZ25hbCBBYm9ydCBzaWduYWwuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBhdHRlbXB0RmV0Y2hEeW5hbWljQ29uZmlnV2l0aFJldHJ5KGFwcEZpZWxkcywgeyB0aHJvdHRsZUVuZFRpbWVNaWxsaXMsIGJhY2tvZmZDb3VudCB9LCBzaWduYWwsIHJldHJ5RGF0YSA9IGRlZmF1bHRSZXRyeURhdGEgLy8gZm9yIHRlc3RpbmdcclxuKSB7XHJcbiAgICBjb25zdCB7IGFwcElkLCBtZWFzdXJlbWVudElkIH0gPSBhcHBGaWVsZHM7XHJcbiAgICAvLyBTdGFydHMgd2l0aCBhIChwb3RlbnRpYWxseSB6ZXJvKSB0aW1lb3V0IHRvIHN1cHBvcnQgcmVzdW1wdGlvbiBmcm9tIHN0b3JlZCBzdGF0ZS5cclxuICAgIC8vIEVuc3VyZXMgdGhlIHRocm90dGxlIGVuZCB0aW1lIGlzIGhvbm9yZWQgaWYgdGhlIGxhc3QgYXR0ZW1wdCB0aW1lZCBvdXQuXHJcbiAgICAvLyBOb3RlIHRoZSBTREsgd2lsbCBuZXZlciBtYWtlIGEgcmVxdWVzdCBpZiB0aGUgZmV0Y2ggdGltZW91dCBleHBpcmVzIGF0IHRoaXMgcG9pbnQuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHNldEFib3J0YWJsZVRpbWVvdXQoc2lnbmFsLCB0aHJvdHRsZUVuZFRpbWVNaWxsaXMpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBpZiAobWVhc3VyZW1lbnRJZCkge1xyXG4gICAgICAgICAgICBsb2dnZXIud2FybihgVGltZWQgb3V0IGZldGNoaW5nIHRoaXMgRmlyZWJhc2UgYXBwJ3MgbWVhc3VyZW1lbnQgSUQgZnJvbSB0aGUgc2VydmVyLmAgK1xyXG4gICAgICAgICAgICAgICAgYCBGYWxsaW5nIGJhY2sgdG8gdGhlIG1lYXN1cmVtZW50IElEICR7bWVhc3VyZW1lbnRJZH1gICtcclxuICAgICAgICAgICAgICAgIGAgcHJvdmlkZWQgaW4gdGhlIFwibWVhc3VyZW1lbnRJZFwiIGZpZWxkIGluIHRoZSBsb2NhbCBGaXJlYmFzZSBjb25maWcuIFske2UubWVzc2FnZX1dYCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGFwcElkLCBtZWFzdXJlbWVudElkIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hEeW5hbWljQ29uZmlnKGFwcEZpZWxkcyk7XHJcbiAgICAgICAgLy8gTm90ZSB0aGUgU0RLIG9ubHkgY2xlYXJzIHRocm90dGxlIHN0YXRlIGlmIHJlc3BvbnNlIGlzIHN1Y2Nlc3Mgb3Igbm9uLXJldHJpYWJsZS5cclxuICAgICAgICByZXRyeURhdGEuZGVsZXRlVGhyb3R0bGVNZXRhZGF0YShhcHBJZCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBpZiAoIWlzUmV0cmlhYmxlRXJyb3IoZSkpIHtcclxuICAgICAgICAgICAgcmV0cnlEYXRhLmRlbGV0ZVRocm90dGxlTWV0YWRhdGEoYXBwSWQpO1xyXG4gICAgICAgICAgICBpZiAobWVhc3VyZW1lbnRJZCkge1xyXG4gICAgICAgICAgICAgICAgbG9nZ2VyLndhcm4oYEZhaWxlZCB0byBmZXRjaCB0aGlzIEZpcmViYXNlIGFwcCdzIG1lYXN1cmVtZW50IElEIGZyb20gdGhlIHNlcnZlci5gICtcclxuICAgICAgICAgICAgICAgICAgICBgIEZhbGxpbmcgYmFjayB0byB0aGUgbWVhc3VyZW1lbnQgSUQgJHttZWFzdXJlbWVudElkfWAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGAgcHJvdmlkZWQgaW4gdGhlIFwibWVhc3VyZW1lbnRJZFwiIGZpZWxkIGluIHRoZSBsb2NhbCBGaXJlYmFzZSBjb25maWcuIFske2UubWVzc2FnZX1dYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhcHBJZCwgbWVhc3VyZW1lbnRJZCB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBiYWNrb2ZmTWlsbGlzID0gTnVtYmVyKGUuY3VzdG9tRGF0YS5odHRwU3RhdHVzKSA9PT0gNTAzXHJcbiAgICAgICAgICAgID8gY2FsY3VsYXRlQmFja29mZk1pbGxpcyhiYWNrb2ZmQ291bnQsIHJldHJ5RGF0YS5pbnRlcnZhbE1pbGxpcywgTE9OR19SRVRSWV9GQUNUT1IpXHJcbiAgICAgICAgICAgIDogY2FsY3VsYXRlQmFja29mZk1pbGxpcyhiYWNrb2ZmQ291bnQsIHJldHJ5RGF0YS5pbnRlcnZhbE1pbGxpcyk7XHJcbiAgICAgICAgLy8gSW5jcmVtZW50cyBiYWNrb2ZmIHN0YXRlLlxyXG4gICAgICAgIGNvbnN0IHRocm90dGxlTWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgIHRocm90dGxlRW5kVGltZU1pbGxpczogRGF0ZS5ub3coKSArIGJhY2tvZmZNaWxsaXMsXHJcbiAgICAgICAgICAgIGJhY2tvZmZDb3VudDogYmFja29mZkNvdW50ICsgMVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gUGVyc2lzdHMgc3RhdGUuXHJcbiAgICAgICAgcmV0cnlEYXRhLnNldFRocm90dGxlTWV0YWRhdGEoYXBwSWQsIHRocm90dGxlTWV0YWRhdGEpO1xyXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQ2FsbGluZyBhdHRlbXB0RmV0Y2ggYWdhaW4gaW4gJHtiYWNrb2ZmTWlsbGlzfSBtaWxsaXNgKTtcclxuICAgICAgICByZXR1cm4gYXR0ZW1wdEZldGNoRHluYW1pY0NvbmZpZ1dpdGhSZXRyeShhcHBGaWVsZHMsIHRocm90dGxlTWV0YWRhdGEsIHNpZ25hbCwgcmV0cnlEYXRhKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogU3VwcG9ydHMgd2FpdGluZyBvbiBhIGJhY2tvZmYgYnk6XHJcbiAqXHJcbiAqIDx1bD5cclxuICogICA8bGk+UHJvbWlzaWZ5aW5nIHNldFRpbWVvdXQsIHNvIHdlIGNhbiBzZXQgYSB0aW1lb3V0IGluIG91ciBQcm9taXNlIGNoYWluPC9saT5cclxuICogICA8bGk+TGlzdGVuaW5nIG9uIGEgc2lnbmFsIGJ1cyBmb3IgYWJvcnQgZXZlbnRzLCBqdXN0IGxpa2UgdGhlIEZldGNoIEFQSTwvbGk+XHJcbiAqICAgPGxpPkZhaWxpbmcgaW4gdGhlIHNhbWUgd2F5IHRoZSBGZXRjaCBBUEkgZmFpbHMsIHNvIHRpbWluZyBvdXQgYSBsaXZlIHJlcXVlc3QgYW5kIGEgdGhyb3R0bGVkXHJcbiAqICAgICAgIHJlcXVlc3QgYXBwZWFyIHRoZSBzYW1lLjwvbGk+XHJcbiAqIDwvdWw+XHJcbiAqXHJcbiAqIDxwPlZpc2libGUgZm9yIHRlc3RpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRBYm9ydGFibGVUaW1lb3V0KHNpZ25hbCwgdGhyb3R0bGVFbmRUaW1lTWlsbGlzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIC8vIERlcml2ZXMgYmFja29mZiBmcm9tIGdpdmVuIGVuZCB0aW1lLCBub3JtYWxpemluZyBuZWdhdGl2ZSBudW1iZXJzIHRvIHplcm8uXHJcbiAgICAgICAgY29uc3QgYmFja29mZk1pbGxpcyA9IE1hdGgubWF4KHRocm90dGxlRW5kVGltZU1pbGxpcyAtIERhdGUubm93KCksIDApO1xyXG4gICAgICAgIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KHJlc29sdmUsIGJhY2tvZmZNaWxsaXMpO1xyXG4gICAgICAgIC8vIEFkZHMgbGlzdGVuZXIsIHJhdGhlciB0aGFuIHNldHMgb25hYm9ydCwgYmVjYXVzZSBzaWduYWwgaXMgYSBzaGFyZWQgb2JqZWN0LlxyXG4gICAgICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgcmVxdWVzdCBjb21wbGV0ZXMgYmVmb3JlIHRoaXMgdGltZW91dCwgdGhlIHJlamVjdGlvbiBoYXMgbm8gZWZmZWN0LlxyXG4gICAgICAgICAgICByZWplY3QoRVJST1JfRkFDVE9SWS5jcmVhdGUoXCJmZXRjaC10aHJvdHRsZVwiIC8qIEZFVENIX1RIUk9UVExFICovLCB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdHRsZUVuZFRpbWVNaWxsaXNcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUge0BsaW5rIEVycm9yfSBpbmRpY2F0ZXMgYSBmZXRjaCByZXF1ZXN0IG1heSBzdWNjZWVkIGxhdGVyLlxyXG4gKi9cclxuZnVuY3Rpb24gaXNSZXRyaWFibGVFcnJvcihlKSB7XHJcbiAgICBpZiAoIShlIGluc3RhbmNlb2YgRmlyZWJhc2VFcnJvcikgfHwgIWUuY3VzdG9tRGF0YSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIFVzZXMgc3RyaW5nIGluZGV4IGRlZmluZWQgYnkgRXJyb3JEYXRhLCB3aGljaCBGaXJlYmFzZUVycm9yIGltcGxlbWVudHMuXHJcbiAgICBjb25zdCBodHRwU3RhdHVzID0gTnVtYmVyKGUuY3VzdG9tRGF0YVsnaHR0cFN0YXR1cyddKTtcclxuICAgIHJldHVybiAoaHR0cFN0YXR1cyA9PT0gNDI5IHx8XHJcbiAgICAgICAgaHR0cFN0YXR1cyA9PT0gNTAwIHx8XHJcbiAgICAgICAgaHR0cFN0YXR1cyA9PT0gNTAzIHx8XHJcbiAgICAgICAgaHR0cFN0YXR1cyA9PT0gNTA0KTtcclxufVxyXG4vKipcclxuICogU2hpbXMgYSBtaW5pbWFsIEFib3J0U2lnbmFsIChjb3BpZWQgZnJvbSBSZW1vdGUgQ29uZmlnKS5cclxuICpcclxuICogPHA+QWJvcnRDb250cm9sbGVyJ3MgQWJvcnRTaWduYWwgY29udmVuaWVudGx5IGRlY291cGxlcyBmZXRjaCB0aW1lb3V0IGxvZ2ljIGZyb20gb3RoZXIgYXNwZWN0c1xyXG4gKiBvZiBuZXR3b3JraW5nLCBzdWNoIGFzIHJldHJpZXMuIEZpcmViYXNlIGRvZXNuJ3QgdXNlIEFib3J0Q29udHJvbGxlciBlbm91Z2ggdG8ganVzdGlmeSBhXHJcbiAqIHBvbHlmaWxsIHJlY29tbWVuZGF0aW9uLCBsaWtlIHdlIGRvIHdpdGggdGhlIEZldGNoIEFQSSwgYnV0IHRoaXMgbWluaW1hbCBzaGltIGNhbiBlYXNpbHkgYmVcclxuICogc3dhcHBlZCBvdXQgaWYvd2hlbiB3ZSBkby5cclxuICovXHJcbmNsYXNzIEFuYWx5dGljc0Fib3J0U2lnbmFsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XHJcbiAgICB9XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcbiAgICBhYm9ydCgpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyKCkpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlSW5kZXhlZERCKCkge1xyXG4gICAgaWYgKCFpc0luZGV4ZWREQkF2YWlsYWJsZSgpKSB7XHJcbiAgICAgICAgbG9nZ2VyLndhcm4oRVJST1JfRkFDVE9SWS5jcmVhdGUoXCJpbmRleGVkZGItdW5hdmFpbGFibGVcIiAvKiBJTkRFWEVEREJfVU5BVkFJTEFCTEUgKi8sIHtcclxuICAgICAgICAgICAgZXJyb3JJbmZvOiAnSW5kZXhlZERCIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhpcyBlbnZpcm9ubWVudC4nXHJcbiAgICAgICAgfSkubWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdmFsaWRhdGVJbmRleGVkREJPcGVuYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBsb2dnZXIud2FybihFUlJPUl9GQUNUT1JZLmNyZWF0ZShcImluZGV4ZWRkYi11bmF2YWlsYWJsZVwiIC8qIElOREVYRUREQl9VTkFWQUlMQUJMRSAqLywge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JJbmZvOiBlXHJcbiAgICAgICAgICAgIH0pLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIGFuYWx5dGljcyBpbnN0YW5jZSBpbiBndGFnLmpzIGJ5IGNhbGxpbmcgY29uZmlnIGNvbW1hbmQgd2l0aCBmaWQuXHJcbiAqXHJcbiAqIE5PVEU6IFdlIGNvbWJpbmUgYW5hbHl0aWNzIGluaXRpYWxpemF0aW9uIGFuZCBzZXR0aW5nIGZpZCB0b2dldGhlciBiZWNhdXNlIHdlIHdhbnQgZmlkIHRvIGJlXHJcbiAqIHBhcnQgb2YgdGhlIGBwYWdlX3ZpZXdgIGV2ZW50IHRoYXQncyBzZW50IGR1cmluZyB0aGUgaW5pdGlhbGl6YXRpb25cclxuICogQHBhcmFtIGFwcCBGaXJlYmFzZSBhcHBcclxuICogQHBhcmFtIGd0YWdDb3JlIFRoZSBndGFnIGZ1bmN0aW9uIHRoYXQncyBub3Qgd3JhcHBlZC5cclxuICogQHBhcmFtIGR5bmFtaWNDb25maWdQcm9taXNlc0xpc3QgQXJyYXkgb2YgYWxsIGR5bmFtaWMgY29uZmlnIHByb21pc2VzLlxyXG4gKiBAcGFyYW0gbWVhc3VyZW1lbnRJZFRvQXBwSWQgTWFwcyBtZWFzdXJlbWVudElEIHRvIGFwcElELlxyXG4gKiBAcGFyYW0gaW5zdGFsbGF0aW9ucyBfRmlyZWJhc2VJbnN0YWxsYXRpb25zSW50ZXJuYWwgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEByZXR1cm5zIE1lYXN1cmVtZW50IElELlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gX2luaXRpYWxpemVBbmFseXRpY3MoYXBwLCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0LCBtZWFzdXJlbWVudElkVG9BcHBJZCwgaW5zdGFsbGF0aW9ucywgZ3RhZ0NvcmUsIGRhdGFMYXllck5hbWUsIG9wdGlvbnMpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IGR5bmFtaWNDb25maWdQcm9taXNlID0gZmV0Y2hEeW5hbWljQ29uZmlnV2l0aFJldHJ5KGFwcCk7XHJcbiAgICAvLyBPbmNlIGZldGNoZWQsIG1hcCBtZWFzdXJlbWVudElkcyB0byBhcHBJZCwgZm9yIGVhc2Ugb2YgbG9va3VwIGluIHdyYXBwZWQgZ3RhZyBmdW5jdGlvbi5cclxuICAgIGR5bmFtaWNDb25maWdQcm9taXNlXHJcbiAgICAgICAgLnRoZW4oY29uZmlnID0+IHtcclxuICAgICAgICBtZWFzdXJlbWVudElkVG9BcHBJZFtjb25maWcubWVhc3VyZW1lbnRJZF0gPSBjb25maWcuYXBwSWQ7XHJcbiAgICAgICAgaWYgKGFwcC5vcHRpb25zLm1lYXN1cmVtZW50SWQgJiZcclxuICAgICAgICAgICAgY29uZmlnLm1lYXN1cmVtZW50SWQgIT09IGFwcC5vcHRpb25zLm1lYXN1cmVtZW50SWQpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLndhcm4oYFRoZSBtZWFzdXJlbWVudCBJRCBpbiB0aGUgbG9jYWwgRmlyZWJhc2UgY29uZmlnICgke2FwcC5vcHRpb25zLm1lYXN1cmVtZW50SWR9KWAgK1xyXG4gICAgICAgICAgICAgICAgYCBkb2VzIG5vdCBtYXRjaCB0aGUgbWVhc3VyZW1lbnQgSUQgZmV0Y2hlZCBmcm9tIHRoZSBzZXJ2ZXIgKCR7Y29uZmlnLm1lYXN1cmVtZW50SWR9KS5gICtcclxuICAgICAgICAgICAgICAgIGAgVG8gZW5zdXJlIGFuYWx5dGljcyBldmVudHMgYXJlIGFsd2F5cyBzZW50IHRvIHRoZSBjb3JyZWN0IEFuYWx5dGljcyBwcm9wZXJ0eSxgICtcclxuICAgICAgICAgICAgICAgIGAgdXBkYXRlIHRoZWAgK1xyXG4gICAgICAgICAgICAgICAgYCBtZWFzdXJlbWVudCBJRCBmaWVsZCBpbiB0aGUgbG9jYWwgY29uZmlnIG9yIHJlbW92ZSBpdCBmcm9tIHRoZSBsb2NhbCBjb25maWcuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgICAgICAuY2F0Y2goZSA9PiBsb2dnZXIuZXJyb3IoZSkpO1xyXG4gICAgLy8gQWRkIHRvIGxpc3QgdG8gdHJhY2sgc3RhdGUgb2YgYWxsIGR5bmFtaWMgY29uZmlnIHByb21pc2VzLlxyXG4gICAgZHluYW1pY0NvbmZpZ1Byb21pc2VzTGlzdC5wdXNoKGR5bmFtaWNDb25maWdQcm9taXNlKTtcclxuICAgIGNvbnN0IGZpZFByb21pc2UgPSB2YWxpZGF0ZUluZGV4ZWREQigpLnRoZW4oZW52SXNWYWxpZCA9PiB7XHJcbiAgICAgICAgaWYgKGVudklzVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbGxhdGlvbnMuZ2V0SWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBbZHluYW1pY0NvbmZpZywgZmlkXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgICBkeW5hbWljQ29uZmlnUHJvbWlzZSxcclxuICAgICAgICBmaWRQcm9taXNlXHJcbiAgICBdKTtcclxuICAgIC8vIERldGVjdCBpZiB1c2VyIGhhcyBhbHJlYWR5IHB1dCB0aGUgZ3RhZyA8c2NyaXB0PiB0YWcgb24gdGhpcyBwYWdlLlxyXG4gICAgaWYgKCFmaW5kR3RhZ1NjcmlwdE9uUGFnZSgpKSB7XHJcbiAgICAgICAgaW5zZXJ0U2NyaXB0VGFnKGRhdGFMYXllck5hbWUsIGR5bmFtaWNDb25maWcubWVhc3VyZW1lbnRJZCk7XHJcbiAgICB9XHJcbiAgICAvLyBUaGlzIGNvbW1hbmQgaW5pdGlhbGl6ZXMgZ3RhZy5qcyBhbmQgb25seSBuZWVkcyB0byBiZSBjYWxsZWQgb25jZSBmb3IgdGhlIGVudGlyZSB3ZWIgYXBwLFxyXG4gICAgLy8gYnV0IHNpbmNlIGl0IGlzIGlkZW1wb3RlbnQsIHdlIGNhbiBjYWxsIGl0IG11bHRpcGxlIHRpbWVzLlxyXG4gICAgLy8gV2Uga2VlcCBpdCB0b2dldGhlciB3aXRoIG90aGVyIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBiZXR0ZXIgY29kZSBzdHJ1Y3R1cmUuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgZ3RhZ0NvcmUoJ2pzJywgbmV3IERhdGUoKSk7XHJcbiAgICAvLyBVc2VyIGNvbmZpZyBhZGRlZCBmaXJzdC4gV2UgZG9uJ3Qgd2FudCB1c2VycyB0byBhY2NpZGVudGFsbHkgb3ZlcndyaXRlXHJcbiAgICAvLyBiYXNlIEZpcmViYXNlIGNvbmZpZyBwcm9wZXJ0aWVzLlxyXG4gICAgY29uc3QgY29uZmlnUHJvcGVydGllcyA9IChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jb25maWcpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9O1xyXG4gICAgLy8gZ3VhcmQgYWdhaW5zdCBkZXZlbG9wZXJzIGFjY2lkZW50YWxseSBzZXR0aW5nIHByb3BlcnRpZXMgd2l0aCBwcmVmaXggYGZpcmViYXNlX2BcclxuICAgIGNvbmZpZ1Byb3BlcnRpZXNbT1JJR0lOX0tFWV0gPSAnZmlyZWJhc2UnO1xyXG4gICAgY29uZmlnUHJvcGVydGllcy51cGRhdGUgPSB0cnVlO1xyXG4gICAgaWYgKGZpZCAhPSBudWxsKSB7XHJcbiAgICAgICAgY29uZmlnUHJvcGVydGllc1tHQV9GSURfS0VZXSA9IGZpZDtcclxuICAgIH1cclxuICAgIC8vIEl0IHNob3VsZCBiZSB0aGUgZmlyc3QgY29uZmlnIGNvbW1hbmQgY2FsbGVkIG9uIHRoaXMgR0EtSURcclxuICAgIC8vIEluaXRpYWxpemUgdGhpcyBHQS1JRCBhbmQgc2V0IEZJRCBvbiBpdCB1c2luZyB0aGUgZ3RhZyBjb25maWcgQVBJLlxyXG4gICAgLy8gTm90ZTogVGhpcyB3aWxsIHRyaWdnZXIgYSBwYWdlX3ZpZXcgZXZlbnQgdW5sZXNzICdzZW5kX3BhZ2VfdmlldycgaXMgc2V0IHRvIGZhbHNlIGluXHJcbiAgICAvLyBgY29uZmlnUHJvcGVydGllc2AuXHJcbiAgICBndGFnQ29yZShcImNvbmZpZ1wiIC8qIENPTkZJRyAqLywgZHluYW1pY0NvbmZpZy5tZWFzdXJlbWVudElkLCBjb25maWdQcm9wZXJ0aWVzKTtcclxuICAgIHJldHVybiBkeW5hbWljQ29uZmlnLm1lYXN1cmVtZW50SWQ7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIEFuYWx5dGljcyBTZXJ2aWNlIGNsYXNzLlxyXG4gKi9cclxuY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHApIHtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgIH1cclxuICAgIF9kZWxldGUoKSB7XHJcbiAgICAgICAgZGVsZXRlIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbdGhpcy5hcHAub3B0aW9ucy5hcHBJZF07XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBNYXBzIGFwcElkIHRvIGZ1bGwgaW5pdGlhbGl6YXRpb24gcHJvbWlzZS4gV3JhcHBlZCBndGFnIGNhbGxzIG11c3Qgd2FpdCBvblxyXG4gKiBhbGwgb3Igc29tZSBvZiB0aGVzZSwgZGVwZW5kaW5nIG9uIHRoZSBjYWxsJ3MgYHNlbmRfdG9gIHBhcmFtIGFuZCB0aGUgc3RhdHVzXHJcbiAqIG9mIHRoZSBkeW5hbWljIGNvbmZpZyBmZXRjaGVzIChzZWUgYmVsb3cpLlxyXG4gKi9cclxubGV0IGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXAgPSB7fTtcclxuLyoqXHJcbiAqIExpc3Qgb2YgZHluYW1pYyBjb25maWcgZmV0Y2ggcHJvbWlzZXMuIEluIGNlcnRhaW4gY2FzZXMsIHdyYXBwZWQgZ3RhZyBjYWxsc1xyXG4gKiB3YWl0IG9uIGFsbCB0aGVzZSB0byBiZSBjb21wbGV0ZSBpbiBvcmRlciB0byBkZXRlcm1pbmUgaWYgaXQgY2FuIHNlbGVjdGl2ZWx5XHJcbiAqIHdhaXQgZm9yIG9ubHkgY2VydGFpbiBpbml0aWFsaXphdGlvbiAoRklEKSBwcm9taXNlcyBvciBpZiBpdCBtdXN0IHdhaXQgZm9yIGFsbC5cclxuICovXHJcbmxldCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0ID0gW107XHJcbi8qKlxyXG4gKiBNYXBzIGZldGNoZWQgbWVhc3VyZW1lbnRJZHMgdG8gYXBwSWQuIFBvcHVsYXRlZCB3aGVuIHRoZSBhcHAncyBkeW5hbWljIGNvbmZpZ1xyXG4gKiBmZXRjaCBjb21wbGV0ZXMuIElmIGFscmVhZHkgcG9wdWxhdGVkLCBndGFnIGNvbmZpZyBjYWxscyBjYW4gdXNlIHRoaXMgdG9cclxuICogc2VsZWN0aXZlbHkgd2FpdCBmb3Igb25seSB0aGlzIGFwcCdzIGluaXRpYWxpemF0aW9uIHByb21pc2UgKEZJRCkgaW5zdGVhZCBvZiBhbGxcclxuICogaW5pdGlhbGl6YXRpb24gcHJvbWlzZXMuXHJcbiAqL1xyXG5jb25zdCBtZWFzdXJlbWVudElkVG9BcHBJZCA9IHt9O1xyXG4vKipcclxuICogTmFtZSBmb3Igd2luZG93IGdsb2JhbCBkYXRhIGxheWVyIGFycmF5IHVzZWQgYnkgR0E6IGRlZmF1bHRzIHRvICdkYXRhTGF5ZXInLlxyXG4gKi9cclxubGV0IGRhdGFMYXllck5hbWUgPSAnZGF0YUxheWVyJztcclxuLyoqXHJcbiAqIE5hbWUgZm9yIHdpbmRvdyBnbG9iYWwgZ3RhZyBmdW5jdGlvbiB1c2VkIGJ5IEdBOiBkZWZhdWx0cyB0byAnZ3RhZycuXHJcbiAqL1xyXG5sZXQgZ3RhZ05hbWUgPSAnZ3RhZyc7XHJcbi8qKlxyXG4gKiBSZXByb2R1Y3Rpb24gb2Ygc3RhbmRhcmQgZ3RhZyBmdW5jdGlvbiBvciByZWZlcmVuY2UgdG8gZXhpc3RpbmdcclxuICogZ3RhZyBmdW5jdGlvbiBvbiB3aW5kb3cgb2JqZWN0LlxyXG4gKi9cclxubGV0IGd0YWdDb3JlRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBXcmFwcGVyIGFyb3VuZCBndGFnIGZ1bmN0aW9uIHRoYXQgZW5zdXJlcyBGSUQgaXMgc2VudCB3aXRoIGFsbFxyXG4gKiByZWxldmFudCBldmVudCBhbmQgY29uZmlnIGNhbGxzLlxyXG4gKi9cclxubGV0IHdyYXBwZWRHdGFnRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBGbGFnIHRvIGVuc3VyZSBwYWdlIGluaXRpYWxpemF0aW9uIHN0ZXBzIChjcmVhdGlvbiBvciB3cmFwcGluZyBvZlxyXG4gKiBkYXRhTGF5ZXIgYW5kIGd0YWcgc2NyaXB0KSBhcmUgb25seSBydW4gb25jZSBwZXIgcGFnZSBsb2FkLlxyXG4gKi9cclxubGV0IGdsb2JhbEluaXREb25lID0gZmFsc2U7XHJcbi8qKlxyXG4gKiBDb25maWd1cmVzIEZpcmViYXNlIEFuYWx5dGljcyB0byB1c2UgY3VzdG9tIGBndGFnYCBvciBgZGF0YUxheWVyYCBuYW1lcy5cclxuICogSW50ZW5kZWQgdG8gYmUgdXNlZCBpZiBgZ3RhZy5qc2Agc2NyaXB0IGhhcyBiZWVuIGluc3RhbGxlZCBvblxyXG4gKiB0aGlzIHBhZ2UgaW5kZXBlbmRlbnRseSBvZiBGaXJlYmFzZSBBbmFseXRpY3MsIGFuZCBpcyB1c2luZyBub24tZGVmYXVsdFxyXG4gKiBuYW1lcyBmb3IgZWl0aGVyIHRoZSBgZ3RhZ2AgZnVuY3Rpb24gb3IgZm9yIGBkYXRhTGF5ZXJgLlxyXG4gKiBNdXN0IGJlIGNhbGxlZCBiZWZvcmUgY2FsbGluZyBgZ2V0QW5hbHl0aWNzKClgIG9yIGl0IHdvbid0XHJcbiAqIGhhdmUgYW55IGVmZmVjdC5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEN1c3RvbSBndGFnIGFuZCBkYXRhTGF5ZXIgbmFtZXMuXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXR0aW5ncyhvcHRpb25zKSB7XHJcbiAgICBpZiAoZ2xvYmFsSW5pdERvbmUpIHtcclxuICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcImFscmVhZHktaW5pdGlhbGl6ZWRcIiAvKiBBTFJFQURZX0lOSVRJQUxJWkVEICovKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmRhdGFMYXllck5hbWUpIHtcclxuICAgICAgICBkYXRhTGF5ZXJOYW1lID0gb3B0aW9ucy5kYXRhTGF5ZXJOYW1lO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMuZ3RhZ05hbWUpIHtcclxuICAgICAgICBndGFnTmFtZSA9IG9wdGlvbnMuZ3RhZ05hbWU7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBubyBlbnZpcm9ubWVudCBtaXNtYXRjaCBpcyBmb3VuZC5cclxuICogSWYgZW52aXJvbm1lbnQgbWlzbWF0Y2hlcyBhcmUgZm91bmQsIHRocm93cyBhbiBJTlZBTElEX0FOQUxZVElDU19DT05URVhUXHJcbiAqIGVycm9yIHRoYXQgYWxzbyBsaXN0cyBkZXRhaWxzIGZvciBlYWNoIG1pc21hdGNoIGZvdW5kLlxyXG4gKi9cclxuZnVuY3Rpb24gd2Fybk9uQnJvd3NlckNvbnRleHRNaXNtYXRjaCgpIHtcclxuICAgIGNvbnN0IG1pc21hdGNoZWRFbnZNZXNzYWdlcyA9IFtdO1xyXG4gICAgaWYgKGlzQnJvd3NlckV4dGVuc2lvbigpKSB7XHJcbiAgICAgICAgbWlzbWF0Y2hlZEVudk1lc3NhZ2VzLnB1c2goJ1RoaXMgaXMgYSBicm93c2VyIGV4dGVuc2lvbiBlbnZpcm9ubWVudC4nKTtcclxuICAgIH1cclxuICAgIGlmICghYXJlQ29va2llc0VuYWJsZWQoKSkge1xyXG4gICAgICAgIG1pc21hdGNoZWRFbnZNZXNzYWdlcy5wdXNoKCdDb29raWVzIGFyZSBub3QgYXZhaWxhYmxlLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKG1pc21hdGNoZWRFbnZNZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IG1pc21hdGNoZWRFbnZNZXNzYWdlc1xyXG4gICAgICAgICAgICAubWFwKChtZXNzYWdlLCBpbmRleCkgPT4gYCgke2luZGV4ICsgMX0pICR7bWVzc2FnZX1gKVxyXG4gICAgICAgICAgICAuam9pbignICcpO1xyXG4gICAgICAgIGNvbnN0IGVyciA9IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiaW52YWxpZC1hbmFseXRpY3MtY29udGV4dFwiIC8qIElOVkFMSURfQU5BTFlUSUNTX0NPTlRFWFQgKi8sIHtcclxuICAgICAgICAgICAgZXJyb3JJbmZvOiBkZXRhaWxzXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbG9nZ2VyLndhcm4oZXJyLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBBbmFseXRpY3MgaW5zdGFuY2UgZmFjdG9yeS5cclxuICogQGludGVybmFsXHJcbiAqL1xyXG5mdW5jdGlvbiBmYWN0b3J5KGFwcCwgaW5zdGFsbGF0aW9ucywgb3B0aW9ucykge1xyXG4gICAgd2Fybk9uQnJvd3NlckNvbnRleHRNaXNtYXRjaCgpO1xyXG4gICAgY29uc3QgYXBwSWQgPSBhcHAub3B0aW9ucy5hcHBJZDtcclxuICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcIm5vLWFwcC1pZFwiIC8qIE5PX0FQUF9JRCAqLyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWFwcC5vcHRpb25zLmFwaUtleSkge1xyXG4gICAgICAgIGlmIChhcHAub3B0aW9ucy5tZWFzdXJlbWVudElkKSB7XHJcbiAgICAgICAgICAgIGxvZ2dlci53YXJuKGBUaGUgXCJhcGlLZXlcIiBmaWVsZCBpcyBlbXB0eSBpbiB0aGUgbG9jYWwgRmlyZWJhc2UgY29uZmlnLiBUaGlzIGlzIG5lZWRlZCB0byBmZXRjaCB0aGUgbGF0ZXN0YCArXHJcbiAgICAgICAgICAgICAgICBgIG1lYXN1cmVtZW50IElEIGZvciB0aGlzIEZpcmViYXNlIGFwcC4gRmFsbGluZyBiYWNrIHRvIHRoZSBtZWFzdXJlbWVudCBJRCAke2FwcC5vcHRpb25zLm1lYXN1cmVtZW50SWR9YCArXHJcbiAgICAgICAgICAgICAgICBgIHByb3ZpZGVkIGluIHRoZSBcIm1lYXN1cmVtZW50SWRcIiBmaWVsZCBpbiB0aGUgbG9jYWwgRmlyZWJhc2UgY29uZmlnLmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgRVJST1JfRkFDVE9SWS5jcmVhdGUoXCJuby1hcGkta2V5XCIgLyogTk9fQVBJX0tFWSAqLyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbYXBwSWRdICE9IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcImFscmVhZHktZXhpc3RzXCIgLyogQUxSRUFEWV9FWElTVFMgKi8sIHtcclxuICAgICAgICAgICAgaWQ6IGFwcElkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWdsb2JhbEluaXREb25lKSB7XHJcbiAgICAgICAgLy8gU3RlcHMgaGVyZSBzaG91bGQgb25seSBiZSBkb25lIG9uY2UgcGVyIHBhZ2U6IGNyZWF0aW9uIG9yIHdyYXBwaW5nXHJcbiAgICAgICAgLy8gb2YgZGF0YUxheWVyIGFuZCBnbG9iYWwgZ3RhZyBmdW5jdGlvbi5cclxuICAgICAgICBnZXRPckNyZWF0ZURhdGFMYXllcihkYXRhTGF5ZXJOYW1lKTtcclxuICAgICAgICBjb25zdCB7IHdyYXBwZWRHdGFnLCBndGFnQ29yZSB9ID0gd3JhcE9yQ3JlYXRlR3RhZyhpbml0aWFsaXphdGlvblByb21pc2VzTWFwLCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0LCBtZWFzdXJlbWVudElkVG9BcHBJZCwgZGF0YUxheWVyTmFtZSwgZ3RhZ05hbWUpO1xyXG4gICAgICAgIHdyYXBwZWRHdGFnRnVuY3Rpb24gPSB3cmFwcGVkR3RhZztcclxuICAgICAgICBndGFnQ29yZUZ1bmN0aW9uID0gZ3RhZ0NvcmU7XHJcbiAgICAgICAgZ2xvYmFsSW5pdERvbmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8gQXN5bmMgYnV0IG5vbi1ibG9ja2luZy5cclxuICAgIC8vIFRoaXMgbWFwIHJlZmxlY3RzIHRoZSBjb21wbGV0aW9uIHN0YXRlIG9mIGFsbCBwcm9taXNlcyBmb3IgZWFjaCBhcHBJZC5cclxuICAgIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbYXBwSWRdID0gX2luaXRpYWxpemVBbmFseXRpY3MoYXBwLCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0LCBtZWFzdXJlbWVudElkVG9BcHBJZCwgaW5zdGFsbGF0aW9ucywgZ3RhZ0NvcmVGdW5jdGlvbiwgZGF0YUxheWVyTmFtZSwgb3B0aW9ucyk7XHJcbiAgICBjb25zdCBhbmFseXRpY3NJbnN0YW5jZSA9IG5ldyBBbmFseXRpY3NTZXJ2aWNlKGFwcCk7XHJcbiAgICByZXR1cm4gYW5hbHl0aWNzSW5zdGFuY2U7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIExvZ3MgYW4gYW5hbHl0aWNzIGV2ZW50IHRocm91Z2ggdGhlIEZpcmViYXNlIFNESy5cclxuICpcclxuICogQHBhcmFtIGd0YWdGdW5jdGlvbiBXcmFwcGVkIGd0YWcgZnVuY3Rpb24gdGhhdCB3YWl0cyBmb3IgZmlkIHRvIGJlIHNldCBiZWZvcmUgc2VuZGluZyBhbiBldmVudFxyXG4gKiBAcGFyYW0gZXZlbnROYW1lIEdvb2dsZSBBbmFseXRpY3MgZXZlbnQgbmFtZSwgY2hvb3NlIGZyb20gc3RhbmRhcmQgbGlzdCBvciB1c2UgYSBjdXN0b20gc3RyaW5nLlxyXG4gKiBAcGFyYW0gZXZlbnRQYXJhbXMgQW5hbHl0aWNzIGV2ZW50IHBhcmFtZXRlcnMuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBsb2dFdmVudCQxKGd0YWdGdW5jdGlvbiwgaW5pdGlhbGl6YXRpb25Qcm9taXNlLCBldmVudE5hbWUsIGV2ZW50UGFyYW1zLCBvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmdsb2JhbCkge1xyXG4gICAgICAgIGd0YWdGdW5jdGlvbihcImV2ZW50XCIgLyogRVZFTlQgKi8sIGV2ZW50TmFtZSwgZXZlbnRQYXJhbXMpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG1lYXN1cmVtZW50SWQgPSBhd2FpdCBpbml0aWFsaXphdGlvblByb21pc2U7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBldmVudFBhcmFtcyksIHsgJ3NlbmRfdG8nOiBtZWFzdXJlbWVudElkIH0pO1xyXG4gICAgICAgIGd0YWdGdW5jdGlvbihcImV2ZW50XCIgLyogRVZFTlQgKi8sIGV2ZW50TmFtZSwgcGFyYW1zKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogU2V0IHNjcmVlbl9uYW1lIHBhcmFtZXRlciBmb3IgdGhpcyBHb29nbGUgQW5hbHl0aWNzIElELlxyXG4gKlxyXG4gKiBAcGFyYW0gZ3RhZ0Z1bmN0aW9uIFdyYXBwZWQgZ3RhZyBmdW5jdGlvbiB0aGF0IHdhaXRzIGZvciBmaWQgdG8gYmUgc2V0IGJlZm9yZSBzZW5kaW5nIGFuIGV2ZW50XHJcbiAqIEBwYXJhbSBzY3JlZW5OYW1lIFNjcmVlbiBuYW1lIHN0cmluZyB0byBzZXQuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBzZXRDdXJyZW50U2NyZWVuJDEoZ3RhZ0Z1bmN0aW9uLCBpbml0aWFsaXphdGlvblByb21pc2UsIHNjcmVlbk5hbWUsIG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZ2xvYmFsKSB7XHJcbiAgICAgICAgZ3RhZ0Z1bmN0aW9uKFwic2V0XCIgLyogU0VUICovLCB7ICdzY3JlZW5fbmFtZSc6IHNjcmVlbk5hbWUgfSk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbWVhc3VyZW1lbnRJZCA9IGF3YWl0IGluaXRpYWxpemF0aW9uUHJvbWlzZTtcclxuICAgICAgICBndGFnRnVuY3Rpb24oXCJjb25maWdcIiAvKiBDT05GSUcgKi8sIG1lYXN1cmVtZW50SWQsIHtcclxuICAgICAgICAgICAgdXBkYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAnc2NyZWVuX25hbWUnOiBzY3JlZW5OYW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFNldCB1c2VyX2lkIHBhcmFtZXRlciBmb3IgdGhpcyBHb29nbGUgQW5hbHl0aWNzIElELlxyXG4gKlxyXG4gKiBAcGFyYW0gZ3RhZ0Z1bmN0aW9uIFdyYXBwZWQgZ3RhZyBmdW5jdGlvbiB0aGF0IHdhaXRzIGZvciBmaWQgdG8gYmUgc2V0IGJlZm9yZSBzZW5kaW5nIGFuIGV2ZW50XHJcbiAqIEBwYXJhbSBpZCBVc2VyIElEIHN0cmluZyB0byBzZXRcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHNldFVzZXJJZCQxKGd0YWdGdW5jdGlvbiwgaW5pdGlhbGl6YXRpb25Qcm9taXNlLCBpZCwgb3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5nbG9iYWwpIHtcclxuICAgICAgICBndGFnRnVuY3Rpb24oXCJzZXRcIiAvKiBTRVQgKi8sIHsgJ3VzZXJfaWQnOiBpZCB9KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBtZWFzdXJlbWVudElkID0gYXdhaXQgaW5pdGlhbGl6YXRpb25Qcm9taXNlO1xyXG4gICAgICAgIGd0YWdGdW5jdGlvbihcImNvbmZpZ1wiIC8qIENPTkZJRyAqLywgbWVhc3VyZW1lbnRJZCwge1xyXG4gICAgICAgICAgICB1cGRhdGU6IHRydWUsXHJcbiAgICAgICAgICAgICd1c2VyX2lkJzogaWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogU2V0IGFsbCBvdGhlciB1c2VyIHByb3BlcnRpZXMgb3RoZXIgdGhhbiB1c2VyX2lkIGFuZCBzY3JlZW5fbmFtZS5cclxuICpcclxuICogQHBhcmFtIGd0YWdGdW5jdGlvbiBXcmFwcGVkIGd0YWcgZnVuY3Rpb24gdGhhdCB3YWl0cyBmb3IgZmlkIHRvIGJlIHNldCBiZWZvcmUgc2VuZGluZyBhbiBldmVudFxyXG4gKiBAcGFyYW0gcHJvcGVydGllcyBNYXAgb2YgdXNlciBwcm9wZXJ0aWVzIHRvIHNldFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gc2V0VXNlclByb3BlcnRpZXMkMShndGFnRnVuY3Rpb24sIGluaXRpYWxpemF0aW9uUHJvbWlzZSwgcHJvcGVydGllcywgb3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5nbG9iYWwpIHtcclxuICAgICAgICBjb25zdCBmbGF0UHJvcGVydGllcyA9IHt9O1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHByb3BlcnRpZXMpKSB7XHJcbiAgICAgICAgICAgIC8vIHVzZSBkb3Qgbm90YXRpb24gZm9yIG1lcmdlIGJlaGF2aW9yIGluIGd0YWcuanNcclxuICAgICAgICAgICAgZmxhdFByb3BlcnRpZXNbYHVzZXJfcHJvcGVydGllcy4ke2tleX1gXSA9IHByb3BlcnRpZXNba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3RhZ0Z1bmN0aW9uKFwic2V0XCIgLyogU0VUICovLCBmbGF0UHJvcGVydGllcyk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbWVhc3VyZW1lbnRJZCA9IGF3YWl0IGluaXRpYWxpemF0aW9uUHJvbWlzZTtcclxuICAgICAgICBndGFnRnVuY3Rpb24oXCJjb25maWdcIiAvKiBDT05GSUcgKi8sIG1lYXN1cmVtZW50SWQsIHtcclxuICAgICAgICAgICAgdXBkYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAndXNlcl9wcm9wZXJ0aWVzJzogcHJvcGVydGllc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBTZXQgd2hldGhlciBjb2xsZWN0aW9uIGlzIGVuYWJsZWQgZm9yIHRoaXMgSUQuXHJcbiAqXHJcbiAqIEBwYXJhbSBlbmFibGVkIElmIHRydWUsIGNvbGxlY3Rpb24gaXMgZW5hYmxlZCBmb3IgdGhpcyBJRC5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHNldEFuYWx5dGljc0NvbGxlY3Rpb25FbmFibGVkJDEoaW5pdGlhbGl6YXRpb25Qcm9taXNlLCBlbmFibGVkKSB7XHJcbiAgICBjb25zdCBtZWFzdXJlbWVudElkID0gYXdhaXQgaW5pdGlhbGl6YXRpb25Qcm9taXNlO1xyXG4gICAgd2luZG93W2BnYS1kaXNhYmxlLSR7bWVhc3VyZW1lbnRJZH1gXSA9ICFlbmFibGVkO1xyXG59XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cclxuLyoqXHJcbiAqIFJldHVybnMgYW4ge0BsaW5rIEFuYWx5dGljc30gaW5zdGFuY2UgZm9yIHRoZSBnaXZlbiBhcHAuXHJcbiAqXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHBhcmFtIGFwcCAtIFRoZSB7QGxpbmsgQGZpcmViYXNlL2FwcCNGaXJlYmFzZUFwcH0gdG8gdXNlLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QW5hbHl0aWNzKGFwcCA9IGdldEFwcCgpKSB7XHJcbiAgICBhcHAgPSBnZXRNb2R1bGFySW5zdGFuY2UoYXBwKTtcclxuICAgIC8vIERlcGVuZGVuY2llc1xyXG4gICAgY29uc3QgYW5hbHl0aWNzUHJvdmlkZXIgPSBfZ2V0UHJvdmlkZXIoYXBwLCBBTkFMWVRJQ1NfVFlQRSk7XHJcbiAgICBpZiAoYW5hbHl0aWNzUHJvdmlkZXIuaXNJbml0aWFsaXplZCgpKSB7XHJcbiAgICAgICAgcmV0dXJuIGFuYWx5dGljc1Byb3ZpZGVyLmdldEltbWVkaWF0ZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluaXRpYWxpemVBbmFseXRpY3MoYXBwKTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhbiB7QGxpbmsgQW5hbHl0aWNzfSBpbnN0YW5jZSBmb3IgdGhlIGdpdmVuIGFwcC5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcGFyYW0gYXBwIC0gVGhlIHtAbGluayBAZmlyZWJhc2UvYXBwI0ZpcmViYXNlQXBwfSB0byB1c2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0aWFsaXplQW5hbHl0aWNzKGFwcCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAvLyBEZXBlbmRlbmNpZXNcclxuICAgIGNvbnN0IGFuYWx5dGljc1Byb3ZpZGVyID0gX2dldFByb3ZpZGVyKGFwcCwgQU5BTFlUSUNTX1RZUEUpO1xyXG4gICAgaWYgKGFuYWx5dGljc1Byb3ZpZGVyLmlzSW5pdGlhbGl6ZWQoKSkge1xyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSW5zdGFuY2UgPSBhbmFseXRpY3NQcm92aWRlci5nZXRJbW1lZGlhdGUoKTtcclxuICAgICAgICBpZiAoZGVlcEVxdWFsKG9wdGlvbnMsIGFuYWx5dGljc1Byb3ZpZGVyLmdldE9wdGlvbnMoKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nSW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcImFscmVhZHktaW5pdGlhbGl6ZWRcIiAvKiBBTFJFQURZX0lOSVRJQUxJWkVEICovKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBhbmFseXRpY3NJbnN0YW5jZSA9IGFuYWx5dGljc1Byb3ZpZGVyLmluaXRpYWxpemUoeyBvcHRpb25zIH0pO1xyXG4gICAgcmV0dXJuIGFuYWx5dGljc0luc3RhbmNlO1xyXG59XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgcHVibGljIHN0YXRpYyBtZXRob2QgcHJvdmlkZWQgdG8gdXNlcnMgdGhhdCB3cmFwcyBmb3VyIGRpZmZlcmVudCBjaGVja3M6XHJcbiAqXHJcbiAqIDEuIENoZWNrIGlmIGl0J3Mgbm90IGEgYnJvd3NlciBleHRlbnNpb24gZW52aXJvbm1lbnQuXHJcbiAqIDIuIENoZWNrIGlmIGNvb2tpZXMgYXJlIGVuYWJsZWQgaW4gY3VycmVudCBicm93c2VyLlxyXG4gKiAzLiBDaGVjayBpZiBJbmRleGVkREIgaXMgc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyIGVudmlyb25tZW50LlxyXG4gKiA0LiBDaGVjayBpZiB0aGUgY3VycmVudCBicm93c2VyIGNvbnRleHQgaXMgdmFsaWQgZm9yIHVzaW5nIGBJbmRleGVkREIub3BlbigpYC5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XHJcbiAgICBpZiAoaXNCcm93c2VyRXh0ZW5zaW9uKCkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIWFyZUNvb2tpZXNFbmFibGVkKCkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzSW5kZXhlZERCQXZhaWxhYmxlKCkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGlzREJPcGVuYWJsZSA9IGF3YWl0IHZhbGlkYXRlSW5kZXhlZERCT3BlbmFibGUoKTtcclxuICAgICAgICByZXR1cm4gaXNEQk9wZW5hYmxlO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBVc2UgZ3RhZyBgY29uZmlnYCBjb21tYW5kIHRvIHNldCBgc2NyZWVuX25hbWVgLlxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEBwYXJhbSBhbmFseXRpY3NJbnN0YW5jZSAtIFRoZSB7QGxpbmsgQW5hbHl0aWNzfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIHNjcmVlbk5hbWUgLSBTY3JlZW4gbmFtZSB0byBzZXQuXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRDdXJyZW50U2NyZWVuKGFuYWx5dGljc0luc3RhbmNlLCBzY3JlZW5OYW1lLCBvcHRpb25zKSB7XHJcbiAgICBhbmFseXRpY3NJbnN0YW5jZSA9IGdldE1vZHVsYXJJbnN0YW5jZShhbmFseXRpY3NJbnN0YW5jZSk7XHJcbiAgICBzZXRDdXJyZW50U2NyZWVuJDEod3JhcHBlZEd0YWdGdW5jdGlvbiwgaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcFthbmFseXRpY3NJbnN0YW5jZS5hcHAub3B0aW9ucy5hcHBJZF0sIHNjcmVlbk5hbWUsIG9wdGlvbnMpLmNhdGNoKGUgPT4gbG9nZ2VyLmVycm9yKGUpKTtcclxufVxyXG4vKipcclxuICogVXNlIGd0YWcgYGNvbmZpZ2AgY29tbWFuZCB0byBzZXQgYHVzZXJfaWRgLlxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEBwYXJhbSBhbmFseXRpY3NJbnN0YW5jZSAtIFRoZSB7QGxpbmsgQW5hbHl0aWNzfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIGlkIC0gVXNlciBJRCB0byBzZXQuXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRVc2VySWQoYW5hbHl0aWNzSW5zdGFuY2UsIGlkLCBvcHRpb25zKSB7XHJcbiAgICBhbmFseXRpY3NJbnN0YW5jZSA9IGdldE1vZHVsYXJJbnN0YW5jZShhbmFseXRpY3NJbnN0YW5jZSk7XHJcbiAgICBzZXRVc2VySWQkMSh3cmFwcGVkR3RhZ0Z1bmN0aW9uLCBpbml0aWFsaXphdGlvblByb21pc2VzTWFwW2FuYWx5dGljc0luc3RhbmNlLmFwcC5vcHRpb25zLmFwcElkXSwgaWQsIG9wdGlvbnMpLmNhdGNoKGUgPT4gbG9nZ2VyLmVycm9yKGUpKTtcclxufVxyXG4vKipcclxuICogVXNlIGd0YWcgYGNvbmZpZ2AgY29tbWFuZCB0byBzZXQgYWxsIHBhcmFtcyBzcGVjaWZpZWQuXHJcbiAqXHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmZ1bmN0aW9uIHNldFVzZXJQcm9wZXJ0aWVzKGFuYWx5dGljc0luc3RhbmNlLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XHJcbiAgICBhbmFseXRpY3NJbnN0YW5jZSA9IGdldE1vZHVsYXJJbnN0YW5jZShhbmFseXRpY3NJbnN0YW5jZSk7XHJcbiAgICBzZXRVc2VyUHJvcGVydGllcyQxKHdyYXBwZWRHdGFnRnVuY3Rpb24sIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbYW5hbHl0aWNzSW5zdGFuY2UuYXBwLm9wdGlvbnMuYXBwSWRdLCBwcm9wZXJ0aWVzLCBvcHRpb25zKS5jYXRjaChlID0+IGxvZ2dlci5lcnJvcihlKSk7XHJcbn1cclxuLyoqXHJcbiAqIFNldHMgd2hldGhlciBHb29nbGUgQW5hbHl0aWNzIGNvbGxlY3Rpb24gaXMgZW5hYmxlZCBmb3IgdGhpcyBhcHAgb24gdGhpcyBkZXZpY2UuXHJcbiAqIFNldHMgZ2xvYmFsIGB3aW5kb3dbJ2dhLWRpc2FibGUtYW5hbHl0aWNzSWQnXSA9IHRydWU7YFxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEBwYXJhbSBhbmFseXRpY3NJbnN0YW5jZSAtIFRoZSB7QGxpbmsgQW5hbHl0aWNzfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIGVuYWJsZWQgLSBJZiB0cnVlLCBlbmFibGVzIGNvbGxlY3Rpb24sIGlmIGZhbHNlLCBkaXNhYmxlcyBpdC5cclxuICovXHJcbmZ1bmN0aW9uIHNldEFuYWx5dGljc0NvbGxlY3Rpb25FbmFibGVkKGFuYWx5dGljc0luc3RhbmNlLCBlbmFibGVkKSB7XHJcbiAgICBhbmFseXRpY3NJbnN0YW5jZSA9IGdldE1vZHVsYXJJbnN0YW5jZShhbmFseXRpY3NJbnN0YW5jZSk7XHJcbiAgICBzZXRBbmFseXRpY3NDb2xsZWN0aW9uRW5hYmxlZCQxKGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbYW5hbHl0aWNzSW5zdGFuY2UuYXBwLm9wdGlvbnMuYXBwSWRdLCBlbmFibGVkKS5jYXRjaChlID0+IGxvZ2dlci5lcnJvcihlKSk7XHJcbn1cclxuLyoqXHJcbiAqIFNlbmRzIGEgR29vZ2xlIEFuYWx5dGljcyBldmVudCB3aXRoIGdpdmVuIGBldmVudFBhcmFtc2AuIFRoaXMgbWV0aG9kXHJcbiAqIGF1dG9tYXRpY2FsbHkgYXNzb2NpYXRlcyB0aGlzIGxvZ2dlZCBldmVudCB3aXRoIHRoaXMgRmlyZWJhc2Ugd2ViXHJcbiAqIGFwcCBpbnN0YW5jZSBvbiB0aGlzIGRldmljZS5cclxuICogTGlzdCBvZiBvZmZpY2lhbCBldmVudCBwYXJhbWV0ZXJzIGNhbiBiZSBmb3VuZCBpbiB0aGUgZ3RhZy5qc1xyXG4gKiByZWZlcmVuY2UgZG9jdW1lbnRhdGlvbjpcclxuICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2d0YWdqcy9yZWZlcmVuY2UvZ2E0LWV2ZW50c1xyXG4gKiB8IHRoZSBHQTQgcmVmZXJlbmNlIGRvY3VtZW50YXRpb259LlxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2dFdmVudChhbmFseXRpY3NJbnN0YW5jZSwgZXZlbnROYW1lLCBldmVudFBhcmFtcywgb3B0aW9ucykge1xyXG4gICAgYW5hbHl0aWNzSW5zdGFuY2UgPSBnZXRNb2R1bGFySW5zdGFuY2UoYW5hbHl0aWNzSW5zdGFuY2UpO1xyXG4gICAgbG9nRXZlbnQkMSh3cmFwcGVkR3RhZ0Z1bmN0aW9uLCBpbml0aWFsaXphdGlvblByb21pc2VzTWFwW2FuYWx5dGljc0luc3RhbmNlLmFwcC5vcHRpb25zLmFwcElkXSwgZXZlbnROYW1lLCBldmVudFBhcmFtcywgb3B0aW9ucykuY2F0Y2goZSA9PiBsb2dnZXIuZXJyb3IoZSkpO1xyXG59XG5cbmNvbnN0IG5hbWUgPSBcIkBmaXJlYmFzZS9hbmFseXRpY3NcIjtcbmNvbnN0IHZlcnNpb24gPSBcIjAuNy41XCI7XG5cbi8qKlxyXG4gKiBGaXJlYmFzZSBBbmFseXRpY3NcclxuICpcclxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiByZWdpc3RlckFuYWx5dGljcygpIHtcclxuICAgIF9yZWdpc3RlckNvbXBvbmVudChuZXcgQ29tcG9uZW50KEFOQUxZVElDU19UWVBFLCAoY29udGFpbmVyLCB7IG9wdGlvbnM6IGFuYWx5dGljc09wdGlvbnMgfSkgPT4ge1xyXG4gICAgICAgIC8vIGdldEltbWVkaWF0ZSBmb3IgRmlyZWJhc2VBcHAgd2lsbCBhbHdheXMgc3VjY2VlZFxyXG4gICAgICAgIGNvbnN0IGFwcCA9IGNvbnRhaW5lci5nZXRQcm92aWRlcignYXBwJykuZ2V0SW1tZWRpYXRlKCk7XHJcbiAgICAgICAgY29uc3QgaW5zdGFsbGF0aW9ucyA9IGNvbnRhaW5lclxyXG4gICAgICAgICAgICAuZ2V0UHJvdmlkZXIoJ2luc3RhbGxhdGlvbnMtaW50ZXJuYWwnKVxyXG4gICAgICAgICAgICAuZ2V0SW1tZWRpYXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhY3RvcnkoYXBwLCBpbnN0YWxsYXRpb25zLCBhbmFseXRpY3NPcHRpb25zKTtcclxuICAgIH0sIFwiUFVCTElDXCIgLyogUFVCTElDICovKSk7XHJcbiAgICBfcmVnaXN0ZXJDb21wb25lbnQobmV3IENvbXBvbmVudCgnYW5hbHl0aWNzLWludGVybmFsJywgaW50ZXJuYWxGYWN0b3J5LCBcIlBSSVZBVEVcIiAvKiBQUklWQVRFICovKSk7XHJcbiAgICByZWdpc3RlclZlcnNpb24obmFtZSwgdmVyc2lvbik7XHJcbiAgICAvLyBCVUlMRF9UQVJHRVQgd2lsbCBiZSByZXBsYWNlZCBieSB2YWx1ZXMgbGlrZSBlc201LCBlc20yMDE3LCBjanM1LCBldGMgZHVyaW5nIHRoZSBjb21waWxhdGlvblxyXG4gICAgcmVnaXN0ZXJWZXJzaW9uKG5hbWUsIHZlcnNpb24sICdlc20yMDE3Jyk7XHJcbiAgICBmdW5jdGlvbiBpbnRlcm5hbEZhY3RvcnkoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgYW5hbHl0aWNzID0gY29udGFpbmVyLmdldFByb3ZpZGVyKEFOQUxZVElDU19UWVBFKS5nZXRJbW1lZGlhdGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGxvZ0V2ZW50OiAoZXZlbnROYW1lLCBldmVudFBhcmFtcywgb3B0aW9ucykgPT4gbG9nRXZlbnQoYW5hbHl0aWNzLCBldmVudE5hbWUsIGV2ZW50UGFyYW1zLCBvcHRpb25zKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcImludGVyb3AtY29tcG9uZW50LXJlZy1mYWlsZWRcIiAvKiBJTlRFUk9QX0NPTVBPTkVOVF9SRUdfRkFJTEVEICovLCB7XHJcbiAgICAgICAgICAgICAgICByZWFzb246IGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbnJlZ2lzdGVyQW5hbHl0aWNzKCk7XG5cbmV4cG9ydCB7IGdldEFuYWx5dGljcywgaW5pdGlhbGl6ZUFuYWx5dGljcywgaXNTdXBwb3J0ZWQsIGxvZ0V2ZW50LCBzZXRBbmFseXRpY3NDb2xsZWN0aW9uRW5hYmxlZCwgc2V0Q3VycmVudFNjcmVlbiwgc2V0VXNlcklkLCBzZXRVc2VyUHJvcGVydGllcywgc2V0dGluZ3MgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzbTIwMTcuanMubWFwXG4iLCJpbXBvcnQgeyBnZXRBcHAsIF9nZXRQcm92aWRlciwgX3JlZ2lzdGVyQ29tcG9uZW50LCByZWdpc3RlclZlcnNpb24gfSBmcm9tICdAZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0BmaXJlYmFzZS9jb21wb25lbnQnO1xuaW1wb3J0IHsgRXJyb3JGYWN0b3J5LCBGaXJlYmFzZUVycm9yIH0gZnJvbSAnQGZpcmViYXNlL3V0aWwnO1xuaW1wb3J0IHsgb3BlbkRiIH0gZnJvbSAnaWRiJztcblxuY29uc3QgbmFtZSA9IFwiQGZpcmViYXNlL2luc3RhbGxhdGlvbnNcIjtcbmNvbnN0IHZlcnNpb24gPSBcIjAuNS41XCI7XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmNvbnN0IFBFTkRJTkdfVElNRU9VVF9NUyA9IDEwMDAwO1xyXG5jb25zdCBQQUNLQUdFX1ZFUlNJT04gPSBgdzoke3ZlcnNpb259YDtcclxuY29uc3QgSU5URVJOQUxfQVVUSF9WRVJTSU9OID0gJ0ZJU192Mic7XHJcbmNvbnN0IElOU1RBTExBVElPTlNfQVBJX1VSTCA9ICdodHRwczovL2ZpcmViYXNlaW5zdGFsbGF0aW9ucy5nb29nbGVhcGlzLmNvbS92MSc7XHJcbmNvbnN0IFRPS0VOX0VYUElSQVRJT05fQlVGRkVSID0gNjAgKiA2MCAqIDEwMDA7IC8vIE9uZSBob3VyXHJcbmNvbnN0IFNFUlZJQ0UgPSAnaW5zdGFsbGF0aW9ucyc7XHJcbmNvbnN0IFNFUlZJQ0VfTkFNRSA9ICdJbnN0YWxsYXRpb25zJztcblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuY29uc3QgRVJST1JfREVTQ1JJUFRJT05fTUFQID0ge1xyXG4gICAgW1wibWlzc2luZy1hcHAtY29uZmlnLXZhbHVlc1wiIC8qIE1JU1NJTkdfQVBQX0NPTkZJR19WQUxVRVMgKi9dOiAnTWlzc2luZyBBcHAgY29uZmlndXJhdGlvbiB2YWx1ZTogXCJ7JHZhbHVlTmFtZX1cIicsXHJcbiAgICBbXCJub3QtcmVnaXN0ZXJlZFwiIC8qIE5PVF9SRUdJU1RFUkVEICovXTogJ0ZpcmViYXNlIEluc3RhbGxhdGlvbiBpcyBub3QgcmVnaXN0ZXJlZC4nLFxyXG4gICAgW1wiaW5zdGFsbGF0aW9uLW5vdC1mb3VuZFwiIC8qIElOU1RBTExBVElPTl9OT1RfRk9VTkQgKi9dOiAnRmlyZWJhc2UgSW5zdGFsbGF0aW9uIG5vdCBmb3VuZC4nLFxyXG4gICAgW1wicmVxdWVzdC1mYWlsZWRcIiAvKiBSRVFVRVNUX0ZBSUxFRCAqL106ICd7JHJlcXVlc3ROYW1lfSByZXF1ZXN0IGZhaWxlZCB3aXRoIGVycm9yIFwieyRzZXJ2ZXJDb2RlfSB7JHNlcnZlclN0YXR1c306IHskc2VydmVyTWVzc2FnZX1cIicsXHJcbiAgICBbXCJhcHAtb2ZmbGluZVwiIC8qIEFQUF9PRkZMSU5FICovXTogJ0NvdWxkIG5vdCBwcm9jZXNzIHJlcXVlc3QuIEFwcGxpY2F0aW9uIG9mZmxpbmUuJyxcclxuICAgIFtcImRlbGV0ZS1wZW5kaW5nLXJlZ2lzdHJhdGlvblwiIC8qIERFTEVURV9QRU5ESU5HX1JFR0lTVFJBVElPTiAqL106IFwiQ2FuJ3QgZGVsZXRlIGluc3RhbGxhdGlvbiB3aGlsZSB0aGVyZSBpcyBhIHBlbmRpbmcgcmVnaXN0cmF0aW9uIHJlcXVlc3QuXCJcclxufTtcclxuY29uc3QgRVJST1JfRkFDVE9SWSA9IG5ldyBFcnJvckZhY3RvcnkoU0VSVklDRSwgU0VSVklDRV9OQU1FLCBFUlJPUl9ERVNDUklQVElPTl9NQVApO1xyXG4vKiogUmV0dXJucyB0cnVlIGlmIGVycm9yIGlzIGEgRmlyZWJhc2VFcnJvciB0aGF0IGlzIGJhc2VkIG9uIGFuIGVycm9yIGZyb20gdGhlIHNlcnZlci4gKi9cclxuZnVuY3Rpb24gaXNTZXJ2ZXJFcnJvcihlcnJvcikge1xyXG4gICAgcmV0dXJuIChlcnJvciBpbnN0YW5jZW9mIEZpcmViYXNlRXJyb3IgJiZcclxuICAgICAgICBlcnJvci5jb2RlLmluY2x1ZGVzKFwicmVxdWVzdC1mYWlsZWRcIiAvKiBSRVFVRVNUX0ZBSUxFRCAqLykpO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmZ1bmN0aW9uIGdldEluc3RhbGxhdGlvbnNFbmRwb2ludCh7IHByb2plY3RJZCB9KSB7XHJcbiAgICByZXR1cm4gYCR7SU5TVEFMTEFUSU9OU19BUElfVVJMfS9wcm9qZWN0cy8ke3Byb2plY3RJZH0vaW5zdGFsbGF0aW9uc2A7XHJcbn1cclxuZnVuY3Rpb24gZXh0cmFjdEF1dGhUb2tlbkluZm9Gcm9tUmVzcG9uc2UocmVzcG9uc2UpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9rZW46IHJlc3BvbnNlLnRva2VuLFxyXG4gICAgICAgIHJlcXVlc3RTdGF0dXM6IDIgLyogQ09NUExFVEVEICovLFxyXG4gICAgICAgIGV4cGlyZXNJbjogZ2V0RXhwaXJlc0luRnJvbVJlc3BvbnNlRXhwaXJlc0luKHJlc3BvbnNlLmV4cGlyZXNJbiksXHJcbiAgICAgICAgY3JlYXRpb25UaW1lOiBEYXRlLm5vdygpXHJcbiAgICB9O1xyXG59XHJcbmFzeW5jIGZ1bmN0aW9uIGdldEVycm9yRnJvbVJlc3BvbnNlKHJlcXVlc3ROYW1lLCByZXNwb25zZSkge1xyXG4gICAgY29uc3QgcmVzcG9uc2VKc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgY29uc3QgZXJyb3JEYXRhID0gcmVzcG9uc2VKc29uLmVycm9yO1xyXG4gICAgcmV0dXJuIEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwicmVxdWVzdC1mYWlsZWRcIiAvKiBSRVFVRVNUX0ZBSUxFRCAqLywge1xyXG4gICAgICAgIHJlcXVlc3ROYW1lLFxyXG4gICAgICAgIHNlcnZlckNvZGU6IGVycm9yRGF0YS5jb2RlLFxyXG4gICAgICAgIHNlcnZlck1lc3NhZ2U6IGVycm9yRGF0YS5tZXNzYWdlLFxyXG4gICAgICAgIHNlcnZlclN0YXR1czogZXJyb3JEYXRhLnN0YXR1c1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0SGVhZGVycyh7IGFwaUtleSB9KSB7XHJcbiAgICByZXR1cm4gbmV3IEhlYWRlcnMoe1xyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgJ3gtZ29vZy1hcGkta2V5JzogYXBpS2V5XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBnZXRIZWFkZXJzV2l0aEF1dGgoYXBwQ29uZmlnLCB7IHJlZnJlc2hUb2tlbiB9KSB7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gZ2V0SGVhZGVycyhhcHBDb25maWcpO1xyXG4gICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBnZXRBdXRob3JpemF0aW9uSGVhZGVyKHJlZnJlc2hUb2tlbikpO1xyXG4gICAgcmV0dXJuIGhlYWRlcnM7XHJcbn1cclxuLyoqXHJcbiAqIENhbGxzIHRoZSBwYXNzZWQgaW4gZmV0Y2ggd3JhcHBlciBhbmQgcmV0dXJucyB0aGUgcmVzcG9uc2UuXHJcbiAqIElmIHRoZSByZXR1cm5lZCByZXNwb25zZSBoYXMgYSBzdGF0dXMgb2YgNXh4LCByZS1ydW5zIHRoZSBmdW5jdGlvbiBvbmNlIGFuZFxyXG4gKiByZXR1cm5zIHRoZSByZXNwb25zZS5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHJldHJ5SWZTZXJ2ZXJFcnJvcihmbikge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZm4oKTtcclxuICAgIGlmIChyZXN1bHQuc3RhdHVzID49IDUwMCAmJiByZXN1bHQuc3RhdHVzIDwgNjAwKSB7XHJcbiAgICAgICAgLy8gSW50ZXJuYWwgU2VydmVyIEVycm9yLiBSZXRyeSByZXF1ZXN0LlxyXG4gICAgICAgIHJldHVybiBmbigpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBnZXRFeHBpcmVzSW5Gcm9tUmVzcG9uc2VFeHBpcmVzSW4ocmVzcG9uc2VFeHBpcmVzSW4pIHtcclxuICAgIC8vIFRoaXMgd29ya3MgYmVjYXVzZSB0aGUgc2VydmVyIHdpbGwgbmV2ZXIgcmVzcG9uZCB3aXRoIGZyYWN0aW9ucyBvZiBhIHNlY29uZC5cclxuICAgIHJldHVybiBOdW1iZXIocmVzcG9uc2VFeHBpcmVzSW4ucmVwbGFjZSgncycsICcwMDAnKSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0QXV0aG9yaXphdGlvbkhlYWRlcihyZWZyZXNoVG9rZW4pIHtcclxuICAgIHJldHVybiBgJHtJTlRFUk5BTF9BVVRIX1ZFUlNJT059ICR7cmVmcmVzaFRva2VufWA7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlSW5zdGFsbGF0aW9uUmVxdWVzdChhcHBDb25maWcsIHsgZmlkIH0pIHtcclxuICAgIGNvbnN0IGVuZHBvaW50ID0gZ2V0SW5zdGFsbGF0aW9uc0VuZHBvaW50KGFwcENvbmZpZyk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gZ2V0SGVhZGVycyhhcHBDb25maWcpO1xyXG4gICAgY29uc3QgYm9keSA9IHtcclxuICAgICAgICBmaWQsXHJcbiAgICAgICAgYXV0aFZlcnNpb246IElOVEVSTkFMX0FVVEhfVkVSU0lPTixcclxuICAgICAgICBhcHBJZDogYXBwQ29uZmlnLmFwcElkLFxyXG4gICAgICAgIHNka1ZlcnNpb246IFBBQ0tBR0VfVkVSU0lPTlxyXG4gICAgfTtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVycyxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmV0cnlJZlNlcnZlckVycm9yKCgpID0+IGZldGNoKGVuZHBvaW50LCByZXF1ZXN0KSk7XHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZVZhbHVlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGNvbnN0IHJlZ2lzdGVyZWRJbnN0YWxsYXRpb25FbnRyeSA9IHtcclxuICAgICAgICAgICAgZmlkOiByZXNwb25zZVZhbHVlLmZpZCB8fCBmaWQsXHJcbiAgICAgICAgICAgIHJlZ2lzdHJhdGlvblN0YXR1czogMiAvKiBDT01QTEVURUQgKi8sXHJcbiAgICAgICAgICAgIHJlZnJlc2hUb2tlbjogcmVzcG9uc2VWYWx1ZS5yZWZyZXNoVG9rZW4sXHJcbiAgICAgICAgICAgIGF1dGhUb2tlbjogZXh0cmFjdEF1dGhUb2tlbkluZm9Gcm9tUmVzcG9uc2UocmVzcG9uc2VWYWx1ZS5hdXRoVG9rZW4pXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmVnaXN0ZXJlZEluc3RhbGxhdGlvbkVudHJ5O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgYXdhaXQgZ2V0RXJyb3JGcm9tUmVzcG9uc2UoJ0NyZWF0ZSBJbnN0YWxsYXRpb24nLCByZXNwb25zZSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgYWZ0ZXIgZ2l2ZW4gdGltZSBwYXNzZXMuICovXHJcbmZ1bmN0aW9uIHNsZWVwKG1zKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBtcyk7XHJcbiAgICB9KTtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBidWZmZXJUb0Jhc2U2NFVybFNhZmUoYXJyYXkpIHtcclxuICAgIGNvbnN0IGI2NCA9IGJ0b2EoU3RyaW5nLmZyb21DaGFyQ29kZSguLi5hcnJheSkpO1xyXG4gICAgcmV0dXJuIGI2NC5yZXBsYWNlKC9cXCsvZywgJy0nKS5yZXBsYWNlKC9cXC8vZywgJ18nKTtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5jb25zdCBWQUxJRF9GSURfUEFUVEVSTiA9IC9eW2NkZWZdW1xcdy1dezIxfSQvO1xyXG5jb25zdCBJTlZBTElEX0ZJRCA9ICcnO1xyXG4vKipcclxuICogR2VuZXJhdGVzIGEgbmV3IEZJRCB1c2luZyByYW5kb20gdmFsdWVzIGZyb20gV2ViIENyeXB0byBBUEkuXHJcbiAqIFJldHVybnMgYW4gZW1wdHkgc3RyaW5nIGlmIEZJRCBnZW5lcmF0aW9uIGZhaWxzIGZvciBhbnkgcmVhc29uLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2VuZXJhdGVGaWQoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIEEgdmFsaWQgRklEIGhhcyBleGFjdGx5IDIyIGJhc2U2NCBjaGFyYWN0ZXJzLCB3aGljaCBpcyAxMzIgYml0cywgb3IgMTYuNVxyXG4gICAgICAgIC8vIGJ5dGVzLiBvdXIgaW1wbGVtZW50YXRpb24gZ2VuZXJhdGVzIGEgMTcgYnl0ZSBhcnJheSBpbnN0ZWFkLlxyXG4gICAgICAgIGNvbnN0IGZpZEJ5dGVBcnJheSA9IG5ldyBVaW50OEFycmF5KDE3KTtcclxuICAgICAgICBjb25zdCBjcnlwdG8gPSBzZWxmLmNyeXB0byB8fCBzZWxmLm1zQ3J5cHRvO1xyXG4gICAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoZmlkQnl0ZUFycmF5KTtcclxuICAgICAgICAvLyBSZXBsYWNlIHRoZSBmaXJzdCA0IHJhbmRvbSBiaXRzIHdpdGggdGhlIGNvbnN0YW50IEZJRCBoZWFkZXIgb2YgMGIwMTExLlxyXG4gICAgICAgIGZpZEJ5dGVBcnJheVswXSA9IDBiMDExMTAwMDAgKyAoZmlkQnl0ZUFycmF5WzBdICUgMGIwMDAxMDAwMCk7XHJcbiAgICAgICAgY29uc3QgZmlkID0gZW5jb2RlKGZpZEJ5dGVBcnJheSk7XHJcbiAgICAgICAgcmV0dXJuIFZBTElEX0ZJRF9QQVRURVJOLnRlc3QoZmlkKSA/IGZpZCA6IElOVkFMSURfRklEO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgLy8gRklEIGdlbmVyYXRpb24gZXJyb3JlZFxyXG4gICAgICAgIHJldHVybiBJTlZBTElEX0ZJRDtcclxuICAgIH1cclxufVxyXG4vKiogQ29udmVydHMgYSBGSUQgVWludDhBcnJheSB0byBhIGJhc2U2NCBzdHJpbmcgcmVwcmVzZW50YXRpb24uICovXHJcbmZ1bmN0aW9uIGVuY29kZShmaWRCeXRlQXJyYXkpIHtcclxuICAgIGNvbnN0IGI2NFN0cmluZyA9IGJ1ZmZlclRvQmFzZTY0VXJsU2FmZShmaWRCeXRlQXJyYXkpO1xyXG4gICAgLy8gUmVtb3ZlIHRoZSAyM3JkIGNoYXJhY3RlciB0aGF0IHdhcyBhZGRlZCBiZWNhdXNlIG9mIHRoZSBleHRyYSA0IGJpdHMgYXQgdGhlXHJcbiAgICAvLyBlbmQgb2Ygb3VyIDE3IGJ5dGUgYXJyYXksIGFuZCB0aGUgJz0nIHBhZGRpbmcuXHJcbiAgICByZXR1cm4gYjY0U3RyaW5nLnN1YnN0cigwLCAyMik7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqIFJldHVybnMgYSBzdHJpbmcga2V5IHRoYXQgY2FuIGJlIHVzZWQgdG8gaWRlbnRpZnkgdGhlIGFwcC4gKi9cclxuZnVuY3Rpb24gZ2V0S2V5KGFwcENvbmZpZykge1xyXG4gICAgcmV0dXJuIGAke2FwcENvbmZpZy5hcHBOYW1lfSEke2FwcENvbmZpZy5hcHBJZH1gO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmNvbnN0IGZpZENoYW5nZUNhbGxiYWNrcyA9IG5ldyBNYXAoKTtcclxuLyoqXHJcbiAqIENhbGxzIHRoZSBvbklkQ2hhbmdlIGNhbGxiYWNrcyB3aXRoIHRoZSBuZXcgRklEIHZhbHVlLCBhbmQgYnJvYWRjYXN0cyB0aGVcclxuICogY2hhbmdlIHRvIG90aGVyIHRhYnMuXHJcbiAqL1xyXG5mdW5jdGlvbiBmaWRDaGFuZ2VkKGFwcENvbmZpZywgZmlkKSB7XHJcbiAgICBjb25zdCBrZXkgPSBnZXRLZXkoYXBwQ29uZmlnKTtcclxuICAgIGNhbGxGaWRDaGFuZ2VDYWxsYmFja3Moa2V5LCBmaWQpO1xyXG4gICAgYnJvYWRjYXN0RmlkQ2hhbmdlKGtleSwgZmlkKTtcclxufVxyXG5mdW5jdGlvbiBhZGRDYWxsYmFjayhhcHBDb25maWcsIGNhbGxiYWNrKSB7XHJcbiAgICAvLyBPcGVuIHRoZSBicm9hZGNhc3QgY2hhbm5lbCBpZiBpdCdzIG5vdCBhbHJlYWR5IG9wZW4sXHJcbiAgICAvLyB0byBiZSBhYmxlIHRvIGxpc3RlbiB0byBjaGFuZ2UgZXZlbnRzIGZyb20gb3RoZXIgdGFicy5cclxuICAgIGdldEJyb2FkY2FzdENoYW5uZWwoKTtcclxuICAgIGNvbnN0IGtleSA9IGdldEtleShhcHBDb25maWcpO1xyXG4gICAgbGV0IGNhbGxiYWNrU2V0ID0gZmlkQ2hhbmdlQ2FsbGJhY2tzLmdldChrZXkpO1xyXG4gICAgaWYgKCFjYWxsYmFja1NldCkge1xyXG4gICAgICAgIGNhbGxiYWNrU2V0ID0gbmV3IFNldCgpO1xyXG4gICAgICAgIGZpZENoYW5nZUNhbGxiYWNrcy5zZXQoa2V5LCBjYWxsYmFja1NldCk7XHJcbiAgICB9XHJcbiAgICBjYWxsYmFja1NldC5hZGQoY2FsbGJhY2spO1xyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZUNhbGxiYWNrKGFwcENvbmZpZywgY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGtleSA9IGdldEtleShhcHBDb25maWcpO1xyXG4gICAgY29uc3QgY2FsbGJhY2tTZXQgPSBmaWRDaGFuZ2VDYWxsYmFja3MuZ2V0KGtleSk7XHJcbiAgICBpZiAoIWNhbGxiYWNrU2V0KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY2FsbGJhY2tTZXQuZGVsZXRlKGNhbGxiYWNrKTtcclxuICAgIGlmIChjYWxsYmFja1NldC5zaXplID09PSAwKSB7XHJcbiAgICAgICAgZmlkQ2hhbmdlQ2FsbGJhY2tzLmRlbGV0ZShrZXkpO1xyXG4gICAgfVxyXG4gICAgLy8gQ2xvc2UgYnJvYWRjYXN0IGNoYW5uZWwgaWYgdGhlcmUgYXJlIG5vIG1vcmUgY2FsbGJhY2tzLlxyXG4gICAgY2xvc2VCcm9hZGNhc3RDaGFubmVsKCk7XHJcbn1cclxuZnVuY3Rpb24gY2FsbEZpZENoYW5nZUNhbGxiYWNrcyhrZXksIGZpZCkge1xyXG4gICAgY29uc3QgY2FsbGJhY2tzID0gZmlkQ2hhbmdlQ2FsbGJhY2tzLmdldChrZXkpO1xyXG4gICAgaWYgKCFjYWxsYmFja3MpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIGNhbGxiYWNrcykge1xyXG4gICAgICAgIGNhbGxiYWNrKGZpZCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gYnJvYWRjYXN0RmlkQ2hhbmdlKGtleSwgZmlkKSB7XHJcbiAgICBjb25zdCBjaGFubmVsID0gZ2V0QnJvYWRjYXN0Q2hhbm5lbCgpO1xyXG4gICAgaWYgKGNoYW5uZWwpIHtcclxuICAgICAgICBjaGFubmVsLnBvc3RNZXNzYWdlKHsga2V5LCBmaWQgfSk7XHJcbiAgICB9XHJcbiAgICBjbG9zZUJyb2FkY2FzdENoYW5uZWwoKTtcclxufVxyXG5sZXQgYnJvYWRjYXN0Q2hhbm5lbCA9IG51bGw7XHJcbi8qKiBPcGVucyBhbmQgcmV0dXJucyBhIEJyb2FkY2FzdENoYW5uZWwgaWYgaXQgaXMgc3VwcG9ydGVkIGJ5IHRoZSBicm93c2VyLiAqL1xyXG5mdW5jdGlvbiBnZXRCcm9hZGNhc3RDaGFubmVsKCkge1xyXG4gICAgaWYgKCFicm9hZGNhc3RDaGFubmVsICYmICdCcm9hZGNhc3RDaGFubmVsJyBpbiBzZWxmKSB7XHJcbiAgICAgICAgYnJvYWRjYXN0Q2hhbm5lbCA9IG5ldyBCcm9hZGNhc3RDaGFubmVsKCdbRmlyZWJhc2VdIEZJRCBDaGFuZ2UnKTtcclxuICAgICAgICBicm9hZGNhc3RDaGFubmVsLm9ubWVzc2FnZSA9IGUgPT4ge1xyXG4gICAgICAgICAgICBjYWxsRmlkQ2hhbmdlQ2FsbGJhY2tzKGUuZGF0YS5rZXksIGUuZGF0YS5maWQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYnJvYWRjYXN0Q2hhbm5lbDtcclxufVxyXG5mdW5jdGlvbiBjbG9zZUJyb2FkY2FzdENoYW5uZWwoKSB7XHJcbiAgICBpZiAoZmlkQ2hhbmdlQ2FsbGJhY2tzLnNpemUgPT09IDAgJiYgYnJvYWRjYXN0Q2hhbm5lbCkge1xyXG4gICAgICAgIGJyb2FkY2FzdENoYW5uZWwuY2xvc2UoKTtcclxuICAgICAgICBicm9hZGNhc3RDaGFubmVsID0gbnVsbDtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5jb25zdCBEQVRBQkFTRV9OQU1FID0gJ2ZpcmViYXNlLWluc3RhbGxhdGlvbnMtZGF0YWJhc2UnO1xyXG5jb25zdCBEQVRBQkFTRV9WRVJTSU9OID0gMTtcclxuY29uc3QgT0JKRUNUX1NUT1JFX05BTUUgPSAnZmlyZWJhc2UtaW5zdGFsbGF0aW9ucy1zdG9yZSc7XHJcbmxldCBkYlByb21pc2UgPSBudWxsO1xyXG5mdW5jdGlvbiBnZXREYlByb21pc2UoKSB7XHJcbiAgICBpZiAoIWRiUHJvbWlzZSkge1xyXG4gICAgICAgIGRiUHJvbWlzZSA9IG9wZW5EYihEQVRBQkFTRV9OQU1FLCBEQVRBQkFTRV9WRVJTSU9OLCB1cGdyYWRlREIgPT4ge1xyXG4gICAgICAgICAgICAvLyBXZSBkb24ndCB1c2UgJ2JyZWFrJyBpbiB0aGlzIHN3aXRjaCBzdGF0ZW1lbnQsIHRoZSBmYWxsLXRocm91Z2hcclxuICAgICAgICAgICAgLy8gYmVoYXZpb3IgaXMgd2hhdCB3ZSB3YW50LCBiZWNhdXNlIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSB2ZXJzaW9ucyBiZXR3ZWVuXHJcbiAgICAgICAgICAgIC8vIHRoZSBvbGQgdmVyc2lvbiBhbmQgdGhlIGN1cnJlbnQgdmVyc2lvbiwgd2Ugd2FudCBBTEwgdGhlIG1pZ3JhdGlvbnNcclxuICAgICAgICAgICAgLy8gdGhhdCBjb3JyZXNwb25kIHRvIHRob3NlIHZlcnNpb25zIHRvIHJ1biwgbm90IG9ubHkgdGhlIGxhc3Qgb25lLlxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVmYXVsdC1jYXNlXHJcbiAgICAgICAgICAgIHN3aXRjaCAodXBncmFkZURCLm9sZFZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICB1cGdyYWRlREIuY3JlYXRlT2JqZWN0U3RvcmUoT0JKRUNUX1NUT1JFX05BTUUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGJQcm9taXNlO1xyXG59XHJcbi8qKiBBc3NpZ25zIG9yIG92ZXJ3cml0ZXMgdGhlIHJlY29yZCBmb3IgdGhlIGdpdmVuIGtleSB3aXRoIHRoZSBnaXZlbiB2YWx1ZS4gKi9cclxuYXN5bmMgZnVuY3Rpb24gc2V0KGFwcENvbmZpZywgdmFsdWUpIHtcclxuICAgIGNvbnN0IGtleSA9IGdldEtleShhcHBDb25maWcpO1xyXG4gICAgY29uc3QgZGIgPSBhd2FpdCBnZXREYlByb21pc2UoKTtcclxuICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oT0JKRUNUX1NUT1JFX05BTUUsICdyZWFkd3JpdGUnKTtcclxuICAgIGNvbnN0IG9iamVjdFN0b3JlID0gdHgub2JqZWN0U3RvcmUoT0JKRUNUX1NUT1JFX05BTUUpO1xyXG4gICAgY29uc3Qgb2xkVmFsdWUgPSBhd2FpdCBvYmplY3RTdG9yZS5nZXQoa2V5KTtcclxuICAgIGF3YWl0IG9iamVjdFN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcclxuICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xyXG4gICAgaWYgKCFvbGRWYWx1ZSB8fCBvbGRWYWx1ZS5maWQgIT09IHZhbHVlLmZpZCkge1xyXG4gICAgICAgIGZpZENoYW5nZWQoYXBwQ29uZmlnLCB2YWx1ZS5maWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbi8qKiBSZW1vdmVzIHJlY29yZChzKSBmcm9tIHRoZSBvYmplY3RTdG9yZSB0aGF0IG1hdGNoIHRoZSBnaXZlbiBrZXkuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZShhcHBDb25maWcpIHtcclxuICAgIGNvbnN0IGtleSA9IGdldEtleShhcHBDb25maWcpO1xyXG4gICAgY29uc3QgZGIgPSBhd2FpdCBnZXREYlByb21pc2UoKTtcclxuICAgIGNvbnN0IHR4ID0gZGIudHJhbnNhY3Rpb24oT0JKRUNUX1NUT1JFX05BTUUsICdyZWFkd3JpdGUnKTtcclxuICAgIGF3YWl0IHR4Lm9iamVjdFN0b3JlKE9CSkVDVF9TVE9SRV9OQU1FKS5kZWxldGUoa2V5KTtcclxuICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xyXG59XHJcbi8qKlxyXG4gKiBBdG9taWNhbGx5IHVwZGF0ZXMgYSByZWNvcmQgd2l0aCB0aGUgcmVzdWx0IG9mIHVwZGF0ZUZuLCB3aGljaCBnZXRzXHJcbiAqIGNhbGxlZCB3aXRoIHRoZSBjdXJyZW50IHZhbHVlLiBJZiBuZXdWYWx1ZSBpcyB1bmRlZmluZWQsIHRoZSByZWNvcmQgaXNcclxuICogZGVsZXRlZCBpbnN0ZWFkLlxyXG4gKiBAcmV0dXJuIFVwZGF0ZWQgdmFsdWVcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZShhcHBDb25maWcsIHVwZGF0ZUZuKSB7XHJcbiAgICBjb25zdCBrZXkgPSBnZXRLZXkoYXBwQ29uZmlnKTtcclxuICAgIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGJQcm9taXNlKCk7XHJcbiAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKE9CSkVDVF9TVE9SRV9OQU1FLCAncmVhZHdyaXRlJyk7XHJcbiAgICBjb25zdCBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKE9CSkVDVF9TVE9SRV9OQU1FKTtcclxuICAgIGNvbnN0IG9sZFZhbHVlID0gYXdhaXQgc3RvcmUuZ2V0KGtleSk7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHVwZGF0ZUZuKG9sZFZhbHVlKTtcclxuICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYXdhaXQgc3RvcmUuZGVsZXRlKGtleSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhd2FpdCBzdG9yZS5wdXQobmV3VmFsdWUsIGtleSk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCB0eC5jb21wbGV0ZTtcclxuICAgIGlmIChuZXdWYWx1ZSAmJiAoIW9sZFZhbHVlIHx8IG9sZFZhbHVlLmZpZCAhPT0gbmV3VmFsdWUuZmlkKSkge1xyXG4gICAgICAgIGZpZENoYW5nZWQoYXBwQ29uZmlnLCBuZXdWYWx1ZS5maWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBVcGRhdGVzIGFuZCByZXR1cm5zIHRoZSBJbnN0YWxsYXRpb25FbnRyeSBmcm9tIHRoZSBkYXRhYmFzZS5cclxuICogQWxzbyB0cmlnZ2VycyBhIHJlZ2lzdHJhdGlvbiByZXF1ZXN0IGlmIGl0IGlzIG5lY2Vzc2FyeSBhbmQgcG9zc2libGUuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBnZXRJbnN0YWxsYXRpb25FbnRyeShhcHBDb25maWcpIHtcclxuICAgIGxldCByZWdpc3RyYXRpb25Qcm9taXNlO1xyXG4gICAgY29uc3QgaW5zdGFsbGF0aW9uRW50cnkgPSBhd2FpdCB1cGRhdGUoYXBwQ29uZmlnLCBvbGRFbnRyeSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5zdGFsbGF0aW9uRW50cnkgPSB1cGRhdGVPckNyZWF0ZUluc3RhbGxhdGlvbkVudHJ5KG9sZEVudHJ5KTtcclxuICAgICAgICBjb25zdCBlbnRyeVdpdGhQcm9taXNlID0gdHJpZ2dlclJlZ2lzdHJhdGlvbklmTmVjZXNzYXJ5KGFwcENvbmZpZywgaW5zdGFsbGF0aW9uRW50cnkpO1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvblByb21pc2UgPSBlbnRyeVdpdGhQcm9taXNlLnJlZ2lzdHJhdGlvblByb21pc2U7XHJcbiAgICAgICAgcmV0dXJuIGVudHJ5V2l0aFByb21pc2UuaW5zdGFsbGF0aW9uRW50cnk7XHJcbiAgICB9KTtcclxuICAgIGlmIChpbnN0YWxsYXRpb25FbnRyeS5maWQgPT09IElOVkFMSURfRklEKSB7XHJcbiAgICAgICAgLy8gRklEIGdlbmVyYXRpb24gZmFpbGVkLiBXYWl0aW5nIGZvciB0aGUgRklEIGZyb20gdGhlIHNlcnZlci5cclxuICAgICAgICByZXR1cm4geyBpbnN0YWxsYXRpb25FbnRyeTogYXdhaXQgcmVnaXN0cmF0aW9uUHJvbWlzZSB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbnN0YWxsYXRpb25FbnRyeSxcclxuICAgICAgICByZWdpc3RyYXRpb25Qcm9taXNlXHJcbiAgICB9O1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IEluc3RhbGxhdGlvbiBFbnRyeSBpZiBvbmUgZG9lcyBub3QgZXhpc3QuXHJcbiAqIEFsc28gY2xlYXJzIHRpbWVkIG91dCBwZW5kaW5nIHJlcXVlc3RzLlxyXG4gKi9cclxuZnVuY3Rpb24gdXBkYXRlT3JDcmVhdGVJbnN0YWxsYXRpb25FbnRyeShvbGRFbnRyeSkge1xyXG4gICAgY29uc3QgZW50cnkgPSBvbGRFbnRyeSB8fCB7XHJcbiAgICAgICAgZmlkOiBnZW5lcmF0ZUZpZCgpLFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvblN0YXR1czogMCAvKiBOT1RfU1RBUlRFRCAqL1xyXG4gICAgfTtcclxuICAgIHJldHVybiBjbGVhclRpbWVkT3V0UmVxdWVzdChlbnRyeSk7XHJcbn1cclxuLyoqXHJcbiAqIElmIHRoZSBGaXJlYmFzZSBJbnN0YWxsYXRpb24gaXMgbm90IHJlZ2lzdGVyZWQgeWV0LCB0aGlzIHdpbGwgdHJpZ2dlciB0aGVcclxuICogcmVnaXN0cmF0aW9uIGFuZCByZXR1cm4gYW4gSW5Qcm9ncmVzc0luc3RhbGxhdGlvbkVudHJ5LlxyXG4gKlxyXG4gKiBJZiByZWdpc3RyYXRpb25Qcm9taXNlIGRvZXMgbm90IGV4aXN0LCB0aGUgaW5zdGFsbGF0aW9uRW50cnkgaXMgZ3VhcmFudGVlZFxyXG4gKiB0byBiZSByZWdpc3RlcmVkLlxyXG4gKi9cclxuZnVuY3Rpb24gdHJpZ2dlclJlZ2lzdHJhdGlvbklmTmVjZXNzYXJ5KGFwcENvbmZpZywgaW5zdGFsbGF0aW9uRW50cnkpIHtcclxuICAgIGlmIChpbnN0YWxsYXRpb25FbnRyeS5yZWdpc3RyYXRpb25TdGF0dXMgPT09IDAgLyogTk9UX1NUQVJURUQgKi8pIHtcclxuICAgICAgICBpZiAoIW5hdmlnYXRvci5vbkxpbmUpIHtcclxuICAgICAgICAgICAgLy8gUmVnaXN0cmF0aW9uIHJlcXVpcmVkIGJ1dCBhcHAgaXMgb2ZmbGluZS5cclxuICAgICAgICAgICAgY29uc3QgcmVnaXN0cmF0aW9uUHJvbWlzZVdpdGhFcnJvciA9IFByb21pc2UucmVqZWN0KEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiYXBwLW9mZmxpbmVcIiAvKiBBUFBfT0ZGTElORSAqLykpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFsbGF0aW9uRW50cnksXHJcbiAgICAgICAgICAgICAgICByZWdpc3RyYXRpb25Qcm9taXNlOiByZWdpc3RyYXRpb25Qcm9taXNlV2l0aEVycm9yXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFRyeSByZWdpc3RlcmluZy4gQ2hhbmdlIHN0YXR1cyB0byBJTl9QUk9HUkVTUy5cclxuICAgICAgICBjb25zdCBpblByb2dyZXNzRW50cnkgPSB7XHJcbiAgICAgICAgICAgIGZpZDogaW5zdGFsbGF0aW9uRW50cnkuZmlkLFxyXG4gICAgICAgICAgICByZWdpc3RyYXRpb25TdGF0dXM6IDEgLyogSU5fUFJPR1JFU1MgKi8sXHJcbiAgICAgICAgICAgIHJlZ2lzdHJhdGlvblRpbWU6IERhdGUubm93KClcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlZ2lzdHJhdGlvblByb21pc2UgPSByZWdpc3Rlckluc3RhbGxhdGlvbihhcHBDb25maWcsIGluUHJvZ3Jlc3NFbnRyeSk7XHJcbiAgICAgICAgcmV0dXJuIHsgaW5zdGFsbGF0aW9uRW50cnk6IGluUHJvZ3Jlc3NFbnRyeSwgcmVnaXN0cmF0aW9uUHJvbWlzZSB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW5zdGFsbGF0aW9uRW50cnkucmVnaXN0cmF0aW9uU3RhdHVzID09PSAxIC8qIElOX1BST0dSRVNTICovKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5zdGFsbGF0aW9uRW50cnksXHJcbiAgICAgICAgICAgIHJlZ2lzdHJhdGlvblByb21pc2U6IHdhaXRVbnRpbEZpZFJlZ2lzdHJhdGlvbihhcHBDb25maWcpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7IGluc3RhbGxhdGlvbkVudHJ5IH07XHJcbiAgICB9XHJcbn1cclxuLyoqIFRoaXMgd2lsbCBiZSBleGVjdXRlZCBvbmx5IG9uY2UgZm9yIGVhY2ggbmV3IEZpcmViYXNlIEluc3RhbGxhdGlvbi4gKi9cclxuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJJbnN0YWxsYXRpb24oYXBwQ29uZmlnLCBpbnN0YWxsYXRpb25FbnRyeSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZWdpc3RlcmVkSW5zdGFsbGF0aW9uRW50cnkgPSBhd2FpdCBjcmVhdGVJbnN0YWxsYXRpb25SZXF1ZXN0KGFwcENvbmZpZywgaW5zdGFsbGF0aW9uRW50cnkpO1xyXG4gICAgICAgIHJldHVybiBzZXQoYXBwQ29uZmlnLCByZWdpc3RlcmVkSW5zdGFsbGF0aW9uRW50cnkpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBpZiAoaXNTZXJ2ZXJFcnJvcihlKSAmJiBlLmN1c3RvbURhdGEuc2VydmVyQ29kZSA9PT0gNDA5KSB7XHJcbiAgICAgICAgICAgIC8vIFNlcnZlciByZXR1cm5lZCBhIFwiRklEIGNhbiBub3QgYmUgdXNlZFwiIGVycm9yLlxyXG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSBhIG5ldyBJRCBuZXh0IHRpbWUuXHJcbiAgICAgICAgICAgIGF3YWl0IHJlbW92ZShhcHBDb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gUmVnaXN0cmF0aW9uIGZhaWxlZC4gU2V0IEZJRCBhcyBub3QgcmVnaXN0ZXJlZC5cclxuICAgICAgICAgICAgYXdhaXQgc2V0KGFwcENvbmZpZywge1xyXG4gICAgICAgICAgICAgICAgZmlkOiBpbnN0YWxsYXRpb25FbnRyeS5maWQsXHJcbiAgICAgICAgICAgICAgICByZWdpc3RyYXRpb25TdGF0dXM6IDAgLyogTk9UX1NUQVJURUQgKi9cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbn1cclxuLyoqIENhbGwgaWYgRklEIHJlZ2lzdHJhdGlvbiBpcyBwZW5kaW5nIGluIGFub3RoZXIgcmVxdWVzdC4gKi9cclxuYXN5bmMgZnVuY3Rpb24gd2FpdFVudGlsRmlkUmVnaXN0cmF0aW9uKGFwcENvbmZpZykge1xyXG4gICAgLy8gVW5mb3J0dW5hdGVseSwgdGhlcmUgaXMgbm8gd2F5IG9mIHJlbGlhYmx5IG9ic2VydmluZyB3aGVuIGEgdmFsdWUgaW5cclxuICAgIC8vIEluZGV4ZWREQiBjaGFuZ2VzICh5ZXQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9pbmRleGVkLWRiLW9ic2VydmVycyksXHJcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHBvbGwuXHJcbiAgICBsZXQgZW50cnkgPSBhd2FpdCB1cGRhdGVJbnN0YWxsYXRpb25SZXF1ZXN0KGFwcENvbmZpZyk7XHJcbiAgICB3aGlsZSAoZW50cnkucmVnaXN0cmF0aW9uU3RhdHVzID09PSAxIC8qIElOX1BST0dSRVNTICovKSB7XHJcbiAgICAgICAgLy8gY3JlYXRlSW5zdGFsbGF0aW9uIHJlcXVlc3Qgc3RpbGwgaW4gcHJvZ3Jlc3MuXHJcbiAgICAgICAgYXdhaXQgc2xlZXAoMTAwKTtcclxuICAgICAgICBlbnRyeSA9IGF3YWl0IHVwZGF0ZUluc3RhbGxhdGlvblJlcXVlc3QoYXBwQ29uZmlnKTtcclxuICAgIH1cclxuICAgIGlmIChlbnRyeS5yZWdpc3RyYXRpb25TdGF0dXMgPT09IDAgLyogTk9UX1NUQVJURUQgKi8pIHtcclxuICAgICAgICAvLyBUaGUgcmVxdWVzdCB0aW1lZCBvdXQgb3IgZmFpbGVkIGluIGEgZGlmZmVyZW50IGNhbGwuIFRyeSBhZ2Fpbi5cclxuICAgICAgICBjb25zdCB7IGluc3RhbGxhdGlvbkVudHJ5LCByZWdpc3RyYXRpb25Qcm9taXNlIH0gPSBhd2FpdCBnZXRJbnN0YWxsYXRpb25FbnRyeShhcHBDb25maWcpO1xyXG4gICAgICAgIGlmIChyZWdpc3RyYXRpb25Qcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWdpc3RyYXRpb25Qcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gcmVnaXN0cmF0aW9uUHJvbWlzZSwgZW50cnkgaXMgcmVnaXN0ZXJlZC5cclxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbGxhdGlvbkVudHJ5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBlbnRyeTtcclxufVxyXG4vKipcclxuICogQ2FsbGVkIG9ubHkgaWYgdGhlcmUgaXMgYSBDcmVhdGVJbnN0YWxsYXRpb24gcmVxdWVzdCBpbiBwcm9ncmVzcy5cclxuICpcclxuICogVXBkYXRlcyB0aGUgSW5zdGFsbGF0aW9uRW50cnkgaW4gdGhlIERCIGJhc2VkIG9uIHRoZSBzdGF0dXMgb2YgdGhlXHJcbiAqIENyZWF0ZUluc3RhbGxhdGlvbiByZXF1ZXN0LlxyXG4gKlxyXG4gKiBSZXR1cm5zIHRoZSB1cGRhdGVkIEluc3RhbGxhdGlvbkVudHJ5LlxyXG4gKi9cclxuZnVuY3Rpb24gdXBkYXRlSW5zdGFsbGF0aW9uUmVxdWVzdChhcHBDb25maWcpIHtcclxuICAgIHJldHVybiB1cGRhdGUoYXBwQ29uZmlnLCBvbGRFbnRyeSA9PiB7XHJcbiAgICAgICAgaWYgKCFvbGRFbnRyeSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcImluc3RhbGxhdGlvbi1ub3QtZm91bmRcIiAvKiBJTlNUQUxMQVRJT05fTk9UX0ZPVU5EICovKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZWRPdXRSZXF1ZXN0KG9sZEVudHJ5KTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGNsZWFyVGltZWRPdXRSZXF1ZXN0KGVudHJ5KSB7XHJcbiAgICBpZiAoaGFzSW5zdGFsbGF0aW9uUmVxdWVzdFRpbWVkT3V0KGVudHJ5KSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZpZDogZW50cnkuZmlkLFxyXG4gICAgICAgICAgICByZWdpc3RyYXRpb25TdGF0dXM6IDAgLyogTk9UX1NUQVJURUQgKi9cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJ5O1xyXG59XHJcbmZ1bmN0aW9uIGhhc0luc3RhbGxhdGlvblJlcXVlc3RUaW1lZE91dChpbnN0YWxsYXRpb25FbnRyeSkge1xyXG4gICAgcmV0dXJuIChpbnN0YWxsYXRpb25FbnRyeS5yZWdpc3RyYXRpb25TdGF0dXMgPT09IDEgLyogSU5fUFJPR1JFU1MgKi8gJiZcclxuICAgICAgICBpbnN0YWxsYXRpb25FbnRyeS5yZWdpc3RyYXRpb25UaW1lICsgUEVORElOR19USU1FT1VUX01TIDwgRGF0ZS5ub3coKSk7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVBdXRoVG9rZW5SZXF1ZXN0KHsgYXBwQ29uZmlnLCBwbGF0Zm9ybUxvZ2dlclByb3ZpZGVyIH0sIGluc3RhbGxhdGlvbkVudHJ5KSB7XHJcbiAgICBjb25zdCBlbmRwb2ludCA9IGdldEdlbmVyYXRlQXV0aFRva2VuRW5kcG9pbnQoYXBwQ29uZmlnLCBpbnN0YWxsYXRpb25FbnRyeSk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gZ2V0SGVhZGVyc1dpdGhBdXRoKGFwcENvbmZpZywgaW5zdGFsbGF0aW9uRW50cnkpO1xyXG4gICAgLy8gSWYgcGxhdGZvcm0gbG9nZ2VyIGV4aXN0cywgYWRkIHRoZSBwbGF0Zm9ybSBpbmZvIHN0cmluZyB0byB0aGUgaGVhZGVyLlxyXG4gICAgY29uc3QgcGxhdGZvcm1Mb2dnZXIgPSBwbGF0Zm9ybUxvZ2dlclByb3ZpZGVyLmdldEltbWVkaWF0ZSh7XHJcbiAgICAgICAgb3B0aW9uYWw6IHRydWVcclxuICAgIH0pO1xyXG4gICAgaWYgKHBsYXRmb3JtTG9nZ2VyKSB7XHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ3gtZmlyZWJhc2UtY2xpZW50JywgcGxhdGZvcm1Mb2dnZXIuZ2V0UGxhdGZvcm1JbmZvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYm9keSA9IHtcclxuICAgICAgICBpbnN0YWxsYXRpb246IHtcclxuICAgICAgICAgICAgc2RrVmVyc2lvbjogUEFDS0FHRV9WRVJTSU9OXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVycyxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmV0cnlJZlNlcnZlckVycm9yKCgpID0+IGZldGNoKGVuZHBvaW50LCByZXF1ZXN0KSk7XHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZVZhbHVlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZEF1dGhUb2tlbiA9IGV4dHJhY3RBdXRoVG9rZW5JbmZvRnJvbVJlc3BvbnNlKHJlc3BvbnNlVmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBjb21wbGV0ZWRBdXRoVG9rZW47XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBhd2FpdCBnZXRFcnJvckZyb21SZXNwb25zZSgnR2VuZXJhdGUgQXV0aCBUb2tlbicsIHJlc3BvbnNlKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXRHZW5lcmF0ZUF1dGhUb2tlbkVuZHBvaW50KGFwcENvbmZpZywgeyBmaWQgfSkge1xyXG4gICAgcmV0dXJuIGAke2dldEluc3RhbGxhdGlvbnNFbmRwb2ludChhcHBDb25maWcpfS8ke2ZpZH0vYXV0aFRva2VuczpnZW5lcmF0ZWA7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFJldHVybnMgYSB2YWxpZCBhdXRoZW50aWNhdGlvbiB0b2tlbiBmb3IgdGhlIGluc3RhbGxhdGlvbi4gR2VuZXJhdGVzIGEgbmV3XHJcbiAqIHRva2VuIGlmIG9uZSBkb2Vzbid0IGV4aXN0LCBpcyBleHBpcmVkIG9yIGFib3V0IHRvIGV4cGlyZS5cclxuICpcclxuICogU2hvdWxkIG9ubHkgYmUgY2FsbGVkIGlmIHRoZSBGaXJlYmFzZSBJbnN0YWxsYXRpb24gaXMgcmVnaXN0ZXJlZC5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hBdXRoVG9rZW4oaW5zdGFsbGF0aW9ucywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcclxuICAgIGxldCB0b2tlblByb21pc2U7XHJcbiAgICBjb25zdCBlbnRyeSA9IGF3YWl0IHVwZGF0ZShpbnN0YWxsYXRpb25zLmFwcENvbmZpZywgb2xkRW50cnkgPT4ge1xyXG4gICAgICAgIGlmICghaXNFbnRyeVJlZ2lzdGVyZWQob2xkRW50cnkpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwibm90LXJlZ2lzdGVyZWRcIiAvKiBOT1RfUkVHSVNURVJFRCAqLyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9sZEF1dGhUb2tlbiA9IG9sZEVudHJ5LmF1dGhUb2tlbjtcclxuICAgICAgICBpZiAoIWZvcmNlUmVmcmVzaCAmJiBpc0F1dGhUb2tlblZhbGlkKG9sZEF1dGhUb2tlbikpIHtcclxuICAgICAgICAgICAgLy8gVGhlcmUgaXMgYSB2YWxpZCB0b2tlbiBpbiB0aGUgREIuXHJcbiAgICAgICAgICAgIHJldHVybiBvbGRFbnRyeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob2xkQXV0aFRva2VuLnJlcXVlc3RTdGF0dXMgPT09IDEgLyogSU5fUFJPR1JFU1MgKi8pIHtcclxuICAgICAgICAgICAgLy8gVGhlcmUgYWxyZWFkeSBpcyBhIHRva2VuIHJlcXVlc3QgaW4gcHJvZ3Jlc3MuXHJcbiAgICAgICAgICAgIHRva2VuUHJvbWlzZSA9IHdhaXRVbnRpbEF1dGhUb2tlblJlcXVlc3QoaW5zdGFsbGF0aW9ucywgZm9yY2VSZWZyZXNoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9sZEVudHJ5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm8gdG9rZW4gb3IgdG9rZW4gZXhwaXJlZC5cclxuICAgICAgICAgICAgaWYgKCFuYXZpZ2F0b3Iub25MaW5lKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcImFwcC1vZmZsaW5lXCIgLyogQVBQX09GRkxJTkUgKi8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGluUHJvZ3Jlc3NFbnRyeSA9IG1ha2VBdXRoVG9rZW5SZXF1ZXN0SW5Qcm9ncmVzc0VudHJ5KG9sZEVudHJ5KTtcclxuICAgICAgICAgICAgdG9rZW5Qcm9taXNlID0gZmV0Y2hBdXRoVG9rZW5Gcm9tU2VydmVyKGluc3RhbGxhdGlvbnMsIGluUHJvZ3Jlc3NFbnRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiBpblByb2dyZXNzRW50cnk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBhdXRoVG9rZW4gPSB0b2tlblByb21pc2VcclxuICAgICAgICA/IGF3YWl0IHRva2VuUHJvbWlzZVxyXG4gICAgICAgIDogZW50cnkuYXV0aFRva2VuO1xyXG4gICAgcmV0dXJuIGF1dGhUb2tlbjtcclxufVxyXG4vKipcclxuICogQ2FsbCBvbmx5IGlmIEZJRCBpcyByZWdpc3RlcmVkIGFuZCBBdXRoIFRva2VuIHJlcXVlc3QgaXMgaW4gcHJvZ3Jlc3MuXHJcbiAqXHJcbiAqIFdhaXRzIHVudGlsIHRoZSBjdXJyZW50IHBlbmRpbmcgcmVxdWVzdCBmaW5pc2hlcy4gSWYgdGhlIHJlcXVlc3QgdGltZXMgb3V0LFxyXG4gKiB0cmllcyBvbmNlIGluIHRoaXMgdGhyZWFkIGFzIHdlbGwuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiB3YWl0VW50aWxBdXRoVG9rZW5SZXF1ZXN0KGluc3RhbGxhdGlvbnMsIGZvcmNlUmVmcmVzaCkge1xyXG4gICAgLy8gVW5mb3J0dW5hdGVseSwgdGhlcmUgaXMgbm8gd2F5IG9mIHJlbGlhYmx5IG9ic2VydmluZyB3aGVuIGEgdmFsdWUgaW5cclxuICAgIC8vIEluZGV4ZWREQiBjaGFuZ2VzICh5ZXQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9pbmRleGVkLWRiLW9ic2VydmVycyksXHJcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHBvbGwuXHJcbiAgICBsZXQgZW50cnkgPSBhd2FpdCB1cGRhdGVBdXRoVG9rZW5SZXF1ZXN0KGluc3RhbGxhdGlvbnMuYXBwQ29uZmlnKTtcclxuICAgIHdoaWxlIChlbnRyeS5hdXRoVG9rZW4ucmVxdWVzdFN0YXR1cyA9PT0gMSAvKiBJTl9QUk9HUkVTUyAqLykge1xyXG4gICAgICAgIC8vIGdlbmVyYXRlQXV0aFRva2VuIHN0aWxsIGluIHByb2dyZXNzLlxyXG4gICAgICAgIGF3YWl0IHNsZWVwKDEwMCk7XHJcbiAgICAgICAgZW50cnkgPSBhd2FpdCB1cGRhdGVBdXRoVG9rZW5SZXF1ZXN0KGluc3RhbGxhdGlvbnMuYXBwQ29uZmlnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGF1dGhUb2tlbiA9IGVudHJ5LmF1dGhUb2tlbjtcclxuICAgIGlmIChhdXRoVG9rZW4ucmVxdWVzdFN0YXR1cyA9PT0gMCAvKiBOT1RfU1RBUlRFRCAqLykge1xyXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IHRpbWVkIG91dCBvciBmYWlsZWQgaW4gYSBkaWZmZXJlbnQgY2FsbC4gVHJ5IGFnYWluLlxyXG4gICAgICAgIHJldHVybiByZWZyZXNoQXV0aFRva2VuKGluc3RhbGxhdGlvbnMsIGZvcmNlUmVmcmVzaCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYXV0aFRva2VuO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBDYWxsZWQgb25seSBpZiB0aGVyZSBpcyBhIEdlbmVyYXRlQXV0aFRva2VuIHJlcXVlc3QgaW4gcHJvZ3Jlc3MuXHJcbiAqXHJcbiAqIFVwZGF0ZXMgdGhlIEluc3RhbGxhdGlvbkVudHJ5IGluIHRoZSBEQiBiYXNlZCBvbiB0aGUgc3RhdHVzIG9mIHRoZVxyXG4gKiBHZW5lcmF0ZUF1dGhUb2tlbiByZXF1ZXN0LlxyXG4gKlxyXG4gKiBSZXR1cm5zIHRoZSB1cGRhdGVkIEluc3RhbGxhdGlvbkVudHJ5LlxyXG4gKi9cclxuZnVuY3Rpb24gdXBkYXRlQXV0aFRva2VuUmVxdWVzdChhcHBDb25maWcpIHtcclxuICAgIHJldHVybiB1cGRhdGUoYXBwQ29uZmlnLCBvbGRFbnRyeSA9PiB7XHJcbiAgICAgICAgaWYgKCFpc0VudHJ5UmVnaXN0ZXJlZChvbGRFbnRyeSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgRVJST1JfRkFDVE9SWS5jcmVhdGUoXCJub3QtcmVnaXN0ZXJlZFwiIC8qIE5PVF9SRUdJU1RFUkVEICovKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb2xkQXV0aFRva2VuID0gb2xkRW50cnkuYXV0aFRva2VuO1xyXG4gICAgICAgIGlmIChoYXNBdXRoVG9rZW5SZXF1ZXN0VGltZWRPdXQob2xkQXV0aFRva2VuKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvbGRFbnRyeSksIHsgYXV0aFRva2VuOiB7IHJlcXVlc3RTdGF0dXM6IDAgLyogTk9UX1NUQVJURUQgKi8gfSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9sZEVudHJ5O1xyXG4gICAgfSk7XHJcbn1cclxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hBdXRoVG9rZW5Gcm9tU2VydmVyKGluc3RhbGxhdGlvbnMsIGluc3RhbGxhdGlvbkVudHJ5KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGF1dGhUb2tlbiA9IGF3YWl0IGdlbmVyYXRlQXV0aFRva2VuUmVxdWVzdChpbnN0YWxsYXRpb25zLCBpbnN0YWxsYXRpb25FbnRyeSk7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlZEluc3RhbGxhdGlvbkVudHJ5ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpbnN0YWxsYXRpb25FbnRyeSksIHsgYXV0aFRva2VuIH0pO1xyXG4gICAgICAgIGF3YWl0IHNldChpbnN0YWxsYXRpb25zLmFwcENvbmZpZywgdXBkYXRlZEluc3RhbGxhdGlvbkVudHJ5KTtcclxuICAgICAgICByZXR1cm4gYXV0aFRva2VuO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBpZiAoaXNTZXJ2ZXJFcnJvcihlKSAmJlxyXG4gICAgICAgICAgICAoZS5jdXN0b21EYXRhLnNlcnZlckNvZGUgPT09IDQwMSB8fCBlLmN1c3RvbURhdGEuc2VydmVyQ29kZSA9PT0gNDA0KSkge1xyXG4gICAgICAgICAgICAvLyBTZXJ2ZXIgcmV0dXJuZWQgYSBcIkZJRCBub3QgZm91bmRcIiBvciBhIFwiSW52YWxpZCBhdXRoZW50aWNhdGlvblwiIGVycm9yLlxyXG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSBhIG5ldyBJRCBuZXh0IHRpbWUuXHJcbiAgICAgICAgICAgIGF3YWl0IHJlbW92ZShpbnN0YWxsYXRpb25zLmFwcENvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkSW5zdGFsbGF0aW9uRW50cnkgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGluc3RhbGxhdGlvbkVudHJ5KSwgeyBhdXRoVG9rZW46IHsgcmVxdWVzdFN0YXR1czogMCAvKiBOT1RfU1RBUlRFRCAqLyB9IH0pO1xyXG4gICAgICAgICAgICBhd2FpdCBzZXQoaW5zdGFsbGF0aW9ucy5hcHBDb25maWcsIHVwZGF0ZWRJbnN0YWxsYXRpb25FbnRyeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaXNFbnRyeVJlZ2lzdGVyZWQoaW5zdGFsbGF0aW9uRW50cnkpIHtcclxuICAgIHJldHVybiAoaW5zdGFsbGF0aW9uRW50cnkgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIGluc3RhbGxhdGlvbkVudHJ5LnJlZ2lzdHJhdGlvblN0YXR1cyA9PT0gMiAvKiBDT01QTEVURUQgKi8pO1xyXG59XHJcbmZ1bmN0aW9uIGlzQXV0aFRva2VuVmFsaWQoYXV0aFRva2VuKSB7XHJcbiAgICByZXR1cm4gKGF1dGhUb2tlbi5yZXF1ZXN0U3RhdHVzID09PSAyIC8qIENPTVBMRVRFRCAqLyAmJlxyXG4gICAgICAgICFpc0F1dGhUb2tlbkV4cGlyZWQoYXV0aFRva2VuKSk7XHJcbn1cclxuZnVuY3Rpb24gaXNBdXRoVG9rZW5FeHBpcmVkKGF1dGhUb2tlbikge1xyXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgIHJldHVybiAobm93IDwgYXV0aFRva2VuLmNyZWF0aW9uVGltZSB8fFxyXG4gICAgICAgIGF1dGhUb2tlbi5jcmVhdGlvblRpbWUgKyBhdXRoVG9rZW4uZXhwaXJlc0luIDwgbm93ICsgVE9LRU5fRVhQSVJBVElPTl9CVUZGRVIpO1xyXG59XHJcbi8qKiBSZXR1cm5zIGFuIHVwZGF0ZWQgSW5zdGFsbGF0aW9uRW50cnkgd2l0aCBhbiBJblByb2dyZXNzQXV0aFRva2VuLiAqL1xyXG5mdW5jdGlvbiBtYWtlQXV0aFRva2VuUmVxdWVzdEluUHJvZ3Jlc3NFbnRyeShvbGRFbnRyeSkge1xyXG4gICAgY29uc3QgaW5Qcm9ncmVzc0F1dGhUb2tlbiA9IHtcclxuICAgICAgICByZXF1ZXN0U3RhdHVzOiAxIC8qIElOX1BST0dSRVNTICovLFxyXG4gICAgICAgIHJlcXVlc3RUaW1lOiBEYXRlLm5vdygpXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb2xkRW50cnkpLCB7IGF1dGhUb2tlbjogaW5Qcm9ncmVzc0F1dGhUb2tlbiB9KTtcclxufVxyXG5mdW5jdGlvbiBoYXNBdXRoVG9rZW5SZXF1ZXN0VGltZWRPdXQoYXV0aFRva2VuKSB7XHJcbiAgICByZXR1cm4gKGF1dGhUb2tlbi5yZXF1ZXN0U3RhdHVzID09PSAxIC8qIElOX1BST0dSRVNTICovICYmXHJcbiAgICAgICAgYXV0aFRva2VuLnJlcXVlc3RUaW1lICsgUEVORElOR19USU1FT1VUX01TIDwgRGF0ZS5ub3coKSk7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBGaXJlYmFzZSBJbnN0YWxsYXRpb24gaWYgdGhlcmUgaXNuJ3Qgb25lIGZvciB0aGUgYXBwIGFuZFxyXG4gKiByZXR1cm5zIHRoZSBJbnN0YWxsYXRpb24gSUQuXHJcbiAqIEBwYXJhbSBpbnN0YWxsYXRpb25zIC0gVGhlIGBJbnN0YWxsYXRpb25zYCBpbnN0YW5jZS5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZ2V0SWQoaW5zdGFsbGF0aW9ucykge1xyXG4gICAgY29uc3QgaW5zdGFsbGF0aW9uc0ltcGwgPSBpbnN0YWxsYXRpb25zO1xyXG4gICAgY29uc3QgeyBpbnN0YWxsYXRpb25FbnRyeSwgcmVnaXN0cmF0aW9uUHJvbWlzZSB9ID0gYXdhaXQgZ2V0SW5zdGFsbGF0aW9uRW50cnkoaW5zdGFsbGF0aW9uc0ltcGwuYXBwQ29uZmlnKTtcclxuICAgIGlmIChyZWdpc3RyYXRpb25Qcm9taXNlKSB7XHJcbiAgICAgICAgcmVnaXN0cmF0aW9uUHJvbWlzZS5jYXRjaChjb25zb2xlLmVycm9yKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIElmIHRoZSBpbnN0YWxsYXRpb24gaXMgYWxyZWFkeSByZWdpc3RlcmVkLCB1cGRhdGUgdGhlIGF1dGhlbnRpY2F0aW9uXHJcbiAgICAgICAgLy8gdG9rZW4gaWYgbmVlZGVkLlxyXG4gICAgICAgIHJlZnJlc2hBdXRoVG9rZW4oaW5zdGFsbGF0aW9uc0ltcGwpLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluc3RhbGxhdGlvbkVudHJ5LmZpZDtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogUmV0dXJucyBhIEZpcmViYXNlIEluc3RhbGxhdGlvbnMgYXV0aCB0b2tlbiwgaWRlbnRpZnlpbmcgdGhlIGN1cnJlbnRcclxuICogRmlyZWJhc2UgSW5zdGFsbGF0aW9uLlxyXG4gKiBAcGFyYW0gaW5zdGFsbGF0aW9ucyAtIFRoZSBgSW5zdGFsbGF0aW9uc2AgaW5zdGFuY2UuXHJcbiAqIEBwYXJhbSBmb3JjZVJlZnJlc2ggLSBGb3JjZSByZWZyZXNoIHJlZ2FyZGxlc3Mgb2YgdG9rZW4gZXhwaXJhdGlvbi5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZ2V0VG9rZW4oaW5zdGFsbGF0aW9ucywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGluc3RhbGxhdGlvbnNJbXBsID0gaW5zdGFsbGF0aW9ucztcclxuICAgIGF3YWl0IGNvbXBsZXRlSW5zdGFsbGF0aW9uUmVnaXN0cmF0aW9uKGluc3RhbGxhdGlvbnNJbXBsLmFwcENvbmZpZyk7XHJcbiAgICAvLyBBdCB0aGlzIHBvaW50IHdlIGVpdGhlciBoYXZlIGEgUmVnaXN0ZXJlZCBJbnN0YWxsYXRpb24gaW4gdGhlIERCLCBvciB3ZSd2ZVxyXG4gICAgLy8gYWxyZWFkeSB0aHJvd24gYW4gZXJyb3IuXHJcbiAgICBjb25zdCBhdXRoVG9rZW4gPSBhd2FpdCByZWZyZXNoQXV0aFRva2VuKGluc3RhbGxhdGlvbnNJbXBsLCBmb3JjZVJlZnJlc2gpO1xyXG4gICAgcmV0dXJuIGF1dGhUb2tlbi50b2tlbjtcclxufVxyXG5hc3luYyBmdW5jdGlvbiBjb21wbGV0ZUluc3RhbGxhdGlvblJlZ2lzdHJhdGlvbihhcHBDb25maWcpIHtcclxuICAgIGNvbnN0IHsgcmVnaXN0cmF0aW9uUHJvbWlzZSB9ID0gYXdhaXQgZ2V0SW5zdGFsbGF0aW9uRW50cnkoYXBwQ29uZmlnKTtcclxuICAgIGlmIChyZWdpc3RyYXRpb25Qcm9taXNlKSB7XHJcbiAgICAgICAgLy8gQSBjcmVhdGVJbnN0YWxsYXRpb24gcmVxdWVzdCBpcyBpbiBwcm9ncmVzcy4gV2FpdCB1bnRpbCBpdCBmaW5pc2hlcy5cclxuICAgICAgICBhd2FpdCByZWdpc3RyYXRpb25Qcm9taXNlO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUluc3RhbGxhdGlvblJlcXVlc3QoYXBwQ29uZmlnLCBpbnN0YWxsYXRpb25FbnRyeSkge1xyXG4gICAgY29uc3QgZW5kcG9pbnQgPSBnZXREZWxldGVFbmRwb2ludChhcHBDb25maWcsIGluc3RhbGxhdGlvbkVudHJ5KTtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSBnZXRIZWFkZXJzV2l0aEF1dGgoYXBwQ29uZmlnLCBpbnN0YWxsYXRpb25FbnRyeSk7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgaGVhZGVyc1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmV0cnlJZlNlcnZlckVycm9yKCgpID0+IGZldGNoKGVuZHBvaW50LCByZXF1ZXN0KSk7XHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgdGhyb3cgYXdhaXQgZ2V0RXJyb3JGcm9tUmVzcG9uc2UoJ0RlbGV0ZSBJbnN0YWxsYXRpb24nLCByZXNwb25zZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGVsZXRlRW5kcG9pbnQoYXBwQ29uZmlnLCB7IGZpZCB9KSB7XHJcbiAgICByZXR1cm4gYCR7Z2V0SW5zdGFsbGF0aW9uc0VuZHBvaW50KGFwcENvbmZpZyl9LyR7ZmlkfWA7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIERlbGV0ZXMgdGhlIEZpcmViYXNlIEluc3RhbGxhdGlvbiBhbmQgYWxsIGFzc29jaWF0ZWQgZGF0YS5cclxuICogQHBhcmFtIGluc3RhbGxhdGlvbnMgLSBUaGUgYEluc3RhbGxhdGlvbnNgIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVJbnN0YWxsYXRpb25zKGluc3RhbGxhdGlvbnMpIHtcclxuICAgIGNvbnN0IHsgYXBwQ29uZmlnIH0gPSBpbnN0YWxsYXRpb25zO1xyXG4gICAgY29uc3QgZW50cnkgPSBhd2FpdCB1cGRhdGUoYXBwQ29uZmlnLCBvbGRFbnRyeSA9PiB7XHJcbiAgICAgICAgaWYgKG9sZEVudHJ5ICYmIG9sZEVudHJ5LnJlZ2lzdHJhdGlvblN0YXR1cyA9PT0gMCAvKiBOT1RfU1RBUlRFRCAqLykge1xyXG4gICAgICAgICAgICAvLyBEZWxldGUgdGhlIHVucmVnaXN0ZXJlZCBlbnRyeSB3aXRob3V0IHNlbmRpbmcgYSBkZWxldGVJbnN0YWxsYXRpb24gcmVxdWVzdC5cclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9sZEVudHJ5O1xyXG4gICAgfSk7XHJcbiAgICBpZiAoZW50cnkpIHtcclxuICAgICAgICBpZiAoZW50cnkucmVnaXN0cmF0aW9uU3RhdHVzID09PSAxIC8qIElOX1BST0dSRVNTICovKSB7XHJcbiAgICAgICAgICAgIC8vIENhbid0IGRlbGV0ZSB3aGlsZSB0cnlpbmcgdG8gcmVnaXN0ZXIuXHJcbiAgICAgICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiZGVsZXRlLXBlbmRpbmctcmVnaXN0cmF0aW9uXCIgLyogREVMRVRFX1BFTkRJTkdfUkVHSVNUUkFUSU9OICovKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZW50cnkucmVnaXN0cmF0aW9uU3RhdHVzID09PSAyIC8qIENPTVBMRVRFRCAqLykge1xyXG4gICAgICAgICAgICBpZiAoIW5hdmlnYXRvci5vbkxpbmUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiYXBwLW9mZmxpbmVcIiAvKiBBUFBfT0ZGTElORSAqLyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkZWxldGVJbnN0YWxsYXRpb25SZXF1ZXN0KGFwcENvbmZpZywgZW50cnkpO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgcmVtb3ZlKGFwcENvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFNldHMgYSBuZXcgY2FsbGJhY2sgdGhhdCB3aWxsIGdldCBjYWxsZWQgd2hlbiBJbnN0YWxsYXRpb24gSUQgY2hhbmdlcy5cclxuICogUmV0dXJucyBhbiB1bnN1YnNjcmliZSBmdW5jdGlvbiB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBjYWxsYmFjayB3aGVuIGNhbGxlZC5cclxuICogQHBhcmFtIGluc3RhbGxhdGlvbnMgLSBUaGUgYEluc3RhbGxhdGlvbnNgIGluc3RhbmNlLlxyXG4gKiBAcGFyYW0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBpbnZva2VkIHdoZW4gRklEIGNoYW5nZXMuXHJcbiAqIEByZXR1cm5zIEEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHVuc3Vic2NyaWJlLlxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5mdW5jdGlvbiBvbklkQ2hhbmdlKGluc3RhbGxhdGlvbnMsIGNhbGxiYWNrKSB7XHJcbiAgICBjb25zdCB7IGFwcENvbmZpZyB9ID0gaW5zdGFsbGF0aW9ucztcclxuICAgIGFkZENhbGxiYWNrKGFwcENvbmZpZywgY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICByZW1vdmVDYWxsYmFjayhhcHBDb25maWcsIGNhbGxiYWNrKTtcclxuICAgIH07XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFJldHVybnMgYW4gaW5zdGFuY2Ugb2Yge0BsaW5rIEluc3RhbGxhdGlvbnN9IGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW5cclxuICoge0BsaW5rIEBmaXJlYmFzZS9hcHAjRmlyZWJhc2VBcHB9IGluc3RhbmNlLlxyXG4gKiBAcGFyYW0gYXBwIC0gVGhlIHtAbGluayBAZmlyZWJhc2UvYXBwI0ZpcmViYXNlQXBwfSBpbnN0YW5jZS5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SW5zdGFsbGF0aW9ucyhhcHAgPSBnZXRBcHAoKSkge1xyXG4gICAgY29uc3QgaW5zdGFsbGF0aW9uc0ltcGwgPSBfZ2V0UHJvdmlkZXIoYXBwLCAnaW5zdGFsbGF0aW9ucycpLmdldEltbWVkaWF0ZSgpO1xyXG4gICAgcmV0dXJuIGluc3RhbGxhdGlvbnNJbXBsO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmZ1bmN0aW9uIGV4dHJhY3RBcHBDb25maWcoYXBwKSB7XHJcbiAgICBpZiAoIWFwcCB8fCAhYXBwLm9wdGlvbnMpIHtcclxuICAgICAgICB0aHJvdyBnZXRNaXNzaW5nVmFsdWVFcnJvcignQXBwIENvbmZpZ3VyYXRpb24nKTtcclxuICAgIH1cclxuICAgIGlmICghYXBwLm5hbWUpIHtcclxuICAgICAgICB0aHJvdyBnZXRNaXNzaW5nVmFsdWVFcnJvcignQXBwIE5hbWUnKTtcclxuICAgIH1cclxuICAgIC8vIFJlcXVpcmVkIGFwcCBjb25maWcga2V5c1xyXG4gICAgY29uc3QgY29uZmlnS2V5cyA9IFtcclxuICAgICAgICAncHJvamVjdElkJyxcclxuICAgICAgICAnYXBpS2V5JyxcclxuICAgICAgICAnYXBwSWQnXHJcbiAgICBdO1xyXG4gICAgZm9yIChjb25zdCBrZXlOYW1lIG9mIGNvbmZpZ0tleXMpIHtcclxuICAgICAgICBpZiAoIWFwcC5vcHRpb25zW2tleU5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRocm93IGdldE1pc3NpbmdWYWx1ZUVycm9yKGtleU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYXBwTmFtZTogYXBwLm5hbWUsXHJcbiAgICAgICAgcHJvamVjdElkOiBhcHAub3B0aW9ucy5wcm9qZWN0SWQsXHJcbiAgICAgICAgYXBpS2V5OiBhcHAub3B0aW9ucy5hcGlLZXksXHJcbiAgICAgICAgYXBwSWQ6IGFwcC5vcHRpb25zLmFwcElkXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGdldE1pc3NpbmdWYWx1ZUVycm9yKHZhbHVlTmFtZSkge1xyXG4gICAgcmV0dXJuIEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwibWlzc2luZy1hcHAtY29uZmlnLXZhbHVlc1wiIC8qIE1JU1NJTkdfQVBQX0NPTkZJR19WQUxVRVMgKi8sIHtcclxuICAgICAgICB2YWx1ZU5hbWVcclxuICAgIH0pO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmNvbnN0IElOU1RBTExBVElPTlNfTkFNRSA9ICdpbnN0YWxsYXRpb25zJztcclxuY29uc3QgSU5TVEFMTEFUSU9OU19OQU1FX0lOVEVSTkFMID0gJ2luc3RhbGxhdGlvbnMtaW50ZXJuYWwnO1xyXG5jb25zdCBwdWJsaWNGYWN0b3J5ID0gKGNvbnRhaW5lcikgPT4ge1xyXG4gICAgY29uc3QgYXBwID0gY29udGFpbmVyLmdldFByb3ZpZGVyKCdhcHAnKS5nZXRJbW1lZGlhdGUoKTtcclxuICAgIC8vIFRocm93cyBpZiBhcHAgaXNuJ3QgY29uZmlndXJlZCBwcm9wZXJseS5cclxuICAgIGNvbnN0IGFwcENvbmZpZyA9IGV4dHJhY3RBcHBDb25maWcoYXBwKTtcclxuICAgIGNvbnN0IHBsYXRmb3JtTG9nZ2VyUHJvdmlkZXIgPSBfZ2V0UHJvdmlkZXIoYXBwLCAncGxhdGZvcm0tbG9nZ2VyJyk7XHJcbiAgICBjb25zdCBpbnN0YWxsYXRpb25zSW1wbCA9IHtcclxuICAgICAgICBhcHAsXHJcbiAgICAgICAgYXBwQ29uZmlnLFxyXG4gICAgICAgIHBsYXRmb3JtTG9nZ2VyUHJvdmlkZXIsXHJcbiAgICAgICAgX2RlbGV0ZTogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH07XHJcbiAgICByZXR1cm4gaW5zdGFsbGF0aW9uc0ltcGw7XHJcbn07XHJcbmNvbnN0IGludGVybmFsRmFjdG9yeSA9IChjb250YWluZXIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IGNvbnRhaW5lci5nZXRQcm92aWRlcignYXBwJykuZ2V0SW1tZWRpYXRlKCk7XHJcbiAgICAvLyBJbnRlcm5hbCBGSVMgaW5zdGFuY2UgcmVsaWVzIG9uIHB1YmxpYyBGSVMgaW5zdGFuY2UuXHJcbiAgICBjb25zdCBpbnN0YWxsYXRpb25zID0gX2dldFByb3ZpZGVyKGFwcCwgSU5TVEFMTEFUSU9OU19OQU1FKS5nZXRJbW1lZGlhdGUoKTtcclxuICAgIGNvbnN0IGluc3RhbGxhdGlvbnNJbnRlcm5hbCA9IHtcclxuICAgICAgICBnZXRJZDogKCkgPT4gZ2V0SWQoaW5zdGFsbGF0aW9ucyksXHJcbiAgICAgICAgZ2V0VG9rZW46IChmb3JjZVJlZnJlc2gpID0+IGdldFRva2VuKGluc3RhbGxhdGlvbnMsIGZvcmNlUmVmcmVzaClcclxuICAgIH07XHJcbiAgICByZXR1cm4gaW5zdGFsbGF0aW9uc0ludGVybmFsO1xyXG59O1xyXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbGxhdGlvbnMoKSB7XHJcbiAgICBfcmVnaXN0ZXJDb21wb25lbnQobmV3IENvbXBvbmVudChJTlNUQUxMQVRJT05TX05BTUUsIHB1YmxpY0ZhY3RvcnksIFwiUFVCTElDXCIgLyogUFVCTElDICovKSk7XHJcbiAgICBfcmVnaXN0ZXJDb21wb25lbnQobmV3IENvbXBvbmVudChJTlNUQUxMQVRJT05TX05BTUVfSU5URVJOQUwsIGludGVybmFsRmFjdG9yeSwgXCJQUklWQVRFXCIgLyogUFJJVkFURSAqLykpO1xyXG59XG5cbi8qKlxyXG4gKiBGaXJlYmFzZSBJbnN0YWxsYXRpb25zXHJcbiAqXHJcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxyXG4gKi9cclxucmVnaXN0ZXJJbnN0YWxsYXRpb25zKCk7XHJcbnJlZ2lzdGVyVmVyc2lvbihuYW1lLCB2ZXJzaW9uKTtcclxuLy8gQlVJTERfVEFSR0VUIHdpbGwgYmUgcmVwbGFjZWQgYnkgdmFsdWVzIGxpa2UgZXNtNSwgZXNtMjAxNywgY2pzNSwgZXRjIGR1cmluZyB0aGUgY29tcGlsYXRpb25cclxucmVnaXN0ZXJWZXJzaW9uKG5hbWUsIHZlcnNpb24sICdlc20yMDE3Jyk7XG5cbmV4cG9ydCB7IGRlbGV0ZUluc3RhbGxhdGlvbnMsIGdldElkLCBnZXRJbnN0YWxsYXRpb25zLCBnZXRUb2tlbiwgb25JZENoYW5nZSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXNtMjAxNy5qcy5tYXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==