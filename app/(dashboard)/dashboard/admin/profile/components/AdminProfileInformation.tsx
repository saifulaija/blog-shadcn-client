// import { IUser } from '@/types/user'
// import React from 'react'
// interface UserProfileInformationProps {
//     data: IUser;
//   }
const AdminProfileInformation = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:col-span-2 items-center space-y-2">
      <div className="text-muted-foreground bg-muted/95 flex-col px-8 py-2 rounded-sm">
        <p className="text-xl font-semibold">Role</p>
        <p className="text-sm text-muted-foreground/90 font-medium capitalize">
          {data?.role}
        </p>
      </div>
      <div className="text-muted-foreground bg-muted/95 flex-col px-8 py-2 rounded-sm">
        <p className="text-xl font-semibold">Name</p>
        <p className="text-sm text-muted-foreground/90 font-medium capitalize">
          {' '}
          {data?.name}
        </p>
      </div>
      <div className="text-muted-foreground bg-muted/95 flex-col px-8 py-2 rounded-sm">
        <p className="text-xl font-semibold">Email</p>
        <p className="text-sm text-muted-foreground/90 font-medium lowercase">
          {' '}
          {data?.email}
        </p>
      </div>

      <div className="text-muted-foreground bg-muted/95 flex-col px-8 py-2 rounded-sm">
        <p className="text-xl font-semibold">Contact Number</p>
        <p className="text-sm text-muted-foreground/90 font-medium capitalize">
          {' '}
          {data?.contactNumber}
        </p>
      </div>
    </div>
  );
};

export default AdminProfileInformation;
