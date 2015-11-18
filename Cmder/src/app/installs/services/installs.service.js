(function() {
  'use strict';

  angular
    .module('cmder')
    .factory('InstallsResource', InstallsResource)
    .factory('AddAutoInstallResource', AddAutoInstallResource)
    .factory('GetAutoInstallsResource', GetAutoInstallsResource);

  /** @ngInject */
  function InstallsResource($resource) {
    return $resource('api/installs', null);
  }

  function GetAutoInstallsResource($resource) {
    return $resource('api/getAutoInstalls', null);
  }

  /** @ngInject */
  function AddAutoInstallResource($resource) {
    return $resource('api/addAutoInstall', {
      autoInstallApp: '@autoInstallApp',
      autoInstallServer: '@autoInstallServer'
    }, {
      addAutoInstall: {
        method: 'PUT'
      }
    });
  }

})();
