var log4js = require('log4js');
log4js.configure('./src/config/log4js.json');

function getLogger(categoryName) {
    var logger = log4js.getLogger(categoryName);
    logger.debugobj = function(msg, obj) {
        logger.debug(`${msg}\n${JSON.stringify(obj, null, 4)}`);
    };

    return logger;
}

module.exports = {
    getLogger: getLogger
};
