import express from 'express';
import { addComment, getAllCommentsByVideoId } from '../controllers/comment.controller.js';
import { verifyToken } from '../middleware/token.js';

const router = express.Router();

router.post('/addComment', verifyToken, addComment)
router.get('/video/:videoId', getAllCommentsByVideoId)

export default router;