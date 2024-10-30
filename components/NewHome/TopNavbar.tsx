import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaVimeoV,
  FaTiktok,
  FaRss,
} from 'react-icons/fa';
const TopNavbar = () => {
  return (
    <div className="bg-black shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center p-2 text-white mx-12">
        <p className="text-xs">
          Latest Posts: <span>Pros & Cons of Being a Model</span>
        </p>
        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center space-x-4 mt-0">
            <div className="w-4 h-4 cursor-pointer flex items-center justify-center ">
              <FaFacebookF />
            </div>
            <div className="w-4 h-4 cursor-pointer flex items-center justify-center ">
              <FaTwitter />
            </div>
            <div className="w-4 h-4 cursor-pointer flex items-center justify-center ">
              <FaInstagram />
            </div>
            <div className="w-4 h-4 cursor-pointer flex items-center justify-center ">
              <FaPinterestP />
            </div>
            <div className="w-4 h-4 cursor-pointer flex items-center justify-center ">
              <FaVimeoV />
            </div>
            <div className="w-4 h-4 cursor-pointer flex items-center justify-center">
              <FaTiktok />
            </div>
            <div className="w-4 h-4 cursor-pointer flex items-center justify-center">
              <FaRss />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
