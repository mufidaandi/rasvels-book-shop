const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  bookId: {
    type: Number, // Use Number for integer values
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Use Number for double values
    required: true,
  },
});

const BookData = mongoose.model('BookData', bookSchema);

module.exports = BookData;
