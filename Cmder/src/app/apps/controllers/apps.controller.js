(function() {
  'use strict';

  angular
    .module('cmder')
    .controller('AppsController', AppsController);

  /** @ngInject */
  function AppsController(AppsResource, QuickInstallResource,  $log){
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

    vm.installNow = function(app){
      $log.log('Installing ' + app.id);
      QuickInstallResource.install({
        app: app.id,
        server: 'fakeserver1'
      }).$promise.then(function onSuccess(resp){
        resp = JSON.parse(angular.toJson(resp));
        if(resp.success){
          app.installInProgress = true;
        }
      }, function onError(err){
        $log.log('Error occurred: ' + err);
      });
    };

    vm.likeApp = function(app){
      $log.log('Liking ' + app.id);
    };
  }
})();
