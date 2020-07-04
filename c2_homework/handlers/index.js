const fsHelpers = require('../fsHelpers');

const getAllStudents = (req, res) => {
  fsHelpers.readFile('./students.json')
    .then((data) => {
      return res.status(200).send(JSON.parse(data));
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
};

const getSingleStudent = (req, res) => {
  fsHelpers.readFile('./students.json')
    .then((data) => {
      let students = JSON.parse(data);
      let student = students.filter(e => e.id == parseInt(req.params.id));
      if (student[0]) {
        return res.status(200).send(student[0]);
      }
      return res.status(404).send('No such student');
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
};

const createStudent = (req, res) => {
  fsHelpers.readFile('./students.json')
    .then((data) => {
      let students = JSON.parse(data);
      let newStudents = [...students, { ...req.body, id: students[students.length-1].id + 1 }];
      return fsHelpers.writeFile('./students.json', JSON.stringify(newStudents));
    })
    .then(() => {
      return res.status(200).send('Write successful');
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
};

const removeStudent = (req, res) => {
  fsHelpers.readFile('./students.json')
    .then((data) => {
      let students = JSON.parse(data);
      let newStudents = students.filter(e => e.id != parseInt(req.params.id));
      return fsHelpers.writeFile('./students.json', JSON.stringify(newStudents));
    })
    .then(() => {
      return res.status(200).send('Removal successful');
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
};

const updateStudent = (req, res) => {
  fsHelpers.readFile('./students.json')
    .then((data) => {
      let students = JSON.parse(data);
      let newStudents = students.map(s => {
        if (s.id == parseInt(req.params.id)) {
          let d = { ...req.body, id: parseInt(req.params.id) }
          return d;
        }
        return s;
      });
      return fsHelpers.writeFile('./students.json', JSON.stringify(newStudents));
    })
    .then(() => {
      return res.status(200).send('Update successful');
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
};

const patchStudent = (req, res) => {
  fsHelpers.readFile('./students.json')
    .then((data) => {
      let students = JSON.parse(data);
      let newStudents = students.map(s => {
        if (s.id === parseInt(req.params.id)) {
          let d = { ...s, ...req.body, id: parseInt(req.params.id) }
          return d;
        }
        return s;
      });
      return fsHelpers.writeFile('./students.json', JSON.stringify(newStudents));
    })
    .then(() => {
      return res.status(200).send('Patch successful');
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  removeStudent,
  updateStudent,
  patchStudent,
};
