//var debug = require('debug')('server');
//var express = require('express');
//var bodyParser = require('body-parser');
//
//var app = express();
//
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//
//var port = process.env.PORT || 8080;
//
//var config = require('./config');
//var mongoose = require('mongoose');
//
//mongoose.Promise = global.Promise;
//mongoose.connect(config.db);
//
//var Device = require('./models/device');
//
//var router = express.Router();
//
//router.use(function(req, res, next) {
//    debug("request received.");
//    next(); 
//});
//
//function noCache(req, res, next) {
//    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//    res.header('Expires', '-1');
//    res.header('Pragma', 'no-cache');
//    next();
//};
//
//router.route('/devices')
//    .get(noCache, function (req, res) {
//        var result = Device.find(function (err, devices) {
//            if (err) {
//                debug("/devices-ERROR:", err);
//                res.status(500).jsonp(err);
//            }
//            else {
//                debug('GET devices', devices);
//                res.status(200).jsonp(devices);
//            }
//        });
//    }).post(function(req, res) {
//        var device = new Device();
//        device.uri = req.body.uri;
//        device.name = req.body.name;
//        device.value = req.body.value;
//        device.save(function (err) {
//        if(err) {
//            res.status(500).jsonp(err);
//        }  
//        res.status(200).jsonp(device);
//        });
//    });
//
//var mapfunc = function() {
//    emit(this.uri, this.value);
//}
//
//var reducefunc = function(key, values) {
//    return Array.sum(values);
//}
//
//router.route('/devices/sum')
//    .get(noCache, function(req, res) {
//        Device.mapReduce(mapfunc, reducefunc, { query: { uri: "device1" }, out: "totals" } 
//        , function(err, result) {
//            if(err){
//                res.status(404).jsonp(err);
//            }
//            res.status(200).jsonp(result);
//        });
//    });
//
//router.route('/devices/:device_id')
//    .get(noCache, function(req, res) {
//        Device.findById(req.params.device_id, function(err, device) {
//            if(err){
//                res.status(404).jsonp(err);
//            }
//            res.status(200).jsonp(device);
//        });
//    }).put(function(req, res) {
//        Device.findById(req.params.device_id, function(err, device) {
//            if(err) {
//                res.status(404).jsonp(err);
//            }
//
//
//
//            device.uri = req.body.uri;
//            device.name = req.body.name;
//            device.value = req.body.value;
//            console.log("About to save");
//            device.save(function(err) {
//                if(err) {
//                    res.status(500).jsonp(err);
//                }
//                
//                res.status(200).jsonp(device);
//            });
//        });
//    }).delete(function(req, res) {
//        Device.remove({ _id: req.params.device_id }, function(err, removed) {
//            if(err) {
//                res.status(500).jsonp(err);
//            }
//
//            res.status(200).jsonp(removed);
//        });
//    });
//
//app.use('/api', router);
//
//app.listen(port);
//debug('Running on http://localhost:' + port);
//console.log('Running on http://localhost:' + port);