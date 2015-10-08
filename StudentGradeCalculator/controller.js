
angular.module('StudentGradeCalculator', [])

.controller('MainController', function(Student){

  var self = this;
  self.student = new Student();

  // We need this function so that this controller can
  // clear the input textboxes
  self.addAssignment = function(){
    self.student.addAssignment(self.asgn_name, self.asgn_score);
    self.asgn_name = '';
    self.asgn_score = '';
  }
});