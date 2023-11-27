const express = require('express');
const mongoose = require('mongoose');


const isAdmin = (req, res, next) => {
    const userType = req.headers['user-type'];
    if (userType === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized. Only admin can perform this operation.' });
    }
};

module.exports = isAdmin;