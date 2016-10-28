#!/usr/bin/env node

var request = require('request');
var program = require('commander');
var q = require('q');
var _ = require('lodash');

program.version("1.0.0.0")
    .option('-i --init', 'Initialize the points system.')
    .option('-a --account <alias>', 'Create a new account.')
    .parse(process.argv);

if(program.init) {
    console.log("Initializing...");
    initialize();
}
else if(program.account) {
    initAccount(program.account);
}

function initAccount(name) {
    console.log("Initializing account %s", name);

    getAccounts()
        .then(function(accounts) {
            var newAccount = null;
            console.log("Number of accounts: " + accounts.length);
            if(accounts.length > 0) {
                newAccount = _.find(accounts, { 'alias': name });
            }

            if(newAccount === null) {
                createAccount(hsmKey, name)
                    .then(function(account) {
                        newAccount = account;
                    });
            }
            console.log(JSON.stringify(newAsset));
        });
};

function getAccounts(name) {
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

    var deffered = q.defer();
    post(options)
        .then(function(data){
            console.log(data);
            var result = JSON.parse(data);
            deffered.resolve(result.items);
        });
    return deffered.promise;
}

function initialize() {
    initMockHsmKey()
        .then(function(hsmKey) {
            initAsset(hsmKey, "Points");
        });
};

function initMockHsmKey() {
    console.log("Initializing MockHSM Key...");
    var deffered = q.defer();
    getHsmKeys()
        .then(function(hsmKeys) {
            var hsmKey = null;
            console.log("Number of keys: " + hsmKeys.length);
            if(hsmKeys.length > 0) {
                hsmKey = hsmKeys[0];
            }

            if(hsmKey === null) {
                createKey("HSM1")
                    .then(function(key) {
                        hsmKey = key
                    });
            }
            console.log(JSON.stringify(hsmKey));
            deffered.resolve(hsmKey);
        });
    return deffered.promise;
};

function initAsset(hsmKey, name) {
    console.log("Initializing Asset...");
    var deffered = q.defer();
    getAssets()
        .then(function(assets) {
            var newAsset = null;
            console.log("Number of assets: " + assets.length);
            if(assets.length > 0) {
                newAsset = _.find(assets, { 'alias': name });
            }

            if(newAsset === null) {
                createAsset(hsmKey, name)
                    .then(function(asset) {
                        newAsset = asset;
                    });
            }
            console.log(JSON.stringify(newAsset));
            deffered.resolve(newAsset);
        });

    return deffered.promise;
};

function createAsset(hsmKey, name) {
    var options = {
        url: 'http://localhost:1999/create-asset',
        auth:{
            'user': 'client',
            'pass': '1ea237229a3acf8b283e2930dcf1fd6c0f8397f0fb34c1f581b547938223b27b'
        },
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        form: JSON.stringify([{
            alias: name,
            root_xpubs: [hsmKey.xpub],
            quorum: 1,
            definition: {},
            tags: {}
        }])
    };

    console.log("Creating Asset " + name);

    var deffered = q.defer();
    post(options)
        .then(function(data) {
            console.log(data);
            deffered.resolve(JSON.parse(data));
        });
    return deffered.promise;
};

function getAssets() {
    var options = {
        url: 'http://localhost:1999/list-assets',
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

    console.log(options.form);

    var deffered = q.defer();
    post(options)
        .then(function(data){
            console.log(data);
            var result = JSON.parse(data);
            deffered.resolve(result.items);
        });
    return deffered.promise;
};

function createKey(name) {
    var options = {
        url: 'http://localhost:1999/mockhsm/create-key',
        auth:{
            'user': 'client',
            'pass': '1ea237229a3acf8b283e2930dcf1fd6c0f8397f0fb34c1f581b547938223b27b'
        },
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        form: JSON.stringify({
            alias: "HSM1"
        })
    };

    console.log("Creating HSM Key " + name);

    var deffered = q.defer();
    post(options)
        .then(function(data) {
            console.log(data);
            deffered.resolve(JSON.parse(data));
        });
    return deffered.promise;
};

function getHsmKeys() {
    var options = {
        url: 'http://localhost:1999/mockhsm/list-keys',
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

    var deffered = q.defer();
    post(options)
        .then(function(data){
            console.log(data);
            var result = JSON.parse(data);
            deffered.resolve(result.items);
        });
    return deffered.promise;
};

function post(options) {
    var deffered = q.defer();
    request.post(options, function(error, response, body) {
        if(error) {
            console.log(error);
            deferred.reject(error);
        }

        deffered.resolve(body);
    });

    return deffered.promise;
};