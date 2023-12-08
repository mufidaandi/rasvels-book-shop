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

module.exports = userController;
