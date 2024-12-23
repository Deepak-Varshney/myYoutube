// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const Profile = () => {
//   const { userId } = useParams();
//   const [profile, setProfile] = useState(null);
// console.log(userId)
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch(`/api/users/profile/${userId}`);
//         const data = await response.json();
//         setProfile(data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, [userId]);

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <img src={profile.profilePicture} alt={`${profile.username}'s profile`} />
//       <h1>{profile.channelName}</h1>
//       <p>{profile.about}</p>
//       <p>Email: {profile.email}</p>
//       <p>Username: {profile.username}</p>
//       <p>Created At: {new Date(profile.createdAt).toLocaleDateString()}</p>
//       <p>Updated At: {new Date(profile.updatedAt).toLocaleDateString()}</p>
//     </div>
//   );
// };

// export default Profile;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const Profile = () => {
//   const { userId } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     channelName: '',
//     about: '',
//     email: '',
//     profilePicture: ''
//   });

//   // Fetch user profile and videos
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch(`/api/users/profile/${userId}`);
//         const data = await response.json();
//         setProfile(data);
//         setProfileData({
//           channelName: data.channelName,
//           about: data.about,
//           email: data.email,
//           profilePicture: data.profilePicture
//         });
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchVideos = async () => {
//       try {
//         const response = await fetch(`/api/videos/channel/${userId}`);
//         const data = await response.json();
//         setVideos(data);
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
//       const response = await fetch('/api/users/profile/update', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(profileData)
//       });

//       if (response.ok) {
//         const updatedProfile = await response.json();
//         setProfile(updatedProfile);
//         setIsEditing(false); // Exit edit mode
//       } else {
//         console.error('Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   // Handle cancel edit
//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setProfileData({
//       channelName: profile.channelName,
//       about: profile.about,
//       email: profile.email,
//       profilePicture: profile.profilePicture
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="text-xl">Loading...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Profile Header */}
//       <div className="bg-white shadow-lg relative rounded-lg top-12 p-6 max-w-4xl mx-auto mt-6">
//         <div className="flex items-center space-x-4">
//           <img
//             src={profileData.profilePicture}
//             alt={`${profileData.username}'s profile`}
//             className="w-24 h-24 rounded-full object-cover"
//           />
//           <div>
//             {isEditing ? (
//               <div>
//                 {/* Edit Form */}
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="channelName" className="block text-sm text-gray-700">Channel Name</label>
//                     <input
//                       type="text"
//                       name="channelName"
//                       value={profileData.channelName}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="about" className="block text-sm text-gray-700">About</label>
//                     <textarea
//                       name="about"
//                       value={profileData.about}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
//                       rows="4"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={profileData.email}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="profilePicture" className="block text-sm text-gray-700">Profile Picture URL</label>
//                     <input
//                       type="url"
//                       name="profilePicture"
//                       value={profileData.profilePicture}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
//                     />
//                   </div>

//                   <div className="mt-4 flex space-x-4">
//                     <button
//                       onClick={handleSaveChanges}
//                       className="bg-blue-500 text-white py-2 px-4 rounded-md"
//                     >
//                       Save Changes
//                     </button>
//                     <button
//                       onClick={handleCancelEdit}
//                       className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <h1 className="text-3xl font-semibold text-gray-800">{profile.channelName}</h1>
//                 <p className="text-sm text-gray-600">{profile.username}</p>
//                 <p className="mt-2 text-gray-600">{profile.about}</p>
//                 <div className="mt-4 space-x-4">
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-md"
//                   >
//                     Edit Profile
//                   </button>
//                   <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md">Subscribe</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="mt-4">
//           <p className="text-sm text-gray-500">Email: {profile.email}</p>
//           <p className="text-sm text-gray-500">Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
//           <p className="text-sm text-gray-500">Updated: {new Date(profile.updatedAt).toLocaleDateString()}</p>
//         </div>
//       </div>

//       {/* Videos Section */}
//       <div className="max-w-4xl mx-auto mt-6">
//         <h2 className="text-2xl mt-16 font-semibold text-gray-800">Recent Videos</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
//           {videos.length > 0 ? (
//             videos.map((video) => (
//               <div key={video.id} className="bg-white shadow-md rounded-lg overflow-hidden">
//                 <img
//                   src={video.thumbnailUrl}
//                   alt={video.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
//                   <p className="text-sm text-gray-500 mt-2">{video.description}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 ">No videos available.</p>
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

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    channelName: '',
    username: '', // Added username field
    about: '',
    email: '',
    profilePicture: ''
  });
  const [progress, setProgress] = useState(0); // To track image upload progress

  // Fetch user profile and videos
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/profile/${userId}`);
        const data = response.data;
        setProfile(data);
        setProfileData({
          channelName: data.channelName,
          username: data.username, // Initialize username
          about: data.about,
          email: data.email,
          profilePicture: data.profilePicture
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put('/api/users/profile/update', profileData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const updatedProfile = response.data;
        setProfile(updatedProfile);
        setIsEditing(false); // Exit edit mode
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setProfileData({
      channelName: profile.channelName,
      username: profile.username, // Reset username to original
      about: profile.about,
      email: profile.email,
      profilePicture: profile.profilePicture
    });
  };

  // Handle image upload
  const uploadImage = async (e) => {
    console.log('uploading');
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube'); // Replace with your Cloudinary upload preset
    data.append('cloud_name', 'dshog03l1'); // Replace with your Cloudinary cloud name

    try {
      setLoading(true);
      const res = await axios.post('https://api.cloudinary.com/v1_1/dshog03l1/image/upload', data, {
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progressPercentage);
        },
      });

      setProfileData({ ...profileData, profilePicture: res.data.url });
      console.log(res.data.url);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    <div className="bg-gray-100 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white shadow-lg relative rounded-lg top-12 p-6 max-w-4xl mx-auto mt-6">
        <div className="flex items-center space-x-4">
          <img
            src={profileData.profilePicture}
            alt={`${profileData.username}'s profile`}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            {isEditing ? (
              <div>
                {/* Edit Form */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="channelName" className="block text-sm text-gray-700">Channel Name</label>
                    <input
                      type="text"
                      name="channelName"
                      value={profileData.channelName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-sm text-gray-700">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={profileData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-sm text-gray-700">About</label>
                    <textarea
                      name="about"
                      value={profileData.about}
                      onChange={handleChange}
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                      rows="4"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="profilePicture" className="block text-sm text-gray-700">Profile Picture</label>
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={uploadImage}
                      className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    />
                    {progress > 0 && progress < 100 && (
                      <div className="mt-2 text-sm text-gray-500">
                        Uploading: {progress}%
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={handleSaveChanges}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">{profile.channelName}</h1>
                <p className="text-sm text-gray-600">{profile.username}</p>
                <p className="mt-2 text-gray-600">{profile.about}</p>
                <div className="mt-4 space-x-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Edit Profile
                  </button>
                  <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md">Subscribe</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">Email: {profile.email}</p>
          <p className="text-sm text-gray-500">Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Videos Section */}
      <div className="max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl mt-16 font-semibold text-gray-800">Recent Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">{video.description}</p>
                  <p className="text-sm text-gray-500 mt-2">{format(video.createdAt)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 ">No videos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
