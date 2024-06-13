export type TUser = {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null | undefined;
    role: string;
    status:'ACTIVE' | 'BLOCKED' | 'DELETED';
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  