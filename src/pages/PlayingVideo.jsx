// // // import React, { useEffect, useState } from "react";
// // // import { useParams } from "react-router-dom";
// // // import ReactPlayer from "react-player";
// // // import { BiLike } from "react-icons/ai";
// // // import { abbreviateNumber } from "js-abbreviation-number";
// // // import SuggestedVideo from "../components/SuggestedVideo";
// // // import { BsFillCheckCircleFill } from "react-icons/bs";
// // // import axios from "axios";
// // // import { format } from "timeago.js";

// // // function PlayingVideo() {
// // //   const [video, setVideo] = useState();
// // //   const [realatedVideo, setRelativeVideo] = useState();
// // //   const { id } = useParams();

// // //   useEffect(() => {
// // //     fetchVideoDetails();
// // //   }, [id]);

// // //   const fetchVideoDetails = () => {
// // //     axios.get(`/api/videos/find/${id}`).then((res) => {
// // //       setVideo(res.data.video);
// // //     });
// // //   };

// // //   return (
// // //     // <div className=" flex justify-center flex-row h-[calc(100%-46px)] mt-16">
// // //     //   <div className="w-full max-w-[1440px] flex flex-col lg:flex-row">
// // //     //     <div className="flex flex-col lg:w-[calc(100%-250px)] xl:w-[100%-400px] px-4 py-3 lg:py-6">
// // //     //       <div className="h-[150px] md:h-[400px] ml-[16px] mr-[16px] lg:ml-0 lg:mr-0">

// // //     //       </div>
// // //     //       <div className="font-bold text-sm md:text-xl mt-4 line-clamp-2">
// // //     //         {video?.title}
// // //     //       </div>
// // //     //       <div className="flex justify-between flex-col w-[] md:flex-row mt-4">
// // //     //         <div className="flex ">
// // //     //           <div className="flex items-start">
// // //     //             <div className="flex h-11 w-11 rounded-full overflow-hidden">
// // //     //               <img
// // //     //                 className="h-full w-full object-cover"
// // //     //                 src={video?.user?.profilePicture}
// // //     //               />
// // //     //             </div>
// // //     //           </div>
// // //     //           <div className="flex space-x-5 ">
// // //     //             <div className="flex flex-col ml-3">
// // //     //               <div className="text-md font-semibold flex items-center">
// // //     //                 {video?.user?.channelName}

// // //     //               </div>
// // //     //               <div className=" text-sm">
// // //     //                 {`${abbreviateNumber(video?.user?.subscribers, 2)}`} Subscribers
// // //     //               </div>
// // //     //             </div>
// // //     //             <span className="mt-1 text-center bg-red-500 px-3 pt-2 rounded-full text-white cursor-pointer hover:bg-red-700 duration-200 ">
// // //     //               Subscribe
// // //     //             </span>
// // //     //           </div>
// // //     //         </div>
// // //     //         <div className="flex mt-4 md:mt-0  nd:w-[calc(100%-250px)] lg:w-[100%-400px]">
// // //     //           <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
// // //     //             <BiLike className="text-xl mr-2" />
// // //     //             {`${abbreviateNumber(video?.likes, 2)} Likes`}
// // //     //           </div>
// // //     //           <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
// // //     //             <BiLike className="text-xl mr-2" />
// // //     //             {`${abbreviateNumber(video?.dislikes, 2)} Disikes`}
// // //     //           </div>
// // //     //           <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
// // //     //             {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
// // //     //           </div>
// // //     //         </div>
// // //     //       </div>
// // //     //       <div className="p-4 bg-gray-100 rounded-xl mt-4 text-sm  md:w-[calc(100%-250px)] lg:w-[100%-400px]">
// // //     //         {video?.description}
// // //     //       </div>
// // //     //       <div className="flex gap-x-6 font-semibold rounded-xl mt-4 text-xl">
// // //     //         {video?.stats?.comments} <p>Comments</p>
// // //     //       </div>
// // //     //     </div>
// // //     //     <div className="flex flex-col px-4 py-6 h-[calc(100vh-4.625rem)] overflow-y-scroll overflow-x-hidden lg:w-[350px] xl:w-[400px]">
// // //     //       {realatedVideo?.contents?.map((item, index) => {
// // //     //         if (item?.type !== "video") return false;
// // //     //         return <SuggestedVideo key={index} video={item?.video} />;
// // //     //       })}
// // //     //     </div>
// // //     //   </div>
// // //     // </div>
// // //     <div className="flex flex-col lg:flex-row gap-4 p-4 mt-12">
// // //       {/* Left column - Video Player and Info */}
// // //       <div className="lg:w-8/12">
// // //         {/* Video Player */}
// // //         <div className="w-full aspect-video bg-black">
// // //           <ReactPlayer
// // //             url={`${video?.videoLink}` || ""}
// // //             height="100%"
// // //             width="100%"
// // //             controls
// // //             style={{ backgroundColor: "#000000" }}
// // //             playing={true}
// // //           />
// // //         </div>

// // //         {/* Video Info */}
// // //         <div className="mt-4">
// // //           <h1 className="text-xl font-bold">{video?.title}</h1>
// // //           <div className="flex justify-between items-center mt-2">
// // //             <span className="text-gray-600">{video?.views} views • {format(video?.createdAt)}</span>
// // //             <div className="flex gap-4">
// // //               <button className="flex items-center gap-1">
// // //                 <span>👍 {video?.likes?.length}</span>
// // //               </button>

// // //               <button className="flex items-center gap-1">
// // //                 <span>👎 {video?.dislikes?.length}</span>
// // //               </button>
// // //               <button className="flex items-center gap-1">
// // //                 <span>Share</span>
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Channel Info */}
// // //           <div className="flex items-center gap-4 mt-4 pb-4 border-b">
// // //             <img
// // //               src={video?.user?.profilePicture}
// // //               alt={video?.user?.username}
// // //               className="w-12 h-12 rounded-full"
// // //             />
// // //             <div>
// // //               <h3 className="font-bold">{video?.user?.username}</h3>
// // //               <p className="text-gray-600">{video?.user?.subscribers} subscribers</p>
// // //             </div>
// // //             <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full">
// // //               Subscribe
// // //             </button>
// // //           </div>

// // //           {/* Description */}
// // //           <div className="mt-4 bg-gray-100 p-4 rounded-lg">
// // //             <p>{video?.description}</p>
// // //           </div>

// // //           {/* Comments Section */}
// // //           <div className="mt-4">
// // //             <h3 className="text-xl font-bold mb-4">Comments</h3>
// // //             {/* Comments will be added later */}
// // //             <div className="text-gray-600">Comments are coming soon...</div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Right column - Related Videos */}
// // //       <div className="lg:w-4/12">
// // //         <h2 className="text-lg font-bold mb-4">Related Videos</h2>
// // //         {/* Related videos will be added later */}
// // //         <div className="text-gray-600">Related videos are coming soon...</div>
// // //       </div>

// // //     </div>
// // //   );
// // // }

// // // export default PlayingVideo;


// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import ReactPlayer from "react-player";
// // import { BiLike, BiDislike } from "react-icons/ai";
// // import { abbreviateNumber } from "js-abbreviation-number";
// // import SuggestedVideo from "../components/SuggestedVideo";
// // import { BsFillCheckCircleFill } from "react-icons/bs";
// // import axios from "axios";
// // import { format } from "timeago.js";
// // import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

// // function PlayingVideo() {
// //   const [video, setVideo] = useState();
// //   const [relatedVideos, setRelatedVideos] = useState([]);
// //   const [showFullDescription, setShowFullDescription] = useState(false);
// //   const { id } = useParams();

// //   useEffect(() => {
// //     fetchVideoDetails();
// //   }, [id]);

// //   const fetchVideoDetails = async () => {
// //     const res = await axios.get(`/api/videos/find/${id}`);
// //     setVideo(res.data.video);
// //     // Fetch related videos
// //     const relatedRes = await axios.get(`/api/videos/related/${id}`);
// //     setRelatedVideos(relatedRes.data.videos);
// //   };

// //   const toggleDescription = () => {
// //     setShowFullDescription(!showFullDescription);
// //   };

// //   return (
// //     <div className="flex flex-col lg:flex-row gap-4 p-4 mt-12">
// //       {/* Left column - Video Player and Info */}
// //       <div className="lg:w-8/12">
// //         {/* Video Player */}
// //         <div className="w-full aspect-video bg-black">
// //           <ReactPlayer
// //             url={`${video?.videoLink}` || ""}
// //             height="100%"
// //             width="100%"
// //             controls
// //             style={{ backgroundColor: "#000000" }}
// //             playing={true}
// //           />
// //         </div>

// //         {/* Video Info */}
// //         <div className="mt-4">
// //           <h1 className="text-xl font-bold">{video?.title}</h1>
// //           <div className="flex justify-between items-center mt-2">
// //             <span className="text-gray-600">{video?.views} views • {format(video?.createdAt)}</span>
// //             <div className="flex gap-4">
// //               <button className="flex items-center gap-1">
// //                 <BiLike className="text-xl" />
// //                 <span>{abbreviateNumber(video?.likes?.length, 2)}</span>
// //               </button>

// //               <button className="flex items-center gap-1">
// //                 <BiDislike className="text-xl" />
// //                 <span>{abbreviateNumber(video?.dislikes?.length, 2)}</span>
// //               </button>
// //               <button className="flex items-center gap-1">
// //                 <span>Share</span>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Channel Info */}
// //           <div className="flex items-center gap-4 mt-4 pb-4 border-b">
// //             <img
// //               src={video?.user?.profilePicture}
// //               alt={video?.user?.username}
// //               className="w-12 h-12 rounded-full"
// //             />
// //             <div>
// //               <h3 className="font-bold">{video?.user?.username}</h3>
// //               <p className="text-gray-600">{abbreviateNumber(video?.user?.subscribers, 2)} subscribers</p>
// //             </div>
// //             <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full">
// //               Subscribe
// //             </button>
// //           </div>

// //           {/* Description */}
// //           <div className="mt-4 bg-gray-100 p-4 rounded-lg">
// //             <p className={`overflow-hidden ${showFullDescription ? '' : 'line-clamp-3'}`}>
// //               {video?.description}
// //             </p>
// //             <button
// //               onClick={toggleDescription}
// //               className="flex items-center text-blue-500 mt-2"
// //             >
// //               {showFullDescription ? (
// //                 <>
// //                   Show Less <MdOutlineExpandLess className="ml-1" />
// //                 </>
// //               ) : (
// //                 <>
// //                   Show More <MdOutlineExpandMore className="ml-1" />
// //                 </>
// //               )}
// //             </button>
// //           </div>

// //           {/* Comments Section */}
// //           <div className="mt-4">
// //             <h3 className="text-xl font-bold mb-4">Comments</h3>
// //             {/* Comments will be added later */}
// //             <div className="text-gray-600">Comments are coming soon...</div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Right column - Related Videos */}
// //       <div className="lg:w-4/12">
// //         <h2 className="text-lg font-bold mb-4">Related Videos</h2>
// //         {relatedVideos.length > 0 ? (
// //           relatedVideos.map((item, index) => (
// //             <SuggestedVideo key={index} video={item} />
// //           ))
// //         ) : (
// //           <div className="text-gray-600">Related videos are coming soon...</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default PlayingVideo;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ReactPlayer from "react-player";
// import { BiLike, BiDislike } from "react-icons/ai";
// import { abbreviateNumber } from "js-abbreviation-number";
// import SuggestedVideo from "../components/SuggestedVideo";
// import { BsFillCheckCircleFill } from "react-icons/bs";
// import axios from "axios";
// import { format } from "timeago.js";
// import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
// import { useSelector } from "react-redux";

// function PlayingVideo() {
//   const [video, setVideo] = useState();
//   const [relatedVideos, setRelatedVideos] = useState([]);
//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [isCommenting, setIsCommenting] = useState(false);
//   const { id } = useParams();
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     fetchVideoDetails();
//   }, [id]);

//   const fetchVideoDetails = async () => {
//     const res = await axios.get(`/api/videos/find/${id}`);
//     setVideo(res.data.video);
//     // Fetch related videos
//     const relatedRes = await axios.get(`/api/videos/related/${id}`);
//     setRelatedVideos(relatedRes.data.videos);
//     // Fetch comments
//     const commentsRes = await axios.get(`/api/comments/video/${id}`);
//     console.log(commentsRes.data.comments);
//     setComments(commentsRes.data.comments);
//   };

//   const toggleDescription = () => {
//     setShowFullDescription(!showFullDescription);
//   };

//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleCommentSubmit = async () => {
//     if (newComment.trim()) {
//       const res = await axios.post(`/api/comments/add/${id}/`, { message: newComment });
//       setComments([res.data.comment, ...comments]);
//       setNewComment("");
//       setIsCommenting(false);
//     }
//   };

//   const handleCancelComment = () => {
//     setNewComment("");
//     setIsCommenting(false);
//   };
// console.log(comments)
//   return (
//     <div className="flex flex-col lg:flex-row gap-4 p-4 mt-12">
//       {/* Left column - Video Player and Info */}
//       <div className="lg:w-8/12">
//         {/* Video Player */}
//         <div className="w-full aspect-video bg-black">
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
//               <button className="flex items-center gap-1">
//                 <BiLike className="text-xl" />
//                 <span>{abbreviateNumber(video?.likes?.length, 2)}</span>
//               </button>

//               <button className="flex items-center gap-1">
//                 <BiDislike className="text-xl" />
//                 <span>{abbreviateNumber(video?.dislikes?.length, 2)}</span>
//               </button>
//               <button className="flex items-center gap-1">
//                 <span>Share</span>
//               </button>
//             </div>
//           </div>

//           {/* Channel Info */}
//           <div className="flex items-center gap-4 mt-4 pb-4 border-b">
//             <img
//               src={video?.user?.profilePicture}
//               alt={video?.user?.username}
//               className="w-12 h-12 rounded-full"
//             />
//             <div>
//               <h3 className="font-bold">{video?.user?.username}</h3>
//               <p className="text-gray-600">{video?.user?.subscribers || 100} subscribers</p>
//             </div>
//             <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full">
//               Subscribe
//             </button>
//           </div>

//           {/* Description */}
//           <div className="mt-4 bg-gray-100 p-4 rounded-lg">
//             <p className={`overflow-hidden ${showFullDescription ? '' : 'line-clamp-3'}`}>
//               {video?.description}
//             </p>
//             <button
//               onClick={toggleDescription}
//               className="flex items-center text-blue-500 mt-2"
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
//             <div className="mb-4">
//               <img
//                 src={currentUser?.profilePicture}
//                 alt="User"
//                 className="w-10 h-10 rounded-full inline-block mr-2"
//               />
//               <input
//                 type="text"
//                 placeholder="Add a public comment..."
//                 className="border border-gray-300 rounded-lg p-2 w-full"
//                 value={newComment}
//                 onChange={handleCommentChange}
//                 onFocus={() => setIsCommenting(true)}
//               />
//               {isCommenting && (
//                 <div className="flex justify-end mt-2">
//                   <button
//                     onClick={handleCancelComment}
//                     className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full mr-2"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCommentSubmit}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-full"
//                   >
//                     Comment
//                   </button>
//                 </div>
//               )}
//             </div>
//             {comments.length > 0 ? (
//               comments.map((comment, index) => (
//                 <div key={index} className="flex items-start mb-4">
//                   <img
//                     src={comment?.user?.profilePicture}
//                     alt={comment?.user?.username}
//                     className="w-10 h-10 rounded-full mr-2"
//                   />
//                   <div>
//                     <div className="bg-gray-100 p-2 rounded-lg">
//                       <h4 className="font-bold">{comment?.user?.username}</h4>
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
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { BiLike, BiDislike } from "react-icons/bi";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestedVideo from "../components/SuggestedVideo";
import { BsFillCheckCircleFill } from "react-icons/bs";
import axios from "axios";
import { format } from "timeago.js";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { useSelector } from "react-redux";
import { CgLayoutGrid } from "react-icons/cg";

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
                <BiLike className={`text-xl ${liked ? 'text-blue-500' : ''}`} />
                <span>{abbreviateNumber(video?.likes?.length, 2)}</span>
              </button>

              <button onClick={handleDislike} className="flex items-center gap-1">
                <BiDislike className={`text-xl ${disliked ? 'text-red-500' : ''}`} />
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
                className="w-12 h-12 rounded-full"
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
                className="w-10 h-10 rounded-full inline-block mr-2"
              />
              <input
                type="text"
                placeholder="Add a public comment..."
                className="border border-gray-300 rounded-lg p-2 w-full"
                value={newComment}
                onChange={handleCommentChange}
                onFocus={() => setIsCommenting(true)}
              />
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
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <h4 className="font-bold">{comment?.user?.username}</h4>
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
