const crypto = require('crypto');

const hash = (data) => {
  let hash = crypto.createHash('SHA256');
  hash.update(data);
  return hash.digest('hex');
};

const sign = (privateKey, data) => {
  const sign = crypto.createSign('SHA256');
  sign.update(data);
  return sign.sign(privateKey, 'hex')
};

const verify = (publicKey, signatureToVerify, data) => {
  const verify = crypto.createVerify('SHA256');
  verify.write(data);
  verify.end();

  return verify.verify(publicKey, signatureToVerify, 'hex')
};

module.exports = {
  hash,
  sign,
  verify,
};
