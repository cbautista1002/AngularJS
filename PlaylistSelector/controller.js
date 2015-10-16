
angular.module('PlaylistSelector', [])

.controller('MainController', function(Playlist, SONGS, ListGenerator, GENRES){

  var self = this;

  self.playlist = new Playlist();

  self.genres = GENRES;
  self.songs = SONGS;

  self.chosenSongs = {};

  self.submitList = function(){
    console.log(self.chosenSongs);
    var list = ListGenerator.generate(self.chosenSongs, self.explicitChoice);
    console.log(JSON.stringify(list));
  }

  self.checkAge = function(){
    console.log(self.age);
  }

});