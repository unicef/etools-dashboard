var express = require('express'); // eslint-disable-line
var browserCapabilities = require('browser-capabilities'); // eslint-disable-line

const app = express();
const basedir = __dirname + '/build/'; // eslint-disable-line

function getSourcesPath(request) {
  let clientCapabilities = browserCapabilities.browserCapabilities(
    request.headers['user-agent']
  );

  clientCapabilities = new Set(clientCapabilities); // eslint-disable-line
  const browserName = new UAParser(userAgent).getBrowser().name || '';
  // skip Edge because browser-capabilities library is outdated
  if (clientCapabilities.has('modules') && browserName !== 'Edge') {
    return basedir + 'esm-bundled/';
  }
}

app.use('/dash/', (req, res, next) => {
  const sourceFolder = getSourcesPath(req);
  express.static(sourceFolder)(req, res, next);
});

app.get(/.*service-worker\.js/, function (req, res) {
  res.sendFile(getSourcesPath(req) + 'service-worker.js');
});

app.get(/.*manifest\.json/, function (req, res) {
  res.sendFile(getSourcesPath(req) + 'manifest.json');
});

app.use((req, res) => {
  // handles app access using a different state path than index (otherwise it will not return any file)
  res.sendFile(getSourcesPath(req) + 'index.html');
});

app.listen(8080);
