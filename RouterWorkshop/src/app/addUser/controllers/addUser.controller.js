(function() {
  'use strict';

  angular
    .module('routerWorkshop')
    .controller('AddUserController', AddUserController);

  function AddUserController(ContactService){
    var self = this;

    self.addNewUser = function(){
      ContactService.addNewUser(self.user);
      console.log(ContactService.allUsers);
      self.user = {};
    };
  }

})();