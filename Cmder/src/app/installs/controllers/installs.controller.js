(function() {
  'use strict';

  angular
    .module('cmder')
    .controller('InstallsController', InstallsController);

  /** @ngInject */
  function InstallsController(InstallsResource, AddAutoInstallResource, GetAutoInstallsResource, AppsResource, ServersResource, INSTALLS_CBTABLE_DEFINITION, $scope, $filter){
    var vm = this;

    var socket = io.connect();

    socket.on('installs update', function(msg){
      msg = JSON.parse(msg);
      msg.status = msg.completed ? "Completed" : "Running";
      console.log(msg);
      // If completed then update UI
      var found = false;
      if(msg.completed){
        for(var i = 0; i < vm.runningList.length; i++){
          console.log(vm.runningList[i].id);
          console.log(msg.id);
          if(vm.runningList[i].id == msg.id){
            vm.runningList[i].status = msg.status;
            vm.runningList[i].createdAt = $filter('date')(msg.createdAt, 'MM/dd/yyyy hh:mm a');
            found = true;
            console.log('found and updated');
            console.log(vm.runningList[i]);
          }
        }
      }
      if(!found){
        console.log('not found');
        vm.runningList.unshift(msg);
      }
      $scope.$apply();
    });

    vm.runningList = [];
    vm.pastList = [];
    vm.apps = [];
    vm.servers = [];
    vm.autoInstalls = [];

    vm.cbTableName    = 'Installs';
    vm.cbTableHeaders = INSTALLS_CBTABLE_DEFINITION;

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
      vm.runningList = vm.runningList.map(function(install){
        install.status = install.completed ? "Completed" : "Running";
        install.createdAt = $filter('date')(install.createdAt, 'MM/dd/yyyy hh:mm a');
        console.log(install);
        return install;
      });
    }, function onError(errorResponse){
      console.error('Error: ' + errorResponse);
    });

  }

})();
