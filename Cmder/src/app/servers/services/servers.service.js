(function() {
  'use strict';

  angular
    .module('cmder')
    .factory('ServersResource', ServersResource);

  /** @ngInject */
  function ServersResource($resource) {
    return $resource('api/servers', null);
  }

})();
