import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { useToast } from '../ui/use-toast';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { Loader, Loader2 } from 'lucide-react';
import {
  useGetSingleCommentQuery,
  useUpdateCommentMutation,
} from '@/redux/features/comment/commentApi';
import { ToastAction } from '../ui/toast';

const CommentUpdateForm = ({ commentId }: { commentId: any }) => {
  const { data, isLoading } = useGetSingleCommentQuery(commentId);
  const { toast } = useToast();
  const [updateFlat, { isLoading: update }] = useUpdateCommentMutation();

  const [submitError, setSubmitError] = useState('');

  const form = useForm({
    defaultValues: {
      content: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        content: data.content || '',
      });
    }
  }, [data, form]);

  const onSubmit = async (values: any) => {
    const updatedData = {
      id: data?.id,
      body: values,
    };

    try {
      const res = await updateFlat(updatedData).unwrap();

      if (res?.id) {
        toast({
          title: 'Flat Request',
          description: 'Your comment updated  successfully',
          action: (
            <ToastAction altText="Goto schedule to undo">Close</ToastAction>
          ),
        });
      }
    } catch (err: any) {
      setSubmitError('Something went wrong. Please try again.'); // Set submit error message
      toast({
        title: 'Error',
        description: 'Something went wrong',
      });
    } finally {
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {submitError && <div className="text-red-500">{submitError}</div>}
        <div className="">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edit Comment</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    placeholder="Provide location..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-6 flex justify-between">
          <Button type="submit" disabled={update} className="w-full">
            {update ? 'Updating...' : 'Edit'}
            {update && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentUpdateForm;
