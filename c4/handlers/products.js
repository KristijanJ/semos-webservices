const products = require("../pkg/products");
const productValidator = require("../pkg/products/validation");

const getAll = (req, res) => {
  products.getAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
};

const getSingle = (req, res) => {
  products.getOne(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
};

const create = (req, res) => {
  productValidator.validate(req.body)
    .then((matches) => {
      if (!matches) {
        throw "Bad request";
      }
      return products.create(req.body);
    })
    .then(() => {
      res.status(201).send("created");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
};

const remove = (req, res) => {
  products.remove(req.params.id)
    .then(() => {
      res.status(204).send("no content");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
};

const update = (req, res) => {
  products.update(req.params.id, req.body)
    .then(() => {
      res.status(204).send("no content");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
};

const patch = (req, res) => {
  products.update(req.params.id, req.body)
    .then(() => {
      res.status(204).send("no content");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
};

module.exports = {
  getAll,
  getSingle,
  create,
  remove,
  update,
  patch,
};
