import mongoose from "mongoose";
const commentSchema = mongoose.Schema(
  {
    //_id: comment id
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
      },
    readerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    readerName: String,
    comment: {type: String},
    timestamp: {type : Date, default: Date.now},
  },
  {
    collection: "comments",
  }
);


export default commentSchema;
