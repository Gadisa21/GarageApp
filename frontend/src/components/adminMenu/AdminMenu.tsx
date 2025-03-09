"use client";
import Link from "next/link"
import { useSession } from "next-auth/react"
// p-5 border-gray-500 border-b
const AdminMenu = () => {
  const {data:session}=useSession()

  if(!session){
    return null
  }
  return (
    <div className="bg-blue-950 text-white max-w-[400px] xl:w-[400px]">
      <div>
        <h1 className=" bg-customBlue  text-3xl font-bold text-center p-5  text-gray-400">Admin Menu</h1>
        <ul>
          <li className="p-5 border-gray-500 border-b"><Link href="/dashboard">Dashboard</Link></li>
          <li className="p-5 border-gray-500 border-b"><Link href="/orders">Orders</Link></li>
          <li className="p-5 border-gray-500 border-b"><Link href="/neworder">New Order</Link></li>
          <li className="p-5 border-gray-500 border-b"><Link href="/addEmployee">Add Employee</Link></li>
          <li className="p-5 border-gray-500 border-b"><Link href="/employees">Employees</Link></li>
          <li className="p-5 border-gray-500 border-b"><Link href="/addCustomer">Add Customer</Link></li>
          <li className="p-5 border-gray-500 border-b"><Link href="/customers">Customers</Link></li>
          <li className="p-5 border-gray-500 border-b"><Link href="/Services">Services</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default AdminMenu