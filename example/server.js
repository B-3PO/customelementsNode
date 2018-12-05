const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const app = express();
const { setConfig } = require('../index');
const PORT = process.env.PORT || 3001;

setConfig({
  /*
   * default: 'template'
   */
  templateMethod: 'template',

  /*
   * default: true
   * This will memoize certain methods to prevent unnecessary processing
   * This is essantially equal to static file performance after the first request
   * you can turn off memoization for individual components
   */
  memoize: true,

  /*
   * default: true
   * This will minify the js in component script tags and the component tmeplate html
   * This can help redice file size
   */
  minify: true
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(compression());
app.use('/assets', express.static(__dirname));

app.use('/', require('./router'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.send({ error: err.message });
});

app.listen(PORT, () => console.log(`Example app running on port ${PORT}`));

module.exports = app;
