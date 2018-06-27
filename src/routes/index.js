const express = require('express');
const router = express.Router();

/**
 * GET home page.
 */
router.get('/', function (req, res, next) {
  let response = {
    message: 'Blocktron Node is running',
    port: port,
    status_code: res.statusCode,
    configuration: {
      process_title: process.title,
      process_pid: process.pid,
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

module.exports = router;