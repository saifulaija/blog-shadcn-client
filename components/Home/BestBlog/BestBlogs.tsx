'use client';
import { IBlog } from '@/types/blog';
import BestBlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronDown, ChevronRight, SendHorizonal } from 'lucide-react';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';

const BestBlogsServer = () => {
  const { data } = useGetAllBlogsQuery({});
  return (
    <div className="w-full p-0 md:p-8">
      <div className="wrapper">
        <h1 className="h2-bold text-center p-10">Popular Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:m-0">
          {data?.blogs
            ?.slice(0, 8)
            .map((blog: IBlog) => <BestBlogCard blog={blog} key={blog.id} />)}
        </div>
        <div className="flex-center mt-10">
          <Button asChild className="group animate-in zoom-in duration-500">
            <Link
              href="/all_blogs"
              className="flex items-center gap-2 font-semibold"
            >
              View All
              <ChevronRight className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BestBlogsServer;
