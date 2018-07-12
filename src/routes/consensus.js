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
         * Once resolved send the response
         */
        .then((blockchains) => {

            const currentChainLength = blocktron.chain.length;

            let maximumChainLength = currentChainLength;

            let newLongestChain = null;

            let newPendingTransactions = null;

            blockchains.forEach(blockchain => {

                if (blockchain.chain.length > maximumChainLength) {

                    maximumChainLength = blockchain.chain.length;

                    newLongestChain = blockchain.chain;

                    newPendingTransactions = blockchain.pendingTransactions;
                }
            });

            if (!newLongestChain || (newLongestChain && !blocktron.isChainValid(newLongestChain))) {

                res.status(304);

                let response = {
                    status: 'Not Modified',
                    code: res.statusCode,
                    message: 'Current blockchain has not been replaced',
                    blockchain: blocktron.chain
                };
                res.json(response);
            } else if (newLongestChain && blocktron.isChainValid(newLongestChain)) {

                blocktron.chain = newLongestChain;

                blocktron.pendingTransactions = newPendingTransactions;

                res.status(201);

                let response = {
                    status: 'Chain replaced',
                    code: res.statusCode,
                    message: 'Current blockchain has been replaced',
                    blockchain: blocktron.chain
                };
            }
        })
        .catch((error) => {
            log.error(`Consensus check failed due to: ${error}`);
        });
});

module.exports = consensusRouter;
