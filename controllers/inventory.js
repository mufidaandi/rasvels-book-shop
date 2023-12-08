// orderController.js
const express = require('express');
const mongoose = require('mongoose');
const InventoryData = require('../models/inventorydata.js');
// Add inventory
const addInventory = async (req, res) => {
  const { InventoryID, BookID, QuantityInStock } = req.body;

  try {
    const inventoryItem = new InventoryData({
      InventoryID,
      BookID,
      QuantityInStock,
    });

    await inventoryItem.save();

    res.json({ message: 'Inventory added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get inventory
const getInventory = async (req, res) => {
  try {
    const inventory = await InventoryData.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Getting invetory by ID
const getInventoryById = async (req, res) => {
  try {
      const InventoryID = req.params._id;
      const inventory = await InventoryData.findOne({ InventoryID });
      if (inventory) {
          res.status(200).json(inventory);
      } else {
          res.status(404).json({ message: 'Inventory not found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Update inventory
const updateInventory = async (req, res) => {
  const { BookID, QuantityInStock } = req.body;

  try {
    const updateInventory = await InventoryData.findOneAndUpdate(
        { BookID },
        { QuantityInStock },
        { new: true }
    );

    if (updateInventory) {
        res.status(200).json(updateInventory);
    } else {
        res.status(404).json({ message: 'BookID not found' });
    }
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

module.exports.addInventory = addInventory;
module.exports.getInventory = getInventory;
module.exports.getInventoryById = getInventoryById;
module.exports.updateInventory = updateInventory;