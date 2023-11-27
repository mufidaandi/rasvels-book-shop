const express = require('express');
const mongoose = require('mongoose');

const BookData = require('../models/bookdata.js');
const isAdmin = require('../middleware/isAdmin'); 


const getBooks = async (req, res) => {
    try {
        const books = await BookData.find();

        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const boookId = req.query.bookId;
        const bookData = await BookData.findOne({ boookId });
        if (bookData) {
            res.status(200).json(bookData);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addBook = async (req, res) => {
    const { bookId, title, author, genre, price } = req.body;

    const newBookData = new BookData({
        bookId,
        title,
        author,
        genre,
        price
    });

    try {
        await newBookData.save();
        res.status(201).json(newBookData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateBook = async (req, res) => {
    const bookId = req.params.title;
    const { title, author, genre, price } = req.body;

    try {
        const updatedBook = await BookData.findOneAndUpdate(
            { bookId },
            { title, author, genre, price },
            { new: true }
        );

        if (updatedBook) {
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const deletedBook = await BookData.findOneAndDelete({ bookId });

        if (deletedBook) {
            res.status(200).json({ message: 'Book removed successfully' });
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getBooks = getBooks;
module.exports.getBookById = getBookById;
module.exports.addBook = addBook;
module.exports.updateBook = updateBook;
module.exports.deleteBook = deleteBook;
