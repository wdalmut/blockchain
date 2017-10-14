const { Writable } = require('stream');
const util = require('util');

function BlackholeWritable(options) {
  options = Object.assign({}, {objectMode: true}, options);

  if (!(this instanceof BlackholeWritable)) {
    return new BlackholeWritable(options);
  }

  Writable.call(this, options);
}
util.inherits(BlackholeWritable, Writable);

BlackholeWritable.prototype._write = function(chunk, encoding, callback) {
  callback();
};

module.exports = BlackholeWritable;
