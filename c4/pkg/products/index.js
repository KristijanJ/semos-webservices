var mongoose = require('mongoose');

const Product = mongoose.model(
  'product',
  {
    name: String,
    price: Number,
    category: String,
    manufacturer: String,
    country_of_origin: String
  },
  'products'
);

const create = (data) => {
  return new Promise((success, fail) => {
    let s = new Product(data);
    s.save(err => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
}

const getAll = () => {
  return new Promise((success, fail) => {
    Product.find({}, (err, data) => {
      if (err) {
        return fail(err);
      }
      return success(data);
    });
  });
}

const getOne = (id) => {
  return new Promise((success, fail) => {
    Product.findOne({_id: id}, (err, data) => {
      if (err) {
        return fail(err);
      }
      return success(data);
    });
  });
}

const remove = (id) => {
  return new Promise((success, fail) => {
    Product.deleteOne({_id: id}, (err) => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
}

const update = (id, data) => {
  return new Promise((success, fail) => {
    Product.updateOne({_id: id}, data, (err) => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
}

const patch = (id, data) => {
  return new Promise((success, fail) => {
    Product.updateOne({_id: id}, data, (err) => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
}

module.exports = {
  create,
  getAll,
  getOne,
  remove,
  update,
  patch
};