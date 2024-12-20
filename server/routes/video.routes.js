import express from 'express';
import { getAllVideos, getAllVideosByUserId, getVideoById, uploadVideo } from '../controllers/video.controller.js';
import { verifyToken } from '../middleware/token.js';
const router = express.Router();

router.post('/upload', verifyToken, uploadVideo);
router.get('/all', getAllVideos);
router.get('/getVideoById/:id', getVideoById);
router.get('/channel/:userId', getAllVideosByUserId);

export default router;