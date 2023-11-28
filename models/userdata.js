const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  UserID: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  UserName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  FirstName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  LastName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  Email: {
    type: String,
    required: true,
    maxlength: 100,
  },
  Password: {
    type: String,
    required: true,
    maxlength: 100,
  },
  Address: {
    type: String,
    required: true,
    maxlength: 100,
  },
  Role: {
    type: String,
    required: true,
    maxlength: 10,
  }
});

const UserData = mongoose.model('UserData', userSchema);

module.exports = UserData;
