"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";


import { Button } from "@/components/ui/button";

import { formateDate, formateMoney } from "@/utils/common";
import MyDialog from "@/components/shadcn/MyDialog";
import BlogUpdateForm from "@/components/Form/BlogUpdateForm";

import { MyBadge } from "@/components/shadcn/MyBadge";
import { truncateTitle } from "@/utils/truncateTitle";
import DeleteBlogger from "./deleteBlogger";
import { Author } from "@/types/blog";
import AuthorUpdateForm from "@/components/Form/AuthorUpdateForm";

export type TAuthor = {
  id: string;
  name: string;
 
  email: string;
  contactNumber:string;
  gender:"MALE" | "FEMALE";
 profilePhoto:string;
createdAt: Date;
};

export const bloggerColumn: ColumnDef<TAuthor>[] = [
  {
    accessorKey: "profilePhoto",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.profilePhoto;
    
      return (
        <Image
          src={image || '/http'}
          width={40}
          height={40}
          alt="flat image"
          className="self-center rounded-md"
        />
      );
    },
  },
 
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.email;
  

      return <div><p>{email}</p></div>;
    },
  },

  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender= row.original.gender;
      return <div><p>{gender}</p></div>;
    },
  },
  {
    accessorKey: "contactNumber",
    header: "ContactNumber",
    cell: ({ row }) => {
      const contactNumber = row.original.contactNumber;
      return <div><p>{contactNumber}</p></div>;
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
    header: "Action",
    cell: ({ row }) => {
      const blogger = row.original;
      return <DeleteBlogger authorId={blogger.id} />;
    },
  },

  {
    id: "editActions",
    header: "Action",
    cell: ({ row }) => {
      const author = row.original;
      return (
        <div>
          <MyDialog triggerButton={<Button variant="outline">Edit</Button>}>
            <AuthorUpdateForm data={author} />
          </MyDialog>
        </div>
      );
    },
  },
];