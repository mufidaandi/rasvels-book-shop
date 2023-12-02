const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    enum: ['user', 'admin'],
    default: 'user',
    required: true,
    maxlength: 10
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.Password);
  } catch (err) {
    throw err;
  }
};

const UserData = mongoose.model('UserData', userSchema);

module.exports = UserData;
