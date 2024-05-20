"use strict";
(self["webpackChunkfirebase_r"] = self["webpackChunkfirebase_r"] || []).push([["analytics"],{

/***/ "./srcjs/components/analytics.js":
/*!***************************************!*\
  !*** ./srcjs/components/analytics.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/analytics */ "./node_modules/firebase/analytics/dist/esm/index.esm.js");



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

module.exports = Shiny;

/***/ }),

/***/ "./node_modules/@firebase/analytics/dist/esm/index.esm2017.js":
/*!********************************************************************!*\
  !*** ./node_modules/@firebase/analytics/dist/esm/index.esm2017.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAnalytics": () => (/* binding */ getAnalytics),
/* harmony export */   "initializeAnalytics": () => (/* binding */ initializeAnalytics),
/* harmony export */   "isSupported": () => (/* binding */ isSupported),
/* harmony export */   "logEvent": () => (/* binding */ logEvent),
/* harmony export */   "setAnalyticsCollectionEnabled": () => (/* binding */ setAnalyticsCollectionEnabled),
/* harmony export */   "setConsent": () => (/* binding */ setConsent),
/* harmony export */   "setCurrentScreen": () => (/* binding */ setCurrentScreen),
/* harmony export */   "setDefaultEventParameters": () => (/* binding */ setDefaultEventParameters),
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
    gtagCore("config" /* GtagCommand.CONFIG */, measurementId, gtagParams);
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
        gtagCore("event" /* GtagCommand.EVENT */, measurementId, gtagParams || {});
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
            if (command === "event" /* GtagCommand.EVENT */) {
                // If EVENT, second arg must be measurementId.
                await gtagOnEvent(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, idOrNameOrParams, gtagParams);
            }
            else if (command === "config" /* GtagCommand.CONFIG */) {
                // If CONFIG, second arg must be measurementId.
                await gtagOnConfig(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, idOrNameOrParams, gtagParams);
            }
            else if (command === "consent" /* GtagCommand.CONSENT */) {
                // If CONFIG, second arg must be measurementId.
                gtagCore("consent" /* GtagCommand.CONSENT */, 'update', gtagParams);
            }
            else {
                // If SET, second arg must be params.
                gtagCore("set" /* GtagCommand.SET */, idOrNameOrParams);
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
 * Returns the script tag in the DOM matching both the gtag url pattern
 * and the provided data layer name.
 */
function findGtagScriptOnPage(dataLayerName) {
    const scriptTags = window.document.getElementsByTagName('script');
    for (const tag of Object.values(scriptTags)) {
        if (tag.src &&
            tag.src.includes(GTAG_URL) &&
            tag.src.includes(dataLayerName)) {
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
    ["already-exists" /* AnalyticsError.ALREADY_EXISTS */]: 'A Firebase Analytics instance with the appId {$id} ' +
        ' already exists. ' +
        'Only one Firebase Analytics instance can be created for each appId.',
    ["already-initialized" /* AnalyticsError.ALREADY_INITIALIZED */]: 'initializeAnalytics() cannot be called again with different options than those ' +
        'it was initially called with. It can be called again with the same options to ' +
        'return the existing instance, or getAnalytics() can be used ' +
        'to get a reference to the already-intialized instance.',
    ["already-initialized-settings" /* AnalyticsError.ALREADY_INITIALIZED_SETTINGS */]: 'Firebase Analytics has already been initialized.' +
        'settings() must be called before initializing any Analytics instance' +
        'or it will have no effect.',
    ["interop-component-reg-failed" /* AnalyticsError.INTEROP_COMPONENT_REG_FAILED */]: 'Firebase Analytics Interop Component failed to instantiate: {$reason}',
    ["invalid-analytics-context" /* AnalyticsError.INVALID_ANALYTICS_CONTEXT */]: 'Firebase Analytics is not supported in this environment. ' +
        'Wrap initialization of analytics in analytics.isSupported() ' +
        'to prevent initialization in unsupported environments. Details: {$errorInfo}',
    ["indexeddb-unavailable" /* AnalyticsError.INDEXEDDB_UNAVAILABLE */]: 'IndexedDB unavailable or restricted in this environment. ' +
        'Wrap initialization of analytics in analytics.isSupported() ' +
        'to prevent initialization in unsupported environments. Details: {$errorInfo}',
    ["fetch-throttle" /* AnalyticsError.FETCH_THROTTLE */]: 'The config fetch request timed out while in an exponential backoff state.' +
        ' Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',
    ["config-fetch-failed" /* AnalyticsError.CONFIG_FETCH_FAILED */]: 'Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}',
    ["no-api-key" /* AnalyticsError.NO_API_KEY */]: 'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field to' +
        'contain a valid API key.',
    ["no-app-id" /* AnalyticsError.NO_APP_ID */]: 'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field to' +
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
        throw ERROR_FACTORY.create("config-fetch-failed" /* AnalyticsError.CONFIG_FETCH_FAILED */, {
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
        throw ERROR_FACTORY.create("no-app-id" /* AnalyticsError.NO_APP_ID */);
    }
    if (!apiKey) {
        if (measurementId) {
            return {
                measurementId,
                appId
            };
        }
        throw ERROR_FACTORY.create("no-api-key" /* AnalyticsError.NO_API_KEY */);
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
    var _a;
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
                ` provided in the "measurementId" field in the local Firebase config. [${e === null || e === void 0 ? void 0 : e.message}]`);
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
        const error = e;
        if (!isRetriableError(error)) {
            retryData.deleteThrottleMetadata(appId);
            if (measurementId) {
                logger.warn(`Failed to fetch this Firebase app's measurement ID from the server.` +
                    ` Falling back to the measurement ID ${measurementId}` +
                    ` provided in the "measurementId" field in the local Firebase config. [${error === null || error === void 0 ? void 0 : error.message}]`);
                return { appId, measurementId };
            }
            else {
                throw e;
            }
        }
        const backoffMillis = Number((_a = error === null || error === void 0 ? void 0 : error.customData) === null || _a === void 0 ? void 0 : _a.httpStatus) === 503
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
            reject(ERROR_FACTORY.create("fetch-throttle" /* AnalyticsError.FETCH_THROTTLE */, {
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
 * Event parameters to set on 'gtag' during initialization.
 */
let defaultEventParametersForInit;
/**
 * Logs an analytics event through the Firebase SDK.
 *
 * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
 * @param eventName Google Analytics event name, choose from standard list or use a custom string.
 * @param eventParams Analytics event parameters.
 */
async function logEvent$1(gtagFunction, initializationPromise, eventName, eventParams, options) {
    if (options && options.global) {
        gtagFunction("event" /* GtagCommand.EVENT */, eventName, eventParams);
        return;
    }
    else {
        const measurementId = await initializationPromise;
        const params = Object.assign(Object.assign({}, eventParams), { 'send_to': measurementId });
        gtagFunction("event" /* GtagCommand.EVENT */, eventName, params);
    }
}
/**
 * Set screen_name parameter for this Google Analytics ID.
 *
 * @deprecated Use {@link logEvent} with `eventName` as 'screen_view' and add relevant `eventParams`.
 * See {@link https://firebase.google.com/docs/analytics/screenviews | Track Screenviews}.
 *
 * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
 * @param screenName Screen name string to set.
 */
async function setCurrentScreen$1(gtagFunction, initializationPromise, screenName, options) {
    if (options && options.global) {
        gtagFunction("set" /* GtagCommand.SET */, { 'screen_name': screenName });
        return Promise.resolve();
    }
    else {
        const measurementId = await initializationPromise;
        gtagFunction("config" /* GtagCommand.CONFIG */, measurementId, {
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
        gtagFunction("set" /* GtagCommand.SET */, { 'user_id': id });
        return Promise.resolve();
    }
    else {
        const measurementId = await initializationPromise;
        gtagFunction("config" /* GtagCommand.CONFIG */, measurementId, {
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
        gtagFunction("set" /* GtagCommand.SET */, flatProperties);
        return Promise.resolve();
    }
    else {
        const measurementId = await initializationPromise;
        gtagFunction("config" /* GtagCommand.CONFIG */, measurementId, {
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
/**
 * Consent parameters to default to during 'gtag' initialization.
 */
let defaultConsentSettingsForInit;
/**
 * Sets the variable {@link defaultConsentSettingsForInit} for use in the initialization of
 * analytics.
 *
 * @param consentSettings Maps the applicable end user consent state for gtag.js.
 */
function _setConsentDefaultForInit(consentSettings) {
    defaultConsentSettingsForInit = consentSettings;
}
/**
 * Sets the variable `defaultEventParametersForInit` for use in the initialization of
 * analytics.
 *
 * @param customParams Any custom params the user may pass to gtag.js.
 */
function _setDefaultEventParametersForInit(customParams) {
    defaultEventParametersForInit = customParams;
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
        logger.warn(ERROR_FACTORY.create("indexeddb-unavailable" /* AnalyticsError.INDEXEDDB_UNAVAILABLE */, {
            errorInfo: 'IndexedDB is not available in this environment.'
        }).message);
        return false;
    }
    else {
        try {
            await (0,_firebase_util__WEBPACK_IMPORTED_MODULE_2__.validateIndexedDBOpenable)();
        }
        catch (e) {
            logger.warn(ERROR_FACTORY.create("indexeddb-unavailable" /* AnalyticsError.INDEXEDDB_UNAVAILABLE */, {
                errorInfo: e === null || e === void 0 ? void 0 : e.toString()
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
    // Detect if user has already put the gtag <script> tag on this page with the passed in
    // data layer name.
    if (!findGtagScriptOnPage(dataLayerName)) {
        insertScriptTag(dataLayerName, dynamicConfig.measurementId);
    }
    // Detects if there are consent settings that need to be configured.
    if (defaultConsentSettingsForInit) {
        gtagCore("consent" /* GtagCommand.CONSENT */, 'default', defaultConsentSettingsForInit);
        _setConsentDefaultForInit(undefined);
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
    gtagCore("config" /* GtagCommand.CONFIG */, dynamicConfig.measurementId, configProperties);
    // Detects if there is data that will be set on every event logged from the SDK.
    if (defaultEventParametersForInit) {
        gtagCore("set" /* GtagCommand.SET */, defaultEventParametersForInit);
        _setDefaultEventParametersForInit(undefined);
    }
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
        throw ERROR_FACTORY.create("already-initialized" /* AnalyticsError.ALREADY_INITIALIZED */);
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
        const err = ERROR_FACTORY.create("invalid-analytics-context" /* AnalyticsError.INVALID_ANALYTICS_CONTEXT */, {
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
        throw ERROR_FACTORY.create("no-app-id" /* AnalyticsError.NO_APP_ID */);
    }
    if (!app.options.apiKey) {
        if (app.options.measurementId) {
            logger.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest` +
                ` measurement ID for this Firebase app. Falling back to the measurement ID ${app.options.measurementId}` +
                ` provided in the "measurementId" field in the local Firebase config.`);
        }
        else {
            throw ERROR_FACTORY.create("no-api-key" /* AnalyticsError.NO_API_KEY */);
        }
    }
    if (initializationPromisesMap[appId] != null) {
        throw ERROR_FACTORY.create("already-exists" /* AnalyticsError.ALREADY_EXISTS */, {
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
            throw ERROR_FACTORY.create("already-initialized" /* AnalyticsError.ALREADY_INITIALIZED */);
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
 * @deprecated Use {@link logEvent} with `eventName` as 'screen_view' and add relevant `eventParams`.
 * See {@link https://firebase.google.com/docs/analytics/screenviews | Track Screenviews}.
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
 * Adds data that will be set on every event logged from the SDK, including automatic ones.
 * With gtag's "set" command, the values passed persist on the current page and are passed with
 * all subsequent events.
 * @public
 * @param customParams - Any custom params the user may pass to gtag.js.
 */
function setDefaultEventParameters(customParams) {
    // Check if reference to existing gtag function on window object exists
    if (wrappedGtagFunction) {
        wrappedGtagFunction("set" /* GtagCommand.SET */, customParams);
    }
    else {
        _setDefaultEventParametersForInit(customParams);
    }
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
/**
 * Sets the applicable end user consent state for this web app across all gtag references once
 * Firebase Analytics is initialized.
 *
 * Use the {@link ConsentSettings} to specify individual consent type values. By default consent
 * types are set to "granted".
 * @public
 * @param consentSettings - Maps the applicable end user consent state for gtag.js.
 */
function setConsent(consentSettings) {
    // Check if reference to existing gtag function on window object exists
    if (wrappedGtagFunction) {
        wrappedGtagFunction("consent" /* GtagCommand.CONSENT */, 'update', consentSettings);
    }
    else {
        _setConsentDefaultForInit(consentSettings);
    }
}

const name = "@firebase/analytics";
const version = "0.9.4";

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
    }, "PUBLIC" /* ComponentType.PUBLIC */));
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._registerComponent)(new _firebase_component__WEBPACK_IMPORTED_MODULE_3__.Component('analytics-internal', internalFactory, "PRIVATE" /* ComponentType.PRIVATE */));
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
            throw ERROR_FACTORY.create("interop-component-reg-failed" /* AnalyticsError.INTEROP_COMPONENT_REG_FAILED */, {
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
/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! idb */ "./node_modules/idb/build/index.js");





const name = "@firebase/installations";
const version = "0.6.4";

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
    ["missing-app-config-values" /* ErrorCode.MISSING_APP_CONFIG_VALUES */]: 'Missing App configuration value: "{$valueName}"',
    ["not-registered" /* ErrorCode.NOT_REGISTERED */]: 'Firebase Installation is not registered.',
    ["installation-not-found" /* ErrorCode.INSTALLATION_NOT_FOUND */]: 'Firebase Installation not found.',
    ["request-failed" /* ErrorCode.REQUEST_FAILED */]: '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
    ["app-offline" /* ErrorCode.APP_OFFLINE */]: 'Could not process request. Application offline.',
    ["delete-pending-registration" /* ErrorCode.DELETE_PENDING_REGISTRATION */]: "Can't delete installation while there is a pending registration request."
};
const ERROR_FACTORY = new _firebase_util__WEBPACK_IMPORTED_MODULE_2__.ErrorFactory(SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);
/** Returns true if error is a FirebaseError that is based on an error from the server. */
function isServerError(error) {
    return (error instanceof _firebase_util__WEBPACK_IMPORTED_MODULE_2__.FirebaseError &&
        error.code.includes("request-failed" /* ErrorCode.REQUEST_FAILED */));
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
        requestStatus: 2 /* RequestStatus.COMPLETED */,
        expiresIn: getExpiresInFromResponseExpiresIn(response.expiresIn),
        creationTime: Date.now()
    };
}
async function getErrorFromResponse(requestName, response) {
    const responseJson = await response.json();
    const errorData = responseJson.error;
    return ERROR_FACTORY.create("request-failed" /* ErrorCode.REQUEST_FAILED */, {
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
async function createInstallationRequest({ appConfig, heartbeatServiceProvider }, { fid }) {
    const endpoint = getInstallationsEndpoint(appConfig);
    const headers = getHeaders(appConfig);
    // If heartbeat service exists, add the heartbeat string to the header.
    const heartbeatService = heartbeatServiceProvider.getImmediate({
        optional: true
    });
    if (heartbeatService) {
        const heartbeatsHeader = await heartbeatService.getHeartbeatsHeader();
        if (heartbeatsHeader) {
            headers.append('x-firebase-client', heartbeatsHeader);
        }
    }
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
            registrationStatus: 2 /* RequestStatus.COMPLETED */,
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
        dbPromise = (0,idb__WEBPACK_IMPORTED_MODULE_3__.openDB)(DATABASE_NAME, DATABASE_VERSION, {
            upgrade: (db, oldVersion) => {
                // We don't use 'break' in this switch statement, the fall-through
                // behavior is what we want, because if there are multiple versions between
                // the old version and the current version, we want ALL the migrations
                // that correspond to those versions to run, not only the last one.
                // eslint-disable-next-line default-case
                switch (oldVersion) {
                    case 0:
                        db.createObjectStore(OBJECT_STORE_NAME);
                }
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
    const oldValue = (await objectStore.get(key));
    await objectStore.put(value, key);
    await tx.done;
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
    await tx.done;
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
    const oldValue = (await store.get(key));
    const newValue = updateFn(oldValue);
    if (newValue === undefined) {
        await store.delete(key);
    }
    else {
        await store.put(newValue, key);
    }
    await tx.done;
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
async function getInstallationEntry(installations) {
    let registrationPromise;
    const installationEntry = await update(installations.appConfig, oldEntry => {
        const installationEntry = updateOrCreateInstallationEntry(oldEntry);
        const entryWithPromise = triggerRegistrationIfNecessary(installations, installationEntry);
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
        registrationStatus: 0 /* RequestStatus.NOT_STARTED */
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
function triggerRegistrationIfNecessary(installations, installationEntry) {
    if (installationEntry.registrationStatus === 0 /* RequestStatus.NOT_STARTED */) {
        if (!navigator.onLine) {
            // Registration required but app is offline.
            const registrationPromiseWithError = Promise.reject(ERROR_FACTORY.create("app-offline" /* ErrorCode.APP_OFFLINE */));
            return {
                installationEntry,
                registrationPromise: registrationPromiseWithError
            };
        }
        // Try registering. Change status to IN_PROGRESS.
        const inProgressEntry = {
            fid: installationEntry.fid,
            registrationStatus: 1 /* RequestStatus.IN_PROGRESS */,
            registrationTime: Date.now()
        };
        const registrationPromise = registerInstallation(installations, inProgressEntry);
        return { installationEntry: inProgressEntry, registrationPromise };
    }
    else if (installationEntry.registrationStatus === 1 /* RequestStatus.IN_PROGRESS */) {
        return {
            installationEntry,
            registrationPromise: waitUntilFidRegistration(installations)
        };
    }
    else {
        return { installationEntry };
    }
}
/** This will be executed only once for each new Firebase Installation. */
async function registerInstallation(installations, installationEntry) {
    try {
        const registeredInstallationEntry = await createInstallationRequest(installations, installationEntry);
        return set(installations.appConfig, registeredInstallationEntry);
    }
    catch (e) {
        if (isServerError(e) && e.customData.serverCode === 409) {
            // Server returned a "FID can not be used" error.
            // Generate a new ID next time.
            await remove(installations.appConfig);
        }
        else {
            // Registration failed. Set FID as not registered.
            await set(installations.appConfig, {
                fid: installationEntry.fid,
                registrationStatus: 0 /* RequestStatus.NOT_STARTED */
            });
        }
        throw e;
    }
}
/** Call if FID registration is pending in another request. */
async function waitUntilFidRegistration(installations) {
    // Unfortunately, there is no way of reliably observing when a value in
    // IndexedDB changes (yet, see https://github.com/WICG/indexed-db-observers),
    // so we need to poll.
    let entry = await updateInstallationRequest(installations.appConfig);
    while (entry.registrationStatus === 1 /* RequestStatus.IN_PROGRESS */) {
        // createInstallation request still in progress.
        await sleep(100);
        entry = await updateInstallationRequest(installations.appConfig);
    }
    if (entry.registrationStatus === 0 /* RequestStatus.NOT_STARTED */) {
        // The request timed out or failed in a different call. Try again.
        const { installationEntry, registrationPromise } = await getInstallationEntry(installations);
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
            throw ERROR_FACTORY.create("installation-not-found" /* ErrorCode.INSTALLATION_NOT_FOUND */);
        }
        return clearTimedOutRequest(oldEntry);
    });
}
function clearTimedOutRequest(entry) {
    if (hasInstallationRequestTimedOut(entry)) {
        return {
            fid: entry.fid,
            registrationStatus: 0 /* RequestStatus.NOT_STARTED */
        };
    }
    return entry;
}
function hasInstallationRequestTimedOut(installationEntry) {
    return (installationEntry.registrationStatus === 1 /* RequestStatus.IN_PROGRESS */ &&
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
async function generateAuthTokenRequest({ appConfig, heartbeatServiceProvider }, installationEntry) {
    const endpoint = getGenerateAuthTokenEndpoint(appConfig, installationEntry);
    const headers = getHeadersWithAuth(appConfig, installationEntry);
    // If heartbeat service exists, add the heartbeat string to the header.
    const heartbeatService = heartbeatServiceProvider.getImmediate({
        optional: true
    });
    if (heartbeatService) {
        const heartbeatsHeader = await heartbeatService.getHeartbeatsHeader();
        if (heartbeatsHeader) {
            headers.append('x-firebase-client', heartbeatsHeader);
        }
    }
    const body = {
        installation: {
            sdkVersion: PACKAGE_VERSION,
            appId: appConfig.appId
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
            throw ERROR_FACTORY.create("not-registered" /* ErrorCode.NOT_REGISTERED */);
        }
        const oldAuthToken = oldEntry.authToken;
        if (!forceRefresh && isAuthTokenValid(oldAuthToken)) {
            // There is a valid token in the DB.
            return oldEntry;
        }
        else if (oldAuthToken.requestStatus === 1 /* RequestStatus.IN_PROGRESS */) {
            // There already is a token request in progress.
            tokenPromise = waitUntilAuthTokenRequest(installations, forceRefresh);
            return oldEntry;
        }
        else {
            // No token or token expired.
            if (!navigator.onLine) {
                throw ERROR_FACTORY.create("app-offline" /* ErrorCode.APP_OFFLINE */);
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
    while (entry.authToken.requestStatus === 1 /* RequestStatus.IN_PROGRESS */) {
        // generateAuthToken still in progress.
        await sleep(100);
        entry = await updateAuthTokenRequest(installations.appConfig);
    }
    const authToken = entry.authToken;
    if (authToken.requestStatus === 0 /* RequestStatus.NOT_STARTED */) {
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
            throw ERROR_FACTORY.create("not-registered" /* ErrorCode.NOT_REGISTERED */);
        }
        const oldAuthToken = oldEntry.authToken;
        if (hasAuthTokenRequestTimedOut(oldAuthToken)) {
            return Object.assign(Object.assign({}, oldEntry), { authToken: { requestStatus: 0 /* RequestStatus.NOT_STARTED */ } });
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
            const updatedInstallationEntry = Object.assign(Object.assign({}, installationEntry), { authToken: { requestStatus: 0 /* RequestStatus.NOT_STARTED */ } });
            await set(installations.appConfig, updatedInstallationEntry);
        }
        throw e;
    }
}
function isEntryRegistered(installationEntry) {
    return (installationEntry !== undefined &&
        installationEntry.registrationStatus === 2 /* RequestStatus.COMPLETED */);
}
function isAuthTokenValid(authToken) {
    return (authToken.requestStatus === 2 /* RequestStatus.COMPLETED */ &&
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
        requestStatus: 1 /* RequestStatus.IN_PROGRESS */,
        requestTime: Date.now()
    };
    return Object.assign(Object.assign({}, oldEntry), { authToken: inProgressAuthToken });
}
function hasAuthTokenRequestTimedOut(authToken) {
    return (authToken.requestStatus === 1 /* RequestStatus.IN_PROGRESS */ &&
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
    const { installationEntry, registrationPromise } = await getInstallationEntry(installationsImpl);
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
    await completeInstallationRegistration(installationsImpl);
    // At this point we either have a Registered Installation in the DB, or we've
    // already thrown an error.
    const authToken = await refreshAuthToken(installationsImpl, forceRefresh);
    return authToken.token;
}
async function completeInstallationRegistration(installations) {
    const { registrationPromise } = await getInstallationEntry(installations);
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
        if (oldEntry && oldEntry.registrationStatus === 0 /* RequestStatus.NOT_STARTED */) {
            // Delete the unregistered entry without sending a deleteInstallation request.
            return undefined;
        }
        return oldEntry;
    });
    if (entry) {
        if (entry.registrationStatus === 1 /* RequestStatus.IN_PROGRESS */) {
            // Can't delete while trying to register.
            throw ERROR_FACTORY.create("delete-pending-registration" /* ErrorCode.DELETE_PENDING_REGISTRATION */);
        }
        else if (entry.registrationStatus === 2 /* RequestStatus.COMPLETED */) {
            if (!navigator.onLine) {
                throw ERROR_FACTORY.create("app-offline" /* ErrorCode.APP_OFFLINE */);
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
    return ERROR_FACTORY.create("missing-app-config-values" /* ErrorCode.MISSING_APP_CONFIG_VALUES */, {
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
    const heartbeatServiceProvider = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._getProvider)(app, 'heartbeat');
    const installationsImpl = {
        app,
        appConfig,
        heartbeatServiceProvider,
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
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._registerComponent)(new _firebase_component__WEBPACK_IMPORTED_MODULE_1__.Component(INSTALLATIONS_NAME, publicFactory, "PUBLIC" /* ComponentType.PUBLIC */));
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._registerComponent)(new _firebase_component__WEBPACK_IMPORTED_MODULE_1__.Component(INSTALLATIONS_NAME_INTERNAL, internalFactory, "PRIVATE" /* ComponentType.PRIVATE */));
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


/***/ }),

/***/ "./node_modules/firebase/analytics/dist/esm/index.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/firebase/analytics/dist/esm/index.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAnalytics": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.getAnalytics),
/* harmony export */   "initializeAnalytics": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.initializeAnalytics),
/* harmony export */   "isSupported": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.isSupported),
/* harmony export */   "logEvent": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.logEvent),
/* harmony export */   "setAnalyticsCollectionEnabled": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.setAnalyticsCollectionEnabled),
/* harmony export */   "setConsent": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.setConsent),
/* harmony export */   "setCurrentScreen": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.setCurrentScreen),
/* harmony export */   "setDefaultEventParameters": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.setDefaultEventParameters),
/* harmony export */   "setUserId": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.setUserId),
/* harmony export */   "setUserProperties": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.setUserProperties),
/* harmony export */   "settings": () => (/* reexport safe */ _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__.settings)
/* harmony export */ });
/* harmony import */ var _firebase_analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/analytics */ "./node_modules/@firebase/analytics/dist/esm/index.esm2017.js");

//# sourceMappingURL=index.esm.js.map


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["auth"], () => (__webpack_exec__("./srcjs/components/analytics.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBYztBQUNnRTs7QUFFOUU7O0FBRUE7QUFDQTtBQUNBLGNBQWMsZ0VBQVk7QUFDMUIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBRSw0REFBUTtBQUNWO0FBQ0E7O0FBRUEsQ0FBQyw0REFBUTtBQUNULENBQUM7O0FBRUQ7QUFDQSxDQUFDLHFFQUFpQjtBQUNsQixDQUFDOzs7Ozs7Ozs7OztBQ3JCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBMEY7QUFDaEQ7QUFDa0s7QUFDNUo7QUFDZjs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUZBQXFGLE9BQU87QUFDNUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0RBQU07O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTLEtBQUssY0FBYyxNQUFNLGNBQWM7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJHQUEyRyxLQUFLO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNKQUFzSixRQUFRO0FBQzlKO0FBQ0E7QUFDQSwwRUFBMEUsV0FBVztBQUNyRjtBQUNBO0FBQ0EsMEVBQTBFLFdBQVc7QUFDckY7QUFDQSw4RUFBOEUsdUJBQXVCO0FBQ3JHLHNHQUFzRyxZQUFZLEdBQUcsaUJBQWlCO0FBQ3RJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsd0RBQVk7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxnQkFBZ0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrQkFBK0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxnREFBZ0QsOEJBQThCO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELHFDQUFxQztBQUNwRztBQUNBO0FBQ0EsWUFBWSx1QkFBdUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckUseUZBQXlGLGdEQUFnRDtBQUN6SSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELGNBQWM7QUFDekUsNkZBQTZGLDREQUE0RDtBQUN6Six5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxzRUFBc0I7QUFDcEMsY0FBYyxzRUFBc0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsZUFBZTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQSx1QkFBdUIseURBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsa0JBQWtCLDBCQUEwQjtBQUNqRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDLFFBQVEsaUZBQWlGO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCwyQkFBMkI7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsZUFBZTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxJQUFJO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsY0FBYztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscUNBQXFDO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLG9FQUFvQjtBQUM3QjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHlFQUF5QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEUsMEJBQTBCO0FBQ3RHLCtFQUErRSxxQkFBcUI7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtFQUFrQjtBQUMxQjtBQUNBO0FBQ0EsU0FBUyxpRUFBaUI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsVUFBVSxJQUFJLFFBQVE7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkZBQTZGLDBCQUEwQjtBQUN2SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix3QkFBd0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQ0FBaUM7QUFDdEQ7QUFDQSw0QkFBNEIscURBQU07QUFDbEMsVUFBVSxrRUFBa0I7QUFDNUI7QUFDQSw4QkFBOEIsMkRBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlDQUFpQztBQUN0RDtBQUNBLDhDQUE4QztBQUM5QztBQUNBLDhCQUE4QiwyREFBWTtBQUMxQztBQUNBO0FBQ0EsWUFBWSx5REFBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsU0FBUztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrRUFBa0I7QUFDMUI7QUFDQTtBQUNBLFNBQVMsaUVBQWlCO0FBQzFCO0FBQ0E7QUFDQSxTQUFTLG9FQUFvQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMseUVBQXlCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDLFFBQVEsaUZBQWlGO0FBQ3pGO0FBQ0EsbUNBQW1DLGlCQUFpQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0VBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGlCQUFpQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0VBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0VBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpQkFBaUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtFQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0oscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtFQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHVCQUF1QjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksaUVBQWtCLEtBQUssMERBQVMsK0JBQStCLDJCQUEyQjtBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSxpRUFBa0IsS0FBSywwREFBUztBQUNwQyxJQUFJLDhEQUFlO0FBQ25CO0FBQ0EsSUFBSSw4REFBZTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFb007QUFDcE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdnFDMEY7QUFDMUM7QUFDYTtBQUNoQzs7QUFFN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFFBQVE7QUFDckM7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpSEFBaUgsV0FBVztBQUM1SDtBQUNBO0FBQ0EseURBQXlELGNBQWMsNEJBQTRCLGNBQWMsY0FBYyxHQUFHLGVBQWU7QUFDako7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHdEQUFZO0FBQ3RDO0FBQ0E7QUFDQSw2QkFBNkIseURBQWE7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxXQUFXO0FBQy9DLGNBQWMsc0JBQXNCLFlBQVksVUFBVTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx5Q0FBeUMsY0FBYztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsdUJBQXVCLEVBQUUsYUFBYTtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxxQ0FBcUMsSUFBSSxLQUFLO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsR0FBRztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsa0JBQWtCLEdBQUcsZ0JBQWdCO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixVQUFVO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMkNBQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHlDQUF5QztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxxQ0FBcUM7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsS0FBSztBQUN4RCxjQUFjLG9DQUFvQyxHQUFHLElBQUk7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsZUFBZSxhQUFhLG9EQUFvRDtBQUNqSTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLHdCQUF3QixXQUFXO0FBQzFHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUsd0JBQXdCLGFBQWEsb0RBQW9EO0FBQ3BLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxlQUFlLGdDQUFnQztBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5Q0FBeUM7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzQkFBc0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDLGNBQWMsb0NBQW9DLEdBQUcsSUFBSTtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxZQUFZO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxZQUFZO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixxQkFBcUI7QUFDaEQsSUFBSSxpQ0FBaUM7QUFDckMscUJBQXFCLGlDQUFpQztBQUN0RDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MscURBQU07QUFDdEMsOEJBQThCLDJEQUFZO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywyREFBWTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDJEQUFZO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpRUFBa0IsS0FBSywwREFBUztBQUNwQyxJQUFJLGlFQUFrQixLQUFLLDBEQUFTO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUFlO0FBQ2Y7QUFDQSw4REFBZTs7QUFFK0Q7QUFDOUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDam9Db0M7QUFDcEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maXJlYmFzZS1yLy4vc3JjanMvY29tcG9uZW50cy9hbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vZmlyZWJhc2Utci9leHRlcm5hbCB2YXIgXCJTaGlueVwiIiwid2VicGFjazovL2ZpcmViYXNlLXIvLi9ub2RlX21vZHVsZXMvQGZpcmViYXNlL2FuYWx5dGljcy9kaXN0L2VzbS9pbmRleC5lc20yMDE3LmpzIiwid2VicGFjazovL2ZpcmViYXNlLXIvLi9ub2RlX21vZHVsZXMvQGZpcmViYXNlL2luc3RhbGxhdGlvbnMvZGlzdC9lc20vaW5kZXguZXNtMjAxNy5qcyIsIndlYnBhY2s6Ly9maXJlYmFzZS1yLy4vbm9kZV9tb2R1bGVzL2ZpcmViYXNlL2FuYWx5dGljcy9kaXN0L2VzbS9pbmRleC5lc20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzaGlueSdcbmltcG9ydCB7IGdldEFuYWx5dGljcywgbG9nRXZlbnQsIHNldFVzZXJQcm9wZXJ0aWVzfSBmcm9tICdmaXJlYmFzZS9hbmFseXRpY3MnO1xuXG5sZXQgYW5hbHl0aWNzO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLWluaXRpYWxpemUtYW5hbHl0aWNzJywgKG1zZykgPT4ge1xuXHRpZighYW5hbHl0aWNzKVx0XG5cdFx0YW5hbHl0aWNzID0gZ2V0QW5hbHl0aWNzKCk7XG59KTtcblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1sb2ctZXZlbnQnLCAobXNnKSA9PiB7XG5cdGlmKCFtc2cucGFyYW1zKXtcblx0XHRsb2dFdmVudChhbmFseXRpY3MsIG1zZy5ldmVudCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bG9nRXZlbnQoYW5hbHl0aWNzLCBtc2cuZXZlbnQsIG1zZy5wYXJhbXMpO1xufSk7XG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtc2V0LXVzZXItcHJvcGVydGllcycsIChtc2cpID0+IHtcblx0c2V0VXNlclByb3BlcnRpZXMoYW5hbHl0aWNzLCBtc2cucHJvcHMpO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFNoaW55OyIsImltcG9ydCB7IF9nZXRQcm92aWRlciwgZ2V0QXBwLCBfcmVnaXN0ZXJDb21wb25lbnQsIHJlZ2lzdGVyVmVyc2lvbiB9IGZyb20gJ0BmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGZpcmViYXNlL2xvZ2dlcic7XG5pbXBvcnQgeyBFcnJvckZhY3RvcnksIGNhbGN1bGF0ZUJhY2tvZmZNaWxsaXMsIEZpcmViYXNlRXJyb3IsIGlzSW5kZXhlZERCQXZhaWxhYmxlLCB2YWxpZGF0ZUluZGV4ZWREQk9wZW5hYmxlLCBpc0Jyb3dzZXJFeHRlbnNpb24sIGFyZUNvb2tpZXNFbmFibGVkLCBnZXRNb2R1bGFySW5zdGFuY2UsIGRlZXBFcXVhbCB9IGZyb20gJ0BmaXJlYmFzZS91dGlsJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0BmaXJlYmFzZS9jb21wb25lbnQnO1xuaW1wb3J0ICdAZmlyZWJhc2UvaW5zdGFsbGF0aW9ucyc7XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBUeXBlIGNvbnN0YW50IGZvciBGaXJlYmFzZSBBbmFseXRpY3MuXHJcbiAqL1xyXG5jb25zdCBBTkFMWVRJQ1NfVFlQRSA9ICdhbmFseXRpY3MnO1xyXG4vLyBLZXkgdG8gYXR0YWNoIEZJRCB0byBpbiBndGFnIHBhcmFtcy5cclxuY29uc3QgR0FfRklEX0tFWSA9ICdmaXJlYmFzZV9pZCc7XHJcbmNvbnN0IE9SSUdJTl9LRVkgPSAnb3JpZ2luJztcclxuY29uc3QgRkVUQ0hfVElNRU9VVF9NSUxMSVMgPSA2MCAqIDEwMDA7XHJcbmNvbnN0IERZTkFNSUNfQ09ORklHX1VSTCA9ICdodHRwczovL2ZpcmViYXNlLmdvb2dsZWFwaXMuY29tL3YxYWxwaGEvcHJvamVjdHMvLS9hcHBzL3thcHAtaWR9L3dlYkNvbmZpZyc7XHJcbmNvbnN0IEdUQUdfVVJMID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0YWcvanMnO1xuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5jb25zdCBsb2dnZXIgPSBuZXcgTG9nZ2VyKCdAZmlyZWJhc2UvYW5hbHl0aWNzJyk7XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBNYWtlc2hpZnQgcG9seWZpbGwgZm9yIFByb21pc2UuYWxsU2V0dGxlZCgpLiBSZXNvbHZlcyB3aGVuIGFsbCBwcm9taXNlc1xyXG4gKiBoYXZlIGVpdGhlciByZXNvbHZlZCBvciByZWplY3RlZC5cclxuICpcclxuICogQHBhcmFtIHByb21pc2VzIEFycmF5IG9mIHByb21pc2VzIHRvIHdhaXQgZm9yLlxyXG4gKi9cclxuZnVuY3Rpb24gcHJvbWlzZUFsbFNldHRsZWQocHJvbWlzZXMpIHtcclxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcy5tYXAocHJvbWlzZSA9PiBwcm9taXNlLmNhdGNoKGUgPT4gZSkpKTtcclxufVxyXG4vKipcclxuICogSW5zZXJ0cyBndGFnIHNjcmlwdCB0YWcgaW50byB0aGUgcGFnZSB0byBhc3luY2hyb25vdXNseSBkb3dubG9hZCBndGFnLlxyXG4gKiBAcGFyYW0gZGF0YUxheWVyTmFtZSBOYW1lIG9mIGRhdGFsYXllciAobW9zdCBvZnRlbiB0aGUgZGVmYXVsdCwgXCJfZGF0YUxheWVyXCIpLlxyXG4gKi9cclxuZnVuY3Rpb24gaW5zZXJ0U2NyaXB0VGFnKGRhdGFMYXllck5hbWUsIG1lYXN1cmVtZW50SWQpIHtcclxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgLy8gV2UgYXJlIG5vdCBwcm92aWRpbmcgYW4gYW5hbHl0aWNzSWQgaW4gdGhlIFVSTCBiZWNhdXNlIGl0IHdvdWxkIHRyaWdnZXIgYSBgcGFnZV92aWV3YFxyXG4gICAgLy8gd2l0aG91dCBmaWQuIFdlIHdpbGwgaW5pdGlhbGl6ZSBnYS1pZCB1c2luZyBndGFnIChjb25maWcpIGNvbW1hbmQgdG9nZXRoZXIgd2l0aCBmaWQuXHJcbiAgICBzY3JpcHQuc3JjID0gYCR7R1RBR19VUkx9P2w9JHtkYXRhTGF5ZXJOYW1lfSZpZD0ke21lYXN1cmVtZW50SWR9YDtcclxuICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbn1cclxuLyoqXHJcbiAqIEdldCByZWZlcmVuY2UgdG8sIG9yIGNyZWF0ZSwgZ2xvYmFsIGRhdGFsYXllci5cclxuICogQHBhcmFtIGRhdGFMYXllck5hbWUgTmFtZSBvZiBkYXRhbGF5ZXIgKG1vc3Qgb2Z0ZW4gdGhlIGRlZmF1bHQsIFwiX2RhdGFMYXllclwiKS5cclxuICovXHJcbmZ1bmN0aW9uIGdldE9yQ3JlYXRlRGF0YUxheWVyKGRhdGFMYXllck5hbWUpIHtcclxuICAgIC8vIENoZWNrIGZvciBleGlzdGluZyBkYXRhTGF5ZXIgYW5kIGNyZWF0ZSBpZiBuZWVkZWQuXHJcbiAgICBsZXQgZGF0YUxheWVyID0gW107XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh3aW5kb3dbZGF0YUxheWVyTmFtZV0pKSB7XHJcbiAgICAgICAgZGF0YUxheWVyID0gd2luZG93W2RhdGFMYXllck5hbWVdO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgd2luZG93W2RhdGFMYXllck5hbWVdID0gZGF0YUxheWVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGFMYXllcjtcclxufVxyXG4vKipcclxuICogV3JhcHBlZCBndGFnIGxvZ2ljIHdoZW4gZ3RhZyBpcyBjYWxsZWQgd2l0aCAnY29uZmlnJyBjb21tYW5kLlxyXG4gKlxyXG4gKiBAcGFyYW0gZ3RhZ0NvcmUgQmFzaWMgZ3RhZyBmdW5jdGlvbiB0aGF0IGp1c3QgYXBwZW5kcyB0byBkYXRhTGF5ZXIuXHJcbiAqIEBwYXJhbSBpbml0aWFsaXphdGlvblByb21pc2VzTWFwIE1hcCBvZiBhcHBJZHMgdG8gdGhlaXIgaW5pdGlhbGl6YXRpb24gcHJvbWlzZXMuXHJcbiAqIEBwYXJhbSBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0IEFycmF5IG9mIGR5bmFtaWMgY29uZmlnIGZldGNoIHByb21pc2VzLlxyXG4gKiBAcGFyYW0gbWVhc3VyZW1lbnRJZFRvQXBwSWQgTWFwIG9mIEdBIG1lYXN1cmVtZW50SURzIHRvIGNvcnJlc3BvbmRpbmcgRmlyZWJhc2UgYXBwSWQuXHJcbiAqIEBwYXJhbSBtZWFzdXJlbWVudElkIEdBIE1lYXN1cmVtZW50IElEIHRvIHNldCBjb25maWcgZm9yLlxyXG4gKiBAcGFyYW0gZ3RhZ1BhcmFtcyBHdGFnIGNvbmZpZyBwYXJhbXMgdG8gc2V0LlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZ3RhZ09uQ29uZmlnKGd0YWdDb3JlLCBpbml0aWFsaXphdGlvblByb21pc2VzTWFwLCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0LCBtZWFzdXJlbWVudElkVG9BcHBJZCwgbWVhc3VyZW1lbnRJZCwgZ3RhZ1BhcmFtcykge1xyXG4gICAgLy8gSWYgY29uZmlnIGlzIGFscmVhZHkgZmV0Y2hlZCwgd2Uga25vdyB0aGUgYXBwSWQgYW5kIGNhbiB1c2UgaXQgdG8gbG9vayB1cCB3aGF0IEZJRCBwcm9taXNlIHdlXHJcbiAgICAvLy8gYXJlIHdhaXRpbmcgZm9yLCBhbmQgd2FpdCBvbmx5IG9uIHRoYXQgb25lLlxyXG4gICAgY29uc3QgY29ycmVzcG9uZGluZ0FwcElkID0gbWVhc3VyZW1lbnRJZFRvQXBwSWRbbWVhc3VyZW1lbnRJZF07XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChjb3JyZXNwb25kaW5nQXBwSWQpIHtcclxuICAgICAgICAgICAgYXdhaXQgaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcFtjb3JyZXNwb25kaW5nQXBwSWRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gSWYgY29uZmlnIGlzIG5vdCBmZXRjaGVkIHlldCwgd2FpdCBmb3IgYWxsIGNvbmZpZ3MgKHdlIGRvbid0IGtub3cgd2hpY2ggb25lIHdlIG5lZWQpIGFuZFxyXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBhcHBJZCAoaWYgYW55KSBjb3JyZXNwb25kaW5nIHRvIHRoaXMgbWVhc3VyZW1lbnRJZC4gSWYgdGhlcmUgaXMgb25lLCB3YWl0IG9uXHJcbiAgICAgICAgICAgIC8vIHRoYXQgYXBwSWQncyBpbml0aWFsaXphdGlvbiBwcm9taXNlLiBJZiB0aGVyZSBpcyBub25lLCBwcm9taXNlIHJlc29sdmVzIGFuZCBndGFnXHJcbiAgICAgICAgICAgIC8vIGNhbGwgZ29lcyB0aHJvdWdoLlxyXG4gICAgICAgICAgICBjb25zdCBkeW5hbWljQ29uZmlnUmVzdWx0cyA9IGF3YWl0IHByb21pc2VBbGxTZXR0bGVkKGR5bmFtaWNDb25maWdQcm9taXNlc0xpc3QpO1xyXG4gICAgICAgICAgICBjb25zdCBmb3VuZENvbmZpZyA9IGR5bmFtaWNDb25maWdSZXN1bHRzLmZpbmQoY29uZmlnID0+IGNvbmZpZy5tZWFzdXJlbWVudElkID09PSBtZWFzdXJlbWVudElkKTtcclxuICAgICAgICAgICAgaWYgKGZvdW5kQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBpbml0aWFsaXphdGlvblByb21pc2VzTWFwW2ZvdW5kQ29uZmlnLmFwcElkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgbG9nZ2VyLmVycm9yKGUpO1xyXG4gICAgfVxyXG4gICAgZ3RhZ0NvcmUoXCJjb25maWdcIiAvKiBHdGFnQ29tbWFuZC5DT05GSUcgKi8sIG1lYXN1cmVtZW50SWQsIGd0YWdQYXJhbXMpO1xyXG59XHJcbi8qKlxyXG4gKiBXcmFwcGVkIGd0YWcgbG9naWMgd2hlbiBndGFnIGlzIGNhbGxlZCB3aXRoICdldmVudCcgY29tbWFuZC5cclxuICpcclxuICogQHBhcmFtIGd0YWdDb3JlIEJhc2ljIGd0YWcgZnVuY3Rpb24gdGhhdCBqdXN0IGFwcGVuZHMgdG8gZGF0YUxheWVyLlxyXG4gKiBAcGFyYW0gaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcCBNYXAgb2YgYXBwSWRzIHRvIHRoZWlyIGluaXRpYWxpemF0aW9uIHByb21pc2VzLlxyXG4gKiBAcGFyYW0gZHluYW1pY0NvbmZpZ1Byb21pc2VzTGlzdCBBcnJheSBvZiBkeW5hbWljIGNvbmZpZyBmZXRjaCBwcm9taXNlcy5cclxuICogQHBhcmFtIG1lYXN1cmVtZW50SWQgR0EgTWVhc3VyZW1lbnQgSUQgdG8gbG9nIGV2ZW50IHRvLlxyXG4gKiBAcGFyYW0gZ3RhZ1BhcmFtcyBQYXJhbXMgdG8gbG9nIHdpdGggdGhpcyBldmVudC5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGd0YWdPbkV2ZW50KGd0YWdDb3JlLCBpbml0aWFsaXphdGlvblByb21pc2VzTWFwLCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0LCBtZWFzdXJlbWVudElkLCBndGFnUGFyYW1zKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGxldCBpbml0aWFsaXphdGlvblByb21pc2VzVG9XYWl0Rm9yID0gW107XHJcbiAgICAgICAgLy8gSWYgdGhlcmUncyBhICdzZW5kX3RvJyBwYXJhbSwgY2hlY2sgaWYgYW55IElEIHNwZWNpZmllZCBtYXRjaGVzXHJcbiAgICAgICAgLy8gYW4gaW5pdGlhbGl6ZUlkcygpIHByb21pc2Ugd2UgYXJlIHdhaXRpbmcgZm9yLlxyXG4gICAgICAgIGlmIChndGFnUGFyYW1zICYmIGd0YWdQYXJhbXNbJ3NlbmRfdG8nXSkge1xyXG4gICAgICAgICAgICBsZXQgZ2FTZW5kVG9MaXN0ID0gZ3RhZ1BhcmFtc1snc2VuZF90byddO1xyXG4gICAgICAgICAgICAvLyBNYWtlIGl0IGFuIGFycmF5IGlmIGlzIGlzbid0LCBzbyBpdCBjYW4gYmUgZGVhbHQgd2l0aCB0aGUgc2FtZSB3YXkuXHJcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShnYVNlbmRUb0xpc3QpKSB7XHJcbiAgICAgICAgICAgICAgICBnYVNlbmRUb0xpc3QgPSBbZ2FTZW5kVG9MaXN0XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBDaGVja2luZyAnc2VuZF90bycgZmllbGRzIHJlcXVpcmVzIGhhdmluZyBhbGwgbWVhc3VyZW1lbnQgSUQgcmVzdWx0cyBiYWNrIGZyb21cclxuICAgICAgICAgICAgLy8gdGhlIGR5bmFtaWMgY29uZmlnIGZldGNoLlxyXG4gICAgICAgICAgICBjb25zdCBkeW5hbWljQ29uZmlnUmVzdWx0cyA9IGF3YWl0IHByb21pc2VBbGxTZXR0bGVkKGR5bmFtaWNDb25maWdQcm9taXNlc0xpc3QpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlbmRUb0lkIG9mIGdhU2VuZFRvTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQW55IGZldGNoZWQgZHluYW1pYyBtZWFzdXJlbWVudCBJRCB0aGF0IG1hdGNoZXMgdGhpcyAnc2VuZF90bycgSURcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kQ29uZmlnID0gZHluYW1pY0NvbmZpZ1Jlc3VsdHMuZmluZChjb25maWcgPT4gY29uZmlnLm1lYXN1cmVtZW50SWQgPT09IHNlbmRUb0lkKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxpemF0aW9uUHJvbWlzZSA9IGZvdW5kQ29uZmlnICYmIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbZm91bmRDb25maWcuYXBwSWRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYWxpemF0aW9uUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemF0aW9uUHJvbWlzZXNUb1dhaXRGb3IucHVzaChpbml0aWFsaXphdGlvblByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRm91bmQgYW4gaXRlbSBpbiAnc2VuZF90bycgdGhhdCBpcyBub3QgYXNzb2NpYXRlZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpcmVjdGx5IHdpdGggYW4gRklELCBwb3NzaWJseSBhIGdyb3VwLiAgRW1wdHkgdGhpcyBhcnJheSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBleGl0IHRoZSBsb29wIGVhcmx5LCBhbmQgbGV0IGl0IGdldCBwb3B1bGF0ZWQgYmVsb3cuXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6YXRpb25Qcm9taXNlc1RvV2FpdEZvciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFRoaXMgd2lsbCBiZSB1bnBvcHVsYXRlZCBpZiB0aGVyZSB3YXMgbm8gJ3NlbmRfdG8nIGZpZWxkICwgb3JcclxuICAgICAgICAvLyBpZiBub3QgYWxsIGVudHJpZXMgaW4gdGhlICdzZW5kX3RvJyBmaWVsZCBjb3VsZCBiZSBtYXBwZWQgdG9cclxuICAgICAgICAvLyBhIEZJRC4gSW4gdGhlc2UgY2FzZXMsIHdhaXQgb24gYWxsIHBlbmRpbmcgaW5pdGlhbGl6YXRpb24gcHJvbWlzZXMuXHJcbiAgICAgICAgaWYgKGluaXRpYWxpemF0aW9uUHJvbWlzZXNUb1dhaXRGb3IubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGluaXRpYWxpemF0aW9uUHJvbWlzZXNUb1dhaXRGb3IgPSBPYmplY3QudmFsdWVzKGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSdW4gY29yZSBndGFnIGZ1bmN0aW9uIHdpdGggYXJncyBhZnRlciBhbGwgcmVsZXZhbnQgaW5pdGlhbGl6YXRpb25cclxuICAgICAgICAvLyBwcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQuXHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoaW5pdGlhbGl6YXRpb25Qcm9taXNlc1RvV2FpdEZvcik7XHJcbiAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cDovL2IvMTQxMzcwNDQ5IC0gdGhpcmQgYXJndW1lbnQgY2Fubm90IGJlIHVuZGVmaW5lZC5cclxuICAgICAgICBndGFnQ29yZShcImV2ZW50XCIgLyogR3RhZ0NvbW1hbmQuRVZFTlQgKi8sIG1lYXN1cmVtZW50SWQsIGd0YWdQYXJhbXMgfHwge30pO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBsb2dnZXIuZXJyb3IoZSk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFdyYXBzIGEgc3RhbmRhcmQgZ3RhZyBmdW5jdGlvbiB3aXRoIGV4dHJhIGNvZGUgdG8gd2FpdCBmb3IgY29tcGxldGlvbiBvZlxyXG4gKiByZWxldmFudCBpbml0aWFsaXphdGlvbiBwcm9taXNlcyBiZWZvcmUgc2VuZGluZyByZXF1ZXN0cy5cclxuICpcclxuICogQHBhcmFtIGd0YWdDb3JlIEJhc2ljIGd0YWcgZnVuY3Rpb24gdGhhdCBqdXN0IGFwcGVuZHMgdG8gZGF0YUxheWVyLlxyXG4gKiBAcGFyYW0gaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcCBNYXAgb2YgYXBwSWRzIHRvIHRoZWlyIGluaXRpYWxpemF0aW9uIHByb21pc2VzLlxyXG4gKiBAcGFyYW0gZHluYW1pY0NvbmZpZ1Byb21pc2VzTGlzdCBBcnJheSBvZiBkeW5hbWljIGNvbmZpZyBmZXRjaCBwcm9taXNlcy5cclxuICogQHBhcmFtIG1lYXN1cmVtZW50SWRUb0FwcElkIE1hcCBvZiBHQSBtZWFzdXJlbWVudElEcyB0byBjb3JyZXNwb25kaW5nIEZpcmViYXNlIGFwcElkLlxyXG4gKi9cclxuZnVuY3Rpb24gd3JhcEd0YWcoZ3RhZ0NvcmUsIFxyXG4vKipcclxuICogQWxsb3dzIHdyYXBwZWQgZ3RhZyBjYWxscyB0byB3YWl0IG9uIHdoaWNoZXZlciBpbnRpYWxpemF0aW9uIHByb21pc2VzIGFyZSByZXF1aXJlZCxcclxuICogZGVwZW5kaW5nIG9uIHRoZSBjb250ZW50cyBvZiB0aGUgZ3RhZyBwYXJhbXMnIGBzZW5kX3RvYCBmaWVsZCwgaWYgYW55LlxyXG4gKi9cclxuaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcCwgXHJcbi8qKlxyXG4gKiBXcmFwcGVkIGd0YWcgY2FsbHMgc29tZXRpbWVzIHJlcXVpcmUgYWxsIGR5bmFtaWMgY29uZmlnIGZldGNoZXMgdG8gaGF2ZSByZXR1cm5lZFxyXG4gKiBiZWZvcmUgZGV0ZXJtaW5pbmcgd2hhdCBpbml0aWFsaXphdGlvbiBwcm9taXNlcyAod2hpY2ggaW5jbHVkZSBGSURzKSB0byB3YWl0IGZvci5cclxuICovXHJcbmR5bmFtaWNDb25maWdQcm9taXNlc0xpc3QsIFxyXG4vKipcclxuICogV3JhcHBlZCBndGFnIGNvbmZpZyBjYWxscyBjYW4gbmFycm93IGRvd24gd2hpY2ggaW5pdGlhbGl6YXRpb24gcHJvbWlzZSAod2l0aCBGSUQpXHJcbiAqIHRvIHdhaXQgZm9yIGlmIHRoZSBtZWFzdXJlbWVudElkIGlzIGFscmVhZHkgZmV0Y2hlZCwgYnkgZ2V0dGluZyB0aGUgY29ycmVzcG9uZGluZyBhcHBJZCxcclxuICogd2hpY2ggaXMgdGhlIGtleSBmb3IgdGhlIGluaXRpYWxpemF0aW9uIHByb21pc2VzIG1hcC5cclxuICovXHJcbm1lYXN1cmVtZW50SWRUb0FwcElkKSB7XHJcbiAgICAvKipcclxuICAgICAqIFdyYXBwZXIgYXJvdW5kIGd0YWcgdGhhdCBlbnN1cmVzIEZJRCBpcyBzZW50IHdpdGggZ3RhZyBjYWxscy5cclxuICAgICAqIEBwYXJhbSBjb21tYW5kIEd0YWcgY29tbWFuZCB0eXBlLlxyXG4gICAgICogQHBhcmFtIGlkT3JOYW1lT3JQYXJhbXMgTWVhc3VyZW1lbnQgSUQgaWYgY29tbWFuZCBpcyBFVkVOVC9DT05GSUcsIHBhcmFtcyBpZiBjb21tYW5kIGlzIFNFVC5cclxuICAgICAqIEBwYXJhbSBndGFnUGFyYW1zIFBhcmFtcyBpZiBldmVudCBpcyBFVkVOVC9DT05GSUcuXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGd0YWdXcmFwcGVyKGNvbW1hbmQsIGlkT3JOYW1lT3JQYXJhbXMsIGd0YWdQYXJhbXMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBJZiBldmVudCwgY2hlY2sgdGhhdCByZWxldmFudCBpbml0aWFsaXphdGlvbiBwcm9taXNlcyBoYXZlIGNvbXBsZXRlZC5cclxuICAgICAgICAgICAgaWYgKGNvbW1hbmQgPT09IFwiZXZlbnRcIiAvKiBHdGFnQ29tbWFuZC5FVkVOVCAqLykge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgRVZFTlQsIHNlY29uZCBhcmcgbXVzdCBiZSBtZWFzdXJlbWVudElkLlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgZ3RhZ09uRXZlbnQoZ3RhZ0NvcmUsIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXAsIGR5bmFtaWNDb25maWdQcm9taXNlc0xpc3QsIGlkT3JOYW1lT3JQYXJhbXMsIGd0YWdQYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbW1hbmQgPT09IFwiY29uZmlnXCIgLyogR3RhZ0NvbW1hbmQuQ09ORklHICovKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBDT05GSUcsIHNlY29uZCBhcmcgbXVzdCBiZSBtZWFzdXJlbWVudElkLlxyXG4gICAgICAgICAgICAgICAgYXdhaXQgZ3RhZ09uQ29uZmlnKGd0YWdDb3JlLCBpbml0aWFsaXphdGlvblByb21pc2VzTWFwLCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0LCBtZWFzdXJlbWVudElkVG9BcHBJZCwgaWRPck5hbWVPclBhcmFtcywgZ3RhZ1BhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY29tbWFuZCA9PT0gXCJjb25zZW50XCIgLyogR3RhZ0NvbW1hbmQuQ09OU0VOVCAqLykge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgQ09ORklHLCBzZWNvbmQgYXJnIG11c3QgYmUgbWVhc3VyZW1lbnRJZC5cclxuICAgICAgICAgICAgICAgIGd0YWdDb3JlKFwiY29uc2VudFwiIC8qIEd0YWdDb21tYW5kLkNPTlNFTlQgKi8sICd1cGRhdGUnLCBndGFnUGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIFNFVCwgc2Vjb25kIGFyZyBtdXN0IGJlIHBhcmFtcy5cclxuICAgICAgICAgICAgICAgIGd0YWdDb3JlKFwic2V0XCIgLyogR3RhZ0NvbW1hbmQuU0VUICovLCBpZE9yTmFtZU9yUGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGd0YWdXcmFwcGVyO1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGdsb2JhbCBndGFnIGZ1bmN0aW9uIG9yIHdyYXBzIGV4aXN0aW5nIG9uZSBpZiBmb3VuZC5cclxuICogVGhpcyB3cmFwcGVkIGZ1bmN0aW9uIGF0dGFjaGVzIEZpcmViYXNlIGluc3RhbmNlIElEIChGSUQpIHRvIGd0YWcgJ2NvbmZpZycgYW5kXHJcbiAqICdldmVudCcgY2FsbHMgdGhhdCBiZWxvbmcgdG8gdGhlIEdBSUQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgRmlyZWJhc2UgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBpbml0aWFsaXphdGlvblByb21pc2VzTWFwIE1hcCBvZiBhcHBJZHMgdG8gdGhlaXIgaW5pdGlhbGl6YXRpb24gcHJvbWlzZXMuXHJcbiAqIEBwYXJhbSBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0IEFycmF5IG9mIGR5bmFtaWMgY29uZmlnIGZldGNoIHByb21pc2VzLlxyXG4gKiBAcGFyYW0gbWVhc3VyZW1lbnRJZFRvQXBwSWQgTWFwIG9mIEdBIG1lYXN1cmVtZW50SURzIHRvIGNvcnJlc3BvbmRpbmcgRmlyZWJhc2UgYXBwSWQuXHJcbiAqIEBwYXJhbSBkYXRhTGF5ZXJOYW1lIE5hbWUgb2YgZ2xvYmFsIEdBIGRhdGFsYXllciBhcnJheS5cclxuICogQHBhcmFtIGd0YWdGdW5jdGlvbk5hbWUgTmFtZSBvZiBnbG9iYWwgZ3RhZyBmdW5jdGlvbiAoXCJndGFnXCIgaWYgbm90IHVzZXItc3BlY2lmaWVkKS5cclxuICovXHJcbmZ1bmN0aW9uIHdyYXBPckNyZWF0ZUd0YWcoaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcCwgZHluYW1pY0NvbmZpZ1Byb21pc2VzTGlzdCwgbWVhc3VyZW1lbnRJZFRvQXBwSWQsIGRhdGFMYXllck5hbWUsIGd0YWdGdW5jdGlvbk5hbWUpIHtcclxuICAgIC8vIENyZWF0ZSBhIGJhc2ljIGNvcmUgZ3RhZyBmdW5jdGlvblxyXG4gICAgbGV0IGd0YWdDb3JlID0gZnVuY3Rpb24gKC4uLl9hcmdzKSB7XHJcbiAgICAgICAgLy8gTXVzdCBwdXNoIElBcmd1bWVudHMgb2JqZWN0LCBub3QgYW4gYXJyYXkuXHJcbiAgICAgICAgd2luZG93W2RhdGFMYXllck5hbWVdLnB1c2goYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgICAvLyBSZXBsYWNlIGl0IHdpdGggZXhpc3Rpbmcgb25lIGlmIGZvdW5kXHJcbiAgICBpZiAod2luZG93W2d0YWdGdW5jdGlvbk5hbWVdICYmXHJcbiAgICAgICAgdHlwZW9mIHdpbmRvd1tndGFnRnVuY3Rpb25OYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBndGFnQ29yZSA9IHdpbmRvd1tndGFnRnVuY3Rpb25OYW1lXTtcclxuICAgIH1cclxuICAgIHdpbmRvd1tndGFnRnVuY3Rpb25OYW1lXSA9IHdyYXBHdGFnKGd0YWdDb3JlLCBpbml0aWFsaXphdGlvblByb21pc2VzTWFwLCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0LCBtZWFzdXJlbWVudElkVG9BcHBJZCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGd0YWdDb3JlLFxyXG4gICAgICAgIHdyYXBwZWRHdGFnOiB3aW5kb3dbZ3RhZ0Z1bmN0aW9uTmFtZV1cclxuICAgIH07XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHNjcmlwdCB0YWcgaW4gdGhlIERPTSBtYXRjaGluZyBib3RoIHRoZSBndGFnIHVybCBwYXR0ZXJuXHJcbiAqIGFuZCB0aGUgcHJvdmlkZWQgZGF0YSBsYXllciBuYW1lLlxyXG4gKi9cclxuZnVuY3Rpb24gZmluZEd0YWdTY3JpcHRPblBhZ2UoZGF0YUxheWVyTmFtZSkge1xyXG4gICAgY29uc3Qgc2NyaXB0VGFncyA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XHJcbiAgICBmb3IgKGNvbnN0IHRhZyBvZiBPYmplY3QudmFsdWVzKHNjcmlwdFRhZ3MpKSB7XHJcbiAgICAgICAgaWYgKHRhZy5zcmMgJiZcclxuICAgICAgICAgICAgdGFnLnNyYy5pbmNsdWRlcyhHVEFHX1VSTCkgJiZcclxuICAgICAgICAgICAgdGFnLnNyYy5pbmNsdWRlcyhkYXRhTGF5ZXJOYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmNvbnN0IEVSUk9SUyA9IHtcclxuICAgIFtcImFscmVhZHktZXhpc3RzXCIgLyogQW5hbHl0aWNzRXJyb3IuQUxSRUFEWV9FWElTVFMgKi9dOiAnQSBGaXJlYmFzZSBBbmFseXRpY3MgaW5zdGFuY2Ugd2l0aCB0aGUgYXBwSWQgeyRpZH0gJyArXHJcbiAgICAgICAgJyBhbHJlYWR5IGV4aXN0cy4gJyArXHJcbiAgICAgICAgJ09ubHkgb25lIEZpcmViYXNlIEFuYWx5dGljcyBpbnN0YW5jZSBjYW4gYmUgY3JlYXRlZCBmb3IgZWFjaCBhcHBJZC4nLFxyXG4gICAgW1wiYWxyZWFkeS1pbml0aWFsaXplZFwiIC8qIEFuYWx5dGljc0Vycm9yLkFMUkVBRFlfSU5JVElBTElaRUQgKi9dOiAnaW5pdGlhbGl6ZUFuYWx5dGljcygpIGNhbm5vdCBiZSBjYWxsZWQgYWdhaW4gd2l0aCBkaWZmZXJlbnQgb3B0aW9ucyB0aGFuIHRob3NlICcgK1xyXG4gICAgICAgICdpdCB3YXMgaW5pdGlhbGx5IGNhbGxlZCB3aXRoLiBJdCBjYW4gYmUgY2FsbGVkIGFnYWluIHdpdGggdGhlIHNhbWUgb3B0aW9ucyB0byAnICtcclxuICAgICAgICAncmV0dXJuIHRoZSBleGlzdGluZyBpbnN0YW5jZSwgb3IgZ2V0QW5hbHl0aWNzKCkgY2FuIGJlIHVzZWQgJyArXHJcbiAgICAgICAgJ3RvIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgYWxyZWFkeS1pbnRpYWxpemVkIGluc3RhbmNlLicsXHJcbiAgICBbXCJhbHJlYWR5LWluaXRpYWxpemVkLXNldHRpbmdzXCIgLyogQW5hbHl0aWNzRXJyb3IuQUxSRUFEWV9JTklUSUFMSVpFRF9TRVRUSU5HUyAqL106ICdGaXJlYmFzZSBBbmFseXRpY3MgaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZC4nICtcclxuICAgICAgICAnc2V0dGluZ3MoKSBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgaW5pdGlhbGl6aW5nIGFueSBBbmFseXRpY3MgaW5zdGFuY2UnICtcclxuICAgICAgICAnb3IgaXQgd2lsbCBoYXZlIG5vIGVmZmVjdC4nLFxyXG4gICAgW1wiaW50ZXJvcC1jb21wb25lbnQtcmVnLWZhaWxlZFwiIC8qIEFuYWx5dGljc0Vycm9yLklOVEVST1BfQ09NUE9ORU5UX1JFR19GQUlMRUQgKi9dOiAnRmlyZWJhc2UgQW5hbHl0aWNzIEludGVyb3AgQ29tcG9uZW50IGZhaWxlZCB0byBpbnN0YW50aWF0ZTogeyRyZWFzb259JyxcclxuICAgIFtcImludmFsaWQtYW5hbHl0aWNzLWNvbnRleHRcIiAvKiBBbmFseXRpY3NFcnJvci5JTlZBTElEX0FOQUxZVElDU19DT05URVhUICovXTogJ0ZpcmViYXNlIEFuYWx5dGljcyBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuICcgK1xyXG4gICAgICAgICdXcmFwIGluaXRpYWxpemF0aW9uIG9mIGFuYWx5dGljcyBpbiBhbmFseXRpY3MuaXNTdXBwb3J0ZWQoKSAnICtcclxuICAgICAgICAndG8gcHJldmVudCBpbml0aWFsaXphdGlvbiBpbiB1bnN1cHBvcnRlZCBlbnZpcm9ubWVudHMuIERldGFpbHM6IHskZXJyb3JJbmZvfScsXHJcbiAgICBbXCJpbmRleGVkZGItdW5hdmFpbGFibGVcIiAvKiBBbmFseXRpY3NFcnJvci5JTkRFWEVEREJfVU5BVkFJTEFCTEUgKi9dOiAnSW5kZXhlZERCIHVuYXZhaWxhYmxlIG9yIHJlc3RyaWN0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4gJyArXHJcbiAgICAgICAgJ1dyYXAgaW5pdGlhbGl6YXRpb24gb2YgYW5hbHl0aWNzIGluIGFuYWx5dGljcy5pc1N1cHBvcnRlZCgpICcgK1xyXG4gICAgICAgICd0byBwcmV2ZW50IGluaXRpYWxpemF0aW9uIGluIHVuc3VwcG9ydGVkIGVudmlyb25tZW50cy4gRGV0YWlsczogeyRlcnJvckluZm99JyxcclxuICAgIFtcImZldGNoLXRocm90dGxlXCIgLyogQW5hbHl0aWNzRXJyb3IuRkVUQ0hfVEhST1RUTEUgKi9dOiAnVGhlIGNvbmZpZyBmZXRjaCByZXF1ZXN0IHRpbWVkIG91dCB3aGlsZSBpbiBhbiBleHBvbmVudGlhbCBiYWNrb2ZmIHN0YXRlLicgK1xyXG4gICAgICAgICcgVW5peCB0aW1lc3RhbXAgaW4gbWlsbGlzZWNvbmRzIHdoZW4gZmV0Y2ggcmVxdWVzdCB0aHJvdHRsaW5nIGVuZHM6IHskdGhyb3R0bGVFbmRUaW1lTWlsbGlzfS4nLFxyXG4gICAgW1wiY29uZmlnLWZldGNoLWZhaWxlZFwiIC8qIEFuYWx5dGljc0Vycm9yLkNPTkZJR19GRVRDSF9GQUlMRUQgKi9dOiAnRHluYW1pYyBjb25maWcgZmV0Y2ggZmFpbGVkOiBbeyRodHRwU3RhdHVzfV0geyRyZXNwb25zZU1lc3NhZ2V9JyxcclxuICAgIFtcIm5vLWFwaS1rZXlcIiAvKiBBbmFseXRpY3NFcnJvci5OT19BUElfS0VZICovXTogJ1RoZSBcImFwaUtleVwiIGZpZWxkIGlzIGVtcHR5IGluIHRoZSBsb2NhbCBGaXJlYmFzZSBjb25maWcuIEZpcmViYXNlIEFuYWx5dGljcyByZXF1aXJlcyB0aGlzIGZpZWxkIHRvJyArXHJcbiAgICAgICAgJ2NvbnRhaW4gYSB2YWxpZCBBUEkga2V5LicsXHJcbiAgICBbXCJuby1hcHAtaWRcIiAvKiBBbmFseXRpY3NFcnJvci5OT19BUFBfSUQgKi9dOiAnVGhlIFwiYXBwSWRcIiBmaWVsZCBpcyBlbXB0eSBpbiB0aGUgbG9jYWwgRmlyZWJhc2UgY29uZmlnLiBGaXJlYmFzZSBBbmFseXRpY3MgcmVxdWlyZXMgdGhpcyBmaWVsZCB0bycgK1xyXG4gICAgICAgICdjb250YWluIGEgdmFsaWQgYXBwIElELidcclxufTtcclxuY29uc3QgRVJST1JfRkFDVE9SWSA9IG5ldyBFcnJvckZhY3RvcnkoJ2FuYWx5dGljcycsICdBbmFseXRpY3MnLCBFUlJPUlMpO1xuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogQmFja29mZiBmYWN0b3IgZm9yIDUwMyBlcnJvcnMsIHdoaWNoIHdlIHdhbnQgdG8gYmUgY29uc2VydmF0aXZlIGFib3V0XHJcbiAqIHRvIGF2b2lkIG92ZXJsb2FkaW5nIHNlcnZlcnMuIEVhY2ggcmV0cnkgaW50ZXJ2YWwgd2lsbCBiZVxyXG4gKiBCQVNFX0lOVEVSVkFMX01JTExJUyAqIExPTkdfUkVUUllfRkFDVE9SIF4gcmV0cnlDb3VudCwgc28gdGhlIHNlY29uZCBvbmVcclxuICogd2lsbCBiZSB+MzAgc2Vjb25kcyAod2l0aCBmdXp6aW5nKS5cclxuICovXHJcbmNvbnN0IExPTkdfUkVUUllfRkFDVE9SID0gMzA7XHJcbi8qKlxyXG4gKiBCYXNlIHdhaXQgaW50ZXJ2YWwgdG8gbXVsdGlwbGllZCBieSBiYWNrb2ZmRmFjdG9yXmJhY2tvZmZDb3VudC5cclxuICovXHJcbmNvbnN0IEJBU0VfSU5URVJWQUxfTUlMTElTID0gMTAwMDtcclxuLyoqXHJcbiAqIFN0dWJiYWJsZSByZXRyeSBkYXRhIHN0b3JhZ2UgY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBSZXRyeURhdGEge1xyXG4gICAgY29uc3RydWN0b3IodGhyb3R0bGVNZXRhZGF0YSA9IHt9LCBpbnRlcnZhbE1pbGxpcyA9IEJBU0VfSU5URVJWQUxfTUlMTElTKSB7XHJcbiAgICAgICAgdGhpcy50aHJvdHRsZU1ldGFkYXRhID0gdGhyb3R0bGVNZXRhZGF0YTtcclxuICAgICAgICB0aGlzLmludGVydmFsTWlsbGlzID0gaW50ZXJ2YWxNaWxsaXM7XHJcbiAgICB9XHJcbiAgICBnZXRUaHJvdHRsZU1ldGFkYXRhKGFwcElkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGhyb3R0bGVNZXRhZGF0YVthcHBJZF07XHJcbiAgICB9XHJcbiAgICBzZXRUaHJvdHRsZU1ldGFkYXRhKGFwcElkLCBtZXRhZGF0YSkge1xyXG4gICAgICAgIHRoaXMudGhyb3R0bGVNZXRhZGF0YVthcHBJZF0gPSBtZXRhZGF0YTtcclxuICAgIH1cclxuICAgIGRlbGV0ZVRocm90dGxlTWV0YWRhdGEoYXBwSWQpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy50aHJvdHRsZU1ldGFkYXRhW2FwcElkXTtcclxuICAgIH1cclxufVxyXG5jb25zdCBkZWZhdWx0UmV0cnlEYXRhID0gbmV3IFJldHJ5RGF0YSgpO1xyXG4vKipcclxuICogU2V0IEdFVCByZXF1ZXN0IGhlYWRlcnMuXHJcbiAqIEBwYXJhbSBhcGlLZXkgQXBwIEFQSSBrZXkuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIZWFkZXJzKGFwaUtleSkge1xyXG4gICAgcmV0dXJuIG5ldyBIZWFkZXJzKHtcclxuICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAneC1nb29nLWFwaS1rZXknOiBhcGlLZXlcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiBGZXRjaGVzIGR5bmFtaWMgY29uZmlnIGZyb20gYmFja2VuZC5cclxuICogQHBhcmFtIGFwcCBGaXJlYmFzZSBhcHAgdG8gZmV0Y2ggY29uZmlnIGZvci5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGZldGNoRHluYW1pY0NvbmZpZyhhcHBGaWVsZHMpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IHsgYXBwSWQsIGFwaUtleSB9ID0gYXBwRmllbGRzO1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IGdldEhlYWRlcnMoYXBpS2V5KVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFwcFVybCA9IERZTkFNSUNfQ09ORklHX1VSTC5yZXBsYWNlKCd7YXBwLWlkfScsIGFwcElkKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBwVXJsLCByZXF1ZXN0KTtcclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgIT09IDMwNCkge1xyXG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSAnJztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBUcnkgdG8gZ2V0IGFueSBlcnJvciBtZXNzYWdlIHRleHQgZnJvbSBzZXJ2ZXIgcmVzcG9uc2UuXHJcbiAgICAgICAgICAgIGNvbnN0IGpzb25SZXNwb25zZSA9IChhd2FpdCByZXNwb25zZS5qc29uKCkpO1xyXG4gICAgICAgICAgICBpZiAoKF9hID0ganNvblJlc3BvbnNlLmVycm9yKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0ganNvblJlc3BvbnNlLmVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKF9pZ25vcmVkKSB7IH1cclxuICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcImNvbmZpZy1mZXRjaC1mYWlsZWRcIiAvKiBBbmFseXRpY3NFcnJvci5DT05GSUdfRkVUQ0hfRkFJTEVEICovLCB7XHJcbiAgICAgICAgICAgIGh0dHBTdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgICAgICAgICAgcmVzcG9uc2VNZXNzYWdlOiBlcnJvck1lc3NhZ2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbn1cclxuLyoqXHJcbiAqIEZldGNoZXMgZHluYW1pYyBjb25maWcgZnJvbSBiYWNrZW5kLCByZXRyeWluZyBpZiBmYWlsZWQuXHJcbiAqIEBwYXJhbSBhcHAgRmlyZWJhc2UgYXBwIHRvIGZldGNoIGNvbmZpZyBmb3IuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBmZXRjaER5bmFtaWNDb25maWdXaXRoUmV0cnkoYXBwLCBcclxuLy8gcmV0cnlEYXRhIGFuZCB0aW1lb3V0TWlsbGlzIGFyZSBwYXJhbWV0ZXJpemVkIHRvIGFsbG93IHBhc3NpbmcgYSBkaWZmZXJlbnQgdmFsdWUgZm9yIHRlc3RpbmcuXHJcbnJldHJ5RGF0YSA9IGRlZmF1bHRSZXRyeURhdGEsIHRpbWVvdXRNaWxsaXMpIHtcclxuICAgIGNvbnN0IHsgYXBwSWQsIGFwaUtleSwgbWVhc3VyZW1lbnRJZCB9ID0gYXBwLm9wdGlvbnM7XHJcbiAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgdGhyb3cgRVJST1JfRkFDVE9SWS5jcmVhdGUoXCJuby1hcHAtaWRcIiAvKiBBbmFseXRpY3NFcnJvci5OT19BUFBfSUQgKi8pO1xyXG4gICAgfVxyXG4gICAgaWYgKCFhcGlLZXkpIHtcclxuICAgICAgICBpZiAobWVhc3VyZW1lbnRJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWVhc3VyZW1lbnRJZCxcclxuICAgICAgICAgICAgICAgIGFwcElkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwibm8tYXBpLWtleVwiIC8qIEFuYWx5dGljc0Vycm9yLk5PX0FQSV9LRVkgKi8pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGhyb3R0bGVNZXRhZGF0YSA9IHJldHJ5RGF0YS5nZXRUaHJvdHRsZU1ldGFkYXRhKGFwcElkKSB8fCB7XHJcbiAgICAgICAgYmFja29mZkNvdW50OiAwLFxyXG4gICAgICAgIHRocm90dGxlRW5kVGltZU1pbGxpczogRGF0ZS5ub3coKVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHNpZ25hbCA9IG5ldyBBbmFseXRpY3NBYm9ydFNpZ25hbCgpO1xyXG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgLy8gTm90ZSBhIHZlcnkgbG93IGRlbGF5LCBlZyA8IDEwbXMsIGNhbiBlbGFwc2UgYmVmb3JlIGxpc3RlbmVycyBhcmUgaW5pdGlhbGl6ZWQuXHJcbiAgICAgICAgc2lnbmFsLmFib3J0KCk7XHJcbiAgICB9LCB0aW1lb3V0TWlsbGlzICE9PSB1bmRlZmluZWQgPyB0aW1lb3V0TWlsbGlzIDogRkVUQ0hfVElNRU9VVF9NSUxMSVMpO1xyXG4gICAgcmV0dXJuIGF0dGVtcHRGZXRjaER5bmFtaWNDb25maWdXaXRoUmV0cnkoeyBhcHBJZCwgYXBpS2V5LCBtZWFzdXJlbWVudElkIH0sIHRocm90dGxlTWV0YWRhdGEsIHNpZ25hbCwgcmV0cnlEYXRhKTtcclxufVxyXG4vKipcclxuICogUnVucyBvbmUgcmV0cnkgYXR0ZW1wdC5cclxuICogQHBhcmFtIGFwcEZpZWxkcyBOZWNlc3NhcnkgYXBwIGNvbmZpZyBmaWVsZHMuXHJcbiAqIEBwYXJhbSB0aHJvdHRsZU1ldGFkYXRhIE9uZ29pbmcgbWV0YWRhdGEgdG8gZGV0ZXJtaW5lIHRocm90dGxpbmcgdGltZXMuXHJcbiAqIEBwYXJhbSBzaWduYWwgQWJvcnQgc2lnbmFsLlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gYXR0ZW1wdEZldGNoRHluYW1pY0NvbmZpZ1dpdGhSZXRyeShhcHBGaWVsZHMsIHsgdGhyb3R0bGVFbmRUaW1lTWlsbGlzLCBiYWNrb2ZmQ291bnQgfSwgc2lnbmFsLCByZXRyeURhdGEgPSBkZWZhdWx0UmV0cnlEYXRhIC8vIGZvciB0ZXN0aW5nXHJcbikge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc3QgeyBhcHBJZCwgbWVhc3VyZW1lbnRJZCB9ID0gYXBwRmllbGRzO1xyXG4gICAgLy8gU3RhcnRzIHdpdGggYSAocG90ZW50aWFsbHkgemVybykgdGltZW91dCB0byBzdXBwb3J0IHJlc3VtcHRpb24gZnJvbSBzdG9yZWQgc3RhdGUuXHJcbiAgICAvLyBFbnN1cmVzIHRoZSB0aHJvdHRsZSBlbmQgdGltZSBpcyBob25vcmVkIGlmIHRoZSBsYXN0IGF0dGVtcHQgdGltZWQgb3V0LlxyXG4gICAgLy8gTm90ZSB0aGUgU0RLIHdpbGwgbmV2ZXIgbWFrZSBhIHJlcXVlc3QgaWYgdGhlIGZldGNoIHRpbWVvdXQgZXhwaXJlcyBhdCB0aGlzIHBvaW50LlxyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBzZXRBYm9ydGFibGVUaW1lb3V0KHNpZ25hbCwgdGhyb3R0bGVFbmRUaW1lTWlsbGlzKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKG1lYXN1cmVtZW50SWQpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLndhcm4oYFRpbWVkIG91dCBmZXRjaGluZyB0aGlzIEZpcmViYXNlIGFwcCdzIG1lYXN1cmVtZW50IElEIGZyb20gdGhlIHNlcnZlci5gICtcclxuICAgICAgICAgICAgICAgIGAgRmFsbGluZyBiYWNrIHRvIHRoZSBtZWFzdXJlbWVudCBJRCAke21lYXN1cmVtZW50SWR9YCArXHJcbiAgICAgICAgICAgICAgICBgIHByb3ZpZGVkIGluIHRoZSBcIm1lYXN1cmVtZW50SWRcIiBmaWVsZCBpbiB0aGUgbG9jYWwgRmlyZWJhc2UgY29uZmlnLiBbJHtlID09PSBudWxsIHx8IGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGUubWVzc2FnZX1dYCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGFwcElkLCBtZWFzdXJlbWVudElkIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hEeW5hbWljQ29uZmlnKGFwcEZpZWxkcyk7XHJcbiAgICAgICAgLy8gTm90ZSB0aGUgU0RLIG9ubHkgY2xlYXJzIHRocm90dGxlIHN0YXRlIGlmIHJlc3BvbnNlIGlzIHN1Y2Nlc3Mgb3Igbm9uLXJldHJpYWJsZS5cclxuICAgICAgICByZXRyeURhdGEuZGVsZXRlVGhyb3R0bGVNZXRhZGF0YShhcHBJZCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zdCBlcnJvciA9IGU7XHJcbiAgICAgICAgaWYgKCFpc1JldHJpYWJsZUVycm9yKGVycm9yKSkge1xyXG4gICAgICAgICAgICByZXRyeURhdGEuZGVsZXRlVGhyb3R0bGVNZXRhZGF0YShhcHBJZCk7XHJcbiAgICAgICAgICAgIGlmIChtZWFzdXJlbWVudElkKSB7XHJcbiAgICAgICAgICAgICAgICBsb2dnZXIud2FybihgRmFpbGVkIHRvIGZldGNoIHRoaXMgRmlyZWJhc2UgYXBwJ3MgbWVhc3VyZW1lbnQgSUQgZnJvbSB0aGUgc2VydmVyLmAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGAgRmFsbGluZyBiYWNrIHRvIHRoZSBtZWFzdXJlbWVudCBJRCAke21lYXN1cmVtZW50SWR9YCArXHJcbiAgICAgICAgICAgICAgICAgICAgYCBwcm92aWRlZCBpbiB0aGUgXCJtZWFzdXJlbWVudElkXCIgZmllbGQgaW4gdGhlIGxvY2FsIEZpcmViYXNlIGNvbmZpZy4gWyR7ZXJyb3IgPT09IG51bGwgfHwgZXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yLm1lc3NhZ2V9XWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgYXBwSWQsIG1lYXN1cmVtZW50SWQgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYmFja29mZk1pbGxpcyA9IE51bWJlcigoX2EgPSBlcnJvciA9PT0gbnVsbCB8fCBlcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3IuY3VzdG9tRGF0YSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmh0dHBTdGF0dXMpID09PSA1MDNcclxuICAgICAgICAgICAgPyBjYWxjdWxhdGVCYWNrb2ZmTWlsbGlzKGJhY2tvZmZDb3VudCwgcmV0cnlEYXRhLmludGVydmFsTWlsbGlzLCBMT05HX1JFVFJZX0ZBQ1RPUilcclxuICAgICAgICAgICAgOiBjYWxjdWxhdGVCYWNrb2ZmTWlsbGlzKGJhY2tvZmZDb3VudCwgcmV0cnlEYXRhLmludGVydmFsTWlsbGlzKTtcclxuICAgICAgICAvLyBJbmNyZW1lbnRzIGJhY2tvZmYgc3RhdGUuXHJcbiAgICAgICAgY29uc3QgdGhyb3R0bGVNZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgdGhyb3R0bGVFbmRUaW1lTWlsbGlzOiBEYXRlLm5vdygpICsgYmFja29mZk1pbGxpcyxcclxuICAgICAgICAgICAgYmFja29mZkNvdW50OiBiYWNrb2ZmQ291bnQgKyAxXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBQZXJzaXN0cyBzdGF0ZS5cclxuICAgICAgICByZXRyeURhdGEuc2V0VGhyb3R0bGVNZXRhZGF0YShhcHBJZCwgdGhyb3R0bGVNZXRhZGF0YSk7XHJcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBDYWxsaW5nIGF0dGVtcHRGZXRjaCBhZ2FpbiBpbiAke2JhY2tvZmZNaWxsaXN9IG1pbGxpc2ApO1xyXG4gICAgICAgIHJldHVybiBhdHRlbXB0RmV0Y2hEeW5hbWljQ29uZmlnV2l0aFJldHJ5KGFwcEZpZWxkcywgdGhyb3R0bGVNZXRhZGF0YSwgc2lnbmFsLCByZXRyeURhdGEpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBTdXBwb3J0cyB3YWl0aW5nIG9uIGEgYmFja29mZiBieTpcclxuICpcclxuICogPHVsPlxyXG4gKiAgIDxsaT5Qcm9taXNpZnlpbmcgc2V0VGltZW91dCwgc28gd2UgY2FuIHNldCBhIHRpbWVvdXQgaW4gb3VyIFByb21pc2UgY2hhaW48L2xpPlxyXG4gKiAgIDxsaT5MaXN0ZW5pbmcgb24gYSBzaWduYWwgYnVzIGZvciBhYm9ydCBldmVudHMsIGp1c3QgbGlrZSB0aGUgRmV0Y2ggQVBJPC9saT5cclxuICogICA8bGk+RmFpbGluZyBpbiB0aGUgc2FtZSB3YXkgdGhlIEZldGNoIEFQSSBmYWlscywgc28gdGltaW5nIG91dCBhIGxpdmUgcmVxdWVzdCBhbmQgYSB0aHJvdHRsZWRcclxuICogICAgICAgcmVxdWVzdCBhcHBlYXIgdGhlIHNhbWUuPC9saT5cclxuICogPC91bD5cclxuICpcclxuICogPHA+VmlzaWJsZSBmb3IgdGVzdGluZy5cclxuICovXHJcbmZ1bmN0aW9uIHNldEFib3J0YWJsZVRpbWVvdXQoc2lnbmFsLCB0aHJvdHRsZUVuZFRpbWVNaWxsaXMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgLy8gRGVyaXZlcyBiYWNrb2ZmIGZyb20gZ2l2ZW4gZW5kIHRpbWUsIG5vcm1hbGl6aW5nIG5lZ2F0aXZlIG51bWJlcnMgdG8gemVyby5cclxuICAgICAgICBjb25zdCBiYWNrb2ZmTWlsbGlzID0gTWF0aC5tYXgodGhyb3R0bGVFbmRUaW1lTWlsbGlzIC0gRGF0ZS5ub3coKSwgMCk7XHJcbiAgICAgICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQocmVzb2x2ZSwgYmFja29mZk1pbGxpcyk7XHJcbiAgICAgICAgLy8gQWRkcyBsaXN0ZW5lciwgcmF0aGVyIHRoYW4gc2V0cyBvbmFib3J0LCBiZWNhdXNlIHNpZ25hbCBpcyBhIHNoYXJlZCBvYmplY3QuXHJcbiAgICAgICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSByZXF1ZXN0IGNvbXBsZXRlcyBiZWZvcmUgdGhpcyB0aW1lb3V0LCB0aGUgcmVqZWN0aW9uIGhhcyBubyBlZmZlY3QuXHJcbiAgICAgICAgICAgIHJlamVjdChFUlJPUl9GQUNUT1JZLmNyZWF0ZShcImZldGNoLXRocm90dGxlXCIgLyogQW5hbHl0aWNzRXJyb3IuRkVUQ0hfVEhST1RUTEUgKi8sIHtcclxuICAgICAgICAgICAgICAgIHRocm90dGxlRW5kVGltZU1pbGxpc1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB7QGxpbmsgRXJyb3J9IGluZGljYXRlcyBhIGZldGNoIHJlcXVlc3QgbWF5IHN1Y2NlZWQgbGF0ZXIuXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1JldHJpYWJsZUVycm9yKGUpIHtcclxuICAgIGlmICghKGUgaW5zdGFuY2VvZiBGaXJlYmFzZUVycm9yKSB8fCAhZS5jdXN0b21EYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8gVXNlcyBzdHJpbmcgaW5kZXggZGVmaW5lZCBieSBFcnJvckRhdGEsIHdoaWNoIEZpcmViYXNlRXJyb3IgaW1wbGVtZW50cy5cclxuICAgIGNvbnN0IGh0dHBTdGF0dXMgPSBOdW1iZXIoZS5jdXN0b21EYXRhWydodHRwU3RhdHVzJ10pO1xyXG4gICAgcmV0dXJuIChodHRwU3RhdHVzID09PSA0MjkgfHxcclxuICAgICAgICBodHRwU3RhdHVzID09PSA1MDAgfHxcclxuICAgICAgICBodHRwU3RhdHVzID09PSA1MDMgfHxcclxuICAgICAgICBodHRwU3RhdHVzID09PSA1MDQpO1xyXG59XHJcbi8qKlxyXG4gKiBTaGltcyBhIG1pbmltYWwgQWJvcnRTaWduYWwgKGNvcGllZCBmcm9tIFJlbW90ZSBDb25maWcpLlxyXG4gKlxyXG4gKiA8cD5BYm9ydENvbnRyb2xsZXIncyBBYm9ydFNpZ25hbCBjb252ZW5pZW50bHkgZGVjb3VwbGVzIGZldGNoIHRpbWVvdXQgbG9naWMgZnJvbSBvdGhlciBhc3BlY3RzXHJcbiAqIG9mIG5ldHdvcmtpbmcsIHN1Y2ggYXMgcmV0cmllcy4gRmlyZWJhc2UgZG9lc24ndCB1c2UgQWJvcnRDb250cm9sbGVyIGVub3VnaCB0byBqdXN0aWZ5IGFcclxuICogcG9seWZpbGwgcmVjb21tZW5kYXRpb24sIGxpa2Ugd2UgZG8gd2l0aCB0aGUgRmV0Y2ggQVBJLCBidXQgdGhpcyBtaW5pbWFsIHNoaW0gY2FuIGVhc2lseSBiZVxyXG4gKiBzd2FwcGVkIG91dCBpZi93aGVuIHdlIGRvLlxyXG4gKi9cclxuY2xhc3MgQW5hbHl0aWNzQWJvcnRTaWduYWwge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcclxuICAgIH1cclxuICAgIGFkZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH1cclxuICAgIGFib3J0KCkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIoKSk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIEV2ZW50IHBhcmFtZXRlcnMgdG8gc2V0IG9uICdndGFnJyBkdXJpbmcgaW5pdGlhbGl6YXRpb24uXHJcbiAqL1xyXG5sZXQgZGVmYXVsdEV2ZW50UGFyYW1ldGVyc0ZvckluaXQ7XHJcbi8qKlxyXG4gKiBMb2dzIGFuIGFuYWx5dGljcyBldmVudCB0aHJvdWdoIHRoZSBGaXJlYmFzZSBTREsuXHJcbiAqXHJcbiAqIEBwYXJhbSBndGFnRnVuY3Rpb24gV3JhcHBlZCBndGFnIGZ1bmN0aW9uIHRoYXQgd2FpdHMgZm9yIGZpZCB0byBiZSBzZXQgYmVmb3JlIHNlbmRpbmcgYW4gZXZlbnRcclxuICogQHBhcmFtIGV2ZW50TmFtZSBHb29nbGUgQW5hbHl0aWNzIGV2ZW50IG5hbWUsIGNob29zZSBmcm9tIHN0YW5kYXJkIGxpc3Qgb3IgdXNlIGEgY3VzdG9tIHN0cmluZy5cclxuICogQHBhcmFtIGV2ZW50UGFyYW1zIEFuYWx5dGljcyBldmVudCBwYXJhbWV0ZXJzLlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gbG9nRXZlbnQkMShndGFnRnVuY3Rpb24sIGluaXRpYWxpemF0aW9uUHJvbWlzZSwgZXZlbnROYW1lLCBldmVudFBhcmFtcywgb3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5nbG9iYWwpIHtcclxuICAgICAgICBndGFnRnVuY3Rpb24oXCJldmVudFwiIC8qIEd0YWdDb21tYW5kLkVWRU5UICovLCBldmVudE5hbWUsIGV2ZW50UGFyYW1zKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBtZWFzdXJlbWVudElkID0gYXdhaXQgaW5pdGlhbGl6YXRpb25Qcm9taXNlO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZXZlbnRQYXJhbXMpLCB7ICdzZW5kX3RvJzogbWVhc3VyZW1lbnRJZCB9KTtcclxuICAgICAgICBndGFnRnVuY3Rpb24oXCJldmVudFwiIC8qIEd0YWdDb21tYW5kLkVWRU5UICovLCBldmVudE5hbWUsIHBhcmFtcyk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFNldCBzY3JlZW5fbmFtZSBwYXJhbWV0ZXIgZm9yIHRoaXMgR29vZ2xlIEFuYWx5dGljcyBJRC5cclxuICpcclxuICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBsb2dFdmVudH0gd2l0aCBgZXZlbnROYW1lYCBhcyAnc2NyZWVuX3ZpZXcnIGFuZCBhZGQgcmVsZXZhbnQgYGV2ZW50UGFyYW1zYC5cclxuICogU2VlIHtAbGluayBodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vZG9jcy9hbmFseXRpY3Mvc2NyZWVudmlld3MgfCBUcmFjayBTY3JlZW52aWV3c30uXHJcbiAqXHJcbiAqIEBwYXJhbSBndGFnRnVuY3Rpb24gV3JhcHBlZCBndGFnIGZ1bmN0aW9uIHRoYXQgd2FpdHMgZm9yIGZpZCB0byBiZSBzZXQgYmVmb3JlIHNlbmRpbmcgYW4gZXZlbnRcclxuICogQHBhcmFtIHNjcmVlbk5hbWUgU2NyZWVuIG5hbWUgc3RyaW5nIHRvIHNldC5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHNldEN1cnJlbnRTY3JlZW4kMShndGFnRnVuY3Rpb24sIGluaXRpYWxpemF0aW9uUHJvbWlzZSwgc2NyZWVuTmFtZSwgb3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5nbG9iYWwpIHtcclxuICAgICAgICBndGFnRnVuY3Rpb24oXCJzZXRcIiAvKiBHdGFnQ29tbWFuZC5TRVQgKi8sIHsgJ3NjcmVlbl9uYW1lJzogc2NyZWVuTmFtZSB9KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBtZWFzdXJlbWVudElkID0gYXdhaXQgaW5pdGlhbGl6YXRpb25Qcm9taXNlO1xyXG4gICAgICAgIGd0YWdGdW5jdGlvbihcImNvbmZpZ1wiIC8qIEd0YWdDb21tYW5kLkNPTkZJRyAqLywgbWVhc3VyZW1lbnRJZCwge1xyXG4gICAgICAgICAgICB1cGRhdGU6IHRydWUsXHJcbiAgICAgICAgICAgICdzY3JlZW5fbmFtZSc6IHNjcmVlbk5hbWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogU2V0IHVzZXJfaWQgcGFyYW1ldGVyIGZvciB0aGlzIEdvb2dsZSBBbmFseXRpY3MgSUQuXHJcbiAqXHJcbiAqIEBwYXJhbSBndGFnRnVuY3Rpb24gV3JhcHBlZCBndGFnIGZ1bmN0aW9uIHRoYXQgd2FpdHMgZm9yIGZpZCB0byBiZSBzZXQgYmVmb3JlIHNlbmRpbmcgYW4gZXZlbnRcclxuICogQHBhcmFtIGlkIFVzZXIgSUQgc3RyaW5nIHRvIHNldFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gc2V0VXNlcklkJDEoZ3RhZ0Z1bmN0aW9uLCBpbml0aWFsaXphdGlvblByb21pc2UsIGlkLCBvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmdsb2JhbCkge1xyXG4gICAgICAgIGd0YWdGdW5jdGlvbihcInNldFwiIC8qIEd0YWdDb21tYW5kLlNFVCAqLywgeyAndXNlcl9pZCc6IGlkIH0pO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG1lYXN1cmVtZW50SWQgPSBhd2FpdCBpbml0aWFsaXphdGlvblByb21pc2U7XHJcbiAgICAgICAgZ3RhZ0Z1bmN0aW9uKFwiY29uZmlnXCIgLyogR3RhZ0NvbW1hbmQuQ09ORklHICovLCBtZWFzdXJlbWVudElkLCB7XHJcbiAgICAgICAgICAgIHVwZGF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgJ3VzZXJfaWQnOiBpZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBTZXQgYWxsIG90aGVyIHVzZXIgcHJvcGVydGllcyBvdGhlciB0aGFuIHVzZXJfaWQgYW5kIHNjcmVlbl9uYW1lLlxyXG4gKlxyXG4gKiBAcGFyYW0gZ3RhZ0Z1bmN0aW9uIFdyYXBwZWQgZ3RhZyBmdW5jdGlvbiB0aGF0IHdhaXRzIGZvciBmaWQgdG8gYmUgc2V0IGJlZm9yZSBzZW5kaW5nIGFuIGV2ZW50XHJcbiAqIEBwYXJhbSBwcm9wZXJ0aWVzIE1hcCBvZiB1c2VyIHByb3BlcnRpZXMgdG8gc2V0XHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBzZXRVc2VyUHJvcGVydGllcyQxKGd0YWdGdW5jdGlvbiwgaW5pdGlhbGl6YXRpb25Qcm9taXNlLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmdsb2JhbCkge1xyXG4gICAgICAgIGNvbnN0IGZsYXRQcm9wZXJ0aWVzID0ge307XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocHJvcGVydGllcykpIHtcclxuICAgICAgICAgICAgLy8gdXNlIGRvdCBub3RhdGlvbiBmb3IgbWVyZ2UgYmVoYXZpb3IgaW4gZ3RhZy5qc1xyXG4gICAgICAgICAgICBmbGF0UHJvcGVydGllc1tgdXNlcl9wcm9wZXJ0aWVzLiR7a2V5fWBdID0gcHJvcGVydGllc1trZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBndGFnRnVuY3Rpb24oXCJzZXRcIiAvKiBHdGFnQ29tbWFuZC5TRVQgKi8sIGZsYXRQcm9wZXJ0aWVzKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBtZWFzdXJlbWVudElkID0gYXdhaXQgaW5pdGlhbGl6YXRpb25Qcm9taXNlO1xyXG4gICAgICAgIGd0YWdGdW5jdGlvbihcImNvbmZpZ1wiIC8qIEd0YWdDb21tYW5kLkNPTkZJRyAqLywgbWVhc3VyZW1lbnRJZCwge1xyXG4gICAgICAgICAgICB1cGRhdGU6IHRydWUsXHJcbiAgICAgICAgICAgICd1c2VyX3Byb3BlcnRpZXMnOiBwcm9wZXJ0aWVzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFNldCB3aGV0aGVyIGNvbGxlY3Rpb24gaXMgZW5hYmxlZCBmb3IgdGhpcyBJRC5cclxuICpcclxuICogQHBhcmFtIGVuYWJsZWQgSWYgdHJ1ZSwgY29sbGVjdGlvbiBpcyBlbmFibGVkIGZvciB0aGlzIElELlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gc2V0QW5hbHl0aWNzQ29sbGVjdGlvbkVuYWJsZWQkMShpbml0aWFsaXphdGlvblByb21pc2UsIGVuYWJsZWQpIHtcclxuICAgIGNvbnN0IG1lYXN1cmVtZW50SWQgPSBhd2FpdCBpbml0aWFsaXphdGlvblByb21pc2U7XHJcbiAgICB3aW5kb3dbYGdhLWRpc2FibGUtJHttZWFzdXJlbWVudElkfWBdID0gIWVuYWJsZWQ7XHJcbn1cclxuLyoqXHJcbiAqIENvbnNlbnQgcGFyYW1ldGVycyB0byBkZWZhdWx0IHRvIGR1cmluZyAnZ3RhZycgaW5pdGlhbGl6YXRpb24uXHJcbiAqL1xyXG5sZXQgZGVmYXVsdENvbnNlbnRTZXR0aW5nc0ZvckluaXQ7XHJcbi8qKlxyXG4gKiBTZXRzIHRoZSB2YXJpYWJsZSB7QGxpbmsgZGVmYXVsdENvbnNlbnRTZXR0aW5nc0ZvckluaXR9IGZvciB1c2UgaW4gdGhlIGluaXRpYWxpemF0aW9uIG9mXHJcbiAqIGFuYWx5dGljcy5cclxuICpcclxuICogQHBhcmFtIGNvbnNlbnRTZXR0aW5ncyBNYXBzIHRoZSBhcHBsaWNhYmxlIGVuZCB1c2VyIGNvbnNlbnQgc3RhdGUgZm9yIGd0YWcuanMuXHJcbiAqL1xyXG5mdW5jdGlvbiBfc2V0Q29uc2VudERlZmF1bHRGb3JJbml0KGNvbnNlbnRTZXR0aW5ncykge1xyXG4gICAgZGVmYXVsdENvbnNlbnRTZXR0aW5nc0ZvckluaXQgPSBjb25zZW50U2V0dGluZ3M7XHJcbn1cclxuLyoqXHJcbiAqIFNldHMgdGhlIHZhcmlhYmxlIGBkZWZhdWx0RXZlbnRQYXJhbWV0ZXJzRm9ySW5pdGAgZm9yIHVzZSBpbiB0aGUgaW5pdGlhbGl6YXRpb24gb2ZcclxuICogYW5hbHl0aWNzLlxyXG4gKlxyXG4gKiBAcGFyYW0gY3VzdG9tUGFyYW1zIEFueSBjdXN0b20gcGFyYW1zIHRoZSB1c2VyIG1heSBwYXNzIHRvIGd0YWcuanMuXHJcbiAqL1xyXG5mdW5jdGlvbiBfc2V0RGVmYXVsdEV2ZW50UGFyYW1ldGVyc0ZvckluaXQoY3VzdG9tUGFyYW1zKSB7XHJcbiAgICBkZWZhdWx0RXZlbnRQYXJhbWV0ZXJzRm9ySW5pdCA9IGN1c3RvbVBhcmFtcztcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUluZGV4ZWREQigpIHtcclxuICAgIGlmICghaXNJbmRleGVkREJBdmFpbGFibGUoKSkge1xyXG4gICAgICAgIGxvZ2dlci53YXJuKEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiaW5kZXhlZGRiLXVuYXZhaWxhYmxlXCIgLyogQW5hbHl0aWNzRXJyb3IuSU5ERVhFRERCX1VOQVZBSUxBQkxFICovLCB7XHJcbiAgICAgICAgICAgIGVycm9ySW5mbzogJ0luZGV4ZWREQiBpcyBub3QgYXZhaWxhYmxlIGluIHRoaXMgZW52aXJvbm1lbnQuJ1xyXG4gICAgICAgIH0pLm1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHZhbGlkYXRlSW5kZXhlZERCT3BlbmFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgbG9nZ2VyLndhcm4oRVJST1JfRkFDVE9SWS5jcmVhdGUoXCJpbmRleGVkZGItdW5hdmFpbGFibGVcIiAvKiBBbmFseXRpY3NFcnJvci5JTkRFWEVEREJfVU5BVkFJTEFCTEUgKi8sIHtcclxuICAgICAgICAgICAgICAgIGVycm9ySW5mbzogZSA9PT0gbnVsbCB8fCBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfSkubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgYW5hbHl0aWNzIGluc3RhbmNlIGluIGd0YWcuanMgYnkgY2FsbGluZyBjb25maWcgY29tbWFuZCB3aXRoIGZpZC5cclxuICpcclxuICogTk9URTogV2UgY29tYmluZSBhbmFseXRpY3MgaW5pdGlhbGl6YXRpb24gYW5kIHNldHRpbmcgZmlkIHRvZ2V0aGVyIGJlY2F1c2Ugd2Ugd2FudCBmaWQgdG8gYmVcclxuICogcGFydCBvZiB0aGUgYHBhZ2Vfdmlld2AgZXZlbnQgdGhhdCdzIHNlbnQgZHVyaW5nIHRoZSBpbml0aWFsaXphdGlvblxyXG4gKiBAcGFyYW0gYXBwIEZpcmViYXNlIGFwcFxyXG4gKiBAcGFyYW0gZ3RhZ0NvcmUgVGhlIGd0YWcgZnVuY3Rpb24gdGhhdCdzIG5vdCB3cmFwcGVkLlxyXG4gKiBAcGFyYW0gZHluYW1pY0NvbmZpZ1Byb21pc2VzTGlzdCBBcnJheSBvZiBhbGwgZHluYW1pYyBjb25maWcgcHJvbWlzZXMuXHJcbiAqIEBwYXJhbSBtZWFzdXJlbWVudElkVG9BcHBJZCBNYXBzIG1lYXN1cmVtZW50SUQgdG8gYXBwSUQuXHJcbiAqIEBwYXJhbSBpbnN0YWxsYXRpb25zIF9GaXJlYmFzZUluc3RhbGxhdGlvbnNJbnRlcm5hbCBpbnN0YW5jZS5cclxuICpcclxuICogQHJldHVybnMgTWVhc3VyZW1lbnQgSUQuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBfaW5pdGlhbGl6ZUFuYWx5dGljcyhhcHAsIGR5bmFtaWNDb25maWdQcm9taXNlc0xpc3QsIG1lYXN1cmVtZW50SWRUb0FwcElkLCBpbnN0YWxsYXRpb25zLCBndGFnQ29yZSwgZGF0YUxheWVyTmFtZSwgb3B0aW9ucykge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgY29uc3QgZHluYW1pY0NvbmZpZ1Byb21pc2UgPSBmZXRjaER5bmFtaWNDb25maWdXaXRoUmV0cnkoYXBwKTtcclxuICAgIC8vIE9uY2UgZmV0Y2hlZCwgbWFwIG1lYXN1cmVtZW50SWRzIHRvIGFwcElkLCBmb3IgZWFzZSBvZiBsb29rdXAgaW4gd3JhcHBlZCBndGFnIGZ1bmN0aW9uLlxyXG4gICAgZHluYW1pY0NvbmZpZ1Byb21pc2VcclxuICAgICAgICAudGhlbihjb25maWcgPT4ge1xyXG4gICAgICAgIG1lYXN1cmVtZW50SWRUb0FwcElkW2NvbmZpZy5tZWFzdXJlbWVudElkXSA9IGNvbmZpZy5hcHBJZDtcclxuICAgICAgICBpZiAoYXBwLm9wdGlvbnMubWVhc3VyZW1lbnRJZCAmJlxyXG4gICAgICAgICAgICBjb25maWcubWVhc3VyZW1lbnRJZCAhPT0gYXBwLm9wdGlvbnMubWVhc3VyZW1lbnRJZCkge1xyXG4gICAgICAgICAgICBsb2dnZXIud2FybihgVGhlIG1lYXN1cmVtZW50IElEIGluIHRoZSBsb2NhbCBGaXJlYmFzZSBjb25maWcgKCR7YXBwLm9wdGlvbnMubWVhc3VyZW1lbnRJZH0pYCArXHJcbiAgICAgICAgICAgICAgICBgIGRvZXMgbm90IG1hdGNoIHRoZSBtZWFzdXJlbWVudCBJRCBmZXRjaGVkIGZyb20gdGhlIHNlcnZlciAoJHtjb25maWcubWVhc3VyZW1lbnRJZH0pLmAgK1xyXG4gICAgICAgICAgICAgICAgYCBUbyBlbnN1cmUgYW5hbHl0aWNzIGV2ZW50cyBhcmUgYWx3YXlzIHNlbnQgdG8gdGhlIGNvcnJlY3QgQW5hbHl0aWNzIHByb3BlcnR5LGAgK1xyXG4gICAgICAgICAgICAgICAgYCB1cGRhdGUgdGhlYCArXHJcbiAgICAgICAgICAgICAgICBgIG1lYXN1cmVtZW50IElEIGZpZWxkIGluIHRoZSBsb2NhbCBjb25maWcgb3IgcmVtb3ZlIGl0IGZyb20gdGhlIGxvY2FsIGNvbmZpZy5gKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlID0+IGxvZ2dlci5lcnJvcihlKSk7XHJcbiAgICAvLyBBZGQgdG8gbGlzdCB0byB0cmFjayBzdGF0ZSBvZiBhbGwgZHluYW1pYyBjb25maWcgcHJvbWlzZXMuXHJcbiAgICBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0LnB1c2goZHluYW1pY0NvbmZpZ1Byb21pc2UpO1xyXG4gICAgY29uc3QgZmlkUHJvbWlzZSA9IHZhbGlkYXRlSW5kZXhlZERCKCkudGhlbihlbnZJc1ZhbGlkID0+IHtcclxuICAgICAgICBpZiAoZW52SXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFsbGF0aW9ucy5nZXRJZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IFtkeW5hbWljQ29uZmlnLCBmaWRdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgIGR5bmFtaWNDb25maWdQcm9taXNlLFxyXG4gICAgICAgIGZpZFByb21pc2VcclxuICAgIF0pO1xyXG4gICAgLy8gRGV0ZWN0IGlmIHVzZXIgaGFzIGFscmVhZHkgcHV0IHRoZSBndGFnIDxzY3JpcHQ+IHRhZyBvbiB0aGlzIHBhZ2Ugd2l0aCB0aGUgcGFzc2VkIGluXHJcbiAgICAvLyBkYXRhIGxheWVyIG5hbWUuXHJcbiAgICBpZiAoIWZpbmRHdGFnU2NyaXB0T25QYWdlKGRhdGFMYXllck5hbWUpKSB7XHJcbiAgICAgICAgaW5zZXJ0U2NyaXB0VGFnKGRhdGFMYXllck5hbWUsIGR5bmFtaWNDb25maWcubWVhc3VyZW1lbnRJZCk7XHJcbiAgICB9XHJcbiAgICAvLyBEZXRlY3RzIGlmIHRoZXJlIGFyZSBjb25zZW50IHNldHRpbmdzIHRoYXQgbmVlZCB0byBiZSBjb25maWd1cmVkLlxyXG4gICAgaWYgKGRlZmF1bHRDb25zZW50U2V0dGluZ3NGb3JJbml0KSB7XHJcbiAgICAgICAgZ3RhZ0NvcmUoXCJjb25zZW50XCIgLyogR3RhZ0NvbW1hbmQuQ09OU0VOVCAqLywgJ2RlZmF1bHQnLCBkZWZhdWx0Q29uc2VudFNldHRpbmdzRm9ySW5pdCk7XHJcbiAgICAgICAgX3NldENvbnNlbnREZWZhdWx0Rm9ySW5pdCh1bmRlZmluZWQpO1xyXG4gICAgfVxyXG4gICAgLy8gVGhpcyBjb21tYW5kIGluaXRpYWxpemVzIGd0YWcuanMgYW5kIG9ubHkgbmVlZHMgdG8gYmUgY2FsbGVkIG9uY2UgZm9yIHRoZSBlbnRpcmUgd2ViIGFwcCxcclxuICAgIC8vIGJ1dCBzaW5jZSBpdCBpcyBpZGVtcG90ZW50LCB3ZSBjYW4gY2FsbCBpdCBtdWx0aXBsZSB0aW1lcy5cclxuICAgIC8vIFdlIGtlZXAgaXQgdG9nZXRoZXIgd2l0aCBvdGhlciBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgYmV0dGVyIGNvZGUgc3RydWN0dXJlLlxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGd0YWdDb3JlKCdqcycsIG5ldyBEYXRlKCkpO1xyXG4gICAgLy8gVXNlciBjb25maWcgYWRkZWQgZmlyc3QuIFdlIGRvbid0IHdhbnQgdXNlcnMgdG8gYWNjaWRlbnRhbGx5IG92ZXJ3cml0ZVxyXG4gICAgLy8gYmFzZSBGaXJlYmFzZSBjb25maWcgcHJvcGVydGllcy5cclxuICAgIGNvbnN0IGNvbmZpZ1Byb3BlcnRpZXMgPSAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY29uZmlnKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fTtcclxuICAgIC8vIGd1YXJkIGFnYWluc3QgZGV2ZWxvcGVycyBhY2NpZGVudGFsbHkgc2V0dGluZyBwcm9wZXJ0aWVzIHdpdGggcHJlZml4IGBmaXJlYmFzZV9gXHJcbiAgICBjb25maWdQcm9wZXJ0aWVzW09SSUdJTl9LRVldID0gJ2ZpcmViYXNlJztcclxuICAgIGNvbmZpZ1Byb3BlcnRpZXMudXBkYXRlID0gdHJ1ZTtcclxuICAgIGlmIChmaWQgIT0gbnVsbCkge1xyXG4gICAgICAgIGNvbmZpZ1Byb3BlcnRpZXNbR0FfRklEX0tFWV0gPSBmaWQ7XHJcbiAgICB9XHJcbiAgICAvLyBJdCBzaG91bGQgYmUgdGhlIGZpcnN0IGNvbmZpZyBjb21tYW5kIGNhbGxlZCBvbiB0aGlzIEdBLUlEXHJcbiAgICAvLyBJbml0aWFsaXplIHRoaXMgR0EtSUQgYW5kIHNldCBGSUQgb24gaXQgdXNpbmcgdGhlIGd0YWcgY29uZmlnIEFQSS5cclxuICAgIC8vIE5vdGU6IFRoaXMgd2lsbCB0cmlnZ2VyIGEgcGFnZV92aWV3IGV2ZW50IHVubGVzcyAnc2VuZF9wYWdlX3ZpZXcnIGlzIHNldCB0byBmYWxzZSBpblxyXG4gICAgLy8gYGNvbmZpZ1Byb3BlcnRpZXNgLlxyXG4gICAgZ3RhZ0NvcmUoXCJjb25maWdcIiAvKiBHdGFnQ29tbWFuZC5DT05GSUcgKi8sIGR5bmFtaWNDb25maWcubWVhc3VyZW1lbnRJZCwgY29uZmlnUHJvcGVydGllcyk7XHJcbiAgICAvLyBEZXRlY3RzIGlmIHRoZXJlIGlzIGRhdGEgdGhhdCB3aWxsIGJlIHNldCBvbiBldmVyeSBldmVudCBsb2dnZWQgZnJvbSB0aGUgU0RLLlxyXG4gICAgaWYgKGRlZmF1bHRFdmVudFBhcmFtZXRlcnNGb3JJbml0KSB7XHJcbiAgICAgICAgZ3RhZ0NvcmUoXCJzZXRcIiAvKiBHdGFnQ29tbWFuZC5TRVQgKi8sIGRlZmF1bHRFdmVudFBhcmFtZXRlcnNGb3JJbml0KTtcclxuICAgICAgICBfc2V0RGVmYXVsdEV2ZW50UGFyYW1ldGVyc0ZvckluaXQodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkeW5hbWljQ29uZmlnLm1lYXN1cmVtZW50SWQ7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIEFuYWx5dGljcyBTZXJ2aWNlIGNsYXNzLlxyXG4gKi9cclxuY2xhc3MgQW5hbHl0aWNzU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcHApIHtcclxuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgIH1cclxuICAgIF9kZWxldGUoKSB7XHJcbiAgICAgICAgZGVsZXRlIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbdGhpcy5hcHAub3B0aW9ucy5hcHBJZF07XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBNYXBzIGFwcElkIHRvIGZ1bGwgaW5pdGlhbGl6YXRpb24gcHJvbWlzZS4gV3JhcHBlZCBndGFnIGNhbGxzIG11c3Qgd2FpdCBvblxyXG4gKiBhbGwgb3Igc29tZSBvZiB0aGVzZSwgZGVwZW5kaW5nIG9uIHRoZSBjYWxsJ3MgYHNlbmRfdG9gIHBhcmFtIGFuZCB0aGUgc3RhdHVzXHJcbiAqIG9mIHRoZSBkeW5hbWljIGNvbmZpZyBmZXRjaGVzIChzZWUgYmVsb3cpLlxyXG4gKi9cclxubGV0IGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXAgPSB7fTtcclxuLyoqXHJcbiAqIExpc3Qgb2YgZHluYW1pYyBjb25maWcgZmV0Y2ggcHJvbWlzZXMuIEluIGNlcnRhaW4gY2FzZXMsIHdyYXBwZWQgZ3RhZyBjYWxsc1xyXG4gKiB3YWl0IG9uIGFsbCB0aGVzZSB0byBiZSBjb21wbGV0ZSBpbiBvcmRlciB0byBkZXRlcm1pbmUgaWYgaXQgY2FuIHNlbGVjdGl2ZWx5XHJcbiAqIHdhaXQgZm9yIG9ubHkgY2VydGFpbiBpbml0aWFsaXphdGlvbiAoRklEKSBwcm9taXNlcyBvciBpZiBpdCBtdXN0IHdhaXQgZm9yIGFsbC5cclxuICovXHJcbmxldCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0ID0gW107XHJcbi8qKlxyXG4gKiBNYXBzIGZldGNoZWQgbWVhc3VyZW1lbnRJZHMgdG8gYXBwSWQuIFBvcHVsYXRlZCB3aGVuIHRoZSBhcHAncyBkeW5hbWljIGNvbmZpZ1xyXG4gKiBmZXRjaCBjb21wbGV0ZXMuIElmIGFscmVhZHkgcG9wdWxhdGVkLCBndGFnIGNvbmZpZyBjYWxscyBjYW4gdXNlIHRoaXMgdG9cclxuICogc2VsZWN0aXZlbHkgd2FpdCBmb3Igb25seSB0aGlzIGFwcCdzIGluaXRpYWxpemF0aW9uIHByb21pc2UgKEZJRCkgaW5zdGVhZCBvZiBhbGxcclxuICogaW5pdGlhbGl6YXRpb24gcHJvbWlzZXMuXHJcbiAqL1xyXG5jb25zdCBtZWFzdXJlbWVudElkVG9BcHBJZCA9IHt9O1xyXG4vKipcclxuICogTmFtZSBmb3Igd2luZG93IGdsb2JhbCBkYXRhIGxheWVyIGFycmF5IHVzZWQgYnkgR0E6IGRlZmF1bHRzIHRvICdkYXRhTGF5ZXInLlxyXG4gKi9cclxubGV0IGRhdGFMYXllck5hbWUgPSAnZGF0YUxheWVyJztcclxuLyoqXHJcbiAqIE5hbWUgZm9yIHdpbmRvdyBnbG9iYWwgZ3RhZyBmdW5jdGlvbiB1c2VkIGJ5IEdBOiBkZWZhdWx0cyB0byAnZ3RhZycuXHJcbiAqL1xyXG5sZXQgZ3RhZ05hbWUgPSAnZ3RhZyc7XHJcbi8qKlxyXG4gKiBSZXByb2R1Y3Rpb24gb2Ygc3RhbmRhcmQgZ3RhZyBmdW5jdGlvbiBvciByZWZlcmVuY2UgdG8gZXhpc3RpbmdcclxuICogZ3RhZyBmdW5jdGlvbiBvbiB3aW5kb3cgb2JqZWN0LlxyXG4gKi9cclxubGV0IGd0YWdDb3JlRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBXcmFwcGVyIGFyb3VuZCBndGFnIGZ1bmN0aW9uIHRoYXQgZW5zdXJlcyBGSUQgaXMgc2VudCB3aXRoIGFsbFxyXG4gKiByZWxldmFudCBldmVudCBhbmQgY29uZmlnIGNhbGxzLlxyXG4gKi9cclxubGV0IHdyYXBwZWRHdGFnRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBGbGFnIHRvIGVuc3VyZSBwYWdlIGluaXRpYWxpemF0aW9uIHN0ZXBzIChjcmVhdGlvbiBvciB3cmFwcGluZyBvZlxyXG4gKiBkYXRhTGF5ZXIgYW5kIGd0YWcgc2NyaXB0KSBhcmUgb25seSBydW4gb25jZSBwZXIgcGFnZSBsb2FkLlxyXG4gKi9cclxubGV0IGdsb2JhbEluaXREb25lID0gZmFsc2U7XHJcbi8qKlxyXG4gKiBDb25maWd1cmVzIEZpcmViYXNlIEFuYWx5dGljcyB0byB1c2UgY3VzdG9tIGBndGFnYCBvciBgZGF0YUxheWVyYCBuYW1lcy5cclxuICogSW50ZW5kZWQgdG8gYmUgdXNlZCBpZiBgZ3RhZy5qc2Agc2NyaXB0IGhhcyBiZWVuIGluc3RhbGxlZCBvblxyXG4gKiB0aGlzIHBhZ2UgaW5kZXBlbmRlbnRseSBvZiBGaXJlYmFzZSBBbmFseXRpY3MsIGFuZCBpcyB1c2luZyBub24tZGVmYXVsdFxyXG4gKiBuYW1lcyBmb3IgZWl0aGVyIHRoZSBgZ3RhZ2AgZnVuY3Rpb24gb3IgZm9yIGBkYXRhTGF5ZXJgLlxyXG4gKiBNdXN0IGJlIGNhbGxlZCBiZWZvcmUgY2FsbGluZyBgZ2V0QW5hbHl0aWNzKClgIG9yIGl0IHdvbid0XHJcbiAqIGhhdmUgYW55IGVmZmVjdC5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEN1c3RvbSBndGFnIGFuZCBkYXRhTGF5ZXIgbmFtZXMuXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXR0aW5ncyhvcHRpb25zKSB7XHJcbiAgICBpZiAoZ2xvYmFsSW5pdERvbmUpIHtcclxuICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcImFscmVhZHktaW5pdGlhbGl6ZWRcIiAvKiBBbmFseXRpY3NFcnJvci5BTFJFQURZX0lOSVRJQUxJWkVEICovKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmRhdGFMYXllck5hbWUpIHtcclxuICAgICAgICBkYXRhTGF5ZXJOYW1lID0gb3B0aW9ucy5kYXRhTGF5ZXJOYW1lO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMuZ3RhZ05hbWUpIHtcclxuICAgICAgICBndGFnTmFtZSA9IG9wdGlvbnMuZ3RhZ05hbWU7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBubyBlbnZpcm9ubWVudCBtaXNtYXRjaCBpcyBmb3VuZC5cclxuICogSWYgZW52aXJvbm1lbnQgbWlzbWF0Y2hlcyBhcmUgZm91bmQsIHRocm93cyBhbiBJTlZBTElEX0FOQUxZVElDU19DT05URVhUXHJcbiAqIGVycm9yIHRoYXQgYWxzbyBsaXN0cyBkZXRhaWxzIGZvciBlYWNoIG1pc21hdGNoIGZvdW5kLlxyXG4gKi9cclxuZnVuY3Rpb24gd2Fybk9uQnJvd3NlckNvbnRleHRNaXNtYXRjaCgpIHtcclxuICAgIGNvbnN0IG1pc21hdGNoZWRFbnZNZXNzYWdlcyA9IFtdO1xyXG4gICAgaWYgKGlzQnJvd3NlckV4dGVuc2lvbigpKSB7XHJcbiAgICAgICAgbWlzbWF0Y2hlZEVudk1lc3NhZ2VzLnB1c2goJ1RoaXMgaXMgYSBicm93c2VyIGV4dGVuc2lvbiBlbnZpcm9ubWVudC4nKTtcclxuICAgIH1cclxuICAgIGlmICghYXJlQ29va2llc0VuYWJsZWQoKSkge1xyXG4gICAgICAgIG1pc21hdGNoZWRFbnZNZXNzYWdlcy5wdXNoKCdDb29raWVzIGFyZSBub3QgYXZhaWxhYmxlLicpO1xyXG4gICAgfVxyXG4gICAgaWYgKG1pc21hdGNoZWRFbnZNZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IG1pc21hdGNoZWRFbnZNZXNzYWdlc1xyXG4gICAgICAgICAgICAubWFwKChtZXNzYWdlLCBpbmRleCkgPT4gYCgke2luZGV4ICsgMX0pICR7bWVzc2FnZX1gKVxyXG4gICAgICAgICAgICAuam9pbignICcpO1xyXG4gICAgICAgIGNvbnN0IGVyciA9IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiaW52YWxpZC1hbmFseXRpY3MtY29udGV4dFwiIC8qIEFuYWx5dGljc0Vycm9yLklOVkFMSURfQU5BTFlUSUNTX0NPTlRFWFQgKi8sIHtcclxuICAgICAgICAgICAgZXJyb3JJbmZvOiBkZXRhaWxzXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbG9nZ2VyLndhcm4oZXJyLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBBbmFseXRpY3MgaW5zdGFuY2UgZmFjdG9yeS5cclxuICogQGludGVybmFsXHJcbiAqL1xyXG5mdW5jdGlvbiBmYWN0b3J5KGFwcCwgaW5zdGFsbGF0aW9ucywgb3B0aW9ucykge1xyXG4gICAgd2Fybk9uQnJvd3NlckNvbnRleHRNaXNtYXRjaCgpO1xyXG4gICAgY29uc3QgYXBwSWQgPSBhcHAub3B0aW9ucy5hcHBJZDtcclxuICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcIm5vLWFwcC1pZFwiIC8qIEFuYWx5dGljc0Vycm9yLk5PX0FQUF9JRCAqLyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWFwcC5vcHRpb25zLmFwaUtleSkge1xyXG4gICAgICAgIGlmIChhcHAub3B0aW9ucy5tZWFzdXJlbWVudElkKSB7XHJcbiAgICAgICAgICAgIGxvZ2dlci53YXJuKGBUaGUgXCJhcGlLZXlcIiBmaWVsZCBpcyBlbXB0eSBpbiB0aGUgbG9jYWwgRmlyZWJhc2UgY29uZmlnLiBUaGlzIGlzIG5lZWRlZCB0byBmZXRjaCB0aGUgbGF0ZXN0YCArXHJcbiAgICAgICAgICAgICAgICBgIG1lYXN1cmVtZW50IElEIGZvciB0aGlzIEZpcmViYXNlIGFwcC4gRmFsbGluZyBiYWNrIHRvIHRoZSBtZWFzdXJlbWVudCBJRCAke2FwcC5vcHRpb25zLm1lYXN1cmVtZW50SWR9YCArXHJcbiAgICAgICAgICAgICAgICBgIHByb3ZpZGVkIGluIHRoZSBcIm1lYXN1cmVtZW50SWRcIiBmaWVsZCBpbiB0aGUgbG9jYWwgRmlyZWJhc2UgY29uZmlnLmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgRVJST1JfRkFDVE9SWS5jcmVhdGUoXCJuby1hcGkta2V5XCIgLyogQW5hbHl0aWNzRXJyb3IuTk9fQVBJX0tFWSAqLyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbYXBwSWRdICE9IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcImFscmVhZHktZXhpc3RzXCIgLyogQW5hbHl0aWNzRXJyb3IuQUxSRUFEWV9FWElTVFMgKi8sIHtcclxuICAgICAgICAgICAgaWQ6IGFwcElkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWdsb2JhbEluaXREb25lKSB7XHJcbiAgICAgICAgLy8gU3RlcHMgaGVyZSBzaG91bGQgb25seSBiZSBkb25lIG9uY2UgcGVyIHBhZ2U6IGNyZWF0aW9uIG9yIHdyYXBwaW5nXHJcbiAgICAgICAgLy8gb2YgZGF0YUxheWVyIGFuZCBnbG9iYWwgZ3RhZyBmdW5jdGlvbi5cclxuICAgICAgICBnZXRPckNyZWF0ZURhdGFMYXllcihkYXRhTGF5ZXJOYW1lKTtcclxuICAgICAgICBjb25zdCB7IHdyYXBwZWRHdGFnLCBndGFnQ29yZSB9ID0gd3JhcE9yQ3JlYXRlR3RhZyhpbml0aWFsaXphdGlvblByb21pc2VzTWFwLCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0LCBtZWFzdXJlbWVudElkVG9BcHBJZCwgZGF0YUxheWVyTmFtZSwgZ3RhZ05hbWUpO1xyXG4gICAgICAgIHdyYXBwZWRHdGFnRnVuY3Rpb24gPSB3cmFwcGVkR3RhZztcclxuICAgICAgICBndGFnQ29yZUZ1bmN0aW9uID0gZ3RhZ0NvcmU7XHJcbiAgICAgICAgZ2xvYmFsSW5pdERvbmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8gQXN5bmMgYnV0IG5vbi1ibG9ja2luZy5cclxuICAgIC8vIFRoaXMgbWFwIHJlZmxlY3RzIHRoZSBjb21wbGV0aW9uIHN0YXRlIG9mIGFsbCBwcm9taXNlcyBmb3IgZWFjaCBhcHBJZC5cclxuICAgIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbYXBwSWRdID0gX2luaXRpYWxpemVBbmFseXRpY3MoYXBwLCBkeW5hbWljQ29uZmlnUHJvbWlzZXNMaXN0LCBtZWFzdXJlbWVudElkVG9BcHBJZCwgaW5zdGFsbGF0aW9ucywgZ3RhZ0NvcmVGdW5jdGlvbiwgZGF0YUxheWVyTmFtZSwgb3B0aW9ucyk7XHJcbiAgICBjb25zdCBhbmFseXRpY3NJbnN0YW5jZSA9IG5ldyBBbmFseXRpY3NTZXJ2aWNlKGFwcCk7XHJcbiAgICByZXR1cm4gYW5hbHl0aWNzSW5zdGFuY2U7XHJcbn1cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xyXG4vKipcclxuICogUmV0dXJucyBhbiB7QGxpbmsgQW5hbHl0aWNzfSBpbnN0YW5jZSBmb3IgdGhlIGdpdmVuIGFwcC5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcGFyYW0gYXBwIC0gVGhlIHtAbGluayBAZmlyZWJhc2UvYXBwI0ZpcmViYXNlQXBwfSB0byB1c2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRBbmFseXRpY3MoYXBwID0gZ2V0QXBwKCkpIHtcclxuICAgIGFwcCA9IGdldE1vZHVsYXJJbnN0YW5jZShhcHApO1xyXG4gICAgLy8gRGVwZW5kZW5jaWVzXHJcbiAgICBjb25zdCBhbmFseXRpY3NQcm92aWRlciA9IF9nZXRQcm92aWRlcihhcHAsIEFOQUxZVElDU19UWVBFKTtcclxuICAgIGlmIChhbmFseXRpY3NQcm92aWRlci5pc0luaXRpYWxpemVkKCkpIHtcclxuICAgICAgICByZXR1cm4gYW5hbHl0aWNzUHJvdmlkZXIuZ2V0SW1tZWRpYXRlKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5pdGlhbGl6ZUFuYWx5dGljcyhhcHApO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIHtAbGluayBBbmFseXRpY3N9IGluc3RhbmNlIGZvciB0aGUgZ2l2ZW4gYXBwLlxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEBwYXJhbSBhcHAgLSBUaGUge0BsaW5rIEBmaXJlYmFzZS9hcHAjRmlyZWJhc2VBcHB9IHRvIHVzZS5cclxuICovXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVBbmFseXRpY3MoYXBwLCBvcHRpb25zID0ge30pIHtcclxuICAgIC8vIERlcGVuZGVuY2llc1xyXG4gICAgY29uc3QgYW5hbHl0aWNzUHJvdmlkZXIgPSBfZ2V0UHJvdmlkZXIoYXBwLCBBTkFMWVRJQ1NfVFlQRSk7XHJcbiAgICBpZiAoYW5hbHl0aWNzUHJvdmlkZXIuaXNJbml0aWFsaXplZCgpKSB7XHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdJbnN0YW5jZSA9IGFuYWx5dGljc1Byb3ZpZGVyLmdldEltbWVkaWF0ZSgpO1xyXG4gICAgICAgIGlmIChkZWVwRXF1YWwob3B0aW9ucywgYW5hbHl0aWNzUHJvdmlkZXIuZ2V0T3B0aW9ucygpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXhpc3RpbmdJbnN0YW5jZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiYWxyZWFkeS1pbml0aWFsaXplZFwiIC8qIEFuYWx5dGljc0Vycm9yLkFMUkVBRFlfSU5JVElBTElaRUQgKi8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IGFuYWx5dGljc0luc3RhbmNlID0gYW5hbHl0aWNzUHJvdmlkZXIuaW5pdGlhbGl6ZSh7IG9wdGlvbnMgfSk7XHJcbiAgICByZXR1cm4gYW5hbHl0aWNzSW5zdGFuY2U7XHJcbn1cclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBwdWJsaWMgc3RhdGljIG1ldGhvZCBwcm92aWRlZCB0byB1c2VycyB0aGF0IHdyYXBzIGZvdXIgZGlmZmVyZW50IGNoZWNrczpcclxuICpcclxuICogMS4gQ2hlY2sgaWYgaXQncyBub3QgYSBicm93c2VyIGV4dGVuc2lvbiBlbnZpcm9ubWVudC5cclxuICogMi4gQ2hlY2sgaWYgY29va2llcyBhcmUgZW5hYmxlZCBpbiBjdXJyZW50IGJyb3dzZXIuXHJcbiAqIDMuIENoZWNrIGlmIEluZGV4ZWREQiBpcyBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXIgZW52aXJvbm1lbnQuXHJcbiAqIDQuIENoZWNrIGlmIHRoZSBjdXJyZW50IGJyb3dzZXIgY29udGV4dCBpcyB2YWxpZCBmb3IgdXNpbmcgYEluZGV4ZWREQi5vcGVuKClgLlxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcclxuICAgIGlmIChpc0Jyb3dzZXJFeHRlbnNpb24oKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICghYXJlQ29va2llc0VuYWJsZWQoKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICghaXNJbmRleGVkREJBdmFpbGFibGUoKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgaXNEQk9wZW5hYmxlID0gYXdhaXQgdmFsaWRhdGVJbmRleGVkREJPcGVuYWJsZSgpO1xyXG4gICAgICAgIHJldHVybiBpc0RCT3BlbmFibGU7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFVzZSBndGFnIGBjb25maWdgIGNvbW1hbmQgdG8gc2V0IGBzY3JlZW5fbmFtZWAuXHJcbiAqXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBsb2dFdmVudH0gd2l0aCBgZXZlbnROYW1lYCBhcyAnc2NyZWVuX3ZpZXcnIGFuZCBhZGQgcmVsZXZhbnQgYGV2ZW50UGFyYW1zYC5cclxuICogU2VlIHtAbGluayBodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vZG9jcy9hbmFseXRpY3Mvc2NyZWVudmlld3MgfCBUcmFjayBTY3JlZW52aWV3c30uXHJcbiAqXHJcbiAqIEBwYXJhbSBhbmFseXRpY3NJbnN0YW5jZSAtIFRoZSB7QGxpbmsgQW5hbHl0aWNzfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIHNjcmVlbk5hbWUgLSBTY3JlZW4gbmFtZSB0byBzZXQuXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRDdXJyZW50U2NyZWVuKGFuYWx5dGljc0luc3RhbmNlLCBzY3JlZW5OYW1lLCBvcHRpb25zKSB7XHJcbiAgICBhbmFseXRpY3NJbnN0YW5jZSA9IGdldE1vZHVsYXJJbnN0YW5jZShhbmFseXRpY3NJbnN0YW5jZSk7XHJcbiAgICBzZXRDdXJyZW50U2NyZWVuJDEod3JhcHBlZEd0YWdGdW5jdGlvbiwgaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcFthbmFseXRpY3NJbnN0YW5jZS5hcHAub3B0aW9ucy5hcHBJZF0sIHNjcmVlbk5hbWUsIG9wdGlvbnMpLmNhdGNoKGUgPT4gbG9nZ2VyLmVycm9yKGUpKTtcclxufVxyXG4vKipcclxuICogVXNlIGd0YWcgYGNvbmZpZ2AgY29tbWFuZCB0byBzZXQgYHVzZXJfaWRgLlxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEBwYXJhbSBhbmFseXRpY3NJbnN0YW5jZSAtIFRoZSB7QGxpbmsgQW5hbHl0aWNzfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIGlkIC0gVXNlciBJRCB0byBzZXQuXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRVc2VySWQoYW5hbHl0aWNzSW5zdGFuY2UsIGlkLCBvcHRpb25zKSB7XHJcbiAgICBhbmFseXRpY3NJbnN0YW5jZSA9IGdldE1vZHVsYXJJbnN0YW5jZShhbmFseXRpY3NJbnN0YW5jZSk7XHJcbiAgICBzZXRVc2VySWQkMSh3cmFwcGVkR3RhZ0Z1bmN0aW9uLCBpbml0aWFsaXphdGlvblByb21pc2VzTWFwW2FuYWx5dGljc0luc3RhbmNlLmFwcC5vcHRpb25zLmFwcElkXSwgaWQsIG9wdGlvbnMpLmNhdGNoKGUgPT4gbG9nZ2VyLmVycm9yKGUpKTtcclxufVxyXG4vKipcclxuICogVXNlIGd0YWcgYGNvbmZpZ2AgY29tbWFuZCB0byBzZXQgYWxsIHBhcmFtcyBzcGVjaWZpZWQuXHJcbiAqXHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmZ1bmN0aW9uIHNldFVzZXJQcm9wZXJ0aWVzKGFuYWx5dGljc0luc3RhbmNlLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XHJcbiAgICBhbmFseXRpY3NJbnN0YW5jZSA9IGdldE1vZHVsYXJJbnN0YW5jZShhbmFseXRpY3NJbnN0YW5jZSk7XHJcbiAgICBzZXRVc2VyUHJvcGVydGllcyQxKHdyYXBwZWRHdGFnRnVuY3Rpb24sIGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbYW5hbHl0aWNzSW5zdGFuY2UuYXBwLm9wdGlvbnMuYXBwSWRdLCBwcm9wZXJ0aWVzLCBvcHRpb25zKS5jYXRjaChlID0+IGxvZ2dlci5lcnJvcihlKSk7XHJcbn1cclxuLyoqXHJcbiAqIFNldHMgd2hldGhlciBHb29nbGUgQW5hbHl0aWNzIGNvbGxlY3Rpb24gaXMgZW5hYmxlZCBmb3IgdGhpcyBhcHAgb24gdGhpcyBkZXZpY2UuXHJcbiAqIFNldHMgZ2xvYmFsIGB3aW5kb3dbJ2dhLWRpc2FibGUtYW5hbHl0aWNzSWQnXSA9IHRydWU7YFxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqXHJcbiAqIEBwYXJhbSBhbmFseXRpY3NJbnN0YW5jZSAtIFRoZSB7QGxpbmsgQW5hbHl0aWNzfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIGVuYWJsZWQgLSBJZiB0cnVlLCBlbmFibGVzIGNvbGxlY3Rpb24sIGlmIGZhbHNlLCBkaXNhYmxlcyBpdC5cclxuICovXHJcbmZ1bmN0aW9uIHNldEFuYWx5dGljc0NvbGxlY3Rpb25FbmFibGVkKGFuYWx5dGljc0luc3RhbmNlLCBlbmFibGVkKSB7XHJcbiAgICBhbmFseXRpY3NJbnN0YW5jZSA9IGdldE1vZHVsYXJJbnN0YW5jZShhbmFseXRpY3NJbnN0YW5jZSk7XHJcbiAgICBzZXRBbmFseXRpY3NDb2xsZWN0aW9uRW5hYmxlZCQxKGluaXRpYWxpemF0aW9uUHJvbWlzZXNNYXBbYW5hbHl0aWNzSW5zdGFuY2UuYXBwLm9wdGlvbnMuYXBwSWRdLCBlbmFibGVkKS5jYXRjaChlID0+IGxvZ2dlci5lcnJvcihlKSk7XHJcbn1cclxuLyoqXHJcbiAqIEFkZHMgZGF0YSB0aGF0IHdpbGwgYmUgc2V0IG9uIGV2ZXJ5IGV2ZW50IGxvZ2dlZCBmcm9tIHRoZSBTREssIGluY2x1ZGluZyBhdXRvbWF0aWMgb25lcy5cclxuICogV2l0aCBndGFnJ3MgXCJzZXRcIiBjb21tYW5kLCB0aGUgdmFsdWVzIHBhc3NlZCBwZXJzaXN0IG9uIHRoZSBjdXJyZW50IHBhZ2UgYW5kIGFyZSBwYXNzZWQgd2l0aFxyXG4gKiBhbGwgc3Vic2VxdWVudCBldmVudHMuXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIGN1c3RvbVBhcmFtcyAtIEFueSBjdXN0b20gcGFyYW1zIHRoZSB1c2VyIG1heSBwYXNzIHRvIGd0YWcuanMuXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXREZWZhdWx0RXZlbnRQYXJhbWV0ZXJzKGN1c3RvbVBhcmFtcykge1xyXG4gICAgLy8gQ2hlY2sgaWYgcmVmZXJlbmNlIHRvIGV4aXN0aW5nIGd0YWcgZnVuY3Rpb24gb24gd2luZG93IG9iamVjdCBleGlzdHNcclxuICAgIGlmICh3cmFwcGVkR3RhZ0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgd3JhcHBlZEd0YWdGdW5jdGlvbihcInNldFwiIC8qIEd0YWdDb21tYW5kLlNFVCAqLywgY3VzdG9tUGFyYW1zKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIF9zZXREZWZhdWx0RXZlbnRQYXJhbWV0ZXJzRm9ySW5pdChjdXN0b21QYXJhbXMpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBTZW5kcyBhIEdvb2dsZSBBbmFseXRpY3MgZXZlbnQgd2l0aCBnaXZlbiBgZXZlbnRQYXJhbXNgLiBUaGlzIG1ldGhvZFxyXG4gKiBhdXRvbWF0aWNhbGx5IGFzc29jaWF0ZXMgdGhpcyBsb2dnZWQgZXZlbnQgd2l0aCB0aGlzIEZpcmViYXNlIHdlYlxyXG4gKiBhcHAgaW5zdGFuY2Ugb24gdGhpcyBkZXZpY2UuXHJcbiAqIExpc3Qgb2Ygb2ZmaWNpYWwgZXZlbnQgcGFyYW1ldGVycyBjYW4gYmUgZm91bmQgaW4gdGhlIGd0YWcuanNcclxuICogcmVmZXJlbmNlIGRvY3VtZW50YXRpb246XHJcbiAqIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9ndGFnanMvcmVmZXJlbmNlL2dhNC1ldmVudHNcclxuICogfCB0aGUgR0E0IHJlZmVyZW5jZSBkb2N1bWVudGF0aW9ufS5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKi9cclxuZnVuY3Rpb24gbG9nRXZlbnQoYW5hbHl0aWNzSW5zdGFuY2UsIGV2ZW50TmFtZSwgZXZlbnRQYXJhbXMsIG9wdGlvbnMpIHtcclxuICAgIGFuYWx5dGljc0luc3RhbmNlID0gZ2V0TW9kdWxhckluc3RhbmNlKGFuYWx5dGljc0luc3RhbmNlKTtcclxuICAgIGxvZ0V2ZW50JDEod3JhcHBlZEd0YWdGdW5jdGlvbiwgaW5pdGlhbGl6YXRpb25Qcm9taXNlc01hcFthbmFseXRpY3NJbnN0YW5jZS5hcHAub3B0aW9ucy5hcHBJZF0sIGV2ZW50TmFtZSwgZXZlbnRQYXJhbXMsIG9wdGlvbnMpLmNhdGNoKGUgPT4gbG9nZ2VyLmVycm9yKGUpKTtcclxufVxyXG4vKipcclxuICogU2V0cyB0aGUgYXBwbGljYWJsZSBlbmQgdXNlciBjb25zZW50IHN0YXRlIGZvciB0aGlzIHdlYiBhcHAgYWNyb3NzIGFsbCBndGFnIHJlZmVyZW5jZXMgb25jZVxyXG4gKiBGaXJlYmFzZSBBbmFseXRpY3MgaXMgaW5pdGlhbGl6ZWQuXHJcbiAqXHJcbiAqIFVzZSB0aGUge0BsaW5rIENvbnNlbnRTZXR0aW5nc30gdG8gc3BlY2lmeSBpbmRpdmlkdWFsIGNvbnNlbnQgdHlwZSB2YWx1ZXMuIEJ5IGRlZmF1bHQgY29uc2VudFxyXG4gKiB0eXBlcyBhcmUgc2V0IHRvIFwiZ3JhbnRlZFwiLlxyXG4gKiBAcHVibGljXHJcbiAqIEBwYXJhbSBjb25zZW50U2V0dGluZ3MgLSBNYXBzIHRoZSBhcHBsaWNhYmxlIGVuZCB1c2VyIGNvbnNlbnQgc3RhdGUgZm9yIGd0YWcuanMuXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRDb25zZW50KGNvbnNlbnRTZXR0aW5ncykge1xyXG4gICAgLy8gQ2hlY2sgaWYgcmVmZXJlbmNlIHRvIGV4aXN0aW5nIGd0YWcgZnVuY3Rpb24gb24gd2luZG93IG9iamVjdCBleGlzdHNcclxuICAgIGlmICh3cmFwcGVkR3RhZ0Z1bmN0aW9uKSB7XHJcbiAgICAgICAgd3JhcHBlZEd0YWdGdW5jdGlvbihcImNvbnNlbnRcIiAvKiBHdGFnQ29tbWFuZC5DT05TRU5UICovLCAndXBkYXRlJywgY29uc2VudFNldHRpbmdzKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIF9zZXRDb25zZW50RGVmYXVsdEZvckluaXQoY29uc2VudFNldHRpbmdzKTtcclxuICAgIH1cclxufVxuXG5jb25zdCBuYW1lID0gXCJAZmlyZWJhc2UvYW5hbHl0aWNzXCI7XG5jb25zdCB2ZXJzaW9uID0gXCIwLjkuNFwiO1xuXG4vKipcclxuICogRmlyZWJhc2UgQW5hbHl0aWNzXHJcbiAqXHJcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gcmVnaXN0ZXJBbmFseXRpY3MoKSB7XHJcbiAgICBfcmVnaXN0ZXJDb21wb25lbnQobmV3IENvbXBvbmVudChBTkFMWVRJQ1NfVFlQRSwgKGNvbnRhaW5lciwgeyBvcHRpb25zOiBhbmFseXRpY3NPcHRpb25zIH0pID0+IHtcclxuICAgICAgICAvLyBnZXRJbW1lZGlhdGUgZm9yIEZpcmViYXNlQXBwIHdpbGwgYWx3YXlzIHN1Y2NlZWRcclxuICAgICAgICBjb25zdCBhcHAgPSBjb250YWluZXIuZ2V0UHJvdmlkZXIoJ2FwcCcpLmdldEltbWVkaWF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IGluc3RhbGxhdGlvbnMgPSBjb250YWluZXJcclxuICAgICAgICAgICAgLmdldFByb3ZpZGVyKCdpbnN0YWxsYXRpb25zLWludGVybmFsJylcclxuICAgICAgICAgICAgLmdldEltbWVkaWF0ZSgpO1xyXG4gICAgICAgIHJldHVybiBmYWN0b3J5KGFwcCwgaW5zdGFsbGF0aW9ucywgYW5hbHl0aWNzT3B0aW9ucyk7XHJcbiAgICB9LCBcIlBVQkxJQ1wiIC8qIENvbXBvbmVudFR5cGUuUFVCTElDICovKSk7XHJcbiAgICBfcmVnaXN0ZXJDb21wb25lbnQobmV3IENvbXBvbmVudCgnYW5hbHl0aWNzLWludGVybmFsJywgaW50ZXJuYWxGYWN0b3J5LCBcIlBSSVZBVEVcIiAvKiBDb21wb25lbnRUeXBlLlBSSVZBVEUgKi8pKTtcclxuICAgIHJlZ2lzdGVyVmVyc2lvbihuYW1lLCB2ZXJzaW9uKTtcclxuICAgIC8vIEJVSUxEX1RBUkdFVCB3aWxsIGJlIHJlcGxhY2VkIGJ5IHZhbHVlcyBsaWtlIGVzbTUsIGVzbTIwMTcsIGNqczUsIGV0YyBkdXJpbmcgdGhlIGNvbXBpbGF0aW9uXHJcbiAgICByZWdpc3RlclZlcnNpb24obmFtZSwgdmVyc2lvbiwgJ2VzbTIwMTcnKTtcclxuICAgIGZ1bmN0aW9uIGludGVybmFsRmFjdG9yeShjb250YWluZXIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBhbmFseXRpY3MgPSBjb250YWluZXIuZ2V0UHJvdmlkZXIoQU5BTFlUSUNTX1RZUEUpLmdldEltbWVkaWF0ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbG9nRXZlbnQ6IChldmVudE5hbWUsIGV2ZW50UGFyYW1zLCBvcHRpb25zKSA9PiBsb2dFdmVudChhbmFseXRpY3MsIGV2ZW50TmFtZSwgZXZlbnRQYXJhbXMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiaW50ZXJvcC1jb21wb25lbnQtcmVnLWZhaWxlZFwiIC8qIEFuYWx5dGljc0Vycm9yLklOVEVST1BfQ09NUE9ORU5UX1JFR19GQUlMRUQgKi8sIHtcclxuICAgICAgICAgICAgICAgIHJlYXNvbjogZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxucmVnaXN0ZXJBbmFseXRpY3MoKTtcblxuZXhwb3J0IHsgZ2V0QW5hbHl0aWNzLCBpbml0aWFsaXplQW5hbHl0aWNzLCBpc1N1cHBvcnRlZCwgbG9nRXZlbnQsIHNldEFuYWx5dGljc0NvbGxlY3Rpb25FbmFibGVkLCBzZXRDb25zZW50LCBzZXRDdXJyZW50U2NyZWVuLCBzZXREZWZhdWx0RXZlbnRQYXJhbWV0ZXJzLCBzZXRVc2VySWQsIHNldFVzZXJQcm9wZXJ0aWVzLCBzZXR0aW5ncyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguZXNtMjAxNy5qcy5tYXBcbiIsImltcG9ydCB7IF9nZXRQcm92aWRlciwgZ2V0QXBwLCBfcmVnaXN0ZXJDb21wb25lbnQsIHJlZ2lzdGVyVmVyc2lvbiB9IGZyb20gJ0BmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGZpcmViYXNlL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBFcnJvckZhY3RvcnksIEZpcmViYXNlRXJyb3IgfSBmcm9tICdAZmlyZWJhc2UvdXRpbCc7XG5pbXBvcnQgeyBvcGVuREIgfSBmcm9tICdpZGInO1xuXG5jb25zdCBuYW1lID0gXCJAZmlyZWJhc2UvaW5zdGFsbGF0aW9uc1wiO1xuY29uc3QgdmVyc2lvbiA9IFwiMC42LjRcIjtcblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuY29uc3QgUEVORElOR19USU1FT1VUX01TID0gMTAwMDA7XHJcbmNvbnN0IFBBQ0tBR0VfVkVSU0lPTiA9IGB3OiR7dmVyc2lvbn1gO1xyXG5jb25zdCBJTlRFUk5BTF9BVVRIX1ZFUlNJT04gPSAnRklTX3YyJztcclxuY29uc3QgSU5TVEFMTEFUSU9OU19BUElfVVJMID0gJ2h0dHBzOi8vZmlyZWJhc2VpbnN0YWxsYXRpb25zLmdvb2dsZWFwaXMuY29tL3YxJztcclxuY29uc3QgVE9LRU5fRVhQSVJBVElPTl9CVUZGRVIgPSA2MCAqIDYwICogMTAwMDsgLy8gT25lIGhvdXJcclxuY29uc3QgU0VSVklDRSA9ICdpbnN0YWxsYXRpb25zJztcclxuY29uc3QgU0VSVklDRV9OQU1FID0gJ0luc3RhbGxhdGlvbnMnO1xuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5jb25zdCBFUlJPUl9ERVNDUklQVElPTl9NQVAgPSB7XHJcbiAgICBbXCJtaXNzaW5nLWFwcC1jb25maWctdmFsdWVzXCIgLyogRXJyb3JDb2RlLk1JU1NJTkdfQVBQX0NPTkZJR19WQUxVRVMgKi9dOiAnTWlzc2luZyBBcHAgY29uZmlndXJhdGlvbiB2YWx1ZTogXCJ7JHZhbHVlTmFtZX1cIicsXHJcbiAgICBbXCJub3QtcmVnaXN0ZXJlZFwiIC8qIEVycm9yQ29kZS5OT1RfUkVHSVNURVJFRCAqL106ICdGaXJlYmFzZSBJbnN0YWxsYXRpb24gaXMgbm90IHJlZ2lzdGVyZWQuJyxcclxuICAgIFtcImluc3RhbGxhdGlvbi1ub3QtZm91bmRcIiAvKiBFcnJvckNvZGUuSU5TVEFMTEFUSU9OX05PVF9GT1VORCAqL106ICdGaXJlYmFzZSBJbnN0YWxsYXRpb24gbm90IGZvdW5kLicsXHJcbiAgICBbXCJyZXF1ZXN0LWZhaWxlZFwiIC8qIEVycm9yQ29kZS5SRVFVRVNUX0ZBSUxFRCAqL106ICd7JHJlcXVlc3ROYW1lfSByZXF1ZXN0IGZhaWxlZCB3aXRoIGVycm9yIFwieyRzZXJ2ZXJDb2RlfSB7JHNlcnZlclN0YXR1c306IHskc2VydmVyTWVzc2FnZX1cIicsXHJcbiAgICBbXCJhcHAtb2ZmbGluZVwiIC8qIEVycm9yQ29kZS5BUFBfT0ZGTElORSAqL106ICdDb3VsZCBub3QgcHJvY2VzcyByZXF1ZXN0LiBBcHBsaWNhdGlvbiBvZmZsaW5lLicsXHJcbiAgICBbXCJkZWxldGUtcGVuZGluZy1yZWdpc3RyYXRpb25cIiAvKiBFcnJvckNvZGUuREVMRVRFX1BFTkRJTkdfUkVHSVNUUkFUSU9OICovXTogXCJDYW4ndCBkZWxldGUgaW5zdGFsbGF0aW9uIHdoaWxlIHRoZXJlIGlzIGEgcGVuZGluZyByZWdpc3RyYXRpb24gcmVxdWVzdC5cIlxyXG59O1xyXG5jb25zdCBFUlJPUl9GQUNUT1JZID0gbmV3IEVycm9yRmFjdG9yeShTRVJWSUNFLCBTRVJWSUNFX05BTUUsIEVSUk9SX0RFU0NSSVBUSU9OX01BUCk7XHJcbi8qKiBSZXR1cm5zIHRydWUgaWYgZXJyb3IgaXMgYSBGaXJlYmFzZUVycm9yIHRoYXQgaXMgYmFzZWQgb24gYW4gZXJyb3IgZnJvbSB0aGUgc2VydmVyLiAqL1xyXG5mdW5jdGlvbiBpc1NlcnZlckVycm9yKGVycm9yKSB7XHJcbiAgICByZXR1cm4gKGVycm9yIGluc3RhbmNlb2YgRmlyZWJhc2VFcnJvciAmJlxyXG4gICAgICAgIGVycm9yLmNvZGUuaW5jbHVkZXMoXCJyZXF1ZXN0LWZhaWxlZFwiIC8qIEVycm9yQ29kZS5SRVFVRVNUX0ZBSUxFRCAqLykpO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmZ1bmN0aW9uIGdldEluc3RhbGxhdGlvbnNFbmRwb2ludCh7IHByb2plY3RJZCB9KSB7XHJcbiAgICByZXR1cm4gYCR7SU5TVEFMTEFUSU9OU19BUElfVVJMfS9wcm9qZWN0cy8ke3Byb2plY3RJZH0vaW5zdGFsbGF0aW9uc2A7XHJcbn1cclxuZnVuY3Rpb24gZXh0cmFjdEF1dGhUb2tlbkluZm9Gcm9tUmVzcG9uc2UocmVzcG9uc2UpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9rZW46IHJlc3BvbnNlLnRva2VuLFxyXG4gICAgICAgIHJlcXVlc3RTdGF0dXM6IDIgLyogUmVxdWVzdFN0YXR1cy5DT01QTEVURUQgKi8sXHJcbiAgICAgICAgZXhwaXJlc0luOiBnZXRFeHBpcmVzSW5Gcm9tUmVzcG9uc2VFeHBpcmVzSW4ocmVzcG9uc2UuZXhwaXJlc0luKSxcclxuICAgICAgICBjcmVhdGlvblRpbWU6IERhdGUubm93KClcclxuICAgIH07XHJcbn1cclxuYXN5bmMgZnVuY3Rpb24gZ2V0RXJyb3JGcm9tUmVzcG9uc2UocmVxdWVzdE5hbWUsIHJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCByZXNwb25zZUpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICBjb25zdCBlcnJvckRhdGEgPSByZXNwb25zZUpzb24uZXJyb3I7XHJcbiAgICByZXR1cm4gRVJST1JfRkFDVE9SWS5jcmVhdGUoXCJyZXF1ZXN0LWZhaWxlZFwiIC8qIEVycm9yQ29kZS5SRVFVRVNUX0ZBSUxFRCAqLywge1xyXG4gICAgICAgIHJlcXVlc3ROYW1lLFxyXG4gICAgICAgIHNlcnZlckNvZGU6IGVycm9yRGF0YS5jb2RlLFxyXG4gICAgICAgIHNlcnZlck1lc3NhZ2U6IGVycm9yRGF0YS5tZXNzYWdlLFxyXG4gICAgICAgIHNlcnZlclN0YXR1czogZXJyb3JEYXRhLnN0YXR1c1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0SGVhZGVycyh7IGFwaUtleSB9KSB7XHJcbiAgICByZXR1cm4gbmV3IEhlYWRlcnMoe1xyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgJ3gtZ29vZy1hcGkta2V5JzogYXBpS2V5XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBnZXRIZWFkZXJzV2l0aEF1dGgoYXBwQ29uZmlnLCB7IHJlZnJlc2hUb2tlbiB9KSB7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gZ2V0SGVhZGVycyhhcHBDb25maWcpO1xyXG4gICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBnZXRBdXRob3JpemF0aW9uSGVhZGVyKHJlZnJlc2hUb2tlbikpO1xyXG4gICAgcmV0dXJuIGhlYWRlcnM7XHJcbn1cclxuLyoqXHJcbiAqIENhbGxzIHRoZSBwYXNzZWQgaW4gZmV0Y2ggd3JhcHBlciBhbmQgcmV0dXJucyB0aGUgcmVzcG9uc2UuXHJcbiAqIElmIHRoZSByZXR1cm5lZCByZXNwb25zZSBoYXMgYSBzdGF0dXMgb2YgNXh4LCByZS1ydW5zIHRoZSBmdW5jdGlvbiBvbmNlIGFuZFxyXG4gKiByZXR1cm5zIHRoZSByZXNwb25zZS5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHJldHJ5SWZTZXJ2ZXJFcnJvcihmbikge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZm4oKTtcclxuICAgIGlmIChyZXN1bHQuc3RhdHVzID49IDUwMCAmJiByZXN1bHQuc3RhdHVzIDwgNjAwKSB7XHJcbiAgICAgICAgLy8gSW50ZXJuYWwgU2VydmVyIEVycm9yLiBSZXRyeSByZXF1ZXN0LlxyXG4gICAgICAgIHJldHVybiBmbigpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBnZXRFeHBpcmVzSW5Gcm9tUmVzcG9uc2VFeHBpcmVzSW4ocmVzcG9uc2VFeHBpcmVzSW4pIHtcclxuICAgIC8vIFRoaXMgd29ya3MgYmVjYXVzZSB0aGUgc2VydmVyIHdpbGwgbmV2ZXIgcmVzcG9uZCB3aXRoIGZyYWN0aW9ucyBvZiBhIHNlY29uZC5cclxuICAgIHJldHVybiBOdW1iZXIocmVzcG9uc2VFeHBpcmVzSW4ucmVwbGFjZSgncycsICcwMDAnKSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0QXV0aG9yaXphdGlvbkhlYWRlcihyZWZyZXNoVG9rZW4pIHtcclxuICAgIHJldHVybiBgJHtJTlRFUk5BTF9BVVRIX1ZFUlNJT059ICR7cmVmcmVzaFRva2VufWA7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlSW5zdGFsbGF0aW9uUmVxdWVzdCh7IGFwcENvbmZpZywgaGVhcnRiZWF0U2VydmljZVByb3ZpZGVyIH0sIHsgZmlkIH0pIHtcclxuICAgIGNvbnN0IGVuZHBvaW50ID0gZ2V0SW5zdGFsbGF0aW9uc0VuZHBvaW50KGFwcENvbmZpZyk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gZ2V0SGVhZGVycyhhcHBDb25maWcpO1xyXG4gICAgLy8gSWYgaGVhcnRiZWF0IHNlcnZpY2UgZXhpc3RzLCBhZGQgdGhlIGhlYXJ0YmVhdCBzdHJpbmcgdG8gdGhlIGhlYWRlci5cclxuICAgIGNvbnN0IGhlYXJ0YmVhdFNlcnZpY2UgPSBoZWFydGJlYXRTZXJ2aWNlUHJvdmlkZXIuZ2V0SW1tZWRpYXRlKHtcclxuICAgICAgICBvcHRpb25hbDogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBpZiAoaGVhcnRiZWF0U2VydmljZSkge1xyXG4gICAgICAgIGNvbnN0IGhlYXJ0YmVhdHNIZWFkZXIgPSBhd2FpdCBoZWFydGJlYXRTZXJ2aWNlLmdldEhlYXJ0YmVhdHNIZWFkZXIoKTtcclxuICAgICAgICBpZiAoaGVhcnRiZWF0c0hlYWRlcikge1xyXG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgneC1maXJlYmFzZS1jbGllbnQnLCBoZWFydGJlYXRzSGVhZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBib2R5ID0ge1xyXG4gICAgICAgIGZpZCxcclxuICAgICAgICBhdXRoVmVyc2lvbjogSU5URVJOQUxfQVVUSF9WRVJTSU9OLFxyXG4gICAgICAgIGFwcElkOiBhcHBDb25maWcuYXBwSWQsXHJcbiAgICAgICAgc2RrVmVyc2lvbjogUEFDS0FHRV9WRVJTSU9OXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXRyeUlmU2VydmVyRXJyb3IoKCkgPT4gZmV0Y2goZW5kcG9pbnQsIHJlcXVlc3QpKTtcclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlVmFsdWUgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY29uc3QgcmVnaXN0ZXJlZEluc3RhbGxhdGlvbkVudHJ5ID0ge1xyXG4gICAgICAgICAgICBmaWQ6IHJlc3BvbnNlVmFsdWUuZmlkIHx8IGZpZCxcclxuICAgICAgICAgICAgcmVnaXN0cmF0aW9uU3RhdHVzOiAyIC8qIFJlcXVlc3RTdGF0dXMuQ09NUExFVEVEICovLFxyXG4gICAgICAgICAgICByZWZyZXNoVG9rZW46IHJlc3BvbnNlVmFsdWUucmVmcmVzaFRva2VuLFxyXG4gICAgICAgICAgICBhdXRoVG9rZW46IGV4dHJhY3RBdXRoVG9rZW5JbmZvRnJvbVJlc3BvbnNlKHJlc3BvbnNlVmFsdWUuYXV0aFRva2VuKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVyZWRJbnN0YWxsYXRpb25FbnRyeTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IGF3YWl0IGdldEVycm9yRnJvbVJlc3BvbnNlKCdDcmVhdGUgSW5zdGFsbGF0aW9uJywgcmVzcG9uc2UpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGFmdGVyIGdpdmVuIHRpbWUgcGFzc2VzLiAqL1xyXG5mdW5jdGlvbiBzbGVlcChtcykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xyXG4gICAgfSk7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuZnVuY3Rpb24gYnVmZmVyVG9CYXNlNjRVcmxTYWZlKGFycmF5KSB7XHJcbiAgICBjb25zdCBiNjQgPSBidG9hKFN0cmluZy5mcm9tQ2hhckNvZGUoLi4uYXJyYXkpKTtcclxuICAgIHJldHVybiBiNjQucmVwbGFjZSgvXFwrL2csICctJykucmVwbGFjZSgvXFwvL2csICdfJyk7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuY29uc3QgVkFMSURfRklEX1BBVFRFUk4gPSAvXltjZGVmXVtcXHctXXsyMX0kLztcclxuY29uc3QgSU5WQUxJRF9GSUQgPSAnJztcclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIG5ldyBGSUQgdXNpbmcgcmFuZG9tIHZhbHVlcyBmcm9tIFdlYiBDcnlwdG8gQVBJLlxyXG4gKiBSZXR1cm5zIGFuIGVtcHR5IHN0cmluZyBpZiBGSUQgZ2VuZXJhdGlvbiBmYWlscyBmb3IgYW55IHJlYXNvbi5cclxuICovXHJcbmZ1bmN0aW9uIGdlbmVyYXRlRmlkKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBBIHZhbGlkIEZJRCBoYXMgZXhhY3RseSAyMiBiYXNlNjQgY2hhcmFjdGVycywgd2hpY2ggaXMgMTMyIGJpdHMsIG9yIDE2LjVcclxuICAgICAgICAvLyBieXRlcy4gb3VyIGltcGxlbWVudGF0aW9uIGdlbmVyYXRlcyBhIDE3IGJ5dGUgYXJyYXkgaW5zdGVhZC5cclxuICAgICAgICBjb25zdCBmaWRCeXRlQXJyYXkgPSBuZXcgVWludDhBcnJheSgxNyk7XHJcbiAgICAgICAgY29uc3QgY3J5cHRvID0gc2VsZi5jcnlwdG8gfHwgc2VsZi5tc0NyeXB0bztcclxuICAgICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGZpZEJ5dGVBcnJheSk7XHJcbiAgICAgICAgLy8gUmVwbGFjZSB0aGUgZmlyc3QgNCByYW5kb20gYml0cyB3aXRoIHRoZSBjb25zdGFudCBGSUQgaGVhZGVyIG9mIDBiMDExMS5cclxuICAgICAgICBmaWRCeXRlQXJyYXlbMF0gPSAwYjAxMTEwMDAwICsgKGZpZEJ5dGVBcnJheVswXSAlIDBiMDAwMTAwMDApO1xyXG4gICAgICAgIGNvbnN0IGZpZCA9IGVuY29kZShmaWRCeXRlQXJyYXkpO1xyXG4gICAgICAgIHJldHVybiBWQUxJRF9GSURfUEFUVEVSTi50ZXN0KGZpZCkgPyBmaWQgOiBJTlZBTElEX0ZJRDtcclxuICAgIH1cclxuICAgIGNhdGNoIChfYSkge1xyXG4gICAgICAgIC8vIEZJRCBnZW5lcmF0aW9uIGVycm9yZWRcclxuICAgICAgICByZXR1cm4gSU5WQUxJRF9GSUQ7XHJcbiAgICB9XHJcbn1cclxuLyoqIENvbnZlcnRzIGEgRklEIFVpbnQ4QXJyYXkgdG8gYSBiYXNlNjQgc3RyaW5nIHJlcHJlc2VudGF0aW9uLiAqL1xyXG5mdW5jdGlvbiBlbmNvZGUoZmlkQnl0ZUFycmF5KSB7XHJcbiAgICBjb25zdCBiNjRTdHJpbmcgPSBidWZmZXJUb0Jhc2U2NFVybFNhZmUoZmlkQnl0ZUFycmF5KTtcclxuICAgIC8vIFJlbW92ZSB0aGUgMjNyZCBjaGFyYWN0ZXIgdGhhdCB3YXMgYWRkZWQgYmVjYXVzZSBvZiB0aGUgZXh0cmEgNCBiaXRzIGF0IHRoZVxyXG4gICAgLy8gZW5kIG9mIG91ciAxNyBieXRlIGFycmF5LCBhbmQgdGhlICc9JyBwYWRkaW5nLlxyXG4gICAgcmV0dXJuIGI2NFN0cmluZy5zdWJzdHIoMCwgMjIpO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKiBSZXR1cm5zIGEgc3RyaW5nIGtleSB0aGF0IGNhbiBiZSB1c2VkIHRvIGlkZW50aWZ5IHRoZSBhcHAuICovXHJcbmZ1bmN0aW9uIGdldEtleShhcHBDb25maWcpIHtcclxuICAgIHJldHVybiBgJHthcHBDb25maWcuYXBwTmFtZX0hJHthcHBDb25maWcuYXBwSWR9YDtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5jb25zdCBmaWRDaGFuZ2VDYWxsYmFja3MgPSBuZXcgTWFwKCk7XHJcbi8qKlxyXG4gKiBDYWxscyB0aGUgb25JZENoYW5nZSBjYWxsYmFja3Mgd2l0aCB0aGUgbmV3IEZJRCB2YWx1ZSwgYW5kIGJyb2FkY2FzdHMgdGhlXHJcbiAqIGNoYW5nZSB0byBvdGhlciB0YWJzLlxyXG4gKi9cclxuZnVuY3Rpb24gZmlkQ2hhbmdlZChhcHBDb25maWcsIGZpZCkge1xyXG4gICAgY29uc3Qga2V5ID0gZ2V0S2V5KGFwcENvbmZpZyk7XHJcbiAgICBjYWxsRmlkQ2hhbmdlQ2FsbGJhY2tzKGtleSwgZmlkKTtcclxuICAgIGJyb2FkY2FzdEZpZENoYW5nZShrZXksIGZpZCk7XHJcbn1cclxuZnVuY3Rpb24gYWRkQ2FsbGJhY2soYXBwQ29uZmlnLCBjYWxsYmFjaykge1xyXG4gICAgLy8gT3BlbiB0aGUgYnJvYWRjYXN0IGNoYW5uZWwgaWYgaXQncyBub3QgYWxyZWFkeSBvcGVuLFxyXG4gICAgLy8gdG8gYmUgYWJsZSB0byBsaXN0ZW4gdG8gY2hhbmdlIGV2ZW50cyBmcm9tIG90aGVyIHRhYnMuXHJcbiAgICBnZXRCcm9hZGNhc3RDaGFubmVsKCk7XHJcbiAgICBjb25zdCBrZXkgPSBnZXRLZXkoYXBwQ29uZmlnKTtcclxuICAgIGxldCBjYWxsYmFja1NldCA9IGZpZENoYW5nZUNhbGxiYWNrcy5nZXQoa2V5KTtcclxuICAgIGlmICghY2FsbGJhY2tTZXQpIHtcclxuICAgICAgICBjYWxsYmFja1NldCA9IG5ldyBTZXQoKTtcclxuICAgICAgICBmaWRDaGFuZ2VDYWxsYmFja3Muc2V0KGtleSwgY2FsbGJhY2tTZXQpO1xyXG4gICAgfVxyXG4gICAgY2FsbGJhY2tTZXQuYWRkKGNhbGxiYWNrKTtcclxufVxyXG5mdW5jdGlvbiByZW1vdmVDYWxsYmFjayhhcHBDb25maWcsIGNhbGxiYWNrKSB7XHJcbiAgICBjb25zdCBrZXkgPSBnZXRLZXkoYXBwQ29uZmlnKTtcclxuICAgIGNvbnN0IGNhbGxiYWNrU2V0ID0gZmlkQ2hhbmdlQ2FsbGJhY2tzLmdldChrZXkpO1xyXG4gICAgaWYgKCFjYWxsYmFja1NldCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNhbGxiYWNrU2V0LmRlbGV0ZShjYWxsYmFjayk7XHJcbiAgICBpZiAoY2FsbGJhY2tTZXQuc2l6ZSA9PT0gMCkge1xyXG4gICAgICAgIGZpZENoYW5nZUNhbGxiYWNrcy5kZWxldGUoa2V5KTtcclxuICAgIH1cclxuICAgIC8vIENsb3NlIGJyb2FkY2FzdCBjaGFubmVsIGlmIHRoZXJlIGFyZSBubyBtb3JlIGNhbGxiYWNrcy5cclxuICAgIGNsb3NlQnJvYWRjYXN0Q2hhbm5lbCgpO1xyXG59XHJcbmZ1bmN0aW9uIGNhbGxGaWRDaGFuZ2VDYWxsYmFja3Moa2V5LCBmaWQpIHtcclxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IGZpZENoYW5nZUNhbGxiYWNrcy5nZXQoa2V5KTtcclxuICAgIGlmICghY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBjYWxsYmFja3MpIHtcclxuICAgICAgICBjYWxsYmFjayhmaWQpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGJyb2FkY2FzdEZpZENoYW5nZShrZXksIGZpZCkge1xyXG4gICAgY29uc3QgY2hhbm5lbCA9IGdldEJyb2FkY2FzdENoYW5uZWwoKTtcclxuICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgY2hhbm5lbC5wb3N0TWVzc2FnZSh7IGtleSwgZmlkIH0pO1xyXG4gICAgfVxyXG4gICAgY2xvc2VCcm9hZGNhc3RDaGFubmVsKCk7XHJcbn1cclxubGV0IGJyb2FkY2FzdENoYW5uZWwgPSBudWxsO1xyXG4vKiogT3BlbnMgYW5kIHJldHVybnMgYSBCcm9hZGNhc3RDaGFubmVsIGlmIGl0IGlzIHN1cHBvcnRlZCBieSB0aGUgYnJvd3Nlci4gKi9cclxuZnVuY3Rpb24gZ2V0QnJvYWRjYXN0Q2hhbm5lbCgpIHtcclxuICAgIGlmICghYnJvYWRjYXN0Q2hhbm5lbCAmJiAnQnJvYWRjYXN0Q2hhbm5lbCcgaW4gc2VsZikge1xyXG4gICAgICAgIGJyb2FkY2FzdENoYW5uZWwgPSBuZXcgQnJvYWRjYXN0Q2hhbm5lbCgnW0ZpcmViYXNlXSBGSUQgQ2hhbmdlJyk7XHJcbiAgICAgICAgYnJvYWRjYXN0Q2hhbm5lbC5vbm1lc3NhZ2UgPSBlID0+IHtcclxuICAgICAgICAgICAgY2FsbEZpZENoYW5nZUNhbGxiYWNrcyhlLmRhdGEua2V5LCBlLmRhdGEuZmlkKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJyb2FkY2FzdENoYW5uZWw7XHJcbn1cclxuZnVuY3Rpb24gY2xvc2VCcm9hZGNhc3RDaGFubmVsKCkge1xyXG4gICAgaWYgKGZpZENoYW5nZUNhbGxiYWNrcy5zaXplID09PSAwICYmIGJyb2FkY2FzdENoYW5uZWwpIHtcclxuICAgICAgICBicm9hZGNhc3RDaGFubmVsLmNsb3NlKCk7XHJcbiAgICAgICAgYnJvYWRjYXN0Q2hhbm5lbCA9IG51bGw7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuY29uc3QgREFUQUJBU0VfTkFNRSA9ICdmaXJlYmFzZS1pbnN0YWxsYXRpb25zLWRhdGFiYXNlJztcclxuY29uc3QgREFUQUJBU0VfVkVSU0lPTiA9IDE7XHJcbmNvbnN0IE9CSkVDVF9TVE9SRV9OQU1FID0gJ2ZpcmViYXNlLWluc3RhbGxhdGlvbnMtc3RvcmUnO1xyXG5sZXQgZGJQcm9taXNlID0gbnVsbDtcclxuZnVuY3Rpb24gZ2V0RGJQcm9taXNlKCkge1xyXG4gICAgaWYgKCFkYlByb21pc2UpIHtcclxuICAgICAgICBkYlByb21pc2UgPSBvcGVuREIoREFUQUJBU0VfTkFNRSwgREFUQUJBU0VfVkVSU0lPTiwge1xyXG4gICAgICAgICAgICB1cGdyYWRlOiAoZGIsIG9sZFZlcnNpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IHVzZSAnYnJlYWsnIGluIHRoaXMgc3dpdGNoIHN0YXRlbWVudCwgdGhlIGZhbGwtdGhyb3VnaFxyXG4gICAgICAgICAgICAgICAgLy8gYmVoYXZpb3IgaXMgd2hhdCB3ZSB3YW50LCBiZWNhdXNlIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSB2ZXJzaW9ucyBiZXR3ZWVuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgb2xkIHZlcnNpb24gYW5kIHRoZSBjdXJyZW50IHZlcnNpb24sIHdlIHdhbnQgQUxMIHRoZSBtaWdyYXRpb25zXHJcbiAgICAgICAgICAgICAgICAvLyB0aGF0IGNvcnJlc3BvbmQgdG8gdGhvc2UgdmVyc2lvbnMgdG8gcnVuLCBub3Qgb25seSB0aGUgbGFzdCBvbmUuXHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVmYXVsdC1jYXNlXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9sZFZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKE9CSkVDVF9TVE9SRV9OQU1FKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRiUHJvbWlzZTtcclxufVxyXG4vKiogQXNzaWducyBvciBvdmVyd3JpdGVzIHRoZSByZWNvcmQgZm9yIHRoZSBnaXZlbiBrZXkgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHNldChhcHBDb25maWcsIHZhbHVlKSB7XHJcbiAgICBjb25zdCBrZXkgPSBnZXRLZXkoYXBwQ29uZmlnKTtcclxuICAgIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGJQcm9taXNlKCk7XHJcbiAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKE9CSkVDVF9TVE9SRV9OQU1FLCAncmVhZHdyaXRlJyk7XHJcbiAgICBjb25zdCBvYmplY3RTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKE9CSkVDVF9TVE9SRV9OQU1FKTtcclxuICAgIGNvbnN0IG9sZFZhbHVlID0gKGF3YWl0IG9iamVjdFN0b3JlLmdldChrZXkpKTtcclxuICAgIGF3YWl0IG9iamVjdFN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcclxuICAgIGF3YWl0IHR4LmRvbmU7XHJcbiAgICBpZiAoIW9sZFZhbHVlIHx8IG9sZFZhbHVlLmZpZCAhPT0gdmFsdWUuZmlkKSB7XHJcbiAgICAgICAgZmlkQ2hhbmdlZChhcHBDb25maWcsIHZhbHVlLmZpZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuLyoqIFJlbW92ZXMgcmVjb3JkKHMpIGZyb20gdGhlIG9iamVjdFN0b3JlIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIGtleS4gKi9cclxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlKGFwcENvbmZpZykge1xyXG4gICAgY29uc3Qga2V5ID0gZ2V0S2V5KGFwcENvbmZpZyk7XHJcbiAgICBjb25zdCBkYiA9IGF3YWl0IGdldERiUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbihPQkpFQ1RfU1RPUkVfTkFNRSwgJ3JlYWR3cml0ZScpO1xyXG4gICAgYXdhaXQgdHgub2JqZWN0U3RvcmUoT0JKRUNUX1NUT1JFX05BTUUpLmRlbGV0ZShrZXkpO1xyXG4gICAgYXdhaXQgdHguZG9uZTtcclxufVxyXG4vKipcclxuICogQXRvbWljYWxseSB1cGRhdGVzIGEgcmVjb3JkIHdpdGggdGhlIHJlc3VsdCBvZiB1cGRhdGVGbiwgd2hpY2ggZ2V0c1xyXG4gKiBjYWxsZWQgd2l0aCB0aGUgY3VycmVudCB2YWx1ZS4gSWYgbmV3VmFsdWUgaXMgdW5kZWZpbmVkLCB0aGUgcmVjb3JkIGlzXHJcbiAqIGRlbGV0ZWQgaW5zdGVhZC5cclxuICogQHJldHVybiBVcGRhdGVkIHZhbHVlXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiB1cGRhdGUoYXBwQ29uZmlnLCB1cGRhdGVGbikge1xyXG4gICAgY29uc3Qga2V5ID0gZ2V0S2V5KGFwcENvbmZpZyk7XHJcbiAgICBjb25zdCBkYiA9IGF3YWl0IGdldERiUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbihPQkpFQ1RfU1RPUkVfTkFNRSwgJ3JlYWR3cml0ZScpO1xyXG4gICAgY29uc3Qgc3RvcmUgPSB0eC5vYmplY3RTdG9yZShPQkpFQ1RfU1RPUkVfTkFNRSk7XHJcbiAgICBjb25zdCBvbGRWYWx1ZSA9IChhd2FpdCBzdG9yZS5nZXQoa2V5KSk7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHVwZGF0ZUZuKG9sZFZhbHVlKTtcclxuICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYXdhaXQgc3RvcmUuZGVsZXRlKGtleSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhd2FpdCBzdG9yZS5wdXQobmV3VmFsdWUsIGtleSk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCB0eC5kb25lO1xyXG4gICAgaWYgKG5ld1ZhbHVlICYmICghb2xkVmFsdWUgfHwgb2xkVmFsdWUuZmlkICE9PSBuZXdWYWx1ZS5maWQpKSB7XHJcbiAgICAgICAgZmlkQ2hhbmdlZChhcHBDb25maWcsIG5ld1ZhbHVlLmZpZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3VmFsdWU7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFVwZGF0ZXMgYW5kIHJldHVybnMgdGhlIEluc3RhbGxhdGlvbkVudHJ5IGZyb20gdGhlIGRhdGFiYXNlLlxyXG4gKiBBbHNvIHRyaWdnZXJzIGEgcmVnaXN0cmF0aW9uIHJlcXVlc3QgaWYgaXQgaXMgbmVjZXNzYXJ5IGFuZCBwb3NzaWJsZS5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGdldEluc3RhbGxhdGlvbkVudHJ5KGluc3RhbGxhdGlvbnMpIHtcclxuICAgIGxldCByZWdpc3RyYXRpb25Qcm9taXNlO1xyXG4gICAgY29uc3QgaW5zdGFsbGF0aW9uRW50cnkgPSBhd2FpdCB1cGRhdGUoaW5zdGFsbGF0aW9ucy5hcHBDb25maWcsIG9sZEVudHJ5ID0+IHtcclxuICAgICAgICBjb25zdCBpbnN0YWxsYXRpb25FbnRyeSA9IHVwZGF0ZU9yQ3JlYXRlSW5zdGFsbGF0aW9uRW50cnkob2xkRW50cnkpO1xyXG4gICAgICAgIGNvbnN0IGVudHJ5V2l0aFByb21pc2UgPSB0cmlnZ2VyUmVnaXN0cmF0aW9uSWZOZWNlc3NhcnkoaW5zdGFsbGF0aW9ucywgaW5zdGFsbGF0aW9uRW50cnkpO1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvblByb21pc2UgPSBlbnRyeVdpdGhQcm9taXNlLnJlZ2lzdHJhdGlvblByb21pc2U7XHJcbiAgICAgICAgcmV0dXJuIGVudHJ5V2l0aFByb21pc2UuaW5zdGFsbGF0aW9uRW50cnk7XHJcbiAgICB9KTtcclxuICAgIGlmIChpbnN0YWxsYXRpb25FbnRyeS5maWQgPT09IElOVkFMSURfRklEKSB7XHJcbiAgICAgICAgLy8gRklEIGdlbmVyYXRpb24gZmFpbGVkLiBXYWl0aW5nIGZvciB0aGUgRklEIGZyb20gdGhlIHNlcnZlci5cclxuICAgICAgICByZXR1cm4geyBpbnN0YWxsYXRpb25FbnRyeTogYXdhaXQgcmVnaXN0cmF0aW9uUHJvbWlzZSB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbnN0YWxsYXRpb25FbnRyeSxcclxuICAgICAgICByZWdpc3RyYXRpb25Qcm9taXNlXHJcbiAgICB9O1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IEluc3RhbGxhdGlvbiBFbnRyeSBpZiBvbmUgZG9lcyBub3QgZXhpc3QuXHJcbiAqIEFsc28gY2xlYXJzIHRpbWVkIG91dCBwZW5kaW5nIHJlcXVlc3RzLlxyXG4gKi9cclxuZnVuY3Rpb24gdXBkYXRlT3JDcmVhdGVJbnN0YWxsYXRpb25FbnRyeShvbGRFbnRyeSkge1xyXG4gICAgY29uc3QgZW50cnkgPSBvbGRFbnRyeSB8fCB7XHJcbiAgICAgICAgZmlkOiBnZW5lcmF0ZUZpZCgpLFxyXG4gICAgICAgIHJlZ2lzdHJhdGlvblN0YXR1czogMCAvKiBSZXF1ZXN0U3RhdHVzLk5PVF9TVEFSVEVEICovXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGNsZWFyVGltZWRPdXRSZXF1ZXN0KGVudHJ5KTtcclxufVxyXG4vKipcclxuICogSWYgdGhlIEZpcmViYXNlIEluc3RhbGxhdGlvbiBpcyBub3QgcmVnaXN0ZXJlZCB5ZXQsIHRoaXMgd2lsbCB0cmlnZ2VyIHRoZVxyXG4gKiByZWdpc3RyYXRpb24gYW5kIHJldHVybiBhbiBJblByb2dyZXNzSW5zdGFsbGF0aW9uRW50cnkuXHJcbiAqXHJcbiAqIElmIHJlZ2lzdHJhdGlvblByb21pc2UgZG9lcyBub3QgZXhpc3QsIHRoZSBpbnN0YWxsYXRpb25FbnRyeSBpcyBndWFyYW50ZWVkXHJcbiAqIHRvIGJlIHJlZ2lzdGVyZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiB0cmlnZ2VyUmVnaXN0cmF0aW9uSWZOZWNlc3NhcnkoaW5zdGFsbGF0aW9ucywgaW5zdGFsbGF0aW9uRW50cnkpIHtcclxuICAgIGlmIChpbnN0YWxsYXRpb25FbnRyeS5yZWdpc3RyYXRpb25TdGF0dXMgPT09IDAgLyogUmVxdWVzdFN0YXR1cy5OT1RfU1RBUlRFRCAqLykge1xyXG4gICAgICAgIGlmICghbmF2aWdhdG9yLm9uTGluZSkge1xyXG4gICAgICAgICAgICAvLyBSZWdpc3RyYXRpb24gcmVxdWlyZWQgYnV0IGFwcCBpcyBvZmZsaW5lLlxyXG4gICAgICAgICAgICBjb25zdCByZWdpc3RyYXRpb25Qcm9taXNlV2l0aEVycm9yID0gUHJvbWlzZS5yZWplY3QoRVJST1JfRkFDVE9SWS5jcmVhdGUoXCJhcHAtb2ZmbGluZVwiIC8qIEVycm9yQ29kZS5BUFBfT0ZGTElORSAqLykpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFsbGF0aW9uRW50cnksXHJcbiAgICAgICAgICAgICAgICByZWdpc3RyYXRpb25Qcm9taXNlOiByZWdpc3RyYXRpb25Qcm9taXNlV2l0aEVycm9yXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFRyeSByZWdpc3RlcmluZy4gQ2hhbmdlIHN0YXR1cyB0byBJTl9QUk9HUkVTUy5cclxuICAgICAgICBjb25zdCBpblByb2dyZXNzRW50cnkgPSB7XHJcbiAgICAgICAgICAgIGZpZDogaW5zdGFsbGF0aW9uRW50cnkuZmlkLFxyXG4gICAgICAgICAgICByZWdpc3RyYXRpb25TdGF0dXM6IDEgLyogUmVxdWVzdFN0YXR1cy5JTl9QUk9HUkVTUyAqLyxcclxuICAgICAgICAgICAgcmVnaXN0cmF0aW9uVGltZTogRGF0ZS5ub3coKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmVnaXN0cmF0aW9uUHJvbWlzZSA9IHJlZ2lzdGVySW5zdGFsbGF0aW9uKGluc3RhbGxhdGlvbnMsIGluUHJvZ3Jlc3NFbnRyeSk7XHJcbiAgICAgICAgcmV0dXJuIHsgaW5zdGFsbGF0aW9uRW50cnk6IGluUHJvZ3Jlc3NFbnRyeSwgcmVnaXN0cmF0aW9uUHJvbWlzZSB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW5zdGFsbGF0aW9uRW50cnkucmVnaXN0cmF0aW9uU3RhdHVzID09PSAxIC8qIFJlcXVlc3RTdGF0dXMuSU5fUFJPR1JFU1MgKi8pIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbnN0YWxsYXRpb25FbnRyeSxcclxuICAgICAgICAgICAgcmVnaXN0cmF0aW9uUHJvbWlzZTogd2FpdFVudGlsRmlkUmVnaXN0cmF0aW9uKGluc3RhbGxhdGlvbnMpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7IGluc3RhbGxhdGlvbkVudHJ5IH07XHJcbiAgICB9XHJcbn1cclxuLyoqIFRoaXMgd2lsbCBiZSBleGVjdXRlZCBvbmx5IG9uY2UgZm9yIGVhY2ggbmV3IEZpcmViYXNlIEluc3RhbGxhdGlvbi4gKi9cclxuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJJbnN0YWxsYXRpb24oaW5zdGFsbGF0aW9ucywgaW5zdGFsbGF0aW9uRW50cnkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVnaXN0ZXJlZEluc3RhbGxhdGlvbkVudHJ5ID0gYXdhaXQgY3JlYXRlSW5zdGFsbGF0aW9uUmVxdWVzdChpbnN0YWxsYXRpb25zLCBpbnN0YWxsYXRpb25FbnRyeSk7XHJcbiAgICAgICAgcmV0dXJuIHNldChpbnN0YWxsYXRpb25zLmFwcENvbmZpZywgcmVnaXN0ZXJlZEluc3RhbGxhdGlvbkVudHJ5KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKGlzU2VydmVyRXJyb3IoZSkgJiYgZS5jdXN0b21EYXRhLnNlcnZlckNvZGUgPT09IDQwOSkge1xyXG4gICAgICAgICAgICAvLyBTZXJ2ZXIgcmV0dXJuZWQgYSBcIkZJRCBjYW4gbm90IGJlIHVzZWRcIiBlcnJvci5cclxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgYSBuZXcgSUQgbmV4dCB0aW1lLlxyXG4gICAgICAgICAgICBhd2FpdCByZW1vdmUoaW5zdGFsbGF0aW9ucy5hcHBDb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gUmVnaXN0cmF0aW9uIGZhaWxlZC4gU2V0IEZJRCBhcyBub3QgcmVnaXN0ZXJlZC5cclxuICAgICAgICAgICAgYXdhaXQgc2V0KGluc3RhbGxhdGlvbnMuYXBwQ29uZmlnLCB7XHJcbiAgICAgICAgICAgICAgICBmaWQ6IGluc3RhbGxhdGlvbkVudHJ5LmZpZCxcclxuICAgICAgICAgICAgICAgIHJlZ2lzdHJhdGlvblN0YXR1czogMCAvKiBSZXF1ZXN0U3RhdHVzLk5PVF9TVEFSVEVEICovXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgfVxyXG59XHJcbi8qKiBDYWxsIGlmIEZJRCByZWdpc3RyYXRpb24gaXMgcGVuZGluZyBpbiBhbm90aGVyIHJlcXVlc3QuICovXHJcbmFzeW5jIGZ1bmN0aW9uIHdhaXRVbnRpbEZpZFJlZ2lzdHJhdGlvbihpbnN0YWxsYXRpb25zKSB7XHJcbiAgICAvLyBVbmZvcnR1bmF0ZWx5LCB0aGVyZSBpcyBubyB3YXkgb2YgcmVsaWFibHkgb2JzZXJ2aW5nIHdoZW4gYSB2YWx1ZSBpblxyXG4gICAgLy8gSW5kZXhlZERCIGNoYW5nZXMgKHlldCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL2luZGV4ZWQtZGItb2JzZXJ2ZXJzKSxcclxuICAgIC8vIHNvIHdlIG5lZWQgdG8gcG9sbC5cclxuICAgIGxldCBlbnRyeSA9IGF3YWl0IHVwZGF0ZUluc3RhbGxhdGlvblJlcXVlc3QoaW5zdGFsbGF0aW9ucy5hcHBDb25maWcpO1xyXG4gICAgd2hpbGUgKGVudHJ5LnJlZ2lzdHJhdGlvblN0YXR1cyA9PT0gMSAvKiBSZXF1ZXN0U3RhdHVzLklOX1BST0dSRVNTICovKSB7XHJcbiAgICAgICAgLy8gY3JlYXRlSW5zdGFsbGF0aW9uIHJlcXVlc3Qgc3RpbGwgaW4gcHJvZ3Jlc3MuXHJcbiAgICAgICAgYXdhaXQgc2xlZXAoMTAwKTtcclxuICAgICAgICBlbnRyeSA9IGF3YWl0IHVwZGF0ZUluc3RhbGxhdGlvblJlcXVlc3QoaW5zdGFsbGF0aW9ucy5hcHBDb25maWcpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVudHJ5LnJlZ2lzdHJhdGlvblN0YXR1cyA9PT0gMCAvKiBSZXF1ZXN0U3RhdHVzLk5PVF9TVEFSVEVEICovKSB7XHJcbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgdGltZWQgb3V0IG9yIGZhaWxlZCBpbiBhIGRpZmZlcmVudCBjYWxsLiBUcnkgYWdhaW4uXHJcbiAgICAgICAgY29uc3QgeyBpbnN0YWxsYXRpb25FbnRyeSwgcmVnaXN0cmF0aW9uUHJvbWlzZSB9ID0gYXdhaXQgZ2V0SW5zdGFsbGF0aW9uRW50cnkoaW5zdGFsbGF0aW9ucyk7XHJcbiAgICAgICAgaWYgKHJlZ2lzdHJhdGlvblByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlZ2lzdHJhdGlvblByb21pc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyByZWdpc3RyYXRpb25Qcm9taXNlLCBlbnRyeSBpcyByZWdpc3RlcmVkLlxyXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFsbGF0aW9uRW50cnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJ5O1xyXG59XHJcbi8qKlxyXG4gKiBDYWxsZWQgb25seSBpZiB0aGVyZSBpcyBhIENyZWF0ZUluc3RhbGxhdGlvbiByZXF1ZXN0IGluIHByb2dyZXNzLlxyXG4gKlxyXG4gKiBVcGRhdGVzIHRoZSBJbnN0YWxsYXRpb25FbnRyeSBpbiB0aGUgREIgYmFzZWQgb24gdGhlIHN0YXR1cyBvZiB0aGVcclxuICogQ3JlYXRlSW5zdGFsbGF0aW9uIHJlcXVlc3QuXHJcbiAqXHJcbiAqIFJldHVybnMgdGhlIHVwZGF0ZWQgSW5zdGFsbGF0aW9uRW50cnkuXHJcbiAqL1xyXG5mdW5jdGlvbiB1cGRhdGVJbnN0YWxsYXRpb25SZXF1ZXN0KGFwcENvbmZpZykge1xyXG4gICAgcmV0dXJuIHVwZGF0ZShhcHBDb25maWcsIG9sZEVudHJ5ID0+IHtcclxuICAgICAgICBpZiAoIW9sZEVudHJ5KSB7XHJcbiAgICAgICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiaW5zdGFsbGF0aW9uLW5vdC1mb3VuZFwiIC8qIEVycm9yQ29kZS5JTlNUQUxMQVRJT05fTk9UX0ZPVU5EICovKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZWRPdXRSZXF1ZXN0KG9sZEVudHJ5KTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGNsZWFyVGltZWRPdXRSZXF1ZXN0KGVudHJ5KSB7XHJcbiAgICBpZiAoaGFzSW5zdGFsbGF0aW9uUmVxdWVzdFRpbWVkT3V0KGVudHJ5KSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZpZDogZW50cnkuZmlkLFxyXG4gICAgICAgICAgICByZWdpc3RyYXRpb25TdGF0dXM6IDAgLyogUmVxdWVzdFN0YXR1cy5OT1RfU1RBUlRFRCAqL1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50cnk7XHJcbn1cclxuZnVuY3Rpb24gaGFzSW5zdGFsbGF0aW9uUmVxdWVzdFRpbWVkT3V0KGluc3RhbGxhdGlvbkVudHJ5KSB7XHJcbiAgICByZXR1cm4gKGluc3RhbGxhdGlvbkVudHJ5LnJlZ2lzdHJhdGlvblN0YXR1cyA9PT0gMSAvKiBSZXF1ZXN0U3RhdHVzLklOX1BST0dSRVNTICovICYmXHJcbiAgICAgICAgaW5zdGFsbGF0aW9uRW50cnkucmVnaXN0cmF0aW9uVGltZSArIFBFTkRJTkdfVElNRU9VVF9NUyA8IERhdGUubm93KCkpO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlQXV0aFRva2VuUmVxdWVzdCh7IGFwcENvbmZpZywgaGVhcnRiZWF0U2VydmljZVByb3ZpZGVyIH0sIGluc3RhbGxhdGlvbkVudHJ5KSB7XHJcbiAgICBjb25zdCBlbmRwb2ludCA9IGdldEdlbmVyYXRlQXV0aFRva2VuRW5kcG9pbnQoYXBwQ29uZmlnLCBpbnN0YWxsYXRpb25FbnRyeSk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gZ2V0SGVhZGVyc1dpdGhBdXRoKGFwcENvbmZpZywgaW5zdGFsbGF0aW9uRW50cnkpO1xyXG4gICAgLy8gSWYgaGVhcnRiZWF0IHNlcnZpY2UgZXhpc3RzLCBhZGQgdGhlIGhlYXJ0YmVhdCBzdHJpbmcgdG8gdGhlIGhlYWRlci5cclxuICAgIGNvbnN0IGhlYXJ0YmVhdFNlcnZpY2UgPSBoZWFydGJlYXRTZXJ2aWNlUHJvdmlkZXIuZ2V0SW1tZWRpYXRlKHtcclxuICAgICAgICBvcHRpb25hbDogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBpZiAoaGVhcnRiZWF0U2VydmljZSkge1xyXG4gICAgICAgIGNvbnN0IGhlYXJ0YmVhdHNIZWFkZXIgPSBhd2FpdCBoZWFydGJlYXRTZXJ2aWNlLmdldEhlYXJ0YmVhdHNIZWFkZXIoKTtcclxuICAgICAgICBpZiAoaGVhcnRiZWF0c0hlYWRlcikge1xyXG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgneC1maXJlYmFzZS1jbGllbnQnLCBoZWFydGJlYXRzSGVhZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBib2R5ID0ge1xyXG4gICAgICAgIGluc3RhbGxhdGlvbjoge1xyXG4gICAgICAgICAgICBzZGtWZXJzaW9uOiBQQUNLQUdFX1ZFUlNJT04sXHJcbiAgICAgICAgICAgIGFwcElkOiBhcHBDb25maWcuYXBwSWRcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXRyeUlmU2VydmVyRXJyb3IoKCkgPT4gZmV0Y2goZW5kcG9pbnQsIHJlcXVlc3QpKTtcclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlVmFsdWUgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY29uc3QgY29tcGxldGVkQXV0aFRva2VuID0gZXh0cmFjdEF1dGhUb2tlbkluZm9Gcm9tUmVzcG9uc2UocmVzcG9uc2VWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbXBsZXRlZEF1dGhUb2tlbjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IGF3YWl0IGdldEVycm9yRnJvbVJlc3BvbnNlKCdHZW5lcmF0ZSBBdXRoIFRva2VuJywgcmVzcG9uc2UpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldEdlbmVyYXRlQXV0aFRva2VuRW5kcG9pbnQoYXBwQ29uZmlnLCB7IGZpZCB9KSB7XHJcbiAgICByZXR1cm4gYCR7Z2V0SW5zdGFsbGF0aW9uc0VuZHBvaW50KGFwcENvbmZpZyl9LyR7ZmlkfS9hdXRoVG9rZW5zOmdlbmVyYXRlYDtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogUmV0dXJucyBhIHZhbGlkIGF1dGhlbnRpY2F0aW9uIHRva2VuIGZvciB0aGUgaW5zdGFsbGF0aW9uLiBHZW5lcmF0ZXMgYSBuZXdcclxuICogdG9rZW4gaWYgb25lIGRvZXNuJ3QgZXhpc3QsIGlzIGV4cGlyZWQgb3IgYWJvdXQgdG8gZXhwaXJlLlxyXG4gKlxyXG4gKiBTaG91bGQgb25seSBiZSBjYWxsZWQgaWYgdGhlIEZpcmViYXNlIEluc3RhbGxhdGlvbiBpcyByZWdpc3RlcmVkLlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gcmVmcmVzaEF1dGhUb2tlbihpbnN0YWxsYXRpb25zLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xyXG4gICAgbGV0IHRva2VuUHJvbWlzZTtcclxuICAgIGNvbnN0IGVudHJ5ID0gYXdhaXQgdXBkYXRlKGluc3RhbGxhdGlvbnMuYXBwQ29uZmlnLCBvbGRFbnRyeSA9PiB7XHJcbiAgICAgICAgaWYgKCFpc0VudHJ5UmVnaXN0ZXJlZChvbGRFbnRyeSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgRVJST1JfRkFDVE9SWS5jcmVhdGUoXCJub3QtcmVnaXN0ZXJlZFwiIC8qIEVycm9yQ29kZS5OT1RfUkVHSVNURVJFRCAqLyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9sZEF1dGhUb2tlbiA9IG9sZEVudHJ5LmF1dGhUb2tlbjtcclxuICAgICAgICBpZiAoIWZvcmNlUmVmcmVzaCAmJiBpc0F1dGhUb2tlblZhbGlkKG9sZEF1dGhUb2tlbikpIHtcclxuICAgICAgICAgICAgLy8gVGhlcmUgaXMgYSB2YWxpZCB0b2tlbiBpbiB0aGUgREIuXHJcbiAgICAgICAgICAgIHJldHVybiBvbGRFbnRyeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob2xkQXV0aFRva2VuLnJlcXVlc3RTdGF0dXMgPT09IDEgLyogUmVxdWVzdFN0YXR1cy5JTl9QUk9HUkVTUyAqLykge1xyXG4gICAgICAgICAgICAvLyBUaGVyZSBhbHJlYWR5IGlzIGEgdG9rZW4gcmVxdWVzdCBpbiBwcm9ncmVzcy5cclxuICAgICAgICAgICAgdG9rZW5Qcm9taXNlID0gd2FpdFVudGlsQXV0aFRva2VuUmVxdWVzdChpbnN0YWxsYXRpb25zLCBmb3JjZVJlZnJlc2gpO1xyXG4gICAgICAgICAgICByZXR1cm4gb2xkRW50cnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBObyB0b2tlbiBvciB0b2tlbiBleHBpcmVkLlxyXG4gICAgICAgICAgICBpZiAoIW5hdmlnYXRvci5vbkxpbmUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiYXBwLW9mZmxpbmVcIiAvKiBFcnJvckNvZGUuQVBQX09GRkxJTkUgKi8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGluUHJvZ3Jlc3NFbnRyeSA9IG1ha2VBdXRoVG9rZW5SZXF1ZXN0SW5Qcm9ncmVzc0VudHJ5KG9sZEVudHJ5KTtcclxuICAgICAgICAgICAgdG9rZW5Qcm9taXNlID0gZmV0Y2hBdXRoVG9rZW5Gcm9tU2VydmVyKGluc3RhbGxhdGlvbnMsIGluUHJvZ3Jlc3NFbnRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiBpblByb2dyZXNzRW50cnk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBhdXRoVG9rZW4gPSB0b2tlblByb21pc2VcclxuICAgICAgICA/IGF3YWl0IHRva2VuUHJvbWlzZVxyXG4gICAgICAgIDogZW50cnkuYXV0aFRva2VuO1xyXG4gICAgcmV0dXJuIGF1dGhUb2tlbjtcclxufVxyXG4vKipcclxuICogQ2FsbCBvbmx5IGlmIEZJRCBpcyByZWdpc3RlcmVkIGFuZCBBdXRoIFRva2VuIHJlcXVlc3QgaXMgaW4gcHJvZ3Jlc3MuXHJcbiAqXHJcbiAqIFdhaXRzIHVudGlsIHRoZSBjdXJyZW50IHBlbmRpbmcgcmVxdWVzdCBmaW5pc2hlcy4gSWYgdGhlIHJlcXVlc3QgdGltZXMgb3V0LFxyXG4gKiB0cmllcyBvbmNlIGluIHRoaXMgdGhyZWFkIGFzIHdlbGwuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiB3YWl0VW50aWxBdXRoVG9rZW5SZXF1ZXN0KGluc3RhbGxhdGlvbnMsIGZvcmNlUmVmcmVzaCkge1xyXG4gICAgLy8gVW5mb3J0dW5hdGVseSwgdGhlcmUgaXMgbm8gd2F5IG9mIHJlbGlhYmx5IG9ic2VydmluZyB3aGVuIGEgdmFsdWUgaW5cclxuICAgIC8vIEluZGV4ZWREQiBjaGFuZ2VzICh5ZXQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9pbmRleGVkLWRiLW9ic2VydmVycyksXHJcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHBvbGwuXHJcbiAgICBsZXQgZW50cnkgPSBhd2FpdCB1cGRhdGVBdXRoVG9rZW5SZXF1ZXN0KGluc3RhbGxhdGlvbnMuYXBwQ29uZmlnKTtcclxuICAgIHdoaWxlIChlbnRyeS5hdXRoVG9rZW4ucmVxdWVzdFN0YXR1cyA9PT0gMSAvKiBSZXF1ZXN0U3RhdHVzLklOX1BST0dSRVNTICovKSB7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGVBdXRoVG9rZW4gc3RpbGwgaW4gcHJvZ3Jlc3MuXHJcbiAgICAgICAgYXdhaXQgc2xlZXAoMTAwKTtcclxuICAgICAgICBlbnRyeSA9IGF3YWl0IHVwZGF0ZUF1dGhUb2tlblJlcXVlc3QoaW5zdGFsbGF0aW9ucy5hcHBDb25maWcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYXV0aFRva2VuID0gZW50cnkuYXV0aFRva2VuO1xyXG4gICAgaWYgKGF1dGhUb2tlbi5yZXF1ZXN0U3RhdHVzID09PSAwIC8qIFJlcXVlc3RTdGF0dXMuTk9UX1NUQVJURUQgKi8pIHtcclxuICAgICAgICAvLyBUaGUgcmVxdWVzdCB0aW1lZCBvdXQgb3IgZmFpbGVkIGluIGEgZGlmZmVyZW50IGNhbGwuIFRyeSBhZ2Fpbi5cclxuICAgICAgICByZXR1cm4gcmVmcmVzaEF1dGhUb2tlbihpbnN0YWxsYXRpb25zLCBmb3JjZVJlZnJlc2gpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGF1dGhUb2tlbjtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogQ2FsbGVkIG9ubHkgaWYgdGhlcmUgaXMgYSBHZW5lcmF0ZUF1dGhUb2tlbiByZXF1ZXN0IGluIHByb2dyZXNzLlxyXG4gKlxyXG4gKiBVcGRhdGVzIHRoZSBJbnN0YWxsYXRpb25FbnRyeSBpbiB0aGUgREIgYmFzZWQgb24gdGhlIHN0YXR1cyBvZiB0aGVcclxuICogR2VuZXJhdGVBdXRoVG9rZW4gcmVxdWVzdC5cclxuICpcclxuICogUmV0dXJucyB0aGUgdXBkYXRlZCBJbnN0YWxsYXRpb25FbnRyeS5cclxuICovXHJcbmZ1bmN0aW9uIHVwZGF0ZUF1dGhUb2tlblJlcXVlc3QoYXBwQ29uZmlnKSB7XHJcbiAgICByZXR1cm4gdXBkYXRlKGFwcENvbmZpZywgb2xkRW50cnkgPT4ge1xyXG4gICAgICAgIGlmICghaXNFbnRyeVJlZ2lzdGVyZWQob2xkRW50cnkpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwibm90LXJlZ2lzdGVyZWRcIiAvKiBFcnJvckNvZGUuTk9UX1JFR0lTVEVSRUQgKi8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvbGRBdXRoVG9rZW4gPSBvbGRFbnRyeS5hdXRoVG9rZW47XHJcbiAgICAgICAgaWYgKGhhc0F1dGhUb2tlblJlcXVlc3RUaW1lZE91dChvbGRBdXRoVG9rZW4pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9sZEVudHJ5KSwgeyBhdXRoVG9rZW46IHsgcmVxdWVzdFN0YXR1czogMCAvKiBSZXF1ZXN0U3RhdHVzLk5PVF9TVEFSVEVEICovIH0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvbGRFbnRyeTtcclxuICAgIH0pO1xyXG59XHJcbmFzeW5jIGZ1bmN0aW9uIGZldGNoQXV0aFRva2VuRnJvbVNlcnZlcihpbnN0YWxsYXRpb25zLCBpbnN0YWxsYXRpb25FbnRyeSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhdXRoVG9rZW4gPSBhd2FpdCBnZW5lcmF0ZUF1dGhUb2tlblJlcXVlc3QoaW5zdGFsbGF0aW9ucywgaW5zdGFsbGF0aW9uRW50cnkpO1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRJbnN0YWxsYXRpb25FbnRyeSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgaW5zdGFsbGF0aW9uRW50cnkpLCB7IGF1dGhUb2tlbiB9KTtcclxuICAgICAgICBhd2FpdCBzZXQoaW5zdGFsbGF0aW9ucy5hcHBDb25maWcsIHVwZGF0ZWRJbnN0YWxsYXRpb25FbnRyeSk7XHJcbiAgICAgICAgcmV0dXJuIGF1dGhUb2tlbjtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKGlzU2VydmVyRXJyb3IoZSkgJiZcclxuICAgICAgICAgICAgKGUuY3VzdG9tRGF0YS5zZXJ2ZXJDb2RlID09PSA0MDEgfHwgZS5jdXN0b21EYXRhLnNlcnZlckNvZGUgPT09IDQwNCkpIHtcclxuICAgICAgICAgICAgLy8gU2VydmVyIHJldHVybmVkIGEgXCJGSUQgbm90IGZvdW5kXCIgb3IgYSBcIkludmFsaWQgYXV0aGVudGljYXRpb25cIiBlcnJvci5cclxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgYSBuZXcgSUQgbmV4dCB0aW1lLlxyXG4gICAgICAgICAgICBhd2FpdCByZW1vdmUoaW5zdGFsbGF0aW9ucy5hcHBDb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlZEluc3RhbGxhdGlvbkVudHJ5ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpbnN0YWxsYXRpb25FbnRyeSksIHsgYXV0aFRva2VuOiB7IHJlcXVlc3RTdGF0dXM6IDAgLyogUmVxdWVzdFN0YXR1cy5OT1RfU1RBUlRFRCAqLyB9IH0pO1xyXG4gICAgICAgICAgICBhd2FpdCBzZXQoaW5zdGFsbGF0aW9ucy5hcHBDb25maWcsIHVwZGF0ZWRJbnN0YWxsYXRpb25FbnRyeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaXNFbnRyeVJlZ2lzdGVyZWQoaW5zdGFsbGF0aW9uRW50cnkpIHtcclxuICAgIHJldHVybiAoaW5zdGFsbGF0aW9uRW50cnkgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIGluc3RhbGxhdGlvbkVudHJ5LnJlZ2lzdHJhdGlvblN0YXR1cyA9PT0gMiAvKiBSZXF1ZXN0U3RhdHVzLkNPTVBMRVRFRCAqLyk7XHJcbn1cclxuZnVuY3Rpb24gaXNBdXRoVG9rZW5WYWxpZChhdXRoVG9rZW4pIHtcclxuICAgIHJldHVybiAoYXV0aFRva2VuLnJlcXVlc3RTdGF0dXMgPT09IDIgLyogUmVxdWVzdFN0YXR1cy5DT01QTEVURUQgKi8gJiZcclxuICAgICAgICAhaXNBdXRoVG9rZW5FeHBpcmVkKGF1dGhUb2tlbikpO1xyXG59XHJcbmZ1bmN0aW9uIGlzQXV0aFRva2VuRXhwaXJlZChhdXRoVG9rZW4pIHtcclxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICByZXR1cm4gKG5vdyA8IGF1dGhUb2tlbi5jcmVhdGlvblRpbWUgfHxcclxuICAgICAgICBhdXRoVG9rZW4uY3JlYXRpb25UaW1lICsgYXV0aFRva2VuLmV4cGlyZXNJbiA8IG5vdyArIFRPS0VOX0VYUElSQVRJT05fQlVGRkVSKTtcclxufVxyXG4vKiogUmV0dXJucyBhbiB1cGRhdGVkIEluc3RhbGxhdGlvbkVudHJ5IHdpdGggYW4gSW5Qcm9ncmVzc0F1dGhUb2tlbi4gKi9cclxuZnVuY3Rpb24gbWFrZUF1dGhUb2tlblJlcXVlc3RJblByb2dyZXNzRW50cnkob2xkRW50cnkpIHtcclxuICAgIGNvbnN0IGluUHJvZ3Jlc3NBdXRoVG9rZW4gPSB7XHJcbiAgICAgICAgcmVxdWVzdFN0YXR1czogMSAvKiBSZXF1ZXN0U3RhdHVzLklOX1BST0dSRVNTICovLFxyXG4gICAgICAgIHJlcXVlc3RUaW1lOiBEYXRlLm5vdygpXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb2xkRW50cnkpLCB7IGF1dGhUb2tlbjogaW5Qcm9ncmVzc0F1dGhUb2tlbiB9KTtcclxufVxyXG5mdW5jdGlvbiBoYXNBdXRoVG9rZW5SZXF1ZXN0VGltZWRPdXQoYXV0aFRva2VuKSB7XHJcbiAgICByZXR1cm4gKGF1dGhUb2tlbi5yZXF1ZXN0U3RhdHVzID09PSAxIC8qIFJlcXVlc3RTdGF0dXMuSU5fUFJPR1JFU1MgKi8gJiZcclxuICAgICAgICBhdXRoVG9rZW4ucmVxdWVzdFRpbWUgKyBQRU5ESU5HX1RJTUVPVVRfTVMgPCBEYXRlLm5vdygpKTtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogQ3JlYXRlcyBhIEZpcmViYXNlIEluc3RhbGxhdGlvbiBpZiB0aGVyZSBpc24ndCBvbmUgZm9yIHRoZSBhcHAgYW5kXHJcbiAqIHJldHVybnMgdGhlIEluc3RhbGxhdGlvbiBJRC5cclxuICogQHBhcmFtIGluc3RhbGxhdGlvbnMgLSBUaGUgYEluc3RhbGxhdGlvbnNgIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBnZXRJZChpbnN0YWxsYXRpb25zKSB7XHJcbiAgICBjb25zdCBpbnN0YWxsYXRpb25zSW1wbCA9IGluc3RhbGxhdGlvbnM7XHJcbiAgICBjb25zdCB7IGluc3RhbGxhdGlvbkVudHJ5LCByZWdpc3RyYXRpb25Qcm9taXNlIH0gPSBhd2FpdCBnZXRJbnN0YWxsYXRpb25FbnRyeShpbnN0YWxsYXRpb25zSW1wbCk7XHJcbiAgICBpZiAocmVnaXN0cmF0aW9uUHJvbWlzZSkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvblByb21pc2UuY2F0Y2goY29uc29sZS5lcnJvcik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBJZiB0aGUgaW5zdGFsbGF0aW9uIGlzIGFscmVhZHkgcmVnaXN0ZXJlZCwgdXBkYXRlIHRoZSBhdXRoZW50aWNhdGlvblxyXG4gICAgICAgIC8vIHRva2VuIGlmIG5lZWRlZC5cclxuICAgICAgICByZWZyZXNoQXV0aFRva2VuKGluc3RhbGxhdGlvbnNJbXBsKS5jYXRjaChjb25zb2xlLmVycm9yKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpbnN0YWxsYXRpb25FbnRyeS5maWQ7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFJldHVybnMgYSBGaXJlYmFzZSBJbnN0YWxsYXRpb25zIGF1dGggdG9rZW4sIGlkZW50aWZ5aW5nIHRoZSBjdXJyZW50XHJcbiAqIEZpcmViYXNlIEluc3RhbGxhdGlvbi5cclxuICogQHBhcmFtIGluc3RhbGxhdGlvbnMgLSBUaGUgYEluc3RhbGxhdGlvbnNgIGluc3RhbmNlLlxyXG4gKiBAcGFyYW0gZm9yY2VSZWZyZXNoIC0gRm9yY2UgcmVmcmVzaCByZWdhcmRsZXNzIG9mIHRva2VuIGV4cGlyYXRpb24uXHJcbiAqXHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGdldFRva2VuKGluc3RhbGxhdGlvbnMsIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBpbnN0YWxsYXRpb25zSW1wbCA9IGluc3RhbGxhdGlvbnM7XHJcbiAgICBhd2FpdCBjb21wbGV0ZUluc3RhbGxhdGlvblJlZ2lzdHJhdGlvbihpbnN0YWxsYXRpb25zSW1wbCk7XHJcbiAgICAvLyBBdCB0aGlzIHBvaW50IHdlIGVpdGhlciBoYXZlIGEgUmVnaXN0ZXJlZCBJbnN0YWxsYXRpb24gaW4gdGhlIERCLCBvciB3ZSd2ZVxyXG4gICAgLy8gYWxyZWFkeSB0aHJvd24gYW4gZXJyb3IuXHJcbiAgICBjb25zdCBhdXRoVG9rZW4gPSBhd2FpdCByZWZyZXNoQXV0aFRva2VuKGluc3RhbGxhdGlvbnNJbXBsLCBmb3JjZVJlZnJlc2gpO1xyXG4gICAgcmV0dXJuIGF1dGhUb2tlbi50b2tlbjtcclxufVxyXG5hc3luYyBmdW5jdGlvbiBjb21wbGV0ZUluc3RhbGxhdGlvblJlZ2lzdHJhdGlvbihpbnN0YWxsYXRpb25zKSB7XHJcbiAgICBjb25zdCB7IHJlZ2lzdHJhdGlvblByb21pc2UgfSA9IGF3YWl0IGdldEluc3RhbGxhdGlvbkVudHJ5KGluc3RhbGxhdGlvbnMpO1xyXG4gICAgaWYgKHJlZ2lzdHJhdGlvblByb21pc2UpIHtcclxuICAgICAgICAvLyBBIGNyZWF0ZUluc3RhbGxhdGlvbiByZXF1ZXN0IGlzIGluIHByb2dyZXNzLiBXYWl0IHVudGlsIGl0IGZpbmlzaGVzLlxyXG4gICAgICAgIGF3YWl0IHJlZ2lzdHJhdGlvblByb21pc2U7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlSW5zdGFsbGF0aW9uUmVxdWVzdChhcHBDb25maWcsIGluc3RhbGxhdGlvbkVudHJ5KSB7XHJcbiAgICBjb25zdCBlbmRwb2ludCA9IGdldERlbGV0ZUVuZHBvaW50KGFwcENvbmZpZywgaW5zdGFsbGF0aW9uRW50cnkpO1xyXG4gICAgY29uc3QgaGVhZGVycyA9IGdldEhlYWRlcnNXaXRoQXV0aChhcHBDb25maWcsIGluc3RhbGxhdGlvbkVudHJ5KTtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICBoZWFkZXJzXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXRyeUlmU2VydmVyRXJyb3IoKCkgPT4gZmV0Y2goZW5kcG9pbnQsIHJlcXVlc3QpKTtcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICB0aHJvdyBhd2FpdCBnZXRFcnJvckZyb21SZXNwb25zZSgnRGVsZXRlIEluc3RhbGxhdGlvbicsIHJlc3BvbnNlKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXREZWxldGVFbmRwb2ludChhcHBDb25maWcsIHsgZmlkIH0pIHtcclxuICAgIHJldHVybiBgJHtnZXRJbnN0YWxsYXRpb25zRW5kcG9pbnQoYXBwQ29uZmlnKX0vJHtmaWR9YDtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogRGVsZXRlcyB0aGUgRmlyZWJhc2UgSW5zdGFsbGF0aW9uIGFuZCBhbGwgYXNzb2NpYXRlZCBkYXRhLlxyXG4gKiBAcGFyYW0gaW5zdGFsbGF0aW9ucyAtIFRoZSBgSW5zdGFsbGF0aW9uc2AgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUluc3RhbGxhdGlvbnMoaW5zdGFsbGF0aW9ucykge1xyXG4gICAgY29uc3QgeyBhcHBDb25maWcgfSA9IGluc3RhbGxhdGlvbnM7XHJcbiAgICBjb25zdCBlbnRyeSA9IGF3YWl0IHVwZGF0ZShhcHBDb25maWcsIG9sZEVudHJ5ID0+IHtcclxuICAgICAgICBpZiAob2xkRW50cnkgJiYgb2xkRW50cnkucmVnaXN0cmF0aW9uU3RhdHVzID09PSAwIC8qIFJlcXVlc3RTdGF0dXMuTk9UX1NUQVJURUQgKi8pIHtcclxuICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSB1bnJlZ2lzdGVyZWQgZW50cnkgd2l0aG91dCBzZW5kaW5nIGEgZGVsZXRlSW5zdGFsbGF0aW9uIHJlcXVlc3QuXHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvbGRFbnRyeTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgICAgaWYgKGVudHJ5LnJlZ2lzdHJhdGlvblN0YXR1cyA9PT0gMSAvKiBSZXF1ZXN0U3RhdHVzLklOX1BST0dSRVNTICovKSB7XHJcbiAgICAgICAgICAgIC8vIENhbid0IGRlbGV0ZSB3aGlsZSB0cnlpbmcgdG8gcmVnaXN0ZXIuXHJcbiAgICAgICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiZGVsZXRlLXBlbmRpbmctcmVnaXN0cmF0aW9uXCIgLyogRXJyb3JDb2RlLkRFTEVURV9QRU5ESU5HX1JFR0lTVFJBVElPTiAqLyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGVudHJ5LnJlZ2lzdHJhdGlvblN0YXR1cyA9PT0gMiAvKiBSZXF1ZXN0U3RhdHVzLkNPTVBMRVRFRCAqLykge1xyXG4gICAgICAgICAgICBpZiAoIW5hdmlnYXRvci5vbkxpbmUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVSUk9SX0ZBQ1RPUlkuY3JlYXRlKFwiYXBwLW9mZmxpbmVcIiAvKiBFcnJvckNvZGUuQVBQX09GRkxJTkUgKi8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgZGVsZXRlSW5zdGFsbGF0aW9uUmVxdWVzdChhcHBDb25maWcsIGVudHJ5KTtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHJlbW92ZShhcHBDb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBTZXRzIGEgbmV3IGNhbGxiYWNrIHRoYXQgd2lsbCBnZXQgY2FsbGVkIHdoZW4gSW5zdGFsbGF0aW9uIElEIGNoYW5nZXMuXHJcbiAqIFJldHVybnMgYW4gdW5zdWJzY3JpYmUgZnVuY3Rpb24gdGhhdCB3aWxsIHJlbW92ZSB0aGUgY2FsbGJhY2sgd2hlbiBjYWxsZWQuXHJcbiAqIEBwYXJhbSBpbnN0YWxsYXRpb25zIC0gVGhlIGBJbnN0YWxsYXRpb25zYCBpbnN0YW5jZS5cclxuICogQHBhcmFtIGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgaW52b2tlZCB3aGVuIEZJRCBjaGFuZ2VzLlxyXG4gKiBAcmV0dXJucyBBIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byB1bnN1YnNjcmliZS5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKi9cclxuZnVuY3Rpb24gb25JZENoYW5nZShpbnN0YWxsYXRpb25zLCBjYWxsYmFjaykge1xyXG4gICAgY29uc3QgeyBhcHBDb25maWcgfSA9IGluc3RhbGxhdGlvbnM7XHJcbiAgICBhZGRDYWxsYmFjayhhcHBDb25maWcsIGNhbGxiYWNrKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgcmVtb3ZlQ2FsbGJhY2soYXBwQ29uZmlnLCBjYWxsYmFjayk7XHJcbiAgICB9O1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIHtAbGluayBJbnN0YWxsYXRpb25zfSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuXHJcbiAqIHtAbGluayBAZmlyZWJhc2UvYXBwI0ZpcmViYXNlQXBwfSBpbnN0YW5jZS5cclxuICogQHBhcmFtIGFwcCAtIFRoZSB7QGxpbmsgQGZpcmViYXNlL2FwcCNGaXJlYmFzZUFwcH0gaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmZ1bmN0aW9uIGdldEluc3RhbGxhdGlvbnMoYXBwID0gZ2V0QXBwKCkpIHtcclxuICAgIGNvbnN0IGluc3RhbGxhdGlvbnNJbXBsID0gX2dldFByb3ZpZGVyKGFwcCwgJ2luc3RhbGxhdGlvbnMnKS5nZXRJbW1lZGlhdGUoKTtcclxuICAgIHJldHVybiBpbnN0YWxsYXRpb25zSW1wbDtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBleHRyYWN0QXBwQ29uZmlnKGFwcCkge1xyXG4gICAgaWYgKCFhcHAgfHwgIWFwcC5vcHRpb25zKSB7XHJcbiAgICAgICAgdGhyb3cgZ2V0TWlzc2luZ1ZhbHVlRXJyb3IoJ0FwcCBDb25maWd1cmF0aW9uJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWFwcC5uYW1lKSB7XHJcbiAgICAgICAgdGhyb3cgZ2V0TWlzc2luZ1ZhbHVlRXJyb3IoJ0FwcCBOYW1lJyk7XHJcbiAgICB9XHJcbiAgICAvLyBSZXF1aXJlZCBhcHAgY29uZmlnIGtleXNcclxuICAgIGNvbnN0IGNvbmZpZ0tleXMgPSBbXHJcbiAgICAgICAgJ3Byb2plY3RJZCcsXHJcbiAgICAgICAgJ2FwaUtleScsXHJcbiAgICAgICAgJ2FwcElkJ1xyXG4gICAgXTtcclxuICAgIGZvciAoY29uc3Qga2V5TmFtZSBvZiBjb25maWdLZXlzKSB7XHJcbiAgICAgICAgaWYgKCFhcHAub3B0aW9uc1trZXlOYW1lXSkge1xyXG4gICAgICAgICAgICB0aHJvdyBnZXRNaXNzaW5nVmFsdWVFcnJvcihrZXlOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFwcE5hbWU6IGFwcC5uYW1lLFxyXG4gICAgICAgIHByb2plY3RJZDogYXBwLm9wdGlvbnMucHJvamVjdElkLFxyXG4gICAgICAgIGFwaUtleTogYXBwLm9wdGlvbnMuYXBpS2V5LFxyXG4gICAgICAgIGFwcElkOiBhcHAub3B0aW9ucy5hcHBJZFxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBnZXRNaXNzaW5nVmFsdWVFcnJvcih2YWx1ZU5hbWUpIHtcclxuICAgIHJldHVybiBFUlJPUl9GQUNUT1JZLmNyZWF0ZShcIm1pc3NpbmctYXBwLWNvbmZpZy12YWx1ZXNcIiAvKiBFcnJvckNvZGUuTUlTU0lOR19BUFBfQ09ORklHX1ZBTFVFUyAqLywge1xyXG4gICAgICAgIHZhbHVlTmFtZVxyXG4gICAgfSk7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuY29uc3QgSU5TVEFMTEFUSU9OU19OQU1FID0gJ2luc3RhbGxhdGlvbnMnO1xyXG5jb25zdCBJTlNUQUxMQVRJT05TX05BTUVfSU5URVJOQUwgPSAnaW5zdGFsbGF0aW9ucy1pbnRlcm5hbCc7XHJcbmNvbnN0IHB1YmxpY0ZhY3RvcnkgPSAoY29udGFpbmVyKSA9PiB7XHJcbiAgICBjb25zdCBhcHAgPSBjb250YWluZXIuZ2V0UHJvdmlkZXIoJ2FwcCcpLmdldEltbWVkaWF0ZSgpO1xyXG4gICAgLy8gVGhyb3dzIGlmIGFwcCBpc24ndCBjb25maWd1cmVkIHByb3Blcmx5LlxyXG4gICAgY29uc3QgYXBwQ29uZmlnID0gZXh0cmFjdEFwcENvbmZpZyhhcHApO1xyXG4gICAgY29uc3QgaGVhcnRiZWF0U2VydmljZVByb3ZpZGVyID0gX2dldFByb3ZpZGVyKGFwcCwgJ2hlYXJ0YmVhdCcpO1xyXG4gICAgY29uc3QgaW5zdGFsbGF0aW9uc0ltcGwgPSB7XHJcbiAgICAgICAgYXBwLFxyXG4gICAgICAgIGFwcENvbmZpZyxcclxuICAgICAgICBoZWFydGJlYXRTZXJ2aWNlUHJvdmlkZXIsXHJcbiAgICAgICAgX2RlbGV0ZTogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKClcclxuICAgIH07XHJcbiAgICByZXR1cm4gaW5zdGFsbGF0aW9uc0ltcGw7XHJcbn07XHJcbmNvbnN0IGludGVybmFsRmFjdG9yeSA9IChjb250YWluZXIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IGNvbnRhaW5lci5nZXRQcm92aWRlcignYXBwJykuZ2V0SW1tZWRpYXRlKCk7XHJcbiAgICAvLyBJbnRlcm5hbCBGSVMgaW5zdGFuY2UgcmVsaWVzIG9uIHB1YmxpYyBGSVMgaW5zdGFuY2UuXHJcbiAgICBjb25zdCBpbnN0YWxsYXRpb25zID0gX2dldFByb3ZpZGVyKGFwcCwgSU5TVEFMTEFUSU9OU19OQU1FKS5nZXRJbW1lZGlhdGUoKTtcclxuICAgIGNvbnN0IGluc3RhbGxhdGlvbnNJbnRlcm5hbCA9IHtcclxuICAgICAgICBnZXRJZDogKCkgPT4gZ2V0SWQoaW5zdGFsbGF0aW9ucyksXHJcbiAgICAgICAgZ2V0VG9rZW46IChmb3JjZVJlZnJlc2gpID0+IGdldFRva2VuKGluc3RhbGxhdGlvbnMsIGZvcmNlUmVmcmVzaClcclxuICAgIH07XHJcbiAgICByZXR1cm4gaW5zdGFsbGF0aW9uc0ludGVybmFsO1xyXG59O1xyXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbGxhdGlvbnMoKSB7XHJcbiAgICBfcmVnaXN0ZXJDb21wb25lbnQobmV3IENvbXBvbmVudChJTlNUQUxMQVRJT05TX05BTUUsIHB1YmxpY0ZhY3RvcnksIFwiUFVCTElDXCIgLyogQ29tcG9uZW50VHlwZS5QVUJMSUMgKi8pKTtcclxuICAgIF9yZWdpc3RlckNvbXBvbmVudChuZXcgQ29tcG9uZW50KElOU1RBTExBVElPTlNfTkFNRV9JTlRFUk5BTCwgaW50ZXJuYWxGYWN0b3J5LCBcIlBSSVZBVEVcIiAvKiBDb21wb25lbnRUeXBlLlBSSVZBVEUgKi8pKTtcclxufVxuXG4vKipcclxuICogRmlyZWJhc2UgSW5zdGFsbGF0aW9uc1xyXG4gKlxyXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cclxuICovXHJcbnJlZ2lzdGVySW5zdGFsbGF0aW9ucygpO1xyXG5yZWdpc3RlclZlcnNpb24obmFtZSwgdmVyc2lvbik7XHJcbi8vIEJVSUxEX1RBUkdFVCB3aWxsIGJlIHJlcGxhY2VkIGJ5IHZhbHVlcyBsaWtlIGVzbTUsIGVzbTIwMTcsIGNqczUsIGV0YyBkdXJpbmcgdGhlIGNvbXBpbGF0aW9uXHJcbnJlZ2lzdGVyVmVyc2lvbihuYW1lLCB2ZXJzaW9uLCAnZXNtMjAxNycpO1xuXG5leHBvcnQgeyBkZWxldGVJbnN0YWxsYXRpb25zLCBnZXRJZCwgZ2V0SW5zdGFsbGF0aW9ucywgZ2V0VG9rZW4sIG9uSWRDaGFuZ2UgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzbTIwMTcuanMubWFwXG4iLCJleHBvcnQgKiBmcm9tICdAZmlyZWJhc2UvYW5hbHl0aWNzJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzbS5qcy5tYXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==