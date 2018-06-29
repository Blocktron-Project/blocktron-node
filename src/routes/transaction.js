/**
 * blocktron transaction route and controller
 */
const express = require('express');
const router = express.Router();

/**
 * POST transaction
 */
router.post('/', function(req, res, next) {
   let response = {
      message: 'Hello blocktron'
   };
   res.json(response);
});
module.exports = router;
