const fs = require('fs');
const mock = require('mock-fs');
const {load, store} = require('../');

describe("Storage", () => {
  beforeEach(() => {
    mock({
      "/home/user/chain.json": '[]',
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it("should store the data", (done) => {
    store("/home/user/chain.json", [1], (err) => {
      expect(err).toBe(null);

      expect(fs.readFileSync("/home/user/chain.json").toString()).toEqual("[1]");
      done();
    });
  });

  it("should load from disk", (done) => {
    load("/home/user/chain.json", (err, data) => {
      expect(err).toBe(null);
      expect(data).toEqual([]);
      done();
    });
  });
});
