const hash = require('./crypto').hash;

const createBlock = (publicKey, timestamp, transactions) => {
  return {
    index: 0,
    timestamp,
    transactions,
    previousBlock: 0x0,
    hash: 0x0,
    signature: 0x0,
    nonce: 0,
    publicKey,
  };
};

const signBlock = (mySignature, hash, complexity, block) => {
  let verify = 0x0;
  do {
    block = Object.assign({}, block, {nonce: ++block.nonce});

    verify = hash(JSON.stringify(block));
  } while (verify.slice(0,complexity) != Array.apply(null, Array(complexity)).map(() => 0).join(''));

  block =  Object.assign({}, block, {hash: verify});

  return Object.assign({}, block, {signature: mySignature(JSON.stringify(block))});
};

const addBlock = (signBlock, chain, block) => {
  let newBlock = Object.assign({}, block, {
    index: chain.length+1,
    previousBlock: (chain.length) ? chain.slice(-1)[0].hash : 0x0,
  });

  return chain.concat([signBlock(newBlock)]);
}

module.exports = {
  addBlock,
  signBlock,
  createBlock,
};

