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
  if (!blockA || !blockB) return false; // if one doesn't exist
  if (!_.isArray(blockA)) blockA = [blockA];
  if (!_.isArray(blockB)) blockB = [blockB];

  for (var a of blockA) {
    if (!a) continue;
    for (var b of blockB) {
      if (!b) continue;
      if ('day' in a && 'day' in b && dayConflictExists(a.day, b.day)) {
        if (timeConflictExists(a.start, a.end, b.start, b.end)) {
          if (!a.transient && !b.transient) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

function dayConflictExists(dayA, dayB) {
  if (!dayA || !dayB) return false;
  return (dayA === dayB);
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
