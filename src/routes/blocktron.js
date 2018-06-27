/**
 * blocktron route and controller
 */
const express = require('express');
const router = express.Router();

/**
 * GET blocktron listing.
 */
router.get('/', function(req, res, next) {
   let response = {
      message: 'Hello blocktron'
   };
   res.json(response);
});

module.exports = router;
