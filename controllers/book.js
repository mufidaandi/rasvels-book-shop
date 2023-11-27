const express = require('express');
const mongoose = require('mongoose');

const BookData = require('../models/bookdata.js');
const isAdmin = require('../middleware/isAdmin'); 

//Getting list of books
const getBooks = async (req, res) => {
    try {
        const books = await BookData.find();

        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Getting book by ID
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

//Searching book by title, author or genre
const searchBooks = async (req, res) => {
    try {
        const query = req.params.query;
        const books = await BookData.find({
            $or: [
                { title: { $regex: query, $options: "i" } }, // Case-insensitive title search
                { author: { $regex: query, $options: "i" } }, // Case-insensitive author search
                { genre: { $regex: query, $options: "i" } }, // Case-insensitive genre search
            ],
        });

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Adding book
const addBook = async (req, res) => {
    const { bookId, title, description, author, genre, price, rating } = req.body;

    try {
         // Check if a book with the same title and author already exists
         const existingBook = await BookData.findOne({ title, author });

         if (existingBook) {
             return res.status(400).json({ message: 'Book with the same title and author already exists' });
         }

         const newBookData = new BookData({
            bookId,
            title,
            description,
            author,
            genre,
            price,
            rating
        });

        await newBookData.save();
        res.status(201).json(newBookData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Updating book
const updateBook = async (req, res) => {
    const bookId = req.params.bookId;
    const { title, description, author, genre, price, rating} = req.body;

    try {
        const updatedBook = await BookData.findOneAndUpdate(
            { bookId },
            { title, description, author, genre, price, rating },
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

//Deleting book
const deleteBook = async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const deletedBook = await BookData.findOneAndDelete({ bookId });

        if (deletedBook) {
            res.status(200).json({ message: 'Book removed successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getBooks = getBooks;
module.exports.getBookById = getBookById;
module.exports.searchBooks = searchBooks;
module.exports.addBook = addBook;
module.exports.updateBook = updateBook;
module.exports.deleteBook = deleteBook;
