// controllers/adminController.js
const passport = require('passport');
const UserData = require('../models/userdata');
const bcrypt = require('bcrypt');

const authController = {};

// Show admin login page
authController.showLogin = (req, res) => {
  res.render('admin-layout', {
    title: 'Admin Login',
    account: 'admin-login',
    dashboard: 'admin-dashboard',
    isAuthenticated: req.isAuthenticated(),
    errorMessage: null
  });
};

// Show user login page
authController.showUserLogin = (req, res) => {
  res.render('main-layout', {
    title: 'Home',
    content: 'sign-in',
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
      console.log('Authentication failed. Redirecting to login. ' );
      return res.render('admin-layout', {
        title: 'Admin Login',
        account: 'admin-login',
        dashboard: 'admin-dashboard',
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

authController.checkUserLogin = (req, res, next) => {
  passport.authenticate('user', (err, user, info) => {

    if (!user) {
      console.log('User not logged in. Redirecting to home.');

      return res.render('main-layout', {
        title: 'User Login',
        content: 'sign-in',
        isAuthenticated: req.isAuthenticated(),
      });
    }

    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      console.log('User successfully logged in:', user);
      // Redirect to the user dashboard upon successful login
      return res.redirect('/user/home');
    });
  })(req, res, next);
};

authController.processUserLogin = (req, res, next) => {
  passport.authenticate('user', (err, user, info) => {

    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    // In authController.processUserLogin
  if (!user) {
    console.log('Authentication failed. Redirecting to login.');
    return res.status(401).json({ success: false, errorMessage: 'Incorrect username or password.' });
  }

  req.login(user, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, errorMessage: 'Internal Server Error' });
    }

    console.log('User successfully logged in:', user);
    // Respond with a JSON object for successful login
    return res.status(200).json({ success: true });
  });

  })(req, res, next);
};


authController.showRegistrationForm = (req, res) => {
  res.render('user-layout', {
    title: 'User Registration',
    account: 'sign-in',
    content: 'register',
    isAuthenticated: req.isAuthenticated(),
    errorMessage: null
  });
};

authController.registerUser = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect('/user/home');
    }
    const { UserName, FirstName, LastName, Email, Password, confirmPassword, Address } = req.body;
    const role = 'user';
    // Check if the password is entered
    if (!Password) {
      return res.status(400).send('Password is required.');
    }
    // Check if the username is already taken
    const existingUser = await UserData.findOne({ UserName: UserName });
    if (existingUser) {
      return res.render('register', { title: 'User Registration', errorMessage: 'Username is already taken.' });
    }
    // Check if the password and confirmPassword match
    if (Password !== confirmPassword) {
      return res.render('register', {
        title: 'User Registration',
        errorMessage: 'Password and Confirm Password do not match.'
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user
    const newUser = new UserData({
      UserName: UserName,
      Password: hashedPassword,
      Role: role,
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Address: Address
    });
    console.log(newUser);
    // Save the user to the database
    await newUser.save();
    // Redirect to registration success page after successful registration
    return res.render('user-layout', {
      title: 'User Registration',
      account: 'sign-in',
      content: 'register-success',
      isAuthenticated: req.isAuthenticated(),
      errorMessage: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


authController.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/auth/adminLogin'); // Redirect to the home page or any other desired page
  });
};

authController.userLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/auth/user'); // Redirect to the home page or any other desired page
  });
};


module.exports = authController;
