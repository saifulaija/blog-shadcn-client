import React, { useState } from 'react';

import { FieldValues, useForm } from 'react-hook-form';

import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetSingleCommentQuery,
} from '@/redux/features/comment/commentApi';

import { getUserInfo } from '@/services/authServices';
import { comment } from 'postcss';
import { MyAvatar } from '@/components/shadcn/MyAvatar';
import { Button } from '@/components/ui/button';
import { Loader, Loader2, Send } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

import MyDialog from '@/components/shadcn/MyDialog';
import CommentUpdateForm from '@/components/Form/CommentUpdateForm';
import CustomLoader from '@/components/shared/CustomLoader/CustomLoader';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  content: z.string(),
});

// Default form values
const defaultValues = {
  content: '',
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
  const [commentId, setCommentId] = useState<string>('');
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const user = getUserInfo();

  const myCommentData = comments.filter(
    (item) => item.comment.id === user?.userId,
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const handleSendComment = async (values: FieldValues) => {
    const commentData = { ...values, authorId, blogId: newId };

    const res = await createComment(commentData);
  };

  const handleEditComment = (id: string) => {
    setCommentId(id);
    setIsModalOpen(true);
  };

  //  const { data, isLoading: update } = useGetSingleCommentQuery(commentId);

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
  };

  return (
    <div className="w-full mb-5">
      {user ? (
        <div>
          {comments?.map((comment, index) => (
            <div
              key={comment.id}
              className={`p-2 rounded ${comment.comment.id === user?.userId ? 'bg-background/50' : 'bg-background'}`}
            >
              <div className=" flex flex-col border border-gray-300 rounded-lg p-4">
                <div className="flex justify-start items-center gap-2">
                  {/* <Image src={}/> */}
                  <MyAvatar url={comment?.comment?.profilePhoto} alt="user" />
                  <p>{comment?.comment?.name || comment?.comment?.email}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p
                    className={`text-sm text-right p-2 rounded-lg ${
                      comment?.comment?.id === user?.userId
                        ? 'bg-background'
                        : 'bg-background'
                    }`}
                  >
                    {comment?.content}
                  </p>

                  {comment?.comment?.id === user?.userId && (
                    <div className="flex justify-end gap-2">
                      <MyDialog
                        triggerButton={
                          <Button
                            onClick={() => handleEditComment(comment.id)}
                            variant="outline"
                          >
                            Edit
                          </Button>
                        }
                      >
                        <CommentUpdateForm commentId={commentId} />
                      </MyDialog>

                      <Button
                        variant="outline"
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
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSendComment)}
                className="w-full"
              >
                <div className="flex w-full items-center justify-center px-2">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel className="sr-only">Content</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your comment"
                            required={true}
                            {...field}
                            className={cn(
                              'focus-visible:ring-0 text-gray-500 bg-gray-200 rounded-lg w-full',
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className={cn('flex items-center justify-center mt-2')}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Post'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ShowComments;
