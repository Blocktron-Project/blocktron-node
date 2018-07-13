/**
 * Index router and controller
 * @module routers:indexRouter
 */
const express = require('express');
const indexRouter = express.Router();

/**
 * GET home page.
 * @function
 * @name get/
 * @memberof routers:indexRouter
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
indexRouter.get('/', (req, res, next) => {
   /**
    * Construct response and send it
    * This object contains information about various environment
    * and configuration details of blocktron node
    * @const response
    * @type {Object}
    * @memberof routers:indexRoute
    */
   let response = {
      message: 'Blocktron Node is running',
      port: port,
      status_code: res.statusCode,
      configuration: {
         process_title: process.title,
         process_pid: process.pid,
         node_address: _bt_config.blocktronNodeAddress,
         environment: env,
         os: process.platform,
         cpu_arch: process.arch,
         process_versions: {
            node_version: process.versions.node,
            v8_version: process.versions.v8
         }
      }
   };
   res.json(response);
});

module.exports = indexRouter;
