import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {OrderResponse,customersResponse,vehicleResponse,serviceResponse,CreateOrderRequest,AddCustomerRequest,getCustomersResponse,vehicle,customerResponse,updateCustomerInfoRequest,employeeResponse,
  updateEmployeeInfoRequest,getEmployeeByIdResponse,addEmployeeRequest,service,serviceUpdate ,getServiceByIdResponse,kpis,orderTrand,revenue} from "@/types"
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
    getcustomersByKeyword: builder.query<customersResponse,{keyword:string}>({
      query:({keyword})=>`/customer/search?keyword=${keyword}`
    }),
    getVehiclesByCustomerId: builder.query<vehicleResponse,{customer_id:number}>({
      query:({customer_id})=>`/vehicle/customer/${customer_id}`
    }),
    getServices: builder.query<serviceResponse,void>({
      query:()=>"/service"
    }),
    getServiceById: builder.query<getServiceByIdResponse,{service_id:number}>({
      query:({service_id})=>`/service/${service_id}`})
    ,
   
    createService:builder.mutation<void,service>({
      query:(newService)=>({
        url:'/service',
        method:'POST',
        body:newService
      })
    }),
    updateService:builder.mutation<void,serviceUpdate>({
      query:(newService)=>({
        url:'/service',
        method:'PUT',
        body:newService
      })
    }),
    deleteService:builder.mutation<void,{service_id:number}>({
      query:({service_id})=>({
        url:`/service/${service_id}`,
        method:"DELETE"
      })
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
    
    }),
    addVehicle: builder.mutation<void,vehicle>({
      query:(newVehicle)=>({ 
        url:"/vehicle",
        method:"POST",
        body:newVehicle
      })
    }),
    getOrdersPerCustomer: builder.query<OrderResponse,{customer_id:number}>({
      query:({customer_id})=>`/orders/customer/${customer_id}`}),

      getcustomerById: builder.query<customerResponse,{customer_id:number}>({
        query:({customer_id})=>`/customer/${customer_id}`}),

      updateCutomerInfo: builder.mutation<void,updateCustomerInfoRequest>({
        query:(newCustomerInfo)=>({
          url:"/customer",
        method:"PUT",
        body:newCustomerInfo}),
      }),
      getEmpoyees:builder.query<employeeResponse,{page:number; limit:number}>({
        query:({page,limit})=>`/employees?page=${page}&limit=${limit}`
      }),
      employeeUpdateInfo: builder.mutation<void,updateEmployeeInfoRequest>({
        query:(newEmployeeInfo)=>({
          url:"/employee",
        method:"PUT",
        body:newEmployeeInfo}),
      }),
      getEmployeeById: builder.query<getEmployeeByIdResponse,{employee_id:number}>({
        query:({employee_id})=>`/employee/${employee_id}`
      }),
      deleteEmployee: builder.mutation<void,{employee_id:number}>({
        query:({employee_id})=>({
          url:`/employee/${employee_id}`,
          method:"DELETE"
        })}),
      addEmployee: builder.mutation<void,addEmployeeRequest>({
          query:(newEmployee)=>({
            url:"/employee",
          method:"POST",
          body:newEmployee}),}),
      getKpis: builder.query<kpis,void>({
        query:()=>`/dashboard/kpis`,
      }),
      getOrderTrend: builder.query<orderTrand[],void>({
        query:()=>`/dashboard/order-trends`,
      }),
      getRevenue: builder.query<revenue[],void>({
        query:()=>`/dashboard/revenue-breakdown`,}),
}),});

export const { useGetOrdersQuery,useGetcustomersByKeywordQuery ,useGetVehiclesByCustomerIdQuery,useGetServicesQuery, useCreateOrderMutation,useAddCustomerMutation,useGetCustomersQuery,useAddVehicleMutation,useGetOrdersPerCustomerQuery,useGetcustomerByIdQuery,useUpdateCutomerInfoMutation,useGetEmpoyeesQuery,useEmployeeUpdateInfoMutation,useGetEmployeeByIdQuery,useDeleteEmployeeMutation,useAddEmployeeMutation,useCreateServiceMutation,useUpdateServiceMutation,useDeleteServiceMutation,useGetServiceByIdQuery,useGetKpisQuery,useGetOrderTrendQuery,useGetRevenueQuery } = apiSlice;  