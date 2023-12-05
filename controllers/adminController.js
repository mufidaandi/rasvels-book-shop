// controllers/adminController.js
const adminController = {};
const BookData = require('../models/bookdata');

adminController.dashboard = (req, res) => {
  res.render('admin-layout', {
    title: 'Admin Dashboard',
    content: 'admin-dashboard',
    isAuthenticated: req.isAuthenticated(),
    username: req.user.username // Assuming you have a user object with username
  });
};

// adminController.bookManagement = async (req, res) => {
//    const books = await BookData.find();
//   res.render('admin-layout', {
//     title: 'Book Management',
//     content: 'admin-book-management',
//     books: books,
//     isAuthenticated: req.isAuthenticated()
//   });
// };

adminController.inventoryManagement = (req, res) => {
  res.render('admin-layout', {
    title: 'Inventory Management',
    content: 'admin-inventory-management',
    isAuthenticated: req.isAuthenticated()
  });
};

module.exports = adminController;
