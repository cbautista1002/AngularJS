(function() {
  'use strict';

  angular
    .module('cmder')
    .factory('AppsResource', AppsResource)
    .factory('QuickInstallResource', QuickInstallResource)
    .factory('AddAppResource', AddAppResource)
    .factory('DeleteAppResource', DeleteAppResource);

  /** @ngInject */
  function AppsResource($resource) {
    return $resource('api/apps', null);
  }

  /** @ngInject */
//   function QuickInstallResource($resource) {
//     return $resource('api/quickInstall', {
//       app: '@app',
//       server: '@server'
//     }, {
//       install: {
//         method: 'POST'
//       }
//     });
//   }

  /** @ngInject */
  function QuickInstallResource($resource) {
    return $resource('api/quickInstall', {
      appId: '@appId',
      serverName: '@serverName',
      completed: '@completed'
    }, {
      install: {
        method: 'PUT'
      }
    });
  }

  /** @ngInject */
  function AddAppResource($resource) {
    return $resource('api/addNewApp', {
      name: '@name',
      id: '@id',
      version: '@version',
      date: '@date',
      dev: '@dev',
      size: '@size',
      desc: '@desc',
      svgIcon: '@svgIcon'
    }, {
      addNewApp: {
        method: 'PUT'
      }
    });
  }

  /** @ngInject */
  function DeleteAppResource($resource) {
    return $resource('api/deleteApp', {
      id: '@id'
    }, {
      deleteApp: {
        method: 'POST'
      }
    });
  }


})();
