const { Transform } = require('stream');
const util = require('util');

function ProtocolTransform(options) {
  options = Object.assign({}, {objectMode: true}, options);

  if (!(this instanceof ProtocolTransform)) {
    return new ProtocolTransform(options);
  }
  Transform.call(this, options);
}
util.inherits(ProtocolTransform, Transform);

ProtocolTransform.prototype._transform = function(chunk, encoding, callback) {
  switch (chunk.type) {
    case 'block':
      this.emit('block', chunk.data);
      break;
    case 'transaction':
      this.emit('transaction', chunk.data);
      break;
  }

  this.push(chunk);
  callback();
};

module.exports = ProtocolTransform;


