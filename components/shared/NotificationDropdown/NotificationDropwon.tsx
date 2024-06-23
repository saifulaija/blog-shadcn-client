"use client";


import { ScrollAreaNotification } from "@/components/ScrollArea/ScrollArea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useGetMYProfileQuery } from "@/redux/features/myProfile/myProfileApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/authServices";
import { Bell, LogIn, LogOut, Mails, Settings } from "lucide-react";


import Link from "next/link";
import { useRouter } from "next/navigation";

const NotificationDropdown = () => {
  const { toast } = useToast();
  const { data:user, isLoading,error } = useGetMYProfileQuery({});


  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
    toast({ title: "Logout", variant:'destructive', description: "User logged out successfully" });
  };


  const role= user?.role.toLowerCase()
  const status = useAppSelector((state:RootState) => state.approve.statusItems);
  const blogs = useAppSelector((state: RootState) => state.blog.blogItems);
  console.log(blogs)


  return (
    <>
   
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" size="icon" className="rounded-full">
             <Bell/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-0">
          
                <DropdownMenuItem>
                    <ScrollAreaNotification blogs={blogs}/>
                </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      
    </>
  );
};

export default NotificationDropdown;
