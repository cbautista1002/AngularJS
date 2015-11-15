(function() {
  'use strict';

  angular
    .module('cmder')
    .controller('ServersController', ServersController);

  /** @ngInject */
  function ServersController(ServersResource, DecoedServersResource, $log){
    var vm = this;

    vm.servers = [];
    vm.decoedServers = [];

    ServersResource.query().$promise.then(function onSuccess(serverList){
      $log.log(serverList);
      vm.servers = serverList;
    }, function onError(errorResponse) {
      $log.error('Error: ' + errorResponse);
    });

    DecoedServersResource.query().$promise.then(function onSuccess(serverList){
      $log.log(serverList);
      vm.decoedServers = serverList;
    }, function onError(errorResponse) {
      $log.error('Error: ' + errorResponse);
    });
  }
})();
