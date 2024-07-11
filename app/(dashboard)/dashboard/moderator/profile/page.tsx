'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { Loader, UserRound } from 'lucide-react';

import { z } from 'zod';

import { uploadImage } from '@/utils/imgbb';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import CustomLoader from '@/components/shared/CustomLoader/CustomLoader';
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from '@/redux/features/myProfile/myProfileApi';
import MyDialog from '@/components/shadcn/MyDialog';

import { Author } from 'next/dist/lib/metadata/types/metadata-types';
import ChangePassword from '@/components/PasswordChange/PasswordChange';
import ModeratorProfileInformation from './components/ModeratorProfileInformation';
import ModeratorProfileUpdateForm from '@/components/Form/ModeratorProfileUpdateForm';
const formSchema = z.object({
  profilePhoto: z.any(),
});

const ProfilePage = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePhoto: null,
    },
  });

  const [updateProfile, { isLoading: update }] = useUpdateMYProfileMutation();
  const { data, isLoading, error } = useGetMYProfileQuery({});
  const userData: Author = data;

  if (isLoading) {
    return <CustomLoader />;
  }

  if (error) {
    return <div>Error loading data.</div>;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.profilePhoto && values.profilePhoto.length > 0) {
      const profilePhoto = await uploadImage(values.profilePhoto[0]);
      values.profilePhoto = profilePhoto;
    } else {
      values.profilePhoto = '';
    }

    const data = {
      profilePhoto: values.profilePhoto,
    };

    try {
      const res = await updateProfile(data).unwrap();

      if (res?.id) {
        toast({
          title: 'Success!',
          description: `Image updated successfully`,
        });

        form.setValue('profilePhoto', '');
      }
    } catch (err: any) {
      toast(err?.message);
    }
  };
  return (
    <article className=" ">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-2">
        <div className="max-w-[40%] w-full flex flex-col items-center">
          {data?.profilePhoto ? (
            <div className="flex-center">
              <Image
                src={data?.profilePhoto}
                width={200}
                height={200}
                alt="Profile Photo"
                className="rounded object-cover self-center"
              />
            </div>
          ) : (
            <div className="w-200 h-200 flex items-center justify-center rounded">
              <UserRound size={200} />
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="w-full space-y-4 px-10 py-6 border-0 ">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="profilePhoto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Image</FormLabel>
                        <FormControl>
                          <Input
                            required={true}
                            type="file"
                            accept="image/*"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={update}
                  className=" max-w-[300px] w-full md:ml-10"
                >
                  Update
                  {update && <Loader className="ml-6 h-4 w-4 animate-spin" />}
                </Button>
              </div>
            </form>
          </Form>
          <div className="w-full">
            <MyDialog
              triggerButton={
                <div className="w-full">
                  <Button className=" max-w-[300px] w-full">
                    Update Your Profile
                  </Button>
                </div>
              }
            >
              <ModeratorProfileUpdateForm data={userData} />
            </MyDialog>
          </div>
        </div>

        <div className="md:max-w-[60%] w-full">
          {' '}
          <ModeratorProfileInformation data={userData} />
        </div>
      </div>
      <ChangePassword />
    </article>
  );
};

export default ProfilePage;
