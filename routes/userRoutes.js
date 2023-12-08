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
router.get('/product-detail', userController.bookGetDetail);
router.get('/shoppingcart', userController.shoppingcart);
router.get('/checkout', userController.checkout);
router.get('/thankyou', userController.thankyou);

module.exports = router;
