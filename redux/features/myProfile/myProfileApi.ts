import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";


export const profileAPi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      getMYProfile: build.query({
         query: () => {
            return {
               url: '/user/me',
               method: 'GET',
            };
         },
         providesTags: [tagTypes.user],
      }),
      updateMYProfile: build.mutation({
         query: (data) => {
            return {
               url: '/user/update-my-profile',
               method: 'PATCH',
               data,
              
            };
         },
         invalidatesTags: [tagTypes.user,tagTypes.blog,tagTypes.comment,tagTypes.blogger],
      }),
   }),
});

export const { useGetMYProfileQuery, useUpdateMYProfileMutation } = profileAPi;