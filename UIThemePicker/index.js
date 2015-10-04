
angular.module('UIThemePicker', [])

.controller('MainController', function () {
  var self = this;

  self.themeChoice = 'none';
  self.themes = {
    'red': {
      bodyColor: 'body-red',
      div1Color: 'div1-red',
      div2Color: 'div2-red'
    },
    'blue': {
      bodyColor: 'body-blue',
      div1Color: 'div1-blue',
      div2Color: 'div2-blue'
    },
    'green': {
      bodyColor: 'body-green',
      div1Color: 'div1-green',
      div2Color: 'div2-green'
    },
    'black': {
      bodyColor: 'body-black',
      div1Color: 'div1-black',
      div2Color: 'div2-black',
    },
    'orange': {
      bodyColor: 'body-orange',
      div1Color: 'div1-orange',
      div2Color: 'div2-orange'
    }
  };

//   self.user = {
//     fName: 'Carlos',
//     lName: 'Bautista',
//     email: 'c@b.com'
//   };

//   self.showEdit = false;
//   self.edit = function(){
//     self.showEdit = true;
//     self.newUser = angular.copy(self.user);
//   };

//   self.cancel = function(){
//     self.showEdit = false;
//   };

//   self.done = function(){
//     self.showEdit = false;
//     self.user = angular.copy(self.newUser);
//   };
});