const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  bookId: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 250,
  },
  author: {
    type: String,
    required: true,
    maxlength: 100,
  },
  genre: {
    type: String,
    required: true,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  }
});

const BookData = mongoose.model('BookData', bookSchema);

module.exports = BookData;
