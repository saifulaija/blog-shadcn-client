// import React from "react";

import Blogs from '@/components/Home/Blogs/Blogs';
import { Metadata } from 'next';
import React from 'react';
import TagBlogs from '../../blogs/components/TagBlogs';
export const metadata: Metadata = {
  title: 'Tag-blogs || BlogPlex ',
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin',
};
type TParams = {
  params: { tag: string[] };
  searchParams?: {
    q?: string;
  };
};
const CatchAllPage = ({ params, searchParams }: TParams) => {
  const tag = params.tag[1];
  const q = searchParams?.q || '';

  return (
    <div className="mt-5">
      <TagBlogs tag={tag} q={q} />
    </div>
  );
};

export default CatchAllPage;
