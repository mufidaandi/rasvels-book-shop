// controllers/userController.js

const userController = {};

userController.dashboard = (req, res) => {
  res.render('main-layout', {
    title: 'Home',
    content: 'welcome',
    isAuthenticated: req.isAuthenticated(),
    username: req.user.UserName // Assuming you have a user object with username
  });
};

module.exports = userController;
