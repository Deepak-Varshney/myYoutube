// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadVideoModal = ({ isOpen, toggleModal }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     videoLink: '',
//     thumbnail: ''
//   });

//   // Handle form data change
//   const handleChange = (e, name) => {
   
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: e.target.value
//     }));
//   };

  

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//      const response = await axios.post('/api/videos/upload', formData, {
//       });
      
//       if (response.status === 201) {
//         alert('Video uploaded successfully!');
//         onClose(); // Close modal after successful submission
//       }

//       console.log('Form data:', formData);
//     } catch (error) {
//       console.error('Error uploading video:', error);
//       alert('Failed to upload video!');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
//       <div className="bg-white p-6 rounded-lg w-[400px] relative">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Video</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Title */}
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-gray-600 font-medium">Title</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={(e)=>handleChange(e,'title')}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-gray-600 font-medium">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={(e)=>handleChange(e,'description')}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Video Link */}
//           <div className="mb-4">
//             <label htmlFor="videoLink" className="block text-gray-600 font-medium">Video Link</label>
//             <input
//               type="text"
//               id="videoLink"
//               name="videoLink"
//               value={formData.videoLink}
//               onChange={(e)=>handleChange(e,'videoLink')}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Thumbnail URL */}
//           <div className="mb-4">
//             <label htmlFor="thumbnail" className="block text-gray-600 font-medium">Thumbnail URL</label>
//             <input
//               type="text"
//               id="thumbnail"
//               name="thumbnail"
//               value={formData.thumbnail}
//               onChange={(e)=>handleChange(e,'thumbnail')}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Video File */}
//           {/* <div className="mb-4">
//             <label htmlFor="videoFile" className="block text-gray-600 font-medium">Video File</label>
//             <input
//               type="file"
//               id="videoFile"
//               name="videoFile"
//               accept="video/*"
//               onChange={handleFileChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div> */}

//           {/* Thumbnail File */}
//           {/* <div className="mb-4">
//             <label htmlFor="thumbnailFile" className="block text-gray-600 font-medium">Thumbnail Image</label>
//             <input
//               type="file"
//               id="thumbnailFile"
//               name="thumbnailFile"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div> */}

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </form>

//         <button
//           className="absolute top-2 right-2 text-gray-600 text-xl"
//           onClick={toggleModal}
//         >
//           &times;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadVideoModal;


import React, { useState } from 'react';
import axios from 'axios';

const UploadVideoModal = ({ isOpen, toggleModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoLink: '',
    thumbnail: ''
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.value
    }));
  };

  const handleFileUpload = async (e, type) => {
    console.log("Uploading")
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube'); // Replace with your Cloudinary upload preset
    data.append('cloud_name', 'dshog03l1'); // Replace with your Cloudinary cloud name

    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dshog03l1/${type}/upload`,data,
        
        {
          onUploadProgress: (progressEvent) => {
            const progressPercentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progressPercentage);
          }
        }
      );
      setLoading(false);
      setProgress(0);
      console.log(response.data.url)
      let val = type === 'video' ? 'videoLink' : 'thumbnail';
      setFormData({ ...formData, [val]: response.data.url });
    } catch (error) {
      setLoading(false);
      setProgress(0);
      console.error('Error uploading file:', error);
      alert('Failed to upload file!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/videos/upload', formData);
      if (response.status === 201) {
        alert('Video uploaded successfully!');
        toggleModal(); // Close modal after successful submission
      }
    } catch (error) {
      console.error('Error uploading video data:', error);
      alert('Failed to upload video!');
    }
  };

  if (!isOpen) return null;
console.log(formData)
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded-lg w-[400px] relative">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Video</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600 font-medium">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => handleChange(e, 'title')}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600 font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e, 'description')}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="videoFile" className="block text-gray-600 font-medium">Video File</label>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, 'video')}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="thumbnailFile" className="block text-gray-600 font-medium">Thumbnail Image</label>
            <input
              type="file"
              id="thumbnailFile"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'image')}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading && (
            <div className="mb-4">
              <div className="relative w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Uploading... {progress}%</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            Submit
          </button>
        </form>

        <button
          className="absolute top-2 right-2 text-gray-600 text-xl"
          onClick={toggleModal}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default UploadVideoModal;
