'use client';
import React, { useState } from 'react';
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

import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
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

import 'react-quill/dist/quill.snow.css';

import { useDispatch } from 'react-redux';
import { useCreateTagMutation } from '@/redux/features/tag/tagApi';
import { ToastAction } from '@radix-ui/react-toast';
import { addTag } from '@/services/actions/tagAdd';
import { useRouter } from 'next/navigation';
import { Tags } from '@/types';

const formSchema = z.object({
  name: z.string().min(1, { message: 'tag must be selected' }),
});

const AddTagForm = ({ blogId }: { blogId: string }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError('');
    const data = {
      blogId,
      name: values.name,
    };

    try {
      const res = await addTag(data);

      if (res?.data) {
        toast({
          color: 'green',
          title: 'Success',
          description: 'Tag added successfully',
          action: (
            <ToastAction altText="Goto schedule to undo">Close</ToastAction>
          ),
        });
      } else {
        setError(res?.message || 'An unexpected error occurred.');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 px-2 md:px-5 py-6">
          {error && <p className="text-red-500">{error}</p>}
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
            <Button type="submit" disabled={loading} className="w-full">
              Add Now
              {loading && <Loader2 className="ml-10 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddTagForm;
