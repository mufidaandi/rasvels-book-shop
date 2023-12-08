// controllers/userController.js

const userController = {};

userController.dashboard = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("main-layout", {
      title: "Home",
      content: "welcome",
      isAuthenticated: req.isAuthenticated(),
      username: req.user.UserName,
      isAdmin: false,
    });
  } else {
    res.render("main-layout", {
      title: "Home",
      content: "sign-in",
      isAuthenticated: req.isAuthenticated(),
      isAdmin: false,
    });
  }
};

module.exports = userController;
