import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice"

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    channelName: '',
    about: '',
    profilePicture: ''
  });
  const [progress, setProgress] = useState(0);
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
  const uploadImage = async (e) => {
    console.log("uploading")
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube'); // Replace with your Cloudinary upload preset
    data.append('cloud_name', 'dshog03l1');
    try {
      setLoading(true);
      const res = await axios.post('https://api.cloudinary.com/v1_1/dshog03l1/image/upload', data, {
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progressPercentage);
        }
      });
      setFormData({ ...formData, profilePicture: res.data.url });
      console.log(res.data.url)
      setLoading(false);
      
      // console.log(profilePicture)
    } catch (error) {
      console.log(error)
      setLoading(false);
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
      setProgress(0);
      if (isSignup) {
        navigate('/'); // Redirect to login page after successful signup
      } else {
        navigate('/'); // Redirect to Homepage after successful login
      }
    } catch (err) {
      console.log(err)
      console.log(err.response)
      setError(err.response?.data?.error || 'Something went wrong');
      setProgress(0);
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
    <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
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
                onChange={(e) => uploadImage(e)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
          </>
        )}
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
