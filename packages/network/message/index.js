
const createFromMessage = (data) => {
  return createMessage("from", data);
}

const createTransactionAppendMessage = (data) => {
  return createMessage("transaction", data);
}

const createBlockMinedMessage = (data) => {
  return createMessage("block", data);
}

const createPartialChainMessage = (data) => {
  return createMessage("partial", data);
};

const createMessage = (type, data) => {
  return { type, data }
}

module.exports = {
  createFromMessage,
  createTransactionAppendMessage,
  createBlockMinedMessage,
  createPartialChainMessage,
};
