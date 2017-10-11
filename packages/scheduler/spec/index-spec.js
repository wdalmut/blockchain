const scheduler = require('../');

describe("Transaction scheduler", () => {
  it("should add transactions", () => {
    const hash = (data) => `hash_${data}`;

    const myScheduler = scheduler(hash);

    let bucket = myScheduler.add('any data');

    expect(bucket).toEqual([{hash: "hash_\"any data\"", data: "any data"}]);
  });

  it("should schedule at fixed rate", (done) => {
    const hash = (data) => `hash_${data}`;

    const myScheduler = scheduler(hash, 1);

    myScheduler.add('any data');
    myScheduler.add('any data');

    expect(myScheduler.getBucket().length).toEqual(3);

    myScheduler.start((tree) => {
      expect(tree.length).toEqual(3);
      expect(myScheduler.getBucket()).toEqual([]);

      myScheduler.stop();
      done();
    });
  });
});
