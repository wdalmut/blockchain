const net = require('net');

module.exports = (addPeer) => {
  return {
    addPeer,
    server: net.createServer(addPeer),
  };
};
