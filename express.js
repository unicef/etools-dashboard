var express = require('express');
var app = express();
var basedir = '/code/build/dash/bundled/';
//var basedir = '/Users/rob/Desktop/etools/etools-infra/pmp/build/pmp/bundled/';
var node_modulesReduxDir = '/code/node_modules/redux/dist/';
//var node_modulesReduxDir = '/Users/rob/Desktop/etools/etools-infra/pmp/node_modules/redux/dist/';


app.use('/dash/', express.static(basedir));

app.get(/.*service-worker\.js/, function(req, res) {
  res.sendFile(basedir + 'service-worker.js');
});
app.get(/.*redux\.min\.js/, function(req, res) {
  res.sendFile(node_modulesReduxDir + 'redux.min.js');
});
app.use(function(req, res) {
  res.sendFile(basedir + 'index.html');
});


app.listen(8080);