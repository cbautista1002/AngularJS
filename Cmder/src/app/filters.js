(function() {
  'use strict';

  angular
    .module('cmder')
    .filter('capitalize', capitalize);

  /** @ngInject */
  function capitalize(){
    return function(word){
      return word[0].toUpperCase() + word.substring(1);
    }
  }

})();
