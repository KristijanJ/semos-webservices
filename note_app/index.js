const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const db = require('./pkg/db');
const config = require('./pkg/config');
const notes = require('./handlers/notes');

db.init();

const api = express();

api.use(bodyParser.json());
api.use(
    jwt({
        secret: config.get('server').key,
        algorithms: ['HS256']
    })
);

api.get('/api/v1/notes', notes.getAllByUserIDEmail); // done
api.post('/api/v1/notes', notes.addNew); // done
api.get('/api/v1/notes/:id', notes.getAllByID); // done
api.put('/api/v1/notes/:id', notes.updateNote); // done
api.delete('/api/v1/notes/:id', notes.deleteNote); // done
api.patch('/api/v1/notes/:id/pin', notes.pinNote); // done
api.patch('/api/v1/notes/:id/share', notes.shareNote); // done
api.get('/api/v1/notes/:id/search', notes.searchNotes); // done

api.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...')
    }
});

api.listen(config.get('server').port, err => {
    if (err) {
        return console.error(err);
    }
    console.log('App started on port ' + config.get('server').port);
});