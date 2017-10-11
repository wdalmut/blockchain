const { Readable } = require('stream');
const util = require('util');

function MessageReadable(options) {
  options = Object.assign({}, {objectMode: false}, options);

  if (!(this instanceof MessageReadable)) {
    return new MessageReadable(options);
  }

  Readable.call(this, options);

  this.bucket = [];
}
util.inherits(MessageReadable, Readable);

MessageReadable.prototype.add = function(payload) {
  this.bucket.push(payload);
};

MessageReadable.prototype._read = function() {
  if (this.bucket.length) {
    this.push(JSON.stringify(this.bucket.shift()));
  }
};

module.exports = MessageReadable;

