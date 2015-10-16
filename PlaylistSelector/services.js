// utility functions
//   generate final list

angular.module('PlaylistSelector')

.service('ListGenerator', function(){

  this.generate = function(songs, explicit){
    var newList = [];
    for(var song in songs) {
      newList.push({title: song, type: explicit});
    }
    return newList;
  }
});
