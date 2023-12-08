const express = require('express');
const mongoose = require('mongoose');

const BookData = require('../models/bookdata.js');

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
        const BookID = req.params._id;
        const bookData = await BookData.findOne({ BookID });
        if (bookData) {
            res.status(200).json(bookData);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Getting books by Genre
const getBookByGenre = async (req, res) => {
    try {
        const query = req.params.query;
        const books = await BookData.find({
            $or: [
                { Genre: { $regex: query, $options: "i" } }
            ],
        });

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Searching book by Title, Author or Genre
const searchBooks = async (req, res) => {
    try {
        const query = req.params.query;
        const books = await BookData.find({
            $or: [
                { Title: { $regex: query, $options: "i" } }, // Case-insensitive Title search
                { Author: { $regex: query, $options: "i" } }, // Case-insensitive Author search
                { Genre: { $regex: query, $options: "i" } }, // Case-insensitive Genre search
            ],
        });

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Adding book
const addBook = async (req, res) => {
    const { BookID, Title, Description, ReleaseDate, Author, Genre, Image, Price, Rating } = req.body;

    try {
         // Check if a book with the same Title and Author already exists
         const existingBook = await BookData.findOne({ Title, Author });

         if (existingBook) {
             return res.status(400).json({ message: 'Book with the same Title and Author already exists' });
         }

         const newBookData = new BookData({
            BookID,
            Title,
            Description,
            ReleaseDate,
            Author,
            Genre,
            Image,
            Price,
            Rating
        });

        await newBookData.save();
        res.status(201).json(newBookData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Updating book
const updateBook = async (req, res) => {
    const BookID = req.params._id;
    const { Title, Description, ReleaseDate, Author, Genre, Image, Price, Rating} = req.body;

    try {
        const updatedBook = await BookData.findOneAndUpdate(
            { BookID },
            { Title, Description, ReleaseDate, Author, Genre, Image, Price, Rating },
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
    const BookID = req.params._id;

    try {
        const deletedBook = await BookData.findOneAndDelete({ BookID });

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
module.exports.getBookByGenre = getBookByGenre;
module.exports.searchBooks = searchBooks;
module.exports.addBook = addBook;
module.exports.updateBook = updateBook;
module.exports.deleteBook = deleteBook;
