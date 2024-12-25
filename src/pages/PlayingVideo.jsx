// import React, { useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import ReactPlayer from "react-player";
// import { BiLike, BiDislike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
// import { abbreviateNumber } from "js-abbreviation-number";
// import SuggestedVideo from "../components/SuggestedVideo";
// import axios from "axios";
// import { format } from "timeago.js";
// import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
// import { useSelector } from "react-redux";
// import { useTheme } from "../context/ThemeContext";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function PlayingVideo() {
//   const [video, setVideo] = useState();
//   const [relatedVideos, setRelatedVideos] = useState([]);
//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [isCommenting, setIsCommenting] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);
//   const [subscribed, setSubscribed] = useState(false);
//   const { id } = useParams();
//   const { currentUser } = useSelector((state) => state.user);
//   const { theme } = useTheme();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchVideoDetails();
//   }, [id]);

//   const fetchVideoDetails = async () => {
//     try {
//       const res = await axios.get(`/api/videos/find/${id}`);
//       setVideo(res.data.video);
//       const commentsRes = await axios.get(`/api/comments/video/${id}`);
//       setComments(commentsRes.data.comments);
//       setLiked(res.data.video.likes.includes(currentUser._id));
//       setDisliked(res.data.video.dislikes.includes(currentUser._id));
//     } catch (error) {
//       console.error("Error fetching video details:", error);
//       toast.error("Failed to fetch video details!");
//       navigate('/error');
//     }
//   };

//   const toggleDescription = () => {
//     setShowFullDescription(!showFullDescription);
//   };

//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleCommentSubmit = async () => {
//     if (newComment.trim()) {
//       try {
//         const res = await axios.post(`/api/comments/add/${id}/`, { message: newComment });
//         setComments([res.data.comment, ...comments]);
//         setNewComment("");
//         setIsCommenting(false);
//         toast.success("Comment added successfully!");
//       } catch (error) {
//         console.error("Error adding comment:", error);
//         toast.error("Failed to add comment!");
//       }
//     }
//   };

//   const handleCancelComment = () => {
//     setNewComment("");
//     setIsCommenting(false);
//   };

//   const handleLike = async () => {
//     if (!currentUser) {
//       toast.error("Login to like a video");
//       return;
//     }
//     if (liked) return;
//     try {
//       await axios.put(`/api/videos/like/${id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
//       setLiked(true);
//       setDisliked(false);
//       toast.success("Video liked!");
//     } catch (err) {
//       console.error("Error liking video", err);
//       toast.error("Failed to like video!");
//     }
//   };

//   const handleDislike = async () => {
//     if (!currentUser) {
//       toast.error("Login to dislike a video");
//       return;
//     }
//     if (disliked) return;
//     try {
//       await axios.put(`/api/videos/dislike/${id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
//       setDisliked(true);
//       setLiked(false);
//       toast.success("Video disliked!");
//     } catch (err) {
//       console.error("Error disliking video", err);
//       toast.error("Failed to dislike video!");
//     }
//   };

//   const handleSubscribe = async () => {
//     if (!currentUser) {
//       toast.error("Login to subscribe to a channel");
//       return;
//     }
//     if (subscribed) return;
//     try {
//       await axios.put(`/api/users/subscribe/${video?.user._id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
//       setSubscribed(true);
//       toast.success("Subscribed to channel!");
//     } catch (err) {
//       console.error("Error subscribing", err);
//       toast.error("Failed to subscribe!");
//     }
//   };

//   const handleUnsubscribe = async () => {
//     if (!subscribed) return;
//     try {
//       await axios.put(`/api/users/unsubscribe/${video?.user._id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
//       setSubscribed(false);
//       toast.success("Unsubscribed from channel!");
//     } catch (err) {
//       console.error("Error unsubscribing", err);
//       toast.error("Failed to unsubscribe!");
//     }
//   };

//   return (
//     <div className={`flex flex-col lg:flex-row gap-4 p-4 mt-12 transition-all duration-300 ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-white text-gray-800'}`}>
//       <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
//       {/* Left column - Video Player and Info */}
//       <div className="lg:w-8/12">
//         {/* Video Player */}
//         <div className="w-full aspect-video bg-black shadow-lg rounded-lg overflow-hidden">
//           <ReactPlayer
//             url={`${video?.videoLink}` || ""}
//             height="100%"
//             width="100%"
//             controls
//             style={{ backgroundColor: "#000000" }}
//             playing={true}
//           />
//         </div>

//         {/* Video Info */}
//         <div className="mt-4">
//           <h1 className="text-xl font-bold">{video?.title}</h1>
//           <div className="flex justify-between items-center mt-2">
//             <span className="text-gray-600">{video?.views} views • {format(video?.createdAt)}</span>
//             <div className="flex gap-4">
//               <button onClick={handleLike} className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
//                 {liked ? <BiSolidLike className="text-xl" /> : <BiLike className="text-xl" />}
//                 <span>{abbreviateNumber(video?.likes?.length, 2)}</span>
//               </button>

//               <button onClick={handleDislike} className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
//                 {disliked ? <BiSolidDislike className="text-xl" /> : <BiDislike className="text-xl" />}
//                 <span>{abbreviateNumber(video?.dislikes?.length, 2)}</span>
//               </button>
//               <button className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
//                 <span>Share</span>
//               </button>
//             </div>
//           </div>

//           {/* Channel Info */}
//           <div className="flex items-center gap-4 mt-4 pb-4 border-b">
//             <Link to={`/profile/${video?.user?._id}`}>
//               <img
//                 src={video?.user?.profilePicture}
//                 alt={video?.user?.username}
//                 className="w-12 h-12 object-cover rounded-full shadow-md"
//               />
//             </Link>
//             <Link to={`/profile/${video?.user?._id}`}>
//               <div>
//                 <h2 className="font-bold">{video?.user?.channelName}</h2>
//                 <h3 className="font-semibold">@{video?.user?.username}</h3>
//                 <p className="text-gray-600">{video?.user?.subscribers || 0} Subscribers</p>
//               </div>
//             </Link>

//             {subscribed ? (
//               <button onClick={handleUnsubscribe} className="ml-auto bg-gray-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-600 transition-all duration-200">
//                 Unsubscribe
//               </button>
//             ) : (
//               <button onClick={handleSubscribe} className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition-all duration-200">
//                 Subscribe
//               </button>
//             )}
//           </div>

//           {/* Description */}
//           <div className={`mt-4 p-4 rounded-lg shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
//             <p className={`overflow-hidden ${showFullDescription ? '' : 'line-clamp-3'}`}>
//               {video?.description}
//             </p>
//             <button
//               onClick={toggleDescription}
//               className="flex items-center text-blue-500 mt-2 hover:underline"
//             >
//               {showFullDescription ? (
//                 <>
//                   Show Less <MdOutlineExpandLess className="ml-1" />
//                 </>
//               ) : (
//                 <>
//                   Show More <MdOutlineExpandMore className="ml-1" />
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Comments Section */}
//           <div className="mt-4">
//             <h3 className="text-xl font-bold mb-4">Comments</h3>
//             {currentUser && (
//               <div className="mb-4">
//                 <img
//                   src={currentUser?.profilePicture}
//                   alt="User"
//                   className="w-10 h-10 object-cover rounded-full inline-block mr-2 shadow-md"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Add a public comment..."
//                   className={`border-none outline-none rounded-lg p-2 w-full shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-[#2a2a2a] text-white' : 'bg-gray-100 text-gray-800'}`}
//                   value={newComment}
//                   onChange={handleCommentChange}
//                   onFocus={() => setIsCommenting(true)}
//                 />
//                 <hr className="border border-gray-700" />
//                 {isCommenting && (
//                   <div className="flex justify-end mt-2">
//                     <button
//                       onClick={handleCancelComment}
//                       className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full mr-2 shadow-md hover:bg-gray-400 transition-all duration-200"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleCommentSubmit}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-200"
//                     >
//                       Comment
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//             {comments.length > 0 ? (
//               comments.map((comment, index) => (
//                 <div key={index} className="flex items-start mb-4">
//                   <img
//                     src={comment?.user?.profilePicture}
//                     alt={comment?.user?.username}
//                     className="w-10 h-10 object-cover rounded-full mr-2 shadow-md"
//                   />
//                   <div>
//                     <div className={`p-2 rounded-lg shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
//                       <h3 className="font-bold">{comment?.user?.channelName}</h3>
//                       <h4 className="font-semibold">@{comment?.user?.username}</h4>
//                       <p>{comment?.message}</p>
//                     </div>
//                     <span className="text-gray-600 text-sm">{format(comment?.createdAt)}</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-gray-600">No comments yet. Be the first to comment!</div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Right column - Related Videos */}
//       <div className="lg:w-4/12">
//         <h2 className="text-lg font-bold mb-4">Related Videos</h2>
//         {relatedVideos.length > 0 ? (
//           relatedVideos.map((item, index) => (
//             <SuggestedVideo key={index} video={item} />
//           ))
//         ) : (
//           <div className="text-gray-600">Related videos are coming soon...</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PlayingVideo;


import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { BiLike, BiDislike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestedVideo from "../components/SuggestedVideo";
import axios from "axios";
import { format } from "timeago.js";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PlayingVideo() {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showMenu, setShowMenu] = useState(false); 
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideoDetails();
  }, [id]);

  const fetchVideoDetails = async () => {
    try {
      const res = await axios.get(`/api/videos/find/${id}`);
      setVideo(res?.data.video);
      const commentsRes = await axios.get(`/api/comments/video/${id}`);
      setComments(commentsRes?.data.comments);
      setLiked(res?.data.video?.likes.includes(currentUser._id));
      setDisliked(res?.data.video.dislikes.includes(currentUser._id));
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const res = await axios.post(`/api/comments/add/${id}/`, { message: newComment });
        setComments([res.data.comment, ...comments]);
        setNewComment("");
        setIsCommenting(false);
        toast.success("Comment added successfully!");
      } catch (error) {
        console.error("Error adding comment:", error);
        toast.error("Failed to add comment!");
      }
    }
  };

  const handleCancelComment = () => {
    setNewComment("");
    setIsCommenting(false);
  };

  const handleMenuClick = () => {
    setShowMenu((prev) => !prev); // Toggle the dropdown menu visibility
  };

  const handleEdit = (comment) => {
    setEditingComment(comment);
    setCommentText(comment.message);
    setShowMenu(false);
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId); // Replace with your actual delete API call
      // Refresh comments or update state to remove the deleted comment
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
    setShowMenu(false);
  };

    const handleSaveEdit = async () => {
    try {
      await editComment(editingComment._id, commentText); // Replace with your actual edit API call
      // Refresh comments or update state to reflect the edited comment
    } catch (error) {
      console.error('Failed to edit comment:', error);
    }
    setEditingComment(null);
    setCommentText('');
  };

  const handleLike = async () => {
    if (!currentUser) {
      toast.error("Login to like a video");
      return;
    }
    if (liked) return; // Already liked, no need to send request
    try {
      await axios.put(`/api/videos/like/${id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
      setLiked(true);
      setDisliked(false); // Ensure dislike is reset if liked
      toast.success("Video liked!");
      setVideo(prevVideo => ({
        ...prevVideo,
        likes: [...prevVideo.likes, currentUser._id] // Update the like count locally
      }));
    } catch (err) {
      console.error("Error liking video", err);
      toast.error("Failed to like video!");
    }
  };

  const handleDislike = async () => {
    if (!currentUser) {
      toast.error("Login to dislike a video");
      return;
    }
    if (disliked) return; // Already disliked, no need to send request
    try {
      await axios.put(`/api/videos/dislike/${id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
      setDisliked(true);
      setLiked(false); // Ensure like is reset if disliked
      toast.success("Video disliked!");
      setVideo(prevVideo => ({
        ...prevVideo,
        dislikes: [...prevVideo.dislikes, currentUser._id] // Update the dislike count locally
      }));
    } catch (err) {
      console.error("Error disliking video", err);
      toast.error("Failed to dislike video!");
    }
  };

  const handleSubscribe = async () => {
    if (!currentUser) {
      toast.error("Login to subscribe to a channel");
      return;
    }
    if (subscribed) return;
    try {
      await axios.put(`/api/users/subscribe/${video?.user._id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
      setSubscribed(true);
      toast.success("Subscribed to channel!");
    } catch (err) {
      console.error("Error subscribing", err);
      toast.error("Failed to subscribe!");
    }
  };

  const handleUnsubscribe = async () => {
    if (!subscribed) return;
    try {
      await axios.put(`/api/users/unsubscribe/${video?.user._id}`, {}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
      setSubscribed(false);
      toast.success("Unsubscribed from channel!");
    } catch (err) {
      console.error("Error unsubscribing", err);
      toast.error("Failed to unsubscribe!");
    }
  };

  return (
    <div className={`flex flex-col lg:flex-row gap-4 p-4 mt-12 transition-all duration-300 ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-white text-gray-800'}`}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      {/* Left column - Video Player and Info */}
      <div className="lg:w-8/12">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black shadow-lg rounded-lg overflow-hidden">
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
              <button onClick={handleLike} className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
                {liked ? <BiSolidLike className="text-xl" /> : <BiLike className="text-xl" />}
                <span>{abbreviateNumber(video?.likes?.length, 2)}</span>
              </button>

              <button onClick={handleDislike} className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
                {disliked ? <BiSolidDislike className="text-xl" /> : <BiDislike className="text-xl" />}
                <span>{abbreviateNumber(video?.dislikes?.length, 2)}</span>
              </button>
              <button className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
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
                className="w-12 h-12 object-cover rounded-full shadow-md"
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
              <button onClick={handleUnsubscribe} className="ml-auto bg-gray-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-600 transition-all duration-200">
                Unsubscribe
              </button>
            ) : (
              <button onClick={handleSubscribe} className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition-all duration-200">
                Subscribe
              </button>
            )}
          </div>

          {/* Description */}
          <div className={`mt-4 p-4 rounded-lg shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
            <p className={`overflow-hidden ${showFullDescription ? '' : 'line-clamp-3'}`}>
              {video?.description}
            </p>
            <button
              onClick={toggleDescription}
              className="flex items-center text-blue-500 mt-2 hover:underline"
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
            {currentUser && (
              <div className="mb-4">
                <img
                  src={currentUser?.profilePicture}
                  alt="User"
                  className="w-10 h-10 object-cover rounded-full inline-block mr-2 shadow-md"
                />
                <input
                  type="text"
                  placeholder="Add a public comment..."
                  className={`border-none outline-none rounded-lg p-2 w-full shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-[#2a2a2a] text-white' : 'bg-gray-100 text-gray-800'}`}
                  value={newComment}
                  onChange={handleCommentChange}
                  onFocus={() => setIsCommenting(true)}
                />
                <hr className="border border-gray-700" />
                {isCommenting && (
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleCancelComment}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full mr-2 shadow-md hover:bg-gray-400 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCommentSubmit}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-200"
                    >
                      Comment
                    </button>
                  </div>
                )}
              </div>
            )}
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={comment?.id} className="flex items-start mb-4 relative">
                  <img
                    src={comment?.user?.profilePicture}
                    alt={comment?.user?.username}
                    className="w-10 h-10 object-cover rounded-full mr-2 shadow-md"
                  />
                  <div className="flex-1">
                    <div
                      className={`p-2 rounded-lg shadow-md transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}
                    >
                      <h3 className="font-bold">{comment?.user?.channelName}</h3>
                      <h4 className="font-semibold">@{comment?.user?.username}</h4>
                      <p>{comment?.message}</p>
                    </div>
                    <span className="text-gray-600 text-sm">{format(comment?.createdAt)}</span>
                  </div>
                  {/* Three dots icon */}
                  {currentUser && currentUser._id === comment?.user?._id &&
                    <button
                    onClick={handleMenuClick}
                    className="absolute top-0 right-0 p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="6" r="1" />
                      <circle cx="12" cy="18" r="1" />
                    </svg>
                  </button>}

                  {/* Dropdown menu */}
                  {currentUser && currentUser._id === comment?.user?._id && showMenu && (
                    <div
                      className="absolute top-0 right-0 mt-8 p-2 w-32 bg-white shadow-lg rounded-md text-sm"
                      style={{ zIndex: 10 }}
                    >
                      <ul>
                        <li
                          onClick={handleEdit}
                          className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                        >
                          Edit
                        </li>
                        <li
                          onClick={handleDelete}
                          className="cursor-pointer hover:bg-red-200 p-2 rounded-md text-red-500"
                        >
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
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
