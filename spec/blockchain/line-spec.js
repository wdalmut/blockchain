const helper = require('../../blockchain/line');

describe("Line", () => {
  it("should create a block", () => {
    let block = helper.createBlock("test", 1, {"test": true});

    expect(block.timestamp).toEqual(1);
    expect(block.publicKey).toEqual("test");
    expect(block.transactions).toEqual({test: true});
  });

  it("should sign a block", () => {
    let block = helper.signBlock(
      () => "sign",
      () => "00000000000",
      2,
      helper.createBlock("test", 1, {})
    );

    expect(block.hash).toEqual("00000000000");
    expect(block.signature).toEqual("sign");
  });

  it("should add a block to a chain", () => {
    let chain = helper.addBlock(
      (block) => block,
      [],
      helper.createBlock("test", 1, {})
    );

    expect(chain.length).toBe(1);
    expect(chain[0].transactions).toEqual({});
    expect(chain[0].timestamp).toEqual(1);
    expect(chain[0].publicKey).toEqual("test");
  });
});
