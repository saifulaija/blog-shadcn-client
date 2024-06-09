
'use client'

import { Card } from "@/components/ui/card";

import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { useGetAllCommentsQuery } from "@/redux/features/comment/commentApi";
import { useCreateLikeMutation } from "@/redux/features/like/likeApi";
import { getUserInfo } from "@/services/authServices";
import { TBlogResponse } from "@/types/blog";

import Image from "next/image";
import ReactHtmlParser from "html-react-parser";
import { useState } from "react";
import AuthorInformation from "./AuthorInformation";
import CustomLoader from "@/components/shared/CustomLoader/CustomLoader";
import { MessageCircleMore, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentsCard } from "./Comments";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import ShowComments from "./ShowComments";


type TParams = {
    params: {
        blogId: string;
    }
};

const BlogDetailsCard = ({ blogId }: { blogId: string }) => {
    const [isOpen, setIsOpen] = useState(false)
    // const { blogId } = params;
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

    if (isLoading) {
        return <CustomLoader />
    }

    return (
        <div className="w-full p-10">
            <div className="wrapper border">
                <div className="flex flex-col md:flex-row md:justify-between gap-2 p-10 space-y-8 md:space-y-0">
                    <div className="md:w-1/3 space-y-4">
                        <AuthorInformation blog={blog} />
                    </div>
                    <div className="md:w-2/3 space-y-4">
                        <div className="relative w-full max-w-[800px] h-[300px] overflow-hidden rounded-md">
                            <Image
                                src={blog?.image || "/placeholder-image.jpg"}
                                alt="Blog Image"
                                layout="fill"
                                objectFit="cover"
                                quality={100}
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
                                {ReactHtmlParser(blog?.content)}
                            </div>
                        </div>
                        <div>
                            <p className="text-xl font-semibold">Conclusion:</p>
                            <p className="text-sm text-muted-foreground/90 font-medium capitalize">{blog?.conclusion}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div  className="flex">
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
                      <div>
                            <Collapsible
                                open={isOpen}
                                onOpenChange={setIsOpen}
    
                            >
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MessageCircleMore />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
    
                                <CollapsibleContent className="w-full">
                                    <ShowComments authorId={authorId} comments={comments} newId={newId} />
                                </CollapsibleContent>
    
                            </Collapsible>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailsCard;
