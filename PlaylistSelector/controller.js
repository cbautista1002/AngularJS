
angular.module('PlaylistSelector', [])

.controller('MainController', function(SONGS, ListGenerator, GENRES){
  var self = this;

  self.genres = GENRES;
  self.songs  = SONGS;
  self.explicitChoice = 'Clean';
  self.disableExplicit = true;

  self.submitList = function(){
    console.log(self.songs);
    var list = ListGenerator.generate(self.songs, self.explicitChoice);
    console.log(JSON.stringify(list));
  }

  self.checkAge = function(){
    console.log(self.age);
    if(self.age < 18){
      self.disableExplicit = true;
    }
    else{
      self.disableExplicit = false;
    }
  }

});