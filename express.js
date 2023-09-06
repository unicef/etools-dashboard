var express = require('express'); // eslint-disable-line
var browserCapabilities = require('browser-capabilities'); // eslint-disable-line
const UAParser = require('ua-parser-js').UAParser; // eslint-disable-line

const app = express();
const basedir = __dirname + '/build/'; // eslint-disable-line

function getSourcesPath(request, filePath = '') {
  const userAgent = request.headers['user-agent'];
  let clientCapabilities = browserCapabilities.browserCapabilities(userAgent);
  const browserName = new UAParser(userAgent).getBrowser().name || '';
  // skip Edge because browser-capabilities library is outdated
  const needToUpgrade =
    !clientCapabilities.has('modules') && browserName !== 'Edge';
  return needToUpgrade
    ? `${basedir}esm-bundled/upgrade-browser.html`
    : `${basedir}esm-bundled/${filePath}`;
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
