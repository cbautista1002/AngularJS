(function() {
  'use strict';

  angular
    .module('cmder')
    .factory('AppsResource', AppsResource);

  /** @ngInject */
  function AppsResource($resource) {
    return $resource('assets/test.json', null);
  }
})();
