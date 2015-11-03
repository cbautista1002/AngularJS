(function() {
  'use strict';

  angular
    .module('routerWorkshop')
    .controller('MainController', MainController);

  function MainController(UI_ROUTES) {
    var self = this;
    self.contactsState = UI_ROUTES.kContactsState.stateName;
    self.addUserState = UI_ROUTES.kAddUserState.stateName;
  }
})();
