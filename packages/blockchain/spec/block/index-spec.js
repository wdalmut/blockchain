const helper = require('../../block');

describe("Block", () => {
  it("should create a block", () => {
    let block = helper.createBlock("test", [], 1, {"test": true});

    expect(block.index).toEqual(1);
    expect(block.timestamp).toEqual(1);
    expect(block.publicKey).toEqual("test");
    expect(block.transactions).toEqual({test: true});
  });
});

