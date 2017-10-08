const R = require('ramda'),
  path = require('path'),
  fs = require('fs'),
  crypto = require('./blockchain/crypto'),
  line  = require('./blockchain/line'),
  verify = require('./blockchain/verify')
;

/** Sign block complexity **/
const complexity = 3;

/** Import my keys **/
const keys = {
  priv: fs.readFileSync(path.join(__dirname, 'private.key')),
  pub: fs.readFileSync(path.join(__dirname, 'public.key')),
};

const mySign = R.curry(crypto.sign)(keys.priv);
const mySignBlock = R.curry(line.signBlock)(mySign, crypto.hash, complexity);
const addSignedBlock = R.curry(line.addBlock)(mySignBlock);

const createBlockWithMyPublicKey = R.curry(line.createBlock)(keys.pub.toString());

/** create the blockchain **/
let chain = [];
chain = addSignedBlock(chain, createBlockWithMyPublicKey(new Date().getTime(), []));

/** add more transactions **/
chain = addSignedBlock(chain, createBlockWithMyPublicKey(new Date().getTime(), [{data: "hello"}]));
chain = addSignedBlock(chain, createBlockWithMyPublicKey(new Date().getTime(), [{data: "world"}]));
console.log(chain);

console.log("");

/** Verify blockchain **/
console.log("isBlockchainValid: ", verify.isBlockchainValid(chain));

/** Tampering **/
chain[1].data = "hello World";
console.log("isBlockchainValid: ", verify.isBlockchainValid(chain));

