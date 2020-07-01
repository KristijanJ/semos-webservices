const students = [
  { fname: "Pero", lname: "Perovski", gpa: 9.2 },
  { fname: "Stanko", lname: "Stankovski", gpa: 7.0 },
  { fname: "Janko", lname: "Jankovski", gpa: 6.1 },
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
    students.push(req.body);
    return res.status(201).send("ok");
  }
  res.status(400).send("Bad Request");
};

const removeStudent = (req, res) => {
  if (students[req.params.id] !== undefined) {
    const student = students[req.params.id];
    students.splice(req.params.id, 1);
    return res.status(200).send({
      message: "Student deleted",
      student: student,
    });
  }
  return res.status(404).send("Not Found");
};

const updateStudent = (req, res) => {
  if (students[req.params.id] !== undefined) {
    students[req.params.id] = req.body;
    return res.status(200).send({
      message: "Student updated",
      student: students[req.params.id],
    });
  }
  return res.status(404).send("Not Found");
};

const patchStudent = (req, res) => {
  if (students[req.params.id] !== undefined) {
    students[req.params.id] = {
      'fname': req.body.fname ? req.body.fname : students[req.params.id].fname,
      'lname': req.body.lname ? req.body.lname : students[req.params.id].lname,
      'gpa': req.body.gpa ? req.body.gpa : students[req.params.id].gpa
    }
    return res.status(200).send({
      message: "Student patched",
      student: students[req.params.id],
    });
  }
  return res.status(404).send("Not Found");
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  removeStudent,
  updateStudent,
  patchStudent,
};
