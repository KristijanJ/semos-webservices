const fs = require('fs');

/* CREATE A NEW FILE AND WRITE TO IT */
// fs.writeFile('test.txt', 'Hello World', (err) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('Write successful');
// });

/* EDIT OR CREATE A FILE AND WRITE TO IT */
// fs.appendFile('test.txt', 'Hello Worldz', (err) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('Write successful');
// });

/* READ A FILE */
// fs.readFile('test.txt', 'utf8', (err, data) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log(data);
// });

/* DELETE A FILE */
// fs.unlink('test.txt', (err) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('File deleted');
// });

/* PROMISES */

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

writeFile('test.txt', 'Hello World')
  .then(() => {
    console.log('Write successful!');
    return appendFile('test.txt', ' Helloz!');
  })
  .then(() => {
    console.log('Append successful!');
    return readFile('test.txt');
  })
  .then((data) => {
    console.log('Read successful!');
    console.log(data);
    return unlinkFile('test.txt');
  })
  .then(() => {
    console.log('File deleted');
  })
  .catch((err) => {
    console.error(err);
  });