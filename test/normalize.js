var _ = require('lodash');

var normalize = function (coursedata, combinations) {
  var entity = {};

  for (var bucket of combinations) {
    entity[bucket] = {};
    for (var sectionId of bucket) {
      entity[bucket][sectionId] = coursedata.sections[sectionId].blocks;
    }
  }

  return entity;
};

module.exports = normalize;
