// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Home page
// Home page
const redirectHome = (req, res, next) => {
    res.redirect('/home');
  };
router.get('/', redirectHome);
router.get('/home', userController.dashboard);
router.get('/book-list', userController.bookList);

module.exports = router;
