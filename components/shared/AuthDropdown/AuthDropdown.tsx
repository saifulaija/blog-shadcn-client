"use client";

import { MyAvatar } from "@/components/shadcn/MyAvatar";
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

import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/authServices";
import {  LogOut, Mails, Settings } from "lucide-react";


import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthDropdown = () => {
  const { toast } = useToast();
  const { data:user, isLoading,error } = useGetMYProfileQuery({});


  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
    toast({ title: "Logout", variant:'destructive', description: "User logged out successfully" });
  };


  const role= user?.role.toLowerCase()

  return (
    <>
      {user && user.id ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <MyAvatar url={user.profilePhoto} alt={user?.name} />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="px-4">
          <DropdownMenuItem className="flex items-center gap-3 text-muted-foreground">
          <Mails />
               <p>{user?.email}</p>
               
              </DropdownMenuItem>
            <Link href={`/dashboard/${role}/profile`}>
              <DropdownMenuItem className="flex items-center gap-3 cursor-pointer text-muted-foreground">
                <Settings/>
                <p>Setting</p>
              </DropdownMenuItem>
              
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}  className="flex items-center gap-3 cursor-pointer text-muted-foreground">
            <LogOut />
               <p> Logout</p>
                </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
    </>
  );
};

export default AuthDropdown;
