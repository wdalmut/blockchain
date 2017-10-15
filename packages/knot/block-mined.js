const merkle = require('merkle-tree'),
  {createBlockMinedMessage} = require('network/message'),
  transaction = require('blockchain/transaction'),
  {hash} = require('crypto-helpers')
;

module.exports = (message) => (block) => {
  let transactions = block.transactions;

  if(!merkle.validate(hash, transactions)) {
    return message.stream.emit('error.block.mined', block);
  }

  if(!(transaction.verifyAllTransactions(merkle.clean(transactions)))) {
    return message.stream.emit('error.block.mined', block);
  }

  let chain = message.chain.concat([block]);

  if (!message.isBlockchainValid(chain)) {
    return message.stream.emit('error.block.mined', block);
  }

  message.chain = chain;

  console.log(JSON.stringify(message.chain, null, 2));

  message.stream.add(createBlockMinedMessage(block));
};
