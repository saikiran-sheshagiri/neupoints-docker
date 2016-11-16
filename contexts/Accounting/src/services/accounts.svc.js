var _ = require('lodash');

var req_util = require('./request.util');
var accountsinit_svc = require('./accountsinit.svc');
var logger = require('../logger').getLogger('accounts.svc');

var AccountsSvc = (function () {
    var req = new req_util.RequestUtil();
    var hsmKeyName;
    var hsmKey;

    function AccountsSvc(keyName) {
        hsmKeyName = keyName;

        return { 
            createAccount: createAccount,
            getAccounts: getAccounts 
        };
    };

    function createAccount(name, owner_id, type) {
        logger.debug(`${name}, ${owner_id}, ${type}`);
        return new Promise(function (resolve, reject) {
            HSMKey().then(function(key) {
                logger.debug(`${name}, ${owner_id}, ${type}`);
                
                var body = [{
                    alias: name,
                    root_xpubs: [hsmKey.xpub],
                    quorum: 1,
                    tags: {
                        owner_id: owner_id,
                        type: type
                    }
                }];
                logger.debugobj(`Create body`, body);
                var options = req.buildOptions('create-account', body);
                req.postRequest(options, transform).then(function(account) {
                    resolve(account);
                }).catch(function(error) {
                    logger.error(`There was an error creating the account ${error}`);
                });
            }).catch(function(error) {
                logger.error(`There was an error retriving the HSMKey ${error}`);
            });
        });
    };

    function getAccounts(owner_id, type) {
        logger.debug(`Getting accounts for owner:${owner_id} with type:${type}`);
        var customerFilter = { filter:`tags.owner_id='${owner_id}'` };
        if(type) {
            customerFilter = { filter:`tags.owner_id='${owner_id}' AND tags.type='${type}'` };
        }
        var options = req.buildOptions('list-accounts', customerFilter);
        return req.postListRequest(options, transform);
    };

    function HSMKey() {
        return new Promise(function(resolve, reject) {
            if(hsmKey) {
                resolve(hsmKey);
            } else {
                var initSvc = new accountsinit_svc.AccountsInitSvc();
                initSvc.listHSMKeys()
                    .then(function(keys) {
                        logger.debugobj(`Retriving key: ${hsmKeyName}`, keys);
                        hsmKey = _.find(keys, function(key) { return key.name === hsmKeyName });
                        logger.debugobj(`Key found.`, hsmKey);

                        resolve(hsmKey);
                    })
                    .catch(function(error) {
                        logger.error(`There was an error retriving HSM keys. ${error}`);
                        reject(error);
                    });
            }
        });
    };

    function transform(account) {
        return { 
            name: account.alias,
            owner_id: account.tags.owner_id,
            type: account.tages.type 
        };
    };

    return AccountsSvc;
}());

exports.AccountsSvc = AccountsSvc;

