"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";


import { Button } from "@/components/ui/button";

import { formateDate, formateMoney } from "@/utils/common";
import MyDialog from "@/components/shadcn/MyDialog";
import BlogUpdateForm from "@/components/Form/BlogUpdateForm";

import { MyBadge } from "@/components/shadcn/MyBadge";
import { truncateTitle } from "@/utils/truncateTitle";
import UpdatePublishedStatus from "./publishedStatus";
import Link from "next/link";

export type Blog = {
  id: string;
  content: string;
  title: string;
  conclusion: string;
  category:string;
  publishedStatus:"PENDING" | "APPROVED" | "CANCEL";
 image:string;
  createdAt: Date;
};

export const allBlogsColumn: ColumnDef<Blog>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.image;
    
      return (
        <Image
          src={image}
          width={70}
          height={70}
          alt="flat image"
          className="self-center rounded-md"
        />
      );
    },
  },
 
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const status = row.original.category;
      return <div><MyBadge title={status}/></div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.title;
      const smallTitle=truncateTitle(title,30)

      return <div><p>{smallTitle}</p></div>;
    },
  },
  {
    accessorKey: "publishedStatus",
    header: "publishedStatus",
    cell: ({ row }) => {
      const status = row.original.publishedStatus;
      return <div><MyBadge title={status}/></div>;
    },
  },
  // {
  //   accessorKey: "advanceAmount",
  //   header: "Advance Amount",
  //   cell: ({ row }) => {
  //     const advanceAmount = row.original.advanceAmount;
  //     return <div>{formateMoney(advanceAmount)}</div>;
  //   },
  // },
 
  // {
  //   accessorKey: "space",
  //   header:"Space",
  //   cell: ({ row }) => {
  //     const space = row.original.space;
  //     return <div>{space} sq ft</div>;
  //   },
  // },
  {
    accessorKey: "createdAt",
    header:"Created At",
    cell: ({ row }) => {
      const lastSeen = row.original.createdAt;
      return <div>{formateDate(lastSeen)}</div>;
    },
  },

  {
    id: "statusActions",
    header: "Change PublishedStatus",
    cell: ({ row }) => {
      const blog = row.original;
      return <UpdatePublishedStatus userId={blog.id} currentStatus={blog.publishedStatus} />;
    },
  },

  {
    id: "editActions",
    header: "Action",
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <div className="">
          <MyDialog triggerButton={<Button variant="outline">Edit</Button>}>
            <BlogUpdateForm data={blog} />
          </MyDialog>
        </div>
      );
    },
  },
  {
    id: "detailsAction",
    header: "Action",
    cell: ({ row }) => {
      const blogId = row.original.id;
      return (
        <Button variant='outline'><Link href={`/dashboard/moderator/show-blogs/details/${blogId}`}>Details</Link></Button>
      );
    },
  },
];