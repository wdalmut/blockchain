const crypto = require('crypto-helpers');
const {verifyBlock} = require('./block/verify');

const isBlockchainValid = (chain) => {
  return isChainCompletelySigned(chain) && isChainCompletelyConnected(chain);
};

const isChainCompletelySigned = (chain) => {
  return chain.map(verifyBlock).reduce((memo, item) => memo && item, true);
}

const isChainCompletelyConnected = (chain) => {
  return chain
    .map((block) => [block.previousBlock, block.hash])
    .reduce((memo, item) => memo.concat([item[0], item[1]]), [])
    .slice(1)
    .slice(0, -1)
    .reduce((memo, item, i, orig) => (i % 2 != 0) ? memo.concat([[item, orig.slice(i-1, i)[0]]]) : memo, [])
    .map((item) => item[0] === item[1])
    .reduce((memo, item) => memo && item, true)
};

module.exports = {
  isBlockchainValid,
  isChainCompletelySigned,
  isChainCompletelyConnected,
}
