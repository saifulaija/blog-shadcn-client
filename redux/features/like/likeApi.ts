import build from 'next/dist/build';

import { IMeta } from '@/types';

import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/tag-types';
import { IBlog } from '@/types/blog';
import { getUserInfo } from '@/services/authServices';

const likesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLike: build.mutation({
      query: (userData) => ({
        url: `/like/${userData.blogId}`,
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        data: { userId: userData.userId },
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    getAllBlogs: build.query({
      query: (arg: Record<string, any>) => ({
        url: '/blog',
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response: IBlog[], meta: IMeta) => {
        return {
          blogs: response,
          meta,
        };
      },
      providesTags: [tagTypes.blog],
    }),
    getMyBlogs: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/my-blogs/${arg}`,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response: IBlog[], meta: IMeta) => {
        return {
          blogs: response,
          meta,
        };
      },
      providesTags: [tagTypes.blog],
    }),
    getSingleBlog: build.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'GET',
      }),

      providesTags: [tagTypes.blog],
    }),

    // deleteDoctor: build.mutation({
    //   query: (id) => ({
    //     url: `/doctor/soft/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.doctor],
    // }),
    // getSingleDoctor: build.query({
    //   query: (id: string | string[] | undefined) => ({
    //     url: `/doctor/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.doctor],
    // }),
    // updateDoctor: build.mutation({
    //   query: (data) => ({
    //     url: `/doctor/${data.id}`,
    //     method: "PATCH",
    //     data: data.body,
    //   }),
    //   invalidatesTags: [tagTypes.doctor],
    // }),
  }),
});

export const {
  useCreateLikeMutation,
  useGetAllBlogsQuery,
  useGetMyBlogsQuery,
  useGetSingleBlogQuery,
} = likesApi;
