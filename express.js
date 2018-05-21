const express = require('express');
const browserCapabilities = require('browser-capabilities');

const app = express();
const basedir = __dirname + '/build/dash/bundled/';

function getSourcesPath(request) {
  let clientCapabilities = browserCapabilities.browserCapabilities(
    request.headers['user-agent']);

  clientCapabilities = new Set(clientCapabilities);

  if (clientCapabilities.has('es2015')) {
    return basedir + 'es6-bundled/';
  } else {
    return basedir + 'es5-bundled/';
  }
}


app.use('/dash/', (req, res, next)=> {
  express.static(getSourcesPath(req))(req, res, next);
});

app.get(/.*service-worker\.js/, function(req, res) {
  res.sendFile(getSourcesPath(req) + 'service-worker.js');
});


app.use(function(req, res) {
  // static file requrests that end up here are missing so they should return 404
  if (req.originalUrl.startsWith('/dash/app/')) {
    res.status(404).send('Not found');
  } else {
    // handles requests that look like /pmp/interventions/details
    res.sendFile(getSourcesPath(req) + 'index.html');
  }
});

app.listen(8080);


