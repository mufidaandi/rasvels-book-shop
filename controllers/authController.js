// controllers/adminController.js
const passport = require('passport');
const UserData = require('../models/userdata');
const bcrypt = require('bcrypt');

const authController = {};

// Show admin login page
authController.showLogin = (req, res) => {
  res.render('admin-layout', {
    title: 'Admin Login',
    content: 'admin-login',
    isAuthenticated: req.isAuthenticated(),
    errorMessage: null
  });
};

authController.processLogin = (req, res, next) => {
  passport.authenticate('admin', (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    if (!user) {
      console.log('Authentication failed. Redirecting to login.');
      return res.render('admin-layout', {
        title: 'Admin Login',
        content: 'admin-login',
        isAuthenticated: req.isAuthenticated(),
        errorMessage: 'Incorrect username or password.'  // Add an error message
      });
    }

    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      console.log('User successfully logged in:', user);
      // Redirect to the admin dashboard upon successful login
      return res.redirect('/admin/dashboard');
    });
  })(req, res, next);
};

authController.showRegistrationForm = (req, res) => {
  res.render('register', { title: 'User Registration' });
};

authController.registerUser = async (req, res) => {
  try {
    const { UserName, Password, UserID, FirstName, LastName, Email, Address } = req.body;
    const role = 'user';
    // Hash the password
    if (!Password) {
      return res.status(400).send('Password is required.');
    }
    // Check if the username is already taken
    const existingUser = await UserData.findOne({ UserName: UserName });
    if (existingUser) {
      return res.render('register', { title: 'User Registration', errorMessage: 'Username is already taken.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user
    const newUser = new UserData({
      UserName: UserName,
      Password: hashedPassword,
      Role: role,
      UserID: UserID,
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Address: Address
      // Add other user fields as needed
    });

    // Save the user to the database
    await newUser.save();

    // Redirect to login page after successful registration
    res.redirect('/adminLogin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

authController.logout = (req, res) => {
  req.logout(); // Passport's logout method
  res.redirect('/auth/adminLogin'); // Redirect to the home page or any other desired page
};

module.exports = authController;
