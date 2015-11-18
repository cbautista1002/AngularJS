(function() {
  'use strict';

  angular
    .module('cmder')
    .controller('AppsController', AppsController);

  /** @ngInject */
  function AppsController(AppsResource, QuickInstallResource, AddAppResource, DeleteAppResource, $scope){
    var vm = this;

    var socket = io.connect();

    vm.popularApps = [];
    vm.appList = [];
    vm.showAdmin = false;
    vm.deleteAppId = null;

    AppsResource.query().$promise.then(function onSuccess(appsFromResource){
      console.log(appsFromResource);
      vm.popularApps = appsFromResource.slice(0, 3);
      vm.popularApps = vm.popularApps.map(function(app){
        app.installStage = 'pending';
        return app;
      });
      vm.appList = appsFromResource.slice(3, appsFromResource.length);
      vm.appList = vm.appList.map(function(app){
        app.installStage = 'pending';
        return app;
      });
    }, function onError(errorResponse) {
      console.error('Error: ' + errorResponse);
    });

    vm.installNow = function(app){
      console.log('Installing ' + app.id);
      app.installStage = 'running';

      QuickInstallResource.install({
        appId: app.appId,
        serverName: 'server-1.domain.com',
        completed: false
      }).$promise.then(function onSuccess(resp){
        resp = angular.fromJson(angular.toJson(resp));
        console.log(resp);
        var newId = resp.generated_keys[0];
        if(resp.installInProgress){
          socket.on('installs update', function(msg){
            msg = angular.fromJson(msg);
            console.log(msg);
            if(newId == msg.id){
              app.installStage = 'complete';
              console.log(app);
              $scope.$apply();
            }
          });
        }
      }, function onError(err){
        console.log('Error occurred:');
        console.log(err);
      });
    };

    vm.likeApp = function(app){
      console.log('Liking ' + app.id);
      app.liked = true;
    };

    vm.addNewApp = function(){
      console.log('Adding ' + vm.admin.newApp);
      AddAppResource.addNewApp({
        name: vm.admin.newApp.name,
        id: vm.admin.newApp.id,
        version: vm.admin.newApp.version,
        date: vm.admin.newApp.date,
        dev: vm.admin.newApp.dev,
        size: vm.admin.newApp.size,
        desc: vm.admin.newApp.desc,
        svgIcon: vm.admin.newApp.svgIcon
      }).$promise.then(function onSuccess(resp){
        console.log(resp);
        resp = angular.fromJson(angular.toJson(resp));
        console.log(resp);
      }, function onError(err){
        console.log('Error occurred: ' + err);
      });
    };

    vm.deleteApp = function(){
      console.log('Deleting ' + vm.deleteAppId);
      DeleteAppResource.deleteApp({
        id: vm.deleteAppId
      }).$promise.then(function onSuccess(resp){
        console.log(resp);
        resp = angular.fromJson(angular.toJson(resp));
        console.log(resp);
      }, function onError(err){
        console.log('Error occurred:');
        console.log(err);
      });
    };
  }
})();
