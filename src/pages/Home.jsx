import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ListItems from '../components/ListItems';
import Video from '../pages/Video';
import { ClipLoader } from 'react-spinners';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios(`/api/videos/type/${selectedCategory}`);
        console.log(response.data);
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchVideos();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex mt-20">
      {loading && <div className="flex justify-center items-center w-full h-full">
              <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>}
      <Sidebar />
      <div className="h-[calc(100vh-6.625rem)] overflow-y-scroll hide-scrollbar overflow-x-hidden">
        <ListItems onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
          ) : videos.length === 0 ? (
            <div className="flex justify-center items-center w-full h-full">
              <p>No videos found</p>
            </div>
          ) : (
            videos.map((item) => {
              console.log(item);
              return <Video key={item?._id} video={item} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;