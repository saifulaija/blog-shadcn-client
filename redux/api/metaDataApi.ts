import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const metaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMeta: build.query({
      query: () => ({
        url: "/metadata",
        method: "GET",
      }),
      providesTags: [tagTypes.blog,tagTypes.comment],
    }),
  }),
});

export const { useGetMetaQuery } = metaApi;