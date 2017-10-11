const {createBlock} = require('../../block');
const {signBlock} = require('../../block/mine');

describe("Mining", () => {
  it("should sign a block asynchrously", (done) => {
    signBlock(
      () => "sign",
      () => "00000000000",
      2,
      createBlock("test", 1, {}),
      (err, block) => {
        if (err) {
          fail();
        }

        expect(block.hash).toEqual("00000000000");
        expect(block.signature).toEqual("sign");
        done();
      }
    );
  });

  it("should abort current mining", (done) => {
    const {hash} = require('crypto-helpers');

    let abort = signBlock(
      () => "sign",
      hash,
      10,
      createBlock("test", 1, {}),
      (err, block) => {
        if (!err) {
          fail();
        }

        return done();
      }
    );

    abort();
  });
});
