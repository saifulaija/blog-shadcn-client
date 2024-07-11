'use client';

import MyAlertDialog from '@/components/shadcn/MyAlertDialog';
import { useToast } from '@/components/ui/use-toast';

import { useDeleteModeratorMutation } from '@/redux/features/moderator/moderatorApi';

interface DeleteFlatProps {
  moderatorId: string;
}

const DeleteModerator: React.FC<DeleteFlatProps> = ({ moderatorId }) => {
  const { toast } = useToast();
  const [deleteBlogger, { isLoading }] = useDeleteModeratorMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteBlogger(moderatorId).unwrap();

      if (res.id) {
        toast({
          title: 'Success',
          description: 'Moderator deleted successfully',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message,
      });
    }
  };

  return (
    <>
      <MyAlertDialog
        title="Confirm Deletion"
        description="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={handleDelete}
      />
    </>
  );
};

export default DeleteModerator;
