const {connectPeer, createFromMessage, createBlockMinedMessage, createTransactionAppendMessage} = require('../../message');

describe("Messages", () => {
  it("should create a transaction append message", () => {
    expect(createTransactionAppendMessage({})).toEqual({type: "transaction", data: {}});
  });

  it("should create a block mined message", () => {
    expect(createBlockMinedMessage({})).toEqual({type: "block", data: {}});
  });

  it("should create a transaction append message", () => {
    expect(createFromMessage({})).toEqual({type: "from", data: {}});
  });
});

