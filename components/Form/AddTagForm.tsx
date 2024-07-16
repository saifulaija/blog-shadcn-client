'use client';

import React from 'react';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';

import useUserInfo from '@/hooks/useUserInfo';

import { Loader2 } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { BlogCategory, Tags } from '@/types';
import { useDispatch } from 'react-redux';
import { addBlog } from '@/redux/features/blog/blogSlice';
import { useCreateTagMutation } from '@/redux/features/tag/tagApi';
import { ToastAction } from '@radix-ui/react-toast';

const formSchema = z.object({
  name: z.string().min(1, { message: 'tag must be selected' }),
});

const AddTagForm = ({ blogId }: { blogId: string }) => {
  const dispatch = useDispatch();

  const user = useUserInfo();
  const [createBlog, { isLoading, isSuccess }] = useCreateTagMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: any) => {
    const data = {
      blogId,
      name: values.name,
    };

    console.log(data, 'tag');

    try {
      const res = await createBlog(data).unwrap();
      console.log(res);

      if (res?.id) {
        toast({
          title: 'Success!',
          description: 'Tag added successfully',
          action: (
            <ToastAction altText="Goto schedule to undo">Close</ToastAction>
          ),
        });
        // router.push(`/dashboard/${user?.role}/show-blogs`);
        dispatch(
          addBlog({
            name: user?.name,
            category: values?.category,
            message: 'create a new blog',
          }),
        );
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while creating the blog',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 px-2 md:px-5 py-6">
          <div className="grid grid-cols-1  gap-4 justify-center items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a tag" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tags</SelectLabel>
                          {Tags.map((tag) => (
                            <SelectItem key={tag} value={tag}>
                              {tag}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6">
            <Button type="submit" disabled={isLoading} className="w-full">
              Add Now
              {isLoading && <Loader2 className="ml-10 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddTagForm;
