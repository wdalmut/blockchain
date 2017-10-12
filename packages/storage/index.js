const fs = require('fs');

store = (filepath, data, cb) => {
  fs.writeFile(filepath, JSON.stringify(data), cb);
};

load = (filepath, cb) => {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      return cb(err, null);
    };

    cb(null, JSON.parse(data));
  });
};

module.exports = {
  load,
  store,
};
