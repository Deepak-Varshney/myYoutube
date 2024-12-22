// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Auth = () => {
//   const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     channelName: '',
//     about: '',
//     profilePicture: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Submit form data (either for login or signup)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     const url = isSignup
//       ? '/api/auth/signup'
//       : '/api/auth/signin';

//     try {
//       const response = await axios.post(url, formData);
//       if (response.data.success === "Yes") {
//         if (isSignup) {
//           navigate('/auth'); // Redirect to login page after successful signup
//         } else {
//           localStorage.setItem('token', response.data.token); // Store token on login success
//           navigate('/'); // Redirect to dashboard
//         }
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Switch between signup and login forms
//   const toggleForm = () => {
//     setIsSignup((prevState) => !prevState);
//   };

//   return (
//     <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg mt-32">
//       <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Log In'}</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="username" className="block text-gray-700">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                 required
//               />
//             </div>
//         {
//             isSignup && (
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                 required
//               />
//             </div>
//         )}

//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//             required
//           />
//         </div>

//         {isSignup && (
//           <>
//             <div className="mb-4">
//               <label htmlFor="channelName" className="block text-gray-700">Channel Name</label>
//               <input
//                 type="text"
//                 name="channelName"
//                 value={formData.channelName}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="about" className="block text-gray-700">About</label>
//               <textarea
//                 name="about"
//                 value={formData.about}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="profilePicture" className="block text-gray-700">Profile Picture URL</label>
//               <input
//                 type="text"
//                 name="profilePicture"
//                 value={formData.profilePicture}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-1"
//               />
//             </div>
//           </>
//         )}

//         <button
//           type="submit"
//           className={`w-full p-3 bg-blue-600 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           disabled={loading}
//         >
//           {loading ? (isSignup ? 'Signing Up...' : 'Logging In...') : (isSignup ? 'Sign Up' : 'Log In')}
//         </button>
//       </form>

//       <p className="text-center mt-4">
//         {isSignup ? 'Already have an account?' : "Don't have an account?"}
//         <button
//           onClick={toggleForm}
//           className="text-blue-600 font-semibold ml-1"
//         >
//           {isSignup ? 'Log in now' : 'Sign up now'}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default Auth;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice"

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    channelName: '',
    about: '',
    profilePicture: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
const uploadImage = async(e) => {
  console.log("uploading")
  const files = e.target.files;
  const data = new FormData();
  data.append('file', files[0]);
  data.append('upload_preset', 'youtube'); // Replace with your Cloudinary upload preset
  data.append('cloud_name', 'dshog03l1');
  try {
    const res = await axios.post('https://api.cloudinary.com/v1_1/dshog03l1/image/upload', data);
    setFormData({ ...formData, profilePicture: res.data.url });
    console.log(res.data.url)
    // console.log(profilePicture)
  } catch (error) {
    console.log(error)
  }
}
  // Submit form data (either for login or signup)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    setLoading(true);
    setError('');

    const url = isSignup
      ? '/api/auth/signup'
      : '/api/auth/signin';

    try {
      const res = await axios.post(url, formData);
      dispatch(loginSuccess(res.data.others))
      console.log(res)
      console.log(res.data)
      console.log(res.data.others)

        if (isSignup) {
          navigate('/'); // Redirect to login page after successful signup
        } else {
          navigate('/'); // Redirect to Homepage after successful login
        }
    } catch (err) {
      console.log(err)
      console.log(err.response)
      // setError(err.response?.data?.error || 'Something went wrong');
      dispatch(loginFailure())

    } finally {
      setLoading(false);
    }
  };

  // Switch between signup and login forms
  const toggleForm = () => {
    setIsSignup((prevState) => !prevState);
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Log In'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {isSignup && (
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {isSignup && (
          <>
            <div className="mb-4">
              <label htmlFor="channelName" className="block text-gray-700">Channel Name</label>
              <input
                type="text"
                name="channelName"
                value={formData.channelName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="about" className="block text-gray-700">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="profilePicture" className="block text-gray-700">Profile Picture URL</label>
              <input
                type="file"
                accept='image/*'
                name="profilePicture"
                onChange={(e)=>uploadImage(e)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className={`w-full p-3 bg-blue-600 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (isSignup ? 'Signing Up...' : 'Logging In...') : (isSignup ? 'Sign Up' : 'Log In')}
        </button>
      </form>

      <p className="text-center mt-4">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={toggleForm}
          className="text-blue-600 font-semibold ml-1"
        >
          {isSignup ? 'Log in now' : 'Sign up now'}
        </button>
      </p>
    </div >
  );
};

export default Auth;
