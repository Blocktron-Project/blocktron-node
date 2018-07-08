/**
 * A module to enhance the blocktron-lib data structure library
 */

/**
 * Import the original blocktron-lib
 */
const BlocktronLib = require('blocktron-lib');

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
     * @property {Number} amount - The value/amount to be recorded
     * @property {String} sender - The adress of the sender
     * @property {String} receiver - The address of the receiver
     */
    const newTransactions = {
      amount: amount,
      sender: sender,
      receiver: receiver
    };

    /**
     * Push the new transaction to the chain
     */
    //this.pendingTransactions.push(newTransactions);

    /**
     * Returns the number of the block, this transaction will be added to
     */
    //return this.getLastBlock()['index'] + 1;

    /**
     * Return the new transaction object
     */
    return newTransactions;
  }
}

module.exports = Blocktron;
