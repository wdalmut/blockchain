const R = require('ramda'),
  message = require('network/stream/message'),
  blackhole = require('network/stream/blackhole')
;


module.exports = (keys) => {

  const stream = message();

  stream.pipe(blackhole());

  return {
    stream: stream,
    chain: [],
  };
};
