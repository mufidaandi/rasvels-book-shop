const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  Description: {
    type: String,
    required: true,
    maxlength: 250,
  },
  ReleaseDate: {
    type: Date,
  },
  Author: {
    type: String,
    required: true,
    maxlength: 100,
  },
  Genre: {
    type: String,
    required: true,
    maxlength: 100,
  },
  Image: {
    type: String,
    required: true,
    maxlength: 100,
  },
  Price: {
    type: Number,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  }
});

const BookData = mongoose.model('BookData', bookSchema);

module.exports = BookData;
