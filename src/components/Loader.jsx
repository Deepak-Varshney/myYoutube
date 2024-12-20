import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 border-t-4 border-gray-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;