const express = require("express");
const booksRouter = express.Router();
const {requireUser} = require('./utils')
const bodyParser = require("body-parser");


const {
    createBook,
    getAllBooks,
    getBookById,
    getBooksByUser,
    updateBook,
    deleteBook
} = require('../db');


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

booksRouter.use(bodyParser.json());
booksRouter.use( (req, res, next) => {
  console.log("A request is being made to /books");
  next(); 
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// POST /api/books == create a new book

booksRouter.post('/', async (req, res, next) => {
    const { title, author, year, imageurl} = req.body;
    console.log('at api', req.body);
    const bookData = req.body;
    
    try {
      const book = await createBook(bookData);
      
      if (book) {
        console.log('at book in api', book);
        res.send({ book });
      } else {
        next({
          name: 'CreateBookError',
          message: 'There was an error creating this book!'
        });
      };
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// GET /api/books == get all books

  booksRouter.get('/', async (req, res, next) => {
    try {
    const books = await getAllBooks();
    res.send({
      books
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// GET /api/books/:bookId == get book by id

booksRouter.get('/:bookId', async (req, res, next) => {
    const { bookId } = req.params;
    try {
        const book = await getBookById(bookId);
        res.send(book);
    } catch ({ name, message }) {
      next({ name, message });
    }
});


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// GET /api/books/:userId == get books by user

booksRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    try {
        const books = await getBooksByUser(userId);
        res.send(books);
    } catch ({ name, message }) {
      next({ name, message });
    }
});


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// PATCH /api/books/:bookId == update a book

booksRouter.patch('/:bookId', requireUser, async (req, res, next) => {
    const { bookId } = req.params;
    console.log('bookId api patch:',bookId);
     
     try {
    const { title, author, genre, year } = req.body;
    const updateFields = {bookId};
    
    if (title) {
        updateFields.title = title;
    }
    if (author) {
        updateFields.author = author;
    }
    if (genre) {
        updateFields.genre = genre;
    }
    if (year) {
        updateFields.year = year;
    }
    const updatedBook = await updateBook(bookId, updateFields);
    res.send(updatedBook);
    } catch ({ name, message }) {
    next({ name, message });
    }
    });

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DELETE /api/books/:bookId == delete a book

booksRouter.delete('/:bookId', requireUser, async (req, res, next) => {
    const { bookId } = req.params;
    try {
        const deletedBook = await deleteBook(bookId);
        res.send(deletedBook);
    } catch ({ name, message }) {
        next({ name, message });
    }
    });


module.exports = booksRouter;