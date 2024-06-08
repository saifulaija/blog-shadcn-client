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
import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/authServices";




import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthDropdown = () => {
  const { toast } = useToast();
  const user = getUserInfo();


  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
    toast({ title: "Logout", description: "User logged out successfully" });
  };

  return (
    <>
      {user && user.userId ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <MyAvatar url={user.profilePhoto} alt="User Avatar" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/${user.role}/profile`}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
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