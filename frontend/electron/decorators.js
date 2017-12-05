// provide decorators for angular services fetching data
window.angular
  .module('uidesigner')
  .config([ '$provide', function($provide) {
    $provide.decorator('repositories', () => require('./repositories/repositories.decorator'));
    $provide.decorator('pageRepo', () => require('./repositories/page-repository.decorator'));
    $provide.decorator('widgetRepo', () => require('./repositories/widget-repository.decorator'));
  }]);
