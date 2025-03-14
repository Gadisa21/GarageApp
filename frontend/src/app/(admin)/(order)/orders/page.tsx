"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "@/features/api/apiSlice";
import { RootState } from "@/store/store";

const OrdersPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  console.log("auth", auth);

  const [page, setPage] = useState(1);
  const { data: orders, isLoading, isError, error } = useGetOrdersQuery({
    page,
    limit: 10,
  });

  const handleNextPage = () => {
    if ((orders?.data ?? []).length > 0) {
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (isLoading) return <div className="text-center text-xl mt-10">Loading...</div>;
  if (isError) {
    console.log("Error fetching orders:", error);
    return <div className="text-center text-red-500 mt-10">Error loading orders.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-10 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-customBlue mb-6">Orders</h1>

      {/* Table Container - Ensures Responsiveness */}
      <div className="flex-grow overflow-auto">
        <table className="w-full bg-white border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border border-gray-300 text-center">Order ID</th>
              <th className="py-3 px-4 border border-gray-300 text-center">Customer</th>
              <th className="py-3 px-4 border border-gray-300 text-center">Vehicle</th>
              <th className="py-3 px-4 border border-gray-300 text-center">Total Price</th>
              <th className="py-3 px-4 border border-gray-300 text-center">Order Date</th>
              <th className="py-3 px-4 border border-gray-300 text-center">Received By</th>
              <th className="py-3 px-4 border border-gray-300 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {(orders?.data?? []).length > 0 ? (
              orders?.data?.map((order) => (
                <tr key={order.order_id} className="odd:bg-white even:bg-gray-100">
                  <td className="py-3 px-2 border border-gray-300 text-center">{order.order_id}</td>
                  <td className="py-3 px-2 border border-gray-300 text-center">{order.customer_name}</td>
                  <td className="py-3 px-2 border border-gray-300 text-center">{order.vehicle_model}</td>
                  <td className="py-3 px-2 border border-gray-300 text-center">${order.order_total_price}</td>
                  <td className="py-3 px-2 border border-gray-300 text-center">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 border border-gray-300 text-center">{order.employee_name}</td>
                  <td className="py-3 px-2 border border-gray-300 text-center w-32 whitespace-nowrap overflow-hidden text-ellipsis">
                    <span
                      className={`px-3 py-1 rounded text-white text-xs font-semibold ${
                        order.order_status ? "bg-green-600" : "bg-yellow-500"
                      }`}
                    >
                      {order.order_status ? "Completed" : "In Progress"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-2 border border-gray-300 text-center text-customBlue font-semibold">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-6 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 text-customBlue font-semibold disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="px-6 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 text-customBlue font-semibold disabled:opacity-50"
          onClick={handleNextPage}
          disabled={(orders?.data ?? []).length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;
