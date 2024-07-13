'use client';

import BestBlogCard from '@/components/Home/BestBlog/BlogCard';
import CategoryBlogCard from '@/components/Home/BestBlog/CategoryBlogCard';
import BlogCardSkeleton from '@/components/shared/CardLoader/BlogSkeleton';
import { NoData } from '@/components/shared/NoData/NoData';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';
import { useState } from 'react';


const CategoryBlogs = ({ category }: { category: string }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);


  const { data, isLoading } = useGetAllBlogsQuery({category});

  return (
    <div className="w-full">
      <div className="wrapper">
        <div>
          <h1 className="text-2xl font-semibold text-center p-5">
            {category} Blogs
          </h1>

          <div className="w-full">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <BlogCardSkeleton key={index} />
                ))}
              </div>
            ) : (data?.blogs?.length ?? 0) > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {data?.blogs.map((blog) => (
                  <CategoryBlogCard blog={blog} key={blog.id} />
                ))}
              </div>
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBlogs;
