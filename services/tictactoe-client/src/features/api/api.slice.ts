import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TAG_TYPES } from './api.constants';

const baseQueryOptions = {
  baseUrl: process.env.TICTACTOE_BASE_API_URL,
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery(baseQueryOptions),
  tagTypes: Object.values(TAG_TYPES),
  endpoints: () => ({}),
});
