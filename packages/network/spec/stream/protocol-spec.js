const stream = require("stream"),
  protocol = require('../../stream/protocol');

describe("Protocol", () => {
  it("should parse a block", (done) => {
    var a = new stream.PassThrough({objectMode: true})
    a.write({"type": "block", "data": "any data"})
    a.end()

    a
      .pipe(protocol())
      .on('block', done)
      .on('transaction', fail)
    ;
  });

  it("should parse a transaction", (done) => {
    var a = new stream.PassThrough({objectMode: true})
    a.write({"type": "transaction", "data": "any data"})
    a.end()

    a
      .pipe(protocol())
      .on('transaction', done)
      .on('block', fail)
    ;
  });
});
