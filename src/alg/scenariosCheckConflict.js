// scenariosCheckConflict: compare to scenarios

const scenariosCheckConflict = (scenario1, scenario2) => {
  // returns true if there is a conflict
  for (var k1 in scenario1) {
    for (var k2 in scenario2) {
      if (blocksCheckConflict(scenario1[k1], scenario2[k2])) {
        return true;
      }
    }
  }

  // found no conflicts.
  return false;
};

export default scenariosCheckConflict;

/* —————— dependent functions —————— */

function blocksCheckConflict(block1, block2) {
  // returns true if there is a conflict
  if (dayCheckConflict(block1.day, block2.day)) {
    return timeCheckConflict(block1.startTime, block1.endTime,
      block2.startTime, block2.endTime);
  }
};

function dayCheckConflict(day1, day2) {
  // returns true if there is a conflict
  return (day1 == day2);
}

function timeCheckConflict(start1, end1, start2, end2) {
  // returns true if there is a conflict
  if (start1 == start2) return true;

  if (start1 < start2) {
    return (end1 > start2);
  }

  if (start2 < start1) {
    return (end2 > start1);
  }
}
