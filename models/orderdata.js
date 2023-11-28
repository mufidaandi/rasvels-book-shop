const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  OrderID: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  CustomerID: {
    type: Number,
    required: true,
    maxlength: 10,
  },
  OrderDate: {
    type: Date,
    required: true,
  },
  OrderStatus: {
    type: String,
    required: true,
    maxlength: 50,
  }
});

const OrderData = mongoose.model('OrderData', orderSchema);

module.exports = OrderData;
