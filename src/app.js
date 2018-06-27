/**
 * blocktron-node
 * The Blocktron blockchain API Server Node.
 * This server acts as the single node in the entire distributed blockchain system.
 * Written by: Sandeep Vattapparambil
 * Email: sandeepv68@gmail.com
 * Website: www.sandeepv.in
 */

/**
 * Set up process
 */
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
process.title = 'Blocktron Node';
global.env = env;

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
 * Set up global logging
 */
global.log = log;

/**
 * Set-up routes
 */
const indexRouter = require('./routes/index');
const blocktronRouter = require('./routes/blocktron');
log.info('Blocktron routes initialized');

/**
 * Instantiate express app object
 */
const app = express();
log.info('Blocktron initialized');

/**
 * disable x-powered-by to deceive hackers
 */
app.disable('x-powered-by');

/**
 * Set-up and use middlewares
 */
app.use(express.json());
app.use(
   express.urlencoded({
      extended: false
   })
);
log.info('Blocktron middlewares initialized');

/**
 * Add routes to the middleware chain
 */
app.use('/', indexRouter);
app.use('/blocktron', blocktronRouter);
log.info('Blocktron routes chained to middlewares');

/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
   log.error('Error caught');
   next(createError(404));
});

/**
 * error handler
 */
app.use(function(err, req, res, next) {
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

module.exports = app;
