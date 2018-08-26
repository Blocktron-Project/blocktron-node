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
   messageKey: 'msg',
   translateTime: false
};

module.exports = options;
