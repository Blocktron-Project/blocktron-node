/**
 * register and broadcast nodes router and controller
 * @module routers:registerAndBroadcastRouter
 */
const express = require('express');
const registerAndBroadcastRouter = express.Router();

/**
 * The simplified HTTP request client 'request' with Promise support.
 * Powered by Bluebird.
 * `request-promise` returns regular Promises/A+ compliant promises
 * and can be assimilated by any compatible promise library.
 * @see {@link https://www.npmjs.com/package/request-promise|Request-Promise}
 */
const request = require('request-promise');

/**
 * POST a url to register and broadcast it to other nodes
 * @function
 * @name post/registerAndBroadcast
 * @memberof routers:registerAndBroadcastRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
registerAndBroadcastRouter.post('/', (req, res, next) => {
   /**
    * Get the new node's url from request body
    */
   const newNodeUrl = req.body.newNodeUrl;

   /**
    * Check whether current node's url is equal to new node url
    * if not equal, constant holds a 'true'
    * @const notCurrentNode
    * @type {Boolean}
    */
   const notCurrentNode = blocktron.currentNodeUrl !== newNodeUrl;

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
      let registerNodesPromises = [];

      /**
       * Register each node url in the networkNodes array
       */
      blocktron.networkNodes.forEach(networkNodeUrl => {
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
         let requestOptions = {
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
      Promise.all(registerNodesPromises)
         .then(data => {
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
            let bulkRegisterOptions = {
               uri: newNodeUrl + '/registerNodesBulk',
               method: 'POST',
               body: {
                  allNetworkNodes: [...blocktron.networkNodes, blocktron.currentNodeUrl]
               },
               json: true
            };

            /**
             * Return the bulk registration promise object
             */
            return request(bulkRegisterOptions);
         })
         .then(data => {
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
            let response = {
               status: 'success',
               code: res.statusCode,
               message: 'New nodes registered with the network'
            };
            res.json(response);
         })
         .catch(error => {
            /**
             * Catch promise reject error
             */
            log.error(`Nodes registration failed due to: ${error}`);

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
            let response = {
               status: 'resource conflict',
               code: res.statusCode,
               message: `Given node url: ${newNodeUrl}, is a conflicting value`
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
      let response = {
         status: 'resource conflict',
         code: res.statusCode,
         message: `Given node url: ${newNodeUrl}, is already present in registry or is a conflicting value`
      };
      res.json(response);
   }
});

module.exports = registerAndBroadcastRouter;
