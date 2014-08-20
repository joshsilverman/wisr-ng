var gzippo = require('gzippo');
var express = require('express');
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
 
function requireHTTPS(req, res, next) {
  if (req.header('x-forwarded-proto') != 'https') {    
    return res.redirect(301, 'https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);

app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.get('/*', function(req, res) { res.render('/'); });

app.listen(process.env.PORT || 5000);