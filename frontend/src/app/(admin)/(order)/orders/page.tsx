"use client"
import React from 'react'
import {useSelector} from 'react-redux'
import {useGetOrdersQuery} from "@/features/api/apiSlice"
import {RootState} from "@/store/store"


function page() {
  const auth=useSelector((state:RootState)=>state.auth)
  console.log("auth",auth)
  
  // const { data:orders, isLoading, isError } = useGetOrdersQuery({page:1, limit:10});

  // if(isLoading) return <div>Loading...</div>
  // if(isError) return <div>Error</div>
  // console.log("errror",orders)
  return (
    <div>page</div>
  )
}

export default page