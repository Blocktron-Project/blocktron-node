/**
 * Index route and controller
 * @module routers:indexRoute
 */
const express = require('express');
const indexRoute = express.Router();

/**
 * GET home page.
 * @function
 * @name get/
 * @memberof routers:indexRoute
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
indexRoute.get('/', function(req, res, next) {
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

module.exports = indexRoute;
