const validator = require('node-input-validator');

const schema = {
    name: 'required|minLength:3',
    price: 'required',
    category: 'required',
    manufacturer: 'required',
    country_of_origin: 'required|minLength:2'
}

const validate = (data) => {
    let v = new validator.Validator(data, schema);
    return v.check();
}

module.exports = {
    validate
};