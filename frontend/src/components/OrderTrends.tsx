"use client"
import { useGetOrderTrendQuery } from '@/features/api/apiSlice'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,CartesianGrid } from "recharts";

function OrderTrends() {
  const {data:orderTrends,isLoading,error} = useGetOrderTrendQuery()
  return (
    <div className="bg-white p-6 rounded-2xl shadow-full mt-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Trends</h3>
    <div className="overflow-x-auto">
    <div className="min-w-[600px] md:min-w-[800px] lg:min-w-[1000px]"> {/* Set a fixed large width for the chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={orderTrends || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
  </div>
  )
}

export default OrderTrends