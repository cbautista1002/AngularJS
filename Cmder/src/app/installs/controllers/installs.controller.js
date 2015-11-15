(function() {
  'use strict';

  angular
    .module('cmder')
    .controller('InstallsController', InstallsController);

  /** @ngInject */
  function InstallsController(RunningInstallsResource, PastInstallsResource, $log){
    var vm = this;

    vm.runningList = [];
    vm.pastList = [];

    RunningInstallsResource.query().$promise.then(function onSuccess(appList){
      $log.log(appList);
      vm.runningList = appList;
    }, function onError(errorResponse) {
      $log.error('Error: ' + errorResponse);
    });

    PastInstallsResource.query().$promise.then(function onSuccess(appList){
      $log.log(appList);
      vm.pastList = appList;
    }, function onError(errorResponse) {
      $log.error('Error: ' + errorResponse);
    });
  }

})();
