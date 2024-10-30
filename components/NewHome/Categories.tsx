'use client';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';
import CustomLoader from '../shared/CustomLoader/CustomLoader';
import Image from 'next/image';
import { RxDotFilled } from 'react-icons/rx';

const Categories = () => {
  const { data, isLoading } = useGetAllBlogsQuery({});
  console.log(data?.blogs);

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <div>
      <div className="max-w-xs mx-auto border border-gray-300 rounded-lg p-4 mt-8 mb-8 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500 rounded-t-lg"></div>
        <h2 className="w-full text-center text-lg font-semibold text-gray-700 mb-4 tracking-wide border-b border-gray-300 pb-2">
          Categories
        </h2>
        <div>
          {data?.blogs?.slice(1, 5).map((item, index) => (
            <div className="mb-4" key={index}>
              <div className="flex justify-between  items-center gap-2">
                <div className="flex items-center gap-1">
                  <RxDotFilled className="text-red-500" />
                  <p className="text-gray-600  text-xs">{item?.category}</p>
                </div>
                <p className="text-gray-300 text-sm font-medium mt-1">
                  ({item?.title?.length})
                </p>
              </div>
              <div className="border-b border-gray-300 mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
