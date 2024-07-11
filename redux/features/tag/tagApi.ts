import build from 'next/dist/build';

import { IMeta } from '@/types';

import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/tag-types';
import { IBlog } from '@/types/blog';
import { getUserInfo } from '@/services/authServices';

const tagApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTag: build.mutation({
      query: (data) => ({
        url: '/tag/create-tag',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        data,
      }),
      invalidatesTags: [tagTypes.tag, tagTypes.blog, tagTypes.user],
    }),
    getAllTags: build.query({
      query: (blogId) => ({
        url: `/tag/${blogId}`,
        method: 'GET',
      }),

      providesTags: [tagTypes.tag, tagTypes.user],
    }),

    getSingleTag: build.query({
      query: (tagId) => ({
        url: `/tag/get-single-tag/${tagId}`,
        method: 'GET',
      }),

      providesTags: [tagTypes.tag, tagTypes.user],
    }),
    updateTag: build.mutation({
      query: (updateTagData) => ({
        url: `/tag/update-tag/${updateTagData.id}`,
        method: 'PATCH',
        data: updateTagData.body,
      }),

      invalidatesTags: [tagTypes.tag, tagTypes.user],
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

    deleteTag: build.mutation({
      query: (id) => ({
        url: `/tag/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.tag],
    }),
  }),
});

export const {
  useCreateTagMutation,
  useGetAllTagsQuery,
  useGetMyBlogsQuery,
  useGetSingleBlogQuery,
  useDeleteTagMutation,
  useGetSingleTagQuery,
  useUpdateTagMutation,
} = tagApi;
