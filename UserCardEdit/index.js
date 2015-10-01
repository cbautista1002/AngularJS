
angular.module('UserCardEdit', [])

.controller('MainController', function () {
  var self = this;

  self.user = {
    fName: 'Carlos',
    lName: 'Bautista',
    email: 'c@b.com'
  };

  self.showEdit = false;
  self.edit = function(){
    self.showEdit = true;
    self.newUser = angular.copy(self.user);
  };

  self.cancel = function(){
    self.showEdit = false;
  };

  self.done = function(){
    self.showEdit = false;
    self.user = angular.copy(self.newUser);
  };
});