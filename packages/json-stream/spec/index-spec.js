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

  it("splitted json", (done) => {
    var stream = require("stream")
    var a = new stream.PassThrough()
    a.write('{"test":');
    a.write('true}');
    a.end()

    a
      .pipe(json())
      .on('data', (elem) => {
        expect(elem).toEqual({test: true});
        done();
      })
  });

  it("subtle splitted json", (done) => {
    var stream = require("stream")
    var a = new stream.PassThrough()
    a.write('{"test":');
    a.write('{"test": true}');
    a.write(',"elem": true}');
    a.end()

    a
      .pipe(json())
      .on('data', (elem) => {
        expect(elem).toEqual({test: {test: true}, elem: true});
        done();
      })
  });
});
