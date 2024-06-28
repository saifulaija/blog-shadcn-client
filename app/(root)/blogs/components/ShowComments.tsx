import React, { useState } from "react";




import { FieldValues, useForm } from "react-hook-form";


import {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useGetSingleCommentQuery,
} from "@/redux/features/comment/commentApi";


import { getUserInfo } from "@/services/authServices";
import { comment } from "postcss";
import { MyAvatar } from "@/components/shadcn/MyAvatar";
import { Button } from "@/components/ui/button";
import {  Loader, Send, } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";


import MyDialog from "@/components/shadcn/MyDialog";
import CommentUpdateForm from "@/components/Form/CommentUpdateForm";

const formSchema = z.object({
    content: z.string()

});

// Default form values
const defaultValues = {
    content: "",
};

// Component to display comments and add new ones
const ShowComments = ({
    comments,
    authorId,
    newId,
}: {
    comments: any[];
    authorId: string;
    newId: string;
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [commentId, setCommentId] = useState<string>("");
    const [createComment, { isLoading }] = useCreateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    const user = getUserInfo();
    const { data, isLoading: update } = useGetSingleCommentQuery(commentId);




    const myCommentData = comments.filter(
        (item) => item.comment.id === user.userId
    );
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",

        },
    });

    const handleSendComment = async (values: FieldValues) => {
        const commentData = { ...values, authorId, blogId: newId };

        const res = await createComment(commentData);
    };

    const handleEditComment = (id: string) => {
        console.log(id);
        setCommentId(id);
        setIsModalOpen(true);
    };

    const handleDeleteComment = async (commentId: string) => {
        await deleteComment(commentId);
    };

 

    return (

        <div className="">
            {user ? (
                <div>
                    {comments?.map((comment, index) => (
                        <div
                            key={comment.id}
                            className={`p-2 rounded ${comment.comment.id === user?.userId ? 'bg-background/50' : 'bg-background'}`}
                        >
                            <div className=" flex flex-col border border-gray-300 rounded-md p-4 max-w-[400px] w-full">

                                <div className="flex justify-start items-center gap-2">
                                    {/* <Image src={}/> */}
                                    <MyAvatar url={comment?.comment?.profilePhoto} alt="user" />
                                    <p>
                                        {comment?.comment?.name || comment?.comment?.email}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between"  >
                                    <p
                                        className={`text-sm text-right p-2 rounded-lg ${comment.comment.id === user.userId ? 'bg-background' : 'bg-background'
                                            }`}
                                    >
                                        {comment?.content}
                                    </p>

                                    {comment?.comment?.id === user?.userId && (
                                        <div className="flex justify-end gap-2">

                                            <MyDialog triggerButton={<Button onClick={() => handleEditComment(comment.id)} variant='outline' >Edit</Button>}
                                            >
                                                <CommentUpdateForm data={data} />
                                            </MyDialog>


                                            <Button

                                                variant='outline'
                                                onClick={() => handleDeleteComment(comment.id)}
                                                aria-label="delete"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Form to add a new comment */}
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSendComment)} className="w-full">
                                <div className="flex items-center">
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="sr-only">Content</FormLabel> {/* Screen-reader only label */}
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your comment"
                                                        required={true}
                                                        {...field}
                                                        className="w-[400px]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" variant="link">
                                        {isLoading ? (
                                            <Loader className="h-3 w-3 animate-spin -ml-20 mt-2" />
                                        ) : (
                                            <Send className="w-5 h-5 -ml-20 mt-2" />
                                        )}

                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            ) : (
                ""
            )}

        </div>
    );
};

export default ShowComments;
