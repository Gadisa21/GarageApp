"use client"
import { useGetcustomerByIdQuery } from "@/features/api/apiSlice"
import { FaUserEdit } from "react-icons/fa";
import {useRouter} from "next/navigation"

type CustomerCardProps = {
  customer_id: number
}

function CustomerCard({customer_id}: CustomerCardProps) {

  const router=useRouter()
  const {data:customer, isLoading, error} = useGetcustomerByIdQuery({customer_id})

  if(isLoading) return <div>Loading...</div>
 

 
  return (
    <>
    <div className="  px-4 py-5 md:flex gap-10">
      <div className=" hidden rounded-full w-24 h-24 bg-customeRed md:flex items-center justify-center text-white font-semibold text-2xl">
      Info
      </div>
      {(customer?.data && customer.data.customer )?(
      <div>
        <p className="text-2xl font-bold text-customBlue mb-2 ">
               {customer.data.customer.customer_first_name} {" "} {customer.data.customer.customer_last_name}       </p>
        <p className="mb-1 text-lg text-customBlue font-semibold">
          Email:<span className="text-gray-500">{customer.data.customer.customer_email}</span>
        </p>
        <p className="mb-1 text-lg text-customBlue font-semibold">
          Phone Number:<span className="text-gray-500">{customer.data.customer.customer_phone_number}</span>
        </p>
        <p className=" text-lg text-customBlue font-semibold">
          Active customer:<span className="text-gray-500">{1? "Yes":"No"}</span>
        </p>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-lg text-customBlue font-semibold">Edit customer info : </p>
          <FaUserEdit className="text-3xl text-customBlue cursor-pointer" onClick={()=>router.push(`/customers/edit/${customer_id}`)} />
        </div>
        </div>):(
          <div className="  flex-grow">
          <p className="border   border-gray-200 text-red-500 text-center p-4  font-semibold">No customer found</p>
        </div>
        )}
      </div>

      
    </>
  )
}

export default CustomerCard