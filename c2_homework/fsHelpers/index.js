const fs = require('fs');

const writeFile = (filename, data) => {
  return new Promise((success, fail) => {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
}

const appendFile = (filename, data) => {
  return new Promise((success, fail) => {
    fs.appendFile(filename, data, (err) => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
}

const readFile = (filename) => {
  return new Promise((success, fail) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        return fail(err);
      }
      return success(data);
    });
  });
}

const unlinkFile = (filename) => {
  return new Promise((success, fail) => {
    fs.unlink(filename, (err) => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
}

module.exports = {
  writeFile,
  appendFile,
  readFile,
  unlinkFile
};