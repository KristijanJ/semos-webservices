var mongoose = require('mongoose');

const Note = mongoose.model(
  'note',
  {
    owner: String,
    note_title: String,
    note: {
      type: String,
      default: 'Start typing',
      text: true
    },
    pinned_by: {
      type: Array,
      default: []
    },
    shared_with: {
      type: Array,
      default: []
    },
    tags: {
      type: Array,
      default: []
    },
    color: {
      type: String,
      default: '#ffffff'
    }
  },
  'notes'
);

// DONE
const addNew = (data) => {
  return new Promise((success, fail) => {
    let n = new Note(data);
    n.save(err => {
      if (err) {
        console.log(err);
        return fail(err);
      }
      console.log('success');
      return success();
    });
  });
};

// DONE
const getAllByUserIDEmail = (uid, email) => {
  return new Promise((success, fail) => {
      Note.find({ $or: [{ owner: uid }, { shared_with: email }] }, (err, data) => {
          if(err) {
              return fail(err);
          }
          return success(data);
      })
  });
};

// DONE
const getAllByID = (id, uid) => {
  return new Promise((success, fail) => {
      Note.find({ _id: id, owner: uid }, (err, data) => {
          if (err) {
              return fail(err);
          }
          return success(data);
      })
  });
};

// DONE
const deleteNote = (id, uid) => {
  return new Promise((success, fail) => {
      Note.deleteOne({owner: uid, _id: id}, err => {
          if(err) {
              return fail(err);
          }
          return success();
      });
  });
};

// DONE
const updateNote = (data, id, uid) => {
  return new Promise((success, fail) => {
      Note.updateOne({owner: uid, _id: id}, data, err => {
          if(err) {
              return fail(err);
          }
          return success();
      });
  });
};

// DONE
const pinNote = (id, uid, email) => {
  return new Promise((success, fail) => {
      Note.updateOne({ _id: id, $or: [{ owner: uid }, { shared_with: email }] }, { $addToSet: { pinned_by: uid } }, err => {
          if(err) {
              return fail(err);
          }
          return success();
      });
  });
};

// DONE
const shareNote = (id, uid, email) => {
  return new Promise((success, fail) => {
      Note.updateOne({ _id: id, $or: [{ owner: uid }, { shared_with: email }] }, { $addToSet: { shared_with: email } }, err => {
          if(err) {
              return fail(err);
          }
          return success();
      });
  });
};

// DONE?
const searchNotes = (id, uid, email, search) => {
  console.log(email, search);
  return new Promise((success, fail) => {
      Note.find({ _id: id, $or: [{ owner: uid }, { shared_with: email }], $text: { $search: search } }, (err, data) => {
          if (err) {
              return fail(err);
          }
          return success(data);
      })
  });
};

module.exports = {
  addNew,
  getAllByUserIDEmail,
  getAllByID,
  deleteNote,
  updateNote,
  pinNote,
  shareNote,
  searchNotes
};