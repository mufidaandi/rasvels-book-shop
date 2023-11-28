const express = require("express");
const book = require("../controllers/book"); 
const user = require("../controllers/user"); 
const order = require("../controllers/order"); 
const router = express.Router();


router.get('/getBooks', book.getBooks);
router.get('/getBook/:BookID', book.getBookById);
router.get("/searchBook/:query", book.searchBooks);
router.post('/addBook', book.addBook);
router.put('/updateBook/:BookID', book.updateBook);
router.delete('/deleteBook/:BookID',book.deleteBook);
router.post('/createUser', user.createUser);
router.put('/updateUser/:UserID',user.updatedUser);
router.post('/placeAnOrder', order.placeAnOrder);
module.exports=router;