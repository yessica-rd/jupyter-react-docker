var serverExportVar;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "t": () => (/* binding */ t)
/* harmony export */ });
// src/browser/reader.ts
async function readFileFromUri(uri) {
  if (uri.protocol === "http:" || uri.protocol === "https:") {
    const res = await fetch(uri);
    return await res.text();
  }
  throw new Error("Unsupported protocol");
}
function readFileFromFsPath(_) {
  throw new Error("Unsupported in browser");
}

// src/main.ts
var bundle;
function config(config2) {
  if ("contents" in config2) {
    if (typeof config2.contents === "string") {
      bundle = JSON.parse(config2.contents);
    } else {
      bundle = config2.contents;
    }
    return;
  }
  if ("fsPath" in config2) {
    const fileContent = readFileFromFsPath(config2.fsPath);
    const content = JSON.parse(fileContent);
    bundle = isBuiltinExtension(content) ? content.contents.bundle : content;
    return;
  }
  if (config2.uri) {
    let uri = config2.uri;
    if (typeof config2.uri === "string") {
      uri = new URL(config2.uri);
    }
    return new Promise((resolve, reject) => {
      const p = readFileFromUri(uri).then((uriContent) => {
        try {
          const content = JSON.parse(uriContent);
          bundle = isBuiltinExtension(content) ? content.contents.bundle : content;
        } catch (err) {
          reject(err);
        }
      }).catch((err) => {
        reject(err);
      });
      resolve(p);
    });
  }
}
function t(...args) {
  const firstArg = args[0];
  let key;
  let message;
  let formatArgs;
  if (typeof firstArg === "string") {
    key = firstArg;
    message = firstArg;
    args.splice(0, 1);
    formatArgs = !args || typeof args[0] !== "object" ? args : args[0];
  } else {
    message = firstArg.message;
    key = message;
    if (firstArg.comment && firstArg.comment.length > 0) {
      key += `/${Array.isArray(firstArg.comment) ? firstArg.comment.join() : firstArg.comment}`;
    }
    formatArgs = firstArg.args ?? {};
  }
  if (!bundle) {
    return format(message, formatArgs);
  }
  const messageFromBundle = bundle[key];
  if (!messageFromBundle) {
    return format(message, formatArgs);
  }
  if (typeof messageFromBundle === "string") {
    return format(messageFromBundle, formatArgs);
  }
  if (messageFromBundle.comment) {
    return format(messageFromBundle.message, formatArgs);
  }
  return format(message, formatArgs);
}
var _format2Regexp = /{([^}]+)}/g;
function format(template, values) {
  return template.replace(_format2Regexp, (match, group) => values[group] ?? match);
}
function isBuiltinExtension(json) {
  return !!(typeof json?.contents?.bundle === "object" && typeof json?.version === "string");
}



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
const browser_1 = __webpack_require__(3);
const server_1 = __webpack_require__(68);
const messageReader = new browser_1.BrowserMessageReader(self);
const messageWriter = new browser_1.BrowserMessageWriter(self);
const connection = (0, browser_1.createConnection)(messageReader, messageWriter);
(0, server_1.startVsCodeServer)(connection);


/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ----------------------------------------------------------------------------------------- */


module.exports = __webpack_require__(4);

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createConnection = void 0;
const api_1 = __webpack_require__(5);
__exportStar(__webpack_require__(67), exports);
__exportStar(__webpack_require__(5), exports);
let _shutdownReceived = false;
const watchDog = {
    initialize: (_params) => {
    },
    get shutdownReceived() {
        return _shutdownReceived;
    },
    set shutdownReceived(value) {
        _shutdownReceived = value;
    },
    exit: (_code) => {
    }
};
function createConnection(arg1, arg2, arg3, arg4) {
    let factories;
    let reader;
    let writer;
    let options;
    if (arg1 !== void 0 && arg1.__brand === 'features') {
        factories = arg1;
        arg1 = arg2;
        arg2 = arg3;
        arg3 = arg4;
    }
    if (api_1.ConnectionStrategy.is(arg1) || api_1.ConnectionOptions.is(arg1)) {
        options = arg1;
    }
    else {
        reader = arg1;
        writer = arg2;
        options = arg3;
    }
    const connectionFactory = (logger) => {
        return (0, api_1.createProtocolConnection)(reader, writer, logger, options);
    };
    return (0, api_1.createConnection)(connectionFactory, watchDog, factories);
}
exports.createConnection = createConnection;
//# sourceMappingURL=main.js.map

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProposedFeatures = exports.NotebookDocuments = exports.TextDocuments = exports.SemanticTokensBuilder = void 0;
const semanticTokens_1 = __webpack_require__(6);
Object.defineProperty(exports, "SemanticTokensBuilder", ({ enumerable: true, get: function () { return semanticTokens_1.SemanticTokensBuilder; } }));
__exportStar(__webpack_require__(7), exports);
const textDocuments_1 = __webpack_require__(50);
Object.defineProperty(exports, "TextDocuments", ({ enumerable: true, get: function () { return textDocuments_1.TextDocuments; } }));
const notebook_1 = __webpack_require__(51);
Object.defineProperty(exports, "NotebookDocuments", ({ enumerable: true, get: function () { return notebook_1.NotebookDocuments; } }));
__exportStar(__webpack_require__(52), exports);
var ProposedFeatures;
(function (ProposedFeatures) {
    ProposedFeatures.all = {
        __brand: 'features',
    };
})(ProposedFeatures = exports.ProposedFeatures || (exports.ProposedFeatures = {}));
//# sourceMappingURL=api.js.map

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SemanticTokensBuilder = exports.SemanticTokensDiff = exports.SemanticTokensFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const SemanticTokensFeature = (Base) => {
    return class extends Base {
        get semanticTokens() {
            return {
                refresh: () => {
                    return this.connection.sendRequest(vscode_languageserver_protocol_1.SemanticTokensRefreshRequest.type);
                },
                on: (handler) => {
                    const type = vscode_languageserver_protocol_1.SemanticTokensRequest.type;
                    return this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                },
                onDelta: (handler) => {
                    const type = vscode_languageserver_protocol_1.SemanticTokensDeltaRequest.type;
                    return this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                },
                onRange: (handler) => {
                    const type = vscode_languageserver_protocol_1.SemanticTokensRangeRequest.type;
                    return this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                }
            };
        }
    };
};
exports.SemanticTokensFeature = SemanticTokensFeature;
class SemanticTokensDiff {
    constructor(originalSequence, modifiedSequence) {
        this.originalSequence = originalSequence;
        this.modifiedSequence = modifiedSequence;
    }
    computeDiff() {
        const originalLength = this.originalSequence.length;
        const modifiedLength = this.modifiedSequence.length;
        let startIndex = 0;
        while (startIndex < modifiedLength && startIndex < originalLength && this.originalSequence[startIndex] === this.modifiedSequence[startIndex]) {
            startIndex++;
        }
        if (startIndex < modifiedLength && startIndex < originalLength) {
            let originalEndIndex = originalLength - 1;
            let modifiedEndIndex = modifiedLength - 1;
            while (originalEndIndex >= startIndex && modifiedEndIndex >= startIndex && this.originalSequence[originalEndIndex] === this.modifiedSequence[modifiedEndIndex]) {
                originalEndIndex--;
                modifiedEndIndex--;
            }
            // if one moved behind the start index move them forward again
            if (originalEndIndex < startIndex || modifiedEndIndex < startIndex) {
                originalEndIndex++;
                modifiedEndIndex++;
            }
            const deleteCount = originalEndIndex - startIndex + 1;
            const newData = this.modifiedSequence.slice(startIndex, modifiedEndIndex + 1);
            // If we moved behind the start index we could have missed a simple delete.
            if (newData.length === 1 && newData[0] === this.originalSequence[originalEndIndex]) {
                return [
                    { start: startIndex, deleteCount: deleteCount - 1 }
                ];
            }
            else {
                return [
                    { start: startIndex, deleteCount, data: newData }
                ];
            }
        }
        else if (startIndex < modifiedLength) {
            return [
                { start: startIndex, deleteCount: 0, data: this.modifiedSequence.slice(startIndex) }
            ];
        }
        else if (startIndex < originalLength) {
            return [
                { start: startIndex, deleteCount: originalLength - startIndex }
            ];
        }
        else {
            // The two arrays are the same.
            return [];
        }
    }
}
exports.SemanticTokensDiff = SemanticTokensDiff;
class SemanticTokensBuilder {
    constructor() {
        this._prevData = undefined;
        this.initialize();
    }
    initialize() {
        this._id = Date.now();
        this._prevLine = 0;
        this._prevChar = 0;
        this._data = [];
        this._dataLen = 0;
    }
    push(line, char, length, tokenType, tokenModifiers) {
        let pushLine = line;
        let pushChar = char;
        if (this._dataLen > 0) {
            pushLine -= this._prevLine;
            if (pushLine === 0) {
                pushChar -= this._prevChar;
            }
        }
        this._data[this._dataLen++] = pushLine;
        this._data[this._dataLen++] = pushChar;
        this._data[this._dataLen++] = length;
        this._data[this._dataLen++] = tokenType;
        this._data[this._dataLen++] = tokenModifiers;
        this._prevLine = line;
        this._prevChar = char;
    }
    get id() {
        return this._id.toString();
    }
    previousResult(id) {
        if (this.id === id) {
            this._prevData = this._data;
        }
        this.initialize();
    }
    build() {
        this._prevData = undefined;
        return {
            resultId: this.id,
            data: this._data
        };
    }
    canBuildEdits() {
        return this._prevData !== undefined;
    }
    buildEdits() {
        if (this._prevData !== undefined) {
            return {
                resultId: this.id,
                edits: (new SemanticTokensDiff(this._prevData, this._data)).computeDiff()
            };
        }
        else {
            return this.build();
        }
    }
}
exports.SemanticTokensBuilder = SemanticTokensBuilder;
//# sourceMappingURL=semanticTokens.js.map

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createProtocolConnection = void 0;
const browser_1 = __webpack_require__(8);
__exportStar(__webpack_require__(8), exports);
__exportStar(__webpack_require__(24), exports);
function createProtocolConnection(reader, writer, logger, options) {
    return (0, browser_1.createMessageConnection)(reader, writer, logger, options);
}
exports.createProtocolConnection = createProtocolConnection;
//# sourceMappingURL=main.js.map

/***/ }),
/* 8 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ----------------------------------------------------------------------------------------- */


module.exports = __webpack_require__(9);

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMessageConnection = exports.BrowserMessageWriter = exports.BrowserMessageReader = void 0;
const ril_1 = __webpack_require__(10);
// Install the browser runtime abstract.
ril_1.default.install();
const api_1 = __webpack_require__(15);
__exportStar(__webpack_require__(15), exports);
class BrowserMessageReader extends api_1.AbstractMessageReader {
    constructor(context) {
        super();
        this._onData = new api_1.Emitter();
        this._messageListener = (event) => {
            this._onData.fire(event.data);
        };
        context.addEventListener('error', (event) => this.fireError(event));
        context.onmessage = this._messageListener;
    }
    listen(callback) {
        return this._onData.event(callback);
    }
}
exports.BrowserMessageReader = BrowserMessageReader;
class BrowserMessageWriter extends api_1.AbstractMessageWriter {
    constructor(context) {
        super();
        this.context = context;
        this.errorCount = 0;
        context.addEventListener('error', (event) => this.fireError(event));
    }
    write(msg) {
        try {
            this.context.postMessage(msg);
            return Promise.resolve();
        }
        catch (error) {
            this.handleError(error, msg);
            return Promise.reject(error);
        }
    }
    handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
    }
    end() {
    }
}
exports.BrowserMessageWriter = BrowserMessageWriter;
function createMessageConnection(reader, writer, logger, options) {
    if (logger === undefined) {
        logger = api_1.NullLogger;
    }
    if (api_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
    }
    return (0, api_1.createMessageConnection)(reader, writer, logger, options);
}
exports.createMessageConnection = createMessageConnection;
//# sourceMappingURL=main.js.map

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const ral_1 = __webpack_require__(11);
const disposable_1 = __webpack_require__(12);
const events_1 = __webpack_require__(13);
const messageBuffer_1 = __webpack_require__(14);
class MessageBuffer extends messageBuffer_1.AbstractMessageBuffer {
    constructor(encoding = 'utf-8') {
        super(encoding);
        this.asciiDecoder = new TextDecoder('ascii');
    }
    emptyBuffer() {
        return MessageBuffer.emptyBuffer;
    }
    fromString(value, _encoding) {
        return (new TextEncoder()).encode(value);
    }
    toString(value, encoding) {
        if (encoding === 'ascii') {
            return this.asciiDecoder.decode(value);
        }
        else {
            return (new TextDecoder(encoding)).decode(value);
        }
    }
    asNative(buffer, length) {
        if (length === undefined) {
            return buffer;
        }
        else {
            return buffer.slice(0, length);
        }
    }
    allocNative(length) {
        return new Uint8Array(length);
    }
}
MessageBuffer.emptyBuffer = new Uint8Array(0);
class ReadableStreamWrapper {
    constructor(socket) {
        this.socket = socket;
        this._onData = new events_1.Emitter();
        this._messageListener = (event) => {
            const blob = event.data;
            blob.arrayBuffer().then((buffer) => {
                this._onData.fire(new Uint8Array(buffer));
            }, () => {
                (0, ral_1.default)().console.error(`Converting blob to array buffer failed.`);
            });
        };
        this.socket.addEventListener('message', this._messageListener);
    }
    onClose(listener) {
        this.socket.addEventListener('close', listener);
        return disposable_1.Disposable.create(() => this.socket.removeEventListener('close', listener));
    }
    onError(listener) {
        this.socket.addEventListener('error', listener);
        return disposable_1.Disposable.create(() => this.socket.removeEventListener('error', listener));
    }
    onEnd(listener) {
        this.socket.addEventListener('end', listener);
        return disposable_1.Disposable.create(() => this.socket.removeEventListener('end', listener));
    }
    onData(listener) {
        return this._onData.event(listener);
    }
}
class WritableStreamWrapper {
    constructor(socket) {
        this.socket = socket;
    }
    onClose(listener) {
        this.socket.addEventListener('close', listener);
        return disposable_1.Disposable.create(() => this.socket.removeEventListener('close', listener));
    }
    onError(listener) {
        this.socket.addEventListener('error', listener);
        return disposable_1.Disposable.create(() => this.socket.removeEventListener('error', listener));
    }
    onEnd(listener) {
        this.socket.addEventListener('end', listener);
        return disposable_1.Disposable.create(() => this.socket.removeEventListener('end', listener));
    }
    write(data, encoding) {
        if (typeof data === 'string') {
            if (encoding !== undefined && encoding !== 'utf-8') {
                throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${encoding}`);
            }
            this.socket.send(data);
        }
        else {
            this.socket.send(data);
        }
        return Promise.resolve();
    }
    end() {
        this.socket.close();
    }
}
const _textEncoder = new TextEncoder();
const _ril = Object.freeze({
    messageBuffer: Object.freeze({
        create: (encoding) => new MessageBuffer(encoding)
    }),
    applicationJson: Object.freeze({
        encoder: Object.freeze({
            name: 'application/json',
            encode: (msg, options) => {
                if (options.charset !== 'utf-8') {
                    throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${options.charset}`);
                }
                return Promise.resolve(_textEncoder.encode(JSON.stringify(msg, undefined, 0)));
            }
        }),
        decoder: Object.freeze({
            name: 'application/json',
            decode: (buffer, options) => {
                if (!(buffer instanceof Uint8Array)) {
                    throw new Error(`In a Browser environments only Uint8Arrays are supported.`);
                }
                return Promise.resolve(JSON.parse(new TextDecoder(options.charset).decode(buffer)));
            }
        })
    }),
    stream: Object.freeze({
        asReadableStream: (socket) => new ReadableStreamWrapper(socket),
        asWritableStream: (socket) => new WritableStreamWrapper(socket)
    }),
    console: console,
    timer: Object.freeze({
        setTimeout(callback, ms, ...args) {
            const handle = setTimeout(callback, ms, ...args);
            return { dispose: () => clearTimeout(handle) };
        },
        setImmediate(callback, ...args) {
            const handle = setTimeout(callback, 0, ...args);
            return { dispose: () => clearTimeout(handle) };
        },
        setInterval(callback, ms, ...args) {
            const handle = setInterval(callback, ms, ...args);
            return { dispose: () => clearInterval(handle) };
        },
    })
});
function RIL() {
    return _ril;
}
(function (RIL) {
    function install() {
        ral_1.default.install(_ril);
    }
    RIL.install = install;
})(RIL || (RIL = {}));
exports.default = RIL;
//# sourceMappingURL=ril.js.map

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
let _ral;
function RAL() {
    if (_ral === undefined) {
        throw new Error(`No runtime abstraction layer installed`);
    }
    return _ral;
}
(function (RAL) {
    function install(ral) {
        if (ral === undefined) {
            throw new Error(`No runtime abstraction layer provided`);
        }
        _ral = ral;
    }
    RAL.install = install;
})(RAL || (RAL = {}));
exports.default = RAL;
//# sourceMappingURL=ral.js.map

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Disposable = void 0;
var Disposable;
(function (Disposable) {
    function create(func) {
        return {
            dispose: func
        };
    }
    Disposable.create = create;
})(Disposable = exports.Disposable || (exports.Disposable = {}));
//# sourceMappingURL=disposable.js.map

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Emitter = exports.Event = void 0;
const ral_1 = __webpack_require__(11);
var Event;
(function (Event) {
    const _disposable = { dispose() { } };
    Event.None = function () { return _disposable; };
})(Event = exports.Event || (exports.Event = {}));
class CallbackList {
    add(callback, context = null, bucket) {
        if (!this._callbacks) {
            this._callbacks = [];
            this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
            bucket.push({ dispose: () => this.remove(callback, context) });
        }
    }
    remove(callback, context = null) {
        if (!this._callbacks) {
            return;
        }
        let foundCallbackWithDifferentContext = false;
        for (let i = 0, len = this._callbacks.length; i < len; i++) {
            if (this._callbacks[i] === callback) {
                if (this._contexts[i] === context) {
                    // callback & context match => remove it
                    this._callbacks.splice(i, 1);
                    this._contexts.splice(i, 1);
                    return;
                }
                else {
                    foundCallbackWithDifferentContext = true;
                }
            }
        }
        if (foundCallbackWithDifferentContext) {
            throw new Error('When adding a listener with a context, you should remove it with the same context');
        }
    }
    invoke(...args) {
        if (!this._callbacks) {
            return [];
        }
        const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
        for (let i = 0, len = callbacks.length; i < len; i++) {
            try {
                ret.push(callbacks[i].apply(contexts[i], args));
            }
            catch (e) {
                // eslint-disable-next-line no-console
                (0, ral_1.default)().console.error(e);
            }
        }
        return ret;
    }
    isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
    }
    dispose() {
        this._callbacks = undefined;
        this._contexts = undefined;
    }
}
class Emitter {
    constructor(_options) {
        this._options = _options;
    }
    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */
    get event() {
        if (!this._event) {
            this._event = (listener, thisArgs, disposables) => {
                if (!this._callbacks) {
                    this._callbacks = new CallbackList();
                }
                if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
                    this._options.onFirstListenerAdd(this);
                }
                this._callbacks.add(listener, thisArgs);
                const result = {
                    dispose: () => {
                        if (!this._callbacks) {
                            // disposable is disposed after emitter is disposed.
                            return;
                        }
                        this._callbacks.remove(listener, thisArgs);
                        result.dispose = Emitter._noop;
                        if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                            this._options.onLastListenerRemove(this);
                        }
                    }
                };
                if (Array.isArray(disposables)) {
                    disposables.push(result);
                }
                return result;
            };
        }
        return this._event;
    }
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    fire(event) {
        if (this._callbacks) {
            this._callbacks.invoke.call(this._callbacks, event);
        }
    }
    dispose() {
        if (this._callbacks) {
            this._callbacks.dispose();
            this._callbacks = undefined;
        }
    }
}
exports.Emitter = Emitter;
Emitter._noop = function () { };
//# sourceMappingURL=events.js.map

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractMessageBuffer = void 0;
const CR = 13;
const LF = 10;
const CRLF = '\r\n';
class AbstractMessageBuffer {
    constructor(encoding = 'utf-8') {
        this._encoding = encoding;
        this._chunks = [];
        this._totalLength = 0;
    }
    get encoding() {
        return this._encoding;
    }
    append(chunk) {
        const toAppend = typeof chunk === 'string' ? this.fromString(chunk, this._encoding) : chunk;
        this._chunks.push(toAppend);
        this._totalLength += toAppend.byteLength;
    }
    tryReadHeaders() {
        if (this._chunks.length === 0) {
            return undefined;
        }
        let state = 0;
        let chunkIndex = 0;
        let offset = 0;
        let chunkBytesRead = 0;
        row: while (chunkIndex < this._chunks.length) {
            const chunk = this._chunks[chunkIndex];
            offset = 0;
            column: while (offset < chunk.length) {
                const value = chunk[offset];
                switch (value) {
                    case CR:
                        switch (state) {
                            case 0:
                                state = 1;
                                break;
                            case 2:
                                state = 3;
                                break;
                            default:
                                state = 0;
                        }
                        break;
                    case LF:
                        switch (state) {
                            case 1:
                                state = 2;
                                break;
                            case 3:
                                state = 4;
                                offset++;
                                break row;
                            default:
                                state = 0;
                        }
                        break;
                    default:
                        state = 0;
                }
                offset++;
            }
            chunkBytesRead += chunk.byteLength;
            chunkIndex++;
        }
        if (state !== 4) {
            return undefined;
        }
        // The buffer contains the two CRLF at the end. So we will
        // have two empty lines after the split at the end as well.
        const buffer = this._read(chunkBytesRead + offset);
        const result = new Map();
        const headers = this.toString(buffer, 'ascii').split(CRLF);
        if (headers.length < 2) {
            return result;
        }
        for (let i = 0; i < headers.length - 2; i++) {
            const header = headers[i];
            const index = header.indexOf(':');
            if (index === -1) {
                throw new Error('Message header must separate key and value using :');
            }
            const key = header.substr(0, index);
            const value = header.substr(index + 1).trim();
            result.set(key, value);
        }
        return result;
    }
    tryReadBody(length) {
        if (this._totalLength < length) {
            return undefined;
        }
        return this._read(length);
    }
    get numberOfBytes() {
        return this._totalLength;
    }
    _read(byteCount) {
        if (byteCount === 0) {
            return this.emptyBuffer();
        }
        if (byteCount > this._totalLength) {
            throw new Error(`Cannot read so many bytes!`);
        }
        if (this._chunks[0].byteLength === byteCount) {
            // super fast path, precisely first chunk must be returned
            const chunk = this._chunks[0];
            this._chunks.shift();
            this._totalLength -= byteCount;
            return this.asNative(chunk);
        }
        if (this._chunks[0].byteLength > byteCount) {
            // fast path, the reading is entirely within the first chunk
            const chunk = this._chunks[0];
            const result = this.asNative(chunk, byteCount);
            this._chunks[0] = chunk.slice(byteCount);
            this._totalLength -= byteCount;
            return result;
        }
        const result = this.allocNative(byteCount);
        let resultOffset = 0;
        let chunkIndex = 0;
        while (byteCount > 0) {
            const chunk = this._chunks[chunkIndex];
            if (chunk.byteLength > byteCount) {
                // this chunk will survive
                const chunkPart = chunk.slice(0, byteCount);
                result.set(chunkPart, resultOffset);
                resultOffset += byteCount;
                this._chunks[chunkIndex] = chunk.slice(byteCount);
                this._totalLength -= byteCount;
                byteCount -= byteCount;
            }
            else {
                // this chunk will be entirely read
                result.set(chunk, resultOffset);
                resultOffset += chunk.byteLength;
                this._chunks.shift();
                this._totalLength -= chunk.byteLength;
                byteCount -= chunk.byteLength;
            }
        }
        return result;
    }
}
exports.AbstractMessageBuffer = AbstractMessageBuffer;
//# sourceMappingURL=messageBuffer.js.map

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
/// <reference path="../../typings/thenable.d.ts" />
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TraceFormat = exports.TraceValues = exports.Trace = exports.ProgressType = exports.ProgressToken = exports.createMessageConnection = exports.NullLogger = exports.ConnectionOptions = exports.ConnectionStrategy = exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = exports.CancellationToken = exports.CancellationTokenSource = exports.Emitter = exports.Event = exports.Disposable = exports.LRUCache = exports.Touch = exports.LinkedMap = exports.ParameterStructures = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.ErrorCodes = exports.ResponseError = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType0 = exports.RequestType = exports.Message = exports.RAL = void 0;
exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = void 0;
const messages_1 = __webpack_require__(16);
Object.defineProperty(exports, "Message", ({ enumerable: true, get: function () { return messages_1.Message; } }));
Object.defineProperty(exports, "RequestType", ({ enumerable: true, get: function () { return messages_1.RequestType; } }));
Object.defineProperty(exports, "RequestType0", ({ enumerable: true, get: function () { return messages_1.RequestType0; } }));
Object.defineProperty(exports, "RequestType1", ({ enumerable: true, get: function () { return messages_1.RequestType1; } }));
Object.defineProperty(exports, "RequestType2", ({ enumerable: true, get: function () { return messages_1.RequestType2; } }));
Object.defineProperty(exports, "RequestType3", ({ enumerable: true, get: function () { return messages_1.RequestType3; } }));
Object.defineProperty(exports, "RequestType4", ({ enumerable: true, get: function () { return messages_1.RequestType4; } }));
Object.defineProperty(exports, "RequestType5", ({ enumerable: true, get: function () { return messages_1.RequestType5; } }));
Object.defineProperty(exports, "RequestType6", ({ enumerable: true, get: function () { return messages_1.RequestType6; } }));
Object.defineProperty(exports, "RequestType7", ({ enumerable: true, get: function () { return messages_1.RequestType7; } }));
Object.defineProperty(exports, "RequestType8", ({ enumerable: true, get: function () { return messages_1.RequestType8; } }));
Object.defineProperty(exports, "RequestType9", ({ enumerable: true, get: function () { return messages_1.RequestType9; } }));
Object.defineProperty(exports, "ResponseError", ({ enumerable: true, get: function () { return messages_1.ResponseError; } }));
Object.defineProperty(exports, "ErrorCodes", ({ enumerable: true, get: function () { return messages_1.ErrorCodes; } }));
Object.defineProperty(exports, "NotificationType", ({ enumerable: true, get: function () { return messages_1.NotificationType; } }));
Object.defineProperty(exports, "NotificationType0", ({ enumerable: true, get: function () { return messages_1.NotificationType0; } }));
Object.defineProperty(exports, "NotificationType1", ({ enumerable: true, get: function () { return messages_1.NotificationType1; } }));
Object.defineProperty(exports, "NotificationType2", ({ enumerable: true, get: function () { return messages_1.NotificationType2; } }));
Object.defineProperty(exports, "NotificationType3", ({ enumerable: true, get: function () { return messages_1.NotificationType3; } }));
Object.defineProperty(exports, "NotificationType4", ({ enumerable: true, get: function () { return messages_1.NotificationType4; } }));
Object.defineProperty(exports, "NotificationType5", ({ enumerable: true, get: function () { return messages_1.NotificationType5; } }));
Object.defineProperty(exports, "NotificationType6", ({ enumerable: true, get: function () { return messages_1.NotificationType6; } }));
Object.defineProperty(exports, "NotificationType7", ({ enumerable: true, get: function () { return messages_1.NotificationType7; } }));
Object.defineProperty(exports, "NotificationType8", ({ enumerable: true, get: function () { return messages_1.NotificationType8; } }));
Object.defineProperty(exports, "NotificationType9", ({ enumerable: true, get: function () { return messages_1.NotificationType9; } }));
Object.defineProperty(exports, "ParameterStructures", ({ enumerable: true, get: function () { return messages_1.ParameterStructures; } }));
const linkedMap_1 = __webpack_require__(18);
Object.defineProperty(exports, "LinkedMap", ({ enumerable: true, get: function () { return linkedMap_1.LinkedMap; } }));
Object.defineProperty(exports, "LRUCache", ({ enumerable: true, get: function () { return linkedMap_1.LRUCache; } }));
Object.defineProperty(exports, "Touch", ({ enumerable: true, get: function () { return linkedMap_1.Touch; } }));
const disposable_1 = __webpack_require__(12);
Object.defineProperty(exports, "Disposable", ({ enumerable: true, get: function () { return disposable_1.Disposable; } }));
const events_1 = __webpack_require__(13);
Object.defineProperty(exports, "Event", ({ enumerable: true, get: function () { return events_1.Event; } }));
Object.defineProperty(exports, "Emitter", ({ enumerable: true, get: function () { return events_1.Emitter; } }));
const cancellation_1 = __webpack_require__(19);
Object.defineProperty(exports, "CancellationTokenSource", ({ enumerable: true, get: function () { return cancellation_1.CancellationTokenSource; } }));
Object.defineProperty(exports, "CancellationToken", ({ enumerable: true, get: function () { return cancellation_1.CancellationToken; } }));
const messageReader_1 = __webpack_require__(20);
Object.defineProperty(exports, "MessageReader", ({ enumerable: true, get: function () { return messageReader_1.MessageReader; } }));
Object.defineProperty(exports, "AbstractMessageReader", ({ enumerable: true, get: function () { return messageReader_1.AbstractMessageReader; } }));
Object.defineProperty(exports, "ReadableStreamMessageReader", ({ enumerable: true, get: function () { return messageReader_1.ReadableStreamMessageReader; } }));
const messageWriter_1 = __webpack_require__(21);
Object.defineProperty(exports, "MessageWriter", ({ enumerable: true, get: function () { return messageWriter_1.MessageWriter; } }));
Object.defineProperty(exports, "AbstractMessageWriter", ({ enumerable: true, get: function () { return messageWriter_1.AbstractMessageWriter; } }));
Object.defineProperty(exports, "WriteableStreamMessageWriter", ({ enumerable: true, get: function () { return messageWriter_1.WriteableStreamMessageWriter; } }));
const connection_1 = __webpack_require__(23);
Object.defineProperty(exports, "ConnectionStrategy", ({ enumerable: true, get: function () { return connection_1.ConnectionStrategy; } }));
Object.defineProperty(exports, "ConnectionOptions", ({ enumerable: true, get: function () { return connection_1.ConnectionOptions; } }));
Object.defineProperty(exports, "NullLogger", ({ enumerable: true, get: function () { return connection_1.NullLogger; } }));
Object.defineProperty(exports, "createMessageConnection", ({ enumerable: true, get: function () { return connection_1.createMessageConnection; } }));
Object.defineProperty(exports, "ProgressToken", ({ enumerable: true, get: function () { return connection_1.ProgressToken; } }));
Object.defineProperty(exports, "ProgressType", ({ enumerable: true, get: function () { return connection_1.ProgressType; } }));
Object.defineProperty(exports, "Trace", ({ enumerable: true, get: function () { return connection_1.Trace; } }));
Object.defineProperty(exports, "TraceValues", ({ enumerable: true, get: function () { return connection_1.TraceValues; } }));
Object.defineProperty(exports, "TraceFormat", ({ enumerable: true, get: function () { return connection_1.TraceFormat; } }));
Object.defineProperty(exports, "SetTraceNotification", ({ enumerable: true, get: function () { return connection_1.SetTraceNotification; } }));
Object.defineProperty(exports, "LogTraceNotification", ({ enumerable: true, get: function () { return connection_1.LogTraceNotification; } }));
Object.defineProperty(exports, "ConnectionErrors", ({ enumerable: true, get: function () { return connection_1.ConnectionErrors; } }));
Object.defineProperty(exports, "ConnectionError", ({ enumerable: true, get: function () { return connection_1.ConnectionError; } }));
Object.defineProperty(exports, "CancellationReceiverStrategy", ({ enumerable: true, get: function () { return connection_1.CancellationReceiverStrategy; } }));
Object.defineProperty(exports, "CancellationSenderStrategy", ({ enumerable: true, get: function () { return connection_1.CancellationSenderStrategy; } }));
Object.defineProperty(exports, "CancellationStrategy", ({ enumerable: true, get: function () { return connection_1.CancellationStrategy; } }));
const ral_1 = __webpack_require__(11);
exports.RAL = ral_1.default;
//# sourceMappingURL=api.js.map

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Message = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType = exports.RequestType0 = exports.AbstractMessageSignature = exports.ParameterStructures = exports.ResponseError = exports.ErrorCodes = void 0;
const is = __webpack_require__(17);
/**
 * Predefined error codes.
 */
var ErrorCodes;
(function (ErrorCodes) {
    // Defined by JSON RPC
    ErrorCodes.ParseError = -32700;
    ErrorCodes.InvalidRequest = -32600;
    ErrorCodes.MethodNotFound = -32601;
    ErrorCodes.InvalidParams = -32602;
    ErrorCodes.InternalError = -32603;
    /**
     * This is the start range of JSON RPC reserved error codes.
     * It doesn't denote a real error code. No application error codes should
     * be defined between the start and end range. For backwards
     * compatibility the `ServerNotInitialized` and the `UnknownErrorCode`
     * are left in the range.
     *
     * @since 3.16.0
    */
    ErrorCodes.jsonrpcReservedErrorRangeStart = -32099;
    /** @deprecated use  jsonrpcReservedErrorRangeStart */
    ErrorCodes.serverErrorStart = -32099;
    /**
     * An error occurred when write a message to the transport layer.
     */
    ErrorCodes.MessageWriteError = -32099;
    /**
     * An error occurred when reading a message from the transport layer.
     */
    ErrorCodes.MessageReadError = -32098;
    /**
     * The connection got disposed or lost and all pending responses got
     * rejected.
     */
    ErrorCodes.PendingResponseRejected = -32097;
    /**
     * The connection is inactive and a use of it failed.
     */
    ErrorCodes.ConnectionInactive = -32096;
    /**
     * Error code indicating that a server received a notification or
     * request before the server has received the `initialize` request.
     */
    ErrorCodes.ServerNotInitialized = -32002;
    ErrorCodes.UnknownErrorCode = -32001;
    /**
     * This is the end range of JSON RPC reserved error codes.
     * It doesn't denote a real error code.
     *
     * @since 3.16.0
    */
    ErrorCodes.jsonrpcReservedErrorRangeEnd = -32000;
    /** @deprecated use  jsonrpcReservedErrorRangeEnd */
    ErrorCodes.serverErrorEnd = -32000;
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
/**
 * An error object return in a response in case a request
 * has failed.
 */
class ResponseError extends Error {
    constructor(code, message, data) {
        super(message);
        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
    toJson() {
        const result = {
            code: this.code,
            message: this.message
        };
        if (this.data !== undefined) {
            result.data = this.data;
        }
        return result;
    }
}
exports.ResponseError = ResponseError;
class ParameterStructures {
    constructor(kind) {
        this.kind = kind;
    }
    static is(value) {
        return value === ParameterStructures.auto || value === ParameterStructures.byName || value === ParameterStructures.byPosition;
    }
    toString() {
        return this.kind;
    }
}
exports.ParameterStructures = ParameterStructures;
/**
 * The parameter structure is automatically inferred on the number of parameters
 * and the parameter type in case of a single param.
 */
ParameterStructures.auto = new ParameterStructures('auto');
/**
 * Forces `byPosition` parameter structure. This is useful if you have a single
 * parameter which has a literal type.
 */
ParameterStructures.byPosition = new ParameterStructures('byPosition');
/**
 * Forces `byName` parameter structure. This is only useful when having a single
 * parameter. The library will report errors if used with a different number of
 * parameters.
 */
ParameterStructures.byName = new ParameterStructures('byName');
/**
 * An abstract implementation of a MessageType.
 */
class AbstractMessageSignature {
    constructor(method, numberOfParams) {
        this.method = method;
        this.numberOfParams = numberOfParams;
    }
    get parameterStructures() {
        return ParameterStructures.auto;
    }
}
exports.AbstractMessageSignature = AbstractMessageSignature;
/**
 * Classes to type request response pairs
 */
class RequestType0 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 0);
    }
}
exports.RequestType0 = RequestType0;
class RequestType extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.RequestType = RequestType;
class RequestType1 extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.RequestType1 = RequestType1;
class RequestType2 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 2);
    }
}
exports.RequestType2 = RequestType2;
class RequestType3 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 3);
    }
}
exports.RequestType3 = RequestType3;
class RequestType4 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 4);
    }
}
exports.RequestType4 = RequestType4;
class RequestType5 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 5);
    }
}
exports.RequestType5 = RequestType5;
class RequestType6 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 6);
    }
}
exports.RequestType6 = RequestType6;
class RequestType7 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 7);
    }
}
exports.RequestType7 = RequestType7;
class RequestType8 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 8);
    }
}
exports.RequestType8 = RequestType8;
class RequestType9 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 9);
    }
}
exports.RequestType9 = RequestType9;
class NotificationType extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.NotificationType = NotificationType;
class NotificationType0 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 0);
    }
}
exports.NotificationType0 = NotificationType0;
class NotificationType1 extends AbstractMessageSignature {
    constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
    }
    get parameterStructures() {
        return this._parameterStructures;
    }
}
exports.NotificationType1 = NotificationType1;
class NotificationType2 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 2);
    }
}
exports.NotificationType2 = NotificationType2;
class NotificationType3 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 3);
    }
}
exports.NotificationType3 = NotificationType3;
class NotificationType4 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 4);
    }
}
exports.NotificationType4 = NotificationType4;
class NotificationType5 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 5);
    }
}
exports.NotificationType5 = NotificationType5;
class NotificationType6 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 6);
    }
}
exports.NotificationType6 = NotificationType6;
class NotificationType7 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 7);
    }
}
exports.NotificationType7 = NotificationType7;
class NotificationType8 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 8);
    }
}
exports.NotificationType8 = NotificationType8;
class NotificationType9 extends AbstractMessageSignature {
    constructor(method) {
        super(method, 9);
    }
}
exports.NotificationType9 = NotificationType9;
var Message;
(function (Message) {
    /**
     * Tests if the given message is a request message
     */
    function isRequest(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
    }
    Message.isRequest = isRequest;
    /**
     * Tests if the given message is a notification message
     */
    function isNotification(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && message.id === void 0;
    }
    Message.isNotification = isNotification;
    /**
     * Tests if the given message is a response message
     */
    function isResponse(message) {
        const candidate = message;
        return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
    }
    Message.isResponse = isResponse;
})(Message = exports.Message || (exports.Message = {}));
//# sourceMappingURL=messages.js.map

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = void 0;
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.string = string;
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
exports.number = number;
function error(value) {
    return value instanceof Error;
}
exports.error = error;
function func(value) {
    return typeof value === 'function';
}
exports.func = func;
function array(value) {
    return Array.isArray(value);
}
exports.array = array;
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
exports.stringArray = stringArray;
//# sourceMappingURL=is.js.map

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LRUCache = exports.LinkedMap = exports.Touch = void 0;
var Touch;
(function (Touch) {
    Touch.None = 0;
    Touch.First = 1;
    Touch.AsOld = Touch.First;
    Touch.Last = 2;
    Touch.AsNew = Touch.Last;
})(Touch = exports.Touch || (exports.Touch = {}));
class LinkedMap {
    constructor() {
        this[_a] = 'LinkedMap';
        this._map = new Map();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state = 0;
    }
    clear() {
        this._map.clear();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state++;
    }
    isEmpty() {
        return !this._head && !this._tail;
    }
    get size() {
        return this._size;
    }
    get first() {
        return this._head?.value;
    }
    get last() {
        return this._tail?.value;
    }
    has(key) {
        return this._map.has(key);
    }
    get(key, touch = Touch.None) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        if (touch !== Touch.None) {
            this.touch(item, touch);
        }
        return item.value;
    }
    set(key, value, touch = Touch.None) {
        let item = this._map.get(key);
        if (item) {
            item.value = value;
            if (touch !== Touch.None) {
                this.touch(item, touch);
            }
        }
        else {
            item = { key, value, next: undefined, previous: undefined };
            switch (touch) {
                case Touch.None:
                    this.addItemLast(item);
                    break;
                case Touch.First:
                    this.addItemFirst(item);
                    break;
                case Touch.Last:
                    this.addItemLast(item);
                    break;
                default:
                    this.addItemLast(item);
                    break;
            }
            this._map.set(key, item);
            this._size++;
        }
        return this;
    }
    delete(key) {
        return !!this.remove(key);
    }
    remove(key) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    shift() {
        if (!this._head && !this._tail) {
            return undefined;
        }
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    forEach(callbackfn, thisArg) {
        const state = this._state;
        let current = this._head;
        while (current) {
            if (thisArg) {
                callbackfn.bind(thisArg)(current.value, current.key, this);
            }
            else {
                callbackfn(current.value, current.key, this);
            }
            if (this._state !== state) {
                throw new Error(`LinkedMap got modified during iteration.`);
            }
            current = current.next;
        }
    }
    keys() {
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]: () => {
                return iterator;
            },
            next: () => {
                if (this._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: current.key, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    values() {
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]: () => {
                return iterator;
            },
            next: () => {
                if (this._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: current.value, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    entries() {
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]: () => {
                return iterator;
            },
            next: () => {
                if (this._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: [current.key, current.value], done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    [(_a = Symbol.toStringTag, Symbol.iterator)]() {
        return this.entries();
    }
    trimOld(newSize) {
        if (newSize >= this.size) {
            return;
        }
        if (newSize === 0) {
            this.clear();
            return;
        }
        let current = this._head;
        let currentSize = this.size;
        while (current && currentSize > newSize) {
            this._map.delete(current.key);
            current = current.next;
            currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) {
            current.previous = undefined;
        }
        this._state++;
    }
    addItemFirst(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._tail = item;
        }
        else if (!this._head) {
            throw new Error('Invalid list');
        }
        else {
            item.next = this._head;
            this._head.previous = item;
        }
        this._head = item;
        this._state++;
    }
    addItemLast(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._head = item;
        }
        else if (!this._tail) {
            throw new Error('Invalid list');
        }
        else {
            item.previous = this._tail;
            this._tail.next = item;
        }
        this._tail = item;
        this._state++;
    }
    removeItem(item) {
        if (item === this._head && item === this._tail) {
            this._head = undefined;
            this._tail = undefined;
        }
        else if (item === this._head) {
            // This can only happened if size === 1 which is handle
            // by the case above.
            if (!item.next) {
                throw new Error('Invalid list');
            }
            item.next.previous = undefined;
            this._head = item.next;
        }
        else if (item === this._tail) {
            // This can only happened if size === 1 which is handle
            // by the case above.
            if (!item.previous) {
                throw new Error('Invalid list');
            }
            item.previous.next = undefined;
            this._tail = item.previous;
        }
        else {
            const next = item.next;
            const previous = item.previous;
            if (!next || !previous) {
                throw new Error('Invalid list');
            }
            next.previous = previous;
            previous.next = next;
        }
        item.next = undefined;
        item.previous = undefined;
        this._state++;
    }
    touch(item, touch) {
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        if ((touch !== Touch.First && touch !== Touch.Last)) {
            return;
        }
        if (touch === Touch.First) {
            if (item === this._head) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item
            if (item === this._tail) {
                // previous must be defined since item was not head but is tail
                // So there are more than on item in the map
                previous.next = undefined;
                this._tail = previous;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            // Insert the node at head
            item.previous = undefined;
            item.next = this._head;
            this._head.previous = item;
            this._head = item;
            this._state++;
        }
        else if (touch === Touch.Last) {
            if (item === this._tail) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item.
            if (item === this._head) {
                // next must be defined since item was not tail but is head
                // So there are more than on item in the map
                next.previous = undefined;
                this._head = next;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            item.next = undefined;
            item.previous = this._tail;
            this._tail.next = item;
            this._tail = item;
            this._state++;
        }
    }
    toJSON() {
        const data = [];
        this.forEach((value, key) => {
            data.push([key, value]);
        });
        return data;
    }
    fromJSON(data) {
        this.clear();
        for (const [key, value] of data) {
            this.set(key, value);
        }
    }
}
exports.LinkedMap = LinkedMap;
class LRUCache extends LinkedMap {
    constructor(limit, ratio = 1) {
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
    }
    get limit() {
        return this._limit;
    }
    set limit(limit) {
        this._limit = limit;
        this.checkTrim();
    }
    get ratio() {
        return this._ratio;
    }
    set ratio(ratio) {
        this._ratio = Math.min(Math.max(0, ratio), 1);
        this.checkTrim();
    }
    get(key, touch = Touch.AsNew) {
        return super.get(key, touch);
    }
    peek(key) {
        return super.get(key, Touch.None);
    }
    set(key, value) {
        super.set(key, value, Touch.Last);
        this.checkTrim();
        return this;
    }
    checkTrim() {
        if (this.size > this._limit) {
            this.trimOld(Math.round(this._limit * this._ratio));
        }
    }
}
exports.LRUCache = LRUCache;
//# sourceMappingURL=linkedMap.js.map

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CancellationTokenSource = exports.CancellationToken = void 0;
const ral_1 = __webpack_require__(11);
const Is = __webpack_require__(17);
const events_1 = __webpack_require__(13);
var CancellationToken;
(function (CancellationToken) {
    CancellationToken.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events_1.Event.None
    });
    CancellationToken.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events_1.Event.None
    });
    function is(value) {
        const candidate = value;
        return candidate && (candidate === CancellationToken.None
            || candidate === CancellationToken.Cancelled
            || (Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested));
    }
    CancellationToken.is = is;
})(CancellationToken = exports.CancellationToken || (exports.CancellationToken = {}));
const shortcutEvent = Object.freeze(function (callback, context) {
    const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
    return { dispose() { handle.dispose(); } };
});
class MutableToken {
    constructor() {
        this._isCancelled = false;
    }
    cancel() {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    }
    get isCancellationRequested() {
        return this._isCancelled;
    }
    get onCancellationRequested() {
        if (this._isCancelled) {
            return shortcutEvent;
        }
        if (!this._emitter) {
            this._emitter = new events_1.Emitter();
        }
        return this._emitter.event;
    }
    dispose() {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = undefined;
        }
    }
}
class CancellationTokenSource {
    get token() {
        if (!this._token) {
            // be lazy and create the token only when
            // actually needed
            this._token = new MutableToken();
        }
        return this._token;
    }
    cancel() {
        if (!this._token) {
            // save an object by returning the default
            // cancelled token when cancellation happens
            // before someone asks for the token
            this._token = CancellationToken.Cancelled;
        }
        else {
            this._token.cancel();
        }
    }
    dispose() {
        if (!this._token) {
            // ensure to initialize with an empty token if we had none
            this._token = CancellationToken.None;
        }
        else if (this._token instanceof MutableToken) {
            // actually dispose
            this._token.dispose();
        }
    }
}
exports.CancellationTokenSource = CancellationTokenSource;
//# sourceMappingURL=cancellation.js.map

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = void 0;
const ral_1 = __webpack_require__(11);
const Is = __webpack_require__(17);
const events_1 = __webpack_require__(13);
var MessageReader;
(function (MessageReader) {
    function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) &&
            Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
    }
    MessageReader.is = is;
})(MessageReader = exports.MessageReader || (exports.MessageReader = {}));
class AbstractMessageReader {
    constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
        this.partialMessageEmitter = new events_1.Emitter();
    }
    dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
    }
    get onError() {
        return this.errorEmitter.event;
    }
    fireError(error) {
        this.errorEmitter.fire(this.asError(error));
    }
    get onClose() {
        return this.closeEmitter.event;
    }
    fireClose() {
        this.closeEmitter.fire(undefined);
    }
    get onPartialMessage() {
        return this.partialMessageEmitter.event;
    }
    firePartialMessage(info) {
        this.partialMessageEmitter.fire(info);
    }
    asError(error) {
        if (error instanceof Error) {
            return error;
        }
        else {
            return new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
        }
    }
}
exports.AbstractMessageReader = AbstractMessageReader;
var ResolvedMessageReaderOptions;
(function (ResolvedMessageReaderOptions) {
    function fromOptions(options) {
        let charset;
        let result;
        let contentDecoder;
        const contentDecoders = new Map();
        let contentTypeDecoder;
        const contentTypeDecoders = new Map();
        if (options === undefined || typeof options === 'string') {
            charset = options ?? 'utf-8';
        }
        else {
            charset = options.charset ?? 'utf-8';
            if (options.contentDecoder !== undefined) {
                contentDecoder = options.contentDecoder;
                contentDecoders.set(contentDecoder.name, contentDecoder);
            }
            if (options.contentDecoders !== undefined) {
                for (const decoder of options.contentDecoders) {
                    contentDecoders.set(decoder.name, decoder);
                }
            }
            if (options.contentTypeDecoder !== undefined) {
                contentTypeDecoder = options.contentTypeDecoder;
                contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
            }
            if (options.contentTypeDecoders !== undefined) {
                for (const decoder of options.contentTypeDecoders) {
                    contentTypeDecoders.set(decoder.name, decoder);
                }
            }
        }
        if (contentTypeDecoder === undefined) {
            contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
            contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
        }
        return { charset, contentDecoder, contentDecoders, contentTypeDecoder, contentTypeDecoders };
    }
    ResolvedMessageReaderOptions.fromOptions = fromOptions;
})(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
class ReadableStreamMessageReader extends AbstractMessageReader {
    constructor(readable, options) {
        super();
        this.readable = readable;
        this.options = ResolvedMessageReaderOptions.fromOptions(options);
        this.buffer = (0, ral_1.default)().messageBuffer.create(this.options.charset);
        this._partialMessageTimeout = 10000;
        this.nextMessageLength = -1;
        this.messageToken = 0;
    }
    set partialMessageTimeout(timeout) {
        this._partialMessageTimeout = timeout;
    }
    get partialMessageTimeout() {
        return this._partialMessageTimeout;
    }
    listen(callback) {
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.partialMessageTimer = undefined;
        this.callback = callback;
        const result = this.readable.onData((data) => {
            this.onData(data);
        });
        this.readable.onError((error) => this.fireError(error));
        this.readable.onClose(() => this.fireClose());
        return result;
    }
    onData(data) {
        this.buffer.append(data);
        while (true) {
            if (this.nextMessageLength === -1) {
                const headers = this.buffer.tryReadHeaders();
                if (!headers) {
                    return;
                }
                const contentLength = headers.get('Content-Length');
                if (!contentLength) {
                    throw new Error('Header must provide a Content-Length property.');
                }
                const length = parseInt(contentLength);
                if (isNaN(length)) {
                    throw new Error('Content-Length value must be a number.');
                }
                this.nextMessageLength = length;
            }
            const body = this.buffer.tryReadBody(this.nextMessageLength);
            if (body === undefined) {
                /** We haven't received the full message yet. */
                this.setPartialMessageTimer();
                return;
            }
            this.clearPartialMessageTimer();
            this.nextMessageLength = -1;
            let p;
            if (this.options.contentDecoder !== undefined) {
                p = this.options.contentDecoder.decode(body);
            }
            else {
                p = Promise.resolve(body);
            }
            p.then((value) => {
                this.options.contentTypeDecoder.decode(value, this.options).then((msg) => {
                    this.callback(msg);
                }, (error) => {
                    this.fireError(error);
                });
            }, (error) => {
                this.fireError(error);
            });
        }
    }
    clearPartialMessageTimer() {
        if (this.partialMessageTimer) {
            this.partialMessageTimer.dispose();
            this.partialMessageTimer = undefined;
        }
    }
    setPartialMessageTimer() {
        this.clearPartialMessageTimer();
        if (this._partialMessageTimeout <= 0) {
            return;
        }
        this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout((token, timeout) => {
            this.partialMessageTimer = undefined;
            if (token === this.messageToken) {
                this.firePartialMessage({ messageToken: token, waitingTime: timeout });
                this.setPartialMessageTimer();
            }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
    }
}
exports.ReadableStreamMessageReader = ReadableStreamMessageReader;
//# sourceMappingURL=messageReader.js.map

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = void 0;
const ral_1 = __webpack_require__(11);
const Is = __webpack_require__(17);
const semaphore_1 = __webpack_require__(22);
const events_1 = __webpack_require__(13);
const ContentLength = 'Content-Length: ';
const CRLF = '\r\n';
var MessageWriter;
(function (MessageWriter) {
    function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) &&
            Is.func(candidate.onError) && Is.func(candidate.write);
    }
    MessageWriter.is = is;
})(MessageWriter = exports.MessageWriter || (exports.MessageWriter = {}));
class AbstractMessageWriter {
    constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
    }
    dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
    }
    get onError() {
        return this.errorEmitter.event;
    }
    fireError(error, message, count) {
        this.errorEmitter.fire([this.asError(error), message, count]);
    }
    get onClose() {
        return this.closeEmitter.event;
    }
    fireClose() {
        this.closeEmitter.fire(undefined);
    }
    asError(error) {
        if (error instanceof Error) {
            return error;
        }
        else {
            return new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
        }
    }
}
exports.AbstractMessageWriter = AbstractMessageWriter;
var ResolvedMessageWriterOptions;
(function (ResolvedMessageWriterOptions) {
    function fromOptions(options) {
        if (options === undefined || typeof options === 'string') {
            return { charset: options ?? 'utf-8', contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder };
        }
        else {
            return { charset: options.charset ?? 'utf-8', contentEncoder: options.contentEncoder, contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1.default)().applicationJson.encoder };
        }
    }
    ResolvedMessageWriterOptions.fromOptions = fromOptions;
})(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
class WriteableStreamMessageWriter extends AbstractMessageWriter {
    constructor(writable, options) {
        super();
        this.writable = writable;
        this.options = ResolvedMessageWriterOptions.fromOptions(options);
        this.errorCount = 0;
        this.writeSemaphore = new semaphore_1.Semaphore(1);
        this.writable.onError((error) => this.fireError(error));
        this.writable.onClose(() => this.fireClose());
    }
    async write(msg) {
        return this.writeSemaphore.lock(async () => {
            const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
                if (this.options.contentEncoder !== undefined) {
                    return this.options.contentEncoder.encode(buffer);
                }
                else {
                    return buffer;
                }
            });
            return payload.then((buffer) => {
                const headers = [];
                headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
                headers.push(CRLF);
                return this.doWrite(msg, headers, buffer);
            }, (error) => {
                this.fireError(error);
                throw error;
            });
        });
    }
    async doWrite(msg, headers, data) {
        try {
            await this.writable.write(headers.join(''), 'ascii');
            return this.writable.write(data);
        }
        catch (error) {
            this.handleError(error, msg);
            return Promise.reject(error);
        }
    }
    handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
    }
    end() {
        this.writable.end();
    }
}
exports.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
//# sourceMappingURL=messageWriter.js.map

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Semaphore = void 0;
const ral_1 = __webpack_require__(11);
class Semaphore {
    constructor(capacity = 1) {
        if (capacity <= 0) {
            throw new Error('Capacity must be greater than 0');
        }
        this._capacity = capacity;
        this._active = 0;
        this._waiting = [];
    }
    lock(thunk) {
        return new Promise((resolve, reject) => {
            this._waiting.push({ thunk, resolve, reject });
            this.runNext();
        });
    }
    get active() {
        return this._active;
    }
    runNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
            return;
        }
        (0, ral_1.default)().timer.setImmediate(() => this.doRunNext());
    }
    doRunNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
            return;
        }
        const next = this._waiting.shift();
        this._active++;
        if (this._active > this._capacity) {
            throw new Error(`To many thunks active`);
        }
        try {
            const result = next.thunk();
            if (result instanceof Promise) {
                result.then((value) => {
                    this._active--;
                    next.resolve(value);
                    this.runNext();
                }, (err) => {
                    this._active--;
                    next.reject(err);
                    this.runNext();
                });
            }
            else {
                this._active--;
                next.resolve(result);
                this.runNext();
            }
        }
        catch (err) {
            this._active--;
            next.reject(err);
            this.runNext();
        }
    }
}
exports.Semaphore = Semaphore;
//# sourceMappingURL=semaphore.js.map

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMessageConnection = exports.ConnectionOptions = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.ConnectionStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.Trace = exports.NullLogger = exports.ProgressType = exports.ProgressToken = void 0;
const ral_1 = __webpack_require__(11);
const Is = __webpack_require__(17);
const messages_1 = __webpack_require__(16);
const linkedMap_1 = __webpack_require__(18);
const events_1 = __webpack_require__(13);
const cancellation_1 = __webpack_require__(19);
var CancelNotification;
(function (CancelNotification) {
    CancelNotification.type = new messages_1.NotificationType('$/cancelRequest');
})(CancelNotification || (CancelNotification = {}));
var ProgressToken;
(function (ProgressToken) {
    function is(value) {
        return typeof value === 'string' || typeof value === 'number';
    }
    ProgressToken.is = is;
})(ProgressToken = exports.ProgressToken || (exports.ProgressToken = {}));
var ProgressNotification;
(function (ProgressNotification) {
    ProgressNotification.type = new messages_1.NotificationType('$/progress');
})(ProgressNotification || (ProgressNotification = {}));
class ProgressType {
    constructor() {
    }
}
exports.ProgressType = ProgressType;
var StarRequestHandler;
(function (StarRequestHandler) {
    function is(value) {
        return Is.func(value);
    }
    StarRequestHandler.is = is;
})(StarRequestHandler || (StarRequestHandler = {}));
exports.NullLogger = Object.freeze({
    error: () => { },
    warn: () => { },
    info: () => { },
    log: () => { }
});
var Trace;
(function (Trace) {
    Trace[Trace["Off"] = 0] = "Off";
    Trace[Trace["Messages"] = 1] = "Messages";
    Trace[Trace["Compact"] = 2] = "Compact";
    Trace[Trace["Verbose"] = 3] = "Verbose";
})(Trace = exports.Trace || (exports.Trace = {}));
var TraceValues;
(function (TraceValues) {
    /**
     * Turn tracing off.
     */
    TraceValues.Off = 'off';
    /**
     * Trace messages only.
     */
    TraceValues.Messages = 'messages';
    /**
     * Compact message tracing.
     */
    TraceValues.Compact = 'compact';
    /**
     * Verbose message tracing.
     */
    TraceValues.Verbose = 'verbose';
})(TraceValues = exports.TraceValues || (exports.TraceValues = {}));
(function (Trace) {
    function fromString(value) {
        if (!Is.string(value)) {
            return Trace.Off;
        }
        value = value.toLowerCase();
        switch (value) {
            case 'off':
                return Trace.Off;
            case 'messages':
                return Trace.Messages;
            case 'compact':
                return Trace.Compact;
            case 'verbose':
                return Trace.Verbose;
            default:
                return Trace.Off;
        }
    }
    Trace.fromString = fromString;
    function toString(value) {
        switch (value) {
            case Trace.Off:
                return 'off';
            case Trace.Messages:
                return 'messages';
            case Trace.Compact:
                return 'compact';
            case Trace.Verbose:
                return 'verbose';
            default:
                return 'off';
        }
    }
    Trace.toString = toString;
})(Trace = exports.Trace || (exports.Trace = {}));
var TraceFormat;
(function (TraceFormat) {
    TraceFormat["Text"] = "text";
    TraceFormat["JSON"] = "json";
})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
(function (TraceFormat) {
    function fromString(value) {
        if (!Is.string(value)) {
            return TraceFormat.Text;
        }
        value = value.toLowerCase();
        if (value === 'json') {
            return TraceFormat.JSON;
        }
        else {
            return TraceFormat.Text;
        }
    }
    TraceFormat.fromString = fromString;
})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
var SetTraceNotification;
(function (SetTraceNotification) {
    SetTraceNotification.type = new messages_1.NotificationType('$/setTrace');
})(SetTraceNotification = exports.SetTraceNotification || (exports.SetTraceNotification = {}));
var LogTraceNotification;
(function (LogTraceNotification) {
    LogTraceNotification.type = new messages_1.NotificationType('$/logTrace');
})(LogTraceNotification = exports.LogTraceNotification || (exports.LogTraceNotification = {}));
var ConnectionErrors;
(function (ConnectionErrors) {
    /**
     * The connection is closed.
     */
    ConnectionErrors[ConnectionErrors["Closed"] = 1] = "Closed";
    /**
     * The connection got disposed.
     */
    ConnectionErrors[ConnectionErrors["Disposed"] = 2] = "Disposed";
    /**
     * The connection is already in listening mode.
     */
    ConnectionErrors[ConnectionErrors["AlreadyListening"] = 3] = "AlreadyListening";
})(ConnectionErrors = exports.ConnectionErrors || (exports.ConnectionErrors = {}));
class ConnectionError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, ConnectionError.prototype);
    }
}
exports.ConnectionError = ConnectionError;
var ConnectionStrategy;
(function (ConnectionStrategy) {
    function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.cancelUndispatched);
    }
    ConnectionStrategy.is = is;
})(ConnectionStrategy = exports.ConnectionStrategy || (exports.ConnectionStrategy = {}));
var CancellationReceiverStrategy;
(function (CancellationReceiverStrategy) {
    CancellationReceiverStrategy.Message = Object.freeze({
        createCancellationTokenSource(_) {
            return new cancellation_1.CancellationTokenSource();
        }
    });
    function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.createCancellationTokenSource);
    }
    CancellationReceiverStrategy.is = is;
})(CancellationReceiverStrategy = exports.CancellationReceiverStrategy || (exports.CancellationReceiverStrategy = {}));
var CancellationSenderStrategy;
(function (CancellationSenderStrategy) {
    CancellationSenderStrategy.Message = Object.freeze({
        sendCancellation(conn, id) {
            return conn.sendNotification(CancelNotification.type, { id });
        },
        cleanup(_) { }
    });
    function is(value) {
        const candidate = value;
        return candidate && Is.func(candidate.sendCancellation) && Is.func(candidate.cleanup);
    }
    CancellationSenderStrategy.is = is;
})(CancellationSenderStrategy = exports.CancellationSenderStrategy || (exports.CancellationSenderStrategy = {}));
var CancellationStrategy;
(function (CancellationStrategy) {
    CancellationStrategy.Message = Object.freeze({
        receiver: CancellationReceiverStrategy.Message,
        sender: CancellationSenderStrategy.Message
    });
    function is(value) {
        const candidate = value;
        return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
    }
    CancellationStrategy.is = is;
})(CancellationStrategy = exports.CancellationStrategy || (exports.CancellationStrategy = {}));
var ConnectionOptions;
(function (ConnectionOptions) {
    function is(value) {
        const candidate = value;
        return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy));
    }
    ConnectionOptions.is = is;
})(ConnectionOptions = exports.ConnectionOptions || (exports.ConnectionOptions = {}));
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["New"] = 1] = "New";
    ConnectionState[ConnectionState["Listening"] = 2] = "Listening";
    ConnectionState[ConnectionState["Closed"] = 3] = "Closed";
    ConnectionState[ConnectionState["Disposed"] = 4] = "Disposed";
})(ConnectionState || (ConnectionState = {}));
function createMessageConnection(messageReader, messageWriter, _logger, options) {
    const logger = _logger !== undefined ? _logger : exports.NullLogger;
    let sequenceNumber = 0;
    let notificationSequenceNumber = 0;
    let unknownResponseSequenceNumber = 0;
    const version = '2.0';
    let starRequestHandler = undefined;
    const requestHandlers = new Map();
    let starNotificationHandler = undefined;
    const notificationHandlers = new Map();
    const progressHandlers = new Map();
    let timer;
    let messageQueue = new linkedMap_1.LinkedMap();
    let responsePromises = new Map();
    let knownCanceledRequests = new Set();
    let requestTokens = new Map();
    let trace = Trace.Off;
    let traceFormat = TraceFormat.Text;
    let tracer;
    let state = ConnectionState.New;
    const errorEmitter = new events_1.Emitter();
    const closeEmitter = new events_1.Emitter();
    const unhandledNotificationEmitter = new events_1.Emitter();
    const unhandledProgressEmitter = new events_1.Emitter();
    const disposeEmitter = new events_1.Emitter();
    const cancellationStrategy = (options && options.cancellationStrategy) ? options.cancellationStrategy : CancellationStrategy.Message;
    function createRequestQueueKey(id) {
        if (id === null) {
            throw new Error(`Can't send requests with id null since the response can't be correlated.`);
        }
        return 'req-' + id.toString();
    }
    function createResponseQueueKey(id) {
        if (id === null) {
            return 'res-unknown-' + (++unknownResponseSequenceNumber).toString();
        }
        else {
            return 'res-' + id.toString();
        }
    }
    function createNotificationQueueKey() {
        return 'not-' + (++notificationSequenceNumber).toString();
    }
    function addMessageToQueue(queue, message) {
        if (messages_1.Message.isRequest(message)) {
            queue.set(createRequestQueueKey(message.id), message);
        }
        else if (messages_1.Message.isResponse(message)) {
            queue.set(createResponseQueueKey(message.id), message);
        }
        else {
            queue.set(createNotificationQueueKey(), message);
        }
    }
    function cancelUndispatched(_message) {
        return undefined;
    }
    function isListening() {
        return state === ConnectionState.Listening;
    }
    function isClosed() {
        return state === ConnectionState.Closed;
    }
    function isDisposed() {
        return state === ConnectionState.Disposed;
    }
    function closeHandler() {
        if (state === ConnectionState.New || state === ConnectionState.Listening) {
            state = ConnectionState.Closed;
            closeEmitter.fire(undefined);
        }
        // If the connection is disposed don't sent close events.
    }
    function readErrorHandler(error) {
        errorEmitter.fire([error, undefined, undefined]);
    }
    function writeErrorHandler(data) {
        errorEmitter.fire(data);
    }
    messageReader.onClose(closeHandler);
    messageReader.onError(readErrorHandler);
    messageWriter.onClose(closeHandler);
    messageWriter.onError(writeErrorHandler);
    function triggerMessageQueue() {
        if (timer || messageQueue.size === 0) {
            return;
        }
        timer = (0, ral_1.default)().timer.setImmediate(() => {
            timer = undefined;
            processMessageQueue();
        });
    }
    function processMessageQueue() {
        if (messageQueue.size === 0) {
            return;
        }
        const message = messageQueue.shift();
        try {
            if (messages_1.Message.isRequest(message)) {
                handleRequest(message);
            }
            else if (messages_1.Message.isNotification(message)) {
                handleNotification(message);
            }
            else if (messages_1.Message.isResponse(message)) {
                handleResponse(message);
            }
            else {
                handleInvalidMessage(message);
            }
        }
        finally {
            triggerMessageQueue();
        }
    }
    const callback = (message) => {
        try {
            // We have received a cancellation message. Check if the message is still in the queue
            // and cancel it if allowed to do so.
            if (messages_1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
                const cancelId = message.params.id;
                const key = createRequestQueueKey(cancelId);
                const toCancel = messageQueue.get(key);
                if (messages_1.Message.isRequest(toCancel)) {
                    const strategy = options?.connectionStrategy;
                    const response = (strategy && strategy.cancelUndispatched) ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
                    if (response && (response.error !== undefined || response.result !== undefined)) {
                        messageQueue.delete(key);
                        requestTokens.delete(cancelId);
                        response.id = toCancel.id;
                        traceSendingResponse(response, message.method, Date.now());
                        messageWriter.write(response).catch(() => logger.error(`Sending response for canceled message failed.`));
                        return;
                    }
                }
                const cancellationToken = requestTokens.get(cancelId);
                // The request is already running. Cancel the token
                if (cancellationToken !== undefined) {
                    cancellationToken.cancel();
                    traceReceivedNotification(message);
                    return;
                }
                else {
                    // Remember the cancel but still queue the message to
                    // clean up state in process message.
                    knownCanceledRequests.add(cancelId);
                }
            }
            addMessageToQueue(messageQueue, message);
        }
        finally {
            triggerMessageQueue();
        }
    };
    function handleRequest(requestMessage) {
        if (isDisposed()) {
            // we return here silently since we fired an event when the
            // connection got disposed.
            return;
        }
        function reply(resultOrError, method, startTime) {
            const message = {
                jsonrpc: version,
                id: requestMessage.id
            };
            if (resultOrError instanceof messages_1.ResponseError) {
                message.error = resultOrError.toJson();
            }
            else {
                message.result = resultOrError === undefined ? null : resultOrError;
            }
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        function replyError(error, method, startTime) {
            const message = {
                jsonrpc: version,
                id: requestMessage.id,
                error: error.toJson()
            };
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        function replySuccess(result, method, startTime) {
            // The JSON RPC defines that a response must either have a result or an error
            // So we can't treat undefined as a valid response result.
            if (result === undefined) {
                result = null;
            }
            const message = {
                jsonrpc: version,
                id: requestMessage.id,
                result: result
            };
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message).catch(() => logger.error(`Sending response failed.`));
        }
        traceReceivedRequest(requestMessage);
        const element = requestHandlers.get(requestMessage.method);
        let type;
        let requestHandler;
        if (element) {
            type = element.type;
            requestHandler = element.handler;
        }
        const startTime = Date.now();
        if (requestHandler || starRequestHandler) {
            const tokenKey = requestMessage.id ?? String(Date.now()); //
            const cancellationSource = cancellationStrategy.receiver.createCancellationTokenSource(tokenKey);
            if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
                cancellationSource.cancel();
            }
            if (requestMessage.id !== null) {
                requestTokens.set(tokenKey, cancellationSource);
            }
            try {
                let handlerResult;
                if (requestHandler) {
                    if (requestMessage.params === undefined) {
                        if (type !== undefined && type.numberOfParams !== 0) {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
                            return;
                        }
                        handlerResult = requestHandler(cancellationSource.token);
                    }
                    else if (Array.isArray(requestMessage.params)) {
                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byName) {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
                            return;
                        }
                        handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
                    }
                    else {
                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
                            return;
                        }
                        handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
                    }
                }
                else if (starRequestHandler) {
                    handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
                }
                const promise = handlerResult;
                if (!handlerResult) {
                    requestTokens.delete(tokenKey);
                    replySuccess(handlerResult, requestMessage.method, startTime);
                }
                else if (promise.then) {
                    promise.then((resultOrError) => {
                        requestTokens.delete(tokenKey);
                        reply(resultOrError, requestMessage.method, startTime);
                    }, error => {
                        requestTokens.delete(tokenKey);
                        if (error instanceof messages_1.ResponseError) {
                            replyError(error, requestMessage.method, startTime);
                        }
                        else if (error && Is.string(error.message)) {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                        }
                        else {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                        }
                    });
                }
                else {
                    requestTokens.delete(tokenKey);
                    reply(handlerResult, requestMessage.method, startTime);
                }
            }
            catch (error) {
                requestTokens.delete(tokenKey);
                if (error instanceof messages_1.ResponseError) {
                    reply(error, requestMessage.method, startTime);
                }
                else if (error && Is.string(error.message)) {
                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                }
                else {
                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                }
            }
        }
        else {
            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
        }
    }
    function handleResponse(responseMessage) {
        if (isDisposed()) {
            // See handle request.
            return;
        }
        if (responseMessage.id === null) {
            if (responseMessage.error) {
                logger.error(`Received response message without id: Error is: \n${JSON.stringify(responseMessage.error, undefined, 4)}`);
            }
            else {
                logger.error(`Received response message without id. No further error information provided.`);
            }
        }
        else {
            const key = responseMessage.id;
            const responsePromise = responsePromises.get(key);
            traceReceivedResponse(responseMessage, responsePromise);
            if (responsePromise !== undefined) {
                responsePromises.delete(key);
                try {
                    if (responseMessage.error) {
                        const error = responseMessage.error;
                        responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
                    }
                    else if (responseMessage.result !== undefined) {
                        responsePromise.resolve(responseMessage.result);
                    }
                    else {
                        throw new Error('Should never happen.');
                    }
                }
                catch (error) {
                    if (error.message) {
                        logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
                    }
                    else {
                        logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
                    }
                }
            }
        }
    }
    function handleNotification(message) {
        if (isDisposed()) {
            // See handle request.
            return;
        }
        let type = undefined;
        let notificationHandler;
        if (message.method === CancelNotification.type.method) {
            const cancelId = message.params.id;
            knownCanceledRequests.delete(cancelId);
            traceReceivedNotification(message);
            return;
        }
        else {
            const element = notificationHandlers.get(message.method);
            if (element) {
                notificationHandler = element.handler;
                type = element.type;
            }
        }
        if (notificationHandler || starNotificationHandler) {
            try {
                traceReceivedNotification(message);
                if (notificationHandler) {
                    if (message.params === undefined) {
                        if (type !== undefined) {
                            if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
                                logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
                            }
                        }
                        notificationHandler();
                    }
                    else if (Array.isArray(message.params)) {
                        // There are JSON-RPC libraries that send progress message as positional params although
                        // specified as named. So convert them if this is the case.
                        const params = message.params;
                        if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) {
                            notificationHandler({ token: params[0], value: params[1] });
                        }
                        else {
                            if (type !== undefined) {
                                if (type.parameterStructures === messages_1.ParameterStructures.byName) {
                                    logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                                }
                                if (type.numberOfParams !== message.params.length) {
                                    logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
                                }
                            }
                            notificationHandler(...params);
                        }
                    }
                    else {
                        if (type !== undefined && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                            logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
                        }
                        notificationHandler(message.params);
                    }
                }
                else if (starNotificationHandler) {
                    starNotificationHandler(message.method, message.params);
                }
            }
            catch (error) {
                if (error.message) {
                    logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
                }
                else {
                    logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
                }
            }
        }
        else {
            unhandledNotificationEmitter.fire(message);
        }
    }
    function handleInvalidMessage(message) {
        if (!message) {
            logger.error('Received empty message.');
            return;
        }
        logger.error(`Received message which is neither a response nor a notification message:\n${JSON.stringify(message, null, 4)}`);
        // Test whether we find an id to reject the promise
        const responseMessage = message;
        if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
            const key = responseMessage.id;
            const responseHandler = responsePromises.get(key);
            if (responseHandler) {
                responseHandler.reject(new Error('The received response has neither a result nor an error property.'));
            }
        }
    }
    function stringifyTrace(params) {
        if (params === undefined || params === null) {
            return undefined;
        }
        switch (trace) {
            case Trace.Verbose:
                return JSON.stringify(params, null, 4);
            case Trace.Compact:
                return JSON.stringify(params);
            default:
                return undefined;
        }
    }
    function traceSendingRequest(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
                data = `Params: ${stringifyTrace(message.params)}\n\n`;
            }
            tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
        }
        else {
            logLSPMessage('send-request', message);
        }
    }
    function traceSendingNotification(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
                if (message.params) {
                    data = `Params: ${stringifyTrace(message.params)}\n\n`;
                }
                else {
                    data = 'No parameters provided.\n\n';
                }
            }
            tracer.log(`Sending notification '${message.method}'.`, data);
        }
        else {
            logLSPMessage('send-notification', message);
        }
    }
    function traceSendingResponse(message, method, startTime) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
                if (message.error && message.error.data) {
                    data = `Error data: ${stringifyTrace(message.error.data)}\n\n`;
                }
                else {
                    if (message.result) {
                        data = `Result: ${stringifyTrace(message.result)}\n\n`;
                    }
                    else if (message.error === undefined) {
                        data = 'No result returned.\n\n';
                    }
                }
            }
            tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
        }
        else {
            logLSPMessage('send-response', message);
        }
    }
    function traceReceivedRequest(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
                data = `Params: ${stringifyTrace(message.params)}\n\n`;
            }
            tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
        }
        else {
            logLSPMessage('receive-request', message);
        }
    }
    function traceReceivedNotification(message) {
        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
                if (message.params) {
                    data = `Params: ${stringifyTrace(message.params)}\n\n`;
                }
                else {
                    data = 'No parameters provided.\n\n';
                }
            }
            tracer.log(`Received notification '${message.method}'.`, data);
        }
        else {
            logLSPMessage('receive-notification', message);
        }
    }
    function traceReceivedResponse(message, responsePromise) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose || trace === Trace.Compact) {
                if (message.error && message.error.data) {
                    data = `Error data: ${stringifyTrace(message.error.data)}\n\n`;
                }
                else {
                    if (message.result) {
                        data = `Result: ${stringifyTrace(message.result)}\n\n`;
                    }
                    else if (message.error === undefined) {
                        data = 'No result returned.\n\n';
                    }
                }
            }
            if (responsePromise) {
                const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : '';
                tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
            }
            else {
                tracer.log(`Received response ${message.id} without active response promise.`, data);
            }
        }
        else {
            logLSPMessage('receive-response', message);
        }
    }
    function logLSPMessage(type, message) {
        if (!tracer || trace === Trace.Off) {
            return;
        }
        const lspMessage = {
            isLSPMessage: true,
            type,
            message,
            timestamp: Date.now()
        };
        tracer.log(lspMessage);
    }
    function throwIfClosedOrDisposed() {
        if (isClosed()) {
            throw new ConnectionError(ConnectionErrors.Closed, 'Connection is closed.');
        }
        if (isDisposed()) {
            throw new ConnectionError(ConnectionErrors.Disposed, 'Connection is disposed.');
        }
    }
    function throwIfListening() {
        if (isListening()) {
            throw new ConnectionError(ConnectionErrors.AlreadyListening, 'Connection is already listening');
        }
    }
    function throwIfNotListening() {
        if (!isListening()) {
            throw new Error('Call listen() first.');
        }
    }
    function undefinedToNull(param) {
        if (param === undefined) {
            return null;
        }
        else {
            return param;
        }
    }
    function nullToUndefined(param) {
        if (param === null) {
            return undefined;
        }
        else {
            return param;
        }
    }
    function isNamedParam(param) {
        return param !== undefined && param !== null && !Array.isArray(param) && typeof param === 'object';
    }
    function computeSingleParam(parameterStructures, param) {
        switch (parameterStructures) {
            case messages_1.ParameterStructures.auto:
                if (isNamedParam(param)) {
                    return nullToUndefined(param);
                }
                else {
                    return [undefinedToNull(param)];
                }
            case messages_1.ParameterStructures.byName:
                if (!isNamedParam(param)) {
                    throw new Error(`Received parameters by name but param is not an object literal.`);
                }
                return nullToUndefined(param);
            case messages_1.ParameterStructures.byPosition:
                return [undefinedToNull(param)];
            default:
                throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
        }
    }
    function computeMessageParams(type, params) {
        let result;
        const numberOfParams = type.numberOfParams;
        switch (numberOfParams) {
            case 0:
                result = undefined;
                break;
            case 1:
                result = computeSingleParam(type.parameterStructures, params[0]);
                break;
            default:
                result = [];
                for (let i = 0; i < params.length && i < numberOfParams; i++) {
                    result.push(undefinedToNull(params[i]));
                }
                if (params.length < numberOfParams) {
                    for (let i = params.length; i < numberOfParams; i++) {
                        result.push(null);
                    }
                }
                break;
        }
        return result;
    }
    const connection = {
        sendNotification: (type, ...args) => {
            throwIfClosedOrDisposed();
            let method;
            let messageParams;
            if (Is.string(type)) {
                method = type;
                const first = args[0];
                let paramStart = 0;
                let parameterStructures = messages_1.ParameterStructures.auto;
                if (messages_1.ParameterStructures.is(first)) {
                    paramStart = 1;
                    parameterStructures = first;
                }
                let paramEnd = args.length;
                const numberOfParams = paramEnd - paramStart;
                switch (numberOfParams) {
                    case 0:
                        messageParams = undefined;
                        break;
                    case 1:
                        messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                        break;
                    default:
                        if (parameterStructures === messages_1.ParameterStructures.byName) {
                            throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
                        }
                        messageParams = args.slice(paramStart, paramEnd).map(value => undefinedToNull(value));
                        break;
                }
            }
            else {
                const params = args;
                method = type.method;
                messageParams = computeMessageParams(type, params);
            }
            const notificationMessage = {
                jsonrpc: version,
                method: method,
                params: messageParams
            };
            traceSendingNotification(notificationMessage);
            return messageWriter.write(notificationMessage).catch(() => logger.error(`Sending notification failed.`));
        },
        onNotification: (type, handler) => {
            throwIfClosedOrDisposed();
            let method;
            if (Is.func(type)) {
                starNotificationHandler = type;
            }
            else if (handler) {
                if (Is.string(type)) {
                    method = type;
                    notificationHandlers.set(type, { type: undefined, handler });
                }
                else {
                    method = type.method;
                    notificationHandlers.set(type.method, { type, handler });
                }
            }
            return {
                dispose: () => {
                    if (method !== undefined) {
                        notificationHandlers.delete(method);
                    }
                    else {
                        starNotificationHandler = undefined;
                    }
                }
            };
        },
        onProgress: (_type, token, handler) => {
            if (progressHandlers.has(token)) {
                throw new Error(`Progress handler for token ${token} already registered`);
            }
            progressHandlers.set(token, handler);
            return {
                dispose: () => {
                    progressHandlers.delete(token);
                }
            };
        },
        sendProgress: (_type, token, value) => {
            return connection.sendNotification(ProgressNotification.type, { token, value });
        },
        onUnhandledProgress: unhandledProgressEmitter.event,
        sendRequest: (type, ...args) => {
            throwIfClosedOrDisposed();
            throwIfNotListening();
            let method;
            let messageParams;
            let token = undefined;
            if (Is.string(type)) {
                method = type;
                const first = args[0];
                const last = args[args.length - 1];
                let paramStart = 0;
                let parameterStructures = messages_1.ParameterStructures.auto;
                if (messages_1.ParameterStructures.is(first)) {
                    paramStart = 1;
                    parameterStructures = first;
                }
                let paramEnd = args.length;
                if (cancellation_1.CancellationToken.is(last)) {
                    paramEnd = paramEnd - 1;
                    token = last;
                }
                const numberOfParams = paramEnd - paramStart;
                switch (numberOfParams) {
                    case 0:
                        messageParams = undefined;
                        break;
                    case 1:
                        messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                        break;
                    default:
                        if (parameterStructures === messages_1.ParameterStructures.byName) {
                            throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
                        }
                        messageParams = args.slice(paramStart, paramEnd).map(value => undefinedToNull(value));
                        break;
                }
            }
            else {
                const params = args;
                method = type.method;
                messageParams = computeMessageParams(type, params);
                const numberOfParams = type.numberOfParams;
                token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : undefined;
            }
            const id = sequenceNumber++;
            let disposable;
            if (token) {
                disposable = token.onCancellationRequested(() => {
                    const p = cancellationStrategy.sender.sendCancellation(connection, id);
                    if (p === undefined) {
                        logger.log(`Received no promise from cancellation strategy when cancelling id ${id}`);
                        return Promise.resolve();
                    }
                    else {
                        return p.catch(() => {
                            logger.log(`Sending cancellation messages for id ${id} failed`);
                        });
                    }
                });
            }
            const result = new Promise((resolve, reject) => {
                const requestMessage = {
                    jsonrpc: version,
                    id: id,
                    method: method,
                    params: messageParams
                };
                const resolveWithCleanup = (r) => {
                    resolve(r);
                    cancellationStrategy.sender.cleanup(id);
                    disposable?.dispose();
                };
                const rejectWithCleanup = (r) => {
                    reject(r);
                    cancellationStrategy.sender.cleanup(id);
                    disposable?.dispose();
                };
                let responsePromise = { method: method, timerStart: Date.now(), resolve: resolveWithCleanup, reject: rejectWithCleanup };
                traceSendingRequest(requestMessage);
                try {
                    messageWriter.write(requestMessage).catch(() => logger.error(`Sending request failed.`));
                }
                catch (e) {
                    // Writing the message failed. So we need to reject the promise.
                    responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, e.message ? e.message : 'Unknown reason'));
                    responsePromise = null;
                }
                if (responsePromise) {
                    responsePromises.set(id, responsePromise);
                }
            });
            return result;
        },
        onRequest: (type, handler) => {
            throwIfClosedOrDisposed();
            let method = null;
            if (StarRequestHandler.is(type)) {
                method = undefined;
                starRequestHandler = type;
            }
            else if (Is.string(type)) {
                method = null;
                if (handler !== undefined) {
                    method = type;
                    requestHandlers.set(type, { handler: handler, type: undefined });
                }
            }
            else {
                if (handler !== undefined) {
                    method = type.method;
                    requestHandlers.set(type.method, { type, handler });
                }
            }
            return {
                dispose: () => {
                    if (method === null) {
                        return;
                    }
                    if (method !== undefined) {
                        requestHandlers.delete(method);
                    }
                    else {
                        starRequestHandler = undefined;
                    }
                }
            };
        },
        hasPendingResponse: () => {
            return responsePromises.size > 0;
        },
        trace: async (_value, _tracer, sendNotificationOrTraceOptions) => {
            let _sendNotification = false;
            let _traceFormat = TraceFormat.Text;
            if (sendNotificationOrTraceOptions !== undefined) {
                if (Is.boolean(sendNotificationOrTraceOptions)) {
                    _sendNotification = sendNotificationOrTraceOptions;
                }
                else {
                    _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
                    _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
                }
            }
            trace = _value;
            traceFormat = _traceFormat;
            if (trace === Trace.Off) {
                tracer = undefined;
            }
            else {
                tracer = _tracer;
            }
            if (_sendNotification && !isClosed() && !isDisposed()) {
                await connection.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
            }
        },
        onError: errorEmitter.event,
        onClose: closeEmitter.event,
        onUnhandledNotification: unhandledNotificationEmitter.event,
        onDispose: disposeEmitter.event,
        end: () => {
            messageWriter.end();
        },
        dispose: () => {
            if (isDisposed()) {
                return;
            }
            state = ConnectionState.Disposed;
            disposeEmitter.fire(undefined);
            const error = new messages_1.ResponseError(messages_1.ErrorCodes.PendingResponseRejected, 'Pending response rejected since connection got disposed');
            for (const promise of responsePromises.values()) {
                promise.reject(error);
            }
            responsePromises = new Map();
            requestTokens = new Map();
            knownCanceledRequests = new Set();
            messageQueue = new linkedMap_1.LinkedMap();
            // Test for backwards compatibility
            if (Is.func(messageWriter.dispose)) {
                messageWriter.dispose();
            }
            if (Is.func(messageReader.dispose)) {
                messageReader.dispose();
            }
        },
        listen: () => {
            throwIfClosedOrDisposed();
            throwIfListening();
            state = ConnectionState.Listening;
            messageReader.listen(callback);
        },
        inspect: () => {
            // eslint-disable-next-line no-console
            (0, ral_1.default)().console.log('inspect');
        }
    };
    connection.onNotification(LogTraceNotification.type, (params) => {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        const verbose = trace === Trace.Verbose || trace === Trace.Compact;
        tracer.log(params.message, verbose ? params.verbose : undefined);
    });
    connection.onNotification(ProgressNotification.type, (params) => {
        const handler = progressHandlers.get(params.token);
        if (handler) {
            handler(params.value);
        }
        else {
            unhandledProgressEmitter.fire(params);
        }
    });
    return connection;
}
exports.createMessageConnection = createMessageConnection;
//# sourceMappingURL=connection.js.map

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LSPErrorCodes = exports.createProtocolConnection = void 0;
__exportStar(__webpack_require__(9), exports);
__exportStar(__webpack_require__(25), exports);
__exportStar(__webpack_require__(26), exports);
__exportStar(__webpack_require__(27), exports);
var connection_1 = __webpack_require__(49);
Object.defineProperty(exports, "createProtocolConnection", ({ enumerable: true, get: function () { return connection_1.createProtocolConnection; } }));
var LSPErrorCodes;
(function (LSPErrorCodes) {
    /**
    * This is the start range of LSP reserved error codes.
    * It doesn't denote a real error code.
    *
    * @since 3.16.0
    */
    LSPErrorCodes.lspReservedErrorRangeStart = -32899;
    /**
     * A request failed but it was syntactically correct, e.g the
     * method name was known and the parameters were valid. The error
     * message should contain human readable information about why
     * the request failed.
     *
     * @since 3.17.0
     */
    LSPErrorCodes.RequestFailed = -32803;
    /**
     * The server cancelled the request. This error code should
     * only be used for requests that explicitly support being
     * server cancellable.
     *
     * @since 3.17.0
     */
    LSPErrorCodes.ServerCancelled = -32802;
    /**
     * The server detected that the content of a document got
     * modified outside normal conditions. A server should
     * NOT send this error code if it detects a content change
     * in it unprocessed messages. The result even computed
     * on an older state might still be useful for the client.
     *
     * If a client decides that a result is not of any use anymore
     * the client should cancel the request.
     */
    LSPErrorCodes.ContentModified = -32801;
    /**
     * The client has canceled a request and a server as detected
     * the cancel.
     */
    LSPErrorCodes.RequestCancelled = -32800;
    /**
    * This is the end range of LSP reserved error codes.
    * It doesn't denote a real error code.
    *
    * @since 3.16.0
    */
    LSPErrorCodes.lspReservedErrorRangeEnd = -32800;
})(LSPErrorCodes = exports.LSPErrorCodes || (exports.LSPErrorCodes = {}));
//# sourceMappingURL=api.js.map

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentUri": () => (/* binding */ DocumentUri),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "integer": () => (/* binding */ integer),
/* harmony export */   "uinteger": () => (/* binding */ uinteger),
/* harmony export */   "Position": () => (/* binding */ Position),
/* harmony export */   "Range": () => (/* binding */ Range),
/* harmony export */   "Location": () => (/* binding */ Location),
/* harmony export */   "LocationLink": () => (/* binding */ LocationLink),
/* harmony export */   "Color": () => (/* binding */ Color),
/* harmony export */   "ColorInformation": () => (/* binding */ ColorInformation),
/* harmony export */   "ColorPresentation": () => (/* binding */ ColorPresentation),
/* harmony export */   "FoldingRangeKind": () => (/* binding */ FoldingRangeKind),
/* harmony export */   "FoldingRange": () => (/* binding */ FoldingRange),
/* harmony export */   "DiagnosticRelatedInformation": () => (/* binding */ DiagnosticRelatedInformation),
/* harmony export */   "DiagnosticSeverity": () => (/* binding */ DiagnosticSeverity),
/* harmony export */   "DiagnosticTag": () => (/* binding */ DiagnosticTag),
/* harmony export */   "CodeDescription": () => (/* binding */ CodeDescription),
/* harmony export */   "Diagnostic": () => (/* binding */ Diagnostic),
/* harmony export */   "Command": () => (/* binding */ Command),
/* harmony export */   "TextEdit": () => (/* binding */ TextEdit),
/* harmony export */   "ChangeAnnotation": () => (/* binding */ ChangeAnnotation),
/* harmony export */   "ChangeAnnotationIdentifier": () => (/* binding */ ChangeAnnotationIdentifier),
/* harmony export */   "AnnotatedTextEdit": () => (/* binding */ AnnotatedTextEdit),
/* harmony export */   "TextDocumentEdit": () => (/* binding */ TextDocumentEdit),
/* harmony export */   "CreateFile": () => (/* binding */ CreateFile),
/* harmony export */   "RenameFile": () => (/* binding */ RenameFile),
/* harmony export */   "DeleteFile": () => (/* binding */ DeleteFile),
/* harmony export */   "WorkspaceEdit": () => (/* binding */ WorkspaceEdit),
/* harmony export */   "WorkspaceChange": () => (/* binding */ WorkspaceChange),
/* harmony export */   "TextDocumentIdentifier": () => (/* binding */ TextDocumentIdentifier),
/* harmony export */   "VersionedTextDocumentIdentifier": () => (/* binding */ VersionedTextDocumentIdentifier),
/* harmony export */   "OptionalVersionedTextDocumentIdentifier": () => (/* binding */ OptionalVersionedTextDocumentIdentifier),
/* harmony export */   "TextDocumentItem": () => (/* binding */ TextDocumentItem),
/* harmony export */   "MarkupKind": () => (/* binding */ MarkupKind),
/* harmony export */   "MarkupContent": () => (/* binding */ MarkupContent),
/* harmony export */   "CompletionItemKind": () => (/* binding */ CompletionItemKind),
/* harmony export */   "InsertTextFormat": () => (/* binding */ InsertTextFormat),
/* harmony export */   "CompletionItemTag": () => (/* binding */ CompletionItemTag),
/* harmony export */   "InsertReplaceEdit": () => (/* binding */ InsertReplaceEdit),
/* harmony export */   "InsertTextMode": () => (/* binding */ InsertTextMode),
/* harmony export */   "CompletionItemLabelDetails": () => (/* binding */ CompletionItemLabelDetails),
/* harmony export */   "CompletionItem": () => (/* binding */ CompletionItem),
/* harmony export */   "CompletionList": () => (/* binding */ CompletionList),
/* harmony export */   "MarkedString": () => (/* binding */ MarkedString),
/* harmony export */   "Hover": () => (/* binding */ Hover),
/* harmony export */   "ParameterInformation": () => (/* binding */ ParameterInformation),
/* harmony export */   "SignatureInformation": () => (/* binding */ SignatureInformation),
/* harmony export */   "DocumentHighlightKind": () => (/* binding */ DocumentHighlightKind),
/* harmony export */   "DocumentHighlight": () => (/* binding */ DocumentHighlight),
/* harmony export */   "SymbolKind": () => (/* binding */ SymbolKind),
/* harmony export */   "SymbolTag": () => (/* binding */ SymbolTag),
/* harmony export */   "SymbolInformation": () => (/* binding */ SymbolInformation),
/* harmony export */   "WorkspaceSymbol": () => (/* binding */ WorkspaceSymbol),
/* harmony export */   "DocumentSymbol": () => (/* binding */ DocumentSymbol),
/* harmony export */   "CodeActionKind": () => (/* binding */ CodeActionKind),
/* harmony export */   "CodeActionTriggerKind": () => (/* binding */ CodeActionTriggerKind),
/* harmony export */   "CodeActionContext": () => (/* binding */ CodeActionContext),
/* harmony export */   "CodeAction": () => (/* binding */ CodeAction),
/* harmony export */   "CodeLens": () => (/* binding */ CodeLens),
/* harmony export */   "FormattingOptions": () => (/* binding */ FormattingOptions),
/* harmony export */   "DocumentLink": () => (/* binding */ DocumentLink),
/* harmony export */   "SelectionRange": () => (/* binding */ SelectionRange),
/* harmony export */   "SemanticTokenTypes": () => (/* binding */ SemanticTokenTypes),
/* harmony export */   "SemanticTokenModifiers": () => (/* binding */ SemanticTokenModifiers),
/* harmony export */   "SemanticTokens": () => (/* binding */ SemanticTokens),
/* harmony export */   "InlineValueText": () => (/* binding */ InlineValueText),
/* harmony export */   "InlineValueVariableLookup": () => (/* binding */ InlineValueVariableLookup),
/* harmony export */   "InlineValueEvaluatableExpression": () => (/* binding */ InlineValueEvaluatableExpression),
/* harmony export */   "InlineValueContext": () => (/* binding */ InlineValueContext),
/* harmony export */   "InlayHintKind": () => (/* binding */ InlayHintKind),
/* harmony export */   "InlayHintLabelPart": () => (/* binding */ InlayHintLabelPart),
/* harmony export */   "InlayHint": () => (/* binding */ InlayHint),
/* harmony export */   "WorkspaceFolder": () => (/* binding */ WorkspaceFolder),
/* harmony export */   "EOL": () => (/* binding */ EOL),
/* harmony export */   "TextDocument": () => (/* binding */ TextDocument)
/* harmony export */ });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

var DocumentUri;
(function (DocumentUri) {
    function is(value) {
        return typeof value === 'string';
    }
    DocumentUri.is = is;
})(DocumentUri || (DocumentUri = {}));
var URI;
(function (URI) {
    function is(value) {
        return typeof value === 'string';
    }
    URI.is = is;
})(URI || (URI = {}));
var integer;
(function (integer) {
    integer.MIN_VALUE = -2147483648;
    integer.MAX_VALUE = 2147483647;
    function is(value) {
        return typeof value === 'number' && integer.MIN_VALUE <= value && value <= integer.MAX_VALUE;
    }
    integer.is = is;
})(integer || (integer = {}));
var uinteger;
(function (uinteger) {
    uinteger.MIN_VALUE = 0;
    uinteger.MAX_VALUE = 2147483647;
    function is(value) {
        return typeof value === 'number' && uinteger.MIN_VALUE <= value && value <= uinteger.MAX_VALUE;
    }
    uinteger.is = is;
})(uinteger || (uinteger = {}));
/**
 * The Position namespace provides helper functions to work with
 * [Position](#Position) literals.
 */
var Position;
(function (Position) {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line, character) {
        if (line === Number.MAX_VALUE) {
            line = uinteger.MAX_VALUE;
        }
        if (character === Number.MAX_VALUE) {
            character = uinteger.MAX_VALUE;
        }
        return { line: line, character: character };
    }
    Position.create = create;
    /**
     * Checks whether the given literal conforms to the [Position](#Position) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
    }
    Position.is = is;
})(Position || (Position = {}));
/**
 * The Range namespace provides helper functions to work with
 * [Range](#Range) literals.
 */
var Range;
(function (Range) {
    function create(one, two, three, four) {
        if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
        }
        else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
        }
        else {
            throw new Error("Range#create called with invalid arguments[".concat(one, ", ").concat(two, ", ").concat(three, ", ").concat(four, "]"));
        }
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the [Range](#Range) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range.is = is;
})(Range || (Range = {}));
/**
 * The Location namespace provides helper functions to work with
 * [Location](#Location) literals.
 */
var Location;
(function (Location) {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri, range) {
        return { uri: uri, range: range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the [Location](#Location) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location.is = is;
})(Location || (Location = {}));
/**
 * The LocationLink namespace provides helper functions to work with
 * [LocationLink](#LocationLink) literals.
 */
var LocationLink;
(function (LocationLink) {
    /**
     * Creates a LocationLink literal.
     * @param targetUri The definition's uri.
     * @param targetRange The full range of the definition.
     * @param targetSelectionRange The span of the symbol definition at the target.
     * @param originSelectionRange The span of the symbol being defined in the originating source file.
     */
    function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
        return { targetUri: targetUri, targetRange: targetRange, targetSelectionRange: targetSelectionRange, originSelectionRange: originSelectionRange };
    }
    LocationLink.create = create;
    /**
     * Checks whether the given literal conforms to the [LocationLink](#LocationLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri)
            && Range.is(candidate.targetSelectionRange)
            && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
    }
    LocationLink.is = is;
})(LocationLink || (LocationLink = {}));
/**
 * The Color namespace provides helper functions to work with
 * [Color](#Color) literals.
 */
var Color;
(function (Color) {
    /**
     * Creates a new Color literal.
     */
    function create(red, green, blue, alpha) {
        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha,
        };
    }
    Color.create = create;
    /**
     * Checks whether the given literal conforms to the [Color](#Color) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1)
            && Is.numberRange(candidate.green, 0, 1)
            && Is.numberRange(candidate.blue, 0, 1)
            && Is.numberRange(candidate.alpha, 0, 1);
    }
    Color.is = is;
})(Color || (Color = {}));
/**
 * The ColorInformation namespace provides helper functions to work with
 * [ColorInformation](#ColorInformation) literals.
 */
var ColorInformation;
(function (ColorInformation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(range, color) {
        return {
            range: range,
            color: color,
        };
    }
    ColorInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
    }
    ColorInformation.is = is;
})(ColorInformation || (ColorInformation = {}));
/**
 * The Color namespace provides helper functions to work with
 * [ColorPresentation](#ColorPresentation) literals.
 */
var ColorPresentation;
(function (ColorPresentation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(label, textEdit, additionalTextEdits) {
        return {
            label: label,
            textEdit: textEdit,
            additionalTextEdits: additionalTextEdits,
        };
    }
    ColorPresentation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.label)
            && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate))
            && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
    }
    ColorPresentation.is = is;
})(ColorPresentation || (ColorPresentation = {}));
/**
 * A set of predefined range kinds.
 */
var FoldingRangeKind;
(function (FoldingRangeKind) {
    /**
     * Folding range for a comment
     */
    FoldingRangeKind.Comment = 'comment';
    /**
     * Folding range for an import or include
     */
    FoldingRangeKind.Imports = 'imports';
    /**
     * Folding range for a region (e.g. `#region`)
     */
    FoldingRangeKind.Region = 'region';
})(FoldingRangeKind || (FoldingRangeKind = {}));
/**
 * The folding range namespace provides helper functions to work with
 * [FoldingRange](#FoldingRange) literals.
 */
var FoldingRange;
(function (FoldingRange) {
    /**
     * Creates a new FoldingRange literal.
     */
    function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
        var result = {
            startLine: startLine,
            endLine: endLine
        };
        if (Is.defined(startCharacter)) {
            result.startCharacter = startCharacter;
        }
        if (Is.defined(endCharacter)) {
            result.endCharacter = endCharacter;
        }
        if (Is.defined(kind)) {
            result.kind = kind;
        }
        if (Is.defined(collapsedText)) {
            result.collapsedText = collapsedText;
        }
        return result;
    }
    FoldingRange.create = create;
    /**
     * Checks whether the given literal conforms to the [FoldingRange](#FoldingRange) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine)
            && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter))
            && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter))
            && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
    }
    FoldingRange.is = is;
})(FoldingRange || (FoldingRange = {}));
/**
 * The DiagnosticRelatedInformation namespace provides helper functions to work with
 * [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) literals.
 */
var DiagnosticRelatedInformation;
(function (DiagnosticRelatedInformation) {
    /**
     * Creates a new DiagnosticRelatedInformation literal.
     */
    function create(location, message) {
        return {
            location: location,
            message: message
        };
    }
    DiagnosticRelatedInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
    }
    DiagnosticRelatedInformation.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
/**
 * The diagnostic's severity.
 */
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    /**
     * Reports an error.
     */
    DiagnosticSeverity.Error = 1;
    /**
     * Reports a warning.
     */
    DiagnosticSeverity.Warning = 2;
    /**
     * Reports an information.
     */
    DiagnosticSeverity.Information = 3;
    /**
     * Reports a hint.
     */
    DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
/**
 * The diagnostic tags.
 *
 * @since 3.15.0
 */
var DiagnosticTag;
(function (DiagnosticTag) {
    /**
     * Unused or unnecessary code.
     *
     * Clients are allowed to render diagnostics with this tag faded out instead of having
     * an error squiggle.
     */
    DiagnosticTag.Unnecessary = 1;
    /**
     * Deprecated or obsolete code.
     *
     * Clients are allowed to rendered diagnostics with this tag strike through.
     */
    DiagnosticTag.Deprecated = 2;
})(DiagnosticTag || (DiagnosticTag = {}));
/**
 * The CodeDescription namespace provides functions to deal with descriptions for diagnostic codes.
 *
 * @since 3.16.0
 */
var CodeDescription;
(function (CodeDescription) {
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.href);
    }
    CodeDescription.is = is;
})(CodeDescription || (CodeDescription = {}));
/**
 * The Diagnostic namespace provides helper functions to work with
 * [Diagnostic](#Diagnostic) literals.
 */
var Diagnostic;
(function (Diagnostic) {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range, message, severity, code, source, relatedInformation) {
        var result = { range: range, message: message };
        if (Is.defined(severity)) {
            result.severity = severity;
        }
        if (Is.defined(code)) {
            result.code = code;
        }
        if (Is.defined(source)) {
            result.source = source;
        }
        if (Is.defined(relatedInformation)) {
            result.relatedInformation = relatedInformation;
        }
        return result;
    }
    Diagnostic.create = create;
    /**
     * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
     */
    function is(value) {
        var _a;
        var candidate = value;
        return Is.defined(candidate)
            && Range.is(candidate.range)
            && Is.string(candidate.message)
            && (Is.number(candidate.severity) || Is.undefined(candidate.severity))
            && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code))
            && (Is.undefined(candidate.codeDescription) || (Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)))
            && (Is.string(candidate.source) || Is.undefined(candidate.source))
            && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
    }
    Diagnostic.is = is;
})(Diagnostic || (Diagnostic = {}));
/**
 * The Command namespace provides helper functions to work with
 * [Command](#Command) literals.
 */
var Command;
(function (Command) {
    /**
     * Creates a new Command literal.
     */
    function create(title, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var result = { title: title, command: command };
        if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
        }
        return result;
    }
    Command.create = create;
    /**
     * Checks whether the given literal conforms to the [Command](#Command) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
    }
    Command.is = is;
})(Command || (Command = {}));
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
var TextEdit;
(function (TextEdit) {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range, newText) {
        return { range: range, newText: newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates an insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
        return { range: { start: position, end: position }, newText: newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
        return { range: range, newText: '' };
    }
    TextEdit.del = del;
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate)
            && Is.string(candidate.newText)
            && Range.is(candidate.range);
    }
    TextEdit.is = is;
})(TextEdit || (TextEdit = {}));
var ChangeAnnotation;
(function (ChangeAnnotation) {
    function create(label, needsConfirmation, description) {
        var result = { label: label };
        if (needsConfirmation !== undefined) {
            result.needsConfirmation = needsConfirmation;
        }
        if (description !== undefined) {
            result.description = description;
        }
        return result;
    }
    ChangeAnnotation.create = create;
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.label) &&
            (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === undefined) &&
            (Is.string(candidate.description) || candidate.description === undefined);
    }
    ChangeAnnotation.is = is;
})(ChangeAnnotation || (ChangeAnnotation = {}));
var ChangeAnnotationIdentifier;
(function (ChangeAnnotationIdentifier) {
    function is(value) {
        var candidate = value;
        return Is.string(candidate);
    }
    ChangeAnnotationIdentifier.is = is;
})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
var AnnotatedTextEdit;
(function (AnnotatedTextEdit) {
    /**
     * Creates an annotated replace text edit.
     *
     * @param range The range of text to be replaced.
     * @param newText The new text.
     * @param annotation The annotation.
     */
    function replace(range, newText, annotation) {
        return { range: range, newText: newText, annotationId: annotation };
    }
    AnnotatedTextEdit.replace = replace;
    /**
     * Creates an annotated insert text edit.
     *
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     * @param annotation The annotation.
     */
    function insert(position, newText, annotation) {
        return { range: { start: position, end: position }, newText: newText, annotationId: annotation };
    }
    AnnotatedTextEdit.insert = insert;
    /**
     * Creates an annotated delete text edit.
     *
     * @param range The range of text to be deleted.
     * @param annotation The annotation.
     */
    function del(range, annotation) {
        return { range: range, newText: '', annotationId: annotation };
    }
    AnnotatedTextEdit.del = del;
    function is(value) {
        var candidate = value;
        return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    AnnotatedTextEdit.is = is;
})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
/**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */
var TextDocumentEdit;
(function (TextDocumentEdit) {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(textDocument, edits) {
        return { textDocument: textDocument, edits: edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument)
            && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function (CreateFile) {
    function create(uri, options, annotation) {
        var result = {
            kind: 'create',
            uri: uri
        };
        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    CreateFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'create' && Is.string(candidate.uri) && (candidate.options === undefined ||
            ((candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    CreateFile.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function (RenameFile) {
    function create(oldUri, newUri, options, annotation) {
        var result = {
            kind: 'rename',
            oldUri: oldUri,
            newUri: newUri
        };
        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    RenameFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === undefined ||
            ((candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    RenameFile.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function (DeleteFile) {
    function create(uri, options, annotation) {
        var result = {
            kind: 'delete',
            uri: uri
        };
        if (options !== undefined && (options.recursive !== undefined || options.ignoreIfNotExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    DeleteFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) && (candidate.options === undefined ||
            ((candidate.options.recursive === undefined || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === undefined || Is.boolean(candidate.options.ignoreIfNotExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    DeleteFile.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function (WorkspaceEdit) {
    function is(value) {
        var candidate = value;
        return candidate &&
            (candidate.changes !== undefined || candidate.documentChanges !== undefined) &&
            (candidate.documentChanges === undefined || candidate.documentChanges.every(function (change) {
                if (Is.string(change.kind)) {
                    return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
                }
                else {
                    return TextDocumentEdit.is(change);
                }
            }));
    }
    WorkspaceEdit.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextEditChangeImpl = /** @class */ (function () {
    function TextEditChangeImpl(edits, changeAnnotations) {
        this.edits = edits;
        this.changeAnnotations = changeAnnotations;
    }
    TextEditChangeImpl.prototype.insert = function (position, newText, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
            edit = TextEdit.insert(position, newText);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.insert(position, newText, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.insert(position, newText, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    };
    TextEditChangeImpl.prototype.replace = function (range, newText, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
            edit = TextEdit.replace(range, newText);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.replace(range, newText, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.replace(range, newText, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    };
    TextEditChangeImpl.prototype.delete = function (range, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
            edit = TextEdit.del(range);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.del(range, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.del(range, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    };
    TextEditChangeImpl.prototype.add = function (edit) {
        this.edits.push(edit);
    };
    TextEditChangeImpl.prototype.all = function () {
        return this.edits;
    };
    TextEditChangeImpl.prototype.clear = function () {
        this.edits.splice(0, this.edits.length);
    };
    TextEditChangeImpl.prototype.assertChangeAnnotations = function (value) {
        if (value === undefined) {
            throw new Error("Text edit change is not configured to manage change annotations.");
        }
    };
    return TextEditChangeImpl;
}());
/**
 * A helper class
 */
var ChangeAnnotations = /** @class */ (function () {
    function ChangeAnnotations(annotations) {
        this._annotations = annotations === undefined ? Object.create(null) : annotations;
        this._counter = 0;
        this._size = 0;
    }
    ChangeAnnotations.prototype.all = function () {
        return this._annotations;
    };
    Object.defineProperty(ChangeAnnotations.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    ChangeAnnotations.prototype.manage = function (idOrAnnotation, annotation) {
        var id;
        if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
            id = idOrAnnotation;
        }
        else {
            id = this.nextId();
            annotation = idOrAnnotation;
        }
        if (this._annotations[id] !== undefined) {
            throw new Error("Id ".concat(id, " is already in use."));
        }
        if (annotation === undefined) {
            throw new Error("No annotation provided for id ".concat(id));
        }
        this._annotations[id] = annotation;
        this._size++;
        return id;
    };
    ChangeAnnotations.prototype.nextId = function () {
        this._counter++;
        return this._counter.toString();
    };
    return ChangeAnnotations;
}());
/**
 * A workspace change helps constructing changes to a workspace.
 */
var WorkspaceChange = /** @class */ (function () {
    function WorkspaceChange(workspaceEdit) {
        var _this = this;
        this._textEditChanges = Object.create(null);
        if (workspaceEdit !== undefined) {
            this._workspaceEdit = workspaceEdit;
            if (workspaceEdit.documentChanges) {
                this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
                workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                workspaceEdit.documentChanges.forEach(function (change) {
                    if (TextDocumentEdit.is(change)) {
                        var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
                        _this._textEditChanges[change.textDocument.uri] = textEditChange;
                    }
                });
            }
            else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function (key) {
                    var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                    _this._textEditChanges[key] = textEditChange;
                });
            }
        }
        else {
            this._workspaceEdit = {};
        }
    }
    Object.defineProperty(WorkspaceChange.prototype, "edit", {
        /**
         * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
         * use to be returned from a workspace edit operation like rename.
         */
        get: function () {
            this.initDocumentChanges();
            if (this._changeAnnotations !== undefined) {
                if (this._changeAnnotations.size === 0) {
                    this._workspaceEdit.changeAnnotations = undefined;
                }
                else {
                    this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                }
            }
            return this._workspaceEdit;
        },
        enumerable: false,
        configurable: true
    });
    WorkspaceChange.prototype.getTextEditChange = function (key) {
        if (OptionalVersionedTextDocumentIdentifier.is(key)) {
            this.initDocumentChanges();
            if (this._workspaceEdit.documentChanges === undefined) {
                throw new Error('Workspace edit is not configured for document changes.');
            }
            var textDocument = { uri: key.uri, version: key.version };
            var result = this._textEditChanges[textDocument.uri];
            if (!result) {
                var edits = [];
                var textDocumentEdit = {
                    textDocument: textDocument,
                    edits: edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits, this._changeAnnotations);
                this._textEditChanges[textDocument.uri] = result;
            }
            return result;
        }
        else {
            this.initChanges();
            if (this._workspaceEdit.changes === undefined) {
                throw new Error('Workspace edit is not configured for normal text edit changes.');
            }
            var result = this._textEditChanges[key];
            if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
            }
            return result;
        }
    };
    WorkspaceChange.prototype.initDocumentChanges = function () {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
            this._changeAnnotations = new ChangeAnnotations();
            this._workspaceEdit.documentChanges = [];
            this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
    };
    WorkspaceChange.prototype.initChanges = function () {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
            this._workspaceEdit.changes = Object.create(null);
        }
    };
    WorkspaceChange.prototype.createFile = function (uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
            operation = CreateFile.create(uri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = CreateFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    };
    WorkspaceChange.prototype.renameFile = function (oldUri, newUri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
            operation = RenameFile.create(oldUri, newUri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = RenameFile.create(oldUri, newUri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    };
    WorkspaceChange.prototype.deleteFile = function (uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
            operation = DeleteFile.create(uri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = DeleteFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    };
    return WorkspaceChange;
}());

/**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
 */
var TextDocumentIdentifier;
(function (TextDocumentIdentifier) {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri) {
        return { uri: uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
/**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
 */
var VersionedTextDocumentIdentifier;
(function (VersionedTextDocumentIdentifier) {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param version The document's version.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
    }
    VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
/**
 * The OptionalVersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [OptionalVersionedTextDocumentIdentifier](#OptionalVersionedTextDocumentIdentifier) literals.
 */
var OptionalVersionedTextDocumentIdentifier;
(function (OptionalVersionedTextDocumentIdentifier) {
    /**
     * Creates a new OptionalVersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param version The document's version.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    OptionalVersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [OptionalVersionedTextDocumentIdentifier](#OptionalVersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
    }
    OptionalVersionedTextDocumentIdentifier.is = is;
})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * [TextDocumentItem](#TextDocumentItem) literals.
 */
var TextDocumentItem;
(function (TextDocumentItem) {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri, languageId, version, text) {
        return { uri: uri, languageId: languageId, version: version, text: text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
var MarkupKind;
(function (MarkupKind) {
    /**
     * Plain text is supported as a content format
     */
    MarkupKind.PlainText = 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    MarkupKind.Markdown = 'markdown';
    /**
     * Checks whether the given value is a value of the [MarkupKind](#MarkupKind) type.
     */
    function is(value) {
        var candidate = value;
        return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
    }
    MarkupKind.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function (MarkupContent) {
    /**
     * Checks whether the given value conforms to the [MarkupContent](#MarkupContent) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
    }
    MarkupContent.is = is;
})(MarkupContent || (MarkupContent = {}));
/**
 * The kind of a completion entry.
 */
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */
var InsertTextFormat;
(function (InsertTextFormat) {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    InsertTextFormat.PlainText = 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://microsoft.github.io/language-server-protocol/specifications/specification-current/#snippet_syntax
     */
    InsertTextFormat.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
/**
 * Completion item tags are extra annotations that tweak the rendering of a completion
 * item.
 *
 * @since 3.15.0
 */
var CompletionItemTag;
(function (CompletionItemTag) {
    /**
     * Render a completion as obsolete, usually using a strike-out.
     */
    CompletionItemTag.Deprecated = 1;
})(CompletionItemTag || (CompletionItemTag = {}));
/**
 * The InsertReplaceEdit namespace provides functions to deal with insert / replace edits.
 *
 * @since 3.16.0
 */
var InsertReplaceEdit;
(function (InsertReplaceEdit) {
    /**
     * Creates a new insert / replace edit
     */
    function create(newText, insert, replace) {
        return { newText: newText, insert: insert, replace: replace };
    }
    InsertReplaceEdit.create = create;
    /**
     * Checks whether the given literal conforms to the [InsertReplaceEdit](#InsertReplaceEdit) interface.
     */
    function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
    }
    InsertReplaceEdit.is = is;
})(InsertReplaceEdit || (InsertReplaceEdit = {}));
/**
 * How whitespace and indentation is handled during completion
 * item insertion.
 *
 * @since 3.16.0
 */
var InsertTextMode;
(function (InsertTextMode) {
    /**
     * The insertion or replace strings is taken as it is. If the
     * value is multi line the lines below the cursor will be
     * inserted using the indentation defined in the string value.
     * The client will not apply any kind of adjustments to the
     * string.
     */
    InsertTextMode.asIs = 1;
    /**
     * The editor adjusts leading whitespace of new lines so that
     * they match the indentation up to the cursor of the line for
     * which the item is accepted.
     *
     * Consider a line like this: <2tabs><cursor><3tabs>foo. Accepting a
     * multi line completion item is indented using 2 tabs and all
     * following lines inserted will be indented using 2 tabs as well.
     */
    InsertTextMode.adjustIndentation = 2;
})(InsertTextMode || (InsertTextMode = {}));
var CompletionItemLabelDetails;
(function (CompletionItemLabelDetails) {
    function is(value) {
        var candidate = value;
        return candidate && (Is.string(candidate.detail) || candidate.detail === undefined) &&
            (Is.string(candidate.description) || candidate.description === undefined);
    }
    CompletionItemLabelDetails.is = is;
})(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */
var CompletionItem;
(function (CompletionItem) {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label) {
        return { label: label };
    }
    CompletionItem.create = create;
})(CompletionItem || (CompletionItem = {}));
/**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */
var CompletionList;
(function (CompletionList) {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function (MarkedString) {
    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */
    function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    }
    MarkedString.fromPlainText = fromPlainText;
    /**
     * Checks whether the given value conforms to the [MarkedString](#MarkedString) type.
     */
    function is(value) {
        var candidate = value;
        return Is.string(candidate) || (Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value));
    }
    MarkedString.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function (Hover) {
    /**
     * Checks whether the given value conforms to the [Hover](#Hover) interface.
     */
    function is(value) {
        var candidate = value;
        return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) ||
            MarkedString.is(candidate.contents) ||
            Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === undefined || Range.is(value.range));
    }
    Hover.is = is;
})(Hover || (Hover = {}));
/**
 * The ParameterInformation namespace provides helper functions to work with
 * [ParameterInformation](#ParameterInformation) literals.
 */
var ParameterInformation;
(function (ParameterInformation) {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label, documentation) {
        return documentation ? { label: label, documentation: documentation } : { label: label };
    }
    ParameterInformation.create = create;
})(ParameterInformation || (ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * [SignatureInformation](#SignatureInformation) literals.
 */
var SignatureInformation;
(function (SignatureInformation) {
    function create(label, documentation) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        var result = { label: label };
        if (Is.defined(documentation)) {
            result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
            result.parameters = parameters;
        }
        else {
            result.parameters = [];
        }
        return result;
    }
    SignatureInformation.create = create;
})(SignatureInformation || (SignatureInformation = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */
    DocumentHighlightKind.Text = 1;
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind.Read = 2;
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
/**
 * DocumentHighlight namespace to provide helper functions to work with
 * [DocumentHighlight](#DocumentHighlight) literals.
 */
var DocumentHighlight;
(function (DocumentHighlight) {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     * @param kind The highlight kind
     */
    function create(range, kind) {
        var result = { range: range };
        if (Is.number(kind)) {
            result.kind = kind;
        }
        return result;
    }
    DocumentHighlight.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
/**
 * A symbol kind.
 */
var SymbolKind;
(function (SymbolKind) {
    SymbolKind.File = 1;
    SymbolKind.Module = 2;
    SymbolKind.Namespace = 3;
    SymbolKind.Package = 4;
    SymbolKind.Class = 5;
    SymbolKind.Method = 6;
    SymbolKind.Property = 7;
    SymbolKind.Field = 8;
    SymbolKind.Constructor = 9;
    SymbolKind.Enum = 10;
    SymbolKind.Interface = 11;
    SymbolKind.Function = 12;
    SymbolKind.Variable = 13;
    SymbolKind.Constant = 14;
    SymbolKind.String = 15;
    SymbolKind.Number = 16;
    SymbolKind.Boolean = 17;
    SymbolKind.Array = 18;
    SymbolKind.Object = 19;
    SymbolKind.Key = 20;
    SymbolKind.Null = 21;
    SymbolKind.EnumMember = 22;
    SymbolKind.Struct = 23;
    SymbolKind.Event = 24;
    SymbolKind.Operator = 25;
    SymbolKind.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
/**
 * Symbol tags are extra annotations that tweak the rendering of a symbol.
 *
 * @since 3.16
 */
var SymbolTag;
(function (SymbolTag) {
    /**
     * Render a symbol as obsolete, usually using a strike-out.
     */
    SymbolTag.Deprecated = 1;
})(SymbolTag || (SymbolTag = {}));
var SymbolInformation;
(function (SymbolInformation) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol.
     * @param containerName The name of the symbol containing the symbol.
     */
    function create(name, kind, range, uri, containerName) {
        var result = {
            name: name,
            kind: kind,
            location: { uri: uri, range: range }
        };
        if (containerName) {
            result.containerName = containerName;
        }
        return result;
    }
    SymbolInformation.create = create;
})(SymbolInformation || (SymbolInformation = {}));
var WorkspaceSymbol;
(function (WorkspaceSymbol) {
    /**
     * Create a new workspace symbol.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param uri The resource of the location of the symbol.
     * @param range An options range of the location.
     * @returns A WorkspaceSymbol.
     */
    function create(name, kind, uri, range) {
        return range !== undefined
            ? { name: name, kind: kind, location: { uri: uri, range: range } }
            : { name: name, kind: kind, location: { uri: uri } };
    }
    WorkspaceSymbol.create = create;
})(WorkspaceSymbol || (WorkspaceSymbol = {}));
var DocumentSymbol;
(function (DocumentSymbol) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param detail The detail of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the symbol.
     * @param selectionRange The selectionRange of the symbol.
     * @param children Children of the symbol.
     */
    function create(name, detail, kind, range, selectionRange, children) {
        var result = {
            name: name,
            detail: detail,
            kind: kind,
            range: range,
            selectionRange: selectionRange
        };
        if (children !== undefined) {
            result.children = children;
        }
        return result;
    }
    DocumentSymbol.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentSymbol](#DocumentSymbol) interface.
     */
    function is(value) {
        var candidate = value;
        return candidate &&
            Is.string(candidate.name) && Is.number(candidate.kind) &&
            Range.is(candidate.range) && Range.is(candidate.selectionRange) &&
            (candidate.detail === undefined || Is.string(candidate.detail)) &&
            (candidate.deprecated === undefined || Is.boolean(candidate.deprecated)) &&
            (candidate.children === undefined || Array.isArray(candidate.children)) &&
            (candidate.tags === undefined || Array.isArray(candidate.tags));
    }
    DocumentSymbol.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
/**
 * A set of predefined code action kinds
 */
var CodeActionKind;
(function (CodeActionKind) {
    /**
     * Empty kind.
     */
    CodeActionKind.Empty = '';
    /**
     * Base kind for quickfix actions: 'quickfix'
     */
    CodeActionKind.QuickFix = 'quickfix';
    /**
     * Base kind for refactoring actions: 'refactor'
     */
    CodeActionKind.Refactor = 'refactor';
    /**
     * Base kind for refactoring extraction actions: 'refactor.extract'
     *
     * Example extract actions:
     *
     * - Extract method
     * - Extract function
     * - Extract variable
     * - Extract interface from class
     * - ...
     */
    CodeActionKind.RefactorExtract = 'refactor.extract';
    /**
     * Base kind for refactoring inline actions: 'refactor.inline'
     *
     * Example inline actions:
     *
     * - Inline function
     * - Inline variable
     * - Inline constant
     * - ...
     */
    CodeActionKind.RefactorInline = 'refactor.inline';
    /**
     * Base kind for refactoring rewrite actions: 'refactor.rewrite'
     *
     * Example rewrite actions:
     *
     * - Convert JavaScript function to class
     * - Add or remove parameter
     * - Encapsulate field
     * - Make method static
     * - Move method to base class
     * - ...
     */
    CodeActionKind.RefactorRewrite = 'refactor.rewrite';
    /**
     * Base kind for source actions: `source`
     *
     * Source code actions apply to the entire file.
     */
    CodeActionKind.Source = 'source';
    /**
     * Base kind for an organize imports source action: `source.organizeImports`
     */
    CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
    /**
     * Base kind for auto-fix source actions: `source.fixAll`.
     *
     * Fix all actions automatically fix errors that have a clear fix that do not require user input.
     * They should not suppress errors or perform unsafe fixes such as generating new types or classes.
     *
     * @since 3.15.0
     */
    CodeActionKind.SourceFixAll = 'source.fixAll';
})(CodeActionKind || (CodeActionKind = {}));
/**
 * The reason why code actions were requested.
 *
 * @since 3.17.0
 */
var CodeActionTriggerKind;
(function (CodeActionTriggerKind) {
    /**
     * Code actions were explicitly requested by the user or by an extension.
     */
    CodeActionTriggerKind.Invoked = 1;
    /**
     * Code actions were requested automatically.
     *
     * This typically happens when current selection in a file changes, but can
     * also be triggered when file content changes.
     */
    CodeActionTriggerKind.Automatic = 2;
})(CodeActionTriggerKind || (CodeActionTriggerKind = {}));
/**
 * The CodeActionContext namespace provides helper functions to work with
 * [CodeActionContext](#CodeActionContext) literals.
 */
var CodeActionContext;
(function (CodeActionContext) {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics, only, triggerKind) {
        var result = { diagnostics: diagnostics };
        if (only !== undefined && only !== null) {
            result.only = only;
        }
        if (triggerKind !== undefined && triggerKind !== null) {
            result.triggerKind = triggerKind;
        }
        return result;
    }
    CodeActionContext.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is)
            && (candidate.only === undefined || Is.typedArray(candidate.only, Is.string))
            && (candidate.triggerKind === undefined || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
    }
    CodeActionContext.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function (CodeAction) {
    function create(title, kindOrCommandOrEdit, kind) {
        var result = { title: title };
        var checkKind = true;
        if (typeof kindOrCommandOrEdit === 'string') {
            checkKind = false;
            result.kind = kindOrCommandOrEdit;
        }
        else if (Command.is(kindOrCommandOrEdit)) {
            result.command = kindOrCommandOrEdit;
        }
        else {
            result.edit = kindOrCommandOrEdit;
        }
        if (checkKind && kind !== undefined) {
            result.kind = kind;
        }
        return result;
    }
    CodeAction.create = create;
    function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.title) &&
            (candidate.diagnostics === undefined || Is.typedArray(candidate.diagnostics, Diagnostic.is)) &&
            (candidate.kind === undefined || Is.string(candidate.kind)) &&
            (candidate.edit !== undefined || candidate.command !== undefined) &&
            (candidate.command === undefined || Command.is(candidate.command)) &&
            (candidate.isPreferred === undefined || Is.boolean(candidate.isPreferred)) &&
            (candidate.edit === undefined || WorkspaceEdit.is(candidate.edit));
    }
    CodeAction.is = is;
})(CodeAction || (CodeAction = {}));
/**
 * The CodeLens namespace provides helper functions to work with
 * [CodeLens](#CodeLens) literals.
 */
var CodeLens;
(function (CodeLens) {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range, data) {
        var result = { range: range };
        if (Is.defined(data)) {
            result.data = data;
        }
        return result;
    }
    CodeLens.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens.is = is;
})(CodeLens || (CodeLens = {}));
/**
 * The FormattingOptions namespace provides helper functions to work with
 * [FormattingOptions](#FormattingOptions) literals.
 */
var FormattingOptions;
(function (FormattingOptions) {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize, insertSpaces) {
        return { tabSize: tabSize, insertSpaces: insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions.is = is;
})(FormattingOptions || (FormattingOptions = {}));
/**
 * The DocumentLink namespace provides helper functions to work with
 * [DocumentLink](#DocumentLink) literals.
 */
var DocumentLink;
(function (DocumentLink) {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range, target, data) {
        return { range: range, target: target, data: data };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink.is = is;
})(DocumentLink || (DocumentLink = {}));
/**
 * The SelectionRange namespace provides helper function to work with
 * SelectionRange literals.
 */
var SelectionRange;
(function (SelectionRange) {
    /**
     * Creates a new SelectionRange
     * @param range the range.
     * @param parent an optional parent.
     */
    function create(range, parent) {
        return { range: range, parent: parent };
    }
    SelectionRange.create = create;
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === undefined || SelectionRange.is(candidate.parent));
    }
    SelectionRange.is = is;
})(SelectionRange || (SelectionRange = {}));
/**
 * A set of predefined token types. This set is not fixed
 * an clients can specify additional token types via the
 * corresponding client capabilities.
 *
 * @since 3.16.0
 */
var SemanticTokenTypes;
(function (SemanticTokenTypes) {
    SemanticTokenTypes["namespace"] = "namespace";
    /**
     * Represents a generic type. Acts as a fallback for types which can't be mapped to
     * a specific type like class or enum.
     */
    SemanticTokenTypes["type"] = "type";
    SemanticTokenTypes["class"] = "class";
    SemanticTokenTypes["enum"] = "enum";
    SemanticTokenTypes["interface"] = "interface";
    SemanticTokenTypes["struct"] = "struct";
    SemanticTokenTypes["typeParameter"] = "typeParameter";
    SemanticTokenTypes["parameter"] = "parameter";
    SemanticTokenTypes["variable"] = "variable";
    SemanticTokenTypes["property"] = "property";
    SemanticTokenTypes["enumMember"] = "enumMember";
    SemanticTokenTypes["event"] = "event";
    SemanticTokenTypes["function"] = "function";
    SemanticTokenTypes["method"] = "method";
    SemanticTokenTypes["macro"] = "macro";
    SemanticTokenTypes["keyword"] = "keyword";
    SemanticTokenTypes["modifier"] = "modifier";
    SemanticTokenTypes["comment"] = "comment";
    SemanticTokenTypes["string"] = "string";
    SemanticTokenTypes["number"] = "number";
    SemanticTokenTypes["regexp"] = "regexp";
    SemanticTokenTypes["operator"] = "operator";
    /**
     * @since 3.17.0
     */
    SemanticTokenTypes["decorator"] = "decorator";
})(SemanticTokenTypes || (SemanticTokenTypes = {}));
/**
 * A set of predefined token modifiers. This set is not fixed
 * an clients can specify additional token types via the
 * corresponding client capabilities.
 *
 * @since 3.16.0
 */
var SemanticTokenModifiers;
(function (SemanticTokenModifiers) {
    SemanticTokenModifiers["declaration"] = "declaration";
    SemanticTokenModifiers["definition"] = "definition";
    SemanticTokenModifiers["readonly"] = "readonly";
    SemanticTokenModifiers["static"] = "static";
    SemanticTokenModifiers["deprecated"] = "deprecated";
    SemanticTokenModifiers["abstract"] = "abstract";
    SemanticTokenModifiers["async"] = "async";
    SemanticTokenModifiers["modification"] = "modification";
    SemanticTokenModifiers["documentation"] = "documentation";
    SemanticTokenModifiers["defaultLibrary"] = "defaultLibrary";
})(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
/**
 * @since 3.16.0
 */
var SemanticTokens;
(function (SemanticTokens) {
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && (candidate.resultId === undefined || typeof candidate.resultId === 'string') &&
            Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === 'number');
    }
    SemanticTokens.is = is;
})(SemanticTokens || (SemanticTokens = {}));
/**
 * The InlineValueText namespace provides functions to deal with InlineValueTexts.
 *
 * @since 3.17.0
 */
var InlineValueText;
(function (InlineValueText) {
    /**
     * Creates a new InlineValueText literal.
     */
    function create(range, text) {
        return { range: range, text: text };
    }
    InlineValueText.create = create;
    function is(value) {
        var candidate = value;
        return candidate !== undefined && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
    }
    InlineValueText.is = is;
})(InlineValueText || (InlineValueText = {}));
/**
 * The InlineValueVariableLookup namespace provides functions to deal with InlineValueVariableLookups.
 *
 * @since 3.17.0
 */
var InlineValueVariableLookup;
(function (InlineValueVariableLookup) {
    /**
     * Creates a new InlineValueText literal.
     */
    function create(range, variableName, caseSensitiveLookup) {
        return { range: range, variableName: variableName, caseSensitiveLookup: caseSensitiveLookup };
    }
    InlineValueVariableLookup.create = create;
    function is(value) {
        var candidate = value;
        return candidate !== undefined && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup)
            && (Is.string(candidate.variableName) || candidate.variableName === undefined);
    }
    InlineValueVariableLookup.is = is;
})(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
/**
 * The InlineValueEvaluatableExpression namespace provides functions to deal with InlineValueEvaluatableExpression.
 *
 * @since 3.17.0
 */
var InlineValueEvaluatableExpression;
(function (InlineValueEvaluatableExpression) {
    /**
     * Creates a new InlineValueEvaluatableExpression literal.
     */
    function create(range, expression) {
        return { range: range, expression: expression };
    }
    InlineValueEvaluatableExpression.create = create;
    function is(value) {
        var candidate = value;
        return candidate !== undefined && candidate !== null && Range.is(candidate.range)
            && (Is.string(candidate.expression) || candidate.expression === undefined);
    }
    InlineValueEvaluatableExpression.is = is;
})(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
/**
 * The InlineValueContext namespace provides helper functions to work with
 * [InlineValueContext](#InlineValueContext) literals.
 *
 * @since 3.17.0
 */
var InlineValueContext;
(function (InlineValueContext) {
    /**
     * Creates a new InlineValueContext literal.
     */
    function create(frameId, stoppedLocation) {
        return { frameId: frameId, stoppedLocation: stoppedLocation };
    }
    InlineValueContext.create = create;
    /**
     * Checks whether the given literal conforms to the [InlineValueContext](#InlineValueContext) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(value.stoppedLocation);
    }
    InlineValueContext.is = is;
})(InlineValueContext || (InlineValueContext = {}));
/**
 * Inlay hint kinds.
 *
 * @since 3.17.0
 */
var InlayHintKind;
(function (InlayHintKind) {
    /**
     * An inlay hint that for a type annotation.
     */
    InlayHintKind.Type = 1;
    /**
     * An inlay hint that is for a parameter.
     */
    InlayHintKind.Parameter = 2;
    function is(value) {
        return value === 1 || value === 2;
    }
    InlayHintKind.is = is;
})(InlayHintKind || (InlayHintKind = {}));
var InlayHintLabelPart;
(function (InlayHintLabelPart) {
    function create(value) {
        return { value: value };
    }
    InlayHintLabelPart.create = create;
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate)
            && (candidate.tooltip === undefined || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip))
            && (candidate.location === undefined || Location.is(candidate.location))
            && (candidate.command === undefined || Command.is(candidate.command));
    }
    InlayHintLabelPart.is = is;
})(InlayHintLabelPart || (InlayHintLabelPart = {}));
var InlayHint;
(function (InlayHint) {
    function create(position, label, kind) {
        var result = { position: position, label: label };
        if (kind !== undefined) {
            result.kind = kind;
        }
        return result;
    }
    InlayHint.create = create;
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.position)
            && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is))
            && (candidate.kind === undefined || InlayHintKind.is(candidate.kind))
            && (candidate.textEdits === undefined) || Is.typedArray(candidate.textEdits, TextEdit.is)
            && (candidate.tooltip === undefined || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip))
            && (candidate.paddingLeft === undefined || Is.boolean(candidate.paddingLeft))
            && (candidate.paddingRight === undefined || Is.boolean(candidate.paddingRight));
    }
    InlayHint.is = is;
})(InlayHint || (InlayHint = {}));
var WorkspaceFolder;
(function (WorkspaceFolder) {
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
    }
    WorkspaceFolder.is = is;
})(WorkspaceFolder || (WorkspaceFolder = {}));
var EOL = ['\n', '\r\n', '\r'];
/**
 * @deprecated Use the text document from the new vscode-languageserver-textdocument package.
 */
var TextDocument;
(function (TextDocument) {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId The document's language Id.
     * @param version The document's version.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount)
            && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;
    function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits, function (a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return diff;
        });
        var lastModifiedOffset = text.length;
        for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
                text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            }
            else {
                throw new Error('Overlapping edit');
            }
            lastModifiedOffset = startOffset;
        }
        return text;
    }
    TextDocument.applyEdits = applyEdits;
    function mergeSort(data, compare) {
        if (data.length <= 1) {
            // sorted
            return data;
        }
        var p = (data.length / 2) | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
                // smaller_equal -> take left to preserve order
                data[i++] = left[leftIdx++];
            }
            else {
                // greater -> take right
                data[i++] = right[rightIdx++];
            }
        }
        while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
        }
        return data;
    }
})(TextDocument || (TextDocument = {}));
/**
 * @deprecated Use the text document from the new vscode-languageserver-textdocument package.
 */
var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = undefined;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: false,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = undefined;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === undefined) {
            var lineOffsets = [];
            var text = this._content;
            var isLineStart = true;
            for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                    lineOffsets.push(i);
                    isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = (ch === '\r' || ch === '\n');
                if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                    i++;
                }
            }
            if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
            }
            this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
            return Position.create(0, offset);
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: false,
        configurable: true
    });
    return FullTextDocument;
}());
var Is;
(function (Is) {
    var toString = Object.prototype.toString;
    function defined(value) {
        return typeof value !== 'undefined';
    }
    Is.defined = defined;
    function undefined(value) {
        return typeof value === 'undefined';
    }
    Is.undefined = undefined;
    function boolean(value) {
        return value === true || value === false;
    }
    Is.boolean = boolean;
    function string(value) {
        return toString.call(value) === '[object String]';
    }
    Is.string = string;
    function number(value) {
        return toString.call(value) === '[object Number]';
    }
    Is.number = number;
    function numberRange(value, min, max) {
        return toString.call(value) === '[object Number]' && min <= value && value <= max;
    }
    Is.numberRange = numberRange;
    function integer(value) {
        return toString.call(value) === '[object Number]' && -2147483648 <= value && value <= 2147483647;
    }
    Is.integer = integer;
    function uinteger(value) {
        return toString.call(value) === '[object Number]' && 0 <= value && value <= 2147483647;
    }
    Is.uinteger = uinteger;
    function func(value) {
        return toString.call(value) === '[object Function]';
    }
    Is.func = func;
    function objectLiteral(value) {
        // Strictly speaking class instances pass this check as well. Since the LSP
        // doesn't use classes we ignore this for now. If we do we need to add something
        // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
        return value !== null && typeof value === 'object';
    }
    Is.objectLiteral = objectLiteral;
    function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
    }
    Is.typedArray = typedArray;
})(Is || (Is = {}));


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProtocolNotificationType = exports.ProtocolNotificationType0 = exports.ProtocolRequestType = exports.ProtocolRequestType0 = exports.RegistrationType = exports.MessageDirection = void 0;
const vscode_jsonrpc_1 = __webpack_require__(9);
var MessageDirection;
(function (MessageDirection) {
    MessageDirection["clientToServer"] = "clientToServer";
    MessageDirection["serverToClient"] = "serverToClient";
    MessageDirection["both"] = "both";
})(MessageDirection = exports.MessageDirection || (exports.MessageDirection = {}));
class RegistrationType {
    constructor(method) {
        this.method = method;
    }
}
exports.RegistrationType = RegistrationType;
class ProtocolRequestType0 extends vscode_jsonrpc_1.RequestType0 {
    constructor(method) {
        super(method);
    }
}
exports.ProtocolRequestType0 = ProtocolRequestType0;
class ProtocolRequestType extends vscode_jsonrpc_1.RequestType {
    constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
    }
}
exports.ProtocolRequestType = ProtocolRequestType;
class ProtocolNotificationType0 extends vscode_jsonrpc_1.NotificationType0 {
    constructor(method) {
        super(method);
    }
}
exports.ProtocolNotificationType0 = ProtocolNotificationType0;
class ProtocolNotificationType extends vscode_jsonrpc_1.NotificationType {
    constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
    }
}
exports.ProtocolNotificationType = ProtocolNotificationType;
//# sourceMappingURL=messages.js.map

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkspaceSymbolRequest = exports.CodeActionResolveRequest = exports.CodeActionRequest = exports.DocumentSymbolRequest = exports.DocumentHighlightRequest = exports.ReferencesRequest = exports.DefinitionRequest = exports.SignatureHelpRequest = exports.SignatureHelpTriggerKind = exports.HoverRequest = exports.CompletionResolveRequest = exports.CompletionRequest = exports.CompletionTriggerKind = exports.PublishDiagnosticsNotification = exports.WatchKind = exports.RelativePattern = exports.FileChangeType = exports.DidChangeWatchedFilesNotification = exports.WillSaveTextDocumentWaitUntilRequest = exports.WillSaveTextDocumentNotification = exports.TextDocumentSaveReason = exports.DidSaveTextDocumentNotification = exports.DidCloseTextDocumentNotification = exports.DidChangeTextDocumentNotification = exports.TextDocumentContentChangeEvent = exports.DidOpenTextDocumentNotification = exports.TextDocumentSyncKind = exports.TelemetryEventNotification = exports.LogMessageNotification = exports.ShowMessageRequest = exports.ShowMessageNotification = exports.MessageType = exports.DidChangeConfigurationNotification = exports.ExitNotification = exports.ShutdownRequest = exports.InitializedNotification = exports.InitializeErrorCodes = exports.InitializeRequest = exports.WorkDoneProgressOptions = exports.TextDocumentRegistrationOptions = exports.StaticRegistrationOptions = exports.PositionEncodingKind = exports.FailureHandlingKind = exports.ResourceOperationKind = exports.UnregistrationRequest = exports.RegistrationRequest = exports.DocumentSelector = exports.NotebookCellTextDocumentFilter = exports.NotebookDocumentFilter = exports.TextDocumentFilter = void 0;
exports.TypeHierarchySubtypesRequest = exports.TypeHierarchyPrepareRequest = exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.WillRenameFilesRequest = exports.DidRenameFilesNotification = exports.WillCreateFilesRequest = exports.DidCreateFilesNotification = exports.FileOperationPatternKind = exports.LinkedEditingRangeRequest = exports.ShowDocumentRequest = exports.SemanticTokensRegistrationType = exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.TokenFormat = exports.CallHierarchyPrepareRequest = exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = exports.SelectionRangeRequest = exports.DeclarationRequest = exports.FoldingRangeRequest = exports.ColorPresentationRequest = exports.DocumentColorRequest = exports.ConfigurationRequest = exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = exports.TypeDefinitionRequest = exports.ImplementationRequest = exports.ApplyWorkspaceEditRequest = exports.ExecuteCommandRequest = exports.PrepareRenameRequest = exports.RenameRequest = exports.PrepareSupportDefaultBehavior = exports.DocumentOnTypeFormattingRequest = exports.DocumentRangeFormattingRequest = exports.DocumentFormattingRequest = exports.DocumentLinkResolveRequest = exports.DocumentLinkRequest = exports.CodeLensRefreshRequest = exports.CodeLensResolveRequest = exports.CodeLensRequest = exports.WorkspaceSymbolResolveRequest = void 0;
exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = exports.InlineValueRefreshRequest = exports.InlineValueRequest = exports.TypeHierarchySupertypesRequest = void 0;
const messages_1 = __webpack_require__(26);
const vscode_languageserver_types_1 = __webpack_require__(25);
const Is = __webpack_require__(28);
const protocol_implementation_1 = __webpack_require__(29);
Object.defineProperty(exports, "ImplementationRequest", ({ enumerable: true, get: function () { return protocol_implementation_1.ImplementationRequest; } }));
const protocol_typeDefinition_1 = __webpack_require__(30);
Object.defineProperty(exports, "TypeDefinitionRequest", ({ enumerable: true, get: function () { return protocol_typeDefinition_1.TypeDefinitionRequest; } }));
const protocol_workspaceFolder_1 = __webpack_require__(31);
Object.defineProperty(exports, "WorkspaceFoldersRequest", ({ enumerable: true, get: function () { return protocol_workspaceFolder_1.WorkspaceFoldersRequest; } }));
Object.defineProperty(exports, "DidChangeWorkspaceFoldersNotification", ({ enumerable: true, get: function () { return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification; } }));
const protocol_configuration_1 = __webpack_require__(32);
Object.defineProperty(exports, "ConfigurationRequest", ({ enumerable: true, get: function () { return protocol_configuration_1.ConfigurationRequest; } }));
const protocol_colorProvider_1 = __webpack_require__(33);
Object.defineProperty(exports, "DocumentColorRequest", ({ enumerable: true, get: function () { return protocol_colorProvider_1.DocumentColorRequest; } }));
Object.defineProperty(exports, "ColorPresentationRequest", ({ enumerable: true, get: function () { return protocol_colorProvider_1.ColorPresentationRequest; } }));
const protocol_foldingRange_1 = __webpack_require__(34);
Object.defineProperty(exports, "FoldingRangeRequest", ({ enumerable: true, get: function () { return protocol_foldingRange_1.FoldingRangeRequest; } }));
const protocol_declaration_1 = __webpack_require__(35);
Object.defineProperty(exports, "DeclarationRequest", ({ enumerable: true, get: function () { return protocol_declaration_1.DeclarationRequest; } }));
const protocol_selectionRange_1 = __webpack_require__(36);
Object.defineProperty(exports, "SelectionRangeRequest", ({ enumerable: true, get: function () { return protocol_selectionRange_1.SelectionRangeRequest; } }));
const protocol_progress_1 = __webpack_require__(37);
Object.defineProperty(exports, "WorkDoneProgress", ({ enumerable: true, get: function () { return protocol_progress_1.WorkDoneProgress; } }));
Object.defineProperty(exports, "WorkDoneProgressCreateRequest", ({ enumerable: true, get: function () { return protocol_progress_1.WorkDoneProgressCreateRequest; } }));
Object.defineProperty(exports, "WorkDoneProgressCancelNotification", ({ enumerable: true, get: function () { return protocol_progress_1.WorkDoneProgressCancelNotification; } }));
const protocol_callHierarchy_1 = __webpack_require__(38);
Object.defineProperty(exports, "CallHierarchyIncomingCallsRequest", ({ enumerable: true, get: function () { return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest; } }));
Object.defineProperty(exports, "CallHierarchyOutgoingCallsRequest", ({ enumerable: true, get: function () { return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest; } }));
Object.defineProperty(exports, "CallHierarchyPrepareRequest", ({ enumerable: true, get: function () { return protocol_callHierarchy_1.CallHierarchyPrepareRequest; } }));
const protocol_semanticTokens_1 = __webpack_require__(39);
Object.defineProperty(exports, "TokenFormat", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.TokenFormat; } }));
Object.defineProperty(exports, "SemanticTokensRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRequest; } }));
Object.defineProperty(exports, "SemanticTokensDeltaRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensDeltaRequest; } }));
Object.defineProperty(exports, "SemanticTokensRangeRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRangeRequest; } }));
Object.defineProperty(exports, "SemanticTokensRefreshRequest", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRefreshRequest; } }));
Object.defineProperty(exports, "SemanticTokensRegistrationType", ({ enumerable: true, get: function () { return protocol_semanticTokens_1.SemanticTokensRegistrationType; } }));
const protocol_showDocument_1 = __webpack_require__(40);
Object.defineProperty(exports, "ShowDocumentRequest", ({ enumerable: true, get: function () { return protocol_showDocument_1.ShowDocumentRequest; } }));
const protocol_linkedEditingRange_1 = __webpack_require__(41);
Object.defineProperty(exports, "LinkedEditingRangeRequest", ({ enumerable: true, get: function () { return protocol_linkedEditingRange_1.LinkedEditingRangeRequest; } }));
const protocol_fileOperations_1 = __webpack_require__(42);
Object.defineProperty(exports, "FileOperationPatternKind", ({ enumerable: true, get: function () { return protocol_fileOperations_1.FileOperationPatternKind; } }));
Object.defineProperty(exports, "DidCreateFilesNotification", ({ enumerable: true, get: function () { return protocol_fileOperations_1.DidCreateFilesNotification; } }));
Object.defineProperty(exports, "WillCreateFilesRequest", ({ enumerable: true, get: function () { return protocol_fileOperations_1.WillCreateFilesRequest; } }));
Object.defineProperty(exports, "DidRenameFilesNotification", ({ enumerable: true, get: function () { return protocol_fileOperations_1.DidRenameFilesNotification; } }));
Object.defineProperty(exports, "WillRenameFilesRequest", ({ enumerable: true, get: function () { return protocol_fileOperations_1.WillRenameFilesRequest; } }));
Object.defineProperty(exports, "DidDeleteFilesNotification", ({ enumerable: true, get: function () { return protocol_fileOperations_1.DidDeleteFilesNotification; } }));
Object.defineProperty(exports, "WillDeleteFilesRequest", ({ enumerable: true, get: function () { return protocol_fileOperations_1.WillDeleteFilesRequest; } }));
const protocol_moniker_1 = __webpack_require__(43);
Object.defineProperty(exports, "UniquenessLevel", ({ enumerable: true, get: function () { return protocol_moniker_1.UniquenessLevel; } }));
Object.defineProperty(exports, "MonikerKind", ({ enumerable: true, get: function () { return protocol_moniker_1.MonikerKind; } }));
Object.defineProperty(exports, "MonikerRequest", ({ enumerable: true, get: function () { return protocol_moniker_1.MonikerRequest; } }));
const protocol_typeHierarchy_1 = __webpack_require__(44);
Object.defineProperty(exports, "TypeHierarchyPrepareRequest", ({ enumerable: true, get: function () { return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest; } }));
Object.defineProperty(exports, "TypeHierarchySubtypesRequest", ({ enumerable: true, get: function () { return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest; } }));
Object.defineProperty(exports, "TypeHierarchySupertypesRequest", ({ enumerable: true, get: function () { return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest; } }));
const protocol_inlineValue_1 = __webpack_require__(45);
Object.defineProperty(exports, "InlineValueRequest", ({ enumerable: true, get: function () { return protocol_inlineValue_1.InlineValueRequest; } }));
Object.defineProperty(exports, "InlineValueRefreshRequest", ({ enumerable: true, get: function () { return protocol_inlineValue_1.InlineValueRefreshRequest; } }));
const protocol_inlayHint_1 = __webpack_require__(46);
Object.defineProperty(exports, "InlayHintRequest", ({ enumerable: true, get: function () { return protocol_inlayHint_1.InlayHintRequest; } }));
Object.defineProperty(exports, "InlayHintResolveRequest", ({ enumerable: true, get: function () { return protocol_inlayHint_1.InlayHintResolveRequest; } }));
Object.defineProperty(exports, "InlayHintRefreshRequest", ({ enumerable: true, get: function () { return protocol_inlayHint_1.InlayHintRefreshRequest; } }));
const protocol_diagnostic_1 = __webpack_require__(47);
Object.defineProperty(exports, "DiagnosticServerCancellationData", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DiagnosticServerCancellationData; } }));
Object.defineProperty(exports, "DocumentDiagnosticReportKind", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DocumentDiagnosticReportKind; } }));
Object.defineProperty(exports, "DocumentDiagnosticRequest", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DocumentDiagnosticRequest; } }));
Object.defineProperty(exports, "WorkspaceDiagnosticRequest", ({ enumerable: true, get: function () { return protocol_diagnostic_1.WorkspaceDiagnosticRequest; } }));
Object.defineProperty(exports, "DiagnosticRefreshRequest", ({ enumerable: true, get: function () { return protocol_diagnostic_1.DiagnosticRefreshRequest; } }));
const protocol_notebook_1 = __webpack_require__(48);
Object.defineProperty(exports, "NotebookCellKind", ({ enumerable: true, get: function () { return protocol_notebook_1.NotebookCellKind; } }));
Object.defineProperty(exports, "ExecutionSummary", ({ enumerable: true, get: function () { return protocol_notebook_1.ExecutionSummary; } }));
Object.defineProperty(exports, "NotebookCell", ({ enumerable: true, get: function () { return protocol_notebook_1.NotebookCell; } }));
Object.defineProperty(exports, "NotebookDocument", ({ enumerable: true, get: function () { return protocol_notebook_1.NotebookDocument; } }));
Object.defineProperty(exports, "NotebookDocumentSyncRegistrationType", ({ enumerable: true, get: function () { return protocol_notebook_1.NotebookDocumentSyncRegistrationType; } }));
Object.defineProperty(exports, "DidOpenNotebookDocumentNotification", ({ enumerable: true, get: function () { return protocol_notebook_1.DidOpenNotebookDocumentNotification; } }));
Object.defineProperty(exports, "NotebookCellArrayChange", ({ enumerable: true, get: function () { return protocol_notebook_1.NotebookCellArrayChange; } }));
Object.defineProperty(exports, "DidChangeNotebookDocumentNotification", ({ enumerable: true, get: function () { return protocol_notebook_1.DidChangeNotebookDocumentNotification; } }));
Object.defineProperty(exports, "DidSaveNotebookDocumentNotification", ({ enumerable: true, get: function () { return protocol_notebook_1.DidSaveNotebookDocumentNotification; } }));
Object.defineProperty(exports, "DidCloseNotebookDocumentNotification", ({ enumerable: true, get: function () { return protocol_notebook_1.DidCloseNotebookDocumentNotification; } }));
// @ts-ignore: to avoid inlining LocationLink as dynamic import
let __noDynamicImport;
/**
 * The TextDocumentFilter namespace provides helper functions to work with
 * [TextDocumentFilter](#TextDocumentFilter) literals.
 *
 * @since 3.17.0
 */
var TextDocumentFilter;
(function (TextDocumentFilter) {
    function is(value) {
        const candidate = value;
        return Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern);
    }
    TextDocumentFilter.is = is;
})(TextDocumentFilter = exports.TextDocumentFilter || (exports.TextDocumentFilter = {}));
/**
 * The NotebookDocumentFilter namespace provides helper functions to work with
 * [NotebookDocumentFilter](#NotebookDocumentFilter) literals.
 *
 * @since 3.17.0
 */
var NotebookDocumentFilter;
(function (NotebookDocumentFilter) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (Is.string(candidate.notebookType) || Is.string(candidate.scheme) || Is.string(candidate.pattern));
    }
    NotebookDocumentFilter.is = is;
})(NotebookDocumentFilter = exports.NotebookDocumentFilter || (exports.NotebookDocumentFilter = {}));
/**
 * The NotebookCellTextDocumentFilter namespace provides helper functions to work with
 * [NotebookCellTextDocumentFilter](#NotebookCellTextDocumentFilter) literals.
 *
 * @since 3.17.0
 */
var NotebookCellTextDocumentFilter;
(function (NotebookCellTextDocumentFilter) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate)
            && (Is.string(candidate.notebook) || NotebookDocumentFilter.is(candidate.notebook))
            && (candidate.language === undefined || Is.string(candidate.language));
    }
    NotebookCellTextDocumentFilter.is = is;
})(NotebookCellTextDocumentFilter = exports.NotebookCellTextDocumentFilter || (exports.NotebookCellTextDocumentFilter = {}));
/**
 * The DocumentSelector namespace provides helper functions to work with
 * [DocumentSelector](#DocumentSelector)s.
 */
var DocumentSelector;
(function (DocumentSelector) {
    function is(value) {
        if (!Array.isArray(value)) {
            return false;
        }
        for (let elem of value) {
            if (!Is.string(elem) && !TextDocumentFilter.is(elem) && !NotebookCellTextDocumentFilter.is(elem)) {
                return false;
            }
        }
        return true;
    }
    DocumentSelector.is = is;
})(DocumentSelector = exports.DocumentSelector || (exports.DocumentSelector = {}));
/**
 * The `client/registerCapability` request is sent from the server to the client to register a new capability
 * handler on the client side.
 */
var RegistrationRequest;
(function (RegistrationRequest) {
    RegistrationRequest.method = 'client/registerCapability';
    RegistrationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    RegistrationRequest.type = new messages_1.ProtocolRequestType(RegistrationRequest.method);
})(RegistrationRequest = exports.RegistrationRequest || (exports.RegistrationRequest = {}));
/**
 * The `client/unregisterCapability` request is sent from the server to the client to unregister a previously registered capability
 * handler on the client side.
 */
var UnregistrationRequest;
(function (UnregistrationRequest) {
    UnregistrationRequest.method = 'client/unregisterCapability';
    UnregistrationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    UnregistrationRequest.type = new messages_1.ProtocolRequestType(UnregistrationRequest.method);
})(UnregistrationRequest = exports.UnregistrationRequest || (exports.UnregistrationRequest = {}));
var ResourceOperationKind;
(function (ResourceOperationKind) {
    /**
     * Supports creating new files and folders.
     */
    ResourceOperationKind.Create = 'create';
    /**
     * Supports renaming existing files and folders.
     */
    ResourceOperationKind.Rename = 'rename';
    /**
     * Supports deleting existing files and folders.
     */
    ResourceOperationKind.Delete = 'delete';
})(ResourceOperationKind = exports.ResourceOperationKind || (exports.ResourceOperationKind = {}));
var FailureHandlingKind;
(function (FailureHandlingKind) {
    /**
     * Applying the workspace change is simply aborted if one of the changes provided
     * fails. All operations executed before the failing operation stay executed.
     */
    FailureHandlingKind.Abort = 'abort';
    /**
     * All operations are executed transactional. That means they either all
     * succeed or no changes at all are applied to the workspace.
     */
    FailureHandlingKind.Transactional = 'transactional';
    /**
     * If the workspace edit contains only textual file changes they are executed transactional.
     * If resource changes (create, rename or delete file) are part of the change the failure
     * handling strategy is abort.
     */
    FailureHandlingKind.TextOnlyTransactional = 'textOnlyTransactional';
    /**
     * The client tries to undo the operations already executed. But there is no
     * guarantee that this is succeeding.
     */
    FailureHandlingKind.Undo = 'undo';
})(FailureHandlingKind = exports.FailureHandlingKind || (exports.FailureHandlingKind = {}));
/**
 * A set of predefined position encoding kinds.
 *
 * @since 3.17.0
 */
var PositionEncodingKind;
(function (PositionEncodingKind) {
    /**
     * Character offsets count UTF-8 code units.
     */
    PositionEncodingKind.UTF8 = 'utf-8';
    /**
     * Character offsets count UTF-16 code units.
     *
     * This is the default and must always be supported
     * by servers
     */
    PositionEncodingKind.UTF16 = 'utf-16';
    /**
     * Character offsets count UTF-32 code units.
     *
     * Implementation note: these are the same as Unicode code points,
     * so this `PositionEncodingKind` may also be used for an
     * encoding-agnostic representation of character offsets.
     */
    PositionEncodingKind.UTF32 = 'utf-32';
})(PositionEncodingKind = exports.PositionEncodingKind || (exports.PositionEncodingKind = {}));
/**
 * The StaticRegistrationOptions namespace provides helper functions to work with
 * [StaticRegistrationOptions](#StaticRegistrationOptions) literals.
 */
var StaticRegistrationOptions;
(function (StaticRegistrationOptions) {
    function hasId(value) {
        const candidate = value;
        return candidate && Is.string(candidate.id) && candidate.id.length > 0;
    }
    StaticRegistrationOptions.hasId = hasId;
})(StaticRegistrationOptions = exports.StaticRegistrationOptions || (exports.StaticRegistrationOptions = {}));
/**
 * The TextDocumentRegistrationOptions namespace provides helper functions to work with
 * [TextDocumentRegistrationOptions](#TextDocumentRegistrationOptions) literals.
 */
var TextDocumentRegistrationOptions;
(function (TextDocumentRegistrationOptions) {
    function is(value) {
        const candidate = value;
        return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
    }
    TextDocumentRegistrationOptions.is = is;
})(TextDocumentRegistrationOptions = exports.TextDocumentRegistrationOptions || (exports.TextDocumentRegistrationOptions = {}));
/**
 * The WorkDoneProgressOptions namespace provides helper functions to work with
 * [WorkDoneProgressOptions](#WorkDoneProgressOptions) literals.
 */
var WorkDoneProgressOptions;
(function (WorkDoneProgressOptions) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (candidate.workDoneProgress === undefined || Is.boolean(candidate.workDoneProgress));
    }
    WorkDoneProgressOptions.is = is;
    function hasWorkDoneProgress(value) {
        const candidate = value;
        return candidate && Is.boolean(candidate.workDoneProgress);
    }
    WorkDoneProgressOptions.hasWorkDoneProgress = hasWorkDoneProgress;
})(WorkDoneProgressOptions = exports.WorkDoneProgressOptions || (exports.WorkDoneProgressOptions = {}));
/**
 * The initialize request is sent from the client to the server.
 * It is sent once as the request after starting up the server.
 * The requests parameter is of type [InitializeParams](#InitializeParams)
 * the response if of type [InitializeResult](#InitializeResult) of a Thenable that
 * resolves to such.
 */
var InitializeRequest;
(function (InitializeRequest) {
    InitializeRequest.method = 'initialize';
    InitializeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    InitializeRequest.type = new messages_1.ProtocolRequestType(InitializeRequest.method);
})(InitializeRequest = exports.InitializeRequest || (exports.InitializeRequest = {}));
/**
 * Known error codes for an `InitializeErrorCodes`;
 */
var InitializeErrorCodes;
(function (InitializeErrorCodes) {
    /**
     * If the protocol version provided by the client can't be handled by the server.
     *
     * @deprecated This initialize error got replaced by client capabilities. There is
     * no version handshake in version 3.0x
     */
    InitializeErrorCodes.unknownProtocolVersion = 1;
})(InitializeErrorCodes = exports.InitializeErrorCodes || (exports.InitializeErrorCodes = {}));
/**
 * The initialized notification is sent from the client to the
 * server after the client is fully initialized and the server
 * is allowed to send requests from the server to the client.
 */
var InitializedNotification;
(function (InitializedNotification) {
    InitializedNotification.method = 'initialized';
    InitializedNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    InitializedNotification.type = new messages_1.ProtocolNotificationType(InitializedNotification.method);
})(InitializedNotification = exports.InitializedNotification || (exports.InitializedNotification = {}));
//---- Shutdown Method ----
/**
 * A shutdown request is sent from the client to the server.
 * It is sent once when the client decides to shutdown the
 * server. The only notification that is sent after a shutdown request
 * is the exit event.
 */
var ShutdownRequest;
(function (ShutdownRequest) {
    ShutdownRequest.method = 'shutdown';
    ShutdownRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ShutdownRequest.type = new messages_1.ProtocolRequestType0(ShutdownRequest.method);
})(ShutdownRequest = exports.ShutdownRequest || (exports.ShutdownRequest = {}));
//---- Exit Notification ----
/**
 * The exit event is sent from the client to the server to
 * ask the server to exit its process.
 */
var ExitNotification;
(function (ExitNotification) {
    ExitNotification.method = 'exit';
    ExitNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    ExitNotification.type = new messages_1.ProtocolNotificationType0(ExitNotification.method);
})(ExitNotification = exports.ExitNotification || (exports.ExitNotification = {}));
/**
 * The configuration change notification is sent from the client to the server
 * when the client's configuration has changed. The notification contains
 * the changed configuration as defined by the language client.
 */
var DidChangeConfigurationNotification;
(function (DidChangeConfigurationNotification) {
    DidChangeConfigurationNotification.method = 'workspace/didChangeConfiguration';
    DidChangeConfigurationNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeConfigurationNotification.type = new messages_1.ProtocolNotificationType(DidChangeConfigurationNotification.method);
})(DidChangeConfigurationNotification = exports.DidChangeConfigurationNotification || (exports.DidChangeConfigurationNotification = {}));
//---- Message show and log notifications ----
/**
 * The message type
 */
var MessageType;
(function (MessageType) {
    /**
     * An error message.
     */
    MessageType.Error = 1;
    /**
     * A warning message.
     */
    MessageType.Warning = 2;
    /**
     * An information message.
     */
    MessageType.Info = 3;
    /**
     * A log message.
     */
    MessageType.Log = 4;
})(MessageType = exports.MessageType || (exports.MessageType = {}));
/**
 * The show message notification is sent from a server to a client to ask
 * the client to display a particular message in the user interface.
 */
var ShowMessageNotification;
(function (ShowMessageNotification) {
    ShowMessageNotification.method = 'window/showMessage';
    ShowMessageNotification.messageDirection = messages_1.MessageDirection.serverToClient;
    ShowMessageNotification.type = new messages_1.ProtocolNotificationType(ShowMessageNotification.method);
})(ShowMessageNotification = exports.ShowMessageNotification || (exports.ShowMessageNotification = {}));
/**
 * The show message request is sent from the server to the client to show a message
 * and a set of options actions to the user.
 */
var ShowMessageRequest;
(function (ShowMessageRequest) {
    ShowMessageRequest.method = 'window/showMessageRequest';
    ShowMessageRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    ShowMessageRequest.type = new messages_1.ProtocolRequestType(ShowMessageRequest.method);
})(ShowMessageRequest = exports.ShowMessageRequest || (exports.ShowMessageRequest = {}));
/**
 * The log message notification is sent from the server to the client to ask
 * the client to log a particular message.
 */
var LogMessageNotification;
(function (LogMessageNotification) {
    LogMessageNotification.method = 'window/logMessage';
    LogMessageNotification.messageDirection = messages_1.MessageDirection.serverToClient;
    LogMessageNotification.type = new messages_1.ProtocolNotificationType(LogMessageNotification.method);
})(LogMessageNotification = exports.LogMessageNotification || (exports.LogMessageNotification = {}));
//---- Telemetry notification
/**
 * The telemetry event notification is sent from the server to the client to ask
 * the client to log telemetry data.
 */
var TelemetryEventNotification;
(function (TelemetryEventNotification) {
    TelemetryEventNotification.method = 'telemetry/event';
    TelemetryEventNotification.messageDirection = messages_1.MessageDirection.serverToClient;
    TelemetryEventNotification.type = new messages_1.ProtocolNotificationType(TelemetryEventNotification.method);
})(TelemetryEventNotification = exports.TelemetryEventNotification || (exports.TelemetryEventNotification = {}));
/**
 * Defines how the host (editor) should sync
 * document changes to the language server.
 */
var TextDocumentSyncKind;
(function (TextDocumentSyncKind) {
    /**
     * Documents should not be synced at all.
     */
    TextDocumentSyncKind.None = 0;
    /**
     * Documents are synced by always sending the full content
     * of the document.
     */
    TextDocumentSyncKind.Full = 1;
    /**
     * Documents are synced by sending the full content on open.
     * After that only incremental updates to the document are
     * send.
     */
    TextDocumentSyncKind.Incremental = 2;
})(TextDocumentSyncKind = exports.TextDocumentSyncKind || (exports.TextDocumentSyncKind = {}));
/**
 * The document open notification is sent from the client to the server to signal
 * newly opened text documents. The document's truth is now managed by the client
 * and the server must not try to read the document's truth using the document's
 * uri. Open in this sense means it is managed by the client. It doesn't necessarily
 * mean that its content is presented in an editor. An open notification must not
 * be sent more than once without a corresponding close notification send before.
 * This means open and close notification must be balanced and the max open count
 * is one.
 */
var DidOpenTextDocumentNotification;
(function (DidOpenTextDocumentNotification) {
    DidOpenTextDocumentNotification.method = 'textDocument/didOpen';
    DidOpenTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidOpenTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification.method);
})(DidOpenTextDocumentNotification = exports.DidOpenTextDocumentNotification || (exports.DidOpenTextDocumentNotification = {}));
var TextDocumentContentChangeEvent;
(function (TextDocumentContentChangeEvent) {
    /**
     * Checks whether the information describes a delta event.
     */
    function isIncremental(event) {
        let candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range !== undefined &&
            (candidate.rangeLength === undefined || typeof candidate.rangeLength === 'number');
    }
    TextDocumentContentChangeEvent.isIncremental = isIncremental;
    /**
     * Checks whether the information describes a full replacement event.
     */
    function isFull(event) {
        let candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range === undefined && candidate.rangeLength === undefined;
    }
    TextDocumentContentChangeEvent.isFull = isFull;
})(TextDocumentContentChangeEvent = exports.TextDocumentContentChangeEvent || (exports.TextDocumentContentChangeEvent = {}));
/**
 * The document change notification is sent from the client to the server to signal
 * changes to a text document.
 */
var DidChangeTextDocumentNotification;
(function (DidChangeTextDocumentNotification) {
    DidChangeTextDocumentNotification.method = 'textDocument/didChange';
    DidChangeTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification.method);
})(DidChangeTextDocumentNotification = exports.DidChangeTextDocumentNotification || (exports.DidChangeTextDocumentNotification = {}));
/**
 * The document close notification is sent from the client to the server when
 * the document got closed in the client. The document's truth now exists where
 * the document's uri points to (e.g. if the document's uri is a file uri the
 * truth now exists on disk). As with the open notification the close notification
 * is about managing the document's content. Receiving a close notification
 * doesn't mean that the document was open in an editor before. A close
 * notification requires a previous open notification to be sent.
 */
var DidCloseTextDocumentNotification;
(function (DidCloseTextDocumentNotification) {
    DidCloseTextDocumentNotification.method = 'textDocument/didClose';
    DidCloseTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidCloseTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification.method);
})(DidCloseTextDocumentNotification = exports.DidCloseTextDocumentNotification || (exports.DidCloseTextDocumentNotification = {}));
/**
 * The document save notification is sent from the client to the server when
 * the document got saved in the client.
 */
var DidSaveTextDocumentNotification;
(function (DidSaveTextDocumentNotification) {
    DidSaveTextDocumentNotification.method = 'textDocument/didSave';
    DidSaveTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidSaveTextDocumentNotification.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification.method);
})(DidSaveTextDocumentNotification = exports.DidSaveTextDocumentNotification || (exports.DidSaveTextDocumentNotification = {}));
/**
 * Represents reasons why a text document is saved.
 */
var TextDocumentSaveReason;
(function (TextDocumentSaveReason) {
    /**
     * Manually triggered, e.g. by the user pressing save, by starting debugging,
     * or by an API call.
     */
    TextDocumentSaveReason.Manual = 1;
    /**
     * Automatic after a delay.
     */
    TextDocumentSaveReason.AfterDelay = 2;
    /**
     * When the editor lost focus.
     */
    TextDocumentSaveReason.FocusOut = 3;
})(TextDocumentSaveReason = exports.TextDocumentSaveReason || (exports.TextDocumentSaveReason = {}));
/**
 * A document will save notification is sent from the client to the server before
 * the document is actually saved.
 */
var WillSaveTextDocumentNotification;
(function (WillSaveTextDocumentNotification) {
    WillSaveTextDocumentNotification.method = 'textDocument/willSave';
    WillSaveTextDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    WillSaveTextDocumentNotification.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification.method);
})(WillSaveTextDocumentNotification = exports.WillSaveTextDocumentNotification || (exports.WillSaveTextDocumentNotification = {}));
/**
 * A document will save request is sent from the client to the server before
 * the document is actually saved. The request can return an array of TextEdits
 * which will be applied to the text document before it is saved. Please note that
 * clients might drop results if computing the text edits took too long or if a
 * server constantly fails on this request. This is done to keep the save fast and
 * reliable.
 */
var WillSaveTextDocumentWaitUntilRequest;
(function (WillSaveTextDocumentWaitUntilRequest) {
    WillSaveTextDocumentWaitUntilRequest.method = 'textDocument/willSaveWaitUntil';
    WillSaveTextDocumentWaitUntilRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WillSaveTextDocumentWaitUntilRequest.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest.method);
})(WillSaveTextDocumentWaitUntilRequest = exports.WillSaveTextDocumentWaitUntilRequest || (exports.WillSaveTextDocumentWaitUntilRequest = {}));
/**
 * The watched files notification is sent from the client to the server when
 * the client detects changes to file watched by the language client.
 */
var DidChangeWatchedFilesNotification;
(function (DidChangeWatchedFilesNotification) {
    DidChangeWatchedFilesNotification.method = 'workspace/didChangeWatchedFiles';
    DidChangeWatchedFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeWatchedFilesNotification.type = new messages_1.ProtocolNotificationType(DidChangeWatchedFilesNotification.method);
})(DidChangeWatchedFilesNotification = exports.DidChangeWatchedFilesNotification || (exports.DidChangeWatchedFilesNotification = {}));
/**
 * The file event type
 */
var FileChangeType;
(function (FileChangeType) {
    /**
     * The file got created.
     */
    FileChangeType.Created = 1;
    /**
     * The file got changed.
     */
    FileChangeType.Changed = 2;
    /**
     * The file got deleted.
     */
    FileChangeType.Deleted = 3;
})(FileChangeType = exports.FileChangeType || (exports.FileChangeType = {}));
var RelativePattern;
(function (RelativePattern) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (vscode_languageserver_types_1.URI.is(candidate.baseUri) || vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) && Is.string(candidate.pattern);
    }
    RelativePattern.is = is;
})(RelativePattern = exports.RelativePattern || (exports.RelativePattern = {}));
var WatchKind;
(function (WatchKind) {
    /**
     * Interested in create events.
     */
    WatchKind.Create = 1;
    /**
     * Interested in change events
     */
    WatchKind.Change = 2;
    /**
     * Interested in delete events
     */
    WatchKind.Delete = 4;
})(WatchKind = exports.WatchKind || (exports.WatchKind = {}));
/**
 * Diagnostics notification are sent from the server to the client to signal
 * results of validation runs.
 */
var PublishDiagnosticsNotification;
(function (PublishDiagnosticsNotification) {
    PublishDiagnosticsNotification.method = 'textDocument/publishDiagnostics';
    PublishDiagnosticsNotification.messageDirection = messages_1.MessageDirection.serverToClient;
    PublishDiagnosticsNotification.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification.method);
})(PublishDiagnosticsNotification = exports.PublishDiagnosticsNotification || (exports.PublishDiagnosticsNotification = {}));
/**
 * How a completion was triggered
 */
var CompletionTriggerKind;
(function (CompletionTriggerKind) {
    /**
     * Completion was triggered by typing an identifier (24x7 code
     * complete), manual invocation (e.g Ctrl+Space) or via API.
     */
    CompletionTriggerKind.Invoked = 1;
    /**
     * Completion was triggered by a trigger character specified by
     * the `triggerCharacters` properties of the `CompletionRegistrationOptions`.
     */
    CompletionTriggerKind.TriggerCharacter = 2;
    /**
     * Completion was re-triggered as current completion list is incomplete
     */
    CompletionTriggerKind.TriggerForIncompleteCompletions = 3;
})(CompletionTriggerKind = exports.CompletionTriggerKind || (exports.CompletionTriggerKind = {}));
/**
 * Request to request completion at a given text document position. The request's
 * parameter is of type [TextDocumentPosition](#TextDocumentPosition) the response
 * is of type [CompletionItem[]](#CompletionItem) or [CompletionList](#CompletionList)
 * or a Thenable that resolves to such.
 *
 * The request can delay the computation of the [`detail`](#CompletionItem.detail)
 * and [`documentation`](#CompletionItem.documentation) properties to the `completionItem/resolve`
 * request. However, properties that are needed for the initial sorting and filtering, like `sortText`,
 * `filterText`, `insertText`, and `textEdit`, must not be changed during resolve.
 */
var CompletionRequest;
(function (CompletionRequest) {
    CompletionRequest.method = 'textDocument/completion';
    CompletionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CompletionRequest.type = new messages_1.ProtocolRequestType(CompletionRequest.method);
})(CompletionRequest = exports.CompletionRequest || (exports.CompletionRequest = {}));
/**
 * Request to resolve additional information for a given completion item.The request's
 * parameter is of type [CompletionItem](#CompletionItem) the response
 * is of type [CompletionItem](#CompletionItem) or a Thenable that resolves to such.
 */
var CompletionResolveRequest;
(function (CompletionResolveRequest) {
    CompletionResolveRequest.method = 'completionItem/resolve';
    CompletionResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CompletionResolveRequest.type = new messages_1.ProtocolRequestType(CompletionResolveRequest.method);
})(CompletionResolveRequest = exports.CompletionResolveRequest || (exports.CompletionResolveRequest = {}));
/**
 * Request to request hover information at a given text document position. The request's
 * parameter is of type [TextDocumentPosition](#TextDocumentPosition) the response is of
 * type [Hover](#Hover) or a Thenable that resolves to such.
 */
var HoverRequest;
(function (HoverRequest) {
    HoverRequest.method = 'textDocument/hover';
    HoverRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    HoverRequest.type = new messages_1.ProtocolRequestType(HoverRequest.method);
})(HoverRequest = exports.HoverRequest || (exports.HoverRequest = {}));
/**
 * How a signature help was triggered.
 *
 * @since 3.15.0
 */
var SignatureHelpTriggerKind;
(function (SignatureHelpTriggerKind) {
    /**
     * Signature help was invoked manually by the user or by a command.
     */
    SignatureHelpTriggerKind.Invoked = 1;
    /**
     * Signature help was triggered by a trigger character.
     */
    SignatureHelpTriggerKind.TriggerCharacter = 2;
    /**
     * Signature help was triggered by the cursor moving or by the document content changing.
     */
    SignatureHelpTriggerKind.ContentChange = 3;
})(SignatureHelpTriggerKind = exports.SignatureHelpTriggerKind || (exports.SignatureHelpTriggerKind = {}));
var SignatureHelpRequest;
(function (SignatureHelpRequest) {
    SignatureHelpRequest.method = 'textDocument/signatureHelp';
    SignatureHelpRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SignatureHelpRequest.type = new messages_1.ProtocolRequestType(SignatureHelpRequest.method);
})(SignatureHelpRequest = exports.SignatureHelpRequest || (exports.SignatureHelpRequest = {}));
/**
 * A request to resolve the definition location of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPosition]
 * (#TextDocumentPosition) the response is of either type [Definition](#Definition)
 * or a typed array of [DefinitionLink](#DefinitionLink) or a Thenable that resolves
 * to such.
 */
var DefinitionRequest;
(function (DefinitionRequest) {
    DefinitionRequest.method = 'textDocument/definition';
    DefinitionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DefinitionRequest.type = new messages_1.ProtocolRequestType(DefinitionRequest.method);
})(DefinitionRequest = exports.DefinitionRequest || (exports.DefinitionRequest = {}));
/**
 * A request to resolve project-wide references for the symbol denoted
 * by the given text document position. The request's parameter is of
 * type [ReferenceParams](#ReferenceParams) the response is of type
 * [Location[]](#Location) or a Thenable that resolves to such.
 */
var ReferencesRequest;
(function (ReferencesRequest) {
    ReferencesRequest.method = 'textDocument/references';
    ReferencesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ReferencesRequest.type = new messages_1.ProtocolRequestType(ReferencesRequest.method);
})(ReferencesRequest = exports.ReferencesRequest || (exports.ReferencesRequest = {}));
/**
 * Request to resolve a [DocumentHighlight](#DocumentHighlight) for a given
 * text document position. The request's parameter is of type [TextDocumentPosition]
 * (#TextDocumentPosition) the request response is of type [DocumentHighlight[]]
 * (#DocumentHighlight) or a Thenable that resolves to such.
 */
var DocumentHighlightRequest;
(function (DocumentHighlightRequest) {
    DocumentHighlightRequest.method = 'textDocument/documentHighlight';
    DocumentHighlightRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentHighlightRequest.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest.method);
})(DocumentHighlightRequest = exports.DocumentHighlightRequest || (exports.DocumentHighlightRequest = {}));
/**
 * A request to list all symbols found in a given text document. The request's
 * parameter is of type [TextDocumentIdentifier](#TextDocumentIdentifier) the
 * response is of type [SymbolInformation[]](#SymbolInformation) or a Thenable
 * that resolves to such.
 */
var DocumentSymbolRequest;
(function (DocumentSymbolRequest) {
    DocumentSymbolRequest.method = 'textDocument/documentSymbol';
    DocumentSymbolRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentSymbolRequest.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest.method);
})(DocumentSymbolRequest = exports.DocumentSymbolRequest || (exports.DocumentSymbolRequest = {}));
/**
 * A request to provide commands for the given text document and range.
 */
var CodeActionRequest;
(function (CodeActionRequest) {
    CodeActionRequest.method = 'textDocument/codeAction';
    CodeActionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeActionRequest.type = new messages_1.ProtocolRequestType(CodeActionRequest.method);
})(CodeActionRequest = exports.CodeActionRequest || (exports.CodeActionRequest = {}));
/**
 * Request to resolve additional information for a given code action.The request's
 * parameter is of type [CodeAction](#CodeAction) the response
 * is of type [CodeAction](#CodeAction) or a Thenable that resolves to such.
 */
var CodeActionResolveRequest;
(function (CodeActionResolveRequest) {
    CodeActionResolveRequest.method = 'codeAction/resolve';
    CodeActionResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeActionResolveRequest.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest.method);
})(CodeActionResolveRequest = exports.CodeActionResolveRequest || (exports.CodeActionResolveRequest = {}));
/**
 * A request to list project-wide symbols matching the query string given
 * by the [WorkspaceSymbolParams](#WorkspaceSymbolParams). The response is
 * of type [SymbolInformation[]](#SymbolInformation) or a Thenable that
 * resolves to such.
 *
 * @since 3.17.0 - support for WorkspaceSymbol in the returned data. Clients
 *  need to advertise support for WorkspaceSymbols via the client capability
 *  `workspace.symbol.resolveSupport`.
 *
 */
var WorkspaceSymbolRequest;
(function (WorkspaceSymbolRequest) {
    WorkspaceSymbolRequest.method = 'workspace/symbol';
    WorkspaceSymbolRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkspaceSymbolRequest.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest.method);
})(WorkspaceSymbolRequest = exports.WorkspaceSymbolRequest || (exports.WorkspaceSymbolRequest = {}));
/**
 * A request to resolve the range inside the workspace
 * symbol's location.
 *
 * @since 3.17.0
 */
var WorkspaceSymbolResolveRequest;
(function (WorkspaceSymbolResolveRequest) {
    WorkspaceSymbolResolveRequest.method = 'workspaceSymbol/resolve';
    WorkspaceSymbolResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkspaceSymbolResolveRequest.type = new messages_1.ProtocolRequestType(WorkspaceSymbolResolveRequest.method);
})(WorkspaceSymbolResolveRequest = exports.WorkspaceSymbolResolveRequest || (exports.WorkspaceSymbolResolveRequest = {}));
/**
 * A request to provide code lens for the given text document.
 */
var CodeLensRequest;
(function (CodeLensRequest) {
    CodeLensRequest.method = 'textDocument/codeLens';
    CodeLensRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeLensRequest.type = new messages_1.ProtocolRequestType(CodeLensRequest.method);
})(CodeLensRequest = exports.CodeLensRequest || (exports.CodeLensRequest = {}));
/**
 * A request to resolve a command for a given code lens.
 */
var CodeLensResolveRequest;
(function (CodeLensResolveRequest) {
    CodeLensResolveRequest.method = 'codeLens/resolve';
    CodeLensResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CodeLensResolveRequest.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest.method);
})(CodeLensResolveRequest = exports.CodeLensResolveRequest || (exports.CodeLensResolveRequest = {}));
/**
 * A request to refresh all code actions
 *
 * @since 3.16.0
 */
var CodeLensRefreshRequest;
(function (CodeLensRefreshRequest) {
    CodeLensRefreshRequest.method = `workspace/codeLens/refresh`;
    CodeLensRefreshRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    CodeLensRefreshRequest.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest.method);
})(CodeLensRefreshRequest = exports.CodeLensRefreshRequest || (exports.CodeLensRefreshRequest = {}));
/**
 * A request to provide document links
 */
var DocumentLinkRequest;
(function (DocumentLinkRequest) {
    DocumentLinkRequest.method = 'textDocument/documentLink';
    DocumentLinkRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentLinkRequest.type = new messages_1.ProtocolRequestType(DocumentLinkRequest.method);
})(DocumentLinkRequest = exports.DocumentLinkRequest || (exports.DocumentLinkRequest = {}));
/**
 * Request to resolve additional information for a given document link. The request's
 * parameter is of type [DocumentLink](#DocumentLink) the response
 * is of type [DocumentLink](#DocumentLink) or a Thenable that resolves to such.
 */
var DocumentLinkResolveRequest;
(function (DocumentLinkResolveRequest) {
    DocumentLinkResolveRequest.method = 'documentLink/resolve';
    DocumentLinkResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentLinkResolveRequest.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest.method);
})(DocumentLinkResolveRequest = exports.DocumentLinkResolveRequest || (exports.DocumentLinkResolveRequest = {}));
/**
 * A request to to format a whole document.
 */
var DocumentFormattingRequest;
(function (DocumentFormattingRequest) {
    DocumentFormattingRequest.method = 'textDocument/formatting';
    DocumentFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest.method);
})(DocumentFormattingRequest = exports.DocumentFormattingRequest || (exports.DocumentFormattingRequest = {}));
/**
 * A request to to format a range in a document.
 */
var DocumentRangeFormattingRequest;
(function (DocumentRangeFormattingRequest) {
    DocumentRangeFormattingRequest.method = 'textDocument/rangeFormatting';
    DocumentRangeFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentRangeFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest.method);
})(DocumentRangeFormattingRequest = exports.DocumentRangeFormattingRequest || (exports.DocumentRangeFormattingRequest = {}));
/**
 * A request to format a document on type.
 */
var DocumentOnTypeFormattingRequest;
(function (DocumentOnTypeFormattingRequest) {
    DocumentOnTypeFormattingRequest.method = 'textDocument/onTypeFormatting';
    DocumentOnTypeFormattingRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentOnTypeFormattingRequest.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest.method);
})(DocumentOnTypeFormattingRequest = exports.DocumentOnTypeFormattingRequest || (exports.DocumentOnTypeFormattingRequest = {}));
//---- Rename ----------------------------------------------
var PrepareSupportDefaultBehavior;
(function (PrepareSupportDefaultBehavior) {
    /**
     * The client's default behavior is to select the identifier
     * according the to language's syntax rule.
     */
    PrepareSupportDefaultBehavior.Identifier = 1;
})(PrepareSupportDefaultBehavior = exports.PrepareSupportDefaultBehavior || (exports.PrepareSupportDefaultBehavior = {}));
/**
 * A request to rename a symbol.
 */
var RenameRequest;
(function (RenameRequest) {
    RenameRequest.method = 'textDocument/rename';
    RenameRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    RenameRequest.type = new messages_1.ProtocolRequestType(RenameRequest.method);
})(RenameRequest = exports.RenameRequest || (exports.RenameRequest = {}));
/**
 * A request to test and perform the setup necessary for a rename.
 *
 * @since 3.16 - support for default behavior
 */
var PrepareRenameRequest;
(function (PrepareRenameRequest) {
    PrepareRenameRequest.method = 'textDocument/prepareRename';
    PrepareRenameRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    PrepareRenameRequest.type = new messages_1.ProtocolRequestType(PrepareRenameRequest.method);
})(PrepareRenameRequest = exports.PrepareRenameRequest || (exports.PrepareRenameRequest = {}));
/**
 * A request send from the client to the server to execute a command. The request might return
 * a workspace edit which the client will apply to the workspace.
 */
var ExecuteCommandRequest;
(function (ExecuteCommandRequest) {
    ExecuteCommandRequest.method = 'workspace/executeCommand';
    ExecuteCommandRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ExecuteCommandRequest.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest.method);
})(ExecuteCommandRequest = exports.ExecuteCommandRequest || (exports.ExecuteCommandRequest = {}));
/**
 * A request sent from the server to the client to modified certain resources.
 */
var ApplyWorkspaceEditRequest;
(function (ApplyWorkspaceEditRequest) {
    ApplyWorkspaceEditRequest.method = 'workspace/applyEdit';
    ApplyWorkspaceEditRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    ApplyWorkspaceEditRequest.type = new messages_1.ProtocolRequestType('workspace/applyEdit');
})(ApplyWorkspaceEditRequest = exports.ApplyWorkspaceEditRequest || (exports.ApplyWorkspaceEditRequest = {}));
//# sourceMappingURL=protocol.js.map

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.objectLiteral = exports.typedArray = exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = void 0;
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.string = string;
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
exports.number = number;
function error(value) {
    return value instanceof Error;
}
exports.error = error;
function func(value) {
    return typeof value === 'function';
}
exports.func = func;
function array(value) {
    return Array.isArray(value);
}
exports.array = array;
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
exports.stringArray = stringArray;
function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
}
exports.typedArray = typedArray;
function objectLiteral(value) {
    // Strictly speaking class instances pass this check as well. Since the LSP
    // doesn't use classes we ignore this for now. If we do we need to add something
    // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
    return value !== null && typeof value === 'object';
}
exports.objectLiteral = objectLiteral;
//# sourceMappingURL=is.js.map

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImplementationRequest = void 0;
const messages_1 = __webpack_require__(26);
// @ts-ignore: to avoid inlining LocationLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the implementation locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositionParams]
 * (#TextDocumentPositionParams) the response is of type [Definition](#Definition) or a
 * Thenable that resolves to such.
 */
var ImplementationRequest;
(function (ImplementationRequest) {
    ImplementationRequest.method = 'textDocument/implementation';
    ImplementationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ImplementationRequest.type = new messages_1.ProtocolRequestType(ImplementationRequest.method);
})(ImplementationRequest = exports.ImplementationRequest || (exports.ImplementationRequest = {}));
//# sourceMappingURL=protocol.implementation.js.map

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeDefinitionRequest = void 0;
const messages_1 = __webpack_require__(26);
// @ts-ignore: to avoid inlining LocatioLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the type definition locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositioParams]
 * (#TextDocumentPositionParams) the response is of type [Definition](#Definition) or a
 * Thenable that resolves to such.
 */
var TypeDefinitionRequest;
(function (TypeDefinitionRequest) {
    TypeDefinitionRequest.method = 'textDocument/typeDefinition';
    TypeDefinitionRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeDefinitionRequest.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest.method);
})(TypeDefinitionRequest = exports.TypeDefinitionRequest || (exports.TypeDefinitionRequest = {}));
//# sourceMappingURL=protocol.typeDefinition.js.map

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = void 0;
const messages_1 = __webpack_require__(26);
/**
 * The `workspace/workspaceFolders` is sent from the server to the client to fetch the open workspace folders.
 */
var WorkspaceFoldersRequest;
(function (WorkspaceFoldersRequest) {
    WorkspaceFoldersRequest.method = 'workspace/workspaceFolders';
    WorkspaceFoldersRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    WorkspaceFoldersRequest.type = new messages_1.ProtocolRequestType0(WorkspaceFoldersRequest.method);
})(WorkspaceFoldersRequest = exports.WorkspaceFoldersRequest || (exports.WorkspaceFoldersRequest = {}));
/**
 * The `workspace/didChangeWorkspaceFolders` notification is sent from the client to the server when the workspace
 * folder configuration changes.
 */
var DidChangeWorkspaceFoldersNotification;
(function (DidChangeWorkspaceFoldersNotification) {
    DidChangeWorkspaceFoldersNotification.method = 'workspace/didChangeWorkspaceFolders';
    DidChangeWorkspaceFoldersNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeWorkspaceFoldersNotification.type = new messages_1.ProtocolNotificationType(DidChangeWorkspaceFoldersNotification.method);
})(DidChangeWorkspaceFoldersNotification = exports.DidChangeWorkspaceFoldersNotification || (exports.DidChangeWorkspaceFoldersNotification = {}));
//# sourceMappingURL=protocol.workspaceFolder.js.map

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationRequest = void 0;
const messages_1 = __webpack_require__(26);
//---- Get Configuration request ----
/**
 * The 'workspace/configuration' request is sent from the server to the client to fetch a certain
 * configuration setting.
 *
 * This pull model replaces the old push model were the client signaled configuration change via an
 * event. If the server still needs to react to configuration changes (since the server caches the
 * result of `workspace/configuration` requests) the server should register for an empty configuration
 * change event and empty the cache if such an event is received.
 */
var ConfigurationRequest;
(function (ConfigurationRequest) {
    ConfigurationRequest.method = 'workspace/configuration';
    ConfigurationRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    ConfigurationRequest.type = new messages_1.ProtocolRequestType(ConfigurationRequest.method);
})(ConfigurationRequest = exports.ConfigurationRequest || (exports.ConfigurationRequest = {}));
//# sourceMappingURL=protocol.configuration.js.map

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorPresentationRequest = exports.DocumentColorRequest = void 0;
const messages_1 = __webpack_require__(26);
/**
 * A request to list all color symbols found in a given text document. The request's
 * parameter is of type [DocumentColorParams](#DocumentColorParams) the
 * response is of type [ColorInformation[]](#ColorInformation) or a Thenable
 * that resolves to such.
 */
var DocumentColorRequest;
(function (DocumentColorRequest) {
    DocumentColorRequest.method = 'textDocument/documentColor';
    DocumentColorRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentColorRequest.type = new messages_1.ProtocolRequestType(DocumentColorRequest.method);
})(DocumentColorRequest = exports.DocumentColorRequest || (exports.DocumentColorRequest = {}));
/**
 * A request to list all presentation for a color. The request's
 * parameter is of type [ColorPresentationParams](#ColorPresentationParams) the
 * response is of type [ColorInformation[]](#ColorInformation) or a Thenable
 * that resolves to such.
 */
var ColorPresentationRequest;
(function (ColorPresentationRequest) {
    ColorPresentationRequest.method = 'textDocument/colorPresentation';
    ColorPresentationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    ColorPresentationRequest.type = new messages_1.ProtocolRequestType(ColorPresentationRequest.method);
})(ColorPresentationRequest = exports.ColorPresentationRequest || (exports.ColorPresentationRequest = {}));
//# sourceMappingURL=protocol.colorProvider.js.map

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FoldingRangeRequest = void 0;
const messages_1 = __webpack_require__(26);
/**
 * A request to provide folding ranges in a document. The request's
 * parameter is of type [FoldingRangeParams](#FoldingRangeParams), the
 * response is of type [FoldingRangeList](#FoldingRangeList) or a Thenable
 * that resolves to such.
 */
var FoldingRangeRequest;
(function (FoldingRangeRequest) {
    FoldingRangeRequest.method = 'textDocument/foldingRange';
    FoldingRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    FoldingRangeRequest.type = new messages_1.ProtocolRequestType(FoldingRangeRequest.method);
})(FoldingRangeRequest = exports.FoldingRangeRequest || (exports.FoldingRangeRequest = {}));
//# sourceMappingURL=protocol.foldingRange.js.map

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeclarationRequest = void 0;
const messages_1 = __webpack_require__(26);
// @ts-ignore: to avoid inlining LocationLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the type definition locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositionParams]
 * (#TextDocumentPositionParams) the response is of type [Declaration](#Declaration)
 * or a typed array of [DeclarationLink](#DeclarationLink) or a Thenable that resolves
 * to such.
 */
var DeclarationRequest;
(function (DeclarationRequest) {
    DeclarationRequest.method = 'textDocument/declaration';
    DeclarationRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DeclarationRequest.type = new messages_1.ProtocolRequestType(DeclarationRequest.method);
})(DeclarationRequest = exports.DeclarationRequest || (exports.DeclarationRequest = {}));
//# sourceMappingURL=protocol.declaration.js.map

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectionRangeRequest = void 0;
const messages_1 = __webpack_require__(26);
/**
 * A request to provide selection ranges in a document. The request's
 * parameter is of type [SelectionRangeParams](#SelectionRangeParams), the
 * response is of type [SelectionRange[]](#SelectionRange[]) or a Thenable
 * that resolves to such.
 */
var SelectionRangeRequest;
(function (SelectionRangeRequest) {
    SelectionRangeRequest.method = 'textDocument/selectionRange';
    SelectionRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SelectionRangeRequest.type = new messages_1.ProtocolRequestType(SelectionRangeRequest.method);
})(SelectionRangeRequest = exports.SelectionRangeRequest || (exports.SelectionRangeRequest = {}));
//# sourceMappingURL=protocol.selectionRange.js.map

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = void 0;
const vscode_jsonrpc_1 = __webpack_require__(9);
const messages_1 = __webpack_require__(26);
var WorkDoneProgress;
(function (WorkDoneProgress) {
    WorkDoneProgress.type = new vscode_jsonrpc_1.ProgressType();
    function is(value) {
        return value === WorkDoneProgress.type;
    }
    WorkDoneProgress.is = is;
})(WorkDoneProgress = exports.WorkDoneProgress || (exports.WorkDoneProgress = {}));
/**
 * The `window/workDoneProgress/create` request is sent from the server to the client to initiate progress
 * reporting from the server.
 */
var WorkDoneProgressCreateRequest;
(function (WorkDoneProgressCreateRequest) {
    WorkDoneProgressCreateRequest.method = 'window/workDoneProgress/create';
    WorkDoneProgressCreateRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    WorkDoneProgressCreateRequest.type = new messages_1.ProtocolRequestType(WorkDoneProgressCreateRequest.method);
})(WorkDoneProgressCreateRequest = exports.WorkDoneProgressCreateRequest || (exports.WorkDoneProgressCreateRequest = {}));
/**
 * The `window/workDoneProgress/cancel` notification is sent from  the client to the server to cancel a progress
 * initiated on the server side.
 */
var WorkDoneProgressCancelNotification;
(function (WorkDoneProgressCancelNotification) {
    WorkDoneProgressCancelNotification.method = 'window/workDoneProgress/cancel';
    WorkDoneProgressCancelNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkDoneProgressCancelNotification.type = new messages_1.ProtocolNotificationType(WorkDoneProgressCancelNotification.method);
})(WorkDoneProgressCancelNotification = exports.WorkDoneProgressCancelNotification || (exports.WorkDoneProgressCancelNotification = {}));
//# sourceMappingURL=protocol.progress.js.map

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox, Microsoft and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.CallHierarchyPrepareRequest = void 0;
const messages_1 = __webpack_require__(26);
/**
 * A request to result a `CallHierarchyItem` in a document at a given position.
 * Can be used as an input to an incoming or outgoing call hierarchy.
 *
 * @since 3.16.0
 */
var CallHierarchyPrepareRequest;
(function (CallHierarchyPrepareRequest) {
    CallHierarchyPrepareRequest.method = 'textDocument/prepareCallHierarchy';
    CallHierarchyPrepareRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CallHierarchyPrepareRequest.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest.method);
})(CallHierarchyPrepareRequest = exports.CallHierarchyPrepareRequest || (exports.CallHierarchyPrepareRequest = {}));
/**
 * A request to resolve the incoming calls for a given `CallHierarchyItem`.
 *
 * @since 3.16.0
 */
var CallHierarchyIncomingCallsRequest;
(function (CallHierarchyIncomingCallsRequest) {
    CallHierarchyIncomingCallsRequest.method = 'callHierarchy/incomingCalls';
    CallHierarchyIncomingCallsRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CallHierarchyIncomingCallsRequest.type = new messages_1.ProtocolRequestType(CallHierarchyIncomingCallsRequest.method);
})(CallHierarchyIncomingCallsRequest = exports.CallHierarchyIncomingCallsRequest || (exports.CallHierarchyIncomingCallsRequest = {}));
/**
 * A request to resolve the outgoing calls for a given `CallHierarchyItem`.
 *
 * @since 3.16.0
 */
var CallHierarchyOutgoingCallsRequest;
(function (CallHierarchyOutgoingCallsRequest) {
    CallHierarchyOutgoingCallsRequest.method = 'callHierarchy/outgoingCalls';
    CallHierarchyOutgoingCallsRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    CallHierarchyOutgoingCallsRequest.type = new messages_1.ProtocolRequestType(CallHierarchyOutgoingCallsRequest.method);
})(CallHierarchyOutgoingCallsRequest = exports.CallHierarchyOutgoingCallsRequest || (exports.CallHierarchyOutgoingCallsRequest = {}));
//# sourceMappingURL=protocol.callHierarchy.js.map

/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.SemanticTokensRegistrationType = exports.TokenFormat = void 0;
const messages_1 = __webpack_require__(26);
//------- 'textDocument/semanticTokens' -----
var TokenFormat;
(function (TokenFormat) {
    TokenFormat.Relative = 'relative';
})(TokenFormat = exports.TokenFormat || (exports.TokenFormat = {}));
var SemanticTokensRegistrationType;
(function (SemanticTokensRegistrationType) {
    SemanticTokensRegistrationType.method = 'textDocument/semanticTokens';
    SemanticTokensRegistrationType.type = new messages_1.RegistrationType(SemanticTokensRegistrationType.method);
})(SemanticTokensRegistrationType = exports.SemanticTokensRegistrationType || (exports.SemanticTokensRegistrationType = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensRequest;
(function (SemanticTokensRequest) {
    SemanticTokensRequest.method = 'textDocument/semanticTokens/full';
    SemanticTokensRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRequest.method);
    SemanticTokensRequest.registrationMethod = SemanticTokensRegistrationType.method;
})(SemanticTokensRequest = exports.SemanticTokensRequest || (exports.SemanticTokensRequest = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensDeltaRequest;
(function (SemanticTokensDeltaRequest) {
    SemanticTokensDeltaRequest.method = 'textDocument/semanticTokens/full/delta';
    SemanticTokensDeltaRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensDeltaRequest.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest.method);
    SemanticTokensDeltaRequest.registrationMethod = SemanticTokensRegistrationType.method;
})(SemanticTokensDeltaRequest = exports.SemanticTokensDeltaRequest || (exports.SemanticTokensDeltaRequest = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensRangeRequest;
(function (SemanticTokensRangeRequest) {
    SemanticTokensRangeRequest.method = 'textDocument/semanticTokens/range';
    SemanticTokensRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensRangeRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest.method);
    SemanticTokensRangeRequest.registrationMethod = SemanticTokensRegistrationType.method;
})(SemanticTokensRangeRequest = exports.SemanticTokensRangeRequest || (exports.SemanticTokensRangeRequest = {}));
/**
 * @since 3.16.0
 */
var SemanticTokensRefreshRequest;
(function (SemanticTokensRefreshRequest) {
    SemanticTokensRefreshRequest.method = `workspace/semanticTokens/refresh`;
    SemanticTokensRefreshRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    SemanticTokensRefreshRequest.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest.method);
})(SemanticTokensRefreshRequest = exports.SemanticTokensRefreshRequest || (exports.SemanticTokensRefreshRequest = {}));
//# sourceMappingURL=protocol.semanticTokens.js.map

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShowDocumentRequest = void 0;
const messages_1 = __webpack_require__(26);
/**
 * A request to show a document. This request might open an
 * external program depending on the value of the URI to open.
 * For example a request to open `https://code.visualstudio.com/`
 * will very likely open the URI in a WEB browser.
 *
 * @since 3.16.0
*/
var ShowDocumentRequest;
(function (ShowDocumentRequest) {
    ShowDocumentRequest.method = 'window/showDocument';
    ShowDocumentRequest.messageDirection = messages_1.MessageDirection.serverToClient;
    ShowDocumentRequest.type = new messages_1.ProtocolRequestType(ShowDocumentRequest.method);
})(ShowDocumentRequest = exports.ShowDocumentRequest || (exports.ShowDocumentRequest = {}));
//# sourceMappingURL=protocol.showDocument.js.map

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinkedEditingRangeRequest = void 0;
const messages_1 = __webpack_require__(26);
/**
 * A request to provide ranges that can be edited together.
 *
 * @since 3.16.0
 */
var LinkedEditingRangeRequest;
(function (LinkedEditingRangeRequest) {
    LinkedEditingRangeRequest.method = 'textDocument/linkedEditingRange';
    LinkedEditingRangeRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    LinkedEditingRangeRequest.type = new messages_1.ProtocolRequestType(LinkedEditingRangeRequest.method);
})(LinkedEditingRangeRequest = exports.LinkedEditingRangeRequest || (exports.LinkedEditingRangeRequest = {}));
//# sourceMappingURL=protocol.linkedEditingRange.js.map

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.DidRenameFilesNotification = exports.WillRenameFilesRequest = exports.DidCreateFilesNotification = exports.WillCreateFilesRequest = exports.FileOperationPatternKind = void 0;
const messages_1 = __webpack_require__(26);
/**
 * A pattern kind describing if a glob pattern matches a file a folder or
 * both.
 *
 * @since 3.16.0
 */
var FileOperationPatternKind;
(function (FileOperationPatternKind) {
    /**
     * The pattern matches a file only.
     */
    FileOperationPatternKind.file = 'file';
    /**
     * The pattern matches a folder only.
     */
    FileOperationPatternKind.folder = 'folder';
})(FileOperationPatternKind = exports.FileOperationPatternKind || (exports.FileOperationPatternKind = {}));
/**
 * The will create files request is sent from the client to the server before files are actually
 * created as long as the creation is triggered from within the client.
 *
 * @since 3.16.0
 */
var WillCreateFilesRequest;
(function (WillCreateFilesRequest) {
    WillCreateFilesRequest.method = 'workspace/willCreateFiles';
    WillCreateFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WillCreateFilesRequest.type = new messages_1.ProtocolRequestType(WillCreateFilesRequest.method);
})(WillCreateFilesRequest = exports.WillCreateFilesRequest || (exports.WillCreateFilesRequest = {}));
/**
 * The did create files notification is sent from the client to the server when
 * files were created from within the client.
 *
 * @since 3.16.0
 */
var DidCreateFilesNotification;
(function (DidCreateFilesNotification) {
    DidCreateFilesNotification.method = 'workspace/didCreateFiles';
    DidCreateFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidCreateFilesNotification.type = new messages_1.ProtocolNotificationType(DidCreateFilesNotification.method);
})(DidCreateFilesNotification = exports.DidCreateFilesNotification || (exports.DidCreateFilesNotification = {}));
/**
 * The will rename files request is sent from the client to the server before files are actually
 * renamed as long as the rename is triggered from within the client.
 *
 * @since 3.16.0
 */
var WillRenameFilesRequest;
(function (WillRenameFilesRequest) {
    WillRenameFilesRequest.method = 'workspace/willRenameFiles';
    WillRenameFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WillRenameFilesRequest.type = new messages_1.ProtocolRequestType(WillRenameFilesRequest.method);
})(WillRenameFilesRequest = exports.WillRenameFilesRequest || (exports.WillRenameFilesRequest = {}));
/**
 * The did rename files notification is sent from the client to the server when
 * files were renamed from within the client.
 *
 * @since 3.16.0
 */
var DidRenameFilesNotification;
(function (DidRenameFilesNotification) {
    DidRenameFilesNotification.method = 'workspace/didRenameFiles';
    DidRenameFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidRenameFilesNotification.type = new messages_1.ProtocolNotificationType(DidRenameFilesNotification.method);
})(DidRenameFilesNotification = exports.DidRenameFilesNotification || (exports.DidRenameFilesNotification = {}));
/**
 * The will delete files request is sent from the client to the server before files are actually
 * deleted as long as the deletion is triggered from within the client.
 *
 * @since 3.16.0
 */
var DidDeleteFilesNotification;
(function (DidDeleteFilesNotification) {
    DidDeleteFilesNotification.method = 'workspace/didDeleteFiles';
    DidDeleteFilesNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidDeleteFilesNotification.type = new messages_1.ProtocolNotificationType(DidDeleteFilesNotification.method);
})(DidDeleteFilesNotification = exports.DidDeleteFilesNotification || (exports.DidDeleteFilesNotification = {}));
/**
 * The did delete files notification is sent from the client to the server when
 * files were deleted from within the client.
 *
 * @since 3.16.0
 */
var WillDeleteFilesRequest;
(function (WillDeleteFilesRequest) {
    WillDeleteFilesRequest.method = 'workspace/willDeleteFiles';
    WillDeleteFilesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WillDeleteFilesRequest.type = new messages_1.ProtocolRequestType(WillDeleteFilesRequest.method);
})(WillDeleteFilesRequest = exports.WillDeleteFilesRequest || (exports.WillDeleteFilesRequest = {}));
//# sourceMappingURL=protocol.fileOperations.js.map

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = void 0;
const messages_1 = __webpack_require__(26);
/**
 * Moniker uniqueness level to define scope of the moniker.
 *
 * @since 3.16.0
 */
var UniquenessLevel;
(function (UniquenessLevel) {
    /**
     * The moniker is only unique inside a document
     */
    UniquenessLevel.document = 'document';
    /**
     * The moniker is unique inside a project for which a dump got created
     */
    UniquenessLevel.project = 'project';
    /**
     * The moniker is unique inside the group to which a project belongs
     */
    UniquenessLevel.group = 'group';
    /**
     * The moniker is unique inside the moniker scheme.
     */
    UniquenessLevel.scheme = 'scheme';
    /**
     * The moniker is globally unique
     */
    UniquenessLevel.global = 'global';
})(UniquenessLevel = exports.UniquenessLevel || (exports.UniquenessLevel = {}));
/**
 * The moniker kind.
 *
 * @since 3.16.0
 */
var MonikerKind;
(function (MonikerKind) {
    /**
     * The moniker represent a symbol that is imported into a project
     */
    MonikerKind.$import = 'import';
    /**
     * The moniker represents a symbol that is exported from a project
     */
    MonikerKind.$export = 'export';
    /**
     * The moniker represents a symbol that is local to a project (e.g. a local
     * variable of a function, a class not visible outside the project, ...)
     */
    MonikerKind.local = 'local';
})(MonikerKind = exports.MonikerKind || (exports.MonikerKind = {}));
/**
 * A request to get the moniker of a symbol at a given text document position.
 * The request parameter is of type [TextDocumentPositionParams](#TextDocumentPositionParams).
 * The response is of type [Moniker[]](#Moniker[]) or `null`.
 */
var MonikerRequest;
(function (MonikerRequest) {
    MonikerRequest.method = 'textDocument/moniker';
    MonikerRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    MonikerRequest.type = new messages_1.ProtocolRequestType(MonikerRequest.method);
})(MonikerRequest = exports.MonikerRequest || (exports.MonikerRequest = {}));
//# sourceMappingURL=protocol.moniker.js.map

/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox, Microsoft and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeHierarchySubtypesRequest = exports.TypeHierarchySupertypesRequest = exports.TypeHierarchyPrepareRequest = void 0;
const messages_1 = __webpack_require__(26);
/**
 * A request to result a `TypeHierarchyItem` in a document at a given position.
 * Can be used as an input to a subtypes or supertypes type hierarchy.
 *
 * @since 3.17.0
 */
var TypeHierarchyPrepareRequest;
(function (TypeHierarchyPrepareRequest) {
    TypeHierarchyPrepareRequest.method = 'textDocument/prepareTypeHierarchy';
    TypeHierarchyPrepareRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeHierarchyPrepareRequest.type = new messages_1.ProtocolRequestType(TypeHierarchyPrepareRequest.method);
})(TypeHierarchyPrepareRequest = exports.TypeHierarchyPrepareRequest || (exports.TypeHierarchyPrepareRequest = {}));
/**
 * A request to resolve the supertypes for a given `TypeHierarchyItem`.
 *
 * @since 3.17.0
 */
var TypeHierarchySupertypesRequest;
(function (TypeHierarchySupertypesRequest) {
    TypeHierarchySupertypesRequest.method = 'typeHierarchy/supertypes';
    TypeHierarchySupertypesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeHierarchySupertypesRequest.type = new messages_1.ProtocolRequestType(TypeHierarchySupertypesRequest.method);
})(TypeHierarchySupertypesRequest = exports.TypeHierarchySupertypesRequest || (exports.TypeHierarchySupertypesRequest = {}));
/**
 * A request to resolve the subtypes for a given `TypeHierarchyItem`.
 *
 * @since 3.17.0
 */
var TypeHierarchySubtypesRequest;
(function (TypeHierarchySubtypesRequest) {
    TypeHierarchySubtypesRequest.method = 'typeHierarchy/subtypes';
    TypeHierarchySubtypesRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    TypeHierarchySubtypesRequest.type = new messages_1.ProtocolRequestType(TypeHierarchySubtypesRequest.method);
})(TypeHierarchySubtypesRequest = exports.TypeHierarchySubtypesRequest || (exports.TypeHierarchySubtypesRequest = {}));
//# sourceMappingURL=protocol.typeHierarchy.js.map

/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InlineValueRefreshRequest = exports.InlineValueRequest = void 0;
const messages_1 = __webpack_require__(26);
/**
 * A request to provide inline values in a document. The request's parameter is of
 * type [InlineValueParams](#InlineValueParams), the response is of type
 * [InlineValue[]](#InlineValue[]) or a Thenable that resolves to such.
 *
 * @since 3.17.0
 */
var InlineValueRequest;
(function (InlineValueRequest) {
    InlineValueRequest.method = 'textDocument/inlineValue';
    InlineValueRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    InlineValueRequest.type = new messages_1.ProtocolRequestType(InlineValueRequest.method);
})(InlineValueRequest = exports.InlineValueRequest || (exports.InlineValueRequest = {}));
/**
 * @since 3.17.0
 */
var InlineValueRefreshRequest;
(function (InlineValueRefreshRequest) {
    InlineValueRefreshRequest.method = `workspace/inlineValue/refresh`;
    InlineValueRefreshRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    InlineValueRefreshRequest.type = new messages_1.ProtocolRequestType0(InlineValueRefreshRequest.method);
})(InlineValueRefreshRequest = exports.InlineValueRefreshRequest || (exports.InlineValueRefreshRequest = {}));
//# sourceMappingURL=protocol.inlineValue.js.map

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = void 0;
const messages_1 = __webpack_require__(26);
/**
 * A request to provide inlay hints in a document. The request's parameter is of
 * type [InlayHintsParams](#InlayHintsParams), the response is of type
 * [InlayHint[]](#InlayHint[]) or a Thenable that resolves to such.
 *
 * @since 3.17.0
 */
var InlayHintRequest;
(function (InlayHintRequest) {
    InlayHintRequest.method = 'textDocument/inlayHint';
    InlayHintRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    InlayHintRequest.type = new messages_1.ProtocolRequestType(InlayHintRequest.method);
})(InlayHintRequest = exports.InlayHintRequest || (exports.InlayHintRequest = {}));
/**
 * A request to resolve additional properties for an inlay hint.
 * The request's parameter is of type [InlayHint](#InlayHint), the response is
 * of type [InlayHint](#InlayHint) or a Thenable that resolves to such.
 *
 * @since 3.17.0
 */
var InlayHintResolveRequest;
(function (InlayHintResolveRequest) {
    InlayHintResolveRequest.method = 'inlayHint/resolve';
    InlayHintResolveRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    InlayHintResolveRequest.type = new messages_1.ProtocolRequestType(InlayHintResolveRequest.method);
})(InlayHintResolveRequest = exports.InlayHintResolveRequest || (exports.InlayHintResolveRequest = {}));
/**
 * @since 3.17.0
 */
var InlayHintRefreshRequest;
(function (InlayHintRefreshRequest) {
    InlayHintRefreshRequest.method = `workspace/inlayHint/refresh`;
    InlayHintRefreshRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    InlayHintRefreshRequest.type = new messages_1.ProtocolRequestType0(InlayHintRefreshRequest.method);
})(InlayHintRefreshRequest = exports.InlayHintRefreshRequest || (exports.InlayHintRefreshRequest = {}));
//# sourceMappingURL=protocol.inlayHint.js.map

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = void 0;
const vscode_jsonrpc_1 = __webpack_require__(9);
const Is = __webpack_require__(28);
const messages_1 = __webpack_require__(26);
/**
 * @since 3.17.0
 */
var DiagnosticServerCancellationData;
(function (DiagnosticServerCancellationData) {
    function is(value) {
        const candidate = value;
        return candidate && Is.boolean(candidate.retriggerRequest);
    }
    DiagnosticServerCancellationData.is = is;
})(DiagnosticServerCancellationData = exports.DiagnosticServerCancellationData || (exports.DiagnosticServerCancellationData = {}));
/**
 * The document diagnostic report kinds.
 *
 * @since 3.17.0
 */
var DocumentDiagnosticReportKind;
(function (DocumentDiagnosticReportKind) {
    /**
     * A diagnostic report with a full
     * set of problems.
     */
    DocumentDiagnosticReportKind.Full = 'full';
    /**
     * A report indicating that the last
     * returned report is still accurate.
     */
    DocumentDiagnosticReportKind.Unchanged = 'unchanged';
})(DocumentDiagnosticReportKind = exports.DocumentDiagnosticReportKind || (exports.DocumentDiagnosticReportKind = {}));
/**
 * The document diagnostic request definition.
 *
 * @since 3.17.0
 */
var DocumentDiagnosticRequest;
(function (DocumentDiagnosticRequest) {
    DocumentDiagnosticRequest.method = 'textDocument/diagnostic';
    DocumentDiagnosticRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DocumentDiagnosticRequest.type = new messages_1.ProtocolRequestType(DocumentDiagnosticRequest.method);
    DocumentDiagnosticRequest.partialResult = new vscode_jsonrpc_1.ProgressType();
})(DocumentDiagnosticRequest = exports.DocumentDiagnosticRequest || (exports.DocumentDiagnosticRequest = {}));
/**
 * The workspace diagnostic request definition.
 *
 * @since 3.17.0
 */
var WorkspaceDiagnosticRequest;
(function (WorkspaceDiagnosticRequest) {
    WorkspaceDiagnosticRequest.method = 'workspace/diagnostic';
    WorkspaceDiagnosticRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    WorkspaceDiagnosticRequest.type = new messages_1.ProtocolRequestType(WorkspaceDiagnosticRequest.method);
    WorkspaceDiagnosticRequest.partialResult = new vscode_jsonrpc_1.ProgressType();
})(WorkspaceDiagnosticRequest = exports.WorkspaceDiagnosticRequest || (exports.WorkspaceDiagnosticRequest = {}));
/**
 * The diagnostic refresh request definition.
 *
 * @since 3.17.0
 */
var DiagnosticRefreshRequest;
(function (DiagnosticRefreshRequest) {
    DiagnosticRefreshRequest.method = `workspace/diagnostic/refresh`;
    DiagnosticRefreshRequest.messageDirection = messages_1.MessageDirection.clientToServer;
    DiagnosticRefreshRequest.type = new messages_1.ProtocolRequestType0(DiagnosticRefreshRequest.method);
})(DiagnosticRefreshRequest = exports.DiagnosticRefreshRequest || (exports.DiagnosticRefreshRequest = {}));
//# sourceMappingURL=protocol.diagnostic.js.map

/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = void 0;
const vscode_languageserver_types_1 = __webpack_require__(25);
const Is = __webpack_require__(28);
const messages_1 = __webpack_require__(26);
/**
 * A notebook cell kind.
 *
 * @since 3.17.0
 */
var NotebookCellKind;
(function (NotebookCellKind) {
    /**
     * A markup-cell is formatted source that is used for display.
     */
    NotebookCellKind.Markup = 1;
    /**
     * A code-cell is source code.
     */
    NotebookCellKind.Code = 2;
    function is(value) {
        return value === 1 || value === 2;
    }
    NotebookCellKind.is = is;
})(NotebookCellKind = exports.NotebookCellKind || (exports.NotebookCellKind = {}));
var ExecutionSummary;
(function (ExecutionSummary) {
    function create(executionOrder, success) {
        const result = { executionOrder };
        if (success === true || success === false) {
            result.success = success;
        }
        return result;
    }
    ExecutionSummary.create = create;
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.executionOrder) && (candidate.success === undefined || Is.boolean(candidate.success));
    }
    ExecutionSummary.is = is;
    function equals(one, other) {
        if (one === other) {
            return true;
        }
        if (one === null || one === undefined || other === null || other === undefined) {
            return false;
        }
        return one.executionOrder === other.executionOrder && one.success === other.success;
    }
    ExecutionSummary.equals = equals;
})(ExecutionSummary = exports.ExecutionSummary || (exports.ExecutionSummary = {}));
var NotebookCell;
(function (NotebookCell) {
    function create(kind, document) {
        return { kind, document };
    }
    NotebookCell.create = create;
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && NotebookCellKind.is(candidate.kind) && vscode_languageserver_types_1.DocumentUri.is(candidate.document) &&
            (candidate.metadata === undefined || Is.objectLiteral(candidate.metadata));
    }
    NotebookCell.is = is;
    function diff(one, two) {
        const result = new Set();
        if (one.document !== two.document) {
            result.add('document');
        }
        if (one.kind !== two.kind) {
            result.add('kind');
        }
        if (one.executionSummary !== two.executionSummary) {
            result.add('executionSummary');
        }
        if ((one.metadata !== undefined || two.metadata !== undefined) && !equalsMetadata(one.metadata, two.metadata)) {
            result.add('metadata');
        }
        if ((one.executionSummary !== undefined || two.executionSummary !== undefined) && !ExecutionSummary.equals(one.executionSummary, two.executionSummary)) {
            result.add('executionSummary');
        }
        return result;
    }
    NotebookCell.diff = diff;
    function equalsMetadata(one, other) {
        if (one === other) {
            return true;
        }
        if (one === null || one === undefined || other === null || other === undefined) {
            return false;
        }
        if (typeof one !== typeof other) {
            return false;
        }
        if (typeof one !== 'object') {
            return false;
        }
        const oneArray = Array.isArray(one);
        const otherArray = Array.isArray(other);
        if (oneArray !== otherArray) {
            return false;
        }
        if (oneArray && otherArray) {
            if (one.length !== other.length) {
                return false;
            }
            for (let i = 0; i < one.length; i++) {
                if (!equalsMetadata(one[i], other[i])) {
                    return false;
                }
            }
        }
        if (Is.objectLiteral(one) && Is.objectLiteral(other)) {
            const oneKeys = Object.keys(one);
            const otherKeys = Object.keys(other);
            if (oneKeys.length !== otherKeys.length) {
                return false;
            }
            oneKeys.sort();
            otherKeys.sort();
            if (!equalsMetadata(oneKeys, otherKeys)) {
                return false;
            }
            for (let i = 0; i < oneKeys.length; i++) {
                const prop = oneKeys[i];
                if (!equalsMetadata(one[prop], other[prop])) {
                    return false;
                }
            }
        }
        return true;
    }
})(NotebookCell = exports.NotebookCell || (exports.NotebookCell = {}));
var NotebookDocument;
(function (NotebookDocument) {
    function create(uri, notebookType, version, cells) {
        return { uri, notebookType, version, cells };
    }
    NotebookDocument.create = create;
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.uri) && vscode_languageserver_types_1.integer.is(candidate.version) && Is.typedArray(candidate.cells, NotebookCell.is);
    }
    NotebookDocument.is = is;
})(NotebookDocument = exports.NotebookDocument || (exports.NotebookDocument = {}));
var NotebookDocumentSyncRegistrationType;
(function (NotebookDocumentSyncRegistrationType) {
    NotebookDocumentSyncRegistrationType.method = 'notebookDocument/sync';
    NotebookDocumentSyncRegistrationType.messageDirection = messages_1.MessageDirection.clientToServer;
    NotebookDocumentSyncRegistrationType.type = new messages_1.RegistrationType(NotebookDocumentSyncRegistrationType.method);
})(NotebookDocumentSyncRegistrationType = exports.NotebookDocumentSyncRegistrationType || (exports.NotebookDocumentSyncRegistrationType = {}));
/**
 * A notification sent when a notebook opens.
 *
 * @since 3.17.0
 */
var DidOpenNotebookDocumentNotification;
(function (DidOpenNotebookDocumentNotification) {
    DidOpenNotebookDocumentNotification.method = 'notebookDocument/didOpen';
    DidOpenNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidOpenNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidOpenNotebookDocumentNotification.method);
    DidOpenNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
})(DidOpenNotebookDocumentNotification = exports.DidOpenNotebookDocumentNotification || (exports.DidOpenNotebookDocumentNotification = {}));
var NotebookCellArrayChange;
(function (NotebookCellArrayChange) {
    function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.start) && vscode_languageserver_types_1.uinteger.is(candidate.deleteCount) && (candidate.cells === undefined || Is.typedArray(candidate.cells, NotebookCell.is));
    }
    NotebookCellArrayChange.is = is;
    function create(start, deleteCount, cells) {
        const result = { start, deleteCount };
        if (cells !== undefined) {
            result.cells = cells;
        }
        return result;
    }
    NotebookCellArrayChange.create = create;
})(NotebookCellArrayChange = exports.NotebookCellArrayChange || (exports.NotebookCellArrayChange = {}));
var DidChangeNotebookDocumentNotification;
(function (DidChangeNotebookDocumentNotification) {
    DidChangeNotebookDocumentNotification.method = 'notebookDocument/didChange';
    DidChangeNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidChangeNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidChangeNotebookDocumentNotification.method);
    DidChangeNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
})(DidChangeNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification || (exports.DidChangeNotebookDocumentNotification = {}));
/**
 * A notification sent when a notebook document is saved.
 *
 * @since 3.17.0
 */
var DidSaveNotebookDocumentNotification;
(function (DidSaveNotebookDocumentNotification) {
    DidSaveNotebookDocumentNotification.method = 'notebookDocument/didSave';
    DidSaveNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidSaveNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidSaveNotebookDocumentNotification.method);
    DidSaveNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
})(DidSaveNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification || (exports.DidSaveNotebookDocumentNotification = {}));
/**
 * A notification sent when a notebook closes.
 *
 * @since 3.17.0
 */
var DidCloseNotebookDocumentNotification;
(function (DidCloseNotebookDocumentNotification) {
    DidCloseNotebookDocumentNotification.method = 'notebookDocument/didClose';
    DidCloseNotebookDocumentNotification.messageDirection = messages_1.MessageDirection.clientToServer;
    DidCloseNotebookDocumentNotification.type = new messages_1.ProtocolNotificationType(DidCloseNotebookDocumentNotification.method);
    DidCloseNotebookDocumentNotification.registrationMethod = NotebookDocumentSyncRegistrationType.method;
})(DidCloseNotebookDocumentNotification = exports.DidCloseNotebookDocumentNotification || (exports.DidCloseNotebookDocumentNotification = {}));
//# sourceMappingURL=protocol.notebook.js.map

/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createProtocolConnection = void 0;
const vscode_jsonrpc_1 = __webpack_require__(9);
function createProtocolConnection(input, output, logger, options) {
    if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
    }
    return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
}
exports.createProtocolConnection = createProtocolConnection;
//# sourceMappingURL=connection.js.map

/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextDocuments = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
/**
 * A manager for simple text documents. The manager requires at a minimum that
 * the server registered for the following text document sync events in the
 * initialize handler or via dynamic registration:
 *
 * - open and close events.
 * - change events.
 *
 * Registering for save and will save events is optional.
 */
class TextDocuments {
    /**
     * Create a new text document manager.
     */
    constructor(configuration) {
        this._configuration = configuration;
        this._syncedDocuments = new Map();
        this._onDidChangeContent = new vscode_languageserver_protocol_1.Emitter();
        this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
        this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
        this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
        this._onWillSave = new vscode_languageserver_protocol_1.Emitter();
    }
    /**
     * An event that fires when a text document managed by this manager
     * has been opened.
     */
    get onDidOpen() {
        return this._onDidOpen.event;
    }
    /**
     * An event that fires when a text document managed by this manager
     * has been opened or the content changes.
     */
    get onDidChangeContent() {
        return this._onDidChangeContent.event;
    }
    /**
     * An event that fires when a text document managed by this manager
     * will be saved.
     */
    get onWillSave() {
        return this._onWillSave.event;
    }
    /**
     * Sets a handler that will be called if a participant wants to provide
     * edits during a text document save.
     */
    onWillSaveWaitUntil(handler) {
        this._willSaveWaitUntil = handler;
    }
    /**
     * An event that fires when a text document managed by this manager
     * has been saved.
     */
    get onDidSave() {
        return this._onDidSave.event;
    }
    /**
     * An event that fires when a text document managed by this manager
     * has been closed.
     */
    get onDidClose() {
        return this._onDidClose.event;
    }
    /**
     * Returns the document for the given URI. Returns undefined if
     * the document is not managed by this instance.
     *
     * @param uri The text document's URI to retrieve.
     * @return the text document or `undefined`.
     */
    get(uri) {
        return this._syncedDocuments.get(uri);
    }
    /**
     * Returns all text documents managed by this instance.
     *
     * @return all text documents.
     */
    all() {
        return Array.from(this._syncedDocuments.values());
    }
    /**
     * Returns the URIs of all text documents managed by this instance.
     *
     * @return the URI's of all text documents.
     */
    keys() {
        return Array.from(this._syncedDocuments.keys());
    }
    /**
     * Listens for `low level` notification on the given connection to
     * update the text documents managed by this instance.
     *
     * Please note that the connection only provides handlers not an event model. Therefore
     * listening on a connection will overwrite the following handlers on a connection:
     * `onDidOpenTextDocument`, `onDidChangeTextDocument`, `onDidCloseTextDocument`,
     * `onWillSaveTextDocument`, `onWillSaveTextDocumentWaitUntil` and `onDidSaveTextDocument`.
     *
     * Use the corresponding events on the TextDocuments instance instead.
     *
     * @param connection The connection to listen on.
     */
    listen(connection) {
        connection.__textDocumentSync = vscode_languageserver_protocol_1.TextDocumentSyncKind.Incremental;
        const disposables = [];
        disposables.push(connection.onDidOpenTextDocument((event) => {
            const td = event.textDocument;
            const document = this._configuration.create(td.uri, td.languageId, td.version, td.text);
            this._syncedDocuments.set(td.uri, document);
            const toFire = Object.freeze({ document });
            this._onDidOpen.fire(toFire);
            this._onDidChangeContent.fire(toFire);
        }));
        disposables.push(connection.onDidChangeTextDocument((event) => {
            const td = event.textDocument;
            const changes = event.contentChanges;
            if (changes.length === 0) {
                return;
            }
            const { version } = td;
            if (version === null || version === undefined) {
                throw new Error(`Received document change event for ${td.uri} without valid version identifier`);
            }
            let syncedDocument = this._syncedDocuments.get(td.uri);
            if (syncedDocument !== undefined) {
                syncedDocument = this._configuration.update(syncedDocument, changes, version);
                this._syncedDocuments.set(td.uri, syncedDocument);
                this._onDidChangeContent.fire(Object.freeze({ document: syncedDocument }));
            }
        }));
        disposables.push(connection.onDidCloseTextDocument((event) => {
            let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
            if (syncedDocument !== undefined) {
                this._syncedDocuments.delete(event.textDocument.uri);
                this._onDidClose.fire(Object.freeze({ document: syncedDocument }));
            }
        }));
        disposables.push(connection.onWillSaveTextDocument((event) => {
            let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
            if (syncedDocument !== undefined) {
                this._onWillSave.fire(Object.freeze({ document: syncedDocument, reason: event.reason }));
            }
        }));
        disposables.push(connection.onWillSaveTextDocumentWaitUntil((event, token) => {
            let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
            if (syncedDocument !== undefined && this._willSaveWaitUntil) {
                return this._willSaveWaitUntil(Object.freeze({ document: syncedDocument, reason: event.reason }), token);
            }
            else {
                return [];
            }
        }));
        disposables.push(connection.onDidSaveTextDocument((event) => {
            let syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
            if (syncedDocument !== undefined) {
                this._onDidSave.fire(Object.freeze({ document: syncedDocument }));
            }
        }));
        return vscode_languageserver_protocol_1.Disposable.create(() => { disposables.forEach(disposable => disposable.dispose()); });
    }
}
exports.TextDocuments = TextDocuments;
//# sourceMappingURL=textDocuments.js.map

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotebookDocuments = exports.NotebookSyncFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const textDocuments_1 = __webpack_require__(50);
const NotebookSyncFeature = (Base) => {
    return class extends Base {
        get synchronization() {
            return {
                onDidOpenNotebookDocument: (handler) => {
                    return this.connection.onNotification(vscode_languageserver_protocol_1.DidOpenNotebookDocumentNotification.type, (params) => {
                        handler(params);
                    });
                },
                onDidChangeNotebookDocument: (handler) => {
                    return this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeNotebookDocumentNotification.type, (params) => {
                        handler(params);
                    });
                },
                onDidSaveNotebookDocument: (handler) => {
                    return this.connection.onNotification(vscode_languageserver_protocol_1.DidSaveNotebookDocumentNotification.type, (params) => {
                        handler(params);
                    });
                },
                onDidCloseNotebookDocument: (handler) => {
                    return this.connection.onNotification(vscode_languageserver_protocol_1.DidCloseNotebookDocumentNotification.type, (params) => {
                        handler(params);
                    });
                }
            };
        }
    };
};
exports.NotebookSyncFeature = NotebookSyncFeature;
class CellTextDocumentConnection {
    onDidOpenTextDocument(handler) {
        this.openHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => { this.openHandler = undefined; });
    }
    openTextDocument(params) {
        this.openHandler && this.openHandler(params);
    }
    onDidChangeTextDocument(handler) {
        this.changeHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => { this.changeHandler = handler; });
    }
    changeTextDocument(params) {
        this.changeHandler && this.changeHandler(params);
    }
    onDidCloseTextDocument(handler) {
        this.closeHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => { this.closeHandler = undefined; });
    }
    closeTextDocument(params) {
        this.closeHandler && this.closeHandler(params);
    }
    onWillSaveTextDocument() {
        return CellTextDocumentConnection.NULL_DISPOSE;
    }
    onWillSaveTextDocumentWaitUntil() {
        return CellTextDocumentConnection.NULL_DISPOSE;
    }
    onDidSaveTextDocument() {
        return CellTextDocumentConnection.NULL_DISPOSE;
    }
}
CellTextDocumentConnection.NULL_DISPOSE = Object.freeze({ dispose: () => { } });
class NotebookDocuments {
    constructor(configurationOrTextDocuments) {
        if (configurationOrTextDocuments instanceof textDocuments_1.TextDocuments) {
            this._cellTextDocuments = configurationOrTextDocuments;
        }
        else {
            this._cellTextDocuments = new textDocuments_1.TextDocuments(configurationOrTextDocuments);
        }
        this.notebookDocuments = new Map();
        this.notebookCellMap = new Map();
        this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
        this._onDidChange = new vscode_languageserver_protocol_1.Emitter();
        this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
        this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
    }
    get cellTextDocuments() {
        return this._cellTextDocuments;
    }
    getCellTextDocument(cell) {
        return this._cellTextDocuments.get(cell.document);
    }
    getNotebookDocument(uri) {
        return this.notebookDocuments.get(uri);
    }
    getNotebookCell(uri) {
        const value = this.notebookCellMap.get(uri);
        return value && value[0];
    }
    findNotebookDocumentForCell(cell) {
        const key = typeof cell === 'string' ? cell : cell.document;
        const value = this.notebookCellMap.get(key);
        return value && value[1];
    }
    get onDidOpen() {
        return this._onDidOpen.event;
    }
    get onDidSave() {
        return this._onDidSave.event;
    }
    get onDidChange() {
        return this._onDidChange.event;
    }
    get onDidClose() {
        return this._onDidClose.event;
    }
    /**
     * Listens for `low level` notification on the given connection to
     * update the notebook documents managed by this instance.
     *
     * Please note that the connection only provides handlers not an event model. Therefore
     * listening on a connection will overwrite the following handlers on a connection:
     * `onDidOpenNotebookDocument`, `onDidChangeNotebookDocument`, `onDidSaveNotebookDocument`,
     *  and `onDidCloseNotebookDocument`.
     *
     * @param connection The connection to listen on.
     */
    listen(connection) {
        const cellTextDocumentConnection = new CellTextDocumentConnection();
        const disposables = [];
        disposables.push(this.cellTextDocuments.listen(cellTextDocumentConnection));
        disposables.push(connection.notebooks.synchronization.onDidOpenNotebookDocument((params) => {
            this.notebookDocuments.set(params.notebookDocument.uri, params.notebookDocument);
            for (const cellTextDocument of params.cellTextDocuments) {
                cellTextDocumentConnection.openTextDocument({ textDocument: cellTextDocument });
            }
            this.updateCellMap(params.notebookDocument);
            this._onDidOpen.fire(params.notebookDocument);
        }));
        disposables.push(connection.notebooks.synchronization.onDidChangeNotebookDocument((params) => {
            const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
            if (notebookDocument === undefined) {
                return;
            }
            notebookDocument.version = params.notebookDocument.version;
            const oldMetadata = notebookDocument.metadata;
            let metadataChanged = false;
            const change = params.change;
            if (change.metadata !== undefined) {
                metadataChanged = true;
                notebookDocument.metadata = change.metadata;
            }
            const opened = [];
            const closed = [];
            const data = [];
            const text = [];
            if (change.cells !== undefined) {
                const changedCells = change.cells;
                if (changedCells.structure !== undefined) {
                    const array = changedCells.structure.array;
                    notebookDocument.cells.splice(array.start, array.deleteCount, ...(array.cells !== undefined ? array.cells : []));
                    // Additional open cell text documents.
                    if (changedCells.structure.didOpen !== undefined) {
                        for (const open of changedCells.structure.didOpen) {
                            cellTextDocumentConnection.openTextDocument({ textDocument: open });
                            opened.push(open.uri);
                        }
                    }
                    // Additional closed cell test documents.
                    if (changedCells.structure.didClose) {
                        for (const close of changedCells.structure.didClose) {
                            cellTextDocumentConnection.closeTextDocument({ textDocument: close });
                            closed.push(close.uri);
                        }
                    }
                }
                if (changedCells.data !== undefined) {
                    const cellUpdates = new Map(changedCells.data.map(cell => [cell.document, cell]));
                    for (let i = 0; i <= notebookDocument.cells.length; i++) {
                        const change = cellUpdates.get(notebookDocument.cells[i].document);
                        if (change !== undefined) {
                            const old = notebookDocument.cells.splice(i, 1, change);
                            data.push({ old: old[0], new: change });
                            cellUpdates.delete(change.document);
                            if (cellUpdates.size === 0) {
                                break;
                            }
                        }
                    }
                }
                if (changedCells.textContent !== undefined) {
                    for (const cellTextDocument of changedCells.textContent) {
                        cellTextDocumentConnection.changeTextDocument({ textDocument: cellTextDocument.document, contentChanges: cellTextDocument.changes });
                        text.push(cellTextDocument.document.uri);
                    }
                }
            }
            // Update internal data structure.
            this.updateCellMap(notebookDocument);
            const changeEvent = { notebookDocument };
            if (metadataChanged) {
                changeEvent.metadata = { old: oldMetadata, new: notebookDocument.metadata };
            }
            const added = [];
            for (const open of opened) {
                added.push(this.getNotebookCell(open));
            }
            const removed = [];
            for (const close of closed) {
                removed.push(this.getNotebookCell(close));
            }
            const textContent = [];
            for (const change of text) {
                textContent.push(this.getNotebookCell(change));
            }
            if (added.length > 0 || removed.length > 0 || data.length > 0 || textContent.length > 0) {
                changeEvent.cells = { added, removed, changed: { data, textContent } };
            }
            if (changeEvent.metadata !== undefined || changeEvent.cells !== undefined) {
                this._onDidChange.fire(changeEvent);
            }
        }));
        disposables.push(connection.notebooks.synchronization.onDidSaveNotebookDocument((params) => {
            const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
            if (notebookDocument === undefined) {
                return;
            }
            this._onDidSave.fire(notebookDocument);
        }));
        disposables.push(connection.notebooks.synchronization.onDidCloseNotebookDocument((params) => {
            const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
            if (notebookDocument === undefined) {
                return;
            }
            this._onDidClose.fire(notebookDocument);
            for (const cellTextDocument of params.cellTextDocuments) {
                cellTextDocumentConnection.closeTextDocument({ textDocument: cellTextDocument });
            }
            this.notebookDocuments.delete(params.notebookDocument.uri);
            for (const cell of notebookDocument.cells) {
                this.notebookCellMap.delete(cell.document);
            }
        }));
        return vscode_languageserver_protocol_1.Disposable.create(() => { disposables.forEach(disposable => disposable.dispose()); });
    }
    updateCellMap(notebookDocument) {
        for (const cell of notebookDocument.cells) {
            this.notebookCellMap.set(cell.document, [cell, notebookDocument]);
        }
    }
}
exports.NotebookDocuments = NotebookDocuments;
//# sourceMappingURL=notebook.js.map

/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createConnection = exports.combineFeatures = exports.combineNotebooksFeatures = exports.combineLanguagesFeatures = exports.combineWorkspaceFeatures = exports.combineWindowFeatures = exports.combineClientFeatures = exports.combineTracerFeatures = exports.combineTelemetryFeatures = exports.combineConsoleFeatures = exports._NotebooksImpl = exports._LanguagesImpl = exports.BulkUnregistration = exports.BulkRegistration = exports.ErrorMessageTracker = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const Is = __webpack_require__(53);
const UUID = __webpack_require__(54);
const progress_1 = __webpack_require__(55);
const configuration_1 = __webpack_require__(56);
const workspaceFolder_1 = __webpack_require__(57);
const callHierarchy_1 = __webpack_require__(58);
const semanticTokens_1 = __webpack_require__(6);
const showDocument_1 = __webpack_require__(59);
const fileOperations_1 = __webpack_require__(60);
const linkedEditingRange_1 = __webpack_require__(61);
const typeHierarchy_1 = __webpack_require__(62);
const inlineValue_1 = __webpack_require__(63);
const inlayHint_1 = __webpack_require__(64);
const diagnostic_1 = __webpack_require__(65);
const notebook_1 = __webpack_require__(51);
const moniker_1 = __webpack_require__(66);
function null2Undefined(value) {
    if (value === null) {
        return undefined;
    }
    return value;
}
/**
 * Helps tracking error message. Equal occurrences of the same
 * message are only stored once. This class is for example
 * useful if text documents are validated in a loop and equal
 * error message should be folded into one.
 */
class ErrorMessageTracker {
    constructor() {
        this._messages = Object.create(null);
    }
    /**
     * Add a message to the tracker.
     *
     * @param message The message to add.
     */
    add(message) {
        let count = this._messages[message];
        if (!count) {
            count = 0;
        }
        count++;
        this._messages[message] = count;
    }
    /**
     * Send all tracked messages to the connection's window.
     *
     * @param connection The connection established between client and server.
     */
    sendErrors(connection) {
        Object.keys(this._messages).forEach(message => {
            connection.window.showErrorMessage(message);
        });
    }
}
exports.ErrorMessageTracker = ErrorMessageTracker;
class RemoteConsoleImpl {
    constructor() {
    }
    rawAttach(connection) {
        this._rawConnection = connection;
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    fillServerCapabilities(_capabilities) {
    }
    initialize(_capabilities) {
    }
    error(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Error, message);
    }
    warn(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Warning, message);
    }
    info(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Info, message);
    }
    log(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Log, message);
    }
    send(type, message) {
        if (this._rawConnection) {
            this._rawConnection.sendNotification(vscode_languageserver_protocol_1.LogMessageNotification.type, { type, message }).catch(() => {
                (0, vscode_languageserver_protocol_1.RAL)().console.error(`Sending log message failed`);
            });
        }
    }
}
class _RemoteWindowImpl {
    constructor() {
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    showErrorMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Error, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
    }
    showWarningMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Warning, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
    }
    showInformationMessage(message, ...actions) {
        let params = { type: vscode_languageserver_protocol_1.MessageType.Info, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
    }
}
const RemoteWindowImpl = (0, showDocument_1.ShowDocumentFeature)((0, progress_1.ProgressFeature)(_RemoteWindowImpl));
var BulkRegistration;
(function (BulkRegistration) {
    /**
     * Creates a new bulk registration.
     * @return an empty bulk registration.
     */
    function create() {
        return new BulkRegistrationImpl();
    }
    BulkRegistration.create = create;
})(BulkRegistration = exports.BulkRegistration || (exports.BulkRegistration = {}));
class BulkRegistrationImpl {
    constructor() {
        this._registrations = [];
        this._registered = new Set();
    }
    add(type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        if (this._registered.has(method)) {
            throw new Error(`${method} is already added to this registration`);
        }
        const id = UUID.generateUuid();
        this._registrations.push({
            id: id,
            method: method,
            registerOptions: registerOptions || {}
        });
        this._registered.add(method);
    }
    asRegistrationParams() {
        return {
            registrations: this._registrations
        };
    }
}
var BulkUnregistration;
(function (BulkUnregistration) {
    function create() {
        return new BulkUnregistrationImpl(undefined, []);
    }
    BulkUnregistration.create = create;
})(BulkUnregistration = exports.BulkUnregistration || (exports.BulkUnregistration = {}));
class BulkUnregistrationImpl {
    constructor(_connection, unregistrations) {
        this._connection = _connection;
        this._unregistrations = new Map();
        unregistrations.forEach(unregistration => {
            this._unregistrations.set(unregistration.method, unregistration);
        });
    }
    get isAttached() {
        return !!this._connection;
    }
    attach(connection) {
        this._connection = connection;
    }
    add(unregistration) {
        this._unregistrations.set(unregistration.method, unregistration);
    }
    dispose() {
        let unregistrations = [];
        for (let unregistration of this._unregistrations.values()) {
            unregistrations.push(unregistration);
        }
        let params = {
            unregisterations: unregistrations
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).catch(() => {
            this._connection.console.info(`Bulk unregistration failed.`);
        });
    }
    disposeSingle(arg) {
        const method = Is.string(arg) ? arg : arg.method;
        const unregistration = this._unregistrations.get(method);
        if (!unregistration) {
            return false;
        }
        let params = {
            unregisterations: [unregistration]
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(() => {
            this._unregistrations.delete(method);
        }, (_error) => {
            this._connection.console.info(`Un-registering request handler for ${unregistration.id} failed.`);
        });
        return true;
    }
}
class RemoteClientImpl {
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    register(typeOrRegistrations, registerOptionsOrType, registerOptions) {
        if (typeOrRegistrations instanceof BulkRegistrationImpl) {
            return this.registerMany(typeOrRegistrations);
        }
        else if (typeOrRegistrations instanceof BulkUnregistrationImpl) {
            return this.registerSingle1(typeOrRegistrations, registerOptionsOrType, registerOptions);
        }
        else {
            return this.registerSingle2(typeOrRegistrations, registerOptionsOrType);
        }
    }
    registerSingle1(unregistration, type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        const id = UUID.generateUuid();
        let params = {
            registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        if (!unregistration.isAttached) {
            unregistration.attach(this.connection);
        }
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
            unregistration.add({ id: id, method: method });
            return unregistration;
        }, (_error) => {
            this.connection.console.info(`Registering request handler for ${method} failed.`);
            return Promise.reject(_error);
        });
    }
    registerSingle2(type, registerOptions) {
        const method = Is.string(type) ? type : type.method;
        const id = UUID.generateUuid();
        let params = {
            registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
            return vscode_languageserver_protocol_1.Disposable.create(() => {
                this.unregisterSingle(id, method).catch(() => { this.connection.console.info(`Un-registering capability with id ${id} failed.`); });
            });
        }, (_error) => {
            this.connection.console.info(`Registering request handler for ${method} failed.`);
            return Promise.reject(_error);
        });
    }
    unregisterSingle(id, method) {
        let params = {
            unregisterations: [{ id, method }]
        };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).catch(() => {
            this.connection.console.info(`Un-registering request handler for ${id} failed.`);
        });
    }
    registerMany(registrations) {
        let params = registrations.asRegistrationParams();
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then(() => {
            return new BulkUnregistrationImpl(this._connection, params.registrations.map(registration => { return { id: registration.id, method: registration.method }; }));
        }, (_error) => {
            this.connection.console.info(`Bulk registration failed.`);
            return Promise.reject(_error);
        });
    }
}
class _RemoteWorkspaceImpl {
    constructor() {
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    applyEdit(paramOrEdit) {
        function isApplyWorkspaceEditParams(value) {
            return value && !!value.edit;
        }
        let params = isApplyWorkspaceEditParams(paramOrEdit) ? paramOrEdit : { edit: paramOrEdit };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ApplyWorkspaceEditRequest.type, params);
    }
}
const RemoteWorkspaceImpl = (0, fileOperations_1.FileOperationsFeature)((0, workspaceFolder_1.WorkspaceFoldersFeature)((0, configuration_1.ConfigurationFeature)(_RemoteWorkspaceImpl)));
class TracerImpl {
    constructor() {
        this._trace = vscode_languageserver_protocol_1.Trace.Off;
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    set trace(value) {
        this._trace = value;
    }
    log(message, verbose) {
        if (this._trace === vscode_languageserver_protocol_1.Trace.Off) {
            return;
        }
        this.connection.sendNotification(vscode_languageserver_protocol_1.LogTraceNotification.type, {
            message: message,
            verbose: this._trace === vscode_languageserver_protocol_1.Trace.Verbose ? verbose : undefined
        }).catch(() => {
            // Very hard to decide what to do. We tried to send a log
            // message which failed so we can't simply send another :-(.
        });
    }
}
class TelemetryImpl {
    constructor() {
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    logEvent(data) {
        this.connection.sendNotification(vscode_languageserver_protocol_1.TelemetryEventNotification.type, data).catch(() => {
            this.connection.console.log(`Sending TelemetryEventNotification failed`);
        });
    }
}
class _LanguagesImpl {
    constructor() {
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    attachWorkDoneProgress(params) {
        return (0, progress_1.attachWorkDone)(this.connection, params);
    }
    attachPartialResultProgress(_type, params) {
        return (0, progress_1.attachPartialResult)(this.connection, params);
    }
}
exports._LanguagesImpl = _LanguagesImpl;
const LanguagesImpl = (0, moniker_1.MonikerFeature)((0, diagnostic_1.DiagnosticFeature)((0, inlayHint_1.InlayHintFeature)((0, inlineValue_1.InlineValueFeature)((0, typeHierarchy_1.TypeHierarchyFeature)((0, linkedEditingRange_1.LinkedEditingRangeFeature)((0, semanticTokens_1.SemanticTokensFeature)((0, callHierarchy_1.CallHierarchyFeature)(_LanguagesImpl))))))));
class _NotebooksImpl {
    constructor() {
    }
    attach(connection) {
        this._connection = connection;
    }
    get connection() {
        if (!this._connection) {
            throw new Error('Remote is not attached to a connection yet.');
        }
        return this._connection;
    }
    initialize(_capabilities) {
    }
    fillServerCapabilities(_capabilities) {
    }
    attachWorkDoneProgress(params) {
        return (0, progress_1.attachWorkDone)(this.connection, params);
    }
    attachPartialResultProgress(_type, params) {
        return (0, progress_1.attachPartialResult)(this.connection, params);
    }
}
exports._NotebooksImpl = _NotebooksImpl;
const NotebooksImpl = (0, notebook_1.NotebookSyncFeature)(_NotebooksImpl);
function combineConsoleFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineConsoleFeatures = combineConsoleFeatures;
function combineTelemetryFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineTelemetryFeatures = combineTelemetryFeatures;
function combineTracerFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineTracerFeatures = combineTracerFeatures;
function combineClientFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineClientFeatures = combineClientFeatures;
function combineWindowFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineWindowFeatures = combineWindowFeatures;
function combineWorkspaceFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineWorkspaceFeatures = combineWorkspaceFeatures;
function combineLanguagesFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineLanguagesFeatures = combineLanguagesFeatures;
function combineNotebooksFeatures(one, two) {
    return function (Base) {
        return two(one(Base));
    };
}
exports.combineNotebooksFeatures = combineNotebooksFeatures;
function combineFeatures(one, two) {
    function combine(one, two, func) {
        if (one && two) {
            return func(one, two);
        }
        else if (one) {
            return one;
        }
        else {
            return two;
        }
    }
    let result = {
        __brand: 'features',
        console: combine(one.console, two.console, combineConsoleFeatures),
        tracer: combine(one.tracer, two.tracer, combineTracerFeatures),
        telemetry: combine(one.telemetry, two.telemetry, combineTelemetryFeatures),
        client: combine(one.client, two.client, combineClientFeatures),
        window: combine(one.window, two.window, combineWindowFeatures),
        workspace: combine(one.workspace, two.workspace, combineWorkspaceFeatures),
        languages: combine(one.languages, two.languages, combineLanguagesFeatures),
        notebooks: combine(one.notebooks, two.notebooks, combineNotebooksFeatures)
    };
    return result;
}
exports.combineFeatures = combineFeatures;
function createConnection(connectionFactory, watchDog, factories) {
    const logger = (factories && factories.console ? new (factories.console(RemoteConsoleImpl))() : new RemoteConsoleImpl());
    const connection = connectionFactory(logger);
    logger.rawAttach(connection);
    const tracer = (factories && factories.tracer ? new (factories.tracer(TracerImpl))() : new TracerImpl());
    const telemetry = (factories && factories.telemetry ? new (factories.telemetry(TelemetryImpl))() : new TelemetryImpl());
    const client = (factories && factories.client ? new (factories.client(RemoteClientImpl))() : new RemoteClientImpl());
    const remoteWindow = (factories && factories.window ? new (factories.window(RemoteWindowImpl))() : new RemoteWindowImpl());
    const workspace = (factories && factories.workspace ? new (factories.workspace(RemoteWorkspaceImpl))() : new RemoteWorkspaceImpl());
    const languages = (factories && factories.languages ? new (factories.languages(LanguagesImpl))() : new LanguagesImpl());
    const notebooks = (factories && factories.notebooks ? new (factories.notebooks(NotebooksImpl))() : new NotebooksImpl());
    const allRemotes = [logger, tracer, telemetry, client, remoteWindow, workspace, languages, notebooks];
    function asPromise(value) {
        if (value instanceof Promise) {
            return value;
        }
        else if (Is.thenable(value)) {
            return new Promise((resolve, reject) => {
                value.then((resolved) => resolve(resolved), (error) => reject(error));
            });
        }
        else {
            return Promise.resolve(value);
        }
    }
    let shutdownHandler = undefined;
    let initializeHandler = undefined;
    let exitHandler = undefined;
    let protocolConnection = {
        listen: () => connection.listen(),
        sendRequest: (type, ...params) => connection.sendRequest(Is.string(type) ? type : type.method, ...params),
        onRequest: (type, handler) => connection.onRequest(type, handler),
        sendNotification: (type, param) => {
            const method = Is.string(type) ? type : type.method;
            if (arguments.length === 1) {
                return connection.sendNotification(method);
            }
            else {
                return connection.sendNotification(method, param);
            }
        },
        onNotification: (type, handler) => connection.onNotification(type, handler),
        onProgress: connection.onProgress,
        sendProgress: connection.sendProgress,
        onInitialize: (handler) => {
            initializeHandler = handler;
            return {
                dispose: () => {
                    initializeHandler = undefined;
                }
            };
        },
        onInitialized: (handler) => connection.onNotification(vscode_languageserver_protocol_1.InitializedNotification.type, handler),
        onShutdown: (handler) => {
            shutdownHandler = handler;
            return {
                dispose: () => {
                    shutdownHandler = undefined;
                }
            };
        },
        onExit: (handler) => {
            exitHandler = handler;
            return {
                dispose: () => {
                    exitHandler = undefined;
                }
            };
        },
        get console() { return logger; },
        get telemetry() { return telemetry; },
        get tracer() { return tracer; },
        get client() { return client; },
        get window() { return remoteWindow; },
        get workspace() { return workspace; },
        get languages() { return languages; },
        get notebooks() { return notebooks; },
        onDidChangeConfiguration: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, handler),
        onDidChangeWatchedFiles: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type, handler),
        __textDocumentSync: undefined,
        onDidOpenTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type, handler),
        onDidChangeTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, handler),
        onDidCloseTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type, handler),
        onWillSaveTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.WillSaveTextDocumentNotification.type, handler),
        onWillSaveTextDocumentWaitUntil: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WillSaveTextDocumentWaitUntilRequest.type, handler),
        onDidSaveTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type, handler),
        sendDiagnostics: (params) => connection.sendNotification(vscode_languageserver_protocol_1.PublishDiagnosticsNotification.type, params),
        onHover: (handler) => connection.onRequest(vscode_languageserver_protocol_1.HoverRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
        }),
        onCompletion: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CompletionRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onCompletionResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CompletionResolveRequest.type, handler),
        onSignatureHelp: (handler) => connection.onRequest(vscode_languageserver_protocol_1.SignatureHelpRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
        }),
        onDeclaration: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DeclarationRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDefinition: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DefinitionRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onTypeDefinition: (handler) => connection.onRequest(vscode_languageserver_protocol_1.TypeDefinitionRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onImplementation: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ImplementationRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onReferences: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ReferencesRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDocumentHighlight: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentHighlightRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDocumentSymbol: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentSymbolRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onWorkspaceSymbol: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onWorkspaceSymbolResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolResolveRequest.type, handler),
        onCodeAction: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeActionRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onCodeActionResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeActionResolveRequest.type, (params, cancel) => {
            return handler(params, cancel);
        }),
        onCodeLens: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeLensRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onCodeLensResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeLensResolveRequest.type, (params, cancel) => {
            return handler(params, cancel);
        }),
        onDocumentFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentFormattingRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
        }),
        onDocumentRangeFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
        }),
        onDocumentOnTypeFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type, (params, cancel) => {
            return handler(params, cancel);
        }),
        onRenameRequest: (handler) => connection.onRequest(vscode_languageserver_protocol_1.RenameRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
        }),
        onPrepareRename: (handler) => connection.onRequest(vscode_languageserver_protocol_1.PrepareRenameRequest.type, (params, cancel) => {
            return handler(params, cancel);
        }),
        onDocumentLinks: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentLinkRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDocumentLinkResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentLinkResolveRequest.type, (params, cancel) => {
            return handler(params, cancel);
        }),
        onDocumentColor: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentColorRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onColorPresentation: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onFoldingRanges: (handler) => connection.onRequest(vscode_languageserver_protocol_1.FoldingRangeRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onSelectionRanges: (handler) => connection.onRequest(vscode_languageserver_protocol_1.SelectionRangeRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onExecuteCommand: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ExecuteCommandRequest.type, (params, cancel) => {
            return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), undefined);
        }),
        dispose: () => connection.dispose()
    };
    for (let remote of allRemotes) {
        remote.attach(protocolConnection);
    }
    connection.onRequest(vscode_languageserver_protocol_1.InitializeRequest.type, (params) => {
        watchDog.initialize(params);
        if (Is.string(params.trace)) {
            tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.trace);
        }
        for (let remote of allRemotes) {
            remote.initialize(params.capabilities);
        }
        if (initializeHandler) {
            let result = initializeHandler(params, new vscode_languageserver_protocol_1.CancellationTokenSource().token, (0, progress_1.attachWorkDone)(connection, params), undefined);
            return asPromise(result).then((value) => {
                if (value instanceof vscode_languageserver_protocol_1.ResponseError) {
                    return value;
                }
                let result = value;
                if (!result) {
                    result = { capabilities: {} };
                }
                let capabilities = result.capabilities;
                if (!capabilities) {
                    capabilities = {};
                    result.capabilities = capabilities;
                }
                if (capabilities.textDocumentSync === undefined || capabilities.textDocumentSync === null) {
                    capabilities.textDocumentSync = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
                }
                else if (!Is.number(capabilities.textDocumentSync) && !Is.number(capabilities.textDocumentSync.change)) {
                    capabilities.textDocumentSync.change = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
                }
                for (let remote of allRemotes) {
                    remote.fillServerCapabilities(capabilities);
                }
                return result;
            });
        }
        else {
            let result = { capabilities: { textDocumentSync: vscode_languageserver_protocol_1.TextDocumentSyncKind.None } };
            for (let remote of allRemotes) {
                remote.fillServerCapabilities(result.capabilities);
            }
            return result;
        }
    });
    connection.onRequest(vscode_languageserver_protocol_1.ShutdownRequest.type, () => {
        watchDog.shutdownReceived = true;
        if (shutdownHandler) {
            return shutdownHandler(new vscode_languageserver_protocol_1.CancellationTokenSource().token);
        }
        else {
            return undefined;
        }
    });
    connection.onNotification(vscode_languageserver_protocol_1.ExitNotification.type, () => {
        try {
            if (exitHandler) {
                exitHandler();
            }
        }
        finally {
            if (watchDog.shutdownReceived) {
                watchDog.exit(0);
            }
            else {
                watchDog.exit(1);
            }
        }
    });
    connection.onNotification(vscode_languageserver_protocol_1.SetTraceNotification.type, (params) => {
        tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.value);
    });
    return protocolConnection;
}
exports.createConnection = createConnection;
//# sourceMappingURL=server.js.map

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.thenable = exports.typedArray = exports.stringArray = exports.array = exports.func = exports.error = exports.number = exports.string = exports.boolean = void 0;
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.string = string;
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
exports.number = number;
function error(value) {
    return value instanceof Error;
}
exports.error = error;
function func(value) {
    return typeof value === 'function';
}
exports.func = func;
function array(value) {
    return Array.isArray(value);
}
exports.array = array;
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
exports.stringArray = stringArray;
function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
}
exports.typedArray = typedArray;
function thenable(value) {
    return value && func(value.then);
}
exports.thenable = thenable;
//# sourceMappingURL=is.js.map

/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateUuid = exports.parse = exports.isUUID = exports.v4 = exports.empty = void 0;
class ValueUUID {
    constructor(_value) {
        this._value = _value;
        // empty
    }
    asHex() {
        return this._value;
    }
    equals(other) {
        return this.asHex() === other.asHex();
    }
}
class V4UUID extends ValueUUID {
    constructor() {
        super([
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            '4',
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            V4UUID._oneOf(V4UUID._timeHighBits),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            '-',
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
            V4UUID._randomHex(),
        ].join(''));
    }
    static _oneOf(array) {
        return array[Math.floor(array.length * Math.random())];
    }
    static _randomHex() {
        return V4UUID._oneOf(V4UUID._chars);
    }
}
V4UUID._chars = ['0', '1', '2', '3', '4', '5', '6', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
V4UUID._timeHighBits = ['8', '9', 'a', 'b'];
/**
 * An empty UUID that contains only zeros.
 */
exports.empty = new ValueUUID('00000000-0000-0000-0000-000000000000');
function v4() {
    return new V4UUID();
}
exports.v4 = v4;
const _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isUUID(value) {
    return _UUIDPattern.test(value);
}
exports.isUUID = isUUID;
/**
 * Parses a UUID that is of the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.
 * @param value A uuid string.
 */
function parse(value) {
    if (!isUUID(value)) {
        throw new Error('invalid uuid');
    }
    return new ValueUUID(value);
}
exports.parse = parse;
function generateUuid() {
    return v4().asHex();
}
exports.generateUuid = generateUuid;
//# sourceMappingURL=uuid.js.map

/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.attachPartialResult = exports.ProgressFeature = exports.attachWorkDone = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const uuid_1 = __webpack_require__(54);
class WorkDoneProgressReporterImpl {
    constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
        WorkDoneProgressReporterImpl.Instances.set(this._token, this);
    }
    begin(title, percentage, message, cancellable) {
        let param = {
            kind: 'begin',
            title,
            percentage,
            message,
            cancellable
        };
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
    }
    report(arg0, arg1) {
        let param = {
            kind: 'report'
        };
        if (typeof arg0 === 'number') {
            param.percentage = arg0;
            if (arg1 !== undefined) {
                param.message = arg1;
            }
        }
        else {
            param.message = arg0;
        }
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
    }
    done() {
        WorkDoneProgressReporterImpl.Instances.delete(this._token);
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, { kind: 'end' });
    }
}
WorkDoneProgressReporterImpl.Instances = new Map();
class WorkDoneProgressServerReporterImpl extends WorkDoneProgressReporterImpl {
    constructor(connection, token) {
        super(connection, token);
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
    }
    get token() {
        return this._source.token;
    }
    done() {
        this._source.dispose();
        super.done();
    }
    cancel() {
        this._source.cancel();
    }
}
class NullProgressReporter {
    constructor() {
    }
    begin() {
    }
    report() {
    }
    done() {
    }
}
class NullProgressServerReporter extends NullProgressReporter {
    constructor() {
        super();
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
    }
    get token() {
        return this._source.token;
    }
    done() {
        this._source.dispose();
    }
    cancel() {
        this._source.cancel();
    }
}
function attachWorkDone(connection, params) {
    if (params === undefined || params.workDoneToken === undefined) {
        return new NullProgressReporter();
    }
    const token = params.workDoneToken;
    delete params.workDoneToken;
    return new WorkDoneProgressReporterImpl(connection, token);
}
exports.attachWorkDone = attachWorkDone;
const ProgressFeature = (Base) => {
    return class extends Base {
        constructor() {
            super();
            this._progressSupported = false;
        }
        initialize(capabilities) {
            super.initialize(capabilities);
            if (capabilities?.window?.workDoneProgress === true) {
                this._progressSupported = true;
                this.connection.onNotification(vscode_languageserver_protocol_1.WorkDoneProgressCancelNotification.type, (params) => {
                    let progress = WorkDoneProgressReporterImpl.Instances.get(params.token);
                    if (progress instanceof WorkDoneProgressServerReporterImpl || progress instanceof NullProgressServerReporter) {
                        progress.cancel();
                    }
                });
            }
        }
        attachWorkDoneProgress(token) {
            if (token === undefined) {
                return new NullProgressReporter();
            }
            else {
                return new WorkDoneProgressReporterImpl(this.connection, token);
            }
        }
        createWorkDoneProgress() {
            if (this._progressSupported) {
                const token = (0, uuid_1.generateUuid)();
                return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkDoneProgressCreateRequest.type, { token }).then(() => {
                    const result = new WorkDoneProgressServerReporterImpl(this.connection, token);
                    return result;
                });
            }
            else {
                return Promise.resolve(new NullProgressServerReporter());
            }
        }
    };
};
exports.ProgressFeature = ProgressFeature;
var ResultProgress;
(function (ResultProgress) {
    ResultProgress.type = new vscode_languageserver_protocol_1.ProgressType();
})(ResultProgress || (ResultProgress = {}));
class ResultProgressReporterImpl {
    constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
    }
    report(data) {
        this._connection.sendProgress(ResultProgress.type, this._token, data);
    }
}
function attachPartialResult(connection, params) {
    if (params === undefined || params.partialResultToken === undefined) {
        return undefined;
    }
    const token = params.partialResultToken;
    delete params.partialResultToken;
    return new ResultProgressReporterImpl(connection, token);
}
exports.attachPartialResult = attachPartialResult;
//# sourceMappingURL=progress.js.map

/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const Is = __webpack_require__(53);
const ConfigurationFeature = (Base) => {
    return class extends Base {
        getConfiguration(arg) {
            if (!arg) {
                return this._getConfiguration({});
            }
            else if (Is.string(arg)) {
                return this._getConfiguration({ section: arg });
            }
            else {
                return this._getConfiguration(arg);
            }
        }
        _getConfiguration(arg) {
            let params = {
                items: Array.isArray(arg) ? arg : [arg]
            };
            return this.connection.sendRequest(vscode_languageserver_protocol_1.ConfigurationRequest.type, params).then((result) => {
                if (Array.isArray(result)) {
                    return Array.isArray(arg) ? result : result[0];
                }
                else {
                    return Array.isArray(arg) ? [] : null;
                }
            });
        }
    };
};
exports.ConfigurationFeature = ConfigurationFeature;
//# sourceMappingURL=configuration.js.map

/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkspaceFoldersFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const WorkspaceFoldersFeature = (Base) => {
    return class extends Base {
        constructor() {
            super();
            this._notificationIsAutoRegistered = false;
        }
        initialize(capabilities) {
            super.initialize(capabilities);
            let workspaceCapabilities = capabilities.workspace;
            if (workspaceCapabilities && workspaceCapabilities.workspaceFolders) {
                this._onDidChangeWorkspaceFolders = new vscode_languageserver_protocol_1.Emitter();
                this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type, (params) => {
                    this._onDidChangeWorkspaceFolders.fire(params.event);
                });
            }
        }
        fillServerCapabilities(capabilities) {
            super.fillServerCapabilities(capabilities);
            const changeNotifications = capabilities.workspace?.workspaceFolders?.changeNotifications;
            this._notificationIsAutoRegistered = changeNotifications === true || typeof changeNotifications === 'string';
        }
        getWorkspaceFolders() {
            return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkspaceFoldersRequest.type);
        }
        get onDidChangeWorkspaceFolders() {
            if (!this._onDidChangeWorkspaceFolders) {
                throw new Error('Client doesn\'t support sending workspace folder change events.');
            }
            if (!this._notificationIsAutoRegistered && !this._unregistration) {
                this._unregistration = this.connection.client.register(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type);
            }
            return this._onDidChangeWorkspaceFolders.event;
        }
    };
};
exports.WorkspaceFoldersFeature = WorkspaceFoldersFeature;
//# sourceMappingURL=workspaceFolder.js.map

/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallHierarchyFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const CallHierarchyFeature = (Base) => {
    return class extends Base {
        get callHierarchy() {
            return {
                onPrepare: (handler) => {
                    return this.connection.onRequest(vscode_languageserver_protocol_1.CallHierarchyPrepareRequest.type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), undefined);
                    });
                },
                onIncomingCalls: (handler) => {
                    const type = vscode_languageserver_protocol_1.CallHierarchyIncomingCallsRequest.type;
                    return this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                },
                onOutgoingCalls: (handler) => {
                    const type = vscode_languageserver_protocol_1.CallHierarchyOutgoingCallsRequest.type;
                    return this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                }
            };
        }
    };
};
exports.CallHierarchyFeature = CallHierarchyFeature;
//# sourceMappingURL=callHierarchy.js.map

/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShowDocumentFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const ShowDocumentFeature = (Base) => {
    return class extends Base {
        showDocument(params) {
            return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowDocumentRequest.type, params);
        }
    };
};
exports.ShowDocumentFeature = ShowDocumentFeature;
//# sourceMappingURL=showDocument.js.map

/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileOperationsFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const FileOperationsFeature = (Base) => {
    return class extends Base {
        onDidCreateFiles(handler) {
            return this.connection.onNotification(vscode_languageserver_protocol_1.DidCreateFilesNotification.type, (params) => {
                handler(params);
            });
        }
        onDidRenameFiles(handler) {
            return this.connection.onNotification(vscode_languageserver_protocol_1.DidRenameFilesNotification.type, (params) => {
                handler(params);
            });
        }
        onDidDeleteFiles(handler) {
            return this.connection.onNotification(vscode_languageserver_protocol_1.DidDeleteFilesNotification.type, (params) => {
                handler(params);
            });
        }
        onWillCreateFiles(handler) {
            return this.connection.onRequest(vscode_languageserver_protocol_1.WillCreateFilesRequest.type, (params, cancel) => {
                return handler(params, cancel);
            });
        }
        onWillRenameFiles(handler) {
            return this.connection.onRequest(vscode_languageserver_protocol_1.WillRenameFilesRequest.type, (params, cancel) => {
                return handler(params, cancel);
            });
        }
        onWillDeleteFiles(handler) {
            return this.connection.onRequest(vscode_languageserver_protocol_1.WillDeleteFilesRequest.type, (params, cancel) => {
                return handler(params, cancel);
            });
        }
    };
};
exports.FileOperationsFeature = FileOperationsFeature;
//# sourceMappingURL=fileOperations.js.map

/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinkedEditingRangeFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const LinkedEditingRangeFeature = (Base) => {
    return class extends Base {
        onLinkedEditingRange(handler) {
            return this.connection.onRequest(vscode_languageserver_protocol_1.LinkedEditingRangeRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), undefined);
            });
        }
    };
};
exports.LinkedEditingRangeFeature = LinkedEditingRangeFeature;
//# sourceMappingURL=linkedEditingRange.js.map

/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypeHierarchyFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const TypeHierarchyFeature = (Base) => {
    return class extends Base {
        get typeHierarchy() {
            return {
                onPrepare: (handler) => {
                    return this.connection.onRequest(vscode_languageserver_protocol_1.TypeHierarchyPrepareRequest.type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), undefined);
                    });
                },
                onSupertypes: (handler) => {
                    const type = vscode_languageserver_protocol_1.TypeHierarchySupertypesRequest.type;
                    return this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                },
                onSubtypes: (handler) => {
                    const type = vscode_languageserver_protocol_1.TypeHierarchySubtypesRequest.type;
                    return this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                }
            };
        }
    };
};
exports.TypeHierarchyFeature = TypeHierarchyFeature;
//# sourceMappingURL=typeHierarchy.js.map

/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InlineValueFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const InlineValueFeature = (Base) => {
    return class extends Base {
        get inlineValue() {
            return {
                refresh: () => {
                    return this.connection.sendRequest(vscode_languageserver_protocol_1.InlineValueRefreshRequest.type);
                },
                on: (handler) => {
                    return this.connection.onRequest(vscode_languageserver_protocol_1.InlineValueRequest.type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params));
                    });
                }
            };
        }
    };
};
exports.InlineValueFeature = InlineValueFeature;
//# sourceMappingURL=inlineValue.js.map

/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InlayHintFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const InlayHintFeature = (Base) => {
    return class extends Base {
        get inlayHint() {
            return {
                refresh: () => {
                    return this.connection.sendRequest(vscode_languageserver_protocol_1.InlayHintRefreshRequest.type);
                },
                on: (handler) => {
                    return this.connection.onRequest(vscode_languageserver_protocol_1.InlayHintRequest.type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params));
                    });
                },
                resolve: (handler) => {
                    return this.connection.onRequest(vscode_languageserver_protocol_1.InlayHintResolveRequest.type, (params, cancel) => {
                        return handler(params, cancel);
                    });
                }
            };
        }
    };
};
exports.InlayHintFeature = InlayHintFeature;
//# sourceMappingURL=inlayHint.js.map

/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiagnosticFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const DiagnosticFeature = (Base) => {
    return class extends Base {
        get diagnostics() {
            return {
                refresh: () => {
                    return this.connection.sendRequest(vscode_languageserver_protocol_1.DiagnosticRefreshRequest.type);
                },
                on: (handler) => {
                    return this.connection.onRequest(vscode_languageserver_protocol_1.DocumentDiagnosticRequest.type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(vscode_languageserver_protocol_1.DocumentDiagnosticRequest.partialResult, params));
                    });
                },
                onWorkspace: (handler) => {
                    return this.connection.onRequest(vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.partialResult, params));
                    });
                }
            };
        }
    };
};
exports.DiagnosticFeature = DiagnosticFeature;
//# sourceMappingURL=diagnostic.js.map

/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MonikerFeature = void 0;
const vscode_languageserver_protocol_1 = __webpack_require__(7);
const MonikerFeature = (Base) => {
    return class extends Base {
        get moniker() {
            return {
                on: (handler) => {
                    const type = vscode_languageserver_protocol_1.MonikerRequest.type;
                    return this.connection.onRequest(type, (params, cancel) => {
                        return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
                    });
                },
            };
        }
    };
};
exports.MonikerFeature = MonikerFeature;
//# sourceMappingURL=moniker.js.map

/***/ }),
/* 67 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ----------------------------------------------------------------------------------------- */


module.exports = __webpack_require__(7);

/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startServer = exports.startVsCodeServer = void 0;
const l10n = __webpack_require__(1);
const vscode_languageserver_1 = __webpack_require__(4);
const vscode_languageserver_textdocument_1 = __webpack_require__(69);
const md = __webpack_require__(70);
const vscode_uri_1 = __webpack_require__(84);
const config_1 = __webpack_require__(116);
const configuration_1 = __webpack_require__(117);
const diagnostics_1 = __webpack_require__(119);
const logging_1 = __webpack_require__(120);
const protocol = __webpack_require__(121);
const workspace_1 = __webpack_require__(122);
const organizeLinkDefKind = 'source.organizeLinkDefinitions';
async function startVsCodeServer(connection) {
    const configurationManager = new configuration_1.ConfigurationManager(connection);
    const logger = new logging_1.LogFunctionLogger(connection.console.log.bind(connection.console), configurationManager);
    const parser = new class {
        constructor() {
            this.slugifier = md.githubSlugifier;
        }
        tokenize(document) {
            return connection.sendRequest(protocol.parse, { uri: document.uri.toString() });
        }
    };
    const documents = new vscode_languageserver_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
    const notebooks = new vscode_languageserver_1.NotebookDocuments(documents);
    const workspaceFactory = ({ connection, config, workspaceFolders }) => {
        const workspace = new workspace_1.VsCodeClientWorkspace(connection, config, documents, notebooks, logger);
        workspace.workspaceFolders = (workspaceFolders ?? []).map(x => vscode_uri_1.URI.parse(x.uri));
        return workspace;
    };
    return startServer(connection, { documents, notebooks, configurationManager, logger, parser, workspaceFactory });
}
exports.startVsCodeServer = startVsCodeServer;
async function startServer(connection, serverConfig) {
    const { documents, notebooks } = serverConfig;
    let mdLs;
    connection.onInitialize((params) => {
        const initOptions = params.initializationOptions;
        const mdConfig = (0, config_1.getLsConfiguration)(initOptions ?? {});
        const workspace = serverConfig.workspaceFactory({ connection, config: mdConfig, workspaceFolders: params.workspaceFolders });
        mdLs = md.createLanguageService({
            workspace,
            parser: serverConfig.parser,
            logger: serverConfig.logger,
            ...mdConfig,
            get preferredMdPathExtensionStyle() {
                switch (serverConfig.configurationManager.getSettings()?.markdown.preferredMdPathExtensionStyle) {
                    case 'includeExtension': return md.PreferredMdPathExtensionStyle.includeExtension;
                    case 'removeExtension': return md.PreferredMdPathExtensionStyle.removeExtension;
                    case 'auto':
                    default:
                        return md.PreferredMdPathExtensionStyle.auto;
                }
            }
        });
        registerCompletionsSupport(connection, documents, mdLs, serverConfig.configurationManager);
        registerDocumentHighlightSupport(connection, documents, mdLs, serverConfig.configurationManager);
        (0, diagnostics_1.registerValidateSupport)(connection, workspace, documents, mdLs, serverConfig.configurationManager, serverConfig.logger);
        return {
            capabilities: {
                diagnosticProvider: {
                    documentSelector: null,
                    identifier: 'markdown',
                    interFileDependencies: true,
                    workspaceDiagnostics: false,
                },
                codeActionProvider: { resolveProvider: true },
                definitionProvider: true,
                documentLinkProvider: { resolveProvider: true },
                documentSymbolProvider: true,
                foldingRangeProvider: true,
                referencesProvider: true,
                renameProvider: { prepareProvider: true, },
                selectionRangeProvider: true,
                workspaceSymbolProvider: true,
                workspace: {
                    workspaceFolders: {
                        supported: true,
                        changeNotifications: true,
                    },
                }
            }
        };
    });
    connection.onDocumentLinks(async (params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return [];
        }
        return mdLs.getDocumentLinks(document, token);
    });
    connection.onDocumentLinkResolve(async (link, token) => {
        return mdLs.resolveDocumentLink(link, token);
    });
    connection.onDocumentSymbol(async (params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return [];
        }
        return mdLs.getDocumentSymbols(document, { includeLinkDefinitions: true }, token);
    });
    connection.onFoldingRanges(async (params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return [];
        }
        return mdLs.getFoldingRanges(document, token);
    });
    connection.onSelectionRanges(async (params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return [];
        }
        return mdLs.getSelectionRanges(document, params.positions, token);
    });
    connection.onWorkspaceSymbol(async (params, token) => {
        return mdLs.getWorkspaceSymbols(params.query, token);
    });
    connection.onReferences(async (params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return [];
        }
        return mdLs.getReferences(document, params.position, params.context, token);
    });
    connection.onDefinition(async (params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return undefined;
        }
        return mdLs.getDefinition(document, params.position, token);
    });
    connection.onPrepareRename(async (params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return undefined;
        }
        try {
            return await mdLs.prepareRename(document, params.position, token);
        }
        catch (e) {
            if (e instanceof md.RenameNotSupportedAtLocationError) {
                throw new vscode_languageserver_1.ResponseError(0, e.message);
            }
            else {
                throw e;
            }
        }
    });
    connection.onRenameRequest(async (params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return undefined;
        }
        return mdLs.getRenameEdit(document, params.position, params.newName, token);
    });
    connection.onCodeAction(async (params, token) => {
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return undefined;
        }
        if (params.context.only?.some(kind => kind === 'source' || kind.startsWith('source.'))) {
            const action = {
                title: l10n.t("Organize link definitions"),
                kind: organizeLinkDefKind,
                data: { uri: document.uri }
            };
            return [action];
        }
        return mdLs.getCodeActions(document, params.range, params.context, token);
    });
    connection.onCodeActionResolve(async (codeAction, token) => {
        if (codeAction.kind === organizeLinkDefKind) {
            const data = codeAction.data;
            const document = documents.get(data.uri);
            if (!document) {
                return codeAction;
            }
            const edits = (await mdLs?.organizeLinkDefinitions(document, { removeUnused: true }, token)) || [];
            codeAction.edit = {
                changes: {
                    [data.uri]: edits
                }
            };
            return codeAction;
        }
        return codeAction;
    });
    connection.onRequest(protocol.getReferencesToFileInWorkspace, (async (params, token) => {
        return mdLs.getFileReferences(vscode_uri_1.URI.parse(params.uri), token);
    }));
    connection.onRequest(protocol.getEditForFileRenames, (async (params, token) => {
        const result = await mdLs.getRenameFilesInWorkspaceEdit(params.map(x => ({ oldUri: vscode_uri_1.URI.parse(x.oldUri), newUri: vscode_uri_1.URI.parse(x.newUri) })), token);
        if (!result) {
            return result;
        }
        return {
            edit: result.edit,
            participatingRenames: result.participatingRenames.map(rename => ({ oldUri: rename.oldUri.toString(), newUri: rename.newUri.toString() }))
        };
    }));
    connection.onRequest(protocol.resolveLinkTarget, (async (params, token) => {
        return mdLs.resolveLinkTarget(params.linkText, vscode_uri_1.URI.parse(params.uri), token);
    }));
    documents.listen(connection);
    notebooks?.listen(connection);
    connection.listen();
}
exports.startServer = startServer;
function registerDynamicClientFeature(config, isEnabled, register) {
    let registration;
    function update() {
        const settings = config.getSettings();
        if (isEnabled(settings)) {
            if (!registration) {
                registration = register();
            }
        }
        else {
            registration?.then(x => x.dispose());
            registration = undefined;
        }
    }
    update();
    return config.onDidChangeConfiguration(() => update());
}
function registerCompletionsSupport(connection, documents, ls, config) {
    function getIncludeWorkspaceHeaderCompletions() {
        switch (config.getSettings()?.markdown.suggest.paths.includeWorkspaceHeaderCompletions) {
            case 'onSingleOrDoubleHash': return md.IncludeWorkspaceHeaderCompletions.onSingleOrDoubleHash;
            case 'onDoubleHash': return md.IncludeWorkspaceHeaderCompletions.onDoubleHash;
            case 'never':
            default: return md.IncludeWorkspaceHeaderCompletions.never;
        }
    }
    connection.onCompletion(async (params, token) => {
        const settings = config.getSettings();
        if (!settings?.markdown.suggest.paths.enabled) {
            return [];
        }
        const document = documents.get(params.textDocument.uri);
        if (document) {
            // TODO: remove any type after picking up new release with correct types
            return ls.getCompletionItems(document, params.position, {
                ...(params.context || {}),
                includeWorkspaceHeaderCompletions: getIncludeWorkspaceHeaderCompletions(),
            }, token);
        }
        return [];
    });
    return registerDynamicClientFeature(config, (settings) => !!settings?.markdown.suggest.paths.enabled, () => {
        const registrationOptions = {
            documentSelector: null,
            triggerCharacters: ['.', '/', '#'],
        };
        return connection.client.register(vscode_languageserver_1.CompletionRequest.type, registrationOptions);
    });
}
function registerDocumentHighlightSupport(connection, documents, mdLs, configurationManager) {
    connection.onDocumentHighlight(async (params, token) => {
        const settings = configurationManager.getSettings();
        if (!settings?.markdown.occurrencesHighlight.enabled) {
            return undefined;
        }
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return undefined;
        }
        return mdLs.getDocumentHighlights(document, params.position, token);
    });
    return registerDynamicClientFeature(configurationManager, (settings) => !!settings?.markdown.occurrencesHighlight.enabled, () => {
        const registrationOptions = {
            documentSelector: null,
        };
        return connection.client.register(vscode_languageserver_1.DocumentHighlightRequest.type, registrationOptions);
    });
}


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextDocument": () => (/* binding */ TextDocument)
/* harmony export */ });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

class FullTextDocument {
    constructor(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = undefined;
    }
    get uri() {
        return this._uri;
    }
    get languageId() {
        return this._languageId;
    }
    get version() {
        return this._version;
    }
    getText(range) {
        if (range) {
            const start = this.offsetAt(range.start);
            const end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    }
    update(changes, version) {
        for (let change of changes) {
            if (FullTextDocument.isIncremental(change)) {
                // makes sure start is before end
                const range = getWellformedRange(change.range);
                // update content
                const startOffset = this.offsetAt(range.start);
                const endOffset = this.offsetAt(range.end);
                this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
                // update the offsets
                const startLine = Math.max(range.start.line, 0);
                const endLine = Math.max(range.end.line, 0);
                let lineOffsets = this._lineOffsets;
                const addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
                if (endLine - startLine === addedLineOffsets.length) {
                    for (let i = 0, len = addedLineOffsets.length; i < len; i++) {
                        lineOffsets[i + startLine + 1] = addedLineOffsets[i];
                    }
                }
                else {
                    if (addedLineOffsets.length < 10000) {
                        lineOffsets.splice(startLine + 1, endLine - startLine, ...addedLineOffsets);
                    }
                    else { // avoid too many arguments for splice
                        this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
                    }
                }
                const diff = change.text.length - (endOffset - startOffset);
                if (diff !== 0) {
                    for (let i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
                        lineOffsets[i] = lineOffsets[i] + diff;
                    }
                }
            }
            else if (FullTextDocument.isFull(change)) {
                this._content = change.text;
                this._lineOffsets = undefined;
            }
            else {
                throw new Error('Unknown change event received');
            }
        }
        this._version = version;
    }
    getLineOffsets() {
        if (this._lineOffsets === undefined) {
            this._lineOffsets = computeLineOffsets(this._content, true);
        }
        return this._lineOffsets;
    }
    positionAt(offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        let lineOffsets = this.getLineOffsets();
        let low = 0, high = lineOffsets.length;
        if (high === 0) {
            return { line: 0, character: offset };
        }
        while (low < high) {
            let mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        let line = low - 1;
        return { line, character: offset - lineOffsets[line] };
    }
    offsetAt(position) {
        let lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        let lineOffset = lineOffsets[position.line];
        let nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    }
    get lineCount() {
        return this.getLineOffsets().length;
    }
    static isIncremental(event) {
        let candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range !== undefined &&
            (candidate.rangeLength === undefined || typeof candidate.rangeLength === 'number');
    }
    static isFull(event) {
        let candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range === undefined && candidate.rangeLength === undefined;
    }
}
var TextDocument;
(function (TextDocument) {
    /**
     * Creates a new text document.
     *
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param version The document's initial version number.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Updates a TextDocument by modifying its content.
     *
     * @param document the document to update. Only documents created by TextDocument.create are valid inputs.
     * @param changes the changes to apply to the document.
     * @param version the changes version for the document.
     * @returns The updated TextDocument. Note: That's the same document instance passed in as first parameter.
     *
     */
    function update(document, changes, version) {
        if (document instanceof FullTextDocument) {
            document.update(changes, version);
            return document;
        }
        else {
            throw new Error('TextDocument.update: document must be created by TextDocument.create');
        }
    }
    TextDocument.update = update;
    function applyEdits(document, edits) {
        let text = document.getText();
        let sortedEdits = mergeSort(edits.map(getWellformedEdit), (a, b) => {
            let diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return diff;
        });
        let lastModifiedOffset = 0;
        const spans = [];
        for (const e of sortedEdits) {
            let startOffset = document.offsetAt(e.range.start);
            if (startOffset < lastModifiedOffset) {
                throw new Error('Overlapping edit');
            }
            else if (startOffset > lastModifiedOffset) {
                spans.push(text.substring(lastModifiedOffset, startOffset));
            }
            if (e.newText.length) {
                spans.push(e.newText);
            }
            lastModifiedOffset = document.offsetAt(e.range.end);
        }
        spans.push(text.substr(lastModifiedOffset));
        return spans.join('');
    }
    TextDocument.applyEdits = applyEdits;
})(TextDocument || (TextDocument = {}));
function mergeSort(data, compare) {
    if (data.length <= 1) {
        // sorted
        return data;
    }
    const p = (data.length / 2) | 0;
    const left = data.slice(0, p);
    const right = data.slice(p);
    mergeSort(left, compare);
    mergeSort(right, compare);
    let leftIdx = 0;
    let rightIdx = 0;
    let i = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
        let ret = compare(left[leftIdx], right[rightIdx]);
        if (ret <= 0) {
            // smaller_equal -> take left to preserve order
            data[i++] = left[leftIdx++];
        }
        else {
            // greater -> take right
            data[i++] = right[rightIdx++];
        }
    }
    while (leftIdx < left.length) {
        data[i++] = left[leftIdx++];
    }
    while (rightIdx < right.length) {
        data[i++] = right[rightIdx++];
    }
    return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset = 0) {
    const result = isAtLineStart ? [textOffset] : [];
    for (let i = 0; i < text.length; i++) {
        let ch = text.charCodeAt(i);
        if (ch === 13 /* CharCode.CarriageReturn */ || ch === 10 /* CharCode.LineFeed */) {
            if (ch === 13 /* CharCode.CarriageReturn */ && i + 1 < text.length && text.charCodeAt(i + 1) === 10 /* CharCode.LineFeed */) {
                i++;
            }
            result.push(textOffset + i + 1);
        }
    }
    return result;
}
function getWellformedRange(range) {
    const start = range.start;
    const end = range.end;
    if (start.line > end.line || (start.line === end.line && start.character > end.character)) {
        return { start: end, end: start };
    }
    return range;
}
function getWellformedEdit(textEdit) {
    const range = getWellformedRange(textEdit.range);
    if (range !== textEdit.range) {
        return { newText: textEdit.newText, range };
    }
    return textEdit;
}


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createLanguageService = exports.githubSlugifier = exports.LogLevel = exports.RenameNotSupportedAtLocationError = exports.IncludeWorkspaceHeaderCompletions = exports.DiagnosticLevel = exports.DiagnosticCode = exports.PreferredMdPathExtensionStyle = void 0;
const config_1 = __webpack_require__(71);
const extractLinkDef_1 = __webpack_require__(79);
const removeLinkDefinition_1 = __webpack_require__(98);
const definitions_1 = __webpack_require__(102);
const diagnostics_1 = __webpack_require__(99);
const documentHighlights_1 = __webpack_require__(103);
const documentLinks_1 = __webpack_require__(86);
const documentSymbols_1 = __webpack_require__(108);
const fileRename_1 = __webpack_require__(109);
const folding_1 = __webpack_require__(110);
const organizeLinkDefs_1 = __webpack_require__(96);
const pathCompletions_1 = __webpack_require__(111);
const references_1 = __webpack_require__(107);
const rename_1 = __webpack_require__(104);
const smartSelect_1 = __webpack_require__(114);
const workspaceSymbols_1 = __webpack_require__(115);
const tableOfContents_1 = __webpack_require__(112);
const workspace_1 = __webpack_require__(92);
var config_2 = __webpack_require__(71);
Object.defineProperty(exports, "PreferredMdPathExtensionStyle", ({ enumerable: true, get: function () { return config_2.PreferredMdPathExtensionStyle; } }));
var diagnostics_2 = __webpack_require__(99);
Object.defineProperty(exports, "DiagnosticCode", ({ enumerable: true, get: function () { return diagnostics_2.DiagnosticCode; } }));
Object.defineProperty(exports, "DiagnosticLevel", ({ enumerable: true, get: function () { return diagnostics_2.DiagnosticLevel; } }));
var pathCompletions_2 = __webpack_require__(111);
Object.defineProperty(exports, "IncludeWorkspaceHeaderCompletions", ({ enumerable: true, get: function () { return pathCompletions_2.IncludeWorkspaceHeaderCompletions; } }));
var rename_2 = __webpack_require__(104);
Object.defineProperty(exports, "RenameNotSupportedAtLocationError", ({ enumerable: true, get: function () { return rename_2.RenameNotSupportedAtLocationError; } }));
var logging_1 = __webpack_require__(87);
Object.defineProperty(exports, "LogLevel", ({ enumerable: true, get: function () { return logging_1.LogLevel; } }));
var slugify_1 = __webpack_require__(113);
Object.defineProperty(exports, "githubSlugifier", ({ enumerable: true, get: function () { return slugify_1.githubSlugifier; } }));
/**
 * Create a new instance of the {@link IMdLanguageService language service}.
 */
function createLanguageService(init) {
    const config = (0, config_1.getLsConfiguration)(init);
    const logger = init.logger;
    const tocProvider = new tableOfContents_1.MdTableOfContentsProvider(init.parser, init.workspace, logger);
    const smartSelectProvider = new smartSelect_1.MdSelectionRangeProvider(init.parser, tocProvider, logger);
    const foldingProvider = new folding_1.MdFoldingProvider(init.parser, tocProvider, logger);
    const linkProvider = new documentLinks_1.MdLinkProvider(config, init.parser, init.workspace, tocProvider, logger);
    const pathCompletionProvider = new pathCompletions_1.MdPathCompletionProvider(config, init.workspace, init.parser, linkProvider, tocProvider);
    const linkCache = (0, documentLinks_1.createWorkspaceLinkCache)(init.parser, init.workspace);
    const referencesProvider = new references_1.MdReferencesProvider(config, init.parser, init.workspace, tocProvider, linkCache, logger);
    const definitionsProvider = new definitions_1.MdDefinitionProvider(config, init.workspace, tocProvider, linkCache);
    const renameProvider = new rename_1.MdRenameProvider(config, init.workspace, referencesProvider, init.parser.slugifier, logger);
    const fileRenameProvider = new fileRename_1.MdFileRenameProvider(config, init.workspace, linkCache, referencesProvider);
    const diagnosticsComputer = new diagnostics_1.DiagnosticComputer(config, init.workspace, linkProvider, tocProvider, logger);
    const docSymbolProvider = new documentSymbols_1.MdDocumentSymbolProvider(tocProvider, linkProvider, logger);
    const workspaceSymbolProvider = new workspaceSymbols_1.MdWorkspaceSymbolProvider(init.workspace, docSymbolProvider);
    const organizeLinkDefinitions = new organizeLinkDefs_1.MdOrganizeLinkDefinitionProvider(linkProvider);
    const documentHighlightProvider = new documentHighlights_1.MdDocumentHighlightProvider(config, tocProvider, linkProvider);
    const extractCodeActionProvider = new extractLinkDef_1.MdExtractLinkDefinitionCodeActionProvider(linkProvider);
    const removeLinkDefinitionActionProvider = new removeLinkDefinition_1.MdRemoveLinkDefinitionCodeActionProvider();
    return Object.freeze({
        dispose: () => {
            linkCache.dispose();
            tocProvider.dispose();
            workspaceSymbolProvider.dispose();
            linkProvider.dispose();
            referencesProvider.dispose();
        },
        getDocumentLinks: linkProvider.provideDocumentLinks.bind(linkProvider),
        resolveDocumentLink: linkProvider.resolveDocumentLink.bind(linkProvider),
        resolveLinkTarget: linkProvider.resolveLinkTarget.bind(linkProvider),
        getDocumentSymbols: docSymbolProvider.provideDocumentSymbols.bind(docSymbolProvider),
        getFoldingRanges: foldingProvider.provideFoldingRanges.bind(foldingProvider),
        getSelectionRanges: smartSelectProvider.provideSelectionRanges.bind(smartSelectProvider),
        getWorkspaceSymbols: workspaceSymbolProvider.provideWorkspaceSymbols.bind(workspaceSymbolProvider),
        getCompletionItems: pathCompletionProvider.provideCompletionItems.bind(pathCompletionProvider),
        getReferences: referencesProvider.provideReferences.bind(referencesProvider),
        getFileReferences: async (resource, token) => {
            return (await referencesProvider.getReferencesToFileInWorkspace(resource, token)).map(x => x.location);
        },
        getDefinition: definitionsProvider.provideDefinition.bind(definitionsProvider),
        organizeLinkDefinitions: organizeLinkDefinitions.getOrganizeLinkDefinitionEdits.bind(organizeLinkDefinitions),
        prepareRename: renameProvider.prepareRename.bind(renameProvider),
        getRenameEdit: renameProvider.provideRenameEdits.bind(renameProvider),
        getRenameFilesInWorkspaceEdit: fileRenameProvider.getRenameFilesInWorkspaceEdit.bind(fileRenameProvider),
        getCodeActions: async (doc, range, context, token) => {
            return (await Promise.all([
                extractCodeActionProvider.getActions(doc, range, context, token),
                Array.from(removeLinkDefinitionActionProvider.getActions(doc, range, context)),
            ])).flat();
        },
        getDocumentHighlights: (document, position, token) => {
            return documentHighlightProvider.getDocumentHighlights(document, position, token);
        },
        computeDiagnostics: async (doc, options, token) => {
            return (await diagnosticsComputer.compute(doc, options, token))?.diagnostics;
        },
        createPullDiagnosticsManager: () => {
            if (!(0, workspace_1.isWorkspaceWithFileWatching)(init.workspace)) {
                throw new Error(`Workspace does not support file watching. Diagnostics manager not supported`);
            }
            return new diagnostics_1.DiagnosticsManager(config, init.workspace, linkProvider, tocProvider, logger);
        }
    });
}
exports.createLanguageService = createLanguageService;
//# sourceMappingURL=index.js.map

/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isExcludedPath = exports.getLsConfiguration = exports.defaultMarkdownFileExtension = exports.PreferredMdPathExtensionStyle = void 0;
const picomatch = __webpack_require__(72);
/**
 * Preferred style for file paths to {@link markdownFileExtensions markdown files}.
 */
var PreferredMdPathExtensionStyle;
(function (PreferredMdPathExtensionStyle) {
    /**
     * Try to maintain the existing of the path.
     */
    PreferredMdPathExtensionStyle["auto"] = "auto";
    /**
     * Include the file extension when possible.
     */
    PreferredMdPathExtensionStyle["includeExtension"] = "includeExtension";
    /**
     * Drop the file extension when possible.
     */
    PreferredMdPathExtensionStyle["removeExtension"] = "removeExtension";
})(PreferredMdPathExtensionStyle = exports.PreferredMdPathExtensionStyle || (exports.PreferredMdPathExtensionStyle = {}));
exports.defaultMarkdownFileExtension = 'md';
const defaultConfig = {
    markdownFileExtensions: [exports.defaultMarkdownFileExtension],
    knownLinkedToFileExtensions: [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'webp',
        'bmp',
        'tiff',
    ],
    excludePaths: [
        '**/.*',
        '**/node_modules/**',
    ]
};
function getLsConfiguration(overrides) {
    return new Proxy(Object.create(null), {
        get(_target, p, _receiver) {
            return p in overrides ? overrides[p] : defaultConfig[p];
        },
    });
}
exports.getLsConfiguration = getLsConfiguration;
function isExcludedPath(configuration, uri) {
    return configuration.excludePaths.some(excludePath => picomatch.isMatch(uri.path, excludePath));
}
exports.isExcludedPath = isExcludedPath;
//# sourceMappingURL=config.js.map

/***/ }),
/* 72 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = __webpack_require__(73);


/***/ }),
/* 73 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const path = __webpack_require__(74);
const scan = __webpack_require__(75);
const parse = __webpack_require__(78);
const utils = __webpack_require__(76);
const constants = __webpack_require__(77);
const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */

const picomatch = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map(input => picomatch(input, options, returnState));
    const arrayMatcher = str => {
      for (const isMatch of fns) {
        const state = isMatch(str);
        if (state) return state;
      }
      return false;
    };
    return arrayMatcher;
  }

  const isState = isObject(glob) && glob.tokens && glob.input;

  if (glob === '' || (typeof glob !== 'string' && !isState)) {
    throw new TypeError('Expected pattern to be a non-empty string');
  }

  const opts = options || {};
  const posix = utils.isWindows(options);
  const regex = isState
    ? picomatch.compileRe(glob, options)
    : picomatch.makeRe(glob, options, false, true);

  const state = regex.state;
  delete regex.state;

  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
  }

  const matcher = (input, returnObject = false) => {
    const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
    const result = { glob, state, regex, posix, input, output, match, isMatch };

    if (typeof opts.onResult === 'function') {
      opts.onResult(result);
    }

    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (isIgnored(input)) {
      if (typeof opts.onIgnore === 'function') {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (typeof opts.onMatch === 'function') {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };

  if (returnState) {
    matcher.state = state;
  }

  return matcher;
};

/**
 * Test `input` with the given `regex`. This is used by the main
 * `picomatch()` function to test the input string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.test(input, regex[, options]);
 *
 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp} `regex`
 * @return {Object} Returns an object with matching info.
 * @api public
 */

picomatch.test = (input, regex, options, { glob, posix } = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be a string');
  }

  if (input === '') {
    return { isMatch: false, output: '' };
  }

  const opts = options || {};
  const format = opts.format || (posix ? utils.toPosixSlashes : null);
  let match = input === glob;
  let output = (match && format) ? format(input) : input;

  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }

  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch.matchBase(input, regex, options, posix);
    } else {
      match = regex.exec(output);
    }
  }

  return { isMatch: Boolean(match), match, output };
};

/**
 * Match the basename of a filepath.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.matchBase(input, glob[, options]);
 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
 * @return {Boolean}
 * @api public
 */

picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
  return regex.test(path.basename(input));
};

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.isMatch(string, patterns[, options]);
 *
 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String|Array} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const result = picomatch.parse(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
 * @api public
 */

picomatch.parse = (pattern, options) => {
  if (Array.isArray(pattern)) return pattern.map(p => picomatch.parse(p, options));
  return parse(pattern, { ...options, fastpaths: false });
};

/**
 * Scan a glob pattern to separate the pattern into segments.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.scan(input[, options]);
 *
 * const result = picomatch.scan('!./foo/*.js');
 * console.log(result);
 * { prefix: '!./',
 *   input: '!./foo/*.js',
 *   start: 3,
 *   base: 'foo',
 *   glob: '*.js',
 *   isBrace: false,
 *   isBracket: false,
 *   isGlob: true,
 *   isExtglob: false,
 *   isGlobstar: false,
 *   negated: true }
 * ```
 * @param {String} `input` Glob pattern to scan.
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

picomatch.scan = (input, options) => scan(input, options);

/**
 * Compile a regular expression from the `state` object returned by the
 * [parse()](#parse) method.
 *
 * @param {Object} `state`
 * @param {Object} `options`
 * @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
 * @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
 * @return {RegExp}
 * @api public
 */

picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return state.output;
  }

  const opts = options || {};
  const prepend = opts.contains ? '' : '^';
  const append = opts.contains ? '' : '$';

  let source = `${prepend}(?:${state.output})${append}`;
  if (state && state.negated === true) {
    source = `^(?!${source}).*$`;
  }

  const regex = picomatch.toRegex(source, options);
  if (returnState === true) {
    regex.state = state;
  }

  return regex;
};

/**
 * Create a regular expression from a parsed glob pattern.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const state = picomatch.parse('*.js');
 * // picomatch.compileRe(state[, options]);
 *
 * console.log(picomatch.compileRe(state));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `state` The object returned from the `.parse` method.
 * @param {Object} `options`
 * @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
 * @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== 'string') {
    throw new TypeError('Expected a non-empty string');
  }

  let parsed = { negated: false, fastpaths: true };

  if (options.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
    parsed.output = parse.fastpaths(input, options);
  }

  if (!parsed.output) {
    parsed = parse(input, options);
  }

  return picomatch.compileRe(parsed, options, returnOutput, returnState);
};

/**
 * Create a regular expression from the given regex source string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.toRegex(source[, options]);
 *
 * const { output } = picomatch.parse('*.js');
 * console.log(picomatch.toRegex(output));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `source` Regular expression source string.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

picomatch.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
  } catch (err) {
    if (options && options.debug === true) throw err;
    return /$^/;
  }
};

/**
 * Picomatch constants.
 * @return {Object}
 */

picomatch.constants = constants;

/**
 * Expose "picomatch"
 */

module.exports = picomatch;


/***/ }),
/* 74 */
/***/ ((module) => {

// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;


/***/ }),
/* 75 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const utils = __webpack_require__(76);
const {
  CHAR_ASTERISK,             /* * */
  CHAR_AT,                   /* @ */
  CHAR_BACKWARD_SLASH,       /* \ */
  CHAR_COMMA,                /* , */
  CHAR_DOT,                  /* . */
  CHAR_EXCLAMATION_MARK,     /* ! */
  CHAR_FORWARD_SLASH,        /* / */
  CHAR_LEFT_CURLY_BRACE,     /* { */
  CHAR_LEFT_PARENTHESES,     /* ( */
  CHAR_LEFT_SQUARE_BRACKET,  /* [ */
  CHAR_PLUS,                 /* + */
  CHAR_QUESTION_MARK,        /* ? */
  CHAR_RIGHT_CURLY_BRACE,    /* } */
  CHAR_RIGHT_PARENTHESES,    /* ) */
  CHAR_RIGHT_SQUARE_BRACKET  /* ] */
} = __webpack_require__(77);

const isPathSeparator = code => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};

const depth = token => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};

/**
 * Quickly scans a glob pattern and returns an object with a handful of
 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
 * `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
 * with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
 *
 * ```js
 * const pm = require('picomatch');
 * console.log(pm.scan('foo/bar/*.js'));
 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an object with tokens and regex source string.
 * @api public
 */

const scan = (input, options) => {
  const opts = options || {};

  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];

  let str = input;
  let index = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob = false;
  let isExtglob = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let negatedExtglob = false;
  let finished = false;
  let braces = 0;
  let prev;
  let code;
  let token = { value: '', depth: 0, isGlob: false };

  const eos = () => index >= length;
  const peek = () => str.charCodeAt(index + 1);
  const advance = () => {
    prev = code;
    return str.charCodeAt(++index);
  };

  while (index < length) {
    code = advance();
    let next;

    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();

      if (code === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }
      continue;
    }

    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces++;

      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          continue;
        }

        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (braceEscaped !== true && code === CHAR_COMMA) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (code === CHAR_RIGHT_CURLY_BRACE) {
          braces--;

          if (braces === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index);
      tokens.push(token);
      token = { value: '', depth: 0, isGlob: false };

      if (finished === true) continue;
      if (prev === CHAR_DOT && index === (start + 1)) {
        start += 2;
        continue;
      }

      lastIndex = index + 1;
      continue;
    }

    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS
        || code === CHAR_AT
        || code === CHAR_ASTERISK
        || code === CHAR_QUESTION_MARK
        || code === CHAR_EXCLAMATION_MARK;

      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
        isGlob = token.isGlob = true;
        isExtglob = token.isExtglob = true;
        finished = true;
        if (code === CHAR_EXCLAMATION_MARK && index === start) {
          negatedExtglob = true;
        }

        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }

            if (code === CHAR_RIGHT_PARENTHESES) {
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }

    if (code === CHAR_ASTERISK) {
      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_QUESTION_MARK) {
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_LEFT_SQUARE_BRACKET) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          isBracket = token.isBracket = true;
          isGlob = token.isGlob = true;
          finished = true;
          break;
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = token.negated = true;
      start++;
      continue;
    }

    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
      isGlob = token.isGlob = true;

      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }

          if (code === CHAR_RIGHT_PARENTHESES) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }

    if (isGlob === true) {
      finished = true;

      if (scanToEnd === true) {
        continue;
      }

      break;
    }
  }

  if (opts.noext === true) {
    isExtglob = false;
    isGlob = false;
  }

  let base = str;
  let prefix = '';
  let glob = '';

  if (start > 0) {
    prefix = str.slice(0, start);
    str = str.slice(start);
    lastIndex -= start;
  }

  if (base && isGlob === true && lastIndex > 0) {
    base = str.slice(0, lastIndex);
    glob = str.slice(lastIndex);
  } else if (isGlob === true) {
    base = '';
    glob = str;
  } else {
    base = str;
  }

  if (base && base !== '' && base !== '/' && base !== str) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }

  if (opts.unescape === true) {
    if (glob) glob = utils.removeBackslashes(glob);

    if (base && backslashes === true) {
      base = utils.removeBackslashes(base);
    }
  }

  const state = {
    prefix,
    input,
    start,
    base,
    glob,
    isBrace,
    isBracket,
    isGlob,
    isExtglob,
    isGlobstar,
    negated,
    negatedExtglob
  };

  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }

  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;

    for (let idx = 0; idx < slashes.length; idx++) {
      const n = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== '') {
        parts.push(value);
      }
      prevIndex = i;
    }

    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);

      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }

    state.slashes = slashes;
    state.parts = parts;
  }

  return state;
};

module.exports = scan;


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



const path = __webpack_require__(74);
const win32 = "web" === 'win32';
const {
  REGEX_BACKSLASH,
  REGEX_REMOVE_BACKSLASH,
  REGEX_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_GLOBAL
} = __webpack_require__(77);

exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

exports.removeBackslashes = str => {
  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
    return match === '\\' ? '' : match;
  });
};

exports.supportsLookbehinds = () => {
  const segs = process.version.slice(1).split('.').map(Number);
  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
    return true;
  }
  return false;
};

exports.isWindows = options => {
  if (options && typeof options.windows === 'boolean') {
    return options.windows;
  }
  return win32 === true || path.sep === '\\';
};

exports.escapeLast = (input, char, lastIdx) => {
  const idx = input.lastIndexOf(char, lastIdx);
  if (idx === -1) return input;
  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
};

exports.removePrefix = (input, state = {}) => {
  let output = input;
  if (output.startsWith('./')) {
    output = output.slice(2);
    state.prefix = './';
  }
  return output;
};

exports.wrapOutput = (input, state = {}, options = {}) => {
  const prepend = options.contains ? '' : '^';
  const append = options.contains ? '' : '$';

  let output = `${prepend}(?:${input})${append}`;
  if (state.negated === true) {
    output = `(?:^(?!${output}).*$)`;
  }
  return output;
};


/***/ }),
/* 77 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const path = __webpack_require__(74);
const WIN_SLASH = '\\\\/';
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

/**
 * Posix glob regex
 */

const DOT_LITERAL = '\\.';
const PLUS_LITERAL = '\\+';
const QMARK_LITERAL = '\\?';
const SLASH_LITERAL = '\\/';
const ONE_CHAR = '(?=.)';
const QMARK = '[^/]';
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;

const POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};

/**
 * Windows glob regex
 */

const WINDOWS_CHARS = {
  ...POSIX_CHARS,

  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};

/**
 * POSIX Bracket Regex
 */

const POSIX_REGEX_SOURCE = {
  alnum: 'a-zA-Z0-9',
  alpha: 'a-zA-Z',
  ascii: '\\x00-\\x7F',
  blank: ' \\t',
  cntrl: '\\x00-\\x1F\\x7F',
  digit: '0-9',
  graph: '\\x21-\\x7E',
  lower: 'a-z',
  print: '\\x20-\\x7E ',
  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
  space: ' \\t\\r\\n\\v\\f',
  upper: 'A-Z',
  word: 'A-Za-z0-9_',
  xdigit: 'A-Fa-f0-9'
};

module.exports = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE,

  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    '***': '*',
    '**/**': '**',
    '**/**/**': '**'
  },

  // Digits
  CHAR_0: 48, /* 0 */
  CHAR_9: 57, /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 65, /* A */
  CHAR_LOWERCASE_A: 97, /* a */
  CHAR_UPPERCASE_Z: 90, /* Z */
  CHAR_LOWERCASE_Z: 122, /* z */

  CHAR_LEFT_PARENTHESES: 40, /* ( */
  CHAR_RIGHT_PARENTHESES: 41, /* ) */

  CHAR_ASTERISK: 42, /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38, /* & */
  CHAR_AT: 64, /* @ */
  CHAR_BACKWARD_SLASH: 92, /* \ */
  CHAR_CARRIAGE_RETURN: 13, /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
  CHAR_COLON: 58, /* : */
  CHAR_COMMA: 44, /* , */
  CHAR_DOT: 46, /* . */
  CHAR_DOUBLE_QUOTE: 34, /* " */
  CHAR_EQUAL: 61, /* = */
  CHAR_EXCLAMATION_MARK: 33, /* ! */
  CHAR_FORM_FEED: 12, /* \f */
  CHAR_FORWARD_SLASH: 47, /* / */
  CHAR_GRAVE_ACCENT: 96, /* ` */
  CHAR_HASH: 35, /* # */
  CHAR_HYPHEN_MINUS: 45, /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
  CHAR_LEFT_CURLY_BRACE: 123, /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
  CHAR_LINE_FEED: 10, /* \n */
  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
  CHAR_PERCENT: 37, /* % */
  CHAR_PLUS: 43, /* + */
  CHAR_QUESTION_MARK: 63, /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
  CHAR_SEMICOLON: 59, /* ; */
  CHAR_SINGLE_QUOTE: 39, /* ' */
  CHAR_SPACE: 32, /*   */
  CHAR_TAB: 9, /* \t */
  CHAR_UNDERSCORE: 95, /* _ */
  CHAR_VERTICAL_LINE: 124, /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

  SEP: path.sep,

  /**
   * Create EXTGLOB_CHARS
   */

  extglobChars(chars) {
    return {
      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
      '?': { type: 'qmark', open: '(?:', close: ')?' },
      '+': { type: 'plus', open: '(?:', close: ')+' },
      '*': { type: 'star', open: '(?:', close: ')*' },
      '@': { type: 'at', open: '(?:', close: ')' }
    };
  },

  /**
   * Create GLOB_CHARS
   */

  globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};


/***/ }),
/* 78 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const constants = __webpack_require__(77);
const utils = __webpack_require__(76);

/**
 * Constants
 */

const {
  MAX_LENGTH,
  POSIX_REGEX_SOURCE,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants;

/**
 * Helpers
 */

const expandRange = (args, options) => {
  if (typeof options.expandRange === 'function') {
    return options.expandRange(...args, options);
  }

  args.sort();
  const value = `[${args.join('-')}]`;

  try {
    /* eslint-disable-next-line no-new */
    new RegExp(value);
  } catch (ex) {
    return args.map(v => utils.escapeRegex(v)).join('..');
  }

  return value;
};

/**
 * Create the message for a syntax error
 */

const syntaxError = (type, char) => {
  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
};

/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */

const parse = (input, options) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  input = REPLACEMENTS[input] || input;

  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;

  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
  const tokens = [bos];

  const capture = opts.capture ? '' : '?:';
  const win32 = utils.isWindows(options);

  // create constants based on platform, for windows or posix
  const PLATFORM_CHARS = constants.globChars(win32);
  const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);

  const {
    DOT_LITERAL,
    PLUS_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  } = PLATFORM_CHARS;

  const globstar = opts => {
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const nodot = opts.dot ? '' : NO_DOT;
  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
  let star = opts.bash === true ? globstar(opts) : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  // minimatch options support
  if (typeof opts.noext === 'boolean') {
    opts.noextglob = opts.noext;
  }

  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: '',
    output: '',
    prefix: '',
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };

  input = utils.removePrefix(input, state);
  len = input.length;

  const extglobs = [];
  const braces = [];
  const stack = [];
  let prev = bos;
  let value;

  /**
   * Tokenizing helpers
   */

  const eos = () => state.index === len - 1;
  const peek = state.peek = (n = 1) => input[state.index + n];
  const advance = state.advance = () => input[++state.index] || '';
  const remaining = () => input.slice(state.index + 1);
  const consume = (value = '', num = 0) => {
    state.consumed += value;
    state.index += num;
  };

  const append = token => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };

  const negate = () => {
    let count = 1;

    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
      advance();
      state.start++;
      count++;
    }

    if (count % 2 === 0) {
      return false;
    }

    state.negated = true;
    state.start++;
    return true;
  };

  const increment = type => {
    state[type]++;
    stack.push(type);
  };

  const decrement = type => {
    state[type]--;
    stack.pop();
  };

  /**
   * Push tokens onto the tokens array. This helper speeds up
   * tokenizing by 1) helping us avoid backtracking as much as possible,
   * and 2) helping us avoid creating extra tokens when consecutive
   * characters are plain text. This improves performance and simplifies
   * lookbehinds.
   */

  const push = tok => {
    if (prev.type === 'globstar') {
      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = 'star';
        prev.value = '*';
        prev.output = star;
        state.output += prev.output;
      }
    }

    if (extglobs.length && tok.type !== 'paren') {
      extglobs[extglobs.length - 1].inner += tok.value;
    }

    if (tok.value || tok.output) append(tok);
    if (prev && prev.type === 'text' && tok.type === 'text') {
      prev.value += tok.value;
      prev.output = (prev.output || '') + tok.value;
      return;
    }

    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };

  const extglobOpen = (type, value) => {
    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? '(' : '') + token.open;

    increment('parens');
    push({ type, value, output: state.output ? '' : ONE_CHAR });
    push({ type: 'paren', extglob: true, value: advance(), output });
    extglobs.push(token);
  };

  const extglobClose = token => {
    let output = token.close + (opts.capture ? ')' : '');
    let rest;

    if (token.type === 'negate') {
      let extglobStar = star;

      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
        extglobStar = globstar(opts);
      }

      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }

      if (token.inner.includes('*') && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
        // Any non-magical string (`.ts`) or even nested expression (`.{ts,tsx}`) can follow after the closing parenthesis.
        // In this case, we need to parse the string and use it in the output of the original pattern.
        // Suitable patterns: `/!(*.d).ts`, `/!(*.d).{ts,tsx}`, `**/!(*-dbg).@(js)`.
        //
        // Disabling the `fastpaths` option due to a problem with parsing strings as `.ts` in the pattern like `**/!(*.d).ts`.
        const expression = parse(rest, { ...options, fastpaths: false }).output;

        output = token.close = `)${expression})${extglobStar})`;
      }

      if (token.prev.type === 'bos') {
        state.negatedExtglob = true;
      }
    }

    push({ type: 'paren', extglob: true, value, output });
    decrement('parens');
  };

  /**
   * Fast paths
   */

  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;

    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
      if (first === '\\') {
        backslashes = true;
        return m;
      }

      if (first === '?') {
        if (esc) {
          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
        }
        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
        }
        return QMARK.repeat(chars.length);
      }

      if (first === '.') {
        return DOT_LITERAL.repeat(chars.length);
      }

      if (first === '*') {
        if (esc) {
          return esc + first + (rest ? star : '');
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });

    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, '');
      } else {
        output = output.replace(/\\+/g, m => {
          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
        });
      }
    }

    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }

    state.output = utils.wrapOutput(output, state, options);
    return state;
  }

  /**
   * Tokenize input until we reach end-of-string
   */

  while (!eos()) {
    value = advance();

    if (value === '\u0000') {
      continue;
    }

    /**
     * Escaped characters
     */

    if (value === '\\') {
      const next = peek();

      if (next === '/' && opts.bash !== true) {
        continue;
      }

      if (next === '.' || next === ';') {
        continue;
      }

      if (!next) {
        value += '\\';
        push({ type: 'text', value });
        continue;
      }

      // collapse slashes to reduce potential for exploits
      const match = /^\\+/.exec(remaining());
      let slashes = 0;

      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += '\\';
        }
      }

      if (opts.unescape === true) {
        value = advance();
      } else {
        value += advance();
      }

      if (state.brackets === 0) {
        push({ type: 'text', value });
        continue;
      }
    }

    /**
     * If we're inside a regex character class, continue
     * until we reach the closing bracket.
     */

    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
      if (opts.posix !== false && value === ':') {
        const inner = prev.value.slice(1);
        if (inner.includes('[')) {
          prev.posix = true;

          if (inner.includes(':')) {
            const idx = prev.value.lastIndexOf('[');
            const pre = prev.value.slice(0, idx);
            const rest = prev.value.slice(idx + 2);
            const posix = POSIX_REGEX_SOURCE[rest];
            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();

              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR;
              }
              continue;
            }
          }
        }
      }

      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
        value = `\\${value}`;
      }

      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
        value = `\\${value}`;
      }

      if (opts.posix === true && value === '!' && prev.value === '[') {
        value = '^';
      }

      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * If we're inside a quoted string, continue
     * until we reach the closing double quote.
     */

    if (state.quotes === 1 && value !== '"') {
      value = utils.escapeRegex(value);
      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * Double quotes
     */

    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({ type: 'text', value });
      }
      continue;
    }

    /**
     * Parentheses
     */

    if (value === '(') {
      increment('parens');
      push({ type: 'paren', value });
      continue;
    }

    if (value === ')') {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError('opening', '('));
      }

      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }

      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
      decrement('parens');
      continue;
    }

    /**
     * Square brackets
     */

    if (value === '[') {
      if (opts.nobracket === true || !remaining().includes(']')) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('closing', ']'));
        }

        value = `\\${value}`;
      } else {
        increment('brackets');
      }

      push({ type: 'bracket', value });
      continue;
    }

    if (value === ']') {
      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('opening', '['));
        }

        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      decrement('brackets');

      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
        value = `/${value}`;
      }

      prev.value += value;
      append({ value });

      // when literal brackets are explicitly disabled
      // assume we should match with a regex character class
      if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
        continue;
      }

      const escaped = utils.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);

      // when literal brackets are explicitly enabled
      // assume we should escape the brackets to match literal characters
      if (opts.literalBrackets === true) {
        state.output += escaped;
        prev.value = escaped;
        continue;
      }

      // when the user specifies nothing, try to match both
      prev.value = `(${capture}${escaped}|${prev.value})`;
      state.output += prev.value;
      continue;
    }

    /**
     * Braces
     */

    if (value === '{' && opts.nobrace !== true) {
      increment('braces');

      const open = {
        type: 'brace',
        value,
        output: '(',
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };

      braces.push(open);
      push(open);
      continue;
    }

    if (value === '}') {
      const brace = braces[braces.length - 1];

      if (opts.nobrace === true || !brace) {
        push({ type: 'text', value, output: value });
        continue;
      }

      let output = ')';

      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];

        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === 'brace') {
            break;
          }
          if (arr[i].type !== 'dots') {
            range.unshift(arr[i].value);
          }
        }

        output = expandRange(range, opts);
        state.backtrack = true;
      }

      if (brace.comma !== true && brace.dots !== true) {
        const out = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = '\\{';
        value = output = '\\}';
        state.output = out;
        for (const t of toks) {
          state.output += (t.output || t.value);
        }
      }

      push({ type: 'brace', value, output });
      decrement('braces');
      braces.pop();
      continue;
    }

    /**
     * Pipes
     */

    if (value === '|') {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({ type: 'text', value });
      continue;
    }

    /**
     * Commas
     */

    if (value === ',') {
      let output = value;

      const brace = braces[braces.length - 1];
      if (brace && stack[stack.length - 1] === 'braces') {
        brace.comma = true;
        output = '|';
      }

      push({ type: 'comma', value, output });
      continue;
    }

    /**
     * Slashes
     */

    if (value === '/') {
      // if the beginning of the glob is "./", advance the start
      // to the current index, and don't add the "./" characters
      // to the state. This greatly simplifies lookbehinds when
      // checking for BOS characters like "!" and "." (not "./")
      if (prev.type === 'dot' && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = '';
        state.output = '';
        tokens.pop();
        prev = bos; // reset "prev" to the first token
        continue;
      }

      push({ type: 'slash', value, output: SLASH_LITERAL });
      continue;
    }

    /**
     * Dots
     */

    if (value === '.') {
      if (state.braces > 0 && prev.type === 'dot') {
        if (prev.value === '.') prev.output = DOT_LITERAL;
        const brace = braces[braces.length - 1];
        prev.type = 'dots';
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }

      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
        push({ type: 'text', value, output: DOT_LITERAL });
        continue;
      }

      push({ type: 'dot', value, output: DOT_LITERAL });
      continue;
    }

    /**
     * Question marks
     */

    if (value === '?') {
      const isGroup = prev && prev.value === '(';
      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('qmark', value);
        continue;
      }

      if (prev && prev.type === 'paren') {
        const next = peek();
        let output = value;

        if (next === '<' && !utils.supportsLookbehinds()) {
          throw new Error('Node.js v10 or higher is required for regex lookbehinds');
        }

        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
          output = `\\${value}`;
        }

        push({ type: 'text', value, output });
        continue;
      }

      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
        push({ type: 'qmark', value, output: QMARK_NO_DOT });
        continue;
      }

      push({ type: 'qmark', value, output: QMARK });
      continue;
    }

    /**
     * Exclamation
     */

    if (value === '!') {
      if (opts.noextglob !== true && peek() === '(') {
        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
          extglobOpen('negate', value);
          continue;
        }
      }

      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }

    /**
     * Plus
     */

    if (value === '+') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('plus', value);
        continue;
      }

      if ((prev && prev.value === '(') || opts.regex === false) {
        push({ type: 'plus', value, output: PLUS_LITERAL });
        continue;
      }

      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
        push({ type: 'plus', value });
        continue;
      }

      push({ type: 'plus', value: PLUS_LITERAL });
      continue;
    }

    /**
     * Plain text
     */

    if (value === '@') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        push({ type: 'at', extglob: true, value, output: '' });
        continue;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Plain text
     */

    if (value !== '*') {
      if (value === '$' || value === '^') {
        value = `\\${value}`;
      }

      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match) {
        value += match[0];
        state.index += match[0].length;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Stars
     */

    if (prev && (prev.type === 'globstar' || prev.star === true)) {
      prev.type = 'star';
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }

    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen('star', value);
      continue;
    }

    if (prev.type === 'star') {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }

      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === 'slash' || prior.type === 'bos';
      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      // strip consecutive `/**/`
      while (rest.slice(0, 3) === '/**') {
        const after = input[state.index + 4];
        if (after && after !== '/') {
          break;
        }
        rest = rest.slice(3);
        consume('/**', 3);
      }

      if (prior.type === 'bos' && eos()) {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
        const end = rest[1] !== void 0 ? '|$' : '';

        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
        prev.value += value;

        state.output += prior.output + prev.output;
        state.globstar = true;

        consume(value + advance());

        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      if (prior.type === 'bos' && rest[0] === '/') {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      // remove single star from output
      state.output = state.output.slice(0, -prev.output.length);

      // reset previous token to globstar
      prev.type = 'globstar';
      prev.output = globstar(opts);
      prev.value += value;

      // reset output with globstar
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }

    const token = { type: 'star', value, output: star };

    if (opts.bash === true) {
      token.output = '.*?';
      if (prev.type === 'bos' || prev.type === 'slash') {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }

    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }

    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
      if (prev.type === 'dot') {
        state.output += NO_DOT_SLASH;
        prev.output += NO_DOT_SLASH;

      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH;
        prev.output += NO_DOTS_SLASH;

      } else {
        state.output += nodot;
        prev.output += nodot;
      }

      if (peek() !== '*') {
        state.output += ONE_CHAR;
        prev.output += ONE_CHAR;
      }
    }

    push(token);
  }

  while (state.brackets > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
    state.output = utils.escapeLast(state.output, '[');
    decrement('brackets');
  }

  while (state.parens > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
    state.output = utils.escapeLast(state.output, '(');
    decrement('parens');
  }

  while (state.braces > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
    state.output = utils.escapeLast(state.output, '{');
    decrement('braces');
  }

  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
  }

  // rebuild the output if we had to backtrack at any point
  if (state.backtrack === true) {
    state.output = '';

    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;

      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }

  return state;
};

/**
 * Fast paths for creating regular expressions for common glob patterns.
 * This can significantly speed up processing and has very little downside
 * impact when none of the fast paths match.
 */

parse.fastpaths = (input, options) => {
  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  input = REPLACEMENTS[input] || input;
  const win32 = utils.isWindows(options);

  // create constants based on platform, for windows or posix
  const {
    DOT_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOTS_SLASH,
    STAR,
    START_ANCHOR
  } = constants.globChars(win32);

  const nodot = opts.dot ? NO_DOTS : NO_DOT;
  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
  const capture = opts.capture ? '' : '?:';
  const state = { negated: false, prefix: '' };
  let star = opts.bash === true ? '.*?' : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  const globstar = opts => {
    if (opts.noglobstar === true) return star;
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const create = str => {
    switch (str) {
      case '*':
        return `${nodot}${ONE_CHAR}${star}`;

      case '.*':
        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*.*':
        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*/*':
        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

      case '**':
        return nodot + globstar(opts);

      case '**/*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

      case '**/*.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '**/.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

      default: {
        const match = /^(.*?)\.(\w+)$/.exec(str);
        if (!match) return;

        const source = create(match[1]);
        if (!source) return;

        return source + DOT_LITERAL + match[2];
      }
    }
  };

  const output = utils.removePrefix(input, state);
  let source = create(output);

  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL}?`;
  }

  return source;
};

module.exports = parse;


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdExtractLinkDefinitionCodeActionProvider = void 0;
const l10n = __webpack_require__(80);
const lsp = __webpack_require__(25);
const position_1 = __webpack_require__(81);
const range_1 = __webpack_require__(82);
const textDocument_1 = __webpack_require__(83);
const editBuilder_1 = __webpack_require__(85);
const documentLinks_1 = __webpack_require__(86);
const organizeLinkDefs_1 = __webpack_require__(96);
const util_1 = __webpack_require__(97);
class MdExtractLinkDefinitionCodeActionProvider {
    static genericTitle = l10n.t('Extract to link definition');
    static #kind = lsp.CodeActionKind.RefactorExtract + '.linkDefinition';
    static notOnLinkAction = {
        title: MdExtractLinkDefinitionCodeActionProvider.genericTitle,
        kind: MdExtractLinkDefinitionCodeActionProvider.#kind,
        disabled: {
            reason: l10n.t('Not on link'),
        }
    };
    static alreadyRefLinkAction = {
        title: MdExtractLinkDefinitionCodeActionProvider.genericTitle,
        kind: MdExtractLinkDefinitionCodeActionProvider.#kind,
        disabled: {
            reason: l10n.t('Link is already a reference'),
        }
    };
    #linkProvider;
    constructor(linkProvider) {
        this.#linkProvider = linkProvider;
    }
    async getActions(doc, range, context, token) {
        if (!this.#isEnabled(context)) {
            return [];
        }
        const linkInfo = await this.#linkProvider.getLinks(doc);
        if (token.isCancellationRequested) {
            return [];
        }
        const linksInRange = linkInfo.links.filter(link => link.kind !== documentLinks_1.MdLinkKind.Definition && (0, range_1.rangeIntersects)(range, link.source.range));
        if (!linksInRange.length) {
            return [MdExtractLinkDefinitionCodeActionProvider.notOnLinkAction];
        }
        // Sort by range start to get most specific link
        linksInRange.sort((a, b) => (0, position_1.comparePosition)(b.source.range.start, a.source.range.start));
        // Even though multiple links may be in the selection, we only generate an action for the first link we find.
        // Creating actions for every link is overwhelming when users select all in a file
        const targetLink = linksInRange.find(link => link.href.kind === documentLinks_1.HrefKind.External || link.href.kind === documentLinks_1.HrefKind.Internal);
        if (!targetLink) {
            return [MdExtractLinkDefinitionCodeActionProvider.alreadyRefLinkAction];
        }
        return [this.#getExtractLinkAction(doc, linkInfo, targetLink)];
    }
    #isEnabled(context) {
        if (typeof context.only === 'undefined') {
            return true;
        }
        return context.only.some(kind => (0, util_1.codeActionKindContains)(lsp.CodeActionKind.Refactor, kind));
    }
    #getExtractLinkAction(doc, linkInfo, targetLink) {
        const builder = new editBuilder_1.WorkspaceEditBuilder();
        const resource = (0, textDocument_1.getDocUri)(doc);
        const placeholder = this.#getPlaceholder(linkInfo.definitions);
        // Rewrite all inline occurrences of the link
        for (const link of linkInfo.links) {
            if (link.kind === documentLinks_1.MdLinkKind.Link && this.#matchesHref(targetLink.href, link)) {
                builder.replace(resource, link.source.targetRange, `[${placeholder}]`);
            }
        }
        // And append new definition to link definition block
        const definitionText = this.#getLinkTargetText(doc, targetLink).trim();
        const definitions = linkInfo.links.filter(link => link.kind === documentLinks_1.MdLinkKind.Definition);
        const defBlock = (0, organizeLinkDefs_1.getExistingDefinitionBlock)(doc, definitions);
        if (!defBlock) {
            builder.insert(resource, { line: doc.lineCount, character: 0 }, `\n\n[${placeholder}]: ${definitionText}`);
        }
        else {
            const line = (0, textDocument_1.getLine)(doc, defBlock.endLine);
            builder.insert(resource, { line: defBlock.endLine, character: line.length }, `\n[${placeholder}]: ${definitionText}`);
        }
        const renamePosition = (0, position_1.translatePosition)(targetLink.source.targetRange.start, { characterDelta: 1 });
        return {
            title: MdExtractLinkDefinitionCodeActionProvider.genericTitle,
            kind: MdExtractLinkDefinitionCodeActionProvider.#kind,
            edit: builder.getEdit(),
            command: {
                command: 'vscodeMarkdownLanguageservice.rename',
                title: 'Rename',
                arguments: [(0, textDocument_1.getDocUri)(doc), renamePosition],
            }
        };
    }
    #getLinkTargetText(doc, link) {
        const afterHrefRange = (0, range_1.makeRange)((0, position_1.translatePosition)(link.source.targetRange.start, { characterDelta: 1 }), (0, position_1.translatePosition)(link.source.targetRange.end, { characterDelta: -1 }));
        return doc.getText(afterHrefRange);
    }
    #getPlaceholder(definitions) {
        const base = 'def';
        for (let i = 1;; ++i) {
            const name = i === 1 ? base : `${base}${i}`;
            if (typeof definitions.lookup(name) === 'undefined') {
                return name;
            }
        }
    }
    #matchesHref(href, link) {
        if (link.href.kind === documentLinks_1.HrefKind.External && href.kind === documentLinks_1.HrefKind.External) {
            return link.href.uri.toString() === href.uri.toString();
        }
        if (link.href.kind === documentLinks_1.HrefKind.Internal && href.kind === documentLinks_1.HrefKind.Internal) {
            return link.href.path.toString() === href.path.toString() && link.href.fragment === href.fragment;
        }
        return false;
    }
}
exports.MdExtractLinkDefinitionCodeActionProvider = MdExtractLinkDefinitionCodeActionProvider;
//# sourceMappingURL=extractLinkDef.js.map

/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ f),
/* harmony export */   "t": () => (/* binding */ p)
/* harmony export */ });
async function g(r){if(r.protocol==="http"||r.protocol==="https")return await(await fetch(r)).text();throw new Error("Unsupported protocol")}function m(r){throw new Error("Unsupported in browser")}var o;function f(r){if("contents"in r){typeof r.contents=="string"?o=JSON.parse(r.contents):o=r.contents;return}if("fsPath"in r){let n=m(r.fsPath);o=JSON.parse(n);return}if(r.uri){let n=r.uri;return typeof r.uri=="string"&&(n=new URL(r.uri)),g(n).then(t=>{o=JSON.parse(t)})}}function p(...r){let n=r[0],t,e,s;if(typeof n=="string"?(t=n,e=n,r.splice(0,1),s=!r||typeof r[0]!="object"?r:r[0]):(e=n.message,t=e,n.comment&&n.comment.length>0&&(t+=`/${Array.isArray(n.comment)?n.comment.join():n.comment}`),s=n.args??{}),!o)return a(e,s);let i=o[t];return i?typeof i=="string"?a(i,s):i.comment?a(i.message,s):a(e,s):a(e,s)}var u=/{([^}]+)}/g;function a(r,n){return r.replace(u,(t,e)=>n[e]??t)}


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.comparePosition = exports.isAfter = exports.isBeforeOrEqual = exports.isBefore = exports.translatePosition = exports.isPosition = exports.arePositionsEqual = void 0;
function arePositionsEqual(a, b) {
    return a.line === b.line && a.character === b.character;
}
exports.arePositionsEqual = arePositionsEqual;
function isPosition(other) {
    if (!other) {
        return false;
    }
    const { line, character } = other;
    return typeof line === 'number' && typeof character === 'number';
}
exports.isPosition = isPosition;
function translatePosition(pos, change) {
    return {
        line: pos.line + (change.lineDelta ?? 0),
        character: pos.character + (change.characterDelta ?? 0),
    };
}
exports.translatePosition = translatePosition;
function isBefore(pos, other) {
    if (pos.line < other.line) {
        return true;
    }
    if (other.line < pos.line) {
        return false;
    }
    return pos.character < other.character;
}
exports.isBefore = isBefore;
function isBeforeOrEqual(pos, other) {
    if (pos.line < other.line) {
        return true;
    }
    if (other.line < pos.line) {
        return false;
    }
    return pos.character <= other.character;
}
exports.isBeforeOrEqual = isBeforeOrEqual;
function isAfter(pos, other) {
    return !isBeforeOrEqual(pos, other);
}
exports.isAfter = isAfter;
function comparePosition(a, b) {
    if (a.line < b.line) {
        return -1;
    }
    else if (a.line > b.line) {
        return 1;
    }
    else {
        // equal line
        if (a.character < b.character) {
            return -1;
        }
        else if (a.character > b.character) {
            return 1;
        }
        else {
            // equal line and character
            return 0;
        }
    }
}
exports.comparePosition = comparePosition;
//# sourceMappingURL=position.js.map

/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rangeIntersects = exports.rangeContains = exports.modifyRange = exports.areRangesEqual = exports.makeRange = exports.isRange = void 0;
const position_1 = __webpack_require__(81);
function isRange(thing) {
    if (!thing) {
        return false;
    }
    return (0, position_1.isPosition)(thing.start)
        && (0, position_1.isPosition)(thing.end);
}
exports.isRange = isRange;
function makeRange(startOrStartLine, endOrStartCharacter, endLine, endCharacter) {
    if (typeof startOrStartLine === 'number') {
        return {
            start: { line: startOrStartLine, character: endOrStartCharacter },
            end: { line: endLine, character: endCharacter },
        };
    }
    return { start: startOrStartLine, end: endOrStartCharacter };
}
exports.makeRange = makeRange;
function areRangesEqual(a, b) {
    return (0, position_1.arePositionsEqual)(a.start, b.start) && (0, position_1.arePositionsEqual)(a.end, b.end);
}
exports.areRangesEqual = areRangesEqual;
function modifyRange(range, start, end) {
    return {
        start: start ?? range.start,
        end: end ?? range.end,
    };
}
exports.modifyRange = modifyRange;
function rangeContains(range, other) {
    if (isRange(other)) {
        return rangeContains(range, other.start) && rangeContains(range, other.end);
    }
    return !(0, position_1.isBefore)(other, range.start) && !(0, position_1.isBefore)(range.end, other);
}
exports.rangeContains = rangeContains;
function rangeIntersects(a, b) {
    if (rangeContains(a, b.start) || rangeContains(a, b.end)) {
        return true;
    }
    // Check case where `a` is entirely contained in `b`
    return rangeContains(b, a.start) || rangeContains(b, a.end);
}
exports.rangeIntersects = rangeIntersects;
//# sourceMappingURL=range.js.map

/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDocUri = exports.getLine = void 0;
const vscode_uri_1 = __webpack_require__(84);
const range_1 = __webpack_require__(82);
function getLine(doc, line) {
    return doc.getText((0, range_1.makeRange)(line, 0, line, Number.MAX_VALUE)).replace(/\r?\n$/, '');
}
exports.getLine = getLine;
function getDocUri(doc) {
    return doc.$uri ?? vscode_uri_1.URI.parse(doc.uri);
}
exports.getDocUri = getDocUri;
//# sourceMappingURL=textDocument.js.map

/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "Utils": () => (/* binding */ Utils)
/* harmony export */ });
var LIB;(()=>{"use strict";var t={470:t=>{function e(t){if("string"!=typeof t)throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}function r(t,e){for(var r,n="",o=0,i=-1,a=0,h=0;h<=t.length;++h){if(h<t.length)r=t.charCodeAt(h);else{if(47===r)break;r=47}if(47===r){if(i===h-1||1===a);else if(i!==h-1&&2===a){if(n.length<2||2!==o||46!==n.charCodeAt(n.length-1)||46!==n.charCodeAt(n.length-2))if(n.length>2){var s=n.lastIndexOf("/");if(s!==n.length-1){-1===s?(n="",o=0):o=(n=n.slice(0,s)).length-1-n.lastIndexOf("/"),i=h,a=0;continue}}else if(2===n.length||1===n.length){n="",o=0,i=h,a=0;continue}e&&(n.length>0?n+="/..":n="..",o=2)}else n.length>0?n+="/"+t.slice(i+1,h):n=t.slice(i+1,h),o=h-i-1;i=h,a=0}else 46===r&&-1!==a?++a:a=-1}return n}var n={resolve:function(){for(var t,n="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var a;i>=0?a=arguments[i]:(void 0===t&&(t=process.cwd()),a=t),e(a),0!==a.length&&(n=a+"/"+n,o=47===a.charCodeAt(0))}return n=r(n,!o),o?n.length>0?"/"+n:"/":n.length>0?n:"."},normalize:function(t){if(e(t),0===t.length)return".";var n=47===t.charCodeAt(0),o=47===t.charCodeAt(t.length-1);return 0!==(t=r(t,!n)).length||n||(t="."),t.length>0&&o&&(t+="/"),n?"/"+t:t},isAbsolute:function(t){return e(t),t.length>0&&47===t.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var t,r=0;r<arguments.length;++r){var o=arguments[r];e(o),o.length>0&&(void 0===t?t=o:t+="/"+o)}return void 0===t?".":n.normalize(t)},relative:function(t,r){if(e(t),e(r),t===r)return"";if((t=n.resolve(t))===(r=n.resolve(r)))return"";for(var o=1;o<t.length&&47===t.charCodeAt(o);++o);for(var i=t.length,a=i-o,h=1;h<r.length&&47===r.charCodeAt(h);++h);for(var s=r.length-h,c=a<s?a:s,f=-1,u=0;u<=c;++u){if(u===c){if(s>c){if(47===r.charCodeAt(h+u))return r.slice(h+u+1);if(0===u)return r.slice(h+u)}else a>c&&(47===t.charCodeAt(o+u)?f=u:0===u&&(f=0));break}var l=t.charCodeAt(o+u);if(l!==r.charCodeAt(h+u))break;47===l&&(f=u)}var p="";for(u=o+f+1;u<=i;++u)u!==i&&47!==t.charCodeAt(u)||(0===p.length?p+="..":p+="/..");return p.length>0?p+r.slice(h+f):(h+=f,47===r.charCodeAt(h)&&++h,r.slice(h))},_makeLong:function(t){return t},dirname:function(t){if(e(t),0===t.length)return".";for(var r=t.charCodeAt(0),n=47===r,o=-1,i=!0,a=t.length-1;a>=1;--a)if(47===(r=t.charCodeAt(a))){if(!i){o=a;break}}else i=!1;return-1===o?n?"/":".":n&&1===o?"//":t.slice(0,o)},basename:function(t,r){if(void 0!==r&&"string"!=typeof r)throw new TypeError('"ext" argument must be a string');e(t);var n,o=0,i=-1,a=!0;if(void 0!==r&&r.length>0&&r.length<=t.length){if(r.length===t.length&&r===t)return"";var h=r.length-1,s=-1;for(n=t.length-1;n>=0;--n){var c=t.charCodeAt(n);if(47===c){if(!a){o=n+1;break}}else-1===s&&(a=!1,s=n+1),h>=0&&(c===r.charCodeAt(h)?-1==--h&&(i=n):(h=-1,i=s))}return o===i?i=s:-1===i&&(i=t.length),t.slice(o,i)}for(n=t.length-1;n>=0;--n)if(47===t.charCodeAt(n)){if(!a){o=n+1;break}}else-1===i&&(a=!1,i=n+1);return-1===i?"":t.slice(o,i)},extname:function(t){e(t);for(var r=-1,n=0,o=-1,i=!0,a=0,h=t.length-1;h>=0;--h){var s=t.charCodeAt(h);if(47!==s)-1===o&&(i=!1,o=h+1),46===s?-1===r?r=h:1!==a&&(a=1):-1!==r&&(a=-1);else if(!i){n=h+1;break}}return-1===r||-1===o||0===a||1===a&&r===o-1&&r===n+1?"":t.slice(r,o)},format:function(t){if(null===t||"object"!=typeof t)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return function(t,e){var r=e.dir||e.root,n=e.base||(e.name||"")+(e.ext||"");return r?r===e.root?r+n:r+"/"+n:n}(0,t)},parse:function(t){e(t);var r={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return r;var n,o=t.charCodeAt(0),i=47===o;i?(r.root="/",n=1):n=0;for(var a=-1,h=0,s=-1,c=!0,f=t.length-1,u=0;f>=n;--f)if(47!==(o=t.charCodeAt(f)))-1===s&&(c=!1,s=f+1),46===o?-1===a?a=f:1!==u&&(u=1):-1!==a&&(u=-1);else if(!c){h=f+1;break}return-1===a||-1===s||0===u||1===u&&a===s-1&&a===h+1?-1!==s&&(r.base=r.name=0===h&&i?t.slice(1,s):t.slice(h,s)):(0===h&&i?(r.name=t.slice(1,a),r.base=t.slice(1,s)):(r.name=t.slice(h,a),r.base=t.slice(h,s)),r.ext=t.slice(a,s)),h>0?r.dir=t.slice(0,h-1):i&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};n.posix=n,t.exports=n}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};(()=>{var t;if(r.r(n),r.d(n,{URI:()=>p,Utils:()=>_}),"object"==typeof process)t="win32"==="web";else if("object"==typeof navigator){var e=navigator.userAgent;t=e.indexOf("Windows")>=0}var o,i,a=(o=function(t,e){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},o(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),h=/^\w[\w\d+.-]*$/,s=/^\//,c=/^\/\//,f="",u="/",l=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,p=function(){function e(t,e,r,n,o,i){void 0===i&&(i=!1),"object"==typeof t?(this.scheme=t.scheme||f,this.authority=t.authority||f,this.path=t.path||f,this.query=t.query||f,this.fragment=t.fragment||f):(this.scheme=function(t,e){return t||e?t:"file"}(t,i),this.authority=e||f,this.path=function(t,e){switch(t){case"https":case"http":case"file":e?e[0]!==u&&(e=u+e):e=u}return e}(this.scheme,r||f),this.query=n||f,this.fragment=o||f,function(t,e){if(!t.scheme&&e)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(t.authority,'", path: "').concat(t.path,'", query: "').concat(t.query,'", fragment: "').concat(t.fragment,'"}'));if(t.scheme&&!h.test(t.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(t.path)if(t.authority){if(!s.test(t.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(c.test(t.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}(this,i))}return e.isUri=function(t){return t instanceof e||!!t&&"string"==typeof t.authority&&"string"==typeof t.fragment&&"string"==typeof t.path&&"string"==typeof t.query&&"string"==typeof t.scheme&&"string"==typeof t.fsPath&&"function"==typeof t.with&&"function"==typeof t.toString},Object.defineProperty(e.prototype,"fsPath",{get:function(){return b(this,!1)},enumerable:!1,configurable:!0}),e.prototype.with=function(t){if(!t)return this;var e=t.scheme,r=t.authority,n=t.path,o=t.query,i=t.fragment;return void 0===e?e=this.scheme:null===e&&(e=f),void 0===r?r=this.authority:null===r&&(r=f),void 0===n?n=this.path:null===n&&(n=f),void 0===o?o=this.query:null===o&&(o=f),void 0===i?i=this.fragment:null===i&&(i=f),e===this.scheme&&r===this.authority&&n===this.path&&o===this.query&&i===this.fragment?this:new d(e,r,n,o,i)},e.parse=function(t,e){void 0===e&&(e=!1);var r=l.exec(t);return r?new d(r[2]||f,x(r[4]||f),x(r[5]||f),x(r[7]||f),x(r[9]||f),e):new d(f,f,f,f,f)},e.file=function(e){var r=f;if(t&&(e=e.replace(/\\/g,u)),e[0]===u&&e[1]===u){var n=e.indexOf(u,2);-1===n?(r=e.substring(2),e=u):(r=e.substring(2,n),e=e.substring(n)||u)}return new d("file",r,e,f,f)},e.from=function(t){return new d(t.scheme,t.authority,t.path,t.query,t.fragment)},e.prototype.toString=function(t){return void 0===t&&(t=!1),C(this,t)},e.prototype.toJSON=function(){return this},e.revive=function(t){if(t){if(t instanceof e)return t;var r=new d(t);return r._formatted=t.external,r._fsPath=t._sep===g?t.fsPath:null,r}return t},e}(),g=t?1:void 0,d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._formatted=null,e._fsPath=null,e}return a(e,t),Object.defineProperty(e.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=b(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),e.prototype.toString=function(t){return void 0===t&&(t=!1),t?C(this,!0):(this._formatted||(this._formatted=C(this,!1)),this._formatted)},e.prototype.toJSON=function(){var t={$mid:1};return this._fsPath&&(t.fsPath=this._fsPath,t._sep=g),this._formatted&&(t.external=this._formatted),this.path&&(t.path=this.path),this.scheme&&(t.scheme=this.scheme),this.authority&&(t.authority=this.authority),this.query&&(t.query=this.query),this.fragment&&(t.fragment=this.fragment),t},e}(p),v=((i={})[58]="%3A",i[47]="%2F",i[63]="%3F",i[35]="%23",i[91]="%5B",i[93]="%5D",i[64]="%40",i[33]="%21",i[36]="%24",i[38]="%26",i[39]="%27",i[40]="%28",i[41]="%29",i[42]="%2A",i[43]="%2B",i[44]="%2C",i[59]="%3B",i[61]="%3D",i[32]="%20",i);function y(t,e){for(var r=void 0,n=-1,o=0;o<t.length;o++){var i=t.charCodeAt(o);if(i>=97&&i<=122||i>=65&&i<=90||i>=48&&i<=57||45===i||46===i||95===i||126===i||e&&47===i)-1!==n&&(r+=encodeURIComponent(t.substring(n,o)),n=-1),void 0!==r&&(r+=t.charAt(o));else{void 0===r&&(r=t.substr(0,o));var a=v[i];void 0!==a?(-1!==n&&(r+=encodeURIComponent(t.substring(n,o)),n=-1),r+=a):-1===n&&(n=o)}}return-1!==n&&(r+=encodeURIComponent(t.substring(n))),void 0!==r?r:t}function m(t){for(var e=void 0,r=0;r<t.length;r++){var n=t.charCodeAt(r);35===n||63===n?(void 0===e&&(e=t.substr(0,r)),e+=v[n]):void 0!==e&&(e+=t[r])}return void 0!==e?e:t}function b(e,r){var n;return n=e.authority&&e.path.length>1&&"file"===e.scheme?"//".concat(e.authority).concat(e.path):47===e.path.charCodeAt(0)&&(e.path.charCodeAt(1)>=65&&e.path.charCodeAt(1)<=90||e.path.charCodeAt(1)>=97&&e.path.charCodeAt(1)<=122)&&58===e.path.charCodeAt(2)?r?e.path.substr(1):e.path[1].toLowerCase()+e.path.substr(2):e.path,t&&(n=n.replace(/\//g,"\\")),n}function C(t,e){var r=e?m:y,n="",o=t.scheme,i=t.authority,a=t.path,h=t.query,s=t.fragment;if(o&&(n+=o,n+=":"),(i||"file"===o)&&(n+=u,n+=u),i){var c=i.indexOf("@");if(-1!==c){var f=i.substr(0,c);i=i.substr(c+1),-1===(c=f.indexOf(":"))?n+=r(f,!1):(n+=r(f.substr(0,c),!1),n+=":",n+=r(f.substr(c+1),!1)),n+="@"}-1===(c=(i=i.toLowerCase()).indexOf(":"))?n+=r(i,!1):(n+=r(i.substr(0,c),!1),n+=i.substr(c))}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2))(l=a.charCodeAt(1))>=65&&l<=90&&(a="/".concat(String.fromCharCode(l+32),":").concat(a.substr(3)));else if(a.length>=2&&58===a.charCodeAt(1)){var l;(l=a.charCodeAt(0))>=65&&l<=90&&(a="".concat(String.fromCharCode(l+32),":").concat(a.substr(2)))}n+=r(a,!0)}return h&&(n+="?",n+=r(h,!1)),s&&(n+="#",n+=e?s:y(s,!1)),n}function A(t){try{return decodeURIComponent(t)}catch(e){return t.length>3?t.substr(0,3)+A(t.substr(3)):t}}var w=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function x(t){return t.match(w)?t.replace(w,(function(t){return A(t)})):t}var _,O=r(470),P=function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))},j=O.posix||O,U="/";!function(t){t.joinPath=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return t.with({path:j.join.apply(j,P([t.path],e,!1))})},t.resolvePath=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];var n=t.path,o=!1;n[0]!==U&&(n=U+n,o=!0);var i=j.resolve.apply(j,P([n],e,!1));return o&&i[0]===U&&!t.authority&&(i=i.substring(1)),t.with({path:i})},t.dirname=function(t){if(0===t.path.length||t.path===U)return t;var e=j.dirname(t.path);return 1===e.length&&46===e.charCodeAt(0)&&(e=""),t.with({path:e})},t.basename=function(t){return j.basename(t.path)},t.extname=function(t){return j.extname(t.path)}}(_||(_={}))})(),LIB=n})();const{URI,Utils}=LIB;
//# sourceMappingURL=index.js.map

/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkspaceEditBuilder = void 0;
const lsp = __webpack_require__(25);
class WorkspaceEditBuilder {
    #changes = {};
    #documentChanges = [];
    replace(resource, range, newText) {
        this.#addEdit(resource, lsp.TextEdit.replace(range, newText));
    }
    insert(resource, position, newText) {
        this.#addEdit(resource, lsp.TextEdit.insert(position, newText));
    }
    #addEdit(resource, edit) {
        const resourceKey = resource.toString();
        let edits = this.#changes[resourceKey];
        if (!edits) {
            edits = [];
            this.#changes[resourceKey] = edits;
        }
        edits.push(edit);
    }
    getEdit() {
        // We need to convert changes into `documentChanges` or else they get dropped
        const textualChanges = Object.entries(this.#changes).map(([uri, edits]) => {
            return lsp.TextDocumentEdit.create({ uri, version: null }, edits);
        });
        return {
            documentChanges: [...textualChanges, ...this.#documentChanges],
        };
    }
    renameFile(targetUri, resolvedNewFilePath) {
        this.#documentChanges.push(lsp.RenameFile.create(targetUri.toString(), resolvedNewFilePath.toString()));
    }
}
exports.WorkspaceEditBuilder = WorkspaceEditBuilder;
//# sourceMappingURL=editBuilder.js.map

/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.looksLikeLinkToResource = exports.createWorkspaceLinkCache = exports.parseLocationInfoFromFragment = exports.MdLinkProvider = exports.LinkDefinitionSet = exports.ReferenceLinkMap = exports.MdLinkComputer = exports.MdLinkKind = exports.resolveInternalDocumentLink = exports.HrefKind = void 0;
const l10n = __webpack_require__(80);
const vscode_uri_1 = __webpack_require__(84);
const logging_1 = __webpack_require__(87);
const position_1 = __webpack_require__(81);
const range_1 = __webpack_require__(82);
const textDocument_1 = __webpack_require__(83);
const arrays_1 = __webpack_require__(88);
const dispose_1 = __webpack_require__(89);
const string_1 = __webpack_require__(90);
const uri_1 = __webpack_require__(91);
const workspace_1 = __webpack_require__(92);
const workspaceCache_1 = __webpack_require__(93);
var HrefKind;
(function (HrefKind) {
    HrefKind[HrefKind["External"] = 0] = "External";
    HrefKind[HrefKind["Internal"] = 1] = "Internal";
    HrefKind[HrefKind["Reference"] = 2] = "Reference";
})(HrefKind = exports.HrefKind || (exports.HrefKind = {}));
function resolveInternalDocumentLink(sourceDocUri, linkText, workspace) {
    // Assume it must be an relative or absolute file path
    // Use a fake scheme to avoid parse warnings
    const tempUri = vscode_uri_1.URI.parse(`vscode-resource:${linkText}`);
    const docUri = workspace.getContainingDocument?.(sourceDocUri)?.uri ?? sourceDocUri;
    let resourceUri;
    if (!tempUri.path) {
        // Looks like a fragment only link
        if (typeof tempUri.fragment !== 'string') {
            return undefined;
        }
        resourceUri = sourceDocUri;
    }
    else if (tempUri.path[0] === '/') {
        const root = (0, workspace_1.getWorkspaceFolder)(workspace, docUri);
        if (root) {
            resourceUri = vscode_uri_1.Utils.joinPath(root, tempUri.path);
        }
    }
    else {
        if (docUri.scheme === 'untitled') {
            const root = (0, workspace_1.getWorkspaceFolder)(workspace, docUri);
            if (root) {
                resourceUri = vscode_uri_1.Utils.joinPath(root, tempUri.path);
            }
        }
        else {
            const base = vscode_uri_1.Utils.dirname(docUri);
            resourceUri = vscode_uri_1.Utils.joinPath(base, tempUri.path);
        }
    }
    if (!resourceUri) {
        return undefined;
    }
    return {
        resource: resourceUri,
        linkFragment: tempUri.fragment,
    };
}
exports.resolveInternalDocumentLink = resolveInternalDocumentLink;
var MdLinkKind;
(function (MdLinkKind) {
    MdLinkKind[MdLinkKind["Link"] = 1] = "Link";
    MdLinkKind[MdLinkKind["Definition"] = 2] = "Definition";
})(MdLinkKind = exports.MdLinkKind || (exports.MdLinkKind = {}));
function createHref(sourceDocUri, link, workspace) {
    if (/^[a-z\-][a-z\-]+:/i.test(link)) {
        // Looks like a uri
        return { kind: HrefKind.External, uri: vscode_uri_1.URI.parse((0, uri_1.tryDecodeUri)(link)) };
    }
    const resolved = resolveInternalDocumentLink(sourceDocUri, link, workspace);
    if (!resolved) {
        return undefined;
    }
    return {
        kind: HrefKind.Internal,
        path: resolved.resource,
        fragment: resolved.linkFragment,
    };
}
function createMdLink(document, targetText, preHrefText, rawLink, matchIndex, fullMatch, workspace) {
    const isAngleBracketLink = rawLink.startsWith('<');
    const link = stripAngleBrackets(rawLink);
    let linkTarget;
    try {
        linkTarget = createHref((0, textDocument_1.getDocUri)(document), link, workspace);
    }
    catch {
        return undefined;
    }
    if (!linkTarget) {
        return undefined;
    }
    const pre = targetText + preHrefText;
    const linkStart = document.positionAt(matchIndex);
    const linkEnd = (0, position_1.translatePosition)(linkStart, { characterDelta: fullMatch.length });
    const targetStart = (0, position_1.translatePosition)(linkStart, { characterDelta: targetText.length });
    const targetRange = { start: targetStart, end: linkEnd };
    const hrefStart = (0, position_1.translatePosition)(linkStart, { characterDelta: pre.length + (isAngleBracketLink ? 1 : 0) });
    const hrefEnd = (0, position_1.translatePosition)(hrefStart, { characterDelta: link.length });
    const hrefRange = { start: hrefStart, end: hrefEnd };
    return {
        kind: MdLinkKind.Link,
        href: linkTarget,
        source: {
            hrefText: link,
            resource: (0, textDocument_1.getDocUri)(document),
            range: { start: linkStart, end: linkEnd },
            targetRange,
            hrefRange,
            ...getLinkSourceFragmentInfo(document, link, hrefStart, hrefEnd),
        }
    };
}
function getFragmentRange(text, start, end) {
    const index = text.indexOf('#');
    if (index < 0) {
        return undefined;
    }
    return { start: (0, position_1.translatePosition)(start, { characterDelta: index + 1 }), end };
}
function getLinkSourceFragmentInfo(document, link, linkStart, linkEnd) {
    const fragmentRange = getFragmentRange(link, linkStart, linkEnd);
    return {
        pathText: document.getText({ start: linkStart, end: fragmentRange ? (0, position_1.translatePosition)(fragmentRange.start, { characterDelta: -1 }) : linkEnd }),
        fragmentRange,
    };
}
const angleBracketLinkRe = /^<(.*)>$/;
/**
 * Used to strip brackets from the markdown link
 *
 * <http://example.com> will be transformed to http://example.com
*/
function stripAngleBrackets(link) {
    return link.replace(angleBracketLinkRe, '$1');
}
/**
 * Matches `[text](link)` or `[text](<link>)`
 */
const linkPattern = new RegExp(
// text
(0, string_1.r) `(!?\[` + // open prefix match -->
    /**/ (0, string_1.r) `(?:` +
    /*****/ (0, string_1.r) `[^\[\]\\]|` + // Non-bracket chars, or...
    /*****/ (0, string_1.r) `\\.|` + // Escaped char, or...
    /*****/ (0, string_1.r) `\[[^\[\]]*\]` + // Matched bracket pair
    /**/ (0, string_1.r) `)*` +
    (0, string_1.r) `\])` + // <-- close prefix match
    // Destination
    (0, string_1.r) `(\(\s*)` + // Pre href
    /**/ (0, string_1.r) `(` +
    /*****/ (0, string_1.r) `[^\s\(\)\<](?:[^\s\(\)]|\([^\s\(\)]*?\))*|` + // Link without whitespace, or...
    /*****/ (0, string_1.r) `<[^<>]+>` + // In angle brackets
    /**/ (0, string_1.r) `)` +
    // Title
    /**/ (0, string_1.r) `\s*(?:"[^"]*"|'[^']*'|\([^\(\)]*\))?\s*` +
    (0, string_1.r) `\)`, 'g');
/**
* Matches `[text][ref]` or `[shorthand]` or `[shorthand][]`
*/
const referenceLinkPattern = new RegExp((0, string_1.r) `(^|[^\]\\])` + // Must not start with another bracket (workaround for lack of support for negative look behinds)
    (0, string_1.r) `(?:` +
    /**/ (0, string_1.r) `(?:` +
    /****/ (0, string_1.r) `(` + // Start link prefix
    /******/ (0, string_1.r) `!?` + // Optional image ref
    /******/ (0, string_1.r) `\[((?:` + // Link text
    /********/ (0, string_1.r) `\\\]|` + // escaped bracket, or...
    /********/ (0, string_1.r) `[^\[\]]|` + //non bracket char, or...
    /********/ (0, string_1.r) `\[[^\[\]]*\]` + // matched bracket pair
    /******/ `+)*)\]` + // end link  text
    /******/ (0, string_1.r) `\[\s*?` + // Start of link def
    /****/ (0, string_1.r) `)` + // end link prefix
    /****/ (0, string_1.r) `(` +
    /******/ (0, string_1.r) `[^\]]*?)\]` + //link def
    /******/ (0, string_1.r) `|` +
    /******/ (0, string_1.r) `\[\s*?([^\\\]]*?)\s*\])(?![\(])` +
    (0, string_1.r) `)`, 'gm');
/**
 * Matches `<http://example.com>`
 */
const autoLinkPattern = /\<(\w+:[^\>\s]+)\>/g;
/**
 * Matches `[text]: link`
 */
const definitionPattern = /^([\t ]*\[(?!\^)((?:\\\]|[^\]])+)\]:\s*)([^<]\S*|<[^>]+>)/gm;
const inlineCodePattern = /(^|[^`])(`+)((?:.+?|.*?(?:(?:\r?\n).+?)*?)(?:\r?\n)?\2)(?:$|[^`])/gm;
class NoLinkRanges {
    multiline;
    inline;
    static #empty = new NoLinkRanges([], new Map());
    static async compute(tokenizer, document, token) {
        const tokens = await tokenizer.tokenize(document);
        if (token.isCancellationRequested) {
            return NoLinkRanges.#empty;
        }
        const multiline = tokens.filter(t => (t.type === 'code_block' || t.type === 'fence' || t.type === 'html_block') && !!t.map).map(t => t.map);
        const inlineRanges = new Map();
        const text = document.getText();
        for (const match of text.matchAll(inlineCodePattern)) {
            const startOffset = (match.index ?? 0) + match[1].length;
            const startPosition = document.positionAt(startOffset);
            const range = { start: startPosition, end: document.positionAt(startOffset + match[3].length) };
            for (let line = range.start.line; line <= range.end.line; ++line) {
                let entry = inlineRanges.get(line);
                if (!entry) {
                    entry = [];
                    inlineRanges.set(line, entry);
                }
                entry.push(range);
            }
        }
        return new NoLinkRanges(multiline, inlineRanges);
    }
    constructor(
    /**
     * code blocks and fences each represented by [line_start,line_end).
     */
    multiline, 
    /**
     * Inline code spans where links should not be detected
     */
    inline) {
        this.multiline = multiline;
        this.inline = inline;
    }
    contains(position) {
        return this.multiline.some(interval => position.line >= interval[0] && position.line < interval[1]) ||
            !!this.inline.get(position.line)?.some(inlineRange => (0, range_1.rangeContains)(inlineRange, position));
    }
    concatInline(inlineRanges) {
        const newInline = new Map(this.inline);
        for (const range of inlineRanges) {
            for (let line = range.start.line; line <= range.end.line; ++line) {
                let entry = newInline.get(line);
                if (!entry) {
                    entry = [];
                    newInline.set(line, entry);
                }
                entry.push(range);
            }
        }
        return new NoLinkRanges(this.multiline, newInline);
    }
}
/**
 * Stateless object that extracts link information from markdown files.
 */
class MdLinkComputer {
    #tokenizer;
    #workspace;
    constructor(tokenizer, workspace) {
        this.#tokenizer = tokenizer;
        this.#workspace = workspace;
    }
    async getAllLinks(document, token) {
        const noLinkRanges = await NoLinkRanges.compute(this.#tokenizer, document, token);
        if (token.isCancellationRequested) {
            return [];
        }
        const inlineLinks = Array.from(this.#getInlineLinks(document, noLinkRanges));
        return [
            ...inlineLinks,
            ...this.#getReferenceLinks(document, noLinkRanges.concatInline(inlineLinks.map(x => x.source.range))),
            ...this.#getLinkDefinitions(document, noLinkRanges),
            ...this.#getAutoLinks(document, noLinkRanges),
        ];
    }
    *#getInlineLinks(document, noLinkRanges) {
        const text = document.getText();
        for (const match of text.matchAll(linkPattern)) {
            const linkTextIncludingBrackets = match[1];
            const matchLinkData = createMdLink(document, linkTextIncludingBrackets, match[2], match[3], match.index ?? 0, match[0], this.#workspace);
            if (matchLinkData && !noLinkRanges.contains(matchLinkData.source.hrefRange.start)) {
                yield matchLinkData;
                // Also check for images in link text
                if (/\![\[\(]/.test(linkTextIncludingBrackets)) {
                    const linkText = linkTextIncludingBrackets.slice(1, -1);
                    const startOffset = (match.index ?? 0) + 1;
                    for (const innerMatch of linkText.matchAll(linkPattern)) {
                        const innerData = createMdLink(document, innerMatch[1], innerMatch[2], innerMatch[3], startOffset + (innerMatch.index ?? 0), innerMatch[0], this.#workspace);
                        if (innerData) {
                            yield innerData;
                        }
                    }
                    yield* this.#getReferenceLinksInText(document, linkText, startOffset, noLinkRanges);
                }
            }
        }
    }
    *#getAutoLinks(document, noLinkRanges) {
        const text = document.getText();
        const docUri = (0, textDocument_1.getDocUri)(document);
        for (const match of text.matchAll(autoLinkPattern)) {
            const linkOffset = (match.index ?? 0);
            const linkStart = document.positionAt(linkOffset);
            if (noLinkRanges.contains(linkStart)) {
                continue;
            }
            const link = match[1];
            const linkTarget = createHref(docUri, link, this.#workspace);
            if (!linkTarget) {
                continue;
            }
            const linkEnd = (0, position_1.translatePosition)(linkStart, { characterDelta: match[0].length });
            const hrefStart = (0, position_1.translatePosition)(linkStart, { characterDelta: 1 });
            const hrefEnd = (0, position_1.translatePosition)(hrefStart, { characterDelta: link.length });
            const hrefRange = { start: hrefStart, end: hrefEnd };
            yield {
                kind: MdLinkKind.Link,
                href: linkTarget,
                source: {
                    hrefText: link,
                    resource: docUri,
                    targetRange: hrefRange,
                    hrefRange: hrefRange,
                    range: { start: linkStart, end: linkEnd },
                    ...getLinkSourceFragmentInfo(document, link, hrefStart, hrefEnd),
                }
            };
        }
    }
    #getReferenceLinks(document, noLinkRanges) {
        const text = document.getText();
        return this.#getReferenceLinksInText(document, text, 0, noLinkRanges);
    }
    *#getReferenceLinksInText(document, text, startingOffset, noLinkRanges) {
        for (const match of text.matchAll(referenceLinkPattern)) {
            const linkStartOffset = startingOffset + (match.index ?? 0) + match[1].length;
            const linkStart = document.positionAt(linkStartOffset);
            if (noLinkRanges.contains(linkStart)) {
                continue;
            }
            let hrefStart;
            let hrefEnd;
            let reference = match[4];
            if (reference === '') { // [ref][],
                reference = match[3];
                if (!reference) {
                    continue;
                }
                const offset = linkStartOffset + 1;
                hrefStart = document.positionAt(offset);
                hrefEnd = document.positionAt(offset + reference.length);
            }
            else if (reference) { // [text][ref]
                const text = match[3];
                if (!text) {
                    // Handle the case ![][cat]
                    if (!match[0].startsWith('!')) {
                        // Empty links are not valid
                        continue;
                    }
                }
                if (!match[0].startsWith('!')) {
                    // Also get links in text
                    yield* this.#getReferenceLinksInText(document, match[3], linkStartOffset + 1, noLinkRanges);
                }
                const pre = match[2];
                const offset = linkStartOffset + pre.length;
                hrefStart = document.positionAt(offset);
                hrefEnd = document.positionAt(offset + reference.length);
            }
            else if (match[5]) { // [ref]
                reference = match[5];
                const offset = linkStartOffset + 1;
                hrefStart = document.positionAt(offset);
                const line = (0, textDocument_1.getLine)(document, hrefStart.line);
                // See if link looks like link definition
                if (linkStart.character === 0 && line[match[0].length - match[1].length] === ':') {
                    continue;
                }
                // See if link looks like a checkbox
                const checkboxMatch = line.match(/^\s*[\-\*]\s*\[x\]/i);
                if (checkboxMatch && hrefStart.character <= checkboxMatch[0].length) {
                    continue;
                }
                hrefEnd = document.positionAt(offset + reference.length);
            }
            else {
                continue;
            }
            const linkEnd = (0, position_1.translatePosition)(linkStart, { characterDelta: match[0].length - match[1].length });
            const hrefRange = { start: hrefStart, end: hrefEnd };
            yield {
                kind: MdLinkKind.Link,
                source: {
                    hrefText: reference,
                    pathText: reference,
                    resource: (0, textDocument_1.getDocUri)(document),
                    range: { start: linkStart, end: linkEnd },
                    targetRange: hrefRange,
                    hrefRange: hrefRange,
                    fragmentRange: undefined,
                },
                href: {
                    kind: HrefKind.Reference,
                    ref: reference,
                }
            };
        }
    }
    *#getLinkDefinitions(document, noLinkRanges) {
        const text = document.getText();
        const docUri = (0, textDocument_1.getDocUri)(document);
        for (const match of text.matchAll(definitionPattern)) {
            const offset = (match.index ?? 0);
            const linkStart = document.positionAt(offset);
            if (noLinkRanges.contains(linkStart)) {
                continue;
            }
            const pre = match[1];
            const reference = match[2];
            const rawLinkText = match[3].trim();
            const isAngleBracketLink = angleBracketLinkRe.test(rawLinkText);
            const linkText = stripAngleBrackets(rawLinkText);
            const target = createHref(docUri, linkText, this.#workspace);
            if (!target) {
                continue;
            }
            const hrefStart = (0, position_1.translatePosition)(linkStart, { characterDelta: pre.length + (isAngleBracketLink ? 1 : 0) });
            const hrefEnd = (0, position_1.translatePosition)(hrefStart, { characterDelta: linkText.length });
            const hrefRange = { start: hrefStart, end: hrefEnd };
            const refStart = (0, position_1.translatePosition)(linkStart, { characterDelta: 1 });
            const refRange = { start: refStart, end: (0, position_1.translatePosition)(refStart, { characterDelta: reference.length }) };
            const line = (0, textDocument_1.getLine)(document, linkStart.line);
            const linkEnd = (0, position_1.translatePosition)(linkStart, { characterDelta: line.length });
            yield {
                kind: MdLinkKind.Definition,
                source: {
                    hrefText: linkText,
                    resource: docUri,
                    range: { start: linkStart, end: linkEnd },
                    targetRange: hrefRange,
                    hrefRange,
                    ...getLinkSourceFragmentInfo(document, rawLinkText, hrefStart, hrefEnd),
                },
                ref: { text: reference, range: refRange },
                href: target,
            };
        }
    }
}
exports.MdLinkComputer = MdLinkComputer;
class ReferenceLinkMap {
    #map = new Map();
    set(ref, link) {
        this.#map.set(this.#normalizeRefName(ref), link);
    }
    lookup(ref) {
        return this.#map.get(this.#normalizeRefName(ref));
    }
    has(ref) {
        return this.#map.has(this.#normalizeRefName(ref));
    }
    [Symbol.iterator]() {
        return this.#map.values();
    }
    /**
     * Normalizes a link reference. Link references are case-insensitive, so this lowercases the reference too so you can
     * correctly compare two normalized references.
     */
    #normalizeRefName(ref) {
        return ref.normalize().trim().toLowerCase();
    }
}
exports.ReferenceLinkMap = ReferenceLinkMap;
class LinkDefinitionSet {
    #map = new ReferenceLinkMap();
    constructor(links) {
        for (const link of links) {
            if (link.kind === MdLinkKind.Definition) {
                if (!this.#map.has(link.ref.text)) {
                    this.#map.set(link.ref.text, link);
                }
            }
        }
    }
    [Symbol.iterator]() {
        return this.#map[Symbol.iterator]();
    }
    lookup(ref) {
        return this.#map.lookup(ref);
    }
}
exports.LinkDefinitionSet = LinkDefinitionSet;
/**
 * Stateful object which provides links for markdown files the workspace.
 */
class MdLinkProvider extends dispose_1.Disposable {
    #linkCache;
    #linkComputer;
    #config;
    #workspace;
    #tocProvider;
    constructor(config, tokenizer, workspace, tocProvider, logger) {
        super();
        this.#config = config;
        this.#workspace = workspace;
        this.#tocProvider = tocProvider;
        this.#linkComputer = new MdLinkComputer(tokenizer, this.#workspace);
        this.#linkCache = this._register(new workspaceCache_1.MdDocumentInfoCache(this.#workspace, async (doc, token) => {
            logger.log(logging_1.LogLevel.Debug, 'LinkProvider.compute', { document: doc.uri, version: doc.version });
            const links = await this.#linkComputer.getAllLinks(doc, token);
            return {
                links,
                definitions: new LinkDefinitionSet(links),
            };
        }));
    }
    getLinks(document) {
        return this.#linkCache.getForDocument(document);
    }
    async provideDocumentLinks(document, token) {
        const { links, definitions } = await this.getLinks(document);
        if (token.isCancellationRequested) {
            return [];
        }
        return (0, arrays_1.coalesce)(links.map(data => this.#toValidDocumentLink(data, definitions)));
    }
    async resolveDocumentLink(link, token) {
        const href = this.#reviveLinkHrefData(link);
        if (!href) {
            return undefined;
        }
        const target = await this.#resolveInternalLinkTarget(href.path, href.fragment, token);
        switch (target.kind) {
            case 'folder':
                link.target = this.#createCommandUri('revealInExplorer', href.path);
                break;
            case 'external':
                link.target = target.uri.toString(true);
                break;
            case 'file':
                if (target.position) {
                    link.target = this.#createOpenAtPosCommand(target.uri, target.position);
                }
                else {
                    link.target = target.uri.toString(true);
                }
                break;
        }
        return link;
    }
    async resolveLinkTarget(linkText, sourceDoc, token) {
        const href = createHref(sourceDoc, linkText, this.#workspace);
        if (href?.kind !== HrefKind.Internal) {
            return undefined;
        }
        const resolved = resolveInternalDocumentLink(sourceDoc, linkText, this.#workspace);
        if (!resolved) {
            return undefined;
        }
        return this.#resolveInternalLinkTarget(resolved.resource, resolved.linkFragment, token);
    }
    async #resolveInternalLinkTarget(linkPath, linkFragment, token) {
        let target = linkPath;
        // If there's a containing document, don't bother with trying to resolve the
        // link to a workspace file as one will not exist
        const containingContext = this.#workspace.getContainingDocument?.(target);
        if (!containingContext) {
            const stat = await this.#workspace.stat(target);
            if (stat?.isDirectory) {
                return { kind: 'folder', uri: target };
            }
            if (token.isCancellationRequested) {
                return { kind: 'folder', uri: target };
            }
            if (!stat) {
                // We don't think the file exists. If it doesn't already have an extension, try tacking on a `.md` and using that instead
                let found = false;
                const dotMdResource = (0, workspace_1.tryAppendMarkdownFileExtension)(this.#config, target);
                if (dotMdResource) {
                    if (await this.#workspace.stat(dotMdResource)) {
                        target = dotMdResource;
                        found = true;
                    }
                }
                if (!found) {
                    return { kind: 'file', uri: target };
                }
            }
        }
        if (!linkFragment) {
            return { kind: 'file', uri: target };
        }
        // Try navigating with fragment that sets line number
        const locationLinkPosition = parseLocationInfoFromFragment(linkFragment);
        if (locationLinkPosition) {
            return { kind: 'file', uri: target, position: locationLinkPosition };
        }
        // Try navigating to header in file
        const doc = await this.#workspace.openMarkdownDocument(target);
        if (token.isCancellationRequested) {
            return { kind: 'file', uri: target };
        }
        if (doc) {
            const toc = await this.#tocProvider.getForContainingDoc(doc, token);
            const entry = toc.lookup(linkFragment);
            if (entry) {
                return { kind: 'file', uri: vscode_uri_1.URI.parse(entry.headerLocation.uri), position: entry.headerLocation.range.start, fragment: linkFragment };
            }
        }
        return { kind: 'file', uri: target };
    }
    #reviveLinkHrefData(link) {
        if (!link.data) {
            return undefined;
        }
        const mdLink = link.data;
        if (mdLink.href.kind !== HrefKind.Internal) {
            return undefined;
        }
        return { path: vscode_uri_1.URI.from(mdLink.href.path), fragment: mdLink.href.fragment };
    }
    #toValidDocumentLink(link, definitionSet) {
        switch (link.href.kind) {
            case HrefKind.External: {
                return {
                    range: link.source.hrefRange,
                    target: link.href.uri.toString(true),
                };
            }
            case HrefKind.Internal: {
                return {
                    range: link.source.hrefRange,
                    target: undefined,
                    tooltip: l10n.t('Follow link'),
                    data: link,
                };
            }
            case HrefKind.Reference: {
                // We only render reference links in the editor if they are actually defined.
                // This matches how reference links are rendered by markdown-it.
                const def = definitionSet.lookup(link.href.ref);
                if (!def) {
                    return undefined;
                }
                const target = this.#createOpenAtPosCommand(link.source.resource, def.source.hrefRange.start);
                return {
                    range: link.source.hrefRange,
                    tooltip: l10n.t('Go to link definition'),
                    target: target,
                    data: link
                };
            }
        }
    }
    #createCommandUri(command, ...args) {
        return `command:${command}?${encodeURIComponent(JSON.stringify(args))}`;
    }
    #createOpenAtPosCommand(resource, pos) {
        // If the resource itself already has a fragment, we need to handle opening specially 
        // instead of using `file://path.md#L123` style uris
        if (resource.fragment) {
            // Match the args of `vscode.open`
            return this.#createCommandUri('vscodeMarkdownLanguageservice.open', resource, {
                selection: (0, range_1.makeRange)(pos, pos),
            });
        }
        return resource.with({
            fragment: `L${pos.line + 1},${pos.character + 1}`
        }).toString(true);
    }
}
exports.MdLinkProvider = MdLinkProvider;
/**
 * Extract position info from link fragments that look like `#L5,3`
 */
function parseLocationInfoFromFragment(fragment) {
    const match = fragment.match(/^L(\d+)(?:,(\d+))?$/i);
    if (!match) {
        return undefined;
    }
    const line = +match[1] - 1;
    if (isNaN(line)) {
        return undefined;
    }
    const column = +match[2] - 1;
    return { line, character: isNaN(column) ? 0 : column };
}
exports.parseLocationInfoFromFragment = parseLocationInfoFromFragment;
function createWorkspaceLinkCache(parser, workspace) {
    const linkComputer = new MdLinkComputer(parser, workspace);
    return new workspaceCache_1.MdWorkspaceInfoCache(workspace, (doc, token) => linkComputer.getAllLinks(doc, token));
}
exports.createWorkspaceLinkCache = createWorkspaceLinkCache;
function looksLikeLinkToResource(configuration, href, targetResource) {
    if (href.path.fsPath === targetResource.fsPath) {
        return true;
    }
    return configuration.markdownFileExtensions.some(ext => href.path.with({ path: href.path.path + '.' + ext }).fsPath === targetResource.fsPath);
}
exports.looksLikeLinkToResource = looksLikeLinkToResource;
//# sourceMappingURL=documentLinks.js.map

/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogLevel = void 0;
/**
 * The level of verbosity that the language service logs at.
 */
var LogLevel;
(function (LogLevel) {
    /** Disable logging */
    LogLevel[LogLevel["Off"] = 0] = "Off";
    /** Log verbose info about language server operation, such as when references are re-computed for a md file. */
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    /** Log extremely verbose info about language server operation, such as calls into the file system */
    LogLevel[LogLevel["Trace"] = 2] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=logging.js.map

/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.coalesce = void 0;
/**
 * @returns New array with all falsy values removed. The original array IS NOT modified.
 */
function coalesce(array) {
    return array.filter(e => !!e);
}
exports.coalesce = coalesce;
//# sourceMappingURL=arrays.js.map

/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DisposableStore = exports.Disposable = exports.disposeAll = exports.MultiDisposeError = void 0;
class MultiDisposeError extends Error {
    errors;
    constructor(errors) {
        super(`Encountered errors while disposing of store. Errors: [${errors.join(', ')}]`);
        this.errors = errors;
    }
}
exports.MultiDisposeError = MultiDisposeError;
function disposeAll(disposables) {
    const errors = [];
    for (const disposable of disposables) {
        try {
            disposable.dispose();
        }
        catch (e) {
            errors.push(e);
        }
    }
    if (errors.length === 1) {
        throw errors[0];
    }
    else if (errors.length > 1) {
        throw new MultiDisposeError(errors);
    }
}
exports.disposeAll = disposeAll;
class Disposable {
    #isDisposed = false;
    _disposables = [];
    dispose() {
        if (this.#isDisposed) {
            return;
        }
        this.#isDisposed = true;
        disposeAll(this._disposables);
    }
    _register(value) {
        if (this.#isDisposed) {
            value.dispose();
        }
        else {
            this._disposables.push(value);
        }
        return value;
    }
    get isDisposed() {
        return this.#isDisposed;
    }
}
exports.Disposable = Disposable;
class DisposableStore extends Disposable {
    #items = new Set();
    dispose() {
        super.dispose();
        disposeAll(this.#items);
        this.#items.clear();
    }
    add(item) {
        if (this.isDisposed) {
            console.warn('Adding to disposed store. Item will be leaked');
        }
        this.#items.add(item);
        return item;
    }
}
exports.DisposableStore = DisposableStore;
//# sourceMappingURL=dispose.js.map

/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.r = exports.isEmptyOrWhitespace = void 0;
function isEmptyOrWhitespace(str) {
    return /^\s*$/.test(str);
}
exports.isEmptyOrWhitespace = isEmptyOrWhitespace;
exports.r = String.raw;
//# sourceMappingURL=string.js.map

/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tryDecodeUri = void 0;
function tryDecodeUri(str) {
    try {
        return decodeURI(str);
    }
    catch {
        return str;
    }
}
exports.tryDecodeUri = tryDecodeUri;
//# sourceMappingURL=uri.js.map

/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tryAppendMarkdownFileExtension = exports.statLinkToMarkdownFile = exports.openLinkToMarkdownFile = exports.getWorkspaceFolder = exports.isWorkspaceWithFileWatching = void 0;
const vscode_uri_1 = __webpack_require__(84);
const config_1 = __webpack_require__(71);
function isWorkspaceWithFileWatching(workspace) {
    return 'watchFile' in workspace;
}
exports.isWorkspaceWithFileWatching = isWorkspaceWithFileWatching;
function getWorkspaceFolder(workspace, docUri) {
    if (workspace.workspaceFolders.length === 0) {
        return undefined;
    }
    // Find the longest match
    const possibleWorkspaces = workspace.workspaceFolders
        .filter(folder => folder.scheme === docUri.scheme
        && folder.authority === docUri.authority
        && (docUri.fsPath.startsWith(folder.fsPath + '/') || docUri.fsPath.startsWith(folder.fsPath + '\\')))
        .sort((a, b) => b.fsPath.length - a.fsPath.length);
    if (possibleWorkspaces.length) {
        return possibleWorkspaces[0];
    }
    // Default to first workspace
    // TODO: Does this make sense?
    return workspace.workspaceFolders[0];
}
exports.getWorkspaceFolder = getWorkspaceFolder;
async function openLinkToMarkdownFile(config, workspace, resource) {
    try {
        const doc = await workspace.openMarkdownDocument(resource);
        if (doc) {
            return doc;
        }
    }
    catch {
        // Noop
    }
    const dotMdResource = tryAppendMarkdownFileExtension(config, resource);
    if (dotMdResource) {
        return workspace.openMarkdownDocument(dotMdResource);
    }
    return undefined;
}
exports.openLinkToMarkdownFile = openLinkToMarkdownFile;
/**
 * Check that a link to a file exists.
 *
 * @returns The resolved URI or `undefined` if the file does not exist.
 */
async function statLinkToMarkdownFile(config, workspace, linkUri, out_statCache) {
    const exists = async (uri) => {
        const result = await workspace.stat(uri);
        out_statCache?.set(uri, { exists: !!result });
        return !!result;
    };
    if (await exists(linkUri)) {
        return linkUri;
    }
    // We don't think the file exists. See if we need to append `.md`
    const dotMdResource = tryAppendMarkdownFileExtension(config, linkUri);
    if (dotMdResource && await exists(dotMdResource)) {
        return dotMdResource;
    }
    return undefined;
}
exports.statLinkToMarkdownFile = statLinkToMarkdownFile;
function tryAppendMarkdownFileExtension(config, linkUri) {
    const ext = vscode_uri_1.Utils.extname(linkUri).toLowerCase().replace(/^\./, '');
    if (config.markdownFileExtensions.includes(ext)) {
        return linkUri;
    }
    if (ext === '' || !config.knownLinkedToFileExtensions.includes(ext)) {
        return linkUri.with({ path: linkUri.path + '.' + (config.markdownFileExtensions[0] ?? config_1.defaultMarkdownFileExtension) });
    }
    return undefined;
}
exports.tryAppendMarkdownFileExtension = tryAppendMarkdownFileExtension;
//# sourceMappingURL=workspace.js.map

/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdWorkspaceInfoCache = exports.MdDocumentInfoCache = void 0;
const vscode_languageserver_1 = __webpack_require__(4);
const textDocument_1 = __webpack_require__(83);
const dispose_1 = __webpack_require__(89);
const lazy_1 = __webpack_require__(94);
const resourceMap_1 = __webpack_require__(95);
/**
 * Cache of information per-document in the workspace.
 *
 * The values are computed lazily and invalidated when the document changes.
 */
class MdDocumentInfoCache extends dispose_1.Disposable {
    #cache = new resourceMap_1.ResourceMap();
    #loadingDocuments = new resourceMap_1.ResourceMap();
    #workspace;
    #getValue;
    constructor(workspace, getValue) {
        super();
        this.#workspace = workspace;
        this.#getValue = getValue;
        this._register(this.#workspace.onDidChangeMarkdownDocument(doc => this.#invalidate(doc)));
        this._register(this.#workspace.onDidDeleteMarkdownDocument(this.#onDidDeleteDocument, this));
    }
    async get(resource) {
        let existing = this.#cache.get(resource);
        if (existing) {
            return existing.value.value;
        }
        const doc = await this.#loadDocument(resource);
        if (!doc) {
            return undefined;
        }
        // Check if we have invalidated
        existing = this.#cache.get(resource);
        if (existing) {
            return existing.value.value;
        }
        return this.#resetEntry(doc)?.value;
    }
    async getForDocument(document) {
        const existing = this.#cache.get((0, textDocument_1.getDocUri)(document));
        if (existing) {
            return existing.value.value;
        }
        return this.#resetEntry(document).value;
    }
    #loadDocument(resource) {
        const existing = this.#loadingDocuments.get(resource);
        if (existing) {
            return existing;
        }
        const p = this.#workspace.openMarkdownDocument(resource);
        this.#loadingDocuments.set(resource, p);
        p.finally(() => {
            this.#loadingDocuments.delete(resource);
        });
        return p;
    }
    #resetEntry(document) {
        // TODO: cancel old request?
        const cts = new vscode_languageserver_1.CancellationTokenSource();
        const value = (0, lazy_1.lazy)(() => this.#getValue(document, cts.token));
        this.#cache.set((0, textDocument_1.getDocUri)(document), { value, cts });
        return value;
    }
    #invalidate(document) {
        if (this.#cache.has((0, textDocument_1.getDocUri)(document))) {
            this.#resetEntry(document);
        }
    }
    #onDidDeleteDocument(resource) {
        const entry = this.#cache.get(resource);
        if (entry) {
            entry.cts.cancel();
            entry.cts.dispose();
            this.#cache.delete(resource);
        }
    }
}
exports.MdDocumentInfoCache = MdDocumentInfoCache;
/**
 * Cache of information across all markdown files in the workspace.
 *
 * Unlike {@link MdDocumentInfoCache}, the entries here are computed eagerly for every file in the workspace.
 * However the computation of the values is still lazy.
 */
class MdWorkspaceInfoCache extends dispose_1.Disposable {
    #cache = new resourceMap_1.ResourceMap();
    #init;
    #workspace;
    #getValue;
    constructor(workspace, getValue) {
        super();
        this.#workspace = workspace;
        this.#getValue = getValue;
        this._register(this.#workspace.onDidChangeMarkdownDocument(this.#onDidChangeDocument, this));
        this._register(this.#workspace.onDidCreateMarkdownDocument(this.#onDidChangeDocument, this));
        this._register(this.#workspace.onDidDeleteMarkdownDocument(this.#onDidDeleteDocument, this));
    }
    async entries() {
        await this.#ensureInit();
        return Promise.all(Array.from(this.#cache.entries(), async ([k, v]) => {
            return [k, await v.value.value];
        }));
    }
    async values() {
        await this.#ensureInit();
        return Promise.all(Array.from(this.#cache.entries(), x => x[1].value.value));
    }
    async getForDocs(docs) {
        for (const doc of docs) {
            if (!this.#cache.has((0, textDocument_1.getDocUri)(doc))) {
                this.#update(doc);
            }
        }
        return Promise.all(docs.map(doc => this.#cache.get((0, textDocument_1.getDocUri)(doc)).value.value));
    }
    async #ensureInit() {
        if (!this.#init) {
            this.#init = this.#populateCache();
        }
        await this.#init;
    }
    async #populateCache() {
        const markdownDocuments = await this.#workspace.getAllMarkdownDocuments();
        for (const document of markdownDocuments) {
            if (!this.#cache.has((0, textDocument_1.getDocUri)(document))) {
                this.#update(document);
            }
        }
    }
    #update(document) {
        // TODO: cancel old request?
        const cts = new vscode_languageserver_1.CancellationTokenSource();
        this.#cache.set((0, textDocument_1.getDocUri)(document), {
            value: (0, lazy_1.lazy)(() => this.#getValue(document, cts.token)),
            cts
        });
    }
    #onDidChangeDocument(document) {
        this.#update(document);
    }
    #onDidDeleteDocument(resource) {
        const entry = this.#cache.get(resource);
        if (entry) {
            entry.cts.cancel();
            entry.cts.dispose();
            this.#cache.delete(resource);
        }
    }
}
exports.MdWorkspaceInfoCache = MdWorkspaceInfoCache;
//# sourceMappingURL=workspaceCache.js.map

/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lazy = void 0;
class LazyValue {
    #hasValue = false;
    #value;
    #getValue;
    constructor(getValue) {
        this.#getValue = getValue;
    }
    get value() {
        if (!this.#hasValue) {
            this.#hasValue = true;
            this.#value = this.#getValue();
        }
        return this.#value;
    }
    get hasValue() {
        return this.#hasValue;
    }
    map(f) {
        return new LazyValue(() => f(this.value));
    }
}
function lazy(getValue) {
    return new LazyValue(getValue);
}
exports.lazy = lazy;
//# sourceMappingURL=lazy.js.map

/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceMap = void 0;
const defaultResourceToKey = (resource) => resource.toString();
class ResourceMap {
    #map = new Map();
    #toKey;
    constructor(toKey = defaultResourceToKey) {
        this.#toKey = toKey;
    }
    set(uri, value) {
        this.#map.set(this.#toKey(uri), { uri, value });
        return this;
    }
    get(resource) {
        return this.#map.get(this.#toKey(resource))?.value;
    }
    has(resource) {
        return this.#map.has(this.#toKey(resource));
    }
    get size() {
        return this.#map.size;
    }
    clear() {
        this.#map.clear();
    }
    delete(resource) {
        return this.#map.delete(this.#toKey(resource));
    }
    *values() {
        for (const entry of this.#map.values()) {
            yield entry.value;
        }
    }
    *keys() {
        for (const entry of this.#map.values()) {
            yield entry.uri;
        }
    }
    *entries() {
        for (const entry of this.#map.values()) {
            yield [entry.uri, entry.value];
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
}
exports.ResourceMap = ResourceMap;
//# sourceMappingURL=resourceMap.js.map

/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getExistingDefinitionBlock = exports.MdOrganizeLinkDefinitionProvider = void 0;
const range_1 = __webpack_require__(82);
const textDocument_1 = __webpack_require__(83);
const string_1 = __webpack_require__(90);
const documentLinks_1 = __webpack_require__(86);
class MdOrganizeLinkDefinitionProvider {
    #linkProvider;
    constructor(linkProvider) {
        this.#linkProvider = linkProvider;
    }
    async getOrganizeLinkDefinitionEdits(doc, options, token) {
        const links = await this.#linkProvider.getLinks(doc);
        if (token.isCancellationRequested) {
            return [];
        }
        const definitions = links.links.filter(link => link.kind === documentLinks_1.MdLinkKind.Definition);
        if (!definitions.length) {
            return [];
        }
        const existingDefBlockRange = getExistingDefinitionBlock(doc, definitions);
        const edits = [];
        // First replace all inline definitions that are not the definition block
        for (const group of this.#getDefinitionBlockGroups(doc, definitions)) {
            if (!existingDefBlockRange || group.startLine < existingDefBlockRange.startLine) {
                // Don't replace trailing newline of last definition in group
                edits.push({
                    newText: '',
                    range: (0, range_1.makeRange)(group.startLine, 0, group.endLine, (0, textDocument_1.getLine)(doc, group.endLine).length),
                });
            }
        }
        // Then replace the actual block
        const sortedDefs = [...definitions];
        sortedDefs.sort((a, b) => a.ref.text.localeCompare(b.ref.text));
        const newDefs = sortedDefs
            .filter(def => {
            if (!options.removeUnused) {
                return true;
            }
            return links.links.some(link => {
                return link.kind === documentLinks_1.MdLinkKind.Link && link.href.kind === documentLinks_1.HrefKind.Reference && link.href.ref === def.ref.text;
            });
        });
        const defBlock = newDefs
            .map((def => `[${def.ref.text}]: ${def.source.hrefText}`))
            .join('\n');
        if (existingDefBlockRange) {
            // We still may need to insert a newline
            const hasLeadingWhiteSpace = existingDefBlockRange.startLine <= 0
                || (0, string_1.isEmptyOrWhitespace)((0, textDocument_1.getLine)(doc, existingDefBlockRange.startLine - 1));
            // See if we already have the expected definitions in order
            if (!edits.length && newDefs.length === definitions.length && definitions.every((def, i) => def.ref === newDefs[i].ref)) {
                return [];
            }
            edits.push({
                newText: (hasLeadingWhiteSpace ? '' : '\n') + defBlock,
                range: (0, range_1.makeRange)(existingDefBlockRange.startLine, 0, existingDefBlockRange.endLine, (0, textDocument_1.getLine)(doc, existingDefBlockRange.endLine).length)
            });
        }
        else {
            const line = this.#getLastNonWhitespaceLine(doc, definitions);
            edits.push({
                newText: (line === doc.lineCount - 1 ? '\n\n' : '\n') + defBlock,
                range: (0, range_1.makeRange)(line + 1, 0, doc.lineCount, 0),
            });
        }
        return edits;
    }
    *#getDefinitionBlockGroups(doc, definitions) {
        if (!definitions.length) {
            return;
        }
        let i = 0;
        const startDef = definitions[i];
        let endDef = startDef;
        for (; i < definitions.length - 1; ++i) {
            const nextDef = definitions[i + 1];
            if (nextDef.source.range.start.line === endDef.source.range.start.line + 1) {
                endDef = nextDef;
            }
            else {
                break;
            }
        }
        yield { startLine: startDef.source.range.start.line, endLine: endDef.source.range.start.line };
        yield* this.#getDefinitionBlockGroups(doc, definitions.slice(i + 1));
    }
    #getLastNonWhitespaceLine(doc, orderedDefinitions) {
        const lastDef = orderedDefinitions[orderedDefinitions.length - 1];
        const textAfter = doc.getText((0, range_1.makeRange)(lastDef.source.range.end.line + 1, 0, Infinity, 0));
        const lines = textAfter.split(/\r\n|\n/g);
        for (let i = lines.length - 1; i >= 0; --i) {
            if (!(0, string_1.isEmptyOrWhitespace)(lines[i])) {
                return lastDef.source.range.start.line + 1 + i;
            }
        }
        return lastDef.source.range.start.line;
    }
}
exports.MdOrganizeLinkDefinitionProvider = MdOrganizeLinkDefinitionProvider;
function getExistingDefinitionBlock(doc, orderedDefinitions) {
    if (!orderedDefinitions.length) {
        return undefined;
    }
    const lastDef = orderedDefinitions[orderedDefinitions.length - 1];
    const textAfter = doc.getText((0, range_1.makeRange)(lastDef.source.range.end.line + 1, 0, Infinity, 0));
    if ((0, string_1.isEmptyOrWhitespace)(textAfter)) {
        let prevDef = lastDef;
        for (let i = orderedDefinitions.length - 1; i >= 0; --i) {
            const def = orderedDefinitions[i];
            if (def.source.range.start.line < prevDef.source.range.start.line - 1) {
                break;
            }
            prevDef = def;
        }
        return {
            startLine: prevDef.source.range.start.line,
            endLine: lastDef.source.range.start.line
        };
    }
    return undefined;
}
exports.getExistingDefinitionBlock = getExistingDefinitionBlock;
//# sourceMappingURL=organizeLinkDefs.js.map

/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.codeActionKindContains = void 0;
function codeActionKindContains(kindA, kindB) {
    return kindA === kindB || kindB.startsWith(kindA + '.');
}
exports.codeActionKindContains = codeActionKindContains;
//# sourceMappingURL=util.js.map

/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdRemoveLinkDefinitionCodeActionProvider = void 0;
const l10n = __webpack_require__(80);
const lsp = __webpack_require__(25);
const range_1 = __webpack_require__(82);
const textDocument_1 = __webpack_require__(83);
const editBuilder_1 = __webpack_require__(85);
const diagnostics_1 = __webpack_require__(99);
const util_1 = __webpack_require__(97);
class MdRemoveLinkDefinitionCodeActionProvider {
    static #removeUnusedDefTitle = l10n.t('Remove unused link definition');
    static #removeDuplicateDefTitle = l10n.t('Remove duplicate link definition');
    *getActions(doc, range, context) {
        if (!this.#isEnabled(context)) {
            return;
        }
        const unusedDiagnosticLines = new Set();
        for (const diag of context.diagnostics) {
            if (diag.code === diagnostics_1.DiagnosticCode.link_unusedDefinition && diag.data && (0, range_1.rangeIntersects)(diag.range, range)) {
                const link = diag.data;
                yield this.#getRemoveDefinitionAction(doc, link, MdRemoveLinkDefinitionCodeActionProvider.#removeUnusedDefTitle);
                unusedDiagnosticLines.add(link.source.range.start.line);
            }
        }
        for (const diag of context.diagnostics) {
            if (diag.code === diagnostics_1.DiagnosticCode.link_duplicateDefinition && diag.data && (0, range_1.rangeIntersects)(diag.range, range)) {
                const link = diag.data;
                if (!unusedDiagnosticLines.has(link.source.range.start.line)) {
                    yield this.#getRemoveDefinitionAction(doc, link, MdRemoveLinkDefinitionCodeActionProvider.#removeDuplicateDefTitle);
                }
            }
        }
    }
    #isEnabled(context) {
        if (typeof context.only === 'undefined') {
            return true;
        }
        return context.only.some(kind => (0, util_1.codeActionKindContains)(lsp.CodeActionKind.QuickFix, kind));
    }
    #getRemoveDefinitionAction(doc, definition, title) {
        const builder = new editBuilder_1.WorkspaceEditBuilder();
        const range = definition.source.range;
        builder.replace((0, textDocument_1.getDocUri)(doc), (0, range_1.makeRange)(range.start.line, 0, range.start.line + 1, 0), '');
        return { title, kind: lsp.CodeActionKind.QuickFix, edit: builder.getEdit() };
    }
}
exports.MdRemoveLinkDefinitionCodeActionProvider = MdRemoveLinkDefinitionCodeActionProvider;
//# sourceMappingURL=removeLinkDefinition.js.map

/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiagnosticsManager = exports.DiagnosticComputer = exports.DiagnosticCode = exports.DiagnosticLevel = void 0;
const l10n = __webpack_require__(80);
const picomatch = __webpack_require__(72);
const vscode_languageserver_1 = __webpack_require__(4);
const lsp = __webpack_require__(25);
const position_1 = __webpack_require__(81);
const range_1 = __webpack_require__(82);
const textDocument_1 = __webpack_require__(83);
const dispose_1 = __webpack_require__(89);
const file_1 = __webpack_require__(100);
const limiter_1 = __webpack_require__(101);
const resourceMap_1 = __webpack_require__(95);
const workspace_1 = __webpack_require__(92);
const documentLinks_1 = __webpack_require__(86);
const logging_1 = __webpack_require__(87);
/**
 * The severity at which diagnostics are reported
 */
var DiagnosticLevel;
(function (DiagnosticLevel) {
    /** Don't report this diagnostic. */
    DiagnosticLevel["ignore"] = "ignore";
    /**
     * Report the diagnostic at a hint level.
     *
     * Hints will typically not be directly reported by editors, but may show up as unused spans.
     */
    DiagnosticLevel["hint"] = "hint";
    /** Report the diagnostic as a warning. */
    DiagnosticLevel["warning"] = "warning";
    /** Report the diagnostic as an error. */
    DiagnosticLevel["error"] = "error";
})(DiagnosticLevel = exports.DiagnosticLevel || (exports.DiagnosticLevel = {}));
function toSeverity(level) {
    switch (level) {
        case DiagnosticLevel.error: return vscode_languageserver_1.DiagnosticSeverity.Error;
        case DiagnosticLevel.warning: return vscode_languageserver_1.DiagnosticSeverity.Warning;
        case DiagnosticLevel.hint: return vscode_languageserver_1.DiagnosticSeverity.Hint;
        case DiagnosticLevel.ignore: return undefined;
        case undefined: return undefined;
    }
}
/**
 * Error codes of Markdown diagnostics
 */
var DiagnosticCode;
(function (DiagnosticCode) {
    /** The linked to reference does not exist. */
    DiagnosticCode["link_noSuchReferences"] = "link.no-such-reference";
    /** The linked to heading does not exist in the current file. */
    DiagnosticCode["link_noSuchHeaderInOwnFile"] = "link.no-such-header-in-own-file";
    /** The linked to local file does not exist. */
    DiagnosticCode["link_noSuchFile"] = "link.no-such-file";
    /** The linked to heading does not exist in the another file. */
    DiagnosticCode["link_noSuchHeaderInFile"] = "link.no-such-header-in-file";
    /** The link definition is not used anywhere. */
    DiagnosticCode["link_unusedDefinition"] = "link.unused-definition";
    /** The link definition is not used anywhere. */
    DiagnosticCode["link_duplicateDefinition"] = "link.duplicate-definition";
})(DiagnosticCode = exports.DiagnosticCode || (exports.DiagnosticCode = {}));
/**
 * Map of file paths to markdown links to that file.
 */
class FileLinkMap {
    #filesToLinksMap = new resourceMap_1.ResourceMap();
    constructor(links) {
        for (const link of links) {
            if (link.href.kind !== documentLinks_1.HrefKind.Internal) {
                continue;
            }
            const existingFileEntry = this.#filesToLinksMap.get(link.href.path);
            const linkData = { source: link.source, fragment: link.href.fragment };
            if (existingFileEntry) {
                existingFileEntry.outgoingLinks.push(linkData);
            }
            else {
                this.#filesToLinksMap.set(link.href.path, { outgoingLinks: [linkData] });
            }
        }
    }
    get size() {
        return this.#filesToLinksMap.size;
    }
    entries() {
        return this.#filesToLinksMap.entries();
    }
}
class DiagnosticComputer {
    #configuration;
    #workspace;
    #linkProvider;
    #tocProvider;
    #logger;
    constructor(configuration, workspace, linkProvider, tocProvider, logger) {
        this.#configuration = configuration;
        this.#workspace = workspace;
        this.#linkProvider = linkProvider;
        this.#tocProvider = tocProvider;
        this.#logger = logger;
    }
    async compute(doc, options, token) {
        this.#logger.log(logging_1.LogLevel.Debug, 'DiagnosticComputer.compute', { document: doc.uri, version: doc.version });
        const { links, definitions } = await this.#linkProvider.getLinks(doc);
        const statCache = new resourceMap_1.ResourceMap();
        if (token.isCancellationRequested) {
            return { links, diagnostics: [], statCache };
        }
        // Current doc always implicitly exists
        statCache.set((0, textDocument_1.getDocUri)(doc), { exists: true });
        return {
            links: links,
            statCache,
            diagnostics: (await Promise.all([
                this.#validateFileLinks(options, links, statCache, token),
                this.#validateFragmentLinks(doc, options, links, token),
                Array.from(this.#validateReferenceLinks(options, links, definitions)),
                Array.from(this.#validateUnusedLinkDefinitions(options, links)),
                Array.from(this.#validateDuplicateLinkDefinitions(options, links)),
            ])).flat()
        };
    }
    async #validateFragmentLinks(doc, options, links, token) {
        const severity = toSeverity(options.validateFragmentLinks);
        if (typeof severity === 'undefined') {
            return [];
        }
        const toc = await this.#tocProvider.getForDocument(doc);
        if (token.isCancellationRequested) {
            return [];
        }
        const diagnostics = [];
        for (const link of links) {
            if (link.href.kind === documentLinks_1.HrefKind.Internal
                && link.source.hrefText.startsWith('#')
                && link.href.path.toString() === doc.uri.toString()
                && link.href.fragment
                && !toc.lookup(link.href.fragment)) {
                // Don't validate line number links
                if ((0, documentLinks_1.parseLocationInfoFromFragment)(link.href.fragment)) {
                    continue;
                }
                if (!this.#isIgnoredLink(options, link.source.hrefText)) {
                    diagnostics.push({
                        code: DiagnosticCode.link_noSuchHeaderInOwnFile,
                        message: l10n.t('No header found: \'{0}\'', link.href.fragment),
                        range: link.source.hrefRange,
                        severity,
                        data: {
                            hrefText: link.source.hrefText
                        }
                    });
                }
            }
        }
        return diagnostics;
    }
    *#validateReferenceLinks(options, links, definitions) {
        const severity = toSeverity(options.validateReferences);
        if (typeof severity === 'undefined') {
            return [];
        }
        for (const link of links) {
            if (link.href.kind === documentLinks_1.HrefKind.Reference && !definitions.lookup(link.href.ref)) {
                yield {
                    code: DiagnosticCode.link_noSuchReferences,
                    message: l10n.t('No link definition found: \'{0}\'', link.href.ref),
                    range: link.source.hrefRange,
                    severity,
                    data: {
                        ref: link.href.ref,
                    },
                };
            }
        }
    }
    *#validateUnusedLinkDefinitions(options, links) {
        const errorSeverity = toSeverity(options.validateUnusedLinkDefinitions);
        if (typeof errorSeverity === 'undefined') {
            return;
        }
        const usedRefs = new documentLinks_1.ReferenceLinkMap();
        for (const link of links) {
            if (link.kind === documentLinks_1.MdLinkKind.Link && link.href.kind === documentLinks_1.HrefKind.Reference) {
                usedRefs.set(link.href.ref, true);
            }
        }
        for (const link of links) {
            if (link.kind === documentLinks_1.MdLinkKind.Definition && !usedRefs.lookup(link.ref.text)) {
                yield {
                    code: DiagnosticCode.link_unusedDefinition,
                    message: l10n.t('Link definition is unused'),
                    range: link.source.range,
                    severity: errorSeverity,
                    tags: [
                        lsp.DiagnosticTag.Unnecessary,
                    ],
                    data: link
                };
            }
        }
    }
    *#validateDuplicateLinkDefinitions(options, links) {
        const errorSeverity = toSeverity(options.validateDuplicateLinkDefinitions);
        if (typeof errorSeverity === 'undefined') {
            return;
        }
        const definitionMultiMap = new Map();
        for (const link of links) {
            if (link.kind === documentLinks_1.MdLinkKind.Definition) {
                const existing = definitionMultiMap.get(link.ref.text);
                if (existing) {
                    existing.push(link);
                }
                else {
                    definitionMultiMap.set(link.ref.text, [link]);
                }
            }
        }
        for (const [ref, defs] of definitionMultiMap) {
            if (defs.length <= 1) {
                continue;
            }
            for (const duplicateDef of defs) {
                yield {
                    code: DiagnosticCode.link_duplicateDefinition,
                    message: l10n.t('Link definition for \'{0}\' already exists', ref),
                    range: duplicateDef.ref.range,
                    severity: errorSeverity,
                    relatedInformation: defs
                        .filter(x => x !== duplicateDef)
                        .map(def => lsp.DiagnosticRelatedInformation.create({ uri: def.source.resource.toString(), range: def.ref.range }, l10n.t('Link is also defined here'))),
                    data: duplicateDef
                };
            }
        }
    }
    async #validateFileLinks(options, links, statCache, token) {
        const pathErrorSeverity = toSeverity(options.validateFileLinks);
        if (typeof pathErrorSeverity === 'undefined') {
            return [];
        }
        const fragmentErrorSeverity = toSeverity(typeof options.validateMarkdownFileLinkFragments === 'undefined' ? options.validateFragmentLinks : options.validateMarkdownFileLinkFragments);
        // We've already validated our own fragment links in `validateOwnHeaderLinks`
        const linkSet = new FileLinkMap(links.filter(link => !link.source.hrefText.startsWith('#')));
        if (linkSet.size === 0) {
            return [];
        }
        const limiter = new limiter_1.Limiter(10);
        const diagnostics = [];
        await Promise.all(Array.from(linkSet.entries()).map(([path, { outgoingLinks: links }]) => {
            return limiter.queue(async () => {
                if (token.isCancellationRequested) {
                    return;
                }
                const resolvedHrefPath = await (0, workspace_1.statLinkToMarkdownFile)(this.#configuration, this.#workspace, path, statCache);
                if (token.isCancellationRequested) {
                    return;
                }
                if (!resolvedHrefPath) {
                    for (const link of links) {
                        if (!this.#isIgnoredLink(options, link.source.pathText)) {
                            diagnostics.push({
                                code: DiagnosticCode.link_noSuchFile,
                                message: l10n.t('File does not exist at path: {0}', path.fsPath),
                                range: link.source.hrefRange,
                                severity: pathErrorSeverity,
                                data: {
                                    fsPath: path.fsPath,
                                    hrefText: link.source.pathText,
                                }
                            });
                        }
                    }
                }
                else if (typeof fragmentErrorSeverity !== 'undefined' && this.#isMarkdownPath(resolvedHrefPath)) {
                    // Validate each of the links to headers in the file
                    const fragmentLinks = links.filter(x => x.fragment);
                    if (fragmentLinks.length) {
                        const toc = await this.#tocProvider.get(resolvedHrefPath);
                        if (token.isCancellationRequested) {
                            return;
                        }
                        for (const link of fragmentLinks) {
                            // Don't validate line number links
                            if ((0, documentLinks_1.parseLocationInfoFromFragment)(link.fragment)) {
                                continue;
                            }
                            if (!toc.lookup(link.fragment) && !this.#isIgnoredLink(options, link.source.pathText) && !this.#isIgnoredLink(options, link.source.hrefText)) {
                                const range = (link.source.fragmentRange && (0, range_1.modifyRange)(link.source.fragmentRange, (0, position_1.translatePosition)(link.source.fragmentRange.start, { characterDelta: -1 }), undefined)) ?? link.source.hrefRange;
                                diagnostics.push({
                                    code: DiagnosticCode.link_noSuchHeaderInFile,
                                    message: l10n.t('Header does not exist in file: {0}', link.fragment),
                                    range: range,
                                    severity: fragmentErrorSeverity,
                                    data: {
                                        fragment: link.fragment,
                                        hrefText: link.source.hrefText
                                    },
                                });
                            }
                        }
                    }
                }
            });
        }));
        return diagnostics;
    }
    #isMarkdownPath(resolvedHrefPath) {
        return this.#workspace.hasMarkdownDocument(resolvedHrefPath) || (0, file_1.looksLikeMarkdownUri)(this.#configuration, resolvedHrefPath);
    }
    #isIgnoredLink(options, link) {
        return options.ignoreLinks.some(glob => picomatch.isMatch(link, glob));
    }
}
exports.DiagnosticComputer = DiagnosticComputer;
class FileLinkState extends dispose_1.Disposable {
    #onDidChangeLinkedToFile = this._register(new vscode_languageserver_1.Emitter);
    /**
     * Event fired with a list of document uri when one of the links in the document changes
     */
    onDidChangeLinkedToFile = this.#onDidChangeLinkedToFile.event;
    #linkedToFile = new resourceMap_1.ResourceMap();
    #workspace;
    #logger;
    constructor(workspace, logger) {
        super();
        this.#workspace = workspace;
        this.#logger = logger;
    }
    dispose() {
        super.dispose();
        for (const entry of this.#linkedToFile.values()) {
            entry.watcher.dispose();
        }
        this.#linkedToFile.clear();
    }
    /**
     * Set the known links in a markdown document, adding and removing file watchers as needed
     */
    updateLinksForDocument(document, links, statCache) {
        const linkedToResource = new Set(links
            .filter(link => link.href.kind === documentLinks_1.HrefKind.Internal)
            .map(link => ({ path: link.href.path, exists: !!(statCache.get(link.href.path)?.exists) })));
        // First decrement watcher counter for previous document state
        for (const entry of this.#linkedToFile.values()) {
            entry.documents.delete(document);
        }
        // Then create/update watchers for new document state
        for (const { path, exists } of linkedToResource) {
            let entry = this.#linkedToFile.get(path);
            if (!entry) {
                entry = {
                    watcher: this.#startWatching(path),
                    documents: new resourceMap_1.ResourceMap(),
                    exists
                };
                this.#linkedToFile.set(path, entry);
            }
            entry.documents.set(document, document);
        }
        // Finally clean up watchers for links that are no longer are referenced anywhere
        for (const [key, value] of this.#linkedToFile) {
            if (value.documents.size === 0) {
                value.watcher.dispose();
                this.#linkedToFile.delete(key);
            }
        }
    }
    deleteDocument(resource) {
        this.updateLinksForDocument(resource, [], new resourceMap_1.ResourceMap());
    }
    tryStatFileLink(link) {
        const entry = this.#linkedToFile.get(link);
        if (!entry) {
            return undefined;
        }
        return { exists: entry.exists };
    }
    #startWatching(path) {
        const watcher = this.#workspace.watchFile(path, { ignoreChange: true });
        const deleteReg = watcher.onDidDelete((resource) => this.#onLinkedResourceChanged(resource, false));
        const createReg = watcher.onDidCreate((resource) => this.#onLinkedResourceChanged(resource, true));
        return {
            dispose: () => {
                watcher.dispose();
                deleteReg.dispose();
                createReg.dispose();
            }
        };
    }
    #onLinkedResourceChanged(resource, exists) {
        this.#logger.log(logging_1.LogLevel.Trace, 'FileLinkState.onLinkedResourceChanged', { resource, exists });
        const entry = this.#linkedToFile.get(resource);
        if (entry) {
            entry.exists = exists;
            this.#onDidChangeLinkedToFile.fire({
                changedResource: resource,
                linkingFiles: entry.documents.values(),
                exists,
            });
        }
    }
}
class DiagnosticsManager extends dispose_1.Disposable {
    #computer;
    #linkWatcher;
    #onLinkedToFileChanged = this._register(new vscode_languageserver_1.Emitter());
    onLinkedToFileChanged = this.#onLinkedToFileChanged.event;
    constructor(configuration, workspace, linkProvider, tocProvider, logger) {
        super();
        const linkWatcher = new FileLinkState(workspace, logger);
        this.#linkWatcher = this._register(linkWatcher);
        this._register(this.#linkWatcher.onDidChangeLinkedToFile(e => {
            logger.log(logging_1.LogLevel.Trace, 'DiagnosticsManager.onDidChangeLinkedToFile', { resource: e.changedResource });
            this.#onLinkedToFileChanged.fire({
                changedResource: e.changedResource,
                linkingResources: Array.from(e.linkingFiles),
            });
        }));
        const stateCachedWorkspace = new Proxy(workspace, {
            get(target, p, receiver) {
                if (p !== 'stat') {
                    const value = Reflect.get(target, p, receiver);
                    return typeof value === 'function' ? value.bind(workspace) : value;
                }
                return async function (resource) {
                    const stat = linkWatcher.tryStatFileLink(resource);
                    if (stat) {
                        if (stat.exists) {
                            return { isDirectory: false };
                        }
                        else {
                            return undefined;
                        }
                    }
                    return workspace.stat.call(this === receiver ? target : this, resource);
                };
            },
        });
        this.#computer = new DiagnosticComputer(configuration, stateCachedWorkspace, linkProvider, tocProvider, logger);
        this._register(workspace.onDidDeleteMarkdownDocument(uri => {
            this.#linkWatcher.deleteDocument(uri);
        }));
    }
    async computeDiagnostics(doc, options, token) {
        const results = await this.#computer.compute(doc, options, token);
        if (token.isCancellationRequested) {
            return [];
        }
        this.#linkWatcher.updateLinksForDocument((0, textDocument_1.getDocUri)(doc), results.links, results.statCache);
        return results.diagnostics;
    }
    disposeDocumentResources(uri) {
        this.#linkWatcher.deleteDocument(uri);
    }
}
exports.DiagnosticsManager = DiagnosticsManager;
//# sourceMappingURL=diagnostics.js.map

/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.looksLikeMarkdownFilePath = exports.looksLikeMarkdownUri = void 0;
const path = __webpack_require__(74);
const vscode_uri_1 = __webpack_require__(84);
function looksLikeMarkdownUri(config, resolvedHrefPath) {
    return looksLikeMarkdownExt(config, vscode_uri_1.Utils.extname(resolvedHrefPath));
}
exports.looksLikeMarkdownUri = looksLikeMarkdownUri;
function looksLikeMarkdownFilePath(config, fileName) {
    return looksLikeMarkdownExt(config, path.extname(fileName));
}
exports.looksLikeMarkdownFilePath = looksLikeMarkdownFilePath;
function looksLikeMarkdownExt(config, rawExt) {
    return config.markdownFileExtensions.includes(rawExt.toLowerCase().replace('.', ''));
}
//# sourceMappingURL=file.js.map

/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Limiter = void 0;
/**
 * A helper to queue N promises and run them all with a max degree of parallelism. The helper
 * ensures that at any time no more than M promises are running at the same time.
 *
 * Taken from 'src/vs/base/common/async.ts'
 */
class Limiter {
    #size = 0;
    #runningPromises;
    #maxDegreeOfParalellism;
    #outstandingPromises;
    constructor(maxDegreeOfParalellism) {
        this.#maxDegreeOfParalellism = maxDegreeOfParalellism;
        this.#outstandingPromises = [];
        this.#runningPromises = 0;
    }
    get size() {
        return this.#size;
    }
    queue(factory) {
        this.#size++;
        return new Promise((c, e) => {
            this.#outstandingPromises.push({ factory, c, e });
            this.#consume();
        });
    }
    #consume() {
        while (this.#outstandingPromises.length && this.#runningPromises < this.#maxDegreeOfParalellism) {
            const iLimitedTask = this.#outstandingPromises.shift();
            this.#runningPromises++;
            const promise = iLimitedTask.factory();
            promise.then(iLimitedTask.c, iLimitedTask.e);
            promise.then(() => this.#consumed(), () => this.#consumed());
        }
    }
    #consumed() {
        this.#size--;
        this.#runningPromises--;
        if (this.#outstandingPromises.length > 0) {
            this.#consume();
        }
    }
}
exports.Limiter = Limiter;
//# sourceMappingURL=limiter.js.map

/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdDefinitionProvider = void 0;
const range_1 = __webpack_require__(82);
const workspace_1 = __webpack_require__(92);
const documentLinks_1 = __webpack_require__(86);
class MdDefinitionProvider {
    #configuration;
    #workspace;
    #tocProvider;
    #linkCache;
    constructor(configuration, workspace, tocProvider, linkCache) {
        this.#configuration = configuration;
        this.#workspace = workspace;
        this.#tocProvider = tocProvider;
        this.#linkCache = linkCache;
    }
    async provideDefinition(document, position, token) {
        const toc = await this.#tocProvider.getForDocument(document);
        if (token.isCancellationRequested) {
            return [];
        }
        const header = toc.entries.find(entry => entry.line === position.line);
        if (header) {
            return header.headerLocation;
        }
        return this.#getDefinitionOfLinkAtPosition(document, position, token);
    }
    async #getDefinitionOfLinkAtPosition(document, position, token) {
        const docLinks = (await this.#linkCache.getForDocs([document]))[0];
        for (const link of docLinks) {
            if (link.kind === documentLinks_1.MdLinkKind.Definition && (0, range_1.rangeContains)(link.ref.range, position)) {
                return this.#getDefinitionOfRef(link.ref.text, docLinks);
            }
            if ((0, range_1.rangeContains)(link.source.hrefRange, position)) {
                return this.#getDefinitionOfLink(link, docLinks, token);
            }
        }
        return undefined;
    }
    async #getDefinitionOfLink(sourceLink, allLinksInFile, token) {
        if (sourceLink.href.kind === documentLinks_1.HrefKind.Reference) {
            return this.#getDefinitionOfRef(sourceLink.href.ref, allLinksInFile);
        }
        if (sourceLink.href.kind === documentLinks_1.HrefKind.External || !sourceLink.href.fragment) {
            return undefined;
        }
        const resolvedResource = await (0, workspace_1.statLinkToMarkdownFile)(this.#configuration, this.#workspace, sourceLink.href.path);
        if (!resolvedResource || token.isCancellationRequested) {
            return undefined;
        }
        const toc = await this.#tocProvider.get(resolvedResource);
        return toc.lookup(sourceLink.href.fragment)?.headerLocation;
    }
    #getDefinitionOfRef(ref, allLinksInFile) {
        const allDefinitions = new documentLinks_1.LinkDefinitionSet(allLinksInFile);
        const def = allDefinitions.lookup(ref);
        return def ? { range: def.source.range, uri: def.source.resource.toString() } : undefined;
    }
}
exports.MdDefinitionProvider = MdDefinitionProvider;
//# sourceMappingURL=definitions.js.map

/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdDocumentHighlightProvider = void 0;
const lsp = __webpack_require__(25);
const position_1 = __webpack_require__(81);
const range_1 = __webpack_require__(82);
const workspace_1 = __webpack_require__(92);
const documentLinks_1 = __webpack_require__(86);
const rename_1 = __webpack_require__(104);
class MdDocumentHighlightProvider {
    #configuration;
    #tocProvider;
    #linkProvider;
    constructor(configuration, tocProvider, linkProvider) {
        this.#configuration = configuration;
        this.#tocProvider = tocProvider;
        this.#linkProvider = linkProvider;
    }
    async getDocumentHighlights(document, position, token) {
        const toc = await this.#tocProvider.getForDocument(document);
        if (token.isCancellationRequested) {
            return [];
        }
        const { links } = await this.#linkProvider.getLinks(document);
        if (token.isCancellationRequested) {
            return [];
        }
        const header = toc.entries.find(entry => entry.line === position.line);
        if (header) {
            return [...this.#getHighlightsForHeader(document, header, links, toc)];
        }
        return [...this.#getHighlightsForLinkAtPosition(document, position, links, toc)];
    }
    *#getHighlightsForHeader(document, header, links, toc) {
        yield { range: header.headerLocation.range, kind: lsp.DocumentHighlightKind.Write };
        const docUri = document.uri.toString();
        for (const link of links) {
            if (link.href.kind === documentLinks_1.HrefKind.Internal
                && toc.lookup(link.href.fragment) === header
                && link.source.fragmentRange
                && link.href.path.toString() === docUri) {
                yield {
                    range: (0, range_1.modifyRange)(link.source.fragmentRange, (0, position_1.translatePosition)(link.source.fragmentRange.start, { characterDelta: -1 })),
                    kind: lsp.DocumentHighlightKind.Read,
                };
            }
        }
    }
    #getHighlightsForLinkAtPosition(document, position, links, toc) {
        const link = links.find(link => (0, range_1.rangeContains)(link.source.hrefRange, position) || (link.kind === documentLinks_1.MdLinkKind.Definition && (0, range_1.rangeContains)(link.ref.range, position)));
        if (!link) {
            return [];
        }
        if (link.kind === documentLinks_1.MdLinkKind.Definition && (0, range_1.rangeContains)(link.ref.range, position)) {
            // We are on the reference text inside the link definition
            return this.#getHighlightsForReference(link.ref.text, links);
        }
        switch (link.href.kind) {
            case documentLinks_1.HrefKind.Reference: {
                return this.#getHighlightsForReference(link.href.ref, links);
            }
            case documentLinks_1.HrefKind.Internal: {
                if (link.source.fragmentRange && (0, range_1.rangeContains)(link.source.fragmentRange, position)) {
                    return this.#getHighlightsForLinkFragment(document, link.href, links, toc);
                }
                return this.#getHighlightsForLinkPath(link.href.path, links);
            }
            case documentLinks_1.HrefKind.External: {
                return this.#getHighlightsForExternalLink(link.href.uri, links);
            }
        }
    }
    *#getHighlightsForLinkFragment(document, href, links, toc) {
        const targetDoc = (0, workspace_1.tryAppendMarkdownFileExtension)(this.#configuration, href.path);
        if (!targetDoc) {
            return;
        }
        const fragment = href.fragment.toLowerCase();
        if (targetDoc.toString() === document.uri) {
            const header = toc.lookup(fragment);
            if (header) {
                yield { range: header.headerLocation.range, kind: lsp.DocumentHighlightKind.Write };
            }
        }
        for (const link of links) {
            if (link.href.kind === documentLinks_1.HrefKind.Internal && (0, documentLinks_1.looksLikeLinkToResource)(this.#configuration, link.href, targetDoc)) {
                if (link.source.fragmentRange && link.href.fragment.toLowerCase() === fragment) {
                    yield {
                        range: (0, range_1.modifyRange)(link.source.fragmentRange, (0, position_1.translatePosition)(link.source.fragmentRange.start, { characterDelta: -1 })),
                        kind: lsp.DocumentHighlightKind.Read,
                    };
                }
            }
        }
    }
    *#getHighlightsForLinkPath(path, links) {
        const targetDoc = (0, workspace_1.tryAppendMarkdownFileExtension)(this.#configuration, path) ?? path;
        for (const link of links) {
            if (link.href.kind === documentLinks_1.HrefKind.Internal && (0, documentLinks_1.looksLikeLinkToResource)(this.#configuration, link.href, targetDoc)) {
                yield {
                    range: (0, rename_1.getFilePathRange)(link),
                    kind: lsp.DocumentHighlightKind.Read,
                };
            }
        }
    }
    *#getHighlightsForExternalLink(uri, links) {
        for (const link of links) {
            if (link.href.kind === documentLinks_1.HrefKind.External && link.href.uri.toString() === uri.toString()) {
                yield {
                    range: (0, rename_1.getFilePathRange)(link),
                    kind: lsp.DocumentHighlightKind.Read,
                };
            }
        }
    }
    *#getHighlightsForReference(ref, links) {
        for (const link of links) {
            if (link.kind === documentLinks_1.MdLinkKind.Definition && link.ref.text === ref) {
                yield {
                    range: link.ref.range,
                    kind: lsp.DocumentHighlightKind.Write,
                };
            }
            else if (link.href.kind === documentLinks_1.HrefKind.Reference && link.href.ref === ref) {
                yield {
                    range: link.source.hrefRange,
                    kind: lsp.DocumentHighlightKind.Read,
                };
            }
        }
    }
}
exports.MdDocumentHighlightProvider = MdDocumentHighlightProvider;
//# sourceMappingURL=documentHighlights.js.map

/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFilePathRange = exports.getLinkRenameText = exports.MdRenameProvider = exports.RenameNotSupportedAtLocationError = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const l10n = __webpack_require__(80);
const path = __webpack_require__(74);
const vscode_uri_1 = __webpack_require__(84);
const config_1 = __webpack_require__(71);
const logging_1 = __webpack_require__(87);
const position_1 = __webpack_require__(81);
const range_1 = __webpack_require__(82);
const textDocument_1 = __webpack_require__(83);
const dispose_1 = __webpack_require__(89);
const editBuilder_1 = __webpack_require__(85);
const path_1 = __webpack_require__(105);
const uri_1 = __webpack_require__(91);
const workspace_1 = __webpack_require__(92);
const documentLinks_1 = __webpack_require__(86);
const references_1 = __webpack_require__(107);
/**
 * Error thrown when rename is not supported performed at the requested location.
 */
class RenameNotSupportedAtLocationError extends Error {
    constructor() {
        super(l10n.t('Renaming is not supported here. Try renaming a header or link.'));
    }
}
exports.RenameNotSupportedAtLocationError = RenameNotSupportedAtLocationError;
class MdRenameProvider extends dispose_1.Disposable {
    #cachedRefs;
    #configuration;
    #workspace;
    #referencesProvider;
    #slugifier;
    #logger;
    constructor(configuration, workspace, referencesProvider, slugifier, logger) {
        super();
        this.#configuration = configuration;
        this.#workspace = workspace;
        this.#referencesProvider = referencesProvider;
        this.#slugifier = slugifier;
        this.#logger = logger;
    }
    async prepareRename(document, position, token) {
        this.#logger.log(logging_1.LogLevel.Debug, 'RenameProvider.prepareRename', { document: document.uri, version: document.version });
        const allRefsInfo = await this.#getAllReferences(document, position, token);
        if (token.isCancellationRequested) {
            return undefined;
        }
        if (!allRefsInfo || !allRefsInfo.references.length) {
            throw new RenameNotSupportedAtLocationError();
        }
        const triggerRef = allRefsInfo.triggerRef;
        switch (triggerRef.kind) {
            case references_1.MdReferenceKind.Header: {
                return { range: triggerRef.headerTextLocation.range, placeholder: triggerRef.headerText };
            }
            case references_1.MdReferenceKind.Link: {
                if (triggerRef.link.kind === documentLinks_1.MdLinkKind.Definition) {
                    // We may have been triggered on the ref or the definition itself
                    if ((0, range_1.rangeContains)(triggerRef.link.ref.range, position)) {
                        return { range: triggerRef.link.ref.range, placeholder: triggerRef.link.ref.text };
                    }
                }
                if (triggerRef.link.href.kind === documentLinks_1.HrefKind.External) {
                    return { range: triggerRef.link.source.hrefRange, placeholder: document.getText(triggerRef.link.source.hrefRange) };
                }
                // See if we are renaming the fragment or the path
                const { fragmentRange } = triggerRef.link.source;
                if (fragmentRange && (0, range_1.rangeContains)(fragmentRange, position)) {
                    const declaration = this.#findHeaderDeclaration(allRefsInfo.references);
                    return {
                        range: fragmentRange,
                        placeholder: declaration ? declaration.headerText : document.getText(fragmentRange),
                    };
                }
                const range = getFilePathRange(triggerRef.link);
                if (!range) {
                    throw new RenameNotSupportedAtLocationError();
                }
                return { range, placeholder: (0, uri_1.tryDecodeUri)(document.getText(range)) };
            }
        }
    }
    #findHeaderDeclaration(references) {
        return references.find(ref => ref.isDefinition && ref.kind === references_1.MdReferenceKind.Header);
    }
    async provideRenameEdits(document, position, newName, token) {
        this.#logger.log(logging_1.LogLevel.Debug, 'RenameProvider.provideRenameEdits', { document: document.uri, version: document.version });
        const allRefsInfo = await this.#getAllReferences(document, position, token);
        if (token.isCancellationRequested || !allRefsInfo || !allRefsInfo.references.length) {
            return undefined;
        }
        const triggerRef = allRefsInfo.triggerRef;
        if (triggerRef.kind === references_1.MdReferenceKind.Link && ((triggerRef.link.kind === documentLinks_1.MdLinkKind.Definition && (0, range_1.rangeContains)(triggerRef.link.ref.range, position)) || triggerRef.link.href.kind === documentLinks_1.HrefKind.Reference)) {
            return this.#renameReferenceLinks(allRefsInfo, newName);
        }
        else if (triggerRef.kind === references_1.MdReferenceKind.Link && triggerRef.link.href.kind === documentLinks_1.HrefKind.External) {
            return this.#renameExternalLink(allRefsInfo, newName);
        }
        else if (triggerRef.kind === references_1.MdReferenceKind.Header || (triggerRef.kind === references_1.MdReferenceKind.Link && triggerRef.link.source.fragmentRange && (0, range_1.rangeContains)(triggerRef.link.source.fragmentRange, position) && (triggerRef.link.kind === documentLinks_1.MdLinkKind.Definition || triggerRef.link.kind === documentLinks_1.MdLinkKind.Link && triggerRef.link.href.kind === documentLinks_1.HrefKind.Internal))) {
            return this.#renameFragment(allRefsInfo, newName);
        }
        else if (triggerRef.kind === references_1.MdReferenceKind.Link && !(triggerRef.link.source.fragmentRange && (0, range_1.rangeContains)(triggerRef.link.source.fragmentRange, position)) && (triggerRef.link.kind === documentLinks_1.MdLinkKind.Link || triggerRef.link.kind === documentLinks_1.MdLinkKind.Definition) && triggerRef.link.href.kind === documentLinks_1.HrefKind.Internal) {
            return this.#renameFilePath(triggerRef.link.source.resource, triggerRef.link.href, allRefsInfo, newName, token);
        }
        return undefined;
    }
    async #renameFilePath(triggerDocument, triggerHref, allRefsInfo, newName, token) {
        const builder = new editBuilder_1.WorkspaceEditBuilder();
        const targetUri = await (0, workspace_1.statLinkToMarkdownFile)(this.#configuration, this.#workspace, triggerHref.path) ?? triggerHref.path;
        if (token.isCancellationRequested) {
            return builder.getEdit();
        }
        const rawNewFilePath = (0, documentLinks_1.resolveInternalDocumentLink)(triggerDocument, newName, this.#workspace);
        if (!rawNewFilePath) {
            return builder.getEdit();
        }
        let resolvedNewFilePath = rawNewFilePath.resource;
        if (!vscode_uri_1.Utils.extname(resolvedNewFilePath)) {
            // If the newly entered path doesn't have a file extension but the original link did
            // tack on a .md file extension
            if (vscode_uri_1.Utils.extname(targetUri)) {
                resolvedNewFilePath = resolvedNewFilePath.with({
                    path: resolvedNewFilePath.path + '.' + (this.#configuration.markdownFileExtensions[0] ?? config_1.defaultMarkdownFileExtension)
                });
            }
        }
        // First rename the file
        if (await this.#workspace.stat(targetUri)) {
            builder.renameFile(targetUri, resolvedNewFilePath);
        }
        // Then update all refs to it
        for (const ref of allRefsInfo.references) {
            if (ref.kind === references_1.MdReferenceKind.Link) {
                // Try to preserve style of existing links
                const newLinkText = getLinkRenameText(this.#workspace, ref.link.source, rawNewFilePath.resource, newName.startsWith('./') || newName.startsWith('.\\'));
                builder.replace(ref.link.source.resource, getFilePathRange(ref.link), encodeURI((newLinkText ?? newName).replace(/\\/g, '/')));
            }
        }
        return builder.getEdit();
    }
    #renameFragment(allRefsInfo, newName) {
        const slug = this.#slugifier.fromHeading(newName).value;
        const builder = new editBuilder_1.WorkspaceEditBuilder();
        for (const ref of allRefsInfo.references) {
            switch (ref.kind) {
                case references_1.MdReferenceKind.Header:
                    builder.replace(vscode_uri_1.URI.parse(ref.location.uri), ref.headerTextLocation.range, newName);
                    break;
                case references_1.MdReferenceKind.Link:
                    builder.replace(ref.link.source.resource, ref.link.source.fragmentRange ?? ref.location.range, !ref.link.source.fragmentRange || ref.link.href.kind === documentLinks_1.HrefKind.External ? newName : slug);
                    break;
            }
        }
        return builder.getEdit();
    }
    #renameExternalLink(allRefsInfo, newName) {
        const builder = new editBuilder_1.WorkspaceEditBuilder();
        for (const ref of allRefsInfo.references) {
            if (ref.kind === references_1.MdReferenceKind.Link) {
                builder.replace(ref.link.source.resource, ref.location.range, newName);
            }
        }
        return builder.getEdit();
    }
    #renameReferenceLinks(allRefsInfo, newName) {
        const builder = new editBuilder_1.WorkspaceEditBuilder();
        for (const ref of allRefsInfo.references) {
            if (ref.kind === references_1.MdReferenceKind.Link) {
                if (ref.link.kind === documentLinks_1.MdLinkKind.Definition) {
                    builder.replace(ref.link.source.resource, ref.link.ref.range, newName);
                }
                else {
                    builder.replace(ref.link.source.resource, ref.link.source.fragmentRange ?? ref.location.range, newName);
                }
            }
        }
        return builder.getEdit();
    }
    async #getAllReferences(document, position, token) {
        const version = document.version;
        if (this.#cachedRefs
            && this.#cachedRefs.resource.fsPath === (0, textDocument_1.getDocUri)(document).fsPath
            && this.#cachedRefs.version === document.version
            && (0, position_1.arePositionsEqual)(this.#cachedRefs.position, position)) {
            return this.#cachedRefs;
        }
        const references = await this.#referencesProvider.getReferencesAtPosition(document, position, token);
        if (token.isCancellationRequested) {
            return;
        }
        const triggerRef = references.find(ref => ref.isTriggerLocation);
        if (!triggerRef) {
            return undefined;
        }
        this.#cachedRefs = {
            resource: (0, textDocument_1.getDocUri)(document),
            version,
            position,
            references,
            triggerRef
        };
        return this.#cachedRefs;
    }
}
exports.MdRenameProvider = MdRenameProvider;
function getLinkRenameText(workspace, source, newPath, preferDotSlash = false) {
    if (source.hrefText.startsWith('/')) {
        const root = (0, documentLinks_1.resolveInternalDocumentLink)(source.resource, '/', workspace);
        if (!root) {
            return undefined;
        }
        return '/' + path.posix.relative(root.resource.path, newPath.path);
    }
    return (0, path_1.computeRelativePath)(source.resource, newPath, preferDotSlash);
}
exports.getLinkRenameText = getLinkRenameText;
function getFilePathRange(link) {
    if (link.source.fragmentRange) {
        return (0, range_1.modifyRange)(link.source.hrefRange, undefined, (0, position_1.translatePosition)(link.source.fragmentRange.start, { characterDelta: -1 }));
    }
    return link.source.hrefRange;
}
exports.getFilePathRange = getFilePathRange;
//# sourceMappingURL=rename.js.map

/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.computeRelativePath = exports.isParentDir = void 0;
const path = __webpack_require__(74);
const vscode_uri_1 = __webpack_require__(84);
const schemes_1 = __webpack_require__(106);
function isParentDir(parent, maybeChild) {
    if (parent.scheme === maybeChild.scheme && parent.authority === maybeChild.authority) {
        const relative = path.relative(parent.path, maybeChild.path);
        return !relative.startsWith('..');
    }
    return false;
}
exports.isParentDir = isParentDir;
function computeRelativePath(fromDoc, toDoc, preferDotSlash = false) {
    if (fromDoc.scheme === toDoc.scheme && fromDoc.scheme !== schemes_1.Schemes.untitled) {
        const rootDir = vscode_uri_1.Utils.dirname(fromDoc);
        let newLink = path.posix.relative(rootDir.path, toDoc.path);
        if (preferDotSlash && !(newLink.startsWith('../') || newLink.startsWith('..\\'))) {
            newLink = './' + newLink;
        }
        return newLink;
    }
    return undefined;
}
exports.computeRelativePath = computeRelativePath;
//# sourceMappingURL=path.js.map

/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Schemes = void 0;
exports.Schemes = Object.freeze({
    file: 'file',
    untitled: 'untitled',
});
//# sourceMappingURL=schemes.js.map

/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdReferencesProvider = exports.MdReferenceKind = void 0;
const logging_1 = __webpack_require__(87);
const position_1 = __webpack_require__(81);
const range_1 = __webpack_require__(82);
const textDocument_1 = __webpack_require__(83);
const dispose_1 = __webpack_require__(89);
const file_1 = __webpack_require__(100);
const workspace_1 = __webpack_require__(92);
const documentLinks_1 = __webpack_require__(86);
var MdReferenceKind;
(function (MdReferenceKind) {
    MdReferenceKind[MdReferenceKind["Link"] = 1] = "Link";
    MdReferenceKind[MdReferenceKind["Header"] = 2] = "Header";
})(MdReferenceKind = exports.MdReferenceKind || (exports.MdReferenceKind = {}));
/**
 * Stateful object that computes references for markdown files.
 */
class MdReferencesProvider extends dispose_1.Disposable {
    #configuration;
    #parser;
    #workspace;
    #tocProvider;
    #linkCache;
    #logger;
    constructor(configuration, parser, workspace, tocProvider, linkCache, logger) {
        super();
        this.#configuration = configuration;
        this.#parser = parser;
        this.#workspace = workspace;
        this.#tocProvider = tocProvider;
        this.#linkCache = linkCache;
        this.#logger = logger;
    }
    async provideReferences(document, position, context, token) {
        const allRefs = await this.getReferencesAtPosition(document, position, token);
        return allRefs
            .filter(ref => context.includeDeclaration || !ref.isDefinition)
            .map(ref => ref.location);
    }
    async getReferencesAtPosition(document, position, token) {
        this.#logger.log(logging_1.LogLevel.Debug, 'ReferencesProvider.getReferencesAtPosition', { document: document.uri, version: document.version });
        const toc = await this.#tocProvider.getForDocument(document);
        if (token.isCancellationRequested) {
            return [];
        }
        const header = toc.entries.find(entry => entry.line === position.line);
        if (header) {
            return this.#getReferencesToHeader(document, header, token);
        }
        else {
            return this.#getReferencesToLinkAtPosition(document, position, token);
        }
    }
    async getReferencesToFileInWorkspace(resource, token) {
        this.#logger.log(logging_1.LogLevel.Debug, 'ReferencesProvider.getAllReferencesToFileInWorkspace', { resource });
        const allLinksInWorkspace = await this.#getAllLinksInWorkspace();
        if (token.isCancellationRequested) {
            return [];
        }
        return Array.from(this.#findLinksToFile(resource, allLinksInWorkspace, undefined));
    }
    async #getReferencesToHeader(document, header, token) {
        const links = await this.#getAllLinksInWorkspace();
        if (token.isCancellationRequested) {
            return [];
        }
        const references = [];
        references.push({
            kind: MdReferenceKind.Header,
            isTriggerLocation: true,
            isDefinition: true,
            location: header.headerLocation,
            headerText: header.text,
            headerTextLocation: header.headerTextLocation
        });
        for (const link of links) {
            if (link.href.kind === documentLinks_1.HrefKind.Internal
                && (0, documentLinks_1.looksLikeLinkToResource)(this.#configuration, link.href, (0, textDocument_1.getDocUri)(document))
                && this.#parser.slugifier.fromHeading(link.href.fragment).value === header.slug.value) {
                references.push({
                    kind: MdReferenceKind.Link,
                    isTriggerLocation: false,
                    isDefinition: false,
                    link,
                    location: { uri: link.source.resource.toString(), range: link.source.hrefRange },
                });
            }
        }
        return references;
    }
    async #getReferencesToLinkAtPosition(document, position, token) {
        const docLinks = (await this.#linkCache.getForDocs([document]))[0];
        if (token.isCancellationRequested) {
            return [];
        }
        for (const link of docLinks) {
            if (link.kind === documentLinks_1.MdLinkKind.Definition) {
                // We could be in either the ref name or the definition
                if ((0, range_1.rangeContains)(link.ref.range, position)) {
                    return Array.from(this.#getReferencesToLinkReference(docLinks, link.ref.text, { resource: (0, textDocument_1.getDocUri)(document), range: link.ref.range }));
                }
                else if ((0, range_1.rangeContains)(link.source.hrefRange, position)) {
                    return this.#getReferencesToLink(docLinks, link, position, token);
                }
            }
            else {
                if ((0, range_1.rangeContains)(link.source.hrefRange, position)) {
                    return this.#getReferencesToLink(docLinks, link, position, token);
                }
            }
        }
        return [];
    }
    async #getReferencesToLink(docLinks, sourceLink, triggerPosition, token) {
        if (sourceLink.href.kind === documentLinks_1.HrefKind.Reference) {
            return Array.from(this.#getReferencesToLinkReference(docLinks, sourceLink.href.ref, { resource: sourceLink.source.resource, range: sourceLink.source.hrefRange }));
        }
        // Otherwise find all occurrences of the link in the workspace
        const allLinksInWorkspace = await this.#getAllLinksInWorkspace();
        if (token.isCancellationRequested) {
            return [];
        }
        if (sourceLink.href.kind === documentLinks_1.HrefKind.External) {
            const references = [];
            for (const link of allLinksInWorkspace) {
                if (link.href.kind === documentLinks_1.HrefKind.External && link.href.uri.toString() === sourceLink.href.uri.toString()) {
                    const isTriggerLocation = sourceLink.source.resource.fsPath === link.source.resource.fsPath && (0, range_1.areRangesEqual)(sourceLink.source.hrefRange, link.source.hrefRange);
                    references.push({
                        kind: MdReferenceKind.Link,
                        isTriggerLocation,
                        isDefinition: false,
                        link,
                        location: { uri: link.source.resource.toString(), range: link.source.hrefRange },
                    });
                }
            }
            return references;
        }
        const resolvedResource = await (0, workspace_1.statLinkToMarkdownFile)(this.#configuration, this.#workspace, sourceLink.href.path);
        if (token.isCancellationRequested) {
            return [];
        }
        const references = [];
        if (resolvedResource && this.#isMarkdownPath(resolvedResource) && sourceLink.href.fragment && sourceLink.source.fragmentRange && (0, range_1.rangeContains)(sourceLink.source.fragmentRange, triggerPosition)) {
            const toc = await this.#tocProvider.get(resolvedResource);
            const entry = toc.lookup(sourceLink.href.fragment);
            if (entry) {
                references.push({
                    kind: MdReferenceKind.Header,
                    isTriggerLocation: false,
                    isDefinition: true,
                    location: entry.headerLocation,
                    headerText: entry.text,
                    headerTextLocation: entry.headerTextLocation
                });
            }
            for (const link of allLinksInWorkspace) {
                if (link.href.kind !== documentLinks_1.HrefKind.Internal || !(0, documentLinks_1.looksLikeLinkToResource)(this.#configuration, link.href, resolvedResource)) {
                    continue;
                }
                if (this.#parser.slugifier.fromHeading(link.href.fragment).equals(this.#parser.slugifier.fromHeading(sourceLink.href.fragment))) {
                    const isTriggerLocation = sourceLink.source.resource.fsPath === link.source.resource.fsPath && (0, range_1.areRangesEqual)(sourceLink.source.hrefRange, link.source.hrefRange);
                    references.push({
                        kind: MdReferenceKind.Link,
                        isTriggerLocation,
                        isDefinition: false,
                        link,
                        location: { uri: link.source.resource.toString(), range: link.source.hrefRange },
                    });
                }
            }
        }
        else { // Triggered on a link without a fragment so we only require matching the file and ignore fragments
            references.push(...this.#findLinksToFile(resolvedResource ?? sourceLink.href.path, allLinksInWorkspace, sourceLink));
        }
        return references;
    }
    async #getAllLinksInWorkspace() {
        return (await this.#linkCache.values()).flat();
    }
    #isMarkdownPath(resolvedHrefPath) {
        return this.#workspace.hasMarkdownDocument(resolvedHrefPath) || (0, file_1.looksLikeMarkdownUri)(this.#configuration, resolvedHrefPath);
    }
    *#findLinksToFile(resource, links, sourceLink) {
        for (const link of links) {
            if (link.href.kind !== documentLinks_1.HrefKind.Internal || !(0, documentLinks_1.looksLikeLinkToResource)(this.#configuration, link.href, resource)) {
                continue;
            }
            // Exclude cases where the file is implicitly referencing itself
            if (link.source.hrefText.startsWith('#') && link.source.resource.fsPath === resource.fsPath) {
                continue;
            }
            const isTriggerLocation = !!sourceLink && sourceLink.source.resource.fsPath === link.source.resource.fsPath && (0, range_1.areRangesEqual)(sourceLink.source.hrefRange, link.source.hrefRange);
            const pathRange = this.#getPathRange(link);
            yield {
                kind: MdReferenceKind.Link,
                isTriggerLocation,
                isDefinition: false,
                link,
                location: { uri: link.source.resource.toString(), range: pathRange },
            };
        }
    }
    *#getReferencesToLinkReference(allLinks, refToFind, from) {
        for (const link of allLinks) {
            let ref;
            if (link.kind === documentLinks_1.MdLinkKind.Definition) {
                ref = link.ref.text;
            }
            else if (link.href.kind === documentLinks_1.HrefKind.Reference) {
                ref = link.href.ref;
            }
            else {
                continue;
            }
            if (ref === refToFind && link.source.resource.fsPath === from.resource.fsPath) {
                const isTriggerLocation = from.resource.fsPath === link.source.resource.fsPath && ((link.href.kind === documentLinks_1.HrefKind.Reference && (0, range_1.areRangesEqual)(from.range, link.source.hrefRange)) || (link.kind === documentLinks_1.MdLinkKind.Definition && (0, range_1.areRangesEqual)(from.range, link.ref.range)));
                const pathRange = this.#getPathRange(link);
                yield {
                    kind: MdReferenceKind.Link,
                    isTriggerLocation,
                    isDefinition: link.kind === documentLinks_1.MdLinkKind.Definition,
                    link,
                    location: { uri: from.resource.toString(), range: pathRange },
                };
            }
        }
    }
    /**
     * Get just the range of the file path, dropping the fragment
     */
    #getPathRange(link) {
        return link.source.fragmentRange
            ? (0, range_1.modifyRange)(link.source.hrefRange, undefined, (0, position_1.translatePosition)(link.source.fragmentRange.start, { characterDelta: -1 }))
            : link.source.hrefRange;
    }
}
exports.MdReferencesProvider = MdReferencesProvider;
//# sourceMappingURL=references.js.map

/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdDocumentSymbolProvider = void 0;
const lsp = __webpack_require__(25);
const logging_1 = __webpack_require__(87);
const position_1 = __webpack_require__(81);
const range_1 = __webpack_require__(82);
const documentLinks_1 = __webpack_require__(86);
class MdDocumentSymbolProvider {
    #tocProvider;
    #linkProvider;
    #logger;
    constructor(tocProvider, linkProvider, logger) {
        this.#tocProvider = tocProvider;
        this.#linkProvider = linkProvider;
        this.#logger = logger;
    }
    async provideDocumentSymbols(document, options, token) {
        this.#logger.log(logging_1.LogLevel.Debug, 'DocumentSymbolProvider.provideDocumentSymbols', { document: document.uri, version: document.version });
        const linkSymbols = await (options.includeLinkDefinitions ? this.#provideLinkDefinitionSymbols(document, token) : []);
        if (token.isCancellationRequested) {
            return [];
        }
        const toc = await this.#tocProvider.getForDocument(document);
        if (token.isCancellationRequested) {
            return [];
        }
        return this.#toSymbolTree(document, linkSymbols, toc);
    }
    #toSymbolTree(document, linkSymbols, toc) {
        const root = {
            level: -Infinity,
            children: [],
            parent: undefined,
            range: (0, range_1.makeRange)(0, 0, document.lineCount + 1, 0),
        };
        const additionalSymbols = [...linkSymbols];
        this.#buildTocSymbolTree(root, toc.entries, additionalSymbols);
        // Put remaining link definitions into top level document instead of last header
        root.children.push(...additionalSymbols);
        return root.children;
    }
    async #provideLinkDefinitionSymbols(document, token) {
        const { links } = await this.#linkProvider.getLinks(document);
        if (token.isCancellationRequested) {
            return [];
        }
        return links
            .filter(link => link.kind === documentLinks_1.MdLinkKind.Definition)
            .map((link) => this.#definitionToDocumentSymbol(link));
    }
    #definitionToDocumentSymbol(def) {
        return {
            kind: lsp.SymbolKind.Constant,
            name: `[${def.ref.text}]`,
            selectionRange: def.ref.range,
            range: def.source.range,
        };
    }
    #buildTocSymbolTree(parent, entries, additionalSymbols) {
        if (entries.length) {
            while (additionalSymbols.length && (0, position_1.isBefore)(additionalSymbols[0].range.end, entries[0].sectionLocation.range.start)) {
                parent.children.push(additionalSymbols.shift());
            }
        }
        if (!entries.length) {
            return;
        }
        const entry = entries[0];
        const symbol = this.#tocToDocumentSymbol(entry);
        symbol.children = [];
        while (entry.level <= parent.level) {
            parent = parent.parent;
        }
        parent.children.push(symbol);
        this.#buildTocSymbolTree({ level: entry.level, children: symbol.children, parent, range: entry.sectionLocation.range }, entries.slice(1), additionalSymbols);
    }
    #tocToDocumentSymbol(entry) {
        return {
            name: this.#getTocSymbolName(entry),
            kind: lsp.SymbolKind.String,
            range: entry.sectionLocation.range,
            selectionRange: entry.sectionLocation.range
        };
    }
    #getTocSymbolName(entry) {
        return '#'.repeat(entry.level) + ' ' + entry.text;
    }
}
exports.MdDocumentSymbolProvider = MdDocumentSymbolProvider;
//# sourceMappingURL=documentSymbols.js.map

/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdFileRenameProvider = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const path = __webpack_require__(74);
const vscode_uri_1 = __webpack_require__(84);
const config_1 = __webpack_require__(71);
const textDocument_1 = __webpack_require__(83);
const dispose_1 = __webpack_require__(89);
const editBuilder_1 = __webpack_require__(85);
const file_1 = __webpack_require__(100);
const path_1 = __webpack_require__(105);
const documentLinks_1 = __webpack_require__(86);
const references_1 = __webpack_require__(107);
const rename_1 = __webpack_require__(104);
class MdFileRenameProvider extends dispose_1.Disposable {
    #config;
    #workspace;
    #linkCache;
    #referencesProvider;
    constructor(config, workspace, linkCache, referencesProvider) {
        super();
        this.#config = config;
        this.#workspace = workspace;
        this.#linkCache = linkCache;
        this.#referencesProvider = referencesProvider;
    }
    async getRenameFilesInWorkspaceEdit(edits, token) {
        const builder = new editBuilder_1.WorkspaceEditBuilder();
        const participatingRenames = [];
        for (const edit of edits) {
            const stat = await this.#workspace.stat(edit.newUri);
            if (token.isCancellationRequested) {
                return undefined;
            }
            if (await (stat?.isDirectory ? this.#addDirectoryRenameEdits(edit, builder, token) : this.#addSingleFileRenameEdits(edit, edits, builder, token))) {
                participatingRenames.push(edit);
            }
            if (token.isCancellationRequested) {
                return undefined;
            }
        }
        return { participatingRenames, edit: builder.getEdit() };
    }
    async #addSingleFileRenameEdits(edit, allEdits, builder, token) {
        let didParticipate = false;
        // Update all references to the file
        if (await this.#addEditsForReferencesToFile(edit, builder, token)) {
            didParticipate = true;
        }
        if (token.isCancellationRequested) {
            return false;
        }
        // If the file moved was markdown, we also need to update links in the file itself
        if (await this.#tryAddEditsInSelf(edit, allEdits, builder)) {
            didParticipate = true;
        }
        return didParticipate;
    }
    async #addDirectoryRenameEdits(edit, builder, token) {
        // First update every link that points to something in the moved dir
        const allLinksInWorkspace = await this.#linkCache.entries();
        if (token.isCancellationRequested) {
            return false;
        }
        let didParticipate = false;
        for (const [docUri, links] of allLinksInWorkspace) {
            for (const link of links) {
                if (link.href.kind !== documentLinks_1.HrefKind.Internal) {
                    continue;
                }
                // Update links to the moved dir
                if ((0, path_1.isParentDir)(edit.oldUri, link.href.path)) {
                    const relative = path.posix.relative(edit.oldUri.path, link.href.path.path);
                    const newUri = edit.newUri.with({
                        path: path.posix.join(edit.newUri.path, relative)
                    });
                    if (this.#addLinkRenameEdit(docUri, link, newUri, builder)) {
                        didParticipate = true;
                        continue;
                    }
                }
                // If the link was within a file in the moved dir but traversed out of it, we also need to update the path
                if (link.source.pathText.startsWith('..') && (0, path_1.isParentDir)(edit.newUri, docUri)) {
                    // Resolve the link relative to the old file path
                    const oldDocUri = docUri.with({
                        path: vscode_uri_1.Utils.joinPath(edit.oldUri, path.posix.relative(edit.newUri.path, docUri.path)).path
                    });
                    const oldLink = (0, documentLinks_1.resolveInternalDocumentLink)(oldDocUri, link.source.hrefText, this.#workspace);
                    if (oldLink) {
                        let newPathText;
                        if ((0, path_1.isParentDir)(edit.oldUri, oldLink.resource)) {
                            // The link still points within the directory being moved.
                            // This means we just need to normalize the path it in case it was referencing any old names.
                            const rootDir = vscode_uri_1.Utils.dirname(oldDocUri);
                            newPathText = './' + path.posix.relative(rootDir.path, oldLink.resource.path);
                        }
                        else {
                            const rootDir = vscode_uri_1.Utils.dirname(docUri);
                            newPathText = path.posix.relative(rootDir.path, oldLink.resource.path);
                        }
                        didParticipate = true;
                        builder.replace(docUri, (0, rename_1.getFilePathRange)(link), encodeURI(newPathText));
                    }
                }
            }
        }
        return didParticipate;
    }
    /**
     * Try to add edits for when a markdown file has been renamed.
     * In this case we also need to update links within the file.
     */
    async #tryAddEditsInSelf(edit, allEdits, builder) {
        if (!(0, file_1.looksLikeMarkdownUri)(this.#config, edit.newUri)) {
            return false;
        }
        if ((0, config_1.isExcludedPath)(this.#config, edit.newUri)) {
            return false;
        }
        const doc = await this.#workspace.openMarkdownDocument(edit.newUri);
        if (!doc) {
            return false;
        }
        const links = (await this.#linkCache.getForDocs([doc]))[0];
        let didParticipate = false;
        for (const link of links) {
            if (await this.#addEditsForLinksInSelf(doc, link, edit, allEdits, builder)) {
                didParticipate = true;
            }
        }
        return didParticipate;
    }
    async #addEditsForLinksInSelf(doc, link, edit, allEdits, builder) {
        if (link.href.kind !== documentLinks_1.HrefKind.Internal) {
            return false;
        }
        if (link.source.hrefText.startsWith('#')) {
            // No rewrite needed as we are referencing the current doc implicitly
            return false;
        }
        if (link.source.hrefText.startsWith('/')) {
            // We likely don't need to update anything since an absolute path is used
            return false;
        }
        // Resolve the link relative to the old file path
        let oldLink = (0, documentLinks_1.resolveInternalDocumentLink)(edit.oldUri, link.source.hrefText, this.#workspace);
        if (!oldLink) {
            return false;
        }
        // See if the old link was effected by one of the renames
        for (const edit of allEdits) {
            if (edit.oldUri.toString() === oldLink.resource.toString() || (0, path_1.isParentDir)(edit.oldUri, oldLink.resource)) {
                oldLink = { resource: vscode_uri_1.Utils.joinPath(edit.newUri, path.posix.relative(edit.oldUri.path, oldLink.resource.path)), linkFragment: oldLink.linkFragment };
                break;
            }
        }
        return this.#addLinkRenameEdit((0, textDocument_1.getDocUri)(doc), link, oldLink.resource, builder);
    }
    /**
     * Update links across the workspace for the new file name
     */
    async #addEditsForReferencesToFile(edit, builder, token) {
        if ((0, config_1.isExcludedPath)(this.#config, edit.newUri)) {
            return false;
        }
        const refs = await this.#referencesProvider.getReferencesToFileInWorkspace(edit.oldUri, token);
        if (token.isCancellationRequested) {
            return false;
        }
        let didParticipate = false;
        for (const ref of refs) {
            if (ref.kind === references_1.MdReferenceKind.Link) {
                if (this.#addLinkRenameEdit(vscode_uri_1.URI.parse(ref.location.uri), ref.link, edit.newUri, builder)) {
                    didParticipate = true;
                }
            }
        }
        return didParticipate;
    }
    #addLinkRenameEdit(doc, link, newUri, builder) {
        if (link.href.kind !== documentLinks_1.HrefKind.Internal) {
            return false;
        }
        let newFilePath = newUri;
        if (this.#shouldRemoveFileExtensionForRename(link.href, newUri)) {
            const editExt = vscode_uri_1.Utils.extname(newUri);
            newFilePath = newUri.with({
                path: newUri.path.slice(0, newUri.path.length - editExt.length)
            });
        }
        const newLinkText = (0, rename_1.getLinkRenameText)(this.#workspace, link.source, newFilePath, link.source.pathText.startsWith('.'));
        if (typeof newLinkText === 'string') {
            builder.replace(doc, (0, rename_1.getFilePathRange)(link), encodeURI(newLinkText));
            return true;
        }
        return false;
    }
    #shouldRemoveFileExtensionForRename(originalHref, newUri) {
        if (!(0, file_1.looksLikeMarkdownUri)(this.#config, newUri)) {
            return false;
        }
        if (this.#config.preferredMdPathExtensionStyle === config_1.PreferredMdPathExtensionStyle.removeExtension) {
            return true;
        }
        // If the original markdown link did not use a file extension, remove ours too
        return !vscode_uri_1.Utils.extname(originalHref.path);
    }
}
exports.MdFileRenameProvider = MdFileRenameProvider;
//# sourceMappingURL=fileRename.js.map

/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdFoldingProvider = void 0;
const lsp = __webpack_require__(25);
const logging_1 = __webpack_require__(87);
const textDocument_1 = __webpack_require__(83);
const string_1 = __webpack_require__(90);
const rangeLimit = 5000;
class MdFoldingProvider {
    #parser;
    #tocProvider;
    #logger;
    constructor(parser, tocProvider, logger) {
        this.#parser = parser;
        this.#tocProvider = tocProvider;
        this.#logger = logger;
    }
    async provideFoldingRanges(document, token) {
        this.#logger.log(logging_1.LogLevel.Debug, 'MdFoldingProvider.provideFoldingRanges', { document: document.uri, version: document.version });
        const foldables = await Promise.all([
            this.#getRegions(document, token),
            this.#getHeaderFoldingRanges(document, token),
            this.#getBlockFoldingRanges(document, token)
        ]);
        const result = foldables.flat();
        return result.length > rangeLimit ? result.slice(0, rangeLimit) : result;
    }
    async #getRegions(document, token) {
        const tokens = await this.#parser.tokenize(document);
        if (token.isCancellationRequested) {
            return [];
        }
        return Array.from(this.#getRegionsFromTokens(tokens));
    }
    *#getRegionsFromTokens(tokens) {
        const nestingStack = [];
        for (const token of tokens) {
            const marker = asRegionMarker(token);
            if (marker) {
                if (marker.isStart) {
                    nestingStack.push(marker);
                }
                else if (nestingStack.length && nestingStack[nestingStack.length - 1].isStart) {
                    yield { startLine: nestingStack.pop().token.map[0], endLine: marker.token.map[0], kind: lsp.FoldingRangeKind.Region };
                }
                else {
                    // noop: invalid nesting (i.e. [end, start] or [start, end, end])
                }
            }
        }
    }
    async #getHeaderFoldingRanges(document, token) {
        const toc = await this.#tocProvider.getForDocument(document);
        if (token.isCancellationRequested) {
            return [];
        }
        return toc.entries.map((entry) => {
            let endLine = entry.sectionLocation.range.end.line;
            if ((0, string_1.isEmptyOrWhitespace)((0, textDocument_1.getLine)(document, endLine)) && endLine >= entry.line + 1) {
                endLine = endLine - 1;
            }
            return { startLine: entry.line, endLine };
        });
    }
    async #getBlockFoldingRanges(document, token) {
        const tokens = await this.#parser.tokenize(document);
        if (token.isCancellationRequested) {
            return [];
        }
        return Array.from(this.#getBlockFoldingRangesFromTokens(document, tokens));
    }
    *#getBlockFoldingRangesFromTokens(document, tokens) {
        for (const token of tokens) {
            if (isFoldableToken(token)) {
                const startLine = token.map[0];
                let endLine = token.map[1] - 1;
                if ((0, string_1.isEmptyOrWhitespace)((0, textDocument_1.getLine)(document, endLine)) && endLine >= startLine + 1) {
                    endLine = endLine - 1;
                }
                if (endLine > startLine) {
                    yield { startLine, endLine, kind: this.#getFoldingRangeKind(token) };
                }
            }
        }
    }
    #getFoldingRangeKind(listItem) {
        return listItem.type === 'html_block' && listItem.content.startsWith('<!--')
            ? lsp.FoldingRangeKind.Comment
            : undefined;
    }
}
exports.MdFoldingProvider = MdFoldingProvider;
function isStartRegion(t) { return /^\s*<!--\s*#?region\b.*-->/.test(t); }
function isEndRegion(t) { return /^\s*<!--\s*#?endregion\b.*-->/.test(t); }
function asRegionMarker(token) {
    if (!token.map || token.type !== 'html_block') {
        return undefined;
    }
    if (isStartRegion(token.content)) {
        return { token: token, isStart: true };
    }
    if (isEndRegion(token.content)) {
        return { token: token, isStart: false };
    }
    return undefined;
}
function isFoldableToken(token) {
    if (!token.map) {
        return false;
    }
    switch (token.type) {
        case 'fence':
        case 'list_item_open':
        case 'table_open':
        case 'blockquote_open':
            return token.map[1] > token.map[0];
        case 'html_block':
            if (asRegionMarker(token)) {
                return false;
            }
            return token.map[1] > token.map[0] + 1;
        default:
            return false;
    }
}
//# sourceMappingURL=folding.js.map

/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdPathCompletionProvider = exports.IncludeWorkspaceHeaderCompletions = void 0;
const l10n = __webpack_require__(80);
const path_1 = __webpack_require__(74);
const lsp = __webpack_require__(25);
const vscode_uri_1 = __webpack_require__(84);
const config_1 = __webpack_require__(71);
const tableOfContents_1 = __webpack_require__(112);
const position_1 = __webpack_require__(81);
const range_1 = __webpack_require__(82);
const textDocument_1 = __webpack_require__(83);
const file_1 = __webpack_require__(100);
const path_2 = __webpack_require__(105);
const schemes_1 = __webpack_require__(106);
const string_1 = __webpack_require__(90);
const workspace_1 = __webpack_require__(92);
const workspaceCache_1 = __webpack_require__(93);
var CompletionContextKind;
(function (CompletionContextKind) {
    /** `[...](|)` */
    CompletionContextKind[CompletionContextKind["Link"] = 0] = "Link";
    /** `[...][|]` */
    CompletionContextKind[CompletionContextKind["ReferenceLink"] = 1] = "ReferenceLink";
    /** `[]: |` */
    CompletionContextKind[CompletionContextKind["LinkDefinition"] = 2] = "LinkDefinition";
})(CompletionContextKind || (CompletionContextKind = {}));
function tryDecodeUriComponent(str) {
    try {
        return decodeURIComponent(str);
    }
    catch {
        return str;
    }
}
/**
 * Controls if header completions for other files in the workspace be returned.
 */
var IncludeWorkspaceHeaderCompletions;
(function (IncludeWorkspaceHeaderCompletions) {
    /**
     * Never return workspace header completions.
     */
    IncludeWorkspaceHeaderCompletions["never"] = "never";
    /**
     * Return workspace header completions after `##` is typed.
     *
     * This lets the user signal
     */
    IncludeWorkspaceHeaderCompletions["onDoubleHash"] = "onDoubleHash";
    /**
     * Return workspace header completions after either a single `#` is typed or after `##`
     *
     * For a single hash, this means the workspace header completions will be returned along side the current file header completions.
     */
    IncludeWorkspaceHeaderCompletions["onSingleOrDoubleHash"] = "onSingleOrDoubleHash";
})(IncludeWorkspaceHeaderCompletions = exports.IncludeWorkspaceHeaderCompletions || (exports.IncludeWorkspaceHeaderCompletions = {}));
const sortTexts = Object.freeze({
    localHeader: '1',
    workspaceHeader: '2',
});
/**
 * Adds path completions in markdown files.
 */
class MdPathCompletionProvider {
    #configuration;
    #workspace;
    #parser;
    #linkProvider;
    #workspaceTocCache;
    constructor(configuration, workspace, parser, linkProvider, tocProvider) {
        this.#configuration = configuration;
        this.#workspace = workspace;
        this.#parser = parser;
        this.#linkProvider = linkProvider;
        this.#workspaceTocCache = new workspaceCache_1.MdWorkspaceInfoCache(workspace, (doc) => tocProvider.getForDocument(doc));
    }
    async provideCompletionItems(document, position, context, token) {
        const pathContext = this.#getPathCompletionContext(document, position);
        if (!pathContext) {
            return [];
        }
        const items = [];
        for await (const item of this.#provideCompletionItems(document, position, pathContext, context, token)) {
            items.push(item);
        }
        return items;
    }
    async *#provideCompletionItems(document, position, context, options, token) {
        switch (context.kind) {
            case CompletionContextKind.ReferenceLink: {
                yield* this.#provideReferenceSuggestions(document, position, context, token);
                return;
            }
            case CompletionContextKind.LinkDefinition:
            case CompletionContextKind.Link: {
                if ((context.linkPrefix.startsWith('#') && options.includeWorkspaceHeaderCompletions === IncludeWorkspaceHeaderCompletions.onSingleOrDoubleHash) ||
                    (context.linkPrefix.startsWith('##') && (options.includeWorkspaceHeaderCompletions === IncludeWorkspaceHeaderCompletions.onDoubleHash || options.includeWorkspaceHeaderCompletions === IncludeWorkspaceHeaderCompletions.onSingleOrDoubleHash))) {
                    const insertRange = (0, range_1.makeRange)(context.linkTextStartPosition, position);
                    yield* this.#provideWorkspaceHeaderSuggestions(document, position, context, insertRange, token);
                    return;
                }
                const isAnchorInCurrentDoc = context.anchorInfo && context.anchorInfo.beforeAnchor.length === 0;
                // Add anchor #links in current doc
                if (context.linkPrefix.length === 0 || isAnchorInCurrentDoc) {
                    const insertRange = (0, range_1.makeRange)(context.linkTextStartPosition, position);
                    yield* this.#provideHeaderSuggestions(document, position, context, insertRange, token);
                }
                if (token.isCancellationRequested) {
                    return;
                }
                if (!isAnchorInCurrentDoc) {
                    if (context.anchorInfo) { // Anchor to a different document
                        const rawUri = this.#resolveReference(document, context.anchorInfo.beforeAnchor);
                        if (rawUri) {
                            const otherDoc = await (0, workspace_1.openLinkToMarkdownFile)(this.#configuration, this.#workspace, rawUri);
                            if (token.isCancellationRequested) {
                                return;
                            }
                            if (otherDoc) {
                                const anchorStartPosition = (0, position_1.translatePosition)(position, { characterDelta: -(context.anchorInfo.anchorPrefix.length + 1) });
                                const range = (0, range_1.makeRange)(anchorStartPosition, position);
                                yield* this.#provideHeaderSuggestions(otherDoc, position, context, range, token);
                            }
                        }
                    }
                    else { // Normal path suggestions
                        yield* this.#providePathSuggestions(document, position, context, token);
                    }
                }
            }
        }
    }
    /// [...](...|
    #linkStartPattern = new RegExp(
    // text
    (0, string_1.r) `\[` +
        /**/ (0, string_1.r) `(?:` +
        /*****/ (0, string_1.r) `[^\[\]\\]|` + // Non-bracket chars, or...
        /*****/ (0, string_1.r) `\\.|` + // Escaped char, or...
        /*****/ (0, string_1.r) `\[[^\[\]]*\]` + // Matched bracket pair
        /**/ (0, string_1.r) `)*` +
        (0, string_1.r) `\]` +
        // Destination start
        (0, string_1.r) `\(\s*(<[^\>\)]*|[^\s\(\)]*)` +
        (0, string_1.r) `$` // Must match cursor position
    );
    /// [...][...|
    #referenceLinkStartPattern = /\[([^\]]*?)\]\[\s*([^\s\(\)]*)$/;
    /// [id]: |
    #definitionPattern = /^\s*\[[\w\-]+\]:\s*([^\s]*)$/m;
    #getPathCompletionContext(document, position) {
        const line = (0, textDocument_1.getLine)(document, position.line);
        const linePrefixText = line.slice(0, position.character);
        const lineSuffixText = line.slice(position.character);
        const linkPrefixMatch = linePrefixText.match(this.#linkStartPattern);
        if (linkPrefixMatch) {
            const isAngleBracketLink = linkPrefixMatch[1].startsWith('<');
            const prefix = linkPrefixMatch[1].slice(isAngleBracketLink ? 1 : 0);
            if (this.#refLooksLikeUrl(prefix)) {
                return undefined;
            }
            const suffix = lineSuffixText.match(/^[^\)\s][^\)\s\>]*/);
            return {
                kind: CompletionContextKind.Link,
                linkPrefix: tryDecodeUriComponent(prefix),
                linkTextStartPosition: (0, position_1.translatePosition)(position, { characterDelta: -prefix.length }),
                linkSuffix: suffix ? suffix[0] : '',
                anchorInfo: this.#getAnchorContext(prefix),
                skipEncoding: isAngleBracketLink,
            };
        }
        const definitionLinkPrefixMatch = linePrefixText.match(this.#definitionPattern);
        if (definitionLinkPrefixMatch) {
            const isAngleBracketLink = definitionLinkPrefixMatch[1].startsWith('<');
            const prefix = definitionLinkPrefixMatch[1].slice(isAngleBracketLink ? 1 : 0);
            if (this.#refLooksLikeUrl(prefix)) {
                return undefined;
            }
            const suffix = lineSuffixText.match(/^[^\s]*/);
            return {
                kind: CompletionContextKind.LinkDefinition,
                linkPrefix: tryDecodeUriComponent(prefix),
                linkTextStartPosition: (0, position_1.translatePosition)(position, { characterDelta: -prefix.length }),
                linkSuffix: suffix ? suffix[0] : '',
                anchorInfo: this.#getAnchorContext(prefix),
                skipEncoding: isAngleBracketLink,
            };
        }
        const referenceLinkPrefixMatch = linePrefixText.match(this.#referenceLinkStartPattern);
        if (referenceLinkPrefixMatch) {
            const prefix = referenceLinkPrefixMatch[2];
            const suffix = lineSuffixText.match(/^[^\]\s]*/);
            return {
                kind: CompletionContextKind.ReferenceLink,
                linkPrefix: prefix,
                linkTextStartPosition: (0, position_1.translatePosition)(position, { characterDelta: -prefix.length }),
                linkSuffix: suffix ? suffix[0] : '',
            };
        }
        return undefined;
    }
    /**
     * Check if {@param ref} looks like a 'http:' style url.
     */
    #refLooksLikeUrl(prefix) {
        return /^\s*[\w\d\-]+:/.test(prefix);
    }
    #getAnchorContext(prefix) {
        const anchorMatch = prefix.match(/^(.*)#([\w\d\-]*)$/);
        if (!anchorMatch) {
            return undefined;
        }
        return {
            beforeAnchor: anchorMatch[1],
            anchorPrefix: anchorMatch[2],
        };
    }
    async *#provideReferenceSuggestions(document, position, context, token) {
        const insertionRange = (0, range_1.makeRange)(context.linkTextStartPosition, position);
        const replacementRange = (0, range_1.makeRange)(insertionRange.start, (0, position_1.translatePosition)(position, { characterDelta: context.linkSuffix.length }));
        const { definitions } = await this.#linkProvider.getLinks(document);
        if (token.isCancellationRequested) {
            return;
        }
        for (const def of definitions) {
            yield {
                kind: lsp.CompletionItemKind.Reference,
                label: def.ref.text,
                detail: l10n.t(`Reference link '{0}'`, def.ref.text),
                textEdit: {
                    newText: def.ref.text,
                    insert: insertionRange,
                    replace: replacementRange,
                },
            };
        }
    }
    async *#provideHeaderSuggestions(document, position, context, insertionRange, token) {
        const toc = await tableOfContents_1.TableOfContents.createForContainingDoc(this.#parser, this.#workspace, document, token);
        if (token.isCancellationRequested) {
            return;
        }
        const replacementRange = (0, range_1.makeRange)(insertionRange.start, (0, position_1.translatePosition)(position, { characterDelta: context.linkSuffix.length }));
        for (const entry of toc.entries) {
            const completionItem = this.#createHeaderCompletion(entry, insertionRange, replacementRange);
            completionItem.labelDetails = {};
            yield completionItem;
        }
    }
    #createHeaderCompletion(entry, insertionRange, replacementRange, filePath = '') {
        const label = '#' + decodeURIComponent(entry.slug.value);
        const newText = filePath + '#' + decodeURIComponent(entry.slug.value);
        return {
            kind: lsp.CompletionItemKind.Reference,
            label,
            detail: this.#ownHeaderEntryDetails(entry),
            textEdit: {
                newText,
                insert: insertionRange,
                replace: replacementRange,
            },
        };
    }
    #ownHeaderEntryDetails(entry) {
        return l10n.t(`Link to '{0}'`, '#'.repeat(entry.level) + ' ' + entry.text);
    }
    /**
     * Suggestions for headers across  all md files in the workspace
     */
    async *#provideWorkspaceHeaderSuggestions(document, position, context, insertionRange, token) {
        const tocs = await this.#workspaceTocCache.entries();
        if (token.isCancellationRequested) {
            return;
        }
        const replacementRange = (0, range_1.makeRange)(insertionRange.start, (0, position_1.translatePosition)(position, { characterDelta: context.linkSuffix.length }));
        for (const [toDoc, toc] of tocs) {
            const isHeaderInCurrentDocument = toDoc.toString() === (0, textDocument_1.getDocUri)(document).toString();
            const rawPath = isHeaderInCurrentDocument ? '' : (0, path_2.computeRelativePath)((0, textDocument_1.getDocUri)(document), toDoc);
            if (typeof rawPath === 'undefined') {
                continue;
            }
            const normalizedPath = this.#normalizeFileNameCompletion(rawPath);
            const path = context.skipEncoding ? normalizedPath : encodeURI(normalizedPath);
            for (const entry of toc.entries) {
                const completionItem = this.#createHeaderCompletion(entry, insertionRange, replacementRange, path);
                completionItem.filterText = '#' + completionItem.label;
                completionItem.sortText = isHeaderInCurrentDocument ? sortTexts.localHeader : sortTexts.workspaceHeader;
                if (isHeaderInCurrentDocument) {
                    completionItem.detail = this.#ownHeaderEntryDetails(entry);
                }
                else if (path) {
                    completionItem.detail = l10n.t(`Link to '# {0}' in '{1}'`, entry.text, path);
                    completionItem.labelDetails = { description: path };
                }
                yield completionItem;
            }
        }
    }
    async *#providePathSuggestions(document, position, context, token) {
        const valueBeforeLastSlash = context.linkPrefix.substring(0, context.linkPrefix.lastIndexOf('/') + 1); // keep the last slash
        const parentDir = this.#resolveReference(document, valueBeforeLastSlash || '.');
        if (!parentDir) {
            return;
        }
        const pathSegmentStart = (0, position_1.translatePosition)(position, { characterDelta: valueBeforeLastSlash.length - context.linkPrefix.length });
        const insertRange = (0, range_1.makeRange)(pathSegmentStart, position);
        const pathSegmentEnd = (0, position_1.translatePosition)(position, { characterDelta: context.linkSuffix.length });
        const replacementRange = (0, range_1.makeRange)(pathSegmentStart, pathSegmentEnd);
        let dirInfo;
        try {
            dirInfo = await this.#workspace.readDirectory(parentDir);
        }
        catch {
            return;
        }
        if (token.isCancellationRequested) {
            return;
        }
        // eslint-disable-next-line prefer-const
        for (let [name, type] of dirInfo) {
            const uri = vscode_uri_1.Utils.joinPath(parentDir, name);
            if ((0, config_1.isExcludedPath)(this.#configuration, uri)) {
                continue;
            }
            if (!type.isDirectory) {
                name = this.#normalizeFileNameCompletion(name);
            }
            const isDir = type.isDirectory;
            const newText = (context.skipEncoding ? name : encodeURIComponent(name)) + (isDir ? '/' : '');
            const label = isDir ? name + '/' : name;
            yield {
                label,
                kind: isDir ? lsp.CompletionItemKind.Folder : lsp.CompletionItemKind.File,
                detail: l10n.t(`Link to '{0}'`, label),
                documentation: isDir ? uri.path + '/' : uri.path,
                textEdit: {
                    newText,
                    insert: insertRange,
                    replace: replacementRange,
                },
                command: isDir ? { command: 'editor.action.triggerSuggest', title: '' } : undefined,
            };
        }
    }
    #normalizeFileNameCompletion(name) {
        if (this.#configuration.preferredMdPathExtensionStyle === 'removeExtension') {
            if ((0, file_1.looksLikeMarkdownFilePath)(this.#configuration, name)) {
                const ext = (0, path_1.extname)(name);
                name = name.slice(0, -ext.length);
            }
        }
        return name;
    }
    #resolveReference(document, ref) {
        const docUri = this.#getFileUriOfTextDocument(document);
        if (ref.startsWith('/')) {
            const workspaceFolder = (0, workspace_1.getWorkspaceFolder)(this.#workspace, docUri);
            if (workspaceFolder) {
                return vscode_uri_1.Utils.joinPath(workspaceFolder, ref);
            }
            else {
                return this.#resolvePath(docUri, ref.slice(1));
            }
        }
        return this.#resolvePath(docUri, ref);
    }
    #resolvePath(root, ref) {
        try {
            if (root.scheme === schemes_1.Schemes.file) {
                return vscode_uri_1.URI.file((0, path_1.resolve)((0, path_1.dirname)(root.fsPath), ref));
            }
            else {
                return root.with({
                    path: (0, path_1.resolve)((0, path_1.dirname)(root.path), ref),
                });
            }
        }
        catch {
            return undefined;
        }
    }
    #getFileUriOfTextDocument(document) {
        return this.#workspace.getContainingDocument?.((0, textDocument_1.getDocUri)(document))?.uri ?? (0, textDocument_1.getDocUri)(document);
    }
}
exports.MdPathCompletionProvider = MdPathCompletionProvider;
//# sourceMappingURL=pathCompletions.js.map

/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdTableOfContentsProvider = exports.TableOfContents = void 0;
const logging_1 = __webpack_require__(87);
const slugify_1 = __webpack_require__(113);
const range_1 = __webpack_require__(82);
const textDocument_1 = __webpack_require__(83);
const dispose_1 = __webpack_require__(89);
const workspaceCache_1 = __webpack_require__(93);
class TableOfContents {
    entries;
    static async create(parser, document, token) {
        const entries = await this.#buildToc(parser, document, token);
        return new TableOfContents(entries, parser.slugifier);
    }
    static async createForContainingDoc(parser, workspace, document, token) {
        const context = workspace.getContainingDocument?.((0, textDocument_1.getDocUri)(document));
        if (context) {
            const entries = (await Promise.all(Array.from(context.children, async (cell) => {
                const doc = await workspace.openMarkdownDocument(cell.uri);
                if (!doc || token.isCancellationRequested) {
                    return [];
                }
                return this.#buildToc(parser, doc, token);
            }))).flat();
            return new TableOfContents(entries, parser.slugifier);
        }
        return this.create(parser, document, token);
    }
    static async #buildToc(parser, document, token) {
        const docUri = (0, textDocument_1.getDocUri)(document);
        const toc = [];
        const tokens = await parser.tokenize(document);
        if (token.isCancellationRequested) {
            return [];
        }
        const existingSlugEntries = new Map();
        const headers = [];
        let currentHeader;
        for (const token of tokens) {
            switch (token.type) {
                case 'heading_open': {
                    currentHeader = { open: token, body: [] };
                    headers.push(currentHeader);
                    break;
                }
                case 'heading_close': {
                    currentHeader = undefined;
                    break;
                }
                default: {
                    currentHeader?.body.push(token);
                    break;
                }
            }
        }
        for (const { open, body } of headers) {
            if (!open.map) {
                continue;
            }
            const lineNumber = open.map[0];
            const line = (0, textDocument_1.getLine)(document, lineNumber);
            const bodyText = TableOfContents.#getHeaderTitleAsPlainText(body);
            let slug = parser.slugifier.fromHeading(bodyText);
            const existingSlugEntry = existingSlugEntries.get(slug.value);
            if (existingSlugEntry) {
                ++existingSlugEntry.count;
                slug = parser.slugifier.fromHeading(slug.value + '-' + existingSlugEntry.count);
            }
            else {
                existingSlugEntries.set(slug.value, { count: 0 });
            }
            const headerLocation = {
                uri: docUri.toString(),
                range: (0, range_1.makeRange)(lineNumber, 0, lineNumber, line.length)
            };
            const headerTextLocation = {
                uri: docUri.toString(),
                range: (0, range_1.makeRange)(lineNumber, line.match(/^#+\s*/)?.[0].length ?? 0, lineNumber, line.length - (line.match(/\s*#*$/)?.[0].length ?? 0))
            };
            toc.push({
                slug,
                text: line.replace(/^\s*#+\s*(.*?)(\s+#+)?$/, (_, word) => word.trim()),
                level: TableOfContents.#getHeaderLevel(open.markup),
                line: lineNumber,
                sectionLocation: headerLocation,
                headerLocation,
                headerTextLocation
            });
        }
        // Get full range of section
        return toc.map((entry, startIndex) => {
            let end = undefined;
            for (let i = startIndex + 1; i < toc.length; ++i) {
                if (toc[i].level <= entry.level) {
                    end = toc[i].line - 1;
                    break;
                }
            }
            const endLine = end ?? document.lineCount - 1;
            return {
                ...entry,
                sectionLocation: {
                    uri: docUri.toString(),
                    range: (0, range_1.makeRange)(entry.sectionLocation.range.start, { line: endLine, character: (0, textDocument_1.getLine)(document, endLine).length })
                }
            };
        });
    }
    static #getHeaderLevel(markup) {
        if (markup === '=') {
            return 1;
        }
        else if (markup === '-') {
            return 2;
        }
        else { // '#', '##', ...
            return markup.length;
        }
    }
    static #tokenToPlainText(token) {
        if (token.children) {
            return token.children.map(TableOfContents.#tokenToPlainText).join('');
        }
        switch (token.type) {
            case 'text':
            case 'emoji':
            case 'code_inline':
                return token.content;
            default:
                return '';
        }
    }
    static #getHeaderTitleAsPlainText(headerTitleParts) {
        return headerTitleParts
            .map(TableOfContents.#tokenToPlainText)
            .join('')
            .trim();
    }
    static empty = new TableOfContents([], slugify_1.githubSlugifier);
    #slugifier;
    constructor(entries, slugifier) {
        this.entries = entries;
        this.#slugifier = slugifier;
    }
    lookup(fragment) {
        const slug = this.#slugifier.fromHeading(fragment);
        return this.entries.find(entry => entry.slug.equals(slug));
    }
}
exports.TableOfContents = TableOfContents;
class MdTableOfContentsProvider extends dispose_1.Disposable {
    #cache;
    #parser;
    #workspace;
    #logger;
    constructor(parser, workspace, logger) {
        super();
        this.#parser = parser;
        this.#workspace = workspace;
        this.#logger = logger;
        this.#cache = this._register(new workspaceCache_1.MdDocumentInfoCache(workspace, (doc, token) => {
            this.#logger.log(logging_1.LogLevel.Debug, 'TableOfContentsProvider.create', { document: doc.uri, version: doc.version });
            return TableOfContents.create(parser, doc, token);
        }));
    }
    async get(resource) {
        return await this.#cache.get(resource) ?? TableOfContents.empty;
    }
    getForDocument(doc) {
        return this.#cache.getForDocument(doc);
    }
    getForContainingDoc(doc, token) {
        return TableOfContents.createForContainingDoc(this.#parser, this.#workspace, doc, token);
    }
}
exports.MdTableOfContentsProvider = MdTableOfContentsProvider;
//# sourceMappingURL=tableOfContents.js.map

/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.githubSlugifier = exports.Slug = void 0;
class Slug {
    value;
    constructor(value) {
        this.value = value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.Slug = Slug;
/**
 * A {@link ISlugifier slugifier} that approximates how GitHub's slugifier works.
 */
exports.githubSlugifier = new class {
    fromHeading(heading) {
        const slugifiedHeading = encodeURI(heading.trim()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace whitespace with -
            // allow-any-unicode-next-line
            .replace(/[\]\[\!\/\'\"\#\$\%\&\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\{\|\}\~\`。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝]/g, '') // Remove known punctuators
            .replace(/^-+/, '') // Remove leading -
            .replace(/-+$/, '') // Remove trailing -
        );
        return new Slug(slugifiedHeading);
    }
};
//# sourceMappingURL=slugify.js.map

/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdSelectionRangeProvider = void 0;
const logging_1 = __webpack_require__(87);
const position_1 = __webpack_require__(81);
const range_1 = __webpack_require__(82);
const textDocument_1 = __webpack_require__(83);
const arrays_1 = __webpack_require__(88);
const string_1 = __webpack_require__(90);
class MdSelectionRangeProvider {
    #parser;
    #tocProvider;
    #logger;
    constructor(parser, tocProvider, logger) {
        this.#parser = parser;
        this.#tocProvider = tocProvider;
        this.#logger = logger;
    }
    async provideSelectionRanges(document, positions, token) {
        this.#logger.log(logging_1.LogLevel.Debug, 'MdSelectionRangeProvider.provideSelectionRanges', { document: document.uri, version: document.version });
        return (0, arrays_1.coalesce)(await Promise.all(positions.map(position => this.#provideSelectionRange(document, position, token))));
    }
    async #provideSelectionRange(document, position, token) {
        const headerRange = await this.#getHeaderSelectionRange(document, position, token);
        if (token.isCancellationRequested) {
            return;
        }
        const blockRange = await this.#getBlockSelectionRange(document, position, headerRange, token);
        if (token.isCancellationRequested) {
            return;
        }
        const inlineRange = createInlineRange(document, position, blockRange);
        return inlineRange ?? blockRange ?? headerRange;
    }
    async #getBlockSelectionRange(document, position, parent, token) {
        const tokens = await this.#parser.tokenize(document);
        if (token.isCancellationRequested) {
            return undefined;
        }
        const blockTokens = getBlockTokensForPosition(tokens, position, parent);
        if (blockTokens.length === 0) {
            return undefined;
        }
        let currentRange = parent ?? createBlockRange(blockTokens.shift(), document, position.line, undefined);
        for (let i = 0; i < blockTokens.length; i++) {
            currentRange = createBlockRange(blockTokens[i], document, position.line, currentRange);
        }
        return currentRange;
    }
    async #getHeaderSelectionRange(document, position, token) {
        const toc = await this.#tocProvider.getForDocument(document);
        if (token.isCancellationRequested) {
            return undefined;
        }
        const headerInfo = getHeadersForPosition(toc.entries, position);
        const headers = headerInfo.headers;
        let currentRange;
        for (let i = 0; i < headers.length; i++) {
            currentRange = createHeaderRange(headers[i], i === headers.length - 1, headerInfo.headerOnThisLine, currentRange, getFirstChildHeader(document, headers[i], toc.entries));
        }
        return currentRange;
    }
}
exports.MdSelectionRangeProvider = MdSelectionRangeProvider;
function getHeadersForPosition(toc, position) {
    const enclosingHeaders = toc.filter(header => header.sectionLocation.range.start.line <= position.line && header.sectionLocation.range.end.line >= position.line);
    const sortedHeaders = enclosingHeaders.sort((header1, header2) => (header1.line - position.line) - (header2.line - position.line));
    const onThisLine = toc.find(header => header.line === position.line) !== undefined;
    return {
        headers: sortedHeaders,
        headerOnThisLine: onThisLine
    };
}
function createHeaderRange(header, isClosestHeaderToPosition, onHeaderLine, parent, startOfChildRange) {
    const range = header.sectionLocation.range;
    const contentRange = (0, range_1.makeRange)((0, position_1.translatePosition)(range.start, { lineDelta: 1 }), range.end);
    if (onHeaderLine && isClosestHeaderToPosition && startOfChildRange) {
        // selection was made on this header line, so select header and its content until the start of its first child
        // then all of its content
        return makeSelectionRange((0, range_1.modifyRange)(range, undefined, startOfChildRange), makeSelectionRange(range, parent));
    }
    else if (onHeaderLine && isClosestHeaderToPosition) {
        // selection was made on this header line and no children so expand to all of its content
        return makeSelectionRange(range, parent);
    }
    else if (isClosestHeaderToPosition && startOfChildRange) {
        // selection was made within content and has child so select content
        // of this header then all content then header
        return makeSelectionRange((0, range_1.modifyRange)(contentRange, undefined, startOfChildRange), makeSelectionRange(contentRange, (makeSelectionRange(range, parent))));
    }
    else {
        // not on this header line so select content then header
        return makeSelectionRange(contentRange, makeSelectionRange(range, parent));
    }
}
function getBlockTokensForPosition(tokens, position, parent) {
    const enclosingTokens = tokens.filter((token) => !!token.map && (token.map[0] <= position.line && token.map[1] > position.line) && (!parent || (token.map[0] >= parent.range.start.line && token.map[1] <= parent.range.end.line + 1)) && isBlockElement(token));
    if (enclosingTokens.length === 0) {
        return [];
    }
    const sortedTokens = enclosingTokens.sort((token1, token2) => (token2.map[1] - token2.map[0]) - (token1.map[1] - token1.map[0]));
    return sortedTokens;
}
function createBlockRange(block, document, cursorLine, parent) {
    if (block.type === 'fence') {
        return createFencedRange(block, cursorLine, document, parent);
    }
    let startLine = (0, string_1.isEmptyOrWhitespace)((0, textDocument_1.getLine)(document, block.map[0])) ? block.map[0] + 1 : block.map[0];
    let endLine = startLine === block.map[1] ? block.map[1] : block.map[1] - 1;
    if (block.type === 'paragraph_open' && block.map[1] - block.map[0] === 2) {
        startLine = endLine = cursorLine;
    }
    else if (isList(block) && (0, string_1.isEmptyOrWhitespace)((0, textDocument_1.getLine)(document, endLine))) {
        endLine = endLine - 1;
    }
    const range = (0, range_1.makeRange)(startLine, 0, endLine, (0, textDocument_1.getLine)(document, endLine).length);
    if (parent && (0, range_1.rangeContains)(parent.range, range) && !(0, range_1.areRangesEqual)(parent.range, range)) {
        return makeSelectionRange(range, parent);
    }
    else if (parent && (0, range_1.areRangesEqual)(parent.range, range)) {
        return parent;
    }
    else {
        return makeSelectionRange(range, undefined);
    }
}
function createInlineRange(document, cursorPosition, parent) {
    const lineText = (0, textDocument_1.getLine)(document, cursorPosition.line);
    const boldSelection = createBoldRange(lineText, cursorPosition.character, cursorPosition.line, parent);
    const italicSelection = createOtherInlineRange(lineText, cursorPosition.character, cursorPosition.line, true, parent);
    let comboSelection;
    if (boldSelection && italicSelection && !(0, range_1.areRangesEqual)(boldSelection.range, italicSelection.range)) {
        if ((0, range_1.rangeContains)(boldSelection.range, italicSelection.range)) {
            comboSelection = createOtherInlineRange(lineText, cursorPosition.character, cursorPosition.line, true, boldSelection);
        }
        else if ((0, range_1.rangeContains)(italicSelection.range, boldSelection.range)) {
            comboSelection = createBoldRange(lineText, cursorPosition.character, cursorPosition.line, italicSelection);
        }
    }
    const linkSelection = createLinkRange(lineText, cursorPosition.character, cursorPosition.line, comboSelection ?? boldSelection ?? italicSelection ?? parent);
    const inlineCodeBlockSelection = createOtherInlineRange(lineText, cursorPosition.character, cursorPosition.line, false, linkSelection ?? parent);
    return inlineCodeBlockSelection ?? linkSelection ?? comboSelection ?? boldSelection ?? italicSelection;
}
function createFencedRange(token, cursorLine, document, parent) {
    const startLine = token.map[0];
    const endLine = token.map[1] - 1;
    const onFenceLine = cursorLine === startLine || cursorLine === endLine;
    const fenceRange = (0, range_1.makeRange)(startLine, 0, endLine, (0, textDocument_1.getLine)(document, endLine).length);
    const contentRange = endLine - startLine > 2 && !onFenceLine ? (0, range_1.makeRange)(startLine + 1, 0, endLine - 1, (0, textDocument_1.getLine)(document, endLine - 1).length) : undefined;
    if (contentRange) {
        return makeSelectionRange(contentRange, makeSelectionRange(fenceRange, parent));
    }
    else {
        if (parent && (0, range_1.areRangesEqual)(parent.range, fenceRange)) {
            return parent;
        }
        else {
            return makeSelectionRange(fenceRange, parent);
        }
    }
}
function createBoldRange(lineText, cursorChar, cursorLine, parent) {
    const regex = /\*\*([^*]+\*?[^*]+\*?[^*]+)\*\*/gim;
    const matches = [...lineText.matchAll(regex)].filter(match => lineText.indexOf(match[0]) <= cursorChar && lineText.indexOf(match[0]) + match[0].length >= cursorChar);
    if (matches.length) {
        // should only be one match, so select first and index 0 contains the entire match
        const bold = matches[0][0];
        const startIndex = lineText.indexOf(bold);
        const cursorOnStars = cursorChar === startIndex || cursorChar === startIndex + 1 || cursorChar === startIndex + bold.length || cursorChar === startIndex + bold.length - 1;
        const contentAndStars = makeSelectionRange((0, range_1.makeRange)(cursorLine, startIndex, cursorLine, startIndex + bold.length), parent);
        const content = makeSelectionRange((0, range_1.makeRange)(cursorLine, startIndex + 2, cursorLine, startIndex + bold.length - 2), contentAndStars);
        return cursorOnStars ? contentAndStars : content;
    }
    return undefined;
}
function createOtherInlineRange(lineText, cursorChar, cursorLine, isItalic, parent) {
    const italicRegexes = [/(?:[^*]+)(\*([^*]+)(?:\*\*[^*]*\*\*)*([^*]+)\*)(?:[^*]+)/g, /^(?:[^*]*)(\*([^*]+)(?:\*\*[^*]*\*\*)*([^*]+)\*)(?:[^*]*)$/g];
    let matches = [];
    if (isItalic) {
        matches = [...lineText.matchAll(italicRegexes[0])].filter(match => lineText.indexOf(match[0]) <= cursorChar && lineText.indexOf(match[0]) + match[0].length >= cursorChar);
        if (!matches.length) {
            matches = [...lineText.matchAll(italicRegexes[1])].filter(match => lineText.indexOf(match[0]) <= cursorChar && lineText.indexOf(match[0]) + match[0].length >= cursorChar);
        }
    }
    else {
        matches = [...lineText.matchAll(/\`[^\`]*\`/g)].filter(match => lineText.indexOf(match[0]) <= cursorChar && lineText.indexOf(match[0]) + match[0].length >= cursorChar);
    }
    if (matches.length) {
        // should only be one match, so select first and select group 1 for italics because that contains just the italic section
        // doesn't include the leading and trailing characters which are guaranteed to not be * so as not to be confused with bold
        const match = isItalic ? matches[0][1] : matches[0][0];
        const startIndex = lineText.indexOf(match);
        const cursorOnType = cursorChar === startIndex || cursorChar === startIndex + match.length;
        const contentAndType = makeSelectionRange((0, range_1.makeRange)(cursorLine, startIndex, cursorLine, startIndex + match.length), parent);
        const content = makeSelectionRange((0, range_1.makeRange)(cursorLine, startIndex + 1, cursorLine, startIndex + match.length - 1), contentAndType);
        return cursorOnType ? contentAndType : content;
    }
    return undefined;
}
function createLinkRange(lineText, cursorChar, cursorLine, parent) {
    const regex = /(\[[^\(\)]*\])(\([^\[\]]*\))/g;
    const matches = [...lineText.matchAll(regex)].filter(match => lineText.indexOf(match[0]) <= cursorChar && lineText.indexOf(match[0]) + match[0].length > cursorChar);
    if (matches.length) {
        // should only be one match, so select first and index 0 contains the entire match, so match = [text](url)
        const link = matches[0][0];
        const linkRange = makeSelectionRange((0, range_1.makeRange)(cursorLine, lineText.indexOf(link), cursorLine, lineText.indexOf(link) + link.length), parent);
        const linkText = matches[0][1];
        const url = matches[0][2];
        // determine if cursor is within [text] or (url) in order to know which should be selected
        const nearestType = cursorChar >= lineText.indexOf(linkText) && cursorChar < lineText.indexOf(linkText) + linkText.length ? linkText : url;
        const indexOfType = lineText.indexOf(nearestType);
        // determine if cursor is on a bracket or paren and if so, return the [content] or (content), skipping over the content range
        const cursorOnType = cursorChar === indexOfType || cursorChar === indexOfType + nearestType.length;
        const contentAndNearestType = makeSelectionRange((0, range_1.makeRange)(cursorLine, indexOfType, cursorLine, indexOfType + nearestType.length), linkRange);
        const content = makeSelectionRange((0, range_1.makeRange)(cursorLine, indexOfType + 1, cursorLine, indexOfType + nearestType.length - 1), contentAndNearestType);
        return cursorOnType ? contentAndNearestType : content;
    }
    return undefined;
}
function isList(token) {
    return token.type ? ['ordered_list_open', 'list_item_open', 'bullet_list_open'].includes(token.type) : false;
}
function isBlockElement(token) {
    return !['list_item_close', 'paragraph_close', 'bullet_list_close', 'inline', 'heading_close', 'heading_open'].includes(token.type);
}
function getFirstChildHeader(document, header, toc) {
    let childRange;
    if (header && toc) {
        const children = toc.filter(t => (0, range_1.rangeContains)(header.sectionLocation.range, t.sectionLocation.range) && t.sectionLocation.range.start.line > header.sectionLocation.range.start.line).sort((t1, t2) => t1.line - t2.line);
        if (children.length > 0) {
            childRange = children[0].sectionLocation.range.start;
            const lineText = (0, textDocument_1.getLine)(document, childRange.line - 1);
            return childRange ? (0, position_1.translatePosition)(childRange, { lineDelta: -1, characterDelta: lineText.length }) : undefined;
        }
    }
    return undefined;
}
function makeSelectionRange(range, parent) {
    return { range, parent };
}
//# sourceMappingURL=smartSelect.js.map

/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MdWorkspaceSymbolProvider = void 0;
const lsp = __webpack_require__(25);
const dispose_1 = __webpack_require__(89);
const workspaceCache_1 = __webpack_require__(93);
class MdWorkspaceSymbolProvider extends dispose_1.Disposable {
    #cache;
    #symbolProvider;
    constructor(workspace, symbolProvider) {
        super();
        this.#symbolProvider = symbolProvider;
        this.#cache = this._register(new workspaceCache_1.MdWorkspaceInfoCache(workspace, (doc, token) => this.provideDocumentSymbolInformation(doc, token)));
    }
    async provideWorkspaceSymbols(query, token) {
        const allSymbols = await this.#cache.values();
        if (token.isCancellationRequested) {
            return [];
        }
        const normalizedQueryStr = query.toLowerCase();
        return allSymbols.flat().filter(symbolInformation => symbolInformation.name.toLowerCase().includes(normalizedQueryStr));
    }
    async provideDocumentSymbolInformation(document, token) {
        const docSymbols = await this.#symbolProvider.provideDocumentSymbols(document, {}, token);
        if (token.isCancellationRequested) {
            return [];
        }
        return Array.from(this.#toSymbolInformation(document.uri, docSymbols));
    }
    *#toSymbolInformation(uri, docSymbols) {
        for (const symbol of docSymbols) {
            yield {
                name: symbol.name,
                kind: lsp.SymbolKind.String,
                location: { uri, range: symbol.selectionRange }
            };
            if (symbol.children) {
                yield* this.#toSymbolInformation(uri, symbol.children);
            }
        }
    }
}
exports.MdWorkspaceSymbolProvider = MdWorkspaceSymbolProvider;
//# sourceMappingURL=workspaceSymbols.js.map

/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLsConfiguration = void 0;
const defaultConfig = {
    markdownFileExtensions: ['md'],
    knownLinkedToFileExtensions: [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'webp',
        'bmp',
        'tiff',
    ],
    excludePaths: [
        '**/.*',
        '**/node_modules/**',
    ]
};
function getLsConfiguration(overrides) {
    return {
        ...defaultConfig,
        ...overrides,
    };
}
exports.getLsConfiguration = getLsConfiguration;


/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationManager = void 0;
const vscode_languageserver_1 = __webpack_require__(4);
const dispose_1 = __webpack_require__(118);
class ConfigurationManager extends dispose_1.Disposable {
    constructor(connection) {
        super();
        this._onDidChangeConfiguration = this._register(new vscode_languageserver_1.Emitter());
        this.onDidChangeConfiguration = this._onDidChangeConfiguration.event;
        // The settings have changed. Is send on server activation as well.
        this._register(connection.onDidChangeConfiguration((change) => {
            this._settings = change.settings;
            this._onDidChangeConfiguration.fire(this._settings);
        }));
    }
    getSettings() {
        return this._settings;
    }
}
exports.ConfigurationManager = ConfigurationManager;


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Disposable = exports.disposeAll = void 0;
function disposeAll(disposables) {
    const errors = [];
    for (const disposable of disposables) {
        try {
            disposable.dispose();
        }
        catch (e) {
            errors.push(e);
        }
    }
    if (errors.length === 1) {
        throw errors[0];
    }
    else if (errors.length > 1) {
        throw new AggregateError(errors, 'Encountered errors while disposing of store');
    }
}
exports.disposeAll = disposeAll;
class Disposable {
    constructor() {
        this._isDisposed = false;
        this._disposables = [];
    }
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        disposeAll(this._disposables);
    }
    _register(value) {
        if (this._isDisposed) {
            value.dispose();
        }
        else {
            this._disposables.push(value);
        }
        return value;
    }
    get isDisposed() {
        return this._isDisposed;
    }
}
exports.Disposable = Disposable;


/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerValidateSupport = void 0;
const md = __webpack_require__(70);
const vscode_uri_1 = __webpack_require__(84);
const dispose_1 = __webpack_require__(118);
const defaultDiagnosticOptions = {
    validateFileLinks: md.DiagnosticLevel.ignore,
    validateReferences: md.DiagnosticLevel.ignore,
    validateFragmentLinks: md.DiagnosticLevel.ignore,
    validateMarkdownFileLinkFragments: md.DiagnosticLevel.ignore,
    validateUnusedLinkDefinitions: md.DiagnosticLevel.ignore,
    validateDuplicateLinkDefinitions: md.DiagnosticLevel.ignore,
    ignoreLinks: [],
};
function convertDiagnosticLevel(enabled) {
    switch (enabled) {
        case 'error': return md.DiagnosticLevel.error;
        case 'warning': return md.DiagnosticLevel.warning;
        case 'ignore': return md.DiagnosticLevel.ignore;
        case 'hint': return md.DiagnosticLevel.hint;
        default: return md.DiagnosticLevel.ignore;
    }
}
function getDiagnosticsOptions(config) {
    const settings = config.getSettings();
    if (!settings) {
        return defaultDiagnosticOptions;
    }
    const validateFragmentLinks = convertDiagnosticLevel(settings.markdown.validate.fragmentLinks.enabled);
    return {
        validateFileLinks: convertDiagnosticLevel(settings.markdown.validate.fileLinks.enabled),
        validateReferences: convertDiagnosticLevel(settings.markdown.validate.referenceLinks.enabled),
        validateFragmentLinks: convertDiagnosticLevel(settings.markdown.validate.fragmentLinks.enabled),
        validateMarkdownFileLinkFragments: settings.markdown.validate.fileLinks.markdownFragmentLinks === 'inherit' ? validateFragmentLinks : convertDiagnosticLevel(settings.markdown.validate.fileLinks.markdownFragmentLinks),
        validateUnusedLinkDefinitions: convertDiagnosticLevel(settings.markdown.validate.unusedLinkDefinitions.enabled),
        validateDuplicateLinkDefinitions: convertDiagnosticLevel(settings.markdown.validate.duplicateLinkDefinitions.enabled),
        ignoreLinks: settings.markdown.validate.ignoredLinks,
    };
}
function registerValidateSupport(connection, workspace, documents, ls, config, logger) {
    let diagnosticOptions = defaultDiagnosticOptions;
    function updateDiagnosticsSetting() {
        diagnosticOptions = getDiagnosticsOptions(config);
    }
    const subs = [];
    const manager = ls.createPullDiagnosticsManager();
    subs.push(manager);
    subs.push(manager.onLinkedToFileChanged(() => {
        // TODO: We only need to refresh certain files
        connection.languages.diagnostics.refresh();
    }));
    const emptyDiagnosticsResponse = Object.freeze({ kind: 'full', items: [] });
    connection.languages.diagnostics.on(async (params, token) => {
        logger.log(md.LogLevel.Debug, 'connection.languages.diagnostics.on', { document: params.textDocument.uri });
        if (!config.getSettings()?.markdown.validate.enabled) {
            return emptyDiagnosticsResponse;
        }
        const uri = vscode_uri_1.URI.parse(params.textDocument.uri);
        if (!workspace.hasMarkdownDocument(uri)) {
            return emptyDiagnosticsResponse;
        }
        const document = await workspace.openMarkdownDocument(uri);
        if (!document) {
            return emptyDiagnosticsResponse;
        }
        const diagnostics = await manager.computeDiagnostics(document, diagnosticOptions, token);
        return {
            kind: 'full',
            items: diagnostics,
        };
    });
    updateDiagnosticsSetting();
    subs.push(config.onDidChangeConfiguration(() => {
        updateDiagnosticsSetting();
        connection.languages.diagnostics.refresh();
    }));
    subs.push(documents.onDidClose(e => {
        manager.disposeDocumentResources(vscode_uri_1.URI.parse(e.document.uri));
    }));
    return {
        dispose: () => {
            (0, dispose_1.disposeAll)(subs);
        }
    };
}
exports.registerValidateSupport = registerValidateSupport;


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogFunctionLogger = void 0;
const md = __webpack_require__(70);
const dispose_1 = __webpack_require__(118);
class LogFunctionLogger extends dispose_1.Disposable {
    static now() {
        const now = new Date();
        return String(now.getUTCHours()).padStart(2, '0')
            + ':' + String(now.getMinutes()).padStart(2, '0')
            + ':' + String(now.getUTCSeconds()).padStart(2, '0') + '.' + String(now.getMilliseconds()).padStart(3, '0');
    }
    static data2String(data) {
        if (data instanceof Error) {
            if (typeof data.stack === 'string') {
                return data.stack;
            }
            return data.message;
        }
        if (typeof data === 'string') {
            return data;
        }
        return JSON.stringify(data, undefined, 2);
    }
    constructor(_logFn, _config) {
        super();
        this._logFn = _logFn;
        this._config = _config;
        this._register(this._config.onDidChangeConfiguration(() => {
            this._logLevel = LogFunctionLogger.readLogLevel(this._config);
        }));
        this._logLevel = LogFunctionLogger.readLogLevel(this._config);
    }
    static readLogLevel(config) {
        switch (config.getSettings()?.markdown.server.log) {
            case 'trace': return md.LogLevel.Trace;
            case 'debug': return md.LogLevel.Debug;
            case 'off':
            default:
                return md.LogLevel.Off;
        }
    }
    get level() { return this._logLevel; }
    log(level, message, data) {
        if (this.level < level) {
            return;
        }
        this.appendLine(`[${this.toLevelLabel(level)} ${LogFunctionLogger.now()}] ${message}`);
        if (data) {
            this.appendLine(LogFunctionLogger.data2String(data));
        }
    }
    toLevelLabel(level) {
        switch (level) {
            case md.LogLevel.Off: return 'Off';
            case md.LogLevel.Debug: return 'Debug';
            case md.LogLevel.Trace: return 'Trace';
        }
    }
    appendLine(value) {
        this._logFn(value);
    }
}
exports.LogFunctionLogger = LogFunctionLogger;


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveLinkTarget = exports.fs_watcher_onChange = exports.getEditForFileRenames = exports.getReferencesToFileInWorkspace = exports.findMarkdownFilesInWorkspace = exports.fs_watcher_delete = exports.fs_watcher_create = exports.fs_stat = exports.fs_readDirectory = exports.fs_readFile = exports.parse = void 0;
const vscode_languageserver_1 = __webpack_require__(4);
//#region From server
exports.parse = new vscode_languageserver_1.RequestType('markdown/parse');
exports.fs_readFile = new vscode_languageserver_1.RequestType('markdown/fs/readFile');
exports.fs_readDirectory = new vscode_languageserver_1.RequestType('markdown/fs/readDirectory');
exports.fs_stat = new vscode_languageserver_1.RequestType('markdown/fs/stat');
exports.fs_watcher_create = new vscode_languageserver_1.RequestType('markdown/fs/watcher/create');
exports.fs_watcher_delete = new vscode_languageserver_1.RequestType('markdown/fs/watcher/delete');
exports.findMarkdownFilesInWorkspace = new vscode_languageserver_1.RequestType('markdown/findMarkdownFilesInWorkspace');
//#endregion
//#region To server
exports.getReferencesToFileInWorkspace = new vscode_languageserver_1.RequestType('markdown/getReferencesToFileInWorkspace');
exports.getEditForFileRenames = new vscode_languageserver_1.RequestType('markdown/getEditForFileRenames');
exports.fs_watcher_onChange = new vscode_languageserver_1.RequestType('markdown/fs/watcher/onChange');
exports.resolveLinkTarget = new vscode_languageserver_1.RequestType('markdown/resolveLinkTarget');
//#endregion


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VsCodeClientWorkspace = void 0;
const vscode_languageserver_1 = __webpack_require__(4);
const vscode_languageserver_textdocument_1 = __webpack_require__(69);
const md = __webpack_require__(70);
const vscode_uri_1 = __webpack_require__(84);
const protocol = __webpack_require__(121);
const file_1 = __webpack_require__(123);
const limiter_1 = __webpack_require__(124);
const resourceMap_1 = __webpack_require__(125);
const schemes_1 = __webpack_require__(126);
class VsCodeDocument {
    constructor(uri, init) {
        this.uri = uri;
        this.inMemoryDoc = init?.inMemoryDoc;
        this.onDiskDoc = init?.onDiskDoc;
    }
    get version() {
        return this.inMemoryDoc?.version ?? this.onDiskDoc?.version ?? 0;
    }
    get lineCount() {
        return this.inMemoryDoc?.lineCount ?? this.onDiskDoc?.lineCount ?? 0;
    }
    getText(range) {
        if (this.inMemoryDoc) {
            return this.inMemoryDoc.getText(range);
        }
        if (this.onDiskDoc) {
            return this.onDiskDoc.getText(range);
        }
        throw new Error('Document has been closed');
    }
    positionAt(offset) {
        if (this.inMemoryDoc) {
            return this.inMemoryDoc.positionAt(offset);
        }
        if (this.onDiskDoc) {
            return this.onDiskDoc.positionAt(offset);
        }
        throw new Error('Document has been closed');
    }
    hasInMemoryDoc() {
        return !!this.inMemoryDoc;
    }
    isDetached() {
        return !this.onDiskDoc && !this.inMemoryDoc;
    }
    setInMemoryDoc(doc) {
        this.inMemoryDoc = doc;
    }
    setOnDiskDoc(doc) {
        this.onDiskDoc = doc;
    }
}
class VsCodeClientWorkspace {
    constructor(connection, config, documents, notebooks, logger) {
        this.connection = connection;
        this.config = config;
        this.documents = documents;
        this.notebooks = notebooks;
        this.logger = logger;
        this._onDidCreateMarkdownDocument = new vscode_languageserver_1.Emitter();
        this.onDidCreateMarkdownDocument = this._onDidCreateMarkdownDocument.event;
        this._onDidChangeMarkdownDocument = new vscode_languageserver_1.Emitter();
        this.onDidChangeMarkdownDocument = this._onDidChangeMarkdownDocument.event;
        this._onDidDeleteMarkdownDocument = new vscode_languageserver_1.Emitter();
        this.onDidDeleteMarkdownDocument = this._onDidDeleteMarkdownDocument.event;
        this._documentCache = new resourceMap_1.ResourceMap();
        this._utf8Decoder = new TextDecoder('utf-8');
        this._watcherPool = 0;
        this._watchers = new Map();
        this._workspaceFolders = [];
        documents.onDidOpen(e => {
            if (!this.isRelevantMarkdownDocument(e.document)) {
                return;
            }
            this.logger.log(md.LogLevel.Trace, 'VsCodeClientWorkspace.TextDocument.onDidOpen', { document: e.document.uri });
            const uri = vscode_uri_1.URI.parse(e.document.uri);
            const doc = this._documentCache.get(uri);
            if (doc) {
                // File already existed on disk
                doc.setInMemoryDoc(e.document);
                // The content visible to the language service may have changed since the in-memory doc
                // may differ from the one on-disk. To be safe we always fire a change event.
                this._onDidChangeMarkdownDocument.fire(doc);
            }
            else {
                // We're creating the file for the first time
                const doc = new VsCodeDocument(e.document.uri, { inMemoryDoc: e.document });
                this._documentCache.set(uri, doc);
                this._onDidCreateMarkdownDocument.fire(doc);
            }
        });
        documents.onDidChangeContent(e => {
            if (!this.isRelevantMarkdownDocument(e.document)) {
                return;
            }
            this.logger.log(md.LogLevel.Trace, 'VsCodeClientWorkspace.TextDocument.onDidChanceContent', { document: e.document.uri });
            const uri = vscode_uri_1.URI.parse(e.document.uri);
            const entry = this._documentCache.get(uri);
            if (entry) {
                entry.setInMemoryDoc(e.document);
                this._onDidChangeMarkdownDocument.fire(entry);
            }
        });
        documents.onDidClose(async (e) => {
            if (!this.isRelevantMarkdownDocument(e.document)) {
                return;
            }
            this.logger.log(md.LogLevel.Trace, 'VsCodeClientWorkspace.TextDocument.onDidClose', { document: e.document.uri });
            const uri = vscode_uri_1.URI.parse(e.document.uri);
            const doc = this._documentCache.get(uri);
            if (!doc) {
                // Document was never opened
                return;
            }
            doc.setInMemoryDoc(undefined);
            if (doc.isDetached()) {
                // The document has been fully closed
                this.doDeleteDocument(uri);
                return;
            }
            // Check that if file has been deleted on disk.
            // This can happen when directories are renamed / moved. VS Code's file system watcher does not
            // notify us when this happens.
            if (!(await this.statBypassingCache(uri))) {
                if (this._documentCache.get(uri) === doc && !doc.hasInMemoryDoc()) {
                    this.doDeleteDocument(uri);
                    return;
                }
            }
            // The document still exists on disk
            // To be safe, tell the service that the document has changed because the
            // in-memory doc contents may be different than the disk doc contents.
            this._onDidChangeMarkdownDocument.fire(doc);
        });
        connection.onDidChangeWatchedFiles(async ({ changes }) => {
            for (const change of changes) {
                const resource = vscode_uri_1.URI.parse(change.uri);
                this.logger.log(md.LogLevel.Trace, 'VsCodeClientWorkspace.onDidChangeWatchedFiles', { type: change.type, resource });
                switch (change.type) {
                    case vscode_languageserver_1.FileChangeType.Changed: {
                        const entry = this._documentCache.get(resource);
                        if (entry) {
                            // Refresh the on-disk state
                            const document = await this.openMarkdownDocumentFromFs(resource);
                            if (document) {
                                this._onDidChangeMarkdownDocument.fire(document);
                            }
                        }
                        break;
                    }
                    case vscode_languageserver_1.FileChangeType.Created: {
                        const entry = this._documentCache.get(resource);
                        if (entry) {
                            // Create or update the on-disk state
                            const document = await this.openMarkdownDocumentFromFs(resource);
                            if (document) {
                                this._onDidCreateMarkdownDocument.fire(document);
                            }
                        }
                        break;
                    }
                    case vscode_languageserver_1.FileChangeType.Deleted: {
                        const entry = this._documentCache.get(resource);
                        if (entry) {
                            entry.setOnDiskDoc(undefined);
                            if (entry.isDetached()) {
                                this.doDeleteDocument(resource);
                            }
                        }
                        break;
                    }
                }
            }
        });
        connection.onRequest(protocol.fs_watcher_onChange, params => {
            this.logger.log(md.LogLevel.Trace, 'VsCodeClientWorkspace.fs_watcher_onChange', { kind: params.kind, uri: params.uri });
            const watcher = this._watchers.get(params.id);
            if (!watcher) {
                return;
            }
            switch (params.kind) {
                case 'create':
                    watcher.onDidCreate.fire(vscode_uri_1.URI.parse(params.uri));
                    return;
                case 'change':
                    watcher.onDidChange.fire(vscode_uri_1.URI.parse(params.uri));
                    return;
                case 'delete':
                    watcher.onDidDelete.fire(vscode_uri_1.URI.parse(params.uri));
                    return;
            }
        });
    }
    listen() {
        this.connection.workspace.onDidChangeWorkspaceFolders(async () => {
            this.workspaceFolders = (await this.connection.workspace.getWorkspaceFolders() ?? []).map(x => vscode_uri_1.URI.parse(x.uri));
        });
    }
    get workspaceFolders() {
        return this._workspaceFolders;
    }
    set workspaceFolders(value) {
        this._workspaceFolders = value;
    }
    async getAllMarkdownDocuments() {
        // Add opened files (such as untitled files)
        const openTextDocumentResults = this.documents.all()
            .filter(doc => this.isRelevantMarkdownDocument(doc));
        const allDocs = new resourceMap_1.ResourceMap();
        for (const doc of openTextDocumentResults) {
            allDocs.set(vscode_uri_1.URI.parse(doc.uri), doc);
        }
        // And then add files on disk
        const maxConcurrent = 20;
        const limiter = new limiter_1.Limiter(maxConcurrent);
        const resources = await this.connection.sendRequest(protocol.findMarkdownFilesInWorkspace, {});
        await Promise.all(resources.map(strResource => {
            return limiter.queue(async () => {
                const resource = vscode_uri_1.URI.parse(strResource);
                if (allDocs.has(resource)) {
                    return;
                }
                const doc = await this.openMarkdownDocument(resource);
                if (doc) {
                    allDocs.set(resource, doc);
                }
                return doc;
            });
        }));
        return allDocs.values();
    }
    hasMarkdownDocument(resource) {
        return !!this.documents.get(resource.toString());
    }
    async openMarkdownDocument(resource) {
        const existing = this._documentCache.get(resource);
        if (existing) {
            return existing;
        }
        const matchingDocument = this.documents.get(resource.toString());
        if (matchingDocument) {
            let entry = this._documentCache.get(resource);
            if (entry) {
                entry.setInMemoryDoc(matchingDocument);
            }
            else {
                entry = new VsCodeDocument(resource.toString(), { inMemoryDoc: matchingDocument });
                this._documentCache.set(resource, entry);
            }
            return entry;
        }
        return this.openMarkdownDocumentFromFs(resource);
    }
    async openMarkdownDocumentFromFs(resource) {
        if (!(0, file_1.looksLikeMarkdownPath)(this.config, resource)) {
            return undefined;
        }
        try {
            const response = await this.connection.sendRequest(protocol.fs_readFile, { uri: resource.toString() });
            // TODO: LSP doesn't seem to handle Array buffers well
            const bytes = new Uint8Array(response);
            // We assume that markdown is in UTF-8
            const text = this._utf8Decoder.decode(bytes);
            const doc = new VsCodeDocument(resource.toString(), {
                onDiskDoc: vscode_languageserver_textdocument_1.TextDocument.create(resource.toString(), 'markdown', 0, text)
            });
            this._documentCache.set(resource, doc);
            return doc;
        }
        catch (e) {
            return undefined;
        }
    }
    async stat(resource) {
        this.logger.log(md.LogLevel.Trace, 'VsCodeClientWorkspace.stat', { resource });
        if (this._documentCache.has(resource)) {
            return { isDirectory: false };
        }
        return this.statBypassingCache(resource);
    }
    async statBypassingCache(resource) {
        const uri = resource.toString();
        if (this.documents.get(uri)) {
            return { isDirectory: false };
        }
        const fsResult = await this.connection.sendRequest(protocol.fs_stat, { uri });
        return fsResult ?? undefined; // Force convert null to undefined
    }
    async readDirectory(resource) {
        this.logger.log(md.LogLevel.Trace, 'VsCodeClientWorkspace.readDir', { resource });
        return this.connection.sendRequest(protocol.fs_readDirectory, { uri: resource.toString() });
    }
    getContainingDocument(resource) {
        if (resource.scheme === schemes_1.Schemes.notebookCell) {
            const nb = this.notebooks.findNotebookDocumentForCell(resource.toString());
            if (nb) {
                return {
                    uri: vscode_uri_1.URI.parse(nb.uri),
                    children: nb.cells.map(cell => ({ uri: vscode_uri_1.URI.parse(cell.document) })),
                };
            }
        }
        return undefined;
    }
    watchFile(resource, options) {
        const id = this._watcherPool++;
        this.logger.log(md.LogLevel.Trace, 'VsCodeClientWorkspace.watchFile', { id, resource });
        const entry = {
            resource,
            options,
            onDidCreate: new vscode_languageserver_1.Emitter(),
            onDidChange: new vscode_languageserver_1.Emitter(),
            onDidDelete: new vscode_languageserver_1.Emitter(),
        };
        this._watchers.set(id, entry);
        this.connection.sendRequest(protocol.fs_watcher_create, {
            id,
            uri: resource.toString(),
            options,
            watchParentDirs: true,
        });
        return {
            onDidCreate: entry.onDidCreate.event,
            onDidChange: entry.onDidChange.event,
            onDidDelete: entry.onDidDelete.event,
            dispose: () => {
                this.logger.log(md.LogLevel.Trace, 'VsCodeClientWorkspace.disposeWatcher', { id, resource });
                this.connection.sendRequest(protocol.fs_watcher_delete, { id });
                this._watchers.delete(id);
            }
        };
    }
    isRelevantMarkdownDocument(doc) {
        return (0, file_1.isMarkdownFile)(doc) && vscode_uri_1.URI.parse(doc.uri).scheme !== 'vscode-bulkeditpreview';
    }
    doDeleteDocument(uri) {
        this.logger.log(md.LogLevel.Trace, 'VsCodeClientWorkspace.deleteDocument', { document: uri });
        this._documentCache.delete(uri);
        this._onDidDeleteMarkdownDocument.fire(uri);
    }
}
exports.VsCodeClientWorkspace = VsCodeClientWorkspace;


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isMarkdownFile = exports.looksLikeMarkdownPath = void 0;
const vscode_uri_1 = __webpack_require__(84);
function looksLikeMarkdownPath(config, resolvedHrefPath) {
    return config.markdownFileExtensions.includes(vscode_uri_1.Utils.extname(resolvedHrefPath).toLowerCase().replace('.', ''));
}
exports.looksLikeMarkdownPath = looksLikeMarkdownPath;
function isMarkdownFile(document) {
    return document.languageId === 'markdown';
}
exports.isMarkdownFile = isMarkdownFile;


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Limiter = void 0;
/**
 * A helper to queue N promises and run them all with a max degree of parallelism. The helper
 * ensures that at any time no more than M promises are running at the same time.
 *
 * Taken from 'src/vs/base/common/async.ts'
 */
class Limiter {
    constructor(maxDegreeOfParalellism) {
        this._size = 0;
        this.maxDegreeOfParalellism = maxDegreeOfParalellism;
        this.outstandingPromises = [];
        this.runningPromises = 0;
    }
    get size() {
        return this._size;
    }
    queue(factory) {
        this._size++;
        return new Promise((c, e) => {
            this.outstandingPromises.push({ factory, c, e });
            this.consume();
        });
    }
    consume() {
        while (this.outstandingPromises.length && this.runningPromises < this.maxDegreeOfParalellism) {
            const iLimitedTask = this.outstandingPromises.shift();
            this.runningPromises++;
            const promise = iLimitedTask.factory();
            promise.then(iLimitedTask.c, iLimitedTask.e);
            promise.then(() => this.consumed(), () => this.consumed());
        }
    }
    consumed() {
        this._size--;
        this.runningPromises--;
        if (this.outstandingPromises.length > 0) {
            this.consume();
        }
    }
}
exports.Limiter = Limiter;


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceMap = void 0;
const defaultResourceToKey = (resource) => resource.toString();
class ResourceMap {
    constructor(toKey = defaultResourceToKey) {
        this.map = new Map();
        this.toKey = toKey;
    }
    set(uri, value) {
        this.map.set(this.toKey(uri), { uri, value });
        return this;
    }
    get(resource) {
        return this.map.get(this.toKey(resource))?.value;
    }
    has(resource) {
        return this.map.has(this.toKey(resource));
    }
    get size() {
        return this.map.size;
    }
    clear() {
        this.map.clear();
    }
    delete(resource) {
        return this.map.delete(this.toKey(resource));
    }
    *values() {
        for (const entry of this.map.values()) {
            yield entry.value;
        }
    }
    *keys() {
        for (const entry of this.map.values()) {
            yield entry.uri;
        }
    }
    *entries() {
        for (const entry of this.map.values()) {
            yield [entry.uri, entry.value];
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
}
exports.ResourceMap = ResourceMap;


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports) => {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Schemes = void 0;
exports.Schemes = Object.freeze({
    notebookCell: 'vscode-notebook-cell',
});


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const l10n = __webpack_require__(1);
let initialized = false;
const pendingMessages = [];
const messageHandler = async (e) => {
    if (!initialized) {
        const l10nLog = [];
        initialized = true;
        const i10lLocation = e.data.i10lLocation;
        if (i10lLocation) {
            try {
                await l10n.config({ uri: i10lLocation });
                l10nLog.push(`l10n: Configured to ${i10lLocation.toString()}.`);
            }
            catch (e) {
                l10nLog.push(`l10n: Problems loading ${i10lLocation.toString()} : ${e}.`);
            }
        }
        else {
            l10nLog.push(`l10n: No bundle configured.`);
        }
        await Promise.resolve().then(() => __webpack_require__(2));
        if (self.onmessage !== messageHandler) {
            pendingMessages.forEach(msg => self.onmessage?.(msg));
            pendingMessages.length = 0;
        }
        l10nLog.forEach(console.log);
    }
    else {
        pendingMessages.push(e);
    }
};
self.onmessage = messageHandler;

})();

serverExportVar = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=workerMain.js.map