var accounts_api = require("../api/accounts.api");

var RoutesConfig = (function () {
    function RoutesConfig(app) {
        new accounts_api.AccountsApi(app);
    }
    return RoutesConfig;
}());

exports.RoutesConfig = RoutesConfig;
