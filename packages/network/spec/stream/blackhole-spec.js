const stream = require('stream'),
  blackhole = require('../../stream/blackhole');

describe("Blackhole", () => {
  it("should tap", (done) => {
    const a = new stream.PassThrough({objectMode: true})
    a.write({"type": "block", "data": "any data"})
    a.end()

    a.pipe(blackhole());
    setImmediate(done);
  });
});

