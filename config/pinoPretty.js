/**
 * Pino-Pretty configuration object
 * @see {@link https://github.com/pinojs/pino-pretty | Pino-Pretty-github}
 */
const options = {
    colorize: true, 
    crlf: true, 
    errorLikeObjectKeys: ['err', 'error'], 
    errorProps: '', 
    levelFirst: false, 
    localTime: false, 
    messageKey: 'BTmsg', 
    translateTime: false, 
    search: 'foo == `bar`' 
};

module.exports = options;
