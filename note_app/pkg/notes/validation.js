var validator = require('node-input-validator');

const createSchema = {
  note_title: 'required|minLength:2'
};

const addNew = (data) => {
  let v = new validator.Validator(data, createSchema);
  return v.check();
};

module.exports = {
  addNew
}