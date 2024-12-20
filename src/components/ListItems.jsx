import React from 'react'

function ListItems() {
    const categories = [
        "All", "Music", "Gaming", "Movies", "News", "Live", "Fashion", "Learning", "Sports", "360 Video", "Browse channels", "Comedy", "Hindi", "Trending", "History", "Science", "Technology", "Travel", "Browse channels"
    ];

    return (
        <div className='flex overflow-x-scroll hide-scrollbar px-4'>
            <div className='flex space-x-4 flex-nowrap'>
                {
                    categories.map((category) => (
                        <div key={category} className='flex-none bg-gray-200 hover:bg-gray-300 duration-300 rounded-xl px-4 py-2 font-medium text-gray-700 cursor-pointer flex'>{category}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListItems
