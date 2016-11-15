var default_api = require("../api/default.api");
var accounts_api = require("../api/accounts.api");

var RoutesConfig = (function () {
    function RoutesConfig(app, hsmKey) {
        new default_api.DefaultApi(app);
        new accounts_api.AccountsApi(app, hsmKey);
    }
    return RoutesConfig;
}());

exports.RoutesConfig = RoutesConfig;
