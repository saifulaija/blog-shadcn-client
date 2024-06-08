export type TAdmin = {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    contactNumber: string;
    gender: "MALE" | "FEMALE";
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  