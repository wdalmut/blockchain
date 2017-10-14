const json = require('json-stream'),
  protocol = require('./stream/protocol'),
  {hash} = require('crypto-helpers');

const connectPeer = (messageBox, socket) => {
  messageBox.pipe(socket);

  socket
    .pipe(json())
    .pipe(protocol())
    .on('message.block', (message) => messageBox.emit('block.mined', message))
    .on('message.transaction', (message) => messageBox.emit('transaction.append', message))
    .on('message.from', (message) => messageBox.emit('chain.from', message))
    .on('data', (message) => messageBox.emit('raw.data', message));
};

module.exports = {
  connectPeer,
};

