const { from, apart, cut } = require('../../chain');

describe("Chain", () => {
  it("should return from a index", () => {
    let chain = [1,2,3,4,5,6,7,8,9,];

    expect(from(chain, 5)).toEqual([5,6,7,8,9]);
  });

  it("should split my chain down piece by piece", () => {
   let chain = [1,2,3,4,5,6,7,8,9,];

    expect(apart(chain)).toEqual([9,4,2,1]);
  });

  it("should split my chain down piece by piece with empty chain", () => {
   let chain = [];

    expect(apart(chain)).toEqual([]);
  });

  it("should split my chain down piece by piece with one block", () => {
   let chain = [1];

    expect(apart(chain)).toEqual([1]);
  });

  it("should find an element", () => {
   let chain = [1,2,3,4,5,6,7,8,9,];

    expect(cut(chain, (item) => item === 5)).toEqual([5,6,7,8,9,]);
  });
});
