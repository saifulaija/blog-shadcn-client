import { createApi } from '@reduxjs/toolkit/query/react';
import { tagTypeList } from '../tag-types';
import { axiosBaseQuery } from '@/helpers/axiosBaseQuery';

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
  }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
