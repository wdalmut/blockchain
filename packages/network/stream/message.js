const { Readable } = require('stream');
const util = require('util');

function MessageReadable(options) {
  options = Object.assign({}, {objectMode: false}, options);

  if (!(this instanceof MessageReadable)) {
    return new MessageReadable(options);
  }

  Readable.call(this, options);
}

util.inherits(MessageReadable, Readable);

MessageReadable.prototype.add = function(payload) {
  this.push(JSON.stringify(payload));
};

MessageReadable.prototype._read = function() {
};

module.exports = MessageReadable;

