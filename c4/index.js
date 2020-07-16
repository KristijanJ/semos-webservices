const express = require('express');
const bodyParser = require('body-parser');
const db = require('./pkg/db');
const config = require('./pkg/config');
const products = require('./handlers/products');

db.init();

const api = express();
api.use(bodyParser.json());

api.get('/products', products.getAll);
api.get('/products/:id', products.getSingle);
api.post('/products', products.create);
api.delete('/products/:id', products.remove);
api.put('/products/:id', products.update);
api.patch('/products/:id', products.patch);

api.listen(config.get('server').port, err => {
  if(err) {
    console.error(err);
  }
  console.log('Service started on port', config.get('server').port);
});