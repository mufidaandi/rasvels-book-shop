const mongoose = require('mongoose');

const orderDetailsSchema = mongoose.Schema({
  Order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderData',
    required: true,
  },
  Book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookData',
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
