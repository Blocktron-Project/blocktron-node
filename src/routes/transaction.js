/**
 * blocktron transaction router and controller
 * @module routers:transactionRouter
 */
const express = require('express');
const transactionRouter = express.Router();

/**
 * POST a transaction
 * @function
 * @name post/transaction
 * @memberof routers:transactionRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
transactionRouter.post('/', (req, res, next) => {
   /**
    * Validate the transaction parameter
    */
   if (req.body) {
      /**
       * Create a transaction with the request parameters.
       */
      const blockIndex = blocktron.addTransactionToPendingTransaction(req.body);

      /**
       * Construct the response object and send it
       * @const response
       * @type {Object}
       * @memberof routers:transactionRouter
       * @param {String} status - The status of the operation
       * @param {Number} code - The HTTP response status code
       * @param {String} message - The message string
       */
      let response = {
         status: 'success',
         code: res.statusCode,
         message: `Transaction will be added to the block: ${blockIndex}`
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
