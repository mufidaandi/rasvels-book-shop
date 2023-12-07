// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const bookController = require('../controllers/bookController');
const inventoryController = require('../controllers/inventoryController');

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
router.get('/inventory-management', authMiddleware.isAdmin, inventoryController.getAllInventoryItems);
// Display form to add a new inventory
router.get('/inventory/add', authMiddleware.isAdmin, inventoryController.getAddStockForm);
// Handle adding a new inventory
router.post('/inventory/add', authMiddleware.isAdmin, inventoryController.addStock);
// Display form to edit an inventory
router.get('/inventory/edit/:id', authMiddleware.isAdmin, inventoryController.getEditInventoryForm);
// Handle editing an inventory
router.post('/inventory/edit/:id', authMiddleware.isAdmin, inventoryController.editInventory);
// Handle deleting an inventory
router.get('/inventory/delete/:id', authMiddleware.isAdmin, inventoryController.deleteInventory);

module.exports = router;
