/**
 * register nodes in bulk route and controller
 * @module routers:registerNodesBulkRouter
 */
const express = require('express');
const registerNodesBulkRouter = express.Router();

/**
 * POST multiple node ulrs to register them all at once
 * @function
 * @name post/registerNodesBulk
 * @memberof routers:registerNodesBulkRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
registerNodesBulkRouter.post('/', (req, res, next) => {

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
            log.error(`${networkNodeUrl} is already present or is a conflicting value`);
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
});

module.exports = registerNodesBulkRouter;
