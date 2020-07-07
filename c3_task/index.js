const express = require('express');
const bodyParser = require('body-parser');
const handlers = require('./handlers');

const api = express();
api.use(bodyParser.json());

api.get('/search', handlers.searchWord);

api.listen(8090, err => {
  if(err) {
    console.error(err);
  }
  console.log('Service started on port 8090');
});