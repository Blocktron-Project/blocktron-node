#!/usr/bin/env node
//Blocktron-node (c) 2018, Sandeep Vattapparambil
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("blocktron-node", [], factory);
	else if(typeof exports === 'object')
		exports["blocktron-node"] = factory();
	else
		root["blocktron-node"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./bin/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./bin/server.js":
/*!***********************!*\
  !*** ./bin/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {

/**
 * Module dependencies.
 * @module Server
 */

/**
 * The blocktronNode instance
 */
var blocktronNode = __webpack_require__(/*! ../src/app */ "./src/app.js");

/**
 * A tiny JavaScript debugging utility modelled after Node.js core's debugging technique.
 * Works in Node.js and web browsers.
 */
var debug = __webpack_require__(/*! debug */ "debug")('blocktron-node:server');

/**
 * Node module housing the traditional complex http interfaces.
 */
var http = __webpack_require__(/*! http */ "./node_modules/stream-http/index.js");

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.argv[2] || _bt_config.defaultAppPort);
global.port = port;
blocktronNode.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(blocktronNode);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
   log.info('Blocktron is running on port: ' + port);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 * @function
 * @name normalizePort
 * @memberof Server
 * @param {Number} val - The port number or string
 * @returns {Number|String|Boolean} - Returns number, string, or false
 */
function normalizePort(val) {
   var port = parseInt(val, 10);

   if (isNaN(port)) {
      // named pipe
      return val;
   }

   if (port >= 0) {
      // port number
      return port;
   }

   return false;
}

/**
 * Event listener for HTTP server "error" event.
 * @function
 * @name onError
 * @memberof Server
 * @param {Object} error - The error event object
 * @returns - Returns the error
 */
function onError(error) {
   if (error.syscall !== 'listen') {
      throw error;
   }

   var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

   // handle specific listen errors with friendly messages
   switch (error.code) {
      case 'EACCES':
         console.error(bind + ' requires elevated privileges');
         process.exit(1);
         break;
      case 'EADDRINUSE':
         console.error(bind + ' is already in use');
         process.exit(1);
         break;
      default:
         throw error;
   }
}

/**
 * Event listener for HTTP server "listening" event.
 * @function
 * @name onListening
 * @memberof Server
 */
function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
   debug('Listening on ' + bind);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./config/blocktron.js":
/*!*****************************!*\
  !*** ./config/blocktron.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Blocktron global configuration
 * @module _bt_config
 */

/**
 * A node module for simple, fast generation of RFC4122 UUIDS.
 * Here v1 is used.
 * @see {@link https://www.ietf.org/rfc/rfc4122.txt|RFC4122}
 */
var uuid = __webpack_require__(/*! uuid/v1 */ "uuid/v1");

/**
 * Generate an RFC4122 compatible unique distributed-system node identifier.
 * Using uuid generate a unique string, then remove the dashes in the string and rejoin them.
 * The string generated is guarenteed to be unique at a very high percentage.
 */
var blocktronNodeId = uuid().split('-').join('');

/**
 * Blocktron configuration object
 * @type {Object}
 * @memberof _bt_config
 * @inner
 * @param {String} appTitle - The global process title
 * @param {Number} defaultAppPort - The default port for the app to run
 * @param {String} blocktronNodeId - The unique identifier for a single instance of this app
 * @param {String} rewardSenderAddress - The address label for this particular instance for reward process
 * @param {Number} rewardValue - The default global reward value
 * @param {Number} difficulty - The default 'DIFFICULTY' value
 * @param {Number} mineRate - The default mine rate in milli seconds
 */
var _bt_config = {
  appTitle: 'Blocktron Node',
  defaultAppPort: 3000,
  blocktronNodeId: blocktronNodeId,
  rewardSenderAddress: '00BLOCKTRON',
  rewardValue: 12.5,
  difficulty: 4,
  mineRate: 4000
};

module.exports = _bt_config;

/***/ }),

/***/ "./config/pino.js":
/*!************************!*\
  !*** ./config/pino.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Pino Logger configuration
 * This module holds the complete configuration object for the Pino logger instance
 * @module pinoConfig
 * @see {@link https://github.com/pinojs/pino/blob/master/docs/API.md|Pino Config}
 */

var pinoPrettyConfig = __webpack_require__(/*! ./pinoPretty */ "./config/pinoPretty.js");

var pinoConfig = {
  /**
   * safe (boolean): avoid error caused by circular references in the object tree. Default: true.
   * */
  safe: true,

  /**
   * name (string): the name of the logger. Default: undefined.
   * */
  name: 'blocktron',

  /**
   * timestamp (boolean|function): Enables or disables the inclusion of a timestamp in the log message. If a function
   * is supplied, it must synchronously return a JSON string representation of the time, e.g. ,"time":1493426328206
   * (which is the default). If set to false, no timestamp will be included in the output. See stdTimeFunctions for a
   * set of available functions for passing in as a value for this option. Caution: any sort of formatted time will
   * significantly slow down Pino's performance.
   */
  timestamp: true,

  /**
   * slowtime (boolean): Outputs ISO time stamps ('2016-03-09T15:18:53.889Z') instead of Epoch time stamps
   * (1457536759176). WARNING: This option carries a 25% performance drop. We recommend using default Epoch
   * timestamps and transforming logs after if required. The pino -t command will do this for you (see CLI).
   * Default: false.
   * Deprecation: this option is scheduled to be removed in Pino 5.0.0.
   * Use timestamp: pino.stdTimeFunctions.slowTime instead.
   */
  slowtime: false,

  /**
   * level (string): one of 'fatal', 'error', 'warn', 'info', 'debug', 'trace'; also 'silent' is supported to disable
   * logging. Any other value defines a custom level and requires supplying a level value via levelVal.
   * Default: 'info'.
   */
  level: 'info',

  /**
   * messageKey (string): the string key for the 'message' in the JSON object. Default msg.
   */
  messageKey: 'msg',

  /**
   * prettyPrint (boolean|object): enables pino.pretty. This is intended for non-production configurations.
   * This may be set to a configuration object as outlined in pino.pretty. Default: false.
   */
  prettyPrint: pinoPrettyConfig,

  /**
   * enabled (boolean): enables logging. Default: true
   */
  enabled: true
};

module.exports = pinoConfig;

/***/ }),

/***/ "./config/pinoPretty.js":
/*!******************************!*\
  !*** ./config/pinoPretty.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Pino-Pretty configuration object
 * @see {@link https://github.com/pinojs/pino-pretty | Pino-Pretty-github}
 */
var options = {
   colorize: true,
   crlf: true,
   errorLikeObjectKeys: ['err', 'error'],
   errorProps: '',
   levelFirst: false,
   localTime: false,
   messageKey: 'msg',
   translateTime: false,
   search: 'foo == `bar`'
};

module.exports = options;

/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "base64-js")
var ieee754 = __webpack_require__(/*! ieee754 */ "ieee754")
var isArray = __webpack_require__(/*! isarray */ "isarray")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/stream-http/index.js":
/*!*******************************************!*\
  !*** ./node_modules/stream-http/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var ClientRequest = __webpack_require__(/*! ./lib/request */ "./node_modules/stream-http/lib/request.js")
var response = __webpack_require__(/*! ./lib/response */ "./node_modules/stream-http/lib/response.js")
var extend = __webpack_require__(/*! xtend */ "xtend")
var statusCodes = __webpack_require__(/*! builtin-status-codes */ "builtin-status-codes")
var url = __webpack_require__(/*! url */ "url")

var http = exports

http.request = function (opts, cb) {
	if (typeof opts === 'string')
		opts = url.parse(opts)
	else
		opts = extend(opts)

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

http.get = function get (opts, cb) {
	var req = http.request(opts, cb)
	req.end()
	return req
}

http.ClientRequest = ClientRequest
http.IncomingMessage = response.IncomingMessage

http.Agent = function () {}
http.Agent.defaultMaxSockets = 4

http.globalAgent = new http.Agent()

http.STATUS_CODES = statusCodes

http.METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/capability.js":
/*!****************************************************!*\
  !*** ./node_modules/stream-http/lib/capability.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream)

exports.writableStream = isFunction(global.WritableStream)

exports.abortController = isFunction(global.AbortController)

exports.blobConstructor = false
try {
	new Blob([new ArrayBuffer(1)])
	exports.blobConstructor = true
} catch (e) {}

// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr
function getXHR () {
	// Cache the xhr value
	if (xhr !== undefined) return xhr

	if (global.XMLHttpRequest) {
		xhr = new global.XMLHttpRequest()
		// If XDomainRequest is available (ie only, where xhr might not work
		// cross domain), use the page location. Otherwise use example.com
		// Note: this doesn't actually make an http request.
		try {
			xhr.open('GET', global.XDomainRequest ? '/' : 'https://example.com')
		} catch(e) {
			xhr = null
		}
	} else {
		// Service workers don't have XHR
		xhr = null
	}
	return xhr
}

function checkTypeSupport (type) {
	var xhr = getXHR()
	if (!xhr) return false
	try {
		xhr.responseType = type
		return xhr.responseType === type
	} catch (e) {}
	return false
}

// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
// Safari 7.1 appears to have fixed this bug.
var haveArrayBuffer = typeof global.ArrayBuffer !== 'undefined'
var haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice)

// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer = exports.fetch || (haveArrayBuffer && checkTypeSupport('arraybuffer'))

// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream = !exports.fetch && haveSlice && checkTypeSupport('ms-stream')
exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer &&
	checkTypeSupport('moz-chunked-arraybuffer')

// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)

exports.vbArray = isFunction(global.VBArray)

function isFunction (value) {
	return typeof value === 'function'
}

xhr = null // Help gc

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/request.js":
/*!*************************************************!*\
  !*** ./node_modules/stream-http/lib/request.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {var capability = __webpack_require__(/*! ./capability */ "./node_modules/stream-http/lib/capability.js")
var inherits = __webpack_require__(/*! inherits */ "inherits")
var response = __webpack_require__(/*! ./response */ "./node_modules/stream-http/lib/response.js")
var stream = __webpack_require__(/*! readable-stream */ "readable-stream")
var toArrayBuffer = __webpack_require__(/*! to-arraybuffer */ "to-arraybuffer")

var IncomingMessage = response.IncomingMessage
var rStates = response.readyStates

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else if (capability.vbArray && preferBinary) {
		return 'text:vbarray'
	} else {
		return 'text'
	}
}

var ClientRequest = module.exports = function (opts) {
	var self = this
	stream.Writable.call(self)

	self._opts = opts
	self._body = []
	self._headers = {}
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'))
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name])
	})

	var preferBinary
	var useFetch = true
	if (opts.mode === 'disable-fetch' || ('requestTimeout' in opts && !capability.abortController)) {
		// If the use of XHR should be preferred. Not typically needed.
		useFetch = false
		preferBinary = true
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch)
	self._fetchTimer = null

	self.on('finish', function () {
		self._onFinish()
	})
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	}
}

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()]
	if (header)
		return header.value
	return null
}

ClientRequest.prototype.removeHeader = function (name) {
	var self = this
	delete self._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	var self = this

	if (self._destroyed)
		return
	var opts = self._opts

	var headersObj = self._headers
	var body = null
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
		if (capability.arraybuffer) {
			body = toArrayBuffer(Buffer.concat(self._body))
		} else if (capability.blobConstructor) {
			body = new global.Blob(self._body.map(function (buffer) {
				return toArrayBuffer(buffer)
			}), {
				type: (headersObj['content-type'] || {}).value || ''
			})
		} else {
			// get utf8 string
			body = Buffer.concat(self._body).toString()
		}
	}

	// create flattened list of headers
	var headersList = []
	Object.keys(headersObj).forEach(function (keyName) {
		var name = headersObj[keyName].name
		var value = headersObj[keyName].value
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				headersList.push([name, v])
			})
		} else {
			headersList.push([name, value])
		}
	})

	if (self._mode === 'fetch') {
		var signal = null
		var fetchTimer = null
		if (capability.abortController) {
			var controller = new AbortController()
			signal = controller.signal
			self._fetchAbortController = controller

			if ('requestTimeout' in opts && opts.requestTimeout !== 0) {
				self._fetchTimer = global.setTimeout(function () {
					self.emit('requestTimeout')
					if (self._fetchAbortController)
						self._fetchAbortController.abort()
				}, opts.requestTimeout)
			}
		}

		global.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headersList,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin',
			signal: signal
		}).then(function (response) {
			self._fetchResponse = response
			self._connect()
		}, function (reason) {
			global.clearTimeout(self._fetchTimer)
			if (!self._destroyed)
				self.emit('error', reason)
		})
	} else {
		var xhr = self._xhr = new global.XMLHttpRequest()
		try {
			xhr.open(self._opts.method, self._opts.url, true)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode.split(':')[0]

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined')

		if ('requestTimeout' in opts) {
			xhr.timeout = opts.requestTimeout
			xhr.ontimeout = function () {
				self.emit('requestTimeout')
			}
		}

		headersList.forEach(function (header) {
			xhr.setRequestHeader(header[0], header[1])
		})

		self._response = null
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress()
					break
			}
		}
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress()
			}
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self.emit('error', new Error('XHR error'))
		}

		try {
			xhr.send(body)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}
	}
}

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect()

	self._response._onXHRProgress()
}

ClientRequest.prototype._connect = function () {
	var self = this

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode, self._fetchTimer)
	self._response.on('error', function(err) {
		self.emit('error', err)
	})

	self.emit('response', self._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this

	self._body.push(chunk)
	cb()
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
	var self = this
	self._destroyed = true
	global.clearTimeout(self._fetchTimer)
	if (self._response)
		self._response._destroyed = true
	if (self._xhr)
		self._xhr.abort()
	else if (self._fetchAbortController)
		self._fetchAbortController.abort()
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setTimeout = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'via'
]

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/stream-http/lib/response.js":
/*!**************************************************!*\
  !*** ./node_modules/stream-http/lib/response.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer, global) {var capability = __webpack_require__(/*! ./capability */ "./node_modules/stream-http/lib/capability.js")
var inherits = __webpack_require__(/*! inherits */ "inherits")
var stream = __webpack_require__(/*! readable-stream */ "readable-stream")

var rStates = exports.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
}

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode, fetchTimer) {
	var self = this
	stream.Readable.call(self)

	self._mode = mode
	self.headers = {}
	self.rawHeaders = []
	self.trailers = {}
	self.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(function () {
			self.emit('close')
		})
	})

	if (mode === 'fetch') {
		self._fetchResponse = response

		self.url = response.url
		self.statusCode = response.status
		self.statusMessage = response.statusText
		
		response.headers.forEach(function (header, key){
			self.headers[key.toLowerCase()] = header
			self.rawHeaders.push(key, header)
		})

		if (capability.writableStream) {
			var writable = new WritableStream({
				write: function (chunk) {
					return new Promise(function (resolve, reject) {
						if (self._destroyed) {
							reject()
						} else if(self.push(new Buffer(chunk))) {
							resolve()
						} else {
							self._resumeFetch = resolve
						}
					})
				},
				close: function () {
					global.clearTimeout(fetchTimer)
					if (!self._destroyed)
						self.push(null)
				},
				abort: function (err) {
					if (!self._destroyed)
						self.emit('error', err)
				}
			})

			try {
				response.body.pipeTo(writable).catch(function (err) {
					global.clearTimeout(fetchTimer)
					if (!self._destroyed)
						self.emit('error', err)
				})
				return
			} catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this
		}
		// fallback for when writableStream or pipeTo aren't available
		var reader = response.body.getReader()
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				if (result.done) {
					global.clearTimeout(fetchTimer)
					self.push(null)
					return
				}
				self.push(new Buffer(result.value))
				read()
			}).catch(function (err) {
				global.clearTimeout(fetchTimer)
				if (!self._destroyed)
					self.emit('error', err)
			})
		}
		read()
	} else {
		self._xhr = xhr
		self._pos = 0

		self.url = xhr.responseURL
		self.statusCode = xhr.status
		self.statusMessage = xhr.statusText
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/)
			if (matches) {
				var key = matches[1].toLowerCase()
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = []
					}
					self.headers[key].push(matches[2])
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2]
				} else {
					self.headers[key] = matches[2]
				}
				self.rawHeaders.push(matches[1], matches[2])
			}
		})

		self._charset = 'x-user-defined'
		if (!capability.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type']
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase()
				}
			}
			if (!self._charset)
				self._charset = 'utf-8' // best guess
		}
	}
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {
	var self = this

	var resolve = self._resumeFetch
	if (resolve) {
		self._resumeFetch = null
		resolve()
	}
}

IncomingMessage.prototype._onXHRProgress = function () {
	var self = this

	var xhr = self._xhr

	var response = null
	switch (self._mode) {
		case 'text:vbarray': // For IE9
			if (xhr.readyState !== rStates.DONE)
				break
			try {
				// This fails in IE8
				response = new global.VBArray(xhr.responseBody).toArray()
			} catch (e) {}
			if (response !== null) {
				self.push(new Buffer(response))
				break
			}
			// Falls through in IE8	
		case 'text':
			try { // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
				response = xhr.responseText
			} catch (e) {
				self._mode = 'text:vbarray'
				break
			}
			if (response.length > self._pos) {
				var newData = response.substr(self._pos)
				if (self._charset === 'x-user-defined') {
					var buffer = new Buffer(newData.length)
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff

					self.push(buffer)
				} else {
					self.push(newData, self._charset)
				}
				self._pos = response.length
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates.DONE || !xhr.response)
				break
			response = xhr.response
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING || !response)
				break
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'ms-stream':
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING)
				break
			var reader = new global.MSStreamReader()
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))))
					self._pos = reader.result.byteLength
				}
			}
			reader.onload = function () {
				self.push(null)
			}
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response)
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
		self.push(null)
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process, __dirname) {

/**
 * blocktron-node
 * The Blocktron blockchain API Server Node.
 * This server acts as the single node in the entire distributed blockchain system.
 * Written by: Sandeep Vattapparambil
 * Email: sandeepv68@gmail.com
 * Website: www.sandeepv.in
 */

/**
 * The blocktron-node express application object
 * @module blocktronNode
 */

/**
 * Global blocktron configuration
 * @global
 */
var _bt_config = __webpack_require__(/*! ../config/blocktron */ "./config/blocktron.js");
global._bt_config = _bt_config;

/**
 * Set up process environment
 * @global
 */
var env = "development" || 'development';
global.env = env;

/**
 * Set up process title (useful for debugging)
 */
process.title = _bt_config.appTitle;

/**
 * Create HTTP errors for Express, Koa, Connect, etc. with ease.
 */
var createError = __webpack_require__(/*! http-errors */ "http-errors");

/**
 * Fast, unopinionated, minimalist web framework for node.
 */
var express = __webpack_require__(/*! express */ "express");

/**
 * Pino instance: Extremely fast node.js logger, inspired by Bunyan.
 * It also includes a shell utility to pretty-print its log files.
 * @global
 */
var log = __webpack_require__(/*! pino */ "pino")(__webpack_require__(/*! ../config/pino */ "./config/pino.js"));

/**
 * Set up global logging
 */
global.log = log;

/**
 * Include the blocktron library (after it has been extended)
 */
var Blocktron = __webpack_require__(/*! ./lib/blocktron */ "./src/lib/blocktron.js");

/**
 * Node.js path module
 */
var path = __webpack_require__(/*! path */ "path");

/**
 * Serve favicon
 */
var icon = __webpack_require__(/*! serve-favicon */ "serve-favicon");

/**
 * Create an instance of the Blocktron class and globalize it.
 * @global
 */
var blocktron = new Blocktron();
global.blocktron = blocktron;

/**
 * Set-up routes
 */
var indexRouter = __webpack_require__(/*! ./routes/index */ "./src/routes/index.js");
var blocktronRouter = __webpack_require__(/*! ./routes/blocktron */ "./src/routes/blocktron.js");
var transactionRouter = __webpack_require__(/*! ./routes/transaction */ "./src/routes/transaction.js");
var mineRouter = __webpack_require__(/*! ./routes/mine */ "./src/routes/mine.js");
var registerAndBroadCastNodeRouter = __webpack_require__(/*! ./routes/registerAndBroadcastNode */ "./src/routes/registerAndBroadcastNode.js");
var registerNodeRouter = __webpack_require__(/*! ./routes/registerNode */ "./src/routes/registerNode.js");
var registerNodesBulkRouter = __webpack_require__(/*! ./routes/registerNodesBulk */ "./src/routes/registerNodesBulk.js");
var broadcastTransactionRouter = __webpack_require__(/*! ./routes/broadcastTransaction */ "./src/routes/broadcastTransaction.js");
var receiveNewBlockRouter = __webpack_require__(/*! ./routes/receiveNewBlock */ "./src/routes/receiveNewBlock.js");
var consensusRouter = __webpack_require__(/*! ./routes/consensus */ "./src/routes/consensus.js");
log.info('Blocktron routes initialized');

/**
 * Instantiate the blocktron express app object
 */
var blocktronNode = express();
log.info('Blocktron initialized and running in ' + env + ' mode');

/**
 * disable x-powered-by to deceive hackers
 */
blocktronNode.disable('x-powered-by');

/**
 * Set-up and use middlewares
 * @memberof blocktronNode
 */
blocktronNode.use(express.json());
blocktronNode.use(express.urlencoded({
  extended: false
}));
log.info('Blocktron application middlewares initialized');

/**
 * Custom Middlewares
 * @memberof blocktronNode
 */
blocktronNode.use(__webpack_require__(/*! ./middlewares */ "./src/middlewares/index.js"));
log.info('Blocktron custom middlewares initialized');

/**
 * Add routes to the middleware chain
 * @memberof blocktronNode
 */
blocktronNode.use(icon(path.join(__dirname, '..', 'docs/favicon.ico')));
blocktronNode.use('/', indexRouter);
blocktronNode.use('/docs', express.static('docs'));
blocktronNode.use('/blockchain', blocktronRouter);
blocktronNode.use('/transaction', transactionRouter);
blocktronNode.use('/mine', mineRouter);
blocktronNode.use('/registerAndBroadcastNode', registerAndBroadCastNodeRouter);
blocktronNode.use('/registerNode', registerNodeRouter);
blocktronNode.use('/registerNodesBulk', registerNodesBulkRouter);
blocktronNode.use('/transaction/broadcast', broadcastTransactionRouter);
blocktronNode.use('/receiveNewBlock', receiveNewBlockRouter);
blocktronNode.use('/consensus', consensusRouter);
log.info('Blocktron routes chained to middlewares');

/**
 * Catch 404 and forward to error handler
 * @memberof blocktronNode
 * @function
 * @param {Callback} middleware - Callback to catch 404 error
 */
blocktronNode.use(function (req, res, next) {
  log.error('Error caught');
  next(createError(404));
});

/**
 * Error handler
 * @memberof blocktronNode
 * @function
 * @param {Callback} middleware - Callback to render the error
 */
blocktronNode.use(function (err, req, res, next) {
  /**
   * render the error
   */
  res.status(err.status || 500);
  var errorData = {
    status: err.status || 500,
    message: err.message
  };
  if (env === 'development') {
    errorData.stack = err.stack;
  }
  log.error(req, res);
  res.json(errorData);
});

module.exports = blocktronNode;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js"), "/"))

/***/ }),

/***/ "./src/lib/blocktron.js":
/*!******************************!*\
  !*** ./src/lib/blocktron.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A module to enhance the blocktron-lib data structure library
 */

/**
 * Import the original blocktron-lib
 */
var BlocktronLib = __webpack_require__(/*! blocktron-lib */ "blocktron-lib");

/**
 * A node module for simple, fast generation of RFC4122 UUIDS.
 * Here v1 is used.
 * @see {@link https://www.ietf.org/rfc/rfc4122.txt|RFC4122}
 */
var uuid = __webpack_require__(/*! uuid/v1 */ "uuid/v1");

/**
 * Get the current node's url from command-line args array position 3
 */
var currentNodeUrl = void 0;
// if (process.argv[3]) {
//   currentNodeUrl = process.argv[3];
// } else {
//   log.info('Node URL argument is missing');
// }
currentNodeUrl = process.argv[3] ? process.argv[3] : '';

/**
 * Import global blocktron configuration
 */
var _bt_config = __webpack_require__(/*! ../../config/blocktron */ "./config/blocktron.js");

/**
 * The blocktron-lib class enhanced
 * @class Blocktron
 * @classdesc A module to enhance the blocktron-lib data structure library
 * @extends BlocktronLib
 */

var Blocktron = function (_BlocktronLib) {
  _inherits(Blocktron, _BlocktronLib);

  /**
   * The constructor for the class
   * @param {Array} chain - The blockchain array
   * @param {Array} pendingTransactions - The pending transactions array
   */
  function Blocktron(chain, pendingTransactions) {
    _classCallCheck(this, Blocktron);

    /**
     * Add the current node's url as a property
     */
    var _this = _possibleConstructorReturn(this, (Blocktron.__proto__ || Object.getPrototypeOf(Blocktron)).call(this, chain, pendingTransactions));
    /**
     * Call the parent class constructor with the given parameters.
     */


    _this.currentNodeUrl = currentNodeUrl;

    /**
     * Add url's of all other nodes in the distributed system
     */
    _this.networkNodes = [];
    return _this;
  }

  /**
   * Helper prototype to check whether a node url already exists in the networkNodes array.
   * @function isNewNode
   * @memberof Blocktron
   * @param {String} nodeUrl - The url of the new node to register
   * @returns {Boolean} - Returns true if url not present or else false
   */


  _createClass(Blocktron, [{
    key: 'isNewNode',
    value: function isNewNode(nodeUrl) {
      if (this.networkNodes.indexOf(nodeUrl) === -1) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * A method to create a new transaction
     * @function createNewTransaction
     * @override
     * @memberof Blocktron
     * @param {Number} amount - The amount/value to be recorded
     * @param {String} sender - The adress of the sender
     * @param {String} receiver - The address of the receiver
     * @returns {Object} - Returns the transaction object
     */

  }, {
    key: 'createNewTransaction',
    value: function createNewTransaction(amount, sender, receiver) {
      /**
       * Validate the parameters
       */
      amount = amount ? amount : function () {
        throw new Error('Amount required');
      }();
      sender = sender ? sender : function () {
        throw new Error('Sender required');
      }();
      receiver = receiver ? receiver : function () {
        throw new Error('receiver required');
      }();

      /**
       * @type {Object}
       * @const newTransactions - An atomic transactions block in the chain
       * @property {String} transactionId - The unique id for a transaction
       * @property {Number} amount - The value/amount to be recorded
       * @property {String} sender - The adress of the sender
       * @property {String} receiver - The address of the receiver
       */
      var newTransactions = {
        transactionId: uuid().split('-').join(''),
        amount: amount,
        sender: sender,
        receiver: receiver
      };

      /**
       * Return the new transaction object
       */
      return newTransactions;
    }

    /**
     * A blockchain method to add a newly created block to the pending transactions array
     * @function addTransactionToPendingTransaction
     * @memberof Blocktron
     * @param {Object} transactionObject - The object representing the transaction data
     */

  }, {
    key: 'addTransactionToPendingTransaction',
    value: function addTransactionToPendingTransaction(transactionObject) {
      /**
       * Validate transaction data object
       */
      if (transactionObject) {
        /**
         * If valid, push the transaction data to the pending transactions array
         */
        this.pendingTransactions.push(transactionObject);

        /**
         * Then return the chronological index of the transaction data block
         */
        return this.getLastBlock()['index'] + 1;
      } else {
        /**
         * Log error
         */
        log.error('Transaction data required');
      }
    }

    /**
     * A blockchain method to validate a blockchain
     * @function isChainValid
     * @memberof Blocktron
     * @param {Array} chain - The array representing the blockchain data
     */

  }, {
    key: 'isChainValid',
    value: function isChainValid(chain) {
      /**
       * Validate the parameter
       */
      if (chain) {
        /**
         * Assume the blockchain is valid
         */
        var validChain = true;

        /**
         * Iterate the blockchain array
         * Start from 1st position inorder to exclude the genesis block.
         * Genesis block will be validated separetely.
         */
        for (var i = 1; i < chain.length; i++) {
          /**
           * Get current block
           */
          var currentBlock = chain[i];

          /**
           * Get previous block
           */
          var previousBlock = chain[i - 1];

          /**
           * Rehash the current block data using the parameters
           */
          var blockHash = this.hashBlock(previousBlock['hash'], {
            transactions: currentBlock['transactions'],
            index: currentBlock['index']
          }, currentBlock['nonce']);

          /**
           * Check the generated hash for substring difficulty pattern (default is '0000')
           */
          if (blockHash.substring(0, _bt_config.difficulty) !== '0'.repeat(_bt_config.difficulty)) {
            /**
             * If not, then chain is invalid
             */
            validChain = false;
          }

          /**
           * If hash values don't match between blocks
           */
          if (currentBlock['previousHash'] !== previousBlock['hash']) {
            /**
             * then chain is invalid
             */
            validChain = false;
          }
        }

        /**
         * Get the genesis block from array index 0
         */
        var genesisBlock = chain[0];

        /**
         * Validate genesis block's nonce
         */
        var validNonce = genesisBlock['nonce'] === 1;

        /**
         * Validate genesis block's previousBlockHash
         */
        var validPreviousBlockHash = genesisBlock['previousHash'] === '0';

        /**
         * Validate genesis block's hash
         */
        var validHash = genesisBlock['hash'] === '0';

        /**
         * Validate genesis block's transactions
         */
        var validTransactions = genesisBlock['transactions'].length === 0;

        /**
         * Check all validation parameters for genesis block
         */
        if (!validNonce || !validPreviousBlockHash || !validHash || !validTransactions) {
          /**
           * Set invalid if any parameter is invalid
           */
          validChain = false;
        }

        /**
         * If genesis block and the entire chain is valid then return validChain as true.
         */
        return validChain;
      } else {
        /**
         * Log error
         */
        log.error('Blockchain data required');
      }
    }
  }]);

  return Blocktron;
}(BlocktronLib);

module.exports = Blocktron;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/middlewares/index.js":
/*!**********************************!*\
  !*** ./src/middlewares/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Custom middlewares can be augmented here
 * @module middlewareRouter
 */
var express = __webpack_require__(/*! express */ "express");
var middlewareRouter = express.Router();

/**
 * Middleware to augment the response object with helpers
 * @function
 * @memberof middlewareRouter
 * @param {Middleware} middleware - Express middleware callback
 */
middlewareRouter.use(__webpack_require__(/*! ./response */ "./src/middlewares/response.js"));

module.exports = middlewareRouter;

/***/ }),

/***/ "./src/middlewares/response.js":
/*!*************************************!*\
  !*** ./src/middlewares/response.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * @namespace res
 */

/**
 * @module enhanceResponse
 */

/**
 * Helper function to enhance the response object
 * @function enhanceResponse
 * @param {req} req - The request object
 * @param {res} res - The response object
 * @param {function} next - The next function in the middleware chain
 */
var enhanceResponse = function enhanceResponse(req, res, next) {
   /**
    * Helper function to append the CORS headers to enable CORS.
    * Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional
    * HTTP headers to tell a browser to let a web application running at one
    * origin (domain) have permission to access selected resources from a server
    * at a different origin. A web application makes a cross-origin HTTP request
    * when it requests a resource that has a different origin (domain, protocol, and port)
    * than its own origin.
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS|Cross-Origin Resource Sharing (CORS)}
    * @function enableCORS
    * @inner
    */
   (function enableCORS() {
      try {
         res.header('Access-Control-Allow-Origin', '*');
         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
         res.header('Access-Control-Allow-Headers', 'Content-Type');
      } catch (error) {
         log.error('CORS setup failed due to: ' + error);
      }
   })();

   /**
    * Helper function to append the specified value to the HTTP response header field.
    * If the header is not already set, it creates the header with the specified value.
    * The value parameter can be a string or an array.
    * @function appendHeader
    * @inner
    */
   (function appendHeader() {
      try {
         res.append('x-powered-by', 'blocktron');
         res.append('x-blocktron-Accept-Charset', 'UTF-8');
         res.append('x-blocktron-Accept-Language', 'en');
         res.append('x-blocktron-response-timestamp', '' + Date.now());
         res.append('x-blocktron-host-uuid', '' + _bt_config.blocktronNodeId);
      } catch (error) {
         log.error('Header appendage failed due to: ' + error);
      }
   })();
   next();
};

module.exports = enhanceResponse;

/***/ }),

/***/ "./src/routes/blocktron.js":
/*!*********************************!*\
  !*** ./src/routes/blocktron.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * blocktron router and controller
 * @module routers:blocktronRouter
 */
var express = __webpack_require__(/*! express */ "express");
var blocktronRouter = express.Router();

/**
 * GET blocktron blockchain listing.
 * @function
 * @name get/blocktron
 * @memberof routers:blocktronRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
blocktronRouter.get('/', function (req, res, next) {
  /**
   * Send the JSON representation of blockchain to the client.
   */
  res.json(blocktron);
});

module.exports = blocktronRouter;

/***/ }),

/***/ "./src/routes/broadcastTransaction.js":
/*!********************************************!*\
  !*** ./src/routes/broadcastTransaction.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * blocktron transaction router and controller
 * @module routers:broadcastTransactionRouter
 */
var express = __webpack_require__(/*! express */ "express");
var broadcastTransactionRouter = express.Router();

/**
 * The simplified HTTP request client 'request' with Promise support.
 * Powered by Bluebird.
 * `request-promise` returns regular Promises/A+ compliant promises
 * and can be assimilated by any compatible promise library.
 * @see {@link https://www.npmjs.com/package/request-promise|Request-Promise}
 */
var request = __webpack_require__(/*! request-promise */ "request-promise");

/**
 * POST a trnasaction to broadcast it
 * @function
 * @name post/broadcastTransaction
 * @memberof routers:broadcastTransactionRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
broadcastTransactionRouter.post('/', function (req, res, next) {
  /**
   * Validate the transaction parameters
   */
  if (!req || !req.body || !req.body.amount || !req.body.sender || !req.body.receiver) {
    /**
     * log error
     */
    log.error('Cannot create a transaction without required parameters');
  }

  /**
   * Create a transaction with the request parameters.
   */
  var newTransaction = blocktron.createNewTransaction(req.body.amount, req.body.sender, req.body.receiver);

  /**
   * Add the transaction object to pending transactions array of this node
   */
  blocktron.addTransactionToPendingTransaction(newTransaction);

  /**
   * Array to hold the request promise objects
   */
  var requestPromises = [];

  /**
   * Broadcast transactions to all nodes in the network node array
   */
  blocktron.networkNodes.forEach(function (networkNodeUrl) {
    /**
     * Construct the request
     */
    var requestOptions = {
      uri: networkNodeUrl + '/transaction',
      method: 'POST',
      body: newTransaction,
      json: true
    };

    /**
     * Push request promise objects into request promise array
     */
    requestPromises.push(request(requestOptions));
  });

  /**
   * Resolve all request promise objects and then send appropriate response
   */
  Promise.all(requestPromises)

  /**
   * Once resolved send the response
   */
  .then(function (data) {
    /**
     * Set success, object created status code
     */
    res.status(201);

    /**
     * Construct the response and send it
     */
    var response = {
      status: 'success',
      code: res.statusCode,
      message: 'Transaction created and broadcasted successfully'
    };
    res.json(response);
  }).catch(function (error) {
    log.error('Transaction broadcast failed due to: ' + error);
  });
});

module.exports = broadcastTransactionRouter;

/***/ }),

/***/ "./src/routes/consensus.js":
/*!*********************************!*\
  !*** ./src/routes/consensus.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Consensus router and controller
 * @module routers:consensusRouter
 */
var express = __webpack_require__(/*! express */ "express");
var consensusRouter = express.Router();

/**
 * The simplified HTTP request client 'request' with Promise support.
 * Powered by Bluebird.
 * `request-promise` returns regular Promises/A+ compliant promises
 * and can be assimilated by any compatible promise library.
 * @see {@link https://www.npmjs.com/package/request-promise|Request-Promise}
 */
var request = __webpack_require__(/*! request-promise */ "request-promise");

/**
 * Check for consensus and update blockchains
 * This implementation uses the popular 'Longest chain rule' algorithm.
 * @function
 * @name get/consensus
 * @memberof routers:consensusRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
consensusRouter.get('/', function (req, res, next) {
  /**
   * Array to hold the request promise objects
   */
  var requestPromises = [];

  /**
   * Broadcast transactions to all nodes in the network node array
   */
  blocktron.networkNodes.forEach(function (networkNodeUrl) {
    /**
     * Construct the request
     */
    var requestOptions = {
      uri: networkNodeUrl + '/blockchain',
      method: 'GET',
      json: true
    };

    /**
     * Push request promise objects into request promise array
     */
    requestPromises.push(request(requestOptions));
  });

  /**
   * Resolve all request promise objects and then send appropriate response
   */
  Promise.all(requestPromises)

  /**
   * Once resolved, do chain validation and update chains accordingly
   */
  .then(function (blockchains) {
    /**
     * Get the length of the current node's blockchain
     */
    var currentChainLength = blocktron.chain.length;

    /**
     * Set currentChainLength as the maximum chain length
     */
    var maximumChainLength = currentChainLength;

    /**
     * Initialize new longest chain as null
     */
    var newLongestChain = null;

    /**
     * Initialize new pending transactions as null
     */
    var newPendingTransactions = null;

    /**
     * Iterate through each blockchain
     */
    blockchains.forEach(function (blockchain) {
      /**
       * If any blockchain has length larger than current node's blockchain
       */
      if (blockchain.chain.length > maximumChainLength) {
        /**
         * Replace new maximum chain length with largest blockchain length
         */
        maximumChainLength = blockchain.chain.length;

        /**
         * Replace largest blockchain as the new longest chain
         */
        newLongestChain = blockchain.chain;

        /**
         * Replace pending transactions list with the largest blockchain's pending transactions list
         */
        newPendingTransactions = blockchain.pendingTransactions;
      }
    });

    /**
     * If there are no long chains or the new longest chain is not a valid chain, then
     * Send appropriate response
     */
    if (!newLongestChain || newLongestChain && !blocktron.isChainValid(newLongestChain)) {
      /**
       * Log error in case of consensus failure
       */
      log.error('Current blockchain has not been replaced');

      /**
       * Set appropriate status
       */
      res.status(200);

      /**
       * Construct the response object and send it
       * @const response
       * @type {Object}
       * @memberof routers:consensusRouter
       * @param {String} status - The status of the operation
       * @param {Number} code - The HTTP response status code
       * @param {String} message - The message string
       * @param {Object} blockchain - The blockchain data
       */
      var response = {
        status: 'Not Modified',
        code: res.statusCode,
        message: 'Current blockchain has not been replaced',
        blockchain: blocktron.chain
      };
      res.json(response);
    } else if (newLongestChain && blocktron.isChainValid(newLongestChain)) {
      /**
       * If there is a longer valid chain, then replace current node's blockchain with
       * the longest valid chain
       */
      blocktron.chain = newLongestChain;

      /**
       * Update the pending transactions list of current node with the new valid
       * blockchain's pending transactions list
       */
      blocktron.pendingTransactions = newPendingTransactions;

      /**
       * Set appropriate status code
       */
      res.status(201);

      /**
       * Construct the response object and send it
       * @const response
       * @type {Object}
       * @memberof routers:consensusRouter
       * @param {String} status - The status of the operation
       * @param {Number} code - The HTTP response status code
       * @param {String} message - The message string
       * @param {Object} blockchain - The blockchain data after consensus
       */
      var _response = {
        status: 'Chain replaced',
        code: res.statusCode,
        message: 'Current blockchain has been replaced',
        blockchain: blocktron.chain
      };
      res.json(_response);
    }
  }).catch(function (error) {
    /**
     * Log error in case of consensus failure
     */
    log.error('Consensus check failed due to: ' + error);
  });
});

module.exports = consensusRouter;

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/**
 * Index router and controller
 * @module routers:indexRouter
 */
var express = __webpack_require__(/*! express */ "express");
var indexRouter = express.Router();

/**
 * GET home page.
 * @function
 * @name get/
 * @memberof routers:indexRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
indexRouter.get('/', function (req, res, next) {
   /**
    * Construct response and send it
    * This object contains information about various environment
    * and configuration details of blocktron node
    * @const response
    * @type {Object}
    * @memberof routers:indexRoute
    */
   var response = {
      message: 'Blocktron Node is running',
      port: port,
      status_code: res.statusCode,
      configuration: {
         process_title: process.title,
         process_pid: process.pid,
         memory: {
            resident_set_size: process.memoryUsage().rss / 1024 / 1024 * 100 / 100 + ' MB',
            heap_total: process.memoryUsage().heapTotal / 1024 / 1024 * 100 / 100 + ' MB',
            heap_used: process.memoryUsage().heapUsed / 1024 / 1024 * 100 / 100 + ' MB',
            external: process.memoryUsage().external / 1024 / 1024 * 100 / 100 + ' MB'
         },
         node_id: _bt_config.blocktronNodeId,
         node_address: process.argv[3] ? process.argv[3] : 'http://127.0.0.1:' + port,
         environment: env,
         os: process.platform,
         cpu_arch: process.arch,
         process_versions: {
            node_version: process.versions.node,
            v8_version: process.versions.v8
         }
      }
   };
   res.json(response);
});

module.exports = indexRouter;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/routes/mine.js":
/*!****************************!*\
  !*** ./src/routes/mine.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * blocktron mine router and controller
 * @module routers:mineRouter
 */
var express = __webpack_require__(/*! express */ "express");
var mineRouter = express.Router();

/**
 * The simplified HTTP request client 'request' with Promise support.
 * Powered by Bluebird.
 * `request-promise` returns regular Promises/A+ compliant promises
 * and can be assimilated by any compatible promise library.
 * @see {@link https://www.npmjs.com/package/request-promise|Request-Promise}
 */
var request = __webpack_require__(/*! request-promise */ "request-promise");

/**
 * Mine a block.
 * @function
 * @name get/mine
 * @memberof routers:mineRoute
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
mineRouter.get('/', function (req, res, next) {
  /**
   * Get the last block from the chain
   */
  var lastBlock = blocktron.getLastBlock();

  /**
   * Get the hash of the that block (previousBlock)
   */
  var previousBlockHash = lastBlock['hash'];

  /**
   * Build the current block's data
   * @constant currentBlockData
   * @type {Object}
   * @memberof routers:mineRoute
   * @param {Array} transactions - List of pending transactions
   * @param {Number} index - The chronological position of this block on the chain
   */
  var currentBlockData = {
    transactions: blocktron.pendingTransactions,
    index: lastBlock['index'] + 1
  };

  /**
   * Get the valid nonce value using the Proof Of Work Algorithm
   */
  var nonce = blocktron.proofOfWork(previousBlockHash, currentBlockData);

  /**
   * Generate the hash of the block data
   */
  var blockHash = blocktron.hashBlock(previousBlockHash, currentBlockData, nonce);

  /**
   * Create the new block (Mining the new block to the blockchain)
   */
  var newBlock = blocktron.createNewBlock(nonce, previousBlockHash, blockHash);

  /**
   * Array to hold the request promise objects
   */
  var requestPromises = [];

  /**
   * Broadcast mined blocks to all nodes
   */
  blocktron.networkNodes.forEach(function (networkNodeUrl) {
    /**
     * Construct the request
     */
    var requestOptions = {
      uri: networkNodeUrl + '/receiveNewBlock',
      method: 'POST',
      body: {
        newBlock: newBlock
      },
      json: true
    };

    /**
     * Push request promise objects into request promise array
     */
    requestPromises.push(request(requestOptions));
  });

  /**
   * Resolve all request promise objects and then send appropriate response
   */
  Promise.all(requestPromises)

  /**
   * Once resolved send the response
   */
  .then(function (data) {
    /**
     * Reward the miner with the standard reward value
     * Construct the request
     */
    var requestOptions = {
      uri: blocktron.currentNodeUrl + '/transaction/broadcast',
      method: 'POST',
      body: {
        amount: _bt_config.rewardValue,
        sender: _bt_config.rewardSenderAddress,
        receiver: _bt_config.blocktronNodeId
      },
      json: true
    };

    /**
     * Return the request promise
     */
    return request(requestOptions);
  }).then(function (data) {
    /**
     * Set appropriate status code
     */
    res.status(201);

    /**
     * Construct the response object and send it
     * @const response
     * @type {Object}
     * @memberof routers:mineRoute
     * @param {String} status - The status of the operation
     * @param {Number} code - The HTTP response status code
     * @param {String} message - The message string
     * @param {Object} blockData - The newly mined block's data
     */
    var response = {
      status: 'success',
      code: res.statusCode,
      message: 'New block mined and broadcasted successfully',
      blockData: newBlock
    };
    res.json(response);
  }).catch(function (error) {
    log.error('Block mine and broadcast failed due to: ' + error);
  });
});

module.exports = mineRouter;

/***/ }),

/***/ "./src/routes/receiveNewBlock.js":
/*!***************************************!*\
  !*** ./src/routes/receiveNewBlock.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * blocktron mine router and controller
 * @module routers:receiveNewBlockRouter
 */
var express = __webpack_require__(/*! express */ "express");
var receiveNewBlockRouter = express.Router();

/**
 * Receive a new block.
 * @function
 * @name get/receiveNewBlock
 * @memberof routers:receiveNewBlockRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
receiveNewBlockRouter.post('/', function (req, res, next) {
  /**
   * Validate the request for new block
   */
  if (!req || !req.body || !req.body.newBlock) {
    /**
     * Log error if bad request
     */
    log.error('Block data missing');

    /**
     * Set appropriate status code for response
     */
    res.status(400);

    /**
     * Construct the reponse and send it
     * @const response
     * @type {Object}
     * @memberof routers:receiveNewBlockRouter
     * @param {String} status - The status of the operation
     * @param {Number} code - The HTTP response status code
     * @param {String} message - The message string
     */
    var response = {
      status: 'Bad request',
      code: res.statusCode,
      message: 'Invalid data type or missing data'
    };
    res.json(response);
  } else {
    /**
     * Read the new block data from request
     */
    var newBlock = req.body.newBlock;

    /**
     * Get the last block from this node's chain
     */
    var lastBlock = blocktron.getLastBlock();

    /**
     * Check new block's previous hash is equal to last block's hash or not
     */
    var validHash = lastBlock.hash === newBlock.previousHash;

    /**
     * Check if the new block's index is valid
     */
    var validIndex = lastBlock['index'] + 1 === newBlock['index'];

    /**
     * Check for valid hash and index of the new block
     */
    if (validHash && validIndex) {
      /**
       * Push the valid block into the blockchain
       */
      blocktron.chain.push(newBlock);

      /**
       * Empty the pending transactions array
       */
      blocktron.pendingTransactions = [];

      /**
       * Set appropriate response status code
       */
      res.status(201);

      /**
       * Construct the response object and send it
       * @const response
       * @type {Object}
       * @memberof routers:receiveNewBlockRouter
       * @param {String} status - The status of the operation
       * @param {Number} code - The HTTP response status code
       * @param {String} message - The message string
       * @param {Object} blockData - The newly received block's data
       */
      var _response = {
        status: 'success',
        code: res.statusCode,
        message: 'New block received and accepted',
        blockData: newBlock
      };
      res.json(_response);
    } else {
      /**
       * Set appropriate status code for response
       */
      res.status(400);

      /**
       * Construct the reponse and send it
       * @const response
       * @type {Object}
       * @memberof routers:receiveNewBlockRouter
       * @param {String} status - The status of the operation
       * @param {Number} code - The HTTP response status code
       * @param {String} message - The message string
       */
      var _response2 = {
        status: 'Bad request',
        code: res.statusCode,
        message: 'Invalid block data'
      };
      res.json(_response2);
    }
  }
});

module.exports = receiveNewBlockRouter;

/***/ }),

/***/ "./src/routes/registerAndBroadcastNode.js":
/*!************************************************!*\
  !*** ./src/routes/registerAndBroadcastNode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * register and broadcast nodes router and controller
 * @module routers:registerAndBroadcastRouter
 */
var express = __webpack_require__(/*! express */ "express");
var registerAndBroadcastRouter = express.Router();

/**
 * The simplified HTTP request client 'request' with Promise support.
 * Powered by Bluebird.
 * `request-promise` returns regular Promises/A+ compliant promises
 * and can be assimilated by any compatible promise library.
 * @see {@link https://www.npmjs.com/package/request-promise|Request-Promise}
 */
var request = __webpack_require__(/*! request-promise */ "request-promise");

/**
 * POST a url to register and broadcast it to other nodes
 * @function
 * @name post/registerAndBroadcast
 * @memberof routers:registerAndBroadcastRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
registerAndBroadcastRouter.post('/', function (req, res, next) {
  /**
   * Get the new node's url from request body
   */
  var newNodeUrl = req.body.newNodeUrl;

  /**
   * Check whether current node's url is equal to new node url
   * if not equal, constant holds a 'true'
   * @const notCurrentNode
   * @type {Boolean}
   */
  var notCurrentNode = blocktron.currentNodeUrl !== newNodeUrl;

  /**
   * Check whether the node url is already present in the registry or is it current node's url
   * TODO: Also check whether the node url is accessible.
   */
  if (blocktron.isNewNode(newNodeUrl) && notCurrentNode) {
    /**
     * If url is new, push the url to registry
     */
    blocktron.networkNodes.push(newNodeUrl);

    /**
     * Array to hold the promise objects of nodes registration
     */
    var registerNodesPromises = [];

    /**
     * Register each node url in the networkNodes array
     */
    blocktron.networkNodes.forEach(function (networkNodeUrl) {
      /**
       * Construct the options for request-promise
       * @const requestOptions
       * @type {Object}
       * @memberof routers:registerAndBroadcastRouter
       * @param {String} uri - The uri to request to
       * @param {String} method - The HTTP method to use
       * @param {Object} body - The request body object
       * @param {Boolean} json - The type of request body
       */
      var requestOptions = {
        uri: networkNodeUrl + '/registerNode',
        method: 'POST',
        body: {
          newNodeUrl: newNodeUrl
        },
        json: true
      };

      /**
       * Push each promise object returned from `request` into the promise array
       */
      registerNodesPromises.push(request(requestOptions));
    });

    /**
     * Resolve all promises sequentially and then register them in bulk
     */
    Promise.all(registerNodesPromises).then(function (data) {
      /**
       * Construct the bulk registration request and send it
       * @const bulkRegisterOptions
       * @type {Object}
       * @memberof routers:registerAndBroadcastRouter
       * @param {String} uri - The uri to request to
       * @param {String} method - The HTTP method to use
       * @param {Object} body - The request body object
       * @param {Boolean} json - The type of request body
       */
      var bulkRegisterOptions = {
        uri: newNodeUrl + '/registerNodesBulk',
        method: 'POST',
        body: {
          allNetworkNodes: [].concat(_toConsumableArray(blocktron.networkNodes), [blocktron.currentNodeUrl])
        },
        json: true
      };

      /**
       * Return the bulk registration promise object
       */
      return request(bulkRegisterOptions);
    }).then(function (data) {
      /**
       * Once bulk registration is resolved set appropriate header and send response
       */
      res.status(201);

      /**
       * Construct the reponse and send it
       * @const response
       * @type {Object}
       * @memberof routers:registerAndBroadcastRouter
       * @param {String} status - The status of the operation
       * @param {Number} code - The HTTP response status code
       * @param {String} message - The message string
       */
      var response = {
        status: 'success',
        code: res.statusCode,
        message: 'New nodes registered with the network'
      };
      res.json(response);
    }).catch(function (error) {
      /**
       * Catch promise reject error
       */
      log.error('Nodes registration failed due to: ' + error);

      /**
       * Set response status to 409 to represent resource conflict
       */
      res.status(409);

      /**
       * Construct response and send it
       * @const response
       * @type {Object}
       * @memberof routers:registerAndBroadcastRouter
       * @param {String} status - The status of the operation
       * @param {Number} code - The HTTP response status code
       * @param {String} message - The message string
       */
      var response = {
        status: 'resource conflict',
        code: res.statusCode,
        message: 'Given node url: ' + newNodeUrl + ', is a conflicting value'
      };
      res.json(response);
    });
  } else {
    /**
     * Set response status to 409 to represent resource conflict
     */
    res.status(409);

    /**
     * Construct response and send it
     * @const response
     * @type {Object}
     * @memberof routers:registerAndBroadcastRouter
     * @param {String} status - The status of the operation
     * @param {Number} code - The HTTP response status code
     * @param {String} message - The message string
     */
    var response = {
      status: 'resource conflict',
      code: res.statusCode,
      message: 'Given node url: ' + newNodeUrl + ', is already present in registry or is a conflicting value'
    };
    res.json(response);
  }
});

module.exports = registerAndBroadcastRouter;

/***/ }),

/***/ "./src/routes/registerNode.js":
/*!************************************!*\
  !*** ./src/routes/registerNode.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * register node router and controller
 * @module routers:registerNodeRouter
 */
var express = __webpack_require__(/*! express */ "express");
var registerNodeRouter = express.Router();

/**
 * POST a url to register it with node
 * @function
 * @name post/registerNode
 * @memberof routers:registerNodeRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
registerNodeRouter.post('/', function (req, res, next) {
  /**
   * Get the new node's url from request body
   */
  var newNodeUrl = req.body.newNodeUrl;

  /**
   * Check whether current node's url is equal to new node url
   * if not equal, constant holds a 'true'
   * @const notCurrentNode
   * @type {Boolean}
   */
  var notCurrentNode = blocktron.currentNodeUrl !== newNodeUrl;

  /**
   * Check whether node url already exists in data structure, and
   * also check whether current node's url is equal to new node url
   */
  if (blocktron.isNewNode(newNodeUrl) && notCurrentNode) {
    /**
     * then push the new url to networkNodes array
     */
    blocktron.networkNodes.push(newNodeUrl);
  } else {
    /**
     * log error denoting the duplication or conflicting value
     */
    log.error('Given url: ' + newNodeUrl + ' rejected, it is already present or is a conflicting value');
  }

  /**
   * Set appropriate response status code
   */
  res.status(201);

  /**
   * Construct the reponse and send it
   * @const response
   * @type {Object}
   * @memberof routers:registerNodeRouter
   * @param {String} status - The status of the operation
   * @param {Number} code - The HTTP response status code
   * @param {String} message - The message string
   */
  var response = {
    status: 'success',
    code: res.statusCode,
    message: 'New node registered successfully'
  };
  res.json(response);
});

module.exports = registerNodeRouter;

/***/ }),

/***/ "./src/routes/registerNodesBulk.js":
/*!*****************************************!*\
  !*** ./src/routes/registerNodesBulk.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * register nodes in bulk router and controller
 * @module routers:registerNodesBulkRouter
 */
var express = __webpack_require__(/*! express */ "express");
var registerNodesBulkRouter = express.Router();

/**
 * POST multiple node urls to register them all at once
 * @function
 * @name post/registerNodesBulk
 * @memberof routers:registerNodesBulkRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
registerNodesBulkRouter.post('/', function (req, res, next) {
  /**
   * Validate the request for invalid data
   */
  if (!req.body || !req.body.allNetworkNodes) {
    /**
     * log error
     */
    log.error('Bad request, given request body is either empty or contains invalid data');

    /**
     * Set appropriate status code for response
     */
    res.status(400);

    /**
     * Construct the reponse and send it
     * @const response
     * @type {Object}
     * @memberof routers:registerNodesBulkRouter
     * @param {String} status - The status of the operation
     * @param {Number} code - The HTTP response status code
     * @param {String} message - The message string
     */
    var response = {
      status: 'Bad request',
      code: res.statusCode,
      message: 'Invalid data type or missing data'
    };
    res.json(response);
  } else {
    /**
     * Get the network nodes url list from the request body
     */
    var allNetworkNodes = req.body.allNetworkNodes;

    /**
     * Iterate and add each node url to networkNodes array
     * also validate each url for duplication
     */
    allNetworkNodes.forEach(function (networkNodeUrl) {
      /**
       * Check whether current node's url is equal to network node url
       * if not equal, constant holds a 'true'
       * @const notCurrentNode
       * @type {Boolean}
       */
      var notCurrentNode = blocktron.currentNodeUrl !== networkNodeUrl;

      /**
       * Check whether node url already exists in data structure, and
       * also check whether current node's url is equal to network node url
       */
      if (blocktron.isNewNode(networkNodeUrl) && notCurrentNode) {
        /**
         * then push the new url to networkNodes array
         */
        blocktron.networkNodes.push(networkNodeUrl);
      } else {
        /**
         * log error denoting the duplication or conflicting value
         */
        log.error('Given url: ' + networkNodeUrl + ' rejected, it is already present or is a conflicting value');
      }
    });

    /**
     * Set appropriate status code for response
     */
    res.status(201);

    /**
     * Construct the reponse and send it
     * @const response
     * @type {Object}
     * @memberof routers:registerNodesBulkRouter
     * @param {String} status - The status of the operation
     * @param {Number} code - The HTTP response status code
     * @param {String} message - The message string
     */
    var _response = {
      status: 'success',
      code: res.statusCode,
      message: 'Bulk registration of nodes successful'
    };
    res.json(_response);
  }
});

module.exports = registerNodesBulkRouter;

/***/ }),

/***/ "./src/routes/transaction.js":
/*!***********************************!*\
  !*** ./src/routes/transaction.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * blocktron transaction router and controller
 * @module routers:transactionRouter
 */
var express = __webpack_require__(/*! express */ "express");
var transactionRouter = express.Router();

/**
 * POST a transaction
 * @function
 * @name post/transaction
 * @memberof routers:transactionRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
transactionRouter.post('/', function (req, res, next) {
  /**
   * Validate the transaction parameter
   */
  if (req.body) {
    /**
     * Create a transaction with the request parameters.
     */
    var blockIndex = blocktron.addTransactionToPendingTransaction(req.body);

    /**
     * Construct the response object and send it
     * @const response
     * @type {Object}
     * @memberof routers:transactionRouter
     * @param {String} status - The status of the operation
     * @param {Number} code - The HTTP response status code
     * @param {String} message - The message string
     */
    var response = {
      status: 'success',
      code: res.statusCode,
      message: 'Transaction will be added to the block: ' + blockIndex
    };
    res.json(response);
  } else {
    /**
     * log error
     */
    log.error('Cannot create a transaction without required parameter');
  }
});

module.exports = transactionRouter;

/***/ }),

/***/ "base64-js":
/*!****************************!*\
  !*** external "base64-js" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("base64-js");

/***/ }),

/***/ "blocktron-lib":
/*!********************************!*\
  !*** external "blocktron-lib" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("blocktron-lib");

/***/ }),

/***/ "builtin-status-codes":
/*!***************************************!*\
  !*** external "builtin-status-codes" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("builtin-status-codes");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http-errors");

/***/ }),

/***/ "ieee754":
/*!**************************!*\
  !*** external "ieee754" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ieee754");

/***/ }),

/***/ "inherits":
/*!***************************!*\
  !*** external "inherits" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inherits");

/***/ }),

/***/ "isarray":
/*!**************************!*\
  !*** external "isarray" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isarray");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pino":
/*!***********************!*\
  !*** external "pino" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pino");

/***/ }),

/***/ "readable-stream":
/*!**********************************!*\
  !*** external "readable-stream" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("readable-stream");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ }),

/***/ "serve-favicon":
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),

/***/ "to-arraybuffer":
/*!*********************************!*\
  !*** external "to-arraybuffer" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("to-arraybuffer");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "uuid/v1":
/*!**************************!*\
  !*** external "uuid/v1" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid/v1");

/***/ }),

/***/ "xtend":
/*!************************!*\
  !*** external "xtend" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("xtend");

/***/ })

/******/ });
});
//# sourceMappingURL=blocktron_node.js.map