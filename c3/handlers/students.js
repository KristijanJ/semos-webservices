const file = require('../pkg/file');
const students = require('../pkg/students');


const getAll = (req, res) => {
  students.getAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('internal server error');
    });
};

const getSingle = (req, res) => {
  students.getOne(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('internal server error');
    });
};

const create = (req, res) => {
  students.create(req.body)
    .then(() => {
      res.status(201).send('created');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('internal server error');
    });
};

const remove = (req, res) => {
  students.remove(req.params.id)
    .then(() => {
      res.status(204).send('no content');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('internal server error');
    });
};

const update = (req, res) => {
  students.update(req.params.id, req.body)
    .then(() => {
      res.status(204).send('no content');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('internal server error');
    });
};

const patch = (req, res) => {
  students.patch(req.params.id, req.body)
    .then(() => {
      res.status(204).send('no content');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('internal server error');
    });
};

module.exports = {
  getAll,
  getSingle,
  create,
  remove,
  update,
  patch
};
