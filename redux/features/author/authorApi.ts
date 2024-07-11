import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/tag-types';
import { IMeta } from '@/types';
import { IAuthor } from '@/types/author';

export const authorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAuthors: build.query({
      query: (arg: Record<string, any>) => ({
        url: '/author',
        method: 'GET',
        params: arg,
      }),
      // transformResponse: (response: IAuthor[], meta: IMeta) => {
      //   return {
      //     aut: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.blogger],
    }),

    deleteAuthor: build.mutation({
      query: (id) => ({
        url: `/Author/soft/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.blogger],
    }),
    //get single Author
    getSingleAuthor: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/author/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.blogger],
    }),
    // update a Author
    updateAuthor: build.mutation({
      query: (data) => ({
        url: `/Author/${data.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blogger, tagTypes.user],
    }),
  }),
});

export const {
  useGetAllAuthorsQuery,
  useDeleteAuthorMutation,
  useGetSingleAuthorQuery,
  useUpdateAuthorMutation,
} = authorApi;
