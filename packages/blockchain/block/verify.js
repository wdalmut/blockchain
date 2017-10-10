const crypto = require('crypto-helpers');

const verifyBlock = (data) => {
  return verifyBlockHash(data) && verifyBlockSignature(data);
};

const verifyBlockHash = (data) => {
  data = Object.assign({}, data);

  const hashToVerify = data.hash;

  data.hash = 0x0;
  data.signature = 0x0;

  return hashToVerify == crypto.hash(JSON.stringify(data));
};

const verifyBlockSignature = (data) => {
  data = Object.assign({}, data);
  const signatureToVerify = data.signature;

  data.signature = 0x0;

  return crypto.verify(data.publicKey, signatureToVerify, JSON.stringify(data));
};

module.exports = {
  verifyBlock,
  verifyBlockHash,
  verifyBlockSignature,
}

