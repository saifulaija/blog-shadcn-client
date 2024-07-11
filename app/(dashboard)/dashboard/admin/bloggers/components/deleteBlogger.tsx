'use client';

import MyAlertDialog from '@/components/shadcn/MyAlertDialog';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteAuthorMutation } from '@/redux/features/author/authorApi';

interface DeleteFlatProps {
  authorId: string;
}

const DeleteBlogger: React.FC<DeleteFlatProps> = ({ authorId }) => {
  const { toast } = useToast();
  const [deleteBlogger, { isLoading }] = useDeleteAuthorMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteBlogger(authorId).unwrap();

      if (res.id) {
        toast({
          title: 'Success',
          description: 'Author deleted successfully',
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

export default DeleteBlogger;
