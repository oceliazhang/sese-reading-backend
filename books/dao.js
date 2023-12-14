import { Book as model } from "./model.js";

export const createBook = (book) => model.create(book);
export const findAllBooks = () => model.find();
export const findBookById = (bookId) => model.findById(bookId);
export const updateBook = (bookId, book) =>
  model.updateOne({ _id: bookId }, { $set: book });
export const deleteBook = (bookId) => model.deleteOne({ _id: bookId });
export const findBooksByAuthor = (authorId) => {
  return model.find({ author: authorId }).populate('author'); // 'author' is a reference to the 'users' collection
};
