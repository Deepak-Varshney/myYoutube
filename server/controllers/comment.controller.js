import {Comment} from '../models/comment.model.js';

export const addComment = async (req, res) => {
    try {
        const {message, video} = req.body;
        const newComment = new Comment({message, video, user: req.user._id});
        await newComment.save();
        res.status(201).json({message: 'Comment added successfully', success: true, data: newComment});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
}

export const getAllCommentsByVideoId = async (req, res) => {
    try {
        let {videoId} = req.params;
        const comments = await  Comment.find({video: videoId}).populate('user', 'username channelName profilePicture');
        res.status(201).json({ message: 'Comments fetched successfully', success: true, data: comments });
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}