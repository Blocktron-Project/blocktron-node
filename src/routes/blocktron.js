/**
 * blocktron route and controller
 */
const express = require('express');
const router = express.Router();

/**
 * blocktron-lib datastructure library
 */
const BlocktronLib  = require('blocktron-lib');

class Blocktron extends BlocktronLib{
    constructor(chain, pendingTransactions ){
        super(chain, pendingTransactions);
    }
}

let blocktron = new Blocktron;
/**
 * GET blocktron listing.
 */
router.get('/', function(req, res, next) {
   res.send(blocktron);
});
module.exports = router;
