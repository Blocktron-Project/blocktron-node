/**
 * blocktron mine route and controller
 * @module router
 */
const express = require('express');
const router = express.Router();

/**
 * Mine a block.
 */
router.get('/', function (req, res, next) {

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
    blocktron.createNewTransaction(blocktronConfig.rewardValue, '00BLOCKTRON', );

    /**
     * Create the new block (Mining the new block to the blockchain)
     */
    const newBlock = blocktron.createNewBlock(nonce, previousBlockHash, blockHash);

    /**
     * Construct the response object and send it
     */
    let response = {
        status: 'success',
        code: res.statusCode,
        message: 'New block mined successfully',
        blockData: newBlock
    };
    res.json(response);
});
module.exports = router;
