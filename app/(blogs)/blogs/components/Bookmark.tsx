'use client';

import BestBlogCard from '@/components/Home/BestBlog/BlogCard';
import BookmarkBlogCard from '@/components/Home/BestBlog/BookmarkBlogCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useAppSelector } from '@/redux/hooks';
import { IBlog } from '@/types/blog';
import { Slash } from 'lucide-react';

const Bookmark = () => {
  const bookmarks = useAppSelector((state) => state.bookmark.blogsItem);

  const q = 'creative';

  return (
    <div className="w-full py-14">
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
            <BreadcrumbLink href="/blogs/bookmarks">Bookmarks</BreadcrumbLink>
          </BreadcrumbItem>
          {q && (
            <>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{q}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks?.map((blog: IBlog) => <BookmarkBlogCard blog={blog} />)}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
