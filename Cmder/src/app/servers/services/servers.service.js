(function() {
  'use strict';

  angular
    .module('cmder')
    .factory('ServersResource', ServersResource)
    .factory('DecoedServersResource', DecoedServersResource);

  /** @ngInject */
  function ServersResource($resource) {
    return $resource('api/servers', null);
  }
  
  /** @ngInject */
  function DecoedServersResource($resource) {
    return $resource('api/decoedServers', null);
  }
})();
