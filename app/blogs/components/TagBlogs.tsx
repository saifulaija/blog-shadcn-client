'use client';
import { Slash } from 'lucide-react';
import { useDebounced } from '@/redux/hooks';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';

import { NoData } from '@/components/shared/NoData/NoData';
import { IBlog } from '@/types/blog';
import BlogCardSkeleton from '@/components/shared/CardLoader/BlogSkeleton';
import BestBlogCard from '@/components/Home/BestBlog/BlogCard';
import CategoryBlogCard from '@/components/Home/BestBlog/CategoryBlogCard';

const TagBlogs = ({ tag, q }: { tag: string; q: string }) => {
  const query: Record<string, any> = {};
  const debounceTerm = useDebounced({ searchQuery: q, delay: 700 });
  query['tag'] = tag;

  if (debounceTerm) {
    query['q'] = debounceTerm;
  }

  const { data, isLoading } = useGetAllBlogsQuery({ ...query });

  return (
    <div className="w-full mt-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs/tags">Tag</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{tag}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="wrapper">
        <div>
          <div className="flex justify-center items-center italic font-semibold p-2">
            {q && (
              <>
                <p>
                  {data?.blogs?.length
                    ? `Search result ${data.blogs.length}`
                    : ''}
                </p>
              </>
            )}
          </div>
          <div className="w-full">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <BlogCardSkeleton key={index} />
                ))}
              </div>
            ) : (data?.blogs?.length ?? 0) > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {data?.blogs?.map((blog: IBlog) => (
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

export default TagBlogs;
