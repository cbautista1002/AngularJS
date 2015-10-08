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
    this.asmnts  = [];
    this.average = null;
    this.grade   = null;
    this.passing = null;
  }

  Student.prototype.addAssignment = function(name, score){
    var newAssignment = new Assignment(name, score);
    this.asmnts.push(newAssignment);

    // Construct a list of only scores from the assignments
    var scores = this.asmnts.map(function(a){return a.score});
    
    // Update all the statistics
    this.average = GradeCalculator.calcAverage(scores);
    this.grade   = GradeCalculator.calcGrade(this.average);
    this.passing = GradeCalculator.calcPassing(this.grade);
  }

  return Student;
});