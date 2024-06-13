"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";


import { Button } from "@/components/ui/button";

import { formateDate, formateMoney } from "@/utils/common";
import MyDialog from "@/components/shadcn/MyDialog";
import BlogUpdateForm from "@/components/Form/BlogUpdateForm";

import { MyBadge } from "@/components/shadcn/MyBadge";
import { truncateTitle } from "@/utils/truncateTitle";


import AuthorUpdateForm from "@/components/Form/AuthorUpdateForm";

import ModeratorUpdateForm from "@/components/Form/ModeratorUpdateForm";
import AdminUpdateForm from "@/components/Form/AdminUpdateForm";
import { TAdmin } from "@/types/admin";
import DeleteAdmin from "./deleteAdmin";

export type TAuthor = {
  id: string;
  name: string;
 
  email: string;
  contactNumber:string;
  gender:"MALE" | "FEMALE";
 profilePhoto:string;
createdAt: Date;
};

export const adminColumn: ColumnDef<TAdmin>[] = [
  {
    accessorKey: "profilePhoto",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.profilePhoto;
    
     return(
      <div className="flex justify-center items-center w-[50px] h-[40px]">
      <Image
        src={image || '/http'}
        width={70}
        height={70}
        alt="flat image"
        className="rounded-md object-cover"
      />
    </div>
     )
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
      const admin = row.original;
      return <DeleteAdmin adminId={admin.id} />;
    },
  },

  {
    id: "editActions",
    header: "Action",
    cell: ({ row }) => {
      const admin = row.original;
      return (
        <div>
          <MyDialog triggerButton={<Button variant="outline">Edit</Button>}>
            <AdminUpdateForm data={admin} />
          </MyDialog>
        </div>
      );
    },
  },
];