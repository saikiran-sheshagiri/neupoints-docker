var req_util = require('./request.util');
var logger = require('../logger').getLogger('accounts.svc');

var AccountsSvc = (function () {
    var req = new req_util.RequestUtil();

    function AccountsSvc() {
          return { 
              getAccounts: getAccounts 
          };
    };

    function getAccounts(customerId) {
        var options = req.buildOptions('list-accounts');
        return req.postListRequest(options, function(account) { return { name: account.alias }});
    };

    function getAcount(customerId, type) {

    };

    return AccountsSvc;
}());

exports.AccountsSvc = AccountsSvc;

