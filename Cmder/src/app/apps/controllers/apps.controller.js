(function() {
  'use strict';

  angular
    .module('cmder')
    .controller('AppsController', AppsController);

  /** @ngInject */
  function AppsController(AppsResource){
    var self = this;

    self.appList = [];

    self.getAppList = function(){
      AppsResource.query().$promise.then(function onSuccess(appList){
        console.log(appList);
        self.appList = appList;
      }, function onError(errorResponse) {
        console.log('ERROR!!!')
      });
    };

    self.installNow = function(appId){
      console.log('Installing ' + appId);
    };
  }
})();
