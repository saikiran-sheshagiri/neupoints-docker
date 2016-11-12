var log4js = require('log4js');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes_config = require("./config/routes.config");
var logger = require("./logger").getLogger("app");

var app = express();
app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO}));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

logger.debug("Setting port " + process.env.ACCOUNTING_PORT);
app.set("port", process.env.ACCOUNTING_PORT || 8080);

process.on("uncaughtException", function (err) {
    logger.fatal(err.message, err.stack);
    process.exit(1);
});

new routes_config.RoutesConfig(app);

logger.debug("Starting server on port " + app.get("port"));
var server = app.listen(app.get("port"));
server.on("close", function (err) {
    logger.info("Application server closed " + err);
});

logger.info('Running on http://localhost:' + app.get("port"));
module.exports = server;
