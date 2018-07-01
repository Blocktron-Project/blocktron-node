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
 * @module blocktronApp
 */

/**
 * Global blocktron configuration
 */
const _bt_config = require('../config/blocktron');
global._bt_config = _bt_config;

/**
 * Set up process
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
 * Extremely fast node.js logger, inspired by Bunyan.
 * It also includes a shell utility to pretty-print its log files.
 */
const log = require('pino')(require('../config/pino'));

/**
 * Include the blocktron library 
 */
const Blocktron = require('./lib/blocktron');

/**
 * Create an instance of the Blocktron class and globalize it.
 */
let blocktron = new Blocktron;
global.blocktron = blocktron;

/**
 * Set up global logging
 */
global.log = log;

/**
 * Set-up routes
 */
const indexRouter = require('./routes/index');
const blocktronRouter = require('./routes/blocktron');
const transactionRouter = require('./routes/transaction');
const mineRouter = require('./routes/mine');
log.info('Blocktron routes initialized');

/**
 * Instantiate the blocktron express app object
 */
const blocktronApp = express();
log.info('Blocktron initialized');

/**
 * disable x-powered-by to deceive hackers
 */
blocktronApp.disable('x-powered-by');

/**
 * Set-up and use middlewares
 */
blocktronApp.use(express.json());
blocktronApp.use(
    express.urlencoded({
        extended: false
    })
);
log.info('Blocktron middlewares initialized');

/**
 * Add routes to the middleware chain
 */
blocktronApp.use('/', indexRouter);
blocktronApp.use('/blockchain', blocktronRouter);
blocktronApp.use('/transaction', transactionRouter);
blocktronApp.use('/mine', mineRouter);
log.info('Blocktron routes chained to middlewares');

/**
 * catch 404 and forward to error handler
 */
blocktronApp.use((req, res, next) => {
    log.error('Error caught');
    next(createError(404));
});

/**
 * error handler
 */
blocktronApp.use((err, req, res, next) => {
    /**
     * render the error
     */
    res.status(err.status || 500);
    log.error(req);
    let errorData = {
        status: err.status || 500,
        message: err.message
    };
    if (env === 'development') {
        errorData.stack = err.stack;
    }
    res.json(errorData);
});

module.exports = blocktronApp;
