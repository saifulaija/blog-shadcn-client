import { Metadata } from 'next';
import Bookmark from '../../../components/Bookmark';
import BookmarkBlogCard from '@/components/Home/BestBlog/BookmarkBlogCard';
import BlogDetailsCard from '@/app/(root)/blogs/components/BlogDetailsCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
type TParams = {
  params: {
    blogId: string;
  };
};

export const metadata: Metadata = {
  title: 'Details-blog || BlogPlex-bookmark',
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin',
};

const BookmarkPage = ({ params }: TParams) => {
  const blogId = params.blogId;
  return (
    <div className="mt-14">
      <div className="mb-6">
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
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <BlogDetailsCard blogId={blogId} />
    </div>
  );
};

export default BookmarkPage;
