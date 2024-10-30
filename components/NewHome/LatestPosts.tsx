'use client';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';
import CustomLoader from '../shared/CustomLoader/CustomLoader';
import Image from 'next/image';

const LatestPosts = () => {
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
          Latest posts
        </h2>
        <div>
          {data?.blogs?.slice(1, 5).map((item, index) => (
            <div
              className="mb-4 flex justify-between items-center gap-3"
              key={index}
            >
              <Image
                src={item?.image}
                alt={item?.title}
                width={120}
                height={120}
                className="object-cover rounded-md"
              />
              <div>
                <p className="text-gray-600 text-sm font-semibold mt-2">
                  {item.title}
                </p>
                <p className="text-red-500 text-opacity-70 text-xs">
                  {item?.category}
                </p>
                <p className="text-gray-400 text-xs ">
                  {new Date(item?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestPosts;
