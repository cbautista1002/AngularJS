(function() {
  'use strict';

  angular
    .module('cmder')
    .value('INSTALLS_CBTABLE_DEFINITION', [
      {
        headerName: 'Status',
        indexName: 'status'
      }, {
        headerName: 'Application',
        indexName: 'appName'
      }, {
        headerName: 'Server',
        indexName: 'serverName'
      }, {
        headerName: 'Time',
        indexName: 'createdAt'
      }
    ]);

})();
