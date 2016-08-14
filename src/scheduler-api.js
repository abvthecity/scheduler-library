// index.js: package both combination and conflict apis together.

import generate from './generate';
import Promise from 'bluebird';

const scheduler = {
  combinations: {
    sync: function (corpus = {}, cb = () => {}) {
      // synchronous
      return generate(corpus, cb);
    },

    async: function (corpus = {}, cb = () => {}) {
      // thenable asynchronous
      return new Promise((resolve, reject) => {
        generate(corpus, cb, resolve, reject);
      });
    },
  },
  conflicts: {},
};

module.exports = scheduler;
