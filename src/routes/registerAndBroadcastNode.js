/**
 * blocktron transaction route and controller
 * @module routers:registerAndBroadcastRoute
 */
const express = require('express');
const registerAndBroadcastRouter = express.Router();

/**
 * POST a url to register and broadcast it to other nodes
 * @function
 * @name post/registerAndBroadcast
 * @memberof routers:registerAndBroadcastRoute
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
registerAndBroadcastRouter.post('/', (req, res, next) => {

    /**
     * Get the new node's url from request body
     */
    const newNodeUrl = req.body.newNodeUrl;

    /**
     * Check whether the node url is already present in the registry
     */
    if (blocktron.isNewNode(newNodeUrl)) {

        /**
         * If url is new, push the url to registry
         */
        blocktron.networkNodes.push(newNodeUrl);
    } else {

        /**
         * Set response status to 409 to represent resource conflict
         */
        res.status(409);

        /**
         * Construct response
         */
        let response = {
            status: 'resource conflict',
            code: res.statusCode,
            message: `Given node url: ${newNodeUrl}, is already present in registry.`
        };
        res.json(response);
    }
});

module.exports = registerAndBroadcastRouter;
