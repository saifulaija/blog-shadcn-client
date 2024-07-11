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
import { Gender } from '@/types';
import { Loader } from 'lucide-react';

import { useUpdateAdminMutation } from '@/redux/features/admin/adminApi';
const AdminUpdateForm = ({ data }: { data: any }) => {
  const { toast } = useToast();
  const [updateProfile, { isLoading: update }] = useUpdateAdminMutation();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const form = useForm({
    defaultValues: {
      name: '',
      contactNumber: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || '',
        contactNumber: data.contactNumber || '',
      });
    }
  }, [data, form]);

  const onSubmit = async (values: any) => {
    const updatedData = {
      id: data?.id,
    };
    setLoading(true);
    try {
      const res = await updateProfile({ body: values, id: data?.id }).unwrap();

      if (res?.id) {
        toast({
          title: 'Flat Request',
          description: 'Admin updated  successfully',
        });
      }
    } catch (err: any) {
      setSubmitError('Something went wrong. Please try again.'); // Set submit error message
      toast({
        title: 'Error',
        description: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {submitError && <div className="text-red-500">{submitError}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Name</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    placeholder="Provide Name..."
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
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    placeholder="Provide contact number..."
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
            {update && <Loader className="ml-6 h-4 w-4 animate-spin" />}
            {update ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminUpdateForm;
