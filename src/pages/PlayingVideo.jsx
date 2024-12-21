import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestedVideo from "../components/SuggestedVideo";
import { BsFillCheckCircleFill } from "react-icons/bs";
import axios from "axios";
import { format } from "timeago.js";

function PlayingVideo() {
  const [video, setVideo] = useState();
  const [realatedVideo, setRelativeVideo] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchVideoDetails();
  }, [id]);

  const fetchVideoDetails = () => {
    axios.get(`http://localhost:3000/api/videos/getVideoById/${id}`).then((res) => {
      setVideo(res.data.data);
    });
  };

  return (
    // <div className=" flex justify-center flex-row h-[calc(100%-46px)] mt-16">
    //   <div className="w-full max-w-[1440px] flex flex-col lg:flex-row">
    //     <div className="flex flex-col lg:w-[calc(100%-250px)] xl:w-[100%-400px] px-4 py-3 lg:py-6">
    //       <div className="h-[150px] md:h-[400px] ml-[16px] mr-[16px] lg:ml-0 lg:mr-0">
    // <ReactPlayer
    //   url={`${video?.videoLink}` || ""}
    //   height="100%"
    //   width="80%"
    //   controls
    //   style={{ backgroundColor: "#000000" }}
    //   playing={true}
    // />
    //       </div>
    //       <div className="font-bold text-sm md:text-xl mt-4 line-clamp-2">
    //         {video?.title}
    //       </div>
    //       <div className="flex justify-between flex-col w-[] md:flex-row mt-4">
    //         <div className="flex ">
    //           <div className="flex items-start">
    //             <div className="flex h-11 w-11 rounded-full overflow-hidden">
    //               <img
    //                 className="h-full w-full object-cover"
    //                 src={video?.user?.profilePicture}
    //               />
    //             </div>
    //           </div>
    //           <div className="flex space-x-5 ">
    //             <div className="flex flex-col ml-3">
    //               <div className="text-md font-semibold flex items-center">
    //                 {video?.user?.channelName}

    //               </div>
    //               <div className=" text-sm">
    //                 {`${abbreviateNumber(video?.user?.subscribers, 2)}`} Subscribers
    //               </div>
    //             </div>
    //             <span className="mt-1 text-center bg-red-500 px-3 pt-2 rounded-full text-white cursor-pointer hover:bg-red-700 duration-200 ">
    //               Subscribe
    //             </span>
    //           </div>
    //         </div>
    //         <div className="flex mt-4 md:mt-0  nd:w-[calc(100%-250px)] lg:w-[100%-400px]">
    //           <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
    //             <AiOutlineLike className="text-xl mr-2" />
    //             {`${abbreviateNumber(video?.likes, 2)} Likes`}
    //           </div>
    //           <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
    //             <AiOutlineLike className="text-xl mr-2" />
    //             {`${abbreviateNumber(video?.dislikes, 2)} Disikes`}
    //           </div>
    //           <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
    //             {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="p-4 bg-gray-100 rounded-xl mt-4 text-sm  md:w-[calc(100%-250px)] lg:w-[100%-400px]">
    //         {video?.description}
    //       </div>
    //       <div className="flex gap-x-6 font-semibold rounded-xl mt-4 text-xl">
    //         {video?.stats?.comments} <p>Comments</p>
    //       </div>
    //     </div>
    //     <div className="flex flex-col px-4 py-6 h-[calc(100vh-4.625rem)] overflow-y-scroll overflow-x-hidden lg:w-[350px] xl:w-[400px]">
    //       {realatedVideo?.contents?.map((item, index) => {
    //         if (item?.type !== "video") return false;
    //         return <SuggestedVideo key={index} video={item?.video} />;
    //       })}
    //     </div>
    //   </div>
    // </div>
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
              <button className="flex items-center gap-1">
                <span>👍 {video?.likes?.length}</span>
              </button>

              <button className="flex items-center gap-1">
                <span>👎 {video?.dislikes?.length}</span>
              </button>
              <button className="flex items-center gap-1">
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex items-center gap-4 mt-4 pb-4 border-b">
            <img
              src={video?.user?.profilePicture}
              alt={video?.user?.username}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-bold">{video?.user?.username}</h3>
              <p className="text-gray-600">{video?.user?.subscribers} subscribers</p>
            </div>
            <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-full">
              Subscribe
            </button>
          </div>

          {/* Description */}
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <p>{video?.description}</p>
          </div>

          {/* Comments Section */}
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-4">Comments</h3>
            {/* Comments will be added later */}
            <div className="text-gray-600">Comments are coming soon...</div>
          </div>
        </div>
      </div>

      {/* Right column - Related Videos */}
      <div className="lg:w-4/12">
        <h2 className="text-lg font-bold mb-4">Related Videos</h2>
        {/* Related videos will be added later */}
        <div className="text-gray-600">Related videos are coming soon...</div>
      </div>

    </div>
  );
}

export default PlayingVideo;