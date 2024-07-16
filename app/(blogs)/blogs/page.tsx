import Blogs from '@/components/Home/Blogs/Blogs';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'All-blogs || BlogPlex',
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin',
};

const AllBlogsPage = ({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) => {
  const q = searchParams?.q || '';

  return (
    <div>
      <Blogs q={q} />
    </div>
  );
};

export default AllBlogsPage;
