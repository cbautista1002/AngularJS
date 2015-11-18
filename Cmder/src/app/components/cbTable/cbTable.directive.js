(function() {
  'use strict';

  angular
    .module('cmder')
    .directive('cbTable', cbTable)
    .controller('cbTableController', cbTableController);

  /** @ngInject */
  function cbTable(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/cbTable/cbTable.html',
      controller: 'cbTableController as cbTableCtrl',
      bindToController: true,
      scope: {
        name: '=',
        headers: '=',
        data: '='
      }
    };
  }

  /** @ngInject */
  function cbTableController(){
    var vm = this;
  }

})();
