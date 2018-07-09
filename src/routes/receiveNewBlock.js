/**
 * blocktron mine route and controller
 * @module routers:receiveNewBlockRouter
 */
const express = require('express');
const receiveNewBlockRouter = express.Router();

/**
 * Receive a new block.
 * @function
 * @name get/receiveNewBlock
 * @memberof routers:receiveNewBlockRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
receiveNewBlockRouter.post('/', (req, res, next) => {

    /**
     * Validate the request for new block
     */
    if (!req || !req.body || !req.body.newBlock) {

        /**
         * Log error if bad request
         */
        log.error('Block data missing');

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
         * Read the new block data from request
         */
        const newBlock = req.body.newBlock;

        /**
         * Get the last block from this node's chain
         */
        const lastBlock = blocktron.getLastBlock();

        /**
         * Check new block's previous hash is equal to last block's hash or not
         */
        const validHash = lastBlock.hash === newBlock.previousHash;

        /**
         * Check if the new block's index is valid
         */
        const validIndex = lastBlock['index'] + 1 === newBlock['index'];
    }
});

module.exports = receiveNewBlockRouter;
