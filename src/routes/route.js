const express = require('express');
const router = express.Router();
const bookModel= require("../models/bookModel.js")
const BookController= require("../controllers/bookController")


router.post("/createAuthor", BookController.createAuthor )

// router.get("/bookList", BookController.bookList)

router.post("/createBook", BookController.createBook)

// router.post("/getParticularBooks", BookController.getParticularBooks)

router.get("/getBooksByChetanBhagat", BookController.getBooksByChetanBhagat)

router.get("/authorOfBook" , BookController.authorOfBook)

router.get("/bookbetween50_100" , BookController.bookbetween50_100 )

module.exports = router;