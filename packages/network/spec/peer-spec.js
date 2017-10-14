const MessageBox = require('../stream/message'),
  EventManager = require('events'),
  {connectPeer} = require('../peer'),
  stream = require('stream')
;

describe("Peer", () => {
  describe("Connect", () => {
    let socket = null;
    let events = null
    let messageBox = null;

    beforeEach(() => {
      socket = new stream.PassThrough()
      events = new EventManager();
      messageBox = new MessageBox();
    });

    afterEach(() => {
      socket.end()
    });

    it("should emit message block", (done) => {
      socket.write(JSON.stringify({type: "block", data: {}}));

      events.on('block.mined', done);

      connectPeer(events, messageBox, socket);
    });

    it("should emit message transaction", (done) => {
      socket.write(JSON.stringify({type: "transaction", data: {}}));

      events.on('transaction.append', done);

      connectPeer(events, messageBox, socket);
    });

    it("should emit chain from", (done) => {
      socket.write(JSON.stringify({type: "from", data: {}}));

      events.on('chain.from', done);

      connectPeer(events, messageBox, socket);
    });
  });
});
