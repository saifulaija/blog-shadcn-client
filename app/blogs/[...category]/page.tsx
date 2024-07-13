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
};
const CatchAllPage = ({ params }: TParams) => {
  const category = params.category[1];

  return (
    <div className="mt-5">
      <CategoryBlogs category={category} />
    </div>
  );
};

export default CatchAllPage;
