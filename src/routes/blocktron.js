/**
 * blocktron route and controller
 * @module routers:blocktronRoute
 */
const express = require('express');
const blocktronRouter = express.Router();

/**
 * GET blocktron blockchain listing.
 * @function
 * @name get/blocktron
 * @memberof routers:blocktronRoute
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
blocktronRouter.get('/', (req, res, next) => {
    
   /**
    * Send the JSON representation of blockchain to the client.
    */
   res.json(blocktron);
});

module.exports = blocktronRouter;
