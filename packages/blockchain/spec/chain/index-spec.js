const { from } = require('../../chain');

describe("Chain", () => {
  it("should return from a index", () => {
    let chain = [1,2,3,4,5,6,7,8,9,];

    expect(from(chain, 5)).toEqual([5,6,7,8,9]);
  });
});
