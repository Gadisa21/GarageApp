"use client"
import { useGetOrdersPerCustomerQuery } from "@/features/api/apiSlice"

type OrdersPerCustomerProps = {
  customer_id: number
}

function OrdersPerCustomer({customer_id}: OrdersPerCustomerProps) {

  const {data:orders, isLoading, error} = useGetOrdersPerCustomerQuery({customer_id})

  if (isLoading) return <div>Loading...</div>
  console.log(orders)
  if (error) return <div>Error</div>
  return (
    <>
    <div className="  px-4 py-5 md:flex gap-10 mb-10">
    <div className=" hidden rounded-full w-24 h-24 bg-customeRed md:flex items-center justify-center text-white font-semibold text-2xl">
    Orders
    </div>
    <div className="flex-grow">

      {(orders?.data && orders.data.length>0)?(
        <>
          <div className=" flex-grow overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">Order ID</th>
              <th className="py-2 px-4 border border-gray-300">Customer Name</th>
              <th className="py-2 px-4 border border-gray-300">Vehicle Model</th>
              <th className="py-2 px-4 border border-gray-300">Order Total Price</th>
              <th className="py-2 px-4 border border-gray-300">Order Date</th>
              <th className="py-2 px-4 border border-gray-300">Recieved By</th>
              <th className="py-2 px-4 border border-gray-300">Order Status</th>
              
            </tr>
          </thead>
          <tbody>
            { (
              orders.data.map((order,index) => (
                <tr key={order.order_id} className={`cursor-pointer ${
                  index % 2 ? "bg-gray-100" : ""
                } hover:bg-gray-200`} >
                  <td className="py-4 px-2 border border-gray-300">{order.order_id}</td>
                  <td className="py-4 px-2 border border-gray-300">{order.customer_name}</td>
                  <td className="py-4 px-2 border border-gray-300">{order.vehicle_model}</td>
                  <td className="py-4 px-2 border border-gray-300">{order.order_total_price}</td>
                  <td className="py-4 px-2 border border-gray-300">{new Date(order.order_date).toLocaleDateString()}</td>
                  <td className="py-4 px-2 border border-gray-300">{order.employee_name}</td>
                  <td className="py-4 px-2 border border-gray-300">{order.order_status ? (
                      <p className="btn-sm bg-[#46C263] text-center rounded">Completed</p>
                    ) : (
                      <p className="btn-sm bg-[#FFDE21] text-center rounded">In progress</p>
                    )}</td>
                   
                </tr>
              ))
            ) }
          </tbody>
          
        </table>
       
      </div>
          </>

      ):( 
        <div  className="  py-4 px-2 border border-gray-00 text-center text-customeRed font-semibold">
          No orders found
      
      </div>)}
      </div>
    </div></>
  )
}

export default OrdersPerCustomer