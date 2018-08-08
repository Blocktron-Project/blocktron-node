/**
 * Pino Logger configuration
 * This module holds the complete configuration object for the Pino logger instance
 * @module pinoConfig
 * @see {@link https://github.com/pinojs/pino/blob/master/docs/API.md|Pino Config}
 */

const pinoPrettyConfig = require('./pinoPretty'); 

const pinoConfig = {
   /**
    * safe (boolean): avoid error caused by circular references in the object tree. Default: true.
    * */
   safe: true,

   /**
    * name (string): the name of the logger. Default: undefined.
    * */
   name: 'blocktron',

   /**
    * timestamp (boolean|function): Enables or disables the inclusion of a timestamp in the log message. If a function
    * is supplied, it must synchronously return a JSON string representation of the time, e.g. ,"time":1493426328206
    * (which is the default). If set to false, no timestamp will be included in the output. See stdTimeFunctions for a
    * set of available functions for passing in as a value for this option. Caution: any sort of formatted time will
    * significantly slow down Pino's performance.
    */
   timestamp: true,

   /**
    * slowtime (boolean): Outputs ISO time stamps ('2016-03-09T15:18:53.889Z') instead of Epoch time stamps
    * (1457536759176). WARNING: This option carries a 25% performance drop. We recommend using default Epoch
    * timestamps and transforming logs after if required. The pino -t command will do this for you (see CLI).
    * Default: false.
    * Deprecation: this option is scheduled to be removed in Pino 5.0.0.
    * Use timestamp: pino.stdTimeFunctions.slowTime instead.
    */
   slowtime: false,

   /**
    * level (string): one of 'fatal', 'error', 'warn', 'info', 'debug', 'trace'; also 'silent' is supported to disable
    * logging. Any other value defines a custom level and requires supplying a level value via levelVal.
    * Default: 'info'.
    */
   level: 'info',

   /**
    * messageKey (string): the string key for the 'message' in the JSON object. Default msg.
    */
   messageKey: 'msg',

   /**
    * prettyPrint (boolean|object): enables pino.pretty. This is intended for non-production configurations.
    * This may be set to a configuration object as outlined in pino.pretty. Default: false.
    */
   prettyPrint: pinoPrettyConfig,

   /**
    * enabled (boolean): enables logging. Default: true
    */
   enabled: true
};

module.exports = pinoConfig;
