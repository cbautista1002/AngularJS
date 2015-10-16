// Playlist Factory

angular.module('PlaylistSelector')

.factory('Playlist', function(){

  function Playlist(){
    this.songs = [];
    return;
  }
  return Playlist;
})

.factory('User', function(){
  function User(){
    return;
  }
  return User;
});