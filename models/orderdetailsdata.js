const mongoose = require('mongoose');

const orderDetailsSchema = mongoose.Schema({
  OrderDetailID: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    maxlength: 10,
  },
  OrderID: {
    type: Number,
    required: true,
    maxlength: 10,
  },
  BookID: {
    type: Number,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
    maxlength: 10,
  },
  Price: {
    type: Number,
    required: true,
    maxlength: 10,
  },
});

const OrderDetailsData = mongoose.model('OrderDetailsData', orderDetailsSchema);

module.exports = OrderDetailsData;
