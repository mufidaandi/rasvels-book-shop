// controllers/adminController.js
const adminController = {};
const BookData = require('../models/bookdata');

adminController.dashboard = (req, res) => {
  res.render('admin-layout', {
    title: 'Admin Dashboard',
    account: 'welcome',
    content: 'admin-dashboard',
    isAuthenticated: req.isAuthenticated(),
    username: req.user.UserName,
    isAdmin: true
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
    account: 'welcome',
    content: 'admin-inventory-management',
    isAuthenticated: req.isAuthenticated(),
    username: req.user.UserName
  });
};

module.exports = adminController;
