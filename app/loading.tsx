import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-[7px] border-t-primary"></div>
    </div>
  );
};

export default Loader;
