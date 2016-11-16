var accounts_svc = require('../services/accounts.svc');
var logger = require('../logger').getLogger('accounts.api');

var AccountsApi = (function () {
    var svc;

    function AccountsApi(app, hsmKeyName) {
        svc = new accounts_svc.AccountsSvc(hsmKeyName);

        app.get("/api/accounts/:owner_id", function (req, res) {
            logger.debug(`Getting accounts for owner:${req.params.owner_id}`);
            svc.getAccounts(req.params.owner_id)
                .then(function(accounts) {
                    logger.debugobj(`Accounts for ${req.params.owner_id}`, accounts);
                    res.status(200).jsonp(accounts);
                })
                .catch(function(error) {
                    logger.error(`There was an error retriving accounts. ${error}`);
                });
        }).get("/api/accounts/:owner_id/:type", function (req, res) {
            logger.debug(`Getting accounts for owner:${req.params.owner_id} and type:${req.params.type}`);
            svc.getAccounts(req.params.owner_id, req.params.type)
                .then(function(accounts) {
                    logger.debugobj(`Accounts for ${account.owner_id} of type ${account.type}`, accounts);
                    res.status(200).jsonp(accounts);
                })
                .catch(function(error) {
                    logger.error(`There was an error retriving accounts. ${error}`);
                });
        }).post("/api/accounts", function (req, res) {
            logger.debug(`Adding new account for owner:${req.body.owner_id}`);
            logger.debug(`${req.body.name}, ${req.body.owner_id}, ${req.body.type}`);
            logger.debugobj(`req.body`, req.body);
            svc.createAccount(req.body.name, req.body.owner_id, req.body.type)
                .then(function(account) {
                    logger.debugobj(`New account for ${account.owner_id}`, accounts);
                    res.status(200).jsonp(accounts);
                })
                .catch(function(error) {
                    logger.error(`There was an error creating the new account. ${error}`);
                });
        });
    }

    return AccountsApi;
}());
exports.AccountsApi = AccountsApi;
