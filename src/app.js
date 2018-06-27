/**
 * blocktron-node
 * The Blocktron blockchain API Server Node.
 * This server acts as the single node in the entire distributed blockchain system.
 * Written by: Sandeep Vattapparambil
 * Email: sandeepv68@gmail.com
 * Website: www.sandeepv.in
 */

/**
 * Create HTTP errors for Express, Koa, Connect, etc. with ease.
 */
const createError = require('http-errors');

/**
 * Fast, unopinionated, minimalist web framework for node.
 */
const express = require('express');

/**
 * The NodeJS ’path’ module published to the NPM registry.
 */
const path = require('path');

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
const usersRouter = require('./routes/users');
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
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
log.info('Blocktron middlewares initialized');

/**
 * Add routes to the middleware chain
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
log.info('Blocktron routes chained to middlewares');

/**
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
  log.error('Error caught');
  next(createError(404));
});

/**
 * error handler
 */
app.use(function (err, req, res, next) {
  /**
   * set locals, only providing error in development
   */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /**
   * render the error 
   */
  res.status(err.status || 500);
  log.error(req);
  let errorData = {
    status: err.status || 500,
    message: err.message,
    stack: err.stack
  };
  res.json(errorData);
});

module.exports = app;
