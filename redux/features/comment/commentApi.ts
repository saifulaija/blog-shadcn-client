import build from "next/dist/build";

import { IMeta } from "@/types";

import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IBlog } from "@/types/blog";
import { getUserInfo } from "@/services/authServices";

const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation({
      query: (data) => ({
        url: "/comment/create-comment",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data
      }),
      invalidatesTags: [tagTypes.comment,tagTypes.blog,tagTypes.user],
    }),
    getAllComments: build.query({
      query: (blogId) => ({
        url: `/comment/${blogId}`,
        method: "GET",
       
      }),
     
      providesTags: [tagTypes.comment,tagTypes.user],
    }),


    getSingleComment: build.query({
      query: (commentId) => ({
        url: `/comment/get-single-comment/${commentId}`,
        method: "GET",
       
      }),
     
      providesTags: [tagTypes.comment,tagTypes.user],
    }),
    updateComment: build.mutation({
      query: (updateCommentData) => ({
        url: `/comment/update-comment/${updateCommentData.id}`,
        method: "PATCH",
        data: updateCommentData.body
       
      }),
     
      invalidatesTags: [tagTypes.comment,tagTypes.user],
    }),

    getMyBlogs: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/my-blogs/${arg}`,
        method: "GET",
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
        method: "GET",
      }),

      providesTags: [tagTypes.blog],
    }),

    deleteComment: build.mutation({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.comment],
    }),
 
  }),
});

export const {
  useCreateCommentMutation,
  useGetAllCommentsQuery,
  useGetMyBlogsQuery,
  useGetSingleBlogQuery,
  useDeleteCommentMutation,
  useGetSingleCommentQuery,
  useUpdateCommentMutation
} = commentApi;
