const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
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
