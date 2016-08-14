import scenarioConflictExists from './scenarioConflictExists';

const generate = (corpus = {}, cb = () => {}, done = () => {}) => {
  let output = [];

  // begin algorithm
  backtrace(corpus, {}, 0,

  // reached stack's end; add to output
  heap => {
    output.push(heap);
    cb(heap);
  },

  // done running
  () => {
    done(output);
  });

  // sync
  return output;
};

export default generate;

/* —————— dependent functions —————— */

/* BACKTRACKING ALGORITHM:
funcion bt() {
  if end, send to output.
  else...
  entity = get next entity
  for each course scenario
  {
    add() scenario to current heap
    if add doesn't work, skip to the next scenario
    if add works, backtrace to next layer.
    bt()
    remove() scenario from current heap
  }
} */

function backtrace(corpus = {}, heap = {}, index = 0, cb = () => {}, done = () => {}) {

  // check reached end
  if (Object.keys(corpus).length === index) {
    // we are at the end of stack
    cb(clone(heap)); // send clone to output
    return;
  }

  let entityKey = Object.keys(corpus)[index];
  let scenarios = corpus[entityKey];

  for (var key in scenarios) {
    if (!add(entityKey, key, heap, corpus)) continue;
    backtrace(corpus, heap, index + 1, cb);
    remove(entityKey, heap);
  }

  done();
}

function add(entitykey, scenariokey, heap, corpus) {
  // check for conflicts first
  for (var key in heap) {
    let scenario1 = corpus[key][heap[key]];
    let scenario2 = corpus[entitykey][scenariokey];
    if (scenarioConflictExists(scenario1, scenario2)) {
      // there was a conflict
      return false;
    }
  }

  // no conflicts!
  heap[entitykey] = scenariokey;
  return true;
}

function remove(entitykey, heap) {
  delete heap[entitykey];
}

function clone(obj) { // deep copy
  if (obj === null || typeof obj !== 'object') return obj;
  var temp = obj.constructor(); // give temp the original obj's constructor
  for (var key in obj) {
    temp[key] = clone(obj[key]);
  }

  return temp;
}
