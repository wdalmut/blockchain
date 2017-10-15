const R = require('ramda'),
  line  = require('blockchain/block'),
  mine = require('blockchain/block/mine'),
  {sign, hash} = require('crypto-helpers')
;

module.exports = (keys, complexity) => {
  const signature = R.curry(sign)(keys.priv);
  const mySignature = R.curry(mine.signBlock)(signature, hash, complexity);
  const createBlock = R.curry(line.createBlock)(keys.pub.toString());

  return (chain, timestamp, transactions, callback) => {
    return mySignature(createBlock(chain, timestamp, transactions), callback);
  }
};
