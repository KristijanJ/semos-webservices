var students = [
  { id: 1, fname: "Pero", lname: "Perovski", gpa: 9.2 },
  { id: 2, fname: "Stanko", lname: "Stankovski", gpa: 7.0 },
  { id: 3, fname: "Janko", lname: "Jankovski", gpa: 6.1 },
];

const getAllStudents = (req, res) => {
  return res.status(200).send(students);
};

const getSingleStudent = (req, res) => {
  if (students[req.params.id] !== undefined) {
    return res.status(200).send(students[req.params.id]);
  }
  return res.status(404).send("Not Found");
};

const createStudent = (req, res) => {
  if (req.body) {
    students.push({
      ...req.body,
      id: students[students.length - 1].id + 1
    });
    return res.status(201).send("ok");
  }
  res.status(400).send("Bad Request");
};

const removeStudent = (req, res) => {
  students = students.filter(e => e.id != parseInt(req.params.id));
  return res.status(204).send();
};

const updateStudent = (req, res) => {
  students = students.map(s => {
    if (s.id === parseInt(req.params.id)) {
      let d = { ...req.body, id: parseInt(req.params.id) }
      return d;
    }
    return s;
  });
  return res.status(204).send();
};

const patchStudent = (req, res) => {
  students = students.map(s => {
    if (s.id === parseInt(req.params.id)) {
      let d = { ...s, ...req.body, id: parseInt(req.params.id) }
      return d;
    }
    return s;
  });
  return res.status(204).send();
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  removeStudent,
  updateStudent,
  patchStudent,
};
