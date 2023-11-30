const express = require('express');
const mongoose = require('mongoose');

const OrderData = require('../models/orderdata.js');
const OrderDetailsDataModel = require('../models/orderdetailsdata.js');
const InventoryData = require('../models/inventorydata.js');

//Place an order
// Place an order
const placeAnOrder = async (req, res) => {
  const { OrderID, UserID, OrderDate, OrderStatus, OrderDetails } = req.body;

  try {
    // Moved the order creation inside the loop
    let orderID;

    if (Array.isArray(OrderDetails)) {
      for (const detail of OrderDetails) {
        const { OrderDetailID, BookID, Quantity, Price } = detail;

        // Check if there is enough inventory before placing the order
        const inventoryItem = await InventoryData.findOne({ BookID });
        if (!inventoryItem || inventoryItem.QuantityInStock < Quantity) {
          return res.status(400).json({ error: `Not enough stock for BookID: ${BookID}` });
        }

        // Update inventory quantity
        inventoryItem.QuantityInStock -= Quantity;
        await inventoryItem.save();

        const newOrder = new OrderData({
          OrderID,
          UserID,
          OrderDate,
          OrderStatus,
        });

        const savedOrder = await newOrder.save();

        // Store the order ID for the response
        orderID = savedOrder.OrderID;

        const newOrderDetail = new OrderDetailsDataModel({
          OrderDetailID,
          OrderID: orderID,
          BookID,
          Quantity,
          Price,
        });

        await newOrderDetail.save();
      }
    }

    res.json({ message: 'Order placed successfully', orderID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.placeAnOrder = placeAnOrder;
