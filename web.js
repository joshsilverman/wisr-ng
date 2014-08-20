var gzippo = require('gzippo');
var express = require('express');
var logfmt = require("logfmt");
var forceSSL = require('express-force-ssl');

var app = express();

app.use(logfmt.requestLogger());
 
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.use(forceSSL);

app.listen(process.env.PORT || 5000);