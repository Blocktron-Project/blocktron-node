/**
 * A module to enhance the blocktron-lib data structure library
 * @module Blocktron
 */
const BlocktronLib = require('blocktron-lib');

/**
 * The blocktron-lib class enhanced
 * @class Blocktron
 * @extends BlocktronLib
 */
class Blocktron extends BlocktronLib {

    /**
     * The constructor for the class
     * @param {*} chain - The blockchain array
     * @param {*} pendingTransactions - The pending transactions array
     */
    constructor(chain, pendingTransactions) {

        /**
         * Call the parent class constructor with the given parameters.
         */
        super(chain, pendingTransactions);
    }
}

module.exports = Blocktron;