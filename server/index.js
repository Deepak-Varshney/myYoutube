import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './connection/dbConnect.js';
import userRoutes from './routes/user.routes.js';
import videoRoutes from './routes/video.routes.js';
import commentRoutes from './routes/comment.routes.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();
dbConnect();
const app = express();
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(cookieParser());
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000 http://localhost:3000');
});