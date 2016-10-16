var TROJAN = require('trojan-course-api');
var normalize = require('./normalize');
var scheduler = require('./scheduler-register');

var courses = ['CSCI-201', 'CSCI-270', 'EE-109'];
var term = 20163;

// Nathan's classes
courses = ['SWMS-301', 'ACAD-376'];

// all testable entities
var entities = {};

// get course data for each course
for (var course of courses) {
  var courseid = course.split('-');
  TROJAN.course(courseid[0], courseid[1], null, term).then(function (coursedata) {
    coursedata = coursedata[Object.keys(coursedata)[0]];
    // get combinations
    TROJAN.combinations(coursedata).then(function (combinations) {

      // turn data into a form processable by scheduler-api
      var data = normalize(coursedata, combinations);
      entities[courseid] = data;

      // if entities are all loaded, process it.
      if (Object.keys(entities).length === courses.length) {
        processEntities(entities);
      }
    });
  });
}

function processEntities(entities) {
  var start = Date.now();
  var results = scheduler.combinations.sync(entities);
  var elapsed = Date.now() - start;
  console.log(results, results.length);
  console.log(elapsed);
}

// scheduler.combinations.async(corpus).then(console.log);
