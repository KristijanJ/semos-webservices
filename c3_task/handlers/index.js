const fs = require('fs');

const searchWordPromise = (filename) => {
  return new Promise((success, fail) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        return fail(err);
      }
      return success(data);
    });
  });
}

const searchWord = (req, res) => {
  searchWordPromise('./test.txt')
    .then((data) => {
      let separatedWords = data.split(' ');
      let found = {
        found: false,
        number: 0
      };
      for (let i = 0; i < separatedWords.length; i++) {
        let el = separatedWords[i];
        if (el[el.length-1] == ',' || el[el.length-1] == '.') {
          el = el.slice(0, -1);
        }
        if (el.toLowerCase() == req.query.filter.toLowerCase()) {
          found.found = true;
          found.number++;
        }
      }
      if (found.number > 0) {
        return res.status(200).send(found);
      }
      return res.status(404).send(found);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

module.exports = {
  searchWord
}