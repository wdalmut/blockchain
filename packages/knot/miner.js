const R = require('ramda'),
  scheduler = require('scheduler'),
  {hash} = require('crypto-helpers')
;
module.exports = (createSignedBlock, message) => {
  const miner = scheduler(hash, 5 * 1000);

  message.stream.on('transaction.append', miner.add);

  miner.start((transactions, done) => {
    let abort = createSignedBlock(message.chain, new Date().getTime(), transactions, (err, block) => {
      message.stream.removeListener('block.mined', abort);
      message.stream.removeListener('chain.update', abort);

      if (!err) {
        message.stream.emit('block.mined', block);
      }

      done();
    });

    message.stream.on('block.mined', abort);
    message.stream.on('chain.update', abort);
  });

  return miner;
};

