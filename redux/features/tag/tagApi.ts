import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/tag-types';

const tagApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTag: build.mutation({
      query: (data) => ({
        url: '/tag/create-tag',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: data, // corrected from 'data' to 'body'
      }),
      invalidatesTags: [tagTypes.tag, tagTypes.blog, tagTypes.user],
    }),
    getAllTags: build.query({
      query: () => ({
        url: '/tag',
        method: 'GET',
      }),
      providesTags: [tagTypes.tag],
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
        body: updateTagData.body, // corrected from 'data' to 'body'
      }),
      invalidatesTags: [tagTypes.tag, tagTypes.user],
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
  useDeleteTagMutation,
  useGetSingleTagQuery,
  useUpdateTagMutation,
} = tagApi;
