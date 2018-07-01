/**
 * blocktron transaction route and controller
 * @module routers:transactionRoute
 */
const express = require('express');
const transactionRoute = express.Router();

/**
 * POST a transaction
 * @function
 * @name post/transaction
 * @memberof routers:transactionRoute
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
transactionRoute.post('/', function(req, res, next) {
   /**
    * Validate the transaction parameters
    */
   if (!req || !req.body || !req.body.amount || !req.body.sender || !req.body.receiver) {
      throw new Error('Cannot create a transaction without required parameters');
   }
   /**
    * Create a transaction with the request parameters.
    */
   const blockIndex = blocktron.createNewTransaction(
      req.body.amount,
      req.body.sender,
      req.body.receiver
   );

   /**
    * Construct the response object and send it
    */
   let response = {
      status: 'success',
      code: res.statusCode,
      message: `Transaction will be added to the block: ${blockIndex}`
   };
   res.send(response);
});
module.exports = transactionRoute;
