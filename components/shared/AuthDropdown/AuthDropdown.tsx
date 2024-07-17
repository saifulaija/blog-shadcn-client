'use client';

import { MyAvatar } from '@/components/shadcn/MyAvatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { useGetMYProfileQuery } from '@/redux/features/myProfile/myProfileApi';

import { logoutUser } from '@/services/actions/logoutUser';
import { getUserInfo } from '@/services/authServices';
import { LogOut, Mails, Settings } from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthDropdown = () => {
  const { toast } = useToast();

  const user = getUserInfo();

  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
    toast({
      title: 'Logout',
      description: 'User logged out successfully',
      action: <ToastAction altText="Goto schedule to undo">Close</ToastAction>,
    });
  };

  const role = user?.role?.toLowerCase();

  return (
    <>
      {user && user.userId ? (
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
                <Settings />
                <p>Setting</p>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-3 cursor-pointer text-muted-foreground"
            >
              <LogOut />
              <p> Logout</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/signin">
          <Button>Login</Button>
        </Link>
      )}
    </>
  );
};

export default AuthDropdown;
