"use client"
import { useGetOrdersPerCustomerQuery } from "@/features/api/apiSlice";

type OrdersPerCustomerProps = {
  customer_id: number;
};

function OrdersPerCustomer({ customer_id }: OrdersPerCustomerProps) {
  const { data: orders, isLoading, error } = useGetOrdersPerCustomerQuery({ customer_id });

  if (isLoading) return null;
  if (error) return null;

  return (
    <div className="px-4 py-5 md:flex gap-10 mb-10">
      <div className="hidden rounded-full w-24 h-24 bg-customeRed md:flex items-center justify-center text-white font-semibold text-2xl">
        Orders
      </div>
      <div className="flex-grow">
        {orders?.data?.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  {[
                    "Order ID",
                    "Customer Name",
                    "Vehicle Model",
                    "Order Total Price",
                    "Order Date",
                    "Received By",
                    "Order Status",
                  ].map((heading, index) => (
                    <th key={index} className="py-2 px-4 border border-gray-300 whitespace-nowrap">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.data.map((order, index) => (
                  <tr
                    key={order.order_id}
                    className={`cursor-pointer ${index % 2 ? "bg-gray-100" : ""} hover:bg-gray-200`}
                  >
                    <td className="py-4 px-2 border border-gray-300 whitespace-nowrap">{order.order_id}</td>
                    <td className="py-4 px-2 border border-gray-300 whitespace-nowrap">{order.customer_name}</td>
                    <td className="py-4 px-2 border border-gray-300 whitespace-nowrap">{order.vehicle_model}</td>
                    <td className="py-4 px-2 border border-gray-300 whitespace-nowrap">{order.order_total_price}</td>
                    <td className="py-4 px-2 border border-gray-300 whitespace-nowrap">{new Date(order.order_date).toLocaleDateString()}</td>
                    <td className="py-4 px-2 border border-gray-300 whitespace-nowrap">{order.employee_name}</td>
                    <td className="py-4 px-2 border border-gray-300 whitespace-nowrap text-white">
                      <span className={`btn-sm text-center rounded ${order.order_status ? "bg-[#46C263]" : "bg-[#FFDE21]"}`}>
                        {order.order_status ? "Completed" : "In Progress"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default OrdersPerCustomer;
