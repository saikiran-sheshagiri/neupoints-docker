var default_api = require("../api/default.api");
var accounts_api = require("../api/accounts.api");

var RoutesConfig = (function () {
    function RoutesConfig(app, keyName) {
        new default_api.DefaultApi(app);
        new accounts_api.AccountsApi(app, keyName);
    }
    return RoutesConfig;
}());

exports.RoutesConfig = RoutesConfig;
