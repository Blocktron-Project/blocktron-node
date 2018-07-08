/**
 * A module to enhance the blocktron-lib data structure library
 */

/**
 * Import the original blocktron-lib
 */
const BlocktronLib = require('blocktron-lib');

/**
 * A node module for simple, fast generation of RFC4122 UUIDS.
 * Here v1 is used.
 * @see {@link https://www.ietf.org/rfc/rfc4122.txt|RFC4122}
 */
const uuid = require('uuid/v1');

/**
 * Get the current node's url from command-line args array position 3
 */
let currentNodeUrl;
if (process.argv[3]) {
  currentNodeUrl = process.argv[3];
} else {
  log.info('Node URL argument is missing');
}

/**
 * The blocktron-lib class enhanced
 * @class Blocktron
 * @classdesc A module to enhance the blocktron-lib data structure library
 * @extends BlocktronLib
 */
class Blocktron extends BlocktronLib {

  /**
   * The constructor for the class
   * @param {Array} chain - The blockchain array
   * @param {Array} pendingTransactions - The pending transactions array
   */
  constructor(chain, pendingTransactions) {

    /**
     * Call the parent class constructor with the given parameters.
     */
    super(chain, pendingTransactions);

    /**
     * Add the current node's url as a property
     */
    this.currentNodeUrl = currentNodeUrl;

    /**
     * Add url's of all other nodes in the distributed system
     */
    this.networkNodes = [];
  }

  /**
   * Helper prototype to check whether a node url already exists in the networkNodes array.
   * @function isNewNode
   * @memberof Blocktron
   * @param {String} nodeUrl - The url of the new node to register
   * @returns {Boolean} - Returns true if url present or else false
   */
  isNewNode(nodeUrl) {
    if (this.networkNodes.indexOf(nodeUrl) === -1) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * A method to create a new transaction
   * @function createNewTransaction
   * @override
   * @memberof Blocktron
   * @param {Number} amount - The amount/value to be recorded
   * @param {String} sender - The adress of the sender
   * @param {String} receiver - The address of the receiver
   * @returns {Object} - Returns the transaction object
   */
  createNewTransaction(amount, sender, receiver) {

    /**
     * Validate the parameters
     */
    amount = amount ? amount : (function () {
      throw new Error('Amount required');
    })();
    sender = sender ? sender : (function () {
      throw new Error('Sender required');
    })();
    receiver = receiver ? receiver : (function () {
      throw new Error('receiver required');
    })();

    /**
     * @type {Object}
     * @const newTransactions - An atomic transactions block in the chain
     * @property {String} transactionId - The unique id for a transaction
     * @property {Number} amount - The value/amount to be recorded
     * @property {String} sender - The adress of the sender
     * @property {String} receiver - The address of the receiver
     */
    const newTransactions = {
      transactionId: uuid().split('-').join(''),
      amount: amount,
      sender: sender,
      receiver: receiver
    };

    /**
     * Return the new transaction object
     */
    return newTransactions;
  };

  /**
   * A blockchain method to add a newly created block to the pending transactions array
   * @function addTransactionToPendingTransaction
   * @memberof Blocktron
   * @param {Object} transactionObject - The object representing the transaction data
   */
  addTransactionToPendingTransaction(transactionObject) {

    /**
     * Validate transaction data object
     */
    if (transactionObject) {

      /**
       * If valid, push the transaction data to the pending transactions array
       */
      this.pendingTransactions.push(transactionObject);

      /**
       * Then return the chronological index of the transaction data block
       */
      return this.getLastBlock()['index'] + 1;
    } else {

      /**
       * Log error
       */
      log.error('Transaction data required');
    }
  };
}

module.exports = Blocktron;
