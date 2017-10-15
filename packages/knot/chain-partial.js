const {cut} = require('blockchain/chain')
;

module.exports = (message) => (blocks) => {
  let chain = message.chain.slice();

  let cuttedChain = cut(chain, ((block) => (chainBlock) => chainBlock.index >= block.index)(blocks.slice(0,1)[0]));

  if (cuttedChain.length <= blocks.length) {
    let halfChain = cut(chain, ((block) => (chainBlock) => chainBlock.index < block.index)(blocks.slice(0,1)[0]));

    chain = halfChain.concat(blocks);

    if (!message.isBlockchainValid(chain)) {
      return message.stream.emit('chain.update.invalid', blocks);
    }

    message.chain = chain;

    message.stream.emit('chain.update', chain.slice());
  } else {
    message.stream.emit('chain.update.skip', chain.slice());
  }
};
