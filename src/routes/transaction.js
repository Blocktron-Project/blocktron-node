/**
 * blocktron transaction route and controller
 * @module router
 */
const express = require('express');
const router = express.Router();

/**
 * POST a transaction
 */
router.post('/', function (req, res, next) {
    /**
     * Validate the transaction parameters
     */
    if (!req || !req.body || !req.body.amount || !req.body.sender || !req.body.receiver) {
        throw new Error('Cannot create a transaction without required parameters');
    }
    /**
     * Create a transaction with the request parameters.
     */
    const blockIndex = blocktron.createNewTransaction(req.body.amount, req.body.sender, req.body.receiver);
    
    /**
     * Construct the response object and send it
     */
    let response = {
        status: 'success',
        code: res.statusCode,
        message: `Transaction will be added to the block: ${blockIndex}`
    };
    res.send(response);
});
module.exports = router;
