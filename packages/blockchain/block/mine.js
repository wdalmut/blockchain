const mine = (hash, complexity, block, callback) => {
  let verify = 0x0;

  let abortId = 0x0;

  const abort = () => {
    clearImmediate(abortId);
    callback(new Error("abort"), undefined);
  };

  let doHash = (hash, complexity, block) => {
    block = Object.assign({}, block, {nonce: ++block.nonce});
    verify = hash(JSON.stringify(block));

    if (verify.slice(0, complexity) != Array.apply(null, Array(complexity)).map(() => 0).join('')) {
      abortId = setImmediate(doHash, hash, complexity, block);
      return;
    }

    return callback(undefined, Object.assign({}, block, {hash: verify}));
  };

  abortId = setImmediate(doHash, hash, complexity, block);

  return abort;
};

const signBlock = (mySignature, hash, complexity, block, callback) => {
  return mine(hash, complexity, block, (err, block) => {
    if (err) {
      return callback(err, undefined);
    }

    block = Object.assign({}, block, {signature: mySignature(JSON.stringify(block))});

    callback(undefined, block);
  });
};

module.exports = {
  signBlock,
};

