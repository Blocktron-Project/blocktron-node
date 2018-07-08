/**
 * Custom middlewares can be augmented here
 * @module middlewareRouter
 */
const express = require('express');
const middlewareRouter = express.Router();

/**
 * Middleware to augment the response object with helpers
 * @function
 * @memberof middlewareRouter
 * @param {Middleware} middleware - Express middleware callback
 */
middlewareRouter.use(require('./response'));

module.exports = middlewareRouter;
