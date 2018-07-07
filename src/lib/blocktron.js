/**
 * A module to enhance the blocktron-lib data structure library
 * @namespace Blocktron
 */

/**
 * Import the original blocktron-lib
 */
const BlocktronLib = require('blocktron-lib');

/**
 * Get the current node's url from command-line args array position 3
 */
const currentNodeUrl = process.argv[3];

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
}

module.exports = Blocktron;
