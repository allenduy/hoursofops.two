var express = require('express');
var compression = require('compression');
var methodOverride = require('method-override');
var settings = require('./settings.js');
var app = express();
var ipAddr = settings.server.ip;
var serverPort = settings.server.port;

app.use(compression());
app.use(methodOverride());
app.use(express.static(__dirname + '/public', {maxAge: 86400000}));
app.listen(serverPort, ipAddr, function () {
	console.log("Server has started on ip " + ipAddr + " on port " + serverPort);
});
