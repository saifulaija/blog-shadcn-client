'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { logoutUser } from '@/services/actions/logoutUser';
import { useToast } from '@/components/ui/use-toast';
import { Loader } from 'lucide-react';
import { useChangePasswordMutation } from '@/redux/features/auth/authApi';

const formSchema = z.object({
  oldPassword: z.string().min(6, {
    message: 'Old password must be at least 6 characters',
  }),
  newPassword: z.string().min(6, {
    message: 'New password must be at least 6 characters',
  }),
});

const ChangePassword = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await changePassword(values);

      if ('data' in res && res.data.status === 200) {
        logoutUser(router);
        toast({
          title: 'Success',
          variant: 'destructive',
          description:
            'Password changed successfully. You have been logged out.',
        });
      } else {
        throw new Error('Incorrect old password');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to change password',
      });
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center p-10">
      <div className="w-full  space-y-4 p-4 md:p-6 border rounded-md">
        <div className="space-y-1 text-center">
          <p className="text-xl md:text-2xl font-semibold">Change Password</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* <div className="grid md:grid-cols-3 gap-2 items-center">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your old password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
               
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem  className="space-y-1">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
            <Button type="submit" disabled={isLoading} className="col-span-1">
              {isLoading && <Loader className="ml-10 h-4 w-4 animate-spin" />}
              Submit
            </Button>
            </div> */}

            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex-grow md:w-1/3">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your old password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-grow md:w-1/3">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full md:w-auto md:max-w-[40%] flex justify-center items-center mx-auto  sm:max-w-[60%]">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader className="ml-10 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
