import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {OrderResponse} from "@/types"
import {RootState} from "@/store/store"

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' ,
  prepareHeaders: (headers, { getState }) => {
    const token =( getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<OrderResponse,{page:number; limit:number}>({
      query: ({page,limit}) => `/orders?page=${page}&limit=${limit}`,
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetOrdersQuery } = apiSlice;