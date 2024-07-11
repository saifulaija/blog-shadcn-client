'use client';

import AddBlogForm from '@/components/Form/AddBlogForm';
import React from 'react';

const FlatSharePage = () => {
  return (
    <div className="mt-10 flex justify-center items-center w-full mx-auto ">
      <div className="w-full max-w-[700px] shadow-md rounded-sm border p-2 md:p-5">
        <h1 className="text-xl md:text-2xl font-semibold text-center">
          Add Blogs
        </h1>

        <AddBlogForm />
      </div>
    </div>
  );
};

export default FlatSharePage;
