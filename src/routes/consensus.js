/**
 * Consensus router and controller
 * @module routers:consensusRouter
 */
const express = require('express');
const consensusRouter = express.Router();

/**
 * Check for consensus and update blockchains
 * @function
 * @name get/consensus
 * @memberof routers:consensusRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
consensusRouter.get('/', (req, res, next) => {

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
            uri: networkNodeUrl + '/blockchain',
            method: 'GET',
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
         * Once resolved, do chain validation and update chains accordingly
         */
        .then((blockchains) => {

            /**
             * Get the length of the current node's blockchain
             */
            const currentChainLength = blocktron.chain.length;

            /**
             * Set currentChainLength as the maximum chain length
             */
            let maximumChainLength = currentChainLength;

            /**
             * Initialize new longest chain as null
             */
            let newLongestChain = null;

            /**
             * Initialize new pending transactions as null
             */
            let newPendingTransactions = null;

            /**
             * Iterate through each blockchain
             */
            blockchains.forEach(blockchain => {

                /**
                 * If any blockchain has length larger than current node's blockchain
                 */
                if (blockchain.chain.length > maximumChainLength) {

                    /**
                     * Replace new maximum chain length with largest blockchain length
                     */
                    maximumChainLength = blockchain.chain.length;

                    /**
                     * Replace largest blockchain as the new longest chain
                     */
                    newLongestChain = blockchain.chain;

                    /**
                     * Replace pending transactions list with the largest blockchain's pending transactions list
                     */
                    newPendingTransactions = blockchain.pendingTransactions;
                }
            });

            /**
             * If there are no long chains or the new longest chain is not a valid chain, then
             * Send appropriate response
             */
            if (!newLongestChain || (newLongestChain && !blocktron.isChainValid(newLongestChain))) {

                /**
                 * Set appropriate status
                 */
                res.status(304);

                /**
                 * Construct the response object and send it
                 * @const response
                 * @type {Object}
                 * @memberof routers:consensusRouter
                 * @param {String} status - The status of the operation 
                 * @param {Number} code - The HTTP response status code
                 * @param {String} message - The message string
                 * @param {Object} blockchain - The blockchain data
                 */
                let response = {
                    status: 'Not Modified',
                    code: res.statusCode,
                    message: 'Current blockchain has not been replaced',
                    blockchain: blocktron.chain
                };
                res.json(response);
            } else if (newLongestChain && blocktron.isChainValid(newLongestChain)) {

                /**
                 * If there is a longer valid chain, then replace current node's blockchain with 
                 * the longest valid chain
                 */
                blocktron.chain = newLongestChain;

                /**
                 * Update the pending transactions list of current node with the new valid 
                 * blockchain's pending transactions list
                 */
                blocktron.pendingTransactions = newPendingTransactions;

                /**
                 * Set appropriate status code
                 */
                res.status(201);

                /**
                 * Construct the response object and send it
                 * @const response
                 * @type {Object}
                 * @memberof routers:consensusRouter
                 * @param {String} status - The status of the operation 
                 * @param {Number} code - The HTTP response status code
                 * @param {String} message - The message string
                 * @param {Object} blockchain - The blockchain data after consensus
                 */
                let response = {
                    status: 'Chain replaced',
                    code: res.statusCode,
                    message: 'Current blockchain has been replaced',
                    blockchain: blocktron.chain
                };
                res.json(response);
            }
        })
        .catch((error) => {

            /**
             * Log error in case of consensus failure
             */
            log.error(`Consensus check failed due to: ${error}`);
        });
});

module.exports = consensusRouter;
