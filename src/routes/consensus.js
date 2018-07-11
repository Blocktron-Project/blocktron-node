/**
 * Consensus router and controller
 * @module routers:consensusRouter
 */
const express = require('express');
const consensusRouter = express.Router();

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

        })
        .catch((error) => {
            log.error(`Consensus check failed due to: ${error}`);
        });
});

module.exports = consensusRouter;
