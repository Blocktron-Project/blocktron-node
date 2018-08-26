#!/usr/bin/env node
 //Blocktron-node (c) 2018, Sandeep Vattapparambil
module.exports =
  /******/
  (function (modules) { // webpackBootstrap
    /******/ // The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/
      if (installedModules[moduleId]) {
        /******/
        return installedModules[moduleId].exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/
      var module = installedModules[moduleId] = {
        /******/
        i: moduleId,
        /******/
        l: false,
        /******/
        exports: {}
        /******/
      };
      /******/
      /******/ // Execute the module function
      /******/
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ // Flag the module as loaded
      /******/
      module.l = true;
      /******/
      /******/ // Return the exports of the module
      /******/
      return module.exports;
      /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/
    __webpack_require__.d = function (exports, name, getter) {
      /******/
      if (!__webpack_require__.o(exports, name)) {
        /******/
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });
        /******/
      }
      /******/
    };
    /******/
    /******/ // define __esModule on exports
    /******/
    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require
    /******/
    __webpack_require__.t = function (value, mode) {
      /******/
      if (mode & 1) value = __webpack_require__(value);
      /******/
      if (mode & 8) return value;
      /******/
      if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
      /******/
      var ns = Object.create(null);
      /******/
      __webpack_require__.r(ns);
      /******/
      Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value
      });
      /******/
      if (mode & 2 && typeof value != 'string')
        for (var key in value) __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
      /******/
      return ns;
      /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function (module) {
      /******/
      var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
      /******/
      __webpack_require__.d(getter, 'a', getter);
      /******/
      return getter;
      /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/
    __webpack_require__.p = "";
    /******/
    /******/
    /******/ // Load entry module and return exports
    /******/
    return __webpack_require__(__webpack_require__.s = "./bin/server.js");
    /******/
  })
/************************************************************************/
/******/
({

  /***/
  "./bin/server.js":
    /*!***********************!*\
      !*** ./bin/server.js ***!
      \***********************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * Module dependencies.
       * @module Server
       */

      /**
       * The blocktronNode instance
       */
      var blocktronNode = __webpack_require__( /*! ../src/app */ "./src/app.js");

      /**
       * A tiny JavaScript debugging utility modelled after Node.js core's debugging technique.
       * Works in Node.js and web browsers.
       */
      var debug = __webpack_require__( /*! debug */ "debug")('blocktron-node:server');

      /**
       * Node module housing the traditional complex http interfaces.
       */
      var http = __webpack_require__( /*! http */ "http");

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

      /***/
    }),

  /***/
  "./config/blocktron.js":
    /*!*****************************!*\
      !*** ./config/blocktron.js ***!
      \*****************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

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
      var uuid = __webpack_require__( /*! uuid/v1 */ "uuid/v1");

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

      /***/
    }),

  /***/
  "./config/pino.js":
    /*!************************!*\
      !*** ./config/pino.js ***!
      \************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * Pino Logger configuration
       * This module holds the complete configuration object for the Pino logger instance
       * @module pinoConfig
       * @see {@link https://github.com/pinojs/pino/blob/master/docs/API.md|Pino Config}
       */

      var pinoPrettyConfig = __webpack_require__( /*! ./pinoPretty */ "./config/pinoPretty.js");

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

      /***/
    }),

  /***/
  "./config/pinoPretty.js":
    /*!******************************!*\
      !*** ./config/pinoPretty.js ***!
      \******************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

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
        translateTime: false
      };

      module.exports = options;

      /***/
    }),

  /***/
  "./src/app.js":
    /*!********************!*\
      !*** ./src/app.js ***!
      \********************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


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
      var _bt_config = __webpack_require__( /*! ../config/blocktron */ "./config/blocktron.js");
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
      var createError = __webpack_require__( /*! http-errors */ "http-errors");

      /**
       * Fast, unopinionated, minimalist web framework for node.
       */
      var express = __webpack_require__( /*! express */ "express");

      /**
       * Pino instance: Extremely fast node.js logger, inspired by Bunyan.
       * It also includes a shell utility to pretty-print its log files.
       * @global
       */
      var log = __webpack_require__( /*! pino */ "pino")(__webpack_require__( /*! ../config/pino */ "./config/pino.js"));

      /**
       * Set up global logging
       */
      global.log = log;

      /**
       * Include the blocktron library (after it has been extended)
       */
      var Blocktron = __webpack_require__( /*! ./lib/blocktron */ "./src/lib/blocktron.js");

      /**
       * Create an instance of the Blocktron class and globalize it.
       * @global
       */
      var blocktron = new Blocktron();
      global.blocktron = blocktron;

      /**
       * Set-up routes
       */
      var indexRouter = __webpack_require__( /*! ./routes/index */ "./src/routes/index.js");
      var blocktronRouter = __webpack_require__( /*! ./routes/blocktron */ "./src/routes/blocktron.js");
      var transactionRouter = __webpack_require__( /*! ./routes/transaction */ "./src/routes/transaction.js");
      var mineRouter = __webpack_require__( /*! ./routes/mine */ "./src/routes/mine.js");
      var registerAndBroadCastNodeRouter = __webpack_require__( /*! ./routes/registerAndBroadcastNode */ "./src/routes/registerAndBroadcastNode.js");
      var registerNodeRouter = __webpack_require__( /*! ./routes/registerNode */ "./src/routes/registerNode.js");
      var registerNodesBulkRouter = __webpack_require__( /*! ./routes/registerNodesBulk */ "./src/routes/registerNodesBulk.js");
      var broadcastTransactionRouter = __webpack_require__( /*! ./routes/broadcastTransaction */ "./src/routes/broadcastTransaction.js");
      var receiveNewBlockRouter = __webpack_require__( /*! ./routes/receiveNewBlock */ "./src/routes/receiveNewBlock.js");
      var consensusRouter = __webpack_require__( /*! ./routes/consensus */ "./src/routes/consensus.js");
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
      blocktronNode.use(__webpack_require__( /*! ./middlewares */ "./src/middlewares/index.js"));
      log.info('Blocktron custom middlewares initialized');

      /**
       * Add routes to the middleware chain
       * @memberof blocktronNode
       */
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

      /***/
    }),

  /***/
  "./src/lib/blocktron.js":
    /*!******************************!*\
      !*** ./src/lib/blocktron.js ***!
      \******************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      /**
       * A module to enhance the blocktron-lib data structure library
       */

      /**
       * Import the original blocktron-lib
       */
      var BlocktronLib = __webpack_require__( /*! blocktron-lib */ "blocktron-lib");

      /**
       * A node module for simple, fast generation of RFC4122 UUIDS.
       * Here v1 is used.
       * @see {@link https://www.ietf.org/rfc/rfc4122.txt|RFC4122}
       */
      var uuid = __webpack_require__( /*! uuid/v1 */ "uuid/v1");

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
      var _bt_config = __webpack_require__( /*! ../../config/blocktron */ "./config/blocktron.js");

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

      /***/
    }),

  /***/
  "./src/middlewares/index.js":
    /*!**********************************!*\
      !*** ./src/middlewares/index.js ***!
      \**********************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * Custom middlewares can be augmented here
       * @module middlewareRouter
       */
      var express = __webpack_require__( /*! express */ "express");
      var middlewareRouter = express.Router();

      /**
       * Middleware to augment the response object with helpers
       * @function
       * @memberof middlewareRouter
       * @param {Middleware} middleware - Express middleware callback
       */
      middlewareRouter.use(__webpack_require__( /*! ./response */ "./src/middlewares/response.js"));

      module.exports = middlewareRouter;

      /***/
    }),

  /***/
  "./src/middlewares/response.js":
    /*!*************************************!*\
      !*** ./src/middlewares/response.js ***!
      \*************************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

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

      /***/
    }),

  /***/
  "./src/routes/blocktron.js":
    /*!*********************************!*\
      !*** ./src/routes/blocktron.js ***!
      \*********************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * blocktron router and controller
       * @module routers:blocktronRouter
       */
      var express = __webpack_require__( /*! express */ "express");
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

      /***/
    }),

  /***/
  "./src/routes/broadcastTransaction.js":
    /*!********************************************!*\
      !*** ./src/routes/broadcastTransaction.js ***!
      \********************************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * blocktron transaction router and controller
       * @module routers:broadcastTransactionRouter
       */
      var express = __webpack_require__( /*! express */ "express");
      var broadcastTransactionRouter = express.Router();

      /**
       * The simplified HTTP request client 'request' with Promise support.
       * Powered by Bluebird.
       * `request-promise` returns regular Promises/A+ compliant promises
       * and can be assimilated by any compatible promise library.
       * @see {@link https://www.npmjs.com/package/request-promise|Request-Promise}
       */
      var request = __webpack_require__( /*! request-promise */ "request-promise");

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

      /***/
    }),

  /***/
  "./src/routes/consensus.js":
    /*!*********************************!*\
      !*** ./src/routes/consensus.js ***!
      \*********************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * Consensus router and controller
       * @module routers:consensusRouter
       */
      var express = __webpack_require__( /*! express */ "express");
      var consensusRouter = express.Router();

      /**
       * The simplified HTTP request client 'request' with Promise support.
       * Powered by Bluebird.
       * `request-promise` returns regular Promises/A+ compliant promises
       * and can be assimilated by any compatible promise library.
       * @see {@link https://www.npmjs.com/package/request-promise|Request-Promise}
       */
      var request = __webpack_require__( /*! request-promise */ "request-promise");

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

      /***/
    }),

  /***/
  "./src/routes/index.js":
    /*!*****************************!*\
      !*** ./src/routes/index.js ***!
      \*****************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * Index router and controller
       * @module routers:indexRouter
       */
      var express = __webpack_require__( /*! express */ "express");
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

      /***/
    }),

  /***/
  "./src/routes/mine.js":
    /*!****************************!*\
      !*** ./src/routes/mine.js ***!
      \****************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * blocktron mine router and controller
       * @module routers:mineRouter
       */
      var express = __webpack_require__( /*! express */ "express");
      var mineRouter = express.Router();

      /**
       * The simplified HTTP request client 'request' with Promise support.
       * Powered by Bluebird.
       * `request-promise` returns regular Promises/A+ compliant promises
       * and can be assimilated by any compatible promise library.
       * @see {@link https://www.npmjs.com/package/request-promise|Request-Promise}
       */
      var request = __webpack_require__( /*! request-promise */ "request-promise");

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

      /***/
    }),

  /***/
  "./src/routes/receiveNewBlock.js":
    /*!***************************************!*\
      !*** ./src/routes/receiveNewBlock.js ***!
      \***************************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * blocktron mine router and controller
       * @module routers:receiveNewBlockRouter
       */
      var express = __webpack_require__( /*! express */ "express");
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

      /***/
    }),

  /***/
  "./src/routes/registerAndBroadcastNode.js":
    /*!************************************************!*\
      !*** ./src/routes/registerAndBroadcastNode.js ***!
      \************************************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }
          return arr2;
        } else {
          return Array.from(arr);
        }
      }

      /**
       * register and broadcast nodes router and controller
       * @module routers:registerAndBroadcastRouter
       */
      var express = __webpack_require__( /*! express */ "express");
      var registerAndBroadcastRouter = express.Router();

      /**
       * The simplified HTTP request client 'request' with Promise support.
       * Powered by Bluebird.
       * `request-promise` returns regular Promises/A+ compliant promises
       * and can be assimilated by any compatible promise library.
       * @see {@link https://www.npmjs.com/package/request-promise|Request-Promise}
       */
      var request = __webpack_require__( /*! request-promise */ "request-promise");

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

      /***/
    }),

  /***/
  "./src/routes/registerNode.js":
    /*!************************************!*\
      !*** ./src/routes/registerNode.js ***!
      \************************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * register node router and controller
       * @module routers:registerNodeRouter
       */
      var express = __webpack_require__( /*! express */ "express");
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

      /***/
    }),

  /***/
  "./src/routes/registerNodesBulk.js":
    /*!*****************************************!*\
      !*** ./src/routes/registerNodesBulk.js ***!
      \*****************************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * register nodes in bulk router and controller
       * @module routers:registerNodesBulkRouter
       */
      var express = __webpack_require__( /*! express */ "express");
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

      /***/
    }),

  /***/
  "./src/routes/transaction.js":
    /*!***********************************!*\
      !*** ./src/routes/transaction.js ***!
      \***********************************/
    /*! no static exports found */
    /***/
    (function (module, exports, __webpack_require__) {

      "use strict";


      /**
       * blocktron transaction router and controller
       * @module routers:transactionRouter
       */
      var express = __webpack_require__( /*! express */ "express");
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

      /***/
    }),

  /***/
  "blocktron-lib":
    /*!********************************!*\
      !*** external "blocktron-lib" ***!
      \********************************/
    /*! no static exports found */
    /***/
    (function (module, exports) {

      module.exports = require("blocktron-lib");

      /***/
    }),

  /***/
  "debug":
    /*!************************!*\
      !*** external "debug" ***!
      \************************/
    /*! no static exports found */
    /***/
    (function (module, exports) {

      module.exports = require("debug");

      /***/
    }),

  /***/
  "express":
    /*!**************************!*\
      !*** external "express" ***!
      \**************************/
    /*! no static exports found */
    /***/
    (function (module, exports) {

      module.exports = require("express");

      /***/
    }),

  /***/
  "http":
    /*!***********************!*\
      !*** external "http" ***!
      \***********************/
    /*! no static exports found */
    /***/
    (function (module, exports) {

      module.exports = require("http");

      /***/
    }),

  /***/
  "http-errors":
    /*!******************************!*\
      !*** external "http-errors" ***!
      \******************************/
    /*! no static exports found */
    /***/
    (function (module, exports) {

      module.exports = require("http-errors");

      /***/
    }),

  /***/
  "pino":
    /*!***********************!*\
      !*** external "pino" ***!
      \***********************/
    /*! no static exports found */
    /***/
    (function (module, exports) {

      module.exports = require("pino");

      /***/
    }),

  /***/
  "request-promise":
    /*!**********************************!*\
      !*** external "request-promise" ***!
      \**********************************/
    /*! no static exports found */
    /***/
    (function (module, exports) {

      module.exports = require("request-promise");

      /***/
    }),

  /***/
  "uuid/v1":
    /*!**************************!*\
      !*** external "uuid/v1" ***!
      \**************************/
    /*! no static exports found */
    /***/
    (function (module, exports) {

      module.exports = require("uuid/v1");

      /***/
    })

  /******/
});
//# sourceMappingURL=blocktron_node.js.map
