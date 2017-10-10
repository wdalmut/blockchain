const { Transform } = require('stream');
const util = require('util');

function JsonTransform(options) {
  options = Object.assign({}, {objectMode: true}, options);
  if (!(this instanceof JsonTransform)) {
    return new JsonTransform(options);
  }
  Transform.call(this, options);
}
util.inherits(JsonTransform, Transform);

JsonTransform.prototype._transform = function(chunk, encoding, callback) {
  try {
    chunk = JSON.parse(chunk);
  } catch (exception) {
    return callback();
  }

  callback(null, chunk);
};

module.exports = JsonTransform;
