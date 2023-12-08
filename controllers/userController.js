// controllers/userController.js

const userController = {};

userController.dashboard = (req, res) => {
  // Check if the user is authenticated and the user object exists
  if (req.isAuthenticated() && req.user && req.user.UserName) {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'home',
      username: req.user.UserName,
      isAdmin: false
    });
  } else {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'home',
      username: null,
      isAdmin: false
    });
  }
};
userController.bookList = (req, res) => {
  // Check if the user is authenticated and the user object exists
  if (req.isAuthenticated() && req.user && req.user.UserName) {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'book-list',
      username: req.user.UserName,
      isAdmin: false
    });
  } else {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'sign-in',
      content: 'book-list',
      username: null,
      isAdmin: false
    });
  }
};

userController.bookGetDetail = (req, res) => {
  // Check if the user is authenticated and the user object exists
  if (req.isAuthenticated() && req.user && req.user.UserName) {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'book-detail',
      username: req.user.UserName, 
      isAdmin : null
    });
  } else {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'book-detail',
      username: null,
      isAdmin : null
    });
  }
};

userController.shoppingcart = (req, res) => {
  // Check if the user is authenticated and the user object exists
  if (req.isAuthenticated() && req.user && req.user.UserName) {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'shoppingcart',
      username: req.user.UserName, 
      isAdmin : null
    });
  } else {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'shoppingcart',
      username: null,
      isAdmin : null
    });
  }
};
userController.checkout = (req, res) => {
  // Check if the user is authenticated and the user object exists
  if (req.isAuthenticated() && req.user && req.user.UserName) {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'checkout',
      username: req.user.UserName, 
      isAdmin : null
    });
  } else {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'checkout',
      username: null,
      isAdmin : null
    });
  }
};

userController.thankyou = (req, res) => {
  // Check if the user is authenticated and the user object exists
  if (req.isAuthenticated() && req.user && req.user.UserName) {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'thankyou',
      username: req.user.UserName, 
      isAdmin : null
    });
  } else {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'thankyou',
      username: null,
      isAdmin : null
    });
  }
};

module.exports = userController;
