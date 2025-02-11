import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {OrderResponse} from "@/types"
import {RootState} from "@/store/store"



export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
   
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers, { getState }) => {
      const state=(getState() as RootState)
      let token = state.auth.token
  
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      console.log(headers)
  
      return headers
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