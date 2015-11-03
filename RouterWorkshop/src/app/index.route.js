(function() {
  'use strict';

  angular
    .module('routerWorkshop')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, UI_ROUTES) {
    $stateProvider
      .state(UI_ROUTES.kMainState.stateName, {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
      })
      .state(UI_ROUTES.kContactsState.stateName, {
        url: '/contacts',
        templateUrl: 'app/contacts/partials/contacts.html',
        controller: 'ContactsController',
        controllerAs: 'contactsCtrl'
      })
      .state(UI_ROUTES.kAddUserState.stateName, {
        url: '/addUser',
        templateUrl: 'app/addUser/partials/addUser.html',
        controller: 'AddUserController',
        controllerAs: 'addUserCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
