import generate from './alg/generate';

// synchronous
function sync(corpus = {}, cb = () => {}) {
  return generate(corpus, cb);
};

// thenable asynchronous
function async(corpus = {}, cb = () => {}) {
  return new Promise((resolve, reject) => {
    generate(corpus, cb, resolve, reject);
  });
};

const combinations = { sync, async };

export default combinations;
