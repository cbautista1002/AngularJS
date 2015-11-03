(function() {
  'use strict';

  angular
    .module('routerWorkshop')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
