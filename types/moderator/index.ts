export type TModerator = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber: string;
  address?: string | null;
  gender: 'MALE' | 'FEMALE';
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
