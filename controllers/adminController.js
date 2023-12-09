// controllers/adminController.js
const adminController = {};

adminController.dashboard = (req, res) => {
  res.render('admin-layout', {
    title: 'Admin Dashboard',
    account: 'welcome',
    content: 'admin-dashboard',
    isAuthenticated: req.isAuthenticated(),
    username: req.user.UserName,
    isAdmin: true
  });
};

adminController.inventoryManagement = (req, res) => {
  res.render('admin-layout', {
    title: 'Inventory Management',
    account: 'welcome',
    content: 'admin-inventory-management',
    isAuthenticated: req.isAuthenticated(),
    username: req.user.UserName
  });
};

module.exports = adminController;
