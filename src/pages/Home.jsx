import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Video from './Video'
import ListItems from '../components/ListItems';
import Loader from '../components/Loader';
import axios from 'axios';
function Home() {
  // const { data, loading } = useAuth();
  // console.log(data)
const [videos, setVideos] = useState([]);

useEffect(() => {
  const fetchVideos = async () => {
    const response = await axios("http://localhost:3000/api/videos/all");
    console.log(response.data.data);
    setVideos(response.data.data);
  };
  fetchVideos();
}, []);
  return (
    <div className="flex mt-20">
    <Sidebar />
    <div className="h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden">
      <ListItems />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
        {
          videos.map((item) => {
            console.log(item)
            return <Video key={item?._id} video={item} />;
          })}
      </div>
    </div>
  </div>
  )
}

export default Home
