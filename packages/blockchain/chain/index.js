const from = (chain, index) => {
  return chain.slice(index-1);
};

const apart = (chain) => {
  const middle = (memo, remains) => {
    while (remains.length >= 1) {
      return middle(memo.concat(remains.slice(-1)), remains.slice(0, remains.length/2));
    }

    return memo;
  }

  return middle([], chain);
};

const cut = (chain, testFn) => {
  let capture = false

  return chain.reduce((memo, block) => {
    capture = false;
    if (testFn(block)) {
      capture = true;
    }

    if (capture) {
      return memo.concat([block]);
    }

    return memo;
  }, []);
};

module.exports = {
  from,
  apart,
  cut,
};
