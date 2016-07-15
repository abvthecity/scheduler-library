// index.js: package both combination and conflict apis together.

import combinations from './combinations';
import conflicts from './conflicts';

const scheduler = {
  combinations,
  conflicts,
};

module.exports = scheduler;
