const { add, remove } = require('merkle-tree');

module.exports = (hash, time = 60) => {
  let scheduleId = false;
  let transactionsBucket = [];

  const register = (callback) => {
    scheduleId = setTimeout(() => {
      let available = transactionsBucket;
      transactionsBucket = [];

      register(callback);

      setImmediate(callback, available);
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
      transactionsBucket = add(hash, transactionsBucket, transaction);
      return transactionsBucket;
    },
    getBucket: () => {
      return transactionsBucket.slice();
    }
  };
};
