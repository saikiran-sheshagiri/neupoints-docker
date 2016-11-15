var request = require('request');
var _ = require('lodash');

var config = require('../config');
var logger = require('../logger').getLogger('request.util');


var RequestUtil = (function() {
    function RequestUtil() {
        return {
            buildOptions: buildOptions,
            postListRequest: postListRequest,
            postRequest: postRequest
        };
    };

    function buildOptions(realitiveUri, form) {
        if(!form) {
            form = JSON.stringify({});
        }

        return {
            url: `${config.chainuri}/` + realitiveUri,
            auth:{
                'user': process.env.CHAINCORE_ACCESS_TOKEN.split(':')[0],
                'pass': process.env.CHAINCORE_ACCESS_TOKEN.split(':')[1]
            },
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            form: form
        };
    };

    function postListRequest(options, transform) {
        return new Promise(function(resolve, reject) {
            logger.debugobj('POST', options);

            request.post(options, function(error, response, body) {
                if(error) {
                    logger.error(error);
                    reject(error);
                }

                logger.debugobj("Body", body);

                var result = JSON.parse(body);
                if(body.code) {
                    reject(body);
                }
                resolve(_.map(result.items, transform));
            });
        });
    };

    function postRequest(options, transform) {
        return new Promise(function(resolve, reject) {
            logger.debugobj('POST', options);

            request.post(options, function(error, response, body) {
                if(error) {
                    logger.error(error);
                    reject(error);
                }
                logger.debugobj("Body", body);
                if(body.code) {
                    reject(body);
                }
                resolve(transform(body));
            });
        });
    };
    
    return RequestUtil;
}());

exports.RequestUtil = RequestUtil;