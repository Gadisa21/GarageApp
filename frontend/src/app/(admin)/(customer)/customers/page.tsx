"use client"
import { useState } from "react"
import { useGetcustomersByKeywordQuery,useGetCustomersQuery } from "@/features/api/apiSlice"
import { HiSearch } from "react-icons/hi";
import {useRouter} from "next/navigation"



function page() {

  const router = useRouter();
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);

      const { data:customers, isLoading, isError,error } = useGetCustomersQuery({ page, limit: 10 });

      // Get customers by keyword
  const {
    data: searchcustomers,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useGetcustomersByKeywordQuery({ keyword }, { skip: !keyword });

    


    const handleNextPage = () => {
      if ((customers?.customers ?? []).length > 0) {
        setPage(page + 1);
      }
    }

    const handlePreviousPage = () => {
      if(page>1){
        setPage(page - 1);
      }
    }

    
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

    if (isLoading) return <div>Loading...</div>;
  if (isError){
    console.log("Error fetching orders:",error)
    return <div>Error</div>;}

    
  return (
    <div className="flex flex-col gap-10 mx-5 my-10 md:mx-16">

<p className="text-4xl font-bold text-customBlue mb-3">
        Customers
        <span className=" inline-block ml-3 w-10 h-[2px] bg-customeRed"></span>
      </p>
             <div className="relative">
               <input
                 type="text"
                 id="customer_name"
                 className="w-full border border-gray-300 p-4 rounded-md pr-10"
                 placeholder="Search for a customer using first name, lastname or email address"
                 value={keyword}
                 onChange={handleSearchChange}
               />
               <HiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
             </div>
   
             {isCustomerLoading && <p>Loading...</p>}
             {customerError && <p>Error</p>}
             {searchcustomers?.customers && searchcustomers.customers.length > 0 ? (
               <div className="mt-5">
                 <h2 className="text-2xl font-bold">Search Results:</h2>
   <div className="overflow-x-auto">
                 <table className="min-w-full bg-white border border-gray-200 mt-3">
                   <thead>
                     <tr>
                     <th className="py-2 px-4 border border-gray-300">ID</th>

                       <th className="py-2 px-4 border border-gray-300">
                         First Name
                       </th>
                       <th className="py-2 px-4 border border-gray-300">
                         Last Name
                       </th>
                       <th className="py-2 px-4 border border-gray-300">Email</th>
                       <th className="py-2 px-4 border border-gray-300">
                         Phone Number
                       </th>
                       <th className="py-2 px-4 border border-gray-300">Added Date</th>

                       <th className="py-2 px-4 border border-gray-300">Status</th>
                     </tr>
                   </thead>
                   <tbody>
                     {searchcustomers.customers.map((customer) => (
                       <tr
                         key={customer.customer_id}
                         onClick={() => router.push(`/customers/${customer.customer_id}`)}
                        
                         className={`cursor-pointer ${
                           customer.customer_id % 2 ? "bg-gray-100" : ""
                         } hover:bg-gray-200`}
                       >
                        <td className="py-4 px-4 border border-gray-300">
                           {customer.customer_id} </td>
                         <td className="py-4 px-4 border border-gray-300">
                           {customer.customer_first_name}
                         </td>
                         <td className="py-4 px-4 border border-gray-300">
                           {customer.customer_last_name}
                         </td>
                         <td className="py-4 px-4 border border-gray-300">
                           {customer.customer_email}
                         </td>
                         <td className="py-4 px-4 border border-gray-300">
                           {customer.customer_phone_number}
                         </td>
                         <td className="py-4 px-4 border border-gray-300">
                           {new Date(customer.customer_added_date).toLocaleDateString()}
                           </td>
                         <td className="py-4 px-4 border border-gray-300">
                           {customer.active_customer_status
                             ? "Active"
                             : "Inactive"}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
                 </div>
               </div>
             ) : ((
               keyword &&
               !isCustomerLoading) ? (
                 <p className="mt-5 text-red-500">No customers found</p>
               ):((customers?.customers && customers.customers.length >0)?(
                <>
<div className=" flex-grow overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">ID</th>
              <th className="py-2 px-4 border border-gray-300">First Name</th>
              <th className="py-2 px-4 border border-gray-300">Last Name</th>
              <th className="py-2 px-4 border border-gray-300">Email</th>
              <th className="py-2 px-4 border border-gray-300">Phone</th>
              <th className="py-2 px-4 border border-gray-300">Added Date</th>
              <th className="py-2 px-4 border border-gray-300">Active</th>
              
              
            </tr>
          </thead>
          <tbody>
            { (
              customers?.customers?.map((customer,index) => (
                <tr key={customer.customer_id} className={`cursor-pointer ${
                  index % 2 ? "bg-gray-100" : ""
                } hover:bg-gray-200`} onClick={() => router.push(`/customers/${customer.customer_id}`)}>
                  <td className="py-4 px-2 border border-gray-300">{customer.customer_id}</td>
                  <td className="py-4 px-2 border border-gray-300">{customer.customer_first_name}</td>
                  <td className="py-4 px-2 border border-gray-300">{customer.customer_last_name}</td>
                  <td className="py-4 px-2 border border-gray-300">{customer.customer_email}</td>
                  <td className="py-4 px-2 border border-gray-300">{customer.customer_phone_number}</td>
                  <td className="py-4 px-2 border border-gray-300">{new Date(customer.customer_added_date).toLocaleDateString()}</td>
                  <td className="py-4 px-2 border border-gray-300">{customer.active_customer_status?"Yes":"No"}</td>
                   
                </tr>
              ))
            ) }
          </tbody>
          
        </table>
       
      </div>
      <div className="flex  justify-center ">
  <button className=" btn w-36 btn-outline border rounded-l border-gray-300 px-4 py-3 text-customBlue font-semibold " onClick={handlePreviousPage}>Previous page</button>
  <button className=" btn w-36 btn-outline border rounded-r border-gray-300 px-4 py-3 text-customBlue font-semibold" onClick={handleNextPage}>Next</button>
</div>
      </>
      
               ):(
                <>
                <div>
                <div  className="py-4 px-2 border border-gray-00 text-center text-customBlue font-semibold">
                  No more records found
                </div>
              </div>
              <div className="flex mt-5 justify-center ">
              <button className=" btn w-36 btn-outline border rounded-l border-gray-300 px-4 py-3 text-customBlue font-semibold " onClick={handlePreviousPage}>Previous page</button>
              <button className=" btn w-36 btn-outline border rounded-r border-gray-300 px-4 py-3 text-customBlue font-semibold" onClick={handleNextPage}>Next</button>
            </div>
            </>
               ) )
             )}

             
           </div>
  )
}

export default page