const express = require('express');
const registerNodesBulkRouter = express.Router();

/**
 * POST multiple node ulrs to register them all at once
 */
registerNodesBulkRouter.post('/', (req, res, next) => {
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const notCurrentNode = blocktron.currentNodeUrl !== networkNodeUrl;
        if (blocktron.isNewNode(networkNodeUrl) && notCurrentNode) {
            blocktron.networkNodes.push(networkNodeUrl);
        } else {
            log.error(`${networkNodeUrl} is already present or is a conflicting value`);
        }
    });
    res.status(201);
    let response = {
        status: 'success',
        code: res.statusCode,
        message: 'Bulk registration of nodes successful'
    };
    res.json(response);
});

module.exports = registerNodesBulkRouter;
