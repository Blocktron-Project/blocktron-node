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
            memory: {
                resident_set_size:
                    ((process.memoryUsage().rss / 1024 / 1024) * 100) / 100 + ' MB',
                heap_total:
                    ((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100 + ' MB',
                heap_used:
                    ((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100 + ' MB',
                external: ((process.memoryUsage().external / 1024 / 1024) * 100) / 100 + ' MB'
            },
            node_id: _bt_config.blocktronNodeId,
            node_address: process.argv[3] ? process.argv[3] : 'http://127.0.0.1:' + port,
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
