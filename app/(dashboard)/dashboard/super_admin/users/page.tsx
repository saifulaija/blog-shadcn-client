'use client';
import React from 'react';
import { UserDataTable } from './components/userDataTable';

import CustomLoader from '@/components/shared/CustomLoader/CustomLoader';
import { useGetAllUserQuery } from '@/redux/api/userApi';
import { columns } from './components/column';

const UserManagementPage = () => {
  const { data, isLoading } = useGetAllUserQuery({});

  return (
    <section className="py-5 px-2">
      <div>
        <h3 className="text-xl md:text-3xl font-bold mb-5 text-center">
          All users
        </h3>
        {isLoading ? (
          <CustomLoader />
        ) : (
          data && <UserDataTable data={data?.users ?? []} columns={columns} />
        )}
      </div>
    </section>
  );
};

export default UserManagementPage;
