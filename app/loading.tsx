import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-primary"></div>
    </div>
  );
};

export default Loader;
