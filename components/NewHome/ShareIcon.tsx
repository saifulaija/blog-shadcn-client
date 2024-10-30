import React from 'react';
import {
  FaFacebookF,
  FaPinterestP,
  FaVimeoV,
  FaTiktok,
  FaRss,
  FaWhatsapp,
  FaLinkedin,
  FaBookmark,
  FaArrowUp,
  FaArrowDown,
  FaCopy,
} from 'react-icons/fa';
const ShareIcon = () => {
  return (
    <div className="flex justify-center space-x-2 mb-2">
      {[FaFacebookF, FaWhatsapp, FaLinkedin, FaBookmark, FaArrowUp, FaCopy].map(
        (Icon, index) => (
          <div
            key={index}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-700 text-gray-100 hover:text-red-500 transition-all duration-200 cursor-pointer"
          >
            <Icon />
          </div>
        ),
      )}
    </div>
  );
};

export default ShareIcon;
