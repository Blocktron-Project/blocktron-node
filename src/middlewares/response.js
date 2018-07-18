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
     * Helper function to append the specified value to the HTTP response header field.
     * If the header is not already set, it creates the header with the specified value.
     * The value parameter can be a string or an array.
     * @function appendHeader
     * @inner
     */
    (function appendHeader() {
        try {
            res.append('x-powered-by', 'blocktron');
            res.append('x-blocktron-Accept-Charset', 'UTF-8');
            res.append('x-blocktron-Accept-Language', 'en');
            res.append('x-blocktron-response-timestamp', `${Date.now()}`);
            res.append('x-blocktron-host-uuid', `${_bt_config.blocktronNodeAddress}`);
        } catch (error) {
            log.error(`Header appendage failed due to: ${error}`);
        }
    })();
    next();
};

module.exports = enhanceResponse;
