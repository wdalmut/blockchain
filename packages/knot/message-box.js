const R = require('ramda'),
  crypto = require('crypto-helpers'),
  line  = require('blockchain/block'),
  mine = require('blockchain/block/mine'),
  {verifyBlock} = require('blockchain/block/verify'),
  {isBlockchainValid} = require('blockchain/chain/verify'),
  message = require('network/stream/message')
;


module.exports = (keys) => {
  const signature = R.curry(crypto.sign)(keys.priv);

  return {
    sign: R.curry(mine.signBlock)(signature, crypto.hash, 1),
    createBlock: R.curry(line.createBlock)(keys.pub.toString()),
    isBlockValid: verifyBlock,
    isBlockchainValid: isBlockchainValid,
    stream: message(),
    chain: [],
  };
};
