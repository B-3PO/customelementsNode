const config = require('./config');
const components = require('./componentRegistry');
const main_js = require('./client-files/main.js');
const serviceWorkerLoader_js = require('./client-files/service-worker-loader.js');
const serviceWorker_js = require('./client-files/service-worker.js');

function validate(params) {
  if (!params) throw Error('Requires params');
  if (!params.path) throw Error('Requires params.path');
}

function getMime(file) {
  if (file.includes('.js')) return 'text/javascript';
  if (file.includes('.css')) return 'text/css';
  if (file.includes('.html')) return 'text/html';
  return 'text/plain';
}

exports.scripts = (params) => {
  validate(params);
  if (params.path.includes('wcn.js')) return `${main_js(params)}\n${config.get('serviceWorker') ? serviceWorkerLoader_js(params) : ''}\n${components.staticFile(params)}`;
  if (params.path.includes('service-worker.js')) return `${serviceWorker_js(params)}`;
};

exports.css = (params) => {
   validate(params);
   if (params.path.includes('wcn.css')) return `${components.staticComponentCSS(params)}`;
};

exports.expressFileHandler = (req, res, next) => {
  const mime = getMime(req.path);
  let content;
  if (mime === 'text/javascript') content = exports.scripts({
    path: req.path
  });
  if (mime === 'text/css') content = exports.css({
    path: req.path
  });

  if (!content) return next();
  res.type(mime);
  res.send(content);
};
