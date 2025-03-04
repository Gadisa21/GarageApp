"use client"
import {useParams} from "next/navigation"
import CustomerCard from "@/components/customer/CustomerCard"
import CustomerVehicle from "@/components/vehicle/CustomerVehicle";
import { useGetVehiclesByCustomerIdQuery} from "@/features/api/apiSlice";
import OrdersPerCustomer from "@/components/order/OrdersPerCustomer";



function Customer() {
    const { id } = useParams();
    const customer_id=parseInt(id as string)
    const {data:vehicles,isLoading:vehicleisLoading,error:vehicleError} = useGetVehiclesByCustomerIdQuery({customer_id},{skip: !customer_id})

    if (vehicleisLoading) return <div>Loading...</div>

    console.log("vehicles",vehicles)

    
  return (
    <div>
        <CustomerCard customer_id={customer_id} />
        <CustomerVehicle vehicles={vehicles?.data} customer_id={customer_id} />
        <OrdersPerCustomer customer_id={customer_id} />
    </div>
  )
}

export default Customer