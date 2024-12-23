import express from 'express';
import { deleteVideo, dislikeVideo, getAllVideos, getAllVideosByUserId, getRandomVideos, getTrendingVideos, getVideoById, getVideosByTags, increaseViewCount, likeVideo, searchVideos, uploadVideo } from '../controllers/video.controller.js';
import { verifyToken } from '../middleware/token.js';
const router = express.Router();

router.post('/upload', verifyToken, uploadVideo);
router.delete('/delete/:id', verifyToken, deleteVideo);
router.get('/all', getAllVideos);
router.get('/find/:id', getVideoById);
router.get('/channel/:channelId', getAllVideosByUserId);
router.get('/trending', getTrendingVideos);
router.get('/random', getRandomVideos);
router.get('/search', searchVideos);
router.get('/tags', getVideosByTags);
router.put('/view/:id', verifyToken, increaseViewCount);
router.put('/like/:id', verifyToken, likeVideo);
router.put('/dislike/:id', verifyToken, dislikeVideo);


export default router;