const stream = require("stream"),
  protocol = require('../../stream/protocol');

describe("Protocol", () => {
  it("should parse a block", (done) => {
    var a = new stream.PassThrough({objectMode: true})
    a.write({"type": "block", "data": "any data"})
    a.end()

    a
      .pipe(protocol())
      .on('message.block', done)
      .on('message.transaction', fail)
    ;
  });

  it("should parse a transaction", (done) => {
    var a = new stream.PassThrough({objectMode: true})
    a.write({"type": "transaction", "data": "any data"})
    a.end()

    a
      .pipe(protocol())
      .on('message.transaction', done)
      .on('message.block', fail)
    ;
  });
});
