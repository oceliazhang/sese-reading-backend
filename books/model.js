import mongoose from "mongoose";
import bookSchema from "./schema.js";

const Book = mongoose.model("Book", bookSchema); // Ensure the model name is "Book" not "books"
export { Book }; // Use named export for consistency
