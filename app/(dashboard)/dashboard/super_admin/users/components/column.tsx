"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import UpdateUserStatus from "./userStatus"
import { TUser } from "@/types/user"



// This type is used to define the shape of our data.
export type User = {
  id: string
  name: string
  email: string
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  profilePhoto: string | null | undefined;
  role: "ADMIN" | "SUBSCRIBER" | "MODERATOR" | "BLOGGER" | "SUPER_ADMIN"
}

export const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: "profilePhoto",
    header: "Image",
    cell: ({ row }) => {
      const profilePhoto = row.getValue<string>("profilePhoto");
      return (
        <Image
          src={profilePhoto || '/logo'}
          width={50}
          height={50}
          alt="profilePhoto"
          className="self-center rounded-md"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "statusActions",
    header: "Change Status",
    cell: ({ row }) => {
      const user = row.original;
      return <UpdateUserStatus userId={user.id} currentStatus={user.status} />;
    },
  },
//   {
//     id: "roleActions",
//     header: "Change Role",
//     cell: ({ row }) => {
//       const user = row.original;
//       return <UpdateUserRole userId={user.id} currentStatus={user.role} />;
//     },
//   },
];
