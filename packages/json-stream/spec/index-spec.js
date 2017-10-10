const json = require('../');

describe("Json Stream", () => {
  it("read from", (done) => {
    var stream = require("stream")
    var a = new stream.PassThrough()
    a.write('{"test": true}')
    a.end()

    a
      .pipe(json())
      .on('data', (elem) => {
        expect(elem).toEqual({test: true});
        done();
      })
  });
});
