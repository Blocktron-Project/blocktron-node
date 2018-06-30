/**
 * blocktron mine route and controller
 * @module router
 */
const express = require('express');
const router = express.Router();

/**
 * A node module for simple, fast generation of RFC4122 UUIDS.
 * Here v1 is used.
 * @see {@link https://www.ietf.org/rfc/rfc4122.txt|RFC4122} 
 */
const uuid = require('uuid/v1');

/**
 * Generate an RFC4122 compatible unique distributed-system node identifier.
 * Using uuid generate a unique string, then remove the dashes in the string and rejoin them.
 * The string generated is guarenteed to be unique at a very high percentage.
 */
const blocktronNodeAddress = uuid().split('-').join('');

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
    blocktron.createNewTransaction(blocktronConfig.rewardValue, blocktronConfig.rewardSenderAddress, blocktronNodeAddress);

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
