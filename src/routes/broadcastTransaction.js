/**
 * blocktron transaction router and controller
 * @module routers:broadcastTransactionRouter
 */
const express = require('express');
const broadcastTransactionRouter = express.Router();

/**
 * The simplified HTTP request client 'request' with Promise support.
 * Powered by Bluebird.
 * `request-promise` returns regular Promises/A+ compliant promises
 * and can be assimilated by any compatible promise library.
 * @see {@link https://www.npmjs.com/package/request-promise|Request-Promise}
 */
const request = require('request-promise');

/**
 * POST a trnasaction to broadcast it
 * @function
 * @name post/broadcastTransaction
 * @memberof routers:broadcastTransactionRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
broadcastTransactionRouter.post('/', (req, res, next) => {
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
      const newTransaction = blocktron.createNewTransaction(
            req.body.amount,
            req.body.sender,
            req.body.receiver
      );

      /**
       * Add the transaction object to pending transactions array of this node
       */
      blocktron.addTransactionToPendingTransaction(newTransaction);

      /**
       * Array to hold the request promise objects
       */
      let requestPromises = [];

      /**
       * Broadcast transactions to all nodes in the network node array
       */
      blocktron.networkNodes.forEach(networkNodeUrl => {
            /**
             * Construct the request
             */
            const requestOptions = {
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
            .then(data => {
                  /**
                   * Set success, object created status code
                   */
                  res.status(201);

                  /**
                   * Construct the response and send it
                   */
                  let response = {
                        status: 'success',
                        code: res.statusCode,
                        message: 'Transaction created and broadcasted successfully'
                  };
                  res.json(response);
            })
            .catch(error => {
                  log.error(`Transaction broadcast failed due to: ${error}`);
            });
});

module.exports = broadcastTransactionRouter;
