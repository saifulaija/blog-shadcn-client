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
import { ToastAction } from '@/components/ui/toast';
import { useAppDispatch } from '@/redux/hooks';
import { addStatus } from '@/redux/features/blog/approveSlice';

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
    const message =
      newStatus === 'APPROVED'
        ? 'you are congratulation your blog'
        : 'We are sorry your blog ';
    const statusData = {
      authorId: userId,
      message,
      status: newStatus,
    };
    try {
      const res = await updateUser(updateData).unwrap();

      if (res.id) {
        dispatch(addStatus(statusData));
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
        title: 'Error',
        variant: 'destructive',
        description: 'can not updated already canceled',
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
