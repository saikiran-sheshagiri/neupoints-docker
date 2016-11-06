
var accounts_svc = require('../services/accounts.svc');

var AccountsApi = (function () {
    function AccountsApi(app) {
      app.get("/api/Accounts/:customer_id", function (req, res) {
          var svc = new accounts_svc.AccountsSvc();
          svc.getAccounts(req.params.customer_id)
                .then(function(accounts) {
                    res.status(200).jsonp(accounts);
                })
                .catch(function(error) {
                });
      });
    }

    return AccountsApi;
}());
exports.AccountsApi = AccountsApi;
