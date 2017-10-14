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
  if (chunk.hasOwnProperty('type')) {
    this.emit(`message.${chunk.type}`, chunk.data);
  }

  callback(null, chunk);
};

module.exports = ProtocolTransform;


