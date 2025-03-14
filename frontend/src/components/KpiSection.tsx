"use client"
import { useGetKpisQuery } from "@/features/api/apiSlice"
import { FaUsers } from "react-icons/fa"
import { MdShoppingCart } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";


function KpiSection() {

    const {data:kpiData,isLoading,error} = useGetKpisQuery()
    console.log("kpi",kpiData)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-full flex justify-between items-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:translate-x-2 hover:translate-y-2">
        <div><h3 className="text-lg font-semibold text-gray-700">Total Customers</h3>
        <p className="text-3xl font-bold">{kpiData?.total_customers || 0}</p></div>
        <div className="p-5 bg-gray-100 rounded-full flex items-center justify-center">
        <FaUsers size={32} />

        </div>
      </div>
     
      <div className="bg-white p-6 rounded-2xl shadow-full flex justify-between items-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:translate-x-2 hover:translate-y-2">
        <div>
        <h3 className="text-lg font-semibold text-gray-700">Active Orders</h3>
        <p className="text-3xl font-bold">{kpiData?.active_orders || 0}</p>
        </div>
        <div className="p-5 bg-gray-100 rounded-full flex items-center justify-center">
        <MdShoppingCart size={32}/>

        </div>
        
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-full flex justify-between items-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:translate-x-2 hover:translate-y-2">
        <div>
        <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
        <p className="text-3xl font-bold">${kpiData?.total_revenue || 0}</p>
        </div>
        <div className="p-5 bg-gray-100 rounded-full flex items-center justify-center">
        <FaDollarSign size={32}/>

        </div>
      </div>
    </div>
  )
}

export default KpiSection