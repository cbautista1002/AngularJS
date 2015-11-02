// utility functions
//   generate final list

angular.module('Simon')

.service('ColorTracker', function(){
  var self = this;
  self.aiColors = [];

  self.addAIColor = function(color){
    self.aiColors.push(color);
  }
});
