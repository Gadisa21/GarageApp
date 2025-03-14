"use client"
import React from 'react'
import { useGetRevenueQuery } from '@/features/api/apiSlice'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,CartesianGrid } from "recharts";

function RevenueBreakdown() {
  const { data:revenueData, error, isLoading } = useGetRevenueQuery()
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Revenue Breakdown</h3>
    <div className="overflow-x-auto">
    <div className="min-w-[600px] md:min-w-[800px] lg:min-w-[1000px]">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={revenueData || []}>
      <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  </div></div></div>
  )
}

export default RevenueBreakdown