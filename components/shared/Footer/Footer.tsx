import { Card } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import assets from '@/public';
import { FaceIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Facebook, LocateOffIcon, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-100 border-t border-gray-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Logo and Description Section */}
          <div className=" md:items-center md:gap-4 w-full md:w-auto md:flex-grow-0">
            <Link href="/" className="flex items-center mb-2 md:mb-0">
              <Image
                src={assets.images.logo}
                width={40}
                height={40}
                alt={`${APP_NAME} logo`}
                className="rounded-md mr-2"
              />
              <span className="text-xl font-semibold text-gray-800">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs p-2">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin width={20} height={20} />
              <p className=" text-gray-600 "> Dinajpur,Bangladesh</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone width={20} height={20} />
              <span className="text-gray-600"> +8801874767969</span>
            </div>
          </div>
          {/* About Us Section */}
          <div className="flex flex-col items-start w-full md:w-auto md:flex-grow-0 max-w-xs">
            <h3 className="font-semibold text-gray-800 mb-2">About Us</h3>
            <p className="text-sm text-gray-600 text-balance">
              We are a dedicated team striving to bring insightful content on
              various topics.
            </p>
          </div>
          {/* Social Connect Section */}
          <div className="flex flex-col items-start w-full md:w-auto md:flex-grow-0 max-w-xs">
            <h3 className="font-semibold text-gray-800 mb-2">
              Connect with Us
            </h3>
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.facebook.com/sobuj.sorker.3"
                target="_blank"
                className="text-gray-600 hover:text-gray-800"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/reactjs-developer/"
                target="_blank"
                className="text-gray-600 hover:text-gray-800"
              >
                <LinkedInLogoIcon width={20} height={20} />
              </Link>
              <Link
                href="https://github.com/saifulaija"
                target="_blank"
                className="text-gray-600 hover:text-gray-800"
              >
                <GitHubLogoIcon width={20} height={20} />
              </Link>
            </div>
          </div>
        </div>
        {/* Footer Bottom Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
