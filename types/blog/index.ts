export type TLoginUser = {
  email: string;
  password: string;
};

export interface Author {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  contactNumber: string;
  address: string | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  isDeleted: boolean;
  bio?: string;
  website?: string;
  twitter?: string;
  linkedIn?: string;
  facebook?: string;
  language?: string;
  education?: string;
  experience?: string;
  createdAt: string;
  updatedAt: string;
}

export type TComment = {
  id: string;
  content: string;
  commentorId: string;

  authorId: string;
  author: Author;
  blogId: string;
  blog: IBlog;
  createdAt: Date;
  updatedAt: Date;
};

export type TTag = {
  id: string;
  blogId: string;
  name: string;
};

export interface IBlog {
  id: string;
  title: string;
  content: string;
  category: string;
  conclusion: string;
  votes?: number;
  image: string; // Make image property mandatory
  authorId?: string;
  publishedStatus: 'PENDING' | 'APPROVED' | 'CANCEL';
  likeCount?: number;
  visibility?: 'PUBLIC' | 'PRIVATE';
  createdAt: Date;
  updatedAt?: string;
  views?: number;
  author?: Author;
  comment?: TComment[];
  tag: TTag[];
}

export interface IBlogUpdateProps {
  data: IBlog | null;
}

export type TBlogResponse = {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  votes: number;
  conclusion: string;
  authorId: string;
  likeCount: number;
  visibility: string;
  createdAt: Date;
  updatedAt: string;
  views: number;
  tag?: TTag[];
  author: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
    contactNumber: string | null;
    address: string | null;
    gender: string;
    isDeleted: boolean;
    bio: string | null;
    website: string | null;
    twitter: string | null;
    linkedIn: string | null;
    facebook: string | null;
    language: string | null;
    education: string | null;
    experience: string | null;
    createdAt: string;
    updatedAt: string;
  };

  comment: {
    id: string;
    content: string;
    commentorId: string;
    authorId: string;
    blogId: string;
    createdAt: string;
    updatedAt: string;

    comment: {
      id: string;
      email: string;
      password: string;
      role: string;
      profilePhoto: string | null;
      passwordChangeRequired: boolean;
      status: string;
      createdAt: string;
      updatedAt: string;
      author: null;
    };
  }[];
};
