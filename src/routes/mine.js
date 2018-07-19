/**
 * blocktron mine router and controller
 * @module routers:mineRouter
 */
const express = require('express');
const mineRouter = express.Router();

/**
 * The simplified HTTP request client 'request' with Promise support.
 * Powered by Bluebird.
 * `request-promise` returns regular Promises/A+ compliant promises
 * and can be assimilated by any compatible promise library.
 * @see {@link https://www.npmjs.com/package/request-promise|Request-Promise}
 */
const request = require('request-promise');

/**
 * Mine a block.
 * @function
 * @name get/mine
 * @memberof routers:mineRoute
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
mineRouter.get('/', (req, res, next) => {
      /**
       * Get the last block from the chain
       */
      const lastBlock = blocktron.getLastBlock();

      /**
       * Get the hash of the that block (previousBlock)
       */
      const previousBlockHash = lastBlock['hash'];

      /**
       * Build the current block's data
       * @constant currentBlockData
       * @type {Object}
       * @memberof routers:mineRoute
       * @param {Array} transactions - List of pending transactions
       * @param {Number} index - The chronological position of this block on the chain
       */
      const currentBlockData = {
            transactions: blocktron.pendingTransactions,
            index: lastBlock['index'] + 1
      };

      /**
       * Get the valid nonce value using the Proof Of Work Algorithm
       */
      const nonce = blocktron.proofOfWork(previousBlockHash, currentBlockData);

      /**
       * Generate the hash of the block data
       */
      const blockHash = blocktron.hashBlock(previousBlockHash, currentBlockData, nonce);

      /**
       * Create the new block (Mining the new block to the blockchain)
       */
      const newBlock = blocktron.createNewBlock(nonce, previousBlockHash, blockHash);

      /**
       * Array to hold the request promise objects
       */
      let requestPromises = [];

      /**
       * Broadcast mined blocks to all nodes
       */
      blocktron.networkNodes.forEach(networkNodeUrl => {
            /**
             * Construct the request
             */
            let requestOptions = {
                  uri: networkNodeUrl + '/receiveNewBlock',
                  method: 'POST',
                  body: {
                        newBlock: newBlock
                  },
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
                   * Reward the miner with the standard reward value
                   * Construct the request
                   */
                  let requestOptions = {
                        uri: blocktron.currentNodeUrl + '/transaction/broadcast',
                        method: 'POST',
                        body: {
                              amount: _bt_config.rewardValue,
                              sender: _bt_config.rewardSenderAddress,
                              receiver: _bt_config.blocktronNodeAddress
                        },
                        json: true
                  };

                  /**
                   * Return the request promise
                   */
                  return request(requestOptions);
            })
            .then(data => {
                  /**
                   * Set appropriate status code
                   */
                  res.status(201);

                  /**
                   * Construct the response object and send it
                   * @const response
                   * @type {Object}
                   * @memberof routers:mineRoute
                   * @param {String} status - The status of the operation
                   * @param {Number} code - The HTTP response status code
                   * @param {String} message - The message string
                   * @param {Object} blockData - The newly mined block's data
                   */
                  let response = {
                        status: 'success',
                        code: res.statusCode,
                        message: 'New block mined and broadcasted successfully',
                        blockData: newBlock
                  };
                  res.json(response);
            })
            .catch(error => {
                  log.error(`Block mine and broadcast failed due to: ${error}`);
            });
});

module.exports = mineRouter;
