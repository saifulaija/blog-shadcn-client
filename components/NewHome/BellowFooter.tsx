import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaVimeoV,
  FaTiktok,
  FaRss,
} from 'react-icons/fa';

const BelowFooter = () => {
  return (
    <div className="bg-gray-800 px-12 py-12">
      {/* Social Icons Section */}
      <div className="flex justify-center space-x-4 mb-6">
        {[
          FaFacebookF,
          FaTwitter,
          FaInstagram,
          FaPinterestP,
          FaVimeoV,
          FaTiktok,
          FaRss,
        ].map((Icon, index) => (
          <div
            key={index}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-700 text-gray-100 hover:text-red-500 transition-all duration-200 cursor-pointer"
          >
            <Icon />
          </div>
        ))}
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center items-center space-x-6 text-gray-300 text-sm font-semibold mb-6">
        <p className="hover:text-red-500 cursor-pointer transition">Home</p>
        <p className="hover:text-red-500 cursor-pointer transition">About Us</p>
        <p className="hover:text-red-500 cursor-pointer transition">Blog</p>
        <p className="hover:text-red-500 cursor-pointer transition">Contact</p>
        <p className="hover:text-red-500 cursor-pointer transition">
          Privacy Policy
        </p>
        <p className="hover:text-red-500 cursor-pointer transition">
          Terms of Service
        </p>
      </div>

      {/* Footer Copyright */}
      <div className="text-gray-400 text-center text-xs">
        <p>© 2024 BlogPlex. All Rights Reserved.</p>
        <p className="mt-1">
          <span className="hover:text-red-500 cursor-pointer transition">
            Top
          </span>{' '}
          |<span className="ml-1">Back to Home</span>
        </p>
      </div>
    </div>
  );
};

export default BelowFooter;
