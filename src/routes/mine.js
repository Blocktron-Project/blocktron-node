/**
 * blocktron mine route and controller
 * @module router
 */
const express = require('express');
const router = express.Router();

/**
 * Mine a block.
 */
router.get('/', function(req, res, next) {
   let response = {
      message: 'Hello blocktron'
   };
   res.json(response);
});
module.exports = router;
