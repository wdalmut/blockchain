const { add } = require('merkle-tree');

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
    remove: (transaction) => {
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
