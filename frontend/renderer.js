require('./node_modules/babel-polyfill/dist/polyfill.min.js');
require('./bower_components/jquery/dist/jquery.min.js');
// require('./bower_components/moment/min/moment.min.js');
// require('./bower_components/angular-moment/angular-moment.min.js');
require('./bower_components/angular/angular.js');
require('./bower_components/ace-builds/src-min-noconflict/ace.js');
require('./bower_components/ace-builds/src-min-noconflict/ext-language_tools.js');
require('./bower_components/angular-sanitize/angular-sanitize.min.js');
require('./bower_components/angular-ui-router/release/angular-ui-router.min.js');
require('./bower_components/angular-recursion/angular-recursion.min.js');
require('./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js');
require('./bower_components/angular-ui-validate/dist/validate.js');
require('./bower_components/angular-ui-ace/ui-ace.min.js');
require('./bower_components/ngUpload/ng-upload.min.js');
require('./bower_components/bonita-js-components/dist/bonita-lib-tpl.min.js');
require('./bower_components/angular-gettext/dist/angular-gettext.min.js');
require('./bower_components/stomp-websocket/lib/stomp.min.js');
require('./bower_components/sockjs/sockjs.min.js');
require('./node_modules/mousetrap/mousetrap.js');
require('./node_modules/mousetrap/plugins/global-bind/mousetrap-global-bind.js');
require('./bower_components/angular-dynamic-locale/tmhDynamicLocale.min.js');
require('./bower_components/jsSHA/src/sha1.js');
require('./bower_components/identicon.js/pnglib.js');
require('./bower_components/identicon.js/identicon.js');
require('./bower_components/angular-sha/src/angular-sha.js');
require('./node_modules/angular-switcher/dist/angular-switcher.min.js');
require('./node_modules/ngstorage/ngStorage.min.js');
require('./node_modules/angular-resizable/angular-resizable.min.js');


const glob = require('matched');

const isModule = file => file.indexOf('.module.js') > 0;
const isNotModule = file => file.indexOf('.module.js') <= 0;

const files = glob.sync('./app/js/**/*.js');

files
  .filter(isModule)
  .forEach(file => require(file));

files
  .filter(isNotModule)
  .forEach(file => {
    require(file)
    // console.log(file)
  });

console.log('really loaded')
// global.angular.element(function() {
//  global.angular.bootstrap(document, ['uidesigner']);
// });

console.log('loadede')


