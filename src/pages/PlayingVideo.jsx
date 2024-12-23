import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { BiLike, BiDislike ,BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestedVideo from "../components/SuggestedVideo";
import axios from "axios";
import { format } from "timeago.js";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { useSelector } from "react-redux";
function PlayingVideo() {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    fetchVideoDetails();
  }, [id]);

  const fetchVideoDetails = async () => {
    const res = await axios.get(`/api/videos/find/${id}`);
    setVideo(res.data.video);
    // Fetch related videos
    // const relatedRes = await axios.get(`/api/videos/related/${id}`);
    // setRelatedVideos(relatedRes.data.videos);
    // Fetch comments
    const commentsRes = await axios.get(`/api/comments/video/${id}`);
    console.log(commentsRes)
    setComments(commentsRes.data.comments);
    // Check if the user has liked or disliked the video
    setLiked(res.data.video.likes.includes(currentUser._id));
    setDisliked(res.data.video.dislikes.includes(currentUser._id));

  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const res = await axios.post(`/api/comments/add/${id}/`, { message: newComment });
      window.location.reload();
      setComments([res.data.comment, ...comments]);
      setNewComment("");
      setIsCommenting(false);
    }
  };

  const handleCancelComment = () => {
    setNewComment("");
    setIsCommenting(false);
  };
  
  // Liking and Disliking Video
  const handleLike = async () => {
    if (!currentUser) {
      alert("Login to like a video")
      return;

    }
    else {

      if (liked) {
        return; // Don't allow like if it's already liked
      }
      try {
        await axios.put(`/api/videos/like/${id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
        setLiked(true);
        setDisliked(false); // Remove dislike if already disliked
      } catch (err) {
        console.error("Error liking video", err);
      }
    };
  }

  const handleDislike = async () => {
    if (!currentUser) {
      alert("Login to dislike a video")
      return;

    } else {
      if (disliked) {
        return; // Don't allow dislike if it's already disliked
      }
      try {
        await axios.put(`/api/videos/dislike/${id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
        setDisliked(true);
        setLiked(false); // Remove like if already liked
      } catch (err) {
        console.error("Error disliking video", err);
      }
    }

  };

  // Subscribing and Unsubscribing to Channel
  const handleSubscribe = async () => {
    if (!currentUser){
      alert("Login to subsribe a channel")
      return;
    }
      
     else {

      if (subscribed) return; // Already subscribed
    try {
      await axios.put(`/api/users/subscribe/${video?.user._id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
      setSubscribed(true);
    } catch (err) {
      console.error("Error subscribing", err);
    }
    }

    
  };

  const handleUnsubscribe = async () => {
    if (!subscribed) return; // Already unsubscribed
    try {
      await axios.put(`/api/users/unsubscribe/${video?.user._id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
      setSubscribed(false);
    } catch (err) {
      console.error("Error unsubscribing", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 mt-12">
      {/* Left column - Video Player and Info */}
      <div className="lg:w-8/12">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black">
          <ReactPlayer
            url={`${video?.videoLink}` || ""}
            height="100%"
            width="100%"
            controls
            style={{ backgroundColor: "#000000" }}
            playing={true}
          />
        </div>

        {/* Video Info */}
        <div className="mt-4">
          <h1 className="text-xl font-bold">{video?.title}</h1>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600">{video?.views} views • {format(video?.createdAt)}</span>
            <div className="flex gap-4">
              <button onClick={handleLike} className="flex items-center gap-1">
                {liked ? <BiSolidLike className={`text-xl}`} /> : <BiLike className={`text-xl}`} />}
                <span>{abbreviateNumber(video?.likes?.length, 2)}</span>
              </button>

              <button onClick={handleDislike} className="flex items-center gap-1">
               
              {disliked ? <BiSolidDislike className={`text-xl}`} /> : <BiDislike className={`text-xl}`} />}
                <span>{abbreviateNumber(video?.dislikes?.length, 2)}</span>
              </button>
              <button className="flex items-center gap-1">
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex items-center gap-4 mt-4 pb-4 border-b">
            <Link to={`/profile/${video?.user?._id}`}>
              <img
                src={video?.user?.profilePicture}
                alt={video?.user?.username}
                className="w-12 h-12 object-cover rounded-full"
              />
            </Link>
            <Link to={`/profile/${video?.user?._id}`}>
              <div>
                <h2 className="font-bold">{video?.user?.channelName}</h2>
                <h3 className="font-semibold">@{video?.user?.username}</h3>
                <p className="text-gray-600">{video?.user?.subscribers || 0} Subscribers</p>
              </div>
            </Link>

            {subscribed ? (
              <button onClick={handleUnsubscribe} className="ml-auto bg-gray-500 text-white px-4 py-2 rounded-full">
                Unsubscribe
              </button>
            ) : (
              <button onClick={handleSubscribe} className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full">
                Subscribe
              </button>
            )}
          </div>

          {/* Description */}
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <p className={`overflow-hidden ${showFullDescription ? '' : 'line-clamp-3'}`}>
              {video?.description}
            </p>
            <button
              onClick={toggleDescription}
              className="flex items-center text-blue-500 mt-2"
            >
              {showFullDescription ? (
                <>
                  Show Less <MdOutlineExpandLess className="ml-1" />
                </>
              ) : (
                <>
                  Show More <MdOutlineExpandMore className="ml-1" />
                </>
              )}
            </button>
          </div>

          {/* Comments Section */}
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-4">Comments</h3>
            {currentUser && <div className="mb-4">
              <img
                src={currentUser?.profilePicture}
                alt="User"
                className="w-10 h-10 object-cover rounded-full inline-block mr-2"
              />
              <input
                type="text"
                placeholder="Add a public comment..."
                className="border-none outline-none rounded-lg p-2 w-full"
                value={newComment}
                onChange={handleCommentChange}
                onFocus={() => setIsCommenting(true)}
              />
              <hr className="border border-gray-700" />
              {isCommenting && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleCancelComment}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCommentSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full"
                  >
                    Comment
                  </button>
                </div>
              )}
            </div>}
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="flex items-start mb-4">
                  <img
                    src={comment?.user?.profilePicture}
                    alt={comment?.user?.username}
                    className="w-10 h-10 object-cover rounded-full mr-2"
                  />
                  <div>
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <h3 className="font-bold">{comment?.user?.channelName}</h3>
                      <h4 className="font-semibold">@{comment?.user?.username}</h4>
                      <p>{comment?.message}</p>
                    </div>
                    <span className="text-gray-600 text-sm">{format(comment?.createdAt)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-600">No comments yet. Be the first to comment!</div>
            )}
          </div>
        </div>
      </div>

      {/* Right column - Related Videos */}
      <div className="lg:w-4/12">
        <h2 className="text-lg font-bold mb-4">Related Videos</h2>
        {relatedVideos.length > 0 ? (
          relatedVideos.map((item, index) => (
            <SuggestedVideo key={index} video={item} />
          ))
        ) : (
          <div className="text-gray-600">Related videos are coming soon...</div>
        )}
      </div>
    </div>
  );
}

export default PlayingVideo;
