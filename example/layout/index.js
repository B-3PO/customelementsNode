const {
  browserScripts,
  html
} = require('../../index');
const header = require('./header');
const nav = require('./navigation');
require('../components');

module.exports = ({ body, title }) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>${title}</title>
      <meta http-equiv="Cache-Control" content="no-store" />
      <link rel="stylesheet" href="/assets/main.css">
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      ${browserScripts.include()}
    </head>

    <body>
      <!--
        the includeComponents method is ment for development
        It is better to package up the components using something like webpack
        TODO add minification
        TODO add component splitting based on the pages html
        TODO add method to allow compoennts to be served as a single js file
      -->
      ${browserScripts.includeComponents()}
      ${header({ title })}
      ${nav({ title })}
      ${body}
    </body>
  </html>
`;
