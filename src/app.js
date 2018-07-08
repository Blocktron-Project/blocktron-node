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
const _bt_config = require('../config/blocktron');
global._bt_config = _bt_config;

/**
 * Set up process environment
 * @global
 */
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
global.env = env;

/**
 * Set up process title (useful for debugging)
 */
process.title = _bt_config.appTitle;

/**
 * Create HTTP errors for Express, Koa, Connect, etc. with ease.
 */
const createError = require('http-errors');

/**
 * Fast, unopinionated, minimalist web framework for node.
 */
const express = require('express');

/**
 * Pino instance: Extremely fast node.js logger, inspired by Bunyan.
 * It also includes a shell utility to pretty-print its log files.
 * @global
 */
const log = require('pino')(require('../config/pino'));

/**
 * Set up global logging
 */
global.log = log;

/**
 * Include the blocktron library (after it has been extended)
 */
const Blocktron = require('./lib/blocktron');

/**
 * Create an instance of the Blocktron class and globalize it.
 * @global
 */
let blocktron = new Blocktron();
global.blocktron = blocktron;

/**
 * Set-up routes
 */
const indexRouter = require('./routes/index');
const blocktronRouter = require('./routes/blocktron');
const transactionRouter = require('./routes/transaction');
const mineRouter = require('./routes/mine');
const registerAndBroadCastNodeRouter = require('./routes/registerAndBroadcastNode');
const registerNodeRouter = require('./routes/registerNode');
const registerNodesBulkRouter = require('./routes/registerNodesBulk');
log.info('Blocktron routes initialized');

/**
 * Instantiate the blocktron express app object
 */
const blocktronNode = express();
log.info('Blocktron initialized');

/**
 * disable x-powered-by to deceive hackers
 */
blocktronNode.disable('x-powered-by');

/**
 * Set-up and use middlewares
 * @memberof blocktronNode
 */
blocktronNode.use(express.json());
blocktronNode.use(
   express.urlencoded({
      extended: false
   })
);
log.info('Blocktron application middlewares initialized');

/**
 * Custom Middlewares
 * @memberof blocktronNode
 */
blocktronNode.use(require('./middlewares'));
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
log.info('Blocktron routes chained to middlewares');

/**
 * Catch 404 and forward to error handler
 * @memberof blocktronNode
 * @function
 * @param {Callback} middleware - Callback to catch 404 error
 */
blocktronNode.use((req, res, next) => {
   log.error('Error caught');
   next(createError(404));
});

/**
 * Error handler
 * @memberof blocktronNode
 * @function
 * @param {Callback} middleware - Callback to render the error
 */
blocktronNode.use((err, req, res, next) => {
   /**
    * render the error
    */
   res.status(err.status || 500);
   let errorData = {
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
