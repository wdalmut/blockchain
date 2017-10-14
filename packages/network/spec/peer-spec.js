const MessageBox = require('../stream/message'),
  {connectPeer} = require('../peer'),
  stream = require('stream')
;

describe("Peer", () => {
  describe("Connect", () => {
    let socket = null;
    let messageBox = null;

    beforeEach(() => {
      socket = new stream.PassThrough()
      messageBox = new MessageBox();
    });

    afterEach(() => {
      socket.end()
    });

    it("should emit message block", (done) => {
      socket.write(JSON.stringify({type: "block", data: {}}));

      messageBox.on('block.mined', done);

      connectPeer(messageBox, socket);
    });

    it("should emit message transaction", (done) => {
      socket.write(JSON.stringify({type: "transaction", data: {}}));

      messageBox.on('transaction.append', done);

      connectPeer(messageBox, socket);
    });

    it("should emit chain from", (done) => {
      socket.write(JSON.stringify({type: "from", data: {}}));

      messageBox.on('chain.from', done);

      connectPeer(messageBox, socket);
    });
  });
});
