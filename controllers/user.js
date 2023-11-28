const express = require('express');
const mongoose = require('mongoose');

const UserData = require('../models/userdata.js');

//Create a user
const createUser = async (req, res) => {
    const { UserID, UserName, FirstName, LastName, Email, Password, Address, Role } = req.body;

    try {
         // Check if a user is existing
         const existingUser = await UserData.findOne({ UserName});

         if (existingUser) {
             return res.status(400).json({ message: 'User with the same UserName already exists' });
         }

         const newUserData = new UserData({
            UserID, 
            UserName, 
            FirstName, 
            LastName, 
            Email, 
            Password, 
            Address, 
            Role
        });

        await newUserData.save();
        res.status(201).json(newUserData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Update user
const updateUser = async (req, res) => {
    const UserID = req.params.UserID;
    const { UserName, FirstName, LastName, Email, Password, Address, Role} = req.body;

    try {
        const updatedUser = await UserData.findOneAndUpdate(
            { UserID },
            { UserName, FirstName, LastName, Email, Password, Address, Role },
            { new: true }
        );

        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports.createUser = createUser;
module.exports.updatedUser = updateUser;
