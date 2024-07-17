import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { IBlog } from '@/types/blog'; // Ensure to import the appropriate type if needed
import { InitialState } from '@/redux/features/blog/approveSlice';

interface ScrollAreaNotificationProps {
  approves: any[];
}

export function ScrollAreaNotificationBlogger({
  approves,
}: ScrollAreaNotificationProps) {
  return (
    <ScrollArea className="h-52 w-[300px] rounded-md border">
      <div className="p-4 space-y-4">
        {approves.length > 0 ? (
          approves.map((approve) => (
            <div key={approve.authorId} className="space-y-1">
              {` ${approve.message}`}
              <Separator />
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No notifications available</p>
        )}
      </div>
    </ScrollArea>
  );
}
