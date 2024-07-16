// import React from "react";

import Blogs from '@/components/Home/Blogs/Blogs';
import { Metadata } from 'next';
import React from 'react';
import CategoryBlogs from '../../(blogs)/blogs/components/CategoryBlogs';

export const metadata: Metadata = {
  title: 'blogs-category || BlogPlex ',
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin',
};
type TParams = {
  params: { category: string[] };
  searchParams?: {
    q?: string;
  };
};
const CatchAllPage = ({ params, searchParams }: TParams) => {
  const category = params.category[1];
  const q = searchParams?.q || '';

  return (
    <div className="mt-5">
      <CategoryBlogs category={category} q={q} />
    </div>
  );
};

export default CatchAllPage;
