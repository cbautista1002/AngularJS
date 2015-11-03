(function() {
  'use strict';

  angular
    .module('routerWorkshop')
    .controller('AddUserController', AddUserController);

  function AddUserController(ContactService){
    var self = this;

    self.addNewUser = function(){
      ContactService.addNewUser(self.fName, self.lName, self.phone);
      console.log(ContactService.allUsers);
      self.fName = '';
      self.lName = '';
      self.phone = '';
    };
  }

})();