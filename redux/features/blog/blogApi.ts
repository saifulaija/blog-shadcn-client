import build from "next/dist/build";

import { IMeta } from "@/types";

import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IBlog } from "@/types/blog";



const blogsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (data) => ({
        url: "/blog/create-blog",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    getAllBlogs: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/blog",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response:IBlog[], meta: IMeta) => {
        return {
          blogs: response,
          meta,
        };
      },
      providesTags: [tagTypes.blog],
    }),
    getMyBlogs: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/blog/my-blogs`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response:IBlog[], meta: IMeta) => {
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
        method: "GET",
       
      }),
   
      providesTags: [tagTypes.blog],
    }),
    getSingleBlogForModerator: build.query({
      query: (id) => ({
        url: `/blog/get-single-blog/${id}`,
        method: "GET",
       
      }),
   
      providesTags: [tagTypes.blog],
    }),

    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    // getSingleDoctor: build.query({
    //   query: (id: string | string[] | undefined) => ({
    //     url: `/doctor/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.doctor],
    // }),
    updateBlog: build.mutation({
      query: (data) => ({
        url: `/blog/update-blog/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    updateStatusApprove: build.mutation({
      query: (data) => ({
        url: `/blog/change-approval-status/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const { useCreateBlogMutation, useGetAllBlogsQuery,useGetMyBlogsQuery,useGetSingleBlogQuery,useDeleteBlogMutation,useUpdateBlogMutation,useGetSingleBlogForModeratorQuery,useUpdateStatusApproveMutation } = blogsApi;
