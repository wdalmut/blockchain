const mine = (hash, complexity, block, callback) => {
  let verify = 0x0;

  let doHash = (hash, complexity, block) => {
    block = Object.assign({}, block, {nonce: ++block.nonce});
    verify = hash(JSON.stringify(block));

    if (verify.slice(0, complexity) != Array.apply(null, Array(complexity)).map(() => 0).join('')) {
      return setImmediate(doHash, hash, complexity, block);
    }

    return callback(undefined, Object.assign({}, block, {hash: verify}));
  };

  return setImmediate(doHash, hash, complexity, block);
};

const signBlock = (mySignature, hash, complexity, block, callback) => {
  mine(hash, complexity, block, (err, block) => {
    block = Object.assign({}, block, {signature: mySignature(JSON.stringify(block))});

    callback(undefined, block);
  });
};

module.exports = {
  signBlock,
};

