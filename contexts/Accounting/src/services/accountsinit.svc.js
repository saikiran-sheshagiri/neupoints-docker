var req_util = require('./request.util');
var logger = require('../logger').getLogger('accountsinit.svc');

var AccountsInitSvc = (function() {
    var req = new req_util.RequestUtil();
    
    function AccountsInitSvc() {
        return { 
              listHSMKeys: listHSMKeys,
              createHSMKey: createHSMKey,
              listAssets: listAssets,
              createAsset: createAsset,
          };
    };

    function listHSMKeys() {
        logger.debug('Listing HSM Keys');
        var options = req.buildOptions('mockhsm/list-keys');
        return req.postListRequest(options, function(key) { 
            return { 
                name: key.alias,
                xpub: key.xpub
             };
        });
    };

    function createHSMKey(name) {
        logger.debug(`Creating HSM Key "${name}"`);
        var options = req.buildOptions('mockhsm/create-key', { alias: name });
        return req.postRequest(options, function(key) {
            return { 
                name: key.alias,
                xpub: key.xpub
            };
        });
    };

    function listAssets() {
        logger.debug('Listing Assets');
        var options = req.buildOptions('list-assets');
        return req.postListRequest(options, function(asset) { 
            return { 
                name: asset.alias
             };
        });
    };

    function createAsset(hsmKey, name) {
        logger.debug(`Creating Asset "${name}"`);
        var options = req.buildOptions('create-asset', [{ 
            alias: name,
            root_xpubs: [hsmKey.xpub],
            quorum: 1,
            definition: {},
            tags: {}
        }]);
        return req.postRequest(options, function(asset) {
            return { 
                name: asset.alias
            };
        });
    };

    return AccountsInitSvc;

}());

exports.AccountsInitSvc = AccountsInitSvc;
