/**
 * register nodes in bulk router and controller
 * @module routers:registerNodesBulkRouter
 */
const express = require('express');
const registerNodesBulkRouter = express.Router();

/**
 * POST multiple node urls to register them all at once
 * @function
 * @name post/registerNodesBulk
 * @memberof routers:registerNodesBulkRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
registerNodesBulkRouter.post('/', (req, res, next) => {
   /**
    * Validate the request for invalid data
    */
   if (!req.body || !req.body.allNetworkNodes) {
      /**
       * log error
       */
      log.error(
         'Bad request, given request body is either empty or contains invalid data'
      );

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
      let response = {
         status: 'Bad request',
         code: res.statusCode,
         message: 'Invalid data type or missing data'
      };
      res.json(response);
   } else {
      /**
       * Get the network nodes url list from the request body
       */
      const allNetworkNodes = req.body.allNetworkNodes;

      /**
       * Iterate and add each node url to networkNodes array
       * also validate each url for duplication
       */
      allNetworkNodes.forEach(networkNodeUrl => {
         /**
          * Check whether current node's url is equal to network node url
          * if not equal, constant holds a 'true'
          * @const notCurrentNode
          * @type {Boolean}
          */
         const notCurrentNode = blocktron.currentNodeUrl !== networkNodeUrl;

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
            log.error(
               `Given url: ${networkNodeUrl} rejected, it is already present or is a conflicting value`
            );
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
      let response = {
         status: 'success',
         code: res.statusCode,
         message: 'Bulk registration of nodes successful'
      };
      res.json(response);
   }
});

module.exports = registerNodesBulkRouter;
