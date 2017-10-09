const hash = require('crypto-helpers').hash;

const createBlock = (publicKey, chain, timestamp, transactions) => {
  return {
    index: chain.length+1,
    timestamp,
    transactions,
    previousBlock: (chain.length) ? chain.slice(-1)[0].hash : 0x0,
    hash: 0x0,
    signature: 0x0,
    nonce: 0,
    publicKey,
  };
};

module.exports = {
  createBlock,
};

