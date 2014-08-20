var gzippo = require('gzippo');
var express = require('express');
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
 
function requireHTTPS(req, res, next) {
  if (req.header('x-forwarded-proto') != 'https') {
    console.log(req.header('x-forwarded-proto'));
    console.log(req.url);   
    console.log(req.get('host'));
    
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);

app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);