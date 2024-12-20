import React from 'react'
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdMic } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RiVideoAddLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineBell } from "react-icons/ai";
import logo from "../../src/assets/logo.png";
import Avatar from 'react-avatar';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center fixed top-0 w-[100%] bg-white px-6 py-2'>
      <div className='flex space-x-4 cursor-pointer items-center '>
        <HiOutlineMenu className='text-xl' />
        <img src={logo} alt="" className='w-28' />
      </div>
      <div className='w-[35%] hidden md:flex items-center'>
        <div className='w-[100%] px-3 py-2 rounded-l-full border border-gray-400'>
          <input type="text" placeholder='serach' className='outline-none ' />
        </div>
        <button className='px-4 py-2 border bg-gray-100 rounded-r-full border-gray-400'> <CiSearch  size={'24px'} /></button>
        <IoMdMic size={'42px'} className='lg:block hidden ml-3 border border-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200'/>
      </div>
      <div className='flex space-x-5 items-center '>
        <RiVideoAddLine className='text-2xl' />
        <AiOutlineBell className='text-2xl' />
        {/* <MdAccountCircle size={'24px'} /> */}
        <Avatar round={true} name='Deepak Varshney' size="32" textSizeRatio={1.75}/> 
      </div>
    </div>
  )
}

export default Navbar
