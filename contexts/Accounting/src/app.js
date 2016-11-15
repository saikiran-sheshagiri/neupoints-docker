var log4js = require('log4js');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes_config = require("./config/routes.config");
var logger = require("./logger").getLogger("app");
var accountsinit_svc = require('./services/accountsinit.svc');
var _ = require('lodash');

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

function InitAsset(hsmKey) {
    logger.info(`Initializing asset.`);
    var svc = new accountsinit_svc.AccountsInitSvc();
    svc.listAssets()
            .then(function(assets) {
                logger.debugobj('Assets', assets);
                var asset = _.find(assets, function(a) { return a === 'Points'});
                if(!asset) {
                    logger.info('Points asset not found, creating the Points asset.');
                    svc.createAsset(hsmKey, 'Points')
                        .then(function(newAsset) {
                            logger.debugobj("Asset", newAsset);
                            logger.info('Points asset created.');
                        })
                        .catch(function(error) {
                            logger.fatal(`There was an error creating the Points assets. ${error}`);
                            process.exit(3);
                        });
                }
            })
            .catch(function(error) {
                logger.fatal(`There was an error retriving assets. ${error}`);
                process.exit(3);
            });
};

function InitKey() {
    logger.info(`Initializing chain`);
    var svc = new accountsinit_svc.AccountsInitSvc();
    var hsmKey;
    svc.listHSMKeys()
        .then(function(keys) {
            logger.debugobj('HMS Keys', keys);
            hsmKey = _.find(keys, function(key) { return key.name === 'HSM_Accounting_Dev'});
            if(!hsmKey) {
                logger.info('No HSM key found creating new HSMKey:HSM_Accounting_Dev');
                svc.createHSMKey('HSM_Accounting_Dev')
                .then(function(key) {
                    hsmKey = key;
                    logger.info('HSM Key created.');

                    InitAsset(hsmKey);
                })
                .catch(function(error) {
                    logger.fatal(`There was an error creating the HSM Key. ${error}`);
                    process.exit(2);
                })
            } else {
                InitAsset(hsmKey);
            }
        })
        .catch(function(error) {
            logger.fatal(`There was an error retriving HSM keys. ${error}`);
            process.exit(2);
        });
};

new routes_config.RoutesConfig(app);
logger.debug("Starting server on port " + app.get("port"));
var server = app.listen(app.get("port"));
server.on("close", function (err) {
    logger.info("Application server closed " + err);
});

logger.info('Running on http://localhost:' + app.get("port"));

InitKey();

module.exports = server;
