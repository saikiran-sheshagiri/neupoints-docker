#!/usr/bin/env node

var request = require('request');
var program = require('commander');

program.version("1.0.0.0")
    .option('-i --init', 'Initialize the points system.')
    .parse(process.argv);

if(program.init) {
    console.log("Initializing...");
    Initialize();
}

function Initialize() {
    getHsmKeys();
};

function createPointsAsset() {
    console.log('Creating Asset Points');
};

function createMockHsm(hsmKeys) {
    console.log(hsmKeys);
    if(hsmKeys.length > 0) {
        createPointsAsset(hsmKeys[0]);
        return;
    }

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

    request.post(options, function(error, request, body) {
        console.log('Creating MockHSM HSM1')
        if(error) {
            console.log(error);
            console.log(body);
        }
        else {
            console.log(body);
            var hsmKey = JSON.parse(body);
            if(hsmKey.code) {
                console.log(hsmKey.message);
            }
            else {
                createPointsAsset(hsmKey);
            }
        }
    });
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

    request.post(options, function(error, response, body) {
        console.log('Requesting MockHSMs');
        if(error) {
            console.log(error);
            console.log(body);
        }
        else {
            var hsmKeys = JSON.parse(body);
            if(hsmKeys.code) {
                console.log(hsmKeys.message);
            }
            else {
                console.log('MockHSM found:' + JSON.stringify(hsmKeys.items));
                createMockHsm(hsmKeys.items);
            }
        }
    });
};