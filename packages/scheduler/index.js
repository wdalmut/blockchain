const { add, remove } = require('merkle-tree');

module.exports = (hash, time = 60) => {
  let scheduleId = false;
  let transactionsBucket = [];

  return {
    start: (callback) => {
      scheduleId = setInterval(() => {
        let available = transactionsBucket;
        transactionsBucket = [];

        callback(available);
      }, time);
    },
    stop: () => {
      clearInterval(scheduleId);
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
