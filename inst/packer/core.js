"use strict";
(self["webpackChunkfirebase_r"] = self["webpackChunkfirebase_r"] || []).push([["core"],{

/***/ "./node_modules/@firebase/storage/dist/index.esm2017.js":
/*!**************************************************************!*\
  !*** ./node_modules/@firebase/storage/dist/index.esm2017.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StringFormat": () => (/* binding */ StringFormat),
/* harmony export */   "_FbsBlob": () => (/* binding */ FbsBlob),
/* harmony export */   "_Location": () => (/* binding */ Location),
/* harmony export */   "_TaskEvent": () => (/* binding */ TaskEvent),
/* harmony export */   "_TaskState": () => (/* binding */ TaskState),
/* harmony export */   "_UploadTask": () => (/* binding */ UploadTask),
/* harmony export */   "_dataFromString": () => (/* binding */ dataFromString),
/* harmony export */   "_getChild": () => (/* binding */ _getChild),
/* harmony export */   "_invalidArgument": () => (/* binding */ invalidArgument),
/* harmony export */   "_invalidRootOperation": () => (/* binding */ invalidRootOperation),
/* harmony export */   "connectStorageEmulator": () => (/* binding */ connectStorageEmulator),
/* harmony export */   "deleteObject": () => (/* binding */ deleteObject),
/* harmony export */   "getBlob": () => (/* binding */ getBlob),
/* harmony export */   "getBytes": () => (/* binding */ getBytes),
/* harmony export */   "getDownloadURL": () => (/* binding */ getDownloadURL),
/* harmony export */   "getMetadata": () => (/* binding */ getMetadata),
/* harmony export */   "getStorage": () => (/* binding */ getStorage),
/* harmony export */   "getStream": () => (/* binding */ getStream),
/* harmony export */   "list": () => (/* binding */ list),
/* harmony export */   "listAll": () => (/* binding */ listAll),
/* harmony export */   "ref": () => (/* binding */ ref),
/* harmony export */   "updateMetadata": () => (/* binding */ updateMetadata),
/* harmony export */   "uploadBytes": () => (/* binding */ uploadBytes),
/* harmony export */   "uploadBytesResumable": () => (/* binding */ uploadBytesResumable),
/* harmony export */   "uploadString": () => (/* binding */ uploadString)
/* harmony export */ });
/* harmony import */ var _firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/app */ "./node_modules/@firebase/app/dist/esm/index.esm2017.js");
/* harmony import */ var _firebase_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @firebase/util */ "./node_modules/@firebase/util/dist/index.esm2017.js");
/* harmony import */ var _firebase_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @firebase/component */ "./node_modules/@firebase/component/dist/esm/index.esm2017.js");




/**
 * @license
 * Copyright 2017 Google LLC
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
 * @fileoverview Constants used in the Firebase Storage library.
 */
/**
 * Domain name for firebase storage.
 */
const DEFAULT_HOST = 'firebasestorage.googleapis.com';
/**
 * The key in Firebase config json for the storage bucket.
 */
const CONFIG_STORAGE_BUCKET_KEY = 'storageBucket';
/**
 * 2 minutes
 *
 * The timeout for all operations except upload.
 */
const DEFAULT_MAX_OPERATION_RETRY_TIME = 2 * 60 * 1000;
/**
 * 10 minutes
 *
 * The timeout for upload.
 */
const DEFAULT_MAX_UPLOAD_RETRY_TIME = 10 * 60 * 1000;

/**
 * @license
 * Copyright 2017 Google LLC
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
 * An error returned by the Firebase Storage SDK.
 * @public
 */
class StorageError extends _firebase_util__WEBPACK_IMPORTED_MODULE_1__.FirebaseError {
    /**
     * @param code - A StorageErrorCode string to be prefixed with 'storage/' and
     *  added to the end of the message.
     * @param message  - Error message.
     */
    constructor(code, message) {
        super(prependCode(code), `Firebase Storage: ${message} (${prependCode(code)})`);
        /**
         * Stores custom error data unque to StorageError.
         */
        this.customData = { serverResponse: null };
        this._baseMessage = this.message;
        // Without this, `instanceof StorageError`, in tests for example,
        // returns false.
        Object.setPrototypeOf(this, StorageError.prototype);
    }
    /**
     * Compares a StorageErrorCode against this error's code, filtering out the prefix.
     */
    _codeEquals(code) {
        return prependCode(code) === this.code;
    }
    /**
     * Optional response message that was added by the server.
     */
    get serverResponse() {
        return this.customData.serverResponse;
    }
    set serverResponse(serverResponse) {
        this.customData.serverResponse = serverResponse;
        if (this.customData.serverResponse) {
            this.message = `${this._baseMessage}\n${this.customData.serverResponse}`;
        }
        else {
            this.message = this._baseMessage;
        }
    }
}
function prependCode(code) {
    return 'storage/' + code;
}
function unknown() {
    const message = 'An unknown error occurred, please check the error payload for ' +
        'server response.';
    return new StorageError("unknown" /* UNKNOWN */, message);
}
function objectNotFound(path) {
    return new StorageError("object-not-found" /* OBJECT_NOT_FOUND */, "Object '" + path + "' does not exist.");
}
function quotaExceeded(bucket) {
    return new StorageError("quota-exceeded" /* QUOTA_EXCEEDED */, "Quota for bucket '" +
        bucket +
        "' exceeded, please view quota on " +
        'https://firebase.google.com/pricing/.');
}
function unauthenticated() {
    const message = 'User is not authenticated, please authenticate using Firebase ' +
        'Authentication and try again.';
    return new StorageError("unauthenticated" /* UNAUTHENTICATED */, message);
}
function unauthorizedApp() {
    return new StorageError("unauthorized-app" /* UNAUTHORIZED_APP */, 'This app does not have permission to access Firebase Storage on this project.');
}
function unauthorized(path) {
    return new StorageError("unauthorized" /* UNAUTHORIZED */, "User does not have permission to access '" + path + "'.");
}
function retryLimitExceeded() {
    return new StorageError("retry-limit-exceeded" /* RETRY_LIMIT_EXCEEDED */, 'Max retry time for operation exceeded, please try again.');
}
function canceled() {
    return new StorageError("canceled" /* CANCELED */, 'User canceled the upload/download.');
}
function invalidUrl(url) {
    return new StorageError("invalid-url" /* INVALID_URL */, "Invalid URL '" + url + "'.");
}
function invalidDefaultBucket(bucket) {
    return new StorageError("invalid-default-bucket" /* INVALID_DEFAULT_BUCKET */, "Invalid default bucket '" + bucket + "'.");
}
function noDefaultBucket() {
    return new StorageError("no-default-bucket" /* NO_DEFAULT_BUCKET */, 'No default bucket ' +
        "found. Did you set the '" +
        CONFIG_STORAGE_BUCKET_KEY +
        "' property when initializing the app?");
}
function cannotSliceBlob() {
    return new StorageError("cannot-slice-blob" /* CANNOT_SLICE_BLOB */, 'Cannot slice blob for upload. Please retry the upload.');
}
function serverFileWrongSize() {
    return new StorageError("server-file-wrong-size" /* SERVER_FILE_WRONG_SIZE */, 'Server recorded incorrect upload file size, please retry the upload.');
}
function noDownloadURL() {
    return new StorageError("no-download-url" /* NO_DOWNLOAD_URL */, 'The given file does not have any download URLs.');
}
/**
 * @internal
 */
function invalidArgument(message) {
    return new StorageError("invalid-argument" /* INVALID_ARGUMENT */, message);
}
function appDeleted() {
    return new StorageError("app-deleted" /* APP_DELETED */, 'The Firebase app was deleted.');
}
/**
 * @param name - The name of the operation that was invalid.
 *
 * @internal
 */
function invalidRootOperation(name) {
    return new StorageError("invalid-root-operation" /* INVALID_ROOT_OPERATION */, "The operation '" +
        name +
        "' cannot be performed on a root reference, create a non-root " +
        "reference using child, such as .child('file.png').");
}
/**
 * @param format - The format that was not valid.
 * @param message - A message describing the format violation.
 */
function invalidFormat(format, message) {
    return new StorageError("invalid-format" /* INVALID_FORMAT */, "String does not match format '" + format + "': " + message);
}
/**
 * @param message - A message describing the internal error.
 */
function internalError(message) {
    throw new StorageError("internal-error" /* INTERNAL_ERROR */, 'Internal error: ' + message);
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 * Firebase Storage location data.
 *
 * @internal
 */
class Location {
    constructor(bucket, path) {
        this.bucket = bucket;
        this.path_ = path;
    }
    get path() {
        return this.path_;
    }
    get isRoot() {
        return this.path.length === 0;
    }
    fullServerUrl() {
        const encode = encodeURIComponent;
        return '/b/' + encode(this.bucket) + '/o/' + encode(this.path);
    }
    bucketOnlyServerUrl() {
        const encode = encodeURIComponent;
        return '/b/' + encode(this.bucket) + '/o';
    }
    static makeFromBucketSpec(bucketString, host) {
        let bucketLocation;
        try {
            bucketLocation = Location.makeFromUrl(bucketString, host);
        }
        catch (e) {
            // Not valid URL, use as-is. This lets you put bare bucket names in
            // config.
            return new Location(bucketString, '');
        }
        if (bucketLocation.path === '') {
            return bucketLocation;
        }
        else {
            throw invalidDefaultBucket(bucketString);
        }
    }
    static makeFromUrl(url, host) {
        let location = null;
        const bucketDomain = '([A-Za-z0-9.\\-_]+)';
        function gsModify(loc) {
            if (loc.path.charAt(loc.path.length - 1) === '/') {
                loc.path_ = loc.path_.slice(0, -1);
            }
        }
        const gsPath = '(/(.*))?$';
        const gsRegex = new RegExp('^gs://' + bucketDomain + gsPath, 'i');
        const gsIndices = { bucket: 1, path: 3 };
        function httpModify(loc) {
            loc.path_ = decodeURIComponent(loc.path);
        }
        const version = 'v[A-Za-z0-9_]+';
        const firebaseStorageHost = host.replace(/[.]/g, '\\.');
        const firebaseStoragePath = '(/([^?#]*).*)?$';
        const firebaseStorageRegExp = new RegExp(`^https?://${firebaseStorageHost}/${version}/b/${bucketDomain}/o${firebaseStoragePath}`, 'i');
        const firebaseStorageIndices = { bucket: 1, path: 3 };
        const cloudStorageHost = host === DEFAULT_HOST
            ? '(?:storage.googleapis.com|storage.cloud.google.com)'
            : host;
        const cloudStoragePath = '([^?#]*)';
        const cloudStorageRegExp = new RegExp(`^https?://${cloudStorageHost}/${bucketDomain}/${cloudStoragePath}`, 'i');
        const cloudStorageIndices = { bucket: 1, path: 2 };
        const groups = [
            { regex: gsRegex, indices: gsIndices, postModify: gsModify },
            {
                regex: firebaseStorageRegExp,
                indices: firebaseStorageIndices,
                postModify: httpModify
            },
            {
                regex: cloudStorageRegExp,
                indices: cloudStorageIndices,
                postModify: httpModify
            }
        ];
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            const captures = group.regex.exec(url);
            if (captures) {
                const bucketValue = captures[group.indices.bucket];
                let pathValue = captures[group.indices.path];
                if (!pathValue) {
                    pathValue = '';
                }
                location = new Location(bucketValue, pathValue);
                group.postModify(location);
                break;
            }
        }
        if (location == null) {
            throw invalidUrl(url);
        }
        return location;
    }
}

/**
 * A request whose promise always fails.
 */
class FailRequest {
    constructor(error) {
        this.promise_ = Promise.reject(error);
    }
    /** @inheritDoc */
    getPromise() {
        return this.promise_;
    }
    /** @inheritDoc */
    cancel(_appDelete = false) { }
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 * @param f May be invoked
 *     before the function returns.
 * @param callback Get all the arguments passed to the function
 *     passed to f, including the initial boolean.
 */
function start(f, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
callback, timeout) {
    // TODO(andysoto): make this code cleaner (probably refactor into an actual
    // type instead of a bunch of functions with state shared in the closure)
    let waitSeconds = 1;
    // Would type this as "number" but that doesn't work for Node so ¯\_(ツ)_/¯
    // TODO: find a way to exclude Node type definition for storage because storage only works in browser
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let retryTimeoutId = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let globalTimeoutId = null;
    let hitTimeout = false;
    let cancelState = 0;
    function canceled() {
        return cancelState === 2;
    }
    let triggeredCallback = false;
    function triggerCallback(...args) {
        if (!triggeredCallback) {
            triggeredCallback = true;
            callback.apply(null, args);
        }
    }
    function callWithDelay(millis) {
        retryTimeoutId = setTimeout(() => {
            retryTimeoutId = null;
            f(handler, canceled());
        }, millis);
    }
    function clearGlobalTimeout() {
        if (globalTimeoutId) {
            clearTimeout(globalTimeoutId);
        }
    }
    function handler(success, ...args) {
        if (triggeredCallback) {
            clearGlobalTimeout();
            return;
        }
        if (success) {
            clearGlobalTimeout();
            triggerCallback.call(null, success, ...args);
            return;
        }
        const mustStop = canceled() || hitTimeout;
        if (mustStop) {
            clearGlobalTimeout();
            triggerCallback.call(null, success, ...args);
            return;
        }
        if (waitSeconds < 64) {
            /* TODO(andysoto): don't back off so quickly if we know we're offline. */
            waitSeconds *= 2;
        }
        let waitMillis;
        if (cancelState === 1) {
            cancelState = 2;
            waitMillis = 0;
        }
        else {
            waitMillis = (waitSeconds + Math.random()) * 1000;
        }
        callWithDelay(waitMillis);
    }
    let stopped = false;
    function stop(wasTimeout) {
        if (stopped) {
            return;
        }
        stopped = true;
        clearGlobalTimeout();
        if (triggeredCallback) {
            return;
        }
        if (retryTimeoutId !== null) {
            if (!wasTimeout) {
                cancelState = 2;
            }
            clearTimeout(retryTimeoutId);
            callWithDelay(0);
        }
        else {
            if (!wasTimeout) {
                cancelState = 1;
            }
        }
    }
    callWithDelay(0);
    globalTimeoutId = setTimeout(() => {
        hitTimeout = true;
        stop(true);
    }, timeout);
    return stop;
}
/**
 * Stops the retry loop from repeating.
 * If the function is currently "in between" retries, it is invoked immediately
 * with the second parameter as "true". Otherwise, it will be invoked once more
 * after the current invocation finishes iff the current invocation would have
 * triggered another retry.
 */
function stop(id) {
    id(false);
}

/**
 * @license
 * Copyright 2017 Google LLC
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
function isJustDef(p) {
    return p !== void 0;
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(p) {
    return typeof p === 'function';
}
function isNonArrayObject(p) {
    return typeof p === 'object' && !Array.isArray(p);
}
function isString(p) {
    return typeof p === 'string' || p instanceof String;
}
function isNativeBlob(p) {
    return isNativeBlobDefined() && p instanceof Blob;
}
function isNativeBlobDefined() {
    return typeof Blob !== 'undefined';
}
function validateNumber(argument, minValue, maxValue, value) {
    if (value < minValue) {
        throw invalidArgument(`Invalid value for '${argument}'. Expected ${minValue} or greater.`);
    }
    if (value > maxValue) {
        throw invalidArgument(`Invalid value for '${argument}'. Expected ${maxValue} or less.`);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
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
function makeUrl(urlPart, host, protocol) {
    let origin = host;
    if (protocol == null) {
        origin = `https://${host}`;
    }
    return `${protocol}://${origin}/v0${urlPart}`;
}
function makeQueryString(params) {
    const encode = encodeURIComponent;
    let queryPart = '?';
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const nextPart = encode(key) + '=' + encode(params[key]);
            queryPart = queryPart + nextPart + '&';
        }
    }
    // Chop off the extra '&' or '?' on the end
    queryPart = queryPart.slice(0, -1);
    return queryPart;
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 * Error codes for requests made by the the XhrIo wrapper.
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["NO_ERROR"] = 0] = "NO_ERROR";
    ErrorCode[ErrorCode["NETWORK_ERROR"] = 1] = "NETWORK_ERROR";
    ErrorCode[ErrorCode["ABORT"] = 2] = "ABORT";
})(ErrorCode || (ErrorCode = {}));

/**
 * @license
 * Copyright 2017 Google LLC
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
 * Handles network logic for all Storage Requests, including error reporting and
 * retries with backoff.
 *
 * @param I - the type of the backend's network response.
 * @param - O the output type used by the rest of the SDK. The conversion
 * happens in the specified `callback_`.
 */
class NetworkRequest {
    constructor(url_, method_, headers_, body_, successCodes_, additionalRetryCodes_, callback_, errorCallback_, timeout_, progressCallback_, connectionFactory_) {
        this.url_ = url_;
        this.method_ = method_;
        this.headers_ = headers_;
        this.body_ = body_;
        this.successCodes_ = successCodes_;
        this.additionalRetryCodes_ = additionalRetryCodes_;
        this.callback_ = callback_;
        this.errorCallback_ = errorCallback_;
        this.timeout_ = timeout_;
        this.progressCallback_ = progressCallback_;
        this.connectionFactory_ = connectionFactory_;
        this.pendingConnection_ = null;
        this.backoffId_ = null;
        this.canceled_ = false;
        this.appDelete_ = false;
        this.promise_ = new Promise((resolve, reject) => {
            this.resolve_ = resolve;
            this.reject_ = reject;
            this.start_();
        });
    }
    /**
     * Actually starts the retry loop.
     */
    start_() {
        const doTheRequest = (backoffCallback, canceled) => {
            if (canceled) {
                backoffCallback(false, new RequestEndStatus(false, null, true));
                return;
            }
            const connection = this.connectionFactory_();
            this.pendingConnection_ = connection;
            const progressListener = progressEvent => {
                const loaded = progressEvent.loaded;
                const total = progressEvent.lengthComputable
                    ? progressEvent.total
                    : -1;
                if (this.progressCallback_ !== null) {
                    this.progressCallback_(loaded, total);
                }
            };
            if (this.progressCallback_ !== null) {
                connection.addUploadProgressListener(progressListener);
            }
            // connection.send() never rejects, so we don't need to have a error handler or use catch on the returned promise.
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            connection
                .send(this.url_, this.method_, this.body_, this.headers_)
                .then(() => {
                if (this.progressCallback_ !== null) {
                    connection.removeUploadProgressListener(progressListener);
                }
                this.pendingConnection_ = null;
                const hitServer = connection.getErrorCode() === ErrorCode.NO_ERROR;
                const status = connection.getStatus();
                if (!hitServer || this.isRetryStatusCode_(status)) {
                    const wasCanceled = connection.getErrorCode() === ErrorCode.ABORT;
                    backoffCallback(false, new RequestEndStatus(false, null, wasCanceled));
                    return;
                }
                const successCode = this.successCodes_.indexOf(status) !== -1;
                backoffCallback(true, new RequestEndStatus(successCode, connection));
            });
        };
        /**
         * @param requestWentThrough - True if the request eventually went
         *     through, false if it hit the retry limit or was canceled.
         */
        const backoffDone = (requestWentThrough, status) => {
            const resolve = this.resolve_;
            const reject = this.reject_;
            const connection = status.connection;
            if (status.wasSuccessCode) {
                try {
                    const result = this.callback_(connection, connection.getResponse());
                    if (isJustDef(result)) {
                        resolve(result);
                    }
                    else {
                        resolve();
                    }
                }
                catch (e) {
                    reject(e);
                }
            }
            else {
                if (connection !== null) {
                    const err = unknown();
                    err.serverResponse = connection.getErrorText();
                    if (this.errorCallback_) {
                        reject(this.errorCallback_(connection, err));
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    if (status.canceled) {
                        const err = this.appDelete_ ? appDeleted() : canceled();
                        reject(err);
                    }
                    else {
                        const err = retryLimitExceeded();
                        reject(err);
                    }
                }
            }
        };
        if (this.canceled_) {
            backoffDone(false, new RequestEndStatus(false, null, true));
        }
        else {
            this.backoffId_ = start(doTheRequest, backoffDone, this.timeout_);
        }
    }
    /** @inheritDoc */
    getPromise() {
        return this.promise_;
    }
    /** @inheritDoc */
    cancel(appDelete) {
        this.canceled_ = true;
        this.appDelete_ = appDelete || false;
        if (this.backoffId_ !== null) {
            stop(this.backoffId_);
        }
        if (this.pendingConnection_ !== null) {
            this.pendingConnection_.abort();
        }
    }
    isRetryStatusCode_(status) {
        // The codes for which to retry came from this page:
        // https://cloud.google.com/storage/docs/exponential-backoff
        const isFiveHundredCode = status >= 500 && status < 600;
        const extraRetryCodes = [
            // Request Timeout: web server didn't receive full request in time.
            408,
            // Too Many Requests: you're getting rate-limited, basically.
            429
        ];
        const isExtraRetryCode = extraRetryCodes.indexOf(status) !== -1;
        const isRequestSpecificRetryCode = this.additionalRetryCodes_.indexOf(status) !== -1;
        return isFiveHundredCode || isExtraRetryCode || isRequestSpecificRetryCode;
    }
}
/**
 * A collection of information about the result of a network request.
 * @param opt_canceled - Defaults to false.
 */
class RequestEndStatus {
    constructor(wasSuccessCode, connection, canceled) {
        this.wasSuccessCode = wasSuccessCode;
        this.connection = connection;
        this.canceled = !!canceled;
    }
}
function addAuthHeader_(headers, authToken) {
    if (authToken !== null && authToken.length > 0) {
        headers['Authorization'] = 'Firebase ' + authToken;
    }
}
function addVersionHeader_(headers, firebaseVersion) {
    headers['X-Firebase-Storage-Version'] =
        'webjs/' + (firebaseVersion !== null && firebaseVersion !== void 0 ? firebaseVersion : 'AppManager');
}
function addGmpidHeader_(headers, appId) {
    if (appId) {
        headers['X-Firebase-GMPID'] = appId;
    }
}
function addAppCheckHeader_(headers, appCheckToken) {
    if (appCheckToken !== null) {
        headers['X-Firebase-AppCheck'] = appCheckToken;
    }
}
function makeRequest(requestInfo, appId, authToken, appCheckToken, requestFactory, firebaseVersion) {
    const queryPart = makeQueryString(requestInfo.urlParams);
    const url = requestInfo.url + queryPart;
    const headers = Object.assign({}, requestInfo.headers);
    addGmpidHeader_(headers, appId);
    addAuthHeader_(headers, authToken);
    addVersionHeader_(headers, firebaseVersion);
    addAppCheckHeader_(headers, appCheckToken);
    return new NetworkRequest(url, requestInfo.method, headers, requestInfo.body, requestInfo.successCodes, requestInfo.additionalRetryCodes, requestInfo.handler, requestInfo.errorHandler, requestInfo.timeout, requestInfo.progressCallback, requestFactory);
}

/**
 * @license
 * Copyright 2017 Google LLC
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
function getBlobBuilder() {
    if (typeof BlobBuilder !== 'undefined') {
        return BlobBuilder;
    }
    else if (typeof WebKitBlobBuilder !== 'undefined') {
        return WebKitBlobBuilder;
    }
    else {
        return undefined;
    }
}
/**
 * Concatenates one or more values together and converts them to a Blob.
 *
 * @param args The values that will make up the resulting blob.
 * @return The blob.
 */
function getBlob$1(...args) {
    const BlobBuilder = getBlobBuilder();
    if (BlobBuilder !== undefined) {
        const bb = new BlobBuilder();
        for (let i = 0; i < args.length; i++) {
            bb.append(args[i]);
        }
        return bb.getBlob();
    }
    else {
        if (isNativeBlobDefined()) {
            return new Blob(args);
        }
        else {
            throw new StorageError("unsupported-environment" /* UNSUPPORTED_ENVIRONMENT */, "This browser doesn't seem to support creating Blobs");
        }
    }
}
/**
 * Slices the blob. The returned blob contains data from the start byte
 * (inclusive) till the end byte (exclusive). Negative indices cannot be used.
 *
 * @param blob The blob to be sliced.
 * @param start Index of the starting byte.
 * @param end Index of the ending byte.
 * @return The blob slice or null if not supported.
 */
function sliceBlob(blob, start, end) {
    if (blob.webkitSlice) {
        return blob.webkitSlice(start, end);
    }
    else if (blob.mozSlice) {
        return blob.mozSlice(start, end);
    }
    else if (blob.slice) {
        return blob.slice(start, end);
    }
    return null;
}

/**
 * @license
 * Copyright 2021 Google LLC
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
/** Converts a Base64 encoded string to a binary string. */
function decodeBase64(encoded) {
    return atob(encoded);
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 * An enumeration of the possible string formats for upload.
 * @public
 */
const StringFormat = {
    /**
     * Indicates the string should be interpreted "raw", that is, as normal text.
     * The string will be interpreted as UTF-16, then uploaded as a UTF-8 byte
     * sequence.
     * Example: The string 'Hello! \\ud83d\\ude0a' becomes the byte sequence
     * 48 65 6c 6c 6f 21 20 f0 9f 98 8a
     */
    RAW: 'raw',
    /**
     * Indicates the string should be interpreted as base64-encoded data.
     * Padding characters (trailing '='s) are optional.
     * Example: The string 'rWmO++E6t7/rlw==' becomes the byte sequence
     * ad 69 8e fb e1 3a b7 bf eb 97
     */
    BASE64: 'base64',
    /**
     * Indicates the string should be interpreted as base64url-encoded data.
     * Padding characters (trailing '='s) are optional.
     * Example: The string 'rWmO--E6t7_rlw==' becomes the byte sequence
     * ad 69 8e fb e1 3a b7 bf eb 97
     */
    BASE64URL: 'base64url',
    /**
     * Indicates the string is a data URL, such as one obtained from
     * canvas.toDataURL().
     * Example: the string 'data:application/octet-stream;base64,aaaa'
     * becomes the byte sequence
     * 69 a6 9a
     * (the content-type "application/octet-stream" is also applied, but can
     * be overridden in the metadata object).
     */
    DATA_URL: 'data_url'
};
class StringData {
    constructor(data, contentType) {
        this.data = data;
        this.contentType = contentType || null;
    }
}
/**
 * @internal
 */
function dataFromString(format, stringData) {
    switch (format) {
        case StringFormat.RAW:
            return new StringData(utf8Bytes_(stringData));
        case StringFormat.BASE64:
        case StringFormat.BASE64URL:
            return new StringData(base64Bytes_(format, stringData));
        case StringFormat.DATA_URL:
            return new StringData(dataURLBytes_(stringData), dataURLContentType_(stringData));
        // do nothing
    }
    // assert(false);
    throw unknown();
}
function utf8Bytes_(value) {
    const b = [];
    for (let i = 0; i < value.length; i++) {
        let c = value.charCodeAt(i);
        if (c <= 127) {
            b.push(c);
        }
        else {
            if (c <= 2047) {
                b.push(192 | (c >> 6), 128 | (c & 63));
            }
            else {
                if ((c & 64512) === 55296) {
                    // The start of a surrogate pair.
                    const valid = i < value.length - 1 && (value.charCodeAt(i + 1) & 64512) === 56320;
                    if (!valid) {
                        // The second surrogate wasn't there.
                        b.push(239, 191, 189);
                    }
                    else {
                        const hi = c;
                        const lo = value.charCodeAt(++i);
                        c = 65536 | ((hi & 1023) << 10) | (lo & 1023);
                        b.push(240 | (c >> 18), 128 | ((c >> 12) & 63), 128 | ((c >> 6) & 63), 128 | (c & 63));
                    }
                }
                else {
                    if ((c & 64512) === 56320) {
                        // Invalid low surrogate.
                        b.push(239, 191, 189);
                    }
                    else {
                        b.push(224 | (c >> 12), 128 | ((c >> 6) & 63), 128 | (c & 63));
                    }
                }
            }
        }
    }
    return new Uint8Array(b);
}
function percentEncodedBytes_(value) {
    let decoded;
    try {
        decoded = decodeURIComponent(value);
    }
    catch (e) {
        throw invalidFormat(StringFormat.DATA_URL, 'Malformed data URL.');
    }
    return utf8Bytes_(decoded);
}
function base64Bytes_(format, value) {
    switch (format) {
        case StringFormat.BASE64: {
            const hasMinus = value.indexOf('-') !== -1;
            const hasUnder = value.indexOf('_') !== -1;
            if (hasMinus || hasUnder) {
                const invalidChar = hasMinus ? '-' : '_';
                throw invalidFormat(format, "Invalid character '" +
                    invalidChar +
                    "' found: is it base64url encoded?");
            }
            break;
        }
        case StringFormat.BASE64URL: {
            const hasPlus = value.indexOf('+') !== -1;
            const hasSlash = value.indexOf('/') !== -1;
            if (hasPlus || hasSlash) {
                const invalidChar = hasPlus ? '+' : '/';
                throw invalidFormat(format, "Invalid character '" + invalidChar + "' found: is it base64 encoded?");
            }
            value = value.replace(/-/g, '+').replace(/_/g, '/');
            break;
        }
        // do nothing
    }
    let bytes;
    try {
        bytes = decodeBase64(value);
    }
    catch (e) {
        throw invalidFormat(format, 'Invalid character found');
    }
    const array = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
        array[i] = bytes.charCodeAt(i);
    }
    return array;
}
class DataURLParts {
    constructor(dataURL) {
        this.base64 = false;
        this.contentType = null;
        const matches = dataURL.match(/^data:([^,]+)?,/);
        if (matches === null) {
            throw invalidFormat(StringFormat.DATA_URL, "Must be formatted 'data:[<mediatype>][;base64],<data>");
        }
        const middle = matches[1] || null;
        if (middle != null) {
            this.base64 = endsWith(middle, ';base64');
            this.contentType = this.base64
                ? middle.substring(0, middle.length - ';base64'.length)
                : middle;
        }
        this.rest = dataURL.substring(dataURL.indexOf(',') + 1);
    }
}
function dataURLBytes_(dataUrl) {
    const parts = new DataURLParts(dataUrl);
    if (parts.base64) {
        return base64Bytes_(StringFormat.BASE64, parts.rest);
    }
    else {
        return percentEncodedBytes_(parts.rest);
    }
}
function dataURLContentType_(dataUrl) {
    const parts = new DataURLParts(dataUrl);
    return parts.contentType;
}
function endsWith(s, end) {
    const longEnough = s.length >= end.length;
    if (!longEnough) {
        return false;
    }
    return s.substring(s.length - end.length) === end;
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 * @param opt_elideCopy - If true, doesn't copy mutable input data
 *     (e.g. Uint8Arrays). Pass true only if you know the objects will not be
 *     modified after this blob's construction.
 *
 * @internal
 */
class FbsBlob {
    constructor(data, elideCopy) {
        let size = 0;
        let blobType = '';
        if (isNativeBlob(data)) {
            this.data_ = data;
            size = data.size;
            blobType = data.type;
        }
        else if (data instanceof ArrayBuffer) {
            if (elideCopy) {
                this.data_ = new Uint8Array(data);
            }
            else {
                this.data_ = new Uint8Array(data.byteLength);
                this.data_.set(new Uint8Array(data));
            }
            size = this.data_.length;
        }
        else if (data instanceof Uint8Array) {
            if (elideCopy) {
                this.data_ = data;
            }
            else {
                this.data_ = new Uint8Array(data.length);
                this.data_.set(data);
            }
            size = data.length;
        }
        this.size_ = size;
        this.type_ = blobType;
    }
    size() {
        return this.size_;
    }
    type() {
        return this.type_;
    }
    slice(startByte, endByte) {
        if (isNativeBlob(this.data_)) {
            const realBlob = this.data_;
            const sliced = sliceBlob(realBlob, startByte, endByte);
            if (sliced === null) {
                return null;
            }
            return new FbsBlob(sliced);
        }
        else {
            const slice = new Uint8Array(this.data_.buffer, startByte, endByte - startByte);
            return new FbsBlob(slice, true);
        }
    }
    static getBlob(...args) {
        if (isNativeBlobDefined()) {
            const blobby = args.map((val) => {
                if (val instanceof FbsBlob) {
                    return val.data_;
                }
                else {
                    return val;
                }
            });
            return new FbsBlob(getBlob$1.apply(null, blobby));
        }
        else {
            const uint8Arrays = args.map((val) => {
                if (isString(val)) {
                    return dataFromString(StringFormat.RAW, val).data;
                }
                else {
                    // Blobs don't exist, so this has to be a Uint8Array.
                    return val.data_;
                }
            });
            let finalLength = 0;
            uint8Arrays.forEach((array) => {
                finalLength += array.byteLength;
            });
            const merged = new Uint8Array(finalLength);
            let index = 0;
            uint8Arrays.forEach((array) => {
                for (let i = 0; i < array.length; i++) {
                    merged[index++] = array[i];
                }
            });
            return new FbsBlob(merged, true);
        }
    }
    uploadData() {
        return this.data_;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 * Returns the Object resulting from parsing the given JSON, or null if the
 * given string does not represent a JSON object.
 */
function jsonObjectOrNull(s) {
    let obj;
    try {
        obj = JSON.parse(s);
    }
    catch (e) {
        return null;
    }
    if (isNonArrayObject(obj)) {
        return obj;
    }
    else {
        return null;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 * @fileoverview Contains helper methods for manipulating paths.
 */
/**
 * @return Null if the path is already at the root.
 */
function parent(path) {
    if (path.length === 0) {
        return null;
    }
    const index = path.lastIndexOf('/');
    if (index === -1) {
        return '';
    }
    const newPath = path.slice(0, index);
    return newPath;
}
function child(path, childPath) {
    const canonicalChildPath = childPath
        .split('/')
        .filter(component => component.length > 0)
        .join('/');
    if (path.length === 0) {
        return canonicalChildPath;
    }
    else {
        return path + '/' + canonicalChildPath;
    }
}
/**
 * Returns the last component of a path.
 * '/foo/bar' -> 'bar'
 * '/foo/bar/baz/' -> 'baz/'
 * '/a' -> 'a'
 */
function lastComponent(path) {
    const index = path.lastIndexOf('/', path.length - 2);
    if (index === -1) {
        return path;
    }
    else {
        return path.slice(index + 1);
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
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
function noXform_(metadata, value) {
    return value;
}
class Mapping {
    constructor(server, local, writable, xform) {
        this.server = server;
        this.local = local || server;
        this.writable = !!writable;
        this.xform = xform || noXform_;
    }
}
let mappings_ = null;
function xformPath(fullPath) {
    if (!isString(fullPath) || fullPath.length < 2) {
        return fullPath;
    }
    else {
        return lastComponent(fullPath);
    }
}
function getMappings() {
    if (mappings_) {
        return mappings_;
    }
    const mappings = [];
    mappings.push(new Mapping('bucket'));
    mappings.push(new Mapping('generation'));
    mappings.push(new Mapping('metageneration'));
    mappings.push(new Mapping('name', 'fullPath', true));
    function mappingsXformPath(_metadata, fullPath) {
        return xformPath(fullPath);
    }
    const nameMapping = new Mapping('name');
    nameMapping.xform = mappingsXformPath;
    mappings.push(nameMapping);
    /**
     * Coerces the second param to a number, if it is defined.
     */
    function xformSize(_metadata, size) {
        if (size !== undefined) {
            return Number(size);
        }
        else {
            return size;
        }
    }
    const sizeMapping = new Mapping('size');
    sizeMapping.xform = xformSize;
    mappings.push(sizeMapping);
    mappings.push(new Mapping('timeCreated'));
    mappings.push(new Mapping('updated'));
    mappings.push(new Mapping('md5Hash', null, true));
    mappings.push(new Mapping('cacheControl', null, true));
    mappings.push(new Mapping('contentDisposition', null, true));
    mappings.push(new Mapping('contentEncoding', null, true));
    mappings.push(new Mapping('contentLanguage', null, true));
    mappings.push(new Mapping('contentType', null, true));
    mappings.push(new Mapping('metadata', 'customMetadata', true));
    mappings_ = mappings;
    return mappings_;
}
function addRef(metadata, service) {
    function generateRef() {
        const bucket = metadata['bucket'];
        const path = metadata['fullPath'];
        const loc = new Location(bucket, path);
        return service._makeStorageReference(loc);
    }
    Object.defineProperty(metadata, 'ref', { get: generateRef });
}
function fromResource(service, resource, mappings) {
    const metadata = {};
    metadata['type'] = 'file';
    const len = mappings.length;
    for (let i = 0; i < len; i++) {
        const mapping = mappings[i];
        metadata[mapping.local] = mapping.xform(metadata, resource[mapping.server]);
    }
    addRef(metadata, service);
    return metadata;
}
function fromResourceString(service, resourceString, mappings) {
    const obj = jsonObjectOrNull(resourceString);
    if (obj === null) {
        return null;
    }
    const resource = obj;
    return fromResource(service, resource, mappings);
}
function downloadUrlFromResourceString(metadata, resourceString, host, protocol) {
    const obj = jsonObjectOrNull(resourceString);
    if (obj === null) {
        return null;
    }
    if (!isString(obj['downloadTokens'])) {
        // This can happen if objects are uploaded through GCS and retrieved
        // through list, so we don't want to throw an Error.
        return null;
    }
    const tokens = obj['downloadTokens'];
    if (tokens.length === 0) {
        return null;
    }
    const encode = encodeURIComponent;
    const tokensList = tokens.split(',');
    const urls = tokensList.map((token) => {
        const bucket = metadata['bucket'];
        const path = metadata['fullPath'];
        const urlPart = '/b/' + encode(bucket) + '/o/' + encode(path);
        const base = makeUrl(urlPart, host, protocol);
        const queryString = makeQueryString({
            alt: 'media',
            token
        });
        return base + queryString;
    });
    return urls[0];
}
function toResourceString(metadata, mappings) {
    const resource = {};
    const len = mappings.length;
    for (let i = 0; i < len; i++) {
        const mapping = mappings[i];
        if (mapping.writable) {
            resource[mapping.server] = metadata[mapping.local];
        }
    }
    return JSON.stringify(resource);
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
const PREFIXES_KEY = 'prefixes';
const ITEMS_KEY = 'items';
function fromBackendResponse(service, bucket, resource) {
    const listResult = {
        prefixes: [],
        items: [],
        nextPageToken: resource['nextPageToken']
    };
    if (resource[PREFIXES_KEY]) {
        for (const path of resource[PREFIXES_KEY]) {
            const pathWithoutTrailingSlash = path.replace(/\/$/, '');
            const reference = service._makeStorageReference(new Location(bucket, pathWithoutTrailingSlash));
            listResult.prefixes.push(reference);
        }
    }
    if (resource[ITEMS_KEY]) {
        for (const item of resource[ITEMS_KEY]) {
            const reference = service._makeStorageReference(new Location(bucket, item['name']));
            listResult.items.push(reference);
        }
    }
    return listResult;
}
function fromResponseString(service, bucket, resourceString) {
    const obj = jsonObjectOrNull(resourceString);
    if (obj === null) {
        return null;
    }
    const resource = obj;
    return fromBackendResponse(service, bucket, resource);
}

/**
 * Contains a fully specified request.
 *
 * @param I - the type of the backend's network response.
 * @param O - the output response type used by the rest of the SDK.
 */
class RequestInfo {
    constructor(url, method, 
    /**
     * Returns the value with which to resolve the request's promise. Only called
     * if the request is successful. Throw from this function to reject the
     * returned Request's promise with the thrown error.
     * Note: The XhrIo passed to this function may be reused after this callback
     * returns. Do not keep a reference to it in any way.
     */
    handler, timeout) {
        this.url = url;
        this.method = method;
        this.handler = handler;
        this.timeout = timeout;
        this.urlParams = {};
        this.headers = {};
        this.body = null;
        this.errorHandler = null;
        /**
         * Called with the current number of bytes uploaded and total size (-1 if not
         * computable) of the request body (i.e. used to report upload progress).
         */
        this.progressCallback = null;
        this.successCodes = [200];
        this.additionalRetryCodes = [];
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 * Throws the UNKNOWN StorageError if cndn is false.
 */
function handlerCheck(cndn) {
    if (!cndn) {
        throw unknown();
    }
}
function metadataHandler(service, mappings) {
    function handler(xhr, text) {
        const metadata = fromResourceString(service, text, mappings);
        handlerCheck(metadata !== null);
        return metadata;
    }
    return handler;
}
function listHandler(service, bucket) {
    function handler(xhr, text) {
        const listResult = fromResponseString(service, bucket, text);
        handlerCheck(listResult !== null);
        return listResult;
    }
    return handler;
}
function downloadUrlHandler(service, mappings) {
    function handler(xhr, text) {
        const metadata = fromResourceString(service, text, mappings);
        handlerCheck(metadata !== null);
        return downloadUrlFromResourceString(metadata, text, service.host, service._protocol);
    }
    return handler;
}
function sharedErrorHandler(location) {
    function errorHandler(xhr, err) {
        let newErr;
        if (xhr.getStatus() === 401) {
            if (
            // This exact message string is the only consistent part of the
            // server's error response that identifies it as an App Check error.
            xhr.getErrorText().includes('Firebase App Check token is invalid')) {
                newErr = unauthorizedApp();
            }
            else {
                newErr = unauthenticated();
            }
        }
        else {
            if (xhr.getStatus() === 402) {
                newErr = quotaExceeded(location.bucket);
            }
            else {
                if (xhr.getStatus() === 403) {
                    newErr = unauthorized(location.path);
                }
                else {
                    newErr = err;
                }
            }
        }
        newErr.serverResponse = err.serverResponse;
        return newErr;
    }
    return errorHandler;
}
function objectErrorHandler(location) {
    const shared = sharedErrorHandler(location);
    function errorHandler(xhr, err) {
        let newErr = shared(xhr, err);
        if (xhr.getStatus() === 404) {
            newErr = objectNotFound(location.path);
        }
        newErr.serverResponse = err.serverResponse;
        return newErr;
    }
    return errorHandler;
}
function getMetadata$2(service, location, mappings) {
    const urlPart = location.fullServerUrl();
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'GET';
    const timeout = service.maxOperationRetryTime;
    const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function list$2(service, location, delimiter, pageToken, maxResults) {
    const urlParams = {};
    if (location.isRoot) {
        urlParams['prefix'] = '';
    }
    else {
        urlParams['prefix'] = location.path + '/';
    }
    if (delimiter && delimiter.length > 0) {
        urlParams['delimiter'] = delimiter;
    }
    if (pageToken) {
        urlParams['pageToken'] = pageToken;
    }
    if (maxResults) {
        urlParams['maxResults'] = maxResults;
    }
    const urlPart = location.bucketOnlyServerUrl();
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'GET';
    const timeout = service.maxOperationRetryTime;
    const requestInfo = new RequestInfo(url, method, listHandler(service, location.bucket), timeout);
    requestInfo.urlParams = urlParams;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
function getBytes$1(service, location, maxDownloadSizeBytes) {
    const urlPart = location.fullServerUrl();
    const url = makeUrl(urlPart, service.host, service._protocol) + '?alt=media';
    const method = 'GET';
    const timeout = service.maxOperationRetryTime;
    const requestInfo = new RequestInfo(url, method, (_, data) => data, timeout);
    requestInfo.errorHandler = objectErrorHandler(location);
    if (maxDownloadSizeBytes !== undefined) {
        requestInfo.headers['Range'] = `bytes=0-${maxDownloadSizeBytes}`;
        requestInfo.successCodes = [200 /* OK */, 206 /* Partial Content */];
    }
    return requestInfo;
}
function getDownloadUrl(service, location, mappings) {
    const urlPart = location.fullServerUrl();
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'GET';
    const timeout = service.maxOperationRetryTime;
    const requestInfo = new RequestInfo(url, method, downloadUrlHandler(service, mappings), timeout);
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function updateMetadata$2(service, location, metadata, mappings) {
    const urlPart = location.fullServerUrl();
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'PATCH';
    const body = toResourceString(metadata, mappings);
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    const timeout = service.maxOperationRetryTime;
    const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
    requestInfo.headers = headers;
    requestInfo.body = body;
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function deleteObject$2(service, location) {
    const urlPart = location.fullServerUrl();
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'DELETE';
    const timeout = service.maxOperationRetryTime;
    function handler(_xhr, _text) { }
    const requestInfo = new RequestInfo(url, method, handler, timeout);
    requestInfo.successCodes = [200, 204];
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function determineContentType_(metadata, blob) {
    return ((metadata && metadata['contentType']) ||
        (blob && blob.type()) ||
        'application/octet-stream');
}
function metadataForUpload_(location, blob, metadata) {
    const metadataClone = Object.assign({}, metadata);
    metadataClone['fullPath'] = location.path;
    metadataClone['size'] = blob.size();
    if (!metadataClone['contentType']) {
        metadataClone['contentType'] = determineContentType_(null, blob);
    }
    return metadataClone;
}
/**
 * Prepare RequestInfo for uploads as Content-Type: multipart.
 */
function multipartUpload(service, location, mappings, blob, metadata) {
    const urlPart = location.bucketOnlyServerUrl();
    const headers = {
        'X-Goog-Upload-Protocol': 'multipart'
    };
    function genBoundary() {
        let str = '';
        for (let i = 0; i < 2; i++) {
            str = str + Math.random().toString().slice(2);
        }
        return str;
    }
    const boundary = genBoundary();
    headers['Content-Type'] = 'multipart/related; boundary=' + boundary;
    const metadata_ = metadataForUpload_(location, blob, metadata);
    const metadataString = toResourceString(metadata_, mappings);
    const preBlobPart = '--' +
        boundary +
        '\r\n' +
        'Content-Type: application/json; charset=utf-8\r\n\r\n' +
        metadataString +
        '\r\n--' +
        boundary +
        '\r\n' +
        'Content-Type: ' +
        metadata_['contentType'] +
        '\r\n\r\n';
    const postBlobPart = '\r\n--' + boundary + '--';
    const body = FbsBlob.getBlob(preBlobPart, blob, postBlobPart);
    if (body === null) {
        throw cannotSliceBlob();
    }
    const urlParams = { name: metadata_['fullPath'] };
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'POST';
    const timeout = service.maxUploadRetryTime;
    const requestInfo = new RequestInfo(url, method, metadataHandler(service, mappings), timeout);
    requestInfo.urlParams = urlParams;
    requestInfo.headers = headers;
    requestInfo.body = body.uploadData();
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * @param current The number of bytes that have been uploaded so far.
 * @param total The total number of bytes in the upload.
 * @param opt_finalized True if the server has finished the upload.
 * @param opt_metadata The upload metadata, should
 *     only be passed if opt_finalized is true.
 */
class ResumableUploadStatus {
    constructor(current, total, finalized, metadata) {
        this.current = current;
        this.total = total;
        this.finalized = !!finalized;
        this.metadata = metadata || null;
    }
}
function checkResumeHeader_(xhr, allowed) {
    let status = null;
    try {
        status = xhr.getResponseHeader('X-Goog-Upload-Status');
    }
    catch (e) {
        handlerCheck(false);
    }
    const allowedStatus = allowed || ['active'];
    handlerCheck(!!status && allowedStatus.indexOf(status) !== -1);
    return status;
}
function createResumableUpload(service, location, mappings, blob, metadata) {
    const urlPart = location.bucketOnlyServerUrl();
    const metadataForUpload = metadataForUpload_(location, blob, metadata);
    const urlParams = { name: metadataForUpload['fullPath'] };
    const url = makeUrl(urlPart, service.host, service._protocol);
    const method = 'POST';
    const headers = {
        'X-Goog-Upload-Protocol': 'resumable',
        'X-Goog-Upload-Command': 'start',
        'X-Goog-Upload-Header-Content-Length': `${blob.size()}`,
        'X-Goog-Upload-Header-Content-Type': metadataForUpload['contentType'],
        'Content-Type': 'application/json; charset=utf-8'
    };
    const body = toResourceString(metadataForUpload, mappings);
    const timeout = service.maxUploadRetryTime;
    function handler(xhr) {
        checkResumeHeader_(xhr);
        let url;
        try {
            url = xhr.getResponseHeader('X-Goog-Upload-URL');
        }
        catch (e) {
            handlerCheck(false);
        }
        handlerCheck(isString(url));
        return url;
    }
    const requestInfo = new RequestInfo(url, method, handler, timeout);
    requestInfo.urlParams = urlParams;
    requestInfo.headers = headers;
    requestInfo.body = body;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 */
function getResumableUploadStatus(service, location, url, blob) {
    const headers = { 'X-Goog-Upload-Command': 'query' };
    function handler(xhr) {
        const status = checkResumeHeader_(xhr, ['active', 'final']);
        let sizeString = null;
        try {
            sizeString = xhr.getResponseHeader('X-Goog-Upload-Size-Received');
        }
        catch (e) {
            handlerCheck(false);
        }
        if (!sizeString) {
            // null or empty string
            handlerCheck(false);
        }
        const size = Number(sizeString);
        handlerCheck(!isNaN(size));
        return new ResumableUploadStatus(size, blob.size(), status === 'final');
    }
    const method = 'POST';
    const timeout = service.maxUploadRetryTime;
    const requestInfo = new RequestInfo(url, method, handler, timeout);
    requestInfo.headers = headers;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * Any uploads via the resumable upload API must transfer a number of bytes
 * that is a multiple of this number.
 */
const RESUMABLE_UPLOAD_CHUNK_SIZE = 256 * 1024;
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 * @param chunkSize Number of bytes to upload.
 * @param status The previous status.
 *     If not passed or null, we start from the beginning.
 * @throws fbs.Error If the upload is already complete, the passed in status
 *     has a final size inconsistent with the blob, or the blob cannot be sliced
 *     for upload.
 */
function continueResumableUpload(location, service, url, blob, chunkSize, mappings, status, progressCallback) {
    // TODO(andysoto): standardize on internal asserts
    // assert(!(opt_status && opt_status.finalized));
    const status_ = new ResumableUploadStatus(0, 0);
    if (status) {
        status_.current = status.current;
        status_.total = status.total;
    }
    else {
        status_.current = 0;
        status_.total = blob.size();
    }
    if (blob.size() !== status_.total) {
        throw serverFileWrongSize();
    }
    const bytesLeft = status_.total - status_.current;
    let bytesToUpload = bytesLeft;
    if (chunkSize > 0) {
        bytesToUpload = Math.min(bytesToUpload, chunkSize);
    }
    const startByte = status_.current;
    const endByte = startByte + bytesToUpload;
    const uploadCommand = bytesToUpload === bytesLeft ? 'upload, finalize' : 'upload';
    const headers = {
        'X-Goog-Upload-Command': uploadCommand,
        'X-Goog-Upload-Offset': `${status_.current}`
    };
    const body = blob.slice(startByte, endByte);
    if (body === null) {
        throw cannotSliceBlob();
    }
    function handler(xhr, text) {
        // TODO(andysoto): Verify the MD5 of each uploaded range:
        // the 'x-range-md5' header comes back with status code 308 responses.
        // We'll only be able to bail out though, because you can't re-upload a
        // range that you previously uploaded.
        const uploadStatus = checkResumeHeader_(xhr, ['active', 'final']);
        const newCurrent = status_.current + bytesToUpload;
        const size = blob.size();
        let metadata;
        if (uploadStatus === 'final') {
            metadata = metadataHandler(service, mappings)(xhr, text);
        }
        else {
            metadata = null;
        }
        return new ResumableUploadStatus(newCurrent, size, uploadStatus === 'final', metadata);
    }
    const method = 'POST';
    const timeout = service.maxUploadRetryTime;
    const requestInfo = new RequestInfo(url, method, handler, timeout);
    requestInfo.headers = headers;
    requestInfo.body = body.uploadData();
    requestInfo.progressCallback = progressCallback || null;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 * An event that is triggered on a task.
 * @internal
 */
const TaskEvent = {
    /**
     * For this event,
     * <ul>
     *   <li>The `next` function is triggered on progress updates and when the
     *       task is paused/resumed with an `UploadTaskSnapshot` as the first
     *       argument.</li>
     *   <li>The `error` function is triggered if the upload is canceled or fails
     *       for another reason.</li>
     *   <li>The `complete` function is triggered if the upload completes
     *       successfully.</li>
     * </ul>
     */
    STATE_CHANGED: 'state_changed'
};
// type keys = keyof TaskState
/**
 * Represents the current state of a running upload.
 * @internal
 */
const TaskState = {
    /** The task is currently transferring data. */
    RUNNING: 'running',
    /** The task was paused by the user. */
    PAUSED: 'paused',
    /** The task completed successfully. */
    SUCCESS: 'success',
    /** The task was canceled. */
    CANCELED: 'canceled',
    /** The task failed with an error. */
    ERROR: 'error'
};
function taskStateFromInternalTaskState(state) {
    switch (state) {
        case "running" /* RUNNING */:
        case "pausing" /* PAUSING */:
        case "canceling" /* CANCELING */:
            return TaskState.RUNNING;
        case "paused" /* PAUSED */:
            return TaskState.PAUSED;
        case "success" /* SUCCESS */:
            return TaskState.SUCCESS;
        case "canceled" /* CANCELED */:
            return TaskState.CANCELED;
        case "error" /* ERROR */:
            return TaskState.ERROR;
        default:
            // TODO(andysoto): assert(false);
            return TaskState.ERROR;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
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
class Observer {
    constructor(nextOrObserver, error, complete) {
        const asFunctions = isFunction(nextOrObserver) || error != null || complete != null;
        if (asFunctions) {
            this.next = nextOrObserver;
            this.error = error !== null && error !== void 0 ? error : undefined;
            this.complete = complete !== null && complete !== void 0 ? complete : undefined;
        }
        else {
            const observer = nextOrObserver;
            this.next = observer.next;
            this.error = observer.error;
            this.complete = observer.complete;
        }
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 * Returns a function that invokes f with its arguments asynchronously as a
 * microtask, i.e. as soon as possible after the current script returns back
 * into browser code.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function async(f) {
    return (...argsToForward) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Promise.resolve().then(() => f(...argsToForward));
    };
}

/**
 * @license
 * Copyright 2017 Google LLC
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
/** An override for the text-based Connection. Used in tests. */
let textFactoryOverride = null;
/**
 * Network layer for browsers. We use this instead of goog.net.XhrIo because
 * goog.net.XhrIo is hyuuuuge and doesn't work in React Native on Android.
 */
class XhrConnection {
    constructor() {
        this.sent_ = false;
        this.xhr_ = new XMLHttpRequest();
        this.initXhr();
        this.errorCode_ = ErrorCode.NO_ERROR;
        this.sendPromise_ = new Promise(resolve => {
            this.xhr_.addEventListener('abort', () => {
                this.errorCode_ = ErrorCode.ABORT;
                resolve();
            });
            this.xhr_.addEventListener('error', () => {
                this.errorCode_ = ErrorCode.NETWORK_ERROR;
                resolve();
            });
            this.xhr_.addEventListener('load', () => {
                resolve();
            });
        });
    }
    send(url, method, body, headers) {
        if (this.sent_) {
            throw internalError('cannot .send() more than once');
        }
        this.sent_ = true;
        this.xhr_.open(method, url, true);
        if (headers !== undefined) {
            for (const key in headers) {
                if (headers.hasOwnProperty(key)) {
                    this.xhr_.setRequestHeader(key, headers[key].toString());
                }
            }
        }
        if (body !== undefined) {
            this.xhr_.send(body);
        }
        else {
            this.xhr_.send();
        }
        return this.sendPromise_;
    }
    getErrorCode() {
        if (!this.sent_) {
            throw internalError('cannot .getErrorCode() before sending');
        }
        return this.errorCode_;
    }
    getStatus() {
        if (!this.sent_) {
            throw internalError('cannot .getStatus() before sending');
        }
        try {
            return this.xhr_.status;
        }
        catch (e) {
            return -1;
        }
    }
    getResponse() {
        if (!this.sent_) {
            throw internalError('cannot .getResponse() before sending');
        }
        return this.xhr_.response;
    }
    getErrorText() {
        if (!this.sent_) {
            throw internalError('cannot .getErrorText() before sending');
        }
        return this.xhr_.statusText;
    }
    /** Aborts the request. */
    abort() {
        this.xhr_.abort();
    }
    getResponseHeader(header) {
        return this.xhr_.getResponseHeader(header);
    }
    addUploadProgressListener(listener) {
        if (this.xhr_.upload != null) {
            this.xhr_.upload.addEventListener('progress', listener);
        }
    }
    removeUploadProgressListener(listener) {
        if (this.xhr_.upload != null) {
            this.xhr_.upload.removeEventListener('progress', listener);
        }
    }
}
class XhrTextConnection extends XhrConnection {
    initXhr() {
        this.xhr_.responseType = 'text';
    }
}
function newTextConnection() {
    return textFactoryOverride ? textFactoryOverride() : new XhrTextConnection();
}
class XhrBytesConnection extends XhrConnection {
    initXhr() {
        this.xhr_.responseType = 'arraybuffer';
    }
}
function newBytesConnection() {
    return new XhrBytesConnection();
}
class XhrBlobConnection extends XhrConnection {
    initXhr() {
        this.xhr_.responseType = 'blob';
    }
}
function newBlobConnection() {
    return new XhrBlobConnection();
}

/**
 * @license
 * Copyright 2017 Google LLC
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
 * Represents a blob being uploaded. Can be used to pause/resume/cancel the
 * upload and manage callbacks for various events.
 * @internal
 */
class UploadTask {
    /**
     * @param ref - The firebaseStorage.Reference object this task came
     *     from, untyped to avoid cyclic dependencies.
     * @param blob - The blob to upload.
     */
    constructor(ref, blob, metadata = null) {
        /**
         * Number of bytes transferred so far.
         */
        this._transferred = 0;
        this._needToFetchStatus = false;
        this._needToFetchMetadata = false;
        this._observers = [];
        this._error = undefined;
        this._uploadUrl = undefined;
        this._request = undefined;
        this._chunkMultiplier = 1;
        this._resolve = undefined;
        this._reject = undefined;
        this._ref = ref;
        this._blob = blob;
        this._metadata = metadata;
        this._mappings = getMappings();
        this._resumable = this._shouldDoResumable(this._blob);
        this._state = "running" /* RUNNING */;
        this._errorHandler = error => {
            this._request = undefined;
            this._chunkMultiplier = 1;
            if (error._codeEquals("canceled" /* CANCELED */)) {
                this._needToFetchStatus = true;
                this.completeTransitions_();
            }
            else {
                this._error = error;
                this._transition("error" /* ERROR */);
            }
        };
        this._metadataErrorHandler = error => {
            this._request = undefined;
            if (error._codeEquals("canceled" /* CANCELED */)) {
                this.completeTransitions_();
            }
            else {
                this._error = error;
                this._transition("error" /* ERROR */);
            }
        };
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
            this._start();
        });
        // Prevent uncaught rejections on the internal promise from bubbling out
        // to the top level with a dummy handler.
        this._promise.then(null, () => { });
    }
    _makeProgressCallback() {
        const sizeBefore = this._transferred;
        return loaded => this._updateProgress(sizeBefore + loaded);
    }
    _shouldDoResumable(blob) {
        return blob.size() > 256 * 1024;
    }
    _start() {
        if (this._state !== "running" /* RUNNING */) {
            // This can happen if someone pauses us in a resume callback, for example.
            return;
        }
        if (this._request !== undefined) {
            return;
        }
        if (this._resumable) {
            if (this._uploadUrl === undefined) {
                this._createResumable();
            }
            else {
                if (this._needToFetchStatus) {
                    this._fetchStatus();
                }
                else {
                    if (this._needToFetchMetadata) {
                        // Happens if we miss the metadata on upload completion.
                        this._fetchMetadata();
                    }
                    else {
                        this._continueUpload();
                    }
                }
            }
        }
        else {
            this._oneShotUpload();
        }
    }
    _resolveToken(callback) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Promise.all([
            this._ref.storage._getAuthToken(),
            this._ref.storage._getAppCheckToken()
        ]).then(([authToken, appCheckToken]) => {
            switch (this._state) {
                case "running" /* RUNNING */:
                    callback(authToken, appCheckToken);
                    break;
                case "canceling" /* CANCELING */:
                    this._transition("canceled" /* CANCELED */);
                    break;
                case "pausing" /* PAUSING */:
                    this._transition("paused" /* PAUSED */);
                    break;
            }
        });
    }
    // TODO(andysoto): assert false
    _createResumable() {
        this._resolveToken((authToken, appCheckToken) => {
            const requestInfo = createResumableUpload(this._ref.storage, this._ref._location, this._mappings, this._blob, this._metadata);
            const createRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);
            this._request = createRequest;
            createRequest.getPromise().then((url) => {
                this._request = undefined;
                this._uploadUrl = url;
                this._needToFetchStatus = false;
                this.completeTransitions_();
            }, this._errorHandler);
        });
    }
    _fetchStatus() {
        // TODO(andysoto): assert(this.uploadUrl_ !== null);
        const url = this._uploadUrl;
        this._resolveToken((authToken, appCheckToken) => {
            const requestInfo = getResumableUploadStatus(this._ref.storage, this._ref._location, url, this._blob);
            const statusRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);
            this._request = statusRequest;
            statusRequest.getPromise().then(status => {
                status = status;
                this._request = undefined;
                this._updateProgress(status.current);
                this._needToFetchStatus = false;
                if (status.finalized) {
                    this._needToFetchMetadata = true;
                }
                this.completeTransitions_();
            }, this._errorHandler);
        });
    }
    _continueUpload() {
        const chunkSize = RESUMABLE_UPLOAD_CHUNK_SIZE * this._chunkMultiplier;
        const status = new ResumableUploadStatus(this._transferred, this._blob.size());
        // TODO(andysoto): assert(this.uploadUrl_ !== null);
        const url = this._uploadUrl;
        this._resolveToken((authToken, appCheckToken) => {
            let requestInfo;
            try {
                requestInfo = continueResumableUpload(this._ref._location, this._ref.storage, url, this._blob, chunkSize, this._mappings, status, this._makeProgressCallback());
            }
            catch (e) {
                this._error = e;
                this._transition("error" /* ERROR */);
                return;
            }
            const uploadRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);
            this._request = uploadRequest;
            uploadRequest.getPromise().then((newStatus) => {
                this._increaseMultiplier();
                this._request = undefined;
                this._updateProgress(newStatus.current);
                if (newStatus.finalized) {
                    this._metadata = newStatus.metadata;
                    this._transition("success" /* SUCCESS */);
                }
                else {
                    this.completeTransitions_();
                }
            }, this._errorHandler);
        });
    }
    _increaseMultiplier() {
        const currentSize = RESUMABLE_UPLOAD_CHUNK_SIZE * this._chunkMultiplier;
        // Max chunk size is 32M.
        if (currentSize < 32 * 1024 * 1024) {
            this._chunkMultiplier *= 2;
        }
    }
    _fetchMetadata() {
        this._resolveToken((authToken, appCheckToken) => {
            const requestInfo = getMetadata$2(this._ref.storage, this._ref._location, this._mappings);
            const metadataRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);
            this._request = metadataRequest;
            metadataRequest.getPromise().then(metadata => {
                this._request = undefined;
                this._metadata = metadata;
                this._transition("success" /* SUCCESS */);
            }, this._metadataErrorHandler);
        });
    }
    _oneShotUpload() {
        this._resolveToken((authToken, appCheckToken) => {
            const requestInfo = multipartUpload(this._ref.storage, this._ref._location, this._mappings, this._blob, this._metadata);
            const multipartRequest = this._ref.storage._makeRequest(requestInfo, newTextConnection, authToken, appCheckToken);
            this._request = multipartRequest;
            multipartRequest.getPromise().then(metadata => {
                this._request = undefined;
                this._metadata = metadata;
                this._updateProgress(this._blob.size());
                this._transition("success" /* SUCCESS */);
            }, this._errorHandler);
        });
    }
    _updateProgress(transferred) {
        const old = this._transferred;
        this._transferred = transferred;
        // A progress update can make the "transferred" value smaller (e.g. a
        // partial upload not completed by server, after which the "transferred"
        // value may reset to the value at the beginning of the request).
        if (this._transferred !== old) {
            this._notifyObservers();
        }
    }
    _transition(state) {
        if (this._state === state) {
            return;
        }
        switch (state) {
            case "canceling" /* CANCELING */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.RUNNING ||
                //        this.state_ === InternalTaskState.PAUSING);
                this._state = state;
                if (this._request !== undefined) {
                    this._request.cancel();
                }
                break;
            case "pausing" /* PAUSING */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.RUNNING);
                this._state = state;
                if (this._request !== undefined) {
                    this._request.cancel();
                }
                break;
            case "running" /* RUNNING */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.PAUSED ||
                //        this.state_ === InternalTaskState.PAUSING);
                const wasPaused = this._state === "paused" /* PAUSED */;
                this._state = state;
                if (wasPaused) {
                    this._notifyObservers();
                    this._start();
                }
                break;
            case "paused" /* PAUSED */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.PAUSING);
                this._state = state;
                this._notifyObservers();
                break;
            case "canceled" /* CANCELED */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.PAUSED ||
                //        this.state_ === InternalTaskState.CANCELING);
                this._error = canceled();
                this._state = state;
                this._notifyObservers();
                break;
            case "error" /* ERROR */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.RUNNING ||
                //        this.state_ === InternalTaskState.PAUSING ||
                //        this.state_ === InternalTaskState.CANCELING);
                this._state = state;
                this._notifyObservers();
                break;
            case "success" /* SUCCESS */:
                // TODO(andysoto):
                // assert(this.state_ === InternalTaskState.RUNNING ||
                //        this.state_ === InternalTaskState.PAUSING ||
                //        this.state_ === InternalTaskState.CANCELING);
                this._state = state;
                this._notifyObservers();
                break;
        }
    }
    completeTransitions_() {
        switch (this._state) {
            case "pausing" /* PAUSING */:
                this._transition("paused" /* PAUSED */);
                break;
            case "canceling" /* CANCELING */:
                this._transition("canceled" /* CANCELED */);
                break;
            case "running" /* RUNNING */:
                this._start();
                break;
        }
    }
    /**
     * A snapshot of the current task state.
     */
    get snapshot() {
        const externalState = taskStateFromInternalTaskState(this._state);
        return {
            bytesTransferred: this._transferred,
            totalBytes: this._blob.size(),
            state: externalState,
            metadata: this._metadata,
            task: this,
            ref: this._ref
        };
    }
    /**
     * Adds a callback for an event.
     * @param type - The type of event to listen for.
     * @param nextOrObserver -
     *     The `next` function, which gets called for each item in
     *     the event stream, or an observer object with some or all of these three
     *     properties (`next`, `error`, `complete`).
     * @param error - A function that gets called with a `StorageError`
     *     if the event stream ends due to an error.
     * @param completed - A function that gets called if the
     *     event stream ends normally.
     * @returns
     *     If only the event argument is passed, returns a function you can use to
     *     add callbacks (see the examples above). If more than just the event
     *     argument is passed, returns a function you can call to unregister the
     *     callbacks.
     */
    on(type, nextOrObserver, error, completed) {
        const observer = new Observer(nextOrObserver || undefined, error || undefined, completed || undefined);
        this._addObserver(observer);
        return () => {
            this._removeObserver(observer);
        };
    }
    /**
     * This object behaves like a Promise, and resolves with its snapshot data
     * when the upload completes.
     * @param onFulfilled - The fulfillment callback. Promise chaining works as normal.
     * @param onRejected - The rejection callback.
     */
    then(onFulfilled, onRejected) {
        // These casts are needed so that TypeScript can infer the types of the
        // resulting Promise.
        return this._promise.then(onFulfilled, onRejected);
    }
    /**
     * Equivalent to calling `then(null, onRejected)`.
     */
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    /**
     * Adds the given observer.
     */
    _addObserver(observer) {
        this._observers.push(observer);
        this._notifyObserver(observer);
    }
    /**
     * Removes the given observer.
     */
    _removeObserver(observer) {
        const i = this._observers.indexOf(observer);
        if (i !== -1) {
            this._observers.splice(i, 1);
        }
    }
    _notifyObservers() {
        this._finishPromise();
        const observers = this._observers.slice();
        observers.forEach(observer => {
            this._notifyObserver(observer);
        });
    }
    _finishPromise() {
        if (this._resolve !== undefined) {
            let triggered = true;
            switch (taskStateFromInternalTaskState(this._state)) {
                case TaskState.SUCCESS:
                    async(this._resolve.bind(null, this.snapshot))();
                    break;
                case TaskState.CANCELED:
                case TaskState.ERROR:
                    const toCall = this._reject;
                    async(toCall.bind(null, this._error))();
                    break;
                default:
                    triggered = false;
                    break;
            }
            if (triggered) {
                this._resolve = undefined;
                this._reject = undefined;
            }
        }
    }
    _notifyObserver(observer) {
        const externalState = taskStateFromInternalTaskState(this._state);
        switch (externalState) {
            case TaskState.RUNNING:
            case TaskState.PAUSED:
                if (observer.next) {
                    async(observer.next.bind(observer, this.snapshot))();
                }
                break;
            case TaskState.SUCCESS:
                if (observer.complete) {
                    async(observer.complete.bind(observer))();
                }
                break;
            case TaskState.CANCELED:
            case TaskState.ERROR:
                if (observer.error) {
                    async(observer.error.bind(observer, this._error))();
                }
                break;
            default:
                // TODO(andysoto): assert(false);
                if (observer.error) {
                    async(observer.error.bind(observer, this._error))();
                }
        }
    }
    /**
     * Resumes a paused task. Has no effect on a currently running or failed task.
     * @returns True if the operation took effect, false if ignored.
     */
    resume() {
        const valid = this._state === "paused" /* PAUSED */ ||
            this._state === "pausing" /* PAUSING */;
        if (valid) {
            this._transition("running" /* RUNNING */);
        }
        return valid;
    }
    /**
     * Pauses a currently running task. Has no effect on a paused or failed task.
     * @returns True if the operation took effect, false if ignored.
     */
    pause() {
        const valid = this._state === "running" /* RUNNING */;
        if (valid) {
            this._transition("pausing" /* PAUSING */);
        }
        return valid;
    }
    /**
     * Cancels a currently running or paused task. Has no effect on a complete or
     * failed task.
     * @returns True if the operation took effect, false if ignored.
     */
    cancel() {
        const valid = this._state === "running" /* RUNNING */ ||
            this._state === "pausing" /* PAUSING */;
        if (valid) {
            this._transition("canceling" /* CANCELING */);
        }
        return valid;
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
 * Provides methods to interact with a bucket in the Firebase Storage service.
 * @internal
 * @param _location - An fbs.location, or the URL at
 *     which to base this object, in one of the following forms:
 *         gs://<bucket>/<object-path>
 *         http[s]://firebasestorage.googleapis.com/
 *                     <api-version>/b/<bucket>/o/<object-path>
 *     Any query or fragment strings will be ignored in the http[s]
 *     format. If no value is passed, the storage object will use a URL based on
 *     the project ID of the base firebase.App instance.
 */
class Reference {
    constructor(_service, location) {
        this._service = _service;
        if (location instanceof Location) {
            this._location = location;
        }
        else {
            this._location = Location.makeFromUrl(location, _service.host);
        }
    }
    /**
     * Returns the URL for the bucket and path this object references,
     *     in the form gs://<bucket>/<object-path>
     * @override
     */
    toString() {
        return 'gs://' + this._location.bucket + '/' + this._location.path;
    }
    _newRef(service, location) {
        return new Reference(service, location);
    }
    /**
     * A reference to the root of this object's bucket.
     */
    get root() {
        const location = new Location(this._location.bucket, '');
        return this._newRef(this._service, location);
    }
    /**
     * The name of the bucket containing this reference's object.
     */
    get bucket() {
        return this._location.bucket;
    }
    /**
     * The full path of this object.
     */
    get fullPath() {
        return this._location.path;
    }
    /**
     * The short name of this object, which is the last component of the full path.
     * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
     */
    get name() {
        return lastComponent(this._location.path);
    }
    /**
     * The `StorageService` instance this `StorageReference` is associated with.
     */
    get storage() {
        return this._service;
    }
    /**
     * A `StorageReference` pointing to the parent location of this `StorageReference`, or null if
     * this reference is the root.
     */
    get parent() {
        const newPath = parent(this._location.path);
        if (newPath === null) {
            return null;
        }
        const location = new Location(this._location.bucket, newPath);
        return new Reference(this._service, location);
    }
    /**
     * Utility function to throw an error in methods that do not accept a root reference.
     */
    _throwIfRoot(name) {
        if (this._location.path === '') {
            throw invalidRootOperation(name);
        }
    }
}
/**
 * Download the bytes at the object's location.
 * @returns A Promise containing the downloaded bytes.
 */
function getBytesInternal(ref, maxDownloadSizeBytes) {
    ref._throwIfRoot('getBytes');
    const requestInfo = getBytes$1(ref.storage, ref._location, maxDownloadSizeBytes);
    return ref.storage
        .makeRequestWithTokens(requestInfo, newBytesConnection)
        .then(bytes => maxDownloadSizeBytes !== undefined
        ? // GCS may not honor the Range header for small files
            bytes.slice(0, maxDownloadSizeBytes)
        : bytes);
}
/**
 * Download the bytes at the object's location.
 * @returns A Promise containing the downloaded blob.
 */
function getBlobInternal(ref, maxDownloadSizeBytes) {
    ref._throwIfRoot('getBlob');
    const requestInfo = getBytes$1(ref.storage, ref._location, maxDownloadSizeBytes);
    return ref.storage
        .makeRequestWithTokens(requestInfo, newBlobConnection)
        .then(blob => maxDownloadSizeBytes !== undefined
        ? // GCS may not honor the Range header for small files
            blob.slice(0, maxDownloadSizeBytes)
        : blob);
}
/**
 * Uploads data to this object's location.
 * The upload is not resumable.
 *
 * @param ref - StorageReference where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the newly uploaded data.
 * @returns A Promise containing an UploadResult
 */
function uploadBytes$1(ref, data, metadata) {
    ref._throwIfRoot('uploadBytes');
    const requestInfo = multipartUpload(ref.storage, ref._location, getMappings(), new FbsBlob(data, true), metadata);
    return ref.storage
        .makeRequestWithTokens(requestInfo, newTextConnection)
        .then(finalMetadata => {
        return {
            metadata: finalMetadata,
            ref
        };
    });
}
/**
 * Uploads data to this object's location.
 * The upload can be paused and resumed, and exposes progress updates.
 * @public
 * @param ref - StorageReference where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the newly uploaded data.
 * @returns An UploadTask
 */
function uploadBytesResumable$1(ref, data, metadata) {
    ref._throwIfRoot('uploadBytesResumable');
    return new UploadTask(ref, new FbsBlob(data), metadata);
}
/**
 * Uploads a string to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - StorageReference where string should be uploaded.
 * @param value - The string to upload.
 * @param format - The format of the string to upload.
 * @param metadata - Metadata for the newly uploaded string.
 * @returns A Promise containing an UploadResult
 */
function uploadString$1(ref, value, format = StringFormat.RAW, metadata) {
    ref._throwIfRoot('uploadString');
    const data = dataFromString(format, value);
    const metadataClone = Object.assign({}, metadata);
    if (metadataClone['contentType'] == null && data.contentType != null) {
        metadataClone['contentType'] = data.contentType;
    }
    return uploadBytes$1(ref, data.data, metadataClone);
}
/**
 * List all items (files) and prefixes (folders) under this storage reference.
 *
 * This is a helper method for calling list() repeatedly until there are
 * no more results. The default pagination size is 1000.
 *
 * Note: The results may not be consistent if objects are changed while this
 * operation is running.
 *
 * Warning: listAll may potentially consume too many resources if there are
 * too many results.
 * @public
 * @param ref - StorageReference to get list from.
 *
 * @returns A Promise that resolves with all the items and prefixes under
 *      the current storage reference. `prefixes` contains references to
 *      sub-directories and `items` contains references to objects in this
 *      folder. `nextPageToken` is never returned.
 */
function listAll$1(ref) {
    const accumulator = {
        prefixes: [],
        items: []
    };
    return listAllHelper(ref, accumulator).then(() => accumulator);
}
/**
 * Separated from listAll because async functions can't use "arguments".
 * @param ref
 * @param accumulator
 * @param pageToken
 */
async function listAllHelper(ref, accumulator, pageToken) {
    const opt = {
        // maxResults is 1000 by default.
        pageToken
    };
    const nextPage = await list$1(ref, opt);
    accumulator.prefixes.push(...nextPage.prefixes);
    accumulator.items.push(...nextPage.items);
    if (nextPage.nextPageToken != null) {
        await listAllHelper(ref, accumulator, nextPage.nextPageToken);
    }
}
/**
 * List items (files) and prefixes (folders) under this storage reference.
 *
 * List API is only available for Firebase Rules Version 2.
 *
 * GCS is a key-blob store. Firebase Storage imposes the semantic of '/'
 * delimited folder structure.
 * Refer to GCS's List API if you want to learn more.
 *
 * To adhere to Firebase Rules's Semantics, Firebase Storage does not
 * support objects whose paths end with "/" or contain two consecutive
 * "/"s. Firebase Storage List API will filter these unsupported objects.
 * list() may fail if there are too many unsupported objects in the bucket.
 * @public
 *
 * @param ref - StorageReference to get list from.
 * @param options - See ListOptions for details.
 * @returns A Promise that resolves with the items and prefixes.
 *      `prefixes` contains references to sub-folders and `items`
 *      contains references to objects in this folder. `nextPageToken`
 *      can be used to get the rest of the results.
 */
function list$1(ref, options) {
    if (options != null) {
        if (typeof options.maxResults === 'number') {
            validateNumber('options.maxResults', 
            /* minValue= */ 1, 
            /* maxValue= */ 1000, options.maxResults);
        }
    }
    const op = options || {};
    const requestInfo = list$2(ref.storage, ref._location, 
    /*delimiter= */ '/', op.pageToken, op.maxResults);
    return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * A `Promise` that resolves with the metadata for this object. If this
 * object doesn't exist or metadata cannot be retreived, the promise is
 * rejected.
 * @public
 * @param ref - StorageReference to get metadata from.
 */
function getMetadata$1(ref) {
    ref._throwIfRoot('getMetadata');
    const requestInfo = getMetadata$2(ref.storage, ref._location, getMappings());
    return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * Updates the metadata for this object.
 * @public
 * @param ref - StorageReference to update metadata for.
 * @param metadata - The new metadata for the object.
 *     Only values that have been explicitly set will be changed. Explicitly
 *     setting a value to null will remove the metadata.
 * @returns A `Promise` that resolves
 *     with the new metadata for this object.
 *     See `firebaseStorage.Reference.prototype.getMetadata`
 */
function updateMetadata$1(ref, metadata) {
    ref._throwIfRoot('updateMetadata');
    const requestInfo = updateMetadata$2(ref.storage, ref._location, metadata, getMappings());
    return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * Returns the download URL for the given Reference.
 * @public
 * @returns A `Promise` that resolves with the download
 *     URL for this object.
 */
function getDownloadURL$1(ref) {
    ref._throwIfRoot('getDownloadURL');
    const requestInfo = getDownloadUrl(ref.storage, ref._location, getMappings());
    return ref.storage
        .makeRequestWithTokens(requestInfo, newTextConnection)
        .then(url => {
        if (url === null) {
            throw noDownloadURL();
        }
        return url;
    });
}
/**
 * Deletes the object at this location.
 * @public
 * @param ref - StorageReference for object to delete.
 * @returns A `Promise` that resolves if the deletion succeeds.
 */
function deleteObject$1(ref) {
    ref._throwIfRoot('deleteObject');
    const requestInfo = deleteObject$2(ref.storage, ref._location);
    return ref.storage.makeRequestWithTokens(requestInfo, newTextConnection);
}
/**
 * Returns reference for object obtained by appending `childPath` to `ref`.
 *
 * @param ref - StorageReference to get child of.
 * @param childPath - Child path from provided ref.
 * @returns A reference to the object obtained by
 * appending childPath, removing any duplicate, beginning, or trailing
 * slashes.
 *
 */
function _getChild$1(ref, childPath) {
    const newPath = child(ref._location.path, childPath);
    const location = new Location(ref._location.bucket, newPath);
    return new Reference(ref.storage, location);
}

/**
 * @license
 * Copyright 2017 Google LLC
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
function isUrl(path) {
    return /^[A-Za-z]+:\/\//.test(path);
}
/**
 * Returns a firebaseStorage.Reference for the given url.
 */
function refFromURL(service, url) {
    return new Reference(service, url);
}
/**
 * Returns a firebaseStorage.Reference for the given path in the default
 * bucket.
 */
function refFromPath(ref, path) {
    if (ref instanceof FirebaseStorageImpl) {
        const service = ref;
        if (service._bucket == null) {
            throw noDefaultBucket();
        }
        const reference = new Reference(service, service._bucket);
        if (path != null) {
            return refFromPath(reference, path);
        }
        else {
            return reference;
        }
    }
    else {
        // ref is a Reference
        if (path !== undefined) {
            return _getChild$1(ref, path);
        }
        else {
            return ref;
        }
    }
}
function ref$1(serviceOrRef, pathOrUrl) {
    if (pathOrUrl && isUrl(pathOrUrl)) {
        if (serviceOrRef instanceof FirebaseStorageImpl) {
            return refFromURL(serviceOrRef, pathOrUrl);
        }
        else {
            throw invalidArgument('To use ref(service, url), the first argument must be a Storage instance.');
        }
    }
    else {
        return refFromPath(serviceOrRef, pathOrUrl);
    }
}
function extractBucket(host, config) {
    const bucketString = config === null || config === void 0 ? void 0 : config[CONFIG_STORAGE_BUCKET_KEY];
    if (bucketString == null) {
        return null;
    }
    return Location.makeFromBucketSpec(bucketString, host);
}
function connectStorageEmulator$1(storage, host, port, options = {}) {
    storage.host = `${host}:${port}`;
    storage._protocol = 'http';
    const { mockUserToken } = options;
    if (mockUserToken) {
        storage._overrideAuthToken =
            typeof mockUserToken === 'string'
                ? mockUserToken
                : (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.createMockUserToken)(mockUserToken, storage.app.options.projectId);
    }
}
/**
 * A service that provides Firebase Storage Reference instances.
 * @param opt_url - gs:// url to a custom Storage Bucket
 *
 * @internal
 */
class FirebaseStorageImpl {
    constructor(
    /**
     * FirebaseApp associated with this StorageService instance.
     */
    app, _authProvider, 
    /**
     * @internal
     */
    _appCheckProvider, 
    /**
     * @internal
     */
    _url, _firebaseVersion) {
        this.app = app;
        this._authProvider = _authProvider;
        this._appCheckProvider = _appCheckProvider;
        this._url = _url;
        this._firebaseVersion = _firebaseVersion;
        this._bucket = null;
        /**
         * This string can be in the formats:
         * - host
         * - host:port
         */
        this._host = DEFAULT_HOST;
        this._protocol = 'https';
        this._appId = null;
        this._deleted = false;
        this._maxOperationRetryTime = DEFAULT_MAX_OPERATION_RETRY_TIME;
        this._maxUploadRetryTime = DEFAULT_MAX_UPLOAD_RETRY_TIME;
        this._requests = new Set();
        if (_url != null) {
            this._bucket = Location.makeFromBucketSpec(_url, this._host);
        }
        else {
            this._bucket = extractBucket(this._host, this.app.options);
        }
    }
    /**
     * The host string for this service, in the form of `host` or
     * `host:port`.
     */
    get host() {
        return this._host;
    }
    set host(host) {
        this._host = host;
        if (this._url != null) {
            this._bucket = Location.makeFromBucketSpec(this._url, host);
        }
        else {
            this._bucket = extractBucket(host, this.app.options);
        }
    }
    /**
     * The maximum time to retry uploads in milliseconds.
     */
    get maxUploadRetryTime() {
        return this._maxUploadRetryTime;
    }
    set maxUploadRetryTime(time) {
        validateNumber('time', 
        /* minValue=*/ 0, 
        /* maxValue= */ Number.POSITIVE_INFINITY, time);
        this._maxUploadRetryTime = time;
    }
    /**
     * The maximum time to retry operations other than uploads or downloads in
     * milliseconds.
     */
    get maxOperationRetryTime() {
        return this._maxOperationRetryTime;
    }
    set maxOperationRetryTime(time) {
        validateNumber('time', 
        /* minValue=*/ 0, 
        /* maxValue= */ Number.POSITIVE_INFINITY, time);
        this._maxOperationRetryTime = time;
    }
    async _getAuthToken() {
        if (this._overrideAuthToken) {
            return this._overrideAuthToken;
        }
        const auth = this._authProvider.getImmediate({ optional: true });
        if (auth) {
            const tokenData = await auth.getToken();
            if (tokenData !== null) {
                return tokenData.accessToken;
            }
        }
        return null;
    }
    async _getAppCheckToken() {
        const appCheck = this._appCheckProvider.getImmediate({ optional: true });
        if (appCheck) {
            const result = await appCheck.getToken();
            // TODO: What do we want to do if there is an error getting the token?
            // Context: appCheck.getToken() will never throw even if an error happened. In the error case, a dummy token will be
            // returned along with an error field describing the error. In general, we shouldn't care about the error condition and just use
            // the token (actual or dummy) to send requests.
            return result.token;
        }
        return null;
    }
    /**
     * Stop running requests and prevent more from being created.
     */
    _delete() {
        if (!this._deleted) {
            this._deleted = true;
            this._requests.forEach(request => request.cancel());
            this._requests.clear();
        }
        return Promise.resolve();
    }
    /**
     * Returns a new firebaseStorage.Reference object referencing this StorageService
     * at the given Location.
     */
    _makeStorageReference(loc) {
        return new Reference(this, loc);
    }
    /**
     * @param requestInfo - HTTP RequestInfo object
     * @param authToken - Firebase auth token
     */
    _makeRequest(requestInfo, requestFactory, authToken, appCheckToken) {
        if (!this._deleted) {
            const request = makeRequest(requestInfo, this._appId, authToken, appCheckToken, requestFactory, this._firebaseVersion);
            this._requests.add(request);
            // Request removes itself from set when complete.
            request.getPromise().then(() => this._requests.delete(request), () => this._requests.delete(request));
            return request;
        }
        else {
            return new FailRequest(appDeleted());
        }
    }
    async makeRequestWithTokens(requestInfo, requestFactory) {
        const [authToken, appCheckToken] = await Promise.all([
            this._getAuthToken(),
            this._getAppCheckToken()
        ]);
        return this._makeRequest(requestInfo, requestFactory, authToken, appCheckToken).getPromise();
    }
}

const name = "@firebase/storage";
const version = "0.9.2";

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
 * Type constant for Firebase Storage.
 */
const STORAGE_TYPE = 'storage';

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
 * Downloads the data at the object's location. Returns an error if the object
 * is not found.
 *
 * To use this functionality, you have to whitelist your app's origin in your
 * Cloud Storage bucket. See also
 * https://cloud.google.com/storage/docs/configuring-cors
 *
 * @public
 * @param ref - StorageReference where data should be downloaded.
 * @param maxDownloadSizeBytes - If set, the maximum allowed size in bytes to
 * retrieve.
 * @returns A Promise containing the object's bytes
 */
function getBytes(ref, maxDownloadSizeBytes) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(ref);
    return getBytesInternal(ref, maxDownloadSizeBytes);
}
/**
 * Uploads data to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - {@link StorageReference} where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the data to upload.
 * @returns A Promise containing an UploadResult
 */
function uploadBytes(ref, data, metadata) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(ref);
    return uploadBytes$1(ref, data, metadata);
}
/**
 * Uploads a string to this object's location.
 * The upload is not resumable.
 * @public
 * @param ref - {@link StorageReference} where string should be uploaded.
 * @param value - The string to upload.
 * @param format - The format of the string to upload.
 * @param metadata - Metadata for the string to upload.
 * @returns A Promise containing an UploadResult
 */
function uploadString(ref, value, format, metadata) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(ref);
    return uploadString$1(ref, value, format, metadata);
}
/**
 * Uploads data to this object's location.
 * The upload can be paused and resumed, and exposes progress updates.
 * @public
 * @param ref - {@link StorageReference} where data should be uploaded.
 * @param data - The data to upload.
 * @param metadata - Metadata for the data to upload.
 * @returns An UploadTask
 */
function uploadBytesResumable(ref, data, metadata) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(ref);
    return uploadBytesResumable$1(ref, data, metadata);
}
/**
 * A `Promise` that resolves with the metadata for this object. If this
 * object doesn't exist or metadata cannot be retreived, the promise is
 * rejected.
 * @public
 * @param ref - {@link StorageReference} to get metadata from.
 */
function getMetadata(ref) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(ref);
    return getMetadata$1(ref);
}
/**
 * Updates the metadata for this object.
 * @public
 * @param ref - {@link StorageReference} to update metadata for.
 * @param metadata - The new metadata for the object.
 *     Only values that have been explicitly set will be changed. Explicitly
 *     setting a value to null will remove the metadata.
 * @returns A `Promise` that resolves with the new metadata for this object.
 */
function updateMetadata(ref, metadata) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(ref);
    return updateMetadata$1(ref, metadata);
}
/**
 * List items (files) and prefixes (folders) under this storage reference.
 *
 * List API is only available for Firebase Rules Version 2.
 *
 * GCS is a key-blob store. Firebase Storage imposes the semantic of '/'
 * delimited folder structure.
 * Refer to GCS's List API if you want to learn more.
 *
 * To adhere to Firebase Rules's Semantics, Firebase Storage does not
 * support objects whose paths end with "/" or contain two consecutive
 * "/"s. Firebase Storage List API will filter these unsupported objects.
 * list() may fail if there are too many unsupported objects in the bucket.
 * @public
 *
 * @param ref - {@link StorageReference} to get list from.
 * @param options - See {@link ListOptions} for details.
 * @returns A `Promise` that resolves with the items and prefixes.
 *      `prefixes` contains references to sub-folders and `items`
 *      contains references to objects in this folder. `nextPageToken`
 *      can be used to get the rest of the results.
 */
function list(ref, options) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(ref);
    return list$1(ref, options);
}
/**
 * List all items (files) and prefixes (folders) under this storage reference.
 *
 * This is a helper method for calling list() repeatedly until there are
 * no more results. The default pagination size is 1000.
 *
 * Note: The results may not be consistent if objects are changed while this
 * operation is running.
 *
 * Warning: `listAll` may potentially consume too many resources if there are
 * too many results.
 * @public
 * @param ref - {@link StorageReference} to get list from.
 *
 * @returns A `Promise` that resolves with all the items and prefixes under
 *      the current storage reference. `prefixes` contains references to
 *      sub-directories and `items` contains references to objects in this
 *      folder. `nextPageToken` is never returned.
 */
function listAll(ref) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(ref);
    return listAll$1(ref);
}
/**
 * Returns the download URL for the given {@link StorageReference}.
 * @public
 * @param ref - {@link StorageReference} to get the download URL for.
 * @returns A `Promise` that resolves with the download
 *     URL for this object.
 */
function getDownloadURL(ref) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(ref);
    return getDownloadURL$1(ref);
}
/**
 * Deletes the object at this location.
 * @public
 * @param ref - {@link StorageReference} for object to delete.
 * @returns A `Promise` that resolves if the deletion succeeds.
 */
function deleteObject(ref) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(ref);
    return deleteObject$1(ref);
}
function ref(serviceOrRef, pathOrUrl) {
    serviceOrRef = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(serviceOrRef);
    return ref$1(serviceOrRef, pathOrUrl);
}
/**
 * @internal
 */
function _getChild(ref, childPath) {
    return _getChild$1(ref, childPath);
}
/**
 * Gets a {@link FirebaseStorage} instance for the given Firebase app.
 * @public
 * @param app - Firebase app to get {@link FirebaseStorage} instance for.
 * @param bucketUrl - The gs:// url to your Firebase Storage Bucket.
 * If not passed, uses the app's default Storage Bucket.
 * @returns A {@link FirebaseStorage} instance.
 */
function getStorage(app = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp)(), bucketUrl) {
    app = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(app);
    const storageProvider = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._getProvider)(app, STORAGE_TYPE);
    const storageInstance = storageProvider.getImmediate({
        identifier: bucketUrl
    });
    return storageInstance;
}
/**
 * Modify this {@link FirebaseStorage} instance to communicate with the Cloud Storage emulator.
 *
 * @param storage - The {@link FirebaseStorage} instance
 * @param host - The emulator host (ex: localhost)
 * @param port - The emulator port (ex: 5001)
 * @param options - Emulator options. `options.mockUserToken` is the mock auth
 * token to use for unit testing Security Rules.
 * @public
 */
function connectStorageEmulator(storage, host, port, options = {}) {
    connectStorageEmulator$1(storage, host, port, options);
}

/**
 * @license
 * Copyright 2021 Google LLC
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
 * Downloads the data at the object's location. Returns an error if the object
 * is not found.
 *
 * To use this functionality, you have to whitelist your app's origin in your
 * Cloud Storage bucket. See also
 * https://cloud.google.com/storage/docs/configuring-cors
 *
 * This API is not available in Node.
 *
 * @public
 * @param ref - StorageReference where data should be downloaded.
 * @param maxDownloadSizeBytes - If set, the maximum allowed size in bytes to
 * retrieve.
 * @returns A Promise that resolves with a Blob containing the object's bytes
 */
function getBlob(ref, maxDownloadSizeBytes) {
    ref = (0,_firebase_util__WEBPACK_IMPORTED_MODULE_1__.getModularInstance)(ref);
    return getBlobInternal(ref, maxDownloadSizeBytes);
}
/**
 * Downloads the data at the object's location. Raises an error event if the
 * object is not found.
 *
 * This API is only available in Node.
 *
 * @public
 * @param ref - StorageReference where data should be downloaded.
 * @param maxDownloadSizeBytes - If set, the maximum allowed size in bytes to
 * retrieve.
 * @returns A stream with the object's data as bytes
 */
function getStream(ref, maxDownloadSizeBytes) {
    throw new Error('getStream() is only supported by NodeJS builds');
}

/**
 * Cloud Storage for Firebase
 *
 * @packageDocumentation
 */
function factory(container, { instanceIdentifier: url }) {
    const app = container.getProvider('app').getImmediate();
    const authProvider = container.getProvider('auth-internal');
    const appCheckProvider = container.getProvider('app-check-internal');
    return new FirebaseStorageImpl(app, authProvider, appCheckProvider, url, _firebase_app__WEBPACK_IMPORTED_MODULE_0__.SDK_VERSION);
}
function registerStorage() {
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__._registerComponent)(new _firebase_component__WEBPACK_IMPORTED_MODULE_2__.Component(STORAGE_TYPE, factory, "PUBLIC" /* PUBLIC */).setMultipleInstances(true));
    //RUNTIME_ENV will be replaced during the compilation to "node" for nodejs and an empty string for browser
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion)(name, version, '');
    // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
    (0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion)(name, version, 'esm2017');
}
registerStorage();


//# sourceMappingURL=index.esm2017.js.map


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./srcjs/style.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./srcjs/style.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".fireblaze__hidden{\n  opacity: 0;\n}", "",{"version":3,"sources":["webpack://./srcjs/style.css"],"names":[],"mappings":"AAAA;EACE,UAAU;AACZ","sourcesContent":[".fireblaze__hidden{\n  opacity: 0;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/firebase/app/dist/index.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/firebase/app/dist/index.esm.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FirebaseError": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.FirebaseError),
/* harmony export */   "SDK_VERSION": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.SDK_VERSION),
/* harmony export */   "_DEFAULT_ENTRY_NAME": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._DEFAULT_ENTRY_NAME),
/* harmony export */   "_addComponent": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._addComponent),
/* harmony export */   "_addOrOverwriteComponent": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._addOrOverwriteComponent),
/* harmony export */   "_apps": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._apps),
/* harmony export */   "_clearComponents": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._clearComponents),
/* harmony export */   "_components": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._components),
/* harmony export */   "_getProvider": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._getProvider),
/* harmony export */   "_registerComponent": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._registerComponent),
/* harmony export */   "_removeServiceInstance": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__._removeServiceInstance),
/* harmony export */   "deleteApp": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.deleteApp),
/* harmony export */   "getApp": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp),
/* harmony export */   "getApps": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps),
/* harmony export */   "initializeApp": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp),
/* harmony export */   "onLog": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.onLog),
/* harmony export */   "registerVersion": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion),
/* harmony export */   "setLogLevel": () => (/* reexport safe */ _firebase_app__WEBPACK_IMPORTED_MODULE_0__.setLogLevel)
/* harmony export */ });
/* harmony import */ var _firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/app */ "./node_modules/@firebase/app/dist/esm/index.esm2017.js");



var name = "firebase";
var version = "9.6.7";

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
(0,_firebase_app__WEBPACK_IMPORTED_MODULE_0__.registerVersion)(name, version, 'app');
//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./node_modules/firebase/storage/dist/index.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/firebase/storage/dist/index.esm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StringFormat": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.StringFormat),
/* harmony export */   "_FbsBlob": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._FbsBlob),
/* harmony export */   "_Location": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._Location),
/* harmony export */   "_TaskEvent": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._TaskEvent),
/* harmony export */   "_TaskState": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._TaskState),
/* harmony export */   "_UploadTask": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._UploadTask),
/* harmony export */   "_dataFromString": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._dataFromString),
/* harmony export */   "_getChild": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._getChild),
/* harmony export */   "_invalidArgument": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._invalidArgument),
/* harmony export */   "_invalidRootOperation": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__._invalidRootOperation),
/* harmony export */   "connectStorageEmulator": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.connectStorageEmulator),
/* harmony export */   "deleteObject": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.deleteObject),
/* harmony export */   "getBlob": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getBlob),
/* harmony export */   "getBytes": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getBytes),
/* harmony export */   "getDownloadURL": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getDownloadURL),
/* harmony export */   "getMetadata": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getMetadata),
/* harmony export */   "getStorage": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getStorage),
/* harmony export */   "getStream": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.getStream),
/* harmony export */   "list": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.list),
/* harmony export */   "listAll": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.listAll),
/* harmony export */   "ref": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.ref),
/* harmony export */   "updateMetadata": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.updateMetadata),
/* harmony export */   "uploadBytes": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.uploadBytes),
/* harmony export */   "uploadBytesResumable": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.uploadBytesResumable),
/* harmony export */   "uploadString": () => (/* reexport safe */ _firebase_storage__WEBPACK_IMPORTED_MODULE_0__.uploadString)
/* harmony export */ });
/* harmony import */ var _firebase_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @firebase/storage */ "./node_modules/@firebase/storage/dist/index.esm2017.js");

//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./srcjs/style.css":
/*!*************************!*\
  !*** ./srcjs/style.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./srcjs/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./srcjs/components/storage.js":
/*!*************************************!*\
  !*** ./srcjs/components/storage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleStorage": () => (/* binding */ handleStorage)
/* harmony export */ });
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/storage */ "./node_modules/firebase/storage/dist/index.esm.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./srcjs/utils.js");




let storage;

const handleStorage = (firebaseApp) => {
	let storageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.ref)(storage);

  Shiny.addCustomMessageHandler('fireblaze-storage-ref', function(msg) {
		if(!storage)
			storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.getStorage)(firebaseApp);

		if(!msg.path){
			storageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.ref)(storage);
			return ;
		}

		storageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.ref)(storage, msg.path);
	});

  Shiny.addCustomMessageHandler('fireblaze-upload-file', function(msg) {
		(0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.uploadString)(storageRef, msg.encoded, 'data_url')
			.then((snapshot) => {
				if(!msg.response)
					return;

				let data = {
					response: snapshot.metadata,
					success: true
				}

				;(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setInputValue2)(msg.response, data, msg.ns);
			})
			.catch(error => {
				if(!msg.response)
					return;
				
				(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setInputValue2)(msg.response, {success: false, response: error}, msg.ns);
			});
	});

  Shiny.addCustomMessageHandler('fireblaze-download-file', (msg) => {
		(0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.getDownloadURL)(storageRef)
			.then((url) => {
				if(!msg.response)
					return;

				let data = {
					success: true,
					response: url,
				}

				;(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setInputValue2)(msg.response, data, msg.ns);
			})
			.catch((error) => {
				if(!msg.response)
					return;
				
				(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setInputValue2)(msg.response, {success: false, response: error}, msg.ns);
			});
	});

  Shiny.addCustomMessageHandler('fireblaze-delete-file', function(msg) {
		(0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.deleteObject)(storageRef)
			.then(() => {
				if(!msg.response)
					return;

				(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setInputValue2)(msg.response, {success: true, response: null}, msg.ns);
			})
			.catch((error) => {
				if(!msg.response)
					return;
				
				(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setInputValue2)(msg.response, {success: false, response: error}, msg.ns);
			});
	});
  
	Shiny.addCustomMessageHandler('fireblaze-get-metadata', function(msg) {
		(0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.getMetadata)(storageRef)
			.then((metadata) => {
				if(!msg.response)
					return;

				(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setInputValue2)(msg.response, {success: true, response: metadata}, msg.ns);
			})
			.catch((error) => {
				if(!msg.response)
					return;
				
				(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setInputValue2)(msg.response, {success: false, response: error}, msg.ns);
			});
	});
	
	Shiny.addCustomMessageHandler('fireblaze-list-all-files', function(msg) {
		(0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.listAll)(storageRef)
			.then((res) => {
				(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setInputValue2)(msg.response, {success: true, response: res.items}, msg.ns);
			})
			.catch((error) => {
				if(!msg.response)
					return;
				
				(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.setInputValue2)(msg.response, {success: false, response: error}, msg.ns);
			});
	});
}


/***/ }),

/***/ "./srcjs/core.js":
/*!***********************!*\
  !*** ./srcjs/core.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shiny */ "shiny");
/* harmony import */ var shiny__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shiny__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.esm.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./srcjs/style.css");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./srcjs/utils.js");
/* harmony import */ var _components_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/storage */ "./srcjs/components/storage.js");







// global variables
window.globalNs = '';
var globalInit = false;
window.uiInitialised = false;
let firebaseApp;

Shiny.addCustomMessageHandler('fireblaze-render-dependencies', (msg) => {
  Shiny.renderDependencies(msg.deps);
})

Shiny.addCustomMessageHandler('fireblaze-initialize-core', (msg) => {
  if(firebaseApp)
    return;

  firebaseApp = (0,firebase_app__WEBPACK_IMPORTED_MODULE_2__.initializeApp)(msg.conf);
});

Shiny.addCustomMessageHandler('fireblaze-expose-app', (msg) => {
  if(!firebaseApp)
    return;

  window.firebaseApp = firebaseApp;
});

Shiny.addCustomMessageHandler('fireblaze-expose-auth', (msg) => {
  window.firebaseAuth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();
});

Shiny.addCustomMessageHandler('fireblaze-initialize-storage', (msg) => {
  (0,_components_storage__WEBPACK_IMPORTED_MODULE_5__.handleStorage)(firebaseApp);
});

// Initialise
Shiny.addCustomMessageHandler('fireblaze-initialize-auth', (msg) => {

  if(globalInit)
    return ;

  globalInit = true;
  // set namespace
  window.globalNs = msg.ns;

  // auth
  const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setLanguageCode)(msg.languageCode)

  // set persistence
  let persistence = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.persistenceOpts)(msg.persistence);
  (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.setPersistence)(auth, persistence)
    .then(() => {
      (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.onAuthStateChanged)(auth, (user) => {
        if(user){

          // show signin authorised
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.showHideOnLogin)("show");
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.showHideOnLogout)("hide");
          $("#fireblaze-signin-ui").hide();

          auth.currentUser.getIdToken(true)
            .then(function(token) {
              (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setInputValue)('signed_in_user', {success: true, response: user, token: token});
            }).catch(function(error) {
              console.error('failed to login');
            });

        } else {
          // hide signin required
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.showHideOnLogin)("hide");
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.showHideOnLogout)("show");

          // set error input
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setInputValue)('signed_in', {success: false, response: null});
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setInputValue)('signed_in_user', {success: false, response: null});
        }
      });

      // check email verification link
      if ((0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.isSignInWithEmailLink)(auth, window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        var email = window.localStorage.getItem('fireblazeEmailSignIn');
        if (!email) {
          (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setInputValue)('email_verification', {success: false, response: "Cannot find email"});
        }
        // The client SDK will parse the code from the link for you.
        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signInWithEmailLink)(auth, email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('fireblazeEmailSignIn');
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setInputValue)('email_verification', {success: true, response: result});
          })
          .catch((error) => {
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setInputValue)('email_verification', {success: false, response: error});
          });
      }
    })
    .catch((error) => {
      console.error(error);
    });

});

// Sign out
Shiny.addCustomMessageHandler('fireblaze-signout', (msg) => {
  const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();

  (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signOut)(auth)
    .then(() => {
      if(window.uiInitialised){
        window.ui.start("#fireblaze-signin-ui", window.uiOpts);
        $("#fireblaze-signin-ui").show();
      }

      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setInputValue)('signout', {success: true, response: 'successful'}, msg.ns);
    }).catch((error) => {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setInputValue)('signout', {success: false, response: error}, msg.ns);
    });

});

// Language code
Shiny.addCustomMessageHandler('fireblaze-language-code', (msg) => {
  const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();
  auth.languageCode = msg.code;
});

// Delete User
Shiny.addCustomMessageHandler('fireblaze-delete-user', (msg) => {
  const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();
  auth.currentUser.delete()
    .then(() => {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setInputValue)('deleted_user', {success: true, response: 'successful'}, msg.ns);
    }).catch((error) => {
      Shiny.setInputValue('deleted_user', {success: false, response: error}, msg.ns);
    });
});

Shiny.addCustomMessageHandler('fireblaze-id-token', (msg) => {
  const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)();
  auth.currentUser.getIdToken(true)
    .then((idToken) => {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setInputValue)('id_token', {response: {idToken: idToken}, success: true}, msg.ns);
    }).catch((error) => {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.setInputValue)('id_token', {response: error, success: false}, msg.ns);
    });
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["auth","utilities"], () => (__webpack_exec__("./srcjs/core.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVHO0FBQ2Y7QUFDeEM7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlEQUFhO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxTQUFTLEdBQUcsa0JBQWtCO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQixJQUFJLCtCQUErQjtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsb0JBQW9CLEdBQUcsUUFBUSxLQUFLLGFBQWEsSUFBSSxvQkFBb0I7QUFDdkkseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELGlCQUFpQixHQUFHLGFBQWEsR0FBRyxpQkFBaUI7QUFDaEgsc0NBQXNDO0FBQ3RDO0FBQ0EsY0FBYywwREFBMEQ7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxTQUFTLGNBQWMsVUFBVTtBQUNyRjtBQUNBO0FBQ0Esb0RBQW9ELFNBQVMsY0FBYyxVQUFVO0FBQ3JGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsS0FBSztBQUNqQztBQUNBLGNBQWMsU0FBUyxLQUFLLE9BQU8sS0FBSyxRQUFRO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4QkFBOEI7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRkFBK0Y7QUFDL0Y7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msa0JBQWtCO0FBQ2xEO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGtCQUFrQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHFCQUFxQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFlBQVk7QUFDOUQ7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0JBQWdCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRSxzQkFBc0IsS0FBSyxHQUFHLEtBQUs7QUFDbkM7QUFDQSxZQUFZLGdCQUFnQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixtRUFBbUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxnQkFBZ0I7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELGdCQUFnQjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGtFQUFrQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsd0JBQXdCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGtFQUFrQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsd0JBQXdCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsa0VBQWtCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsa0VBQWtCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBO0FBQ0EsVUFBVSxrRUFBa0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxrRUFBa0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix3QkFBd0I7QUFDekMseUJBQXlCLG1CQUFtQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGtFQUFrQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsa0VBQWtCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyx1QkFBdUI7QUFDbEU7QUFDQSxpQkFBaUIsd0JBQXdCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxrRUFBa0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQTtBQUNBO0FBQ0EsVUFBVSxrRUFBa0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtFQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHVCQUF1QjtBQUNsQztBQUNBLHFDQUFxQyx1QkFBdUI7QUFDNUQ7QUFDQTtBQUNBLGVBQWUsdUJBQXVCO0FBQ3RDO0FBQ0EsMEJBQTBCLHFEQUFNO0FBQ2hDLFVBQVUsa0VBQWtCO0FBQzVCLDRCQUE0QiwyREFBWTtBQUN4QztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkM7QUFDQSx5QkFBeUIsdUJBQXVCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsa0VBQWtCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix5QkFBeUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLHNEQUFXO0FBQ3hGO0FBQ0E7QUFDQSxJQUFJLGlFQUFrQixLQUFLLDBEQUFTO0FBQ3BDO0FBQ0EsSUFBSSw4REFBZTtBQUNuQjtBQUNBLElBQUksOERBQWU7QUFDbkI7QUFDQTs7QUFFcWQ7QUFDcmQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoOUdBO0FBQzBHO0FBQ2pCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSw2REFBNkQsZUFBZSxHQUFHLE9BQU8sa0ZBQWtGLFVBQVUsNENBQTRDLGVBQWUsR0FBRyxtQkFBbUI7QUFDblE7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUNQMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxREFBcUQ7QUFDckQ7O0FBRUE7QUFDQSxnREFBZ0Q7QUFDaEQ7O0FBRUE7QUFDQSxxRkFBcUY7QUFDckY7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHFCQUFxQjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNyR2E7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQmdEO0FBQ2xCOztBQUU5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQWU7QUFDZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCa0M7QUFDbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksNkZBQWMsR0FBRyw2RkFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZjO0FBU1k7QUFDbUI7O0FBRTdDOztBQUVPO0FBQ1Asa0JBQWtCLHFEQUFHOztBQUVyQjtBQUNBO0FBQ0EsYUFBYSw0REFBVTs7QUFFdkI7QUFDQSxnQkFBZ0IscURBQUc7QUFDbkI7QUFDQTs7QUFFQSxlQUFlLHFEQUFHO0FBQ2xCLEVBQUU7O0FBRUY7QUFDQSxFQUFFLDhEQUFZO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksMERBQWM7QUFDbEIsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBYyxnQkFBZ0IsZ0NBQWdDO0FBQ2xFLElBQUk7QUFDSixFQUFFOztBQUVGO0FBQ0EsRUFBRSxnRUFBYztBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSwwREFBYztBQUNsQixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHlEQUFjLGdCQUFnQixnQ0FBZ0M7QUFDbEUsSUFBSTtBQUNKLEVBQUU7O0FBRUY7QUFDQSxFQUFFLDhEQUFZO0FBQ2Q7QUFDQTtBQUNBOztBQUVBLElBQUkseURBQWMsZ0JBQWdCLDhCQUE4QjtBQUNoRSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHlEQUFjLGdCQUFnQixnQ0FBZ0M7QUFDbEUsSUFBSTtBQUNKLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRSw2REFBVztBQUNiO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLHlEQUFjLGdCQUFnQixrQ0FBa0M7QUFDcEUsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBYyxnQkFBZ0IsZ0NBQWdDO0FBQ2xFLElBQUk7QUFDSixFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUUseURBQU87QUFDVDtBQUNBLElBQUkseURBQWMsZ0JBQWdCLG1DQUFtQztBQUNyRSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHlEQUFjLGdCQUFnQixnQ0FBZ0M7QUFDbEUsSUFBSTtBQUNKLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25IZTtBQVFRO0FBQ3NCO0FBQ3hCO0FBT0Q7QUFDaUM7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLGdCQUFnQiwyREFBYTtBQUM3QixDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSx3QkFBd0Isc0RBQU87QUFDL0IsQ0FBQzs7QUFFRDtBQUNBLEVBQUUsa0VBQWE7QUFDZixDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLHNEQUFPO0FBQ3RCLEVBQUUsMERBQWU7O0FBRWpCO0FBQ0Esb0JBQW9CLDBEQUFlO0FBQ25DLEVBQUUsNkRBQWM7QUFDaEI7QUFDQSxNQUFNLGlFQUFrQjtBQUN4Qjs7QUFFQTtBQUNBLFVBQVUsMERBQWU7QUFDekIsVUFBVSwyREFBZ0I7QUFDMUI7O0FBRUE7QUFDQTtBQUNBLGNBQWMsd0RBQWEsb0JBQW9CLDRDQUE0QztBQUMzRixhQUFhO0FBQ2I7QUFDQSxhQUFhOztBQUViLFVBQVU7QUFDVjtBQUNBLFVBQVUsMERBQWU7QUFDekIsVUFBVSwyREFBZ0I7O0FBRTFCO0FBQ0EsVUFBVSx3REFBYSxlQUFlLCtCQUErQjtBQUNyRSxVQUFVLHdEQUFhLG9CQUFvQiwrQkFBK0I7QUFDMUU7QUFDQSxPQUFPOztBQUVQO0FBQ0EsVUFBVSxvRUFBcUI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLHdEQUFhLHdCQUF3Qiw4Q0FBOEM7QUFDN0Y7QUFDQTtBQUNBLFFBQVEsa0VBQW1CO0FBQzNCO0FBQ0E7QUFDQSxZQUFZLHdEQUFhLHdCQUF3QixnQ0FBZ0M7QUFDakYsV0FBVztBQUNYO0FBQ0EsWUFBWSx3REFBYSx3QkFBd0IsZ0NBQWdDO0FBQ2pGLFdBQVc7QUFDWDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxDQUFDOztBQUVEO0FBQ0E7QUFDQSxlQUFlLHNEQUFPOztBQUV0QixFQUFFLHNEQUFPO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLHdEQUFhLGFBQWEsc0NBQXNDO0FBQ3RFLEtBQUs7QUFDTCxNQUFNLHdEQUFhLGFBQWEsZ0NBQWdDO0FBQ2hFLEtBQUs7O0FBRUwsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsZUFBZSxzREFBTztBQUN0QjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGVBQWUsc0RBQU87QUFDdEI7QUFDQTtBQUNBLE1BQU0sd0RBQWEsa0JBQWtCLHNDQUFzQztBQUMzRSxLQUFLO0FBQ0wsMkNBQTJDLGdDQUFnQztBQUMzRSxLQUFLO0FBQ0wsQ0FBQzs7QUFFRDtBQUNBLGVBQWUsc0RBQU87QUFDdEI7QUFDQTtBQUNBLE1BQU0sd0RBQWEsY0FBYyxXQUFXLGlCQUFpQixnQkFBZ0I7QUFDN0UsS0FBSztBQUNMLE1BQU0sd0RBQWEsY0FBYyxnQ0FBZ0M7QUFDakUsS0FBSztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maXJlYmFzZS1yLy4vbm9kZV9tb2R1bGVzL0BmaXJlYmFzZS9zdG9yYWdlL2Rpc3QvaW5kZXguZXNtMjAxNy5qcyIsIndlYnBhY2s6Ly9maXJlYmFzZS1yLy4vc3JjanMvc3R5bGUuY3NzIiwid2VicGFjazovL2ZpcmViYXNlLXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2ZpcmViYXNlLXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9maXJlYmFzZS1yLy4vbm9kZV9tb2R1bGVzL2ZpcmViYXNlL2FwcC9kaXN0L2luZGV4LmVzbS5qcyIsIndlYnBhY2s6Ly9maXJlYmFzZS1yLy4vbm9kZV9tb2R1bGVzL2ZpcmViYXNlL3N0b3JhZ2UvZGlzdC9pbmRleC5lc20uanMiLCJ3ZWJwYWNrOi8vZmlyZWJhc2Utci8uL3NyY2pzL3N0eWxlLmNzcz83Y2M3Iiwid2VicGFjazovL2ZpcmViYXNlLXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZmlyZWJhc2Utci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vZmlyZWJhc2Utci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9maXJlYmFzZS1yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2ZpcmViYXNlLXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9maXJlYmFzZS1yLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vZmlyZWJhc2Utci8uL3NyY2pzL2NvbXBvbmVudHMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9maXJlYmFzZS1yLy4vc3JjanMvY29yZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRBcHAsIF9nZXRQcm92aWRlciwgX3JlZ2lzdGVyQ29tcG9uZW50LCByZWdpc3RlclZlcnNpb24sIFNES19WRVJTSU9OIH0gZnJvbSAnQGZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBGaXJlYmFzZUVycm9yLCBjcmVhdGVNb2NrVXNlclRva2VuLCBnZXRNb2R1bGFySW5zdGFuY2UgfSBmcm9tICdAZmlyZWJhc2UvdXRpbCc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAZmlyZWJhc2UvY29tcG9uZW50JztcblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgQ29uc3RhbnRzIHVzZWQgaW4gdGhlIEZpcmViYXNlIFN0b3JhZ2UgbGlicmFyeS5cclxuICovXHJcbi8qKlxyXG4gKiBEb21haW4gbmFtZSBmb3IgZmlyZWJhc2Ugc3RvcmFnZS5cclxuICovXHJcbmNvbnN0IERFRkFVTFRfSE9TVCA9ICdmaXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20nO1xyXG4vKipcclxuICogVGhlIGtleSBpbiBGaXJlYmFzZSBjb25maWcganNvbiBmb3IgdGhlIHN0b3JhZ2UgYnVja2V0LlxyXG4gKi9cclxuY29uc3QgQ09ORklHX1NUT1JBR0VfQlVDS0VUX0tFWSA9ICdzdG9yYWdlQnVja2V0JztcclxuLyoqXHJcbiAqIDIgbWludXRlc1xyXG4gKlxyXG4gKiBUaGUgdGltZW91dCBmb3IgYWxsIG9wZXJhdGlvbnMgZXhjZXB0IHVwbG9hZC5cclxuICovXHJcbmNvbnN0IERFRkFVTFRfTUFYX09QRVJBVElPTl9SRVRSWV9USU1FID0gMiAqIDYwICogMTAwMDtcclxuLyoqXHJcbiAqIDEwIG1pbnV0ZXNcclxuICpcclxuICogVGhlIHRpbWVvdXQgZm9yIHVwbG9hZC5cclxuICovXHJcbmNvbnN0IERFRkFVTFRfTUFYX1VQTE9BRF9SRVRSWV9USU1FID0gMTAgKiA2MCAqIDEwMDA7XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBBbiBlcnJvciByZXR1cm5lZCBieSB0aGUgRmlyZWJhc2UgU3RvcmFnZSBTREsuXHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmNsYXNzIFN0b3JhZ2VFcnJvciBleHRlbmRzIEZpcmViYXNlRXJyb3Ige1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gY29kZSAtIEEgU3RvcmFnZUVycm9yQ29kZSBzdHJpbmcgdG8gYmUgcHJlZml4ZWQgd2l0aCAnc3RvcmFnZS8nIGFuZFxyXG4gICAgICogIGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSAgLSBFcnJvciBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihjb2RlLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgc3VwZXIocHJlcGVuZENvZGUoY29kZSksIGBGaXJlYmFzZSBTdG9yYWdlOiAke21lc3NhZ2V9ICgke3ByZXBlbmRDb2RlKGNvZGUpfSlgKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTdG9yZXMgY3VzdG9tIGVycm9yIGRhdGEgdW5xdWUgdG8gU3RvcmFnZUVycm9yLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHsgc2VydmVyUmVzcG9uc2U6IG51bGwgfTtcclxuICAgICAgICB0aGlzLl9iYXNlTWVzc2FnZSA9IHRoaXMubWVzc2FnZTtcclxuICAgICAgICAvLyBXaXRob3V0IHRoaXMsIGBpbnN0YW5jZW9mIFN0b3JhZ2VFcnJvcmAsIGluIHRlc3RzIGZvciBleGFtcGxlLFxyXG4gICAgICAgIC8vIHJldHVybnMgZmFsc2UuXHJcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIFN0b3JhZ2VFcnJvci5wcm90b3R5cGUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wYXJlcyBhIFN0b3JhZ2VFcnJvckNvZGUgYWdhaW5zdCB0aGlzIGVycm9yJ3MgY29kZSwgZmlsdGVyaW5nIG91dCB0aGUgcHJlZml4LlxyXG4gICAgICovXHJcbiAgICBfY29kZUVxdWFscyhjb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIHByZXBlbmRDb2RlKGNvZGUpID09PSB0aGlzLmNvZGU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE9wdGlvbmFsIHJlc3BvbnNlIG1lc3NhZ2UgdGhhdCB3YXMgYWRkZWQgYnkgdGhlIHNlcnZlci5cclxuICAgICAqL1xyXG4gICAgZ2V0IHNlcnZlclJlc3BvbnNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbURhdGEuc2VydmVyUmVzcG9uc2U7XHJcbiAgICB9XHJcbiAgICBzZXQgc2VydmVyUmVzcG9uc2Uoc2VydmVyUmVzcG9uc2UpIHtcclxuICAgICAgICB0aGlzLmN1c3RvbURhdGEuc2VydmVyUmVzcG9uc2UgPSBzZXJ2ZXJSZXNwb25zZTtcclxuICAgICAgICBpZiAodGhpcy5jdXN0b21EYXRhLnNlcnZlclJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGAke3RoaXMuX2Jhc2VNZXNzYWdlfVxcbiR7dGhpcy5jdXN0b21EYXRhLnNlcnZlclJlc3BvbnNlfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLl9iYXNlTWVzc2FnZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcHJlcGVuZENvZGUoY29kZSkge1xyXG4gICAgcmV0dXJuICdzdG9yYWdlLycgKyBjb2RlO1xyXG59XHJcbmZ1bmN0aW9uIHVua25vd24oKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gJ0FuIHVua25vd24gZXJyb3Igb2NjdXJyZWQsIHBsZWFzZSBjaGVjayB0aGUgZXJyb3IgcGF5bG9hZCBmb3IgJyArXHJcbiAgICAgICAgJ3NlcnZlciByZXNwb25zZS4nO1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJ1bmtub3duXCIgLyogVU5LTk9XTiAqLywgbWVzc2FnZSk7XHJcbn1cclxuZnVuY3Rpb24gb2JqZWN0Tm90Rm91bmQocGF0aCkge1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJvYmplY3Qtbm90LWZvdW5kXCIgLyogT0JKRUNUX05PVF9GT1VORCAqLywgXCJPYmplY3QgJ1wiICsgcGF0aCArIFwiJyBkb2VzIG5vdCBleGlzdC5cIik7XHJcbn1cclxuZnVuY3Rpb24gcXVvdGFFeGNlZWRlZChidWNrZXQpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwicXVvdGEtZXhjZWVkZWRcIiAvKiBRVU9UQV9FWENFRURFRCAqLywgXCJRdW90YSBmb3IgYnVja2V0ICdcIiArXHJcbiAgICAgICAgYnVja2V0ICtcclxuICAgICAgICBcIicgZXhjZWVkZWQsIHBsZWFzZSB2aWV3IHF1b3RhIG9uIFwiICtcclxuICAgICAgICAnaHR0cHM6Ly9maXJlYmFzZS5nb29nbGUuY29tL3ByaWNpbmcvLicpO1xyXG59XHJcbmZ1bmN0aW9uIHVuYXV0aGVudGljYXRlZCgpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSAnVXNlciBpcyBub3QgYXV0aGVudGljYXRlZCwgcGxlYXNlIGF1dGhlbnRpY2F0ZSB1c2luZyBGaXJlYmFzZSAnICtcclxuICAgICAgICAnQXV0aGVudGljYXRpb24gYW5kIHRyeSBhZ2Fpbi4nO1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJ1bmF1dGhlbnRpY2F0ZWRcIiAvKiBVTkFVVEhFTlRJQ0FURUQgKi8sIG1lc3NhZ2UpO1xyXG59XHJcbmZ1bmN0aW9uIHVuYXV0aG9yaXplZEFwcCgpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwidW5hdXRob3JpemVkLWFwcFwiIC8qIFVOQVVUSE9SSVpFRF9BUFAgKi8sICdUaGlzIGFwcCBkb2VzIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gYWNjZXNzIEZpcmViYXNlIFN0b3JhZ2Ugb24gdGhpcyBwcm9qZWN0LicpO1xyXG59XHJcbmZ1bmN0aW9uIHVuYXV0aG9yaXplZChwYXRoKSB7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcInVuYXV0aG9yaXplZFwiIC8qIFVOQVVUSE9SSVpFRCAqLywgXCJVc2VyIGRvZXMgbm90IGhhdmUgcGVybWlzc2lvbiB0byBhY2Nlc3MgJ1wiICsgcGF0aCArIFwiJy5cIik7XHJcbn1cclxuZnVuY3Rpb24gcmV0cnlMaW1pdEV4Y2VlZGVkKCkge1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJyZXRyeS1saW1pdC1leGNlZWRlZFwiIC8qIFJFVFJZX0xJTUlUX0VYQ0VFREVEICovLCAnTWF4IHJldHJ5IHRpbWUgZm9yIG9wZXJhdGlvbiBleGNlZWRlZCwgcGxlYXNlIHRyeSBhZ2Fpbi4nKTtcclxufVxyXG5mdW5jdGlvbiBjYW5jZWxlZCgpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwiY2FuY2VsZWRcIiAvKiBDQU5DRUxFRCAqLywgJ1VzZXIgY2FuY2VsZWQgdGhlIHVwbG9hZC9kb3dubG9hZC4nKTtcclxufVxyXG5mdW5jdGlvbiBpbnZhbGlkVXJsKHVybCkge1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJpbnZhbGlkLXVybFwiIC8qIElOVkFMSURfVVJMICovLCBcIkludmFsaWQgVVJMICdcIiArIHVybCArIFwiJy5cIik7XHJcbn1cclxuZnVuY3Rpb24gaW52YWxpZERlZmF1bHRCdWNrZXQoYnVja2V0KSB7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcImludmFsaWQtZGVmYXVsdC1idWNrZXRcIiAvKiBJTlZBTElEX0RFRkFVTFRfQlVDS0VUICovLCBcIkludmFsaWQgZGVmYXVsdCBidWNrZXQgJ1wiICsgYnVja2V0ICsgXCInLlwiKTtcclxufVxyXG5mdW5jdGlvbiBub0RlZmF1bHRCdWNrZXQoKSB7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcIm5vLWRlZmF1bHQtYnVja2V0XCIgLyogTk9fREVGQVVMVF9CVUNLRVQgKi8sICdObyBkZWZhdWx0IGJ1Y2tldCAnICtcclxuICAgICAgICBcImZvdW5kLiBEaWQgeW91IHNldCB0aGUgJ1wiICtcclxuICAgICAgICBDT05GSUdfU1RPUkFHRV9CVUNLRVRfS0VZICtcclxuICAgICAgICBcIicgcHJvcGVydHkgd2hlbiBpbml0aWFsaXppbmcgdGhlIGFwcD9cIik7XHJcbn1cclxuZnVuY3Rpb24gY2Fubm90U2xpY2VCbG9iKCkge1xyXG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlRXJyb3IoXCJjYW5ub3Qtc2xpY2UtYmxvYlwiIC8qIENBTk5PVF9TTElDRV9CTE9CICovLCAnQ2Fubm90IHNsaWNlIGJsb2IgZm9yIHVwbG9hZC4gUGxlYXNlIHJldHJ5IHRoZSB1cGxvYWQuJyk7XHJcbn1cclxuZnVuY3Rpb24gc2VydmVyRmlsZVdyb25nU2l6ZSgpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwic2VydmVyLWZpbGUtd3Jvbmctc2l6ZVwiIC8qIFNFUlZFUl9GSUxFX1dST05HX1NJWkUgKi8sICdTZXJ2ZXIgcmVjb3JkZWQgaW5jb3JyZWN0IHVwbG9hZCBmaWxlIHNpemUsIHBsZWFzZSByZXRyeSB0aGUgdXBsb2FkLicpO1xyXG59XHJcbmZ1bmN0aW9uIG5vRG93bmxvYWRVUkwoKSB7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcIm5vLWRvd25sb2FkLXVybFwiIC8qIE5PX0RPV05MT0FEX1VSTCAqLywgJ1RoZSBnaXZlbiBmaWxlIGRvZXMgbm90IGhhdmUgYW55IGRvd25sb2FkIFVSTHMuJyk7XHJcbn1cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZnVuY3Rpb24gaW52YWxpZEFyZ3VtZW50KG1lc3NhZ2UpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwiaW52YWxpZC1hcmd1bWVudFwiIC8qIElOVkFMSURfQVJHVU1FTlQgKi8sIG1lc3NhZ2UpO1xyXG59XHJcbmZ1bmN0aW9uIGFwcERlbGV0ZWQoKSB7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcImFwcC1kZWxldGVkXCIgLyogQVBQX0RFTEVURUQgKi8sICdUaGUgRmlyZWJhc2UgYXBwIHdhcyBkZWxldGVkLicpO1xyXG59XHJcbi8qKlxyXG4gKiBAcGFyYW0gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBvcGVyYXRpb24gdGhhdCB3YXMgaW52YWxpZC5cclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnZhbGlkUm9vdE9wZXJhdGlvbihuYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VFcnJvcihcImludmFsaWQtcm9vdC1vcGVyYXRpb25cIiAvKiBJTlZBTElEX1JPT1RfT1BFUkFUSU9OICovLCBcIlRoZSBvcGVyYXRpb24gJ1wiICtcclxuICAgICAgICBuYW1lICtcclxuICAgICAgICBcIicgY2Fubm90IGJlIHBlcmZvcm1lZCBvbiBhIHJvb3QgcmVmZXJlbmNlLCBjcmVhdGUgYSBub24tcm9vdCBcIiArXHJcbiAgICAgICAgXCJyZWZlcmVuY2UgdXNpbmcgY2hpbGQsIHN1Y2ggYXMgLmNoaWxkKCdmaWxlLnBuZycpLlwiKTtcclxufVxyXG4vKipcclxuICogQHBhcmFtIGZvcm1hdCAtIFRoZSBmb3JtYXQgdGhhdCB3YXMgbm90IHZhbGlkLlxyXG4gKiBAcGFyYW0gbWVzc2FnZSAtIEEgbWVzc2FnZSBkZXNjcmliaW5nIHRoZSBmb3JtYXQgdmlvbGF0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gaW52YWxpZEZvcm1hdChmb3JtYXQsIG1lc3NhZ2UpIHtcclxuICAgIHJldHVybiBuZXcgU3RvcmFnZUVycm9yKFwiaW52YWxpZC1mb3JtYXRcIiAvKiBJTlZBTElEX0ZPUk1BVCAqLywgXCJTdHJpbmcgZG9lcyBub3QgbWF0Y2ggZm9ybWF0ICdcIiArIGZvcm1hdCArIFwiJzogXCIgKyBtZXNzYWdlKTtcclxufVxyXG4vKipcclxuICogQHBhcmFtIG1lc3NhZ2UgLSBBIG1lc3NhZ2UgZGVzY3JpYmluZyB0aGUgaW50ZXJuYWwgZXJyb3IuXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnRlcm5hbEVycm9yKG1lc3NhZ2UpIHtcclxuICAgIHRocm93IG5ldyBTdG9yYWdlRXJyb3IoXCJpbnRlcm5hbC1lcnJvclwiIC8qIElOVEVSTkFMX0VSUk9SICovLCAnSW50ZXJuYWwgZXJyb3I6ICcgKyBtZXNzYWdlKTtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogRmlyZWJhc2UgU3RvcmFnZSBsb2NhdGlvbiBkYXRhLlxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNsYXNzIExvY2F0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKGJ1Y2tldCwgcGF0aCkge1xyXG4gICAgICAgIHRoaXMuYnVja2V0ID0gYnVja2V0O1xyXG4gICAgICAgIHRoaXMucGF0aF8gPSBwYXRoO1xyXG4gICAgfVxyXG4gICAgZ2V0IHBhdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aF87XHJcbiAgICB9XHJcbiAgICBnZXQgaXNSb290KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGgubGVuZ3RoID09PSAwO1xyXG4gICAgfVxyXG4gICAgZnVsbFNlcnZlclVybCgpIHtcclxuICAgICAgICBjb25zdCBlbmNvZGUgPSBlbmNvZGVVUklDb21wb25lbnQ7XHJcbiAgICAgICAgcmV0dXJuICcvYi8nICsgZW5jb2RlKHRoaXMuYnVja2V0KSArICcvby8nICsgZW5jb2RlKHRoaXMucGF0aCk7XHJcbiAgICB9XHJcbiAgICBidWNrZXRPbmx5U2VydmVyVXJsKCkge1xyXG4gICAgICAgIGNvbnN0IGVuY29kZSA9IGVuY29kZVVSSUNvbXBvbmVudDtcclxuICAgICAgICByZXR1cm4gJy9iLycgKyBlbmNvZGUodGhpcy5idWNrZXQpICsgJy9vJztcclxuICAgIH1cclxuICAgIHN0YXRpYyBtYWtlRnJvbUJ1Y2tldFNwZWMoYnVja2V0U3RyaW5nLCBob3N0KSB7XHJcbiAgICAgICAgbGV0IGJ1Y2tldExvY2F0aW9uO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGJ1Y2tldExvY2F0aW9uID0gTG9jYXRpb24ubWFrZUZyb21VcmwoYnVja2V0U3RyaW5nLCBob3N0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gTm90IHZhbGlkIFVSTCwgdXNlIGFzLWlzLiBUaGlzIGxldHMgeW91IHB1dCBiYXJlIGJ1Y2tldCBuYW1lcyBpblxyXG4gICAgICAgICAgICAvLyBjb25maWcuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTG9jYXRpb24oYnVja2V0U3RyaW5nLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChidWNrZXRMb2NhdGlvbi5wYXRoID09PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gYnVja2V0TG9jYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBpbnZhbGlkRGVmYXVsdEJ1Y2tldChidWNrZXRTdHJpbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBtYWtlRnJvbVVybCh1cmwsIGhvc3QpIHtcclxuICAgICAgICBsZXQgbG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGJ1Y2tldERvbWFpbiA9ICcoW0EtWmEtejAtOS5cXFxcLV9dKyknO1xyXG4gICAgICAgIGZ1bmN0aW9uIGdzTW9kaWZ5KGxvYykge1xyXG4gICAgICAgICAgICBpZiAobG9jLnBhdGguY2hhckF0KGxvYy5wYXRoLmxlbmd0aCAtIDEpID09PSAnLycpIHtcclxuICAgICAgICAgICAgICAgIGxvYy5wYXRoXyA9IGxvYy5wYXRoXy5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZ3NQYXRoID0gJygvKC4qKSk/JCc7XHJcbiAgICAgICAgY29uc3QgZ3NSZWdleCA9IG5ldyBSZWdFeHAoJ15nczovLycgKyBidWNrZXREb21haW4gKyBnc1BhdGgsICdpJyk7XHJcbiAgICAgICAgY29uc3QgZ3NJbmRpY2VzID0geyBidWNrZXQ6IDEsIHBhdGg6IDMgfTtcclxuICAgICAgICBmdW5jdGlvbiBodHRwTW9kaWZ5KGxvYykge1xyXG4gICAgICAgICAgICBsb2MucGF0aF8gPSBkZWNvZGVVUklDb21wb25lbnQobG9jLnBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2ZXJzaW9uID0gJ3ZbQS1aYS16MC05X10rJztcclxuICAgICAgICBjb25zdCBmaXJlYmFzZVN0b3JhZ2VIb3N0ID0gaG9zdC5yZXBsYWNlKC9bLl0vZywgJ1xcXFwuJyk7XHJcbiAgICAgICAgY29uc3QgZmlyZWJhc2VTdG9yYWdlUGF0aCA9ICcoLyhbXj8jXSopLiopPyQnO1xyXG4gICAgICAgIGNvbnN0IGZpcmViYXNlU3RvcmFnZVJlZ0V4cCA9IG5ldyBSZWdFeHAoYF5odHRwcz86Ly8ke2ZpcmViYXNlU3RvcmFnZUhvc3R9LyR7dmVyc2lvbn0vYi8ke2J1Y2tldERvbWFpbn0vbyR7ZmlyZWJhc2VTdG9yYWdlUGF0aH1gLCAnaScpO1xyXG4gICAgICAgIGNvbnN0IGZpcmViYXNlU3RvcmFnZUluZGljZXMgPSB7IGJ1Y2tldDogMSwgcGF0aDogMyB9O1xyXG4gICAgICAgIGNvbnN0IGNsb3VkU3RvcmFnZUhvc3QgPSBob3N0ID09PSBERUZBVUxUX0hPU1RcclxuICAgICAgICAgICAgPyAnKD86c3RvcmFnZS5nb29nbGVhcGlzLmNvbXxzdG9yYWdlLmNsb3VkLmdvb2dsZS5jb20pJ1xyXG4gICAgICAgICAgICA6IGhvc3Q7XHJcbiAgICAgICAgY29uc3QgY2xvdWRTdG9yYWdlUGF0aCA9ICcoW14/I10qKSc7XHJcbiAgICAgICAgY29uc3QgY2xvdWRTdG9yYWdlUmVnRXhwID0gbmV3IFJlZ0V4cChgXmh0dHBzPzovLyR7Y2xvdWRTdG9yYWdlSG9zdH0vJHtidWNrZXREb21haW59LyR7Y2xvdWRTdG9yYWdlUGF0aH1gLCAnaScpO1xyXG4gICAgICAgIGNvbnN0IGNsb3VkU3RvcmFnZUluZGljZXMgPSB7IGJ1Y2tldDogMSwgcGF0aDogMiB9O1xyXG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFtcclxuICAgICAgICAgICAgeyByZWdleDogZ3NSZWdleCwgaW5kaWNlczogZ3NJbmRpY2VzLCBwb3N0TW9kaWZ5OiBnc01vZGlmeSB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZWdleDogZmlyZWJhc2VTdG9yYWdlUmVnRXhwLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlczogZmlyZWJhc2VTdG9yYWdlSW5kaWNlcyxcclxuICAgICAgICAgICAgICAgIHBvc3RNb2RpZnk6IGh0dHBNb2RpZnlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmVnZXg6IGNsb3VkU3RvcmFnZVJlZ0V4cCxcclxuICAgICAgICAgICAgICAgIGluZGljZXM6IGNsb3VkU3RvcmFnZUluZGljZXMsXHJcbiAgICAgICAgICAgICAgICBwb3N0TW9kaWZ5OiBodHRwTW9kaWZ5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBjYXB0dXJlcyA9IGdyb3VwLnJlZ2V4LmV4ZWModXJsKTtcclxuICAgICAgICAgICAgaWYgKGNhcHR1cmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWNrZXRWYWx1ZSA9IGNhcHR1cmVzW2dyb3VwLmluZGljZXMuYnVja2V0XTtcclxuICAgICAgICAgICAgICAgIGxldCBwYXRoVmFsdWUgPSBjYXB0dXJlc1tncm91cC5pbmRpY2VzLnBhdGhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwYXRoVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoVmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gbmV3IExvY2F0aW9uKGJ1Y2tldFZhbHVlLCBwYXRoVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAucG9zdE1vZGlmeShsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobG9jYXRpb24gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBpbnZhbGlkVXJsKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsb2NhdGlvbjtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQSByZXF1ZXN0IHdob3NlIHByb21pc2UgYWx3YXlzIGZhaWxzLlxyXG4gKi9cclxuY2xhc3MgRmFpbFJlcXVlc3Qge1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3IpIHtcclxuICAgICAgICB0aGlzLnByb21pc2VfID0gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBnZXRQcm9taXNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2VfO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBjYW5jZWwoX2FwcERlbGV0ZSA9IGZhbHNlKSB7IH1cclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogQHBhcmFtIGYgTWF5IGJlIGludm9rZWRcclxuICogICAgIGJlZm9yZSB0aGUgZnVuY3Rpb24gcmV0dXJucy5cclxuICogQHBhcmFtIGNhbGxiYWNrIEdldCBhbGwgdGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uXHJcbiAqICAgICBwYXNzZWQgdG8gZiwgaW5jbHVkaW5nIHRoZSBpbml0aWFsIGJvb2xlYW4uXHJcbiAqL1xyXG5mdW5jdGlvbiBzdGFydChmLCBcclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuY2FsbGJhY2ssIHRpbWVvdXQpIHtcclxuICAgIC8vIFRPRE8oYW5keXNvdG8pOiBtYWtlIHRoaXMgY29kZSBjbGVhbmVyIChwcm9iYWJseSByZWZhY3RvciBpbnRvIGFuIGFjdHVhbFxyXG4gICAgLy8gdHlwZSBpbnN0ZWFkIG9mIGEgYnVuY2ggb2YgZnVuY3Rpb25zIHdpdGggc3RhdGUgc2hhcmVkIGluIHRoZSBjbG9zdXJlKVxyXG4gICAgbGV0IHdhaXRTZWNvbmRzID0gMTtcclxuICAgIC8vIFdvdWxkIHR5cGUgdGhpcyBhcyBcIm51bWJlclwiIGJ1dCB0aGF0IGRvZXNuJ3Qgd29yayBmb3IgTm9kZSBzbyDCr1xcXyjjg4QpXy/Cr1xyXG4gICAgLy8gVE9ETzogZmluZCBhIHdheSB0byBleGNsdWRlIE5vZGUgdHlwZSBkZWZpbml0aW9uIGZvciBzdG9yYWdlIGJlY2F1c2Ugc3RvcmFnZSBvbmx5IHdvcmtzIGluIGJyb3dzZXJcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBsZXQgcmV0cnlUaW1lb3V0SWQgPSBudWxsO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGxldCBnbG9iYWxUaW1lb3V0SWQgPSBudWxsO1xyXG4gICAgbGV0IGhpdFRpbWVvdXQgPSBmYWxzZTtcclxuICAgIGxldCBjYW5jZWxTdGF0ZSA9IDA7XHJcbiAgICBmdW5jdGlvbiBjYW5jZWxlZCgpIHtcclxuICAgICAgICByZXR1cm4gY2FuY2VsU3RhdGUgPT09IDI7XHJcbiAgICB9XHJcbiAgICBsZXQgdHJpZ2dlcmVkQ2FsbGJhY2sgPSBmYWxzZTtcclxuICAgIGZ1bmN0aW9uIHRyaWdnZXJDYWxsYmFjayguLi5hcmdzKSB7XHJcbiAgICAgICAgaWYgKCF0cmlnZ2VyZWRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0cmlnZ2VyZWRDYWxsYmFjayA9IHRydWU7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNhbGxXaXRoRGVsYXkobWlsbGlzKSB7XHJcbiAgICAgICAgcmV0cnlUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcmV0cnlUaW1lb3V0SWQgPSBudWxsO1xyXG4gICAgICAgICAgICBmKGhhbmRsZXIsIGNhbmNlbGVkKCkpO1xyXG4gICAgICAgIH0sIG1pbGxpcyk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjbGVhckdsb2JhbFRpbWVvdXQoKSB7XHJcbiAgICAgICAgaWYgKGdsb2JhbFRpbWVvdXRJZCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoZ2xvYmFsVGltZW91dElkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBoYW5kbGVyKHN1Y2Nlc3MsIC4uLmFyZ3MpIHtcclxuICAgICAgICBpZiAodHJpZ2dlcmVkQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgY2xlYXJHbG9iYWxUaW1lb3V0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgY2xlYXJHbG9iYWxUaW1lb3V0KCk7XHJcbiAgICAgICAgICAgIHRyaWdnZXJDYWxsYmFjay5jYWxsKG51bGwsIHN1Y2Nlc3MsIC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG11c3RTdG9wID0gY2FuY2VsZWQoKSB8fCBoaXRUaW1lb3V0O1xyXG4gICAgICAgIGlmIChtdXN0U3RvcCkge1xyXG4gICAgICAgICAgICBjbGVhckdsb2JhbFRpbWVvdXQoKTtcclxuICAgICAgICAgICAgdHJpZ2dlckNhbGxiYWNrLmNhbGwobnVsbCwgc3VjY2VzcywgLi4uYXJncyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHdhaXRTZWNvbmRzIDwgNjQpIHtcclxuICAgICAgICAgICAgLyogVE9ETyhhbmR5c290byk6IGRvbid0IGJhY2sgb2ZmIHNvIHF1aWNrbHkgaWYgd2Uga25vdyB3ZSdyZSBvZmZsaW5lLiAqL1xyXG4gICAgICAgICAgICB3YWl0U2Vjb25kcyAqPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd2FpdE1pbGxpcztcclxuICAgICAgICBpZiAoY2FuY2VsU3RhdGUgPT09IDEpIHtcclxuICAgICAgICAgICAgY2FuY2VsU3RhdGUgPSAyO1xyXG4gICAgICAgICAgICB3YWl0TWlsbGlzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdhaXRNaWxsaXMgPSAod2FpdFNlY29uZHMgKyBNYXRoLnJhbmRvbSgpKSAqIDEwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbGxXaXRoRGVsYXkod2FpdE1pbGxpcyk7XHJcbiAgICB9XHJcbiAgICBsZXQgc3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgZnVuY3Rpb24gc3RvcCh3YXNUaW1lb3V0KSB7XHJcbiAgICAgICAgaWYgKHN0b3BwZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICBjbGVhckdsb2JhbFRpbWVvdXQoKTtcclxuICAgICAgICBpZiAodHJpZ2dlcmVkQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV0cnlUaW1lb3V0SWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKCF3YXNUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxTdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHJldHJ5VGltZW91dElkKTtcclxuICAgICAgICAgICAgY2FsbFdpdGhEZWxheSgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghd2FzVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsU3RhdGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2FsbFdpdGhEZWxheSgwKTtcclxuICAgIGdsb2JhbFRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGhpdFRpbWVvdXQgPSB0cnVlO1xyXG4gICAgICAgIHN0b3AodHJ1ZSk7XHJcbiAgICB9LCB0aW1lb3V0KTtcclxuICAgIHJldHVybiBzdG9wO1xyXG59XHJcbi8qKlxyXG4gKiBTdG9wcyB0aGUgcmV0cnkgbG9vcCBmcm9tIHJlcGVhdGluZy5cclxuICogSWYgdGhlIGZ1bmN0aW9uIGlzIGN1cnJlbnRseSBcImluIGJldHdlZW5cIiByZXRyaWVzLCBpdCBpcyBpbnZva2VkIGltbWVkaWF0ZWx5XHJcbiAqIHdpdGggdGhlIHNlY29uZCBwYXJhbWV0ZXIgYXMgXCJ0cnVlXCIuIE90aGVyd2lzZSwgaXQgd2lsbCBiZSBpbnZva2VkIG9uY2UgbW9yZVxyXG4gKiBhZnRlciB0aGUgY3VycmVudCBpbnZvY2F0aW9uIGZpbmlzaGVzIGlmZiB0aGUgY3VycmVudCBpbnZvY2F0aW9uIHdvdWxkIGhhdmVcclxuICogdHJpZ2dlcmVkIGFub3RoZXIgcmV0cnkuXHJcbiAqL1xyXG5mdW5jdGlvbiBzdG9wKGlkKSB7XHJcbiAgICBpZChmYWxzZSk7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuZnVuY3Rpb24gaXNKdXN0RGVmKHApIHtcclxuICAgIHJldHVybiBwICE9PSB2b2lkIDA7XHJcbn1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcclxuZnVuY3Rpb24gaXNGdW5jdGlvbihwKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHAgPT09ICdmdW5jdGlvbic7XHJcbn1cclxuZnVuY3Rpb24gaXNOb25BcnJheU9iamVjdChwKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHAgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHApO1xyXG59XHJcbmZ1bmN0aW9uIGlzU3RyaW5nKHApIHtcclxuICAgIHJldHVybiB0eXBlb2YgcCA9PT0gJ3N0cmluZycgfHwgcCBpbnN0YW5jZW9mIFN0cmluZztcclxufVxyXG5mdW5jdGlvbiBpc05hdGl2ZUJsb2IocCkge1xyXG4gICAgcmV0dXJuIGlzTmF0aXZlQmxvYkRlZmluZWQoKSAmJiBwIGluc3RhbmNlb2YgQmxvYjtcclxufVxyXG5mdW5jdGlvbiBpc05hdGl2ZUJsb2JEZWZpbmVkKCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJztcclxufVxyXG5mdW5jdGlvbiB2YWxpZGF0ZU51bWJlcihhcmd1bWVudCwgbWluVmFsdWUsIG1heFZhbHVlLCB2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlIDwgbWluVmFsdWUpIHtcclxuICAgICAgICB0aHJvdyBpbnZhbGlkQXJndW1lbnQoYEludmFsaWQgdmFsdWUgZm9yICcke2FyZ3VtZW50fScuIEV4cGVjdGVkICR7bWluVmFsdWV9IG9yIGdyZWF0ZXIuYCk7XHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWUgPiBtYXhWYWx1ZSkge1xyXG4gICAgICAgIHRocm93IGludmFsaWRBcmd1bWVudChgSW52YWxpZCB2YWx1ZSBmb3IgJyR7YXJndW1lbnR9Jy4gRXhwZWN0ZWQgJHttYXhWYWx1ZX0gb3IgbGVzcy5gKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBtYWtlVXJsKHVybFBhcnQsIGhvc3QsIHByb3RvY29sKSB7XHJcbiAgICBsZXQgb3JpZ2luID0gaG9zdDtcclxuICAgIGlmIChwcm90b2NvbCA9PSBudWxsKSB7XHJcbiAgICAgICAgb3JpZ2luID0gYGh0dHBzOi8vJHtob3N0fWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYCR7cHJvdG9jb2x9Oi8vJHtvcmlnaW59L3YwJHt1cmxQYXJ0fWA7XHJcbn1cclxuZnVuY3Rpb24gbWFrZVF1ZXJ5U3RyaW5nKHBhcmFtcykge1xyXG4gICAgY29uc3QgZW5jb2RlID0gZW5jb2RlVVJJQ29tcG9uZW50O1xyXG4gICAgbGV0IHF1ZXJ5UGFydCA9ICc/JztcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHBhcmFtcykge1xyXG4gICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0UGFydCA9IGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHBhcmFtc1trZXldKTtcclxuICAgICAgICAgICAgcXVlcnlQYXJ0ID0gcXVlcnlQYXJ0ICsgbmV4dFBhcnQgKyAnJic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQ2hvcCBvZmYgdGhlIGV4dHJhICcmJyBvciAnPycgb24gdGhlIGVuZFxyXG4gICAgcXVlcnlQYXJ0ID0gcXVlcnlQYXJ0LnNsaWNlKDAsIC0xKTtcclxuICAgIHJldHVybiBxdWVyeVBhcnQ7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIEVycm9yIGNvZGVzIGZvciByZXF1ZXN0cyBtYWRlIGJ5IHRoZSB0aGUgWGhySW8gd3JhcHBlci5cclxuICovXHJcbnZhciBFcnJvckNvZGU7XHJcbihmdW5jdGlvbiAoRXJyb3JDb2RlKSB7XHJcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiTk9fRVJST1JcIl0gPSAwXSA9IFwiTk9fRVJST1JcIjtcclxuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJORVRXT1JLX0VSUk9SXCJdID0gMV0gPSBcIk5FVFdPUktfRVJST1JcIjtcclxuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJBQk9SVFwiXSA9IDJdID0gXCJBQk9SVFwiO1xyXG59KShFcnJvckNvZGUgfHwgKEVycm9yQ29kZSA9IHt9KSk7XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBIYW5kbGVzIG5ldHdvcmsgbG9naWMgZm9yIGFsbCBTdG9yYWdlIFJlcXVlc3RzLCBpbmNsdWRpbmcgZXJyb3IgcmVwb3J0aW5nIGFuZFxyXG4gKiByZXRyaWVzIHdpdGggYmFja29mZi5cclxuICpcclxuICogQHBhcmFtIEkgLSB0aGUgdHlwZSBvZiB0aGUgYmFja2VuZCdzIG5ldHdvcmsgcmVzcG9uc2UuXHJcbiAqIEBwYXJhbSAtIE8gdGhlIG91dHB1dCB0eXBlIHVzZWQgYnkgdGhlIHJlc3Qgb2YgdGhlIFNESy4gVGhlIGNvbnZlcnNpb25cclxuICogaGFwcGVucyBpbiB0aGUgc3BlY2lmaWVkIGBjYWxsYmFja19gLlxyXG4gKi9cclxuY2xhc3MgTmV0d29ya1JlcXVlc3Qge1xyXG4gICAgY29uc3RydWN0b3IodXJsXywgbWV0aG9kXywgaGVhZGVyc18sIGJvZHlfLCBzdWNjZXNzQ29kZXNfLCBhZGRpdGlvbmFsUmV0cnlDb2Rlc18sIGNhbGxiYWNrXywgZXJyb3JDYWxsYmFja18sIHRpbWVvdXRfLCBwcm9ncmVzc0NhbGxiYWNrXywgY29ubmVjdGlvbkZhY3RvcnlfKSB7XHJcbiAgICAgICAgdGhpcy51cmxfID0gdXJsXztcclxuICAgICAgICB0aGlzLm1ldGhvZF8gPSBtZXRob2RfO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyc18gPSBoZWFkZXJzXztcclxuICAgICAgICB0aGlzLmJvZHlfID0gYm9keV87XHJcbiAgICAgICAgdGhpcy5zdWNjZXNzQ29kZXNfID0gc3VjY2Vzc0NvZGVzXztcclxuICAgICAgICB0aGlzLmFkZGl0aW9uYWxSZXRyeUNvZGVzXyA9IGFkZGl0aW9uYWxSZXRyeUNvZGVzXztcclxuICAgICAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrXztcclxuICAgICAgICB0aGlzLmVycm9yQ2FsbGJhY2tfID0gZXJyb3JDYWxsYmFja187XHJcbiAgICAgICAgdGhpcy50aW1lb3V0XyA9IHRpbWVvdXRfO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NDYWxsYmFja18gPSBwcm9ncmVzc0NhbGxiYWNrXztcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25GYWN0b3J5XyA9IGNvbm5lY3Rpb25GYWN0b3J5XztcclxuICAgICAgICB0aGlzLnBlbmRpbmdDb25uZWN0aW9uXyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5iYWNrb2ZmSWRfID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNhbmNlbGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXBwRGVsZXRlXyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJvbWlzZV8gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZV8gPSByZXNvbHZlO1xyXG4gICAgICAgICAgICB0aGlzLnJlamVjdF8gPSByZWplY3Q7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRfKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFjdHVhbGx5IHN0YXJ0cyB0aGUgcmV0cnkgbG9vcC5cclxuICAgICAqL1xyXG4gICAgc3RhcnRfKCkge1xyXG4gICAgICAgIGNvbnN0IGRvVGhlUmVxdWVzdCA9IChiYWNrb2ZmQ2FsbGJhY2ssIGNhbmNlbGVkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYW5jZWxlZCkge1xyXG4gICAgICAgICAgICAgICAgYmFja29mZkNhbGxiYWNrKGZhbHNlLCBuZXcgUmVxdWVzdEVuZFN0YXR1cyhmYWxzZSwgbnVsbCwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSB0aGlzLmNvbm5lY3Rpb25GYWN0b3J5XygpO1xyXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdDb25uZWN0aW9uXyA9IGNvbm5lY3Rpb247XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzTGlzdGVuZXIgPSBwcm9ncmVzc0V2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRlZCA9IHByb2dyZXNzRXZlbnQubG9hZGVkO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSBwcm9ncmVzc0V2ZW50Lmxlbmd0aENvbXB1dGFibGVcclxuICAgICAgICAgICAgICAgICAgICA/IHByb2dyZXNzRXZlbnQudG90YWxcclxuICAgICAgICAgICAgICAgICAgICA6IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NDYWxsYmFja18gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQ2FsbGJhY2tfKGxvYWRlZCwgdG90YWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0NhbGxiYWNrXyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5hZGRVcGxvYWRQcm9ncmVzc0xpc3RlbmVyKHByb2dyZXNzTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbm5lY3Rpb24uc2VuZCgpIG5ldmVyIHJlamVjdHMsIHNvIHdlIGRvbid0IG5lZWQgdG8gaGF2ZSBhIGVycm9yIGhhbmRsZXIgb3IgdXNlIGNhdGNoIG9uIHRoZSByZXR1cm5lZCBwcm9taXNlLlxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWZsb2F0aW5nLXByb21pc2VzXHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb25cclxuICAgICAgICAgICAgICAgIC5zZW5kKHRoaXMudXJsXywgdGhpcy5tZXRob2RfLCB0aGlzLmJvZHlfLCB0aGlzLmhlYWRlcnNfKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NDYWxsYmFja18gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnJlbW92ZVVwbG9hZFByb2dyZXNzTGlzdGVuZXIocHJvZ3Jlc3NMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdDb25uZWN0aW9uXyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRTZXJ2ZXIgPSBjb25uZWN0aW9uLmdldEVycm9yQ29kZSgpID09PSBFcnJvckNvZGUuTk9fRVJST1I7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBjb25uZWN0aW9uLmdldFN0YXR1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoaXRTZXJ2ZXIgfHwgdGhpcy5pc1JldHJ5U3RhdHVzQ29kZV8oc3RhdHVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdhc0NhbmNlbGVkID0gY29ubmVjdGlvbi5nZXRFcnJvckNvZGUoKSA9PT0gRXJyb3JDb2RlLkFCT1JUO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tvZmZDYWxsYmFjayhmYWxzZSwgbmV3IFJlcXVlc3RFbmRTdGF0dXMoZmFsc2UsIG51bGwsIHdhc0NhbmNlbGVkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VjY2Vzc0NvZGUgPSB0aGlzLnN1Y2Nlc3NDb2Rlc18uaW5kZXhPZihzdGF0dXMpICE9PSAtMTtcclxuICAgICAgICAgICAgICAgIGJhY2tvZmZDYWxsYmFjayh0cnVlLCBuZXcgUmVxdWVzdEVuZFN0YXR1cyhzdWNjZXNzQ29kZSwgY29ubmVjdGlvbikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSByZXF1ZXN0V2VudFRocm91Z2ggLSBUcnVlIGlmIHRoZSByZXF1ZXN0IGV2ZW50dWFsbHkgd2VudFxyXG4gICAgICAgICAqICAgICB0aHJvdWdoLCBmYWxzZSBpZiBpdCBoaXQgdGhlIHJldHJ5IGxpbWl0IG9yIHdhcyBjYW5jZWxlZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdCBiYWNrb2ZmRG9uZSA9IChyZXF1ZXN0V2VudFRocm91Z2gsIHN0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXNvbHZlID0gdGhpcy5yZXNvbHZlXztcclxuICAgICAgICAgICAgY29uc3QgcmVqZWN0ID0gdGhpcy5yZWplY3RfO1xyXG4gICAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gc3RhdHVzLmNvbm5lY3Rpb247XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMud2FzU3VjY2Vzc0NvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jYWxsYmFja18oY29ubmVjdGlvbiwgY29ubmVjdGlvbi5nZXRSZXNwb25zZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNKdXN0RGVmKHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSB1bmtub3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyLnNlcnZlclJlc3BvbnNlID0gY29ubmVjdGlvbi5nZXRFcnJvclRleHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lcnJvckNhbGxiYWNrXykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QodGhpcy5lcnJvckNhbGxiYWNrXyhjb25uZWN0aW9uLCBlcnIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMuY2FuY2VsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyID0gdGhpcy5hcHBEZWxldGVfID8gYXBwRGVsZXRlZCgpIDogY2FuY2VsZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSByZXRyeUxpbWl0RXhjZWVkZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodGhpcy5jYW5jZWxlZF8pIHtcclxuICAgICAgICAgICAgYmFja29mZkRvbmUoZmFsc2UsIG5ldyBSZXF1ZXN0RW5kU3RhdHVzKGZhbHNlLCBudWxsLCB0cnVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJhY2tvZmZJZF8gPSBzdGFydChkb1RoZVJlcXVlc3QsIGJhY2tvZmZEb25lLCB0aGlzLnRpbWVvdXRfKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIGdldFByb21pc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZV87XHJcbiAgICB9XHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIGNhbmNlbChhcHBEZWxldGUpIHtcclxuICAgICAgICB0aGlzLmNhbmNlbGVkXyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hcHBEZWxldGVfID0gYXBwRGVsZXRlIHx8IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmJhY2tvZmZJZF8gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgc3RvcCh0aGlzLmJhY2tvZmZJZF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wZW5kaW5nQ29ubmVjdGlvbl8gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nQ29ubmVjdGlvbl8uYWJvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpc1JldHJ5U3RhdHVzQ29kZV8oc3RhdHVzKSB7XHJcbiAgICAgICAgLy8gVGhlIGNvZGVzIGZvciB3aGljaCB0byByZXRyeSBjYW1lIGZyb20gdGhpcyBwYWdlOlxyXG4gICAgICAgIC8vIGh0dHBzOi8vY2xvdWQuZ29vZ2xlLmNvbS9zdG9yYWdlL2RvY3MvZXhwb25lbnRpYWwtYmFja29mZlxyXG4gICAgICAgIGNvbnN0IGlzRml2ZUh1bmRyZWRDb2RlID0gc3RhdHVzID49IDUwMCAmJiBzdGF0dXMgPCA2MDA7XHJcbiAgICAgICAgY29uc3QgZXh0cmFSZXRyeUNvZGVzID0gW1xyXG4gICAgICAgICAgICAvLyBSZXF1ZXN0IFRpbWVvdXQ6IHdlYiBzZXJ2ZXIgZGlkbid0IHJlY2VpdmUgZnVsbCByZXF1ZXN0IGluIHRpbWUuXHJcbiAgICAgICAgICAgIDQwOCxcclxuICAgICAgICAgICAgLy8gVG9vIE1hbnkgUmVxdWVzdHM6IHlvdSdyZSBnZXR0aW5nIHJhdGUtbGltaXRlZCwgYmFzaWNhbGx5LlxyXG4gICAgICAgICAgICA0MjlcclxuICAgICAgICBdO1xyXG4gICAgICAgIGNvbnN0IGlzRXh0cmFSZXRyeUNvZGUgPSBleHRyYVJldHJ5Q29kZXMuaW5kZXhPZihzdGF0dXMpICE9PSAtMTtcclxuICAgICAgICBjb25zdCBpc1JlcXVlc3RTcGVjaWZpY1JldHJ5Q29kZSA9IHRoaXMuYWRkaXRpb25hbFJldHJ5Q29kZXNfLmluZGV4T2Yoc3RhdHVzKSAhPT0gLTE7XHJcbiAgICAgICAgcmV0dXJuIGlzRml2ZUh1bmRyZWRDb2RlIHx8IGlzRXh0cmFSZXRyeUNvZGUgfHwgaXNSZXF1ZXN0U3BlY2lmaWNSZXRyeUNvZGU7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIEEgY29sbGVjdGlvbiBvZiBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVzdWx0IG9mIGEgbmV0d29yayByZXF1ZXN0LlxyXG4gKiBAcGFyYW0gb3B0X2NhbmNlbGVkIC0gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAqL1xyXG5jbGFzcyBSZXF1ZXN0RW5kU3RhdHVzIHtcclxuICAgIGNvbnN0cnVjdG9yKHdhc1N1Y2Nlc3NDb2RlLCBjb25uZWN0aW9uLCBjYW5jZWxlZCkge1xyXG4gICAgICAgIHRoaXMud2FzU3VjY2Vzc0NvZGUgPSB3YXNTdWNjZXNzQ29kZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsZWQgPSAhIWNhbmNlbGVkO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGFkZEF1dGhIZWFkZXJfKGhlYWRlcnMsIGF1dGhUb2tlbikge1xyXG4gICAgaWYgKGF1dGhUb2tlbiAhPT0gbnVsbCAmJiBhdXRoVG9rZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9ICdGaXJlYmFzZSAnICsgYXV0aFRva2VuO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGFkZFZlcnNpb25IZWFkZXJfKGhlYWRlcnMsIGZpcmViYXNlVmVyc2lvbikge1xyXG4gICAgaGVhZGVyc1snWC1GaXJlYmFzZS1TdG9yYWdlLVZlcnNpb24nXSA9XHJcbiAgICAgICAgJ3dlYmpzLycgKyAoZmlyZWJhc2VWZXJzaW9uICE9PSBudWxsICYmIGZpcmViYXNlVmVyc2lvbiAhPT0gdm9pZCAwID8gZmlyZWJhc2VWZXJzaW9uIDogJ0FwcE1hbmFnZXInKTtcclxufVxyXG5mdW5jdGlvbiBhZGRHbXBpZEhlYWRlcl8oaGVhZGVycywgYXBwSWQpIHtcclxuICAgIGlmIChhcHBJZCkge1xyXG4gICAgICAgIGhlYWRlcnNbJ1gtRmlyZWJhc2UtR01QSUQnXSA9IGFwcElkO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGFkZEFwcENoZWNrSGVhZGVyXyhoZWFkZXJzLCBhcHBDaGVja1Rva2VuKSB7XHJcbiAgICBpZiAoYXBwQ2hlY2tUb2tlbiAhPT0gbnVsbCkge1xyXG4gICAgICAgIGhlYWRlcnNbJ1gtRmlyZWJhc2UtQXBwQ2hlY2snXSA9IGFwcENoZWNrVG9rZW47XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbWFrZVJlcXVlc3QocmVxdWVzdEluZm8sIGFwcElkLCBhdXRoVG9rZW4sIGFwcENoZWNrVG9rZW4sIHJlcXVlc3RGYWN0b3J5LCBmaXJlYmFzZVZlcnNpb24pIHtcclxuICAgIGNvbnN0IHF1ZXJ5UGFydCA9IG1ha2VRdWVyeVN0cmluZyhyZXF1ZXN0SW5mby51cmxQYXJhbXMpO1xyXG4gICAgY29uc3QgdXJsID0gcmVxdWVzdEluZm8udXJsICsgcXVlcnlQYXJ0O1xyXG4gICAgY29uc3QgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIHJlcXVlc3RJbmZvLmhlYWRlcnMpO1xyXG4gICAgYWRkR21waWRIZWFkZXJfKGhlYWRlcnMsIGFwcElkKTtcclxuICAgIGFkZEF1dGhIZWFkZXJfKGhlYWRlcnMsIGF1dGhUb2tlbik7XHJcbiAgICBhZGRWZXJzaW9uSGVhZGVyXyhoZWFkZXJzLCBmaXJlYmFzZVZlcnNpb24pO1xyXG4gICAgYWRkQXBwQ2hlY2tIZWFkZXJfKGhlYWRlcnMsIGFwcENoZWNrVG9rZW4pO1xyXG4gICAgcmV0dXJuIG5ldyBOZXR3b3JrUmVxdWVzdCh1cmwsIHJlcXVlc3RJbmZvLm1ldGhvZCwgaGVhZGVycywgcmVxdWVzdEluZm8uYm9keSwgcmVxdWVzdEluZm8uc3VjY2Vzc0NvZGVzLCByZXF1ZXN0SW5mby5hZGRpdGlvbmFsUmV0cnlDb2RlcywgcmVxdWVzdEluZm8uaGFuZGxlciwgcmVxdWVzdEluZm8uZXJyb3JIYW5kbGVyLCByZXF1ZXN0SW5mby50aW1lb3V0LCByZXF1ZXN0SW5mby5wcm9ncmVzc0NhbGxiYWNrLCByZXF1ZXN0RmFjdG9yeSk7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QmxvYkJ1aWxkZXIoKSB7XHJcbiAgICBpZiAodHlwZW9mIEJsb2JCdWlsZGVyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBCbG9iQnVpbGRlcjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBXZWJLaXRCbG9iQnVpbGRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gV2ViS2l0QmxvYkJ1aWxkZXI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBDb25jYXRlbmF0ZXMgb25lIG9yIG1vcmUgdmFsdWVzIHRvZ2V0aGVyIGFuZCBjb252ZXJ0cyB0aGVtIHRvIGEgQmxvYi5cclxuICpcclxuICogQHBhcmFtIGFyZ3MgVGhlIHZhbHVlcyB0aGF0IHdpbGwgbWFrZSB1cCB0aGUgcmVzdWx0aW5nIGJsb2IuXHJcbiAqIEByZXR1cm4gVGhlIGJsb2IuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCbG9iJDEoLi4uYXJncykge1xyXG4gICAgY29uc3QgQmxvYkJ1aWxkZXIgPSBnZXRCbG9iQnVpbGRlcigpO1xyXG4gICAgaWYgKEJsb2JCdWlsZGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBiYiA9IG5ldyBCbG9iQnVpbGRlcigpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBiYi5hcHBlbmQoYXJnc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiYi5nZXRCbG9iKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoaXNOYXRpdmVCbG9iRGVmaW5lZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmxvYihhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBTdG9yYWdlRXJyb3IoXCJ1bnN1cHBvcnRlZC1lbnZpcm9ubWVudFwiIC8qIFVOU1VQUE9SVEVEX0VOVklST05NRU5UICovLCBcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHNlZW0gdG8gc3VwcG9ydCBjcmVhdGluZyBCbG9ic1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFNsaWNlcyB0aGUgYmxvYi4gVGhlIHJldHVybmVkIGJsb2IgY29udGFpbnMgZGF0YSBmcm9tIHRoZSBzdGFydCBieXRlXHJcbiAqIChpbmNsdXNpdmUpIHRpbGwgdGhlIGVuZCBieXRlIChleGNsdXNpdmUpLiBOZWdhdGl2ZSBpbmRpY2VzIGNhbm5vdCBiZSB1c2VkLlxyXG4gKlxyXG4gKiBAcGFyYW0gYmxvYiBUaGUgYmxvYiB0byBiZSBzbGljZWQuXHJcbiAqIEBwYXJhbSBzdGFydCBJbmRleCBvZiB0aGUgc3RhcnRpbmcgYnl0ZS5cclxuICogQHBhcmFtIGVuZCBJbmRleCBvZiB0aGUgZW5kaW5nIGJ5dGUuXHJcbiAqIEByZXR1cm4gVGhlIGJsb2Igc2xpY2Ugb3IgbnVsbCBpZiBub3Qgc3VwcG9ydGVkLlxyXG4gKi9cclxuZnVuY3Rpb24gc2xpY2VCbG9iKGJsb2IsIHN0YXJ0LCBlbmQpIHtcclxuICAgIGlmIChibG9iLndlYmtpdFNsaWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGJsb2Iud2Via2l0U2xpY2Uoc3RhcnQsIGVuZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChibG9iLm1velNsaWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGJsb2IubW96U2xpY2Uoc3RhcnQsIGVuZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChibG9iLnNsaWNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGJsb2Iuc2xpY2Uoc3RhcnQsIGVuZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKiogQ29udmVydHMgYSBCYXNlNjQgZW5jb2RlZCBzdHJpbmcgdG8gYSBiaW5hcnkgc3RyaW5nLiAqL1xyXG5mdW5jdGlvbiBkZWNvZGVCYXNlNjQoZW5jb2RlZCkge1xyXG4gICAgcmV0dXJuIGF0b2IoZW5jb2RlZCk7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIEFuIGVudW1lcmF0aW9uIG9mIHRoZSBwb3NzaWJsZSBzdHJpbmcgZm9ybWF0cyBmb3IgdXBsb2FkLlxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5jb25zdCBTdHJpbmdGb3JtYXQgPSB7XHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB0aGUgc3RyaW5nIHNob3VsZCBiZSBpbnRlcnByZXRlZCBcInJhd1wiLCB0aGF0IGlzLCBhcyBub3JtYWwgdGV4dC5cclxuICAgICAqIFRoZSBzdHJpbmcgd2lsbCBiZSBpbnRlcnByZXRlZCBhcyBVVEYtMTYsIHRoZW4gdXBsb2FkZWQgYXMgYSBVVEYtOCBieXRlXHJcbiAgICAgKiBzZXF1ZW5jZS5cclxuICAgICAqIEV4YW1wbGU6IFRoZSBzdHJpbmcgJ0hlbGxvISBcXFxcdWQ4M2RcXFxcdWRlMGEnIGJlY29tZXMgdGhlIGJ5dGUgc2VxdWVuY2VcclxuICAgICAqIDQ4IDY1IDZjIDZjIDZmIDIxIDIwIGYwIDlmIDk4IDhhXHJcbiAgICAgKi9cclxuICAgIFJBVzogJ3JhdycsXHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB0aGUgc3RyaW5nIHNob3VsZCBiZSBpbnRlcnByZXRlZCBhcyBiYXNlNjQtZW5jb2RlZCBkYXRhLlxyXG4gICAgICogUGFkZGluZyBjaGFyYWN0ZXJzICh0cmFpbGluZyAnPSdzKSBhcmUgb3B0aW9uYWwuXHJcbiAgICAgKiBFeGFtcGxlOiBUaGUgc3RyaW5nICdyV21PKytFNnQ3L3Jsdz09JyBiZWNvbWVzIHRoZSBieXRlIHNlcXVlbmNlXHJcbiAgICAgKiBhZCA2OSA4ZSBmYiBlMSAzYSBiNyBiZiBlYiA5N1xyXG4gICAgICovXHJcbiAgICBCQVNFNjQ6ICdiYXNlNjQnLFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIHN0cmluZyBzaG91bGQgYmUgaW50ZXJwcmV0ZWQgYXMgYmFzZTY0dXJsLWVuY29kZWQgZGF0YS5cclxuICAgICAqIFBhZGRpbmcgY2hhcmFjdGVycyAodHJhaWxpbmcgJz0ncykgYXJlIG9wdGlvbmFsLlxyXG4gICAgICogRXhhbXBsZTogVGhlIHN0cmluZyAncldtTy0tRTZ0N19ybHc9PScgYmVjb21lcyB0aGUgYnl0ZSBzZXF1ZW5jZVxyXG4gICAgICogYWQgNjkgOGUgZmIgZTEgM2EgYjcgYmYgZWIgOTdcclxuICAgICAqL1xyXG4gICAgQkFTRTY0VVJMOiAnYmFzZTY0dXJsJyxcclxuICAgIC8qKlxyXG4gICAgICogSW5kaWNhdGVzIHRoZSBzdHJpbmcgaXMgYSBkYXRhIFVSTCwgc3VjaCBhcyBvbmUgb2J0YWluZWQgZnJvbVxyXG4gICAgICogY2FudmFzLnRvRGF0YVVSTCgpLlxyXG4gICAgICogRXhhbXBsZTogdGhlIHN0cmluZyAnZGF0YTphcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07YmFzZTY0LGFhYWEnXHJcbiAgICAgKiBiZWNvbWVzIHRoZSBieXRlIHNlcXVlbmNlXHJcbiAgICAgKiA2OSBhNiA5YVxyXG4gICAgICogKHRoZSBjb250ZW50LXR5cGUgXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIiBpcyBhbHNvIGFwcGxpZWQsIGJ1dCBjYW5cclxuICAgICAqIGJlIG92ZXJyaWRkZW4gaW4gdGhlIG1ldGFkYXRhIG9iamVjdCkuXHJcbiAgICAgKi9cclxuICAgIERBVEFfVVJMOiAnZGF0YV91cmwnXHJcbn07XHJcbmNsYXNzIFN0cmluZ0RhdGEge1xyXG4gICAgY29uc3RydWN0b3IoZGF0YSwgY29udGVudFR5cGUpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuY29udGVudFR5cGUgPSBjb250ZW50VHlwZSB8fCBudWxsO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmZ1bmN0aW9uIGRhdGFGcm9tU3RyaW5nKGZvcm1hdCwgc3RyaW5nRGF0YSkge1xyXG4gICAgc3dpdGNoIChmb3JtYXQpIHtcclxuICAgICAgICBjYXNlIFN0cmluZ0Zvcm1hdC5SQVc6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3RyaW5nRGF0YSh1dGY4Qnl0ZXNfKHN0cmluZ0RhdGEpKTtcclxuICAgICAgICBjYXNlIFN0cmluZ0Zvcm1hdC5CQVNFNjQ6XHJcbiAgICAgICAgY2FzZSBTdHJpbmdGb3JtYXQuQkFTRTY0VVJMOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN0cmluZ0RhdGEoYmFzZTY0Qnl0ZXNfKGZvcm1hdCwgc3RyaW5nRGF0YSkpO1xyXG4gICAgICAgIGNhc2UgU3RyaW5nRm9ybWF0LkRBVEFfVVJMOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN0cmluZ0RhdGEoZGF0YVVSTEJ5dGVzXyhzdHJpbmdEYXRhKSwgZGF0YVVSTENvbnRlbnRUeXBlXyhzdHJpbmdEYXRhKSk7XHJcbiAgICAgICAgLy8gZG8gbm90aGluZ1xyXG4gICAgfVxyXG4gICAgLy8gYXNzZXJ0KGZhbHNlKTtcclxuICAgIHRocm93IHVua25vd24oKTtcclxufVxyXG5mdW5jdGlvbiB1dGY4Qnl0ZXNfKHZhbHVlKSB7XHJcbiAgICBjb25zdCBiID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGMgPSB2YWx1ZS5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChjIDw9IDEyNykge1xyXG4gICAgICAgICAgICBiLnB1c2goYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoYyA8PSAyMDQ3KSB7XHJcbiAgICAgICAgICAgICAgICBiLnB1c2goMTkyIHwgKGMgPj4gNiksIDEyOCB8IChjICYgNjMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICgoYyAmIDY0NTEyKSA9PT0gNTUyOTYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgc3RhcnQgb2YgYSBzdXJyb2dhdGUgcGFpci5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWxpZCA9IGkgPCB2YWx1ZS5sZW5ndGggLSAxICYmICh2YWx1ZS5jaGFyQ29kZUF0KGkgKyAxKSAmIDY0NTEyKSA9PT0gNTYzMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgc2Vjb25kIHN1cnJvZ2F0ZSB3YXNuJ3QgdGhlcmUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGIucHVzaCgyMzksIDE5MSwgMTg5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpID0gYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG8gPSB2YWx1ZS5jaGFyQ29kZUF0KCsraSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSA2NTUzNiB8ICgoaGkgJiAxMDIzKSA8PCAxMCkgfCAobG8gJiAxMDIzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYi5wdXNoKDI0MCB8IChjID4+IDE4KSwgMTI4IHwgKChjID4+IDEyKSAmIDYzKSwgMTI4IHwgKChjID4+IDYpICYgNjMpLCAxMjggfCAoYyAmIDYzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjICYgNjQ1MTIpID09PSA1NjMyMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIGxvdyBzdXJyb2dhdGUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGIucHVzaCgyMzksIDE5MSwgMTg5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGIucHVzaCgyMjQgfCAoYyA+PiAxMiksIDEyOCB8ICgoYyA+PiA2KSAmIDYzKSwgMTI4IHwgKGMgJiA2MykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgVWludDhBcnJheShiKTtcclxufVxyXG5mdW5jdGlvbiBwZXJjZW50RW5jb2RlZEJ5dGVzXyh2YWx1ZSkge1xyXG4gICAgbGV0IGRlY29kZWQ7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGRlY29kZWQgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aHJvdyBpbnZhbGlkRm9ybWF0KFN0cmluZ0Zvcm1hdC5EQVRBX1VSTCwgJ01hbGZvcm1lZCBkYXRhIFVSTC4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1dGY4Qnl0ZXNfKGRlY29kZWQpO1xyXG59XHJcbmZ1bmN0aW9uIGJhc2U2NEJ5dGVzXyhmb3JtYXQsIHZhbHVlKSB7XHJcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xyXG4gICAgICAgIGNhc2UgU3RyaW5nRm9ybWF0LkJBU0U2NDoge1xyXG4gICAgICAgICAgICBjb25zdCBoYXNNaW51cyA9IHZhbHVlLmluZGV4T2YoJy0nKSAhPT0gLTE7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc1VuZGVyID0gdmFsdWUuaW5kZXhPZignXycpICE9PSAtMTtcclxuICAgICAgICAgICAgaWYgKGhhc01pbnVzIHx8IGhhc1VuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnZhbGlkQ2hhciA9IGhhc01pbnVzID8gJy0nIDogJ18nO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgaW52YWxpZEZvcm1hdChmb3JtYXQsIFwiSW52YWxpZCBjaGFyYWN0ZXIgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkQ2hhciArXHJcbiAgICAgICAgICAgICAgICAgICAgXCInIGZvdW5kOiBpcyBpdCBiYXNlNjR1cmwgZW5jb2RlZD9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgU3RyaW5nRm9ybWF0LkJBU0U2NFVSTDoge1xyXG4gICAgICAgICAgICBjb25zdCBoYXNQbHVzID0gdmFsdWUuaW5kZXhPZignKycpICE9PSAtMTtcclxuICAgICAgICAgICAgY29uc3QgaGFzU2xhc2ggPSB2YWx1ZS5pbmRleE9mKCcvJykgIT09IC0xO1xyXG4gICAgICAgICAgICBpZiAoaGFzUGx1cyB8fCBoYXNTbGFzaCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW52YWxpZENoYXIgPSBoYXNQbHVzID8gJysnIDogJy8nO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgaW52YWxpZEZvcm1hdChmb3JtYXQsIFwiSW52YWxpZCBjaGFyYWN0ZXIgJ1wiICsgaW52YWxpZENoYXIgKyBcIicgZm91bmQ6IGlzIGl0IGJhc2U2NCBlbmNvZGVkP1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkbyBub3RoaW5nXHJcbiAgICB9XHJcbiAgICBsZXQgYnl0ZXM7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGJ5dGVzID0gZGVjb2RlQmFzZTY0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgaW52YWxpZEZvcm1hdChmb3JtYXQsICdJbnZhbGlkIGNoYXJhY3RlciBmb3VuZCcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYXJyYXkgPSBuZXcgVWludDhBcnJheShieXRlcy5sZW5ndGgpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFycmF5W2ldID0gYnl0ZXMuY2hhckNvZGVBdChpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJheTtcclxufVxyXG5jbGFzcyBEYXRhVVJMUGFydHMge1xyXG4gICAgY29uc3RydWN0b3IoZGF0YVVSTCkge1xyXG4gICAgICAgIHRoaXMuYmFzZTY0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VHlwZSA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGRhdGFVUkwubWF0Y2goL15kYXRhOihbXixdKyk/LC8pO1xyXG4gICAgICAgIGlmIChtYXRjaGVzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IGludmFsaWRGb3JtYXQoU3RyaW5nRm9ybWF0LkRBVEFfVVJMLCBcIk11c3QgYmUgZm9ybWF0dGVkICdkYXRhOls8bWVkaWF0eXBlPl1bO2Jhc2U2NF0sPGRhdGE+XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtaWRkbGUgPSBtYXRjaGVzWzFdIHx8IG51bGw7XHJcbiAgICAgICAgaWYgKG1pZGRsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFzZTY0ID0gZW5kc1dpdGgobWlkZGxlLCAnO2Jhc2U2NCcpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRUeXBlID0gdGhpcy5iYXNlNjRcclxuICAgICAgICAgICAgICAgID8gbWlkZGxlLnN1YnN0cmluZygwLCBtaWRkbGUubGVuZ3RoIC0gJztiYXNlNjQnLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIDogbWlkZGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc3QgPSBkYXRhVVJMLnN1YnN0cmluZyhkYXRhVVJMLmluZGV4T2YoJywnKSArIDEpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGRhdGFVUkxCeXRlc18oZGF0YVVybCkge1xyXG4gICAgY29uc3QgcGFydHMgPSBuZXcgRGF0YVVSTFBhcnRzKGRhdGFVcmwpO1xyXG4gICAgaWYgKHBhcnRzLmJhc2U2NCkge1xyXG4gICAgICAgIHJldHVybiBiYXNlNjRCeXRlc18oU3RyaW5nRm9ybWF0LkJBU0U2NCwgcGFydHMucmVzdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcGVyY2VudEVuY29kZWRCeXRlc18ocGFydHMucmVzdCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZGF0YVVSTENvbnRlbnRUeXBlXyhkYXRhVXJsKSB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IG5ldyBEYXRhVVJMUGFydHMoZGF0YVVybCk7XHJcbiAgICByZXR1cm4gcGFydHMuY29udGVudFR5cGU7XHJcbn1cclxuZnVuY3Rpb24gZW5kc1dpdGgocywgZW5kKSB7XHJcbiAgICBjb25zdCBsb25nRW5vdWdoID0gcy5sZW5ndGggPj0gZW5kLmxlbmd0aDtcclxuICAgIGlmICghbG9uZ0Vub3VnaCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBzLnN1YnN0cmluZyhzLmxlbmd0aCAtIGVuZC5sZW5ndGgpID09PSBlbmQ7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIEBwYXJhbSBvcHRfZWxpZGVDb3B5IC0gSWYgdHJ1ZSwgZG9lc24ndCBjb3B5IG11dGFibGUgaW5wdXQgZGF0YVxyXG4gKiAgICAgKGUuZy4gVWludDhBcnJheXMpLiBQYXNzIHRydWUgb25seSBpZiB5b3Uga25vdyB0aGUgb2JqZWN0cyB3aWxsIG5vdCBiZVxyXG4gKiAgICAgbW9kaWZpZWQgYWZ0ZXIgdGhpcyBibG9iJ3MgY29uc3RydWN0aW9uLlxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNsYXNzIEZic0Jsb2Ige1xyXG4gICAgY29uc3RydWN0b3IoZGF0YSwgZWxpZGVDb3B5KSB7XHJcbiAgICAgICAgbGV0IHNpemUgPSAwO1xyXG4gICAgICAgIGxldCBibG9iVHlwZSA9ICcnO1xyXG4gICAgICAgIGlmIChpc05hdGl2ZUJsb2IoZGF0YSkpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhXyA9IGRhdGE7XHJcbiAgICAgICAgICAgIHNpemUgPSBkYXRhLnNpemU7XHJcbiAgICAgICAgICAgIGJsb2JUeXBlID0gZGF0YS50eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgICAgaWYgKGVsaWRlQ29weSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhXyA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhXyA9IG5ldyBVaW50OEFycmF5KGRhdGEuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFfLnNldChuZXcgVWludDhBcnJheShkYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2l6ZSA9IHRoaXMuZGF0YV8ubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgICAgICAgICBpZiAoZWxpZGVDb3B5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFfID0gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YV8gPSBuZXcgVWludDhBcnJheShkYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFfLnNldChkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaXplID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2l6ZV8gPSBzaXplO1xyXG4gICAgICAgIHRoaXMudHlwZV8gPSBibG9iVHlwZTtcclxuICAgIH1cclxuICAgIHNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZV87XHJcbiAgICB9XHJcbiAgICB0eXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR5cGVfO1xyXG4gICAgfVxyXG4gICAgc2xpY2Uoc3RhcnRCeXRlLCBlbmRCeXRlKSB7XHJcbiAgICAgICAgaWYgKGlzTmF0aXZlQmxvYih0aGlzLmRhdGFfKSkge1xyXG4gICAgICAgICAgICBjb25zdCByZWFsQmxvYiA9IHRoaXMuZGF0YV87XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZCA9IHNsaWNlQmxvYihyZWFsQmxvYiwgc3RhcnRCeXRlLCBlbmRCeXRlKTtcclxuICAgICAgICAgICAgaWYgKHNsaWNlZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBGYnNCbG9iKHNsaWNlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZSA9IG5ldyBVaW50OEFycmF5KHRoaXMuZGF0YV8uYnVmZmVyLCBzdGFydEJ5dGUsIGVuZEJ5dGUgLSBzdGFydEJ5dGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEZic0Jsb2Ioc2xpY2UsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRCbG9iKC4uLmFyZ3MpIHtcclxuICAgICAgICBpZiAoaXNOYXRpdmVCbG9iRGVmaW5lZCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJsb2JieSA9IGFyZ3MubWFwKCh2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBGYnNCbG9iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5kYXRhXztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEZic0Jsb2IoZ2V0QmxvYiQxLmFwcGx5KG51bGwsIGJsb2JieSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdWludDhBcnJheXMgPSBhcmdzLm1hcCgodmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJpbmcodmFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhRnJvbVN0cmluZyhTdHJpbmdGb3JtYXQuUkFXLCB2YWwpLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBCbG9icyBkb24ndCBleGlzdCwgc28gdGhpcyBoYXMgdG8gYmUgYSBVaW50OEFycmF5LlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwuZGF0YV87XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgZmluYWxMZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB1aW50OEFycmF5cy5mb3JFYWNoKChhcnJheSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmluYWxMZW5ndGggKz0gYXJyYXkuYnl0ZUxlbmd0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IG5ldyBVaW50OEFycmF5KGZpbmFsTGVuZ3RoKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgdWludDhBcnJheXMuZm9yRWFjaCgoYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXJnZWRbaW5kZXgrK10gPSBhcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmJzQmxvYihtZXJnZWQsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwbG9hZERhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YV87XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIE9iamVjdCByZXN1bHRpbmcgZnJvbSBwYXJzaW5nIHRoZSBnaXZlbiBKU09OLCBvciBudWxsIGlmIHRoZVxyXG4gKiBnaXZlbiBzdHJpbmcgZG9lcyBub3QgcmVwcmVzZW50IGEgSlNPTiBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBqc29uT2JqZWN0T3JOdWxsKHMpIHtcclxuICAgIGxldCBvYmo7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIG9iaiA9IEpTT04ucGFyc2Uocyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzTm9uQXJyYXlPYmplY3Qob2JqKSkge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogQGZpbGVvdmVydmlldyBDb250YWlucyBoZWxwZXIgbWV0aG9kcyBmb3IgbWFuaXB1bGF0aW5nIHBhdGhzLlxyXG4gKi9cclxuLyoqXHJcbiAqIEByZXR1cm4gTnVsbCBpZiB0aGUgcGF0aCBpcyBhbHJlYWR5IGF0IHRoZSByb290LlxyXG4gKi9cclxuZnVuY3Rpb24gcGFyZW50KHBhdGgpIHtcclxuICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW5kZXggPSBwYXRoLmxhc3RJbmRleE9mKCcvJyk7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbmV3UGF0aCA9IHBhdGguc2xpY2UoMCwgaW5kZXgpO1xyXG4gICAgcmV0dXJuIG5ld1BhdGg7XHJcbn1cclxuZnVuY3Rpb24gY2hpbGQocGF0aCwgY2hpbGRQYXRoKSB7XHJcbiAgICBjb25zdCBjYW5vbmljYWxDaGlsZFBhdGggPSBjaGlsZFBhdGhcclxuICAgICAgICAuc3BsaXQoJy8nKVxyXG4gICAgICAgIC5maWx0ZXIoY29tcG9uZW50ID0+IGNvbXBvbmVudC5sZW5ndGggPiAwKVxyXG4gICAgICAgIC5qb2luKCcvJyk7XHJcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gY2Fub25pY2FsQ2hpbGRQYXRoO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGggKyAnLycgKyBjYW5vbmljYWxDaGlsZFBhdGg7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGxhc3QgY29tcG9uZW50IG9mIGEgcGF0aC5cclxuICogJy9mb28vYmFyJyAtPiAnYmFyJ1xyXG4gKiAnL2Zvby9iYXIvYmF6LycgLT4gJ2Jhei8nXHJcbiAqICcvYScgLT4gJ2EnXHJcbiAqL1xyXG5mdW5jdGlvbiBsYXN0Q29tcG9uZW50KHBhdGgpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZignLycsIHBhdGgubGVuZ3RoIC0gMik7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGg7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5zbGljZShpbmRleCArIDEpO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmZ1bmN0aW9uIG5vWGZvcm1fKG1ldGFkYXRhLCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmNsYXNzIE1hcHBpbmcge1xyXG4gICAgY29uc3RydWN0b3Ioc2VydmVyLCBsb2NhbCwgd3JpdGFibGUsIHhmb3JtKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XHJcbiAgICAgICAgdGhpcy5sb2NhbCA9IGxvY2FsIHx8IHNlcnZlcjtcclxuICAgICAgICB0aGlzLndyaXRhYmxlID0gISF3cml0YWJsZTtcclxuICAgICAgICB0aGlzLnhmb3JtID0geGZvcm0gfHwgbm9YZm9ybV87XHJcbiAgICB9XHJcbn1cclxubGV0IG1hcHBpbmdzXyA9IG51bGw7XHJcbmZ1bmN0aW9uIHhmb3JtUGF0aChmdWxsUGF0aCkge1xyXG4gICAgaWYgKCFpc1N0cmluZyhmdWxsUGF0aCkgfHwgZnVsbFBhdGgubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIHJldHVybiBmdWxsUGF0aDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBsYXN0Q29tcG9uZW50KGZ1bGxQYXRoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXRNYXBwaW5ncygpIHtcclxuICAgIGlmIChtYXBwaW5nc18pIHtcclxuICAgICAgICByZXR1cm4gbWFwcGluZ3NfO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWFwcGluZ3MgPSBbXTtcclxuICAgIG1hcHBpbmdzLnB1c2gobmV3IE1hcHBpbmcoJ2J1Y2tldCcpKTtcclxuICAgIG1hcHBpbmdzLnB1c2gobmV3IE1hcHBpbmcoJ2dlbmVyYXRpb24nKSk7XHJcbiAgICBtYXBwaW5ncy5wdXNoKG5ldyBNYXBwaW5nKCdtZXRhZ2VuZXJhdGlvbicpKTtcclxuICAgIG1hcHBpbmdzLnB1c2gobmV3IE1hcHBpbmcoJ25hbWUnLCAnZnVsbFBhdGgnLCB0cnVlKSk7XHJcbiAgICBmdW5jdGlvbiBtYXBwaW5nc1hmb3JtUGF0aChfbWV0YWRhdGEsIGZ1bGxQYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHhmb3JtUGF0aChmdWxsUGF0aCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBuYW1lTWFwcGluZyA9IG5ldyBNYXBwaW5nKCduYW1lJyk7XHJcbiAgICBuYW1lTWFwcGluZy54Zm9ybSA9IG1hcHBpbmdzWGZvcm1QYXRoO1xyXG4gICAgbWFwcGluZ3MucHVzaChuYW1lTWFwcGluZyk7XHJcbiAgICAvKipcclxuICAgICAqIENvZXJjZXMgdGhlIHNlY29uZCBwYXJhbSB0byBhIG51bWJlciwgaWYgaXQgaXMgZGVmaW5lZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24geGZvcm1TaXplKF9tZXRhZGF0YSwgc2l6ZSkge1xyXG4gICAgICAgIGlmIChzaXplICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE51bWJlcihzaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHNpemVNYXBwaW5nID0gbmV3IE1hcHBpbmcoJ3NpemUnKTtcclxuICAgIHNpemVNYXBwaW5nLnhmb3JtID0geGZvcm1TaXplO1xyXG4gICAgbWFwcGluZ3MucHVzaChzaXplTWFwcGluZyk7XHJcbiAgICBtYXBwaW5ncy5wdXNoKG5ldyBNYXBwaW5nKCd0aW1lQ3JlYXRlZCcpKTtcclxuICAgIG1hcHBpbmdzLnB1c2gobmV3IE1hcHBpbmcoJ3VwZGF0ZWQnKSk7XHJcbiAgICBtYXBwaW5ncy5wdXNoKG5ldyBNYXBwaW5nKCdtZDVIYXNoJywgbnVsbCwgdHJ1ZSkpO1xyXG4gICAgbWFwcGluZ3MucHVzaChuZXcgTWFwcGluZygnY2FjaGVDb250cm9sJywgbnVsbCwgdHJ1ZSkpO1xyXG4gICAgbWFwcGluZ3MucHVzaChuZXcgTWFwcGluZygnY29udGVudERpc3Bvc2l0aW9uJywgbnVsbCwgdHJ1ZSkpO1xyXG4gICAgbWFwcGluZ3MucHVzaChuZXcgTWFwcGluZygnY29udGVudEVuY29kaW5nJywgbnVsbCwgdHJ1ZSkpO1xyXG4gICAgbWFwcGluZ3MucHVzaChuZXcgTWFwcGluZygnY29udGVudExhbmd1YWdlJywgbnVsbCwgdHJ1ZSkpO1xyXG4gICAgbWFwcGluZ3MucHVzaChuZXcgTWFwcGluZygnY29udGVudFR5cGUnLCBudWxsLCB0cnVlKSk7XHJcbiAgICBtYXBwaW5ncy5wdXNoKG5ldyBNYXBwaW5nKCdtZXRhZGF0YScsICdjdXN0b21NZXRhZGF0YScsIHRydWUpKTtcclxuICAgIG1hcHBpbmdzXyA9IG1hcHBpbmdzO1xyXG4gICAgcmV0dXJuIG1hcHBpbmdzXztcclxufVxyXG5mdW5jdGlvbiBhZGRSZWYobWV0YWRhdGEsIHNlcnZpY2UpIHtcclxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlUmVmKCkge1xyXG4gICAgICAgIGNvbnN0IGJ1Y2tldCA9IG1ldGFkYXRhWydidWNrZXQnXTtcclxuICAgICAgICBjb25zdCBwYXRoID0gbWV0YWRhdGFbJ2Z1bGxQYXRoJ107XHJcbiAgICAgICAgY29uc3QgbG9jID0gbmV3IExvY2F0aW9uKGJ1Y2tldCwgcGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIHNlcnZpY2UuX21ha2VTdG9yYWdlUmVmZXJlbmNlKGxvYyk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWV0YWRhdGEsICdyZWYnLCB7IGdldDogZ2VuZXJhdGVSZWYgfSk7XHJcbn1cclxuZnVuY3Rpb24gZnJvbVJlc291cmNlKHNlcnZpY2UsIHJlc291cmNlLCBtYXBwaW5ncykge1xyXG4gICAgY29uc3QgbWV0YWRhdGEgPSB7fTtcclxuICAgIG1ldGFkYXRhWyd0eXBlJ10gPSAnZmlsZSc7XHJcbiAgICBjb25zdCBsZW4gPSBtYXBwaW5ncy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgbWFwcGluZyA9IG1hcHBpbmdzW2ldO1xyXG4gICAgICAgIG1ldGFkYXRhW21hcHBpbmcubG9jYWxdID0gbWFwcGluZy54Zm9ybShtZXRhZGF0YSwgcmVzb3VyY2VbbWFwcGluZy5zZXJ2ZXJdKTtcclxuICAgIH1cclxuICAgIGFkZFJlZihtZXRhZGF0YSwgc2VydmljZSk7XHJcbiAgICByZXR1cm4gbWV0YWRhdGE7XHJcbn1cclxuZnVuY3Rpb24gZnJvbVJlc291cmNlU3RyaW5nKHNlcnZpY2UsIHJlc291cmNlU3RyaW5nLCBtYXBwaW5ncykge1xyXG4gICAgY29uc3Qgb2JqID0ganNvbk9iamVjdE9yTnVsbChyZXNvdXJjZVN0cmluZyk7XHJcbiAgICBpZiAob2JqID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNvdXJjZSA9IG9iajtcclxuICAgIHJldHVybiBmcm9tUmVzb3VyY2Uoc2VydmljZSwgcmVzb3VyY2UsIG1hcHBpbmdzKTtcclxufVxyXG5mdW5jdGlvbiBkb3dubG9hZFVybEZyb21SZXNvdXJjZVN0cmluZyhtZXRhZGF0YSwgcmVzb3VyY2VTdHJpbmcsIGhvc3QsIHByb3RvY29sKSB7XHJcbiAgICBjb25zdCBvYmogPSBqc29uT2JqZWN0T3JOdWxsKHJlc291cmNlU3RyaW5nKTtcclxuICAgIGlmIChvYmogPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICghaXNTdHJpbmcob2JqWydkb3dubG9hZFRva2VucyddKSkge1xyXG4gICAgICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpZiBvYmplY3RzIGFyZSB1cGxvYWRlZCB0aHJvdWdoIEdDUyBhbmQgcmV0cmlldmVkXHJcbiAgICAgICAgLy8gdGhyb3VnaCBsaXN0LCBzbyB3ZSBkb24ndCB3YW50IHRvIHRocm93IGFuIEVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdG9rZW5zID0gb2JqWydkb3dubG9hZFRva2VucyddO1xyXG4gICAgaWYgKHRva2Vucy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IGVuY29kZSA9IGVuY29kZVVSSUNvbXBvbmVudDtcclxuICAgIGNvbnN0IHRva2Vuc0xpc3QgPSB0b2tlbnMuc3BsaXQoJywnKTtcclxuICAgIGNvbnN0IHVybHMgPSB0b2tlbnNMaXN0Lm1hcCgodG9rZW4pID0+IHtcclxuICAgICAgICBjb25zdCBidWNrZXQgPSBtZXRhZGF0YVsnYnVja2V0J107XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IG1ldGFkYXRhWydmdWxsUGF0aCddO1xyXG4gICAgICAgIGNvbnN0IHVybFBhcnQgPSAnL2IvJyArIGVuY29kZShidWNrZXQpICsgJy9vLycgKyBlbmNvZGUocGF0aCk7XHJcbiAgICAgICAgY29uc3QgYmFzZSA9IG1ha2VVcmwodXJsUGFydCwgaG9zdCwgcHJvdG9jb2wpO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gbWFrZVF1ZXJ5U3RyaW5nKHtcclxuICAgICAgICAgICAgYWx0OiAnbWVkaWEnLFxyXG4gICAgICAgICAgICB0b2tlblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBiYXNlICsgcXVlcnlTdHJpbmc7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB1cmxzWzBdO1xyXG59XHJcbmZ1bmN0aW9uIHRvUmVzb3VyY2VTdHJpbmcobWV0YWRhdGEsIG1hcHBpbmdzKSB7XHJcbiAgICBjb25zdCByZXNvdXJjZSA9IHt9O1xyXG4gICAgY29uc3QgbGVuID0gbWFwcGluZ3MubGVuZ3RoO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IG1hcHBpbmcgPSBtYXBwaW5nc1tpXTtcclxuICAgICAgICBpZiAobWFwcGluZy53cml0YWJsZSkge1xyXG4gICAgICAgICAgICByZXNvdXJjZVttYXBwaW5nLnNlcnZlcl0gPSBtZXRhZGF0YVttYXBwaW5nLmxvY2FsXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzb3VyY2UpO1xyXG59XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmNvbnN0IFBSRUZJWEVTX0tFWSA9ICdwcmVmaXhlcyc7XHJcbmNvbnN0IElURU1TX0tFWSA9ICdpdGVtcyc7XHJcbmZ1bmN0aW9uIGZyb21CYWNrZW5kUmVzcG9uc2Uoc2VydmljZSwgYnVja2V0LCByZXNvdXJjZSkge1xyXG4gICAgY29uc3QgbGlzdFJlc3VsdCA9IHtcclxuICAgICAgICBwcmVmaXhlczogW10sXHJcbiAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgIG5leHRQYWdlVG9rZW46IHJlc291cmNlWyduZXh0UGFnZVRva2VuJ11cclxuICAgIH07XHJcbiAgICBpZiAocmVzb3VyY2VbUFJFRklYRVNfS0VZXSkge1xyXG4gICAgICAgIGZvciAoY29uc3QgcGF0aCBvZiByZXNvdXJjZVtQUkVGSVhFU19LRVldKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhdGhXaXRob3V0VHJhaWxpbmdTbGFzaCA9IHBhdGgucmVwbGFjZSgvXFwvJC8sICcnKTtcclxuICAgICAgICAgICAgY29uc3QgcmVmZXJlbmNlID0gc2VydmljZS5fbWFrZVN0b3JhZ2VSZWZlcmVuY2UobmV3IExvY2F0aW9uKGJ1Y2tldCwgcGF0aFdpdGhvdXRUcmFpbGluZ1NsYXNoKSk7XHJcbiAgICAgICAgICAgIGxpc3RSZXN1bHQucHJlZml4ZXMucHVzaChyZWZlcmVuY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChyZXNvdXJjZVtJVEVNU19LRVldKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHJlc291cmNlW0lURU1TX0tFWV0pIHtcclxuICAgICAgICAgICAgY29uc3QgcmVmZXJlbmNlID0gc2VydmljZS5fbWFrZVN0b3JhZ2VSZWZlcmVuY2UobmV3IExvY2F0aW9uKGJ1Y2tldCwgaXRlbVsnbmFtZSddKSk7XHJcbiAgICAgICAgICAgIGxpc3RSZXN1bHQuaXRlbXMucHVzaChyZWZlcmVuY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0UmVzdWx0O1xyXG59XHJcbmZ1bmN0aW9uIGZyb21SZXNwb25zZVN0cmluZyhzZXJ2aWNlLCBidWNrZXQsIHJlc291cmNlU3RyaW5nKSB7XHJcbiAgICBjb25zdCBvYmogPSBqc29uT2JqZWN0T3JOdWxsKHJlc291cmNlU3RyaW5nKTtcclxuICAgIGlmIChvYmogPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc291cmNlID0gb2JqO1xyXG4gICAgcmV0dXJuIGZyb21CYWNrZW5kUmVzcG9uc2Uoc2VydmljZSwgYnVja2V0LCByZXNvdXJjZSk7XHJcbn1cblxuLyoqXHJcbiAqIENvbnRhaW5zIGEgZnVsbHkgc3BlY2lmaWVkIHJlcXVlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSBJIC0gdGhlIHR5cGUgb2YgdGhlIGJhY2tlbmQncyBuZXR3b3JrIHJlc3BvbnNlLlxyXG4gKiBAcGFyYW0gTyAtIHRoZSBvdXRwdXQgcmVzcG9uc2UgdHlwZSB1c2VkIGJ5IHRoZSByZXN0IG9mIHRoZSBTREsuXHJcbiAqL1xyXG5jbGFzcyBSZXF1ZXN0SW5mbyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIG1ldGhvZCwgXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIHdpdGggd2hpY2ggdG8gcmVzb2x2ZSB0aGUgcmVxdWVzdCdzIHByb21pc2UuIE9ubHkgY2FsbGVkXHJcbiAgICAgKiBpZiB0aGUgcmVxdWVzdCBpcyBzdWNjZXNzZnVsLiBUaHJvdyBmcm9tIHRoaXMgZnVuY3Rpb24gdG8gcmVqZWN0IHRoZVxyXG4gICAgICogcmV0dXJuZWQgUmVxdWVzdCdzIHByb21pc2Ugd2l0aCB0aGUgdGhyb3duIGVycm9yLlxyXG4gICAgICogTm90ZTogVGhlIFhocklvIHBhc3NlZCB0byB0aGlzIGZ1bmN0aW9uIG1heSBiZSByZXVzZWQgYWZ0ZXIgdGhpcyBjYWxsYmFja1xyXG4gICAgICogcmV0dXJucy4gRG8gbm90IGtlZXAgYSByZWZlcmVuY2UgdG8gaXQgaW4gYW55IHdheS5cclxuICAgICAqL1xyXG4gICAgaGFuZGxlciwgdGltZW91dCkge1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcclxuICAgICAgICB0aGlzLnVybFBhcmFtcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuaGVhZGVycyA9IHt9O1xyXG4gICAgICAgIHRoaXMuYm9keSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB3aXRoIHRoZSBjdXJyZW50IG51bWJlciBvZiBieXRlcyB1cGxvYWRlZCBhbmQgdG90YWwgc2l6ZSAoLTEgaWYgbm90XHJcbiAgICAgICAgICogY29tcHV0YWJsZSkgb2YgdGhlIHJlcXVlc3QgYm9keSAoaS5lLiB1c2VkIHRvIHJlcG9ydCB1cGxvYWQgcHJvZ3Jlc3MpLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NDYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdWNjZXNzQ29kZXMgPSBbMjAwXTtcclxuICAgICAgICB0aGlzLmFkZGl0aW9uYWxSZXRyeUNvZGVzID0gW107XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFRocm93cyB0aGUgVU5LTk9XTiBTdG9yYWdlRXJyb3IgaWYgY25kbiBpcyBmYWxzZS5cclxuICovXHJcbmZ1bmN0aW9uIGhhbmRsZXJDaGVjayhjbmRuKSB7XHJcbiAgICBpZiAoIWNuZG4pIHtcclxuICAgICAgICB0aHJvdyB1bmtub3duKCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbWV0YWRhdGFIYW5kbGVyKHNlcnZpY2UsIG1hcHBpbmdzKSB7XHJcbiAgICBmdW5jdGlvbiBoYW5kbGVyKHhociwgdGV4dCkge1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gZnJvbVJlc291cmNlU3RyaW5nKHNlcnZpY2UsIHRleHQsIG1hcHBpbmdzKTtcclxuICAgICAgICBoYW5kbGVyQ2hlY2sobWV0YWRhdGEgIT09IG51bGwpO1xyXG4gICAgICAgIHJldHVybiBtZXRhZGF0YTtcclxuICAgIH1cclxuICAgIHJldHVybiBoYW5kbGVyO1xyXG59XHJcbmZ1bmN0aW9uIGxpc3RIYW5kbGVyKHNlcnZpY2UsIGJ1Y2tldCkge1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlcih4aHIsIHRleHQpIHtcclxuICAgICAgICBjb25zdCBsaXN0UmVzdWx0ID0gZnJvbVJlc3BvbnNlU3RyaW5nKHNlcnZpY2UsIGJ1Y2tldCwgdGV4dCk7XHJcbiAgICAgICAgaGFuZGxlckNoZWNrKGxpc3RSZXN1bHQgIT09IG51bGwpO1xyXG4gICAgICAgIHJldHVybiBsaXN0UmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhhbmRsZXI7XHJcbn1cclxuZnVuY3Rpb24gZG93bmxvYWRVcmxIYW5kbGVyKHNlcnZpY2UsIG1hcHBpbmdzKSB7XHJcbiAgICBmdW5jdGlvbiBoYW5kbGVyKHhociwgdGV4dCkge1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gZnJvbVJlc291cmNlU3RyaW5nKHNlcnZpY2UsIHRleHQsIG1hcHBpbmdzKTtcclxuICAgICAgICBoYW5kbGVyQ2hlY2sobWV0YWRhdGEgIT09IG51bGwpO1xyXG4gICAgICAgIHJldHVybiBkb3dubG9hZFVybEZyb21SZXNvdXJjZVN0cmluZyhtZXRhZGF0YSwgdGV4dCwgc2VydmljZS5ob3N0LCBzZXJ2aWNlLl9wcm90b2NvbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGFuZGxlcjtcclxufVxyXG5mdW5jdGlvbiBzaGFyZWRFcnJvckhhbmRsZXIobG9jYXRpb24pIHtcclxuICAgIGZ1bmN0aW9uIGVycm9ySGFuZGxlcih4aHIsIGVycikge1xyXG4gICAgICAgIGxldCBuZXdFcnI7XHJcbiAgICAgICAgaWYgKHhoci5nZXRTdGF0dXMoKSA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgLy8gVGhpcyBleGFjdCBtZXNzYWdlIHN0cmluZyBpcyB0aGUgb25seSBjb25zaXN0ZW50IHBhcnQgb2YgdGhlXHJcbiAgICAgICAgICAgIC8vIHNlcnZlcidzIGVycm9yIHJlc3BvbnNlIHRoYXQgaWRlbnRpZmllcyBpdCBhcyBhbiBBcHAgQ2hlY2sgZXJyb3IuXHJcbiAgICAgICAgICAgIHhoci5nZXRFcnJvclRleHQoKS5pbmNsdWRlcygnRmlyZWJhc2UgQXBwIENoZWNrIHRva2VuIGlzIGludmFsaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgbmV3RXJyID0gdW5hdXRob3JpemVkQXBwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdFcnIgPSB1bmF1dGhlbnRpY2F0ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHhoci5nZXRTdGF0dXMoKSA9PT0gNDAyKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdFcnIgPSBxdW90YUV4Y2VlZGVkKGxvY2F0aW9uLmJ1Y2tldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLmdldFN0YXR1cygpID09PSA0MDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdFcnIgPSB1bmF1dGhvcml6ZWQobG9jYXRpb24ucGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdFcnIgPSBlcnI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3RXJyLnNlcnZlclJlc3BvbnNlID0gZXJyLnNlcnZlclJlc3BvbnNlO1xyXG4gICAgICAgIHJldHVybiBuZXdFcnI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3JIYW5kbGVyO1xyXG59XHJcbmZ1bmN0aW9uIG9iamVjdEVycm9ySGFuZGxlcihsb2NhdGlvbikge1xyXG4gICAgY29uc3Qgc2hhcmVkID0gc2hhcmVkRXJyb3JIYW5kbGVyKGxvY2F0aW9uKTtcclxuICAgIGZ1bmN0aW9uIGVycm9ySGFuZGxlcih4aHIsIGVycikge1xyXG4gICAgICAgIGxldCBuZXdFcnIgPSBzaGFyZWQoeGhyLCBlcnIpO1xyXG4gICAgICAgIGlmICh4aHIuZ2V0U3RhdHVzKCkgPT09IDQwNCkge1xyXG4gICAgICAgICAgICBuZXdFcnIgPSBvYmplY3ROb3RGb3VuZChsb2NhdGlvbi5wYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3RXJyLnNlcnZlclJlc3BvbnNlID0gZXJyLnNlcnZlclJlc3BvbnNlO1xyXG4gICAgICAgIHJldHVybiBuZXdFcnI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3JIYW5kbGVyO1xyXG59XHJcbmZ1bmN0aW9uIGdldE1ldGFkYXRhJDIoc2VydmljZSwgbG9jYXRpb24sIG1hcHBpbmdzKSB7XHJcbiAgICBjb25zdCB1cmxQYXJ0ID0gbG9jYXRpb24uZnVsbFNlcnZlclVybCgpO1xyXG4gICAgY29uc3QgdXJsID0gbWFrZVVybCh1cmxQYXJ0LCBzZXJ2aWNlLmhvc3QsIHNlcnZpY2UuX3Byb3RvY29sKTtcclxuICAgIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xyXG4gICAgY29uc3QgdGltZW91dCA9IHNlcnZpY2UubWF4T3BlcmF0aW9uUmV0cnlUaW1lO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIG1ldGFkYXRhSGFuZGxlcihzZXJ2aWNlLCBtYXBwaW5ncyksIHRpbWVvdXQpO1xyXG4gICAgcmVxdWVzdEluZm8uZXJyb3JIYW5kbGVyID0gb2JqZWN0RXJyb3JIYW5kbGVyKGxvY2F0aW9uKTtcclxuICAgIHJldHVybiByZXF1ZXN0SW5mbztcclxufVxyXG5mdW5jdGlvbiBsaXN0JDIoc2VydmljZSwgbG9jYXRpb24sIGRlbGltaXRlciwgcGFnZVRva2VuLCBtYXhSZXN1bHRzKSB7XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSB7fTtcclxuICAgIGlmIChsb2NhdGlvbi5pc1Jvb3QpIHtcclxuICAgICAgICB1cmxQYXJhbXNbJ3ByZWZpeCddID0gJyc7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB1cmxQYXJhbXNbJ3ByZWZpeCddID0gbG9jYXRpb24ucGF0aCArICcvJztcclxuICAgIH1cclxuICAgIGlmIChkZWxpbWl0ZXIgJiYgZGVsaW1pdGVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB1cmxQYXJhbXNbJ2RlbGltaXRlciddID0gZGVsaW1pdGVyO1xyXG4gICAgfVxyXG4gICAgaWYgKHBhZ2VUb2tlbikge1xyXG4gICAgICAgIHVybFBhcmFtc1sncGFnZVRva2VuJ10gPSBwYWdlVG9rZW47XHJcbiAgICB9XHJcbiAgICBpZiAobWF4UmVzdWx0cykge1xyXG4gICAgICAgIHVybFBhcmFtc1snbWF4UmVzdWx0cyddID0gbWF4UmVzdWx0cztcclxuICAgIH1cclxuICAgIGNvbnN0IHVybFBhcnQgPSBsb2NhdGlvbi5idWNrZXRPbmx5U2VydmVyVXJsKCk7XHJcbiAgICBjb25zdCB1cmwgPSBtYWtlVXJsKHVybFBhcnQsIHNlcnZpY2UuaG9zdCwgc2VydmljZS5fcHJvdG9jb2wpO1xyXG4gICAgY29uc3QgbWV0aG9kID0gJ0dFVCc7XHJcbiAgICBjb25zdCB0aW1lb3V0ID0gc2VydmljZS5tYXhPcGVyYXRpb25SZXRyeVRpbWU7XHJcbiAgICBjb25zdCByZXF1ZXN0SW5mbyA9IG5ldyBSZXF1ZXN0SW5mbyh1cmwsIG1ldGhvZCwgbGlzdEhhbmRsZXIoc2VydmljZSwgbG9jYXRpb24uYnVja2V0KSwgdGltZW91dCk7XHJcbiAgICByZXF1ZXN0SW5mby51cmxQYXJhbXMgPSB1cmxQYXJhbXM7XHJcbiAgICByZXF1ZXN0SW5mby5lcnJvckhhbmRsZXIgPSBzaGFyZWRFcnJvckhhbmRsZXIobG9jYXRpb24pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3RJbmZvO1xyXG59XHJcbmZ1bmN0aW9uIGdldEJ5dGVzJDEoc2VydmljZSwgbG9jYXRpb24sIG1heERvd25sb2FkU2l6ZUJ5dGVzKSB7XHJcbiAgICBjb25zdCB1cmxQYXJ0ID0gbG9jYXRpb24uZnVsbFNlcnZlclVybCgpO1xyXG4gICAgY29uc3QgdXJsID0gbWFrZVVybCh1cmxQYXJ0LCBzZXJ2aWNlLmhvc3QsIHNlcnZpY2UuX3Byb3RvY29sKSArICc/YWx0PW1lZGlhJztcclxuICAgIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xyXG4gICAgY29uc3QgdGltZW91dCA9IHNlcnZpY2UubWF4T3BlcmF0aW9uUmV0cnlUaW1lO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIChfLCBkYXRhKSA9PiBkYXRhLCB0aW1lb3V0KTtcclxuICAgIHJlcXVlc3RJbmZvLmVycm9ySGFuZGxlciA9IG9iamVjdEVycm9ySGFuZGxlcihsb2NhdGlvbik7XHJcbiAgICBpZiAobWF4RG93bmxvYWRTaXplQnl0ZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJlcXVlc3RJbmZvLmhlYWRlcnNbJ1JhbmdlJ10gPSBgYnl0ZXM9MC0ke21heERvd25sb2FkU2l6ZUJ5dGVzfWA7XHJcbiAgICAgICAgcmVxdWVzdEluZm8uc3VjY2Vzc0NvZGVzID0gWzIwMCAvKiBPSyAqLywgMjA2IC8qIFBhcnRpYWwgQ29udGVudCAqL107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVxdWVzdEluZm87XHJcbn1cclxuZnVuY3Rpb24gZ2V0RG93bmxvYWRVcmwoc2VydmljZSwgbG9jYXRpb24sIG1hcHBpbmdzKSB7XHJcbiAgICBjb25zdCB1cmxQYXJ0ID0gbG9jYXRpb24uZnVsbFNlcnZlclVybCgpO1xyXG4gICAgY29uc3QgdXJsID0gbWFrZVVybCh1cmxQYXJ0LCBzZXJ2aWNlLmhvc3QsIHNlcnZpY2UuX3Byb3RvY29sKTtcclxuICAgIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xyXG4gICAgY29uc3QgdGltZW91dCA9IHNlcnZpY2UubWF4T3BlcmF0aW9uUmV0cnlUaW1lO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIGRvd25sb2FkVXJsSGFuZGxlcihzZXJ2aWNlLCBtYXBwaW5ncyksIHRpbWVvdXQpO1xyXG4gICAgcmVxdWVzdEluZm8uZXJyb3JIYW5kbGVyID0gb2JqZWN0RXJyb3JIYW5kbGVyKGxvY2F0aW9uKTtcclxuICAgIHJldHVybiByZXF1ZXN0SW5mbztcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVNZXRhZGF0YSQyKHNlcnZpY2UsIGxvY2F0aW9uLCBtZXRhZGF0YSwgbWFwcGluZ3MpIHtcclxuICAgIGNvbnN0IHVybFBhcnQgPSBsb2NhdGlvbi5mdWxsU2VydmVyVXJsKCk7XHJcbiAgICBjb25zdCB1cmwgPSBtYWtlVXJsKHVybFBhcnQsIHNlcnZpY2UuaG9zdCwgc2VydmljZS5fcHJvdG9jb2wpO1xyXG4gICAgY29uc3QgbWV0aG9kID0gJ1BBVENIJztcclxuICAgIGNvbnN0IGJvZHkgPSB0b1Jlc291cmNlU3RyaW5nKG1ldGFkYXRhLCBtYXBwaW5ncyk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnIH07XHJcbiAgICBjb25zdCB0aW1lb3V0ID0gc2VydmljZS5tYXhPcGVyYXRpb25SZXRyeVRpbWU7XHJcbiAgICBjb25zdCByZXF1ZXN0SW5mbyA9IG5ldyBSZXF1ZXN0SW5mbyh1cmwsIG1ldGhvZCwgbWV0YWRhdGFIYW5kbGVyKHNlcnZpY2UsIG1hcHBpbmdzKSwgdGltZW91dCk7XHJcbiAgICByZXF1ZXN0SW5mby5oZWFkZXJzID0gaGVhZGVycztcclxuICAgIHJlcXVlc3RJbmZvLmJvZHkgPSBib2R5O1xyXG4gICAgcmVxdWVzdEluZm8uZXJyb3JIYW5kbGVyID0gb2JqZWN0RXJyb3JIYW5kbGVyKGxvY2F0aW9uKTtcclxuICAgIHJldHVybiByZXF1ZXN0SW5mbztcclxufVxyXG5mdW5jdGlvbiBkZWxldGVPYmplY3QkMihzZXJ2aWNlLCBsb2NhdGlvbikge1xyXG4gICAgY29uc3QgdXJsUGFydCA9IGxvY2F0aW9uLmZ1bGxTZXJ2ZXJVcmwoKTtcclxuICAgIGNvbnN0IHVybCA9IG1ha2VVcmwodXJsUGFydCwgc2VydmljZS5ob3N0LCBzZXJ2aWNlLl9wcm90b2NvbCk7XHJcbiAgICBjb25zdCBtZXRob2QgPSAnREVMRVRFJztcclxuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXJ2aWNlLm1heE9wZXJhdGlvblJldHJ5VGltZTtcclxuICAgIGZ1bmN0aW9uIGhhbmRsZXIoX3hociwgX3RleHQpIHsgfVxyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIGhhbmRsZXIsIHRpbWVvdXQpO1xyXG4gICAgcmVxdWVzdEluZm8uc3VjY2Vzc0NvZGVzID0gWzIwMCwgMjA0XTtcclxuICAgIHJlcXVlc3RJbmZvLmVycm9ySGFuZGxlciA9IG9iamVjdEVycm9ySGFuZGxlcihsb2NhdGlvbik7XHJcbiAgICByZXR1cm4gcmVxdWVzdEluZm87XHJcbn1cclxuZnVuY3Rpb24gZGV0ZXJtaW5lQ29udGVudFR5cGVfKG1ldGFkYXRhLCBibG9iKSB7XHJcbiAgICByZXR1cm4gKChtZXRhZGF0YSAmJiBtZXRhZGF0YVsnY29udGVudFR5cGUnXSkgfHxcclxuICAgICAgICAoYmxvYiAmJiBibG9iLnR5cGUoKSkgfHxcclxuICAgICAgICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyk7XHJcbn1cclxuZnVuY3Rpb24gbWV0YWRhdGFGb3JVcGxvYWRfKGxvY2F0aW9uLCBibG9iLCBtZXRhZGF0YSkge1xyXG4gICAgY29uc3QgbWV0YWRhdGFDbG9uZSA9IE9iamVjdC5hc3NpZ24oe30sIG1ldGFkYXRhKTtcclxuICAgIG1ldGFkYXRhQ2xvbmVbJ2Z1bGxQYXRoJ10gPSBsb2NhdGlvbi5wYXRoO1xyXG4gICAgbWV0YWRhdGFDbG9uZVsnc2l6ZSddID0gYmxvYi5zaXplKCk7XHJcbiAgICBpZiAoIW1ldGFkYXRhQ2xvbmVbJ2NvbnRlbnRUeXBlJ10pIHtcclxuICAgICAgICBtZXRhZGF0YUNsb25lWydjb250ZW50VHlwZSddID0gZGV0ZXJtaW5lQ29udGVudFR5cGVfKG51bGwsIGJsb2IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1ldGFkYXRhQ2xvbmU7XHJcbn1cclxuLyoqXHJcbiAqIFByZXBhcmUgUmVxdWVzdEluZm8gZm9yIHVwbG9hZHMgYXMgQ29udGVudC1UeXBlOiBtdWx0aXBhcnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBtdWx0aXBhcnRVcGxvYWQoc2VydmljZSwgbG9jYXRpb24sIG1hcHBpbmdzLCBibG9iLCBtZXRhZGF0YSkge1xyXG4gICAgY29uc3QgdXJsUGFydCA9IGxvY2F0aW9uLmJ1Y2tldE9ubHlTZXJ2ZXJVcmwoKTtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgJ1gtR29vZy1VcGxvYWQtUHJvdG9jb2wnOiAnbXVsdGlwYXJ0J1xyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGdlbkJvdW5kYXJ5KCkge1xyXG4gICAgICAgIGxldCBzdHIgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICBjb25zdCBib3VuZGFyeSA9IGdlbkJvdW5kYXJ5KCk7XHJcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdtdWx0aXBhcnQvcmVsYXRlZDsgYm91bmRhcnk9JyArIGJvdW5kYXJ5O1xyXG4gICAgY29uc3QgbWV0YWRhdGFfID0gbWV0YWRhdGFGb3JVcGxvYWRfKGxvY2F0aW9uLCBibG9iLCBtZXRhZGF0YSk7XHJcbiAgICBjb25zdCBtZXRhZGF0YVN0cmluZyA9IHRvUmVzb3VyY2VTdHJpbmcobWV0YWRhdGFfLCBtYXBwaW5ncyk7XHJcbiAgICBjb25zdCBwcmVCbG9iUGFydCA9ICctLScgK1xyXG4gICAgICAgIGJvdW5kYXJ5ICtcclxuICAgICAgICAnXFxyXFxuJyArXHJcbiAgICAgICAgJ0NvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFxcclxcblxcclxcbicgK1xyXG4gICAgICAgIG1ldGFkYXRhU3RyaW5nICtcclxuICAgICAgICAnXFxyXFxuLS0nICtcclxuICAgICAgICBib3VuZGFyeSArXHJcbiAgICAgICAgJ1xcclxcbicgK1xyXG4gICAgICAgICdDb250ZW50LVR5cGU6ICcgK1xyXG4gICAgICAgIG1ldGFkYXRhX1snY29udGVudFR5cGUnXSArXHJcbiAgICAgICAgJ1xcclxcblxcclxcbic7XHJcbiAgICBjb25zdCBwb3N0QmxvYlBhcnQgPSAnXFxyXFxuLS0nICsgYm91bmRhcnkgKyAnLS0nO1xyXG4gICAgY29uc3QgYm9keSA9IEZic0Jsb2IuZ2V0QmxvYihwcmVCbG9iUGFydCwgYmxvYiwgcG9zdEJsb2JQYXJ0KTtcclxuICAgIGlmIChib2R5ID09PSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgY2Fubm90U2xpY2VCbG9iKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSB7IG5hbWU6IG1ldGFkYXRhX1snZnVsbFBhdGgnXSB9O1xyXG4gICAgY29uc3QgdXJsID0gbWFrZVVybCh1cmxQYXJ0LCBzZXJ2aWNlLmhvc3QsIHNlcnZpY2UuX3Byb3RvY29sKTtcclxuICAgIGNvbnN0IG1ldGhvZCA9ICdQT1NUJztcclxuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXJ2aWNlLm1heFVwbG9hZFJldHJ5VGltZTtcclxuICAgIGNvbnN0IHJlcXVlc3RJbmZvID0gbmV3IFJlcXVlc3RJbmZvKHVybCwgbWV0aG9kLCBtZXRhZGF0YUhhbmRsZXIoc2VydmljZSwgbWFwcGluZ3MpLCB0aW1lb3V0KTtcclxuICAgIHJlcXVlc3RJbmZvLnVybFBhcmFtcyA9IHVybFBhcmFtcztcclxuICAgIHJlcXVlc3RJbmZvLmhlYWRlcnMgPSBoZWFkZXJzO1xyXG4gICAgcmVxdWVzdEluZm8uYm9keSA9IGJvZHkudXBsb2FkRGF0YSgpO1xyXG4gICAgcmVxdWVzdEluZm8uZXJyb3JIYW5kbGVyID0gc2hhcmVkRXJyb3JIYW5kbGVyKGxvY2F0aW9uKTtcclxuICAgIHJldHVybiByZXF1ZXN0SW5mbztcclxufVxyXG4vKipcclxuICogQHBhcmFtIGN1cnJlbnQgVGhlIG51bWJlciBvZiBieXRlcyB0aGF0IGhhdmUgYmVlbiB1cGxvYWRlZCBzbyBmYXIuXHJcbiAqIEBwYXJhbSB0b3RhbCBUaGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzIGluIHRoZSB1cGxvYWQuXHJcbiAqIEBwYXJhbSBvcHRfZmluYWxpemVkIFRydWUgaWYgdGhlIHNlcnZlciBoYXMgZmluaXNoZWQgdGhlIHVwbG9hZC5cclxuICogQHBhcmFtIG9wdF9tZXRhZGF0YSBUaGUgdXBsb2FkIG1ldGFkYXRhLCBzaG91bGRcclxuICogICAgIG9ubHkgYmUgcGFzc2VkIGlmIG9wdF9maW5hbGl6ZWQgaXMgdHJ1ZS5cclxuICovXHJcbmNsYXNzIFJlc3VtYWJsZVVwbG9hZFN0YXR1cyB7XHJcbiAgICBjb25zdHJ1Y3RvcihjdXJyZW50LCB0b3RhbCwgZmluYWxpemVkLCBtZXRhZGF0YSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudCA9IGN1cnJlbnQ7XHJcbiAgICAgICAgdGhpcy50b3RhbCA9IHRvdGFsO1xyXG4gICAgICAgIHRoaXMuZmluYWxpemVkID0gISFmaW5hbGl6ZWQ7XHJcbiAgICAgICAgdGhpcy5tZXRhZGF0YSA9IG1ldGFkYXRhIHx8IG51bGw7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY2hlY2tSZXN1bWVIZWFkZXJfKHhociwgYWxsb3dlZCkge1xyXG4gICAgbGV0IHN0YXR1cyA9IG51bGw7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHN0YXR1cyA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1Hb29nLVVwbG9hZC1TdGF0dXMnKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgaGFuZGxlckNoZWNrKGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGFsbG93ZWRTdGF0dXMgPSBhbGxvd2VkIHx8IFsnYWN0aXZlJ107XHJcbiAgICBoYW5kbGVyQ2hlY2soISFzdGF0dXMgJiYgYWxsb3dlZFN0YXR1cy5pbmRleE9mKHN0YXR1cykgIT09IC0xKTtcclxuICAgIHJldHVybiBzdGF0dXM7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlUmVzdW1hYmxlVXBsb2FkKHNlcnZpY2UsIGxvY2F0aW9uLCBtYXBwaW5ncywgYmxvYiwgbWV0YWRhdGEpIHtcclxuICAgIGNvbnN0IHVybFBhcnQgPSBsb2NhdGlvbi5idWNrZXRPbmx5U2VydmVyVXJsKCk7XHJcbiAgICBjb25zdCBtZXRhZGF0YUZvclVwbG9hZCA9IG1ldGFkYXRhRm9yVXBsb2FkXyhsb2NhdGlvbiwgYmxvYiwgbWV0YWRhdGEpO1xyXG4gICAgY29uc3QgdXJsUGFyYW1zID0geyBuYW1lOiBtZXRhZGF0YUZvclVwbG9hZFsnZnVsbFBhdGgnXSB9O1xyXG4gICAgY29uc3QgdXJsID0gbWFrZVVybCh1cmxQYXJ0LCBzZXJ2aWNlLmhvc3QsIHNlcnZpY2UuX3Byb3RvY29sKTtcclxuICAgIGNvbnN0IG1ldGhvZCA9ICdQT1NUJztcclxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgJ1gtR29vZy1VcGxvYWQtUHJvdG9jb2wnOiAncmVzdW1hYmxlJyxcclxuICAgICAgICAnWC1Hb29nLVVwbG9hZC1Db21tYW5kJzogJ3N0YXJ0JyxcclxuICAgICAgICAnWC1Hb29nLVVwbG9hZC1IZWFkZXItQ29udGVudC1MZW5ndGgnOiBgJHtibG9iLnNpemUoKX1gLFxyXG4gICAgICAgICdYLUdvb2ctVXBsb2FkLUhlYWRlci1Db250ZW50LVR5cGUnOiBtZXRhZGF0YUZvclVwbG9hZFsnY29udGVudFR5cGUnXSxcclxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYm9keSA9IHRvUmVzb3VyY2VTdHJpbmcobWV0YWRhdGFGb3JVcGxvYWQsIG1hcHBpbmdzKTtcclxuICAgIGNvbnN0IHRpbWVvdXQgPSBzZXJ2aWNlLm1heFVwbG9hZFJldHJ5VGltZTtcclxuICAgIGZ1bmN0aW9uIGhhbmRsZXIoeGhyKSB7XHJcbiAgICAgICAgY2hlY2tSZXN1bWVIZWFkZXJfKHhocik7XHJcbiAgICAgICAgbGV0IHVybDtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB1cmwgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtR29vZy1VcGxvYWQtVVJMJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXJDaGVjayhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGhhbmRsZXJDaGVjayhpc1N0cmluZyh1cmwpKTtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIGhhbmRsZXIsIHRpbWVvdXQpO1xyXG4gICAgcmVxdWVzdEluZm8udXJsUGFyYW1zID0gdXJsUGFyYW1zO1xyXG4gICAgcmVxdWVzdEluZm8uaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICByZXF1ZXN0SW5mby5ib2R5ID0gYm9keTtcclxuICAgIHJlcXVlc3RJbmZvLmVycm9ySGFuZGxlciA9IHNoYXJlZEVycm9ySGFuZGxlcihsb2NhdGlvbik7XHJcbiAgICByZXR1cm4gcmVxdWVzdEluZm87XHJcbn1cclxuLyoqXHJcbiAqIEBwYXJhbSB1cmwgRnJvbSBhIGNhbGwgdG8gZmJzLnJlcXVlc3RzLmNyZWF0ZVJlc3VtYWJsZVVwbG9hZC5cclxuICovXHJcbmZ1bmN0aW9uIGdldFJlc3VtYWJsZVVwbG9hZFN0YXR1cyhzZXJ2aWNlLCBsb2NhdGlvbiwgdXJsLCBibG9iKSB7XHJcbiAgICBjb25zdCBoZWFkZXJzID0geyAnWC1Hb29nLVVwbG9hZC1Db21tYW5kJzogJ3F1ZXJ5JyB9O1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlcih4aHIpIHtcclxuICAgICAgICBjb25zdCBzdGF0dXMgPSBjaGVja1Jlc3VtZUhlYWRlcl8oeGhyLCBbJ2FjdGl2ZScsICdmaW5hbCddKTtcclxuICAgICAgICBsZXQgc2l6ZVN0cmluZyA9IG51bGw7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgc2l6ZVN0cmluZyA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1Hb29nLVVwbG9hZC1TaXplLVJlY2VpdmVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXJDaGVjayhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2l6ZVN0cmluZykge1xyXG4gICAgICAgICAgICAvLyBudWxsIG9yIGVtcHR5IHN0cmluZ1xyXG4gICAgICAgICAgICBoYW5kbGVyQ2hlY2soZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzaXplID0gTnVtYmVyKHNpemVTdHJpbmcpO1xyXG4gICAgICAgIGhhbmRsZXJDaGVjayghaXNOYU4oc2l6ZSkpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdW1hYmxlVXBsb2FkU3RhdHVzKHNpemUsIGJsb2Iuc2l6ZSgpLCBzdGF0dXMgPT09ICdmaW5hbCcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWV0aG9kID0gJ1BPU1QnO1xyXG4gICAgY29uc3QgdGltZW91dCA9IHNlcnZpY2UubWF4VXBsb2FkUmV0cnlUaW1lO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIGhhbmRsZXIsIHRpbWVvdXQpO1xyXG4gICAgcmVxdWVzdEluZm8uaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICByZXF1ZXN0SW5mby5lcnJvckhhbmRsZXIgPSBzaGFyZWRFcnJvckhhbmRsZXIobG9jYXRpb24pO1xyXG4gICAgcmV0dXJuIHJlcXVlc3RJbmZvO1xyXG59XHJcbi8qKlxyXG4gKiBBbnkgdXBsb2FkcyB2aWEgdGhlIHJlc3VtYWJsZSB1cGxvYWQgQVBJIG11c3QgdHJhbnNmZXIgYSBudW1iZXIgb2YgYnl0ZXNcclxuICogdGhhdCBpcyBhIG11bHRpcGxlIG9mIHRoaXMgbnVtYmVyLlxyXG4gKi9cclxuY29uc3QgUkVTVU1BQkxFX1VQTE9BRF9DSFVOS19TSVpFID0gMjU2ICogMTAyNDtcclxuLyoqXHJcbiAqIEBwYXJhbSB1cmwgRnJvbSBhIGNhbGwgdG8gZmJzLnJlcXVlc3RzLmNyZWF0ZVJlc3VtYWJsZVVwbG9hZC5cclxuICogQHBhcmFtIGNodW5rU2l6ZSBOdW1iZXIgb2YgYnl0ZXMgdG8gdXBsb2FkLlxyXG4gKiBAcGFyYW0gc3RhdHVzIFRoZSBwcmV2aW91cyBzdGF0dXMuXHJcbiAqICAgICBJZiBub3QgcGFzc2VkIG9yIG51bGwsIHdlIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZy5cclxuICogQHRocm93cyBmYnMuRXJyb3IgSWYgdGhlIHVwbG9hZCBpcyBhbHJlYWR5IGNvbXBsZXRlLCB0aGUgcGFzc2VkIGluIHN0YXR1c1xyXG4gKiAgICAgaGFzIGEgZmluYWwgc2l6ZSBpbmNvbnNpc3RlbnQgd2l0aCB0aGUgYmxvYiwgb3IgdGhlIGJsb2IgY2Fubm90IGJlIHNsaWNlZFxyXG4gKiAgICAgZm9yIHVwbG9hZC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbnRpbnVlUmVzdW1hYmxlVXBsb2FkKGxvY2F0aW9uLCBzZXJ2aWNlLCB1cmwsIGJsb2IsIGNodW5rU2l6ZSwgbWFwcGluZ3MsIHN0YXR1cywgcHJvZ3Jlc3NDYWxsYmFjaykge1xyXG4gICAgLy8gVE9ETyhhbmR5c290byk6IHN0YW5kYXJkaXplIG9uIGludGVybmFsIGFzc2VydHNcclxuICAgIC8vIGFzc2VydCghKG9wdF9zdGF0dXMgJiYgb3B0X3N0YXR1cy5maW5hbGl6ZWQpKTtcclxuICAgIGNvbnN0IHN0YXR1c18gPSBuZXcgUmVzdW1hYmxlVXBsb2FkU3RhdHVzKDAsIDApO1xyXG4gICAgaWYgKHN0YXR1cykge1xyXG4gICAgICAgIHN0YXR1c18uY3VycmVudCA9IHN0YXR1cy5jdXJyZW50O1xyXG4gICAgICAgIHN0YXR1c18udG90YWwgPSBzdGF0dXMudG90YWw7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzdGF0dXNfLmN1cnJlbnQgPSAwO1xyXG4gICAgICAgIHN0YXR1c18udG90YWwgPSBibG9iLnNpemUoKTtcclxuICAgIH1cclxuICAgIGlmIChibG9iLnNpemUoKSAhPT0gc3RhdHVzXy50b3RhbCkge1xyXG4gICAgICAgIHRocm93IHNlcnZlckZpbGVXcm9uZ1NpemUoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGJ5dGVzTGVmdCA9IHN0YXR1c18udG90YWwgLSBzdGF0dXNfLmN1cnJlbnQ7XHJcbiAgICBsZXQgYnl0ZXNUb1VwbG9hZCA9IGJ5dGVzTGVmdDtcclxuICAgIGlmIChjaHVua1NpemUgPiAwKSB7XHJcbiAgICAgICAgYnl0ZXNUb1VwbG9hZCA9IE1hdGgubWluKGJ5dGVzVG9VcGxvYWQsIGNodW5rU2l6ZSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdGFydEJ5dGUgPSBzdGF0dXNfLmN1cnJlbnQ7XHJcbiAgICBjb25zdCBlbmRCeXRlID0gc3RhcnRCeXRlICsgYnl0ZXNUb1VwbG9hZDtcclxuICAgIGNvbnN0IHVwbG9hZENvbW1hbmQgPSBieXRlc1RvVXBsb2FkID09PSBieXRlc0xlZnQgPyAndXBsb2FkLCBmaW5hbGl6ZScgOiAndXBsb2FkJztcclxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XHJcbiAgICAgICAgJ1gtR29vZy1VcGxvYWQtQ29tbWFuZCc6IHVwbG9hZENvbW1hbmQsXHJcbiAgICAgICAgJ1gtR29vZy1VcGxvYWQtT2Zmc2V0JzogYCR7c3RhdHVzXy5jdXJyZW50fWBcclxuICAgIH07XHJcbiAgICBjb25zdCBib2R5ID0gYmxvYi5zbGljZShzdGFydEJ5dGUsIGVuZEJ5dGUpO1xyXG4gICAgaWYgKGJvZHkgPT09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBjYW5ub3RTbGljZUJsb2IoKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGhhbmRsZXIoeGhyLCB0ZXh0KSB7XHJcbiAgICAgICAgLy8gVE9ETyhhbmR5c290byk6IFZlcmlmeSB0aGUgTUQ1IG9mIGVhY2ggdXBsb2FkZWQgcmFuZ2U6XHJcbiAgICAgICAgLy8gdGhlICd4LXJhbmdlLW1kNScgaGVhZGVyIGNvbWVzIGJhY2sgd2l0aCBzdGF0dXMgY29kZSAzMDggcmVzcG9uc2VzLlxyXG4gICAgICAgIC8vIFdlJ2xsIG9ubHkgYmUgYWJsZSB0byBiYWlsIG91dCB0aG91Z2gsIGJlY2F1c2UgeW91IGNhbid0IHJlLXVwbG9hZCBhXHJcbiAgICAgICAgLy8gcmFuZ2UgdGhhdCB5b3UgcHJldmlvdXNseSB1cGxvYWRlZC5cclxuICAgICAgICBjb25zdCB1cGxvYWRTdGF0dXMgPSBjaGVja1Jlc3VtZUhlYWRlcl8oeGhyLCBbJ2FjdGl2ZScsICdmaW5hbCddKTtcclxuICAgICAgICBjb25zdCBuZXdDdXJyZW50ID0gc3RhdHVzXy5jdXJyZW50ICsgYnl0ZXNUb1VwbG9hZDtcclxuICAgICAgICBjb25zdCBzaXplID0gYmxvYi5zaXplKCk7XHJcbiAgICAgICAgbGV0IG1ldGFkYXRhO1xyXG4gICAgICAgIGlmICh1cGxvYWRTdGF0dXMgPT09ICdmaW5hbCcpIHtcclxuICAgICAgICAgICAgbWV0YWRhdGEgPSBtZXRhZGF0YUhhbmRsZXIoc2VydmljZSwgbWFwcGluZ3MpKHhociwgdGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtZXRhZGF0YSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdW1hYmxlVXBsb2FkU3RhdHVzKG5ld0N1cnJlbnQsIHNpemUsIHVwbG9hZFN0YXR1cyA9PT0gJ2ZpbmFsJywgbWV0YWRhdGEpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWV0aG9kID0gJ1BPU1QnO1xyXG4gICAgY29uc3QgdGltZW91dCA9IHNlcnZpY2UubWF4VXBsb2FkUmV0cnlUaW1lO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8odXJsLCBtZXRob2QsIGhhbmRsZXIsIHRpbWVvdXQpO1xyXG4gICAgcmVxdWVzdEluZm8uaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICByZXF1ZXN0SW5mby5ib2R5ID0gYm9keS51cGxvYWREYXRhKCk7XHJcbiAgICByZXF1ZXN0SW5mby5wcm9ncmVzc0NhbGxiYWNrID0gcHJvZ3Jlc3NDYWxsYmFjayB8fCBudWxsO1xyXG4gICAgcmVxdWVzdEluZm8uZXJyb3JIYW5kbGVyID0gc2hhcmVkRXJyb3JIYW5kbGVyKGxvY2F0aW9uKTtcclxuICAgIHJldHVybiByZXF1ZXN0SW5mbztcclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogQW4gZXZlbnQgdGhhdCBpcyB0cmlnZ2VyZWQgb24gYSB0YXNrLlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNvbnN0IFRhc2tFdmVudCA9IHtcclxuICAgIC8qKlxyXG4gICAgICogRm9yIHRoaXMgZXZlbnQsXHJcbiAgICAgKiA8dWw+XHJcbiAgICAgKiAgIDxsaT5UaGUgYG5leHRgIGZ1bmN0aW9uIGlzIHRyaWdnZXJlZCBvbiBwcm9ncmVzcyB1cGRhdGVzIGFuZCB3aGVuIHRoZVxyXG4gICAgICogICAgICAgdGFzayBpcyBwYXVzZWQvcmVzdW1lZCB3aXRoIGFuIGBVcGxvYWRUYXNrU25hcHNob3RgIGFzIHRoZSBmaXJzdFxyXG4gICAgICogICAgICAgYXJndW1lbnQuPC9saT5cclxuICAgICAqICAgPGxpPlRoZSBgZXJyb3JgIGZ1bmN0aW9uIGlzIHRyaWdnZXJlZCBpZiB0aGUgdXBsb2FkIGlzIGNhbmNlbGVkIG9yIGZhaWxzXHJcbiAgICAgKiAgICAgICBmb3IgYW5vdGhlciByZWFzb24uPC9saT5cclxuICAgICAqICAgPGxpPlRoZSBgY29tcGxldGVgIGZ1bmN0aW9uIGlzIHRyaWdnZXJlZCBpZiB0aGUgdXBsb2FkIGNvbXBsZXRlc1xyXG4gICAgICogICAgICAgc3VjY2Vzc2Z1bGx5LjwvbGk+XHJcbiAgICAgKiA8L3VsPlxyXG4gICAgICovXHJcbiAgICBTVEFURV9DSEFOR0VEOiAnc3RhdGVfY2hhbmdlZCdcclxufTtcclxuLy8gdHlwZSBrZXlzID0ga2V5b2YgVGFza1N0YXRlXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBjdXJyZW50IHN0YXRlIG9mIGEgcnVubmluZyB1cGxvYWQuXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuY29uc3QgVGFza1N0YXRlID0ge1xyXG4gICAgLyoqIFRoZSB0YXNrIGlzIGN1cnJlbnRseSB0cmFuc2ZlcnJpbmcgZGF0YS4gKi9cclxuICAgIFJVTk5JTkc6ICdydW5uaW5nJyxcclxuICAgIC8qKiBUaGUgdGFzayB3YXMgcGF1c2VkIGJ5IHRoZSB1c2VyLiAqL1xyXG4gICAgUEFVU0VEOiAncGF1c2VkJyxcclxuICAgIC8qKiBUaGUgdGFzayBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LiAqL1xyXG4gICAgU1VDQ0VTUzogJ3N1Y2Nlc3MnLFxyXG4gICAgLyoqIFRoZSB0YXNrIHdhcyBjYW5jZWxlZC4gKi9cclxuICAgIENBTkNFTEVEOiAnY2FuY2VsZWQnLFxyXG4gICAgLyoqIFRoZSB0YXNrIGZhaWxlZCB3aXRoIGFuIGVycm9yLiAqL1xyXG4gICAgRVJST1I6ICdlcnJvcidcclxufTtcclxuZnVuY3Rpb24gdGFza1N0YXRlRnJvbUludGVybmFsVGFza1N0YXRlKHN0YXRlKSB7XHJcbiAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgICAgY2FzZSBcInJ1bm5pbmdcIiAvKiBSVU5OSU5HICovOlxyXG4gICAgICAgIGNhc2UgXCJwYXVzaW5nXCIgLyogUEFVU0lORyAqLzpcclxuICAgICAgICBjYXNlIFwiY2FuY2VsaW5nXCIgLyogQ0FOQ0VMSU5HICovOlxyXG4gICAgICAgICAgICByZXR1cm4gVGFza1N0YXRlLlJVTk5JTkc7XHJcbiAgICAgICAgY2FzZSBcInBhdXNlZFwiIC8qIFBBVVNFRCAqLzpcclxuICAgICAgICAgICAgcmV0dXJuIFRhc2tTdGF0ZS5QQVVTRUQ7XHJcbiAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIiAvKiBTVUNDRVNTICovOlxyXG4gICAgICAgICAgICByZXR1cm4gVGFza1N0YXRlLlNVQ0NFU1M7XHJcbiAgICAgICAgY2FzZSBcImNhbmNlbGVkXCIgLyogQ0FOQ0VMRUQgKi86XHJcbiAgICAgICAgICAgIHJldHVybiBUYXNrU3RhdGUuQ0FOQ0VMRUQ7XHJcbiAgICAgICAgY2FzZSBcImVycm9yXCIgLyogRVJST1IgKi86XHJcbiAgICAgICAgICAgIHJldHVybiBUYXNrU3RhdGUuRVJST1I7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgLy8gVE9ETyhhbmR5c290byk6IGFzc2VydChmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBUYXNrU3RhdGUuRVJST1I7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuY2xhc3MgT2JzZXJ2ZXIge1xyXG4gICAgY29uc3RydWN0b3IobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkge1xyXG4gICAgICAgIGNvbnN0IGFzRnVuY3Rpb25zID0gaXNGdW5jdGlvbihuZXh0T3JPYnNlcnZlcikgfHwgZXJyb3IgIT0gbnVsbCB8fCBjb21wbGV0ZSAhPSBudWxsO1xyXG4gICAgICAgIGlmIChhc0Z1bmN0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLm5leHQgPSBuZXh0T3JPYnNlcnZlcjtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yICE9PSBudWxsICYmIGVycm9yICE9PSB2b2lkIDAgPyBlcnJvciA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZSA9IGNvbXBsZXRlICE9PSBudWxsICYmIGNvbXBsZXRlICE9PSB2b2lkIDAgPyBjb21wbGV0ZSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV4dE9yT2JzZXJ2ZXI7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dCA9IG9ic2VydmVyLm5leHQ7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBvYnNlcnZlci5lcnJvcjtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZSA9IG9ic2VydmVyLmNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG4vKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG4vKipcclxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBmIHdpdGggaXRzIGFyZ3VtZW50cyBhc3luY2hyb25vdXNseSBhcyBhXHJcbiAqIG1pY3JvdGFzaywgaS5lLiBhcyBzb29uIGFzIHBvc3NpYmxlIGFmdGVyIHRoZSBjdXJyZW50IHNjcmlwdCByZXR1cm5zIGJhY2tcclxuICogaW50byBicm93c2VyIGNvZGUuXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xyXG5mdW5jdGlvbiBhc3luYyhmKSB7XHJcbiAgICByZXR1cm4gKC4uLmFyZ3NUb0ZvcndhcmQpID0+IHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWZsb2F0aW5nLXByb21pc2VzXHJcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiBmKC4uLmFyZ3NUb0ZvcndhcmQpKTtcclxuICAgIH07XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqIEFuIG92ZXJyaWRlIGZvciB0aGUgdGV4dC1iYXNlZCBDb25uZWN0aW9uLiBVc2VkIGluIHRlc3RzLiAqL1xyXG5sZXQgdGV4dEZhY3RvcnlPdmVycmlkZSA9IG51bGw7XHJcbi8qKlxyXG4gKiBOZXR3b3JrIGxheWVyIGZvciBicm93c2Vycy4gV2UgdXNlIHRoaXMgaW5zdGVhZCBvZiBnb29nLm5ldC5YaHJJbyBiZWNhdXNlXHJcbiAqIGdvb2cubmV0LlhocklvIGlzIGh5dXV1dWdlIGFuZCBkb2Vzbid0IHdvcmsgaW4gUmVhY3QgTmF0aXZlIG9uIEFuZHJvaWQuXHJcbiAqL1xyXG5jbGFzcyBYaHJDb25uZWN0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2VudF8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnhocl8gPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB0aGlzLmluaXRYaHIoKTtcclxuICAgICAgICB0aGlzLmVycm9yQ29kZV8gPSBFcnJvckNvZGUuTk9fRVJST1I7XHJcbiAgICAgICAgdGhpcy5zZW5kUHJvbWlzZV8gPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgdGhpcy54aHJfLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckNvZGVfID0gRXJyb3JDb2RlLkFCT1JUO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy54aHJfLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckNvZGVfID0gRXJyb3JDb2RlLk5FVFdPUktfRVJST1I7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnhocl8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZW5kKHVybCwgbWV0aG9kLCBib2R5LCBoZWFkZXJzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VudF8pIHtcclxuICAgICAgICAgICAgdGhyb3cgaW50ZXJuYWxFcnJvcignY2Fubm90IC5zZW5kKCkgbW9yZSB0aGFuIG9uY2UnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZW50XyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy54aHJfLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIGlmIChoZWFkZXJzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gaGVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueGhyXy5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib2R5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy54aHJfLnNlbmQoYm9keSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnhocl8uc2VuZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUHJvbWlzZV87XHJcbiAgICB9XHJcbiAgICBnZXRFcnJvckNvZGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlbnRfKSB7XHJcbiAgICAgICAgICAgIHRocm93IGludGVybmFsRXJyb3IoJ2Nhbm5vdCAuZ2V0RXJyb3JDb2RlKCkgYmVmb3JlIHNlbmRpbmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JDb2RlXztcclxuICAgIH1cclxuICAgIGdldFN0YXR1cygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VudF8pIHtcclxuICAgICAgICAgICAgdGhyb3cgaW50ZXJuYWxFcnJvcignY2Fubm90IC5nZXRTdGF0dXMoKSBiZWZvcmUgc2VuZGluZycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy54aHJfLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFJlc3BvbnNlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zZW50Xykge1xyXG4gICAgICAgICAgICB0aHJvdyBpbnRlcm5hbEVycm9yKCdjYW5ub3QgLmdldFJlc3BvbnNlKCkgYmVmb3JlIHNlbmRpbmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueGhyXy5yZXNwb25zZTtcclxuICAgIH1cclxuICAgIGdldEVycm9yVGV4dCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2VudF8pIHtcclxuICAgICAgICAgICAgdGhyb3cgaW50ZXJuYWxFcnJvcignY2Fubm90IC5nZXRFcnJvclRleHQoKSBiZWZvcmUgc2VuZGluZycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy54aHJfLnN0YXR1c1RleHQ7XHJcbiAgICB9XHJcbiAgICAvKiogQWJvcnRzIHRoZSByZXF1ZXN0LiAqL1xyXG4gICAgYWJvcnQoKSB7XHJcbiAgICAgICAgdGhpcy54aHJfLmFib3J0KCk7XHJcbiAgICB9XHJcbiAgICBnZXRSZXNwb25zZUhlYWRlcihoZWFkZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54aHJfLmdldFJlc3BvbnNlSGVhZGVyKGhlYWRlcik7XHJcbiAgICB9XHJcbiAgICBhZGRVcGxvYWRQcm9ncmVzc0xpc3RlbmVyKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMueGhyXy51cGxvYWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnhocl8udXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgbGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbW92ZVVwbG9hZFByb2dyZXNzTGlzdGVuZXIobGlzdGVuZXIpIHtcclxuICAgICAgICBpZiAodGhpcy54aHJfLnVwbG9hZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMueGhyXy51cGxvYWQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmNsYXNzIFhoclRleHRDb25uZWN0aW9uIGV4dGVuZHMgWGhyQ29ubmVjdGlvbiB7XHJcbiAgICBpbml0WGhyKCkge1xyXG4gICAgICAgIHRoaXMueGhyXy5yZXNwb25zZVR5cGUgPSAndGV4dCc7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbmV3VGV4dENvbm5lY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGV4dEZhY3RvcnlPdmVycmlkZSA/IHRleHRGYWN0b3J5T3ZlcnJpZGUoKSA6IG5ldyBYaHJUZXh0Q29ubmVjdGlvbigpO1xyXG59XHJcbmNsYXNzIFhockJ5dGVzQ29ubmVjdGlvbiBleHRlbmRzIFhockNvbm5lY3Rpb24ge1xyXG4gICAgaW5pdFhocigpIHtcclxuICAgICAgICB0aGlzLnhocl8ucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBuZXdCeXRlc0Nvbm5lY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IFhockJ5dGVzQ29ubmVjdGlvbigpO1xyXG59XHJcbmNsYXNzIFhockJsb2JDb25uZWN0aW9uIGV4dGVuZHMgWGhyQ29ubmVjdGlvbiB7XHJcbiAgICBpbml0WGhyKCkge1xyXG4gICAgICAgIHRoaXMueGhyXy5yZXNwb25zZVR5cGUgPSAnYmxvYic7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbmV3QmxvYkNvbm5lY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gbmV3IFhockJsb2JDb25uZWN0aW9uKCk7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBibG9iIGJlaW5nIHVwbG9hZGVkLiBDYW4gYmUgdXNlZCB0byBwYXVzZS9yZXN1bWUvY2FuY2VsIHRoZVxyXG4gKiB1cGxvYWQgYW5kIG1hbmFnZSBjYWxsYmFja3MgZm9yIHZhcmlvdXMgZXZlbnRzLlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNsYXNzIFVwbG9hZFRhc2sge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gcmVmIC0gVGhlIGZpcmViYXNlU3RvcmFnZS5SZWZlcmVuY2Ugb2JqZWN0IHRoaXMgdGFzayBjYW1lXHJcbiAgICAgKiAgICAgZnJvbSwgdW50eXBlZCB0byBhdm9pZCBjeWNsaWMgZGVwZW5kZW5jaWVzLlxyXG4gICAgICogQHBhcmFtIGJsb2IgLSBUaGUgYmxvYiB0byB1cGxvYWQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHJlZiwgYmxvYiwgbWV0YWRhdGEgPSBudWxsKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTnVtYmVyIG9mIGJ5dGVzIHRyYW5zZmVycmVkIHNvIGZhci5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl90cmFuc2ZlcnJlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbmVlZFRvRmV0Y2hTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9uZWVkVG9GZXRjaE1ldGFkYXRhID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5fZXJyb3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fdXBsb2FkVXJsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3JlcXVlc3QgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fY2h1bmtNdWx0aXBsaWVyID0gMTtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX3JlamVjdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9yZWYgPSByZWY7XHJcbiAgICAgICAgdGhpcy5fYmxvYiA9IGJsb2I7XHJcbiAgICAgICAgdGhpcy5fbWV0YWRhdGEgPSBtZXRhZGF0YTtcclxuICAgICAgICB0aGlzLl9tYXBwaW5ncyA9IGdldE1hcHBpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5fcmVzdW1hYmxlID0gdGhpcy5fc2hvdWxkRG9SZXN1bWFibGUodGhpcy5fYmxvYik7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBcInJ1bm5pbmdcIiAvKiBSVU5OSU5HICovO1xyXG4gICAgICAgIHRoaXMuX2Vycm9ySGFuZGxlciA9IGVycm9yID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fY2h1bmtNdWx0aXBsaWVyID0gMTtcclxuICAgICAgICAgICAgaWYgKGVycm9yLl9jb2RlRXF1YWxzKFwiY2FuY2VsZWRcIiAvKiBDQU5DRUxFRCAqLykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25lZWRUb0ZldGNoU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVUcmFuc2l0aW9uc18oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwiZXJyb3JcIiAvKiBFUlJPUiAqLyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX21ldGFkYXRhRXJyb3JIYW5kbGVyID0gZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IuX2NvZGVFcXVhbHMoXCJjYW5jZWxlZFwiIC8qIENBTkNFTEVEICovKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZVRyYW5zaXRpb25zXygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb24oXCJlcnJvclwiIC8qIEVSUk9SICovKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBQcmV2ZW50IHVuY2F1Z2h0IHJlamVjdGlvbnMgb24gdGhlIGludGVybmFsIHByb21pc2UgZnJvbSBidWJibGluZyBvdXRcclxuICAgICAgICAvLyB0byB0aGUgdG9wIGxldmVsIHdpdGggYSBkdW1teSBoYW5kbGVyLlxyXG4gICAgICAgIHRoaXMuX3Byb21pc2UudGhlbihudWxsLCAoKSA9PiB7IH0pO1xyXG4gICAgfVxyXG4gICAgX21ha2VQcm9ncmVzc0NhbGxiYWNrKCkge1xyXG4gICAgICAgIGNvbnN0IHNpemVCZWZvcmUgPSB0aGlzLl90cmFuc2ZlcnJlZDtcclxuICAgICAgICByZXR1cm4gbG9hZGVkID0+IHRoaXMuX3VwZGF0ZVByb2dyZXNzKHNpemVCZWZvcmUgKyBsb2FkZWQpO1xyXG4gICAgfVxyXG4gICAgX3Nob3VsZERvUmVzdW1hYmxlKGJsb2IpIHtcclxuICAgICAgICByZXR1cm4gYmxvYi5zaXplKCkgPiAyNTYgKiAxMDI0O1xyXG4gICAgfVxyXG4gICAgX3N0YXJ0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gXCJydW5uaW5nXCIgLyogUlVOTklORyAqLykge1xyXG4gICAgICAgICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgc29tZW9uZSBwYXVzZXMgdXMgaW4gYSByZXN1bWUgY2FsbGJhY2ssIGZvciBleGFtcGxlLlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fcmVzdW1hYmxlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl91cGxvYWRVcmwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlUmVzdW1hYmxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmVlZFRvRmV0Y2hTdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mZXRjaFN0YXR1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25lZWRUb0ZldGNoTWV0YWRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSGFwcGVucyBpZiB3ZSBtaXNzIHRoZSBtZXRhZGF0YSBvbiB1cGxvYWQgY29tcGxldGlvbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmV0Y2hNZXRhZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGludWVVcGxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uZVNob3RVcGxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfcmVzb2x2ZVRva2VuKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1mbG9hdGluZy1wcm9taXNlc1xyXG4gICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgdGhpcy5fcmVmLnN0b3JhZ2UuX2dldEF1dGhUb2tlbigpLFxyXG4gICAgICAgICAgICB0aGlzLl9yZWYuc3RvcmFnZS5fZ2V0QXBwQ2hlY2tUb2tlbigpXHJcbiAgICAgICAgXSkudGhlbigoW2F1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbl0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInJ1bm5pbmdcIiAvKiBSVU5OSU5HICovOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2FuY2VsaW5nXCIgLyogQ0FOQ0VMSU5HICovOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb24oXCJjYW5jZWxlZFwiIC8qIENBTkNFTEVEICovKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJwYXVzaW5nXCIgLyogUEFVU0lORyAqLzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwicGF1c2VkXCIgLyogUEFVU0VEICovKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gVE9ETyhhbmR5c290byk6IGFzc2VydCBmYWxzZVxyXG4gICAgX2NyZWF0ZVJlc3VtYWJsZSgpIHtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlVG9rZW4oKGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0SW5mbyA9IGNyZWF0ZVJlc3VtYWJsZVVwbG9hZCh0aGlzLl9yZWYuc3RvcmFnZSwgdGhpcy5fcmVmLl9sb2NhdGlvbiwgdGhpcy5fbWFwcGluZ3MsIHRoaXMuX2Jsb2IsIHRoaXMuX21ldGFkYXRhKTtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlUmVxdWVzdCA9IHRoaXMuX3JlZi5zdG9yYWdlLl9tYWtlUmVxdWVzdChyZXF1ZXN0SW5mbywgbmV3VGV4dENvbm5lY3Rpb24sIGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbik7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0O1xyXG4gICAgICAgICAgICBjcmVhdGVSZXF1ZXN0LmdldFByb21pc2UoKS50aGVuKCh1cmwpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlcXVlc3QgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGxvYWRVcmwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uZWVkVG9GZXRjaFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZVRyYW5zaXRpb25zXygpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLl9lcnJvckhhbmRsZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgX2ZldGNoU3RhdHVzKCkge1xyXG4gICAgICAgIC8vIFRPRE8oYW5keXNvdG8pOiBhc3NlcnQodGhpcy51cGxvYWRVcmxfICE9PSBudWxsKTtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLl91cGxvYWRVcmw7XHJcbiAgICAgICAgdGhpcy5fcmVzb2x2ZVRva2VuKChhdXRoVG9rZW4sIGFwcENoZWNrVG9rZW4pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdEluZm8gPSBnZXRSZXN1bWFibGVVcGxvYWRTdGF0dXModGhpcy5fcmVmLnN0b3JhZ2UsIHRoaXMuX3JlZi5fbG9jYXRpb24sIHVybCwgdGhpcy5fYmxvYik7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c1JlcXVlc3QgPSB0aGlzLl9yZWYuc3RvcmFnZS5fbWFrZVJlcXVlc3QocmVxdWVzdEluZm8sIG5ld1RleHRDb25uZWN0aW9uLCBhdXRoVG9rZW4sIGFwcENoZWNrVG9rZW4pO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gc3RhdHVzUmVxdWVzdDtcclxuICAgICAgICAgICAgc3RhdHVzUmVxdWVzdC5nZXRQcm9taXNlKCkudGhlbihzdGF0dXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzKHN0YXR1cy5jdXJyZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25lZWRUb0ZldGNoU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzLmZpbmFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25lZWRUb0ZldGNoTWV0YWRhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZVRyYW5zaXRpb25zXygpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLl9lcnJvckhhbmRsZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgX2NvbnRpbnVlVXBsb2FkKCkge1xyXG4gICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IFJFU1VNQUJMRV9VUExPQURfQ0hVTktfU0laRSAqIHRoaXMuX2NodW5rTXVsdGlwbGllcjtcclxuICAgICAgICBjb25zdCBzdGF0dXMgPSBuZXcgUmVzdW1hYmxlVXBsb2FkU3RhdHVzKHRoaXMuX3RyYW5zZmVycmVkLCB0aGlzLl9ibG9iLnNpemUoKSk7XHJcbiAgICAgICAgLy8gVE9ETyhhbmR5c290byk6IGFzc2VydCh0aGlzLnVwbG9hZFVybF8gIT09IG51bGwpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuX3VwbG9hZFVybDtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlVG9rZW4oKGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdEluZm87XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SW5mbyA9IGNvbnRpbnVlUmVzdW1hYmxlVXBsb2FkKHRoaXMuX3JlZi5fbG9jYXRpb24sIHRoaXMuX3JlZi5zdG9yYWdlLCB1cmwsIHRoaXMuX2Jsb2IsIGNodW5rU2l6ZSwgdGhpcy5fbWFwcGluZ3MsIHN0YXR1cywgdGhpcy5fbWFrZVByb2dyZXNzQ2FsbGJhY2soKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Vycm9yID0gZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb24oXCJlcnJvclwiIC8qIEVSUk9SICovKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB1cGxvYWRSZXF1ZXN0ID0gdGhpcy5fcmVmLnN0b3JhZ2UuX21ha2VSZXF1ZXN0KHJlcXVlc3RJbmZvLCBuZXdUZXh0Q29ubmVjdGlvbiwgYXV0aFRva2VuLCBhcHBDaGVja1Rva2VuKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHVwbG9hZFJlcXVlc3Q7XHJcbiAgICAgICAgICAgIHVwbG9hZFJlcXVlc3QuZ2V0UHJvbWlzZSgpLnRoZW4oKG5ld1N0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5jcmVhc2VNdWx0aXBsaWVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUHJvZ3Jlc3MobmV3U3RhdHVzLmN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1N0YXR1cy5maW5hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YSA9IG5ld1N0YXR1cy5tZXRhZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwic3VjY2Vzc1wiIC8qIFNVQ0NFU1MgKi8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZVRyYW5zaXRpb25zXygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzLl9lcnJvckhhbmRsZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgX2luY3JlYXNlTXVsdGlwbGllcigpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2l6ZSA9IFJFU1VNQUJMRV9VUExPQURfQ0hVTktfU0laRSAqIHRoaXMuX2NodW5rTXVsdGlwbGllcjtcclxuICAgICAgICAvLyBNYXggY2h1bmsgc2l6ZSBpcyAzMk0uXHJcbiAgICAgICAgaWYgKGN1cnJlbnRTaXplIDwgMzIgKiAxMDI0ICogMTAyNCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jaHVua011bHRpcGxpZXIgKj0gMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfZmV0Y2hNZXRhZGF0YSgpIHtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlVG9rZW4oKGF1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0SW5mbyA9IGdldE1ldGFkYXRhJDIodGhpcy5fcmVmLnN0b3JhZ2UsIHRoaXMuX3JlZi5fbG9jYXRpb24sIHRoaXMuX21hcHBpbmdzKTtcclxuICAgICAgICAgICAgY29uc3QgbWV0YWRhdGFSZXF1ZXN0ID0gdGhpcy5fcmVmLnN0b3JhZ2UuX21ha2VSZXF1ZXN0KHJlcXVlc3RJbmZvLCBuZXdUZXh0Q29ubmVjdGlvbiwgYXV0aFRva2VuLCBhcHBDaGVja1Rva2VuKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdCA9IG1ldGFkYXRhUmVxdWVzdDtcclxuICAgICAgICAgICAgbWV0YWRhdGFSZXF1ZXN0LmdldFByb21pc2UoKS50aGVuKG1ldGFkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlcXVlc3QgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXRhZGF0YSA9IG1ldGFkYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbihcInN1Y2Nlc3NcIiAvKiBTVUNDRVNTICovKTtcclxuICAgICAgICAgICAgfSwgdGhpcy5fbWV0YWRhdGFFcnJvckhhbmRsZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgX29uZVNob3RVcGxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzb2x2ZVRva2VuKChhdXRoVG9rZW4sIGFwcENoZWNrVG9rZW4pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdEluZm8gPSBtdWx0aXBhcnRVcGxvYWQodGhpcy5fcmVmLnN0b3JhZ2UsIHRoaXMuX3JlZi5fbG9jYXRpb24sIHRoaXMuX21hcHBpbmdzLCB0aGlzLl9ibG9iLCB0aGlzLl9tZXRhZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGFydFJlcXVlc3QgPSB0aGlzLl9yZWYuc3RvcmFnZS5fbWFrZVJlcXVlc3QocmVxdWVzdEluZm8sIG5ld1RleHRDb25uZWN0aW9uLCBhdXRoVG9rZW4sIGFwcENoZWNrVG9rZW4pO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gbXVsdGlwYXJ0UmVxdWVzdDtcclxuICAgICAgICAgICAgbXVsdGlwYXJ0UmVxdWVzdC5nZXRQcm9taXNlKCkudGhlbihtZXRhZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWV0YWRhdGEgPSBtZXRhZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzKHRoaXMuX2Jsb2Iuc2l6ZSgpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb24oXCJzdWNjZXNzXCIgLyogU1VDQ0VTUyAqLyk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMuX2Vycm9ySGFuZGxlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfdXBkYXRlUHJvZ3Jlc3ModHJhbnNmZXJyZWQpIHtcclxuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLl90cmFuc2ZlcnJlZDtcclxuICAgICAgICB0aGlzLl90cmFuc2ZlcnJlZCA9IHRyYW5zZmVycmVkO1xyXG4gICAgICAgIC8vIEEgcHJvZ3Jlc3MgdXBkYXRlIGNhbiBtYWtlIHRoZSBcInRyYW5zZmVycmVkXCIgdmFsdWUgc21hbGxlciAoZS5nLiBhXHJcbiAgICAgICAgLy8gcGFydGlhbCB1cGxvYWQgbm90IGNvbXBsZXRlZCBieSBzZXJ2ZXIsIGFmdGVyIHdoaWNoIHRoZSBcInRyYW5zZmVycmVkXCJcclxuICAgICAgICAvLyB2YWx1ZSBtYXkgcmVzZXQgdG8gdGhlIHZhbHVlIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHJlcXVlc3QpLlxyXG4gICAgICAgIGlmICh0aGlzLl90cmFuc2ZlcnJlZCAhPT0gb2xkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25vdGlmeU9ic2VydmVycygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF90cmFuc2l0aW9uKHN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBzdGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNhbmNlbGluZ1wiIC8qIENBTkNFTElORyAqLzpcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8oYW5keXNvdG8pOlxyXG4gICAgICAgICAgICAgICAgLy8gYXNzZXJ0KHRoaXMuc3RhdGVfID09PSBJbnRlcm5hbFRhc2tTdGF0ZS5SVU5OSU5HIHx8XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5zdGF0ZV8gPT09IEludGVybmFsVGFza1N0YXRlLlBBVVNJTkcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXF1ZXN0LmNhbmNlbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwYXVzaW5nXCIgLyogUEFVU0lORyAqLzpcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8oYW5keXNvdG8pOlxyXG4gICAgICAgICAgICAgICAgLy8gYXNzZXJ0KHRoaXMuc3RhdGVfID09PSBJbnRlcm5hbFRhc2tTdGF0ZS5SVU5OSU5HKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdC5jYW5jZWwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicnVubmluZ1wiIC8qIFJVTk5JTkcgKi86XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPKGFuZHlzb3RvKTpcclxuICAgICAgICAgICAgICAgIC8vIGFzc2VydCh0aGlzLnN0YXRlXyA9PT0gSW50ZXJuYWxUYXNrU3RhdGUuUEFVU0VEIHx8XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5zdGF0ZV8gPT09IEludGVybmFsVGFza1N0YXRlLlBBVVNJTkcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd2FzUGF1c2VkID0gdGhpcy5fc3RhdGUgPT09IFwicGF1c2VkXCIgLyogUEFVU0VEICovO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgICAgIGlmICh3YXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub3RpZnlPYnNlcnZlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwYXVzZWRcIiAvKiBQQVVTRUQgKi86XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPKGFuZHlzb3RvKTpcclxuICAgICAgICAgICAgICAgIC8vIGFzc2VydCh0aGlzLnN0YXRlXyA9PT0gSW50ZXJuYWxUYXNrU3RhdGUuUEFVU0lORyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm90aWZ5T2JzZXJ2ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNhbmNlbGVkXCIgLyogQ0FOQ0VMRUQgKi86XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPKGFuZHlzb3RvKTpcclxuICAgICAgICAgICAgICAgIC8vIGFzc2VydCh0aGlzLnN0YXRlXyA9PT0gSW50ZXJuYWxUYXNrU3RhdGUuUEFVU0VEIHx8XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5zdGF0ZV8gPT09IEludGVybmFsVGFza1N0YXRlLkNBTkNFTElORyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvciA9IGNhbmNlbGVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm90aWZ5T2JzZXJ2ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVycm9yXCIgLyogRVJST1IgKi86XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPKGFuZHlzb3RvKTpcclxuICAgICAgICAgICAgICAgIC8vIGFzc2VydCh0aGlzLnN0YXRlXyA9PT0gSW50ZXJuYWxUYXNrU3RhdGUuUlVOTklORyB8fFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVfID09PSBJbnRlcm5hbFRhc2tTdGF0ZS5QQVVTSU5HIHx8XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5zdGF0ZV8gPT09IEludGVybmFsVGFza1N0YXRlLkNBTkNFTElORyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm90aWZ5T2JzZXJ2ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIiAvKiBTVUNDRVNTICovOlxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyhhbmR5c290byk6XHJcbiAgICAgICAgICAgICAgICAvLyBhc3NlcnQodGhpcy5zdGF0ZV8gPT09IEludGVybmFsVGFza1N0YXRlLlJVTk5JTkcgfHxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLnN0YXRlXyA9PT0gSW50ZXJuYWxUYXNrU3RhdGUuUEFVU0lORyB8fFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuc3RhdGVfID09PSBJbnRlcm5hbFRhc2tTdGF0ZS5DQU5DRUxJTkcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vdGlmeU9ic2VydmVycygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcGxldGVUcmFuc2l0aW9uc18oKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwicGF1c2luZ1wiIC8qIFBBVVNJTkcgKi86XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwicGF1c2VkXCIgLyogUEFVU0VEICovKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2FuY2VsaW5nXCIgLyogQ0FOQ0VMSU5HICovOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbihcImNhbmNlbGVkXCIgLyogQ0FOQ0VMRUQgKi8pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJydW5uaW5nXCIgLyogUlVOTklORyAqLzpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEEgc25hcHNob3Qgb2YgdGhlIGN1cnJlbnQgdGFzayBzdGF0ZS5cclxuICAgICAqL1xyXG4gICAgZ2V0IHNuYXBzaG90KCkge1xyXG4gICAgICAgIGNvbnN0IGV4dGVybmFsU3RhdGUgPSB0YXNrU3RhdGVGcm9tSW50ZXJuYWxUYXNrU3RhdGUodGhpcy5fc3RhdGUpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJ5dGVzVHJhbnNmZXJyZWQ6IHRoaXMuX3RyYW5zZmVycmVkLFxyXG4gICAgICAgICAgICB0b3RhbEJ5dGVzOiB0aGlzLl9ibG9iLnNpemUoKSxcclxuICAgICAgICAgICAgc3RhdGU6IGV4dGVybmFsU3RhdGUsXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB0aGlzLl9tZXRhZGF0YSxcclxuICAgICAgICAgICAgdGFzazogdGhpcyxcclxuICAgICAgICAgICAgcmVmOiB0aGlzLl9yZWZcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgY2FsbGJhY2sgZm9yIGFuIGV2ZW50LlxyXG4gICAgICogQHBhcmFtIHR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0byBsaXN0ZW4gZm9yLlxyXG4gICAgICogQHBhcmFtIG5leHRPck9ic2VydmVyIC1cclxuICAgICAqICAgICBUaGUgYG5leHRgIGZ1bmN0aW9uLCB3aGljaCBnZXRzIGNhbGxlZCBmb3IgZWFjaCBpdGVtIGluXHJcbiAgICAgKiAgICAgdGhlIGV2ZW50IHN0cmVhbSwgb3IgYW4gb2JzZXJ2ZXIgb2JqZWN0IHdpdGggc29tZSBvciBhbGwgb2YgdGhlc2UgdGhyZWVcclxuICAgICAqICAgICBwcm9wZXJ0aWVzIChgbmV4dGAsIGBlcnJvcmAsIGBjb21wbGV0ZWApLlxyXG4gICAgICogQHBhcmFtIGVycm9yIC0gQSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIHdpdGggYSBgU3RvcmFnZUVycm9yYFxyXG4gICAgICogICAgIGlmIHRoZSBldmVudCBzdHJlYW0gZW5kcyBkdWUgdG8gYW4gZXJyb3IuXHJcbiAgICAgKiBAcGFyYW0gY29tcGxldGVkIC0gQSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGlmIHRoZVxyXG4gICAgICogICAgIGV2ZW50IHN0cmVhbSBlbmRzIG5vcm1hbGx5LlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqICAgICBJZiBvbmx5IHRoZSBldmVudCBhcmd1bWVudCBpcyBwYXNzZWQsIHJldHVybnMgYSBmdW5jdGlvbiB5b3UgY2FuIHVzZSB0b1xyXG4gICAgICogICAgIGFkZCBjYWxsYmFja3MgKHNlZSB0aGUgZXhhbXBsZXMgYWJvdmUpLiBJZiBtb3JlIHRoYW4ganVzdCB0aGUgZXZlbnRcclxuICAgICAqICAgICBhcmd1bWVudCBpcyBwYXNzZWQsIHJldHVybnMgYSBmdW5jdGlvbiB5b3UgY2FuIGNhbGwgdG8gdW5yZWdpc3RlciB0aGVcclxuICAgICAqICAgICBjYWxsYmFja3MuXHJcbiAgICAgKi9cclxuICAgIG9uKHR5cGUsIG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGVkKSB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIobmV4dE9yT2JzZXJ2ZXIgfHwgdW5kZWZpbmVkLCBlcnJvciB8fCB1bmRlZmluZWQsIGNvbXBsZXRlZCB8fCB1bmRlZmluZWQpO1xyXG4gICAgICAgIHRoaXMuX2FkZE9ic2VydmVyKG9ic2VydmVyKTtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVPYnNlcnZlcihvYnNlcnZlcik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBvYmplY3QgYmVoYXZlcyBsaWtlIGEgUHJvbWlzZSwgYW5kIHJlc29sdmVzIHdpdGggaXRzIHNuYXBzaG90IGRhdGFcclxuICAgICAqIHdoZW4gdGhlIHVwbG9hZCBjb21wbGV0ZXMuXHJcbiAgICAgKiBAcGFyYW0gb25GdWxmaWxsZWQgLSBUaGUgZnVsZmlsbG1lbnQgY2FsbGJhY2suIFByb21pc2UgY2hhaW5pbmcgd29ya3MgYXMgbm9ybWFsLlxyXG4gICAgICogQHBhcmFtIG9uUmVqZWN0ZWQgLSBUaGUgcmVqZWN0aW9uIGNhbGxiYWNrLlxyXG4gICAgICovXHJcbiAgICB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XHJcbiAgICAgICAgLy8gVGhlc2UgY2FzdHMgYXJlIG5lZWRlZCBzbyB0aGF0IFR5cGVTY3JpcHQgY2FuIGluZmVyIHRoZSB0eXBlcyBvZiB0aGVcclxuICAgICAgICAvLyByZXN1bHRpbmcgUHJvbWlzZS5cclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRXF1aXZhbGVudCB0byBjYWxsaW5nIGB0aGVuKG51bGwsIG9uUmVqZWN0ZWQpYC5cclxuICAgICAqL1xyXG4gICAgY2F0Y2gob25SZWplY3RlZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3RlZCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdGhlIGdpdmVuIG9ic2VydmVyLlxyXG4gICAgICovXHJcbiAgICBfYWRkT2JzZXJ2ZXIob2JzZXJ2ZXIpIHtcclxuICAgICAgICB0aGlzLl9vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgdGhpcy5fbm90aWZ5T2JzZXJ2ZXIob2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBvYnNlcnZlci5cclxuICAgICAqL1xyXG4gICAgX3JlbW92ZU9ic2VydmVyKG9ic2VydmVyKSB7XHJcbiAgICAgICAgY29uc3QgaSA9IHRoaXMuX29ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcclxuICAgICAgICBpZiAoaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfbm90aWZ5T2JzZXJ2ZXJzKCkge1xyXG4gICAgICAgIHRoaXMuX2ZpbmlzaFByb21pc2UoKTtcclxuICAgICAgICBjb25zdCBvYnNlcnZlcnMgPSB0aGlzLl9vYnNlcnZlcnMuc2xpY2UoKTtcclxuICAgICAgICBvYnNlcnZlcnMuZm9yRWFjaChvYnNlcnZlciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX25vdGlmeU9ic2VydmVyKG9ic2VydmVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIF9maW5pc2hQcm9taXNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZXNvbHZlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbGV0IHRyaWdnZXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGFza1N0YXRlRnJvbUludGVybmFsVGFza1N0YXRlKHRoaXMuX3N0YXRlKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuU1VDQ0VTUzpcclxuICAgICAgICAgICAgICAgICAgICBhc3luYyh0aGlzLl9yZXNvbHZlLmJpbmQobnVsbCwgdGhpcy5zbmFwc2hvdCkpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5DQU5DRUxFRDpcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLkVSUk9SOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvQ2FsbCA9IHRoaXMuX3JlamVjdDtcclxuICAgICAgICAgICAgICAgICAgICBhc3luYyh0b0NhbGwuYmluZChudWxsLCB0aGlzLl9lcnJvcikpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWplY3QgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBfbm90aWZ5T2JzZXJ2ZXIob2JzZXJ2ZXIpIHtcclxuICAgICAgICBjb25zdCBleHRlcm5hbFN0YXRlID0gdGFza1N0YXRlRnJvbUludGVybmFsVGFza1N0YXRlKHRoaXMuX3N0YXRlKTtcclxuICAgICAgICBzd2l0Y2ggKGV4dGVybmFsU3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuUlVOTklORzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuUEFVU0VEOlxyXG4gICAgICAgICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhc3luYyhvYnNlcnZlci5uZXh0LmJpbmQob2JzZXJ2ZXIsIHRoaXMuc25hcHNob3QpKSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLlNVQ0NFU1M6XHJcbiAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIuY29tcGxldGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhc3luYyhvYnNlcnZlci5jb21wbGV0ZS5iaW5kKG9ic2VydmVyKSkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5DQU5DRUxFRDpcclxuICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuRVJST1I6XHJcbiAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBhc3luYyhvYnNlcnZlci5lcnJvci5iaW5kKG9ic2VydmVyLCB0aGlzLl9lcnJvcikpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8oYW5keXNvdG8pOiBhc3NlcnQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ic2VydmVyLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMob2JzZXJ2ZXIuZXJyb3IuYmluZChvYnNlcnZlciwgdGhpcy5fZXJyb3IpKSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVzdW1lcyBhIHBhdXNlZCB0YXNrLiBIYXMgbm8gZWZmZWN0IG9uIGEgY3VycmVudGx5IHJ1bm5pbmcgb3IgZmFpbGVkIHRhc2suXHJcbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBvcGVyYXRpb24gdG9vayBlZmZlY3QsIGZhbHNlIGlmIGlnbm9yZWQuXHJcbiAgICAgKi9cclxuICAgIHJlc3VtZSgpIHtcclxuICAgICAgICBjb25zdCB2YWxpZCA9IHRoaXMuX3N0YXRlID09PSBcInBhdXNlZFwiIC8qIFBBVVNFRCAqLyB8fFxyXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9PT0gXCJwYXVzaW5nXCIgLyogUEFVU0lORyAqLztcclxuICAgICAgICBpZiAodmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbihcInJ1bm5pbmdcIiAvKiBSVU5OSU5HICovKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXVzZXMgYSBjdXJyZW50bHkgcnVubmluZyB0YXNrLiBIYXMgbm8gZWZmZWN0IG9uIGEgcGF1c2VkIG9yIGZhaWxlZCB0YXNrLlxyXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgb3BlcmF0aW9uIHRvb2sgZWZmZWN0LCBmYWxzZSBpZiBpZ25vcmVkLlxyXG4gICAgICovXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICBjb25zdCB2YWxpZCA9IHRoaXMuX3N0YXRlID09PSBcInJ1bm5pbmdcIiAvKiBSVU5OSU5HICovO1xyXG4gICAgICAgIGlmICh2YWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uKFwicGF1c2luZ1wiIC8qIFBBVVNJTkcgKi8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsaWQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENhbmNlbHMgYSBjdXJyZW50bHkgcnVubmluZyBvciBwYXVzZWQgdGFzay4gSGFzIG5vIGVmZmVjdCBvbiBhIGNvbXBsZXRlIG9yXHJcbiAgICAgKiBmYWlsZWQgdGFzay5cclxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG9wZXJhdGlvbiB0b29rIGVmZmVjdCwgZmFsc2UgaWYgaWdub3JlZC5cclxuICAgICAqL1xyXG4gICAgY2FuY2VsKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy5fc3RhdGUgPT09IFwicnVubmluZ1wiIC8qIFJVTk5JTkcgKi8gfHxcclxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPT09IFwicGF1c2luZ1wiIC8qIFBBVVNJTkcgKi87XHJcbiAgICAgICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb24oXCJjYW5jZWxpbmdcIiAvKiBDQU5DRUxJTkcgKi8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsaWQ7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFByb3ZpZGVzIG1ldGhvZHMgdG8gaW50ZXJhY3Qgd2l0aCBhIGJ1Y2tldCBpbiB0aGUgRmlyZWJhc2UgU3RvcmFnZSBzZXJ2aWNlLlxyXG4gKiBAaW50ZXJuYWxcclxuICogQHBhcmFtIF9sb2NhdGlvbiAtIEFuIGZicy5sb2NhdGlvbiwgb3IgdGhlIFVSTCBhdFxyXG4gKiAgICAgd2hpY2ggdG8gYmFzZSB0aGlzIG9iamVjdCwgaW4gb25lIG9mIHRoZSBmb2xsb3dpbmcgZm9ybXM6XHJcbiAqICAgICAgICAgZ3M6Ly88YnVja2V0Pi88b2JqZWN0LXBhdGg+XHJcbiAqICAgICAgICAgaHR0cFtzXTovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9cclxuICogICAgICAgICAgICAgICAgICAgICA8YXBpLXZlcnNpb24+L2IvPGJ1Y2tldD4vby88b2JqZWN0LXBhdGg+XHJcbiAqICAgICBBbnkgcXVlcnkgb3IgZnJhZ21lbnQgc3RyaW5ncyB3aWxsIGJlIGlnbm9yZWQgaW4gdGhlIGh0dHBbc11cclxuICogICAgIGZvcm1hdC4gSWYgbm8gdmFsdWUgaXMgcGFzc2VkLCB0aGUgc3RvcmFnZSBvYmplY3Qgd2lsbCB1c2UgYSBVUkwgYmFzZWQgb25cclxuICogICAgIHRoZSBwcm9qZWN0IElEIG9mIHRoZSBiYXNlIGZpcmViYXNlLkFwcCBpbnN0YW5jZS5cclxuICovXHJcbmNsYXNzIFJlZmVyZW5jZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihfc2VydmljZSwgbG9jYXRpb24pIHtcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlID0gX3NlcnZpY2U7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uIGluc3RhbmNlb2YgTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gTG9jYXRpb24ubWFrZUZyb21VcmwobG9jYXRpb24sIF9zZXJ2aWNlLmhvc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgVVJMIGZvciB0aGUgYnVja2V0IGFuZCBwYXRoIHRoaXMgb2JqZWN0IHJlZmVyZW5jZXMsXHJcbiAgICAgKiAgICAgaW4gdGhlIGZvcm0gZ3M6Ly88YnVja2V0Pi88b2JqZWN0LXBhdGg+XHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqL1xyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuICdnczovLycgKyB0aGlzLl9sb2NhdGlvbi5idWNrZXQgKyAnLycgKyB0aGlzLl9sb2NhdGlvbi5wYXRoO1xyXG4gICAgfVxyXG4gICAgX25ld1JlZihzZXJ2aWNlLCBsb2NhdGlvbikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVmZXJlbmNlKHNlcnZpY2UsIGxvY2F0aW9uKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIHJvb3Qgb2YgdGhpcyBvYmplY3QncyBidWNrZXQuXHJcbiAgICAgKi9cclxuICAgIGdldCByb290KCkge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gbmV3IExvY2F0aW9uKHRoaXMuX2xvY2F0aW9uLmJ1Y2tldCwgJycpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uZXdSZWYodGhpcy5fc2VydmljZSwgbG9jYXRpb24pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgYnVja2V0IGNvbnRhaW5pbmcgdGhpcyByZWZlcmVuY2UncyBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGdldCBidWNrZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uLmJ1Y2tldDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZ1bGwgcGF0aCBvZiB0aGlzIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZ2V0IGZ1bGxQYXRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbi5wYXRoO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2hvcnQgbmFtZSBvZiB0aGlzIG9iamVjdCwgd2hpY2ggaXMgdGhlIGxhc3QgY29tcG9uZW50IG9mIHRoZSBmdWxsIHBhdGguXHJcbiAgICAgKiBGb3IgZXhhbXBsZSwgaWYgZnVsbFBhdGggaXMgJ2Z1bGwvcGF0aC9pbWFnZS5wbmcnLCBuYW1lIGlzICdpbWFnZS5wbmcnLlxyXG4gICAgICovXHJcbiAgICBnZXQgbmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gbGFzdENvbXBvbmVudCh0aGlzLl9sb2NhdGlvbi5wYXRoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGBTdG9yYWdlU2VydmljZWAgaW5zdGFuY2UgdGhpcyBgU3RvcmFnZVJlZmVyZW5jZWAgaXMgYXNzb2NpYXRlZCB3aXRoLlxyXG4gICAgICovXHJcbiAgICBnZXQgc3RvcmFnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQSBgU3RvcmFnZVJlZmVyZW5jZWAgcG9pbnRpbmcgdG8gdGhlIHBhcmVudCBsb2NhdGlvbiBvZiB0aGlzIGBTdG9yYWdlUmVmZXJlbmNlYCwgb3IgbnVsbCBpZlxyXG4gICAgICogdGhpcyByZWZlcmVuY2UgaXMgdGhlIHJvb3QuXHJcbiAgICAgKi9cclxuICAgIGdldCBwYXJlbnQoKSB7XHJcbiAgICAgICAgY29uc3QgbmV3UGF0aCA9IHBhcmVudCh0aGlzLl9sb2NhdGlvbi5wYXRoKTtcclxuICAgICAgICBpZiAobmV3UGF0aCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBuZXcgTG9jYXRpb24odGhpcy5fbG9jYXRpb24uYnVja2V0LCBuZXdQYXRoKTtcclxuICAgICAgICByZXR1cm4gbmV3IFJlZmVyZW5jZSh0aGlzLl9zZXJ2aWNlLCBsb2NhdGlvbik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gdGhyb3cgYW4gZXJyb3IgaW4gbWV0aG9kcyB0aGF0IGRvIG5vdCBhY2NlcHQgYSByb290IHJlZmVyZW5jZS5cclxuICAgICAqL1xyXG4gICAgX3Rocm93SWZSb290KG5hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG9jYXRpb24ucGF0aCA9PT0gJycpIHtcclxuICAgICAgICAgICAgdGhyb3cgaW52YWxpZFJvb3RPcGVyYXRpb24obmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBEb3dubG9hZCB0aGUgYnl0ZXMgYXQgdGhlIG9iamVjdCdzIGxvY2F0aW9uLlxyXG4gKiBAcmV0dXJucyBBIFByb21pc2UgY29udGFpbmluZyB0aGUgZG93bmxvYWRlZCBieXRlcy5cclxuICovXHJcbmZ1bmN0aW9uIGdldEJ5dGVzSW50ZXJuYWwocmVmLCBtYXhEb3dubG9hZFNpemVCeXRlcykge1xyXG4gICAgcmVmLl90aHJvd0lmUm9vdCgnZ2V0Qnl0ZXMnKTtcclxuICAgIGNvbnN0IHJlcXVlc3RJbmZvID0gZ2V0Qnl0ZXMkMShyZWYuc3RvcmFnZSwgcmVmLl9sb2NhdGlvbiwgbWF4RG93bmxvYWRTaXplQnl0ZXMpO1xyXG4gICAgcmV0dXJuIHJlZi5zdG9yYWdlXHJcbiAgICAgICAgLm1ha2VSZXF1ZXN0V2l0aFRva2VucyhyZXF1ZXN0SW5mbywgbmV3Qnl0ZXNDb25uZWN0aW9uKVxyXG4gICAgICAgIC50aGVuKGJ5dGVzID0+IG1heERvd25sb2FkU2l6ZUJ5dGVzICE9PSB1bmRlZmluZWRcclxuICAgICAgICA/IC8vIEdDUyBtYXkgbm90IGhvbm9yIHRoZSBSYW5nZSBoZWFkZXIgZm9yIHNtYWxsIGZpbGVzXHJcbiAgICAgICAgICAgIGJ5dGVzLnNsaWNlKDAsIG1heERvd25sb2FkU2l6ZUJ5dGVzKVxyXG4gICAgICAgIDogYnl0ZXMpO1xyXG59XHJcbi8qKlxyXG4gKiBEb3dubG9hZCB0aGUgYnl0ZXMgYXQgdGhlIG9iamVjdCdzIGxvY2F0aW9uLlxyXG4gKiBAcmV0dXJucyBBIFByb21pc2UgY29udGFpbmluZyB0aGUgZG93bmxvYWRlZCBibG9iLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QmxvYkludGVybmFsKHJlZiwgbWF4RG93bmxvYWRTaXplQnl0ZXMpIHtcclxuICAgIHJlZi5fdGhyb3dJZlJvb3QoJ2dldEJsb2InKTtcclxuICAgIGNvbnN0IHJlcXVlc3RJbmZvID0gZ2V0Qnl0ZXMkMShyZWYuc3RvcmFnZSwgcmVmLl9sb2NhdGlvbiwgbWF4RG93bmxvYWRTaXplQnl0ZXMpO1xyXG4gICAgcmV0dXJuIHJlZi5zdG9yYWdlXHJcbiAgICAgICAgLm1ha2VSZXF1ZXN0V2l0aFRva2VucyhyZXF1ZXN0SW5mbywgbmV3QmxvYkNvbm5lY3Rpb24pXHJcbiAgICAgICAgLnRoZW4oYmxvYiA9PiBtYXhEb3dubG9hZFNpemVCeXRlcyAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgPyAvLyBHQ1MgbWF5IG5vdCBob25vciB0aGUgUmFuZ2UgaGVhZGVyIGZvciBzbWFsbCBmaWxlc1xyXG4gICAgICAgICAgICBibG9iLnNsaWNlKDAsIG1heERvd25sb2FkU2l6ZUJ5dGVzKVxyXG4gICAgICAgIDogYmxvYik7XHJcbn1cclxuLyoqXHJcbiAqIFVwbG9hZHMgZGF0YSB0byB0aGlzIG9iamVjdCdzIGxvY2F0aW9uLlxyXG4gKiBUaGUgdXBsb2FkIGlzIG5vdCByZXN1bWFibGUuXHJcbiAqXHJcbiAqIEBwYXJhbSByZWYgLSBTdG9yYWdlUmVmZXJlbmNlIHdoZXJlIGRhdGEgc2hvdWxkIGJlIHVwbG9hZGVkLlxyXG4gKiBAcGFyYW0gZGF0YSAtIFRoZSBkYXRhIHRvIHVwbG9hZC5cclxuICogQHBhcmFtIG1ldGFkYXRhIC0gTWV0YWRhdGEgZm9yIHRoZSBuZXdseSB1cGxvYWRlZCBkYXRhLlxyXG4gKiBAcmV0dXJucyBBIFByb21pc2UgY29udGFpbmluZyBhbiBVcGxvYWRSZXN1bHRcclxuICovXHJcbmZ1bmN0aW9uIHVwbG9hZEJ5dGVzJDEocmVmLCBkYXRhLCBtZXRhZGF0YSkge1xyXG4gICAgcmVmLl90aHJvd0lmUm9vdCgndXBsb2FkQnl0ZXMnKTtcclxuICAgIGNvbnN0IHJlcXVlc3RJbmZvID0gbXVsdGlwYXJ0VXBsb2FkKHJlZi5zdG9yYWdlLCByZWYuX2xvY2F0aW9uLCBnZXRNYXBwaW5ncygpLCBuZXcgRmJzQmxvYihkYXRhLCB0cnVlKSwgbWV0YWRhdGEpO1xyXG4gICAgcmV0dXJuIHJlZi5zdG9yYWdlXHJcbiAgICAgICAgLm1ha2VSZXF1ZXN0V2l0aFRva2VucyhyZXF1ZXN0SW5mbywgbmV3VGV4dENvbm5lY3Rpb24pXHJcbiAgICAgICAgLnRoZW4oZmluYWxNZXRhZGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWV0YWRhdGE6IGZpbmFsTWV0YWRhdGEsXHJcbiAgICAgICAgICAgIHJlZlxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogVXBsb2FkcyBkYXRhIHRvIHRoaXMgb2JqZWN0J3MgbG9jYXRpb24uXHJcbiAqIFRoZSB1cGxvYWQgY2FuIGJlIHBhdXNlZCBhbmQgcmVzdW1lZCwgYW5kIGV4cG9zZXMgcHJvZ3Jlc3MgdXBkYXRlcy5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0gU3RvcmFnZVJlZmVyZW5jZSB3aGVyZSBkYXRhIHNob3VsZCBiZSB1cGxvYWRlZC5cclxuICogQHBhcmFtIGRhdGEgLSBUaGUgZGF0YSB0byB1cGxvYWQuXHJcbiAqIEBwYXJhbSBtZXRhZGF0YSAtIE1ldGFkYXRhIGZvciB0aGUgbmV3bHkgdXBsb2FkZWQgZGF0YS5cclxuICogQHJldHVybnMgQW4gVXBsb2FkVGFza1xyXG4gKi9cclxuZnVuY3Rpb24gdXBsb2FkQnl0ZXNSZXN1bWFibGUkMShyZWYsIGRhdGEsIG1ldGFkYXRhKSB7XHJcbiAgICByZWYuX3Rocm93SWZSb290KCd1cGxvYWRCeXRlc1Jlc3VtYWJsZScpO1xyXG4gICAgcmV0dXJuIG5ldyBVcGxvYWRUYXNrKHJlZiwgbmV3IEZic0Jsb2IoZGF0YSksIG1ldGFkYXRhKTtcclxufVxyXG4vKipcclxuICogVXBsb2FkcyBhIHN0cmluZyB0byB0aGlzIG9iamVjdCdzIGxvY2F0aW9uLlxyXG4gKiBUaGUgdXBsb2FkIGlzIG5vdCByZXN1bWFibGUuXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIFN0b3JhZ2VSZWZlcmVuY2Ugd2hlcmUgc3RyaW5nIHNob3VsZCBiZSB1cGxvYWRlZC5cclxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHN0cmluZyB0byB1cGxvYWQuXHJcbiAqIEBwYXJhbSBmb3JtYXQgLSBUaGUgZm9ybWF0IG9mIHRoZSBzdHJpbmcgdG8gdXBsb2FkLlxyXG4gKiBAcGFyYW0gbWV0YWRhdGEgLSBNZXRhZGF0YSBmb3IgdGhlIG5ld2x5IHVwbG9hZGVkIHN0cmluZy5cclxuICogQHJldHVybnMgQSBQcm9taXNlIGNvbnRhaW5pbmcgYW4gVXBsb2FkUmVzdWx0XHJcbiAqL1xyXG5mdW5jdGlvbiB1cGxvYWRTdHJpbmckMShyZWYsIHZhbHVlLCBmb3JtYXQgPSBTdHJpbmdGb3JtYXQuUkFXLCBtZXRhZGF0YSkge1xyXG4gICAgcmVmLl90aHJvd0lmUm9vdCgndXBsb2FkU3RyaW5nJyk7XHJcbiAgICBjb25zdCBkYXRhID0gZGF0YUZyb21TdHJpbmcoZm9ybWF0LCB2YWx1ZSk7XHJcbiAgICBjb25zdCBtZXRhZGF0YUNsb25lID0gT2JqZWN0LmFzc2lnbih7fSwgbWV0YWRhdGEpO1xyXG4gICAgaWYgKG1ldGFkYXRhQ2xvbmVbJ2NvbnRlbnRUeXBlJ10gPT0gbnVsbCAmJiBkYXRhLmNvbnRlbnRUeXBlICE9IG51bGwpIHtcclxuICAgICAgICBtZXRhZGF0YUNsb25lWydjb250ZW50VHlwZSddID0gZGF0YS5jb250ZW50VHlwZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1cGxvYWRCeXRlcyQxKHJlZiwgZGF0YS5kYXRhLCBtZXRhZGF0YUNsb25lKTtcclxufVxyXG4vKipcclxuICogTGlzdCBhbGwgaXRlbXMgKGZpbGVzKSBhbmQgcHJlZml4ZXMgKGZvbGRlcnMpIHVuZGVyIHRoaXMgc3RvcmFnZSByZWZlcmVuY2UuXHJcbiAqXHJcbiAqIFRoaXMgaXMgYSBoZWxwZXIgbWV0aG9kIGZvciBjYWxsaW5nIGxpc3QoKSByZXBlYXRlZGx5IHVudGlsIHRoZXJlIGFyZVxyXG4gKiBubyBtb3JlIHJlc3VsdHMuIFRoZSBkZWZhdWx0IHBhZ2luYXRpb24gc2l6ZSBpcyAxMDAwLlxyXG4gKlxyXG4gKiBOb3RlOiBUaGUgcmVzdWx0cyBtYXkgbm90IGJlIGNvbnNpc3RlbnQgaWYgb2JqZWN0cyBhcmUgY2hhbmdlZCB3aGlsZSB0aGlzXHJcbiAqIG9wZXJhdGlvbiBpcyBydW5uaW5nLlxyXG4gKlxyXG4gKiBXYXJuaW5nOiBsaXN0QWxsIG1heSBwb3RlbnRpYWxseSBjb25zdW1lIHRvbyBtYW55IHJlc291cmNlcyBpZiB0aGVyZSBhcmVcclxuICogdG9vIG1hbnkgcmVzdWx0cy5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0gU3RvcmFnZVJlZmVyZW5jZSB0byBnZXQgbGlzdCBmcm9tLlxyXG4gKlxyXG4gKiBAcmV0dXJucyBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGFsbCB0aGUgaXRlbXMgYW5kIHByZWZpeGVzIHVuZGVyXHJcbiAqICAgICAgdGhlIGN1cnJlbnQgc3RvcmFnZSByZWZlcmVuY2UuIGBwcmVmaXhlc2AgY29udGFpbnMgcmVmZXJlbmNlcyB0b1xyXG4gKiAgICAgIHN1Yi1kaXJlY3RvcmllcyBhbmQgYGl0ZW1zYCBjb250YWlucyByZWZlcmVuY2VzIHRvIG9iamVjdHMgaW4gdGhpc1xyXG4gKiAgICAgIGZvbGRlci4gYG5leHRQYWdlVG9rZW5gIGlzIG5ldmVyIHJldHVybmVkLlxyXG4gKi9cclxuZnVuY3Rpb24gbGlzdEFsbCQxKHJlZikge1xyXG4gICAgY29uc3QgYWNjdW11bGF0b3IgPSB7XHJcbiAgICAgICAgcHJlZml4ZXM6IFtdLFxyXG4gICAgICAgIGl0ZW1zOiBbXVxyXG4gICAgfTtcclxuICAgIHJldHVybiBsaXN0QWxsSGVscGVyKHJlZiwgYWNjdW11bGF0b3IpLnRoZW4oKCkgPT4gYWNjdW11bGF0b3IpO1xyXG59XHJcbi8qKlxyXG4gKiBTZXBhcmF0ZWQgZnJvbSBsaXN0QWxsIGJlY2F1c2UgYXN5bmMgZnVuY3Rpb25zIGNhbid0IHVzZSBcImFyZ3VtZW50c1wiLlxyXG4gKiBAcGFyYW0gcmVmXHJcbiAqIEBwYXJhbSBhY2N1bXVsYXRvclxyXG4gKiBAcGFyYW0gcGFnZVRva2VuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBsaXN0QWxsSGVscGVyKHJlZiwgYWNjdW11bGF0b3IsIHBhZ2VUb2tlbikge1xyXG4gICAgY29uc3Qgb3B0ID0ge1xyXG4gICAgICAgIC8vIG1heFJlc3VsdHMgaXMgMTAwMCBieSBkZWZhdWx0LlxyXG4gICAgICAgIHBhZ2VUb2tlblxyXG4gICAgfTtcclxuICAgIGNvbnN0IG5leHRQYWdlID0gYXdhaXQgbGlzdCQxKHJlZiwgb3B0KTtcclxuICAgIGFjY3VtdWxhdG9yLnByZWZpeGVzLnB1c2goLi4ubmV4dFBhZ2UucHJlZml4ZXMpO1xyXG4gICAgYWNjdW11bGF0b3IuaXRlbXMucHVzaCguLi5uZXh0UGFnZS5pdGVtcyk7XHJcbiAgICBpZiAobmV4dFBhZ2UubmV4dFBhZ2VUb2tlbiAhPSBudWxsKSB7XHJcbiAgICAgICAgYXdhaXQgbGlzdEFsbEhlbHBlcihyZWYsIGFjY3VtdWxhdG9yLCBuZXh0UGFnZS5uZXh0UGFnZVRva2VuKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICogTGlzdCBpdGVtcyAoZmlsZXMpIGFuZCBwcmVmaXhlcyAoZm9sZGVycykgdW5kZXIgdGhpcyBzdG9yYWdlIHJlZmVyZW5jZS5cclxuICpcclxuICogTGlzdCBBUEkgaXMgb25seSBhdmFpbGFibGUgZm9yIEZpcmViYXNlIFJ1bGVzIFZlcnNpb24gMi5cclxuICpcclxuICogR0NTIGlzIGEga2V5LWJsb2Igc3RvcmUuIEZpcmViYXNlIFN0b3JhZ2UgaW1wb3NlcyB0aGUgc2VtYW50aWMgb2YgJy8nXHJcbiAqIGRlbGltaXRlZCBmb2xkZXIgc3RydWN0dXJlLlxyXG4gKiBSZWZlciB0byBHQ1MncyBMaXN0IEFQSSBpZiB5b3Ugd2FudCB0byBsZWFybiBtb3JlLlxyXG4gKlxyXG4gKiBUbyBhZGhlcmUgdG8gRmlyZWJhc2UgUnVsZXMncyBTZW1hbnRpY3MsIEZpcmViYXNlIFN0b3JhZ2UgZG9lcyBub3RcclxuICogc3VwcG9ydCBvYmplY3RzIHdob3NlIHBhdGhzIGVuZCB3aXRoIFwiL1wiIG9yIGNvbnRhaW4gdHdvIGNvbnNlY3V0aXZlXHJcbiAqIFwiL1wicy4gRmlyZWJhc2UgU3RvcmFnZSBMaXN0IEFQSSB3aWxsIGZpbHRlciB0aGVzZSB1bnN1cHBvcnRlZCBvYmplY3RzLlxyXG4gKiBsaXN0KCkgbWF5IGZhaWwgaWYgdGhlcmUgYXJlIHRvbyBtYW55IHVuc3VwcG9ydGVkIG9iamVjdHMgaW4gdGhlIGJ1Y2tldC5cclxuICogQHB1YmxpY1xyXG4gKlxyXG4gKiBAcGFyYW0gcmVmIC0gU3RvcmFnZVJlZmVyZW5jZSB0byBnZXQgbGlzdCBmcm9tLlxyXG4gKiBAcGFyYW0gb3B0aW9ucyAtIFNlZSBMaXN0T3B0aW9ucyBmb3IgZGV0YWlscy5cclxuICogQHJldHVybnMgQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgaXRlbXMgYW5kIHByZWZpeGVzLlxyXG4gKiAgICAgIGBwcmVmaXhlc2AgY29udGFpbnMgcmVmZXJlbmNlcyB0byBzdWItZm9sZGVycyBhbmQgYGl0ZW1zYFxyXG4gKiAgICAgIGNvbnRhaW5zIHJlZmVyZW5jZXMgdG8gb2JqZWN0cyBpbiB0aGlzIGZvbGRlci4gYG5leHRQYWdlVG9rZW5gXHJcbiAqICAgICAgY2FuIGJlIHVzZWQgdG8gZ2V0IHRoZSByZXN0IG9mIHRoZSByZXN1bHRzLlxyXG4gKi9cclxuZnVuY3Rpb24gbGlzdCQxKHJlZiwgb3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMgIT0gbnVsbCkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhSZXN1bHRzID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICB2YWxpZGF0ZU51bWJlcignb3B0aW9ucy5tYXhSZXN1bHRzJywgXHJcbiAgICAgICAgICAgIC8qIG1pblZhbHVlPSAqLyAxLCBcclxuICAgICAgICAgICAgLyogbWF4VmFsdWU9ICovIDEwMDAsIG9wdGlvbnMubWF4UmVzdWx0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgb3AgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSBsaXN0JDIocmVmLnN0b3JhZ2UsIHJlZi5fbG9jYXRpb24sIFxyXG4gICAgLypkZWxpbWl0ZXI9ICovICcvJywgb3AucGFnZVRva2VuLCBvcC5tYXhSZXN1bHRzKTtcclxuICAgIHJldHVybiByZWYuc3RvcmFnZS5tYWtlUmVxdWVzdFdpdGhUb2tlbnMocmVxdWVzdEluZm8sIG5ld1RleHRDb25uZWN0aW9uKTtcclxufVxyXG4vKipcclxuICogQSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBtZXRhZGF0YSBmb3IgdGhpcyBvYmplY3QuIElmIHRoaXNcclxuICogb2JqZWN0IGRvZXNuJ3QgZXhpc3Qgb3IgbWV0YWRhdGEgY2Fubm90IGJlIHJldHJlaXZlZCwgdGhlIHByb21pc2UgaXNcclxuICogcmVqZWN0ZWQuXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIFN0b3JhZ2VSZWZlcmVuY2UgdG8gZ2V0IG1ldGFkYXRhIGZyb20uXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRNZXRhZGF0YSQxKHJlZikge1xyXG4gICAgcmVmLl90aHJvd0lmUm9vdCgnZ2V0TWV0YWRhdGEnKTtcclxuICAgIGNvbnN0IHJlcXVlc3RJbmZvID0gZ2V0TWV0YWRhdGEkMihyZWYuc3RvcmFnZSwgcmVmLl9sb2NhdGlvbiwgZ2V0TWFwcGluZ3MoKSk7XHJcbiAgICByZXR1cm4gcmVmLnN0b3JhZ2UubWFrZVJlcXVlc3RXaXRoVG9rZW5zKHJlcXVlc3RJbmZvLCBuZXdUZXh0Q29ubmVjdGlvbik7XHJcbn1cclxuLyoqXHJcbiAqIFVwZGF0ZXMgdGhlIG1ldGFkYXRhIGZvciB0aGlzIG9iamVjdC5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0gU3RvcmFnZVJlZmVyZW5jZSB0byB1cGRhdGUgbWV0YWRhdGEgZm9yLlxyXG4gKiBAcGFyYW0gbWV0YWRhdGEgLSBUaGUgbmV3IG1ldGFkYXRhIGZvciB0aGUgb2JqZWN0LlxyXG4gKiAgICAgT25seSB2YWx1ZXMgdGhhdCBoYXZlIGJlZW4gZXhwbGljaXRseSBzZXQgd2lsbCBiZSBjaGFuZ2VkLiBFeHBsaWNpdGx5XHJcbiAqICAgICBzZXR0aW5nIGEgdmFsdWUgdG8gbnVsbCB3aWxsIHJlbW92ZSB0aGUgbWV0YWRhdGEuXHJcbiAqIEByZXR1cm5zIEEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXNcclxuICogICAgIHdpdGggdGhlIG5ldyBtZXRhZGF0YSBmb3IgdGhpcyBvYmplY3QuXHJcbiAqICAgICBTZWUgYGZpcmViYXNlU3RvcmFnZS5SZWZlcmVuY2UucHJvdG90eXBlLmdldE1ldGFkYXRhYFxyXG4gKi9cclxuZnVuY3Rpb24gdXBkYXRlTWV0YWRhdGEkMShyZWYsIG1ldGFkYXRhKSB7XHJcbiAgICByZWYuX3Rocm93SWZSb290KCd1cGRhdGVNZXRhZGF0YScpO1xyXG4gICAgY29uc3QgcmVxdWVzdEluZm8gPSB1cGRhdGVNZXRhZGF0YSQyKHJlZi5zdG9yYWdlLCByZWYuX2xvY2F0aW9uLCBtZXRhZGF0YSwgZ2V0TWFwcGluZ3MoKSk7XHJcbiAgICByZXR1cm4gcmVmLnN0b3JhZ2UubWFrZVJlcXVlc3RXaXRoVG9rZW5zKHJlcXVlc3RJbmZvLCBuZXdUZXh0Q29ubmVjdGlvbik7XHJcbn1cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGRvd25sb2FkIFVSTCBmb3IgdGhlIGdpdmVuIFJlZmVyZW5jZS5cclxuICogQHB1YmxpY1xyXG4gKiBAcmV0dXJucyBBIGBQcm9taXNlYCB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGRvd25sb2FkXHJcbiAqICAgICBVUkwgZm9yIHRoaXMgb2JqZWN0LlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0RG93bmxvYWRVUkwkMShyZWYpIHtcclxuICAgIHJlZi5fdGhyb3dJZlJvb3QoJ2dldERvd25sb2FkVVJMJyk7XHJcbiAgICBjb25zdCByZXF1ZXN0SW5mbyA9IGdldERvd25sb2FkVXJsKHJlZi5zdG9yYWdlLCByZWYuX2xvY2F0aW9uLCBnZXRNYXBwaW5ncygpKTtcclxuICAgIHJldHVybiByZWYuc3RvcmFnZVxyXG4gICAgICAgIC5tYWtlUmVxdWVzdFdpdGhUb2tlbnMocmVxdWVzdEluZm8sIG5ld1RleHRDb25uZWN0aW9uKVxyXG4gICAgICAgIC50aGVuKHVybCA9PiB7XHJcbiAgICAgICAgaWYgKHVybCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBub0Rvd25sb2FkVVJMKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogRGVsZXRlcyB0aGUgb2JqZWN0IGF0IHRoaXMgbG9jYXRpb24uXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIFN0b3JhZ2VSZWZlcmVuY2UgZm9yIG9iamVjdCB0byBkZWxldGUuXHJcbiAqIEByZXR1cm5zIEEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXMgaWYgdGhlIGRlbGV0aW9uIHN1Y2NlZWRzLlxyXG4gKi9cclxuZnVuY3Rpb24gZGVsZXRlT2JqZWN0JDEocmVmKSB7XHJcbiAgICByZWYuX3Rocm93SWZSb290KCdkZWxldGVPYmplY3QnKTtcclxuICAgIGNvbnN0IHJlcXVlc3RJbmZvID0gZGVsZXRlT2JqZWN0JDIocmVmLnN0b3JhZ2UsIHJlZi5fbG9jYXRpb24pO1xyXG4gICAgcmV0dXJuIHJlZi5zdG9yYWdlLm1ha2VSZXF1ZXN0V2l0aFRva2VucyhyZXF1ZXN0SW5mbywgbmV3VGV4dENvbm5lY3Rpb24pO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHJlZmVyZW5jZSBmb3Igb2JqZWN0IG9idGFpbmVkIGJ5IGFwcGVuZGluZyBgY2hpbGRQYXRoYCB0byBgcmVmYC5cclxuICpcclxuICogQHBhcmFtIHJlZiAtIFN0b3JhZ2VSZWZlcmVuY2UgdG8gZ2V0IGNoaWxkIG9mLlxyXG4gKiBAcGFyYW0gY2hpbGRQYXRoIC0gQ2hpbGQgcGF0aCBmcm9tIHByb3ZpZGVkIHJlZi5cclxuICogQHJldHVybnMgQSByZWZlcmVuY2UgdG8gdGhlIG9iamVjdCBvYnRhaW5lZCBieVxyXG4gKiBhcHBlbmRpbmcgY2hpbGRQYXRoLCByZW1vdmluZyBhbnkgZHVwbGljYXRlLCBiZWdpbm5pbmcsIG9yIHRyYWlsaW5nXHJcbiAqIHNsYXNoZXMuXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBfZ2V0Q2hpbGQkMShyZWYsIGNoaWxkUGF0aCkge1xyXG4gICAgY29uc3QgbmV3UGF0aCA9IGNoaWxkKHJlZi5fbG9jYXRpb24ucGF0aCwgY2hpbGRQYXRoKTtcclxuICAgIGNvbnN0IGxvY2F0aW9uID0gbmV3IExvY2F0aW9uKHJlZi5fbG9jYXRpb24uYnVja2V0LCBuZXdQYXRoKTtcclxuICAgIHJldHVybiBuZXcgUmVmZXJlbmNlKHJlZi5zdG9yYWdlLCBsb2NhdGlvbik7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuZnVuY3Rpb24gaXNVcmwocGF0aCkge1xyXG4gICAgcmV0dXJuIC9eW0EtWmEtel0rOlxcL1xcLy8udGVzdChwYXRoKTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhIGZpcmViYXNlU3RvcmFnZS5SZWZlcmVuY2UgZm9yIHRoZSBnaXZlbiB1cmwuXHJcbiAqL1xyXG5mdW5jdGlvbiByZWZGcm9tVVJMKHNlcnZpY2UsIHVybCkge1xyXG4gICAgcmV0dXJuIG5ldyBSZWZlcmVuY2Uoc2VydmljZSwgdXJsKTtcclxufVxyXG4vKipcclxuICogUmV0dXJucyBhIGZpcmViYXNlU3RvcmFnZS5SZWZlcmVuY2UgZm9yIHRoZSBnaXZlbiBwYXRoIGluIHRoZSBkZWZhdWx0XHJcbiAqIGJ1Y2tldC5cclxuICovXHJcbmZ1bmN0aW9uIHJlZkZyb21QYXRoKHJlZiwgcGF0aCkge1xyXG4gICAgaWYgKHJlZiBpbnN0YW5jZW9mIEZpcmViYXNlU3RvcmFnZUltcGwpIHtcclxuICAgICAgICBjb25zdCBzZXJ2aWNlID0gcmVmO1xyXG4gICAgICAgIGlmIChzZXJ2aWNlLl9idWNrZXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBub0RlZmF1bHRCdWNrZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlID0gbmV3IFJlZmVyZW5jZShzZXJ2aWNlLCBzZXJ2aWNlLl9idWNrZXQpO1xyXG4gICAgICAgIGlmIChwYXRoICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlZkZyb21QYXRoKHJlZmVyZW5jZSwgcGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVmZXJlbmNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIHJlZiBpcyBhIFJlZmVyZW5jZVxyXG4gICAgICAgIGlmIChwYXRoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9nZXRDaGlsZCQxKHJlZiwgcGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVmO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiByZWYkMShzZXJ2aWNlT3JSZWYsIHBhdGhPclVybCkge1xyXG4gICAgaWYgKHBhdGhPclVybCAmJiBpc1VybChwYXRoT3JVcmwpKSB7XHJcbiAgICAgICAgaWYgKHNlcnZpY2VPclJlZiBpbnN0YW5jZW9mIEZpcmViYXNlU3RvcmFnZUltcGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlZkZyb21VUkwoc2VydmljZU9yUmVmLCBwYXRoT3JVcmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgaW52YWxpZEFyZ3VtZW50KCdUbyB1c2UgcmVmKHNlcnZpY2UsIHVybCksIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgU3RvcmFnZSBpbnN0YW5jZS4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcmVmRnJvbVBhdGgoc2VydmljZU9yUmVmLCBwYXRoT3JVcmwpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGV4dHJhY3RCdWNrZXQoaG9zdCwgY29uZmlnKSB7XHJcbiAgICBjb25zdCBidWNrZXRTdHJpbmcgPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWdbQ09ORklHX1NUT1JBR0VfQlVDS0VUX0tFWV07XHJcbiAgICBpZiAoYnVja2V0U3RyaW5nID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBMb2NhdGlvbi5tYWtlRnJvbUJ1Y2tldFNwZWMoYnVja2V0U3RyaW5nLCBob3N0KTtcclxufVxyXG5mdW5jdGlvbiBjb25uZWN0U3RvcmFnZUVtdWxhdG9yJDEoc3RvcmFnZSwgaG9zdCwgcG9ydCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICBzdG9yYWdlLmhvc3QgPSBgJHtob3N0fToke3BvcnR9YDtcclxuICAgIHN0b3JhZ2UuX3Byb3RvY29sID0gJ2h0dHAnO1xyXG4gICAgY29uc3QgeyBtb2NrVXNlclRva2VuIH0gPSBvcHRpb25zO1xyXG4gICAgaWYgKG1vY2tVc2VyVG9rZW4pIHtcclxuICAgICAgICBzdG9yYWdlLl9vdmVycmlkZUF1dGhUb2tlbiA9XHJcbiAgICAgICAgICAgIHR5cGVvZiBtb2NrVXNlclRva2VuID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICAgICAgPyBtb2NrVXNlclRva2VuXHJcbiAgICAgICAgICAgICAgICA6IGNyZWF0ZU1vY2tVc2VyVG9rZW4obW9ja1VzZXJUb2tlbiwgc3RvcmFnZS5hcHAub3B0aW9ucy5wcm9qZWN0SWQpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBBIHNlcnZpY2UgdGhhdCBwcm92aWRlcyBGaXJlYmFzZSBTdG9yYWdlIFJlZmVyZW5jZSBpbnN0YW5jZXMuXHJcbiAqIEBwYXJhbSBvcHRfdXJsIC0gZ3M6Ly8gdXJsIHRvIGEgY3VzdG9tIFN0b3JhZ2UgQnVja2V0XHJcbiAqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuY2xhc3MgRmlyZWJhc2VTdG9yYWdlSW1wbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgIC8qKlxyXG4gICAgICogRmlyZWJhc2VBcHAgYXNzb2NpYXRlZCB3aXRoIHRoaXMgU3RvcmFnZVNlcnZpY2UgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIGFwcCwgX2F1dGhQcm92aWRlciwgXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBfYXBwQ2hlY2tQcm92aWRlciwgXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBfdXJsLCBfZmlyZWJhc2VWZXJzaW9uKSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgdGhpcy5fYXV0aFByb3ZpZGVyID0gX2F1dGhQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl9hcHBDaGVja1Byb3ZpZGVyID0gX2FwcENoZWNrUHJvdmlkZXI7XHJcbiAgICAgICAgdGhpcy5fdXJsID0gX3VybDtcclxuICAgICAgICB0aGlzLl9maXJlYmFzZVZlcnNpb24gPSBfZmlyZWJhc2VWZXJzaW9uO1xyXG4gICAgICAgIHRoaXMuX2J1Y2tldCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBzdHJpbmcgY2FuIGJlIGluIHRoZSBmb3JtYXRzOlxyXG4gICAgICAgICAqIC0gaG9zdFxyXG4gICAgICAgICAqIC0gaG9zdDpwb3J0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5faG9zdCA9IERFRkFVTFRfSE9TVDtcclxuICAgICAgICB0aGlzLl9wcm90b2NvbCA9ICdodHRwcyc7XHJcbiAgICAgICAgdGhpcy5fYXBwSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2RlbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYXhPcGVyYXRpb25SZXRyeVRpbWUgPSBERUZBVUxUX01BWF9PUEVSQVRJT05fUkVUUllfVElNRTtcclxuICAgICAgICB0aGlzLl9tYXhVcGxvYWRSZXRyeVRpbWUgPSBERUZBVUxUX01BWF9VUExPQURfUkVUUllfVElNRTtcclxuICAgICAgICB0aGlzLl9yZXF1ZXN0cyA9IG5ldyBTZXQoKTtcclxuICAgICAgICBpZiAoX3VybCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1Y2tldCA9IExvY2F0aW9uLm1ha2VGcm9tQnVja2V0U3BlYyhfdXJsLCB0aGlzLl9ob3N0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1Y2tldCA9IGV4dHJhY3RCdWNrZXQodGhpcy5faG9zdCwgdGhpcy5hcHAub3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaG9zdCBzdHJpbmcgZm9yIHRoaXMgc2VydmljZSwgaW4gdGhlIGZvcm0gb2YgYGhvc3RgIG9yXHJcbiAgICAgKiBgaG9zdDpwb3J0YC5cclxuICAgICAqL1xyXG4gICAgZ2V0IGhvc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hvc3Q7XHJcbiAgICB9XHJcbiAgICBzZXQgaG9zdChob3N0KSB7XHJcbiAgICAgICAgdGhpcy5faG9zdCA9IGhvc3Q7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VybCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1Y2tldCA9IExvY2F0aW9uLm1ha2VGcm9tQnVja2V0U3BlYyh0aGlzLl91cmwsIGhvc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVja2V0ID0gZXh0cmFjdEJ1Y2tldChob3N0LCB0aGlzLmFwcC5vcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtYXhpbXVtIHRpbWUgdG8gcmV0cnkgdXBsb2FkcyBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICAgKi9cclxuICAgIGdldCBtYXhVcGxvYWRSZXRyeVRpbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFVwbG9hZFJldHJ5VGltZTtcclxuICAgIH1cclxuICAgIHNldCBtYXhVcGxvYWRSZXRyeVRpbWUodGltZSkge1xyXG4gICAgICAgIHZhbGlkYXRlTnVtYmVyKCd0aW1lJywgXHJcbiAgICAgICAgLyogbWluVmFsdWU9Ki8gMCwgXHJcbiAgICAgICAgLyogbWF4VmFsdWU9ICovIE51bWJlci5QT1NJVElWRV9JTkZJTklUWSwgdGltZSk7XHJcbiAgICAgICAgdGhpcy5fbWF4VXBsb2FkUmV0cnlUaW1lID0gdGltZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1heGltdW0gdGltZSB0byByZXRyeSBvcGVyYXRpb25zIG90aGVyIHRoYW4gdXBsb2FkcyBvciBkb3dubG9hZHMgaW5cclxuICAgICAqIG1pbGxpc2Vjb25kcy5cclxuICAgICAqL1xyXG4gICAgZ2V0IG1heE9wZXJhdGlvblJldHJ5VGltZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4T3BlcmF0aW9uUmV0cnlUaW1lO1xyXG4gICAgfVxyXG4gICAgc2V0IG1heE9wZXJhdGlvblJldHJ5VGltZSh0aW1lKSB7XHJcbiAgICAgICAgdmFsaWRhdGVOdW1iZXIoJ3RpbWUnLCBcclxuICAgICAgICAvKiBtaW5WYWx1ZT0qLyAwLCBcclxuICAgICAgICAvKiBtYXhWYWx1ZT0gKi8gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLCB0aW1lKTtcclxuICAgICAgICB0aGlzLl9tYXhPcGVyYXRpb25SZXRyeVRpbWUgPSB0aW1lO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgX2dldEF1dGhUb2tlbigpIHtcclxuICAgICAgICBpZiAodGhpcy5fb3ZlcnJpZGVBdXRoVG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX292ZXJyaWRlQXV0aFRva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhdXRoID0gdGhpcy5fYXV0aFByb3ZpZGVyLmdldEltbWVkaWF0ZSh7IG9wdGlvbmFsOiB0cnVlIH0pO1xyXG4gICAgICAgIGlmIChhdXRoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRva2VuRGF0YSA9IGF3YWl0IGF1dGguZ2V0VG9rZW4oKTtcclxuICAgICAgICAgICAgaWYgKHRva2VuRGF0YSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuRGF0YS5hY2Nlc3NUb2tlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGFzeW5jIF9nZXRBcHBDaGVja1Rva2VuKCkge1xyXG4gICAgICAgIGNvbnN0IGFwcENoZWNrID0gdGhpcy5fYXBwQ2hlY2tQcm92aWRlci5nZXRJbW1lZGlhdGUoeyBvcHRpb25hbDogdHJ1ZSB9KTtcclxuICAgICAgICBpZiAoYXBwQ2hlY2spIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXBwQ2hlY2suZ2V0VG9rZW4oKTtcclxuICAgICAgICAgICAgLy8gVE9ETzogV2hhdCBkbyB3ZSB3YW50IHRvIGRvIGlmIHRoZXJlIGlzIGFuIGVycm9yIGdldHRpbmcgdGhlIHRva2VuP1xyXG4gICAgICAgICAgICAvLyBDb250ZXh0OiBhcHBDaGVjay5nZXRUb2tlbigpIHdpbGwgbmV2ZXIgdGhyb3cgZXZlbiBpZiBhbiBlcnJvciBoYXBwZW5lZC4gSW4gdGhlIGVycm9yIGNhc2UsIGEgZHVtbXkgdG9rZW4gd2lsbCBiZVxyXG4gICAgICAgICAgICAvLyByZXR1cm5lZCBhbG9uZyB3aXRoIGFuIGVycm9yIGZpZWxkIGRlc2NyaWJpbmcgdGhlIGVycm9yLiBJbiBnZW5lcmFsLCB3ZSBzaG91bGRuJ3QgY2FyZSBhYm91dCB0aGUgZXJyb3IgY29uZGl0aW9uIGFuZCBqdXN0IHVzZVxyXG4gICAgICAgICAgICAvLyB0aGUgdG9rZW4gKGFjdHVhbCBvciBkdW1teSkgdG8gc2VuZCByZXF1ZXN0cy5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC50b2tlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFN0b3AgcnVubmluZyByZXF1ZXN0cyBhbmQgcHJldmVudCBtb3JlIGZyb20gYmVpbmcgY3JlYXRlZC5cclxuICAgICAqL1xyXG4gICAgX2RlbGV0ZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2RlbGV0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RzLmZvckVhY2gocmVxdWVzdCA9PiByZXF1ZXN0LmNhbmNlbCgpKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdHMuY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGZpcmViYXNlU3RvcmFnZS5SZWZlcmVuY2Ugb2JqZWN0IHJlZmVyZW5jaW5nIHRoaXMgU3RvcmFnZVNlcnZpY2VcclxuICAgICAqIGF0IHRoZSBnaXZlbiBMb2NhdGlvbi5cclxuICAgICAqL1xyXG4gICAgX21ha2VTdG9yYWdlUmVmZXJlbmNlKGxvYykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVmZXJlbmNlKHRoaXMsIGxvYyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSByZXF1ZXN0SW5mbyAtIEhUVFAgUmVxdWVzdEluZm8gb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gYXV0aFRva2VuIC0gRmlyZWJhc2UgYXV0aCB0b2tlblxyXG4gICAgICovXHJcbiAgICBfbWFrZVJlcXVlc3QocmVxdWVzdEluZm8sIHJlcXVlc3RGYWN0b3J5LCBhdXRoVG9rZW4sIGFwcENoZWNrVG9rZW4pIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2RlbGV0ZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IG1ha2VSZXF1ZXN0KHJlcXVlc3RJbmZvLCB0aGlzLl9hcHBJZCwgYXV0aFRva2VuLCBhcHBDaGVja1Rva2VuLCByZXF1ZXN0RmFjdG9yeSwgdGhpcy5fZmlyZWJhc2VWZXJzaW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdHMuYWRkKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAvLyBSZXF1ZXN0IHJlbW92ZXMgaXRzZWxmIGZyb20gc2V0IHdoZW4gY29tcGxldGUuXHJcbiAgICAgICAgICAgIHJlcXVlc3QuZ2V0UHJvbWlzZSgpLnRoZW4oKCkgPT4gdGhpcy5fcmVxdWVzdHMuZGVsZXRlKHJlcXVlc3QpLCAoKSA9PiB0aGlzLl9yZXF1ZXN0cy5kZWxldGUocmVxdWVzdCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmFpbFJlcXVlc3QoYXBwRGVsZXRlZCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhc3luYyBtYWtlUmVxdWVzdFdpdGhUb2tlbnMocmVxdWVzdEluZm8sIHJlcXVlc3RGYWN0b3J5KSB7XHJcbiAgICAgICAgY29uc3QgW2F1dGhUb2tlbiwgYXBwQ2hlY2tUb2tlbl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIHRoaXMuX2dldEF1dGhUb2tlbigpLFxyXG4gICAgICAgICAgICB0aGlzLl9nZXRBcHBDaGVja1Rva2VuKClcclxuICAgICAgICBdKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFrZVJlcXVlc3QocmVxdWVzdEluZm8sIHJlcXVlc3RGYWN0b3J5LCBhdXRoVG9rZW4sIGFwcENoZWNrVG9rZW4pLmdldFByb21pc2UoKTtcclxuICAgIH1cclxufVxuXG5jb25zdCBuYW1lID0gXCJAZmlyZWJhc2Uvc3RvcmFnZVwiO1xuY29uc3QgdmVyc2lvbiA9IFwiMC45LjJcIjtcblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIFR5cGUgY29uc3RhbnQgZm9yIEZpcmViYXNlIFN0b3JhZ2UuXHJcbiAqL1xyXG5jb25zdCBTVE9SQUdFX1RZUEUgPSAnc3RvcmFnZSc7XG5cbi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbi8qKlxyXG4gKiBEb3dubG9hZHMgdGhlIGRhdGEgYXQgdGhlIG9iamVjdCdzIGxvY2F0aW9uLiBSZXR1cm5zIGFuIGVycm9yIGlmIHRoZSBvYmplY3RcclxuICogaXMgbm90IGZvdW5kLlxyXG4gKlxyXG4gKiBUbyB1c2UgdGhpcyBmdW5jdGlvbmFsaXR5LCB5b3UgaGF2ZSB0byB3aGl0ZWxpc3QgeW91ciBhcHAncyBvcmlnaW4gaW4geW91clxyXG4gKiBDbG91ZCBTdG9yYWdlIGJ1Y2tldC4gU2VlIGFsc29cclxuICogaHR0cHM6Ly9jbG91ZC5nb29nbGUuY29tL3N0b3JhZ2UvZG9jcy9jb25maWd1cmluZy1jb3JzXHJcbiAqXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIFN0b3JhZ2VSZWZlcmVuY2Ugd2hlcmUgZGF0YSBzaG91bGQgYmUgZG93bmxvYWRlZC5cclxuICogQHBhcmFtIG1heERvd25sb2FkU2l6ZUJ5dGVzIC0gSWYgc2V0LCB0aGUgbWF4aW11bSBhbGxvd2VkIHNpemUgaW4gYnl0ZXMgdG9cclxuICogcmV0cmlldmUuXHJcbiAqIEByZXR1cm5zIEEgUHJvbWlzZSBjb250YWluaW5nIHRoZSBvYmplY3QncyBieXRlc1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Qnl0ZXMocmVmLCBtYXhEb3dubG9hZFNpemVCeXRlcykge1xyXG4gICAgcmVmID0gZ2V0TW9kdWxhckluc3RhbmNlKHJlZik7XHJcbiAgICByZXR1cm4gZ2V0Qnl0ZXNJbnRlcm5hbChyZWYsIG1heERvd25sb2FkU2l6ZUJ5dGVzKTtcclxufVxyXG4vKipcclxuICogVXBsb2FkcyBkYXRhIHRvIHRoaXMgb2JqZWN0J3MgbG9jYXRpb24uXHJcbiAqIFRoZSB1cGxvYWQgaXMgbm90IHJlc3VtYWJsZS5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0ge0BsaW5rIFN0b3JhZ2VSZWZlcmVuY2V9IHdoZXJlIGRhdGEgc2hvdWxkIGJlIHVwbG9hZGVkLlxyXG4gKiBAcGFyYW0gZGF0YSAtIFRoZSBkYXRhIHRvIHVwbG9hZC5cclxuICogQHBhcmFtIG1ldGFkYXRhIC0gTWV0YWRhdGEgZm9yIHRoZSBkYXRhIHRvIHVwbG9hZC5cclxuICogQHJldHVybnMgQSBQcm9taXNlIGNvbnRhaW5pbmcgYW4gVXBsb2FkUmVzdWx0XHJcbiAqL1xyXG5mdW5jdGlvbiB1cGxvYWRCeXRlcyhyZWYsIGRhdGEsIG1ldGFkYXRhKSB7XHJcbiAgICByZWYgPSBnZXRNb2R1bGFySW5zdGFuY2UocmVmKTtcclxuICAgIHJldHVybiB1cGxvYWRCeXRlcyQxKHJlZiwgZGF0YSwgbWV0YWRhdGEpO1xyXG59XHJcbi8qKlxyXG4gKiBVcGxvYWRzIGEgc3RyaW5nIHRvIHRoaXMgb2JqZWN0J3MgbG9jYXRpb24uXHJcbiAqIFRoZSB1cGxvYWQgaXMgbm90IHJlc3VtYWJsZS5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0ge0BsaW5rIFN0b3JhZ2VSZWZlcmVuY2V9IHdoZXJlIHN0cmluZyBzaG91bGQgYmUgdXBsb2FkZWQuXHJcbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSBzdHJpbmcgdG8gdXBsb2FkLlxyXG4gKiBAcGFyYW0gZm9ybWF0IC0gVGhlIGZvcm1hdCBvZiB0aGUgc3RyaW5nIHRvIHVwbG9hZC5cclxuICogQHBhcmFtIG1ldGFkYXRhIC0gTWV0YWRhdGEgZm9yIHRoZSBzdHJpbmcgdG8gdXBsb2FkLlxyXG4gKiBAcmV0dXJucyBBIFByb21pc2UgY29udGFpbmluZyBhbiBVcGxvYWRSZXN1bHRcclxuICovXHJcbmZ1bmN0aW9uIHVwbG9hZFN0cmluZyhyZWYsIHZhbHVlLCBmb3JtYXQsIG1ldGFkYXRhKSB7XHJcbiAgICByZWYgPSBnZXRNb2R1bGFySW5zdGFuY2UocmVmKTtcclxuICAgIHJldHVybiB1cGxvYWRTdHJpbmckMShyZWYsIHZhbHVlLCBmb3JtYXQsIG1ldGFkYXRhKTtcclxufVxyXG4vKipcclxuICogVXBsb2FkcyBkYXRhIHRvIHRoaXMgb2JqZWN0J3MgbG9jYXRpb24uXHJcbiAqIFRoZSB1cGxvYWQgY2FuIGJlIHBhdXNlZCBhbmQgcmVzdW1lZCwgYW5kIGV4cG9zZXMgcHJvZ3Jlc3MgdXBkYXRlcy5cclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0ge0BsaW5rIFN0b3JhZ2VSZWZlcmVuY2V9IHdoZXJlIGRhdGEgc2hvdWxkIGJlIHVwbG9hZGVkLlxyXG4gKiBAcGFyYW0gZGF0YSAtIFRoZSBkYXRhIHRvIHVwbG9hZC5cclxuICogQHBhcmFtIG1ldGFkYXRhIC0gTWV0YWRhdGEgZm9yIHRoZSBkYXRhIHRvIHVwbG9hZC5cclxuICogQHJldHVybnMgQW4gVXBsb2FkVGFza1xyXG4gKi9cclxuZnVuY3Rpb24gdXBsb2FkQnl0ZXNSZXN1bWFibGUocmVmLCBkYXRhLCBtZXRhZGF0YSkge1xyXG4gICAgcmVmID0gZ2V0TW9kdWxhckluc3RhbmNlKHJlZik7XHJcbiAgICByZXR1cm4gdXBsb2FkQnl0ZXNSZXN1bWFibGUkMShyZWYsIGRhdGEsIG1ldGFkYXRhKTtcclxufVxyXG4vKipcclxuICogQSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBtZXRhZGF0YSBmb3IgdGhpcyBvYmplY3QuIElmIHRoaXNcclxuICogb2JqZWN0IGRvZXNuJ3QgZXhpc3Qgb3IgbWV0YWRhdGEgY2Fubm90IGJlIHJldHJlaXZlZCwgdGhlIHByb21pc2UgaXNcclxuICogcmVqZWN0ZWQuXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIHtAbGluayBTdG9yYWdlUmVmZXJlbmNlfSB0byBnZXQgbWV0YWRhdGEgZnJvbS5cclxuICovXHJcbmZ1bmN0aW9uIGdldE1ldGFkYXRhKHJlZikge1xyXG4gICAgcmVmID0gZ2V0TW9kdWxhckluc3RhbmNlKHJlZik7XHJcbiAgICByZXR1cm4gZ2V0TWV0YWRhdGEkMShyZWYpO1xyXG59XHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRoZSBtZXRhZGF0YSBmb3IgdGhpcyBvYmplY3QuXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIHtAbGluayBTdG9yYWdlUmVmZXJlbmNlfSB0byB1cGRhdGUgbWV0YWRhdGEgZm9yLlxyXG4gKiBAcGFyYW0gbWV0YWRhdGEgLSBUaGUgbmV3IG1ldGFkYXRhIGZvciB0aGUgb2JqZWN0LlxyXG4gKiAgICAgT25seSB2YWx1ZXMgdGhhdCBoYXZlIGJlZW4gZXhwbGljaXRseSBzZXQgd2lsbCBiZSBjaGFuZ2VkLiBFeHBsaWNpdGx5XHJcbiAqICAgICBzZXR0aW5nIGEgdmFsdWUgdG8gbnVsbCB3aWxsIHJlbW92ZSB0aGUgbWV0YWRhdGEuXHJcbiAqIEByZXR1cm5zIEEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbmV3IG1ldGFkYXRhIGZvciB0aGlzIG9iamVjdC5cclxuICovXHJcbmZ1bmN0aW9uIHVwZGF0ZU1ldGFkYXRhKHJlZiwgbWV0YWRhdGEpIHtcclxuICAgIHJlZiA9IGdldE1vZHVsYXJJbnN0YW5jZShyZWYpO1xyXG4gICAgcmV0dXJuIHVwZGF0ZU1ldGFkYXRhJDEocmVmLCBtZXRhZGF0YSk7XHJcbn1cclxuLyoqXHJcbiAqIExpc3QgaXRlbXMgKGZpbGVzKSBhbmQgcHJlZml4ZXMgKGZvbGRlcnMpIHVuZGVyIHRoaXMgc3RvcmFnZSByZWZlcmVuY2UuXHJcbiAqXHJcbiAqIExpc3QgQVBJIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBGaXJlYmFzZSBSdWxlcyBWZXJzaW9uIDIuXHJcbiAqXHJcbiAqIEdDUyBpcyBhIGtleS1ibG9iIHN0b3JlLiBGaXJlYmFzZSBTdG9yYWdlIGltcG9zZXMgdGhlIHNlbWFudGljIG9mICcvJ1xyXG4gKiBkZWxpbWl0ZWQgZm9sZGVyIHN0cnVjdHVyZS5cclxuICogUmVmZXIgdG8gR0NTJ3MgTGlzdCBBUEkgaWYgeW91IHdhbnQgdG8gbGVhcm4gbW9yZS5cclxuICpcclxuICogVG8gYWRoZXJlIHRvIEZpcmViYXNlIFJ1bGVzJ3MgU2VtYW50aWNzLCBGaXJlYmFzZSBTdG9yYWdlIGRvZXMgbm90XHJcbiAqIHN1cHBvcnQgb2JqZWN0cyB3aG9zZSBwYXRocyBlbmQgd2l0aCBcIi9cIiBvciBjb250YWluIHR3byBjb25zZWN1dGl2ZVxyXG4gKiBcIi9cInMuIEZpcmViYXNlIFN0b3JhZ2UgTGlzdCBBUEkgd2lsbCBmaWx0ZXIgdGhlc2UgdW5zdXBwb3J0ZWQgb2JqZWN0cy5cclxuICogbGlzdCgpIG1heSBmYWlsIGlmIHRoZXJlIGFyZSB0b28gbWFueSB1bnN1cHBvcnRlZCBvYmplY3RzIGluIHRoZSBidWNrZXQuXHJcbiAqIEBwdWJsaWNcclxuICpcclxuICogQHBhcmFtIHJlZiAtIHtAbGluayBTdG9yYWdlUmVmZXJlbmNlfSB0byBnZXQgbGlzdCBmcm9tLlxyXG4gKiBAcGFyYW0gb3B0aW9ucyAtIFNlZSB7QGxpbmsgTGlzdE9wdGlvbnN9IGZvciBkZXRhaWxzLlxyXG4gKiBAcmV0dXJucyBBIGBQcm9taXNlYCB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGl0ZW1zIGFuZCBwcmVmaXhlcy5cclxuICogICAgICBgcHJlZml4ZXNgIGNvbnRhaW5zIHJlZmVyZW5jZXMgdG8gc3ViLWZvbGRlcnMgYW5kIGBpdGVtc2BcclxuICogICAgICBjb250YWlucyByZWZlcmVuY2VzIHRvIG9iamVjdHMgaW4gdGhpcyBmb2xkZXIuIGBuZXh0UGFnZVRva2VuYFxyXG4gKiAgICAgIGNhbiBiZSB1c2VkIHRvIGdldCB0aGUgcmVzdCBvZiB0aGUgcmVzdWx0cy5cclxuICovXHJcbmZ1bmN0aW9uIGxpc3QocmVmLCBvcHRpb25zKSB7XHJcbiAgICByZWYgPSBnZXRNb2R1bGFySW5zdGFuY2UocmVmKTtcclxuICAgIHJldHVybiBsaXN0JDEocmVmLCBvcHRpb25zKTtcclxufVxyXG4vKipcclxuICogTGlzdCBhbGwgaXRlbXMgKGZpbGVzKSBhbmQgcHJlZml4ZXMgKGZvbGRlcnMpIHVuZGVyIHRoaXMgc3RvcmFnZSByZWZlcmVuY2UuXHJcbiAqXHJcbiAqIFRoaXMgaXMgYSBoZWxwZXIgbWV0aG9kIGZvciBjYWxsaW5nIGxpc3QoKSByZXBlYXRlZGx5IHVudGlsIHRoZXJlIGFyZVxyXG4gKiBubyBtb3JlIHJlc3VsdHMuIFRoZSBkZWZhdWx0IHBhZ2luYXRpb24gc2l6ZSBpcyAxMDAwLlxyXG4gKlxyXG4gKiBOb3RlOiBUaGUgcmVzdWx0cyBtYXkgbm90IGJlIGNvbnNpc3RlbnQgaWYgb2JqZWN0cyBhcmUgY2hhbmdlZCB3aGlsZSB0aGlzXHJcbiAqIG9wZXJhdGlvbiBpcyBydW5uaW5nLlxyXG4gKlxyXG4gKiBXYXJuaW5nOiBgbGlzdEFsbGAgbWF5IHBvdGVudGlhbGx5IGNvbnN1bWUgdG9vIG1hbnkgcmVzb3VyY2VzIGlmIHRoZXJlIGFyZVxyXG4gKiB0b28gbWFueSByZXN1bHRzLlxyXG4gKiBAcHVibGljXHJcbiAqIEBwYXJhbSByZWYgLSB7QGxpbmsgU3RvcmFnZVJlZmVyZW5jZX0gdG8gZ2V0IGxpc3QgZnJvbS5cclxuICpcclxuICogQHJldHVybnMgQSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyB3aXRoIGFsbCB0aGUgaXRlbXMgYW5kIHByZWZpeGVzIHVuZGVyXHJcbiAqICAgICAgdGhlIGN1cnJlbnQgc3RvcmFnZSByZWZlcmVuY2UuIGBwcmVmaXhlc2AgY29udGFpbnMgcmVmZXJlbmNlcyB0b1xyXG4gKiAgICAgIHN1Yi1kaXJlY3RvcmllcyBhbmQgYGl0ZW1zYCBjb250YWlucyByZWZlcmVuY2VzIHRvIG9iamVjdHMgaW4gdGhpc1xyXG4gKiAgICAgIGZvbGRlci4gYG5leHRQYWdlVG9rZW5gIGlzIG5ldmVyIHJldHVybmVkLlxyXG4gKi9cclxuZnVuY3Rpb24gbGlzdEFsbChyZWYpIHtcclxuICAgIHJlZiA9IGdldE1vZHVsYXJJbnN0YW5jZShyZWYpO1xyXG4gICAgcmV0dXJuIGxpc3RBbGwkMShyZWYpO1xyXG59XHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBkb3dubG9hZCBVUkwgZm9yIHRoZSBnaXZlbiB7QGxpbmsgU3RvcmFnZVJlZmVyZW5jZX0uXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIHtAbGluayBTdG9yYWdlUmVmZXJlbmNlfSB0byBnZXQgdGhlIGRvd25sb2FkIFVSTCBmb3IuXHJcbiAqIEByZXR1cm5zIEEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZG93bmxvYWRcclxuICogICAgIFVSTCBmb3IgdGhpcyBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXREb3dubG9hZFVSTChyZWYpIHtcclxuICAgIHJlZiA9IGdldE1vZHVsYXJJbnN0YW5jZShyZWYpO1xyXG4gICAgcmV0dXJuIGdldERvd25sb2FkVVJMJDEocmVmKTtcclxufVxyXG4vKipcclxuICogRGVsZXRlcyB0aGUgb2JqZWN0IGF0IHRoaXMgbG9jYXRpb24uXHJcbiAqIEBwdWJsaWNcclxuICogQHBhcmFtIHJlZiAtIHtAbGluayBTdG9yYWdlUmVmZXJlbmNlfSBmb3Igb2JqZWN0IHRvIGRlbGV0ZS5cclxuICogQHJldHVybnMgQSBgUHJvbWlzZWAgdGhhdCByZXNvbHZlcyBpZiB0aGUgZGVsZXRpb24gc3VjY2VlZHMuXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWxldGVPYmplY3QocmVmKSB7XHJcbiAgICByZWYgPSBnZXRNb2R1bGFySW5zdGFuY2UocmVmKTtcclxuICAgIHJldHVybiBkZWxldGVPYmplY3QkMShyZWYpO1xyXG59XHJcbmZ1bmN0aW9uIHJlZihzZXJ2aWNlT3JSZWYsIHBhdGhPclVybCkge1xyXG4gICAgc2VydmljZU9yUmVmID0gZ2V0TW9kdWxhckluc3RhbmNlKHNlcnZpY2VPclJlZik7XHJcbiAgICByZXR1cm4gcmVmJDEoc2VydmljZU9yUmVmLCBwYXRoT3JVcmwpO1xyXG59XHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmZ1bmN0aW9uIF9nZXRDaGlsZChyZWYsIGNoaWxkUGF0aCkge1xyXG4gICAgcmV0dXJuIF9nZXRDaGlsZCQxKHJlZiwgY2hpbGRQYXRoKTtcclxufVxyXG4vKipcclxuICogR2V0cyBhIHtAbGluayBGaXJlYmFzZVN0b3JhZ2V9IGluc3RhbmNlIGZvciB0aGUgZ2l2ZW4gRmlyZWJhc2UgYXBwLlxyXG4gKiBAcHVibGljXHJcbiAqIEBwYXJhbSBhcHAgLSBGaXJlYmFzZSBhcHAgdG8gZ2V0IHtAbGluayBGaXJlYmFzZVN0b3JhZ2V9IGluc3RhbmNlIGZvci5cclxuICogQHBhcmFtIGJ1Y2tldFVybCAtIFRoZSBnczovLyB1cmwgdG8geW91ciBGaXJlYmFzZSBTdG9yYWdlIEJ1Y2tldC5cclxuICogSWYgbm90IHBhc3NlZCwgdXNlcyB0aGUgYXBwJ3MgZGVmYXVsdCBTdG9yYWdlIEJ1Y2tldC5cclxuICogQHJldHVybnMgQSB7QGxpbmsgRmlyZWJhc2VTdG9yYWdlfSBpbnN0YW5jZS5cclxuICovXHJcbmZ1bmN0aW9uIGdldFN0b3JhZ2UoYXBwID0gZ2V0QXBwKCksIGJ1Y2tldFVybCkge1xyXG4gICAgYXBwID0gZ2V0TW9kdWxhckluc3RhbmNlKGFwcCk7XHJcbiAgICBjb25zdCBzdG9yYWdlUHJvdmlkZXIgPSBfZ2V0UHJvdmlkZXIoYXBwLCBTVE9SQUdFX1RZUEUpO1xyXG4gICAgY29uc3Qgc3RvcmFnZUluc3RhbmNlID0gc3RvcmFnZVByb3ZpZGVyLmdldEltbWVkaWF0ZSh7XHJcbiAgICAgICAgaWRlbnRpZmllcjogYnVja2V0VXJsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdG9yYWdlSW5zdGFuY2U7XHJcbn1cclxuLyoqXHJcbiAqIE1vZGlmeSB0aGlzIHtAbGluayBGaXJlYmFzZVN0b3JhZ2V9IGluc3RhbmNlIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIENsb3VkIFN0b3JhZ2UgZW11bGF0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdG9yYWdlIC0gVGhlIHtAbGluayBGaXJlYmFzZVN0b3JhZ2V9IGluc3RhbmNlXHJcbiAqIEBwYXJhbSBob3N0IC0gVGhlIGVtdWxhdG9yIGhvc3QgKGV4OiBsb2NhbGhvc3QpXHJcbiAqIEBwYXJhbSBwb3J0IC0gVGhlIGVtdWxhdG9yIHBvcnQgKGV4OiA1MDAxKVxyXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEVtdWxhdG9yIG9wdGlvbnMuIGBvcHRpb25zLm1vY2tVc2VyVG9rZW5gIGlzIHRoZSBtb2NrIGF1dGhcclxuICogdG9rZW4gdG8gdXNlIGZvciB1bml0IHRlc3RpbmcgU2VjdXJpdHkgUnVsZXMuXHJcbiAqIEBwdWJsaWNcclxuICovXHJcbmZ1bmN0aW9uIGNvbm5lY3RTdG9yYWdlRW11bGF0b3Ioc3RvcmFnZSwgaG9zdCwgcG9ydCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICBjb25uZWN0U3RvcmFnZUVtdWxhdG9yJDEoc3RvcmFnZSwgaG9zdCwgcG9ydCwgb3B0aW9ucyk7XHJcbn1cblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuLyoqXHJcbiAqIERvd25sb2FkcyB0aGUgZGF0YSBhdCB0aGUgb2JqZWN0J3MgbG9jYXRpb24uIFJldHVybnMgYW4gZXJyb3IgaWYgdGhlIG9iamVjdFxyXG4gKiBpcyBub3QgZm91bmQuXHJcbiAqXHJcbiAqIFRvIHVzZSB0aGlzIGZ1bmN0aW9uYWxpdHksIHlvdSBoYXZlIHRvIHdoaXRlbGlzdCB5b3VyIGFwcCdzIG9yaWdpbiBpbiB5b3VyXHJcbiAqIENsb3VkIFN0b3JhZ2UgYnVja2V0LiBTZWUgYWxzb1xyXG4gKiBodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vc3RvcmFnZS9kb2NzL2NvbmZpZ3VyaW5nLWNvcnNcclxuICpcclxuICogVGhpcyBBUEkgaXMgbm90IGF2YWlsYWJsZSBpbiBOb2RlLlxyXG4gKlxyXG4gKiBAcHVibGljXHJcbiAqIEBwYXJhbSByZWYgLSBTdG9yYWdlUmVmZXJlbmNlIHdoZXJlIGRhdGEgc2hvdWxkIGJlIGRvd25sb2FkZWQuXHJcbiAqIEBwYXJhbSBtYXhEb3dubG9hZFNpemVCeXRlcyAtIElmIHNldCwgdGhlIG1heGltdW0gYWxsb3dlZCBzaXplIGluIGJ5dGVzIHRvXHJcbiAqIHJldHJpZXZlLlxyXG4gKiBAcmV0dXJucyBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGEgQmxvYiBjb250YWluaW5nIHRoZSBvYmplY3QncyBieXRlc1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0QmxvYihyZWYsIG1heERvd25sb2FkU2l6ZUJ5dGVzKSB7XHJcbiAgICByZWYgPSBnZXRNb2R1bGFySW5zdGFuY2UocmVmKTtcclxuICAgIHJldHVybiBnZXRCbG9iSW50ZXJuYWwocmVmLCBtYXhEb3dubG9hZFNpemVCeXRlcyk7XHJcbn1cclxuLyoqXHJcbiAqIERvd25sb2FkcyB0aGUgZGF0YSBhdCB0aGUgb2JqZWN0J3MgbG9jYXRpb24uIFJhaXNlcyBhbiBlcnJvciBldmVudCBpZiB0aGVcclxuICogb2JqZWN0IGlzIG5vdCBmb3VuZC5cclxuICpcclxuICogVGhpcyBBUEkgaXMgb25seSBhdmFpbGFibGUgaW4gTm9kZS5cclxuICpcclxuICogQHB1YmxpY1xyXG4gKiBAcGFyYW0gcmVmIC0gU3RvcmFnZVJlZmVyZW5jZSB3aGVyZSBkYXRhIHNob3VsZCBiZSBkb3dubG9hZGVkLlxyXG4gKiBAcGFyYW0gbWF4RG93bmxvYWRTaXplQnl0ZXMgLSBJZiBzZXQsIHRoZSBtYXhpbXVtIGFsbG93ZWQgc2l6ZSBpbiBieXRlcyB0b1xyXG4gKiByZXRyaWV2ZS5cclxuICogQHJldHVybnMgQSBzdHJlYW0gd2l0aCB0aGUgb2JqZWN0J3MgZGF0YSBhcyBieXRlc1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U3RyZWFtKHJlZiwgbWF4RG93bmxvYWRTaXplQnl0ZXMpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignZ2V0U3RyZWFtKCkgaXMgb25seSBzdXBwb3J0ZWQgYnkgTm9kZUpTIGJ1aWxkcycpO1xyXG59XG5cbi8qKlxyXG4gKiBDbG91ZCBTdG9yYWdlIGZvciBGaXJlYmFzZVxyXG4gKlxyXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cclxuICovXHJcbmZ1bmN0aW9uIGZhY3RvcnkoY29udGFpbmVyLCB7IGluc3RhbmNlSWRlbnRpZmllcjogdXJsIH0pIHtcclxuICAgIGNvbnN0IGFwcCA9IGNvbnRhaW5lci5nZXRQcm92aWRlcignYXBwJykuZ2V0SW1tZWRpYXRlKCk7XHJcbiAgICBjb25zdCBhdXRoUHJvdmlkZXIgPSBjb250YWluZXIuZ2V0UHJvdmlkZXIoJ2F1dGgtaW50ZXJuYWwnKTtcclxuICAgIGNvbnN0IGFwcENoZWNrUHJvdmlkZXIgPSBjb250YWluZXIuZ2V0UHJvdmlkZXIoJ2FwcC1jaGVjay1pbnRlcm5hbCcpO1xyXG4gICAgcmV0dXJuIG5ldyBGaXJlYmFzZVN0b3JhZ2VJbXBsKGFwcCwgYXV0aFByb3ZpZGVyLCBhcHBDaGVja1Byb3ZpZGVyLCB1cmwsIFNES19WRVJTSU9OKTtcclxufVxyXG5mdW5jdGlvbiByZWdpc3RlclN0b3JhZ2UoKSB7XHJcbiAgICBfcmVnaXN0ZXJDb21wb25lbnQobmV3IENvbXBvbmVudChTVE9SQUdFX1RZUEUsIGZhY3RvcnksIFwiUFVCTElDXCIgLyogUFVCTElDICovKS5zZXRNdWx0aXBsZUluc3RhbmNlcyh0cnVlKSk7XHJcbiAgICAvL1JVTlRJTUVfRU5WIHdpbGwgYmUgcmVwbGFjZWQgZHVyaW5nIHRoZSBjb21waWxhdGlvbiB0byBcIm5vZGVcIiBmb3Igbm9kZWpzIGFuZCBhbiBlbXB0eSBzdHJpbmcgZm9yIGJyb3dzZXJcclxuICAgIHJlZ2lzdGVyVmVyc2lvbihuYW1lLCB2ZXJzaW9uLCAnJyk7XHJcbiAgICAvLyBCVUlMRF9UQVJHRVQgd2lsbCBiZSByZXBsYWNlZCBieSB2YWx1ZXMgbGlrZSBlc201LCBlc20yMDE3LCBjanM1LCBldGMgZHVyaW5nIHRoZSBjb21waWxhdGlvblxyXG4gICAgcmVnaXN0ZXJWZXJzaW9uKG5hbWUsIHZlcnNpb24sICdlc20yMDE3Jyk7XHJcbn1cclxucmVnaXN0ZXJTdG9yYWdlKCk7XG5cbmV4cG9ydCB7IFN0cmluZ0Zvcm1hdCwgRmJzQmxvYiBhcyBfRmJzQmxvYiwgTG9jYXRpb24gYXMgX0xvY2F0aW9uLCBUYXNrRXZlbnQgYXMgX1Rhc2tFdmVudCwgVGFza1N0YXRlIGFzIF9UYXNrU3RhdGUsIFVwbG9hZFRhc2sgYXMgX1VwbG9hZFRhc2ssIGRhdGFGcm9tU3RyaW5nIGFzIF9kYXRhRnJvbVN0cmluZywgX2dldENoaWxkLCBpbnZhbGlkQXJndW1lbnQgYXMgX2ludmFsaWRBcmd1bWVudCwgaW52YWxpZFJvb3RPcGVyYXRpb24gYXMgX2ludmFsaWRSb290T3BlcmF0aW9uLCBjb25uZWN0U3RvcmFnZUVtdWxhdG9yLCBkZWxldGVPYmplY3QsIGdldEJsb2IsIGdldEJ5dGVzLCBnZXREb3dubG9hZFVSTCwgZ2V0TWV0YWRhdGEsIGdldFN0b3JhZ2UsIGdldFN0cmVhbSwgbGlzdCwgbGlzdEFsbCwgcmVmLCB1cGRhdGVNZXRhZGF0YSwgdXBsb2FkQnl0ZXMsIHVwbG9hZEJ5dGVzUmVzdW1hYmxlLCB1cGxvYWRTdHJpbmcgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzbTIwMTcuanMubWFwXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5maXJlYmxhemVfX2hpZGRlbntcXG4gIG9wYWNpdHk6IDA7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyY2pzL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFVBQVU7QUFDWlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuZmlyZWJsYXplX19oaWRkZW57XFxuICBvcGFjaXR5OiAwO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiaW1wb3J0IHsgcmVnaXN0ZXJWZXJzaW9uIH0gZnJvbSAnQGZpcmViYXNlL2FwcCc7XG5leHBvcnQgKiBmcm9tICdAZmlyZWJhc2UvYXBwJztcblxudmFyIG5hbWUgPSBcImZpcmViYXNlXCI7XG52YXIgdmVyc2lvbiA9IFwiOS42LjdcIjtcblxuLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTENcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxucmVnaXN0ZXJWZXJzaW9uKG5hbWUsIHZlcnNpb24sICdhcHAnKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzbS5qcy5tYXBcbiIsImV4cG9ydCAqIGZyb20gJ0BmaXJlYmFzZS9zdG9yYWdlJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmVzbS5qcy5tYXBcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgJ3NoaW55J1xuaW1wb3J0IHsgXG5cdGdldFN0b3JhZ2UsIFxuXHRyZWYsIFxuXHR1cGxvYWRTdHJpbmcsIFxuXHRnZXREb3dubG9hZFVSTCxcblx0ZGVsZXRlT2JqZWN0LFxuXHRnZXRNZXRhZGF0YSxcblx0bGlzdEFsbFxufSBmcm9tIFwiZmlyZWJhc2Uvc3RvcmFnZVwiO1xuaW1wb3J0IHsgc2V0SW5wdXRWYWx1ZTIgfSBmcm9tICcuLi91dGlscy5qcyc7XG5cbmxldCBzdG9yYWdlO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlU3RvcmFnZSA9IChmaXJlYmFzZUFwcCkgPT4ge1xuXHRsZXQgc3RvcmFnZVJlZiA9IHJlZihzdG9yYWdlKTtcblxuICBTaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLXN0b3JhZ2UtcmVmJywgZnVuY3Rpb24obXNnKSB7XG5cdFx0aWYoIXN0b3JhZ2UpXG5cdFx0XHRzdG9yYWdlID0gZ2V0U3RvcmFnZShmaXJlYmFzZUFwcCk7XG5cblx0XHRpZighbXNnLnBhdGgpe1xuXHRcdFx0c3RvcmFnZVJlZiA9IHJlZihzdG9yYWdlKTtcblx0XHRcdHJldHVybiA7XG5cdFx0fVxuXG5cdFx0c3RvcmFnZVJlZiA9IHJlZihzdG9yYWdlLCBtc2cucGF0aCk7XG5cdH0pO1xuXG4gIFNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtdXBsb2FkLWZpbGUnLCBmdW5jdGlvbihtc2cpIHtcblx0XHR1cGxvYWRTdHJpbmcoc3RvcmFnZVJlZiwgbXNnLmVuY29kZWQsICdkYXRhX3VybCcpXG5cdFx0XHQudGhlbigoc25hcHNob3QpID0+IHtcblx0XHRcdFx0aWYoIW1zZy5yZXNwb25zZSlcblx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdFx0cmVzcG9uc2U6IHNuYXBzaG90Lm1ldGFkYXRhLFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IHRydWVcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNldElucHV0VmFsdWUyKG1zZy5yZXNwb25zZSwgZGF0YSwgbXNnLm5zKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRpZighbXNnLnJlc3BvbnNlKVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XG5cdFx0XHRcdHNldElucHV0VmFsdWUyKG1zZy5yZXNwb25zZSwge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9LCBtc2cubnMpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXG4gIFNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtZG93bmxvYWQtZmlsZScsIChtc2cpID0+IHtcblx0XHRnZXREb3dubG9hZFVSTChzdG9yYWdlUmVmKVxuXHRcdFx0LnRoZW4oKHVybCkgPT4ge1xuXHRcdFx0XHRpZighbXNnLnJlc3BvbnNlKVxuXHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdFx0XHRzdWNjZXNzOiB0cnVlLFxuXHRcdFx0XHRcdHJlc3BvbnNlOiB1cmwsXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzZXRJbnB1dFZhbHVlMihtc2cucmVzcG9uc2UsIGRhdGEsIG1zZy5ucyk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdFx0XHRpZighbXNnLnJlc3BvbnNlKVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XG5cdFx0XHRcdHNldElucHV0VmFsdWUyKG1zZy5yZXNwb25zZSwge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9LCBtc2cubnMpO1xuXHRcdFx0fSk7XG5cdH0pO1xuXG4gIFNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtZGVsZXRlLWZpbGUnLCBmdW5jdGlvbihtc2cpIHtcblx0XHRkZWxldGVPYmplY3Qoc3RvcmFnZVJlZilcblx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0aWYoIW1zZy5yZXNwb25zZSlcblx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0c2V0SW5wdXRWYWx1ZTIobXNnLnJlc3BvbnNlLCB7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6IG51bGx9LCBtc2cubnMpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0aWYoIW1zZy5yZXNwb25zZSlcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFxuXHRcdFx0XHRzZXRJbnB1dFZhbHVlMihtc2cucmVzcG9uc2UsIHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6IGVycm9yfSwgbXNnLm5zKTtcblx0XHRcdH0pO1xuXHR9KTtcbiAgXG5cdFNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtZ2V0LW1ldGFkYXRhJywgZnVuY3Rpb24obXNnKSB7XG5cdFx0Z2V0TWV0YWRhdGEoc3RvcmFnZVJlZilcblx0XHRcdC50aGVuKChtZXRhZGF0YSkgPT4ge1xuXHRcdFx0XHRpZighbXNnLnJlc3BvbnNlKVxuXHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHRzZXRJbnB1dFZhbHVlMihtc2cucmVzcG9uc2UsIHtzdWNjZXNzOiB0cnVlLCByZXNwb25zZTogbWV0YWRhdGF9LCBtc2cubnMpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0aWYoIW1zZy5yZXNwb25zZSlcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFxuXHRcdFx0XHRzZXRJbnB1dFZhbHVlMihtc2cucmVzcG9uc2UsIHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6IGVycm9yfSwgbXNnLm5zKTtcblx0XHRcdH0pO1xuXHR9KTtcblx0XG5cdFNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtbGlzdC1hbGwtZmlsZXMnLCBmdW5jdGlvbihtc2cpIHtcblx0XHRsaXN0QWxsKHN0b3JhZ2VSZWYpXG5cdFx0XHQudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdHNldElucHV0VmFsdWUyKG1zZy5yZXNwb25zZSwge3N1Y2Nlc3M6IHRydWUsIHJlc3BvbnNlOiByZXMuaXRlbXN9LCBtc2cubnMpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHRcdFx0aWYoIW1zZy5yZXNwb25zZSlcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFxuXHRcdFx0XHRzZXRJbnB1dFZhbHVlMihtc2cucmVzcG9uc2UsIHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6IGVycm9yfSwgbXNnLm5zKTtcblx0XHRcdH0pO1xuXHR9KTtcbn1cbiIsImltcG9ydCAnc2hpbnknO1xuaW1wb3J0IHsgXG4gIGdldEF1dGgsIFxuICBzaWduT3V0LCBcbiAgc2V0UGVyc2lzdGVuY2UsXG4gIGlzU2lnbkluV2l0aEVtYWlsTGluayxcbiAgc2lnbkluV2l0aEVtYWlsTGluayxcbiAgb25BdXRoU3RhdGVDaGFuZ2VkXG59IGZyb20gXCJmaXJlYmFzZS9hdXRoXCI7XG5pbXBvcnQgeyBpbml0aWFsaXplQXBwIH0gZnJvbSBcImZpcmViYXNlL2FwcFwiO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBcbiAgcGVyc2lzdGVuY2VPcHRzLCBcbiAgc2hvd0hpZGVPbkxvZ2luLCBcbiAgc2hvd0hpZGVPbkxvZ291dCxcbiAgc2V0SW5wdXRWYWx1ZSxcbiAgc2V0TGFuZ3VhZ2VDb2RlXG59IGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IHsgaGFuZGxlU3RvcmFnZSB9IGZyb20gJy4vY29tcG9uZW50cy9zdG9yYWdlJztcblxuLy8gZ2xvYmFsIHZhcmlhYmxlc1xud2luZG93Lmdsb2JhbE5zID0gJyc7XG52YXIgZ2xvYmFsSW5pdCA9IGZhbHNlO1xud2luZG93LnVpSW5pdGlhbGlzZWQgPSBmYWxzZTtcbmxldCBmaXJlYmFzZUFwcDtcblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1yZW5kZXItZGVwZW5kZW5jaWVzJywgKG1zZykgPT4ge1xuICBTaGlueS5yZW5kZXJEZXBlbmRlbmNpZXMobXNnLmRlcHMpO1xufSlcblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1pbml0aWFsaXplLWNvcmUnLCAobXNnKSA9PiB7XG4gIGlmKGZpcmViYXNlQXBwKVxuICAgIHJldHVybjtcblxuICBmaXJlYmFzZUFwcCA9IGluaXRpYWxpemVBcHAobXNnLmNvbmYpO1xufSk7XG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtZXhwb3NlLWFwcCcsIChtc2cpID0+IHtcbiAgaWYoIWZpcmViYXNlQXBwKVxuICAgIHJldHVybjtcblxuICB3aW5kb3cuZmlyZWJhc2VBcHAgPSBmaXJlYmFzZUFwcDtcbn0pO1xuXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLWV4cG9zZS1hdXRoJywgKG1zZykgPT4ge1xuICB3aW5kb3cuZmlyZWJhc2VBdXRoID0gZ2V0QXV0aCgpO1xufSk7XG5cblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtaW5pdGlhbGl6ZS1zdG9yYWdlJywgKG1zZykgPT4ge1xuICBoYW5kbGVTdG9yYWdlKGZpcmViYXNlQXBwKTtcbn0pO1xuXG4vLyBJbml0aWFsaXNlXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLWluaXRpYWxpemUtYXV0aCcsIChtc2cpID0+IHtcblxuICBpZihnbG9iYWxJbml0KVxuICAgIHJldHVybiA7XG5cbiAgZ2xvYmFsSW5pdCA9IHRydWU7XG4gIC8vIHNldCBuYW1lc3BhY2VcbiAgd2luZG93Lmdsb2JhbE5zID0gbXNnLm5zO1xuXG4gIC8vIGF1dGhcbiAgY29uc3QgYXV0aCA9IGdldEF1dGgoKTtcbiAgc2V0TGFuZ3VhZ2VDb2RlKG1zZy5sYW5ndWFnZUNvZGUpXG5cbiAgLy8gc2V0IHBlcnNpc3RlbmNlXG4gIGxldCBwZXJzaXN0ZW5jZSA9IHBlcnNpc3RlbmNlT3B0cyhtc2cucGVyc2lzdGVuY2UpO1xuICBzZXRQZXJzaXN0ZW5jZShhdXRoLCBwZXJzaXN0ZW5jZSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBvbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aCwgKHVzZXIpID0+IHtcbiAgICAgICAgaWYodXNlcil7XG5cbiAgICAgICAgICAvLyBzaG93IHNpZ25pbiBhdXRob3Jpc2VkXG4gICAgICAgICAgc2hvd0hpZGVPbkxvZ2luKFwic2hvd1wiKTtcbiAgICAgICAgICBzaG93SGlkZU9uTG9nb3V0KFwiaGlkZVwiKTtcbiAgICAgICAgICAkKFwiI2ZpcmVibGF6ZS1zaWduaW4tdWlcIikuaGlkZSgpO1xuXG4gICAgICAgICAgYXV0aC5jdXJyZW50VXNlci5nZXRJZFRva2VuKHRydWUpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICBzZXRJbnB1dFZhbHVlKCdzaWduZWRfaW5fdXNlcicsIHtzdWNjZXNzOiB0cnVlLCByZXNwb25zZTogdXNlciwgdG9rZW46IHRva2VufSk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdmYWlsZWQgdG8gbG9naW4nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaGlkZSBzaWduaW4gcmVxdWlyZWRcbiAgICAgICAgICBzaG93SGlkZU9uTG9naW4oXCJoaWRlXCIpO1xuICAgICAgICAgIHNob3dIaWRlT25Mb2dvdXQoXCJzaG93XCIpO1xuXG4gICAgICAgICAgLy8gc2V0IGVycm9yIGlucHV0XG4gICAgICAgICAgc2V0SW5wdXRWYWx1ZSgnc2lnbmVkX2luJywge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogbnVsbH0pO1xuICAgICAgICAgIHNldElucHV0VmFsdWUoJ3NpZ25lZF9pbl91c2VyJywge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogbnVsbH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gY2hlY2sgZW1haWwgdmVyaWZpY2F0aW9uIGxpbmtcbiAgICAgIGlmIChpc1NpZ25JbldpdGhFbWFpbExpbmsoYXV0aCwgd2luZG93LmxvY2F0aW9uLmhyZWYpKSB7XG4gICAgICAgIC8vIEFkZGl0aW9uYWwgc3RhdGUgcGFyYW1ldGVycyBjYW4gYWxzbyBiZSBwYXNzZWQgdmlhIFVSTC5cbiAgICAgICAgLy8gVGhpcyBjYW4gYmUgdXNlZCB0byBjb250aW51ZSB0aGUgdXNlcidzIGludGVuZGVkIGFjdGlvbiBiZWZvcmUgdHJpZ2dlcmluZ1xuICAgICAgICAvLyB0aGUgc2lnbi1pbiBvcGVyYXRpb24uXG4gICAgICAgIC8vIEdldCB0aGUgZW1haWwgaWYgYXZhaWxhYmxlLiBUaGlzIHNob3VsZCBiZSBhdmFpbGFibGUgaWYgdGhlIHVzZXIgY29tcGxldGVzXG4gICAgICAgIC8vIHRoZSBmbG93IG9uIHRoZSBzYW1lIGRldmljZSB3aGVyZSB0aGV5IHN0YXJ0ZWQgaXQuXG4gICAgICAgIHZhciBlbWFpbCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmlyZWJsYXplRW1haWxTaWduSW4nKTtcbiAgICAgICAgaWYgKCFlbWFpbCkge1xuICAgICAgICAgIHNldElucHV0VmFsdWUoJ2VtYWlsX3ZlcmlmaWNhdGlvbicsIHtzdWNjZXNzOiBmYWxzZSwgcmVzcG9uc2U6IFwiQ2Fubm90IGZpbmQgZW1haWxcIn0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSBjbGllbnQgU0RLIHdpbGwgcGFyc2UgdGhlIGNvZGUgZnJvbSB0aGUgbGluayBmb3IgeW91LlxuICAgICAgICBzaWduSW5XaXRoRW1haWxMaW5rKGF1dGgsIGVtYWlsLCB3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2ZpcmVibGF6ZUVtYWlsU2lnbkluJyk7XG4gICAgICAgICAgICBzZXRJbnB1dFZhbHVlKCdlbWFpbF92ZXJpZmljYXRpb24nLCB7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6IHJlc3VsdH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZSgnZW1haWxfdmVyaWZpY2F0aW9uJywge3N1Y2Nlc3M6IGZhbHNlLCByZXNwb25zZTogZXJyb3J9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0pO1xuXG59KTtcblxuLy8gU2lnbiBvdXRcblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtc2lnbm91dCcsIChtc2cpID0+IHtcbiAgY29uc3QgYXV0aCA9IGdldEF1dGgoKTtcblxuICBzaWduT3V0KGF1dGgpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgaWYod2luZG93LnVpSW5pdGlhbGlzZWQpe1xuICAgICAgICB3aW5kb3cudWkuc3RhcnQoXCIjZmlyZWJsYXplLXNpZ25pbi11aVwiLCB3aW5kb3cudWlPcHRzKTtcbiAgICAgICAgJChcIiNmaXJlYmxhemUtc2lnbmluLXVpXCIpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgc2V0SW5wdXRWYWx1ZSgnc2lnbm91dCcsIHtzdWNjZXNzOiB0cnVlLCByZXNwb25zZTogJ3N1Y2Nlc3NmdWwnfSwgbXNnLm5zKTtcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIHNldElucHV0VmFsdWUoJ3NpZ25vdXQnLCB7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiBlcnJvcn0sIG1zZy5ucyk7XG4gICAgfSk7XG5cbn0pO1xuXG4vLyBMYW5ndWFnZSBjb2RlXG5TaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcignZmlyZWJsYXplLWxhbmd1YWdlLWNvZGUnLCAobXNnKSA9PiB7XG4gIGNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XG4gIGF1dGgubGFuZ3VhZ2VDb2RlID0gbXNnLmNvZGU7XG59KTtcblxuLy8gRGVsZXRlIFVzZXJcblNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKCdmaXJlYmxhemUtZGVsZXRlLXVzZXInLCAobXNnKSA9PiB7XG4gIGNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XG4gIGF1dGguY3VycmVudFVzZXIuZGVsZXRlKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBzZXRJbnB1dFZhbHVlKCdkZWxldGVkX3VzZXInLCB7c3VjY2VzczogdHJ1ZSwgcmVzcG9uc2U6ICdzdWNjZXNzZnVsJ30sIG1zZy5ucyk7XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBTaGlueS5zZXRJbnB1dFZhbHVlKCdkZWxldGVkX3VzZXInLCB7c3VjY2VzczogZmFsc2UsIHJlc3BvbnNlOiBlcnJvcn0sIG1zZy5ucyk7XG4gICAgfSk7XG59KTtcblxuU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoJ2ZpcmVibGF6ZS1pZC10b2tlbicsIChtc2cpID0+IHtcbiAgY29uc3QgYXV0aCA9IGdldEF1dGgoKTtcbiAgYXV0aC5jdXJyZW50VXNlci5nZXRJZFRva2VuKHRydWUpXG4gICAgLnRoZW4oKGlkVG9rZW4pID0+IHtcbiAgICAgIHNldElucHV0VmFsdWUoJ2lkX3Rva2VuJywge3Jlc3BvbnNlOiB7aWRUb2tlbjogaWRUb2tlbn0sIHN1Y2Nlc3M6IHRydWV9LCBtc2cubnMpO1xuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgc2V0SW5wdXRWYWx1ZSgnaWRfdG9rZW4nLCB7cmVzcG9uc2U6IGVycm9yLCBzdWNjZXNzOiBmYWxzZX0sIG1zZy5ucyk7XG4gICAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==