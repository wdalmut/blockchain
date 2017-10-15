const merkle = require('merkle-tree'),
  {createBlockMinedMessage} = require('network/message'),
  transaction = require('blockchain/transaction'),
  {isBlockchainValid} = require('blockchain/chain/verify'),
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

  if (!isBlockchainValid(chain)) {
    return message.stream.emit('error.block.mined', block);
  }

  message.stream.emit('chain.partial', chain.slice(-2));

  message.stream.add(createBlockMinedMessage(block));
};
