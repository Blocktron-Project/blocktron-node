const express = require('express');
const router = express.Router();

/**
 * GET home page.
 */
router.get('/', function (req, res, next) {
  let response = {
    message: 'Blocktron Node Running on port 3000',
    status: 'Up',
    code: 200
  };
  res.json(response);
});

module.exports = router;
