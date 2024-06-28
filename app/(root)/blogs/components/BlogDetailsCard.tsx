'use client'
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { useGetAllCommentsQuery } from "@/redux/features/comment/commentApi";
import { useCreateLikeMutation } from "@/redux/features/like/likeApi";
import { getUserInfo } from "@/services/authServices";
import { TBlogResponse } from "@/types/blog";

import Image from "next/image";
import ReactHtmlParser from "html-react-parser";
import { useState } from "react";
import AuthorInformation from "./AuthorInformation";

import { MessageCircleMore, ThumbsUp, Bookmark, Clipboard, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

import ShowComments from "./ShowComments";
import BlogDetailsSkeleton from "./BlogDetailsSkeleton";
import MyDialog from "@/components/shadcn/MyDialog";
import { useToast } from "@/components/ui/use-toast";

const BlogDetailsCard = ({ blogId }: { blogId: string }) => {
    const {toast}=useToast()
    const [isOpen, setIsOpen] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(() => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        return bookmarks.includes(blogId);
    });

    const user = getUserInfo();

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
        navigator.clipboard.writeText(url).then(() => {
            // alert('URL copied to clipboard!');
            toast({
                title:'Success',
                description:'Url copied successfully'
            })
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
        });
    };

    if (isLoading) {
        return <BlogDetailsSkeleton />
    }

    return (
        <div className="w-full p-2 md:p-10">
            <div className="wrapper border rounded-md">
                <div className="flex flex-col md:flex-row md:justify-between gap-6 space-y-8 md:space-y-0">
                    <div className="md:w-1/3 space-y-4">
                        <AuthorInformation blog={blog} />
                    </div>
                    <div className="md:w-2/3 space-y-4">
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
                            <p className="text-sm text-muted-foreground/90 font-medium capitalize">{blog?.category}</p>
                        </div>
                        <div>
                            <p className="text-xl font-semibold">Title:</p>
                            <p className="text-sm text-muted-foreground/90 font-medium capitalize">{blog?.title}</p>
                        </div>
                        <div>
                            <p className="text-xl font-semibold">Description:</p>
                            <div className="text-sm text-muted-foreground/90 font-medium capitalize">
                                {blog?.content ? ReactHtmlParser(blog.content) : "No description available"}
                            </div>
                        </div>
                        <div>
                            <p className="text-xl font-semibold">Conclusion:</p>
                            <p className="text-sm text-muted-foreground/90 font-medium capitalize">
                                {blog?.conclusion ? ReactHtmlParser(blog.conclusion) : "No conclusion available"}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex space-x-2">
                        <Button
                            variant='link'
                            asChild
                            onClick={() => handleCreateLike(blog?.id)}
                            className={`cursor-pointer ${isLiked ? 'text-blue-500' : ''}`}
                        >
                            <div className="flex items-center justify-center">
                                <ThumbsUp className="mr-1" />
                                <span>{blog?.likeCount}</span>
                            </div>
                        </Button>
                        <Button
                            variant='link'
                            asChild
                            onClick={handleBookmark}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center justify-center">
                                {isBookmarked ? <BookmarkCheck className="mr-1" /> : <Bookmark className="mr-1" />}
                                <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                            </div>
                        </Button>
                        <Button
                            variant='link'
                            asChild
                            onClick={handleCopyURL}
                            className="cursor-pointer"
                        >
                            <div className="flex items-center justify-center">
                                <Clipboard className="mr-1" />
                                <span>Copy URL</span>
                            </div>
                        </Button>
                        <div>
                            <MyDialog triggerButton={<Button variant="link"> <MessageCircleMore />{comments.length}</Button>}>
                                <ShowComments authorId={authorId} comments={comments} newId={newId} />
                            </MyDialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailsCard;


// 'use client'
// import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
// import { useGetAllCommentsQuery } from "@/redux/features/comment/commentApi";
// import { useCreateLikeMutation } from "@/redux/features/like/likeApi";
// import { getUserInfo } from "@/services/authServices";
// import { TBlogResponse } from "@/types/blog";

// import Image from "next/image";
// import ReactHtmlParser from "html-react-parser";
// import { useState } from "react";
// import AuthorInformation from "./AuthorInformation";

// import { MessageCircleMore, ThumbsUp } from "lucide-react";
// import { Button } from "@/components/ui/button";


// import ShowComments from "./ShowComments";
// import BlogDetailsSkeleton from "./BlogDetailsSkeleton";
// import MyDialog from "@/components/shadcn/MyDialog";


// type TParams = {
//     params: {
//         blogId: string;
//     }
// };

// const BlogDetailsCard = ({ blogId }: { blogId: string }) => {
//     const [isOpen, setIsOpen] = useState(false)

//     const user = getUserInfo();

//     const { data: comments } = useGetAllCommentsQuery(blogId);
//     const { data, isLoading } = useGetSingleBlogQuery(blogId);
//     const [createLike] = useCreateLikeMutation();
//     const [isLiked, setIsLiked] = useState(false);

//     const blog = data as TBlogResponse;
//     const newId = blogId;
//     const authorId = blog?.authorId;

//     const handleCreateLike = async (id: string) => {
//         const userData = {
//             userId: user?.userId,
//             blogId: id,
//         };

//         try {
//             await createLike(userData);
//             setIsLiked(!isLiked);
//         } catch (error) {
//             console.error("Error liking the blog:", error);
//         }
//     };

//     if (isLoading) {
//         return <BlogDetailsSkeleton />
//     }

//     return (
//         <div className="w-full p-2 md:p-10">
//             <div className="wrapper border rounded-md">
//                 <div className="flex flex-col md:flex-row md:justify-between gap-6 space-y-8 md:space-y-0">
//                     <div className="md:w-1/3 space-y-4">
//                         <AuthorInformation blog={blog} />
//                     </div>
//                     <div className="md:w-2/3 space-y-4">
//                         <div className="relative w-full max-w-[800px] h-[300px] overflow-hidden rounded-md">
//                             <Image
//                                 src={blog?.image || "/placeholder-image.jpg"}
//                                 alt="Blog Image"
//                                 layout="fill"
//                                 objectFit="cover"
//                                 quality={100}
//                             />
//                         </div>
//                         <div>
//                             <p className="text-xl font-semibold">Category:</p>
//                             <p className="text-sm text-muted-foreground/90 font-medium capitalize">{blog?.category}</p>
//                         </div>
//                         <div>
//                             <p className="text-xl font-semibold">Title:</p>
//                             <p className="text-sm text-muted-foreground/90 font-medium capitalize">{blog?.title}</p>
//                         </div>
//                         <div>
//                             <p className="text-xl font-semibold">Description:</p>
//                             <div className="text-sm text-muted-foreground/90 font-medium capitalize">

//                                 {blog?.content ? ReactHtmlParser(blog.content) : "No description available"}
//                             </div>
//                         </div>
//                         <div>
//                             <p className="text-xl font-semibold">Conclusion:</p>
//                             <p className="text-sm text-muted-foreground/90 font-medium capitalize">

//                                 {blog?.conclusion ? ReactHtmlParser(blog.conclusion) : "No conclusion available"}

//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div className="flex">
//                         <Button
//                             variant='link'
//                             asChild
//                             onClick={() => handleCreateLike(blog?.id)}
//                             className={`cursor-pointer ${isLiked ? 'text-blue-500' : ''}`}
//                         >
//                             <div className="flex items-center justify-center">
//                                 <ThumbsUp className="mr-1" />
//                                 <span>{blog?.likeCount}</span>
//                             </div>
//                         </Button>
//                         <div>

//                             <MyDialog triggerButton={<Button variant="link"> <MessageCircleMore />{comments.length}</Button>}>
//                                 <ShowComments authorId={authorId} comments={comments} newId={newId} />
//                             </MyDialog>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BlogDetailsCard;
