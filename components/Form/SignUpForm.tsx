'use client';

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
import { Button, buttonVariants } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';

import { toast, useToast } from '../ui/use-toast';
import { uploadImage } from '@/utils/imgbb';
import { ArrowRight, Loader } from 'lucide-react';
import { useState } from 'react';
import { registerSubscriber } from '@/services/actions/registerSubscriber';
import Link from 'next/link';
import { ToastAction } from '../ui/toast';
const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter valid email',
  }),
  password: z.string().min(6, {
    message: 'Password at least 6 characters',
  }),
  name: z.string().min(1, {
    message: 'Enter your yserName',
  }),
  contactNumber: z.string().min(1, {
    message: 'Enter your contact number',
  }),
  profilePhoto: z.any(),
});

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState('');
  const {} = useToast();
  // const [createUser, { isLoading, isError }] = useCreateUserMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      profilePhoto: null,
      contactNumber: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError('');
    if (values.profilePhoto && values.profilePhoto.length > 0) {
      const url = await uploadImage(values.profilePhoto[0]);
      values.profilePhoto = url;
    } else {
      values.profilePhoto = '';
    }

    console.log(values, 'values.........');
    try {
      const res = await registerSubscriber(values);

      if (res?.statusCode === 200) {
        toast({
          title: 'Success!',
          description: `User created successfully please go to login`,
          action: (
            <ToastAction altText="Goto schedule to undo">Close</ToastAction>
          ),
        });
        router.push('/signin');
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
        <div className="w-full space-y-4 md:px-4 py-6">
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>contactNumber</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Contact Number.."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profilePhoto"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>profilePhoto</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            SignUp
            {loading && <Loader className="ml-6 h-5 w-5 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
