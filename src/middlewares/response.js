/**
 * The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
 * @namespace res
 */

/**
 * @module enhanceResponse
 */

/**
 * Helper function to enhance the response object
 * @function enhanceResponse
 * @param {req} req - The request object
 * @param {res} res - The response object
 * @param {function} next - The next function in the middleware chain
 */
const enhanceResponse = (req, res, next) => {

    /**
     * Helper function to append the CORS headers to enable CORS.
     * Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional 
     * HTTP headers to tell a browser to let a web application running at one 
     * origin (domain) have permission to access selected resources from a server 
     * at a different origin. A web application makes a cross-origin HTTP request 
     * when it requests a resource that has a different origin (domain, protocol, and port) 
     * than its own origin.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS|Cross-Origin Resource Sharing (CORS)}
     * @function enableCORS
     * @inner
     */
    (enableCORS = () => {
        try {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
        } catch (error) {
            log.error(`CORS setup failed due to: ${error}`);
        }
    })();

    /**
     * Helper function to append the specified value to the HTTP response header field.
     * If the header is not already set, it creates the header with the specified value.
     * The value parameter can be a string or an array.
     * @function appendHeader
     * @inner
     */
    (appendHeader = () => {
        try {
            res.append('x-powered-by', 'blocktron');
            res.append('x-blocktron-Accept-Charset', 'UTF-8');
            res.append('x-blocktron-Accept-Language', 'en');
            res.append('x-blocktron-response-timestamp', `${Date.now()}`);
            res.append('x-blocktron-host-uuid', `${_bt_config.blocktronNodeId}`);
        } catch (error) {
            log.error(`Header appendage failed due to: ${error}`);
        }
    })();
    next();
};

module.exports = enhanceResponse;
