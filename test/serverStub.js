/**
 * The blocktronNode Testing stub
 * A minimal server bootstrap module
 * Written by: Sandeep Vattapparambil
 * @module server
 */

/**
 * The blocktronNode
 */
const blocktronNode = require('../src/app');

/**
 * Create the server module
 * The test server uses port 3000 to avoid `EADDRINUSE` error.
 * @function
 * @memberof server
 * @param {Number} port - The port to listen on
 * @param {Function} Callback - The callback function 
 */
const server = blocktronNode.listen(3000, function () {
    const port = server.address().port;
    global.port = port;
    console.log('Test server app listening at port %s', port);
});

module.exports = server;
