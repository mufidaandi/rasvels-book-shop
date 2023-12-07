// controllers/inventoryController.js
const InventoryData = require('../models/inventorydata');
const BookData = require('../models/bookdata');

const inventoryController = {};

// Display all inventory
inventoryController.getAllInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await InventoryData.find().populate('Book');
    res.render('admin-layout', {
        title: 'Inventory Management',
        account: 'welcome',
        content: 'admin-inventory-management',
        inventory: inventoryItems,
        isAuthenticated: req.isAuthenticated(),
        username: req.user.UserName// Assuming you have a user object with username
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Display form to add an inventory item
inventoryController.getAddStockForm = async (req, res) => {
  try {
    const books = await BookData.find();
    res.render('admin-layout', {
      title: 'Inventory Management - Add Stock',
      account: 'welcome',
      content: 'admin-inventory-add',
      books: books,
      isAuthenticated: req.isAuthenticated(),
      username: req.user.UserName// Assuming you have a user object with username
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle adding stock for an existing book
inventoryController.addStock = async (req, res) => {
  try {
    // Get inventory details from the request body
    const { bookID, quantity } = req.body;

    // Check if the book with the given ID exists
    const book = await BookData.findById(bookID);
    if (!book) {
      return res.status(404).send('Book not found');
    }

    // Access the _id of the selected book
    const bookObjectId = book._id;

    // Create a new inventory entry
    const newInventory = new InventoryData({
      Book: bookObjectId,
      QuantityInStock: quantity,
    });

    // Save the new inventory entry to the database
    await newInventory.save();

    // Redirect to the list of inventory items after adding stock
    res.redirect('/admin/inventory-management');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Display form to edit an inventory item
inventoryController.getEditInventoryForm = async (req, res) => {
  try {
    const inventoryItem = await InventoryData.findById(req.params.id).populate('Book');
    const books = await BookData.find();
    res.render('admin-layout', {
      title: 'Inventory Management - Edit Stock',
      account: 'welcome',
      content: 'admin-inventory-edit',
      inventoryItem: inventoryItem,
      books: books,
      isAuthenticated: req.isAuthenticated(),
      username: req.user.UserName// Assuming you have a user object with username
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle editing an inventory item
inventoryController.editInventory = async (req, res) => {
  try {
    // Get updated inventory details from the request body
    const { bookID, quantity } = req.body;

    // Check if the inventory item with the given ID exists
    const inventoryItem = await InventoryData.findById(req.params.id);
    if (!inventoryItem) {
      return res.status(404).send('Inventory not found');
    }

    // Convert the provided bookID to ObjectId
    const book = await BookData.findById(bookID);
    if (!book) {
      return res.status(404).send('Book not found');
    }

    // Access the _id of the selected book
    const bookObjectId = book._id;

    // Update the inventory item by ID
    inventoryItem.Book = bookObjectId;
    inventoryItem.QuantityInStock = quantity;

    // Save the updated inventory item to the database
    await inventoryItem.save();

    // Redirect to the list of inventory items after editing
    res.redirect('/admin/inventory-management');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


// Handle deleting an inventory item
inventoryController.deleteInventory = async (req, res) => {
  try {
    // Find the inventory item by ID and delete it
    await InventoryData.findByIdAndDelete(req.params.id);

    // Redirect to the list of inventory items after deleting
    res.redirect('/admin/inventory-management');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = inventoryController;
