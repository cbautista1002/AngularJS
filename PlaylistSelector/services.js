// utility functions
//   generate final list

angular.module('PlaylistSelector')

.service('ListGenerator', function(){

  this.generate = function(genres, explicit){
    var newList = [];
    for(var genre in genres) {
      for(var i = 0; i < genres[genre].length; i++){
        var title = genres[genre][i].title;
        if(genres[genre][i].selected){
          newList.push({title: title, type: explicit});
        }
      }
    }
    return newList;
  }
});
