const json = require('json-stream'),
  protocol = require('./stream/protocol'),
  {hash} = require('crypto-helpers');

const connectPeer = (events, messageBox, socket) => {
  messageBox.pipe(socket);

  socket
    .pipe(json())
    .pipe(protocol())
    .on('message.block', (message) => events.emit('block.mined', message))
    .on('message.transaction', (message) => events.emit('transaction.append', message))
    .on('message.from', (message) => events.emit('chain.from', message))
    .on('data', (message) => events.emit('raw.data', message));
};

module.exports = {
  connectPeer,
};

