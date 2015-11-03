(function() {
  'use strict';

  angular.module('routerWorkshop')
    .service('ContactService', ContactService);

  function ContactService(){
    var self = this;

    self.allUsers = [];

    self.addNewUser = function(fName, lName, phone) {
      self.allUsers.push({
        fName: fName,
        lName: lName,
        phone: phone
      });
    };
  }

})();