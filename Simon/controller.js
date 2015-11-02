
angular.module('Simon', [])

.controller('MainController', function(ColorTracker, $timeout, $interval){
  var self = this;

  self.gameStarted = false;
  self.usersTurn = false;
  self.restartPrompt = false;
  self.aiColorList = ColorTracker.aiColors;
  self.userColors = [];

  self.clickedColor = function(color){
    if(!self.usersTurn){
      return;
    }
    self.userColors.push(color);
    console.log(self.userColors);
    if(color === 'yellow'){
      self.yellowFlash = true;
      $timeout(function(){self.yellowFlash = false;}, 100);
    }
    if(color === 'red'){
      self.redFlash = true;
      $timeout(function(){self.redFlash = false;}, 100);
    }
    if(color === 'green'){
      self.greenFlash = true;
      $timeout(function(){self.greenFlash = false;}, 100);
    }
    if(color === 'blue'){
      self.blueFlash = true;
      $timeout(function(){self.blueFlash = false;}, 100);
    }

    if(self.userColors.length == ColorTracker.aiColors.length){
      var j = 0;
      for(var i = 0; i < self.userColors.length; i++){
        if(self.userColors[i] == ColorTracker.aiColors[i]){
          j++;
        }
      }
      if(self.userColors.length != j){
        console.log('User Lost');
        self.restartPrompt = true;
        self.gameStarted = false;
      }
      else{
        self.usersTurn = false;
        $timeout(self.aiNextColor, 1000);
      }
    }
  };

  self.startGame = function(){
    if(self.gameStarted){
      return;
    }
    ColorTracker.aiColors = [];
    self.aiNextColor();
    self.gameStarted = true;
    self.restartPrompt = false;
    self.usersTurn = true;
  }

  self.aiNextColor = function(){
    self.userColors = [];
    var num = Math.random(0,4);
    console.log(num);
    var colorList = [
      'yellow',
      'red',
      'green',
      'blue'
    ];
    var randColor = colorList[Math.floor(Math.random()*colorList.length)];
    ColorTracker.addAIColor(randColor);
    console.log(ColorTracker.aiColors);
    self.curColor = randColor;
    for(var i = 0; i < ColorTracker.aiColors.length; i++){
      self.curColor = ColorTracker.aiColors[i];
      $interval(self.flashColor, 1000, 1);
    }
    self.usersTurn = true;
  };

  self.flashColor = function(){
    if(self.curColor === 'yellow'){
      self.yellowFlash = true;
      $timeout(function(){self.yellowFlash = false;}, 100);
    }
    if(self.curColor === 'red'){
      self.redFlash = true;
      $timeout(function(){self.redFlash = false;}, 100);
    }
    if(self.curColor === 'green'){
      self.greenFlash = true;
      $timeout(function(){self.greenFlash = false;}, 100);
    }
    if(self.curColor === 'blue'){
      self.blueFlash = true;
      $timeout(function(){self.blueFlash = false;}, 100);
    }
  }
});