import { Separator } from '@/components/ui/separator';
import { IBlog, TBlogResponse } from '@/types/blog';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';

const AuthorInformation = ({ blog }: { blog: TBlogResponse }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-center">Author Information</h3>
      <Separator />
      <div className="text-muted-foreground bg-muted/95 space-y-2 px-8 py-2 rounded-sm">
        <div className="flex justify-center">
          {blog?.author?.profilePhoto ? (
            <Image
              src={blog?.author?.profilePhoto}
              width={150}
              height={150}
              alt="author-image"
              className="rounded-md"
            />
          ) : (
            <UserIcon className="w-32 h-32 text-muted" />
          )}
        </div>
        <div>
          <p className="text-xl font-semibold">Name:</p>
          <p className="text-sm text-muted-foreground/90 font-medium capitalize">
            {blog?.author?.name}
          </p>
        </div>
        <div>
          <p className="text-xl font-semibold">Email:</p>
          <p className="text-sm text-muted-foreground/90 font-medium">
            {blog?.author?.email}
          </p>
        </div>
        <div>
          <p className="text-xl font-semibold">Gender:</p>
          <p className="text-sm text-muted-foreground/90 font-medium capitalize">
            {blog?.author?.gender}
          </p>
        </div>
        <div>
          <p className="text-xl font-semibold">Contact Number:</p>
          <p className="text-sm text-muted-foreground/90 font-medium">
            {blog?.author?.contactNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorInformation;
