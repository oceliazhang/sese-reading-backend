import model from "./model.js";

export const createComment = (comment) => model.create(comment);
export const findAllComments = () => model.find();
export const findCommentById = (commentId) => model.findById(commentId);
export const updateComment = (commentId, comment) =>
  model.updateOne({ _id: commentId }, { $set: comment });
export const deleteComment = (commentId) => model.deleteOne({ _id: commentId });
export const findCommentByUserId = (readerId) => model.find({ readerId: readerId });
export const findCommentByBookId = (bookId) => model.find({ bookId: bookId });