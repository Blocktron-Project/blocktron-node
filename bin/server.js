/**
 * Module dependencies.
 */

/**
 * The blocktronNode instance
 */
const blocktronNode = require('../src/app');

/**
 * A tiny JavaScript debugging utility modelled after Node.js core's debugging technique.
 * Works in Node.js and web browsers.
 */
const debug = require('debug')('blocktron-node:server');

/**
 * Node module housing the traditional complex http interfaces.
 */
const http = require('http');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || _bt_config.defaultAppPort);
global.port = port;
blocktronNode.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(blocktronNode);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
   log.info('Blocktron is running on port: ' + port);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
   let port = parseInt(val, 10);

   if (isNaN(port)) {
      // named pipe
      return val;
   }

   if (port >= 0) {
      // port number
      return port;
   }

   return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
   if (error.syscall !== 'listen') {
      throw error;
   }

   let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

   // handle specific listen errors with friendly messages
   switch (error.code) {
      case 'EACCES':
         console.error(bind + ' requires elevated privileges');
         process.exit(1);
         break;
      case 'EADDRINUSE':
         console.error(bind + ' is already in use');
         process.exit(1);
         break;
      default:
         throw error;
   }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
   let addr = server.address();
   let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
   debug('Listening on ' + bind);
}
