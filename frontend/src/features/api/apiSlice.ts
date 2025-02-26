import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {OrderResponse,customerResponse,vehicleResponse,serviceResponse,CreateOrderRequest,AddCustomerRequest,getCustomersResponse } from "@/types"
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
    getcustomersByKeyword: builder.query<customerResponse,{keyword:string}>({
      query:({keyword})=>`/customer/search?keyword=${keyword}`
    }),
    getVehiclesByCustomerId: builder.query<vehicleResponse,{customer_id:number}>({
      query:({customer_id})=>`/vehicle/customer/${customer_id}`
    }),
    getServices: builder.query<serviceResponse,void>({
      query:()=>"/service"
    }),
    createOrder: builder.mutation<void,CreateOrderRequest>({
      query:(newOrder)=>({
        url:"/order",
        method:"POST",
        body:newOrder
    })
  }),
    addCustomer: builder.mutation<void,AddCustomerRequest>({

      query:(newCustomer)=>({
        url:"/customer",
        method:"POST",
        body:newCustomer
      })
    }),
    getCustomers:builder.query<getCustomersResponse,{page:number; limit:number}>({
      query:({page,limit})=>`/customer?page=${page}&limit=${limit}`
    
    })
  
}),});

export const { useGetOrdersQuery,useGetcustomersByKeywordQuery ,useGetVehiclesByCustomerIdQuery,useGetServicesQuery, useCreateOrderMutation,useAddCustomerMutation,useGetCustomersQuery } = apiSlice;