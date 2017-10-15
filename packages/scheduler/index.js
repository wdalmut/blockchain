const { add, remove } = require('merkle-tree');
const {verifyTransaction} = require('blockchain/transaction');

module.exports = (hash, time = 60) => {
  let scheduleId = false;
  let transactionsBucket = [];

  const register = (callback) => {
    scheduleId = setTimeout(function() {
      let available = transactionsBucket;
      transactionsBucket = [];

      const go = () => {
        register(callback);
      };

      setImmediate(callback, available, go);
    }, time);
  };

  return {
    start: register,
    stop: () => {
      clearTimeout(scheduleId);
    },
    remove: (id) => {
      let tree = transactionsBucket;
      transactionsBucket = [];

      transactionsBucket = remove(hash, tree, (transaction) => (transaction.id == id) ? false : true);

      return transactionsBucket;
    },
    add: (transaction) => {
      if (verifyTransaction(transaction)) {
        transactionsBucket = add(hash, transactionsBucket, transaction);
        return true;
      }

      return false;
    },
    getBucket: () => {
      return transactionsBucket.slice();
    }
  };
};
