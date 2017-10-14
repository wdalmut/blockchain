const {hash} = require('crypto-helpers'),
  scheduler = require('scheduler'),
  network = require('network'),
  {connectPeer} = require('network/peer'),
  {createBlockMinedMessage} = require('network/message'),
  blackhole = require('network/stream/blackhole')
;

module.exports = (message) => {
  message.stream.pipe(blackhole()); // line tapping

  const addPeer = ((messageBox) => (stream) => connectPeer(messageBox, stream))(message.stream);

  let p2p = network(addPeer);

  p2p.server.on('error', console.log);
  p2p.server.listen(24672, console.log);

  const miner = scheduler(hash, 5 * 1000);

  message.stream.on('transaction.append', miner.add);

  message.stream.on('block.mined', (block) => {
      let chain = message.chain.concat([block]);

      if (!message.isBlockchainValid(chain)) {
        console.log("invalid blockchain with block", block);
        return;
      }

      message.chain = chain;

      console.log(JSON.stringify(message.chain, null, 2));


      message.stream.add(createBlockMinedMessage(block));
  });

  miner.start((transactions, done) => {
    let abort = message.sign(message.createBlock(message.chain, new Date().getTime(), transactions), (err, block) => {
      if (err) {
        return;
      }

      message.stream.removeListener('block.mined', abort);

      message.stream.emit('block.mined', block);

      done();
    });

    message.stream.on('block.mined', abort);
  });
};

