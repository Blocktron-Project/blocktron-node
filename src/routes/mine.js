/**
 * blocktron mine route and controller
 * @module routers:mineRoute
 */
const express = require('express');
const mineRouter = express.Router();

/**
 * Mine a block.
 * @function
 * @name get/mine
 * @memberof routers:mineRoute
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
mineRouter.get('/', function (req, res, next) {
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
     * Reward the miner with the standard reward value
     */
    blocktron.createNewTransaction(
        _bt_config.rewardValue,
        _bt_config.rewardSenderAddress,
        _bt_config.blocktronNodeAddress
    );

    /**
     * Create the new block (Mining the new block to the blockchain)
     */
    const newBlock = blocktron.createNewBlock(nonce, previousBlockHash, blockHash);

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
        message: 'New block mined successfully',
        blockData: newBlock
    };
    res.json(response);
});

module.exports = mineRouter;
