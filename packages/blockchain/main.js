const R = require('ramda'),
  path = require('path'),
  fs = require('fs'),
  crypto = require('crypto-helpers'),
  line  = require('./block'),
  mine = require('./block/mine'),
  verify = require('./chain/verify')
;

/** Sign block complexity **/
const complexity = 3;

/** Import my keys **/
const keys = {
  priv: fs.readFileSync(path.join(__dirname, 'private.key')),
  pub: fs.readFileSync(path.join(__dirname, 'public.key')),
};

const mySign = R.curry(crypto.sign)(keys.priv);
const mySignBlock = R.curry(mine.signBlock)(mySign, crypto.hash, complexity);

const createBlockWithMyPublicKey = R.curry(line.createBlock)(keys.pub.toString());

/** create the blockchain **/
let chain = [];
mySignBlock(createBlockWithMyPublicKey(chain, new Date().getTime(), []), (err, block) => {
  chain = chain.concat([block]);
  mySignBlock(createBlockWithMyPublicKey(chain, new Date().getTime(), [{test: true}]), (err, block) => {
    chain = chain.concat([block]);
    mySignBlock(createBlockWithMyPublicKey(chain, new Date().getTime(), [{value: 14356}]), (err, block) => {
      chain = chain.concat([block]);

      console.log(JSON.stringify(chain, null , 2));

      console.log("");

      console.log("isBlockchainValid: ", verify.isBlockchainValid(chain));

      chain[1].data = "hello World";
      console.log("isBlockchainValid: ", verify.isBlockchainValid(chain));
    });
  });
});

