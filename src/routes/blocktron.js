/**
 * blocktron route and controller
 * @module router
 */
const express = require('express');
const router = express.Router();

/**
 * GET blocktron blockchain listing.
 */
router.get('/', (req, res, next) => {
    /**
     * Send the JSON representation of blockchain to the client.
     */
    res.json(blocktron);
});

module.exports = router;
