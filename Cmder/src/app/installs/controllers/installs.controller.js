(function() {
  'use strict';

  angular
    .module('cmder')
    .controller('InstallsController', InstallsController);

  /** @ngInject */
  function InstallsController(InstallsResource, AddAutoInstallResource, GetAutoInstallsResource, AppsResource, ServersResource, $scope){
    var vm = this;

    var socket = io.connect();

    socket.on('installs update', function(msg){
      msg = JSON.parse(msg);
      console.log(msg);
      vm.runningList.push(msg);
      $scope.$apply();
    });

    vm.runningList = [];
    vm.pastList = [];
    vm.apps = [];
    vm.servers = [];
    vm.autoInstalls = [];

    AppsResource.query().$promise.then(function onSuccess(appsFromResource){
      vm.apps = appsFromResource;
    });

    ServersResource.query().$promise.then(function onSuccess(serversFromResource){
      vm.servers = serversFromResource;
    });

    vm.addAutoInstall = function(){
      console.log('Adding ' + vm.autoInstallApp);
      console.log('Adding ' + vm.autoInstallServer);
      AddAutoInstallResource.addAutoInstall({
        autoInstallApp: vm.autoInstallApp,
        autoInstallServer: vm.autoInstallServer
      }).$promise.then(function onSuccess(resp){
        console.log(resp);
        resp = angular.fromJson(angular.toJson(resp));
        console.log(resp);
        vm.autoInstalls.push(resp);
        vm.autoInstallApp = null;
        vm.autoInstallServer = null;
      }, function onError(err){
        console.log('Error occurred: ' + err);
      });
    };

    GetAutoInstallsResource.query().$promise.then(function onSuccess(autoInstalls){
      console.log(autoInstalls);
      vm.autoInstalls = autoInstalls;
    }, function onError(errorResponse) {
      console.error('Error: ' + errorResponse);
    });

    InstallsResource.query().$promise.then(function onSuccess(appList){
      console.log(appList);
      vm.runningList = appList;
    }, function onError(errorResponse) {
      console.error('Error: ' + errorResponse);
    });

  }

})();
