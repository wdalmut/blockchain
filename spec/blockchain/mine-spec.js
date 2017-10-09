const mine = require('../../blockchain/mine');
const helper = require('../../blockchain/line');

describe("Mining", () => {
  it("should sign a block asynchrously", (done) => {
    let block = mine.signBlockAsync(
      () => "sign",
      () => "00000000000",
      2,
      helper.createBlock("test", 1, {}),
      (err, block) => {
        expect(block.hash).toEqual("00000000000");
        expect(block.signature).toEqual("sign");
        done();
      }
    );
  });
});
