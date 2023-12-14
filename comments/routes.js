// Initialize express router
import * as dao from "./dao.js";
function CommentRoutes(app) {
  const createComment = async (req, res) => {
    const comment = await dao.createComment(req.body);
    console.log(req);
    console.log(req.body);
    //console.log(comment);
    res.json(comment);
  };
  const deleteComment = async (req, res) => {
    const status = await dao.deleteComment(req.params.commentId);
    res.json(status);
  };
  const findAllComments = async (req, res) => {
    const comment = await dao.findAllComments();
    res.json(comment);
  };
  const findCommentByBookId = async (req, res) => {
    const bookId = req.query?.bookId;
    if (bookId) {
        const comment = await dao.findCommentByBookId(bookId);
        res.json(comment);
    } else {
        res.json({});
    }    
  };
  const findCommentByUserId = async (req, res) => {
    try {
        const readerId = req.query?.readerId;
        if (readerId) {
            const comment = await dao.findCommentByUserId(readerId);
            res.json(comment);
        } else {
            res.json({});
        }
    } catch (error) {
        console.error("Error in findCommentByUserId:", error);
        res.json({});
      }
    
  };
  const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const status = await dao.updateComment(commentId, req.body);
    res.json(status);
  };
  app.post("/api/comments", createComment);
  app.get("/api/comments/book", findCommentByBookId);
  app.get("/api/comments/user", findCommentByUserId);
  app.get("/api/comments", findAllComments );
  app.delete("/api/comments/:commentId", deleteComment);
}
export default CommentRoutes;
