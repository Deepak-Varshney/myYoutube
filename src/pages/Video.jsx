import React from 'react'
import { Link } from 'react-router-dom'
import Time from '../loader/Time'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { abbreviateNumber } from 'js-abbreviation-number'
import { format } from 'timeago.js'
function Video({ video }) {
    console.log(video)
    return (
        <div className=''>
            <Link to={`/video/${video?._id}`} className=''>
                <div className='flex flex-col'>
                    <div className=' h-48 md:h-56 md: rounded-xl hover:rounded-none duration-200 overflow-hidden'>
                        <img src={video?.thumbnail} alt="" className='w-full object-cover h-full' />
                        {
                            video?.lengthSeconds && <Time time={video?.lengthSeconds} />
                        }
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
                            <span className='text-sm font-bold line-clamp-2'>{video?.title}</span>
                            <span className='flex items-center font-semibold mt-2 text-[12px] text-gray-600'>{video?.author?.title}{video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (<BsFillCheckCircleFill className='text-gray-600 ml-1 text-[12px]' />)}</span>
                            <div className='flex texgray-500 text-[12px]'>
                                <span>
                                    {`${abbreviateNumber(video?.views, 2)} Views`}
                                </span>
                                <span className="flex text-[24px] leading-none font-bold relative top-[-10px] mx-1">
                                    .
                                </span>
                                <span>{format(video?.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Video
