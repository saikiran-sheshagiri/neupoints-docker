#!/usr/bin/env node

var request = require('request');
var program = require('commander');
var q = require('q');

program.version("1.0.0.0")
    .option('-i --init', 'Initialize the points system.')
    .parse(process.argv);

if(program.init) {
    console.log("Initializing...");
    initialize();
}

function initialize() {
    createMockHsmKey()
        .then(function(hsmKey) {
            createAsset(hsmKey, "Points");
        });
};

function createMockHsmKey() {
    var deffered = q.defer();
    getHsmKeys()
        .then(function(hsmKeys) {
            var hsmKey = null;
            console.log(JSON.stringify(hsmKeys));
            console.log(hsmKeys.length);
            if(hsmKeys.length > 0) {
                hsmKey = hsmKeys[0];
            }

            if(hsmKey === null) {
                createKey("HSM1")
                    .then(function(key) {
                        hsmKey = key
                    });
            }
            deffered.resolve(hsmKey);
        });
    return deffered.promise;
}


function createAsset(hsmKey, name) {
    console.log('Creating Asset Points');
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

    console.log("Creating HSM Key");

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
}