
export interface IAuthor {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    contactNumber: string;
    address?: string | null;
    gender: "MALE" | "FEMALE";
    isDeleted: boolean;
    bio?: string | null;
    website?: string | null;
    twitter?: string | null;
    linkedIn?: string | null;
    facebook?: string | null;
    language?: string | null;
    education?: string | null;
    experience?: string | null;
    createdAt: Date;
    updatedAt: Date;
   
  }