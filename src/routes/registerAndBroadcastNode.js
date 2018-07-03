/**
 * blocktron transaction route and controller
 * @module routers:registerAndBroadcastRoute
 */
const express = require('express');
const registerAndBroadcastRoute = express.Router();

/**
 * POST a url to register and broadcast it to other nodes
 * @function
 * @name post/registerAndBroadcast
 * @memberof routers:registerAndBroadcastRoute
 * @param {String} path - Express route path
 * @param {Callback} middleware - Express middleware callback
 */
registerAndBroadcastRoute.post('/', (req, res, next) => {
    const newNodeUrl = req.body.newNodeUrl;
    res.json(newNodeUrl);
});
module.exports = registerAndBroadcastRoute;
