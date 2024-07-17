'use client';

import { ScrollAreaNotification } from '@/components/ScrollArea/ScrollArea';
import { ScrollAreaNotificationBlogger } from '@/components/ScrollArea/ScrollNotificationBlogger';
import { Button } from '@/components/ui/button';

import { useToast } from '@/components/ui/use-toast';
import { clearStatusItems } from '@/redux/features/blog/approveSlice';
import { clearBlogItems } from '@/redux/features/blog/blogSlice';
import { getUserInfo } from '@/services/authServices';

import { Bell, MailCheck } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ArrowRightIcon } from '@radix-ui/react-icons';

const NotificationDropdown = () => {
  const { toast } = useToast();
  const user = getUserInfo();
  const dispatch = useAppDispatch();

  const role = user?.role.toLowerCase();

  const handleNotificationClick = () => {
    console.log('Notification click handler called');
    console.log('Current role:', role);

    if (role === 'blogger') {
      console.log('Dispatching clearStatusItems');
      dispatch(clearStatusItems());
    } else {
      console.log('Dispatching clearBlogItems');
      dispatch(clearBlogItems());
    }
  };

  const blogs = useAppSelector((state: RootState) => state.blog.blogItems);
  const approves = useAppSelector(
    (state: RootState) => state.approve.statusItems,
  );
  const blogLength = blogs?.length;
  const approveLength = approves?.length;

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center">
            <span className="flex items-center">
              <MailCheck className="h-5 w-5 mr-2" />
              <span>{role === 'blogger' ? approveLength : blogLength}</span>
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            {role === 'blogger' ? (
              <ScrollAreaNotificationBlogger approves={approves} />
            ) : (
              <ScrollAreaNotification blogs={blogs} />
            )}
          </div>

          <Button
            variant="link"
            onClick={handleNotificationClick}
            className="flex items-center"
          >
            <span>Clear Notification</span>
            <ArrowRightIcon className="ml-2" />
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationDropdown;
