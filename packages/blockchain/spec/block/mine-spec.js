const {createBlock} = require('../../block');
const {signBlock} = require('../../block/mine');

describe("Mining", () => {
  it("should sign a block asynchrously", (done) => {
    let block = signBlock(
      () => "sign",
      () => "00000000000",
      2,
      createBlock("test", 1, {}),
      (err, block) => {
        expect(block.hash).toEqual("00000000000");
        expect(block.signature).toEqual("sign");
        done();
      }
    );
  });
});
