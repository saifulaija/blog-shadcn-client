'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

import { useToast } from '@/components/ui/use-toast';
import { useUpdateStatusApproveMutation } from '@/redux/features/blog/blogApi';
import { useAppDispatch } from '@/redux/hooks';
import { addStatus } from '@/redux/features/blog/approveSlice';
import { ToastAction } from '@/components/ui/toast';

interface UpdateUserStatusProps {
  userId: string;
  currentStatus: 'PENDING' | 'APPROVED' | 'CANCEL';
}

const UpdatePublishedStatus: React.FC<UpdateUserStatusProps> = ({
  userId,
  currentStatus,
}) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [updateUser, { isLoading }] = useUpdateStatusApproveMutation();

  const handleStatusChange = async (newStatus: 'APPROVED' | 'CANCEL') => {
    const updateData = {
      id: userId,
      body: {
        publishedStatus: newStatus,
      },
    };

    const dispatchData = {
      authorId: userId,
      message:
        newStatus === 'APPROVED'
          ? `Congratulations, your status has been approved.`
          : 'Sorry, your status has been canceled.',
      status: newStatus,
    };

    try {
      const res = await updateUser(updateData).unwrap();
      dispatch(addStatus(dispatchData));

      if (res.id) {
        toast({
          title: 'Success',
          description: 'Published status changed successfully',
          action: (
            <ToastAction altText="Goto schedule to undo">Close</ToastAction>
          ),
        });
      }
    } catch (error: any) {
      toast({
        title: 'Success',
        variant: 'destructive',
        description: 'can not updated already canceled',
        action: (
          <ToastAction altText="Goto schedule to undo">Close</ToastAction>
        ),
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleStatusChange('APPROVED')}>
          Published Approved
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('CANCEL')}>
          Published Cancel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpdatePublishedStatus;
