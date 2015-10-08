
angular.module('StudentGradeCalculator', [])

.controller('MainController', function(Student){

  var self = this;
  self.student = new Student();

});