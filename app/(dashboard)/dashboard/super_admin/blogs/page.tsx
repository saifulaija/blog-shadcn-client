'use client'
import React from 'react'
import CustomLoader from '@/components/shared/CustomLoader/CustomLoader';

import { useGetAllBlogsQuery, useGetMyBlogsQuery } from '@/redux/features/blog/blogApi';
import { AllBlogsDataTable } from '../../moderator/show-blogs/components/allBlogsDataTable';
import { allBlogsColumn } from '../../moderator/show-blogs/components/column';





const BlogManagementPage = () => {
  const { data, isLoading } =useGetAllBlogsQuery({});
  return (
    <section className='py-5 px-2'>
      <div>
        <h3 className='text xl md:text-3xl font-semibold text-center mb-4'>All Blogs</h3>
        {
          isLoading ? <CustomLoader /> : (
            <AllBlogsDataTable data={data?.blogs ?? []} columns={allBlogsColumn} />
          )
        }
      </div>

    </section>
  )
}

export default BlogManagementPage