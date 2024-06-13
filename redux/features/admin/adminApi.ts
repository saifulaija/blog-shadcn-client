import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { TAdmin } from "@/types/admin";





export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
   

    getAllAdmins: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/admin",
        method: "GET",
        params: arg,
      }),
      // transformResponse: (response: TAdmin[], meta: IMeta) => {
      //   return {
      //     admins: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.admin],
    }),

    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admin/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    createAdmin: build.mutation({
      query: (data) => ({
        url:'/user/create-admin',
        method: "POST",
        data
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    //get single Admin
    getSingleAdmin: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    // update a Admin
    updateAdmin: build.mutation({
      query: (data) => ({
        url: `/admin/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin,tagTypes.user],
    }),
  }),
});

export const {

  useGetAllAdminsQuery,
  useDeleteAdminMutation,
useGetSingleAdminQuery,
  useUpdateAdminMutation,
  useCreateAdminMutation
} = adminApi;