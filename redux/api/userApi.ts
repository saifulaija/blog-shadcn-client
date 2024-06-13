import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

import { IMeta } from "@/types";
import { TUser } from "@/types/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getAllUser: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/user",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TUser[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
    updateUserStatus: build.mutation({
      query: (data) => ({
        url: `/user/${data.id}/status`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetSingleUserQuery,useGetAllUserQuery,useUpdateUserStatusMutation } = userApi;