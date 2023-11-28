const express = require('express');
const mongoose = require('mongoose');

const OrderData = require('../models/orderdata.js');

//Place an order
const placeAnOrder = async (req, res) => {
    const { OrderID, CustomerID, OrderDate, OrderStatus } = req.body;

    try {
         // Check if an order is existing
         const existingOrder = await OrderData.findOne({ OrderID});

         if (existingOrder) {
             return res.status(400).json({ message: 'Order already exists' });
         }

         const newOrderData = new OrderData({
            OrderID, 
            CustomerID, 
            OrderDate, 
            OrderStatus
        });

        await newOrderData.save();
        res.status(201).json(newOrderData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports.placeAnOrder = placeAnOrder;
