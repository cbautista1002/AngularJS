// assignment factory
//   obj: name
//   obj: score

angular.module('StudentGradeCalculator')

.factory('Assignment', function(){
  function Assignment(name, score){
    this.name = name;
    this.score = score;
  }
  return Assignment;
})

.factory('Student', function(Assignment, GradeCalculator){

  function Student(name, score){
    this.name    = name;
    this.grades  = [];
    this.average = null;
    this.grade   = null;
    this.passing = null;
  }

  Student.prototype.addAssignment = function(name, score){
    var newAssignment = new Assignment(name, score);
    this.grades.push(newAssignment);

    this.average = GradeCalculator.calcAverage(this.grades);
    this.grade   = GradeCalculator.calcGrade(this.average);
    this.passing = GradeCalculator.calcPassing(this.grade);
  }

  return Student;
});