const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
  InventoryID: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  Book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookData',
    required: true,
  },
  QuantityInStock: {
    type: Number,
    required: true,
  }
});

const InventoryData = mongoose.model('InventoryData', inventorySchema);

module.exports = InventoryData;
