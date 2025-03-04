"use client"
import React,{useState} from 'react'
import { useGetEmpoyeesQuery } from '@/features/api/apiSlice'
import {useRouter} from "next/navigation"
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function page() {
    const [page, setPage] = useState(1);

    const { data:employees, isLoading, isError,error } = useGetEmpoyeesQuery({ page, limit: 10 });

    const handleNextPage = () => {
        if ((employees?.employees ?? []).length > 0) {
          setPage(page + 1);
        }
      }
  
      const handlePreviousPage = () => {
        if(page>1){
          setPage(page - 1);
        }
      }

      if (isLoading) return <div>Loading...</div>;
  if (isError){
    console.log("Error fetching orders:",error)
    return <div>Error</div>;}

  return (
    <div className='flex flex-col gap-10 mx-5 my-10 md:mx-16'>

<p className="text-4xl font-bold text-customBlue mb-3">
        Employees
        <span className=" inline-block ml-3 w-10 h-[2px] bg-customeRed"></span>
      </p>

        {(employees?.employees && employees.employees.length > 0)? (
            <>
<div className=" flex-grow overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">Active</th>
              <th className="py-2 px-4 border border-gray-300">First Name</th>
              <th className="py-2 px-4 border border-gray-300">Last Name</th>
              <th className="py-2 px-4 border border-gray-300">Email</th>
              <th className="py-2 px-4 border border-gray-300">Phone</th>
              <th className="py-2 px-4 border border-gray-300">Added Date</th>
              <th className="py-2 px-4 border border-gray-300">Role</th>
                <th className="py-2 px-4 border border-gray-300">Actions</th>              
            </tr>
          </thead>
          <tbody>
            { (
              employees.employees.map((employee,index) => (
                <tr key={employee.empoyee_id} className={`cursor-pointer ${
                  index % 2 ? "bg-gray-100" : ""
                } hover:bg-gray-200`} >
                  <td className="py-4 px-2 border border-gray-300">{employee.active_employee?"Yes":"No"}</td>
                  <td className="py-4 px-2 border border-gray-300">{employee.employee_first_name}</td>
                  <td className="py-4 px-2 border border-gray-300">{employee.employee_last_name}</td>
                  <td className="py-4 px-2 border border-gray-300">{employee.employee_email}</td>
                  <td className="py-4 px-2 border border-gray-300">{employee.employee_phone}</td>
                  <td className="py-4 px-2 border border-gray-300">{new Date(employee.added_date).toLocaleDateString()}</td>
                  <td className="py-4 px-2 border border-gray-300">{employee.company_role_id==2?"Admin":"Employee"}</td>
                  <td className="py-4 px-2 border border-gray-300">
  <div className="flex justify-center gap-8">
    <FaUserEdit size={25}  />
    <MdDelete size={25}  />
  </div>
</td>

                   
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
            
        ):(<>
        
        <div>
                <div  className="py-4 px-2 border border-gray-00 text-center text-customBlue font-semibold">
                  No more records found
                </div>
              </div>
              <div className="flex mt-5 justify-center ">
              <button className=" btn w-36 btn-outline border rounded-l border-gray-300 px-4 py-3 text-customBlue font-semibold " onClick={handlePreviousPage}>Previous page</button>
              <button className=" btn w-36 btn-outline border rounded-r border-gray-300 px-4 py-3 text-customBlue font-semibold" onClick={handleNextPage}>Next</button>
            </div></>)}
    </div>
  )
}

export default page