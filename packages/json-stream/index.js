const { Transform } = require('stream');
const util = require('util');

function JsonTransform(options) {
  options = Object.assign({}, {objectMode: true}, options);
  if (!(this instanceof JsonTransform)) {
    return new JsonTransform(options);
  }
  Transform.call(this, options);

  this.pieces = [];
}
util.inherits(JsonTransform, Transform);

JsonTransform.prototype.parse = function(buf) {
  let chunk = false;

  try {
    chunk = JSON.parse(buf);
  } catch (exception) { }

  return chunk;
};

JsonTransform.prototype._transform = function(chunk, encoding, callback) {
  let json = this.parse(chunk)
  if (json && !this.pieces.length) {
    return callback(null, json);
  }

  this.pieces.push(chunk);

  json = this.parse(Buffer.concat(this.pieces))
  if (json) {
    this.pieces = [];
    return callback(null, json);
  }

  callback();
};

module.exports = JsonTransform;
