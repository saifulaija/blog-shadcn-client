"use client";

import MyAlertDialog from "@/components/shadcn/MyAlertDialog";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteAdminMutation } from "@/redux/features/admin/adminApi";

import { useDeleteModeratorMutation } from "@/redux/features/moderator/moderatorApi";


interface DeleteFlatProps {
  adminId: string;
}

const DeleteAdmin: React.FC<DeleteFlatProps> = ({ adminId }) => {
  const { toast } = useToast();
  const [deleteBlogger, { isLoading }] =useDeleteAdminMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteBlogger(adminId).unwrap();

      if (res.id) {
        toast({
          title: "Success",
          description: "Admin deleted successfully",
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

export default DeleteAdmin;