import express from 'express';
import { addComment, deleteComment, editComment, getAllCommentsByVideoId } from '../controllers/comment.controller.js';
import { verifyToken } from '../middleware/token.js';

const router = express.Router();

router.post('/add', verifyToken, addComment)
router.get('/video/:videoId', getAllCommentsByVideoId)
router.put('/edit/:commentId', verifyToken, editComment)
router.delete('/delete/:commentId', verifyToken, deleteComment)

export default router;