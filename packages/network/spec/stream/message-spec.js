const message = require('../../stream/message');

describe("Message", () => {
  it("should pop a message", (done) => {
    const stream = message();

    stream.add({test: true});

    stream.on('data', (message) => {
      expect(message.toString()).toEqual('{"test":true}');
      done();
    });
  });
});
