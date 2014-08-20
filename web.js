var gzippo = require('gzippo');
var express = require('express');
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
 
function requireHTTPS(req, res, next) {
    if (req.protocol == 'http') {
        //FYI this should work for local development as well
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

app.use(requireHTTPS);

app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);