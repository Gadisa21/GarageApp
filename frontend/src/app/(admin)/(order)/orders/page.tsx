"use client";
import {useState} from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersQuery } from '@/features/api/apiSlice';
import { RootState } from '@/store/store';

function OrdersPage() {
  const auth = useSelector((state: RootState) => state.auth);
  console.log("auth", auth);

  const [page, setPage] = useState(1);

  const { data: orders, isLoading, isError,error } = useGetOrdersQuery({ page, limit: 10 });

  const handleNextPage = () => {
    if ((orders?.data ?? []).length > 0) {
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
  console.log("error", orders);

  return (
    <>
    <div className="flex flex-col min-h-screen mx-5 my-10 md:mx-16">
     
    <p className="text-4xl font-bold text-customBlue mb-10">
        Orders
        <span className=" inline-block ml-3 w-8 h-[2px] bg-customeRed"></span>
      </p>

      <div className=" flex-grow overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">Order ID</th>
              <th className="py-2 px-4 border border-gray-300">Customer Name</th>
              <th className="py-2 px-4 border border-gray-300">Vehicle Model</th>
              <th className="py-2 px-4 border border-gray-300">Order Total Price</th>
              <th className="py-2 px-4 border border-gray-300">Order Date</th>
              <th className="py-2 px-4 border border-gray-300">Recieved by</th>
              <th className="py-2 px-4 border border-gray-300">Order Status</th>
              
            </tr>
          </thead>
          <tbody>
            {((orders?.data ?? []).length > 0)  ? (
              orders?.data?.map((order) => (
                <tr key={order.order_id} className={order.order_id % 2 ? " " : "bg-gray-100"}>
                  <td className="py-4 px-2 border border-gray-300">{order.order_id}</td>
                  <td className="py-4 px-2 border border-gray-300">{order.customer_name}</td>
                  <td className="py-4 px-2 border border-gray-300">{order.vehicle_model}</td>
                  <td className="py-4 px-2 border border-gray-300">{order.order_total_price}</td>
                  <td className="py-4 px-2 border border-gray-300">{new Date(order.order_date).toLocaleDateString()}</td>
                  <td className="py-4 px-2 border border-gray-300">{order.employee_name}</td>
                  <td className="py-4 px-1 sm:px-2 border border-gray-300">
                    {order.order_status ? (
                      <p className="btn-sm bg-[#46C263] text-center rounded">Completed</p>
                    ) : (
                      <p className="btn-sm bg-[#FFDE21] text-center rounded">In progress</p>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-2 border border-gray-00 text-center text-customBlue font-semibold">
                  No more records found
                </td>
              </tr>
            )}
          </tbody>
          
        </table>
      </div>

      <div className="flex mt-5 justify-center ">
  <button className=" btn w-36 btn-outline border rounded-l border-gray-300 px-4 py-3 text-customBlue font-semibold " onClick={handlePreviousPage}>Previous page</button>
  <button className=" btn w-36 btn-outline border rounded-r border-gray-300 px-4 py-3 text-customBlue font-semibold" onClick={handleNextPage}>Next</button>
</div>
      </div>
    </>
  );
}

export default OrdersPage;