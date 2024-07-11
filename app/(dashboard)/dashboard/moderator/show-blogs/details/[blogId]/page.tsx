import React from 'react';

import { Metadata } from 'next';
import BlogDetailsCard from '../../components/BlogDetailsCard';

type TParams = {
  params: {
    blogId: string;
  };
};

export const metadata: Metadata = {
  title: 'Blog-details || BlogPlex ',
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin',
};

const BlogDetailsPage = ({ params }: TParams) => {
  const blogId = params.blogId;
  return (
    <div>
      <BlogDetailsCard blogId={blogId} />
    </div>
  );
};

export default BlogDetailsPage;
