const {cut} = require('blockchain/chain'),
  {createPartialChainMessage} = require('network/message')
;

module.exports = (message) => (blocks) => {
  let fromChain = message.chain.slice();

  for (let i=0; i<blocks.length; i++) {
    let block = blocks[i];
    let cuttedChain = cut(fromChain, ((block) => (chainBlock) => chainBlock.index >= block.index)(block))

    if (cuttedChain.length) {
      fromChain = cuttedChain;
      break;
    }
  }

  return message.stream.add(createPartialChainMessage(fromChain));
};

