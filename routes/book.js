const express = require("express");
const  book = require("../controllers/book"); 
const isAdmin = require("../middleware/isAdmin"); 
const router = express.Router();


router.get('/getBooks', book.getBooks);
router.get('/getBook/:bookId', book.getBookById);
router.get("/searchBook/:query", book.searchBooks);
router.post('/addBook', isAdmin, book.addBook);
router.put('/updateBook/:bookId', isAdmin, book.updateBook);
router.delete('/deleteBook/:bookId', isAdmin, book.deleteBook);
module.exports=router;