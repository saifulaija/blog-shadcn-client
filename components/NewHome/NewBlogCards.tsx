'use client';
import React from 'react';
import CustomLoader from '../shared/CustomLoader/CustomLoader';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';
import NewBlog from './NewBlog';
import { IBlog } from '@/types/blog';

const NewBlogCards = () => {
  const { data, isLoading } = useGetAllBlogsQuery({});
  console.log(data);

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="w-full px-2 md:p-4">
      <div className="flex align-center gap-5 items-center">
        <h2 className="pt-10 text-gray-700 flex justify-center items-center text-divider w-[780px] md:w-[580px] font-semibold md:text-[15px] text-[12px]">
          Most Popular
        </h2>
      </div>
      <div className="wrapper mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4 md:m-0">
          {data?.blogs
            ?.slice(0, 3)
            .map((blog: IBlog, id: number) => (
              <NewBlog
                blog={blog}
                key={blog.id}
                className={`${
                  id % 2 === 0
                    ? 'col-span-2 row-span-2'
                    : 'col-span-1 row-span-1'
                } bg-white p-4 rounded-lg shadow-lg`}
              />
            ))}
        </div>
        <div className="flex-center mt-10"></div>
      </div>
    </div>
  );
};

export default NewBlogCards;
