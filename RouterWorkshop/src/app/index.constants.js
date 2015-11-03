/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('routerWorkshop')
    .constant('malarkey', malarkey)
    .constant('moment', moment)

    .constant('UI_ROUTES', {
      kMainState: {
        stateName: 'main'
    	},
      kContactsState: {
        stateName: 'contacts'
    	},
      kAddUserState: {
        stateName: 'addUser'
    	}
    });

})();
