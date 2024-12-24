// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { format } from 'timeago.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginSuccess, subscription } from '../redux/userSlice';
// import { abbreviateNumber } from 'js-abbreviation-number';
// import { useTheme } from '../context/ThemeContext';
// import Time from '../loader/Time';
// import { BsFillCheckCircleFill } from 'react-icons/bs';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FiMoreVertical } from 'react-icons/fi';

// const Profile = () => {
//   const { userId } = useParams();
//   const { currentUser } = useSelector(state => state.user);
//   const [profile, setProfile] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const dispatch = useDispatch();
//   const [profileData, setProfileData] = useState({
//     channelName: '',
//     username: '',
//     about: '',
//     email: '',
//     profilePicture: '',
//     subscribers: 0,
//   });
//   const [progress, setProgress] = useState(0);
//   const { theme } = useTheme();

//   // Fetch user profile and videos
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`/api/users/profile/${userId}`);
//         const data = response.data;
//         setProfile(data);
//         setProfileData({
//           channelName: data.channelName,
//           username: data.username,
//           about: data.about,
//           email: data.email,
//           profilePicture: data.profilePicture,
//           subscribers: data.subscribers,
//         });
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchVideos = async () => {
//       try {
//         const response = await axios.get(`/api/videos/channel/${userId}`);
//         setVideos(response.data.videos);
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchProfile();
//     fetchVideos();
//   }, [userId]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({
//       ...profileData,
//       [name]: value
//     });
//   };

//   // Handle save changes
//   const handleSaveChanges = async () => {
//     try {
//       const response = await axios.put('/api/users/profile/update', profileData);
//       const loginData = {
//         username: profileData.username,
//         password: profileData.password,
//         about: profileData.about,
//         email: profileData.email,
//         channelName: profileData.channelName,
//         profilePicture: profileData.profilePicture,
//         _id: profile._id
//       };
//       if (response.status === 200) {
//         const updatedProfile = response.data;
//         setProfile(updatedProfile);
//         setIsEditing(false); // Exit edit mode
//         dispatch(loginSuccess(loginData));
//         toast.success('Profile updated successfully!');
//       } else {
//         console.error('Failed to update profile');
//         toast.error('Failed to update profile!');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Error updating profile!');
//     }
//   };

//   // Handle cancel edit
//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setProfileData({
//       channelName: profile.channelName,
//       username: profile.username,
//       about: profile.about,
//       email: profile.email,
//       profilePicture: profile.profilePicture
//     });
//   };

//   // Handle image upload
//   const uploadImage = async (e) => {
//     const files = e.target.files;
//     const data = new FormData();
//     data.append('file', files[0]);
//     data.append('upload_preset', 'youtube'); // Replace with your Cloudinary upload preset
//     data.append('cloud_name', 'dshog03l1'); // Replace with your Cloudinary cloud name

//     try {
//       setLoading(true);
//       const res = await axios.post('https://api.cloudinary.com/v1_1/dshog03l1/image/upload', data, {
//         onUploadProgress: (progressEvent) => {
//           const progressPercentage = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setProgress(progressPercentage);
//         },
//       });

//       setProfileData({ ...profileData, profilePicture: res.data.url });
//       setLoading(false);
//       toast.success('Profile picture uploaded successfully!');
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       toast.error('Failed to upload profile picture!');
//     }
//   };

//   // Handle subscribe/unsubscribe
//   const handleSubscribe = async () => {
//     try {
//       const response = await axios.put(`/api/users/subscribe/${userId}`);
//       dispatch(subscription(response))
//       if (response.status === 200) {
//         dispatch(subscription(userId));
//         setProfileData(prev => ({ ...prev, subscribers: prev.subscribers + 1 }));
//         toast.success('Subscription status updated!');
//       } else {
//         console.error('Subscription failed');
//         toast.error('Subscription failed!');
//       }
//     } catch (error) {
//       console.error('Error subscribing:', error);
//       toast.error(error.response.data.message);
//     }
//   };
//   const handleUnsubscribe = async () => {
//     try {
//       const response = await axios.put(`/api/users/unsubscribe/${userId}`);
//       if (response.status === 200) {
//         dispatch(subscription(userId));
//         setProfileData(prev => ({ ...prev, subscribers: prev.subscribers - 1 }));
//         toast.success('Unsubscription status updated!');
//       } else {
//         console.error('Unsubscription failed');
//         toast.error('Unsubscription failed!');
//       }
//     } catch (error) {
//       console.error('Error unsubscribing:', error);
//       toast.error(error.response.data.message);
//     }
//   };

//   // Handle delete video
//   const handleDeleteVideo = async (videoId) => {
//     if (window.confirm("Are you sure you want to delete this video? This action cannot be undone.")) {
//       try {
//         await axios.delete(`/api/videos/delete/${videoId}`);
//         setVideos(videos.filter(video => video._id !== videoId));
//         toast.success('Video deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting video:', error);
//         toast.error('Failed to delete video!');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="text-xl">Loading...</span>
//       </div>
//     );
//   }
//   console.log(currentUser)
//   console.log(currentUser.subscribedTo)
//   return (
//     <div className={`min-h-screen transition-all duration-300 ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-gray-100 text-gray-800'}`}>
//       <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
//       {/* Profile Header */}
//       <div className={`shadow-lg relative rounded-lg top-12 p-6 max-w-4xl mx-auto mt-6 transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
//         <div className="flex items-center space-x-4">
//           <img
//             src={profileData.profilePicture}
//             alt={`${profileData.username}'s profile`}
//             className="w-24 h-24 rounded-full object-cover shadow-md"
//           />
//           <div>
//             {isEditing ? (
//               <div>
//                 {/* Edit Form */}
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="channelName" className="block text-sm">Channel Name</label>
//                     <input
//                       type="text"
//                       name="channelName"
//                       value={profileData.channelName}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-2 mt-2 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="username" className="block text-sm">Username</label>
//                     <input
//                       type="text"
//                       name="username"
//                       value={profileData.username}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-2 mt-2 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="about" className="block text-sm">About</label>
//                     <textarea
//                       name="about"
//                       value={profileData.about}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-2 mt-2 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
//                       rows="4"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="email" className="block text-sm">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={profileData.email}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-2 mt-2 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="profilePicture" className="block text-sm">Profile Picture</label>
//                     <input
//                       type="file"
//                       name="profilePicture"
//                       onChange={uploadImage}
//                       className={`w-full px-4 py-2 mt-2 rounded-md outline-none ${theme === 'dark' ? 'bg-[#2a2a2a] border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
//                     />
//                     {progress > 0 && progress < 100 && (
//                       <div className="mt-2 text-sm">
//                         Uploading: {progress}%
//                       </div>
//                     )}
//                   </div>

//                   <div className="mt-4 flex space-x-4">
//                     <button
//                       onClick={handleSaveChanges}
//                       className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
//                     >
//                       Save Changes
//                     </button>
//                     <button
//                       onClick={handleCancelEdit}
//                       className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-400 transition-all duration-200"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <h1 className="text-3xl font-bold">{profile.channelName}</h1>
//                 <h2 className="text-xl font-semibold">{abbreviateNumber(profile.subscribers)} Subscribers</h2>
//                 <p className="text-sm">{profile.username}</p>
//                 <p className="mt-2">{profile.about}</p>
//                 <div className="mt-4 space-x-4">
//                   {currentUser && currentUser._id === userId && (
//                     <button
//                       onClick={() => setIsEditing(true)}
//                       className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
//                     >
//                       Edit Profile
//                     </button>
//                   )}
//                   {currentUser && currentUser.subscribedTo && currentUser.subscribedTo.includes(userId)
//                     ? (
//                       <button
//                         onClick={handleUnsubscribe}
//                         className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 transition-all duration-200"
//                       >Unsubscribe</button>
//                     )
//                     : (
//                       <button
//                         onClick={handleSubscribe}
//                         className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 transition-all duration-200"
//                       >Subscribe</button>
//                     )
//                   }
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="mt-4">
//           <p className="text-sm">Email: {profile.email}</p>
//           <p className="text-sm">Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
//         </div>
//       </div>

//       {/* Videos Section */}
//       <div className="max-w-4xl mx-auto mt-6">
//         <h2 className="text-2xl mt-16 font-semibold">Recent Videos</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
//           {videos.length > 0 ? (
//             videos.map((video) => (
//               <div key={video._id} className="relative shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
//                 <div className='h-24 md:h-32 rounded-xl overflow-hidden'>
//                   <img src={video?.thumbnail} alt="" className='w-full object-fill' />
//                   {video?.lengthSeconds && <Time time={video?.lengthSeconds} />}
//                 </div>
//                 <div className="flex mt-3 space-x-2">
//                   <div className="flex items-start">
//                     <div className='flex h-9 w-9 rounded-full overflow-hidden border'>
//                       <img
//                         className='w-full h-full rounded-full object-cover overflow-hidden'
//                         src={video?.user?.profilePicture}
//                         alt=""
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <span className='text-sm font-bold line-clamp-1'>{video?.title}</span>
//                     <span className='flex items-center font-semibold mt-2 text-[12px] text-gray-600'>{video?.author?.title}{video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (<BsFillCheckCircleFill className='text-gray-600 ml-1 text-[12px]' />)}</span>
//                     <div className='flex text-gray-500 text-[12px]'>
//                       <span>
//                         {`${abbreviateNumber(video?.views, 2)} Views`}
//                       </span>
//                       <span className="flex text-[24px] leading-none font-bold relative top-[-10px] mx-1">
//                         .
//                       </span>
//                       <span>{format(video?.createdAt)}</span>
//                     </div>
//                   </div>
//                 </div>
//                 {currentUser && currentUser._id === userId && (
//                   <div className="absolute top-2 right-2">
//                     <FiMoreVertical
//                       className="text-gray-600 cursor-pointer hover:text-gray-800"
//                       onClick={() => handleDeleteVideo(video._id)}
//                     />
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No videos available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'timeago.js';
import { useDispatch, useSelector } from 'react-redux';
import { subscription } from '../redux/userSlice';
import { abbreviateNumber } from 'js-abbreviation-number';
import { useTheme } from '../context/ThemeContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';

const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useSelector(state => state.user);
  const [profile, setProfile] = useState(null);
  const [profileData, setProfileData] = useState({
    channelName: '',
    username: '',
    about: '',
    email: '',
    profilePicture: '',
    subscribers: 0,
  });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const dispatch = useDispatch();

  // Fetch user profile and videos
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/profile/${userId}`);
        const data = response.data;
        setProfile(data);
        setProfileData({
          channelName: data.channelName,
          username: data.username,
          about: data.about,
          email: data.email,
          profilePicture: data.profilePicture,
          subscribers: data.subscribers,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/api/videos/channel/${userId}`);
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchProfile();
    fetchVideos();
  }, [userId]);

  // Subscribe handler
  const handleSubscribe = async () => {
    try {
      const response = await axios.put(`/api/users/subscribe/${userId}`);
      if (response.status === 200) {
        dispatch(subscription(userId)); // Update the local user state in Redux
        setProfileData(prev => ({
          ...prev,
          subscribers: prev.subscribers + 1, // Increment subscriber count
        }));
        toast.success('Subscription successful!');
      }
    } catch (error) {
      toast.error('Error subscribing!');
    }
  };

  // Unsubscribe handler
  const handleUnsubscribe = async () => {
    try {
      const response = await axios.put(`/api/users/unsubscribe/${userId}`);
      if (response.status === 200) {
        dispatch(subscription(userId)); // Update the local user state in Redux
        setProfileData(prev => ({
          ...prev,
          subscribers: prev.subscribers - 1, // Decrement subscriber count
        }));
        toast.success('Unsubscription successful!');
      }
    } catch (error) {
      toast.error('Error unsubscribing!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-gray-100 text-gray-800'}`}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />

      {/* Profile Header */}
      <div className={`shadow-lg relative rounded-lg top-12 p-6 max-w-4xl mx-auto mt-6 transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
        <div className="flex items-center space-x-4">
          <img
            src={profileData.profilePicture}
            alt={`${profileData.username}'s profile`}
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold">{profileData.channelName}</h1>
            <h2 className="text-xl font-semibold">{abbreviateNumber(profileData.subscribers)} Subscribers</h2>
            <p className="text-sm">{profileData.username}</p>
            <p className="mt-2">{profileData.about}</p>
            <div className="mt-4 space-x-4">
              {currentUser && currentUser._id === userId && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
                >
                  Edit Profile
                </button>
              )}
              {currentUser && currentUser._id !== userId && (<>

                {currentUser && currentUser.subscribedTo.includes(userId)
                  ? (
                    <button
                      onClick={handleUnsubscribe}
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 transition-all duration-200"
                    >Unsubscribe</button>
                  )
                  : (
                    <button
                      onClick={handleSubscribe}
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md shadow-md hover:bg-gray-300 transition-all duration-200"
                    >Subscribe</button>
                  )
                }
              </>)}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm">Email: {profileData.email}</p>
        </div>
      </div>

      {/* Videos Section */}
      <div className="max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl mt-16 font-semibold">Recent Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video._id} className="relative shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
                <div className='h-24 md:h-32 rounded-xl overflow-hidden'>
                  <img src={video?.thumbnail} alt="" className='w-full object-fill' />
                </div>
                <div className="flex mt-3 space-x-2">
                  <div className="flex items-start">
                    <div className='flex h-9 w-9 rounded-full overflow-hidden border'>
                      <img
                        className='w-full h-full rounded-full object-cover overflow-hidden'
                        src={video?.user?.profilePicture}
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    <span className='text-sm font-bold line-clamp-1'>{video?.title}</span>
                    <span className='flex items-center font-semibold mt-2 text-[12px] text-gray-600'>
                      {video?.author?.title}{video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                        <BsFillCheckCircleFill className='text-gray-600 ml-1 text-[12px]' />
                      )}
                    </span>
                    <div className='flex text-gray-500 text-[12px]'>
                      <span>
                        {`${abbreviateNumber(video?.views, 2)} Views`}
                      </span>
                      <span className="flex text-[24px] leading-none font-bold relative top-[-10px] mx-1">.</span>
                      <span>{format(video?.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No videos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
