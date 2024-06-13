const express = require('express');
const router = express.Router();
const books = require('../controller/books.controller')
const Auth = require('../middleware/auth')
router.post('/add/book',Auth ,books.addBooks)
router.put('/:id',Auth , books.updateBooks)
router.delete('/:id',Auth , books.deleteBooks)
router.get('/get/books',Auth , books.getBooks)

module.exports = router;