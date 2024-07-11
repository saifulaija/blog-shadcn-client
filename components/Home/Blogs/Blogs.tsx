'use client';
import { useState } from 'react';
import { useDebounced } from '@/redux/hooks';

import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';
import BestBlogCard from '../BestBlog/BlogCard';
import { NoData } from '@/components/shared/NoData/NoData';
import { IBlog } from '@/types/blog';
import BlogCardSkeleton from '@/components/shared/CardLoader/BlogSkeleton';
import { Slash } from 'lucide-react';



import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const Blogs = ({ q }: { q: string }) => {
  const query: Record<string, any> = {};

  const debounceTerm = useDebounced({ searchQuery: q, delay: 700 });

  if (debounceTerm) {
    query['q'] = debounceTerm;
  }

  const { data, isLoading } = useGetAllBlogsQuery({ ...query });

  return (
    <div className="w-full py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
          </BreadcrumbItem>
          {q && (
            <>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{q}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="wrapper">
        <div>
          <h1 className="text-2xl font-semibold text-center">All Blogs</h1>

          <div className="w-full">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <BlogCardSkeleton key={index} />
                ))}
              </div>
            ) : (data?.blogs?.length ?? 0) > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {data?.blogs?.map((blog: IBlog) => (
                  <BestBlogCard blog={blog} key={blog.id} />
                ))}
              </div>
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

// 'use client';
// import { Input } from '@/components/ui/input';
// import { useState } from 'react';
// import { Search } from 'lucide-react';
// import { useDebounced } from '@/redux/hooks';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';
// import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';
// import BestBlogCard from '../BestBlog/BlogCard';
// import { NoData } from '@/components/shared/NoData/NoData';
// import { IBlog } from '@/types/blog';
// import BlogCardSkeleton from '@/components/shared/CardLoader/BlogSkeleton';

// const Blogs = ({q}:{q:string}) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const query: Record<string, any> = {};
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(8);
//   query['page'] = page;
//   query['limit'] = limit;
//   // const [q, setQ] = useState<string>('');
//   const debounceTerm = useDebounced({ searchQuery: q, delay: 700 });

//   // if (debounceTerm) {
//   //   query['q'] = q;
//   // }

//   const { data, isLoading } = useGetAllBlogsQuery({ ...query });

//   const meta = data?.meta;

//   const handlePrePage = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (page < pageCount) {
//       setPage(page + 1);
//     }
//   };

//   const pageCount = meta?.total ? Math.ceil(meta.total / limit) : 0;
//   const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

//   return (
//     <div className="w-full">
//       <div className="wrapper">
//         <div>
//           <h1 className="text-2xl font-semibold text-center">All Blogs</h1>

//           {/* <div className="w-full flex justify-center items-center my-5">
//             <div className="my-5 w-full max-w-md md:max-w-lg">
//               <div className="relative w-full">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   onChange={(e) => setQ(e.target.value)}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => setIsFocused(false)}
//                   placeholder="Search by category, description..."
//                   className="w-full appearance-none bg-background pl-8 shadow-none"
//                 />
//               </div>
//             </div>
//           </div> */}

//           <div className="w-full">
//             {isLoading ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {Array.from({ length: 8 }).map((_, index) => (
//                   <BlogCardSkeleton key={index} />
//                 ))}
//               </div>
//             ) : (data?.blogs?.length ?? 0) > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//                 {data?.blogs?.map((blog: IBlog) => (
//                   <BestBlogCard blog={blog} key={blog.id} />
//                 ))}
//               </div>
//             ) : (
//               <NoData />
//             )}
//           </div>

//           <div className="my-4 flex justify-center">
//             <Pagination>
//               <PaginationPrevious
//                 onClick={handlePrePage}
//                 className={page <= 1 ? 'pointer-events-none text-gray-400' : ''}
//               >
//                 Previous
//               </PaginationPrevious>
//               <PaginationContent className="flex items-center">
//                 {pages.map((pageNumber) => (
//                   <PaginationItem key={pageNumber}>
//                     <PaginationLink
//                       onClick={() => setPage(pageNumber)}
//                       className={`px-1 py-1 mx-1 rounded-full ${
//                         page === pageNumber ? 'bg-primary text-white' : ''
//                       }`}
//                     >
//                       {pageNumber}
//                     </PaginationLink>
//                   </PaginationItem>
//                 ))}
//               </PaginationContent>
//               <PaginationNext
//                 onClick={handleNextPage}
//                 className={
//                   page >= pageCount ? 'pointer-events-none text-gray-400' : ''
//                 }
//               >
//                 Next
//               </PaginationNext>
//             </Pagination>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blogs;
