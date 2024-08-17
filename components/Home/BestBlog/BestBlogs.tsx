'use client';
import { IBlog } from '@/types/blog';
import BestBlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';
import CustomLoader from '@/components/shared/CustomLoader/CustomLoader';
import CustomHeader from '@/components/shared/CustomHeader/CustomHeader';

const BestBlogsServer = () => {
  const { data, isLoading } = useGetAllBlogsQuery({});
  if (isLoading) {
    return <CustomLoader />;
  }
  return (
    <div className="w-full px-2 md:p-4 ">
      <CustomHeader title="Popular Blogs" />
      <div className="wrapper mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:m-0 ">
          {data?.blogs
            ?.slice(0, 8)
            .map((blog: IBlog) => <BestBlogCard blog={blog} key={blog.id} />)}
        </div>
        <div className="flex-center mt-10">
          <Button asChild className="group animate-in zoom-in duration-500">
            <Link
              href="/blogs"
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
