'use client';
import React from 'react';
import CustomLoader from '@/components/shared/CustomLoader/CustomLoader';
import { blogColumn } from './components/column';
import { useGetMyBlogsQuery } from '@/redux/features/blog/blogApi';
import { BlogDataTable } from './components/blogDataTable';

const BlogManagementPage = () => {
  const { data, isLoading } = useGetMyBlogsQuery({});
  return (
    <section className="py-5 px-2">
      <div>
        <h3 className="text xl md:text-3xl font-semibold text-center mb-4">
          All Blogs
        </h3>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <BlogDataTable data={data?.blogs ?? []} columns={blogColumn} />
        )}
      </div>
    </section>
  );
};

export default BlogManagementPage;
