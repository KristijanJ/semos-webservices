const students = [
  {fname: 'Pero', lname: 'Perovski', gpa: 9.2},
  {fname: 'Stanko', lname: 'Stankovski', gpa: 7.0},
  {fname: 'Janko', lname: 'Jankovski', gpa: 6.1},
]

const getAllStudents = (req, res) => {
  return res.status(200).send(students);
}
const getSingleStudent = (req, res) => {
  if (students[req.params.id] !== undefined) {
    return res.status(200).send(students[req.params.id]);
  }
  return res.status(404).send('Not Found');
}
const createStudent = (req, res) => {
  if (req.body){
    students.push(req.body);
    return res.status(201).send('ok');
  }
  res.status(400).send('Bad Request');
}
const removeStudent = (req, res) => {
  res.status(200).send('ok');
}
const updateStudent = (req, res) => {
  res.status(200).send('ok');
}
const patchStudent = (req, res) => {
  res.status(200).send('ok');
}

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  removeStudent,
  updateStudent,
  patchStudent
}