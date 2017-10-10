const {hash, verify} = require('crypto-helpers');

const createTransaction = (publicKey, signature, data) => {
  let transaction = {
    id: 0x0,
    data,
    hash: 0x0,
    signature: 0x0,
    publicKey,
  };

  // compute id as twice SHA-256
  transaction = Object.assign(transaction, {id: hash(hash(JSON.stringify(transaction)))});

  // Hash the whole transaction
  transaction = Object.assign(transaction, {hash: hash(JSON.stringify(transaction))});

  // Sign the whole transaction
  return Object.assign({}, transaction, {signature: signature(JSON.stringify(transaction))});
};

const verifyTransaction = (transaction) =>
  verify(
    transaction.publicKey,
    transaction.signature,
    JSON.stringify(Object.assign(transaction, {signature: 0x0}))
  ) && (
    transaction.hash
      ==
    hash((JSON.stringify(Object.assign(transaction, {signature: 0x0, hash: 0x0}))))
  )
;

module.exports = {
  createTransaction,
  verifyTransaction,
};


