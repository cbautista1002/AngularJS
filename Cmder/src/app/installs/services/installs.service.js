(function() {
  'use strict';

  angular
    .module('cmder')
    .factory('RunningInstallsResource', RunningInstallsResource)
    .factory('PastInstallsResource', PastInstallsResource);

  /** @ngInject */
  function RunningInstallsResource($resource) {
    return $resource('api/runningInstalls', null);
  }

  /** @ngInject */
  function PastInstallsResource($resource) {
    return $resource('api/pastInstalls', null);
  }
})();
