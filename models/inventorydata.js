const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
  InventoryID: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  BookID: {
    type: Number,
    required: true,
  },
  QuantityInStock: {
    type: Number,
    required: true,
  }
});

const InventoryData = mongoose.model('InventoryData', inventorySchema);

module.exports = InventoryData;
