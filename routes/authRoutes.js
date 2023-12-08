// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Display the registration form
router.get('/register', authController.showRegistrationForm);

// Handle user registration
router.post('/register', authController.registerUser);

// Log out
router.get('/logout', authController.logout);
router.get('/userLogout', authController.userLogout);


// Admin login page
router.get('/adminLogin', authController.showLogin);
router.post('/adminLogin', authController.processLogin);

// User login page
router.get('/user', authController.showUserLogin);
router.get('/userLogin', authController.checkUserLogin);
router.post('/userLogin', authController.processUserLogin);




module.exports = router;
