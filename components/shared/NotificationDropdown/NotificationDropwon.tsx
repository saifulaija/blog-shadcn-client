'use client';

import { ScrollAreaNotification } from '@/components/ScrollArea/ScrollArea';
import { ScrollAreaNotificationBlogger } from '@/components/ScrollArea/ScrollNotificationBlogger';
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
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

import { logoutUser } from '@/services/actions/logoutUser';
import { getUserInfo } from '@/services/authServices';

import { Bell } from 'lucide-react';

import { useRouter } from 'next/navigation';

const NotificationDropdown = () => {
  const { toast } = useToast();
  // const { data: user, isLoading, error } = useGetMYProfileQuery({});
  const user = getUserInfo();

  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
    toast({
      title: 'Logout',
      variant: 'destructive',
      description: 'User logged out successfully',
      action: <ToastAction altText="Goto schedule to undo">Close</ToastAction>,
    });
  };

  const role = user?.role.toLowerCase();
  console.log(role);

  const approves = useAppSelector(
    (state: RootState) => state.approve.statusItems,
  );
  const blogs = useAppSelector((state: RootState) => state.blog.blogItems);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon" className="rounded-full">
            <Bell />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-0">
          {role === 'blogger' ? (
            <DropdownMenuItem>
              <ScrollAreaNotificationBlogger approves={approves} />
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <ScrollAreaNotification blogs={blogs} />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NotificationDropdown;
