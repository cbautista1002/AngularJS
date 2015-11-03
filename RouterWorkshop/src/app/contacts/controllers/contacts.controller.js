(function() {
  'use strict';

  angular
    .module('routerWorkshop')
    .controller('ContactsController', ContactsController);

  function ContactsController(ContactService){
    var self = this;

    self.contacts = ContactService.allUsers;
  }

})();