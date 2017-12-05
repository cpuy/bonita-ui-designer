// window.angular
//   .module('bonitasoft.designer.common.repositories')
//   .factory('pageRepo', pageRepositoryDecorator);
//
// function pageRepositoryDecorator() {
//   return {
//
//     all: () => Promise.resolve([])
//
//   }
// }

// repositories
window.angular.module('uidesigner')

  .config([ '$provide', function($provide) {

    $provide.decorator('repositories', () => require('./backend/repositories.decorator'));
    $provide.decorator('pageRepo', () => require('./backend/page-repository.decorator'));
    $provide.decorator('widgetRepo', () => require('./backend/widget-repository.decorator'));
  }]);
