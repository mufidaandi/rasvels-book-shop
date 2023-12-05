// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const bookController = require('../controllers/bookController');

// Admin dashboard page
router.get('/dashboard', authMiddleware.isAdmin, adminController.dashboard);

// Admin book management page
router.get('/books', authMiddleware.isAdmin, bookController.getAllBooks);
// Display form to add a new book
router.get('/books/add', authMiddleware.isAdmin, bookController.getAddBookForm);
// Handle adding a new book
router.post('/books/add', authMiddleware.isAdmin, bookController.addBook);

router.get('/books/add', authMiddleware.isAdmin, bookController.addBook);
// Display form to edit a book
router.get('/books/edit/:id', authMiddleware.isAdmin, bookController.getEditBookForm);
// Handle editing a book
router.post('/books/edit/:id', authMiddleware.isAdmin, bookController.editBook);
// Handle deleting a book
router.get('/books/delete/:id', authMiddleware.isAdmin, bookController.deleteBook);


// Admin inventory management page
router.get('/inventory-management', authMiddleware.isAdmin, adminController.inventoryManagement);

module.exports = router;
