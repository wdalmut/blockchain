const {hash} = require('crypto-helpers'),
  scheduler = require('scheduler'),
  network = require('network'),
  {connectPeer} = require('network/peer'),
  blackhole = require('network/stream/blackhole'),
  blockMined = require('./block-mined'),
  chainFrom = require('./chain-from'),
  chainPartial = require('./chain-partial')
;
module.exports = (message) => {
  message.stream.pipe(blackhole()); // line tapping

  const addPeer = ((messageBox) => (stream) => connectPeer(messageBox, stream))(message.stream);

  let p2p = network(addPeer);

  p2p.server.on('error', console.log);
  p2p.server.listen(24672, console.log);

  const miner = scheduler(hash, 5 * 1000);

  message.stream.on('transaction.append', miner.add);
  message.stream.on('block.mined', blockMined(message));
  message.stream.on('chain.from', chainFrom(message));
  message.stream.on('chain.partial', chainPartial(message));

  miner.start((transactions, done) => {
    let abort = message.sign(message.createBlock(message.chain, new Date().getTime(), transactions), (err, block) => {
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

