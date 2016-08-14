var TROJAN = require('trojan-course-api');
var normalize = require('./normalize');
var scheduler = require('./index');

var courses = ['CSCI-201', 'CSCI-270', 'EE-109'];

var entities = {};
for (var course of courses) {
  var courseid = course.split('-');
  TROJAN.course(courseid[0], courseid[1]).then(function (coursedata) {
    var courseid = Object.keys(coursedata)[0];
    var coursedata = coursedata[courseid];
    TROJAN.combinations(coursedata).then(function (combinations) {
      var data = normalize(coursedata, combinations);
      entities[courseid] = data;

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
