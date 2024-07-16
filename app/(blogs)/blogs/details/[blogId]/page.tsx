import React from 'react';

import { Metadata } from 'next';
import BlogDetailsCard from '@/app/(root)/blogs/components/BlogDetailsCard';

type TParams = {
  params: {
    blogId: string;
  };
};

import { Slash } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Blog-details || BlogPlex ',
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin',
};

const BlogDetailsPage = ({ params }: TParams) => {
  const blogId = params.blogId;
  return (
    <div className="mt-12">
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
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
          {/* {q && (
            <>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{q}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )} */}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-6">
        {' '}
        <BlogDetailsCard blogId={blogId} />
      </div>
    </div>
  );
};

export default BlogDetailsPage;
