// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Home page
router.get('/home', userController.dashboard);


module.exports = router;
