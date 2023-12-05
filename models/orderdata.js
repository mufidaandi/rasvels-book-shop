const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserData',
    required: true,
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
