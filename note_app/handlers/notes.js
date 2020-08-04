const notes = require("../pkg/notes");
const notesValidator = require("../pkg/notes/validation");

// DONE
const getAllByUserIDEmail = (req, res) => {
  notes.getAllByUserIDEmail(req.user.uid, req.user.email)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
};

// DONE
const getAllByID = (req, res) => {
  notes.getAllByID(req.params.id, req.user.uid)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
};

// DONE
const addNew = (req, res) => {
  notesValidator.addNew(req.body)
    .then((matches) => {
      if (!matches) {
        throw "Bad request";
      }
      return notes.addNew({...req.body, owner: req.user.uid});
    })
    .then(() => {
      res.status(201).send("created");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
};

// DONE
const deleteNote = (req, res) => {
  notes.deleteNote(req.params.id, req.user.uid)
    .then(() => {
      res.status(204).send("no content");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
};

// DONE
const updateNote = (req, res) => {
  notes.updateNote(req.body, req.params.id, req.user.uid)
    .then(() => {
      res.status(204).send("no content");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
};

// DONE
const pinNote = (req, res) => {
  notes.pinNote(req.params.id, req.user.uid, req.user.email)
    .then(() => {
      res.status(204).send("no content");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
}

// DONE
const shareNote = (req, res) => {
  notes.shareNote(req.params.id, req.user.uid, req.body.email)
    .then(() => {
      res.status(204).send("no content");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
}

const searchNotes = (req, res) => {
  notes.searchNotes(req.params.id, req.user.uid, req.user.email, req.query.search)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("internal server error");
    });
}

module.exports = {
  getAllByID,
  getAllByUserIDEmail,
  addNew,
  updateNote,
  pinNote,
  shareNote,
  deleteNote,
  searchNotes
};