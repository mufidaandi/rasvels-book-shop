// controllers/userController.js

const userController = {};

userController.dashboard = (req, res) => {
  // Check if the user is authenticated and the user object exists
  if (req.isAuthenticated() && req.user && req.user.UserName) {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'home',
      username: req.user.UserName
    });
  } else {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'home',
      username: null
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
      username: req.user.UserName
    });
  } else {
    res.render('main-layout', {
      title: 'Home',
      welcome: 'welcome',
      content: 'book-list',
      username: null
    });
  }
};

module.exports = userController;
