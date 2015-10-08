// utility functions
//   calculate average
//   calculate grade
//   calculate passing

angular.module('StudentGradeCalculator')

.service('GradeCalculator', function(PASSING){
  var self = this;

  self.calcAverage = function(scores){
    var sum = scores.reduce(function(a, b) { return a + b; });
    return sum / scores.length;
  };

  self.calcGrade = function(average){
    average = parseInt(average);
    if(average >= 90) {return 'A';}
    if(average >= 80) {return 'B';}
    if(average >= 70) {return 'C';}
    if(average >= 60) {return 'D';}
    else              {return 'F';}
  };

  self.calcPassing = function(grade){
    return PASSING[grade];
  };
});
