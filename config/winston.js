const appRoot = require('app-root-path');
const winston = require('winston');
var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        format: winston.format.json(),
        maxsize: 2542880,
        maxFiles: 5,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    }

};
var logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
});
logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
}

module.exports = logger;