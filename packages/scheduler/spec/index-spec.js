const scheduler = require('../');
const {sign, hash} = require('crypto-helpers');
const {createTransaction} = require('blockchain/transaction');

describe("Transaction scheduler", () => {
  let keys = {};
  let mySignature = () => '';

  beforeEach(() => {
        keys = {
      priv: `-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIMFXriqA9nZG1rw5oRNW5Phu8csodj9p8vaAJdy7u+VsoAcGBSuBBAAK
oUQDQgAESmMJ3U7H/G8nRVn6MoNy/xxYU4DHJd6KsfqpuIoSPk4CIBbI4zyClzzO
MlyfhZQ32LD4Wi4yyrvAJkdo09Ba8Q==
-----END EC PRIVATE KEY-----`,
      pub: `-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAESmMJ3U7H/G8nRVn6MoNy/xxYU4DHJd6K
sfqpuIoSPk4CIBbI4zyClzzOMlyfhZQ32LD4Wi4yyrvAJkdo09Ba8Q==
-----END PUBLIC KEY-----`,
    }

    mySignature = ((privateKey) => {
      return (data) => {
        return sign(privateKey, data);
      };
    })(keys.priv);
  });

  it("should add transactions", () => {
    const hash = (data) => `hash_${data}`;

    const myScheduler = scheduler(hash);

    let bucket = myScheduler.add(createTransaction(keys.pub, mySignature, 'any data'));

    expect(bucket).toBe(true);
  });

  it("should schedule at fixed rate", (done) => {
    const hash = (data) => `hash_${data}`;

    const myScheduler = scheduler(hash, 1);

    myScheduler.add(createTransaction(keys.pub, mySignature, 'any data'));
    myScheduler.add(createTransaction(keys.pub, mySignature, 'any data'));

    expect(myScheduler.getBucket().length).toEqual(3);

    myScheduler.start((tree, go) => {
      myScheduler.stop();

      expect(tree.length).toEqual(3);
      expect(myScheduler.getBucket()).toEqual([]);

      done();
    });
  });

  it("should remove old transactions", () => {
    const myScheduler = scheduler(hash, 1);

    myScheduler.add(createTransaction(keys.pub, mySignature, 'one'));
    myScheduler.add(createTransaction(keys.pub, mySignature, 'two'));

    myScheduler.remove(myScheduler.getBucket()[0].data.id);

    expect(myScheduler.getBucket()[0].data.data).toEqual("two");
  });
});
