var request = require('request');
var _ = require('lodash');

var logger = require('../logger').getLogger('accounts.svc');
var config = require('../config');

var AccountsSvc = (function () {
    function AccountsSvc() {
          return { 
              getAccounts: getAccounts 
          };
    };

    function getAccounts(customerId) {
        var options = {
            url: `${config.chainuri}/list-accounts`,
            auth:{
                'user': process.env.CHAINCORE_ACCESS_TOKEN.split(':')[0],
                'pass': process.env.CHAINCORE_ACCESS_TOKEN.split(':')[1]
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
