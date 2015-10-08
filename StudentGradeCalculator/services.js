// utility functions
//   calculate average
//   calculate grade
//   calculate passing

angular.module('StudentGradeCalculator')

.service('GradeCalculator', function(PASSING){
  var self = this;

  self.calcAverage = function(grades){
    var sum = 0;
    for(var i = 0; i < grades.length; i++){
      sum += grades[i].score;
    }
    return sum / grades.length;
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
