"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { useUpdateUserStatusMutation } from "@/redux/api/userApi";


interface UpdateUserStatusProps {
  userId: string;
  currentStatus: "ACTIVE" | "BLOCKED" | "DELETED";
}

const UpdateUserStatus: React.FC<UpdateUserStatusProps> = ({
  userId,
  currentStatus,
}) => {
  const { toast } = useToast();
  const [updateUser, { isLoading }] = useUpdateUserStatusMutation();

  const handleStatusChange = async (newStatus: "ACTIVE" | "BLOCKED" | "DELETED") => {
    const updateData = {
      id: userId,
      body: {
        status: newStatus,
      },
    };

    try {
      const res = await updateUser(updateData).unwrap();

      if (res.id) {
        toast({
          title: "Success",
          description: "User status changed successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Success",
        description: error?.message,
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
        <DropdownMenuItem onClick={() => handleStatusChange("ACTIVE")}>
          Set as Active
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("BLOCKED")}>
          Set as Blocked
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("DELETED")}>
          Set as Deleted
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpdateUserStatus;
