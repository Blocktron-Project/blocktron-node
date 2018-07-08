/**
 * register node route and controller
 * @module routers:registerNodeRouter
 */
const express = require('express');
const registerNodeRouter = express.Router();

/**
 * POST a url to register it with node
 * @function
 * @name post/registerNode
 * @memberof routers:registerNodeRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
registerNodeRouter.post('/', (req, res, next) => {

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
     * Check whether node url already exists in data structure, and 
     * also check whether current node's url is equal to new node url
     */
    if (blocktron.isNewNode(newNodeUrl) && notCurrentNode) {

        /**
         * then push the new url to networkNodes array
         */
        blocktron.networkNodes.push(newNodeUrl);

        /**
         * Set appropriate response status code
         */
        res.status(201);

        /**
         * Construct the reponse and send it
         * @const response
         * @type {Object}
         * @memberof routers:registerNodeRouter
         * @param {String} status - The status of the operation 
         * @param {Number} code - The HTTP response status code
         * @param {String} message - The message string
         */
        let response = {
            status: 'success',
            code: res.statusCode,
            message: 'New node registered successfully'
        };
        res.json(response);
    } else {

        /**
         * Set response status to 409 to represent resource conflict
         */
        res.status(409);

        /**
         * Construct the reponse and send it
         * @const response
         * @type {Object}
         * @memberof routers:registerNodeRouter
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
    }
});

module.exports = registerNodeRouter;
