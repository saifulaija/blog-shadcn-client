import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaVimeoV,
} from 'react-icons/fa';

const SocialFollow = () => {
  return (
    <div className="max-w-xs mx-auto border border-gray-300 rounded-lg p-4 mt-8 mb-8 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500 rounded-t-lg"></div>
      <h2 className="w-full text-center text-lg font-semibold text-gray-700 tracking-wide border-b border-gray-300 pb-2">
        CONNECT & FOLLOW
      </h2>
      <div className="flex justify-center space-x-4 mt-4">
        <div className="w-10 h-10 cursor-pointer flex items-center justify-center border rounded-full text-gray-700 hover:text-red-500 transition">
          <FaFacebookF />
        </div>
        <div className="w-10 h-10 cursor-pointer flex items-center justify-center border rounded-full text-gray-700 hover:text-red-500 transition">
          <FaTwitter />
        </div>
        <div className="w-10 h-10 cursor-pointer flex items-center justify-center border rounded-full text-gray-700 hover:text-red-500 transition">
          <FaInstagram />
        </div>
        <div className="w-10 h-10 cursor-pointer flex items-center justify-center border rounded-full text-gray-700 hover:text-red-500 transition">
          <FaPinterestP />
        </div>
        <div className="w-10 h-10 cursor-pointer flex items-center justify-center border rounded-full text-gray-700 hover:text-red-500 transition">
          <FaVimeoV />
        </div>
      </div>
    </div>
  );
};

export default SocialFollow;
