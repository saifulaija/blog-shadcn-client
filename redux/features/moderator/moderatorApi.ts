import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { TModerator } from "@/types/moderator";



export const moderatorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllModerators: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/moderator",
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: TModerator[], meta: IMeta) => {
      //   return {
      //     Moderators: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.moderator],
    }),

    deleteModerator: build.mutation({
      query: (id) => ({
        url: `/moderator/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.moderator],
    }),
    //get single moderator
    getSingleModerator: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/moderator/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.moderator],
    }),
    createModerator: build.mutation({
      query: (data) => ({
        url:'/user/create-moderator',
        method: "POST",
        data
      }),
      invalidatesTags: [tagTypes.moderator],
    }),
    // update a moderator
    updateModerator: build.mutation({
      query: (data) => ({
        url: `/moderator/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.moderator, tagTypes.user],
    }),
  }),
});

export const {
  useGetAllModeratorsQuery,
  useDeleteModeratorMutation,
  useGetSingleModeratorQuery,
  useUpdateModeratorMutation,
  useCreateModeratorMutation
} = moderatorApi;
