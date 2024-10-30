import React from 'react';
import { IBlog } from '@/types/blog';
import Image from 'next/image';
import { Button } from '../ui/button';

interface NewBlogProps {
  blog: IBlog;
  className?: string;
}

const NewBlog: React.FC<NewBlogProps> = ({ blog }) => {
  return (
    <div className="relative overflow-hidden w-[650px] rounded-lg shadow-sm bg-white p-4 sm:p-6 md:p-8 ">
      <p className="text-xs md:text-sm text-gray-500 italic text-center mb-2">
        In
        <span className="text-red-600 text-opacity-60 text-sm text-center ms-2 md:text-base font-mono font-extrabold">
          {blog?.category}
        </span>
      </p>
      <p className="text-lg md:text-2xl font-thin text-center">{blog.title}</p>
      <div className="flex justify-center items-center gap-2">
        <p className="text-sm md:text-base">{blog?.author?.createdAt}</p> •
        <p className="text-sm md:text-base">{blog?.views} views</p>
      </div>

      <div className="h-48 md:h-80 w-full overflow-hidden mt-4">
        <Image
          src={blog.image}
          alt={blog.title}
          height={800}
          width={800}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="mt-4">
        <p className="text-xs md:text-sm text-gray-500 mt-2">{blog.content}</p>
        <div className="mt-4 flex justify-center items-center">
          <button className="text-red-500 text-xs uppercase">
            - Continue reading -
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white  border-t-2 border-b-2 flex justify-between gap-3  border-gray-300 p-4 md:p-6 ">
        <p className="text-xs md:text-sm text-gray-500 ">
          By
          <span className="text-red-600 ms-2 uppercase text-opacity-60 text-sm md:text-base font-mono font-extrabold">
            {blog?.author?.name}
          </span>
        </p>
        <div className="flex gap-3">
          <p className="text-xs md:text-sm">{blog?.views} views</p>
          <p className="text-xs md:text-sm">Share on social media with links</p>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
