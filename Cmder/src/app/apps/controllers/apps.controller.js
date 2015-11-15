(function() {
  'use strict';

  angular
    .module('cmder')
    .controller('AppsController', AppsController);

  /** @ngInject */
  function AppsController(AppsResource,  $log){
    var vm = this;

    vm.popularApps = [];
    vm.appList = [];

    AppsResource.query().$promise.then(function onSuccess(appsFromResource){
      $log.log(appsFromResource);
      vm.popularApps = appsFromResource.slice(0, 3);
      vm.appList = appsFromResource.slice(3, appsFromResource.length);
    }, function onError(errorResponse) {
      $log.error('Error: ' + errorResponse);
    });

    vm.installNow = function(appId){
      $log.log('Installing ' + appId);
    };

    vm.likeApp = function(appId){
      $log.log('Liking ' + appId);
    };
  }
})();
