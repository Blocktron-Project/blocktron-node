/**
 * Blocktron global configuration 
 * @module _bt_config
 */

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
 * Blocktron configuration object
 * @type {Object}
 * @memberof _bt_config
 * @param {String} appTitle - The global process title
 * @param {Number} defaultAppPort - The default port for the app to run
 * @param {String} blocktronNodeAddress - The unique identifier for a single instance of this app
 * @param {String} rewardSenderAddress - The address label for this particular instance for reward process
 * @param {Number} rewardValue - The default global reward value
 */
const _bt_config = {
    appTitle: 'Blocktron Node',
    defaultAppPort: 3000,
    blocktronNodeAddress: blocktronNodeAddress,
    rewardSenderAddress: '00BLOCKTRON',
    rewardValue: 12.5
};

module.exports = _bt_config;
