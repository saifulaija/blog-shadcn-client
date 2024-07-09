// "use client";
// import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
// import { useGetAllCommentsQuery } from "@/redux/features/comment/commentApi";
// import { useCreateLikeMutation } from "@/redux/features/like/likeApi";
// import { getUserInfo } from "@/services/authServices";
// import { TBlogResponse } from "@/types/blog";

// import Image from "next/image";
// import ReactHtmlParser from "html-react-parser";
// import { useState } from "react";
// import AuthorInformation from "./AuthorInformation";

// import {
//   MessageCircleMore,
//   ThumbsUp,
//   Bookmark,
//   Clipboard,
//   BookmarkCheck,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// import ShowComments from "./ShowComments";
// import BlogDetailsSkeleton from "./BlogDetailsSkeleton";
// import MyDialog from "@/components/shadcn/MyDialog";
// import { useToast } from "@/components/ui/use-toast";

// const BlogDetailsCard = ({ blogId }: { blogId: string }) => {
//   const { toast } = useToast();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(() => {
//     const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
//     return bookmarks.includes(blogId);
//   });

//   const user = getUserInfo();

//   const { data: comments } = useGetAllCommentsQuery(blogId);
//   const { data, isLoading } = useGetSingleBlogQuery(blogId);
//   const [createLike] = useCreateLikeMutation();
//   const [isLiked, setIsLiked] = useState(false);

//   const blog = data as TBlogResponse;
//   const newId = blogId;
//   const authorId = blog?.authorId;

//   const handleCreateLike = async (id: string) => {
//     const userData = {
//       userId: user?.userId,
//       blogId: id,
//     };

//     try {
//       await createLike(userData);
//       setIsLiked(!isLiked);
//     } catch (error) {
//       console.error("Error liking the blog:", error);
//     }
//   };

//   const handleBookmark = () => {
//     const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
//     if (bookmarks.includes(blogId)) {
//       const updatedBookmarks = bookmarks.filter((id: string) => id !== blogId);
//       localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
//       setIsBookmarked(false);
//     } else {
//       bookmarks.push(blogId);
//       localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
//       setIsBookmarked(true);
//     }
//   };

//   const handleCopyURL = () => {
//     const url = `${window.location.origin}/blogs/details/${blogId}`;
//     navigator.clipboard
//       .writeText(url)
//       .then(() => {
//         // alert('URL copied to clipboard!');
//         toast({
//           title: "Success",
//           description: "Url copied successfully",
//         });
//       })
//       .catch((err) => {
//         console.error("Failed to copy URL: ", err);
//       });
//   };

//   if (isLoading) {
//     return <BlogDetailsSkeleton />;
//   }

//   return (
//     <div className="w-full p-2 md:p-10">
//       <div className="wrapper border rounded-md">
//         <div className="flex flex-col md:flex-row md:justify-between gap-6 space-y-8 md:space-y-0">
//           <div className="md:w-1/3 space-y-4">
//             <AuthorInformation blog={blog} />
//           </div>
//           <div className="md:w-2/3 space-y-4">
//             <div className="relative w-full h-[400px]">
//               <Image
//                 src={blog?.image || "/placeholder-image.jpg"}
//                 alt="Blog Image"
//                 layout="fill"
//                 objectFit="cover"
//                 quality={100}
//                 className="rounded-t-md"
//               />
//             </div>
//             <div>
//               <p className="text-xl font-semibold">Category:</p>
//               <p className="text-sm text-muted-foreground/90 font-medium capitalize">
//                 {blog?.category}
//               </p>
//             </div>
//             <div>
//               <p className="text-xl font-semibold">Title:</p>
//               <p className="text-sm text-muted-foreground/90 font-medium capitalize">
//                 {blog?.title}
//               </p>
//             </div>
//             <div>
//               <p className="text-xl font-semibold">Description:</p>
//               <div className="text-sm text-muted-foreground/90 font-medium capitalize">
//                 {blog?.content
//                   ? ReactHtmlParser(blog.content)
//                   : "No description available"}
//               </div>
//             </div>
//             <div>
//               <p className="text-xl font-semibold">Conclusion:</p>
//               <p className="text-sm text-muted-foreground/90 font-medium capitalize">
//                 {blog?.conclusion
//                   ? ReactHtmlParser(blog.conclusion)
//                   : "No conclusion available"}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <div className="flex space-x-2">
//             <Button
//               variant="link"
//               asChild
//               onClick={() => handleCreateLike(blog?.id)}
//               className={`cursor-pointer ${isLiked ? "text-blue-500" : ""}`}
//             >
//               <div className="flex items-center justify-center">
//                 <ThumbsUp className="mr-1" />
//                 <span>{blog?.likeCount}</span>
//               </div>
//             </Button>
//             <Button
//               variant="link"
//               asChild
//               onClick={handleBookmark}
//               className="cursor-pointer"
//             >
//               <div className="flex items-center justify-center">
//                 {isBookmarked ? (
//                   <BookmarkCheck className="mr-1" />
//                 ) : (
//                   <Bookmark className="mr-1" />
//                 )}
//                 <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
//               </div>
//             </Button>
//             <Button
//               variant="link"
//               asChild
//               onClick={handleCopyURL}
//               className="cursor-pointer"
//             >
//               <div className="flex items-center justify-center">
//                 <Clipboard className="mr-1" />
//                 <span>Copy URL</span>
//               </div>
//             </Button>
//             <div>
//               <MyDialog
//                 triggerButton={
//                   <Button variant="link">
//                     {" "}
//                     <MessageCircleMore />
//                     {comments.length}
//                   </Button>
//                 }
//               >
//                 <ShowComments
//                   authorId={authorId}
//                   comments={comments}
//                   newId={newId}
//                 />
//               </MyDialog>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetailsCard;

// // 'use client'
// // import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
// // import { useGetAllCommentsQuery } from "@/redux/features/comment/commentApi";
// // import { useCreateLikeMutation } from "@/redux/features/like/likeApi";
// // import { getUserInfo } from "@/services/authServices";
// // import { TBlogResponse } from "@/types/blog";

// // import Image from "next/image";
// // import ReactHtmlParser from "html-react-parser";
// // import { useState } from "react";
// // import AuthorInformation from "./AuthorInformation";

// // import { MessageCircleMore, ThumbsUp } from "lucide-react";
// // import { Button } from "@/components/ui/button";

// // import ShowComments from "./ShowComments";
// // import BlogDetailsSkeleton from "./BlogDetailsSkeleton";
// // import MyDialog from "@/components/shadcn/MyDialog";

// // type TParams = {
// //     params: {
// //         blogId: string;
// //     }
// // };

// // const BlogDetailsCard = ({ blogId }: { blogId: string }) => {
// //     const [isOpen, setIsOpen] = useState(false)

// //     const user = getUserInfo();

// //     const { data: comments } = useGetAllCommentsQuery(blogId);
// //     const { data, isLoading } = useGetSingleBlogQuery(blogId);
// //     const [createLike] = useCreateLikeMutation();
// //     const [isLiked, setIsLiked] = useState(false);

// //     const blog = data as TBlogResponse;
// //     const newId = blogId;
// //     const authorId = blog?.authorId;

// //     const handleCreateLike = async (id: string) => {
// //         const userData = {
// //             userId: user?.userId,
// //             blogId: id,
// //         };

// //         try {
// //             await createLike(userData);
// //             setIsLiked(!isLiked);
// //         } catch (error) {
// //             console.error("Error liking the blog:", error);
// //         }
// //     };

// //     if (isLoading) {
// //         return <BlogDetailsSkeleton />
// //     }

// //     return (
// //         <div className="w-full p-2 md:p-10">
// //             <div className="wrapper border rounded-md">
// //                 <div className="flex flex-col md:flex-row md:justify-between gap-6 space-y-8 md:space-y-0">
// //                     <div className="md:w-1/3 space-y-4">
// //                         <AuthorInformation blog={blog} />
// //                     </div>
// //                     <div className="md:w-2/3 space-y-4">
// //                         <div className="relative w-full max-w-[800px] h-[300px] overflow-hidden rounded-md">
// //                             <Image
// //                                 src={blog?.image || "/placeholder-image.jpg"}
// //                                 alt="Blog Image"
// //                                 layout="fill"
// //                                 objectFit="cover"
// //                                 quality={100}
// //                             />
// //                         </div>
// //                         <div>
// //                             <p className="text-xl font-semibold">Category:</p>
// //                             <p className="text-sm text-muted-foreground/90 font-medium capitalize">{blog?.category}</p>
// //                         </div>
// //                         <div>
// //                             <p className="text-xl font-semibold">Title:</p>
// //                             <p className="text-sm text-muted-foreground/90 font-medium capitalize">{blog?.title}</p>
// //                         </div>
// //                         <div>
// //                             <p className="text-xl font-semibold">Description:</p>
// //                             <div className="text-sm text-muted-foreground/90 font-medium capitalize">

// //                                 {blog?.content ? ReactHtmlParser(blog.content) : "No description available"}
// //                             </div>
// //                         </div>
// //                         <div>
// //                             <p className="text-xl font-semibold">Conclusion:</p>
// //                             <p className="text-sm text-muted-foreground/90 font-medium capitalize">

// //                                 {blog?.conclusion ? ReactHtmlParser(blog.conclusion) : "No conclusion available"}

// //                             </p>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <div>
// //                     <div className="flex">
// //                         <Button
// //                             variant='link'
// //                             asChild
// //                             onClick={() => handleCreateLike(blog?.id)}
// //                             className={`cursor-pointer ${isLiked ? 'text-blue-500' : ''}`}
// //                         >
// //                             <div className="flex items-center justify-center">
// //                                 <ThumbsUp className="mr-1" />
// //                                 <span>{blog?.likeCount}</span>
// //                             </div>
// //                         </Button>
// //                         <div>

// //                             <MyDialog triggerButton={<Button variant="link"> <MessageCircleMore />{comments.length}</Button>}>
// //                                 <ShowComments authorId={authorId} comments={comments} newId={newId} />
// //                             </MyDialog>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default BlogDetailsCard;
"use client";
import { useCountBlogVoteMutation, useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { useGetAllCommentsQuery } from "@/redux/features/comment/commentApi";
import { useCreateLikeMutation } from "@/redux/features/like/likeApi";
import { getUserInfo } from "@/services/authServices";
import { TBlogResponse } from "@/types/blog";

import Image from "next/image";
import ReactHtmlParser from "html-react-parser";
import { useState } from "react";
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
} from "@/components/ui/alert-dialog";

import {
  MessageCircleMore,
  ThumbsUp,
  Bookmark,
  Clipboard,
  BookmarkCheck,
  MessageCircleMoreIcon,
  MessageCircle,
  ArrowBigUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import ShowComments from "./ShowComments";
import BlogDetailsSkeleton from "./BlogDetailsSkeleton";
import MyDialog from "@/components/shadcn/MyDialog";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BlogDetailsProps {
  blogId: string;
}

const BlogDetailsCard: React.FC<BlogDetailsProps> = ({ blogId }) => {
  
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [voteCountNumber, {  isError }] = useCountBlogVoteMutation();
  const[isCopy,setIsCopy]=useState(false)
  const handleVote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = !isUpvoted;
    setIsUpvoted(newValue);
    const action = newValue ? "upvote" : "downvote";

    try {
      const response = await voteCountNumber({ id: blog?.id, action }).unwrap();
      localStorage.setItem(`vote-${blog?.id}`, newValue ? "upvote" : "");
    } catch (error) {
      console.error("Error updating vote count:", error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const [isBookmarked, setIsBookmarked] = useState(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    return bookmarks.includes(blogId);
  });

  const user = getUserInfo();
  console.log(user);
  
  const router = useRouter();
  const handleLogin = () => {
    router.push("/signin");
  };
  const handleShareFlat = () => {
    router.push(`/dashboard/${user?.role}/flats`);
  };

  const { data: comments } = useGetAllCommentsQuery(blogId);
  const { data, isLoading } = useGetSingleBlogQuery(blogId);
  const [createLike] = useCreateLikeMutation();
  const [isLiked, setIsLiked] = useState(false);

  const blog = data as TBlogResponse;
  const newId = blogId;
  const authorId = blog?.authorId;

  const handleCreateLike = async (id: string) => {
    const userData = {
      userId: user?.userId,
      blogId: id,
    };

    try {
      await createLike(userData);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (bookmarks.includes(blogId)) {
      const updatedBookmarks = bookmarks.filter((id: string) => id !== blogId);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      bookmarks.push(blogId);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
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
          title: "Success",
          description: "Url copied successfully",
        });
      })
      
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  if (isLoading) {
    return <BlogDetailsSkeleton />;
  }

  return (
    <div className="w-full p-2 md:p-10">
      <div className="wrapper border rounded-md">
        <div className="">
          <div className="w-full space-y-4">
            <div className="relative w-full h-[400px]">
              <Image
                src={blog?.image || "/placeholder-image.jpg"}
                alt="Blog Image"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-t-md"
              />
            </div>
            <div>
              <p className="text-xl font-semibold">Category:</p>
              <p className="text-sm text-muted-foreground/90 font-medium capitalize">
                {blog?.category}
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold">Title:</p>
              <p className="text-sm text-muted-foreground/90 font-medium capitalize">
                {blog?.title}
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold">Description:</p>
              <div className="text-sm text-muted-foreground/90 font-medium capitalize">
                {blog?.content
                  ? ReactHtmlParser(blog.content)
                  : "No description available"}
              </div>
            </div>
            <div>
              <p className="text-xl font-semibold">Conclusion:</p>
              <p className="text-sm text-muted-foreground/90 font-medium capitalize">
                {blog?.conclusion
                  ? ReactHtmlParser(blog.conclusion)
                  : "No conclusion available"}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-4">
           
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
                        className={`w-5 h-5 ${isUpvoted ? "text-green-600" : ""}`}
                      />
                      {blog?.votes}
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isUpvoted ? "Remove Vote" : "Vote"}</p>
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
                    className={`w-5 h-5 ${showComments ? "text-green-600" : "text-gray-500"}`}
                  />
                  <p className="text-gray-600 font-bold ml-1 text-md"> {comments?.length}</p>
                </div>
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="cursor-pointer"
                    asChild
                    variant="link"
                    // onClick={handleLogin}
                  >
                    <div>
                      <MessageCircle className="mr-1" />
                      <p className="fond-bold text-md text-gray-600">
                        {" "}
                        {comments?.length}
                      </p>
                    </div>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you want to comments?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You need to login at first. Would you like to go to the
                      login page?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogin}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          
            <Button
              variant="link"
              asChild
              onClick={handleBookmark}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-center">
                {isBookmarked ? (
                  <BookmarkCheck className="text-green-600" />
                ) : (
                  <Bookmark className="mr-1 text-gray-600" />
                )}
                <span className="text-gray-600">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
              </div>
            </Button>
            <Button
              variant="link"
              asChild
              onClick={handleCopyURL}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-center">
                <Clipboard className={`mr-1 ${isCopy? 'text-green-600':'text-gray-600'}`} />
                <span className="text-gray-600">Copy URL</span>
              </div>
            </Button>
          </div>
          <AnimatePresence initial={false}>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ShowComments
                  authorId={authorId}
                  comments={comments}
                  newId={newId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsCard;
