"use client";

import MyAlertDialog from "@/components/shadcn/MyAlertDialog";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteBlogMutation } from "@/redux/features/blog/blogApi";





interface DeleteFlatProps {
  flatId: string;
}

const DeleteBlog: React.FC<DeleteFlatProps> = ({ flatId }) => {
  const { toast } = useToast();
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteBlog(flatId).unwrap();

      if (res.id) {
        toast({
          title: "Success",
          description: "Flat deleted successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
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

export default DeleteBlog;