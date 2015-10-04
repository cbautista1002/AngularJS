
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

  self.hideFiles = false;
  self.directory = {
    'New York': [
      'New York City'
    ],
    'New Jersey': [
      'Hoboken'
    ],
    'Conneticut': [
      'Stamford'
    ]
  };
  self.addFile = function(){
    if(!self.chosenDirectory){
      alert('Please choose a directory first');
      return;
    }
    var curList = self.directory[self.chosenDirectory];
    var alreadyExists = curList.indexOf(self.newFile);
    if(alreadyExists != -1){
      alert('Cannot have duplicate files in the same directory');
      return;
    }
    curList.push(self.newFile);
  };
});