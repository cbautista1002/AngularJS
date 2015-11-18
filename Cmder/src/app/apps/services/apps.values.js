(function() {
  'use strict';

  angular
    .module('cmder')
    .value('APPS_CBTABLE_DEFINITION', [
      {
        headerName: 'Name',
        indexName: 'appName'
      }, {
        headerName: 'Latest Version',
        indexName: 'version'
      }, {
        headerName: 'Released On',
        indexName: 'createdAt'
      }, {
        headerName: 'Developer',
        indexName: 'developerName'
      }, {
        headerName: 'Size',
        indexName: 'sizeOnDisk'
      }
    ]);

})();
