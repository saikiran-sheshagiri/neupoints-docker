var Account = require('../models/account');
var logger = require('../logger').getLogger('accounts.svc');
var request = require('request');
var _ = require('lodash');

var AccountsSvc = (function () {
    function AccountsSvc() {
          return { 
              getAccounts: getAccounts 
          };
    };

    function getAccounts(customerId) {
        var options = {
            url: 'http://localhost:1999/list-accounts',
            auth:{
                'user': 'client',
                'pass': '1ea237229a3acf8b283e2930dcf1fd6c0f8397f0fb34c1f581b547938223b27b'
            },
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            form: JSON.stringify({})
        };

        return new Promise(function(resolve, reject) {
            logger.debug('POST request');
            logger.jsonp(options);

            request.post(options, function(error, response, body) {
                if(error) {
                    logger.error(error);
                    reject(error);
                }

                var accounts = list(body);
                resolve(_.map(accounts, function(account) {
                    return {
                        name: account.alias,
                    }
                }));
            });
        });
    };

    function getAcount(customerId, type) {

    };

    function list(data) {
        logger.debug(`Parsing list.`);
        
        var result = JSON.parse(data);
        logger.jsonp(result);

        return result.items;
    };

    return AccountsSvc;
}());
exports.AccountsSvc = AccountsSvc;
