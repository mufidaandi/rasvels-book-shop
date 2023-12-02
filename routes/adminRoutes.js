// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');


// Admin dashboard page
router.get('/dashboard', authMiddleware.isAdmin, (req, res) => {
    res.render('admin-layout', {
      title: 'Admin Dashboard', // Set the title here
      content: 'admin-dashboard',
      isAuthenticated: req.isAuthenticated()
    });
  });
  
// Admin book management page
router.get('/book-management', authMiddleware.isAdmin, (req, res) => {
  res.render('admin-layout', {
    title: 'Book Management', // Set the title here
    content: 'admin-book-management',
    isAuthenticated: req.isAuthenticated()
  });
});

// Admin inventory management page
router.get('/inventory-management', authMiddleware.isAdmin, (req, res) => {
  res.render('admin-layout', {
    title: 'Inventory Management', // Set the title here
    content: 'admin-inventory-management',
    isAuthenticated: req.isAuthenticated()
  });
});

  

module.exports = router;
