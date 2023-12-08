// controllers/bookController.js
const BookData = require('../models/bookdata');
const InventoryData = require('../models/inventorydata');

const bookController = {};

// Display all books
bookController.getAllBooks = async (req, res) => {
  try {
    const books = await BookData.find();
    res.render('admin-layout', {
        title: 'Book Management',
        account: 'welcome',
        content: 'admin-book-management',
        books: books,
        isAuthenticated: req.isAuthenticated(),
        username: req.user.UserName,
        isAdmin: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Display form to add a new book
bookController.getAddBookForm = (req, res) => {
    res.render('admin-layout', {
        title: 'Book Management - Add new',
        account: 'welcome',
        content: 'admin-book-add',
        isAuthenticated: req.isAuthenticated(),
        username: req.user.UserName,
        isAdmin: true
    });
};

// Handle adding a new book
bookController.addBook = async (req, res) => {
  try {
    // Get book details from the request body
    const { title, description, releaseDate, author, genre, image, price, rating } = req.body;

    // Create a new book
    const newBook = new BookData({
      Title: title,
      Description: description,
      ReleaseDate: releaseDate,
      Author: author,
      Genre: genre,
      Image: image,
      Price: price,
      Rating: rating,
    });

    // Save the new book to the database
    await newBook.save();

    // Redirect to the list of books after adding
    res.redirect('/admin/books');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Display form to edit a book
bookController.getEditBookForm = async (req, res) => {
  try {
    const book = await BookData.findById(req.params.id);
    res.render('admin-layout', {
        title: 'Book Management - Edit',
        account: 'welcome',
        content: 'admin-book-edit',
        book: book,
        isAuthenticated: req.isAuthenticated(),
        username: req.user.UserName,
        isAdmin: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle editing a book
bookController.editBook = async (req, res) => {
  try {
    // Get updated book details from the request body
    const { title, description, releaseDate, author, genre, image, price, rating } = req.body;

    // Find the book by ID and update its details
    await BookData.findByIdAndUpdate(req.params.id, {
      Title: title,
      Description: description,
      ReleaseDate: releaseDate,
      Author: author,
      Genre: genre,
      Image: image,
      Price: price,
      Rating: rating,
    });

    // Redirect to the list of books after editing
    res.redirect('/admin/books');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle deleting a book
bookController.deleteBook = async (req, res) => {
  try {
    // Find the book by ID
    const book = await BookData.findById(req.params.id);

    // Check if the book exists
    if (!book) {
      return res.status(404).send('Book not found');
    }

    // Find and delete the corresponding inventory entries using that book's ID
    const deleteInventoryResult = await InventoryData.deleteMany({ Book: book._id });

    // Log the result of the delete operation
    console.log('Delete inventory result:', deleteInventoryResult);

    // Delete the book
    await BookData.findByIdAndDelete(req.params.id);

    // Redirect to the list of books after deleting
    res.redirect('/admin/books');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = bookController;
