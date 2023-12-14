import express from 'express';
import multer from 'multer';
import * as dao from './dao.js'; // this DAO for database operations
import { Book } from './model.js'; 

// Set up memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function BookRoutes(app) {
  const createBook = async (req, res) => {
    try {
      const { title, author, introduction } = req.body;
      let newBook = {
        title,
        author,
        introduction,
      };
      // If there's a file uploaded, handle it
      if (req.file) {
        const coverImageBase64 = req.file.buffer.toString('base64');
        newBook.coverImage = coverImageBase64;
      }
      const book = await Book.create(newBook); // Directly using Book model
      res.status(201).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating the book', error: error.message });
    }
  };

  const findBooksByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const books = await dao.findBooksByAuthor(userId);
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving books', error: error.message });
    }
  };

  // Other CRUD operations
  const deleteBook = async (req, res) => {
    const status = await dao.deleteBook(req.params.bookId);
    res.json(status);
  };

  const findAllBooks = async (req, res) => {
    const books = await dao.findAllBooks();
    res.json(books);
  };

  const findBookById = async (req, res) => {
    const book = await dao.findBookById(req.params.bookId);
    res.json(book);
  };

  const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const status = await dao.updateBook(bookId, req.body);
    res.json(status);
  };

  // Route setup
  app.post('/api/books', upload.single('coverImage'), createBook);
  app.get('/api/books', findAllBooks);
  app.get('/api/books/:bookId', findBookById);
  app.put('/api/books/:bookId', updateBook);
  app.delete('/api/books/:bookId', deleteBook);
  app.get('/api/books/author/:userId', findBooksByUserId);

}

export default BookRoutes;
