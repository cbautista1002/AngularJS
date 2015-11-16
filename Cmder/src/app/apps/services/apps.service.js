(function() {
  'use strict';

  angular
    .module('cmder')
    .factory('AppsResource', AppsResource)
    .factory('QuickInstallResource', QuickInstallResource);

  /** @ngInject */
  function AppsResource($resource) {
    return $resource('api/apps', null);
  }

  /** @ngInject */
  function QuickInstallResource($resource) {
    return $resource('api/quickInstall', {
      app: '@app',
      server: '@server'
    }, {
      install: {
        method: 'POST'
      }
    });
  }
})();
