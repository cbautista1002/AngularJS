(function() {
  'use strict';

  angular
    .module('cmder')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('apps', {
        url: '/apps',
        templateUrl: 'app/apps/partials/apps.html',
        controller: 'AppsController',
        controllerAs: 'appsCtrl'
      })
      .state('installs', {
        url: '/installs',
        templateUrl: 'app/installs/partials/installs.html',
        controller: 'InstallsController',
        controllerAs: 'installsCtrl'
      })
      .state('servers', {
        url: '/servers',
        templateUrl: 'app/servers/partials/servers.html',
        controller: 'ServersController',
        controllerAs: 'serversCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
