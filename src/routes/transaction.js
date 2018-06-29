/**
 * blocktron transaction route and controller
 */
const express = require('express');
const router = express.Router();

/**
 * POST transaction
 */
router.post('/', function(req, res, next) {
   res.send(req.body);
});
module.exports = router;
