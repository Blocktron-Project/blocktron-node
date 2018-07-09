/**
 * blocktron mine route and controller
 * @module routers:mineRoute
 */
const express = require('express');
const receiveNewBlockRouter = express.Router();

receiveNewBlockRouter.post('/', (req, res, next)=>{

});

module.exports = receiveNewBlockRouter;