// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Display the registration form
router.get('/register', authController.showRegistrationForm);

// Handle user registration
router.post('/register', authController.registerUser);


// Admin login page
router.get('/adminLogin', authController.showLogin);
router.post('/adminLogin', authController.processLogin);

// User login page




module.exports = router;
