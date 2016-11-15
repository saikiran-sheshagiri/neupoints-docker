var accounts_svc = require('../services/accounts.svc');
var logger = require('../logger').getLogger('accounts.api');

var AccountsApi = (function () {
    function AccountsApi(app, hsmKey) {
      app.get("/api/Accounts/:customer_id", function (req, res) {
          var svc = new accounts_svc.AccountsSvc();

          logger.debug(`Getting accounts for customer id:${req.params.customer_id}`);
          svc.getAccounts(req.params.customer_id)
                .then(function(accounts) {
                    logger.debugobj(`Accounts for ${req.params.customer_id}`, accounts);
                    res.status(200).jsonp(accounts);
                })
                .catch(function(error) {
                    logger.error(`There was an error retriving accounts. ${error}`);
                });
      });
    }

    return AccountsApi;
}());
exports.AccountsApi = AccountsApi;
