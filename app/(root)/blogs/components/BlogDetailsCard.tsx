// 'use client';
// import {
//   useCountBlogVoteMutation,
//   useGetSingleBlogQuery,
// } from '@/redux/features/blog/blogApi';
// import { useGetAllCommentsQuery } from '@/redux/features/comment/commentApi';
// import { useCreateLikeMutation } from '@/redux/features/like/likeApi';
// import { getUserInfo } from '@/services/authServices';
// import { TBlogResponse, TTag } from '@/types/blog';

// import Image from 'next/image';
// import ReactHtmlParser from 'html-react-parser';
// import { useState } from 'react';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';

// import {
//   Bookmark,
//   Clipboard,
//   BookmarkCheck,
//   MessageCircle,
//   ArrowBigUp,
//   Eye,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// import ShowComments from './ShowComments';

// import { useToast } from '@/components/ui/use-toast';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { Card } from '@/components/ui/card';
// import { MyAvatar } from '@/components/shadcn/MyAvatar';
// import { Separator } from '@/components/ui/separator';
// interface BlogDetailsProps {
//   blogId: string;
// }

// import { format } from 'date-fns';
// import Link from 'next/link';

// import { cn } from '@/lib/utils';
// import { FaSpinner } from 'react-icons/fa';
// import CustomLoader from '@/components/shared/CustomLoader/CustomLoader';

// const BlogDetailsCard: React.FC<BlogDetailsProps> = ({ blogId }) => {
//   const { toast } = useToast();
//   const [showComments, setShowComments] = useState(false);
//   const [isUpvoted, setIsUpvoted] = useState(false);
//   const [voteCountNumber, { isError }] = useCountBlogVoteMutation();
//   const [isCopy, setIsCopy] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleVote = async (e: React.MouseEvent) => {
//     e.stopPropagation();
//     const newValue = !isUpvoted;
//     setIsUpvoted(newValue);
//     const action = newValue ? 'upvote' : 'downvote';

//     try {
//       const response = await voteCountNumber({ id: blog?.id, action }).unwrap();
//       localStorage.setItem(`vote-${blog?.id}`, newValue ? 'upvote' : '');
//     } catch (error) {
//       console.error('Error updating vote count:', error);
//     }
//   };

//   const toggleComments = () => {
//     setShowComments(!showComments);
//   };

//   const [isBookmarked, setIsBookmarked] = useState(() => {
//     const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
//     return bookmarks.includes(blogId);
//   });

//   const user = getUserInfo();

//   const router = useRouter();
//   const handleLogin = () => {
//     router.push('/signin');
//   };

//   const { data: comments } = useGetAllCommentsQuery(blogId);
//   const { data, isLoading } = useGetSingleBlogQuery(blogId);

//   const blog = data as TBlogResponse;
//   const newId = blogId;
//   const authorId = blog?.authorId;
//   const formattedDate = blog?.createdAt
//     ? format(new Date(blog.createdAt), 'dd/MM/yyyy')
//     : '';

//   const handleBookmark = () => {
//     const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
//     if (bookmarks.includes(blogId)) {
//       const updatedBookmarks = bookmarks.filter((id: string) => id !== blogId);
//       localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
//       setIsBookmarked(false);
//     } else {
//       bookmarks.push(blogId);
//       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//       setIsBookmarked(true);
//     }
//   };

//   const handleCopyURL = () => {
//     const url = `${window.location.origin}/blogs/details/${blogId}`;
//     setIsCopy(!isCopy);
//     navigator.clipboard
//       .writeText(url)
//       .then(() => {
//         toast({
//           title: 'Success',
//           description: 'Url copied successfully',
//         });
//       })

//       .catch((err) => {
//         console.error('Failed to copy URL: ', err);
//       });
//   };

//   if (isLoading) {
//     return <CustomLoader />;
//   }

//   return (
//     <Card>
//       <div className="w-full md:space-y-4">
//         <div className="relative w-full h-[500px] max-w-[1200px]">
//           {loading && (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <FaSpinner className="animate-spin" />
//             </div>
//           )}
//           <img
//             src={blog?.image || '/placeholder-image.jpg'}
//             alt={'image'}
//             loading="lazy"
//             className={`rounded-t-md object-cover w-full h-full transition-opacity duration-300 ${
//               loading ? 'opacity-0' : 'opacity-100'
//             }`}
//             onLoad={() => setLoading(false)}
//             onError={() => setLoading(false)} // Handle error case
//           />
//         </div>

//         <div className="flex justify-between items-center px-2">
//           <div className="flex items-center gap-2">
//             <MyAvatar
//               url={blog?.author?.profilePhoto || '/photo'}
//               alt={blog?.author?.name || 'author'}
//             />
//             <p className="text-sm font-medium">{blog?.author?.name}</p>
//           </div>
//           <div className="flex items-center gap-0.5">
//             <Eye />
//             <p>{blog?.views}</p>
//           </div>
//           <p className="text-sm">{formattedDate}</p>
//         </div>
//         <Separator />
//         <div className="px-2">
//           <div>
//             <p className="text-xl font-semibold">Category:</p>
//             <p className="text-sm text-muted-foreground font-medium capitalize">
//               {blog?.category}
//             </p>
//           </div>
//           <div>
//             <p className="md:text-md text-xl font-semibold">{blog?.title}</p>
//           </div>
//           <div>
//             <div className="text-sm text-muted-foreground font-medium capitalize">
//               {blog?.content
//                 ? ReactHtmlParser(blog.content)
//                 : 'No description available'}
//             </div>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground font-medium my-10">
//               {blog?.conclusion
//                 ? ReactHtmlParser(blog.conclusion)
//                 : 'No conclusion available'}
//             </p>
//           </div>
//           <div className="flex items-center gap-1.5">
//             {blog?.tag &&
//               blog?.tag?.map((item: TTag, index: number) => (
//                 <div key={index}>
//                   {' '}
//                   <Link
//                     href={`/blog/tag/${item.name}`}
//                     className={cn('font-medium tracking-normal text-xl')}
//                   >
//                     #{item.name}
//                   </Link>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>

//       <div>
//         <Separator className="mt-10" />
//         <div className="flex items-center justify-center space-x-4">
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <motion.div
//                   initial={{ scale: 1 }}
//                   animate={{ scale: 1.2 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Button
//                     variant="ghost"
//                     className="text-gray-500 font-bold"
//                     onClick={handleVote}
//                   >
//                     <ArrowBigUp
//                       className={`w-5 h-5 ${isUpvoted ? 'text-green-600' : ''}`}
//                     />
//                     {blog?.votes}
//                   </Button>
//                 </motion.div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{isUpvoted ? 'Remove Vote' : 'Vote'}</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>

//           {user?.userId ? (
//             <Button
//               asChild
//               variant="link"
//               onClick={toggleComments}
//               className="cursor-pointer"
//             >
//               <div className="text-gray-500">
//                 <MessageCircle
//                   className={`w-5 h-5 ${showComments ? 'text-green-600' : 'text-gray-500'}`}
//                 />
//                 <p className="text-gray-500 font-bold"> {comments?.length}</p>
//               </div>
//             </Button>
//           ) : (
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button className="cursor-pointer" asChild variant="link">
//                   <div>
//                     <MessageCircle className="mr-1 text-gray-500 font-bold" />
//                     <p className="text-gray-500 font-bold">
//                       {comments?.length}
//                     </p>
//                   </div>
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Are you want to comments?</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     You need to login at first. Would you like to go to the
//                     login page?
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                   <AlertDialogAction onClick={handleLogin}>
//                     Continue
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           )}

//           <Button
//             variant="link"
//             asChild
//             onClick={handleBookmark}
//             className="cursor-pointer"
//           >
//             <div className="flex items-center justify-center">
//               {isBookmarked ? (
//                 <BookmarkCheck className="text-green-600" />
//               ) : (
//                 <Bookmark className="mr-1 text-gray-600" />
//               )}
//               <span className="text-gray-600">
//                 {isBookmarked ? 'Bookmarked' : 'Bookmark'}
//               </span>
//             </div>
//           </Button>
//           <Button
//             variant="link"
//             asChild
//             onClick={handleCopyURL}
//             className="cursor-pointer"
//           >
//             <div className="flex items-center justify-center">
//               <Clipboard
//                 className={`mr-1 ${isCopy ? 'text-green-600' : 'text-gray-600'}`}
//               />
//               <span className="text-gray-600">Copy URL</span>
//             </div>
//           </Button>
//         </div>

//         <AnimatePresence initial={false}>
//           {showComments && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden"
//             >
//               <ShowComments
//                 authorId={authorId}
//                 comments={comments}
//                 newId={newId}
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </Card>
//   );
// };

// export default BlogDetailsCard;

'use client';
import {
  useCountBlogVoteMutation,
  useGetSingleBlogQuery,
} from '@/redux/features/blog/blogApi';
import { useGetAllCommentsQuery } from '@/redux/features/comment/commentApi';
import { useCreateLikeMutation } from '@/redux/features/like/likeApi';
import { getUserInfo } from '@/services/authServices';
import { TBlogResponse, TTag } from '@/types/blog';

import Image from 'next/image';
import ReactHtmlParser from 'html-react-parser';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
  Bookmark,
  Clipboard,
  BookmarkCheck,
  MessageCircle,
  ArrowBigUp,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import ShowComments from './ShowComments';

import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { MyAvatar } from '@/components/shadcn/MyAvatar';
import { Separator } from '@/components/ui/separator';
interface BlogDetailsProps {
  blogId: string;
}

import { format } from 'date-fns';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { FaSpinner } from 'react-icons/fa';
import CustomLoader from '@/components/shared/CustomLoader/CustomLoader';

const BlogDetailsCard: React.FC<BlogDetailsProps> = ({ blogId }) => {
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [voteCountNumber, { isError }] = useCountBlogVoteMutation();
  const [isCopy, setIsCopy] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = !isUpvoted;
    setIsUpvoted(newValue);
    const action = newValue ? 'upvote' : 'downvote';

    try {
      const response = await voteCountNumber({ id: blog?.id, action }).unwrap();
      localStorage.setItem(`vote-${blog?.id}`, newValue ? 'upvote' : '');
    } catch (error) {
      console.error('Error updating vote count:', error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const [isBookmarked, setIsBookmarked] = useState(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    return bookmarks.includes(blogId);
  });

  const user = getUserInfo();

  const router = useRouter();
  const handleLogin = () => {
    router.push('/signin');
  };

  const { data: comments } = useGetAllCommentsQuery(blogId);
  const { data, isLoading } = useGetSingleBlogQuery(blogId);

  const blog = data as TBlogResponse;
  const newId = blogId;
  const authorId = blog?.authorId;
  const formattedDate = blog?.createdAt
    ? format(new Date(blog.createdAt), 'dd/MM/yyyy')
    : '';

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (bookmarks.includes(blogId)) {
      const updatedBookmarks = bookmarks.filter((id: string) => id !== blogId);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      bookmarks.push(blogId);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  const handleCopyURL = () => {
    const url = `${window.location.origin}/blogs/details/${blogId}`;
    setIsCopy(!isCopy);
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          title: 'Success',
          description: 'Url copied successfully',
        });
      })

      .catch((err) => {
        console.error('Failed to copy URL: ', err);
      });
  };

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <Card className="relative">
      <div className="w-full md:space-y-4">
        <div className="relative w-full h-[500px] md:max-w-[1200px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="animate-spin" />
            </div>
          )}
          <img
            src={blog?.image || '/placeholder-image.jpg'}
            alt={'image'}
            loading="lazy"
            className={`rounded-t-md object-cover w-full h-full transition-opacity duration-300 ${
              loading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)} // Handle error case
          />
        </div>

        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-2">
            <MyAvatar
              url={blog?.author?.profilePhoto || '/photo'}
              alt={blog?.author?.name || 'author'}
            />
            <p className="text-sm font-medium">{blog?.author?.name}</p>
          </div>
          <div className="flex items-center gap-0.5">
            <Eye />
            <p>{blog?.views}</p>
          </div>
          <p className="text-sm">{formattedDate}</p>
        </div>
        <Separator />
        <div className="px-2">
          <div>
            <p className="text-xl font-semibold">Category:</p>
            <p className="text-sm text-muted-foreground font-medium capitalize">
              {blog?.category}
            </p>
          </div>
          <div>
            <p className="md:text-md text-xl font-semibold">{blog?.title}</p>
          </div>
          <div>
            <div className="text-sm text-muted-foreground font-medium capitalize">
              {blog?.content
                ? ReactHtmlParser(blog.content)
                : 'No description available'}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium my-10">
              {blog?.conclusion
                ? ReactHtmlParser(blog.conclusion)
                : 'No conclusion available'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {blog?.tag &&
              blog?.tag?.map((item: TTag, index: number) => (
                <div key={index}>
                  {' '}
                  <Link
                    href={`/blog/tag/${item.name}`}
                    className={cn('font-medium tracking-normal text-xl')}
                  >
                    #{item.name}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md md:static md:shadow-none">
        <Separator className="mt-10" />
        <div className="flex items-center justify-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    className="text-gray-500 font-bold"
                    onClick={handleVote}
                  >
                    <ArrowBigUp
                      className={`w-5 h-5 ${isUpvoted ? 'text-green-600' : ''}`}
                    />
                    {blog?.votes}
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isUpvoted ? 'Remove Vote' : 'Vote'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {user?.userId ? (
            <Button
              asChild
              variant="link"
              onClick={toggleComments}
              className="cursor-pointer"
            >
              <div className="text-gray-500">
                <MessageCircle
                  className={`w-5 h-5 ${showComments ? 'text-green-600' : 'text-gray-500'}`}
                />
                <p className="text-gray-500">{comments?.length}</p>
              </div>
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="link"
                  onClick={toggleComments}
                  className="cursor-pointer"
                >
                  <div className="text-gray-500">
                    <MessageCircle className="w-5 h-5 text-gray-500" />
                    <p className="text-gray-500">{comments?.length}</p>
                  </div>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Login to Comment</AlertDialogTitle>
                  <AlertDialogDescription>
                    You must be logged in to view and post comments. Do you want
                    to login?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogin}>
                    Login
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    onClick={handleBookmark}
                    className="text-gray-500 font-bold"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-5 h-5 text-green-600" />
                    ) : (
                      <Bookmark className="w-5 h-5 text-gray-500" />
                    )}
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bookmark</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="ghost"
                    className="text-gray-500 font-bold"
                    onClick={handleCopyURL}
                  >
                    <Clipboard
                      className={`w-5 h-5 ${isCopy ? 'text-green-600' : 'text-gray-500'}`}
                    />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy URL</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="md:max-w-[1200px]">
              <ShowComments
                authorId={authorId}
                comments={comments}
                newId={newId}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default BlogDetailsCard;
