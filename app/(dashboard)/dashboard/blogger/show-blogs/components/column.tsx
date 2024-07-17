'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formateDate } from '@/utils/common';
import MyDialog from '@/components/shadcn/MyDialog';
import BlogUpdateForm from '@/components/Form/BlogUpdateForm';
import DeleteBlog from './delete-blog';
import { MyBadge } from '@/components/shadcn/MyBadge';
import { truncateTitle } from '@/utils/truncateTitle';

import { IBlog, TTag } from '@/types/blog';

export type Blog = {
  id: string;
  content: string;
  title: string;
  conclusion: string;
  category: string;
  publishedStatus: 'PENDING' | 'APPROVED' | 'CANCEL';
  tag?: TTag[];
  image: string;
  createdAt: Date;
};

export const blogColumn: ColumnDef<IBlog>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const image = row.original.image;

      return (
        <Image
          src={image}
          width={50}
          height={50}
          alt="flat image"
          className="self-center rounded-md"
        />
      );
    },
  },

  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const status = row.original.category;
      return (
        <div>
          <MyBadge title={status} />
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title = row.original.title;
      const smallTitle = truncateTitle(title, 30);

      return (
        <div>
          <p>{smallTitle}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'publishedStatus',
    header: 'publishedStatus',
    cell: ({ row }) => {
      const status = row.original.publishedStatus;
      return (
        <div>
          <MyBadge title={status} />
        </div>
      );
    },
  },

  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const lastSeen = row.original.createdAt;
      return <div>{formateDate(lastSeen)}</div>;
    },
  },

  {
    id: 'statusActions',
    header: 'Action',
    cell: ({ row }) => {
      const flat = row.original;
      return <DeleteBlog flatId={flat.id} />;
    },
  },

  {
    id: 'editActions',
    header: 'Action',
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <div>
          <MyDialog triggerButton={<Button variant="outline">Edit</Button>}>
            <BlogUpdateForm data={blog} />
          </MyDialog>
        </div>
      );
    },
  },
];
