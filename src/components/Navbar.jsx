import React, { useState } from 'react'
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdMic } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RiVideoAddLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineBell } from "react-icons/ai";
import logo from "../../src/assets/logo.png";
import Avatar from 'react-avatar';
import UploadVideoModal from './Upload';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import axios from 'axios';

const Navbar = () => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toggleModal = () => {
    // If no currentUser, redirect to /auth page
    if (currentUser) {
      setIsModalOpen(prevState => !prevState);
    } else {
      alert("You need to login first")
      navigate('/auth')
    }
  };
  const handleProfileModal = () => {
    setIsProfileModalOpen(prevState => !prevState);
  }
  const handleLogout = async() =>{
    try {
      const res = await axios.post('api/auth/signout');
      console.log(res.data.message)
      dispatch(logout())  
      alert(res.data.message)
      navigate('/')
      window.location.reload();
    } catch (error) {
      console.log(err.message)
      navigate('/')
    }
  }
  return (
    <div className='flex justify-between items-center fixed top-0 w-[100%] bg-white px-6 py-2'>
      <Link to='/'>
        <div className='flex space-x-4 cursor-pointer items-center '>
          <HiOutlineMenu className='text-xl' />
          <img src={logo} alt="" className='w-28' />
        </div>
      </Link>
      <div className='w-[35%] hidden md:flex items-center'>
        <div className='w-[100%] px-3 py-2 rounded-l-full border border-gray-400'>
          <input type="text" placeholder='serach' className='outline-none ' />
        </div>
        <button className='px-4 py-2 border bg-gray-100 rounded-r-full border-gray-400'> <CiSearch size={'24px'} /></button>
        <IoMdMic size={'42px'} className='lg:block hidden ml-3 border border-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200' />
      </div>
      <div className='flex space-x-5 items-center '>
        <RiVideoAddLine onClick={toggleModal} className='text-2xl' />
        {isModalOpen && <UploadVideoModal toggleModal={toggleModal} isOpen={isModalOpen} />}
        <AiOutlineBell className='text-2xl' />
        {/* <MdAccountCircle size={'24px'} /> */}
        {
          currentUser ? (
            <Avatar onClick={handleProfileModal} round={true} name={currentUser?.channelName} src={currentUser?.profilePicture} size="32" textSizeRatio={1.75} />
          ) : (
            <>
              <Link to={'/auth'} className='border flex border-sky-400'>
                <button className='text-sky-400 px-2'>Login</button>
                <MdAccountCircle size={'24px'} className='text-sky-400' />
              </Link>
            </>
          )
        }
        {/* <Avatar round={true} name='Deepak Varshney' size="32" textSizeRatio={1.75}/>  */}
        {isProfileModalOpen && (
          <div className="absolute top-12 right-0 bg-white w-64 h-72 border border-gray-300 rounded-lg shadow-lg z-500">
            <div className="flex flex-col items-center justify-between h-full p-4">
              {/* User Avatar and Info */}
              <Link to={`/profile/${currentUser._id}`} className="mb-4">
                <Avatar
                  round={true}
                  name={currentUser.channelName}
                  src={currentUser.profilePicture}
                  size="48"
                  textSizeRatio={1.75}
                />
              </Link>
              <h1 className="text-lg font-semibold text-gray-800">{currentUser.channelName}</h1>
              <h2 className="text-sm font-medium text-gray-600">{currentUser.email}</h2>

              {/* Buttons */}
              <div className="mt-4 w-full flex flex-col space-y-2">
                <Link to={`/profile/${currentUser._id}`}>
                  <button className="w-full py-2 px-4 text-sm font-medium text-blue-600 hover:bg-blue-100 rounded-md border border-blue-600 transition-all">
                    Your Channel
                  </button>
                </Link>
                <button
                  onClick={handleLogout} // Call your logout function here
                  className="w-full py-2 px-4 text-sm font-medium text-red-600 hover:bg-red-100 rounded-md border border-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}

export default Navbar
