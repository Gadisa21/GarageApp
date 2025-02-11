"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersQuery } from '@/features/api/apiSlice';
import { RootState } from '@/store/store';

function OrdersPage() {
  const auth = useSelector((state: RootState) => state.auth);
  console.log("auth", auth);

  const { data: orders, isLoading, isError,error } = useGetOrdersQuery({ page: 1, limit: 10 });

  if (isLoading) return <div>Loading...</div>;
  if (isError){
    console.log("Error fetching orders:",error)
    return <div>Error</div>;}
  console.log("error", orders);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">Order ID</th>
              <th className="py-2 px-4 border border-gray-300">Customer Name</th>
              <th className="py-2 px-4 border border-gray-300">Vehicle Model</th>
              <th className="py-2 px-4 border border-gray-300">Order Total Price</th>
              <th className="py-2 px-4 border border-gray-300">Order Date</th>
              <th className="py-2 px-4 border border-gray-300">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((order) => (
              <tr key={order.order_id}>
                <td className="py-2 px-4 border border-gray-300">{order.order_id}</td>
                <td className="py-2 px-4 border border-gray-300">{order.customer_name}</td>
                <td className="py-2 px-4 border border-gray-300">{order.vehicle_model}</td>
                <td className="py-2 px-4 border border-gray-300">{order.order_total_price}</td>
                <td className="py-2 px-4 border border-gray-300">{new Date(order.order_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border border-gray-300">{order.order_status}</td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>

      <div className="join grid grid-cols-2 mt-4">
        <button className="join-item btn btn-outline">Previous page</button>
        <button className="join-item btn btn-outline">Next</button>
      </div>
    </>
  );
}

export default OrdersPage;