// scenarioConflictExists: compare to scenarios

import _ from 'lodash';

const scenarioConflictExists = (scenarioA, scenarioB) => {
  // returns true if there is a conflict
  for (var i in scenarioA) {
    for (var j in scenarioB) {
      if (blockConflictExists(scenarioA[i], scenarioB[j])) {
        return true;
      }
    }
  }

  // found no conflicts.
  return false;
};

export default scenarioConflictExists;

/* —————— dependent functions —————— */

function blockConflictExists(blockA, blockB) {
  if (!_.isArray(blockA)) blockA = [blockA];
  if (!_.isArray(blockB)) blockB = [blockB];

  for (var a of blockA) {
    for (var b of blockB) {
      if (dayConflictExists(a.day, b.day)) {
        if (timeConflictExists(a.start, a.end, b.start, b.end)) {
          return true;
        }
      }
    }
  }

  return false;
};

function dayConflictExists(dayA, dayB) {
  if (dayA === null || dayB === null) {
    return false;
  }

  return (dayA == dayB);
}

function timeConflictExists(startA, endA, startB, endB) {
  if (startA === null || startB === null) {
    return false;
  }

  // returns true if there is a conflict
  if (startA === startB) return true;

  if (startA < startB) {
    return (endA > startB);
  }

  if (startB < startA) {
    return (endB > startA);
  }
}
