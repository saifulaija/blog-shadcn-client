import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IBlog } from "@/types/blog";  // Ensure to import the appropriate type if needed

interface ScrollAreaNotificationProps {
  blogs: any[];  // Define the type of blogs, replace with any if types are not available
}

export function ScrollAreaNotification({ blogs }: ScrollAreaNotificationProps) {
  return (
    <ScrollArea className="h-52 w-[300px] rounded-md border">
      <div className="p-4 space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="space-y-1">
              {`Dear ${blog.name}, ${blog.message} category ${blog.category}.`}
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
