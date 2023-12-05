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
  res.render('register', { title: 'User Registration', errorMessage:'' });
};

authController.registerUser = async (req, res) => {
  try {
    console.log(req.isAuthenticated);
    if(req.isAuthenticated()){
      return res.redirect('/home');
    }
    console.log('hehe');
    const { userid, username, firstname, lastname, email, password, confirmPassword, address } = req.body;
    const role = 'user';
    // Hash the password
    if (!password) {
      return res.status(400).send('Password is required.');
    }
    // Check if the username is already taken
    const existingUser = await UserData.findOne({ UserName: username });
    if (existingUser) {
      return res.render('register', { title: 'User Registration', errorMessage: 'Username is already taken.' });
    }
    // Check if the username is already taken
    const existingUser2 = await UserData.findOne({ UserID: userid });
    if (existingUser2) {
      return res.render('register', { title: 'User Registration', errorMessage: 'UserID is already taken.' });
    }
    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      return res.render('register', {
        title: 'User Registration',
        errorMessage: 'Password and Confirm Password do not match.'
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserData({
      UserName: username,
      Password: hashedPassword,
      Role: role,
      UserID: userid,
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      Address: address
      // Add other user fields as needed
    });

    // Save the user to the database
    await newUser.save();

    // Redirect to registration success page after successful registration
    return res.render('register-success', { title: 'Registration Successful' });
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
