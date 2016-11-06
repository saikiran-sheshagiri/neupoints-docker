var express = require("express");
var morgan = require('morgan');
var bodyParser = require("body-parser");
var cors = require("cors");
var routes_config = require("./config/routes.config");

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('combined'));

app.set("port", process.env.PORT || 8080);

process.on("uncaughtException", function (err) {
    console.log((new Date).toUTCString() + ' uncaughtException: ' + err.message);
    console.log(err.stack);
    process.exit(1);
});

new routes_config.RoutesConfig(app);

var server = app.listen(app.get("port"));
server.on("close", function (err) {
    console.log("Application server closed " + err);
});

console.log('Running on http://localhost:' + app.get("port"));
module.exports = server;
