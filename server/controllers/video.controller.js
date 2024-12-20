import { Video } from '../models/video.model.js';

export const uploadVideo = async (req, res) => {
    try {
        const { title, description, videoLink, videoType, thumbnail, user } = req.body;
        const video = new Video({ title, description, videoLink, videoType, thumbnail, user: req.user._id });
        await video.save();
        res.status(201).json({ message: 'Video uploaded successfully', success: true, data: video });

    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const getAllVideos = async (req, res) => {
    try {

        const videos = await Video.find().populate('user', 'username channelName profilePicture');
        res.status(201).json({ message: 'Videos fetched successfully', success: true, data: videos });

    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const getVideoById = async (req, res) => {
    try {
        let {id} = req.params
        const video = await  Video.findById(id).populate('user', 'username channelName profilePicture createdAt');
        res.status(201).json({ message: 'Video fetched successfully', success: true, data: video });
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const getAllVideosByUserId = async (req, res) => {
    try {
        let {userId} = req.params;
        const videos = await  Video.find({user: userId}).populate('user', 'username channelName profilePicture about');
        res.status(201).json({ message: 'Videos fetched successfully', success: true, data: videos });
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}