(function() {
  'use strict';

  angular.module('routerWorkshop')
    .service('ContactService', ContactService);

  function ContactService(){
    var self = this;

    self.allUsers = [];

    self.addNewUser = function(user) {
      self.allUsers.push(user);
    };
  }

})();